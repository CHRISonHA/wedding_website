import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'print-karte.html');
const pdfPath = path.join(root, 'print-karte.pdf');

/** A6 @ 96 dpi – gleicher Viewport wie Browser-Vorschau der Karte */
const MM_TO_PX = 96 / 25.4;
const CARD_W_PX = Math.round(105 * MM_TO_PX);
const CARD_H_PX = Math.round(148 * MM_TO_PX);

const fileUrl = pathToFileURL(htmlPath).href;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: CARD_W_PX, height: CARD_H_PX });
await page.goto(fileUrl, { waitUntil: 'networkidle' });
/* Screen-Styles = identisch mit HTML-Vorschau im Browser */
await page.emulateMedia({ media: 'screen' });
await page.pdf({
  path: pdfPath,
  width: '105mm',
  height: '148mm',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();

console.log('PDF geschrieben:', pdfPath);
