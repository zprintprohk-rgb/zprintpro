// B1c cluster2: IndexNow 提交 red-packets 9 URL (hub 类目 + foil + custom, 3 locale)
const KEY = 'b4743800634c73a56fc734e58d77a5d9';
const HOST = 'zprintpro.com';
const URLS = [];
for (const loc of ['zh-hk', 'en', 'ja']) {
  URLS.push(`https://${HOST}/${loc}/category/red-packets/`);
  for (const s of ['foil-red-packets', 'custom-red-packets']) URLS.push(`https://${HOST}/${loc}/product/${s}/`);
}
const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: URLS };
const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
console.log('IndexNow status:', r.status, 'urls:', URLS.length);
