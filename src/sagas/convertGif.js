/* eslint-disable no-undef */

import { put, fork, delay } from 'redux-saga/effects';
import actions from '../actions';
import encode64 from './jsgif/b64';
import GIFEncoder from './jsgif/GIFEncoder';

export default function* convertGifFunc({ payload: { canvasElement, imgElements } }) {
    yield fork(convertGif, canvasElement, imgElements);
}

function* convertGif(canvasElement, imgElements) {
    yield delay(500);
    //
    //canvasの取得
    var ctx = yield canvasElement.current.getContext('2d');
    //GIFEncoderの初期処理
    const encoder = yield new GIFEncoder();
    yield encoder.setRepeat(0); //繰り返し回数 0=無限ループ
    //yield encoder.setDelay(50); //1コマあたりの待機秒数（ミリ秒）
    yield encoder.setDelay(100); //1コマあたりの待機秒数（ミリ秒）
    yield encoder.start();
    //canvasのサイズを1枚目のコマに合わせる
    canvasElement.current.width = imgElements[0].current.naturalWidth;
    canvasElement.current.height = imgElements[0].current.naturalHeight;
    //全ての画像をcanvasへ描画
    for (let i = 0; i < imgElements.length; i++) {
        yield ctx.drawImage(imgElements[i].current, 0, 0);
        yield encoder.addFrame(ctx); //コマ追加
    }
    //アニメGIFの生成
    yield encoder.finish();
    let gifFileName = 'data:image/gif;base64,';
    gifFileName += yield encode64(encoder.stream().getData());
    //
    yield put(actions.setConvertGifResult(encoder, gifFileName));
}