
import {
    delay,
    select,
    put,
    race,
    take,
} from 'redux-saga/effects';
import actions from '../actions';
import {
    serialWaitBegin,
    serialWrite,
} from './serial';
import axios from 'axios';

export function* serialReciveLoop() {
    let text = "";
    while (true) {
        let ms = yield select(state => state.serialCommand.timeout);
        if (!ms) {
            ms = 100;
        }
        const { data, timeout } = yield race({
            data: take(actions.serialCommand.recieve),  //データの到着を待つ
            timeout: delay(ms),    //ms秒間受信しなかったら、次のコマンドを送る
        });
        if (timeout) {
            //最近、受信していない
            if (text) {
                //データが溜まっている場合
                yield nextFn(text);
                text = "";
            }
            else {
                //データが溜まっていない場合
                yield firstFn();
            }
        }
        else {
            //受信した
            text += data.payload.newText;
        }
    }
}

function* firstFn() {
    const commands = yield select(state => state.serialCommand.commands);
    if (commands.length <= 0) {
        return;
    }
    const continueFlag = yield select(state => state.serialCommand.continueFlag);
    const progress = yield select(state => state.serialCommand.commandProgress);
    if (!continueFlag) {
        return;
    }
    else if (progress === -1) {
        if (!commands[0].sendData) {
            return;
        }
        yield serialWaitBegin();
        yield put(actions.serialCommand.setRecieveData(""));
        //yield put(actions.serialCommand.openDialog());
        yield serialWrite(commands[0].sendData);    //最初のコマンドを送信
    }
    else if (0 <= progress && progress < commands.length) {
        const timeoutAction = yield select(state => state.serialCommand.timeoutAction);
        if (!timeoutAction) {
            return;
        }
        const errorMessages = yield select(state => state.serialCommand.errorMessages);
        if (errorMessages.length > 0) {
            return;
        }
        yield put(timeoutAction);
    }
}

function* nextFn(text) {
    //新しいレスポンスを受信した！
    const commands = yield select(state => state.serialCommand.commands);
    const progress = yield select(state => state.serialCommand.commandProgress);
    const continueFlag = yield select(state => state.serialCommand.continueFlag);
    const nextProgress = progress + 1;
    //
    //今回受け取ったレスポンスを、storeに保存
    yield put(actions.serialCommand.setRecieveData(text));
    //
    // IM920から受け取ったデータを整形
    let recieveText = text.split("\r\n")[0];   //改行で区切る
    if (recieveText.length === 34 && recieveText.substr(10, 1) === ":") {
        const hexString = recieveText.split(":")[1];      //コロン「:」以後だけを切り取る
        const hexStrings = hexString.split(",");
        let soc = parseInt(hexStrings[0], 16);
        let loadvoltage = parseInt(hexStrings[1], 16);
        let current_mA = parseInt(hexStrings[2] + hexStrings[3], 16);
        let temp = parseInt(hexStrings[4], 16);
        let humidity = parseInt(hexStrings[5], 16);
        let pressure = parseInt(hexStrings[6], 16);
        let gas = parseInt(hexStrings[7], 16);
        soc /= 2;
        loadvoltage /= 50;
        loadvoltage += 12.00;
        current_mA /= 50;
        temp /= 4;
        temp -= 10;
        humidity /= 2;
        pressure /= 8;
        pressure += 998;
        gas *= 4;
        const date = new Date();
        const im920 = {
            id: "_" + date.getTime(),
            type: "IM920",
            timestamp: date.getTime(),
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            week: ["日", "月", "火", "水", "木", "金", "土"][date.getDay()],
            hour: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            name: "外でも涼しく過ごせるミスト",
            solar: {
                voltage: loadvoltage,
                current: current_mA,
                power: loadvoltage * current_mA,
            },
            battery: soc,
            temperature: temp,
            pressure: pressure,
            humidity: humidity,
            gas: gas,
        };
        console.log(im920);
        try {
            const res = yield axios.post(
                "https://tec-log2.azurewebsites.net/api/sigfox?code=LcC9XuDli8elQBhqGKqSJSItqnRVp6Zw3kbeTgiODYXQaiYko3t8ag==",
                im920
            );
            if (res.status === 200) {
                yield console.log("IM920のデータをアップロードしました");
            }
        }
        catch (error) {
            console.log("エラー");
            console.log(error);
        }
        finally {
        }
    }
    //
    const errorMessages = yield select(state => state.serialCommand.errorMessages);
    if (errorMessages.length > 0) {
        return;
    }
    //
    if (!continueFlag) {
        return;
    }
    //
    if (nextProgress === commands.length) {
        //全てのコマンドを受信した場合
        const completeAction = yield select(state => state.serialCommand.completeAction);
        if (completeAction) {
            yield delay(1000);
            yield put(completeAction);
        }
        return;
    }
    //
    if (0 <= nextProgress && nextProgress < commands.length) {
        //次のコマンドを送信
        const nextCommand = yield select(state => state.serialCommand.commands[nextProgress].sendData);
        yield serialWrite(nextCommand);
    }
}