import {PDFDocument, PDFFont} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

/** 新規PDFインスタンス生成 */
export const makePdfDoc = async (): Promise<{
  pdfDoc: PDFDocument,
  fontIpamp: PDFFont
}> => {
  const makePdfDocInstance = async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    return pdfDoc;
  }
  const getFont = async () => {
    return await fetch('/fonts/ipamp.ttf').then((res) => res.arrayBuffer());
  }
  return await Promise.all([makePdfDocInstance(), getFont()])
    .then(async ([pdfDoc, fontRaw]) => {
      // フォント埋め込み
      const fontIpamp = await pdfDoc.embedFont(fontRaw, {subset: true});
      return {
        pdfDoc, fontIpamp
      }
    })
}
