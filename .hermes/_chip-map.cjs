const fs = require('fs');
const t = fs.readFileSync('src/data/products.ts', 'utf8');
const anchors = [...t.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => ({ slug: m[1], idx: m.index, line: t.slice(0, m.index).split('\n').length }));
anchors.push({ slug: '__END__', idx: t.length, line: t.split('\n').length });
const lines = t.split('\n');
// targets
const targets = [];
lines.forEach((ln, i) => {
  if (/異形裁切與圓角可選|覆膜選項/.test(ln)) targets.push({ line: i + 1, text: ln.trim().slice(0, 50) });
});
// map each target line to containing slug
const findSlug = (lineNo) => {
  let cur = anchors[0];
  for (const a of anchors) { if (a.line > lineNo) break; cur = a; }
  return cur.slug === '__END__' ? '(end)' : cur.slug;
};
console.log('=== 異形裁切與圓角可選 / 覆膜選項 chips by slug ===');
for (const tg of targets) {
  const slug = findSlug(tg.line);
  console.log(`L${tg.line} [${slug}]: ${tg.text}`);
}
// which of these are flyer family?
const flyer = new Set(['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers','small-batch-flyers','poster-flyers','restaurant-menu-flyers']);
console.log('\n=== flyer-family slugs hit ===');
for (const tg of targets) {
  const slug = findSlug(tg.line);
  if (flyer.has(slug)) console.log(`  ${slug} L${tg.line}: ${tg.text}`);
}
