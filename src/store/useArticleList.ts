import Taro from '@tarojs/taro';
import { useState } from 'react';
import { queryArticleByPage } from '../api';
import { IArticle } from '../api/type';

const useArticle = () => {
  const [articleList, setArticleList] = useState<(IArticle | "AdBlock")[]>([]);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [pageNow, setPage] = useState(1);

  const getList = async () => {
    if (loading) return;
    setLoading(true);
    const list = await queryArticleByPage({
      page: pageNow,
      pageSize: 20,
    });
    if (!list?.length) {
      setNoMore(true);
    }
    setLoading(false);
    setArticleList([...articleList, ...list, "AdBlock"]);
    setPage(pageNow + 1);
  };

  const refresh = async () => {
    setLoading(true);
    Taro.showLoading({ title : "加载中" });
    const list = await queryArticleByPage({
      page: 1,
      pageSize: 20,
    });
    Taro.hideLoading();
    setLoading(false);
    setArticleList([...list]);
    setPage(2);
  };

  return {
    loading,
    articleList,
    noMore,
    pageNow,
    getList,
    refresh,
  };
};

export default useArticle;
