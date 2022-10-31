import { PDFFont, PDFPage } from 'pdf-lib';
import { PDFPageDrawLineOptions, PDFPageDrawTextOptions } from 'pdf-lib/src/api/PDFPageOptions';

/**
 * 左上を原点として Page に色々描画する
 */
export class PDFPageDrawer {
  public readonly page: PDFPage;
  public readonly font: PDFFont;
  public readonly fontSize?: number;

  constructor(page: PDFPage, font: PDFFont, baseFontSize?: number) {
    this.page = page;
    this.font = font;
    this.fontSize = baseFontSize;
  }

  public drawText(text: string, options: PDFPageDrawTextOptions = {}) {
    let currentY;
    if (options.y != null) {
      const font: PDFFont = options.font ?? this.font;
      const size = options.size ?? this.fontSize ?? 0;
      currentY = this.page.getHeight() - options.y - font.heightAtSize(size) * 1.05; // 0.05 は余白
    }
    this.page.drawText(text, {
      font: this.font,
      size: this.fontSize,
      ...options,
      y: currentY ?? options.y,
    });
  }
  public drawTextInBox(text: string, box: { start: { x: number, y: number }, end: { x: number, y: number } }, options: Omit<PDFPageDrawTextOptions, 'x'|'y'> & {
    textAlign: 'center'| 'left' | 'right',
    verticalAlign: 'middle'| 'top' | 'bottom',
  } = {
    textAlign: 'left',
    verticalAlign: 'middle'
  }) {
    const boxWidth = box.end.x - box.start.x;
    const textWidth = (this.font ?? options.font).widthOfTextAtSize(text, (this.fontSize ?? options.size ?? 0))
    const textX = (new Map<'center'|'left'|'right',number>([
      ['left', box.start.x],
      ['center', box.start.x + (boxWidth - textWidth) / 2,],
      ['right', box.end.x - textWidth],
    ])).get(options.textAlign) ?? 0
    const boxHeight = box.end.y - box.start.y;
    const textHeight = (this.font ?? options.font).heightAtSize((this.fontSize ?? options.size ?? 0))
    const textY = (new Map<'middle'| 'top' | 'bottom',number>([
      ['top', box.start.y],
      ['middle', box.start.y + (boxHeight - textHeight) / 2,],
      ['bottom', box.end.y - textHeight],
    ])).get(options.verticalAlign) ?? 0


      const font: PDFFont = options.font ?? this.font;
      const size = options.size ?? this.fontSize ?? 0;
      const currentY = this.page.getHeight() - textY - font.heightAtSize(size) * 1.05; // 0.05 は余白
    this.page.drawText(text, {
      font: this.font,
      size: this.fontSize,
      ...options,
      x: textX,
      y: currentY,
    });
  }

  public drawLine(
    options: PDFPageDrawLineOptions &
      Partial<{
        offset: { x: number; y: number };
      }>
  ) {
    this.page.drawLine({
      ...options,
      start: {
        x: options.start.x,
        y: this.page.getHeight() - options.start.y,
      },
      end: {
        x: options.end.x,
        y: this.page.getHeight() - options.end.y,
      },
    });
  }
}
