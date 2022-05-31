import Taro from '@tarojs/taro';
import { IArticle, IUserInfo } from './type';

// prettier-ignore
const rand = (max: number, min: number) => Math.round(Math.random() * (max - min) + min);
// prettier-ignore
const imgUrl = () => `https://zackdkblog.oss-cn-beijing.aliyuncs.com/meiriyiwen_bg/meiriyiwen_bg/bg_${rand(99,1,)}.jpeg`;

Taro.cloud.init();
const db = Taro.cloud.database({ env: process.env.TARO_APP_COULD_ENV_ID });
export const getTodayArticle = async () => {
  const today = await db
    .collection('articles')
    .orderBy('updateTime', 'desc')
    .limit(1)
    .get();

  let article = today.data[0] as IArticle;
  if (!article.imgUrl) {
    article.imgUrl = imgUrl();
    updateArticle(article._id, { imgUrl: article.imgUrl });
  }

  return article;
};

export const getArticle = async (_id: string) => {
  const res = await db
    .collection('articles')
    .where({ _id })
    .get();
  let article = res.data[0] as IArticle;
  if (!article.imgUrl) {
    article.imgUrl = imgUrl();
    updateArticle(article._id, { imgUrl: article.imgUrl });
  }
  return article;
};

export const updateArticle = async (id: string, article: Partial<IArticle>) => {
  const updateRes = await db
    .collection('articles')
    .where({ _id: id })
    .update({ data: { ...article } });
  console.log(updateRes);
};

export const getRandomArticle = async () => {
  const random = await db
    .collection('articles')
    .aggregate()
    .sample({ size: 1 })
    .end();
  let article = random.list[0] as IArticle;
  if (!article.imgUrl) {
    article.imgUrl = imgUrl();
    updateArticle(article._id, { imgUrl: article.imgUrl });
  }
  return article;
};

export const updateUserRecord = async (
  openid: string,
  userRecord: Partial<IUserInfo>,
) => {
  const updateRes = await db
    .collection('users')
    .where({ openid })
    .update({ data: { ...userRecord } });
  return updateRes;
};

export const queryArticleByPage = async (params: {
  page: number;
  pageSize: number;
}) => {
  const skip = (params.page - 1) * params.pageSize;
  const res: any = await db
    .collection('articles')
    .aggregate()
    .sort({ createTime: -1 })
    .skip(skip)
    .limit(params.pageSize)
    .end();
  console.log(res);
  return res.list as IArticle[];
};
