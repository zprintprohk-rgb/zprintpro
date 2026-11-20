// .hermes/_check_fill.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
for (const s of ['a4-flyers', 'gift-bags', 'kraft-paper-packaging-box']) {
  const i = marks.findIndex(x => x.s === s);
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const bm = seg.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  console.log('=== ' + s);
  console.log(JSON.stringify((bm ? bm[1] : '').slice(0, 190)));
}
