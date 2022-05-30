import Taro from '@tarojs/taro';
import { useState } from 'react';

export interface ICssVariable {
  /** 标题文字大小 */
  '--titleFontSize': string;
  /** 作者文字大小 */
  '--authorFontSize': string;
  /** 内容文字大小 */
  '--contentFontSize': string;
  /** 内容行高 */
  '--contentLineHeight': string;
  /** 文章文字颜色 */
  '--articleTextColor': string;
  /** 文章背景颜色 */
  '--articleBgColor': string;
  /** 全局文字颜色 */
  '--textColor': string;
  /** 全局背景颜色 */
  '--bgColor': string;
  /** 分割线颜色 */
  '--dividerColor': string;
}

export type IUserConfig = Pick<
  ICssVariable,
  | '--articleBgColor'
  | '--articleTextColor'
  | '--authorFontSize'
  | '--titleFontSize'
  | '--contentFontSize'
  | '--contentLineHeight'
>;

const LIGHT_CSS_VARIABLE: ICssVariable = {
  '--articleBgColor': '#fff',
  '--articleTextColor': '#181818',
  '--bgColor': '#fff',
  '--dividerColor': '#d9d9d9',
  '--textColor': '#181818',
  '--titleFontSize': '32px',
  '--authorFontSize': '16px',
  '--contentFontSize': '20px',
  '--contentLineHeight': '1.5',
};

const DARK_CSS_VARIABLE: ICssVariable = {
  '--articleBgColor': '#000',
  '--articleTextColor': '#fff',
  '--bgColor': '#000',
  '--dividerColor': '#333',
  '--textColor': '#fff',
  '--titleFontSize': '32px',
  '--authorFontSize': '16px',
  '--contentFontSize': '20px',
  '--contentLineHeight': '1.5',
};

const useTheme = () => {
  const [activeVariable, setActiveVariable] = useState(LIGHT_CSS_VARIABLE);
  const [userConfig, setUserConfig] = useState<{
    dark: IUserConfig;
    light: IUserConfig;
  }>({ dark: DARK_CSS_VARIABLE, light: LIGHT_CSS_VARIABLE });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleDark = () => {
    if (theme === 'light') {
      setTheme('dark');
      setActiveVariable(DARK_CSS_VARIABLE);
      Taro.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: DARK_CSS_VARIABLE['--bgColor'],
        animation: {
          duration: 500,
          timingFunc: 'easeInOut',
        },
      });
      Taro.setBackgroundColor({
        backgroundColor: DARK_CSS_VARIABLE['--bgColor'],
      });
      return;
    }
    setTheme('light');
    setActiveVariable(LIGHT_CSS_VARIABLE);
    Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: LIGHT_CSS_VARIABLE['--bgColor'],
      animation: {
        duration: 500,
        timingFunc: 'easeInOut',
      },
    });
    Taro.setBackgroundColor({
      backgroundColor: LIGHT_CSS_VARIABLE['--bgColor'],
    });
  };

  const updateUserConfig = (config: Partial<IUserConfig>) => {
    if (theme === 'dark') {
      const newConfig = {
        ...userConfig,
        dark: config,
      };
      setUserConfig(newConfig as any);
    } else {
      const newConfig = {
        ...userConfig,
        light: config,
      };
      setUserConfig(newConfig as any);
    }
  };

  const resetUserConfig = () => {
    setUserConfig({
      dark: DARK_CSS_VARIABLE,
      light: LIGHT_CSS_VARIABLE,
    });
  };

  return {
    activeVariable: {
      ...activeVariable,
      ...userConfig[theme],
    },
    toggleDark,
    userConfig,
    updateUserConfig,
    resetUserConfig,
    theme,
  };
};

export default useTheme;
