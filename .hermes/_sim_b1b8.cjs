// .hermes/_sim_b1b8.cjs — B1-B8 两两近似度（3-gram Jaccard，防同质化）
const fs = require('fs');
const L = (f) => JSON.parse(fs.readFileSync(`src/data/blog-data/${f}.json`, 'utf8'));
const M = { 'zh-hk': L('zh-hk'), en: L('en'), ja: L('ja') };
const SPEC = [
  ['B1', 'ja', 'new-year-card-printing-2027-guide'],
  ['B2', 'ja', 'comiket-printing-prep-guide'],
  ['B3', 'en', 'comiket-printing-prep-guide'],
  ['B4', 'zh-hk', 'cny-2027-red-packet-printing-guide'],
  ['B5', 'zh-hk', 'corporate-calendar-customization-2027'],
  ['B6', 'en', 'calendar-sizes-print-reference'],
  ['B7', 'en', 'corporate-holiday-cards-printing-guide'],
  ['B8', 'zh-hk', 'paper-bag-printing-guide'],
];
const grams = (s) => {
  const t = s.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  const g = new Set();
  for (let i = 0; i < t.length - 2; i++) g.add(t.slice(i, i + 3));
  return g;
};
const G = SPEC.map(([id, loc, slug]) => ({ id, loc, s: grams(M[loc][slug].content || '') }));
let max = { v: 0, a: '', b: '' };
for (let i = 0; i < G.length; i++) {
  for (let j = i + 1; j < G.length; j++) {
    if (G[i].loc !== G[j].loc) continue; // 跨语言不比
    const a = G[i].s, b = G[j].s;
    let inter = 0;
    a.forEach((x) => { if (b.has(x)) inter++; });
    const j2 = inter / (a.size + b.size - inter);
    if (j2 > max.v) max = { v: j2, a: G[i].id, b: G[j].id };
  }
}
console.log('max same-locale 3-gram Jaccard:', max.v.toFixed(3), `${max.a} vs ${max.b}`);
console.log(max.v < 0.25 ? 'PASS (<0.25)' : 'WARN (>=0.25)');
