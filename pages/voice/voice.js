// pages/voice.js


import api from "../../utils/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    voices:[],
    page:1,
    nomore:false
  },
  onLoad: function () {
    this.getVoice();
  },
  getVoice:function(){
    if(this.data.nomore){
      wx.stopPullDownRefresh();
      return;
    }
    api.getVoiceByPage(this.data.page)
    .then(res=>{
      if(res.length == 0){
        this.setData({nomore:true});
      }
      let t = [];
      t.push(...this.data.voices);
      t.push(...res);
      if(this.data.page%2===0){
        t.push({type:"AD"})
      }
      console.log(t);
      this.setData({voices:t,page:this.data.page+1});
      wx.stopPullDownRefresh();
    });
  },
  play(event){
    wx.navigateTo({
      url: '../play/play?voice='+JSON.stringify(event.currentTarget.dataset.voice),
    })
  },
  onPullDownRefresh(){
    this.setData({ page: 1, voices: [], nomore:false});
    this.getVoice();
  },
  onReachBottom(){
    this.getVoice();
  }
})