import { Icon, Popup, Image } from '@antmjs/vantui';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useRef, useState } from 'react';
import GenerateImg, { IGenerateImgRef } from '../../../components/GenerateImg';
import globalStore from '../../../store';

interface IProps {
  refresh?: () => void;
  showDrawer?: () => void;
}

const BottomNav = (props: IProps) => {
  const GenerateImgRef = useRef<IGenerateImgRef>(null);
  const { refresh, showDrawer } = props;
  const [shareInfo, setShareInfo] = useState<string>();

  const { indexPage, activeVariable } = globalStore.useContainer();
  const shareImg = async () => {
    Taro.showLoading({ title: '生成图片中' });
    const url = await GenerateImgRef.current?.generate(indexPage.article!, {
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
    Taro.hideLoading();
    console.log(url);
    setShareInfo(url);
    // Taro.previewImage({ current: url, urls: [url!] });
  };
  return (
    <View className="bottom-nav">
      <GenerateImg ref={GenerateImgRef} />
      <Popup
        show={!!shareInfo}
        onClose={() => {
          setShareInfo('');
        }}
      >
        <View style={{ width: '80vw', height: '50vh', overflow: 'auto' }}>
          <View
            className="share-title"
          >
            图片生成成功,点击查看大图
          </View>
          <Image
            onClick={() => {
              Taro.previewImage({ current: shareInfo, urls: [shareInfo!] });
            }}
            fit="widthFix"
            style={{ width: '100%', height: 'auto' }}
            src={shareInfo!}
          />
        </View>
      </Popup>
      <View className="left">
        <Icon
          onClick={shareImg}
          classPrefix="iconfont"
          name="fenxiang1"
          size="40"
        />
        <Icon
          className={indexPage.loading ? 'rotate' : ''}
          onClick={refresh}
          classPrefix="iconfont"
          name="shuaxin"
          size="50"
        />
      </View>
      <View className="right">
        <Icon
          onClick={showDrawer}
          classPrefix="iconfont"
          name="caidan"
          size="50"
        />
      </View>
    </View>
  );
};
export default BottomNav;
