// B1c cluster3: IndexNow 9 URL (flyers hub + posters hub + folded-leaflets ×3 locale)
const KEY = 'b4743800634c73a56fc734e58d77a5d9';
const HOST = 'zprintpro.com';
const URLS = [];
for (const loc of ['zh-hk', 'en', 'ja']) {
  URLS.push(`https://${HOST}/${loc}/category/flyers/`);
  URLS.push(`https://${HOST}/${loc}/category/posters/`);
  URLS.push(`https://${HOST}/${loc}/product/folded-leaflets/`);
}
const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: URLS };
const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
console.log('IndexNow status:', r.status, 'urls:', URLS.length);
