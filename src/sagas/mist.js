
import {
    put,
} from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

export default function* mistSendFn({ payload: { mist, led, music } }) {
    try {
        const res = yield axios.post(
            "https://tec-log2.azurewebsites.net/api/postMist?code=JbDBeBLzW9A9uoQmtCgpdYJmIiFgVP5qTlfWAfrBJXXBswb7k4F7Yw==",
            {
                mist: mist,
                led: led,
                music: music,
            }
        );
        if (res.status === 200) {
            yield console.log("設定データを送信しました");
            yield put(actions.setIotDatas(res.data));
        }
    }
    catch (error) {
        console.log("エラー");
        console.log(error);
    }
    finally {
    }
}
