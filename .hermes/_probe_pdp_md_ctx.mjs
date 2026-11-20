// .hermes/_probe_pdp_md_ctx.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
for (const u of ['/zh-hk/product/food-boxes/', '/zh-hk/product/roll-stickers/']) {
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  const ms = [...vis.matchAll(/\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g)];
  console.log(`\n${u} count=${ms.length}`);
  ms.slice(0, 5).forEach(m => console.log('  ', JSON.stringify(vis.slice(Math.max(0, m.index - 80), m.index + 40).replace(/\s+/g, ' '))));
}
