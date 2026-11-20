// .hermes/_unit_audit.cjs — 量词与品类错配扫描 (sku-seo + products-content + products)
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
const BOXISH = /box|bag|banner|poster|card|flyer|sticker|label|envelope/;
const BOOKISH = /book|booklet|catalog|notebook|textbook|calendar|guide|certificate/;
const rows = [];
for (let i = 0; i < marks.length; i++) {
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const slug = marks[i].s;
  const zhang = (seg.match(/\d{1,5}\s*張\s*起(?:印)?/g) || []);
  const ge = (seg.match(/\d{1,5}\s*個\s*起(?:印)?/g) || []);
  const ben = (seg.match(/\d{1,5}\s*本\s*起(?:印)?/g) || []);
  if (BOXISH.test(slug) && zhang.length) rows.push(`[box 用張] ${slug}: ${[...new Set(zhang)].slice(0, 3).join('/')}`);
  if (BOOKISH.test(slug) && ge.length) rows.push(`[book 用個] ${slug}: ${[...new Set(ge)].slice(0, 3).join('/')}`);
}
console.log('mismatches:', rows.length);
rows.slice(0, 25).forEach(r => console.log('  ' + r));
