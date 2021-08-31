
import {
    delay,
} from 'redux-saga/effects';
import axios from 'axios';

export default function* reciveLoop() {
    while (true) {
        yield console.log("sigfox");
        try {
            const res = yield axios.get(
                "https://tec-log2.azurewebsites.net/api/sigfox?code=LcC9XuDli8elQBhqGKqSJSItqnRVp6Zw3kbeTgiODYXQaiYko3t8ag==",
                {
                    params: {
                        "deviceId": "0072E4ED",
                        "apiEntry": "61260f16c563d60dbdef1b8e",
                        "apiPassword": "dd4e5c533143e58553b2e92edca00194"
                    }
                }
            );
            yield console.log(res);
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
