import { IArticle } from '../../api/type';

export interface IDrawConfig {
  canvasWidth: number;
  canvasHeight?: number;
  bgColor?: string;
  textColor?: string;
  titleFontSize?: number;
  authorFontSize?: number;
  contentFontSize?: number;
  contentLineHeight?: number;
}

export const measureArticle = (article: IArticle, config: IDrawConfig) => {
  const {
    canvasWidth,
    titleFontSize = 26,
    authorFontSize = 12,
    contentFontSize = 14,
    contentLineHeight = 24,
  } = config;
  const padding = 20;
  const paragraphArr = article.content
    .split('\n')
    .map(s => s.split(' ').join(''));
  let startY = padding;
  startY += titleFontSize;
  startY += authorFontSize;
  startY += padding * 2;
  for (let i = 0; i < paragraphArr.length; i++) {
    const p = paragraphArr[i];
    let newLine = '';
    let paragraphStart = true;
    for (let t = 0; t < p.length; t++) {
      const char = p[t];
      const testLine = newLine + char;
      const metricsWidth = testLine.length * contentFontSize;
      if (
        metricsWidth >
        canvasWidth - padding * 2 - (paragraphStart ? contentFontSize * 2 : 0)
      ) {
        startY += contentLineHeight;
        paragraphStart = false;
        newLine = p[t];
      } else {
        newLine = testLine;
      }
    }
    startY += contentLineHeight;
  }
  startY += padding;
  return startY;
};

export const drawArticle = (
  ctx: Taro.CanvasContext,
  article: IArticle,
  config: IDrawConfig,
) => {
  const { title, content, author } = article!;
  const {
    canvasWidth,
    canvasHeight = 1000,
    bgColor = '#fff',
    textColor = '#333',
    titleFontSize = 26,
    authorFontSize = 12,
    contentFontSize = 14,
    contentLineHeight = 24,
  } = config;
  console.log({ config });
  const padding = 20;
  const paragraphArr = content.split('\n').map(s => s.split(' ').join(''));

  ctx.setFillStyle(bgColor);
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.setFillStyle(textColor);
  let startY = padding;
  ctx.font = `${titleFontSize}px sans-serif`;
  // ctx.textAlign = 'center';
  ctx.setTextAlign('center');
  startY += titleFontSize;
  ctx.fillText(title!, canvasWidth / 2, startY);
  ctx.font = `${authorFontSize}px sans-serif`;
  startY += authorFontSize;
  startY += padding * 2;
  ctx.fillText(author!, canvasWidth / 2, startY);
  ctx.font = `${contentFontSize}px sans-serif`;
  // ctx.textAlign = 'left';
  ctx.setTextAlign('left');
  for (let i = 0; i < paragraphArr.length; i++) {
    const p = paragraphArr[i];
    let newLine = '';
    let paragraphStart = true;
    for (let t = 0; t < p.length; t++) {
      const char = p[t];
      const testLine = newLine + char;
      const metrics = ctx.measureText(testLine);
      if (
        metrics.width >
        canvasWidth - padding * 2 - (paragraphStart ? contentFontSize * 2 : 0)
      ) {
        startY += contentLineHeight;
        ctx.fillText(
          newLine,
          paragraphStart ? padding + contentFontSize * 2 : padding,
          startY,
        );
        paragraphStart = false;
        newLine = p[t];
      } else {
        newLine = testLine;
      }
    }
    startY += contentLineHeight;
    ctx.fillText(
      newLine,
      paragraphStart ? padding + contentFontSize * 2 : padding,
      startY,
    );
  }
  startY += padding;
  return startY;
};
