// 文字自动换行
export function textPrewrap (ctx, content, drawX, drawY, lineHeight, lineMaxWidth, lineNum){
  var drawTxt = ''; // 当前绘制的内容
  var drawLine = 1; // 第几行开始绘制
  var drawIndex = 0; // 当前绘制内容的索引
  // 判断内容是否可以一行绘制完毕
  if (ctx.measureText(content).width <= lineMaxWidth) {
    ctx.fillText(content.substring(drawIndex, i), drawX, drawY);
  } else {
    for (var i = 0; i < content.length; i++) {
      drawTxt += content[i];
      if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
        if (drawLine >= lineNum) {
          ctx.fillText(content.substring(drawIndex, i) + '..', drawX, drawY);
          break;
        } else {
          ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY);
          drawIndex = i + 1;
          drawLine += 1;
          drawY += lineHeight;
          drawTxt = '';
        }
      } else {
        // 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
        if (i === content.length - 1) {
          ctx.fillText(content.substring(drawIndex), drawX, drawY);
        }
      }
    }
  }
}
//绘画椭圆
export function fillRoundRect (cxt, x, y, width, height, radius, /*optional*/ fillColor){
  //圆的直径必然要小于矩形的宽高
  if (2 * radius > width || 2 * radius > height) {
    return false;
  }

  cxt.save();
  // cxt.translate(x, y);
  //绘制圆角矩形的各个边
  drawRoundRectPath(cxt, x, y, width, height, radius);
  cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
  cxt.fill();
  cxt.restore();

}
//绘画椭圆路径
export function drawRoundRectPath(cxt, x, y, width, height, radius) {
  cxt.beginPath(0);
  //从右下角顺时针绘制，弧度从0到1/2PI
  cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI / 2);

  //矩形下边线
  cxt.lineTo(radius + x, height + y);

  //左下角圆弧，弧度从1/2PI到PI
  cxt.arc(radius + x, height - radius + y, radius, Math.PI / 2, Math.PI);

  //矩形左边线
  cxt.lineTo(x, radius + y);

  //左上角圆弧，弧度从PI到3/2PI
  cxt.arc(radius + x, radius + y, radius, Math.PI, Math.PI * 3 / 2);

  //上边线
  cxt.lineTo(width - radius + x, y);

  //右上角圆弧
  cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);

  //右边线
  cxt.lineTo(width + x, height - radius + y);
  cxt.closePath();
}
