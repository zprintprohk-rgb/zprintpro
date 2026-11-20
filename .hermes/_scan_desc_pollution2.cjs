// .hermes/_scan_desc_pollution2.cjs — 正确锚点: "seo": { 之后的 locale 块
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const slugs = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
const cjk = (s) => (s.match(/[\u4e00-\u9fff]/g) || []).length;
function seoDesc(blk, loc) {
  const si = blk.indexOf('"seo": {');
  if (si < 0) return '';
  const seg0 = blk.slice(si);
  const i = seg0.indexOf(`"${loc}": {`);
  if (i < 0) return '';
  const seg = seg0.slice(i, i + 2000);
  const m = seg.match(/"description": "((?:[^"\\]|\\.)*)"/);
  return m ? m[1].replace(/\\"/g, '"') : '';
}
const stats = { en: [], ja: [], zh: [] };
for (let i = 0; i < slugs.length; i++) {
  const blk = t.slice(slugs[i].o, slugs[i + 1] ? slugs[i + 1].o : t.length);
  for (const loc of ['en', 'ja']) {
    const d = seoDesc(blk, loc);
    if (!d) { stats[loc].push({ s: slugs[i].s, err: 'EMPTY' }); continue; }
    const n = cjk(d);
    if (n / d.length > 0.3) stats[loc].push({ s: slugs[i].s, n, len: d.length });
  }
}
for (const loc of ['en', 'ja']) {
  console.log(`\n=== ${loc}: ${stats[loc].length} suspicious`);
  stats[loc].slice(0, 12).forEach(x => console.log(`  ${x.s} ${x.err || `cjk=${x.n}/${x.len}`}`));
}
// 抽样验证正确性
const sample = t.slice(t.indexOf('"food-boxes": {'));
console.log('\nfood-boxes en desc:', seoDesc(sample, 'en').slice(0, 90));
console.log('food-boxes ja desc:', seoDesc(sample, 'ja').slice(0, 90));
