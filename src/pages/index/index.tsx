import { useEffect, useState } from 'react';
import Taro, {
  useReachBottom,
  useRouter,
  useShareAppMessage,
} from '@tarojs/taro';
import { Image } from '@antmjs/vantui';
import { Button, Canvas, View } from '@tarojs/components';
import './index.less';
import BottomNav from './components/BottomNav';
import Drawer from './components/Drawer';
import globalStore from '../../store';
import { drawArticle } from './utils';

let currentIsReachBottom = false;

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const shareImg = () => {
    const query = Taro.createSelectorQuery();
    query
      .select('#poster')
      .fields({ node: true, size: true })
      .exec(poster => {
        const { width, height } = poster[0];
        const canvas = poster[0].node;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        const finalY = drawArticle(ctx, article!, {
          canvasWidth: width,
          canvasHeight: height,
        });
        console.log({ finalY });
        canvas.height = finalY * dpr;
        canvas.width = width * dpr;
        ctx.scale(dpr, dpr);
        drawArticle(ctx, article!, {
          canvasWidth: width,
          canvasHeight: height,
        });
      });
  };

  return (
    <View className="index-wrapper" style={activeVariable as any}>
      <Button onClick={shareImg}>draw</Button>
      <Canvas type="2d" id="poster" style={{ width: 375, height: 1000 }} />
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
