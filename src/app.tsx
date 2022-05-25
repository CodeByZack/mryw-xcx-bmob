import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import store from './store/index';
import './iconfont/index.css';

const App: React.FC = ({ children }) => {
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
    }
  }, []);

  return (
    <store.Provider>
      <View>{children}</View>
    </store.Provider>
  );
};

export default App;
