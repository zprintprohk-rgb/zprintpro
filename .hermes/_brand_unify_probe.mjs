// Post-deploy: verify Product.brand unified across locales while visible brand stays per-locale
const slugs = ['adhesive-posters', 'white-card-bags', 'mailer-boxes', 'kraft-paper-bags'];
const locales = ['zh-hk', 'en', 'ja'];

for (const s of slugs) {
  const row = [];
  for (const loc of locales) {
    const u = `https://zprintpro.com/${loc}/product/${s}/`;
    try {
      const h = await (await fetch(u)).text();
      const blocks = [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
      let brands = [];
      for (const b of blocks) {
        try {
          const j = JSON.parse(b);
          const nodes = Array.isArray(j) ? j : (j['@graph'] || [j]);
          for (const n of nodes.flat()) {
            if (n && n['@type'] === 'Product' && n.brand) brands.push(n.brand.name);
          }
        } catch {}
      }
      // visible brand from <title>
      const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
      const visible = loc === 'zh-hk' ? title.includes('智印港') : loc === 'ja' ? (title.includes('ジープリント') || title.includes('ZprintPro')) : title.includes('ZprintPro');
      row.push(`${loc}: schemaBrand=[${brands.join('|')}] titleBrand=${visible ? 'ok' : 'MISS'}`);
    } catch (e) { row.push(`${loc}: ERR`); }
  }
  console.log(s.padEnd(18), '|', row.join('  ·  '));
}

console.log('\n=== feed g:brand (should equal ZprintPro in all locales) ===');
for (const loc of locales) {
  const xml = await (await fetch(`https://zprintpro.com/api/merchant-feed/${loc}/`)).text();
  const brands = [...new Set([...xml.matchAll(/<g:brand>([^<]+)<\/g:brand>/g)].map(m => m[1]))];
  console.log(`${loc}: ${brands.join(',')}`);
}
console.log('BRAND_UNIFY_PROBE_DONE');
