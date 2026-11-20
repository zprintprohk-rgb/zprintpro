const fs = require('fs');
const t = fs.readFileSync('src/data/products.ts', 'utf8');
const slugs = ['a4-flyers', 'waterproof-stickers', 'wall-calendars'];
// find slug anchors
const anchors = [...t.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => ({ slug: m[1], idx: m.index }));
anchors.push({ slug: '__END__', idx: t.length });
for (const want of slugs) {
  for (let i = 0; i < anchors.length - 1; i++) {
    if (anchors[i].slug !== want) continue;
    const b = t.slice(anchors[i].idx, anchors[i + 1].idx);
    const g = (re) => { const m = b.match(re); return m ? m[1].trim() : null; };
    console.log(`\n=== products.ts ${want} ===`);
    console.log('  minQuantity =', g(/\bminQuantity:\s*(\d+)/));
    console.log('  unitLabel =', g(/\bunitLabel:\s*'([^']+)'/));
    console.log('  category_slug =', g(/\bcategory_slug:\s*'([^']+)'/));
    // price tier structures
    const tierM = b.match(/(?:tiers|priceTiers|tieredPricing)\s*:\s*\[([\s\S]{0,600}?)\]/);
    console.log('  tier-like block:', tierM ? tierM[0].slice(0, 300).replace(/\s+/g, ' ') : '(none)');
    const qtyM = [...b.matchAll(/\bqty:\s*(\d+)/g)].map((m) => m[1]);
    const priceM = [...b.matchAll(/\bpriceHKD:\s*([\d.]+)/g)].map((m) => m[1]);
    if (qtyM.length) console.log('  qty[] =', qtyM.join(','));
    if (priceM.length) console.log('  priceHKD[] =', priceM.join(','));
    break;
  }
}
// also check price-data.generated.ts source header
const p = fs.readFileSync('src/lib/price-data.generated.ts', 'utf8').slice(0, 800);
console.log('\n=== price-data.generated.ts header ===');
console.log(p.split('\n').slice(0, 12).join('\n'));
