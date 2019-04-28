// pages/comment.js

import api from '../../utils/api.js'

Page({
  data: {
    article : {},
    commentList: [],
    inputValue : ''
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
  onReachBottom: function () {

  },
  handleSubmit : function(){
    let comment = {};
    comment.name = "随机名字";
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
  }
})