/* eslint-disable react/jsx-boolean-value */
import { Slider } from '@antmjs/vantui';
import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import ColorPicker from '../../components/ColorPicker';
import { ICssVariable } from '../../store/useTheme';
import globalStore from '../../store';
import './index.less';

interface IProps {}

const ReadingConfig = (props: IProps) => {
  const { activeVariable, fns, userConfig, theme } = globalStore.useContainer();
  const [cpConfig, setCpConfig] = useState({
    show: false,
    key: '',
    nowColor: '',
  });
  const nowConfig = userConfig[theme];

  const handleChange = (key: keyof ICssVariable) => v => {
    console.log(v);
    const merge = { ...nowConfig, [key]: v.detail };
    fns.updateUserConfig(merge);
  };

  return (
    <View className="read-config-wrapper" style={activeVariable as any}>
      <View className="preview-box">
        <View>
          <Text className="title">预览区域</Text>
          <Text className="author">风小词</Text>
        </View>
        <View className="content">
          心碎成花，孤单的吟唱陪我到天涯，人间无话，灯光暗哑，流离的梦境又何必挣扎，星月落下，更替一场虚华，只是，阳光满满的心里啊，怎么也寻不到家。。。
        </View>
      </View>
      <View className="user-config">
        <View className="line">
          <View className="label">颜色设置:</View>
          <View
            className="textBox"
            onClick={() => {
              setCpConfig({
                show: true,
                key: '--articleTextColor',
                nowColor: activeVariable['--articleTextColor'],
              });
            }}
          ></View>
          <View
            className="bgBox"
            onClick={() => {
              setCpConfig({
                show: true,
                key: '--articleBgColor',
                nowColor: activeVariable['--articleBgColor'],
              });
            }}
          ></View>
        </View>
        <View className="line">
          <View className="label">内容字间距:</View>
          <Slider
            className="slider"
            value={parseFloat(nowConfig['--contentLineHeight'])}
            min={1}
            max={3}
            step={0.1}
            onChange={handleChange('--contentLineHeight')}
          />
        </View>
        <View className="line">
          <View className="label">标题字体大小:</View>
          <Slider
            className="slider"
            value={parseFloat(nowConfig['--titleFontSize'])}
            min={10}
            max={40}
            onChange={handleChange('--titleFontSize')}
          />
        </View>
        <View className="line">
          <View className="label">作者字体大小:</View>
          <Slider
            className="slider"
            value={parseFloat(nowConfig['--authorFontSize'])}
            min={10}
            max={40}
            onChange={handleChange('--authorFontSize')}
          />
        </View>
        <View className="line">
          <View className="label">内容字体大小:</View>
          <Slider
            className="slider"
            value={parseFloat(nowConfig['--contentFontSize'])}
            min={10}
            max={40}
            onChange={handleChange('--contentFontSize')}
          />
        </View>
        <View className="line">
          <View className="btn" onClick={fns.resetUserConfig}>
            恢复默认值
          </View>
        </View>
      </View>
      <ColorPicker
        initialColor={cpConfig.nowColor}
        show={cpConfig.show}
        onConfirm={(color: string) => {
          handleChange(cpConfig.key as keyof ICssVariable)({
            detail: color,
          });
          setCpConfig({ show: false, key: '', nowColor: '' });
        }}
        onCancel={() => {
          setCpConfig({ show: false, key: '', nowColor: '' });
        }}
      />
    </View>
  );
};

export default ReadingConfig;
