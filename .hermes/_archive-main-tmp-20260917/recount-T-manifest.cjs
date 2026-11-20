#!/usr/bin/env node
/* 只读: 重算 T 批清单 (locale 判定已支持行内三元 + 括注豁免) — 得到**真实** T2 待办量 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const common = require(path.join(ROOT, 'scripts', 'guards', 'common.js'));
const DUAL = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント|智印港\s*ジープリント/g;
const LONE = [
  { re: /ZprintPro/g, badIn: ['zh-hk'] },
  { re: /智印港/g, badIn: ['en', 'ja', 'other'] },
  { re: /ジープリント/g, badIn: ['zh-hk', 'en'] },
];
const GLOSS = /智印港\s*[（(]\s*ZprintPro\s*[）)]|ZprintPro\s*[（(]\s*智印港\s*[）)]|ジープリント\s*[（(]\s*ZprintPro\s*[）)]/g;
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!['node_modules', '.next', '.git', '.open-next'].includes(e.name)) walk(p); } else if (/\.(ts|tsx|js|json|html)$/.test(e.name)) files.push(p); } })(path.join(ROOT, 'src'));

const items = [];
for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const raw = fs.readFileSync(f, 'utf8');
  const masked = raw.replace(GLOSS, (m) => '　'.repeat(m.length));
  masked.split(/\r?\n/).forEach((line, idx) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;   // 注释豁免
    let m;
    DUAL.lastIndex = 0;
    while ((m = DUAL.exec(line)) !== null) items.push({ file: rel, line: idx + 1, kind: 'dual', form: m[0] });
    for (const t of LONE) {
      t.re.lastIndex = 0;
      while ((m = t.re.exec(line)) !== null) {
        const loc = common.resolveLocale(masked, masked.split(/\r?\n/).slice(0, idx).join('\n').length + (idx ? 1 : 0) + m.index, f);
        if (loc && t.badIn.includes(loc)) items.push({ file: rel, line: idx + 1, kind: `lone(${loc})`, form: m[0] });
      }
    }
  });
}
const byFile = {};
items.forEach(i => byFile[i.file] = (byFile[i.file] || 0) + 1);
fs.writeFileSync(path.join(ROOT, '.hermes', 'title-batch-T-manifest-v2.json'), JSON.stringify({ at: new Date().toISOString(), total: items.length, byFile, items }, null, 1), 'utf8');
console.log(`真实 T 批待办: ${items.length} 处 / ${Object.keys(byFile).length} 文件 (v1 为 301/57)`);
console.log('按 kind:', JSON.stringify(items.reduce((a, x) => (a[x.kind] = (a[x.kind] || 0) + 1, a), {})));
console.log('\n按文件 Top 20:');
Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
