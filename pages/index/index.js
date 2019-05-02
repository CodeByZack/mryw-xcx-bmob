//index.js
//获取应用实例
const app = getApp()

import api from "../../utils/api.js";
import util from "../../utils/util.js";

Page({
  data: {
    rotateClass: "",
    article:{
      title:"",
      content:""
    },
    sider:{
      width:'-500rpx',
      status:'none'
    },
    shouldCount : true,
    readInfo:{ wordCounts:0,postCounts:0 },
    scrollTop : 0 ,
    isFirstLoadData : true
  },
  onLoad: function () {
    this.setReadInfoLocal();
    this.getToDay();
  },
  setReadInfoLocal:function(){
    let userInfo = app.globalData.userInfo;
    if (userInfo && userInfo.readInfo) {
      let info = JSON.parse(userInfo.readInfo);
      this.setData({ readInfo: info });
    }
  },
  getToDay: function(){
    wx.showLoading({ title: '获取文章中...' });
    api.getTodayArticle()
    .then(res=>{
      let article = res[0];
      article.content = util.trim(article.content);
      this.setArticle(article);
      wx.hideLoading();
    });
    this.hideSlider();
  },
  getRandom:function(){
    this.setData({rotateClass:'box-animation'});
    api.getRandomArticle().then(res => {
      let article = res[0];
      article.content = util.trim(article.content);
      this.setArticle(article);
    })    
  },
  setArticle(article){
    wx.showToast({
      title: article.title, icon: 'none'
    });
    this.setData({ article: article,rotateClass:'',scrollTop:0 });
    let app = getApp();
    app.globalData.currentArticle = article;
    this.setData({ shouldCount: true });
    wx.pageScrollTo({
      scrollTop: 0
    });
  },
  showSlider:function(){
    let _sider = {
      width : '0rpx',
      status : 'block'
    }
    this.setData({
      sider:_sider
    })
    
  },
  hideSlider: function () {
    let _sider = {
      width: '-500rpx',
      status: 'none'
    }
    this.setData({
      sider: _sider
    })
  },
  showComments:function(){
    wx.navigateTo({
      url: '../comment/comment'
    })
    this.hideSlider();
  },
  showAbout:function(){
    wx.navigateTo({
      url: '../about/about'
    })
    this.hideSlider();
  },
  showVoice:function(){
    wx.navigateTo({
      url: '../voice/voice'
    })
    this.hideSlider();
  },
  setReadInfo:function(info){
    api.setUserReadInfo(info).then(res=>{
      console.log(res);
      this.setData({shouldCount:false});
      api.updateUserInfo().then(res=>{
        console.log(res);
        app.globalData.userInfo = res;
        this.setReadInfoLocal();
      })
    })
  },
  lower(e) {
    if(this.data.shouldCount){
      let userInfo = app.globalData.userInfo;
      if(userInfo){
        let info;
        if(userInfo.readInfo){
          info = JSON.parse(userInfo.readInfo);
        }else{
          info = { wordCounts:0,postCounts:0 };
        }
        info.wordCounts += this.data.article.content.length;
        info.postCounts += 1;
        this.setReadInfo(info);
      }else{
        console.log("未同步到服务器。。。");
      }
    }
  }
})
