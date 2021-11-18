
import { handleActions } from 'redux-actions'
import actions from './actions'
import { v4 as uuidv4 } from 'uuid';

import exchangeLifi, { testLifi } from './protocols/lifi';
import exchangeTimer from './protocols/timer';


const defaultState = {
    iotDatas: [],
    serial: {
        connectFlag: false,
        port: null,
        recieveDatas: [],
    },
    serialCommand: {
        continueFlag: false,
        errorMessages: [],
        isDialogOpen: false,
        timeout: 100,
        commandProgress: -1,
        completeAction: null,
        timeoutAction: null,
        commands: [],
    },
    im920: {
        wired: {
            connectFlag: false,
            deviceId: "",
            nodeNumber: "",
            recieveIds: [],
            channelNumber: "",
            RSSI: "",
            sendPower: "",
            wirelessRate: "",
            version: "",
            sleepTime: "",
            workTime: "",
        },
        mist: {
            changeTime: 0,
            mist: "0",
            led: "0",
            music: "0",
        },
    },
    sigfox: [
        {
            "device": {
                "id": ""
            },
            "time": 0,
            "data": "",
            "rolloverCounter": 0,
            "seqNumber": 0,
            "rinfos": [],
            "satInfos": [],
            "nbFrames": 0,
            "operator": "",
            "country": "",
            "computedLocation": [],
            "lqi": 0
        }
    ],
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
    //
    //
    // Azureからデータ取得
    //============================================================
    [actions.setIotDatas]: (oldState, { payload: { iotDatas } }) => {
        return {
            ...oldState,
            iotDatas: iotDatas,
        }
    },
    //============================================================
    //
    //
    // シリアル通信
    //============================================================
    [actions.serial.setPortData]: (oldState, { payload: { port } }) => {
        return {
            ...oldState,
            serial: {
                connectFlag: true,
                port: port,
            },
        }
    },
    //============================================================
    [actions.serial.clearPortData]: (oldState) => {
        return {
            ...oldState,
            serial: {
                connectFlag: false,
                port: null,
            },
        }
    },
    //============================================================
    [actions.serialCommand.setRecieveData]: (oldState, { payload: { text } }) => {
        const progress = oldState.serialCommand.commandProgress;
        const commands = oldState.serialCommand.commands;
        const lines = text.split("\r\n");
        lines.pop();
        if (0 <= progress && progress < commands.length) {
            commands[progress].recieveDatas = lines;
            for (const line of lines) {
                if (line === "NG") {
                    const errorMessages = oldState.serialCommand.errorMessages;
                    errorMessages.push(
                        "無線モジュールへの書き込み時にエラーが発生しました",
                    );
                    return {
                        ...oldState,
                        serialCommand: {
                            ...oldState.serialCommand,
                            continueFlag: false,
                            errorMessages: errorMessages,
                            isDialogOpen: true,
                            commandProgress: progress,
                            commands: commands,
                        },
                    }
                }
            }
        }
        console.log("受信:", lines);
        return {
            ...oldState,
            serial: {
                ...oldState.serial,
                recieveDatas: lines,
            },
            serialCommand: {
                ...oldState.serialCommand,
                continueFlag: true,
                commandProgress: progress + 1,
                commands: commands,
            },
        }
    },
    //============================================================
    [actions.serialCommand.openDialog]: (oldState) => {
        return {
            ...oldState,
            serialCommand: {
                ...oldState.serialCommand,
                errorMessages: [],
                isDialogOpen: true,
            },
        };
    },
    //============================================================
    [actions.serialCommand.closeDialog]: (oldState) => {
        return {
            ...oldState,
            serialCommand: {
                ...oldState.serialCommand,
                errorMessages: [],
                isDialogOpen: false,
            },
        };
    },
    //============================================================
    //
    //
    // IM920
    //============================================================
    [actions.im920.wired.connect]: (oldState) => {
        return {
            ...oldState,
            serialCommand: {
                continueFlag: true,
                errorMessages: [],
                isDialogOpen: true,
                timeout: 100,
                commandProgress: -1,
                completeAction: actions.im920.wired.setAllParameters(),
                timeoutAction: actions.im920.wired.timeout(),
                commands: [
                    { sendData: "RDID\r", recieveDatas: [] },
                    { sendData: "RDNN\r", recieveDatas: [] },
                    { sendData: "RRID\r", recieveDatas: [] },
                    { sendData: "RDCH\r", recieveDatas: [] },
                    { sendData: "RDRS\r", recieveDatas: [] },
                    { sendData: "RDPO\r", recieveDatas: [] },
                    { sendData: "RDRT\r", recieveDatas: [] },
                    { sendData: "RDVR\r", recieveDatas: [] },
                    { sendData: "RSTM\r", recieveDatas: [] },
                    { sendData: "RWTM\r", recieveDatas: [] },
                ],
            },
        }
    },
    //============================================================
    [actions.im920.wired.setAllParameters]: (oldState) => {
        const commands = oldState.serialCommand.commands;
        return {
            ...oldState,
            serialCommand: {
                ...oldState.serialCommand,
                continueFlag: false,
                errorMessages: [],
                isDialogOpen: false,
                timeout: 0,
                commandProgress: -1,
                completeAction: null,
                timeoutAction: null,
                commands: [],
            },
            im920: {
                ...oldState.im920,
                wired: {
                    connectFlag: true,
                    deviceId: commands[0].recieveDatas[0],
                    nodeNumber: commands[1].recieveDatas[0],
                    recieveIds: commands[2].recieveDatas,
                    channelNumber: commands[3].recieveDatas[0],
                    RSSI: commands[4].recieveDatas[0],
                    sendPower: commands[5].recieveDatas[0],
                    wirelessRate: commands[6].recieveDatas[0],
                    version: commands[7].recieveDatas[0],
                    sleepTime: commands[8].recieveDatas[0],
                    workTime: commands[9].recieveDatas[0],
                },
            },
        };
    },
    //============================================================
    [actions.im920.wired.executeCommands]: (oldState, { payload: { key, commands } }) => {
        commands = commands.map(command => {
            return {
                sendData: command,
                recieveDatas: []
            }
        });
        return {
            ...oldState,
            serialCommand: {
                continueFlag: true,
                errorMessages: [],
                isDialogOpen: true,
                timeout: 500,
                commandProgress: -1,
                completeAction: actions.im920.wired.setParameter(key),
                timeoutAction: actions.im920.wired.timeout(),
                commands: commands,
            },
        };
    },
    //============================================================
    [actions.im920.wired.setParameter]: (oldState, { payload: { key } }) => {
        if (!key) {
            return {
                ...oldState,
                serialCommand: {
                    ...oldState.serialCommand,
                    continueFlag: false,
                    errorMessages: [],
                    isDialogOpen: false,
                    timeout: 0,
                    commandProgress: -1,
                    completeAction: null,
                    timeoutAction: null,
                    commands: [],
                },
            };
        }
        const commands = oldState.serialCommand.commands;
        let parameters = oldState.im920.wired;
        parameters = JSON.parse(JSON.stringify(parameters));
        if (key === "recieveIds") {
            console.log(commands[commands.length - 1].recieveDatas);
            parameters[key] = commands[commands.length - 1].recieveDatas;
        }
        else {
            parameters[key] = commands[commands.length - 1].recieveDatas[0];
        }
        return {
            ...oldState,
            serialCommand: {
                ...oldState.serialCommand,
                continueFlag: false,
                errorMessages: [],
                isDialogOpen: false,
                timeout: 0,
                commandProgress: -1,
                completeAction: null,
                timeoutAction: null,
                commands: [],
            },
            im920: {
                ...oldState.im920,
                wired: parameters,
            },
        };
    },
    //============================================================
    [actions.im920.wired.timeout]: (oldState) => {
        const progress = oldState.serialCommand.commandProgress;
        let command = oldState.serialCommand.commands[progress].sendData;
        command = command.replace('\r', '\\r');
        command = command.replace('\n', '\\n');
        const ms = oldState.serialCommand.timeout;
        return {
            ...oldState,
            serialCommand: {
                ...oldState.serialCommand,
                continueFlag: false,
                errorMessages: oldState.serialCommand.errorMessages.concat([
                    "失敗！\nコマンド「" + command + "」を送って" + ms + "ミリ秒待ちましたが、応答がありませんでした",
                ]),
            },
            im920: {
                ...oldState.im920,
                wired: {
                    connectFlag: false,
                    deviceId: "",
                    nodeNumber: "",
                    recieveIds: "",
                    channelNumber: "",
                    RSSI: "",
                    sendPower: "",
                    wirelessRate: "",
                    version: "",
                    sleepTime: "",
                    workTime: "",
                },
            },
        };
    },
    //============================================================
    [actions.im920.wired.disconnect]: (oldState) => {
        return {
            ...oldState,
            serialCommand: {
                ...oldState.serialCommand,
                continueFlag: false,
                errorMessages: oldState.serialCommand.errorMessages.concat([
                    "USBが切断されました",
                ]),
                commandProgress: oldState.serialCommand.commands.length,
            },
            im920: {
                ...oldState.im920,
                wired: {
                    connectFlag: false,
                    deviceId: "",
                    nodeNumber: "",
                    recieveIds: "",
                    channelNumber: "",
                    RSSI: "",
                    sendPower: "",
                    wirelessRate: "",
                    version: "",
                    sleepTime: "",
                    workTime: "",
                },
            },
        };
    },
    //============================================================
    [actions.im920.wired.continueTxdt]: (oldState) => {
        const nowTime = new Date().getTime();
        const diffTime = nowTime - oldState.im920.mist.changeTime;
        if (diffTime > 6000) {
            return {
                ...oldState,
                serialCommand: {
                    ...oldState.serialCommand,
                    continueFlag: false,
                    errorMessages: [],
                    isDialogOpen: false,
                    timeout: 0,
                    commandProgress: -1,
                    completeAction: null,
                    timeoutAction: null,
                    commands: [],
                },
            };
        }
        return {
            ...oldState,
            serialCommand: {
                ...oldState.serialCommand,
                commandProgress: -1,
                isDialogOpen: false,
                commands: [
                    {
                        sendData: "TXDT " + oldState.im920.mist.led + oldState.im920.mist.mist + oldState.im920.mist.music + "00000\r",
                        recieveDatas: [],
                    },
                ],
            },
        };
    },
    //============================================================
    //
    //
    //
    //============================================================
    [actions.im920.mist.recieve]: (oldState, { payload: { mist, led, music } }) => {
        return {
            ...oldState,
            im920: {
                ...oldState.im920,
                mist: {
                    ...oldState.im920.mist,
                    mist: mist,
                    led: led,
                    music: music,
                    changeTime: new Date().getTime(),
                },
            },
            serialCommand: {
                continueFlag: true,
                errorMessages: [],
                isDialogOpen: false,
                timeout: 500,
                commandProgress: -1,
                completeAction: actions.im920.wired.continueTxdt(),
                timeoutAction: null,
                commands: [
                    {
                        sendData: "TXDT " + led + mist + music + "00000\r",
                        recieveDatas: [],
                    },
                ],
            },
        };
    },
    //============================================================
    //
    //
    //
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
