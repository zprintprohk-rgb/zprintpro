'use strict';
// 針對 11 個殘留 + 對照組, 逐一重探 (排除邊緣節點陳舊快取)
const https = require('https');

const urls = [
  'https://zprintpro.com/zh-hk/blog/wedding-invitation-pricing-guide/',
  'https://zprintpro.com/en/blog/wedding-invitation-pricing-guide/',
  'https://zprintpro.com/ja/blog/wedding-invitation-pricing-guide/',
  'https://zprintpro.com/zh-hk/blog/wedding-invitation-cost-guide/',
  'https://zprintpro.com/en/blog/wedding-invitation-cost-guide/',
  'https://zprintpro.com/ja/blog/wedding-invitation-cost-guide/',
  'https://zprintpro.com/zh-hk/blog/wedding-table-card-printing-guide/',
  'https://zprintpro.com/en/blog/wedding-table-card-printing-guide/',
  'https://zprintpro.com/ja/blog/wedding-table-card-printing-guide/',
  'https://zprintpro.com/en/blog/construction-material-sample-book-printing-guide/',
  'https://zprintpro.com/en/blog/packaging-box-pricing-2026/',
  // 對照: 已修好的
  'https://zprintpro.com/en/blog/photo-book-printing-guide/',
];

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; zprintpro-probe/1.0)', 'cache-control': 'no-cache', pragma: 'no-cache' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, html: d, age: r.headers['age'], etag: r.headers['etag'] }));
    });
    req.on('error', rej);
  });
}

(async () => {
  for (const u of urls) {
    try {
      const { status, html, age } = await get(u);
      const md = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)
              || html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
      const ti = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim().slice(0, 40);
      console.log((md && md[1].trim() ? 'OK   ' : 'MISS ') + status + ' age=' + (age || '-') + '  ' + u.replace('https://zprintpro.com', '') + (md && md[1].trim() ? '  [' + md[1].length + ']' : ''));
    } catch (e) {
      console.log('ERR  ' + u.replace('https://zprintpro.com', '') + ' ' + e.message);
    }
  }
})();
