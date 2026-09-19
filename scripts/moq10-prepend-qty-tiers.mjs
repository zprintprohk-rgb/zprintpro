// moq10-prepend-qty-tiers.mjs
// 2026-09-19 — 全網站起訂量修正 (紙品 100 → 10) 第 3 步
//
// 職責: 為「沒有 price-table、走 QuoteCalculator」的受影響紙品 SKU，
//       在 `variables.quantities` 首檔插入 value=10，令 PDP 購物車／報價器的
//       預設與可見最低數量真正是 10（否則 `variables.quantities[0] = 100`
//       會令 QuoteCalculator 與 ProductQuoteProvider 仍以 100 為起點）。
//
// 定價: discount 沿用 price-table 的同一模型 Λ(10) = 2.35
//       (開機費 HK$50 + 10 × 進場單價 × 2.35 的反解倍率)，與
//       scripts/moq10-add-small-batch-tiers.mjs 的 LAMBDA[10] 完全一致，
//       保證「有表 SKU」與「無表 SKU」用同一套小批量溢價口徑。
//
// ★ 只動「無 price-table」的 SKU：有表的 SKU 由 ReferencePriceBlock 渲染，
//   其 quantities 陣列是死資料，不碰 (零 churn)。
// ★ 冪等: 已有 value: 10 者跳過。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'products.ts');

/** 無 price-data 渲染路徑、且本次降至 10 的紙品 SKU
 *  ⚠ 2026-09-19 補: small-batch-stickers / die-cut-stickers 原本被排除在名單外
 *  (誤以為有 price-table), 但 stickers.json **完全沒有** 進 gen-price-data,
 *  實際 PDP 走 QuoteCalculator ⇒ 必須同樣補 10 檔, 否則預設仍係 100。 */
const NO_TABLE_SLUGS = [
  'transparent-stickers',
  'removable-stickers',
  'foil-stickers',
  'security-stickers',
  'fluorescent-stickers',
  'small-batch-stickers',
  'die-cut-stickers',
  'waterproof-stickers',
  'double-sided-flyers',
  'thick-paper-flyers',
  'school-flyers',
  'premium-greeting-cards',
  'thick-greeting-cards-400g',
  'foil-greeting-cards',
  'spot-uv-greeting-cards',
  'matte-greeting-cards',
  'rounded-corner-greeting-cards',
];

const SMALL_BATCH_DISCOUNT = 2.35;   // = LAMBDA[10]，單張價上浮倍率
const LABEL_10 = { 'zh-hk': '10張', en: '10', ja: '10枚' };

const src = fs.readFileSync(FILE, 'utf-8');
const lines = src.split('\n');

// 建立 slug → [startLine, endLine) 區間
const anchors = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s+slug:\s*'([^']+)'/);
  if (m) anchors.push({ slug: m[1], line: i });
}

const out = [...lines];
const report = [];
let missingQuantities = [];

// 由後往前改，避免行號位移
for (let a = anchors.length - 1; a >= 0; a--) {
  const { slug, line } = anchors[a];
  if (!NO_TABLE_SLUGS.includes(slug)) continue;
  const end = a + 1 < anchors.length ? anchors[a + 1].line : lines.length;

  // 找 quantities: [ ... ] 區塊
  let qStart = -1;
  for (let i = line; i < end; i++) {
    if (/^\s+quantities:\s*\[/.test(lines[i])) { qStart = i; break; }
  }
  if (qStart === -1) { missingQuantities.push(slug); continue; }

  let qEnd = -1;
  for (let i = qStart; i < end; i++) {
    if (/^\s+\],\s*$/.test(lines[i]) || /^\s+\]\s*$/.test(lines[i])) { qEnd = i; break; }
  }
  if (qEnd === -1) { missingQuantities.push(slug); continue; }

  const block = out.slice(qStart, qEnd + 1).join('\n');
  if (/value:\s*10\s*,/.test(block)) { continue; }  // 冪等

  // 偵測縮排 (以第一條 entry 為準); label 值僅存在於資料、無渲染消費者 (見下方註解)
  const firstEntry = out.slice(qStart + 1, qEnd).find((l) => /value:/.test(l));
  const indent = firstEntry ? firstEntry.match(/^(\s*)/)[1] : '        ';

  // 只在 zh-hk 區塊插一條 (原檔 quantities 是單一語言標籤, 沿用既有風格)
  const insert = [`${indent}{ value: 10, label: '10', discount: ${SMALL_BATCH_DISCOUNT} },`];
  out.splice(qStart + 1, 0, ...insert);
  report.push(`${slug}: quantities 首檔插入 value:10 (discount ${SMALL_BATCH_DISCOUNT}) @ line ${qStart + 2}`);
}

fs.writeFileSync(FILE, out.join('\n'), 'utf-8');

console.log('=== quantities 首檔插入 (無 price-table 紙品) ===');
if (report.length) for (const r of report) console.log('  ' + r);
else console.log('  (無變更 — 已冪等)');
if (missingQuantities.length) {
  console.log(`\n⚠ 無 quantities 區塊, 未處理 (需人工/另一批): ${missingQuantities.join(', ')}`);
}
console.log(`\n共 ${report.length} 個 SKU 已插入 10 檔。`);
