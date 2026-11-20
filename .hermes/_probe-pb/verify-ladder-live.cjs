'use strict';
// 單次溫和請求: 驗證 en PDP 的 Price Ladder 是否真有 US$2.08 / batch US$207.94
const https = require('https');
const fs = require('fs');

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

(async () => {
  const u = 'https://zprintpro.com/en/product/perfect-bound-books/';
  const r = await get(u).catch(e => ({ status: 'ERR ' + e.message, html: '' }));
  console.log('HTTP ' + r.status);
  if (r.status !== 200) return;
  const text = r.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  for (const needle of ['207.94', '2.08', 'Price Ladder', '0.66', '0.11', 'no plate fee', '1 copy', 'minimum']) {
    const n = (text.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
    console.log('  ' + needle.padEnd(14) + ' -> ' + n + ' 次');
  }
  const i = text.search(/Price Ladder/i);
  if (i >= 0) console.log('\n  Price Ladder 上下文:\n  ' + text.slice(i, i + 320));
})();
