import Taro from "@tarojs/taro";
import qs from "qs";
import { STRAPI_TOKEN } from "./local_config";
import { IArticle, IUserInfo } from "./type";

const rand = (max: number, min: number) =>
  Math.round(Math.random() * (max - min) + min);
const imgUrl = () =>
  `https://zackdkblog.oss-cn-beijing.aliyuncs.com/meiriyiwen_bg/meiriyiwen_bg/bg_${rand(
    99,
    1
  )}.jpeg`;

const BASE_URL = "https://headless.zackdk.com";
// const STRAPI_TOKEN =  process.env.STRAPI_TOKEN;
let MAX_LENGTH = 10;

const http_get = async (url: string) => {
  const res = await Taro.request({
    header: { Authorization: `bearer ${STRAPI_TOKEN}` },
    method: "GET",
    url: `${BASE_URL}${url}`
  });
  const { data, statusCode } = res;
  if (statusCode !== 200) {
    Taro.showToast({ title: data?.error?.message, icon: "none" });
    return null;
  }
  return data;
};

export const getTodayArticle = async () => {
  const query = qs.stringify(
    {
      sort: ["updateTime:desc"],
      pagination: {
        page: 1,
        pageSize: 1
      },
    },
    {
      encodeValuesOnly: true
    }
  );
  const today = await http_get(`/api/posts?${query}`);
  const article = today.data[0].attributes as IArticle;
  MAX_LENGTH = today.meta.pagination.total;
  if (!article.imgUrl) {
    article.imgUrl = imgUrl();
  }
  return { ...article, id: today.data[0].id };
};

export const getArticle = async (id: string) => {
  const result = await http_get(`/api/posts/${id}`);
  const { data } = result;
  return { ...data.attributes, id : data.id };
};

export const updateArticle = async (id: string, article: Partial<IArticle>) => {
  // const updateRes = await db
  //   .collection("articles")
  //   .where({ id: id })
  //   .update({ data: { ...article } });
  // console.log(updateRes);
};

export const getRandomArticle = async () => {
  const index = rand(0, MAX_LENGTH);
  const query = qs.stringify(
    {
      pagination: {
        start: index,
        limit: 1
      },
      sort : ['updateTime:desc']
    },
    {
      encodeValuesOnly: true
    }
  );
  const today = await http_get(`/api/posts?${query}`);
  const article = today.data[0].attributes as IArticle;
  MAX_LENGTH = today.meta.pagination.total;
  if (!article.imgUrl) {
    article.imgUrl = imgUrl();
  }
  return article;
};

export const updateUserRecord = async (
  openid: string,
  userRecord: Partial<IUserInfo>
) => {
  return {};
};

export const queryArticleByPage = async (params: {
  page: number;
  pageSize: number;
}) => {
  const { page, pageSize } = params;
  const query = qs.stringify(
    {
      sort : ['updateTime:desc'],
      pagination: {
        page,
        pageSize
      }
    },
    {
      encodeValuesOnly: true
    }
  );
  const result = await http_get(`/api/posts?${query}`);
  const { meta, data: list } = result;
  const posts = list.map(l => ({ id: l.id, ...l.attributes }));
  MAX_LENGTH = meta.pagination.total;
  console.log({ posts })
  return posts;
};
