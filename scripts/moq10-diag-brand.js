// moq10-diag-brand.js — 取得 BRAND_LOCALE_MISMATCH 明細 (門童 #3 硬攔診斷)
const path = require('path');
const guard = require('./guards/brand-guard.js');
const files = [];
const fs = require('fs');
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f.name)) files.push(path.relative(process.cwd(), p).replace(/\\/g, '/'));
  }
}
walk('src');

let hits = [];
if (typeof guard.scan === 'function') hits = guard.scan(files, { commit: true }) || [];
console.log(`BRAND_LOCALE_MISMATCH 命中: ${hits.length}`);
const byFile = {};
for (const h of hits) {
  const f = h.file || '?';
  byFile[f] = (byFile[f] || 0) + 1;
}
for (const [f, n] of Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 25)) {
  console.log(`  ${String(n).padStart(4)} × ${f}`);
}
console.log('\n--- 前 12 條明細 ---');
for (const h of hits.slice(0, 12)) {
  console.log(`  ${h.file}:${h.line} [${h.ruleId}] ${String(h.match).slice(0, 90)}`);
}
