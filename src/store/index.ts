import { useRef } from 'react';
import { createContainer } from '../lib/unstate-next';
import useUserInfo from './useUserInfo';
import useTheme from './useTheme';
import useTodayArticle from './useTodayArticle';

const useGlobalState = () => {
  const { activeVariable, toggleDark } = useTheme();
  const { userInfo, updateUserInfo } = useUserInfo();
  const { article, loading, getRandom, getToday } = useTodayArticle();

  const fns = useRef({ updateUserInfo, toggleDark, getToday, getRandom });
  fns.current.getRandom = getRandom;
  fns.current.getToday = getToday;
  fns.current.toggleDark = toggleDark;
  fns.current.updateUserInfo = updateUserInfo;

  return {
    activeVariable,
    userInfo,
    article,
    loading,
    fns: fns.current,
  };
};

const globalStore = createContainer(useGlobalState);
export default globalStore;
