const https = require('https'), zlib = require('zlib');
https.get('https://zprintpro.com/zh-hk/contact/', { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Encoding': 'gzip' } }, res => {
  const s = res.statusCode === 200 && res.headers['content-encoding'] === 'gzip' ? zlib.createGunzip() : res;
  if (s !== res) res.pipe(s);
  const c = [];
  s.on('data', d => c.push(d));
  s.on('end', () => {
    const b = Buffer.concat(c).toString('utf8');
    console.log('len:', b.length);
    console.log('has <head:', b.includes('<head'));
    console.log('alt occurrences:', (b.match(/alternate/g) || []).length);
    console.log('hrefLang occurrences:', (b.match(/hrefLang/g) || []).length);
    console.log('hreflang occurrences:', (b.match(/hreflang/g) || []).length);
    console.log('zh-Hant occurrences:', (b.match(/zh-Hant/g) || []).length);
    const i = b.indexOf('alternate');
    if (i > 0) console.log('ctx:', b.slice(Math.max(0, i - 120), i + 160).replace(/\s+/g, ' '));
    const j = b.indexOf('<link');
    console.log('first link tag:', b.slice(j, j + 150).replace(/\s+/g, ' '));
  });
}).on('error', e => console.log('ERR', String(e)));
