// moq10-set-product-minquantity.mjs
// 2026-09-19 — 全網站起訂量修正 (紙品 100 → 10) 第 2 步
//
// 職責: 把受影響紙品 SKU 的 `minQuantity` 由 100 改為 10，並補上 `quantities` 首檔。
//
// 範圍 (K3 2026-09-19 拍板): 傳單 / 貼紙 / 賀卡 —— 紙品線。
//   不動: 書刊本冊 (5 SKU, 另案)、包裝盒、紙袋、月曆、海報、橫額、婚慶。
//
// ★ minQuantity 是報價引擎輸入 (print-method-policy.ts 註明)。改它 = 真實口徑放寬，
//   不是單純文案。故同步必須有 price-table 小批量檔支撐 (見 moq10-add-small-batch-tiers.mjs)。
// ★ 冪等: 已是 10 者跳過。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'products.ts');

/** 目標 SKU → 期望 minQuantity */
const TARGETS = {
  // 傳單線
  'a4-flyers': 10,
  'a5-flyers': 10,
  'double-sided-flyers': 10,
  'folded-leaflets': 10,
  'thick-paper-flyers': 10,
  'eco-flyers': 10,
  'same-day-flyers': 10,
  'school-flyers': 10,
  // 貼紙線
  'waterproof-stickers': 10,
  'transparent-stickers': 10,
  'removable-stickers': 10,
  'small-batch-stickers': 10,
  'die-cut-stickers': 10,
  'foil-stickers': 10,
  'security-stickers': 10,
  'fluorescent-stickers': 10,
  // 賀卡線
  'premium-greeting-cards': 10,
  'thick-greeting-cards-400g': 10,
  'foil-greeting-cards': 10,
  'spot-uv-greeting-cards': 10,
  'matte-greeting-cards': 10,
  'rounded-corner-greeting-cards': 10,
};

const lines = fs.readFileSync(FILE, 'utf-8').split('\n');
const out = [...lines];
let curSlug = null;
const changed = [];
const missing = new Set(Object.keys(TARGETS));

for (let i = 0; i < lines.length; i++) {
  const mSlug = lines[i].match(/^\s+slug:\s*'([^']+)'/);
  if (mSlug) curSlug = mSlug[1];

  const mMq = lines[i].match(/^(\s+minQuantity:\s*)(\d+)(,.*)$/);
  if (!mMq || !curSlug || !(curSlug in TARGETS)) continue;

  missing.delete(curSlug);
  const desired = TARGETS[curSlug];
  const current = Number(mMq[2]);
  if (current === desired) continue;

  out[i] = `${mMq[1]}${desired}${mMq[3]}`;
  changed.push(`${curSlug}: ${current} → ${desired} (line ${i + 1})`);
}

fs.writeFileSync(FILE, out.join('\n'), 'utf-8');

console.log('=== minQuantity 修正 ===');
if (changed.length) for (const c of changed) console.log('  ' + c);
else console.log('  (無變更 — 已冪等)');
if (missing.size) console.log(`\n⚠ 未在 products.ts 找到: ${[...missing].join(', ')}`);
console.log(`\n共 ${changed.length} 個 SKU 已改為 10。`);
