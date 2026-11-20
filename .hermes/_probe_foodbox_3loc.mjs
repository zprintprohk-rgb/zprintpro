// .hermes/_probe_foodbox_3loc.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
for (const loc of ['en', 'ja']) {
  await sleep(5000);
  const r = await fetch(`https://zprintpro.com/${loc}/product/food-boxes/`, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const t = b.match(/<title>([^<]*)<\/title>/);
  const d = b.match(/<meta name="description" content="([^"]*)"/);
  console.log(`\n[${loc}] ${r.status}`);
  console.log('TITLE:', t ? t[1] : 'n/a');
  console.log('DESC:', d ? d[1].slice(0, 260) : 'n/a');
}
