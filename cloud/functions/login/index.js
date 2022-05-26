// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk');
const dayjs = require('dayjs');

const randomStr = () =>
  Math.random()
    .toString(36)
    .slice(-4);

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async event => {
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const res = await db
    .collection('users')
    .where({ openid })
    .get();
  let data = res.data[0];
  // 不存在就新增
  if (!data) {
    const timeStr = dayjs().format('YYYY-MM-DD HH:mm:ss');
    data = {
      openid,
      userName: `用户${randomStr()}`,
      userAvatar: '',
      createTime: timeStr,
      updateTime: timeStr,
      wordCount: 0,
      articleCount: 0,
    };
    const addRes = await db.collection('users').add({ data });
    console.log(addRes);
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
    userInfo: data,
  };
};
