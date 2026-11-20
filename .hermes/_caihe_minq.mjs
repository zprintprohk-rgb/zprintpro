// Authoritative truth: PDP eligibleQuantity + price for the 3 彩盒 SKUs
const slugs = ['corrugated-boxes', 'tuck-end-boxes', 'white-cardboard-boxes'];
for (const s of slugs) {
  const h = await (await fetch(`https://zprintpro.com/zh-hk/product/${s}/`)).text();
  const m = h.match(/"eligibleQuantity"\s*:\s*{[^}]*"minValue"\s*:\s*(\d+)/);
  const price = h.match(/"price"\s*:\s*"([\d.]+)"/);
  console.log(`${s}: minQ=${m ? m[1] : '?'} basePrice=${price ? price[1] : '?'}`);
}
console.log('---products.ts fields---');
