import { useState } from 'react';
import { getRandomArticle, getTodayArticle } from '../api';
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

  return {
    article,
    loading,
    getToday,
    getRandom,
  };
};

export default useArticle;
