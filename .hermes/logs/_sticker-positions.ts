// .hermes/logs/_sticker-positions.ts — 8 個貼紙 SKU 的定位（供子品類 MOQ 映射）
import fs from 'node:fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf8').split(/\r?\n/);
const slugs = [
  'waterproof-stickers',
  'transparent-stickers',
  'removable-stickers',
  'small-batch-stickers',
  'die-cut-stickers',
  'foil-stickers',
  'security-stickers',
  'fluorescent-stickers',
];

for (const s of slugs) {
  const i = lines.findIndex((l) => /^ {4}slug:/.test(l) && l.includes(`'${s}'`));
  if (i < 0) continue;
  let mq = '';
  let name = '';
  let mat = '';
  let price = '';
  for (let k = i; k < i + 90 && k < lines.length; k++) {
    if (k > i && /^ {4}slug:/.test(lines[k])) break;
    if (!name) {
      const m = lines[k].match(/name: '([^']{0,80})/);
      if (m) name = m[1];
    }
    const m2 = lines[k].match(/^\s*minQuantity:\s*(\d+)/);
    if (m2 && !mq) mq = m2[1];
    const m3 = lines[k].match(/material:\s*'([^']{0,70})/);
    if (m3 && !mat) mat = m3[1];
    const m4 = lines[k].match(/price_range:\s*'([^']{0,40})/);
    if (m4 && !price) price = m4[1];
  }
  console.log(`[${s}] minQ=${mq}  ${price}`);
  console.log(`    name: ${name}`);
  console.log(`    材質: ${mat}`);
  console.log('');
}
