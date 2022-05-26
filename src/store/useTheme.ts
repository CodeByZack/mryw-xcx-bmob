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
  return {
    activeVariable,
    toggleDark,
  };
};

export default useTheme;
