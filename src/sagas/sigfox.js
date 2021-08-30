
import {
    delay,
} from 'redux-saga/effects';
import axios from 'axios';

export default function* reciveLoop() {
    while (true) {
        yield console.log("sigfox");
        try {
            const res = yield axios.get(
                "https://api.sigfox.com/v2/devices/0072E4ED/messages"
            );
            yield console.log(res);
        }
        catch (error) {
            console.log("エラー");
            console.log(error);
        }
        finally {
        }
        yield delay(1000);
    }
}
