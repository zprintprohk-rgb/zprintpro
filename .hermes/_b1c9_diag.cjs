// .hermes/_b1c9_diag.cjs — 簇9 残余分布诊断
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
const ts = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const csv = fs.readFileSync(path.join(REPO, 'zprintpro-sku-seo-data.csv'), 'utf8');
// CSV 残余 9 行是什么
console.log('=== CSV 残余 (ISO 9001 / 15+ 年) ===');
csv.split(/\r?\n/).forEach((r, i) => {
  if (/ISO 9001|15\+ 年/.test(r)) {
    const c = r.split('\t');
    const m = r.match(/(ISO 9001[^，。;；\\]{0,18}|15\+ 年[^，。;；\\]{0,10})/g);
    console.log(`row ${i + 1} ${c[3]}: ${JSON.stringify(m)}`);
  }
});
// ts 残余按块归组
const SLUG_RE = /^  "([a-z0-9-]+)": \{/gm;
const marks = [];
let mm;
while ((mm = SLUG_RE.exec(ts)) !== null) marks.push({ slug: mm[1], start: mm.index });
for (let k = 0; k < marks.length; k++) marks[k].end = k + 1 < marks.length ? marks[k + 1].start : ts.length;
const PATTERNS = ['10 張起印，無開版費', 'ISO 9001 認證工廠', 'ISO 9001 認証工場', 'ISO 9001 certified', '15+ 年', '15+ 年の', '50-MOQ', ' | 100 MOQ', '100-MOQ', 'ISO9001', 'ISO 9001 認證', 'ISO 9001 認証'];
console.log('\n=== ts 残余按 SKU 归组 (仅列有残余的) ===');
let tot = 0;
for (const mk of marks) {
  const seg = ts.slice(mk.start, mk.end);
  const hits = [];
  for (const p of PATTERNS) {
    let c = 0, pos = 0;
    while (true) { const j = seg.indexOf(p, pos); if (j < 0) break; c++; pos = j + 1; }
    if (c) hits.push(`${p} x${c}`);
  }
  if (hits.length) { tot += hits.length; console.log(`  ${mk.slug}: ${hits.join(' | ')}`); }
}
console.log('blocks-with-residue:', tot);
