#!/usr/bin/env node
/**
 * scripts/guards/title-band-guard.js — 门童 #25: SKU 标题当量带闸门 (K3 2026-09-20 飞轮指令)
 *
 * 规则 (与 scripts/guards/title-equiv.js 同源常量, 禁另写阈值):
 *   - HARD: 半角当量 > 57 (即 ≥58) 的新增/修改 title → exit 1 硬拦 (防 SERP 截断+Google 重写)
 *   - WARN: 半角当量 < 50 → 警告 (补齐属批处理工作, 不拦; 但清单必须可见)
 *   - 每次运行全量普查 300 槽, 落 .hermes/logs/sku-title-audit-YYYY-MM-DD.json (附件 §5.3)
 *
 * 判据铁律 (§0.35.4): 禁把"存量违规"当拦截对象 — 只拦 **staged diff 中新增/修改** 的 title;
 * 存量 issue 进审计 JSON 的 existingIssues, 供批次工单消费。
 *
 * 用法: node scripts/guards/title-band-guard.js [--commit]
 *   --commit  读 staged diff (git diff --cached) 判定新增 title (pre-commit 调用)
 *   默认      全量只读审计 (写日志 JSON, 不拦)
 */
'use strict';
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./title-equiv.js');

const ROOT = path.resolve(__dirname, '..', '..');
const LOCALES = ['zh-hk', 'en', 'ja'];
const COMMIT_MODE = process.argv.includes('--commit');
const TODAY = new Date().toISOString().slice(0, 10);

/* ---- 全量普查 (与 sku-title-census.mjs 同解析口径) ---- */
function parseAllTitles() {
  const txt = fs.readFileSync(path.join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');
  const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const out = [];
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    if (!seg.includes('"seo"')) continue;
    for (const loc of LOCALES) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      if (m) out.push({ slug: starts[i].slug, locale: loc, title: m[1].replace(/\\"/g, '"') });
    }
  }
  return out;
}

const slots = parseAllTitles();
const issues = [];
for (const s of slots) {
  const e = equiv(s.title);
  const b = band(s.title);
  if (b !== 'OK') issues.push({ ...s, equiv: e, band: b });
}

/* ---- 落审计 JSON (附件 §5.3) ---- */
const logDir = path.join(ROOT, '.hermes/logs');
fs.mkdirSync(logDir, { recursive: true });
const audit = {
  date: TODAY,
  guard: '#25 title-band-guard',
  rule: `MIN=${TITLE_MIN} WARN>${TITLE_MAX} HARD>=${TITLE_MAX + 1} (半角当量, SSoT title-equiv.js)`,
  slotCount: slots.length,
  existingIssues: issues,
};
fs.writeFileSync(path.join(logDir, `sku-title-audit-${TODAY}.json`), JSON.stringify(audit, null, 2), 'utf8');

/* ---- staged 新增 title 硬拦 ---- */
let stagedBad = [];
if (COMMIT_MODE) {
  let diff = '';
  try { diff = execSync('git diff --cached -U0 -- src/data/sku-seo-data.ts src/data/products.ts src/data/seo.ts', { cwd: ROOT, encoding: 'utf8' }); }
  catch { diff = ''; }
  const added = [...diff.matchAll(/^\+.*?"title":\s*"((?:[^"\\]|\\.)*)"/gm)].map((m) => m[1].replace(/\\"/g, '"'));
  for (const t of added) {
    const e = equiv(t);
    if (e > TITLE_MAX) stagedBad.push({ title: t, equiv: e, level: 'HARD' });
  }
}

/* ---- 输出 ---- */
console.log(`[门童 #25] title-band: ${slots.length} 槽全量审计 -> .hermes/logs/sku-title-audit-${TODAY}.json (存量 issue ${issues.length})`);
if (issues.length) {
  const fill = issues.filter((i) => i.band === 'FILL').length;
  const trim = issues.filter((i) => i.band === 'TRIM').length;
  console.log(`[门童 #25] ⚠️ 存量 <50: ${fill} 条 / >57: ${trim} 条 (不拦, 入批次工单)`);
}
if (COMMIT_MODE && stagedBad.length) {
  console.error(`[门童 #25] ❌ HARD 拦截: staged 新增 title 当量 >${TITLE_MAX} (≥${TITLE_MAX + 1} 禁加, K3 2026-09-19 裁决):`);
  stagedBad.forEach((b) => console.error(`  e=${b.equiv} :: ${b.title}`));
  process.exit(1);
}
if (COMMIT_MODE) console.log('[门童 #25] staged 新增 title 当量全过 ✅');
