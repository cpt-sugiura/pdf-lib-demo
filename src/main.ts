import './style.css'
import {makePdfDoc} from "./pdf/makePdfDoc";
import {PageSizes} from "pdf-lib";
// @ts-ignore
import download from "downloadjs";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="tgt">
      <section class="layout">
        <div>1</div>
        <div class="col1Last1">2</div>
        <div class="col1Last1">3</div>
        <div>4</div>
        <div class="col1Last1">5</div>
        <div class="col1Last1">6</div>
      </section>
    </div>
    <button id="pdf-dl" type="button">PDFダウンロード</button>
  </div>
`
const btnEl = document.querySelector<HTMLButtonElement>('#pdf-dl');
if (btnEl) {
  btnEl.addEventListener('click', async () => {
    const {pdfDoc, fontIpamp} = await makePdfDoc()
    const page = pdfDoc.addPage(PageSizes.A4)

    const toPdfEl = document.getElementById('tgt');
    if(!toPdfEl){return}

    const px2pt = (px: string|number) => {
      if(typeof px === 'string'){
        px = Number(px.replace('px', ''))
      }
      return px / 1.33;
    }
    Array.from(toPdfEl.querySelectorAll('*'))
      .filter((el): el is HTMLElement => !!(el.children.length === 0 && el instanceof HTMLElement && el.innerText))
      .forEach(el => {
        console.log(document.defaultView?.getComputedStyle(el, null).fontSize)

        page.drawText(el.innerText, {
          x: el.getBoundingClientRect().x - toPdfEl.getBoundingClientRect().x,
          y: PageSizes.A4[1] - el.getBoundingClientRect().y,
          font: fontIpamp,
          size: px2pt(document.defaultView?.getComputedStyle(el, null).fontSize ?? 0)
        })
      })

    const pdfRaw = await pdfDoc.save();
    download(pdfRaw, "demo.pdf", "application/pdf");
  })
}


