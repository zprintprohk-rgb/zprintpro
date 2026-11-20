// .hermes/_ja_simplified.cjs — 定位 sku-seo ja 简体 (胶/规) 的块归属 + CSV 对应
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8').split('\n');
for (const ln of [2608, 2744]) {
  const L = t[ln - 1] || '';
  const j = L.indexOf('胶');
  const k = L.indexOf('规');
  const idx = j >= 0 ? j : k;
  const ch = j >= 0 ? '胶' : '规';
  let slug = '';
  for (let i = ln - 1; i >= 0; i--) {
    const m = t[i].match(/^  "([a-z0-9-]+)": \{/);
    if (m) { slug = m[1]; break; }
  }
  console.log(`L${ln} slug=${slug} ch=${ch} ctx=${JSON.stringify(L.slice(Math.max(0, idx - 50), idx + 50))}`);
}
// CSV 对应
const csv = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8').split('\n');
csv.forEach((r, i) => {
  if (r.includes('胶') || r.includes('规')) {
    const cols = r.split('\t');
    const hits = [];
    cols.forEach((c, ci) => { if (c.includes('胶') || c.includes('规')) hits.push(`col${ci + 1}:${c.slice(Math.max(0, c.indexOf('胶') + c.indexOf('规') >= 0 ? Math.min(Math.max(0, c.indexOf('胶')), Math.max(0, c.indexOf('规'))) : Math.max(0, c.indexOf('胶') >= 0 ? c.indexOf('胶') : c.indexOf('规'))) - 15, (c.indexOf('胶') >= 0 ? c.indexOf('胶') : c.indexOf('规')) + 25)}`); });
    console.log(`csv row ${i + 1} slug=${cols[3]} -> ${hits.join(' | ')}`);
  }
});
