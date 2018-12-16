// pages/play/play.js
import icon from "../../utils/icon.js";
import util from "../../utils/util.js";
Page({
  data: {
    voice:null,
    icons:icon,
    nowIcon:icon.playIcon,
    playStatus:false,
    processNumber:0,
    currentTime:"00:00",
    totalTime:"00:00"

  },
  onLoad: function (options) {
    console.log(options);
    let data = JSON.parse(options.voice);
    this.setData({voice:data});

  },
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
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
        nowIcon: icon.playIcon
      });
    }else{
      this.audioPlay();
      this.setData({
        playStatus: true,
        nowIcon: icon.pauseIcon
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
      currentTime:ct
    })
  }
})