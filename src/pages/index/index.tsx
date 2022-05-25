import { useState } from 'react';
import { View } from '@tarojs/components';
import './index.less';
import BottomNav from './components/BottomNav';
import Drawer from './components/Drawer';
import article from '../mock.json';
import globalStore from '../../store';

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { activeVariable } = globalStore.useContainer();

  const contentJsx = article.content.split('\n').map((p, i) => (
    <View key={i} className="article-paragraph">
      {p}
    </View>
  ));

  return (
    <View className="index-wrapper" style={activeVariable as any}>
      <View className="article-title">{article.title}</View>
      <View className="article-author">{article.author}</View>
      <View className="article-content">{contentJsx}</View>
      <View className="article-end">--- 全文完 ---</View>
      <BottomNav
        showDrawer={() => {
          setDrawerOpen(true);
        }}
      />
      <Drawer
        drawerOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
    </View>
  );
};

export default Index;
