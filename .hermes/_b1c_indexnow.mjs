// B1c cluster1: IndexNow 提交 5 SKU × 3 locale (复用 scripts/indexnow-submit.mjs 的 key/host)
const KEY = 'b4743800634c73a56fc734e58d77a5d9';
const HOST = 'zprintpro.com';
const SLUGS = ['waterproof-stickers','transparent-stickers','foil-stickers','security-stickers','fluorescent-stickers'];
const urls = [];
for (const loc of ['zh-hk','en','ja']) for (const s of SLUGS) urls.push(`https://${HOST}/${loc}/product/${s}/`);
const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls };
const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
console.log('IndexNow status:', r.status, 'urls:', urls.length);
