import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { createContainer } from '../lib/unstate-next';

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
}

const LIGHT_CSS_VARIABLE: ICssVariable = {
  '--articleBgColor': '#fff',
  '--articleTextColor': '#181818',
  '--bgColor': '#fff',
  '--textColor': '#181818',
  '--titleFontSize': '32px',
  '--authorFontSize': '16px',
  '--contentFontSize': '20px',
  '--contentLineHeight': '1.8',
};

const DARK_CSS_VARIABLE: ICssVariable = {
  '--articleBgColor': '#000',
  '--articleTextColor': '#fff',
  '--bgColor': '#000',
  '--textColor': '#fff',
  '--titleFontSize': '32px',
  '--authorFontSize': '16px',
  '--contentFontSize': '20px',
  '--contentLineHeight': '1.8',
};

let day = 0

const getStr = ()=>{
  const str =  dayjs().subtract(day,'day').format('YYYY-MM-DD HH:mm:ss');
  day++;
  return str;
};

const useGlobalState = () => {
  const [activeVariable, setActiveVariable] = useState(LIGHT_CSS_VARIABLE);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [openId, setOpenId] = useState('');

  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
      Taro.cloud
        .callFunction({
          name: 'login',
        })
        .then((res: any) => {
          console.log(res);
          setOpenId(res.result.unionid);
        })
        .catch(err => {
          console.log(err);
        });
    }
    getTodayArticle()
  }, []);

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
  };



  const getTodayArticle = async () => {
    const db = Taro.cloud.database({ env : process.env.TARO_APP_COULD_ENV_ID })
  
    const res = await db.collection("articles").limit(1000).get();
    // const res = await db.collection("articles").aggregate().addFields({ createTime : getStr() }).end();
    console.log(res);
  };

  return { activeVariable, openId, fns: { toggleDark } };
};

const globalStore = createContainer(useGlobalState);
export default globalStore;
