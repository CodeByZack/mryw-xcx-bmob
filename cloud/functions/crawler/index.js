const temme = require('temme').default;
const axios = require('axios');
const dayjs = require('dayjs');
const cloud = require('wx-server-sdk');
const MEIRIYIWEN = 'https://meiriyiwen.com/';

const fetch = async () => {
  const html = await axios.get(MEIRIYIWEN);
  const selector = `h1{$title};p.article_author{$author};div.article_text{$content};`;
  const res = temme(html.data, selector);
  //   res.content = res.content.replace(/\s/g, '');
  return res;
};
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
exports.main = async () => {
  const article = await fetch();

  const oldArticles = await db
    .collection('articles')
    .where({ title: article.title })
    .get();
  const oldArticle = oldArticles.data[0];

  const dateStr = dayjs().format('YYYY-MM-DD HH:mm:ss');

  if (oldArticle) {
    console.log(`${dateStr} 已存在 ${article.title}/${article.author}`);
    return;
  }

  const imgUrlRes = await axios.get(
    'https://bing.biturl.top/?resolution=1366&format=json&index=0&mkt=zh-CN',
  );

  const insertRes = await db.collection('articles').add({
    data: {
      title: article.title,
      author: article.author,
      content: article.content,
      createTime: dateStr,
      updateTime: dateStr,
      imgUrl: imgUrlRes.data.copyright_link || '', //todo 获取随机图片
    },
  });

  if (insertRes._id) {
    console.log(`${dateStr} 添加 ${article.title}/${article.author} 成功！`);
  }
};
