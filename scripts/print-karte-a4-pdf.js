import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'print-karte-a4.html');
const pdfPath = path.join(root, 'print-karte-a4.pdf');

const MM_TO_PX = 96 / 25.4;
const A4_W_PX = Math.round(210 * MM_TO_PX);
const A4_H_PX = Math.round(297 * MM_TO_PX);

const fileUrl = pathToFileURL(htmlPath).href;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: A4_W_PX, height: A4_H_PX });
await page.goto(fileUrl, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'screen' });
await page.pdf({
  path: pdfPath,
  width: '210mm',
  height: '297mm',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();

console.log('PDF geschrieben:', pdfPath);
