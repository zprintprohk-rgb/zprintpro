// .hermes/_eyeball_enja.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
for (const s of ['rigid-boxes', 'mailer-boxes', 'kraft-paper-bags']) {
  const i = marks.findIndex(x => x.s === s);
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const en = seg.slice(seg.indexOf('"en": {'), seg.indexOf('"ja": {'));
  const ja = seg.slice(seg.indexOf('"ja": {'));
  const enB = en.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  const jaB = ja.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  console.log(`\n=== ${s}`);
  console.log('EN:', JSON.stringify((enB ? enB[1] : '').slice(0, 170)));
  console.log('JA:', JSON.stringify((jaB ? jaB[1] : '').slice(0, 170)));
}
