// 本地 build 产物验证：首页 hreflang 是否在本地 HTML 输出中（区分「代码生效但 CDN 旧缓存」vs「代码缺失」）
// 方法：从 .next server 输出不可行（dynamic），改从 build 后的静态 HTML（若有）或直接渲染验证不可行 →
// 退而验证代码路径：generateHomeMetadata 带 languages（seo.ts L347-353 已确认）→
// Next.js metadata 合并：page 级 alternates.languages 应输出。唯一疑点 = 首页用了 JSON-LD 前的 hero？
// 最终判定手段：curl 本地 npm start 的产物。此处先做 CDN 二次复测（等待时间更长）+ en 首页对照。
const https = require('https'), zlib = require('zlib');
function get(url, cb) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (probe2)', 'Accept-Encoding': 'gzip', 'Cache-Control': 'no-cache' }, timeout: 25000 }, res => {
    const s = res.statusCode === 200 && res.headers['content-encoding'] === 'gzip' ? zlib.createGunzip() : res;
    if (s !== res) res.pipe(s);
    const c = [];
    s.on('data', d => c.push(d));
    s.on('end', () => cb(res.statusCode, Buffer.concat(c).toString('utf8'), res.headers));
  }).on('error', e => cb(0, String(e), {}));
}
function probe(name, url) {
  return new Promise(r => get(url, (code, body, h) => {
    const tags = (body.match(/<link[^>]*hreflang[^>]*>/g) || []);
    console.log(name, 'HTTP', code, '| cache-control:', h['cache-control'] || h['cf-cache-status'] || 'n/a', '| hreflang tags:', tags.length);
    tags.slice(0, 8).forEach(x => console.log('   ', x.replace(/\s+/g, ' ').slice(0, 130)));
    r();
  }));
}
(async () => {
  await probe('zh-hk home ', 'https://zprintpro.com/zh-hk/?probe=' + Date.now());
  await new Promise(r => setTimeout(r, 1500));
  await probe('en home    ', 'https://zprintpro.com/en/?probe=' + Date.now());
  await new Promise(r => setTimeout(r, 1500));
  await probe('contact    ', 'https://zprintpro.com/zh-hk/contact/?probe=' + Date.now());
})();
