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
      wx.showToast({
        title: article.title,icon:'none'
      });
      this.setData({article:article});
    });
    wx.stopPullDownRefresh();
  },
  getRandom:function(){
    this.setData({rotateClass:'box-animation'});
    api.getRandomArticle().then(res => {
      let article = res[0];
      article.content = util.trim(article.content);
      wx.showToast({
        title: article.title,icon:'none'
      })
      this.setData({ article: article,rotateClass:'' });
      wx.pageScrollTo({
        scrollTop: 0
      });
      wx.stopPullDownRefresh();
    })    
  },
  onPullDownRefresh(){
    this.getToDay();
  }
})
