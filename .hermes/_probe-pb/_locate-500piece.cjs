'use strict';
/** 精确定位 "no 500-piece minimum": 在 meta description / 正文 / og 中分别查 */
const https = require('https');
const fs = require('fs');
const get = (u) => new Promise((res, rej) => {
  const q = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => {
    let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d }));
  });
  q.on('error', rej); q.setTimeout(90000, () => q.destroy(new Error('timeout')));
});

(async () => {
  const r = await get('https://zprintpro.com/en/blog/etsy-seller-printing-guide/');
  const h = r.h;
  fs.writeFileSync('.hermes/_probe-pb/_etsy-live-raw.html', h, 'utf8');
  console.log('已存原始 HTML:', h.length, 'B\n');

  const md = h.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  console.log('=== meta description (线上) ===');
  console.log('  ' + (md ? md[1] : '(无)'));
  console.log('  含 "no 500-piece minimum":', md ? md[1].includes('no 500-piece minimum') : 'n/a');
  console.log('  长度:', md ? md[1].length : 'n/a');

  const og = h.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  console.log('\n=== og:description ===');
  console.log('  ' + (og ? og[1].slice(0, 200) : '(无)'));

  console.log('\n=== 正文内 "500" 相关 ===');
  const body = h.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  let i = -1, n = 0;
  while ((i = body.indexOf('500', i + 1)) !== -1 && n < 8) {
    n++;
    const seg = body.slice(Math.max(0, i - 70), i + 80).replace(/<[^>]+>/g, '·');
    if (/piece|minimum|MOQ|small/i.test(seg)) console.log(`  [${n}] …${seg}…`);
  }
  console.log(`  （共扫到 ${n} 处 "500"，上方仅列含 piece/minimum/MOQ 的）`);

  console.log('\n=== 本地源档对照 (en.json) ===');
  const o = JSON.parse(fs.readFileSync('src/data/blog-data/en.json', 'utf8'));
  const e = o['etsy-seller-printing-guide'];
  console.log('  本地 description:', e.description);
  console.log('  含 "no 500-piece minimum":', e.description.includes('no 500-piece minimum'));
  console.log('  本地正文含 "no 500-piece minimum":', e.content.includes('no 500-piece minimum'));
  const j = e.content.indexOf('500-piece');
  if (j >= 0) console.log('  本地正文片段:', JSON.stringify(e.content.slice(Math.max(0, j - 120), j + 140)));
  process.exit(0);
})();
