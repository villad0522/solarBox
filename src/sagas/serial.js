
import {
    take,
    fork,
    put,
    select,
    delay
} from 'redux-saga/effects';
import actions from '../actions';


export function* serialWrite(text) {
    console.log("===============================");
    console.log("送信:" + text);
    const port = yield select(state => state.serial.port);
    if (!port) {
        console.log("送信しようとしましたが、シリアルポートが存在しません");
        return;
    }
    try {
        const writer = yield port.writable.getWriter();
        const value = new TextEncoder().encode(text);
        yield writer.write(value);
        yield writer.releaseLock();
    }
    catch (error) {
        console.log("エラー");
        console.log(error);
    }
}

export function* serialWaitBegin() {
    while (true) {
        const port = yield select(state => state.serial.port);
        if (port) {
            break;
        }
        yield take(actions.serial.setPortData); //シリアルポートの開放を待つ
        yield delay(100);   //storeに反映されるのを待つ
    }
}

export function* serialBegin(baudRate) {
    let port = null;
    try {
        /*port = yield navigator.serial.requestPort({
            filters: [
                { usbVendorId: 0x0403, usbProductId: 0x6015, },
            ]
        });*/
        port = yield navigator.serial.requestPort();
        yield port.open({ baudRate: baudRate });
        if (!port) {
            return;
        }
        if (!port.readable) {
            yield port.close();
            return;
        }
        let reader = yield port.readable.getReader();
        yield fork(waitDisconnect, reader);   //バックグラウンド処理開始
        console.log("===============================");
        console.log("ポート開放完了");
        yield put(actions.serial.setPortData(port));
        //
        //=====読み取り==================================
        while (true) {
            const { value, done } = yield reader.read();
            if (done) {
                break; // キャンセル
            }
            const newText = new TextDecoder().decode(value);
            yield put(actions.serialCommand.recieve(newText));
        }
        //===============================================
        //
        //
        //=====ポート閉鎖================================
        yield reader.releaseLock();
        yield port.close();
        console.log("===============================");
        console.log("ポート閉鎖完了");
        //===============================================
    }
    catch (error) {
        console.log("エラー");
        console.log(error);
    }
    finally {
        yield put(actions.serial.clearPortData());
    }
}

function* waitDisconnect(reader) {
    try {
        yield take(actions.serial.disconnect);   //アクション「disconnect」が実行されるまで待つ
        yield reader.cancel();  //読み取り終了
    }
    catch (error) {
        console.log("エラー");
        console.log(error);
    }
}
