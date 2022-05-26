import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';

const useOpenId = () => {
  const [openId, setOpenId] = useState('');
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
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
  }, []);
  return openId;
};

export default useOpenId;
