import { useState } from 'react';
import {
  getArticle,
  getRandomArticle,
  getTodayArticle,
  updateArticle,
} from '../api';
import { IArticle } from '../api/type';

const useArticle = () => {
  const [article, setArticle] = useState<IArticle>();
  const [loading, setLoading] = useState(false);

  const getToday = async () => {
    setLoading(true);
    const today = await getTodayArticle();
    setLoading(false);
    setArticle(today);
  };

  const getRandom = async () => {
    setLoading(true);
    const random = await getRandomArticle();
    setLoading(false);
    setArticle(random);
  };

  const updateArticleInfo = (a: Partial<IArticle>) => {
    updateArticle(article?._id!, a);
  };

  const getArticleById = async (_id: string) => {
    setLoading(true);
    const random = await getArticle(_id);
    setLoading(false);
    setArticle(random);
  };

  return {
    article,
    loading,
    getToday,
    getRandom,
    getArticleById,
    updateArticleInfo,
  };
};

export default useArticle;
