import { useRef } from 'react';
import { createContainer } from '../lib/unstate-next';
import useUserInfo from './useUserInfo';
import useTheme from './useTheme';
import useTodayArticle from './useTodayArticle';
import useArticleList from './useArticleList';

const useGlobalState = () => {
  const {
    activeVariable,
    toggleDark,
    theme,
    updateUserConfig,
    userConfig,
    resetUserConfig,
  } = useTheme();
  const { userInfo, updateUserInfo } = useUserInfo();
  const indexPage = useTodayArticle();
  const listPage = useArticleList();

  const fns = useRef({
    updateUserInfo,
    toggleDark,
    updateUserConfig,
    resetUserConfig,
  });
  fns.current.toggleDark = toggleDark;
  fns.current.updateUserInfo = updateUserInfo;
  fns.current.updateUserConfig = updateUserConfig;
  fns.current.resetUserConfig = resetUserConfig;

  return {
    activeVariable,
    userInfo,
    userConfig,
    theme,
    indexPage,
    listPage,
    fns: fns.current,
  };
};

const globalStore = createContainer(useGlobalState);
export default globalStore;
