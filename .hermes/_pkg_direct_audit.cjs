// .hermes/_pkg_direct_audit.cjs — 包装簇 9 SKU 直答覆盖
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
const SKUS = ['food-boxes', 'folding-boxes', 'mailer-boxes', 'white-card-bags', 'kraft-paper-bags', 'eco-friendly-boxes', 'gift-boxes', 'rigid-boxes', 'cosmetic-boxes'];
for (const s of SKUS) {
  const i = marks.findIndex(x => x.s === s);
  if (i < 0) { console.log(`${s}: MISSING`); continue; }
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const bm = seg.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  const body = bm ? bm[1] : '';
  console.log(`${s}: 直答=${seg.includes('直答')} len=${body.length} | head=${JSON.stringify(body.slice(0, 60))}`);
}
