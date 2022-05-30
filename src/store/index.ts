import { useRef } from 'react';
import { createContainer } from '../lib/unstate-next';
import useUserInfo from './useUserInfo';
import useTheme from './useTheme';
import useTodayArticle from './useTodayArticle';

const useGlobalState = () => {
  const { activeVariable, toggleDark, theme, updateUserConfig, userConfig, resetUserConfig } = useTheme();
  const { userInfo, updateUserInfo } = useUserInfo();
  const { article, loading, getRandom, getToday } = useTodayArticle();

  const fns = useRef({ updateUserInfo, toggleDark, getToday, getRandom, updateUserConfig, resetUserConfig });
  fns.current.getRandom = getRandom;
  fns.current.getToday = getToday;
  fns.current.toggleDark = toggleDark;
  fns.current.updateUserInfo = updateUserInfo;
  fns.current.updateUserConfig = updateUserConfig;
  fns.current.resetUserConfig = resetUserConfig;

  return {
    activeVariable,
    userInfo,
    userConfig,
    article,
    loading,
    theme,
    fns: fns.current,
  };
};

const globalStore = createContainer(useGlobalState);
export default globalStore;
