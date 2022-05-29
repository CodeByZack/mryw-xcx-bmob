import { MovableArea, MovableView, Slider, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useReady } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import mask from './ColorPickerMask.png';
import './index.less';

interface IProps {
    color: string;
    show: boolean;
    onChange: (color: string) => void;
};

interface IContainerInfo {
    W: number,
    H: number,
    Step: number,
    x: number,
    y: number
}

interface IHSV {
    h?: any,
    s?: any,
    v?: any
}

const rgb2hsv = (color) => {
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
const hsv2rgb = (h: number, s: number, v: number) => {
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
            rgb_r = hsv_v, rgb_g = p, rgb_b = q;
            break;
    }

    return 'rgb(' + (Math.floor(rgb_r * 255) + "," + Math.floor(rgb_g * 255) + "," + Math.floor(rgb_b * 255)) + ')';
}

const ColorPicker = (props: IProps) => {

    // const { color, onChange, show } = props;

    const [color, setColor] = useState('rgb(0,0,0)');
    const [hueColor, setHueColor] = useState('rgb(0,0,0)');
    const [containerInfo, setContainerInfo] = useState<Partial<IContainerInfo>>({});
    const [hsv, setHSV] = useState<IHSV>({});



    const changeSV = (e) => {
        let { x, y } = e.detail;
        x = Math.round(x / containerInfo.Step!);
        y = 100 - Math.round(y / containerInfo.Step!);
        const merge = {
            ...hsv,
            s: x,
            v: y
        };
        setHSV(merge);
        setColor(hsv2rgb(merge.h, merge.s, merge.v));
    };
    const changeHue = (e) => {
        const hue = e.detail.value;
        const merge = {
            ...hsv,
            h: hue
        };
        setHSV(merge);
        setHueColor(hsv2rgb(merge.h, 100, 100));
        setColor(hsv2rgb(merge.h, merge.s, merge.v));
    };
    const onEnd = () => { console.log(color) };

    useEffect(() => {

    }, [color]);


    useReady(() => {
        const $ = Taro.createSelectorQuery()
        const target = $.select('.color-picker-target')
        target.boundingClientRect()
        $.exec((res) => {
            const rect = res[0]
            if (rect) {
                const HSV = rgb2hsv(color);
                const containerInfo: Partial<IContainerInfo> = {
                    W: rect.width - 28, // block-size=28
                    H: rect.height - 28,
                    Step: (rect.width - 28) / 100,
                };
                containerInfo.x = Math.round(Number(HSV.s) * containerInfo.Step!);
                containerInfo.y = Math.round((100 - Number(HSV.v)) * containerInfo.Step!);
                setContainerInfo(containerInfo);
                setHSV(HSV);
            }
        })
    });


    return (
        <View className="color-picker-wrapper">
            <View className="color-picker-mask"></View>
            <MovableArea className="color-picker-target" style={{
                backgroundColor: hueColor,
                backgroundImage : `url(${mask})`
            }}>
                <MovableView direction="all" onChange={changeSV} x={containerInfo.x} y={containerInfo.y} onTouchEnd={onEnd} className="picker-pointer" />
            </MovableArea>
            <Slider className="ribbon" onChange={changeHue} activeColor="transparent" backgroundColor="transparent" max={360} value={Number(hsv.h)} blockColor={color} onTouchEnd={onEnd} />
        </View>
    );
}
export default ColorPicker;