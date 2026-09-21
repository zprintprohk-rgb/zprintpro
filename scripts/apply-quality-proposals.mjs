/**
 * apply-quality-proposals.mjs — T1 top-30 提案库应用器（SOP-5 生成器纪律，块级锚定版）
 *
 * 纪律（per 9/20-9/21 撞车/覆写/共用模板事故教训）：
 *   1. 默认 --check（dry-run），显式 --apply 才写盘；写盘前自动备份 .hermes/_bak-quality-<ts>/
 *   2. 锚定两级：①slug 顶层块（brace 平衡解析，字符串感知，禁正则猜嵌套）②块内
 *      `"<field>": <JSON.stringify(cur)>` 精确匹配须 ==1（共用模板句/空值不再跨块誤中）
 *   3. cur 来自 tsx 活 import（非快照）；check→apply 间 peer 改同槽 → 块内计数断言失败自动中止
 *   4. 提案字段 desc = 文件字段 description（映射内置）
 *   5. --apply 后子進程複驗全部新值落位
 *
 * 用法: node --import tsx scripts/apply-quality-proposals.mjs [--apply] [提案json路径]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const { equiv, band } = require('./guards/title-equiv.js');
const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = 'src/data/sku-seo-data.ts';

const APPLY = process.argv.includes('--apply');
const propPath = process.argv.find((a) => a.endsWith('.json')) || '.hermes/title-quality-proposals-20260921.json';
const prop = JSON.parse(fs.readFileSync(path.join(ROOT, propPath), 'utf8'));

const { skuSeoData } = await import('../src/data/sku-seo-data.ts');
let txt = fs.readFileSync(path.join(ROOT, FILE), 'utf8');

/* ---------- slug 顶层块定位（brace 平衡 + 字符串感知） ---------- */
function braceBalance(text, openIdx) {
  let depth = 0, inStr = false, esc = false;
  for (let i = openIdx; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i + 1; }
  }
  return -1;
}

function blockRange(text, slug) {
  const m = text.match(new RegExp(`^(?: {2})?"${slug}": \\{`, 'm'));
  if (!m) return null;
  const end = braceBalance(text, text.indexOf('{', m.index));
  return end > 0 ? [m.index, end] : null;
}

const FIELD = { title: 'title', h1: 'h1', desc: 'description' };

/* ---------- locale 子块定位（slug 块内 `"<locale>": {` 須唯一） ---------- */
function subBlockRange(text, from, key) {
  const re = new RegExp(`"${key}": \\{`, 'g');
  re.lastIndex = from;
  const hits = [];
  let m;
  while ((m = re.exec(text)) && hits.length < 5) hits.push(m.index);
  return hits.length === 1 ? hits[0] : -1;
}

const plan = [];
const aborts = [];
for (const p of prop.proposals) {
  const range = blockRange(txt, p.slug);
  if (!range) { aborts.push(`${p.slug} 塊定位失敗`); continue; }
  // locale 子塊（seo 下的 "zh-hk"/"en"/"ja" 對象鍵）；file 內全局可能多個 → 只接受 slug 塊內唯一
  const block = txt.slice(range[0], range[1]);
  const localeIdx = subBlockRange(block, 0, p.locale);
  if (localeIdx < 0) { aborts.push(`${p.slug}|${p.locale} locale 子塊命中≠1（=${localeIdx}）`); continue; }
  const lStart = range[0] + localeIdx;
  const lEnd = braceBalance(txt, txt.indexOf('{', lStart));
  if (lEnd < 0) { aborts.push(`${p.slug}|${p.locale} locale 子塊平衡失敗`); continue; }
  for (const f of ['title', 'h1', 'desc']) {
    const nv = p[f];
    if (nv === null || nv === undefined) continue;
    const ff = FIELD[f];
    const cur = skuSeoData[p.slug]?.seo?.[p.locale]?.[ff];
    if (cur === undefined) { aborts.push(`${p.slug}|${p.locale}.${ff} 槽不存在`); continue; }
    if (cur === nv) continue; // 幂等
    if (f === 'title' && band(nv) !== 'OK') { aborts.push(`${p.slug}|${p.locale}.title 新值越帶 band=${band(nv)} eq=${equiv(nv)}`); continue; }
    const needle = `"${ff}": ${JSON.stringify(cur)}`;
    const scope = txt.slice(lStart, lEnd);
    const n = scope.split(needle).length - 1;
    if (n !== 1) { aborts.push(`${p.slug}|${p.locale}.${ff} locale 子塊錨定命中=${n}（≠1，ABORT）`); continue; }
    plan.push({ slug: p.slug, locale: p.locale, f: ff, start: lStart, end: lEnd, cur, nv });
  }
}

console.log(`📋 plan: ${plan.length} 處替換 / ${aborts.length} ABORT${APPLY ? '（--apply）' : '（--check dry-run）'}`);
for (const a of aborts) console.log('  🛑', a);

if (!APPLY) { console.log('\n[dry-run] 加 --apply 寫盤'); process.exit(aborts.length ? 1 : 0); }
if (aborts.length) { console.error('存在 ABORT，拒絕寫盤'); process.exit(1); }

// 備份
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const bakDir = path.join(ROOT, '.hermes', `_bak-quality-${ts}`);
fs.mkdirSync(bakDir, { recursive: true });
fs.writeFileSync(path.join(bakDir, 'sku-seo-data.ts.bak'), txt);
fs.writeFileSync(path.join(bakDir, 'plan.json'), JSON.stringify(plan.map(({ slug, locale, f, cur, nv }) => ({ slug, locale, f, cur, nv })), null, 2));

/* ---------- 寫盤：自後向前替換（避免偏移），每步重驗子塊內唯一 ---------- */
const ordered = [...plan].sort((a, b) => b.start - a.start);
for (const s of ordered) {
  const curBlock = txt.slice(s.start, s.end);
  const needle = `"${s.f}": ${JSON.stringify(s.cur)}`;
  if (curBlock.split(needle).length - 1 !== 1) { console.error(`寫盤中錨定丟失: ${s.slug}|${s.locale}.${s.f} — 立即中止`); process.exit(2); }
  txt = txt.slice(0, s.start) + curBlock.replace(needle, `"${s.f}": ${JSON.stringify(s.nv)}`) + txt.slice(s.end);
}
fs.writeFileSync(path.join(ROOT, FILE), txt, 'utf8');
console.log(`\n[寫盤] ${plan.length} 處已替換`);

// 子進程複驗（進程內 import 快取不可信；腳本落盤避免 cmd 引號轉義坑）
const verifyFile = path.join(bakDir, '_verify.mjs');
fs.writeFileSync(verifyFile, `
const m = await import('../../src/data/sku-seo-data.ts');
const d = m.skuSeoData;
const plan = ${JSON.stringify(plan.map(({ slug, locale, f, nv }) => ({ slug, locale, f, nv })))};
let bad = 0;
for (const s of plan) { if (d[s.slug]?.seo?.[s.locale]?.[s.f] !== s.nv) { bad++; console.log('VERIFY_FAIL', s.slug, s.locale, s.f); } }
console.log(bad ? ('VERIFY_FAIL_TOTAL ' + bad) : ('VERIFY_OK ' + plan.length));
process.exit(bad ? 1 : 0);
`);
const out = execSync(`node --import tsx "${verifyFile}"`, { cwd: ROOT, encoding: 'utf8' });
console.log(out.trim().split('\n').pop());
console.log('[備份]', bakDir);
