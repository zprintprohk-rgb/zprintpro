const https = require('https'), zlib = require('zlib');
function probe(name, url) {
  return new Promise(r => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Encoding': 'gzip' } }, res => {
      const s = res.statusCode === 200 && res.headers['content-encoding'] === 'gzip' ? zlib.createGunzip() : res;
      if (s !== res) res.pipe(s);
      const c = [];
      s.on('data', d => c.push(d));
      s.on('end', () => {
        const b = Buffer.concat(c).toString('utf8');
        const tags = (b.match(/<link rel="alternate" hrefLang="[^"]*" href="[^"]*"/g) || []);
        console.log(name, 'HTTP', res.statusCode, '| alternate tags:', tags.length, '| zh-Hant:', b.includes('zh-Hant-HK'), '| x-default→zh-hk:', /x-default" href="[^"]*zh-hk/.test(b));
        tags.forEach(x => console.log('   ', x.slice(0, 130)));
        r();
      });
    }).on('error', e => { console.log(name, 'ERR', String(e)); r(); });
  });
}
(async () => {
  await probe('zh-hk home', 'https://zprintpro.com/zh-hk/');
  await new Promise(r => setTimeout(r, 1200));
  await probe('en home    ', 'https://zprintpro.com/en/');
  await new Promise(r => setTimeout(r, 1200));
  await probe('en sb-stick', 'https://zprintpro.com/en/product/small-batch-stickers/');
})();
