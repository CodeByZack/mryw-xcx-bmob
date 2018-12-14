// pages/voice.js


import api from "../../utils/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    voices:[{},{},{}],
    page:1
  },
  onLoad: function () {
    this.getVoice();
  },
  getVoice:function(){
    api.getVoiceByPage(this.data.page)
    .then(res=>{
      console.log(res);
      this.setData({voices:res,page:this.data.page+1});
    });
  }
})