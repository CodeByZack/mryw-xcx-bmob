export const hex2rgb = (sColor: string) => {
    sColor = sColor.toLowerCase();
    // 如果是16进制颜色
    if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange : number[] = [];
    for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange;
};

// 参数arr的值分别为[r,g,b]
export const rgb2hsv = (arr : number[]) => {
    let h = 0, s = 0, v = 0;
    let r = arr[0], g = arr[1], b = arr[2];
    arr.sort(function (a, b) {
        return a - b;
    });
    let max = arr[2];
    let min = arr[0];
    v = max / 255;
    if (max === 0) {
        s = 0;
    } else {
        s = 1 - (min / max);
    }
    if (max === min) {
        h = 0; // 事实上，max===min的时候，h无论为多少都无所谓
    } else if (max === r && g >= b) {
        h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
        h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
        h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
        h = 60 * ((r - g) / (max - min)) + 240;
    }
    h = parseInt(String(h));
    s = parseInt(String(s * 100));
    v = parseInt(String(v * 100));
    return [h, s, v];
}

// 参数arr的3个值分别对应[h, s, v]
export const hsv2rgb =(arr) {
    let h = arr[0], s = arr[1], v = arr[2];
    s = s / 100;
    v = v / 100;
    let r = 0, g = 0, b = 0;
    let i = parseInt((h / 60) % 6);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
        default:
            break;
    }
    r = parseInt(r * 255.0);
    g = parseInt(g * 255.0);
    b = parseInt(b * 255.0);
    return `rgb(${r},${g},${b})`;
}
function rgb2hex(color) {
    // RGB颜色值的正则
    var reg = /^(rgb|RGB)/;
    if (reg.test(color)) {
        var strHex = "#";
        // 把RGB的3个数值变成数组
        var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        // 转成16进制
        for (var i = 0; i < colorArr.length; i++) {
            var hex = Number(colorArr[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        return strHex;
    } else {
        return String(color);
    }
};