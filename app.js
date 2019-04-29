//app.js
var Bmob = require('./utils/Bmob-1.6.5.min.js');
Bmob.initialize("818f8d7565f7588990922e937dd3e7c8", "baeecb59d59023ea9a71db006def599a");

App({
  onLaunch: function () {
    let user = Bmob.User.current();
    if( user ){
      console.log(user);
      this.globalData.userInfo = user;
    }else{
      Bmob.User.auth().then(res => {
        this.globalData.userInfo = res;
        console.log(Bmob.User.current());
      }).catch(err => {
        console.log(err)
      });
    }
  },
  globalData: {
    userInfo: null,
    currentArticle : null
  }
})