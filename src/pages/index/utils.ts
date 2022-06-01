import { IArticle } from '../../api/type';

interface IDrawConfig {
  canvasWidth: number;
  canvasHeight: number;
  titleFontSize?: number;
  authorFontSize?: number;
  contentFontSize?: number;
  contentLineHeight?: number;
}

const measureArticle = ()=>{

};


export const drawArticle = (
  ctx: CanvasRenderingContext2D,
  article: IArticle,
  config: IDrawConfig,
) => {
  const { title, content, author } = article!;
  const {
    canvasWidth,
    canvasHeight,
    titleFontSize = 26,
    authorFontSize = 12,
    contentFontSize = 14,
    contentLineHeight = 24,
  } = config;
  const padding = 20;
  const paragraphArr = content.split('\n').map(s => s.split(' ').join(''));
  let startY = padding;
  ctx.font = `${titleFontSize}px sans-serif`;
  ctx.textAlign = 'center';
  startY += titleFontSize;
  ctx.fillText(title!, canvasWidth / 2, startY);
  ctx.font = `${authorFontSize}px sans-serif`;
  startY += authorFontSize;
  startY += padding * 2;
  ctx.fillText(author!, canvasWidth / 2, startY);
  ctx.font = `${contentFontSize}px sans-serif`;
  ctx.textAlign = 'left';
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
