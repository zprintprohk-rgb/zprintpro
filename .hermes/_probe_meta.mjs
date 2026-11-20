// meta description CTA verification: food-boxes PDP + packaging category (zh-hk)
const urls = {
  PDP: 'https://zprintpro.com/zh-hk/product/food-boxes/',
  CAT: 'https://zprintpro.com/zh-hk/category/packaging/',
  PDP_EN: 'https://zprintpro.com/en/product/food-boxes/',
};
for (const [k, u] of Object.entries(urls)) {
  const t = await (await fetch(u)).text();
  const m = t.match(/<meta\s+name="description"\s+content="([^"]{0,200})"/);
  console.log(k + '_DESC=' + ((m && m[1]) || 'NONE').slice(0, 190));
}
console.log('META_PROBE_DONE');
