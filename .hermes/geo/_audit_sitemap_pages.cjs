// Parse sitemap XML into per-page image lists; audit en/ja IBL coverage + duplicates + key products
const fs = require('fs');
const xml = fs.readFileSync('public/sitemap-image.xml', 'utf8');
const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[1]);
const rows = [];
for (const b of urlBlocks) {
  const loc = b.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const imgs = [...b.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x => x[1]);
  if (loc) rows.push({ loc, imgs });
}
const prod = rows.filter(r => r.loc.includes('/product/'));
const stats = prod.map(r => {
  const m = r.loc.match(/\/(zh-hk|en|ja)\/product\/([^/]+)\//);
  return { locale: m?.[1], slug: m?.[2], n: r.imgs.length, first: r.imgs[0] };
});
const bySlug = {};
for (const s of stats) { bySlug[s.slug] ||= { 'zh-hk': 0, en: 0, ja: 0 }; bySlug[s.slug][s.locale] = s.n; }
const zeroLocale = Object.entries(bySlug).filter(([, v]) => v['zh-hk'] === 0 || v.en === 0 || v.ja === 0);
console.log('products=' + Object.keys(bySlug).length + ' productPages=' + prod.length);
console.log('slugs_missing_a_locale=' + zeroLocale.length + ' :: ' + zeroLocale.map(([s, v]) => `${s}(zh${v['zh-hk']}/en${v.en}/ja${v.ja})`).join(' '));
const dist = {};
for (const s of Object.keys(bySlug)) { const k = `${bySlug[s]['zh-hk']}/${bySlug[s].en}/${bySlug[s].ja}`; dist[k] = (dist[k] || 0) + 1; }
console.log('locale_count_distribution=' + JSON.stringify(dist));
for (const s of ['doujinshi-printing', 'premium-greeting-cards', 'foil-greeting-cards', 'foil-wedding-invitations', 'wedding-thank-you-cards', 'spiral-notebooks', 'custom-calendars', 'waterproof-stickers']) {
  const row = prod.filter(r => r.loc.includes('/product/' + s + '/'));
  console.log(s + ' => ' + row.map(r => r.loc.split('/product/')[0].split('/').pop() + ':' + r.imgs.length).join(' | '));
  for (const r of row) console.log('    ' + r.loc + ' :: ' + r.imgs.slice(0, 3).join(' , '));
}
const allImgs = prod.flatMap(r => r.imgs);
const dup = Object.entries(allImgs.reduce((a, u) => (a[u] = (a[u] || 0) + 1, a), {})).filter(([, c]) => c > 1);
console.log('dup_urls=' + dup.length + ' ' + JSON.stringify(dup.slice(0, 4)));
