import Taro from '@tarojs/taro';
import { IArticle } from './type';

Taro.cloud.init();
const db = Taro.cloud.database({ env: process.env.TARO_APP_COULD_ENV_ID });
export const getTodayArticle = async () => {
    const today = await db.collection("articles").orderBy('updateTime','desc').limit(1).get();
    console.log(today.errMsg);
    return today.data[0] as IArticle;
};

export const getRandomArticle = async () => {
    const random = await db.collection("articles").aggregate().sample({ size : 1 }).end();
    console.log(random);
    return random.list[0] as IArticle;
};

