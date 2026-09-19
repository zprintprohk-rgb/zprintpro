// moq10-add-missing-quantities.mjs  (v2 — 修正插入位置)
// 2026-09-19 — K3 路線圖 P1-4「補 rounded-corner-greeting-cards / fluorescent-stickers 的 quantities」
//
// 職責: 兩個 SKU 沒有任何數量檔位 (連 variables 區塊都缺) ⇒ QuoteCalculator 與
//       ProductQuoteProvider 只能回退 product.minQuantity, PDP 沒有檔位選擇器。
//       補上與同線 SKU 一致的 `variables.quantities` (含 value:10 起印檔)。
//
// ★ v2 修正: v1 把 quantities 插在頂層 (Product 上的 quantities 只存在於 options 內型別),
//   runtime 讀的是 `product.variables?.quantities` ⇒ 必須放進 variables。
//   既有 SKU 的頂層欄位順序為 … seoImages → variables → seoTitle …, 本腳本比照,
//   插在 `seoTitle:` 行之前 (即 seoImages 區塊結束後)。
//
// ★ 基準 (取同線既有 SKU, 保持品類內部一致):
//     rounded-corner-greeting-cards ← 其他 5 個賀卡 (100/500/1000/2000)
//     fluorescent-stickers          ← 其他貼紙 (100/500/1000)
//   discount 2.35 = 小批量檔倍率, 與 scripts/moq10-prepend-qty-tiers.mjs 同源
//
// ★ 冪等: 已有 variables.quantities 者跳過。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'products.ts');

const PLANS = {
  'rounded-corner-greeting-cards': [
    [10, '10', 2.35],
    [100, '100張', 1],
    [500, '500張', 0.85],
    [1000, '1000張', 0.75],
    [2000, '2000張', 0.7],
  ],
  'fluorescent-stickers': [
    [10, '10', 2.35],
    [100, '100張', 1],
    [500, '500張', 0.85],
    [1000, '1000張', 0.75],
  ],
};

const lines = fs.readFileSync(FILE, 'utf-8').split('\n');
const anchors = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^ {4}slug: '([^']+)'/);
  if (m) anchors.push({ slug: m[1], line: i });
}

const report = [];

// 由後往前處理, 避免行號位移
for (let a = anchors.length - 1; a >= 0; a--) {
  const { slug, line } = anchors[a];
  const plan = PLANS[slug];
  if (!plan) continue;
  const end = a + 1 < anchors.length ? anchors[a + 1].line : lines.length;
  const block = lines.slice(line, end);

  const hasVars = block.some((l) => /^ {4}variables:\s*\{/.test(l));
  const hasQ = block.some((l) => /^\s+quantities:\s*\[/.test(l));
  if (hasQ) { report.push(`${slug}: 已有 variables.quantities, 跳過 (冪等)`); continue; }

  // 插入點: 既有 variables 區塊的結尾; 否則 seoTitle 之前 (對齊同線 SKU 欄位順序)
  let insertAt = -1;
  if (hasVars) {
    const vs = block.findIndex((l) => /^ {4}variables:\s*\{/.test(l));
    for (let k = vs; k < block.length; k++) {
      if (/^ {4}\},?\s*$/.test(block[k])) { insertAt = line + k + 1; break; }
    }
  } else {
    const st = block.findIndex((l) => /^ {4}seoTitle:/.test(l));
    if (st >= 0) insertAt = line + st;
  }
  if (insertAt < 0) { report.push(`${slug}: ⚠ 找不到插入點, 未處理`); continue; }

  const i6 = '      ';
  const i4 = '    ';
  const newLines = hasVars
    ? [
        `${i6}quantities: [`,
        ...plan.map(([v, label, d]) => `${i6}  { value: ${v}, label: '${label}', discount: ${d} },`),
        `${i6}],`,
      ]
    : [
        `${i4}variables: {`,
        `${i6}quantities: [`,
        ...plan.map(([v, label, d]) => `${i6}  { value: ${v}, label: '${label}', discount: ${d} },`),
        `${i6}],`,
        `${i4}},`,
      ];

  lines.splice(insertAt, 0, ...newLines);
  report.push(`${slug}: ${hasVars ? '併入既有 variables' : '新建 variables'} → quantities ${plan.map((p) => p[0]).join('/')} (插入 @line ${insertAt + 1})`);
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf-8');
console.log('=== 補 variables.quantities ===');
for (const r of report) console.log('  ' + r);
