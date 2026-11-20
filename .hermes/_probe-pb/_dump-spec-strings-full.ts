/**
 * 權威 dump (真跑 products 陣列, 非文字掃描): 規格欄位全部唯一中文字串
 * 目的: 舊 probe (.hermes/_probe-pb/size-products-specs.cjs) 以「\n  {\n」切塊, 漏掉 5 個縮排更深的 SKU
 *       (doujinshi-printing / acrylic-keychain / can-badge / postcard-set / eco-tote-bag = 15 欄位)。
 *       本檔改用 tsx 直接載入 products, 確保 95 SKU × 3 欄位 = 285 欄位全覆蓋。
 * 前 223 條順序必須與舊 dump 完全一致 (逐條斷言), 否則索引對位失效即報錯。
 *
 * [Step 5 擴充] 追加第 4 欄 `size` (原 Step 4 只做 material/printMethod/finishing)。
 *   為保住 `_spec-tr-*.json` 的既有索引對位, size 一律**追加在 238 條之後** (第二輪掃描),
 *   並對凍結基準 `_spec-strings-full.step4-238.json` 逐條斷言前 238 條不位移。
 * 用法: npx tsx .hermes/_probe-pb/_dump-spec-strings-full.ts
 */
import { products } from '../../src/data/products';
import * as fs from 'fs';
import * as path from 'path';

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;
const FIELDS = ['material', 'printMethod', 'finishing'] as const;
/** [Step 5] 第二輪追加欄位 (索引接在 238 之後) */
const FIELDS_APPEND = ['size'] as const;
const PROBE = path.join('.hermes', '_probe-pb');

const out: { v: string; n: number; field: string; slugs: string[] }[] = [];
const idx = new Map<string, number>();
let skuN = 0, fieldN = 0, cnField = 0;
for (const p of products) {
  if (!p.specs) continue;
  skuN++;
  for (const f of FIELDS) {
    const v = p.specs[f];
    if (!v) continue;
    fieldN++;
    if (!CJK.test(v)) continue;
    cnField++;
    if (idx.has(v)) { const e = out[idx.get(v)!]; e.n++; if (!e.slugs.includes(p.slug)) e.slugs.push(p.slug); }
    else { idx.set(v, out.length); out.push({ v, n: 1, field: f, slugs: [p.slug] }); }
  }
}

// 舊 dump 對位斷言 (前 197 條; 第 198 條起舊文字掃描 dump 因漏 5 個深縮排 SKU 而整體位移, 見 Step 4 §3)
const old = JSON.parse(fs.readFileSync(path.join(PROBE, '_spec-strings.json'), 'utf8')) as { v: string }[];
const OLD_VERIFIABLE = 197;
let bad = 0;
for (let i = 0; i < OLD_VERIFIABLE; i++) {
  if (out[i]?.v !== old[i].v) { bad++; if (bad <= 5) console.log(`❌ 索引位移 @${i + 1}\n   舊: ${old[i].v}\n   新: ${out[i]?.v}`); }
}
console.log(`SKU(含 specs) ${skuN} / 欄位 ${fieldN} (含中文 ${cnField}) / 唯一字串 ${out.length}`);
console.log(`舊 dump 對位: ${bad === 0 ? '✅ 前 ' + OLD_VERIFIABLE + ' 條逐條一致 (索引 1-' + OLD_VERIFIABLE + ' 有效; 198+ 為 Step 4 已記錄的已知位移)' : '❌ ' + bad + ' 條位移'}`);

// ── [Step 5] 追加 size 欄 (第二輪; 索引從 out.length+1 起) ──
// size 為**逐 SKU 全覆蓋**目標欄 (95 欄位 / 73 唯一字串), 故本輪不做 CJK 過濾:
//   其中 70 條含 CJK (需三語), 3 條為純 ASCII 尺寸串 (A4（210×297mm）等, 語系中性, en/ja = 原文)。
//   三者一併入 dump, 才能讓映射表的「73/73 全覆蓋」可被逐條斷言。
const len238 = out.length;
const sizeAdded: { i: number; v: string; n: number; slugs: string[] }[] = [];
let sizeFieldN = 0, sizeCn = 0;
for (const p of products) {
  if (!p.specs) continue;
  for (const f of FIELDS_APPEND) {
    const v = p.specs[f];
    if (!v) continue;
    sizeFieldN++;
    if (CJK.test(v)) sizeCn++;
    if (idx.has(v)) { const e = out[idx.get(v)!]; e.n++; if (!e.slugs.includes(p.slug)) e.slugs.push(p.slug); }
    else {
      idx.set(v, out.length);
      out.push({ v, n: 1, field: f, slugs: [p.slug] });
      sizeAdded.push({ i: out.length, v, n: 1, slugs: [p.slug] });
    }
  }
}
console.log(`\n[Step 5] size 欄位數 ${sizeFieldN} (含 CJK ${sizeCn} / 純 ASCII ${sizeFieldN - sizeCn}) / 本輪新增唯一字串 ${sizeAdded.length} / dump 總長 ${out.length}`);
console.log(`[Step 5] size 欄唯一字串 index 範圍: ${sizeAdded.length ? sizeAdded[0].i + '-' + sizeAdded[sizeAdded.length - 1].i : '(無)'}`);

// 凍結基準對位斷言 (前 238 條必須逐條與 Step 4 dump 相同)
const frozenPath = path.join(PROBE, '_spec-strings-full.step4-238.json');
let frozenBad = 0;
if (fs.existsSync(frozenPath)) {
  const fz = JSON.parse(fs.readFileSync(frozenPath, 'utf8')) as { v: string }[];
  if (fz.length !== len238) { frozenBad++; console.log(`❌ 凍結基準長度不符: 基準 ${fz.length}, 本輪前段 ${len238}`); }
  for (let i = 0; i < Math.min(fz.length, len238); i++) {
    if (fz[i].v !== out[i].v) { frozenBad++; if (frozenBad <= 5) console.log(`❌ 凍結基準位移 @${i + 1}\n   基準: ${fz[i].v}\n   本輪: ${out[i].v}`); }
  }
  console.log(`凍結基準對位 (前 ${len238} 條): ${frozenBad === 0 ? '✅ 逐條一致 -> _spec-tr-1..5.json 索引仍有效' : '❌ ' + frozenBad + ' 條不符'}`);
} else {
  console.log(`⚠️ 凍結基準 ${path.basename(frozenPath)} 不存在, 跳過對位斷言`);
}

if (bad || frozenBad) { console.log('\n⛔ 對位斷言未過 -> 不寫盤'); process.exit(1); }

fs.writeFileSync(path.join(PROBE, '_spec-strings-full.json'), JSON.stringify(out, null, 1), 'utf8');
out.forEach((o, i) => { if (i >= old.length) console.log(`  ${i + 1} [${o.field}] x${o.n} ${o.slugs.join(',')} | ${o.v}`); });

