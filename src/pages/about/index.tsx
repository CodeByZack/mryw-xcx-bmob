import { Ad, View } from '@tarojs/components';
import globalStore from '../../store';
import './index.less';

interface IProps {}

const About = (props: IProps) => {
  const { activeVariable } = globalStore.useContainer();

  return (
    <View className="about-wrapper" style={activeVariable as any}>
      <View className="text-box">
        滑动文章到达底部会自动统计字数和文章篇数。
      </View>
      <View className="text-box">
        大部分文章来自爬虫，爬取公开文章。小部分由作者自行添加。
      </View>
      <View className="text-box">
        每天花10分钟阅读一篇文章，一个月可以有大约50000字的阅读量，一年有近60万字的阅读量，专注、执着，每天阅读。
        只为简单的纯净的阅读而生。 简单生活，每日一文。
      </View>
      <View className="ad">
        <Ad unitId="adunit-814d095c2aad9e36" />
      </View>
    </View>
  );
};
export default About;
