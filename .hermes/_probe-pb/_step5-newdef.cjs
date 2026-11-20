/**
 * Step 5 — 定位门童 #4 双向扫描的「★新增缺陷」(定位用探针)
 * 直接调用 guard.scanBidirectional(content, file), 逐档比对 .hermes/i18n-pollution-baseline.json
 * 用法: node .hermes/_probe-pb/_step5-newdef.cjs
 */
const path = require('path');
const fs = require('fs');
const ROOT = 'F:\\zprintpro-nextjs';
const guard = require(path.join(ROOT, 'scripts', 'guards', 'i18n-guard.js'));
const baseline = guard.loadI18nBaseline();
const base = baseline.perFile || {};
console.log(`基线 total=${baseline.total} / measuredTotal=${baseline.measuredTotal} / perFile 档数=${Object.keys(base).length}`);

// 与门童同一收集口径: src/** + 根配置 (这里手动走 src/, 与 perFile 的档集合一致)
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/node_modules|\.next|\.git/.test(e.name)) walk(p, out); }
    else if (/\.(ts|tsx|json|js|mjs|cjs)$/.test(e.name)) out.push(p);
  }
  return out;
}
const files = walk(path.join(ROOT, 'src'));
const perFile = {};
const detail = [];
let total = 0, legacy = 0;
for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf-8'); } catch { continue; }
  const hits = guard.scanBidirectional(content, f);
  if (!hits.length) continue;
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  perFile[rel] = (perFile[rel] || 0) + hits.length;
  total += hits.length;
  for (const h of hits) {
    detail.push(h);
    if (h.legacyRed) legacy++;
  }
}
console.log(`裸扫 (src/): 双向命中 ${total} 条 / 涉及 ${Object.keys(perFile).length} 档 / legacyRed ${legacy} 条`);
const perRule = {};
for (const h of detail) perRule[h.ruleId] = (perRule[h.ruleId] || 0) + 1;
console.log('perRule:', JSON.stringify(perRule));
console.log('基线 perRule:', JSON.stringify(baseline.perRule));
console.log('基线内豁免(重叠部分) =', total - legacy - (() => { let n = 0; for (const [f, c] of Object.entries(perFile)) n += Math.max(0, c - (base[f] || 0)); return n; })());

console.log('\n=== ★超出基线的档 (新增缺陷) ===');
let any = false;
for (const [f, c] of Object.entries(perFile).sort()) {
  const b = base[f] || 0;
  if (c > b) { any = true; console.log(`  ${f}: 实测 ${c} / 基线 ${b} / +${c - b}`); }
}
if (!any) console.log('  (无)');

console.log('\n=== 递减的档 (只许递减) ===');
for (const [f, b] of Object.entries(base).sort()) {
  const c = perFile[f] || 0;
  if (c < b) console.log(`  ${f}: 基线 ${b} -> 实测 ${c} (−${b - c})`);
}

console.log('\n=== 新增缺陷逐条明细 ===');
for (const h of detail) {
  const f = h.file;
  const b = base[f] || 0;
  if ((perFile[f] || 0) <= b) continue;
  console.log(`  ${f}:${h.line} [${h.ruleId}] ${h.match} | legacyRed=${h.legacyRed}`);
  const lines = fs.readFileSync(path.join(ROOT, f), 'utf8').split('\n');
  console.log(`      ${lines[h.line - 1].trim().slice(0, 200)}`);
}
