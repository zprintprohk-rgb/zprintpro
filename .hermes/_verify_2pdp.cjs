// .hermes/_verify_2pdp.cjs — 直答段/单位核验（含 en/ja 段）
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
for (const s of ['rigid-boxes', 'cosmetic-boxes']) {
  const i = marks.findIndex(x => x.s === s);
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const bm = seg.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  const body = bm ? bm[1] : '';
  console.log(`=== ${s}`);
  console.log('   head120:', JSON.stringify(body.slice(0, 120)));
  console.log('   直答:', seg.includes('直答'), '| 100 張起印:', (seg.match(/100 張起印/g) || []).length,
    '| 100 pcs:', (seg.match(/100 (?:pcs|MOQ|pieces)/g) || []).length,
    '| 100枚:', (seg.match(/100 ?枚/g) || []).length);
}
