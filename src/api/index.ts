import Taro from "@tarojs/taro";
import qs from "qs";
import { IArticle, IUserInfo } from "./type";

// prettier-ignore
const rand = (max: number, min: number) => Math.round(Math.random() * (max - min) + min);
// prettier-ignore
const imgUrl = () => `https://zackdkblog.oss-cn-beijing.aliyuncs.com/meiriyiwen_bg/meiriyiwen_bg/bg_${rand(99,1,)}.jpeg`;

const BASE_URL = "https://headless.zackdk.com";
// todo 从 ENV 读取
const STRAPI_TOKEN =
  "37945d7faa3fabbd583a80afa46e45714c2fb05386bd44e427dbad5cedb8ec669895777c26a2f130fefd2a3b5d6fa86f39ba94356a7683928d7a31607b5cdc14d2919beca2aa130614a06b97e34b11b5457e2b1c6a2eb177f3558cff2917aa691ad1f736d74552d5fe1fb7cd1fd328a18614b4d40ef99d3d89c2802fbfc44b1a";

let MAX_LENGTH = 10;

const http_get = (
  url: string
  // options?: Parameters<typeof Taro.request>["0"]
) => {
  return Taro.request({
    header: { Authorization: `bearer ${STRAPI_TOKEN}` },
    method: "GET",
    url: `${BASE_URL}${url}`,
  });
};

export const getTodayArticle = async () => {
  const query = qs.stringify(
    {
      sort: ["createTime"],
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const today = await http_get(`/api/posts?${query}`);
  const article = today.data.data[0].attributes as IArticle;
  MAX_LENGTH = today.data.meta.pagination.total;
  if (!article.imgUrl) {
    article.imgUrl = imgUrl();
    // updateArticle(article._id, { imgUrl: article.imgUrl });
  }
  return article;
};

export const getArticle = async (_id: string) => {
  // const res = await db.collection("articles").where({ _id }).get();
  // let article = res.data[0] as IArticle;
  // if (!article.imgUrl) {
  //   article.imgUrl = imgUrl();
  //   updateArticle(article._id, { imgUrl: article.imgUrl });
  // }
  return {};
};

export const updateArticle = async (id: string, article: Partial<IArticle>) => {
  // const updateRes = await db
  //   .collection("articles")
  //   .where({ _id: id })
  //   .update({ data: { ...article } });
  // console.log(updateRes);
};

export const getRandomArticle = async () => {
  const index = rand(0, MAX_LENGTH);
  const query = qs.stringify(
    {
      pagination: {
        start: index,
        limit: 1,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const today = await http_get(`/api/posts?${query}`);
  const article = today.data.data[0].attributes as IArticle;
  MAX_LENGTH = today.data.meta.pagination.total;
  if (!article.imgUrl) {
    article.imgUrl = imgUrl();
    // updateArticle(article._id, { imgUrl: article.imgUrl });
  }
  return article;
};

export const updateUserRecord = async (
  openid: string,
  userRecord: Partial<IUserInfo>
) => {
  // const updateRes = await db
  //   .collection('users')
  //   .where({ openid })
  //   .update({ data: { ...userRecord } });
  return {};
};

export const queryArticleByPage = async (params: {
  page: number;
  pageSize: number;
}) => {
  // const skip = (params.page - 1) * params.pageSize;
  // const res: any = await db
  //   .collection("articles")
  //   .aggregate()
  //   .sort({ createTime: -1 })
  //   .skip(skip)
  //   .limit(params.pageSize)
  //   .end();
  // console.log(res);
  return [];
};
