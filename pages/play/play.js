// pages/play/play.js
import icon from "../../utils/icon.js";
import util from "../../utils/util.js";
import api from "../../utils/api.js";


Page({
  data: {
    voice:null,
    icons:icon,
    nowIcon:"icon-play",
    playStatus:false,
    processNumber:0,
    currentTime:"00:00",
    totalTime:"00:00",
    duration:0

  },
  onLoad: function (options) {
    console.log(options);
    let data = JSON.parse(options.voice);
    this.setData({voice:data});

  },
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    console.log(this.audioCtx);
  },
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  play(){
    if(this.data.playStatus){
      this.audioPause();
      this.setData({
        playStatus:false,
        nowIcon: "icon-play"
      });
    }else{
      this.audioPlay();
      this.setData({
        playStatus: true,
        nowIcon: "icon-pause"
      });
    }
  },
  update(e){
    let process = (e.detail.currentTime / e.detail.duration)*100;
    
    let tt = util.timeToString(e.detail.duration);
    let ct = util.timeToString(e.detail.currentTime);

    this.setData({
      processNumber:process,
      totalTime:tt,
      currentTime:ct,
      duration:e.detail.duration
    })
  },
  hanle_slider_change(e){
    console.log(e);
    this.audioCtx.seek(e.detail.value/100*this.data.duration);
  },
  randomPlay(){
    api.getRandomVoice()
    .then(res=>{
      console.log(res);
      this.setData({
        nowIcon: "icon-play",
        playStatus: false,
        processNumber: 0,
        currentTime: "00:00",
        totalTime: "00:00",
        duration: 0,
        voice: res[0]
      })
    });

  }
})