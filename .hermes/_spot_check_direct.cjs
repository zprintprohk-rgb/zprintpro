// .hermes/_spot_check_direct.cjs — 抽检新插入直答的自然度与重复
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
let dup = 0, total = 0;
for (let i = 0; i < marks.length; i++) {
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const bm = seg.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  const body = bm ? bm[1] : '';
  const n = (body.match(/直答：/g) || []).length;
  total += n;
  if (n > 1) { dup++; console.log('DUP', marks[i].s, n); }
}
console.log('直答 clauses:', total, '| duplicated blocks:', dup);
for (const s of ['wall-calendars', 'pvc-menus', 'business-envelopes', 'embossed-red-packets', 'folded-leaflets']) {
  const i = marks.findIndex(x => x.s === s);
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const bm = seg.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  console.log(`\n[${s}]`, JSON.stringify((bm ? bm[1] : '').slice(0, 150)));
}
