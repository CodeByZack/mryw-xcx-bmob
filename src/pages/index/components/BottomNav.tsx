import { Icon } from '@antmjs/vantui';
import { View } from '@tarojs/components';

interface IProps {
  refresh?: () => void;
  showDrawer?: () => void;
}

const BottomNav = (props: IProps) => {
  const { refresh, showDrawer } = props;
  return (
    <View className="bottom-nav">
      <Icon onClick={refresh} classPrefix="iconfont" name="shuaxin" size="50" />
      <Icon
        onClick={showDrawer}
        classPrefix="iconfont"
        name="caidan"
        size="50"
      />
    </View>
  );
};
export default BottomNav;
