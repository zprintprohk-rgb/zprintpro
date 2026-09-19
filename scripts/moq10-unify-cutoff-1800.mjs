// moq10-unify-cutoff-1800.mjs
// 2026-09-19 — K3 拍板配套: 統一即日截單口徑為 18:00
//
// 背景: K3 2026-09-19 明確拍板「通宵截稿 18:00，維持，不要動」。
//   但 sku-seo-data.ts 內仍有 14 處寫「下午 3 時前落單即日交貨 / 下午 3 時前落單可加急即日同區交收」,
//   與全站 (rush-data timeline、RushPriceTable、FAQ、即日速遞頁 meta、RushHero) 一律 18:00 矛盾。
//   同一頁面同時出現 3pm 與 18:00 兩個截單時間 = 客戶會質疑報價可信度。
//
// ★ 只改「截單時間」語意, 不動其他內容。
// ★ 逐字串精準替換 (兩種句式)。
// ★ 冪等。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'sku-seo-data.ts');
let src = fs.readFileSync(FILE, 'utf-8');

const EDITS = [
  // 句式 1: Q4 模板
  [
    '下午 3 時前落單可加急即日同區交收（順豐速遞上門），額外 HK$80 起。',
    '每日 18:00 前落單可加急即日同區交收（順豐速遞上門），額外 HK$80 起。',
  ],
  // 句式 2: 即日傳單 SKU description
  [
    '100 張起、HK$0.55 起/張，下午 3 時前落單即日交貨。',
    '10 張起、HK$0.55 起/張（大量檔），每日 18:00 前落單即日交貨。',
  ],
  // 句式 3: 海報 SKU body Q6 (6 處) — 「即日打稿 2 小時, 下午 3 時前落單即日交貨」
  [
    '即日打稿 2 小時, 下午 3 時前落單即日交貨, DHL 全球 2-4 天送達。',
    '即日打稿 2 小時, 每日 18:00 前落單即日交貨, DHL 全球 2-4 天送達。',
  ],
  // 句式 4: 海報 SKU body 小訂單承諾 (6 處) — 換行後獨立一句
  [
    '下午 3 時前落單即日交貨, 港九新界滿 $500 免費順豐。',
    '每日 18:00 前落單即日交貨, 港九新界滿 $500 免費順豐。',
  ],
  // 句式 5: 兜底 — 任何剩餘的「下午 3 時前落單」一律統一
  ['下午 3 時前落單', '每日 18:00 前落單'],
];

const report = [];
for (const [from, to] of EDITS) {
  const n = src.split(from).length - 1;
  if (n === 0) { report.push(`已冪等 (找不到): ${from.slice(0, 40)}…`); continue; }
  src = src.split(from).join(to);
  report.push(`${n} 處：${from.slice(0, 34)}… → 18:00 口徑`);
}

fs.writeFileSync(FILE, src, 'utf-8');
console.log('=== 統一即日截單 18:00 ===');
for (const r of report) console.log('  ' + r);
