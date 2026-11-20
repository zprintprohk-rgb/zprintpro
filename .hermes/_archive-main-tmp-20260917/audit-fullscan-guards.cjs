#!/usr/bin/env node
/* 只读: 用复活的 15 道门童对 src/ 做一次**全量**扫描 (8/26~9/13 门禁失效窗口的补扫),
 * 输出 ruleId 直方图 + 每规则样本, 供 K3 判断是否需要补修。
 */
const { execSync } = require('child_process');
let out = '';
try { out = execSync('node scripts/check-regression-guard.js --strict-all src/', { cwd: 'F:\\zprintpro-main-tmp', encoding: 'utf8', maxBuffer: 128 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }); }
catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
const lines = out.split(/\r?\n/);
const hist = {}; const samples = {}; const byFile = {};
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s*(🔴 HARD|🟡 SHADOW) \[(\w+)\] (.+?):(\d+)\s*$/);
  if (!m) continue;
  const rm = (lines[i + 1] || '').match(/规则: (\S+) -/);
  const rule = rm ? rm[1] : '?';
  hist[rule] = (hist[rule] || 0) + 1;
  byFile[m[3]] = (byFile[m[3]] || 0) + 1;
  if (!samples[rule]) {
    const hitLine = (lines[i + 2] || '').replace(/^\s*命中:\s*/, '').slice(0, 90);
    samples[rule] = `${m[3]}:${m[4]} :: ${hitLine}`;
  }
}
console.log('=== 汇总行 ===');
console.log(lines.filter(l => /📊 汇总/.test(l)).join('\n') || '(无)');
console.log('\n=== ruleId 直方图 (全量 src/) ===');
Object.entries(hist).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}  e.g. ${samples[k]}`));
console.log('\n=== 命中文件 Top 12 ===');
Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
