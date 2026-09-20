// .hermes/logs/_locate-menus-minqty.mjs — 定位 4 個 menus SKU 的 minQuantity 行號
import fs from 'node:fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf8').split(/\r?\n/);
const TARGETS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus'];

for (const slug of TARGETS) {
  const i = lines.findIndex((l) => /^ {4}slug:/.test(l) && l.includes(`'${slug}'`));
  if (i < 0) continue;
  for (let k = i; k < i + 90 && k < lines.length; k++) {
    if (k > i && /^ {4}slug:/.test(lines[k])) break;
    if (/^\s*minQuantity:\s*\d/.test(lines[k])) {
      console.log(`${slug}: L${k + 1}  ${JSON.stringify(lines[k].trim())}`);
      console.log(`   上一行 L${k}: ${JSON.stringify((lines[k - 1] || '').trim().slice(0, 80))}`);
      break;
    }
  }
}
