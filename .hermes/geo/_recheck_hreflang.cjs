// 首页 hreflang 复测（CDN 缓存刷新后）
const https = require('https'), zlib = require('zlib');
function get(url, cb, tries) {
  tries = tries || 0;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Encoding': 'gzip', 'Cache-Control': 'no-cache' }, timeout: 25000 }, res => {
    if ([301, 302, 308].includes(res.statusCode) && res.headers.location && tries < 3) { res.resume(); return get(new URL(res.headers.location, url).href, cb, tries + 1); }
    const s = res.statusCode === 200 && res.headers['content-encoding'] === 'gzip' ? zlib.createGunzip() : res;
    if (s !== res) res.pipe(s);
    const c = [];
    s.on('data', d => c.push(d));
    s.on('end', () => cb(res.statusCode, Buffer.concat(c).toString('utf8')));
  }).on('error', e => cb(0, String(e)));
}
get('https://zprintpro.com/zh-hk/', (code, body) => {
  console.log('HTTP:', code);
  console.log('zh-Hant-HK present:', body.includes('hreflang="zh-Hant-HK"'));
  const m = body.match(/<link[^>]*hreflang[^>]*>/g) || [];
  console.log('hreflang link tags (' + m.length + '):');
  m.slice(0, 10).forEach(x => console.log(' ', x.replace(/\s+/g, ' ').slice(0, 140)));
});
