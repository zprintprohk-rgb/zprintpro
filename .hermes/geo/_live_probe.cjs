// 线上探针：验证 W2 五项交付真实生效（hreflang / sameAs / @id / 梯度表 / 对比表）
const https = require('https');
const zlib = require('zlib');

function get(url, cb, tries) {
  tries = tries || 0;
  const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (probe)', 'Accept-Encoding': 'gzip' }, timeout: 25000 }, res => {
    if ([301, 302, 308].includes(res.statusCode) && res.headers.location && tries < 3) {
      res.resume();
      return get(new URL(res.headers.location, url).href, cb, tries + 1);
    }
    const chunks = [];
    const stream = res.statusCode === 200 && (res.headers['content-encoding'] === 'gzip') ? zlib.createGunzip() : res;
    if (stream !== res) res.pipe(stream);
    stream.on('data', c => chunks.push(c));
    stream.on('end', () => cb(res.statusCode, Buffer.concat(chunks).toString('utf8')));
  });
  req.on('error', e => cb(0, String(e)));
  req.on('timeout', () => { req.destroy(); cb(0, 'timeout'); });
}

const probes = [
  ['home zh hreflang', 'https://zprintpro.com/zh-hk/', s => ({
    hant: s.includes('hreflang="zh-Hant-HK"'),
    oldZhHK: s.includes('hreflang="zh-HK"'),
    xdef: /hreflang="x-default"[^>]*href="[^"]*\/zh-hk"/.test(s) || /href="[^"]*\/zh-hk"[^>]*hreflang="x-default"/.test(s),
  })],
  ['home org sameAs', 'https://zprintpro.com/en/', s => ({
    github: s.includes('github.com/zprintprohk-rgb'),
  })],
  ['sb-stickers @id+table', 'https://zprintpro.com/en/product/small-batch-stickers/', s => ({
    atid: s.includes('#product'),
    table: s.includes('Small-Batch Sticker Unit Price Gradient'),
    moq: /eligibleQuantity/i.test(s),
  })],
  ['sb-stickers zh table', 'https://zprintpro.com/zh-hk/product/small-batch-stickers/', s => ({
    table: s.includes('小批量單價梯度'),
  })],
  ['sb-stickers ja table', 'https://zprintpro.com/ja/product/small-batch-stickers/', s => ({
    table: s.includes('小ロット単価表'),
  })],
  ['doujinshi en binding', 'https://zprintpro.com/en/product/doujinshi-printing/', s => ({
    binding: s.includes('Perfect Binding vs Saddle Stitch'),
    bleed: s.includes('Bleed and Safe Zone'),
    schemaOK: /"@type"\s*:\s*"Product"/.test(s),
  })],
  ['food guide table', 'https://zprintpro.com/zh-hk/blog/food-packaging-printing-guide/', s => ({
    table: s.includes('食品級包裝紙材對比'),
    details: s.includes('牛皮紙包裝可以直接接觸食物嗎'),
  })],
];

let i = 0;
function run() {
  if (i >= probes.length) return;
  const [name, url, check] = probes[i++];
  get(url, (code, body) => {
    let r;
    try { r = code === 200 ? check(body) : { HTTP: code }; } catch (e) { r = { ERR: String(e).slice(0, 80) }; }
    console.log(name, '->', JSON.stringify(r));
    setTimeout(run, 1500); // 串行 + 间隔（§0.23.2 防限流）
  });
}
run();
