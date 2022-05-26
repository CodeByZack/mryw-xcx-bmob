import { Popup, Image, Icon } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import globalStore from '../../../store';

interface IProps {
  drawerOpen: boolean;
  onClose: () => void;
}

const Drawer = (props: IProps) => {
  const { drawerOpen, onClose } = props;

  const { fns } = globalStore.useContainer();

  return (
    <Popup
      show={drawerOpen}
      position="right"
      style={{ height: '100%', width: '60%' }}
      onClose={onClose}
    >
      <View className="drawer">
        <View className="user-info">
          <Image
            round
            className="user-img"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <View className="user-name">username</View>
          <View className="reading-info">
            你已坚持阅读xx天,共计xx篇文章,xx字
          </View>
        </View>
        <View
          className="menu-item"
          onClick={() => {
            fns.toggleDark();
            onClose();
          }}
        >
          切换主题
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
        <View className="menu-item">自定义</View>
        <View className="menu-item">关于</View>
      </View>
    </Popup>
  );
};
export default Drawer;
