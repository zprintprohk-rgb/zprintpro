// moq10-fix-hardcover-title.mjs
// 2026-09-19 — 第四波補漏: 公司精裝書 (hardcover-books) title 的起印量
//
// 依據: products.ts 內 hardcover-books minQuantity = 10 (第三波書刊拍板),
//       但其 sku-seo-data title 仍寫「100起印」。
//       ⚠ 同檔「公司教科書」(textbooks) minQuantity = 100, 不在本批 ⇒ 保留不動。
//
// 冪等。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'sku-seo-data.ts');
let src = fs.readFileSync(FILE, 'utf-8');

const FROM = '"title": "公司精裝書 燙金・局部UV・100起印・HK$40起 | 智印港"';
const TO = '"title": "公司精裝書 燙金・局部UV・10起印・HK$40起 | 智印港"';

const n = src.split(FROM).length - 1;
if (n === 0) { console.log('已冪等 (找不到舊值)'); process.exit(0); }
src = src.split(FROM).join(TO);
fs.writeFileSync(FILE, src, 'utf-8');
console.log(`公司精裝書 title: ${n} 處已由 100起印 → 10起印`);
