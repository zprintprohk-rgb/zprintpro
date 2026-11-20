'use strict';
// 決定性診斷: en PDP 上殘留的 CJK 究竟是什麼、出現在哪 (逐段上下文)
const https = require('https');
const sleep = ms => new Promise(r => setTimeout(r, ms));
function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej); req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}
const CJK = /[\u3400-\u9fff\u3040-\u30ff]/;
(async () => {
  for (const [label, u] of [
    ['en/perfect-bound-books', 'https://zprintpro.com/en/product/perfect-bound-books/'],
    ['en/gang-run-card-boxes', 'https://zprintpro.com/en/product/gang-run-card-boxes/'],
  ]) {
    const r = await get(u).catch(e => null);
    if (!r || r.status !== 200) { console.log(label + ' -> 取不到'); await sleep(3000); continue; }
    const text = r.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log('\n=== ' + label + ' ===');
    // 找出所有含 CJK 的片段 (取 60 字窗)
    const frags = [];
    const re = /[\u3400-\u9fff\u3040-\u30ff]{2,}/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      frags.push(text.slice(Math.max(0, m.index - 45), m.index + m[0].length + 25));
      if (frags.length >= 12) break;
    }
    console.log('  含 CJK 片段數 (取前 12): ' + frags.length);
    frags.forEach((f, i) => console.log('   [' + (i + 1) + '] …' + f + '…'));
    // 價格呈現方式
    console.log('  US$ 出現: ' + (text.match(/US\$/g) || []).length + ' | HK\$ 出現: ' + (text.match(/HK\$/g) || []).length + ' | 207.94: ' + text.includes('207.94'));
    await sleep(3000);
  }
})();
