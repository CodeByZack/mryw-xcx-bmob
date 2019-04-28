// pages/comment.js

import api from '../../utils/api.js';
import Bmob from "../../utils/Bmob-1.6.5.min.js";

Page({
  data: {
    article : {},
    commentList: [],
    inputValue : '',
    showGetUserInfo : false
  },
  onLoad: function (options) {
    let article = getApp().globalData.currentArticle;
    if(article){
      this.setData({article});
      wx.setNavigationBarTitle({
        title: article.title,
      })
      this.getData(article.objectId);
    }
  },
  getData:function(id){
    api.getAllComments(id).then(res=>{
      this.setData({
        commentList : res
      })
    })
  },
  handleSubmit : function(){
    if (this.data.inputValue == "") {
      return;
    }
    let app = getApp();
    console.log(app.globalData.userInfo.nickName);

    if(app.globalData.userInfo.nickName == null){
      this.setData({ showGetUserInfo: true });
      return;
    }

    let comment = {};
    comment.name = app.globalData.userInfo.nickName;
    comment.content = this.data.inputValue;
    comment.articleId = this.data.article.objectId;

    wx.showLoading({
      title: '提交中...',
    })
    api.addComment(comment).then(res=>{
      console.log(res);
      wx.showToast({
        title: '评论成功！',
      })
      this.getData(this.data.article.objectId);
      this.setData({inputValue:""});
    }).catch(err=>{
      wx.showToast({
        title: '评论失败。。。',
      })
      console.log(err);
    });
  },
  bindKeyInput: function(e){
    console.log(e.detail.value);
    this.setData({
      inputValue: e.detail.value
    });
  },
  getUserInfo: function (e) {
    wx.showToast({
      title: '获取成功！',
    })
    Bmob.User.upInfo(e.detail.userInfo).then(res=>{
      getApp().globalData.userInfo = Bmob.User.current();
      console.log(getApp().globalData);
      this.setData({ showGetUserInfo: false });
    });
  }
})