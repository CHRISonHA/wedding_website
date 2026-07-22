import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'images');
const outFilePng = path.join(outDir, 'qr-hochzeit-anne-chris.png');
const outFileSvg = path.join(outDir, 'qr-hochzeit-anne-chris.svg');

const url = 'https://www.hochzeit-anne-und-chris.top/';

const qrOptions = {
  margin: 2,
  color: { dark: '#2d2d2d', light: '#ffffff' },
};

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

await QRCode.toFile(outFilePng, url, {
  ...qrOptions,
  width: 280,
});

await QRCode.toFile(outFileSvg, url, {
  ...qrOptions,
  type: 'svg',
});

console.log('QR geschrieben:', outFilePng);
console.log('QR (SVG) geschrieben:', outFileSvg);
