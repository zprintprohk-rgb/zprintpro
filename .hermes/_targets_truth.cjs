// .hermes/_targets_truth.cjs — rigid/cosmetic 在 products.ts 的真值字段
const fs = require('fs');
const t = fs.readFileSync('src/data/products.ts', 'utf8');
const marks = [...t.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ slug: m[1], off: m.index }));
for (const s of ['rigid-boxes', 'cosmetic-boxes']) {
  const i = marks.findIndex(x => x.slug === s);
  const seg = t.slice(marks[i].off, marks[i + 1] ? marks[i + 1].off : t.length);
  const pick = (k) => { const m = seg.match(new RegExp(k + ":\\s*([^,\\n]+)")); return m ? m[1].trim() : '-'; };
  console.log(`=== ${s}`);
  ['minQuantity', 'basePrice', 'price_range', 'leadTime', 'turnaround', 'productionTime', 'deliveryTime'].forEach(k => {
    const v = pick(k);
    if (v !== '-') console.log(`   ${k}: ${v}`);
  });
  const lead = seg.match(/['"]?[^'"\n]*(?:工作天|天交|交期)[^'"\n]{0,40}/g);
  console.log('   lead-ish:', (lead || []).slice(0, 4).join(' | ').slice(0, 200));
}
