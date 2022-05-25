import { View } from '@tarojs/components';
import store from './store/index';
import './iconfont/index.css';

const App: React.FC = ({ children }) => {
  return (
    <store.Provider>
      <View>{children}</View>
    </store.Provider>
  );
};

export default App;
