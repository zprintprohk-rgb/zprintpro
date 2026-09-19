// moq10-fix-seo-cat.ts
// 2026-09-19 — 價目同步波 ① 補漏: 品類級 SEO (src/lib/seo.ts) + products.ts 描述
//
// === 為何漏了這一層 ===
//   線上探針顯示品類頁仍見「×100 本起」「×50 本起」——追查發現另有兩個資料源未被覆蓋:
//     · src/lib/seo.ts 的品類級 titles/descriptions (騎馬釘 / 書刊 / 校園教育)
//     · src/data/products.ts 的 SKU description (含既有的「MOQ 100 本（vs Alibaba 黃頁 500+）」格式)
//   ⇒ 這是「多層 SEO 資料架構」第三次現形 (前兩次: sku-seo-data、products-content)。
//
// === 真實門檻 (products.ts 實查) ===
//   saddle-stitch-booklets 10 | catalog-printing 10 | exercise-books 10
//   textbooks 100 (未改) | certificates 100 (未改) | graduation-yearbook 50 (未改)
//   ※ 校園「品類頁」涵蓋多 SKU (10/50/100 混雜) ⇒ 不可寫單一數字; 改為不宣稱統一門檻。
//
// ★ 只改 MOQ 數字與口徑, 不動價格。
// ★ 冪等。

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const EDITS: [string, string, string, string][] = [
  // ── src/lib/seo.ts 騎馬釘 / 書刊 ──
  ['src/lib/seo.ts',
    "'zh-hk': '騎馬釘小冊子印刷 50本起 | 騎馬釘 + 膠裝 + 精裝 + 教材繪本 | 智印港'",
    "'zh-hk': '騎馬釘小冊子印刷 10本起 | 騎馬釘 + 膠裝 + 精裝 + 教材繪本 | 智印港'",
    'seo.ts 騎馬釘品類 title 50本起 → 10本起'],

  ['src/lib/seo.ts',
    "'zh-hk': '書刊印刷 50 本起印，HK$2.5 起/本。",
    "'zh-hk': '書刊印刷 10 本起印，HK$2.5 起/本。",
    'seo.ts 書刊品類 desc 50 本起印 → 10 本起印'],

  // ── src/lib/seo.ts 校園教育 ──
  // 校園品類涵蓋 certificates/textbooks (100) + exercise-books (10) + yearbook (50) ⇒ 不可寫單一門檻
  ['src/lib/seo.ts',
    "'zh-hk': '校園教育印刷 100本起 · 證書/作業簿/教材 學校批量優惠 FSC認證 | 智印港'",
    "'zh-hk': '校園教育印刷 · 證書/作業簿/教材 學校批量優惠 FSC認證 | 智印港'",
    'seo.ts 校園品類 title 移除錯誤的統一 100本起 (品類內門檻不一致)'],

  ['src/lib/seo.ts',
    "'zh-hk': '校園教育印刷 100 本起印. 證書/作業簿/教材/學業簿 + 學校批量定制折扣.",
    "'zh-hk': '校園教育印刷. 證書/作業簿/教材/學業簿 + 學校批量定制折扣.",
    'seo.ts 校園品類 desc 移除錯誤的統一 100 本起印'],

  // ── src/data/products.ts 騎馬釘 SKU 描述 ──
  ['src/data/products.ts',
    'MOQ 100 本（vs Alibaba 黃頁 500+）',
    'MOQ 10 本（vs Alibaba 黃頁 500+）',
    'products.ts 騎馬釘 SKU 描述 MOQ 100 本 → 10 本 (保留 vs Alibaba 格式)'],

  // ── 補: 修正短標題 (移除 100本起 後長度掉至 37, 低於 title 目標區 50-60) ──
  ['src/lib/seo.ts',
    "'zh-hk': '校園教育印刷 · 證書/作業簿/教材 學校批量優惠 FSC認證 | 智印港'",
    "'zh-hk': '校園教育印刷 · 證書/作業簿/教材 學校批量優惠 FSC認證 30秒報價 | 智印港'",
    'seo.ts 校園 title 補回長度 (37 → 44, 資訊更強而非更短)'],

  // ── 補: en 書刊品類 title 仍寫 50 MOQ ──
  ['src/lib/seo.ts',
    "'en': 'Catalog & Booklet Printing from $1.20 | 50 MOQ + Saddle Stitch | ZprintPro'",
    "'en': 'Catalog & Booklet Printing from $1.20 | 10 MOQ + Saddle Stitch | ZprintPro'",
    'seo.ts en 書刊 title 50 MOQ → 10 MOQ'],
];

const report: string[] = [];
const miss: string[] = [];
for (const [rel, from, to, why] of EDITS) {
  const abs = path.join(ROOT, rel);
  let s = fs.readFileSync(abs, 'utf-8');
  const n = s.split(from).length - 1;
  if (n === 0) { miss.push(`${rel} :: ${why}`); continue; }
  s = s.split(from).join(to);
  fs.writeFileSync(abs, s, 'utf-8');
  report.push(`${why} — ${n} 處`);
}

console.log('=== 品類級 SEO + SKU 描述 MOQ 修正 ===');
report.forEach((r) => console.log('  ✓ ' + r));
if (miss.length) { console.log('\n⚠ 未命中:'); miss.forEach((m) => console.log('  · ' + m)); }
console.log(`\n合計 ${report.length}/${EDITS.length}`);
