// desc presence across page types (isolate: category-only or site-wide?)
const urls = [
  ['home', 'https://zprintpro.com/zh-hk/'],
  ['blogindex', 'https://zprintpro.com/zh-hk/blog/'],
  ['blogpost', 'https://zprintpro.com/zh-hk/blog/packaging-box-price-2026/'],
  ['pdp', 'https://zprintpro.com/zh-hk/product/food-boxes/'],
  ['about', 'https://zprintpro.com/zh-hk/about/'],
];
for (const [k, u] of urls) {
  const t = await (await fetch(u)).text();
  const has = /<meta[^>]*name="description"[^>]*>/i.test(t);
  const ogd = /<meta[^>]*property="og:description"[^>]*>/i.test(t);
  console.log(`${k}: name_desc=${has} og_desc=${ogd}`);
}
console.log('TYPES_DONE');
