import { Image, Loading } from '@antmjs/vantui';
import { Ad, View } from '@tarojs/components';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useEffect } from 'react';
import globalStore from '../../store';
import './index.less';

interface IProps {}

const ArticleList = (props: IProps) => {
  const { listPage, activeVariable } = globalStore.useContainer();
  const { articleList, getList, refresh, noMore } = listPage;

  useEffect(() => {
    getList();
  }, []);

  useReachBottom(() => {
    getList();
  });

  usePullDownRefresh(() => {
    refresh();
    Taro.stopPullDownRefresh();
  });

  return (
    <View className="article-list" style={activeVariable as any}>
      {articleList.map((article, index) => {
        if (article === 'AdBlock') {
          return (
            <View
              key={`${index}+adunit-afb6340a0568d519`}
              className="article-card"
            >
              <Ad unitId="adunit-afb6340a0568d519" />
            </View>
          );
        }

        return (
          <View
            key={article._id}
            className="article-card"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/index/index?id=${article._id}`,
              });
            }}
          >
            <View className="article-img">
              <Image className="real-img" fit="cover" src={article?.imgUrl!} />
            </View>
            <View className="article-content">
              <View className="article-title">{article?.title}</View>
              <View className="article-author">{article?.author}</View>
            </View>
          </View>
        );
      })}
      {noMore ? (
        <View>--- 没有更多了 ---</View>
      ) : (
        <View className="loading">
          <Loading size="" type="spinner">
            加载中...
          </Loading>
        </View>
      )}
    </View>
  );
};

export default ArticleList;
