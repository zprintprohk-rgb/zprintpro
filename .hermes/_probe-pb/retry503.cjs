'use strict';
// 補探: 修復後探針中 503 限流的 39 個 URL (單線程 + 重試)
const https = require('https');
const fs = require('fs');
const path = require('path');

const results = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', 'logs', '2026-09-18-meta-description-postfix.json'), 'utf8'));
const pending = results.filter(r => r.status !== 200);
console.log('待補探: ' + pending.length + ' 個');

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
  const out = [];
  let finalOk = 0, finalMissing = 0, finalFail = 0;
  for (const p of pending) {
    const u = 'https://zprintpro.com/' + p.loc + '/blog/' + p.slug + '/';
    let r = null;
    for (let a = 1; a <= 5; a++) {
      try {
        r = await get(u);
        if (r.status === 200) break;
      } catch (e) { r = { status: 'ERR', html: '' }; }
      await sleep(5000 * a);
    }
    if (r && r.status === 200) {
      const md = r.html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
      if (md && md[1].trim()) { finalOk++; out.push('OK    ' + p.loc + '/' + p.slug + '  [' + md[1].length + ']'); }
      else { finalMissing++; out.push('★MISS ' + p.loc + '/' + p.slug); }
    } else {
      finalFail++;
      out.push('FAIL  ' + p.loc + '/' + p.slug + ' -> ' + (r ? r.status : 'ERR'));
    }
    await sleep(2500);
  }
  const header = '=== 503 補探結果 (' + pending.length + ') ===\n有 description: ' + finalOk + ' | 仍缺: ' + finalMissing + ' | 仍取不到: ' + finalFail + '\n';
  const text = header + out.join('\n');
  fs.writeFileSync(path.join(__dirname, 'retry503.txt'), text, 'utf8');
  console.log(text);
})();
