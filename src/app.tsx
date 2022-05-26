import { View } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import store from './store/index';
import './iconfont/index.css';

const App: React.FC = ({ children }) => {
  useReady(() => {
  });
  return (
    <store.Provider>
      <View>{children}</View>
    </store.Provider>
  );
};

export default App;
