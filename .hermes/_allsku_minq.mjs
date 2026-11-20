// Enumerate packaging SKUs + authoritative minQ via PDP eligibleQuantity
const fs = await import('node:fs');
const src = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
// find slugs whose object contains category_slug: 'packaging' (rough window parse)
const slugRe = /slug:\s*'([a-z0-9-]+)'/g;
const slugs = [...src.matchAll(slugRe)].map(m => m[1]);
const uniq = [...new Set(slugs)];
console.log('total unique slugs:', uniq.length);
// probe all PDPs (batched, gentle pacing) and read eligibleQuantity
const out = [];
for (const s of uniq) {
  try {
    const h = await (await fetch(`https://zprintpro.com/zh-hk/product/${s}/`)).text();
    const m = h.match(/"eligibleQuantity"\s*:\s*{[^}]*"minValue"\s*:\s*(\d+)/);
    const price = h.match(/"price"\s*:\s*"([\d.]+)"/);
    out.push(`${s}\t${m ? m[1] : '?'}\t${price ? price[1] : '?'}`);
  } catch (e) {
    out.push(`${s}\tERR\t${e.message.slice(0, 40)}`);
  }
  await new Promise(r => setTimeout(r, 150));
}
fs.writeFileSync('F:/zprintpro-nextjs/.hermes/_allsku_minq.tsv', out.join('\n') + '\n', 'utf8');
console.log('written .hermes/_allsku_minq.tsv rows:', out.length);
console.log('ALLSKU_MINQ_DONE');
