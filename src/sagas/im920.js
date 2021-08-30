
import {
    put,
    fork,
} from 'redux-saga/effects';
import actions from '../actions';
import {
    serialBegin,
} from './serial';


export function* im920DisconnectFn() {
    yield put(actions.serial.disconnect());
}


export function* im920ConnectFn() {
    yield fork(serialBegin, 19200);
}
