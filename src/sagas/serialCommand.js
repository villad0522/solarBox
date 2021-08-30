
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

export function* reciveLoop() {
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
        yield put(actions.serialCommand.openDialog());
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