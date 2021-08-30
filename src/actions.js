import { createActions } from 'redux-actions'

// このファイルには、命令の一覧が書かれている。
// このファイルに書かれていない命令は、プログラムの中で発行することができない。

export default createActions({
    //
    //シリアル通信
    SERIAL: {
        DISCONNECT: () => ({ }),
        SET_PORT_DATA: (port) => ({ port }),
        CLEAR_PORT_DATA: () => ({ }),
    },
    SERIAL_COMMAND: {
        RECIEVE: (newText) => ({ newText }),
        SET_RECIEVE_DATA: (text) => ({ text }),
        OPEN_DIALOG: () => ({ }),
        CLOSE_DIALOG: () => ({ }),
    },
    //
    //無線通信
    IM920: {
        WIRED: {
            CONNECT: () => ({ }),
            TIMEOUT: () => ({ }),
            DISCONNECT: () => ({ }),
            EXECUTE_COMMANDS: (key, commands) => ({ key, commands }),
            SET_ALL_PARAMETERS: () => ({ }),
            SET_PARAMETER: (key) => ({ key }),
        },
    },
    //
    SET_BLOCK_CASE: (dropAreaId, dataTransfer) => ({ dropAreaId, dataTransfer }),
    SET_DRAG_FLAG: (flag) => ({ flag }),
    SET_HOVER_DROP_AREA: (blockKey) => ({ blockKey }),
    SET_BIT_ARRAY: () => ({ }),
    CLEAR_BIT_ARRAY: () => ({ }),
    TEST_FLASH: (testMode) => ({ testMode }),
    CONVERT_GIF: (canvasElement, imgElements) => ({ canvasElement, imgElements }),
    SET_CONVERT_GIF_RESULT: (encoder, gifFileName) => ({ encoder, gifFileName }),
    SET_TIME_SHEDULE: (hour, min, value) => ({ hour, min, value }),
    TOGGLE_FULL_HOUR: (hour) => ({ hour }),
    TOGGLE_FULL_MIN: (min) => ({ min }),
})