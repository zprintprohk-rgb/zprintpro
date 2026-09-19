// moq10-set-a1-moq.mjs
// 2026-09-19 — K3 路線圖 P0-2「A1 海報獨立」第 2 步
//
// 職責: 把 a1-posters 的 minQuantity 100 → 1, 並把 variables.quantities 改為以 1 為首的階梯
//       (原 100/500/1000 全在 price table 之外, 屬死資料, 且與「A1 一張起印」矛盾)。
//
// ★ 冪等: 已為 1 者跳過。
// ★ 只動 a1-posters, 不碰任何其他 SKU。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'products.ts');
const SLUG = 'a1-posters';
const NEW_MOQ = 1;
/** A1 新數量階梯 (對應 price-table 的 1/3/5/7/10/20): discount 相對 1 張檔 */
const NEW_QUANTITIES = [
  `{ value: 1, label: '1張', discount: 1 },`,
  `{ value: 3, label: '3張', discount: 0.86 },`,
  `{ value: 5, label: '5張', discount: 0.77 },`,
  `{ value: 10, label: '10張', discount: 0.64 },`,
  `{ value: 20, label: '20張', discount: 0.55 },`,
];

const lines = fs.readFileSync(FILE, 'utf-8').split('\n');
const anchors = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^ {4}slug: '([^']+)'/);
  if (m) anchors.push({ slug: m[1], line: i });
}
const idx = anchors.findIndex((a) => a.slug === SLUG);
if (idx < 0) throw new Error(`${SLUG} 不在 products.ts`);
const start = anchors[idx].line;
const end = idx + 1 < anchors.length ? anchors[idx + 1].line : lines.length;

const report = [];

// 1) minQuantity
for (let i = start; i < end; i++) {
  const m = lines[i].match(/^(\s+minQuantity:\s*)(\d+)(,.*)$/);
  if (!m) continue;
  if (Number(m[2]) === NEW_MOQ) { report.push(`minQuantity 已是 ${NEW_MOQ} (冪等)`); break; }
  report.push(`minQuantity: ${m[2]} → ${NEW_MOQ} (line ${i + 1})`);
  lines[i] = `${m[1]}${NEW_MOQ}${m[3]}`;
  break;
}

// 2) quantities 區塊整段替換
let qStart = -1;
for (let i = start; i < end; i++) if (/^\s+quantities:\s*\[/.test(lines[i])) { qStart = i; break; }
if (qStart < 0) throw new Error(`${SLUG} 無 quantities 區塊`);
let qEnd = -1;
for (let i = qStart; i < end; i++) if (/^\s+\],?\s*$/.test(lines[i])) { qEnd = i; break; }
if (qEnd < 0) throw new Error(`${SLUG} quantities 區塊未閉合`);

const firstEntry = lines.slice(qStart + 1, qEnd).find((l) => /value:/.test(l));
const indent = firstEntry ? firstEntry.match(/^(\s*)/)[1] : '        ';
const trailingComma = /,\s*$/.test(lines[qEnd]) ? ',' : '';
lines.splice(qStart + 1, qEnd - qStart - 1, ...NEW_QUANTITIES.map((s) => indent + s));
report.push(`quantities: 3 檔 (100/500/1000) → 5 檔 (1/3/5/10/20)`);

fs.writeFileSync(FILE, lines.join('\n'), 'utf-8');
console.log('=== A1 minQuantity + quantities ===');
for (const r of report) console.log('  ' + r);
