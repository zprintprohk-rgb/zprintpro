// .hermes/_ja_unit_check.cjs
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
for (const s of ['rigid-boxes', 'cosmetic-boxes', 'mailer-boxes', 'white-card-bags', 'kraft-paper-bags']) {
  const i = marks.findIndex(x => x.s === s);
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const ja = seg.slice(seg.indexOf('"ja": {'));
  const mai = (ja.match(/100 ?枚から/g) || []).length;
  const ko = (ja.match(/100 ?個から/g) || []).length;
  console.log(`${s}: ja 100枚から=${mai} 100個から=${ko}`);
}
