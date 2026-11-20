// .hermes/_audit_pc_moq2.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/products-content.ts', 'utf8');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const truth = {};
const pm = [...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)];
pm.forEach((m, i) => {
  const seg = prod.slice(m.index, pm[i + 1] ? pm[i + 1].index : prod.length);
  const mq = seg.match(/minQuantity: (\d+)/);
  if (mq) truth[m[1]] = +mq[1];
});
const blocks = [...t.matchAll(/^  '([a-z0-9-]+)': \{/gm)].map(m => ({ slug: m[1], off: m.index }));
console.log('blocks:', blocks.length, 'truth:', Object.keys(truth).length);
const out = [];
for (let i = 0; i < blocks.length; i++) {
  const seg = t.slice(blocks[i].off, i + 1 < blocks.length ? blocks[i + 1].off : t.length);
  const nums = [...seg.matchAll(/(\d{1,6})\s*(?:個|張|枚|本|冊)\s*起(?:印)?/g)].map(x => +x[1]).filter(n => n >= 10);
  const tr = truth[blocks[i].slug];
  if (!tr || !nums.length) continue;
  const min = Math.min(...nums);
  if (min !== tr) out.push(`${blocks[i].slug}: min=${min} truth=${tr} all=${[...new Set(nums)].sort((a, b) => a - b).slice(0, 6).join('/')}`);
}
console.log('mismatch:', out.length);
out.slice(0, 20).forEach(x => console.log('  ', x));
