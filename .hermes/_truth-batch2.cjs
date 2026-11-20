const fs = require('fs');
const t = fs.readFileSync('src/data/products.ts', 'utf8');
const slugs = ['custom-red-packets','custom-calendars','mini-calendars','double-sided-flyers','roll-up-banners','a4-flyers','thick-paper-flyers','outdoor-vinyl-banners','eco-flyers','vehicle-wraps','graduation-yearbook','kraft-paper-packaging-box'];
const starts = [...t.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: t.length });
const map = {};
for (let i = 0; i < starts.length - 1; i++) {
  map[starts[i].slug] = t.slice(starts[i].idx, starts[i + 1].idx);
}
for (const s of slugs) {
  const b = map[s] || '';
  const g = (re) => { const m = b.match(re); return m ? m[1] : null; };
  console.log(`${s}: minQ=${g(/\bminQuantity:\s*(\d+)/) ?? '?'} basePrice=${g(/\bbasePrice:\s*([\d.]+)/) ?? '?'} bp_en=${g(/\bbasePrice_en:\s*([\d.]+)/) ?? '?'} bp_ja=${g(/\bbasePrice_ja:\s*([\d.]+)/) ?? '?'}`);
}
