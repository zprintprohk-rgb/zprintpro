#!/usr/bin/env node
/* 只读: 残留双品牌形态细分 (基线 150 处的构成) — 找出本批未覆盖的形态 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const FORMS = {
  'zh: 智印港 ZprintPro': /智印港\s*ZprintPro/g,
  'zh: ZprintPro 智印港': /ZprintPro\s*智印港/g,
  'zh: 智印港 | ZprintPro': /智印港\s*\|\s*ZprintPro/g,
  'ja: ジープリント ZprintPro': /ジープリント\s*ZprintPro/g,
  'ja: ZprintPro ジープリント': /ZprintPro\s*ジープリント/g,
  'zh-ja: 智印港 ジープリント': /智印港\s*ジープリント/g,
};
const EXT = /\.(ts|tsx|js|mjs|cjs|json|html)$/;
const files = [];
function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!['node_modules', '.next', '.git', '.open-next'].includes(e.name)) walk(p); } else if (EXT.test(e.name)) files.push(p); } }
['src', 'messages'].forEach(d => { if (fs.existsSync(path.join(ROOT, d))) walk(path.join(ROOT, d)); });

const agg = {}; const perFile = {};
const samples = [];
for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const t = fs.readFileSync(f, 'utf8');
  for (const [name, re] of Object.entries(FORMS)) {
    const m = t.match(re);
    if (!m) continue;
    agg[name] = (agg[name] || 0) + m.length;
    perFile[rel] = perFile[rel] || {};
    perFile[rel][name] = m.length;
    if (name === 'ja: ZprintPro ジープリント' && samples.length < 5) {
      const idx = t.indexOf(m[0]);
      samples.push(`${rel}: …${t.slice(Math.max(0, idx - 60), idx + 60).replace(/\s+/g, ' ')}…`);
    }
  }
}
console.log('=== 残留形态构成 ===');
Object.entries(agg).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
console.log('  合计(逐形态相加, 可能有重叠):', Object.values(agg).reduce((a, b) => a + b, 0));
console.log('\n=== ja: ZprintPro ジープリント 样本 ===');
samples.forEach(s => console.log('  ' + s));
console.log('\n=== 按文件 (Top 15) ===');
Object.entries(perFile).sort((a, b) => Object.values(b[1]).reduce((x, y) => x + y, 0) - Object.values(a[1]).reduce((x, y) => x + y, 0)).slice(0, 15)
  .forEach(([f, v]) => console.log(`  ${f}: ${JSON.stringify(v)}`));
