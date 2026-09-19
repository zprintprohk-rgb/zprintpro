// moq10-fix-alibaba-compare.ts
// 2026-09-19 — 騎馬釘「vs Alibaba 黃頁 500+」對比口徑統一 (K3 指定)
//
// K3 指示: 「'vs Alibaba 黃頁 500+' 的對比應更新為 '10 本 vs 500+'，因為 10 本起的說服力遠強於 100 本起。」
//
// === 事實核對 (先驗證再改) ===
//   `Alibaba 黃頁 500+ MOQ` = **競品側的數字**, 屬事實陳述 ⇒ **不動** (改了就是造假)。
//   真正矛盾在**我方側的數字**: 同一句內仍寫「100 本起」「50-copy MOQ」, 與 product 層 10 本矛盾。
//
// === 改動 ===
//   zh-hk: 「100 本起工廠直送價格」→「10 本起工廠直送價格」
//   en:    「50-copy MOQ vs 500+」  →「10-copy MOQ vs 500+」
//   競品側 `500+` 保持原樣。
//   冪等。

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const FILE = 'src/data/category-seo-content.ts';

const EDITS: [string, string, string][] = [
  ['100 本起工廠直送價格 30 秒 AI 報價', '10 本起工廠直送價格 30 秒 AI 報價', 'zh-hk 我方側 100 本起 → 10 本起 (競品 500+ 不動)'],
  ['Alibaba yellow pages: 50-copy MOQ vs 500+', 'Alibaba yellow pages: 10-copy MOQ vs 500+', 'en 我方側 50-copy MOQ → 10-copy MOQ (競品 500+ 不動)'],
];

const abs = path.join(ROOT, FILE);
let s = fs.readFileSync(abs, 'utf-8');
const report: string[] = [];
for (const [from, to, why] of EDITS) {
  const n = s.split(from).length - 1;
  if (n === 0) { report.push(`· ${why} — 未命中 (已冪等或字串已變)`); continue; }
  s = s.split(from).join(to);
  report.push(`✓ ${why} — ${n} 處`);
}
fs.writeFileSync(abs, s, 'utf-8');
console.log('=== vs Alibaba 500+ 對比口徑 ===');
report.forEach((r) => console.log('  ' + r));
