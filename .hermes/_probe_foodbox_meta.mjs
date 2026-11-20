// .hermes/_probe_foodbox_meta.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const r = await fetch('https://zprintpro.com/zh-hk/product/food-boxes/', { headers: { 'user-agent': UA } });
const b = await r.text();
console.log('status', r.status);
const t = b.match(/<title>([^<]*)<\/title>/);
console.log('TITLE:', t ? t[1] : 'n/a');
const d = b.match(/<meta name="description" content="([^"]*)"/);
console.log('DESC:', d ? d[1] : 'n/a');
const h1 = b.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
console.log('H1:', h1 ? h1[1].replace(/<[^>]+>/g, '').trim().slice(0, 90) : 'n/a');
