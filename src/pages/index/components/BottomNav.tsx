import { Icon } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import globalStore from '../../../store';

interface IProps {
  refresh?: () => void;
  showDrawer?: () => void;
}

const BottomNav = (props: IProps) => {
  const { refresh, showDrawer } = props;

  const { loading } = globalStore.useContainer(); 

  return (
    <View className="bottom-nav">
      <Icon className={loading ? "rotate" : ""} onClick={refresh} classPrefix="iconfont" name="shuaxin" size="50" />
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
