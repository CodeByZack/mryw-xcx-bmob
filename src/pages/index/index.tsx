import { useEffect, useRef, useState } from 'react';
import Taro, {
  useReachBottom,
  useRouter,
  useShareAppMessage,
} from '@tarojs/taro';
import { Image } from '@antmjs/vantui';
import { Button, View } from '@tarojs/components';
import './index.less';
import BottomNav from './components/BottomNav';
import Drawer from './components/Drawer';
import globalStore from '../../store';
import GenerateImg, { IGenerateImgRef } from '../../components/GenerateImg';

let currentIsReachBottom = false;

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const GenerateImgRef = useRef<IGenerateImgRef>(null);
  const {
    activeVariable,
    fns,
    userInfo,
    theme,
    indexPage,
  } = globalStore.useContainer();
  const { params } = useRouter();
  const {
    article,
    loading,
    getArticleById,
    getToday,
    updateArticleInfo,
    getRandom,
  } = indexPage;

  const contentJsx = article?.content.split('\n').map((p, i) => (
    <View key={i} className="article-paragraph">
      {p}
    </View>
  ));

  useEffect(() => {
    if (loading) {
      Taro.showLoading({ title: '加载中' });
      currentIsReachBottom = false;
    } else {
      Taro.pageScrollTo({ scrollTop: 0, duration: 300 });
      Taro.hideLoading();
    }
  }, [loading]);

  useEffect(() => {
    if (params.id) {
      getArticleById(params.id);
    } else {
      getToday();
    }
  }, [params?.id]);

  useReachBottom(() => {
    if (currentIsReachBottom) return;
    if (!userInfo) return;
    if (!article) return;
    currentIsReachBottom = true;
    console.log('reach bottom');
    fns.updateUserInfo({
      articleCount: userInfo.articleCount + 1,
      wordCount: userInfo.wordCount + article?.content.length,
    });
    updateArticleInfo({ readCount: (article.readCount || 0) + 1 });
  });

  useEffect(() => {
    Taro.setNavigationBarColor({
      frontColor: theme === 'dark' ? '#ffffff' : '#000000',
      backgroundColor: activeVariable['--articleBgColor'],
      animation: {
        duration: 500,
        timingFunc: 'easeInOut',
      },
    });
    Taro.setBackgroundColor({
      backgroundColor: activeVariable['--articleBgColor'],
    });
  }, [activeVariable, theme]);

  useShareAppMessage(() => {
    return {
      title: `${article?.title}/${article?.author}`,
      path: `/pages/index/index?id=${article?._id}`,
    };
  });

  // useShareTimeline(()=>{
  //   return {
  //     title : `${article?.title}/${article?.author}`,
  //     path : `/pages/index/index?id=${article?._id}`
  //   };
  // });

  const shareImg = async () => {
    const url = await GenerateImgRef.current?.generate(article!, {
      canvasWidth: 375,
      bgColor: activeVariable['--articleBgColor'],
      textColor: activeVariable['--articleTextColor'],
      titleFontSize: parseInt(activeVariable['--titleFontSize']),
      authorFontSize: parseInt(activeVariable['--authorFontSize']),
      contentFontSize: parseInt(activeVariable['--contentFontSize']),
      contentLineHeight:
        parseInt(activeVariable['--contentFontSize']) *
        parseFloat(activeVariable['--contentLineHeight']),
    });
    console.log(url);
    Taro.previewImage({ current: url, urls: [url!] });
  };

  return (
    <View className="index-wrapper" style={activeVariable as any}>
      <Button onClick={shareImg}>draw</Button>
      <GenerateImg ref={GenerateImgRef} />
      <View className="article-title">{article?.title}</View>
      <View className="article-author">{article?.author}</View>
      <View className="article-image">
        <Image className="image" fit="cover" src={article?.imgUrl!} />
      </View>
      <View className="article-content">{contentJsx}</View>
      <View className="article-end">
        --- 全文完,共{article?.content.length}字 ---
      </View>
      <BottomNav
        refresh={getRandom}
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
