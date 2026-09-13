#!/usr/bin/env node
/**
 * scripts/audit-exposure-set.mjs — 暴露集全扫 (2026-09-13, 千问复核要求)
 *
 * 定义 (千问): 暴露集 = 「最后一次改动落在**门禁失效窗口**内, 之后未再被改过」且**当前仍存在**的文件。
 *   · 已删除的内容暴露为零
 *   · 窗口之后被改过的文件, 其当前态已被（复活后的）门禁/守卫检查过
 * 本脚本: ① 用 git 求暴露集 ② 对暴露集做**当前态**全扫 (直接调守卫模块) ③ 输出按规则/严重度分布 + 前 N 条样本
 *
 * 用法: node scripts/audit-exposure-set.mjs [--samples 50]
 */
import { execSync, execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, relative } from 'node:path';
const require = createRequire(import.meta.url);

const ROOT = process.cwd();
const GUARDS_DIR = join(ROOT, 'scripts', 'guards');
const WINDOW_START = process.argv.includes('--window') ? process.argv[process.argv.indexOf('--window') + 1] : '2026-08-26';
const SAMPLE_N = Number((process.argv.includes('--samples') ? process.argv[process.argv.indexOf('--samples') + 1] : '50'));

// 已被复活后门禁检查过的提交 (其文件不计入暴露集)
const GUARDED = new Set();
for (const sha of ['98ad5136', 'cdab75e2', 'da8d1d75', '96ec6de3', '0c4bb3f6']) {
  try { execSync(`git show --name-only --pretty=format: ${sha}`, { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean).forEach(f => GUARDED.add(f)); } catch { }
}

// ① 暴露集 (用 execFileSync 避免 shell 解释 '|' 等元字符)
const log = execFileSync('git', ['log', `--since=${WINDOW_START}`, '--name-only', '--pretty=format:COMMIT%x09%cI'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 });
const latest = new Map();   // file -> 最后一次改动时间 (log 为倒序, 首次出现即最新)
let curDate = null;
for (const line of log.split(/\r?\n/)) {
  if (!line.trim()) continue;
  if (line.startsWith('COMMIT')) { curDate = line.split('\t')[1] ? line.split('\t')[1].trim() : null; continue; }
  const f = line.trim();
  if (!latest.has(f)) latest.set(f, curDate);
}
const trackedNow = new Set(execSync('git ls-files', { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).split('\n').filter(Boolean));
const exposure = [...latest.entries()]
  .filter(([f, d]) => trackedNow.has(f) && existsSync(join(ROOT, f)) && !GUARDED.has(f) && /\.(ts|tsx|js|jsx|json|md|mdx)$/.test(f)
    && !f.startsWith('zprintpro-en-us-images/')
    // 2026-09-13: 暴露集只取**上线面/发布面**。.hermes/ 为内部工作件 (审计 JSON / 派活包 / 补丁),
    // docs/ 为报告; 二者都不渲染、不发布, 计入只会抬高噪声 (首轮实测: 30 条 red 样本里 20 条来自 .hermes/)
    && !f.startsWith('.hermes/') && !f.startsWith('docs/') && !f.startsWith('scripts/')
    // GSC 原始数据 / 生成物: 非上线代码, 且天然多来源混排 (首轮实测这两类贡献大半误报)
    && !f.startsWith('GSC数据/') && !/\.generated\./.test(f) && !/price-data/.test(f))
  .map(([f, d]) => ({ file: f, lastTouch: d }));
console.log(`暴露集: ${exposure.length} 文件 (窗口起 ${WINDOW_START} 之后最后改动, 且未在复活后门禁提交中)`) ;
console.log('  样本:', exposure.slice(0, 5).map(e => `${e.file}@${e.lastTouch.slice(0, 10)}`).join(' | '));

// ② 当前态全扫 (直接调守卫)
const GUARDS = {
  credibility: require(join(GUARDS_DIR, 'credibility-guard.js')),
  phone: require(join(GUARDS_DIR, 'phone-guard.js')),
  brand: require(join(GUARDS_DIR, 'brand-guard.js')),
  i18n: require(join(GUARDS_DIR, 'i18n-guard.js')),
  sop10: require(join(GUARDS_DIR, 'sop10-guard.js')),
  entity: require(join(GUARDS_DIR, 'entity-guard.js')),
  count: require(join(GUARDS_DIR, 'count-guard.js')),
  register: require(join(GUARDS_DIR, 'register-guard.js')),
  gscSource: require(join(GUARDS_DIR, 'gsc-source-guard.js')),
  blogDataIntegrity: require(join(GUARDS_DIR, 'blog-data-integrity-guard.js')),
};
const filesAbs = exposure.map(e => join(ROOT, e.file));
const hits = [];
for (const [key, g] of Object.entries(GUARDS)) {
  try { const h = await g.scan(filesAbs); h.forEach(x => hits.push({ guard: key, ...x })); } catch (e) { console.log(`  ⚠️ ${key} 扫描异常: ${e.message}`); }
}
const bySev = {}, byRule = {};
hits.forEach(h => { bySev[h.severity] = (bySev[h.severity] || 0) + 1; byRule[`${h.severity}/${h.ruleId}`] = (byRule[`${h.severity}/${h.ruleId}`] || 0) + 1; });
console.log(`\n③ 暴露集当前态扫描: ${hits.length} 命中`, JSON.stringify(bySev));
Object.entries(byRule).sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([k, v]) => console.log(`   ${String(v).padStart(4)}  ${k}`));

// ④ 抽样 (供人工精度复核)
const redHits = hits.filter(h => h.severity === 'red');
const step = Math.max(1, Math.floor(redHits.length / SAMPLE_N));
const sample = redHits.filter((_, i) => i % step === 0).slice(0, SAMPLE_N);
console.log(`\n④ red 命中 ${redHits.length} 条, 抽样 ${sample.length} 条供精度复核:`);
sample.forEach((h, i) => console.log(`  ${i + 1}. [${h.ruleId}] ${h.file}:${h.line} :: ${String(h.match).slice(0, 70)}`));
writeFileSync('.hermes/exposure-audit.json', JSON.stringify({ at: new Date().toISOString(), windowStart: WINDOW_START, exposureFiles: exposure.length, hits: hits.length, bySev, byRule, sample }, null, 1), 'utf8');
console.log('\n明细: .hermes/exposure-audit.json');
