// .hermes/_probe_blog_md.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
for (const u of ['/zh-hk/blog/restaurant-opening-flyer-printing-guide/', '/zh-hk/blog/pet-food-sticker-printing-guide/', '/en/blog/restaurant-opening-flyer-printing-guide/']) {
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ');
  const raw = [...new Set([...vis.matchAll(/\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g)].map(m => m[0]))];
  console.log(`${r.status} ${u} rawMd=${raw.length}`, raw.slice(0, 3).join(' | '));
}
