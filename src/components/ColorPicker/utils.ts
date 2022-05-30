export const rgb2hsv = (color) => {
    let rgb = color.split(',');
    let R = parseInt(rgb[0].split('(')[1]);
    let G = parseInt(rgb[1]);
    let B = parseInt(rgb[2].split(')')[0]);

    let hsv_red = R / 255, hsv_green = G / 255, hsv_blue = B / 255;
    let hsv_max = Math.max(hsv_red, hsv_green, hsv_blue),
        hsv_min = Math.min(hsv_red, hsv_green, hsv_blue);
    let hsv_h, hsv_s, hsv_v = hsv_max;

    let hsv_d = hsv_max - hsv_min;
    hsv_s = hsv_max == 0 ? 0 : hsv_d / hsv_max;

    if (hsv_max == hsv_min) hsv_h = 0;
    else {
        switch (hsv_max) {
            case hsv_red:
                hsv_h = (hsv_green - hsv_blue) / hsv_d + (hsv_green < hsv_blue ? 6 : 0);
                break;
            case hsv_green:
                hsv_h = (hsv_blue - hsv_red) / hsv_d + 2;
                break;
            case hsv_blue:
                hsv_h = (hsv_red - hsv_green) / hsv_d + 4;
                break;
        }
        hsv_h /= 6;
    }
    return {
        h: (hsv_h * 360).toFixed(),
        s: (hsv_s * 100).toFixed(),
        v: (hsv_v * 100).toFixed()
    }
}

export const hsv2rgb = (h: number, s: number, v: number) => {
    let hsv_h = Number((h / 360).toFixed(2));
    let hsv_s = Number((s / 100).toFixed(2));
    let hsv_v = Number((v / 100).toFixed(2));

    var i = Math.floor(hsv_h * 6);
    var f = hsv_h * 6 - i;
    var p = hsv_v * (1 - hsv_s);
    var q = hsv_v * (1 - f * hsv_s);
    var t = hsv_v * (1 - (1 - f) * hsv_s);

    var rgb_r = 0,
        rgb_g = 0,
        rgb_b = 0;
    switch (i % 6) {
        case 0:
            rgb_r = hsv_v;
            rgb_g = t;
            rgb_b = p;
            break;
        case 1:
            rgb_r = q;
            rgb_g = hsv_v;
            rgb_b = p;
            break;
        case 2:
            rgb_r = p;
            rgb_g = hsv_v;
            rgb_b = t;
            break;
        case 3:
            rgb_r = p;
            rgb_g = q;
            rgb_b = hsv_v;
            break;
        case 4:
            rgb_r = t;
            rgb_g = p;
            rgb_b = hsv_v;
            break;
        case 5:
            rgb_r = hsv_v; rgb_g = p; rgb_b = q;
            break;
    }

    return 'rgb(' + (Math.floor(rgb_r * 255) + "," + Math.floor(rgb_g * 255) + "," + Math.floor(rgb_b * 255)) + ')';
}

export const rgbToHex = (rgb : string)=>{
    if(!/^(rgb|RGB)/.test(rgb)){
        return rgb;//如果输入不是rgb(xx,xx,xx)的格式，直接返回
    }
    //参数rgb是字符串形式的'rgb(xx,xx,xx)'
	const color = rgb.toString().match(/\d+/g);//将参数中的数值提取出来放在数组中
    if(!color) return rgb;
    let hex = '#';
    for(var i = 0; i < 3; i++){
        /**
        ** 这里有三个地方需要注意，首先如果转换为16进制以后是个位数，需要前面补0，凑足两个数位
        ** 其次toString(16)转换的前提条件是数值类型，需要Number()
        ** 方法转换，或者使用+转换也可以；最后使用slice(-2)方法取得最后面两个字符，这样可以去掉多余的0
        **/
        if(Number(color[i]) < 0 || Number(color[i]) > 255){//处理值不符合的数值，比如256就直接返回了
            return rgb;
        }
        hex += ('0' + Number(color[i]).toString(16)).slice(-2);
    }
    return hex;
}

export const hexToRgb = (hex : string)=>{
    const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if(reg.test(hex)){
        const color : number[] = [];
        hex = hex.slice(1);
        if(hex.length === 3){
            for(var i = 0; i < 3; i++){
                color[i] = parseInt(hex[i] + hex[i],16);
            }
            return 'rgb(' + color.join(',') + ')';
        }else if(hex.length === 6){
            for(var i = 0;i < 3; i++){
                color[i] = parseInt('0x' + hex.substr(i*2,2));
            }
            return 'rgb(' + color.join(',') + ')';
        }
    }else{
        return hex;
    }
}