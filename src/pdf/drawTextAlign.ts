import {PDFFont, PDFPage} from "pdf-lib";

export function drawTextAlignCenter(text: string, option: {
  textBoxEdgeX: [number, number], y: number, fontSize: number, font: PDFFont, page: PDFPage
}) {
  const {textBoxEdgeX, y, fontSize, font, page} = option;
  const boxWidth = textBoxEdgeX[1] - textBoxEdgeX[0];
  const textWidth = font.widthOfTextAtSize(text, fontSize)
  page.drawText(text, {
    size: fontSize,
    x: textBoxEdgeX[0] + (boxWidth - textWidth) / 2,
    y: y,
    font: font
  })
}

export function drawTextAlignLeft(text: string, option: {
  leftX: number, y: number, fontSize: number, font: PDFFont, page: PDFPage
}) {
  const {
    leftX, y, fontSize, font, page
  } = option;
  page.drawText(text, {
    x: leftX,
    y: y,
    font: font,
    size: fontSize
  });
}

export function drawTextAlignRight(text: string, option: {
  rightX: number, y: number, fontSize: number, font: PDFFont, page: PDFPage
}) {
  const {
    rightX, y, fontSize, font, page
  } = option;
  const textWidth = font.widthOfTextAtSize(text, fontSize);
  page.drawText(text, {
    x: rightX - textWidth,
    y: y,
    font: font,
    size: fontSize
  });
}
