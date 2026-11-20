// W1 CTR batch: IndexNow 3 categories x3 locale
const KEY = 'b4743800634c73a56fc734e58d77a5d9';
const HOST = 'zprintpro.com';
const URLS = [];
for (const loc of ['zh-hk', 'en', 'ja']) {
  for (const cat of ['paper-bags', 'menus', 'packaging']) {
    URLS.push(`https://${HOST}/${loc}/category/${cat}/`);
  }
}
const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: URLS }) });
console.log('IndexNow:', r.status, 'urls:', URLS.length);
