#!/usr/bin/env node
/**
 * scripts/check-brand-baseline.mjs — 门童 #3 品牌分层「全量 + 存量基线递减」闸门
 * (2026-09-13 建, K3 批准方案 C: 现有 pre-commit 只扫 staged diff → 存量 443 处天然豁免)
 *
 * 机制:
 *   - 全量扫 src/ + messages/ 的双品牌形态 (智印港 ZprintPro / ZprintPro 智印港 / ジープリント ZprintPro / 智印港 ジープリント…)
 *   - 与 .hermes/brand-baseline.json 基线比对: 任何**新增**即 FAIL (exit 1)
 *   - 基线只能递减: 清掉存量后用 --update 重录, 数字即进度指标
 *
 * 用法:
 *   node scripts/check-brand-baseline.mjs            # 闸门 (pre-commit 调用)
 *   node scripts/check-brand-baseline.mjs --report    # 只报告
 *   node scripts/check-brand-baseline.mjs --update    # 重录基线 (清存量后)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const ROOT = process.cwd();
const BASELINE = '.hermes/brand-baseline.json';
const SCAN_DIRS = ['src', 'messages'];
const EXTS = /\.(ts|tsx|js|mjs|cjs|json|html|md|css|txt)$/;
// 与 guards/brand-guard.js BRAND_DOUBLE 同口径 + 补 ジープリント ZprintPro (ja 侧双品牌)
const PATTERNS = [
  { id: 'zh-dual', re: /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ZprintPro\s*智印港/g },
  { id: 'ja-dual', re: /ジープリント\s*ZprintPro|ZprintPro\s*ジープリント|智印港\s*ジープリント|ジープリント\s*智印港/g },
];
// 检测脚本自身 / 历史备份 不算命中
const EXEMPT = [/^\.hermes\//, /^scripts\/guards\//, /^scripts\/check-/, /\.bak/, /backup-/];

const mode = process.argv.includes('--update') ? 'update' : process.argv.includes('--report') ? 'report' : 'gate';

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', '.next', '.git', '.open-next'].includes(e.name)) walk(p, out); }
    else if (EXTS.test(e.name)) out.push(p);
  }
  return out;
}

const files = SCAN_DIRS.flatMap(d => walk(join(ROOT, d)));
const perFile = {};
let total = 0;
const details = [];
for (const f of files) {
  const rel = relative(ROOT, f).replace(/\\/g, '/');
  if (EXEMPT.some(re => re.test(rel))) continue;
  const t = readFileSync(f, 'utf8');
  let n = 0;
  for (const p of PATTERNS) { p.re.lastIndex = 0; const m = t.match(p.re); if (m) { n += m.length; details.push(...m.map(x => `${rel}: ${x}`)); } }
  if (n) { perFile[rel] = n; total += n; }
}

if (mode === 'update') {
  mkdirSync(dirname(join(ROOT, BASELINE)), { recursive: true });
  const prev = existsSync(join(ROOT, BASELINE)) ? JSON.parse(readFileSync(join(ROOT, BASELINE), 'utf8')) : null;
  writeFileSync(join(ROOT, BASELINE), JSON.stringify({ at: new Date().toISOString(), note: 'K3 2026-09-13 批准方案 C: 存量基线, 只许递减', total, perFile }, null, 1), 'utf8');
  console.log(`[brand-baseline] 已重录: total=${total} files=${Object.keys(perFile).length}` + (prev ? ` (上次 ${prev.total})` : ''));
  process.exit(0);
}

console.log(`=== 门童 #3 品牌分层 · 全量基线闸门 ===\n扫描 ${files.length} 文件 | 当前双品牌总量 = ${total}`);
if (!existsSync(join(ROOT, BASELINE))) {
  console.log(`[SKIP] 无基线文件 ${BASELINE} — 先跑 node scripts/check-brand-baseline.mjs --update 建基线`);
  process.exit(0);
}
const base = JSON.parse(readFileSync(join(ROOT, BASELINE), 'utf8'));
const grew = Object.entries(perFile).filter(([f, n]) => n > (base.perFile[f] || 0));
console.log(`基线 (${base.at.slice(0, 10)}): total=${base.total}`);
if (total > base.total) {
  console.log(`[FAIL] 双品牌总量 ${base.total} → ${total} (新增 ${total - base.total})`);
} else {
  console.log(`[PASS] 未新增 (${base.total} → ${total}${total < base.total ? `, 已减 ${base.total - total} — 记得 --update 重录基线` : ''})`);
}
if (grew.length) {
  console.log(`\n新增文件级命中 (${grew.length}):`);
  grew.slice(0, 15).forEach(([f, n]) => {
    console.log(`  ${f}: ${base.perFile[f] || 0} → ${n}`);
    details.filter(d => d.startsWith(f + ':')).slice(0, 2).forEach(d => console.log(`      ${d.slice(0, 120)}`));
  });
}
if (mode === 'report') process.exit(0);
process.exit(total > base.total || grew.length ? 1 : 0);
