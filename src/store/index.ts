import { createContainer } from '../lib/unstate-next';
import useOpenId from './useOpenId';
import useTheme from './useTheme';
import useTodayArticle from './useTodayArticle';

const useGlobalState = () => {
  const theme = useTheme();
  const openId = useOpenId();
  const articleTool = useTodayArticle();

  return {
    activeVariable: theme.activeVariable,
    openId,
    article: articleTool.article,
    loading: articleTool.loading,
    fns: {
      toggleDark: theme.toggleDark,
      getToday: articleTool.getToday,
      getRandom: articleTool.getRandom,
    },
  };
};

const globalStore = createContainer(useGlobalState);
export default globalStore;
