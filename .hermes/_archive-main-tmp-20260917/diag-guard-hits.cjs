#!/usr/bin/env node
/* 只读: 跑门童 --commit --strict 并统计 ruleId 直方图 (定位 AGENTS.md/日志 被拦的真实规则) */
const { execSync } = require('child_process');
let out = '';
try { out = execSync('node scripts/check-regression-guard.js --commit --strict', { cwd: 'F:\\zprintpro-main-tmp', encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }); }
catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
const hist = {}, byFile = {};
out.split(/\r?\n/).forEach(l => {
  const m = l.match(/^\s*(🔴 HARD|🟡 SHADOW) \[(\w+)\] (.+?):(\d+)\s*$/);
  if (m) { byFile[m[3]] = (byFile[m[3]] || 0) + 1; return; }
  const r = l.match(/规则: (\S+) -/);
  if (r) hist[r[1]] = (hist[r[1]] || 0) + 1;
});
console.log('=== 命中文件 ===');
Object.entries(byFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`  ${n}  ${f}`));
console.log('\n=== ruleId 直方图 ===');
Object.entries(hist).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
console.log('\n=== 汇总行 ===');
console.log(out.split(/\r?\n/).filter(l => /📊 汇总/.test(l)).join('\n'));
