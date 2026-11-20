'use strict';
// 溫和重探: 3 個未註冊 slug × 3 locale + 2 個殘留 en 頁 + 對照組
// 單線程 + 3s 間隔 + 503 重試 4 次 (站點曾對本機限流)
const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [];
for (const slug of ['wedding-invitation-pricing-guide', 'wedding-invitation-cost-guide', 'wedding-table-card-printing-guide']) {
  for (const loc of ['zh-hk', 'en', 'ja']) urls.push(`${loc}/blog/${slug}/`);
}
urls.push('en/blog/construction-material-sample-book-printing-guide/');
urls.push('en/blog/packaging-box-pricing-2026/');
urls.push('en/blog/photo-book-printing-guide/');   // 對照組 (已知正常)

const sleep = ms => new Promise(r => setTimeout(r, ms));

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

(async () => {
  const L = [];
  for (const p of urls) {
    const u = 'https://zprintpro.com/' + p;
    let r = null;
    for (let a = 1; a <= 4; a++) {
      try {
        r = await get(u);
        if (r.status === 200) break;
      } catch (e) { r = { status: 'ERR ' + e.message, html: '' }; }
      await sleep(6000 * a);
    }
    if (!r || r.status !== 200) {
      L.push('[' + (r ? r.status : 'ERR') + ']  ' + p);
      await sleep(3000);
      continue;
    }
    const title = (r.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
    const h1 = (r.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1].replace(/<[^>]+>/g, '').trim();
    const md = r.html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    L.push('[200]  ' + p);
    L.push('        <title>: ' + title.slice(0, 90));
    L.push('        <h1>   : ' + h1.slice(0, 90));
    L.push('        desc   : ' + (md ? '[' + md[1].length + '] ' + md[1].slice(0, 70) : '★ 缺失'));
    await sleep(3000);
  }
  const out = L.join('\n');
  fs.writeFileSync(path.join(__dirname, 'gentle-probe.txt'), out, 'utf8');
  console.log(out);
})();
