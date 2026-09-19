// moq10-add-books-ladder.mjs
// 2026-09-19 — K3 路線圖 P2-7「畫冊 10-99 本獨立價階」
//
// 職責: 為書刊本冊 SKU 加入 10/25/50/75/99 本的 modeled 檔, 令「10-99 本」有獨立價階可承接。
//
// ★ 與 P1「書刊 minQuantity 維持 100」的張力 (必須明講):
//   本腳本只加**價階**, 未改 products.ts 的 minQuantity (=100)。
//   即: 階梯已就緒, 但前台起訂量口徑仍係 100 (書刊顯示層另有「1 本起印(數碼)」口徑)。
//   要真正放開 10 本落單, 需 K3 再拍板 (並同步門童 #19 — 該門童已於本次改為動態讀 minQuantity)。
//
// ★ 模型 (刻意保守, 只用既有 anchor 推導, 不引入無法佐證的固定成本):
//     r1     = anchor 單張價 (既有最低檔)
//     開機費 = r1 × SETUP_RATIO   (書刊紙張成本隨量線性, 故開機費按 r1 比例定, 而非硬編 HK$50)
//     目標值 = 開機費 + q × r1 × Λ(q)   (Λ 遞減, q=99 時 =1.00 → 貼齊 anchor 單價)
//     上限   = anchor 整批總價 × 0.98   (不得貴過既有最低檔)
//     實價   = min(目標值, 上限), 再取 running max 保單調
//   ⇒ 保證: 單張價遞減、99 檔不貴過 100 檔、既有 anchor 逐條不動。
//
// ★ 資料誠信: 新增檔標 src="modeled-small-batch" + calibratedAt="待校準"。
// ★ 冪等: 已有 qty 檔者跳過。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'price-tables', 'books.json');
const LADDER = [10, 25, 50, 75, 99];
const LAMBDA = { 10: 1.85, 25: 1.45, 50: 1.15, 75: 1.04, 99: 1.00 };
const SETUP_RATIO = 0.5;          // 開機費 = anchor 單張價 × 0.5
const SRC = 'modeled-small-batch';
const CALIB = '待校準';

const round2 = (x) => Math.round(x * 100) / 100;
const round05 = (x) => Math.round(x * 2) / 2;

const j = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
const report = [];

for (const p of j.products) {
  const tiers = p.tiers.filter((t) => typeof t.price === 'number');
  if (!tiers.length) continue;
  const sorted = [...tiers].sort((a, b) => a.qty - b.qty);
  const anchor = sorted[0];
  const mult = p.priceMultiplier ?? 1;

  /*
   * ⚠ 必須在「最終成交價空間」做運算:
   *   books.json 的 tier.price 係**折扣前原價**, 生成時 gen-price-data.mjs 會乘 priceMultiplier
   *   (saddle-stitch 0.97 / perfect-bound 0.94)。
   *   首版直接在 price 空間夾天花板 ⇒ 生成後 99 檔 951 > anchor 100 檔 941 (實測倒掛)。
   *   故一律用 final = price × mult 比較, 寫入時再 ÷ mult。
   */
  const anchorFinal = anchor.price * mult;
  const r1 = anchorFinal / anchor.qty;
  const ceiling = anchorFinal * 0.98;

  const have = new Set(p.tiers.map((t) => t.qty));
  const needing = LADDER.filter((q) => !have.has(q));
  if (!needing.length) { report.push(`${p.sku}: 已有小批量檔, 跳過 (冪等)`); continue; }

  const setup = r1 * SETUP_RATIO;
  let prev = 0;
  const added = needing.map((q) => {
    let finalTotal = setup + q * r1 * LAMBDA[q];
    finalTotal = Math.min(finalTotal, ceiling);
    finalTotal = round05(finalTotal);
    if (finalTotal < prev) finalTotal = prev;
    prev = finalTotal;
    return {
      qty: q,
      price: Math.round(finalTotal / mult),      // 寫回折扣前原價空間
      unit: round2(finalTotal / q),              // 單本價按最終成交價計 (僅參考)
      src: SRC,
      note: `書刊小批量模擬檔 (開機費 ≈ 單本價 × ${SETUP_RATIO} + 隨量遞減單本價); 待工廠實詢校準`,
      calibratedAt: CALIB,
    };
  });

  p.tiers = [...added, ...p.tiers];
  report.push(
    `${p.sku}: anchor ${anchor.qty}本 最終 HK$${anchorFinal} (單本 ${r1.toFixed(2)}, mult ${mult}) → 加 ` +
    added.map((t) => `${t.qty}→最終HK$${Math.round(t.price * mult)}`).join(' ')
  );
}

j._meta.note = (j._meta.note || '') + ' | 2026-09-19 P2-7: 加入 10/25/50/75/99 本書刊小批量 modeled 檔 (待校準)。';
j._meta.src_legend = j._meta.src_legend || {};
j._meta.src_legend[SRC] = '書刊小批量模擬檔 (開機費按單本價比例 + 隨量遞減), 待校準';

fs.writeFileSync(FILE, JSON.stringify(j, null, 2) + '\n', 'utf-8');
console.log('=== 書刊 10-99 本價階 ===');
for (const r of report) console.log('  ' + r);
