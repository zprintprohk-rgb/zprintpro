// Post-deploy verification: feed mpn removal + purchase path + PDP purchase block (3 locales)
const locales = ['zh-hk', 'en', 'ja'];
const slugs = ['kraft-paper-bags', 'a2-posters', 'cosmetic-boxes'];

console.log('=== FEED: identifier fields ===');
for (const loc of locales) {
  try {
    const xml = await (await fetch(`https://zprintpro.com/api/merchant-feed/${loc}/`)).text();
    const items = (xml.match(/<item>/g) || []).length;
    const mpn = (xml.match(/<g:mpn>/g) || []).length;
    const ie = (xml.match(/<g:identifier_exists>false<\/g:identifier_exists>/g) || []).length;
    const brand = (xml.match(/<g:brand>([^<]+)<\/g:brand>/) || [])[1];
    const ids = [...xml.matchAll(/<g:id>([^<]+)<\/g:id>/g)].map(m => m[1]);
    const uniq = new Set(ids).size;
    console.log(`${loc}: items=${items} mpnTags=${mpn} identifier_exists_false=${ie} brand=${brand} ids=${ids.length}/uniq=${uniq}`);
  } catch (e) { console.log(`${loc}: ERR ${e.message}`); }
}

console.log('\n=== PDP: purchase block + reviews (3 locales x 3 slugs) ===');
for (const loc of locales) {
  for (const s of slugs) {
    const u = `https://zprintpro.com/${loc}/product/${s}/`;
    try {
      const r = await fetch(u);
      const h = await r.text();
      const buy = h.includes('立即購買') || h.includes('Buy Now') || h.includes('今すぐ購入') || h.includes('data-purchase-block');
      const cart = h.includes('加入購物車') || h.includes('Add to Cart') || h.includes('カートに追加');
      const rev = h.includes('data-sku-reviews') || h.includes('客戶評價') || h.includes('Customer Reviews') || h.includes('カスタマーレビュー') || h.includes('レビュー');
      const brands = (h.match(/"brand"\s*:/g) || []).length;
      console.log(`${r.status} ${loc}/${s}: buy=${buy} cart=${cart} reviews=${rev} brandKeys=${brands}`);
    } catch (e) { console.log(`ERR ${loc}/${s}: ${e.message}`); }
  }
}

console.log('\n=== CHECKOUT PATH ===');
for (const loc of locales) {
  for (const p of ['cart', 'checkout']) {
    const u = `https://zprintpro.com/${loc}/${p}/`;
    try {
      const r = await fetch(u, { redirect: 'follow' });
      const h = await r.text();
      console.log(`${r.status} ${u.replace('https://zprintpro.com', '')} len=${h.length} pay=${/電匯|银行电汇|bank/i.test(h)}`);
    } catch (e) { console.log(`ERR ${u}: ${e.message}`); }
  }
}
console.log('POSTDEPLOY_PROBE_DONE');
