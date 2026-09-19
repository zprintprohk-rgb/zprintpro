// moq10-add-small-batch-tiers.mjs  (v2 — 修正 99→100 價格斷崖)
// 2026-09-19 — 全網站起訂量修正 (紙品 100 → 10) 第 1 步
//
// 職責: 為受影響的紙品 price-table 加入「小批量 modeled 檔」。
//
// ★ v2 修正 (v1 缺陷): v1 用「開機費 50 + qty × 加價單價」建模, 令 99 檔總價
//   (198.5) 高於既有真實 100 檔 (125) ⇒ 客戶加 1 張反而便宜 HK$73 的斷崖。
//   v2 改為「以小批量區間上限 = 既有最低真實檔總價 (T100) 為天花板」建模,
//   保證 新增檔 ≤ T100, 且 k₁₀ < k₂₅ < k₅₀ < k₇₅ < k₉₉ ≤ 1 (單調遞增)。
//
// ★ 紅線: **既有 anchor/modeled 檔一律不動** (它們是已校準工廠報價)。
//   本腳本只「插入」低於 T100 的新檔, 不修改任何既有檔的值。
//
// ★ 資料誠信 (§0.23): 新增檔標 src="modeled-small-batch" + calibratedAt="待校準",
//   不冒充 anchor。
// ★ 冪等: 已存在同 qty 檔者跳過, 可重複執行。

import fs from 'fs';
import path from 'path';

const DIR = path.join(process.cwd(), 'src', 'data', 'price-tables');
const LADDER = [10, 25, 50, 75, 99];

/**
 * 成本模型 (v3):
 *   整批價(q) = 開機費 HK$50 + q × (進場單價 + 附加單價[q])
 *   進場單價 = 既有最低檔的單價 (客戶真正落單量級的價)
 *   附加單價 = 小批量懲罰, 隨量遞減到 0 → 起印量愈低單張愈貴
 *   天花板 = 既有最低檔整批總價 (T100), 確保 99 檔不貴過 100 檔
 * 不變量: k(q) 單調遞增, 且 k(99) ≤ T100。
 */
const SETUP_FEE_HKD = 50;
/**
 * 小批量懲罰係數 Λ(q) — 進場檔位以上的單張加價倍率, 隨量遞減至 1。
 *   1 檔 (10) 加價 2.35× : 開機/校色/上機調試完全攤在 10 張上, 且屬打樣性質
 *   99 檔 = 1.00×       : 貼齊既有真實 100 檔單價, 保證不貴過 100 張
 */
const LAMBDA = { 10: 2.35, 25: 1.52, 50: 1.08, 75: 1.01, 99: 1.00 };

const SRC = 'modeled-small-batch';
const CALIB = '待校準';
const NOTE = `數碼小批量模擬檔 (開機費 HK$50 + 隨量遞減單張價); 待工廠實詢校準`;

const round05 = (x) => Math.round(x * 2) / 2;

function unitOf(t) {
  const total = totalOf(t);
  if (total !== null && t.qty) return total / t.qty;
  if (typeof t.unit === 'number') return t.unit;
  return null;
}
function totalOf(t) {
  if (typeof t.price === 'number') return t.price;
  if (typeof t.sell_hkd === 'number') return t.sell_hkd;
  if (typeof t.unit === 'number') return t.unit * t.qty;
  return null;
}

/**
 * 建立小批量檔。
 * @param {Array} tiers 既有檔
 * @param {(q:number,total:number)=>object} make 由 (qty, 整批總價) 造出該檔案格式
 */
function buildSmallBatchTiers(tiers, make) {
  const base = [...tiers]
    .filter((t) => unitOf(t) !== null)
    .sort((a, b) => a.qty - b.qty);
  if (!base.length) return [];

  const first = base[0];
  const anchorQty = first.qty;          // 既有最低檔數量 = 天花板的位置
  const t100 = totalOf(first);          // 既有最低檔整批總價
  const r1 = unitOf(first);             // 進場單價
  if (!(t100 > 0) || !(r1 > 0)) return [];

  /*
   * 天花板 —— 全域, 按「anchor 單張價」推導 (最終採用版)
   *
   *   模型保持「開機費 HK$50 + q × 進場單價 × 遞減倍率」, 即 10 張真係收返開機成本
   *   (A5: 10 張 HK$79.5)。天花板只負責收口, 唔可以取代成本模型:
   *   ⚠ 曾試「逐檔上限 capUnit×q」—— 數學上 100% 單調, 但令 10 張 A5 跌到
   *     HK$12.5 (低過成本), 屬嚴重錯價, 已否決。
   *
   *   採用: ceiling = floor( min(t100×0.98, anchorQty × floor(r1×100)/100) × 2 ) / 2
   *     · 保證 10-99 檔整批總價 < 既有最低檔總價
   *     · 99→anchor 的單張價最多微升 (a5: 1.2374 → 1.25 = +1.02%),
   *       屬「99 張 122.5 / 100 張 125」的正常階梯收口, 非倒掛
   *       (倒掛 = 總價下降; 此處總價 122.5 → 125 仍然上升)
   */
  const unitCeiling = Math.floor(r1 * 100) / 100;        // anchor 單張價 (向下取 2 位)
  /*
   * 天花板 = min(anchor 總價 × 0.98, anchorQty × anchor單張價), 落 0.5 網格。
   *
   * ⚠ 為何唔再加「0.5 邊際」去夾到單張價 100% 單調:
   *   貼紙 anchor 自身就唔單調 (50張 HK$73 → 100張 HK$71, 工廠實價),
   *   且 10 張的成本 (開機費 50 + 成本單價×10 ≈ 72) 已經 ≥ anchor 50 張的 73×0.98,
   *   若要連「10 檔單張價 ≤ anchor 單張價」都硬守, 就會跌到 10 張 HK$12.5
   *   (實測, 低於成本) —— 屬錯價, 唔可以接受。
   *
   * 故本批守住的是「**總價**永不倒掛」(客戶加量永遠唔會總價更貴, 即 99 檔 ≤ anchor),
   *   唔係「每一步單張價都單調」。殘留的 99→anchor 單張價微升屬既有錨點特性, 已知並記錄。
   */
  /*
   * ⚠ 天花板最後一定要 floor 到整數: gen-price-data.mjs 會 Math.round 每個 price,
   *   122.5 → 123 就會頂穿 122.5 的天花板 (a4: 372.5 → 373 > 372 實測踩到)。
   *   floor 到整數後 rounding 係 idempotent, 生成檔一定 ≤ 天花板。
   */
  const ceiling = Math.floor(Math.min(t100 * 0.98, anchorQty * unitCeiling));

  // 只補「嚴格低於既有最低檔數量」的檔位 (anchor=50 時不補 50, 免與既有檔重複)
  const have = new Set(tiers.map((t) => t.qty));
  const needing = LADDER.filter((q) => !have.has(q) && q < anchorQty);
  if (!needing.length) return [];

  /*
   * 計價 → 夾天花板 → running max 保證總價不降。
   * ⚠ 唔可以用「強制 total = prev + 0.5」: 會喺天花板附近越界
   *   (實測 small-batch-stickers: 75/99 都貼住天花板, +0.5 就爆)。
   *   改為 plateau: 總價走平時單張價仍然下跌, 客戶觀感正確。
   */
  let prev = 0;
  return needing.map((q) => {
    let total = SETUP_FEE_HKD + q * r1 * LAMBDA[q];
    total = Math.min(total, ceiling);
    total = round05(total);
    if (total < prev) total = prev;      // 走平, 不越天花板
    prev = total;
    return make(q, total);
  });
}

const report = [];

// ── 1/2. flyers.json + stickers.json: products[].tiers 用 price/unit ──
for (const [file, label] of [['flyers.json', 'flyers'], ['stickers.json', 'stickers']]) {
  const p = path.join(DIR, file);
  const j = JSON.parse(fs.readFileSync(p, 'utf-8'));
  for (const prod of j.products) {
    const add = buildSmallBatchTiers(prod.tiers, (q, total) => ({
      qty: q,
      price: total,
      unit: Math.round((total / q) * 100) / 100,
      src: SRC,
      note: NOTE,
      calibratedAt: CALIB,
      setupFeeHKD: SETUP_FEE_HKD,
    }));
    if (!add.length) continue;
    prod.tiers = [...add, ...prod.tiers];
    report.push(`${file}/${prod.sku}: 新增 ${add.map((t) => t.qty).join('/')} → 最低檔 10 @ HK$${add[0].price} (單張 HK$${add[0].unit})`);
  }
  j._meta.note = (j._meta.note || '') + ` | 2026-09-19 全站起訂量修正: 加入小批量 modeled 檔 (10/25/50/75/99, 區間上限 = 既有最低檔價), 待工廠實詢校準。`;
  j._meta.src_legend = j._meta.src_legend || {};
  j._meta.src_legend[SRC] = `數碼小批量模擬檔 (10-99 張, 開機費/調機攤分), 待校準`;
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf-8');
}

// ── 3. digital-stickers-cost.json: configs[].tiers 用 sell_hkd/cost_rmb/weight_kg ──
{
  const file = path.join(DIR, 'digital-stickers-cost.json');
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let touched = 0;
  for (const c of j.configs) {
    const sorted = [...c.tiers].sort((a, b) => a.qty - b.qty);
    const first = sorted[0];
    const kgPerUnit = first && typeof first.weight_kg === 'number' && first.qty ? first.weight_kg / first.qty : null;
    const add = buildSmallBatchTiers(c.tiers, (q, total) => {
      const coeff = (first && first.coeff_zh) || 1.6;
      return {
        qty: q,
        cost_rmb: Math.round((total / coeff) * 10) / 10,
        sell_hkd: total,
        weight_kg: kgPerUnit ? Math.round(kgPerUnit * q * 100) / 100 : null,
        coeff_zh: first ? first.coeff_zh : undefined,
        coeff_intl: first ? first.coeff_intl : undefined,
        src: SRC,
        note: NOTE,
        calibratedAt: CALIB,
        setupFeeHKD: SETUP_FEE_HKD,
      };
    });
    if (!add.length) continue;
    c.tiers = [...add, ...c.tiers];
    touched++;
  }
  j.note = (j.note || '') + ` | 2026-09-19 全站起訂量修正: 加入小批量 modeled 檔 (10/25/50/75/99), 待工廠實詢校準。`;
  j.smallBatchModelSrc = SRC;
  fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf-8');
  report.push(`digital-stickers-cost.json: ${touched}/${j.configs.length} configs 新增小批量檔`);
}

// ── 4. flyers-cost-yate98.json (custom-flyers) ──
{
  const file = path.join(DIR, 'flyers-cost-yate98.json');
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let touched = 0;
  for (const c of j.configs) {
    const add = buildSmallBatchTiers(c.tiers, (q, total) => ({
      qty: q,
      price: total,
      unit: Math.round((total / q) * 100) / 100,
      src: SRC,
      note: NOTE,
      calibratedAt: CALIB,
      setupFeeHKD: SETUP_FEE_HKD,
    }));
    if (!add.length) continue;
    c.tiers = [...add, ...c.tiers];
    touched++;
  }
  j.note = (j.note || '') + ` | 2026-09-19 全站起訂量修正: custom-flyers 加入小批量 modeled 檔, 待工廠實詢校準 (大尺寸/特種工藝 config 需人工複核)。`;
  j.smallBatchModelSrc = SRC;
  fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf-8');
  report.push(`flyers-cost-yate98.json: ${touched}/${j.configs.length} configs 新增小批量檔`);
}

// ── 5. special-fold-leaflets.json (folded-leaflets) ──
//   ⚠ 2026-09-19 補: 首版漏了此檔, 令 folded-leaflets 的 price-table 最低檔仍為 300,
//   與 minQuantity=10 矛盾 (PDP 參考價表只會顯示 300 起)。
{
  const file = path.join(DIR, 'special-fold-leaflets.json');
  const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let touched = 0;
  for (const c of j.configs) {
    const add = buildSmallBatchTiers(c.tiers, (q, total) => ({
      qty: q,
      price: total,
      unit: Math.round((total / q) * 100) / 100,
      src: SRC,
      note: NOTE,
      calibratedAt: CALIB,
      setupFeeHKD: SETUP_FEE_HKD,
    }));
    if (!add.length) continue;
    c.tiers = [...add, ...c.tiers];
    touched++;
  }
  j.note = (j.note || '') + ` | 2026-09-19 全站起訂量修正: 摺頁加入小批量 modeled 檔 (10/25/50/75/99)。`;
  j.smallBatchModelSrc = SRC;
  fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n', 'utf-8');
  report.push(`special-fold-leaflets.json: ${touched}/${j.configs.length} configs 新增小批量檔`);
}

console.log('=== moq10 small-batch tiers (v2) ===');
for (const r of report) console.log('  ' + r);
console.log(`\n共 ${report.length} 個 product/config 群組已更新。`);
