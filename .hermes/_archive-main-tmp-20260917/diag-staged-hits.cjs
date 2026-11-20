#!/usr/bin/env node
/* 只读: 当前 staged 提交的门童命中分布 (file / ruleId / 样本) — 定位 50 red 来源 */
const { execSync } = require('child_process');
let out = '';
try { out = execSync('node scripts/check-regression-guard.js --commit --strict', { cwd: 'F:\\zprintpro-main-tmp', encoding: 'utf8', maxBuffer: 128 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }); }
catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
const lines = out.split(/\r?\n/);
const byRule = {}, byFile = {}, samples = {};
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s*(🔴 HARD|🟡 SHADOW) \[(\w+)\] (.+?):(\d+)\s*$/);
  if (!m) continue;
  const rm = (lines[i + 1] || '').match(/规则: (\S+) -/);
  const rule = rm ? rm[1] : '?';
  byRule[`${m[2]}/${rule}`] = (byRule[`${m[2]}/${rule}`] || 0) + 1;
  byFile[`${m[3]}`] = (byFile[`${m[3]}`] || 0) + 1;
  if (!samples[rule]) samples[rule] = `${m[3]}:${m[4]} :: ${(lines[i + 2] || '').replace(/^\s*命中:\s*/, '').slice(0, 70)}`;
}
console.log('=== 严重度/规则 分布 (当前 staged) ===');
Object.entries(byRule).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
console.log('\n=== 命中文件 ===');
Object.entries(byFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
console.log('\n=== 规则样本 ===');
Object.entries(samples).forEach(([r, s]) => console.log(`  ${r}: ${s}`));
