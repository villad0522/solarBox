
import { handleActions } from 'redux-actions'
import actions from './actions'
import { v4 as uuidv4 } from 'uuid';

import exchangeLifi, { testLifi } from './protocols/lifi';
import exchangeTimer from './protocols/timer';


const defaultState = {
    bitArray: [],
    encoder: null,
    gifFileName: "",
    dragFlag: false,
    hoverDropArea: null,
    browserId: uuidv4(),
    blockCase: [
        {
            id: 4,
        },
        { id: 5 },
        { id: 2 },
    ],
    timeShedule: [
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
        [false, false, false, false], [false, false, false, false], [false, false, false, false],
    ],
}

export default handleActions({
    //============================================================
    [actions.setConvertGifResult]: (oldState, { payload: { encoder, gifFileName } }) => {
        return {
            ...oldState,
            encoder: encoder,
            gifFileName: gifFileName,
        }
    },
    //============================================================
    [actions.clearBitArray]: (oldState) => {
        return {
            ...oldState,
            bitArray: [],
            encoder: null,
            gifFileName: "",
        }
    },
    //============================================================
    [actions.setBitArray]: (oldState) => {
        return {
            ...oldState,
            bitArray: exchangeLifi(exchangeTimer(oldState.timeShedule)),
            encoder: null,
            gifFileName: "",
        }
    },
    //============================================================
    [actions.testFlash]: (oldState, { payload: { testMode } }) => {
        return {
            ...oldState,
            bitArray: testLifi(testMode),
        }
    },
    //============================================================
    [actions.setBlockCase]: (oldState, { payload: { dropAreaId, dataTransfer } }) => {
        const browserId = dataTransfer.getData("browserId");      // データ転送により送られてきたデータ
        const dragItemString = dataTransfer.getData("dragItem");  // データ転送により送られてきたデータ
        let dragItem = null;
        let pastDropAreaId = null;
        let blockCase = oldState.blockCase;
        if (!dragItemString) {
            //別のアプリから来た場合、新しいブロックを生成する
            dragItem = {
                id: uuidv4(),
            }
        }
        else if (browserId !== oldState.browserId) {
            //別のブラウザの、同じアプリから来た場合
            dragItem = JSON.parse(dragItemString);
            dragItem.id = uuidv4();
        }
        else {
            dragItem = JSON.parse(dragItemString);
            //同じブラウザで同じアプリから来た場合、ブロックの重複をなくす
            blockCase = oldState.blockCase.map((item, index) => {
                if (item && String(item.id) === String(dragItem.id)) {    //ドラッグアイテムのIDが重複していたら削除する
                    pastDropAreaId = index;
                    return null;
                }
                return item;
            });
        }
        if (!blockCase[dropAreaId]) {
            //上書きせずに配置できる場合
            blockCase[dropAreaId] = dragItem;
        }
        else if (pastDropAreaId) {
            //ケースの中の移動で上書きしてしまう場合
            blockCase[pastDropAreaId] = blockCase[dropAreaId];
            blockCase[dropAreaId] = dragItem;
        }
        else {
            //よそからドラッグされて上書きしてしまう場合
            for (let i = 0; true; i++) {
                if (!blockCase[i]) {
                    blockCase[i] = blockCase[dropAreaId];
                    blockCase[dropAreaId] = dragItem;
                    break;
                }
            }
        }
        return {
            ...oldState,
            blockCase: blockCase,
        }
    },
    //============================================================
    [actions.setDragFlag]: (oldState, { payload: { flag } }) => {
        return {
            ...oldState,
            dragFlag: flag,
        }
    },
    //============================================================
    [actions.setHoverDropArea]: (oldState, { payload: { blockKey } }) => {
        return {
            ...oldState,
            hoverDropArea: blockKey,
        }
    },
    //============================================================
    [actions.setTimeShedule]: (oldState, { payload: { hour, min, value } }) => {
        const newTimeShedule = oldState.timeShedule;
        newTimeShedule[hour][min] = value;
        return {
            ...oldState,
            timeShedule: newTimeShedule,
        }
    },
    //============================================================
    [actions.toggleFullMin]: (oldState, { payload: { min } }) => {
        let onCount = 0;
        let offCount = 0;
        oldState.timeShedule.map(array => {
            if (array[min]) {
                onCount++;
            }
            else {
                offCount++;
            }
            return null;
        });
        const value = (onCount < offCount);
        const newTimeShedule = oldState.timeShedule.map(array => {
            array[min] = value;
            return array;
        });
        return {
            ...oldState,
            timeShedule: newTimeShedule,
        }
    },
    //============================================================
    [actions.toggleFullHour]: (oldState, { payload: { hour } }) => {
        let onCount = 0;
        let offCount = 0;
        oldState.timeShedule[hour].map(val => {
            if (val) {
                onCount++;
            }
            else {
                offCount++;
            }
            return null;
        });
        const value = (onCount < offCount);
        const newTimeShedule = oldState.timeShedule;
        newTimeShedule[hour] = [value, value, value, value];
        return {
            ...oldState,
            timeShedule: newTimeShedule,
        }
    },
    //============================================================
}, defaultState)
