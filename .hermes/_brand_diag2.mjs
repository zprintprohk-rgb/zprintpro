// Check brand occurrences per JSON-LD block on two more affected URLs
const urls = [
  'https://zprintpro.com/en/product/business-envelopes/',
  'https://zprintpro.com/ja/product/doujinshi-printing/',
  'https://zprintpro.com/zh-hk/product/folded-leaflets/',
];
for (const u of urls) {
  const h = await (await fetch(u)).text();
  const blocks = [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  console.log('==', u, 'blocks:', blocks.length);
  blocks.forEach((b, i) => {
    const brands = b.match(/"brand"\s*:/g);
    if (b.includes('"Product"') || brands) {
      console.log('  block', i, 'len', b.length, 'rawBrandKeys:', brands ? brands.length : 0);
      const m = b.match(/"brand"\s*:\s*(\{[^{}]*\}|"[^"]*")/g);
      if (m) m.forEach(x => console.log('    ', x.slice(0, 120)));
    }
  });
}
console.log('BRAND_DIAG2_DONE');
