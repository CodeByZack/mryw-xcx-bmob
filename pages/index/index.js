//index.js
//获取应用实例
const app = getApp()
import api from "../../utils/api.js";
import util from "../../utils/util.js";

// let videoAd = null;
Page({
  data: {
    rotateClass: "",
    article: {
      title: "",
      content: ""
    },
    sider: {
      width: '-500rpx',
      status: 'none'
    },
    shouldCount: true,
    readInfo: {
      wordCounts: 0,
      postCounts: 0
    },
    windowHeight : wx.getSystemInfoSync().windowHeight,
    scrollTop: 0,
    isFirstLoadData: true
  },
  onLoad: function (options) {
    console.log(options);
    if(options.objectId){
      this.getArticle(options.objectId);
    }else{
      this.getToDay();
    }
    wx.showShareMenu();
    this.setReadInfoLocal();
    // if (wx.createRewardedVideoAd) {
    //   videoAd = wx.createRewardedVideoAd({
    //     adUnitId: 'adunit-ac2787ec0df97411'
    //   })
    //   videoAd.onLoad(() => { })
    //   videoAd.onError((err) => { })
    //   videoAd.onClose((res) => { wx.showToast({ title: "谢谢您的支持！", icon: "none" }) })
    // }
  },
  setReadInfoLocal: function () {
    let userInfo = app.globalData.userInfo;
    if (userInfo && userInfo.readInfo) {
      let info = JSON.parse(userInfo.readInfo);
      this.setData({
        readInfo: info
      });
    }
  },
  getArticle: function (objectId) {
    wx.showLoading({
      title: '获取文章中...'
    });
    api.getArticleById(objectId)
      .then(res => {
        let article = res[0];
        article.content = util.trim(article.content);
        this.setArticle(article);
        wx.hideLoading();
      });
  },
  getToDay: function () {
    wx.showLoading({
      title: '获取文章中...'
    });
    api.getTodayArticle()
      .then(res => {
        let article = res[0];
        article.content = util.trim(article.content);
        this.setArticle(article);
        wx.hideLoading();
      });
    this.hideSlider();
  },
  getRandom: function () {
    this.setData({
      rotateClass: 'box-animation'
    });
    api.getRandomArticle().then(res => {
      let article = res[0];
      article.content = util.trim(article.content);
      this.setArticle(article);
    })
  },
  setArticle(article) {
    wx.showToast({
      title: article.title,
      icon: 'none'
    });
    this.setData({
      article: article,
      rotateClass: '',
      scrollTop: 0
    });
    let app = getApp();
    app.globalData.currentArticle = article;
    this.setData({
      shouldCount: true
    });
    wx.pageScrollTo({
      scrollTop: 0
    });
  },
  showSlider: function () {
    let _sider = {
      width: '0rpx',
      status: 'block'
    }
    this.setData({
      sider: _sider
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
  showComments: function () {
    wx.navigateTo({
      url: '../comment/comment'
    })
    this.hideSlider();
  },
  showAbout: function () {
    wx.navigateTo({
      url: '../about/about'
    })
    this.hideSlider();
  },
  showAd: function () {
    // this.hideSlider();
    // if (videoAd) {
    //   videoAd.show().catch(() => {
    //     // 失败重试
    //     videoAd.load()
    //       .then(() => videoAd.show())
    //       .catch(err => {
    //       })
    //   })
    // }
  },
  showVoice: function () {
    wx.navigateTo({
      url: '../voice/voice'
    })
    this.hideSlider();
  },
  setReadInfo: function (info) {
    api.setUserReadInfo(info).then(res => {
      this.setData({
        shouldCount: false
      });
      api.updateUserInfo().then(res => {
        app.globalData.userInfo = res;
        this.setReadInfoLocal();
      })
    })
  },
  lower(e) {
    const { windowHeight, shouldCount } = this.data;
    if(!shouldCount)return;
    const { scrollHeight, scrollTop  } = e.detail;
    if(scrollHeight - scrollTop - windowHeight > 300)return;
    let userInfo = app.globalData.userInfo;
    this.setData({
      shouldCount: false
    });
    if (userInfo) {
      let info;
      if (userInfo.readInfo) {
        info = JSON.parse(userInfo.readInfo);
      } else {
        info = {
          wordCounts: 0,
          postCounts: 0
        };
      }
      info.wordCounts += this.data.article.content.length;
      info.postCounts += 1;
      this.setReadInfo(info);
    }
  },
  onShareAppMessage(){
    const { article } = this.data;
    return {
      title: `每日一文-${article.title}`,
      path: `pages/index/index?objectId=${article.objectId}`
    }
  }
})