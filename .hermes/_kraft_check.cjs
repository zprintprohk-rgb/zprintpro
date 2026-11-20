// .hermes/_kraft_check.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [];
const re = /^  "([a-z0-9-]+)": \{/gm;
let m; while ((m = re.exec(t)) !== null) marks.push({ slug: m[1], off: m.index });
const i = marks.findIndex(x => x.slug === 'kraft-paper-packaging-box');
const seg = t.slice(marks[i].off, marks[i + 1] ? marks[i + 1].off : t.length);
for (const s of ['300 個起印', '100 個起印', '100 張起印']) {
  console.log(s, '->', (seg.match(new RegExp(s, 'g')) || []).length);
}
