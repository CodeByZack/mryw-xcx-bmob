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
    }
  },
  onLoad: function () {
   this.getToDay();
  },
  getToDay: function(){
    api.getTodayArticle()
    .then(res=>{
      let article = res[0];
      article.content = util.trim(article.content);
      this.setArticle(article);
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
    this.setData({ article: article,rotateClass:'' });
    let app = getApp();
    app.globalData.currentArticle = article;
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
  onReachBottom:function(){
    console.log("-----")
  }
})
