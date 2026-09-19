// moq10-fix-sku-seo-personal.mjs
// 2026-09-19 — 修正 sku-seo-data.ts 內「收費透明：100 張起印」模板句 (35 處)
//
// 背景: push 後線上探針發現 A1/A5 產品頁仍在渲染「收費透明：100 張起印」。
//   根因: 真正渲染的長描述來自 sku-seo-data.ts (我前一輪改的是 products.ts 的
//   title_zh/description/features 與 products-content.ts, 未覆蓋此檔的 body)。
//
// ★ 按 SKU 主題逐個判斷, 不整檔替換:
//     海報類 (6)  → 1 張起印      (K3 P0-2: A1/A2 已獨立 1 張起)
//     貼紙/傳單類 → 10 張起印      (K3 紙品線)
//     紙袋類      → **不動**      (紙袋維持 100 個起, 不在本批)
//
// ★ 只改該模板句, 不動同檔其他價格數字。
// ★ 冪等。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'sku-seo-data.ts');
const lines = fs.readFileSync(FILE, 'utf-8').split('\n');

const NEEDLE = '收費透明：100 張起印';
const isPoster = (t) => /海報|poster/i.test(t);
const isPaperGoods = (t) => /貼紙|傳單|單張|摺頁|sticker|flyer|leaflet|label/i.test(t);
const isOutOfScope = (t) => /紙袋|包裝|紙盒|彩盒|禮盒|月曆|年曆|信封|利是|餐牌|菜單|bag|box|calendar|menu|envelope/i.test(t);

let cur = '';
let nPoster = 0, nPaper = 0, nSkip = 0;
const skipped = [];

for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/"title": "([^"]{0,80})/);
  if (m) cur = m[1];
  if (!lines[i].includes(NEEDLE)) continue;

  if (isOutOfScope(cur) && !isPoster(cur) && !isPaperGoods(cur)) { nSkip++; skipped.push(`L${i + 1} ${cur.slice(0, 50)}`); continue; }
  if (isOutOfScope(cur) && !isPoster(cur)) {
    // 紙袋/包裝等 → 保留 (100 個/張 起本來就對)
    if (!/貼紙|傳單|單張/.test(cur)) { nSkip++; skipped.push(`L${i + 1} ${cur.slice(0, 50)}`); continue; }
  }

  if (isPoster(cur)) {
    lines[i] = lines[i].split(NEEDLE).join('收費透明：1 張起印');
    nPoster++;
  } else if (isPaperGoods(cur)) {
    lines[i] = lines[i].split(NEEDLE).join('收費透明：10 張起印');
    nPaper++;
  }
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf-8');
console.log('=== sku-seo-data「收費透明」模板句修正 ===');
console.log(`  海報類 → 1 張起印 : ${nPoster} 處`);
console.log(`  紙品類 → 10 張起印: ${nPaper} 處`);
console.log(`  保留 (非本批)     : ${nSkip} 處`);
if (skipped.length) { console.log('  保留明細:'); skipped.slice(0, 20).forEach((s) => console.log('    ' + s)); }
console.log(`  剩餘仍寫 100 張起印: ${lines.filter((l) => l.includes(NEEDLE)).length} 處`);
