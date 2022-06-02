import { Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useImperativeHandle, useState } from 'react';
import { IArticle } from 'src/api/type';
import { drawArticle, IDrawConfig, measureArticle } from './utils';

export interface IGenerateImgRef {
  generate: (article: IArticle, config: IDrawConfig) => Promise<string>;
}

const GenerateImg = React.forwardRef<IGenerateImgRef, any>((props, ref) => {
  const [posterInfo, setPosterInfo] = useState({ w: 375, h: 0 });

  const setCanvasHeight = (
    _article: IArticle,
    config: Omit<IDrawConfig, 'canvasWidth' | 'canvasHeight'>,
    cb: any,
  ) => {
    if (!_article) return;
    const h = measureArticle(_article, {
      canvasWidth: posterInfo.w,
      ...config,
    });
    console.log(`设定画布宽高 ：${posterInfo.w}/${h}`);
    setPosterInfo({ w: 375, h });
    setTimeout(cb, 1000);
  };

  const drawCanvas = (
    article: IArticle,
    config: Omit<IDrawConfig, 'canvasWidth' | 'canvasHeight'>,
    success: (str: string) => void,
  ) => {
    const query = Taro.createSelectorQuery();
    query
      .select('#generate-img')
      .fields({ node: true, size: true })
      .exec(poster => {
        console.log(`拿到画布节点 ：`, poster);
        const { width, height } = poster[0];
        // const canvas = poster[0].node;
        const ctx = Taro.createCanvasContext('generate-img');
        // const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        Taro.showLoading({ title: '生成图片中' });
        console.log(`开始绘制文章。。。`, {
          width: width * dpr,
          height: height * dpr,
        });
        // canvas.width = width * dpr;
        // canvas.height = height * dpr;
        // ctx.scale(dpr, dpr);
        console.log(`开始绘制文章。。。`);
        drawArticle(ctx, article, {
          canvasWidth: width,
          canvasHeight: height,
          ...config,
        });
        ctx.draw(false, () => {
          Taro.canvasToTempFilePath({
            x: 0,
            y: 0,
            width,
            height,
            canvasId: 'generate-img',
            success: res => {
              Taro.hideLoading();
              console.log(`图片生成成功`, res.tempFilePath);
              success(res.tempFilePath);
            },
            fail: res => {
              Taro.hideLoading();
              Taro.showToast({ title: '出错了' });
              console.log(res);
            },
          });
        });
      });
  };

  const generate = (
    article: IArticle,
    config: Omit<IDrawConfig, 'canvasWidth' | 'canvasHeight'>,
  ) => {
    return new Promise<string>(resolve => {
      setCanvasHeight(article, config, () =>
        drawCanvas(article, config, resolve),
      );
    });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        generate,
      };
    },
    [],
  );

  return (
    <Canvas
      canvasId="generate-img"
      id="generate-img"
      // type="2d"
      style={{
        width: posterInfo.w,
        height: posterInfo.h,
        position: 'fixed',
        left: -9999999,
        top: -99999999,
      }}
    ></Canvas>
  );
});
export default GenerateImg;
