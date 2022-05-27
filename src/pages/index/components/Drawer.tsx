import { Popup, Image } from '@antmjs/vantui';
import { Input, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import globalStore from '../../../store';

interface IProps {
  drawerOpen: boolean;
  onClose: () => void;
}

const Drawer = (props: IProps) => {
  const { drawerOpen, onClose } = props;

  const { fns, userInfo, theme } = globalStore.useContainer();

  const getWxUserInfo = async () => {
    if (userInfo?.userAvatar && userInfo.userName) return;
    const res = await Taro.getUserProfile({ desc: '获取微信头像和昵称' });
    console.log(res);
    const { userInfo: wxUserInfo } = res;
    fns.updateUserInfo({
      userAvatar: wxUserInfo.avatarUrl,
      userName: wxUserInfo.nickName,
    });
  };

  return (
    <Popup
      show={drawerOpen}
      position="right"
      style={{ height: '100%', width: '60%' }}
      onClose={onClose}
    >
      <View className="drawer">
        <View className="user-info" onClick={getWxUserInfo}>
          <Image round className="user-img" src={userInfo?.userAvatar || ''} />
          <View className="user-name">{userInfo?.userName}</View>
          <View className="reading-info">
            你已阅读{userInfo?.articleCount || 0}篇文章,共计
            {userInfo?.wordCount || 0}字
          </View>
        </View>
        <View
          className="menu-item"
          onClick={() => {
            fns.toggleDark();
            onClose();
          }}
        >
          {theme === 'dark' ? '夜间模式' : '日间模式'}
        </View>
        <View
          className="menu-item"
          onClick={() => {
            fns.getToday();
            onClose();
          }}
        >
          今日文章
        </View>
        <View className="menu-item">文章列表</View>
        <View
          className="menu-item"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/readingConfig/index',
            });
            onClose();
          }}
        >
          阅读设置
        </View>
        <View className="menu-item">关于</View>
      </View>
    </Popup>
  );
};
export default Drawer;
