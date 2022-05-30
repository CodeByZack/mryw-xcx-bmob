import { MovableArea, MovableView, Slider, View } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';
import './index.less';
import { hexToRgb, hsv2rgb, rgb2hsv, rgbToHex } from './utils';

interface IProps {
  initialColor: string;
  show: boolean;
  onConfirm: (color: string) => void;
  onCancel?: () => void;
}

interface IContainerInfo {
  W: number;
  H: number;
  Step: number;
  x: number;
  y: number;
}

interface IHSV {
  h?: any;
  s?: any;
  v?: any;
}

const ColorPicker = (props: IProps) => {
  const { initialColor, onConfirm, show, onCancel } = props;

  const [color, setColor] = useState('rgb(0,0,0)');
  const [hueColor, setHueColor] = useState('rgb(0,0,0)');
  const [containerInfo, setContainerInfo] = useState<Partial<IContainerInfo>>(
    {},
  );
  const [hsv, setHSV] = useState<IHSV>({});

  const dataHolder = useRef({ containerInfo });
  dataHolder.current.containerInfo = containerInfo;

  const changeSV = e => {
    let { x, y } = e.detail;
    x = Math.round(x / containerInfo.Step!);
    y = 100 - Math.round(y / containerInfo.Step!);
    const merge = {
      ...hsv,
      s: x,
      v: y,
    };
    setHSV(merge);
    const rgb = hsv2rgb(merge.h, merge.s, merge.v);
    const hex = rgbToHex(rgb);
    setColor(hex);
  };
  const changeHue = e => {
    const hue = e.detail.value;
    const merge = {
      ...hsv,
      h: hue,
    };
    setHSV(merge);
    setHueColor(hsv2rgb(merge.h, 100, 100));

    const rgb = hsv2rgb(merge.h, merge.s, merge.v);
    const hex = rgbToHex(rgb);
    setColor(hex);
  };
  const onEnd = () => {
    console.log(color);
  };
  const doCancel = () => {
    console.log('doCancel');
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };
  const doConfirm = () => {
    if (typeof onConfirm === 'function') {
      onConfirm(color);
    }
  };

  useEffect(() => {
    if (dataHolder.current.containerInfo.Step) {
      const HSV = rgb2hsv(hexToRgb(initialColor || '#000000'));
      const info = { ...dataHolder.current.containerInfo };
      info.x = Math.round(Number(HSV.s) * info.Step!);
      info.y = Math.round((100 - Number(HSV.v)) * info.Step!);
      setContainerInfo(info);
      setHSV(HSV);
    }
  }, [initialColor]);

  useReady(() => {
    const $ = Taro.createSelectorQuery();
    const target = $.select('.color-picker-target');
    target.boundingClientRect();
    $.exec(res => {
      const rect = res[0];
      if (rect) {
        console.log({ rect });
        const HSV = rgb2hsv(hexToRgb(initialColor || '#000000'));
        const info: Partial<IContainerInfo> = {
          W: rect.width - 28, // block-size=28
          H: rect.height - 28,
          Step: (rect.width - 28) / 100,
        };
        info.x = Math.round(Number(HSV.s) * info.Step!);
        info.y = Math.round((100 - Number(HSV.v)) * info.Step!);
        setContainerInfo(info);
        setHSV(HSV);
      }
    });
  });

  return (
    <View
      className="color-picker-container"
      onTouchMove={e => {
        e.stopPropagation();
      }}
      catchMove
    >
      <View className={`${show ? 'picker-show' : ''} color-picker-mask`}></View>
      <View className={`${show ? 'picker-show' : ''} color-picker-wrapper`}>
        <View className="box">
          <MovableArea
            className="color-picker-target"
            style={{
              backgroundColor: hueColor,
            }}
          >
            <MovableView
              direction="all"
              onChange={changeSV}
              x={containerInfo.x}
              y={containerInfo.y}
              onTouchEnd={onEnd}
              style={{
                backgroundColor: color,
              }}
              className="picker-pointer"
            />
          </MovableArea>
        </View>

        <Slider
          className="ribbon"
          onChange={changeHue}
          activeColor="transparent"
          backgroundColor="transparent"
          max={360}
          value={Number(hsv.h)}
          blockColor={color}
          block-size={18}
          onTouchEnd={onEnd}
        />
        <View className="color-picker-btn">
          <View className="color-picker-cancel" onClick={doCancel}>
            取消
          </View>
          <View className="color-picker-confirm" onClick={doConfirm}>
            确认
          </View>
        </View>
      </View>
    </View>
  );
};

export default ColorPicker;
