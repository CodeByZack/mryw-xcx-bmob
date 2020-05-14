// let videoAd = null;

Page({
  onLoad: function (options) {
    // if (wx.createRewardedVideoAd) {
    //   videoAd = wx.createRewardedVideoAd({
    //     adUnitId: 'adunit-ac2787ec0df97411'
    //   })
    //   videoAd.onLoad(() => { })
    //   videoAd.onError((err) => { })
    //   videoAd.onClose((res) => { wx.showToast({ title: "谢谢您的支持！", icon: "none" }) })
    // }
  },

  showAd: function () {
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
})