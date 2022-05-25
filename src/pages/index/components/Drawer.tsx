import { Popup } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import globalStore from '../../../store';

interface IProps {
  drawerOpen: boolean;
  onClose?: () => void;
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
      <View
        className="drawer"
        onClick={() => {
          fns.toggleDark();
        }}
      >
        切换颜色
      </View>
    </Popup>
  );
};
export default Drawer;
