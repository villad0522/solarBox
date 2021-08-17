
const exchangeByte = (hour, min, value) => {
    let data = 0;
    data += (hour << 3) & parseInt("11111000", 2);
    data += (min << 1) & parseInt("00000110", 2);
    data += value & parseInt("00000001", 2);
    return data;
}

const exchangeData0 = (timeShedule) => {
    const byteData = [];
    const date = new Date();
    let firstByte = 0;              //モード０
    firstByte += (date.getHours() << 3) & parseInt("11111000", 2);
    byteData.push(firstByte);
    byteData.push(date.getMinutes());
    let lastValue = !timeShedule[0][0];              //モード０
    timeShedule.map((array, hour) => {
        array.map((value, min) => {
            if (lastValue !== value) {              //モード０
                byteData.push(exchangeByte(hour, min, value));
            }
            lastValue = value;
            return null;
        });
        return null;
    });
    return byteData;
}

const exchangeData1 = (timeShedule) => {
    const byteData = [];
    const date = new Date();
    let firstByte = 1;              //モード１
    firstByte += (date.getHours() << 3) & parseInt("11111000", 2);
    byteData.push(firstByte);
    byteData.push(date.getMinutes());
    let lastValue = timeShedule[0][0];              //モード１
    timeShedule.map((array, hour) => {
        array.map((value, min) => {
            if (lastValue === value) {              //モード１
                byteData.push(exchangeByte(hour, min, value));
            }
            lastValue = value;
            return null;
        });
        return null;
    });
    return byteData;
}


const exchangeTimer = (timeShedule) => {
    const data0 = exchangeData0(timeShedule);
    const data1 = exchangeData1(timeShedule);
    if (data0.length < data1.length) {
        return data0;
    }
    else {
        return data1;
    }
}

export default exchangeTimer;
