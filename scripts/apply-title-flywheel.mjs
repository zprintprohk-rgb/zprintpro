#!/usr/bin/env node
/**
 * scripts/apply-title-flywheel.mjs — 标题飞轮批次1 校验+应用 (2026-09-20)
 *
 * 前置: .hermes/reports/title-flywheel-approved-2026-09-20.json (人工审阅后)
 * 安全:
 *   - 每槽在 sku-seo-data.ts 中定位 slug+locale 块, 块内 exact-match 替换 `"title": "<cur>"`
 *   - 替换数 ≠ 提案数 即中止 (exit 2), 与 fix-batch1 计数断言同纪律
 *   - apply 前自动备份到 .hermes/_bak-title-flywheel-20260920/
 *   - 应用后全部新 title 过闸门 (当量 50-57 / 品牌末尾一次 / 跨语言纯净)
 *
 * 用法:
 *   node scripts/apply-title-flywheel.mjs --check    # 只校验, 不写盘 (默认)
 *   node scripts/apply-title-flywheel.mjs --apply    # 校验+写盘
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = path.join(ROOT, 'src/data/sku-seo-data.ts');
const PLAN = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/reports/title-flywheel-approved-2026-09-20.json'), 'utf8'));
const APPLY = process.argv.includes('--apply');

const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };
const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/;
const KANA = /[ぁ-んァ-ヶ]/;

function localePurity(locale, s) {
  if (locale === 'en' && /[\u2E80-\u9FFF\uFF01-\uFF60\u3000-\u303F]/.test(s)) return 'en 含 CJK';
  if (locale === 'zh-hk' && KANA.test(s)) return 'zh-hk 含假名';
  if (locale === 'zh-hk' && SIMP.test(s)) return 'zh-hk 含简体';
  return null;
}

let txt = fs.readFileSync(FILE, 'utf8');
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

// 定位 slug+locale 块 (每个 slug 块内按 locale 顺序找 "title")
function findTitleInBlock(slug, locale, curTitle) {
  const slugRe = new RegExp(`^(?: {2})?"${slug}": \\{`, 'm');
  const sm = slugRe.exec(txt);
  if (!sm) return { ok: false, reason: 'slug 块不存在' };
  const next = txt.slice(sm.index + 1).search(/^(?: {2})?"[a-z0-9-]+": \{/m);
  const end = next < 0 ? txt.length : sm.index + 1 + next;
  const block = txt.slice(sm.index, end);
  const locIdx = block.indexOf(`"${locale}": {`);
  if (locIdx < 0) return { ok: false, reason: 'locale 块不存在' };
  const locEnd = block.indexOf('"imageAlt"', locIdx) > 0 ? block.indexOf('"imageAlt"', locIdx) : block.length;
  const seg = block.slice(locIdx, locEnd);
  const needle = `"title": "${esc(curTitle)}"`;
  if (!seg.includes(needle)) return { ok: false, reason: '现标题不匹配 (可能已被改/漂移)' };
  return { ok: true, blockStart: sm.index, locIdx, needle };
}

let pass = 0, fail = 0, applied = 0;
const failures = [];
const ops = [];

for (const p of PLAN.proposals) {
  const loc = findTitleInBlock(p.slug, p.locale, p.cur);
  const e = equiv(p.new);
  const b = band(p.new);
  const brand = BRAND[p.locale];
  const lastSeg = p.new.split('|').pop().trim();
  const brandCnt = p.new.split(brand).length - 1;
  const purity = localePurity(p.locale, p.new);
  const problems = [];
  if (!loc.ok) problems.push(loc.reason);
  if (b !== 'OK') problems.push(`当量 ${e} 不在 ${TITLE_MIN}-${TITLE_MAX}`);
  if (brandCnt !== 1 || lastSeg !== brand) problems.push('品牌非末尾一次');
  if (purity) problems.push(purity);
  if (/[<>{}]/.test(p.new)) problems.push('非法字符');

  if (problems.length) { fail++; failures.push({ slot: `${p.slug}/${p.locale}`, problems, new: p.new, e }); continue; }
  pass++;
  ops.push({ p, loc });
  console.log(`✅ ${p.slug}/${p.locale} e=${e} [${b}] :: ${p.new}`);
}

console.log(`\n校验: ${pass} 过 / ${fail} 失败 (共 ${PLAN.proposals.length})`);
failures.forEach((f) => console.log(`🔴 ${f.slot}: ${f.problems.join(' + ')} :: e=${f.e} ${f.new}`));

if (!APPLY) { console.log('\n(--check 模式, 未写盘; --apply 应用)'); process.exit(fail ? 2 : 0); }
if (fail) { console.error('\nABORT: 存在失败槽, 不应用'); process.exit(2); }

// 备份
const bakDir = path.join(ROOT, '.hermes/_bak-title-flywheel-20260920');
fs.mkdirSync(bakDir, { recursive: true });
fs.writeFileSync(path.join(bakDir, 'sku-seo-data.ts.bak'), txt, 'utf8');

// 从后往前替换 (避免块位置偏移)
ops.sort((a, b) => b.loc.blockStart + b.loc.locIdx - (a.loc.blockStart + a.loc.locIdx));
for (const { p, loc } of ops) {
  const abs = loc.blockStart + loc.locIdx;
  const before = txt.slice(0, abs);
  const after = txt.slice(abs);
  const needle = loc.needle;
  const idx = after.indexOf(needle);
  if (idx < 0) { console.error(`ABORT: 替换前丢失匹配 ${p.slug}/${p.locale}`); process.exit(2); }
  txt = before + after.slice(0, idx) + `"title": "${esc(p.new)}"` + after.slice(idx + needle.length);
  applied++;
}

if (applied !== PLAN.proposals.length) { console.error(`ABORT: applied=${applied} ≠ ${PLAN.proposals.length}`); process.exit(2); }
fs.writeFileSync(FILE, txt, 'utf8');
console.log(`\napplied: ${applied}/${PLAN.proposals.length} · 备份: .hermes/_bak-title-flywheel-20260920/`);
