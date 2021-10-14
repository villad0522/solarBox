
const PACKET_SIZE = 4;

const MASK = parseInt("1001", 2);
const ST1 = parseInt("0101", 2);    //5
const ST2 = parseInt("1010", 2);    //10
const ESC = parseInt("1110", 2);    //14

//#################################################################################

export const testLifi = (testMode) => {
    let result = [0];
    if (testMode === "combo") {
        result = [];
        for (let i = 0; i < 10; i++) {
            result = result.concat(xor([15, 9, 14, 7]));
        }
    }
    else if (testMode === "rotate") {
        result = xor([ST1, ESC, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15]);
        // 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 4
        // が届くはず
    }
    else if (testMode === "lastDelete") {
        result = xor([ST1, ESC, 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15]);
        // 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15
        // が届くはず
        result = result.concat(xor([ST1, ESC, 4, 7, 3, 11]));
        // 4, 7, 3, 11
        // が届くはず
    }
    else if (testMode === "escape") {
        const halfByteArray2 = maskFlash([0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 9, 0, 10, 0, 11, 0, 12, 0, 13, 0, 14, 0, 15, 0]);
        const halfByteArray3 = startBitAndEscape(halfByteArray2);
        result = xor(halfByteArray3);
        //const halfByteArray4 = maskFlash([9, 8, 7, 13]);
        //const halfByteArray5 = startBitAndEscape(halfByteArray4);
        //result = result.concat(xor(halfByteArray5));
    }
    else if (testMode === "JoinHalfByte") {
        //const halfByteArray1 = splitHalfByte([0, 40, 80, 120, 160, 200, 240, 255]);
        const halfByteArray1 = splitHalfByte([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        const halfByteArray2 = maskFlash(halfByteArray1);
        const halfByteArray3 = startBitAndEscape(halfByteArray2);
        result = xor(halfByteArray3);
    }
    else if (testMode === "singleCheckSum") {
        const originalData = [
            148,
            120,
            17,
            214,
            4,
            139,
            137,
            179,
            48,
            206,//エラー
            21,
            47,
            83,
            81,
            136,
            235,
            45,
            221,
            82,
            149,
            227
        ];
        console.log(originalData);
        const checkSumData = addCheckSum(originalData);
        console.log("チェックサムは" + checkSumData[checkSumData.length - 1]);
        const halfByteArray4 = splitHalfByte(checkSumData);
        const halfByteArray5 = maskFlash(halfByteArray4);
        const halfByteArray6 = startBitAndEscape(halfByteArray5);
        result = xor(halfByteArray6);
    }
    else if (testMode === "randomCheckSum") {
        result = [];
        for (let i = 0; i < 10; i++) {
            const originalData = [];
            const packetLength = getRandomInt(1, 10);
            for (let i = 0; i < packetLength; i++) {
                originalData.push(getRandomInt(0, 255));
            }
            console.log(originalData);
            const checkSumData = addCheckSum(originalData);
            console.log("チェックサムは" + checkSumData[checkSumData.length - 1]);
            const halfByteArray4 = splitHalfByte(checkSumData);
            const halfByteArray5 = maskFlash(halfByteArray4);
            const halfByteArray6 = startBitAndEscape(halfByteArray5);
            result = result.concat(xor(halfByteArray6));
        }
    }
    return result;
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min));
}

//#################################################################################

const exchangeLifi = (originalData) => {
    //
    const packetNum = Math.ceil((originalData.length + 1) / PACKET_SIZE);  //パケットの個数を求める
    originalData.unshift(packetNum);    //先頭に「パケットの個数」を追加
    //
    const packets = splitPacket(originalData); //パケットごとに分割
    //
    //ビット列に変換
    let bitArray = [];
    packets.map((packet, i) => {
        packet.unshift(i * PACKET_SIZE);    //パケットの先頭にアドレスを追加
        const checkSumData = addCheckSum(packet);
        const halfByteArray1 = splitHalfByte(checkSumData);
        const halfByteArray2 = maskFlash(halfByteArray1);
        const halfByteArray3 = startBitAndEscape(halfByteArray2);
        const halfByteArray4 = xor(halfByteArray3);
        bitArray = bitArray.concat(halfByteArray4); //ビット列を連結
        return null;
    });
    return bitArray;
}
export default exchangeLifi;

//#################################################################################

const splitPacket = (original) => {
    //パケットごとに分割
    const result = [];
    original.map((byte, i) => {
        const packetIndex = Math.floor(i / PACKET_SIZE);
        if (!result[packetIndex]) {
            result[packetIndex] = [];
        }
        result[packetIndex][i % PACKET_SIZE] = byte;
        return null;
    });
    return result;
}

const bitRead = (data, i) => {
    i %= 8;
    data = data >> i;
    return data % 2;
}

const rotationBits = (original, shift) => {
    shift %= 8;
    let result = 0;
    for (let i = 0; i < 8; i++) {
        result += (bitRead(original, shift + i) << i);
    }
    return result;
}

const addCheckSum = (original) => {
    let checkSum = 0;
    original.map((byte, i) => {
        checkSum ^= rotationBits(byte, i);
        return null;
    });
    original.push(checkSum);
    return original;
}

const splitHalfByte = (original) => {
    const result = [];
    original.map(byte => {
        result.push(byte & parseInt("00001111", 2));
        result.push((byte >> 4) & parseInt("00001111", 2));
        return null;
    });
    return result;
}

const maskFlash = (original) => {
    const result = original.map(byte => byte ^ MASK);
    return result;
}

const startBitAndEscape = (original) => {
    const result = [];
    result.push(ST1); //先頭に追加
    result.push(ESC); //先頭に追加
    original.map(byte => {
        switch (byte) {
            case 0: // データの途中に 0 があったら
                result.push(ESC);      // ESC で置き換え
                result.push(byte ^ MASK); // 直後に ESC_ZERO を挿入
                break;
            case ST1: // データの途中に ST1 があったら
                result.push(ESC);     // ESC で置き換え
                result.push(byte ^ MASK); // 直後に ESC_ST1 を挿入
                break;
            case ST2: // データの途中に ST2 があったら
                result.push(ESC);     // ESC で置き換え
                result.push(byte ^ MASK); // 直後に ESC_ST2 を挿入
                break;
            case ESC: // データの途中に ESC があったら
                result.push(ESC);      // ESC で置き換え
                result.push(byte ^ MASK);  // 直後に ESC_ESC を挿入
                break;
            default:
                result.push(byte);      // そのまま
        }
        return null;
    });
    return result;
}

const xor = (original) => {
    const result = [15];
    for (let i = 0; i < original.length; i++) {
        result[i + 1] = result[i] ^ original[i];
    }
    const lastData = result[result.length - 1];
    if (lastData === 15) {
        result.push(15 ^ ESC);
    }
    return result;
}