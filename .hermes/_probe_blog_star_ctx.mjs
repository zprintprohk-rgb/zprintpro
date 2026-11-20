// .hermes/_probe_blog_star_ctx.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
for (const u of ['/zh-hk/blog/restaurant-opening-flyer-printing-guide/', '/zh-hk/blog/pet-food-sticker-printing-guide/']) {
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  const ms = [...vis.matchAll(/\*\*/g)];
  console.log(`\n${u} stars=${ms.length}`);
  ms.slice(0, 3).forEach(m => console.log('  ', JSON.stringify(vis.slice(Math.max(0, m.index - 60), m.index + 50).replace(/\s+/g, ' '))));
}
