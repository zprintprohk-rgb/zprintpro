/**
 * scripts/fix-batch1-factual-errors.mjs — 批次1：事实错误级修复（2026-09-20 K3 拍板「批次1开工」）
 *
 * 范围（严格限定）：
 *   P0-2  en 共享模板 ×36：错误电话 +1 982 808 5133（真值 +86 198 8085 1334）
 *         + 虚构「Same-day USA pickup / 11 AM EST」句 → DHL 3-5 天 factual 句
 *   P0-1  same-day-flyers 三语槽位真值重排（以 products.ts minQuantity=10 与
 *         price-data.generated.ts 页面价为单源，经 zh-hk/en/ja 三线上页面 hero 实测确证）
 *   P0-1b products-content.ts same-day-flyers en 长文 MOQ 表 100→10
 *
 * 纪律：每处替换带精确计数断言，计数不符 exit 2 拒绝写盘（量具四级返工纪律）。
 * 用法：node scripts/fix-batch1-factual-errors.mjs           # dry-run
 *       node scripts/fix-batch1-factual-errors.mjs --apply  # 写盘（先备份 .hermes/_bak-batch1-20260920/）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const APPLY = process.argv.includes('--apply');
const TS = path.join(ROOT, 'src/data/sku-seo-data.ts');
const CONTENT = path.join(ROOT, 'src/data/products-content.ts');
const { equiv, band } = require('./guards/title-equiv.js');

let src = fs.readFileSync(TS, 'utf-8');
let content = fs.readFileSync(CONTENT, 'utf-8');
const errors = [];
const plan = [];

/** 计数断言替换；scope 为 null 表示全文件，否则限定在 same-day-flyers 块内 */
function replaceScoped(label, scope, oldStr, newStr, expect) {
  const haystack = scope === null ? src : scope;
  const count = haystack.split(oldStr).length - 1;
  if (count !== expect) {
    errors.push(`${label}: 期望 ${expect} 处，实测 ${count} 处 → 拒绝出结论`);
    return;
  }
  plan.push({ label, count, oldStr, newStr });
}

/** 提取 same-day-flyers 顶层块（花括号配平，避坑9：不用正则猜嵌套归属） */
function extractBlock(text, key) {
  const anchor = `"${key}": {`;
  const start = text.indexOf(anchor);
  if (start < 0) { errors.push(`找不到锚点 ${anchor}`); return null; }
  let i = text.indexOf('{', start), depth = 0, end = -1;
  for (; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') { depth--; if (!depth) { end = i + 1; break; } }
  }
  if (end < 0) { errors.push(`块未闭合 ${key}`); return null; }
  return { start, end, text: text.slice(start, end) };
}

const blk = extractBlock(src, 'same-day-flyers');

// ── P0-2 全局（36×）──
replaceScoped('R1 错误电话', null,
  'WhatsApp us at +1 982 808 5133', 'WhatsApp us at +86 198 8085 1334', 36);
replaceScoped('R2 虚构美国自提', null,
  'Same-day USA pickup available for orders placed before 11 AM EST in major US cities.',
  'DHL Express delivers to the lower 48 states in 3-5 days.', 36);

// ── P0-1 same-day-flyers 块内 ──
if (blk) {
  replaceScoped('B1 zh title MOQ+价', blk.text, '即日印刷 傳單 100張起 HK$0.55起', '即日印刷 傳單 10張起 HK$1.30起', 1);
  replaceScoped('B2 zh desc 价', blk.text, '10 張起、HK$0.55 起/張（大量檔）', '10 張起、HK$1.30 起/張', 1);
  replaceScoped('B3 en title 价', blk.text, 'Same-Day Flyer Printing from $0.95 | 10 MOQ | ZprintPro', 'Same-Day Flyer Printing from $0.16 | 10 MOQ | ZprintPro', 1);
  replaceScoped('B4 en desc MOQ+价', blk.text, 'Same-day flyer printing from $0.95, 100 MOQ.', 'Same-day flyer printing from $0.16, 10 MOQ.', 1);
  replaceScoped('B5 en h1', blk.text, '"h1": "Same-day Flyers 100+ | ZprintPro"', '"h1": "Same-day Flyers 10+ | ZprintPro"', 1);
  replaceScoped('B6 en body 100-piece', blk.text, 'Pricing is transparent: 100-piece minimum', 'Pricing is transparent: 10-piece minimum', 1);
  replaceScoped('B7 en body FAQ Q2', blk.text, '100 flyers minimum, with no setup fees.', '10 flyers minimum, with no setup fees.', 1);
  replaceScoped('B8 en body FAQ Q4 虚构自提', blk.text,
    'Same-day printing available for orders placed before 11am EST, with same-day courier pickup in major US cities for an additional $25.',
    'Same-day production available when artwork is confirmed before 11 AM HKT, with DHL Express dispatch the same day.', 1);
  replaceScoped('B9 ja title 价', blk.text, '即日チラシ印刷｜¥125〜・10枚〜・無料デザイン｜ZprintPro', '即日チラシ印刷｜¥25〜・10枚〜・無料デザイン｜ZprintPro', 1);
  replaceScoped('B10 ja desc MOQ+价', blk.text, '即日チラシ印刷 100 枚から、¥125〜。', '即日チラシ印刷 10 枚から、¥25〜。', 1);
  replaceScoped('B11 ja h1 英文整句', blk.text, '"h1": "First choice for emergency events"', '"h1": "即日チラシ印刷 | 最短当日発送 | ZprintPro"', 1);
  replaceScoped('B12 ja keywords 币种污染', blk.text, '"HK$0.5〜"', '"即日チラシ 10枚〜"', 1);
  replaceScoped('B13 ja body 100枚×2', blk.text, '100 枚から対応', '10 枚から対応', 2);
  replaceScoped('B14 ja body 料金句', blk.text, '料金透明：100 枚から', '料金透明：10 枚から', 1);
  replaceScoped('B15 ja faq 答槽繁体', blk.text, '專業即日傳單印刷服務 | 智印港', '最短当日発送の即日チラシ印刷サービス | ZprintPro', 1);
  replaceScoped('B16 en imageAlt 贺卡残留', blk.text, 'Same-Day Flyers for holiday cards, wedding invitations — ZprintPro', 'Same-day Flyers | A4/A5 double-sided 157gsm coated rush printing | ZprintPro', 1);
  replaceScoped('B17 ja imageAlt 100枚', blk.text, '即日チラシ印刷 当日仕上げ 100枚〜', '即日チラシ印刷 当日仕上げ 10枚〜', 1);
}

// ── P0-1b products-content.ts same-day en MOQ 表 ──
{
  const c1o = '<td class="p-2 text-center">100</td><td class="p-2 text-center">4 hours</td><td class="p-2 text-center">$1.00</td>';
  const c1n = '<td class="p-2 text-center">10</td><td class="p-2 text-center">4 hours</td><td class="p-2 text-center">from $0.16</td>';
  const c2o = '<td class="p-2 text-center">100</td><td class="p-2 text-center">4 hours</td><td class="p-2 text-center">$0.70</td>';
  const c2n = '<td class="p-2 text-center">10</td><td class="p-2 text-center">4 hours</td><td class="p-2 text-center">from $0.16</td>';
  for (const [label, o, n] of [['C1 A4 行', c1o, c1n], ['C2 A5 行', c2o, c2n]]) {
    const count = content.split(o).length - 1;
    if (count !== 1) errors.push(`${label}: 期望 1 处，实测 ${count} 处 → 拒绝出结论`);
    else plan.push({ label, count, oldStr: o, newStr: n, onContent: true });
  }
}

if (errors.length) {
  console.error('🔴 量具自检失败，拒绝出结论：');
  for (const e of errors) console.error('  - ' + e);
  process.exit(2);
}

// ── 汇总报告（dry-run 也全量打印）──
console.log(`模式: ${APPLY ? 'APPLY（写盘）' : 'DRY-RUN（不写盘）'}`);
console.log(`计划替换 ${plan.length} 组 / ${plan.reduce((s, p) => s + p.count, 0)} 处：\n`);
for (const p of plan) {
  console.log(`  [${p.count}×] ${p.label}`);
  console.log(`    - ${p.oldStr.slice(0, 72)}`);
  console.log(`    + ${p.newStr.slice(0, 72)}`);
}

// 新 title 当量预检
const newTitles = [
  ['zh-hk', '即日印刷 傳單 10張起 HK$1.30起 圓角・覆膜 | 智印港'],
  ['en', 'Same-Day Flyer Printing from $0.16 | 10 MOQ | ZprintPro'],
  ['ja', '即日チラシ印刷｜¥25〜・10枚〜・無料デザイン｜ZprintPro'],
];
console.log('\n新 title 当量预检（SSoT: title-equiv.js, 目标区 50-57）：');
for (const [loc, t] of newTitles) console.log(`  ${loc}: 当量 ${equiv(t)} → ${band(t)}  ${t}`);

if (!APPLY) {
  console.log('\n(dry-run：加 --apply 写盘)');
  process.exit(0);
}

// ── 写盘 ──
const bakDir = path.join(ROOT, '.hermes/_bak-batch1-20260920');
fs.mkdirSync(bakDir, { recursive: true });
fs.copyFileSync(TS, path.join(bakDir, 'sku-seo-data.ts.before'));
fs.copyFileSync(CONTENT, path.join(bakDir, 'products-content.ts.before'));

// 先块内后全局（块内替换基于原块文本，最后整体回写）
if (blk) {
  let newBlkText = blk.text;
  for (const p of plan) if (!p.onContent) newBlkText = newBlkText.split(p.oldStr).join(p.newStr);
  src = src.slice(0, blk.start) + newBlkText + src.slice(blk.end);
}
// 全局（R1/R2 不在块内做过，计数仍是 36）
for (const p of plan) if (!p.onContent && p.count === 36) src = src.split(p.oldStr).join(p.newStr);
for (const p of plan) if (p.onContent) content = content.split(p.oldStr).join(p.newStr);

// ── 写盘后硬校验 ──
const hardChecks = [
  ['全 src 残留错误电话', src.includes('+1 982 808 5133') || content.includes('+1 982 808 5133'), false],
  ['残留虚构自提句', src.includes('Same-day USA pickup available'), false],
  ['same-day 块残留 ¥125', extractBlock(src, 'same-day-flyers').text.includes('¥125'), false],
  ['same-day 块残留 100 枚から', extractBlock(src, 'same-day-flyers').text.includes('100 枚から'), false],
  ['same-day 块残留 100張起', extractBlock(src, 'same-day-flyers').text.includes('100張起'), false],
  ['same-day 块英文 h1 已清', extractBlock(src, 'same-day-flyers').text.includes('First choice for emergency events'), false],
  ['正确电话在 en body 就位', (src.split('WhatsApp us at +86 198 8085 1334').length - 1) === 36, true],
];
const fail = hardChecks.filter(([label, actual, want]) => actual !== want);
if (fail.length) {
  console.error('🔴 写盘后硬校验失败：');
  for (const [label] of fail) console.error('  - ' + label);
  process.exit(2);
}

fs.writeFileSync(TS, src, 'utf-8');
fs.writeFileSync(CONTENT, content, 'utf-8');
console.log(`\n✅ 已写盘：${path.relative(ROOT, TS)} + ${path.relative(ROOT, CONTENT)}（备份: .hermes/_bak-batch1-20260920/）`);
console.log('硬校验 7/7 通过');
