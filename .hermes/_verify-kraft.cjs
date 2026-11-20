const fs = require('fs');
const ptxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
// method 2: direct line grep for basePrice_ja within kraft block
const k = ptxt.indexOf('slug: \'kraft-paper-packaging-box\'');
const kblock = ptxt.slice(k, k + 2000);
const m2 = kblock.match(/basePrice_ja:\s*(\d+)/);
console.log('kraft bpj (method2 direct):', m2 ? m2[1] : 'NOT FOUND');
const c = ptxt.indexOf('slug: \'cosmetic-boxes\'');
const cblock = ptxt.slice(c, c + 2000);
console.log('cosmetic bpj:', (cblock.match(/basePrice_ja:\s*(\d+)/) || [])[1]);
// also check price_data or any other ¥240 source for kraft
for (const key of ['price_range', 'priceRange', 'basePrice_ja', 'salePrice_ja']) {
  const mm = kblock.match(new RegExp(key + ':\\s*[\'"]([^\'"]+)[\'"]'));
  if (mm) console.log('kraft', key, '=', mm[1]);
}
// premium-greeting-cards en desc
const stxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const p = stxt.indexOf('"premium-greeting-cards"');
if (p > 0) {
  const seg = stxt.slice(p, p + 9000);
  const m = seg.match(/"en": \{\s*"title": "((?:[^"\\]|\\.)*)"[\s\S]{0,1500}?"description": "((?:[^"\\]|\\.)*)"/);
  if (m) console.log('PG en desc:', m[2].slice(0, 350));
}
// custom-calendars nameJa + mini-calendars nameJa
for (const s of ['custom-calendars', 'mini-calendars', 'roll-up-banners', 'vehicle-wraps', 'thick-paper-flyers', 'outdoor-vinyl-banners', 'eco-flyers']) {
  const si = stxt.indexOf(`"${s}"`);
  if (si < 0) continue;
  const seg = stxt.slice(si, si + 1200);
  const nm = seg.match(/"name": \{\s*"zh-hk": "((?:[^"\\]|\\.)*)"\s*,\s*"en": "((?:[^"\\]|\\.)*)"\s*,\s*"ja": "((?:[^"\\]|\\.)*)"/);
  if (nm) console.log(`${s} name: zh=${nm[1]} | en=${nm[2]} | ja=${nm[3]}`);
}
