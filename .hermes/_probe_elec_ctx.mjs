// .hermes/_probe_elec_ctx.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
for (const u of ['/zh-hk/product/electronics-packaging-box/', '/zh-hk/product/kraft-paper-packaging-box/']) {
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  const idxs = [...vis.matchAll(/100 個起印/g)].map(m => m.index);
  console.log(`\n${u} hits=${idxs.length}`);
  idxs.slice(0, 4).forEach(i => console.log('  ...' + vis.slice(Math.max(0, i - 70), i + 30).replace(/\s+/g, ' ')));
  console.log('  has200/300:', /200 個起印/.test(vis), /300 個起印/.test(vis));
}
