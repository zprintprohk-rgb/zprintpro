// Deep re-diagnosis: flagged pages (3 locales) + feeds (id/mpn/brand clustering keys)
async function pageDiag(u) {
  const h = await (await fetch(u)).text();
  const blocks = [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  let totalBrand = 0;
  const details = [];
  blocks.forEach((b, i) => {
    const brands = b.match(/"brand"\s*:/g);
    if (brands) {
      totalBrand += brands.length;
      const vals = b.match(/"brand"\s*:\s*(\{[^{}]*\}|"[^"]*")/g);
      details.push(`  block${i}: ${brands.length} brand key(s) -> ${vals ? vals.map(v => v.slice(0, 90)).join(' || ') : '?'}`);
    }
  });
  const microdata = (h.match(/itemprop="brand"/g) || []).length;
  const metaBrand = (h.match(/<meta[^>]*(property|name)="(product:brand|og:brand)"/g) || []).length;
  console.log(`${u}`);
  console.log(`  ld+json blocks=${blocks.length} totalBrandKeys=${totalBrand} microdataBrand=${microdata} metaBrand=${metaBrand}`);
  details.forEach(d => console.log(d));
}

await pageDiag('https://zprintpro.com/ja/product/waterproof-stickers/');
await pageDiag('https://zprintpro.com/en/product/wall-calendars/');
await pageDiag('https://zprintpro.com/zh-hk/product/kraft-paper-bags/');

// feeds: id / mpn / brand clustering keys
for (const loc of ['zh-hk', 'en', 'ja']) {
  const xml = await (await fetch(`https://zprintpro.com/api/merchant-feed/${loc}/`)).text();
  const first = xml.split('<item>')[1] || '';
  const id = (first.match(/<g:id>([^<]+)<\/g:id>/) || [])[1];
  const mpn = (first.match(/<g:mpn>([^<]+)<\/g:mpn>/) || [])[1];
  const brand = (first.match(/<g:brand>([^<]+)<\/g:brand>/) || [])[1];
  const gtin = (first.match(/<g:gtin>/g) || []).length;
  const ie = (first.match(/identifier_exists/g) || []).length;
  console.log(`feed ${loc}: id=${id} mpn=${mpn} brand=${brand} gtinTags=${gtin} identifier_exists=${ie}`);
}
console.log('REDIAG_DONE');
