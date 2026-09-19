// moq10-add-a1-ladder.mjs
// 2026-09-19 — K3 路線圖 P0-2「A1 海報獨立 minQuantity = 1 + 獨立價階」第 1 步
//
// 職責: 為 posters.json 的 2 個 A1 config 加入 qty = 1 / 3 / 5 / 7 的 **modeled 起印檔**,
//       令「A1 一張起印」在市場合乎成本的前提下成立 (噴繪無需製版, 但單張要攤開機與調機成本)。
//
// 模型 (與 A2 既有檔位同源, 但按「起印量溢價」遞減):
//   單張價(q) = A1 基準單張價 × (1 + surcharge[q])
//     surcharge = { 1: 0.55, 3: 0.33, 5: 0.15, 7: 0.05 }   → q=10 貼齊既有 anchor (290/360)
//   天花板 = floor(anchorQty(10) × floor(anchor單張價, 2位) × 0.98 / 2) × 2 = 284 (不可越過 10 張檔總價)
//
// ★ 資料誠信 (§0.23): 新增加檔一律標 src="modeled-small-batch" + calibratedAt="待校準";
//   既有 10/20/50/100/200 檔逐條不動。
// ★ 冪等: 已存在同 qty 檔者跳過。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'price-tables', 'posters.json');
const LADDER = [1, 3, 5, 7];
const SURCHARGE = { 1: 0.55, 3: 0.33, 5: 0.15, 7: 0.05 };
const SRC = 'modeled-small-batch';
const CALIB = '待校準';
const NOTE = 'A1 起印模擬檔 (單張噴繪須攤開機與調機成本, 起印量愈低單張愈貴); 待工廠實詢校準';

const j = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
const a1Configs = j.configs.filter((c) => String(c.config).includes('A1'));
if (!a1Configs.length) throw new Error('posters.json 找不到 A1 config');

const report = [];
for (const c of a1Configs) {
  const sorted = [...c.tiers].filter((t) => typeof t.sell_hkd === 'number').sort((a, b) => a.qty - b.qty);
  if (!sorted.length) continue;
  const anchor = sorted[0];                       // A1 既有最低檔 (qty=10)
  const anchorUnit = Math.floor((anchor.sell_hkd / anchor.qty) * 100) / 100;
  const ceiling = Math.floor(Math.min(anchor.sell_hkd * 0.98, anchor.qty * anchorUnit) * 2) / 2;

  const have = new Set(c.tiers.map((t) => t.qty));
  const needing = LADDER.filter((q) => !have.has(q));

  let prev = 0;
  const added = needing.map((q) => {
    let total = q * anchorUnit * (1 + SURCHARGE[q]);
    total = Math.min(total, ceiling);
    total = Math.round(total * 2) / 2;
    if (total < prev) total = prev;
    prev = total;
    return {
      qty: q,
      sell_hkd: total,
      production: anchor.production,
      weight_kg: anchor.weight_kg ?? null,
      src: SRC,
      note: NOTE,
      calibratedAt: CALIB,
    };
  });
  c.tiers = [...added, ...c.tiers];
  report.push(`${String(c.config).slice(0, 46)}: anchor ${anchor.qty}張=${anchor.sell_hkd} (單張 ${anchorUnit}) → 加 ${added.map((t) => `${t.qty}→${t.sell_hkd}`).join(' ')}  [ceiling ${ceiling}]`);
}

j.note = (j.note || '') + ' | 2026-09-19 A1 獨立起印階梯: 加入 qty 1/3/5/7 modeled 檔 (K3 路線圖 P0-2)。';
j.smallBatchModelSrc = SRC;
fs.writeFileSync(FILE, JSON.stringify(j, null, 2) + '\n', 'utf-8');

console.log('=== A1 起印階梯 ===');
for (const r of report) console.log('  ' + r);
console.log(`\n共 ${report.length} 個 A1 config 已更新。`);
