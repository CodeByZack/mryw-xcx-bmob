import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { updateUserRecord } from '../api';
import { IUserInfo } from '../api/type';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  const getUserInfo = async () => {
    const res = await Taro.cloud.callFunction({ name: 'login' });
    // @ts-ignore
    const _userInfo = res.result?.userInfo as IUserInfo;
    setUserInfo(_userInfo);
  };

  const updateUserInfo = async (user: Partial<IUserInfo>) => {
    const res = await updateUserRecord(userInfo?.openid!, user);
    console.log(res);
    if (res.stats.updated) {
      //@ts-ignore
      setUserInfo({ ...userInfo, ...user });
    }
    return res;
  };

  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      getUserInfo();
    }
  }, []);
  return { userInfo, updateUserInfo };
};

export default useUserInfo;
