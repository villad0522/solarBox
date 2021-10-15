
import {
    delay,
    put,
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
        }
        catch (error) {
            console.log("エラー");
            console.log(error);
        }
        finally {
        }
        yield delay(10000);
    }
}
