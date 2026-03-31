import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'images');
const outFile = path.join(outDir, 'qr-hochzeit-anne-chris.png');

const url = 'https://www.hochzeit-anne-und-chris.top/';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

await QRCode.toFile(outFile, url, {
  width: 280,
  margin: 2,
  color: { dark: '#2d2d2dff', light: '#ffffffff' },
});

console.log('QR geschrieben:', outFile);
