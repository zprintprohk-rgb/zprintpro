// .hermes/_probe_star_live.mjs — PDP / 类目页可见 ** 计数
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const urls = [
  '/zh-hk/product/food-boxes/',
  '/zh-hk/product/folding-boxes/',
  '/zh-hk/product/roll-stickers/',
  '/zh-hk/category/packaging/',
  '/zh-hk/',
];
for (const u of urls) {
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  const stars = (vis.match(/\*\*/g) || []).length;
  const mdLinks = (vis.match(/\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g) || []).length;
  console.log(`${r.status} ${u} visibleStars=${stars} mdLinks=${mdLinks}`);
  if (stars) {
    const i = vis.indexOf('**');
    console.log('   ctx:', JSON.stringify(vis.slice(Math.max(0, i - 60), i + 60).replace(/\s+/g, ' ')));
  }
}
