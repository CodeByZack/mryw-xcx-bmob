
let Bmob = require("./Bmob-1.6.5.min.js");
const Table_Article = "Articles";
const Table_Voice = "Voices";
const Table_Comment = "comments";
const Table_User = "_User";


const countArticle = function () {
  const query = Bmob.Query(Table_Article);
  return query.count();
}

const getTodayArticle = function(){
  const query = Bmob.Query(Table_Article);
  query.order("-updatedAt");
  query.limit(1);
  return query.find();
}

const getRandomArticle = function () {
      return countArticle().then(res => {
        let Rand = Math.random();
        let num = Math.floor(Rand * res); //舍去
        const query = Bmob.Query(Table_Article);
        query.skip(num);
        query.limit(1);
        return query.find();
      });
}

const getArticleById = function (objectId) {
  const query = Bmob.Query(Table_Article);
  query.equalTo("objectId", "==", objectId);
  return query.find();
}

const countVoice = function () {
  const query = Bmob.Query(Table_Voice);
  return query.count();
}

const getTodayVoice = function () {
  const query = Bmob.Query(Table_Voice);
  query.order("-updatedAt");
  query.limit(1);
  return query.find();
}


const getVoiceByPage = function (page,pagesize=6) {
  const query = Bmob.Query(Table_Voice);
  query.order("-updatedAt");
  query.limit(pagesize);
  query.skip(pagesize * (page - 1));
  return query.find();
}

const setUserReadInfo = function(json){
  const query = Bmob.Query(Table_User);
  query.set('id', Bmob.User.current().objectId); //需要修改的objectId
  query.set('readInfo', JSON.stringify(json));
  return query.save();
}

const updateUserInfo = function(){
  return Bmob.User.updateStorage(Bmob.User.current().objectId);
}

const getRandomVoice = function () {
  return countVoice().then(res => {
    let Rand = Math.random();
    let num = Math.floor(Rand * res); //舍去
    const query = Bmob.Query(Table_Voice);
    query.skip(num);
    query.limit(1);
    return query.find();
  });
}



const getAllComments = function (id) {
  const query = Bmob.Query(Table_Comment);
  query.order("-updatedAt");
  query.equalTo("articleId", "==", id);
  return query.find();
}



const addComment = function (comment) {
  const pointer = Bmob.Pointer(Table_Article)
  const poiID = pointer.set(comment.articleId)
  const query = Bmob.Query(Table_Comment);
  query.set("name", comment.name);
  query.set("content", comment.content);
  query.set("articleId", poiID);
  return query.save();
}


export default {
  countArticle,
  getRandomArticle,
  getTodayArticle,
  getVoiceByPage,
  getRandomVoice,
  getAllComments,
  addComment,
  setUserReadInfo,
  updateUserInfo,
  getArticleById
}