// .hermes/_next_targets.cjs — rigid/cosmetic body 现状 + 直答段检查
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ slug: m[1], off: m.index }));
function block(slug) {
  const i = marks.findIndex(x => x.slug === slug);
  if (i < 0) return '';
  return t.slice(marks[i].off, marks[i + 1] ? marks[i + 1].off : t.length);
}
for (const s of ['rigid-boxes', 'cosmetic-boxes', 'food-boxes']) {
  const b = block(s);
  const bm = b.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  const body = bm ? bm[1] : '';
  console.log(`=== ${s} bodyLen=${body.length} has直答=${body.includes('直答')}`);
  console.log('   head:', JSON.stringify(body.slice(0, 240)));
  const dm = b.match(/"description":\s*"((?:[^"\\]|\\.)*)"/);
  console.log('   desc:', JSON.stringify((dm ? dm[1] : '').slice(0, 120)));
}
