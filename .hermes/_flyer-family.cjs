const fs = require('fs');
const sku = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');

// All flyer-family slugs from products.ts (category_slug = flyers or slug contains flyer)
const pAnchors = [...prod.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => ({ slug: m[1], idx: m.index }));
pAnchors.push({ slug: '__END__', idx: prod.length });
const flyerFamily = [];
for (let i = 0; i < pAnchors.length - 1; i++) {
  const b = prod.slice(pAnchors[i].idx, pAnchors[i + 1].idx);
  const cat = (b.match(/\bcategory_slug:\s*'([^']+)'/) || [])[1] || '';
  if (cat === 'flyers' || /flyer/.test(pAnchors[i].slug)) flyerFamily.push(pAnchors[i].slug);
}
console.log('flyer-family slugs:', flyerFamily.join(', '));

// titles per locale for these slugs + products chips + finishing
const sBlocks = sku.split('\n  "').slice(1);
for (const slug of flyerFamily) {
  const sb = sBlocks.find((x) => x.slice(0, x.indexOf('":')) === slug);
  const pb = (() => { for (let i=0;i<pAnchors.length-1;i++){ if(pAnchors[i].slug===slug) return prod.slice(pAnchors[i].idx,pAnchors[i+1].idx);} })();
  const chip = (pb.match(/'(【[^']*)'/) || [])[1] || '';
  const fin = (pb.match(/\bfinishing:\s*'([^']*)'/) || [])[1] || '';
  const tZh = (sb?.match(/"zh-hk":\s*\{[^}]*?"title":\s*"([^"]+)"/) || [])[1] || '';
  console.log(`\n[${slug}]`);
  console.log(`  chip: ${chip}`);
  console.log(`  finishing: ${fin}`);
  console.log(`  zh-hk title: ${tZh}`);
}
