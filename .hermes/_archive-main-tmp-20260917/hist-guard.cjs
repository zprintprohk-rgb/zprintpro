#!/usr/bin/env node
/* 只读: 指定 scope 的门童命中直方图 (默认 src/data/blog-data) */
const { execFileSync } = require('child_process');
const scope = process.argv[2] || 'src/data/blog-data';
let out = '';
try { out = execFileSync('node', ['scripts/check-regression-guard.js', scope], { cwd: 'F:\\zprintpro-main-tmp', encoding: 'utf8', maxBuffer: 128 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }); }
catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
const lines = out.split(/\r?\n/);
const hist = {}, samples = {};
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s*(🔴 HARD|🟡 SHADOW) \[(\w+)\] (.+?):(\d+)\s*$/);
  if (!m) continue;
  const rm = (lines[i + 1] || '').match(/规则: (\S+)/);
  const rule = rm ? rm[1] : '?';
  const k = `${m[2]}/${rule}`;
  hist[k] = (hist[k] || 0) + 1;
  if (!samples[k]) samples[k] = `${m[3]}:${m[4]} :: ${(lines[i + 2] || '').replace(/^\s*命中:\s*/, '').slice(0, 70)}`;
}
console.log(`scope=${scope} | 扫描文件数=${(out.match(/扫描文件数: (\d+)/) || [, '?'])[1]}`);
console.log(lines.filter(l => /📊 汇总/.test(l)).join('\n'));
Object.entries(hist).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}  e.g. ${samples[k]}`));
