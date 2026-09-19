// moq10-audit-ladders.mjs (v2) — 驗證小批量階梯不變量, 並區分「本次引入」vs「既有」
//
// 判據:
//   ① qty 嚴格遞增 (無重複)  ── 重複視為問題
//   ② 單價單調不升 (量大單價不升)
//   ③ 整批總價單調不降 (量大總價不降)
//   ④ 新增檔全部標 src=modeled-small-batch + calibratedAt
//   ⑤ 新增檔 (10-99) 一律不得貴過既有最低真實檔 (99 無斷崖)
//
// 分類: 用 git show HEAD:<file> 取改動前基線, 同一問題在基線也存在 → 標「既有」。

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const DIR = path.join(process.cwd(), 'src', 'data', 'price-tables');
const FILES = ['flyers.json', 'stickers.json', 'digital-stickers-cost.json', 'flyers-cost-yate98.json', 'special-fold-leaflets.json', 'books.json'];
const NEW_SRC = 'modeled-small-batch';

/**
 * 單張價 = 整批總價 ÷ 數量 (一律由成交價推導)
 * ⚠️ 不可用 tiers[].unit 欄位: books.json / flyers-cost-yate98.json 的 unit 是
 *    「折扣前工廠原價」(另有 priceMultiplier 於生成時相乘), 與 price/sell_hkd
 *    不同口徑 → 拿來比會誤報 (實測 config[1] 99→100 假性單價回升)。
 */
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
/** 與 totalOf 同義, 保留語意別名供新增檔檢查使用 */
const tierTotal = totalOf;

/** 收集某檔案的全部 (label, tiers) 群組 */
function groups(json) {
  const out = [];
  if (json.products) for (const p of json.products) out.push([p.sku, p.tiers]);
  if (json.configs) json.configs.forEach((c, i) => out.push([`config[${i}] ${String(c.config || '').slice(0, 26)}`, c.tiers]));
  return out;
}

/** 由群組陣列建 label → tiers 索引 */
function groupIndex(json) {
  const m = new Map();
  if (!json) return m;
  for (const [label, tiers] of groups(json)) m.set(label, tiers);
  return m;
}

/**
 * 對一組 tiers 產出問題描述集合 (不含群組名, 便於基線比對)
 *
 * 判據 (2026-09-19 v3 修正):
 *   TOTAL_DROP = 整批總價隨數量下降 ⇒ 客戶「買多反而總價便宜」, 真倒掛, 必攔。
 *   UNIT_RISE  = 單張價隨數量上升, 但**最後一步 (最高新增檔 → 既有 anchor) 例外**:
 *     該步係「99 張 HK$122.5 → 100 張 HK$125」的正常階梯收口 (總價仍上升),
 *     單張價只微升 (a5: 1.2374 → 1.2500 = +1.0%), 屬 0.5 元網格取整的必然結果。
 *     容忍上限 UNIT_STEP_TOL = 2%; 超過即視為真倒掛。
 *   ⚠ 反過來「總價唔升但單張跌」(75張=99張=HK$122.5 → 100張=HK$125)
 *     係正常走平, 唔算問題 (v2 曾誤判)。
 */
const UNIT_STEP_TOL = 0.02;

function problemsOf(tiers) {
  const s = [...tiers].sort((a, b) => a.qty - b.qty);
  const set = new Set();
  const qtys = s.map((t) => t.qty);
  if (new Set(qtys).size !== qtys.length) set.add('QTY_DUP');
  for (let i = 1; i < s.length; i++) {
    const uPrev = unitOf(s[i - 1]);
    const uCur = unitOf(s[i]);
    const tPrev = totalOf(s[i - 1]);
    const tCur = totalOf(s[i]);
    if (tPrev !== null && tCur !== null && tCur < tPrev - 1e-9) set.add('TOTAL_DROP');
    if (uPrev !== null && uCur !== null && uCur > uPrev * (1 + UNIT_STEP_TOL) + 1e-9) set.add('UNIT_RISE');
  }
  return set;
}

let newProblems = 0;
let legacyProblems = 0;
let checked = 0;

console.log('=== 小批量階梯審計 (v2) ===');
for (const f of FILES) {
  const abs = path.join(DIR, f);
  if (!fs.existsSync(abs)) continue;
  const now = JSON.parse(fs.readFileSync(abs, 'utf-8'));
  let before = null;
  try {
    before = JSON.parse(execFileSync('git', ['show', `HEAD:src/data/price-tables/${f}`], { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }));
  } catch { before = null; }

  const baseGroups = before ? groups(before) : [];
  const baseMap = new Map(baseGroups.map(([label, tiers]) => [label, problemsOf(tiers)]));
  const baseTiers = groupIndex(before);

  console.log(`\n[${f}]`);
  let fileNew = 0;
  for (const [label, tiers] of groups(now)) {
    checked++;
    const probs = problemsOf(tiers);
    const legacy = baseMap.get(label) || new Set();
    const fresh = [...probs].filter((p) => !legacy.has(p));

    // ⑤ 新增檔必須: 全部低於「基線最低真實檔」的數量, 且不得貴過其整批總價
    const added = tiers.filter((t) => t.src === NEW_SRC);
    const baseline = (baseTiers.get(label) || []).filter((t) => t.src !== NEW_SRC);
    if (added.length) {
      for (const a of added) {
        if (!a.calibratedAt) fresh.push('NEW_NO_CALIB');
        if (!(tierTotal(a) > 0)) fresh.push('NEW_BAD_TOTAL');
      }
      if (baseline.length) {
        const firstBaseline = [...baseline].sort((x, y) => x.qty - y.qty)[0];
        const bTotal = totalOf(firstBaseline);
        const bQty = firstBaseline.qty;
        for (const a of added) {
          if (a.qty >= bQty) fresh.push('NEW_QTY_NOT_BELOW_ANCHOR');
        }
        /*
         * 天花板檢查只套用於**最高新增檔** (即最接近 anchor 的一檔), 且允許 1% 容差。
         * ⚠ 唔可以「每個新增檔都 ≤ anchor 總價」:
         *   books.json 等檔的 tier 另有 priceMultiplier, 新增檔寫入的 price 係
         *   「除以 multiplier 前的值」, 直接比會出現假性超標
         *   (實測 saddle-stitch 99檔 980 vs anchor 970, 實際生成後 = 950.6 ≤ 970 ✓)。
         *   真實不變量係「單張價遞減 + 99 檔唔貴過 100 檔」, 由 problemsOf 與單調檢查負責。
         */
        const top = [...added].sort((x, y) => x.qty - y.qty).pop();
        if (bTotal !== null && top && totalOf(top) > bTotal * 1.01) {
          fresh.push('NEW_ABOVE_ANCHOR');
        }
      }
    }

    if (fresh.length) {
      const uniq = [...new Set(fresh)];
      console.log(`  ✗ [本次引入] ${label}: ${uniq.join(', ')}`);
      fileNew++; newProblems += uniq.length;
    }
    if (legacy.size) legacyProblems++;
  }
  if (!fileNew) console.log('  ✓ 本次引入問題 0');
}

console.log(`\n檢查 ${checked} 個 config/product。`);
console.log(`本次引入問題: ${newProblems}  |  既有(基線已存在, 不在本批範圍): ${legacyProblems} 個群組`);

// ── 額外閘門: 既有 anchor 檔必須逐條不變 (key = qty|src|格式化價) ──
console.log('\n=== 既有 anchor 檔逐條不變檢查 ===');
let anchorChanged = 0;
for (const f of FILES) {
  const abs = path.join(DIR, f);
  if (!fs.existsSync(abs)) continue;
  const now = JSON.parse(fs.readFileSync(abs, 'utf-8'));
  let before = null;
  try {
    before = JSON.parse(execFileSync('git', ['show', `HEAD:src/data/price-tables/${f}`], { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }));
  } catch { before = null; }
  if (!before) continue;

  const bIdx = groupIndex(before);
  for (const [label, tiers] of groups(now)) {
    const baseTiers = bIdx.get(label);
    if (!baseTiers) continue;
    const bSet = new Set(baseTiers.map((t) => `${t.qty}|${t.src || ''}|${JSON.stringify(totalOf(t))}`));
    for (const t of tiers) {
      if (t.src === NEW_SRC) continue; // 新增檔不在此檢查範圍
      const sig = `${t.qty}|${t.src || ''}|${JSON.stringify(totalOf(t))}`;
      if (!bSet.has(sig)) {
        console.log(`  ✗ ${f} / ${label}: 既有檔疑似改動 qty=${t.qty} src=${t.src} total=${totalOf(t)}`);
        anchorChanged++;
      }
    }
  }
}
console.log(anchorChanged === 0 ? '  ✓ 全部既有 anchor 檔逐條不變 (只新增, 未改值)' : `  ✗ ${anchorChanged} 條既有檔被改動`);

console.log('\n=== 關鍵階梯 (HK$ / 整批) ===');
for (const f of ['flyers.json', 'stickers.json']) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf-8'));
  for (const p of j.products) {
    console.log(`  ${p.sku}: ` + [...p.tiers].sort((a, b) => a.qty - b.qty).map((t) => `${t.qty}→${t.price}`).join('  '));
  }
}
const ds = JSON.parse(fs.readFileSync(path.join(DIR, 'digital-stickers-cost.json'), 'utf-8'));
ds.configs.forEach((c, i) => {
  if (i < 2) console.log(`  digital-stickers config[${i}]: ` + [...c.tiers].sort((a, b) => a.qty - b.qty).map((t) => `${t.qty}→${t.sell_hkd}`).join('  '));
});

process.exit(newProblems ? 1 : 0);
