// moq10-fix-saddle-category.mjs
// 2026-09-19 — 價目同步波 ① 最高優先: 騎馬釘品類頁 100 本起 → 10 本起 (K3 指定)
//
// === 為何這是最高優先 ===
//   product 層 minQuantity 已於第三波改為 10, 但 SEO 文案層仍寫「100 本起」⇒ 直接矛盾。
//   騎馬釘品類頁有直接流量, 矛盾最明顯。
//
// === 事實依據 (先驗證再改, K3 要求) ===
//   products.ts 實查 (2026-09-19):
//     saddle-stitch-booklets 10 | catalog-printing 10 | perfect-bound-books 10
//     hardcover-books 10        | spiral-notebooks 10
//   ⇒ 「五款書刊」現時**全部 10 本起**, 故「劃一 100 本」為錯。
//
// === 範圍 ===
//   category-conversion-blocks.ts (騎馬釘品類頁) + category-seo-content.ts (騎馬釘品類文案)
//   逐字串精準替換; 不動任何價格數字 (HK$6-32/本 等)。
//   冪等。

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/** [檔案, 舊字串, 新字串, 說明] */
const EDITS: [string, string, string, string][] = [
  // ── category-conversion-blocks.ts (騎馬釘品類頁) ──
  ['src/data/category-conversion-blocks.ts',
    '"title": "騎馬釘小冊子印刷 100本起｜騎馬釘/膠裝/精裝/校簿印書訂製 | 智印港"',
    '"title": "騎馬釘小冊子印刷 10本起｜騎馬釘/膠裝/精裝/校簿印書訂製 | 智印港"',
    '品類頁 title 100本起 → 10本起'],

  ['src/data/category-conversion-blocks.ts',
    '線圈筆記本 HK$8-40/本，全部 100 本起印。',
    '線圈筆記本 HK$8-40/本，全部 10 本起印（數碼）。',
    'metaDescription 「全部 100 本起印」→ 10 本'],

  ['src/data/category-conversion-blocks.ts',
    '"a": "騎馬釘小冊子印刷 HK$6-32/本，100 本起印；"',
    '"a": "騎馬釘小冊子印刷 HK$6-32/本，10 本起印；"',
    'FAQ 騎馬釘價格 100 本起 → 10 本起'],

  ['src/data/category-conversion-blocks.ts',
    '"a": "五款書刊（騎馬釘書刊小冊子、無線膠裝書、精裝書、線圈筆記本、畫冊型錄）劃一 100 本起印；"',
    '"a": "五款書刊（騎馬釘書刊小冊子、無線膠裝書、精裝書、線圈筆記本、畫冊型錄）劃一 10 本起印（數碼）；"',
    'FAQ 「劃一 100 本起印」→ 10 本起印'],

  ['src/data/category-conversion-blocks.ts',
    '"label": "五款書刊劃一 100 本起訂，校簿教材小批量都接得"',
    '"label": "五款書刊劃一 10 本起訂，校簿教材小批量都接得"',
    'USP label 100 本起訂 → 10 本起訂'],

  ['src/data/category-conversion-blocks.ts',
    '騎馬釘小冊子 HK$6-32/本、畫冊型錄 HK$2.8-1000/本，全部 100 本起印"',
    '騎馬釘小冊子 HK$6-32/本、畫冊型錄 HK$2.8-1000/本，全部 10 本起印"',
    'CTA desc 全部 100 本起印 → 10 本起印'],

  ['src/data/category-conversion-blocks.ts',
    'HK$6-32/本，100 本起印。"',
    'HK$6-32/本，10 本起印。"',
    'FAQ 騎馬釘定義句 100 本起 → 10 本起'],

  ['src/data/category-conversion-blocks.ts',
    '騎馬釘練習冊用 128g–157g 銅版紙或書紙，100 本起印，',
    '騎馬釘練習冊用 128g–157g 銅版紙或書紙，10 本起印，',
    'FAQ 練習冊 100 本起 → 10 本起'],

  // ── category-seo-content.ts (騎馬釘品類 SEO) ──
  ['src/data/category-seo-content.ts',
    'h2: \'騎馬釘小冊子 / 騎馬釘書刊 / 畫冊印刷 / 產品型錄印刷 / 大量印刷 — 50 本起印, 8-64 頁全規格, 30 秒 AI 報價\'',
    'h2: \'騎馬釘小冊子 / 騎馬釘書刊 / 畫冊印刷 / 產品型錄印刷 / 大量印刷 — 10 本起印, 8-64 頁全規格, 30 秒 AI 報價\'',
    'zh-hk h2 50 本起印 → 10 本起印'],

  ['src/data/category-seo-content.ts',
    'featuredSnippet: \'騎馬釘小冊子印刷 50 本起, 8-64 頁 (4 的倍數, 超過 64 頁轉膠裝), HK$14-57/本 (500 本)',
    'featuredSnippet: \'騎馬釘小冊子印刷 10 本起 (數碼) / 500 本起柯式, 8-64 頁 (4 的倍數, 超過 64 頁轉膠裝), HK$14-57/本 (500 本)',
    'zh-hk featuredSnippet 50 本起 → 10 本起 (數碼)'],

  ['src/data/category-seo-content.ts',
    'featuredSnippet: \'Saddle stitch booklets from 50 copies,',
    'featuredSnippet: \'Saddle stitch booklets from 10 copies,',
    'en featuredSnippet from 50 copies → from 10 copies'],

  ['src/data/category-seo-content.ts',
    'featuredSnippet: \'中綴じ冊子印刷 50冊から,',
    'featuredSnippet: \'中綴じ冊子印刷 10冊から,',
    'ja featuredSnippet 50冊から → 10冊から'],

  ['src/data/category-seo-content.ts',
    'Alibaba 黄頁 3つの差別化: 50冊 MOQ',
    'Alibaba 黄頁 3つの差別化: 10冊 MOQ',
    'ja 對比句 50冊 MOQ → 10冊 MOQ'],
];

const report: string[] = [];
const skipped: string[] = [];

for (const [rel, from, to, why] of EDITS) {
  const abs = path.join(ROOT, rel);
  let s = fs.readFileSync(abs, 'utf-8');
  const n = s.split(from).length - 1;
  if (n === 0) { skipped.push(`${rel} :: ${why} (已冪等或字串已變)`); continue; }
  s = s.split(from).join(to);
  fs.writeFileSync(abs, s, 'utf-8');
  report.push(`${rel} :: ${why} — ${n} 處`);
}

console.log('=== 騎馬釘品類頁 MOQ 修正 ===');
report.forEach((r) => console.log('  ✓ ' + r));
if (skipped.length) { console.log('\n(未命中, 需人工確認):'); skipped.forEach((s) => console.log('  · ' + s)); }
console.log(`\n合計 ${report.length} 條規則命中`);
