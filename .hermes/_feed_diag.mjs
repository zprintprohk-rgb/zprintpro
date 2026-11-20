// Feed cross-locale ID collision + affected-SKU feed facts
const feeds = ['zh-hk', 'en', 'ja'];
const items = {}; // id -> [{locale, brand, price, link}]
for (const loc of feeds) {
  const xml = await (await fetch(`https://zprintpro.com/api/merchant-feed/${loc}/`)).text();
  const entries = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1]);
  console.log(`feed ${loc}: ${entries.length} items`);
  for (const e of entries) {
    const id = (e.match(/<g:id>([^<]+)<\/g:id>/) || [])[1];
    const brand = (e.match(/<g:brand>([^<]+)<\/g:brand>/) || [])[1];
    const price = (e.match(/<g:price>([^<]+)<\/g:price>/) || [])[1];
    const link = (e.match(/<g:link>([^<]+)<\/g:link>/) || [])[1];
    if (!id) continue;
    (items[id] = items[id] || []).push({ loc, brand, price, link });
  }
}
const ids = Object.keys(items);
console.log('unique ids:', ids.length);
const dupIds = ids.filter(id => items[id].length > 1);
console.log('ids appearing in MULTIPLE locale feeds:', dupIds.length);
dupIds.slice(0, 12).forEach(id => {
  console.log('  DUP', id, '->', items[id].map(x => `${x.loc}:${x.brand}:${x.price}`).join(' | '));
});
// affected 7 SKUs feed facts
const affected = ['custom-red-packets', 'custom-calendars', 'business-envelopes', 'magnetic-closure-gift-box', 'die-cut-stickers', 'doujinshi-printing', 'folded-leaflets'];
console.log('--- affected SKU feed entries ---');
for (const a of affected) {
  const hits = ids.filter(id => id.toLowerCase().includes(a) || (items[id][0].link || '').includes(a));
  for (const id of hits) {
    console.log(`  ${a}: ${items[id].map(x => `${x.loc}:${x.brand}:${x.price}`).join(' | ')}`);
  }
}
console.log('FEED_DIAG_DONE');
