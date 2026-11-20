// Verify regenerated sitemap-image.xml: counts, duplicates, key pages, v28_5 coverage, per-locale sanity
const fs = require('fs');
const xml = fs.readFileSync('public/sitemap-image.xml', 'utf8');
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const imgs = [...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(m => m[1]);
const prodPages = pages.filter(p => p.includes('/product/'));
const catPages = pages.filter(p => p.includes('/category/'));
const dupImgs = imgs.length - new Set(imgs).size;
const v28 = imgs.filter(u => u.includes('/images/products/v28_5/'));
const bySlug = {};
for (const u of v28) { const s = u.split('/v28_5/')[1]?.split('/')[0]; if (s) bySlug[s] = (bySlug[s] || 0) + 1; }
console.log(`pages=${pages.length} (product=${prodPages.length} category=${catPages.length}) images=${imgs.length} distinct=${new Set(imgs).size} dup=${dupImgs}`);
console.log(`v28_5_images=${v28.length} slugs=${Object.keys(bySlug).length} distribution=${JSON.stringify(Object.values(bySlug).reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {}))}`);
for (const s of ['doujinshi-printing', 'premium-greeting-cards', 'foil-wedding-invitations', 'wedding-thank-you-cards', 'spiral-notebooks', 'wall-calendars']) {
  const p = prodPages.filter(x => x.includes('/product/' + s + '/'));
  const i = imgs.filter(x => x.includes('/' + s));
  console.log(`${s}: pages=${p.length} imgs=${i.filter(x => x.includes('/' + s)).length} v285=${(i.filter(x => x.includes('/v28_5/')).length)}`);
}
const emptyLocalePages = [];
for (const p of prodPages) {
  const seg = p.match(/\/(zh-hk|en|ja)\/product\//)?.[1];
  if (!seg) emptyLocalePages.push(p);
}
console.log(`prodPages_without_locale_prefix=${emptyLocalePages.length}`);
