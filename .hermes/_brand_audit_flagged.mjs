// Deep brand-field audit on the EXACT flagged URLs (GSC 2026-10-31 examples)
const flagged = ['adhesive-posters', 'white-card-bags', 'mailer-boxes'];
const locales = ['zh-hk', 'en', 'ja'];

function auditHtml(u, h) {
  const blocks = [...h.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const perBlock = [];
  let totalBrand = 0;
  let productNodes = 0;
  blocks.forEach((b, i) => {
    const c = (b.match(/"brand"\s*:/g) || []).length;
    totalBrand += c;
    let types = [];
    try {
      const j = JSON.parse(b);
      const nodes = Array.isArray(j) ? j : (j['@graph'] || [j]);
      for (const n of nodes.flat()) {
        if (!n || typeof n !== 'object') continue;
        const t = n['@type'];
        types.push(Array.isArray(t) ? t.join('+') : String(t));
        if (t === 'Product' || (Array.isArray(t) && t.includes('Product'))) productNodes++;
      }
    } catch { types = ['<parse-error>']; }
    if (c > 0 || types.includes('Product') || types.join().includes('Product')) {
      perBlock.push(`block${i} brandKeys=${c} types=[${types.slice(0, 6).join(',')}]`);
    }
  });
  const micro = (h.match(/itemprop=["']brand["']/g) || []).length;
  const metaBrand = (h.match(/<meta[^>]*(?:property|name)=["'](?:product:brand|og:brand)["']/g) || []).length;
  const brandMentions = (h.match(/brand/gi) || []).length;

  console.log(`\n${u}`);
  console.log(`  ld+json blocks=${blocks.length} | ProductNodes=${productNodes} | brandKeys=${totalBrand} | microdataBrand=${micro} | metaBrand=${metaBrand} | raw'bran'mentions=${brandMentions}`);
  perBlock.forEach(p => console.log('   ', p));
  return { totalBrand, productNodes, micro, metaBrand };
}

for (const s of flagged) {
  for (const loc of locales) {
    const u = `https://zprintpro.com/${loc}/product/${s}/`;
    try {
      const r = await fetch(u);
      const h = await r.text();
      auditHtml(`${loc}/${s}`, h);
    } catch (e) { console.log(u, 'ERR', e.message); }
  }
}

console.log('\n=== control: a page NOT in the flagged list ===');
for (const loc of ['zh-hk', 'en']) {
  const u = `https://zprintpro.com/${loc}/product/kraft-paper-bags/`;
  const h = await (await fetch(u)).text();
  auditHtml(`${loc}/kraft-paper-bags`, h);
}
console.log('\nBRAND_AUDIT_DONE');
