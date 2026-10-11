#!/usr/bin/env node
/**
 * scripts/guards/keywords-detox-guard.js — 门童 #29: SKU keywords 去毒闸门 (spam 恢复防护机制, K3 2026-10-12)
 *
 * 背景: 2026-09 Google spam 更新判定全站命中 (scaled content abuse 画像), B1 审计实锤
 *   meta keywords 每页渲染 50-90 词 + 96 个模板词跨 8+ SKU 复用 + pet 标签词污染 20 个纸盒/贴纸 SKU。
 *   B1b (commit f9d9b1b7) 已清洗 5,564 词例; 本门童防**回流** — 历史上 pet 词就是 9/6 清洗后在 regen 里回来的。
 *
 * 规则 (数据源: scripts/guards/data/keywords-detox-blacklist.json, 禁另写阈值):
 *   R1 CAP:     每个 keywords 数组 > 10 词 → 违规 (B1b CAP=10)
 *   R2 黑名单:  命中 kill 列表精确词 (65 词例) 或 pet 正则 → 违规
 *   R3 语素:    数组 0 个品类语素词 → 违规 (白名单保命条的镜像: 防止清成一堆无品类锚点的泛词)
 *
 * 判据铁律 (§0.35.4): 默认全扫只报告 (exit 0); --commit 模式在
 *   src/data/sku-seo-data.ts 或 zprintpro-sku-seo-data.csv 被 staged 时全量硬拦。
 *   (B1b 后基线 100% 干净, 无需存量豁免逻辑; 若未来引入豁免, 必须落审计 JSON 而非暗放行。)
 *
 * 用法: node scripts/guards/keywords-detox-guard.js [--commit]
 */
'use strict';
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');
const LOCALES = ['zh-hk', 'en', 'ja'];
const COMMIT_MODE = process.argv.includes('--commit');
const TODAY = new Date().toISOString().slice(0, 10);
const CAP = 10;

const BL = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'keywords-detox-blacklist.json'), 'utf8'));
const PET_RE = /\b(pets?|dogs?|cats?|kittens?|puppies|puppy|paws?)\b/i;

/* ---- 解析 sku-seo-data.ts 全部 keywords 数组 (单行 JSON 数组, 与 B1b 清洗器同口径) ---- */
function parseAllKeywords() {
  const txt = fs.readFileSync(path.join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');
  const anchorRe = /^(?: {2})?"([a-z0-9-]+)": \{$/gm;
  const RESERVED = new Set(['name', 'seo', 'faqs', 'imagealt', 'zh-hk', 'en', 'ja']);
  const anchors = [];
  let m;
  while ((m = anchorRe.exec(txt))) {
    if (!RESERVED.has(m[1].toLowerCase())) anchors.push({ slug: m[1], idx: m.index });
  }
  const endIdx = txt.indexOf('\n};');
  const out = [];
  for (let i = 0; i < anchors.length; i++) {
    const bs = anchors[i].idx;
    const be = i + 1 < anchors.length ? anchors[i + 1].idx : (endIdx > 0 ? endIdx : txt.length);
    for (const loc of LOCALES) {
      const li = txt.indexOf(`"${loc}": {`, bs);
      if (li < 0 || li >= be) continue;
      const ki = txt.indexOf('"keywords": [', li);
      if (ki < 0 || ki >= be) continue;
      const je = txt.indexOf(']', ki);
      const span = txt.slice(ki, je + 1);
      if (span.includes('\n')) {
        console.error(`[门童 #29] FATAL: multi-line keywords array at ${anchors[i].slug}/${loc} — 与清洗器口径不一致, 拒判`);
        process.exit(2);
      }
      let arr;
      try { arr = JSON.parse(span.slice('"keywords": '.length)); }
      catch { console.error(`[门童 #29] FATAL: keywords JSON parse fail at ${anchors[i].slug}/${loc}`); process.exit(2); }
      out.push({ slug: anchors[i].slug, locale: loc, keywords: arr });
    }
  }
  return out;
}

/* ---- 三规则判定 ---- */
function check(slot) {
  const v = [];
  const kill = new Set(BL.kill[slot.locale] || []);
  const morphs = BL.category_morphemes[slot.locale] || [];
  if (slot.keywords.length > CAP) v.push({ rule: 'R1_CAP', detail: `${slot.keywords.length} 词 > CAP ${CAP}` });
  for (const t of slot.keywords) {
    if (kill.has(t)) v.push({ rule: 'R2_BLACKLIST', detail: `kill 词回流: "${t}"` });
    else if (PET_RE.test(t)) v.push({ rule: 'R2_PET', detail: `pet 正则命中: "${t}"` });
  }
  const hasMorph = slot.keywords.some((t) => morphs.some((mo) => t.toLowerCase().includes(mo.toLowerCase())));
  if (!hasMorph) v.push({ rule: 'R3_MORPHEME', detail: '数组 0 个品类语素词' });
  return v;
}

const slots = parseAllKeywords();
const EXEMPT = new Set((BL.known_exemptions?.slots || []).map((e) => `${e.slug}/${e.locale}`));
const issues = [];
const exempted = [];
for (const s of slots) {
  const v = check(s);
  if (!v.length) continue;
  if (EXEMPT.has(`${s.slug}/${s.locale}`)) exempted.push({ slug: s.slug, locale: s.locale, violations: v });
  else issues.push({ slug: s.slug, locale: s.locale, violations: v });
}

/* ---- 落审计 JSON ---- */
const logDir = path.join(ROOT, '.hermes/logs');
fs.mkdirSync(logDir, { recursive: true });
fs.writeFileSync(
  path.join(logDir, `keywords-detox-audit-${TODAY}.json`),
  JSON.stringify({ date: TODAY, guard: '#29 keywords-detox-guard', slotCount: slots.length, issues, exemptedIssues: exempted }, null, 2),
  'utf8'
);

console.log(`[门童 #29] keywords-detox: ${slots.length} 槽全扫 -> .hermes/logs/keywords-detox-audit-${TODAY}.json (违规 ${issues.length} / 显式豁免 ${exempted.length})`);
if (exempted.length) console.log(`[门童 #29] ℹ️ 豁免槽 (待 K3 §0.0 裁决, 见 data/keywords-detox-blacklist.json known_exemptions): ${exempted.map((e) => `${e.slug}/${e.locale}`).join(', ')}`);

/* ---- --commit: 数据文件 staged 时硬拦 ---- */
if (COMMIT_MODE) {
  let staged = '';
  try { staged = execSync('git diff --cached --name-only', { cwd: ROOT, encoding: 'utf8' }); } catch { staged = ''; }
  const touched = staged.split('\n').some((f) =>
    f.trim() === 'src/data/sku-seo-data.ts' || f.trim() === 'zprintpro-sku-seo-data.csv');
  if (!touched) {
    console.log('[门童 #29] 本次 commit 未触及 keywords 数据文件, 跳过硬拦 (全扫报告已落)');
    return;
  }
  if (issues.length) {
    console.error(`[门童 #29] ❌ HARD 拦截: keywords 去毒规则违规 ${issues.length} 槽 (防 9/6 清洗后 regen 回流事故重演):`);
    for (const i of issues.slice(0, 20)) {
      for (const v of i.violations) console.error(`  ${i.slug}/${i.locale} [${v.rule}] ${v.detail}`);
    }
    if (issues.length > 20) console.error(`  ... 另 ${issues.length - 20} 槽, 见审计 JSON`);
    process.exit(1);
  }
  console.log('[门童 #29] keywords 数据文件 staged, 全量硬拦扫描 0 违规 ✅');
}
