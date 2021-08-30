
//yield put({type:'ACTION', ...})   ActionをDispatchする
//yield take(['ACTION'])            指定のActionがDispatchされるまで待つ
//yield takeEvery('ACTION', func)   ActionがDispatchされたら、毎回関数を呼び出すように設定する（同じActionが複数回来た場合は、並列で処理を行う）
//yield call(func, args)            関数をを呼び出して、終了を待つ（関数から戻り値を貰える）
//yield fork(func)                  バックグラウンド処理を開始する。（終了は待たない）
//yield select(selector関数, args)  storeからデータを取りたい
//takeLatest                        処理をキャンセルし、新しい処理を行う
//axios.get(..)                     する関数とかをコール

import { takeEvery, fork } from 'redux-saga/effects';

import actions from '../actions';
import convertGifFunc from './convertGif';
//import sigfoxLoop from './sigfox';
import { reciveLoop } from './serialCommand';
import { im920ConnectFn, im920DisconnectFn } from './im920';

export default function* rootSaga() {
    yield console.log("redux メイン関数　スタート");
    //
    yield fork(reciveLoop);
    //yield fork(sigfoxLoop);
    yield takeEvery(actions.im920.wired.connect, im920ConnectFn);
    yield takeEvery(actions.im920.wired.disconnect, im920DisconnectFn);
    yield takeEvery(actions.im920.wired.timeout, im920DisconnectFn);
    yield takeEvery(actions.convertGif, convertGifFunc);
    //
    yield console.log("redux メイン関数　終了");
}
