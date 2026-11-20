#!/usr/bin/env node
/* 只读: 列出门童命中的 (file, ruleId) 并标注是否 full-exempt — 定位 DoD 为何仍拦 */
const { execSync } = require('child_process');
const common = require('F:\\zprintpro-main-tmp\\scripts\\guards\\common.js');
let out = '';
try { out = execSync('node scripts/check-regression-guard.js --commit --strict', { cwd: 'F:\\zprintpro-main-tmp', encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }); }
catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
const lines = out.split(/\r?\n/);
const rows = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s*(🔴 HARD|🟡 SHADOW) \[(\w+)\] (.+?):(\d+)\s*$/);
  if (!m) continue;
  const rule = (lines[i + 1] || '').match(/规则: (\S+) -/);
  rows.push({ sev: m[2], file: m[3], rule: rule ? rule[1] : '?' });
}
console.log('命中明细 (file 原样输出, 用于核对豁免正则是否匹配):');
rows.forEach(r => console.log(`  [${r.sev}] "${r.file}" rule=${r.rule} fullExempt=${common.isFullExemptPath(r.file)}`));
console.log('\n未被豁免的命中:');
rows.filter(r => !common.isFullExemptPath(r.file)).forEach(r => console.log(`  [${r.sev}] "${r.file}" rule=${r.rule}`));
