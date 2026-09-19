// moq10-fix-blog-books.ts
// 2026-09-19 — 價目同步波 ① (書刊/校園優先): 博客層 MOQ 宣稱 對齊真實門檻
//
// === 逐條判定 (先驗證再改) ===
//   分類器先按「產品關鍵詞 → SKU → 真實 minQuantity」判斷, 再人工剔除 2 條誤判:
//     · L1929「精裝盒」被誤判為精裝書 —— 實為包裝盒 SKU (100 個起, 正確) ⇒ 不動
//     · L1476「線圈裝訂」被誤判為 spiral-notebooks —— 實為月曆 SKU (minQ=1000) ⇒ 不動
//   其餘 11 條宣稱值 ≠ 真實門檻, 逐條修正。
//
// === 真實門檻 (2026-09-19 實查 products.ts) ===
//   saddle-stitch-booklets 10 | catalog-printing 10 | hardcover-books 10
//   exercise-books 10 | doujinshi-printing 10
//   textbooks 100 (未改) | certificates 100 (未改) | graduation-yearbook 50 (未改)
//
// ★ 只改 MOQ 數字, 不動任何價格 (HK$6-32/本、85 折 等一律保留)。
// ★ 冪等。

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const FILE = 'src/data/blog-posts.ts';

const EDITS: [string, string, string][] = [
  // L501 騎馬釘
  ["'騎馬釘小冊子印刷 50 本起, 8-64 頁, HK$14-57/本 (500 本).",
   "'騎馬釘小冊子印刷 10 本起 (數碼), 8-64 頁, HK$14-57/本 (500 本).",
   'L501 騎馬釘 50 本起 → 10 本起'],
  ["ja: '中綴じ冊子印刷 50冊から, 8-64ページ,",
   "ja: '中綴じ冊子印刷 10冊から, 8-64ページ,",
   'L503 ja 騎馬釘 50冊から → 10冊から'],

  // L1230 地產摺頁 + 騎馬釘小手冊
  ['157g 雙銅紙 A4 摺頁 + 騎馬釘小手冊 + 100 張起印',
   '157g 雙銅紙 A4 摺頁 + 騎馬釘小手冊 + 10 張起印',
   'L1230 地產組合 100 張起印 → 10 張起印'],

  // L1545 畫冊
  ['硬皮精裝/膠裝/騎馬釘裝訂攻略，附 4 條 FAQ，50 本起印',
   '硬皮精裝/膠裝/騎馬釘裝訂攻略，附 4 條 FAQ，10 本起印',
   'L1545 畫冊 50 本起印 → 10 本起印'],

  // L1828 / L1833 練習簿
  ["'練習簿印刷完全指南 2026: 4 種紙材 3 種裝訂 100 本起印",
   "'練習簿印刷完全指南 2026: 4 種紙材 3 種裝訂 10 本起印",
   'L1828 練習簿 title 100 本起印 → 10 本起印'],
  ["'學校練習簿/作業簿 100 本起印,",
   "'學校練習簿/作業簿 10 本起印,",
   'L1833 學校練習簿 100 本起印 → 10 本起印'],

  // L1945 / L1950 / L1952 小誌 Zine
  ["'小誌 Zine 印刷: 騎馬釘 8-64 頁 100 本起 HK$6 起",
   "'小誌 Zine 印刷: 騎馬釘 8-64 頁 10 本起 HK$6 起",
   'L1945 Zine title 100 本起 → 10 本起'],
  ["'小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘,",
   "'小誌 Zine 印刷 10 本起印, 8-64 頁騎馬釘,",
   'L1950 Zine 100 本起印 → 10 本起印'],
  ["ja: 'ジン（Zine）印刷は 100 部から、中綴じ 8〜64 ページ",
   "ja: 'ジン（Zine）印刷は 10 部から、中綴じ 8〜64 ページ",
   'L1952 ja Zine 100 部から → 10 部から'],

  // L1968 源碼註釋 (非客戶可見, 但更新以免誤導後人)
  ['// 价格口径来源: 线上 PDP 结构化区 (2026-09-18 curl): 100 本起印 / HK$40-240/本',
   '// 价格口径来源: 线上 PDP 结构化区 (2026-09-18 curl; MOQ 已於 2026-09-19 第三波改為 10 本): 10 本起印 / HK$40-240/本',
   'L1968 源碼註釋 100 本起印 → 10 本起印'],

  // L1975 / L1980 童書繪本 (hardcover-books = 10)
  ["'童書繪本印刷：精裝硬皮 32 頁 100 本起 HK$40 起",
   "'童書繪本印刷：精裝硬皮 32 頁 10 本起 HK$40 起",
   'L1975 童書繪本 title 100 本起 → 10 本起'],
  ["'童書繪本印刷 100 本起印。精裝硬皮 2.5mm 灰紙板封面",
   "'童書繪本印刷 10 本起印。精裝硬皮 2.5mm 灰紙板封面",
   'L1980 童書繪本 100 本起印 → 10 本起印'],
];

const abs = path.join(ROOT, FILE);
let s = fs.readFileSync(abs, 'utf-8');
const done: string[] = [];
const miss: string[] = [];

for (const [from, to, why] of EDITS) {
  const n = s.split(from).length - 1;
  if (n === 0) { miss.push(why); continue; }
  s = s.split(from).join(to);
  done.push(`${why} — ${n} 處`);
}
fs.writeFileSync(abs, s, 'utf-8');

console.log('=== 博客書刊/校園 MOQ 修正 ===');
done.forEach((d) => console.log('  ✓ ' + d));
if (miss.length) { console.log('\n⚠ 未命中 (字串已變, 需人工確認):'); miss.forEach((m) => console.log('  · ' + m)); }
console.log(`\n合計 ${done.length}/${EDITS.length} 條規則命中`);
