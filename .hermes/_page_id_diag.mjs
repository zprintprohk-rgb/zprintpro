// Check page-level product identifiers (sku/mpn/gtin) across 3 locales for same SKU
const pages = [
  'https://zprintpro.com/zh-hk/product/kraft-paper-bags/',
  'https://zprintpro.com/en/product/kraft-paper-bags/',
  'https://zprintpro.com/ja/product/kraft-paper-bags/',
  'https://zprintpro.com/zh-hk/product/a2-posters/',
  'https://zprintpro.com/ja/product/a2-posters/',
];
for (const u of pages) {
  try {
    const h = await (await fetch(u)).text();
    const blocks = [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
    const out = [];
    for (const b of blocks) {
      let j;
      try { j = JSON.parse(b); } catch { continue; }
      const nodes = Array.isArray(j) ? j : (j['@graph'] || [j]);
      for (const n of nodes.flat()) {
        if (!n || typeof n !== 'object') continue;
        if (n['@type'] === 'Product' || (Array.isArray(n['@type']) && n['@type'].includes('Product'))) {
          const brand = n.brand && (n.brand.name || n.brand);
          out.push(`Product sku=${JSON.stringify(n.sku)} mpn=${JSON.stringify(n.mpn)} gtin=${JSON.stringify(n.gtin || n.gtin13 || n.gtin12)} productID=${JSON.stringify(n.productID)} brand=${JSON.stringify(brand)}`);
        }
      }
    }
    console.log(u.replace('https://zprintpro.com', ''));
    console.log('  ' + (out.length ? out.join('\n  ') : 'NO Product node'));
  } catch (e) {
    console.log(u, 'ERR', e.message);
  }
}
console.log('PAGE_ID_DIAG_DONE');
