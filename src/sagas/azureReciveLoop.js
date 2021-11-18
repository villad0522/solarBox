
import {
    delay,
    put,
    select,
} from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

export default function* azureReciveLoop() {
    while (true) {
        try {
            const res = yield axios.get("https://tec-log2.azurewebsites.net/api/sigfox?code=LcC9XuDli8elQBhqGKqSJSItqnRVp6Zw3kbeTgiODYXQaiYko3t8ag==");
            if (res.status === 200) {
                yield console.log("データを更新しました");
                yield put(actions.setIotDatas(res.data));
            }
            const connectFlag = yield select(state => state.im920.wired.connectFlag);
            if (connectFlag) {
                const res2 = yield axios.get("https://tec-log2.azurewebsites.net/api/getMist?code=SeaIp6k5DSKFAuA2Iqexg5e5SJ0D/F/bihCDOpde/8d2pZ5XGpeLBA==");
                if (res2.status === 200) {
                    yield put(actions.im920.mist.recieve(res2.data.mist, res2.data.led, res2.data.music));
                }
            }
        }
        catch (error) {
            console.log("エラー");
            console.log(error);
        }
        finally {
        }
        yield delay(3000);
    }
}
