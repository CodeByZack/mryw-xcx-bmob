import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';
import BottomNav from './components/BottomNav';
import Drawer from './components/Drawer';
import globalStore from '../../store';

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { activeVariable, article, loading, fns } = globalStore.useContainer();

  const contentJsx = article?.content.split('\n').map((p, i) => (
    <View key={i} className="article-paragraph">
      {p}
    </View>
  ));

  useEffect(() => {
    if (loading) {
      Taro.showLoading({ title: '加载中' });
    } else {
      Taro.hideLoading();
    }
  }, [loading]);

  useEffect(()=>{
    fns.getToday();
  },[])

  return (
    <View className="index-wrapper" style={activeVariable as any}>
      <View className="article-title">{article?.title}</View>
      <View className="article-author">{article?.author}</View>
      <View className="article-content">{contentJsx}</View>
      <View className="article-end">--- 全文完 ---</View>
      <BottomNav
        refresh={fns.getRandom}
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
