/**
 * single-brand-fix.cjs — 单品牌化一次性落地 (K3 2026-09-13 拍板)
 *
 * 口径 (K3 确认): zh-hk 用「智印港」/ en·ja 用「ZprintPro」，**双品牌不再同时出现**（§1 品牌分层）
 * 范围:
 *   ① zprintpro-sku-seo-data.csv 内全部「智印港 ZprintPro」→「智印港」(59 行 title 单元格)
 *   ② src/data/sku-seo-data.ts 内 2 个名片 SKU (thick-greeting-cards-400g / foil-greeting-cards)
 *      的 zh-hk title 尾缀 `ZprintPro` → `智印港` (K3 2026-09-13「接你的建议」)
 * 安全: 备份 → 断言(残留0 / key数不变 / 名片 slug 仍在) → 干跑 → --apply
 * 注: en/ja 侧本就以 ZprintPro 结尾, 无需改动 (实测双品牌 0 处)
 */
const fs = require('fs');

const APPLY = process.argv.includes('--apply');
const CSV = 'zprintpro-sku-seo-data.csv';
const TS = 'src/data/sku-seo-data.ts';
const BC = ['thick-greeting-cards-400g', 'foil-greeting-cards'];

// ── ① CSV: 双品牌 → 单品牌 ──────────────────────────────
const csvOrig = fs.readFileSync(CSV, 'utf8');
const csvDual = (csvOrig.match(/智印港 ZprintPro/g) || []).length;
const csvNew = csvOrig.split('智印港 ZprintPro').join('智印港');
const csvLeft = (csvNew.match(/智印港 ZprintPro/g) || []).length;
const csvLinesOld = csvOrig.split('\n').length;
const csvLinesNew = csvNew.split('\n').length;
// CSV 完整性: 行数与逗号数必须不变 (只替换文本, 不得动分隔符)
const csvCommaOld = (csvOrig.match(/,/g) || []).length;
const csvCommaNew = (csvNew.match(/,/g) || []).length;

// ── ② TS: 2 个名片 SKU 的 zh-hk title 尾缀 ──────────────
const tsOrig = fs.readFileSync(TS, 'utf8');
const keysOld = (tsOrig.match(/": \{/g) || []).length;
let tsNew = tsOrig;
const perSku = {};
for (const slug of BC) {
  const re = new RegExp('("' + slug + '":\\s*\\{[\\s\\S]{0,400}?"zh-hk":\\s*\\{[\\s\\S]{0,80}?"title":\\s*")([^"]*)(")');
  const m = tsNew.match(re);
  if (!m) { perSku[slug] = 'NOT-FOUND'; continue; }
  const before = m[2];
  const after = before.replace(/\s*ZprintPro\s*$/, ' | 智印港');
  perSku[slug] = { before, after };
  tsNew = tsNew.replace(re, '$1' + after + '$3');
}
const keysNew = (tsNew.match(/": \{/g) || []).length;
const bcPresent = BC.every((s) => tsNew.includes('"' + s + '":'));

console.log(`=== 单品牌化 (${APPLY ? 'APPLY' : 'DRY-RUN'}) ===`);
console.log(`① CSV: 双品牌 ${csvDual} 处 -> 残留 ${csvLeft} 处 | 行数 ${csvLinesOld}->${csvLinesNew} | 逗号 ${csvCommaOld}->${csvCommaNew}`);
console.log(`② TS : 名片 SKU zh-hk 尾缀`);
for (const s of BC) {
  const v = perSku[s];
  if (typeof v === 'string') console.log(`   ${s}: ${v} ✗`);
  else console.log(`   ${s}\n      before: ${v.before}\n      after : ${v.after}`);
}
console.log(`   TS key 数 ${keysOld} -> ${keysNew} | 名片 slug 均在: ${bcPresent}`);

const ok = csvLeft === 0 && csvLinesOld === csvLinesNew && csvCommaOld === csvCommaNew && keysOld === keysNew && bcPresent && BC.every((s) => typeof perSku[s] === 'object');
if (!ok) { console.log('\n[BLOCK] 断言未过, 不写盘'); process.exit(1); }
if (!APPLY) { console.log('\n断言全过 ✓ 加 --apply 生效'); process.exit(0); }

fs.copyFileSync(CSV, CSV + '.bak-single-brand');
fs.copyFileSync(TS, TS + '.bak-single-brand');
fs.writeFileSync(CSV, csvNew, 'utf8');
fs.writeFileSync(TS, tsNew, 'utf8');
console.log('\n[OK] 已写入 CSV + TS (备份 .bak-single-brand)');
