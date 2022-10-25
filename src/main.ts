import './style.css'
import {makePdfDoc} from "./pdf/makePdfDoc";
import {PageSizes, PDFFont, PDFPage} from "pdf-lib";
// @ts-ignore
import download from "downloadjs";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <button id="pdf-dl" type="button">PDFダウンロード</button>
  </div>
`
const btnEl = document.querySelector<HTMLButtonElement>('#pdf-dl');
if (btnEl) {
  btnEl.addEventListener('click', async () => {
    const {pdfDoc, fontIpamp} = await makePdfDoc()
    const page = pdfDoc.addPage(PageSizes.A4)
    // XYの原点は左下。高さ = 上辺のY座標
    const topY = page.getSize().height;
    const lineHeight = 18;
    const fontSize = 16;

    const baseY = 35;

    const leftX = 25;
    ['左揃え', '左ぞろえ二行目', '左揃え3行目'].forEach((text ,i) => {
      drawTextAlignLeft(text, {leftX, y: topY - (baseY + lineHeight * i), font:fontIpamp, fontSize, page});
    })

    const rightX = page.getSize().width - 25;
    ['右揃え', '右ぞろえ二行目', '右揃え3行目'].forEach((text, i) => {
      drawTextAlignRight(text, {rightX, y: topY - (baseY + lineHeight * i), font: fontIpamp, fontSize, page})
    });

    const textBoxEdgeX : [number, number] = [0, PageSizes.A4[0]];
    ['中央揃え', '中央ぞろえ二行目', '中央揃え3行目'].forEach((text, i) => {
      drawTextAlignCenter(text, {textBoxEdgeX, y: topY - (baseY + lineHeight * i), font: fontIpamp, fontSize, page})
    })

    const pdfRaw = await pdfDoc.save();
    download(pdfRaw, "demo.pdf", "application/pdf");
  })
}


function drawTextAlignCenter(text: string, option: {
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

function drawTextAlignLeft(text: string, option: {
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
function drawTextAlignRight(text: string, option: {
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
