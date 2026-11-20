// Locate existing doujinshi-printing link on zine page (rendered) — check if content-level or related-products block
import https from 'node:https';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0';
function fetch(url) {
  return new Promise((res, rej) => {
    const u = new URL(url);
    u.searchParams.set('_e4d', String(Date.now()));
    const req = https.get(u, { headers: { 'User-Agent': UA } }, (r) => {
      const c = []; r.on('data', (x) => c.push(x)); r.on('end', () => res({ status: r.statusCode, body: Buffer.concat(c).toString('utf8') }));
    });
    req.on('error', rej); req.setTimeout(20000, () => req.destroy(new Error('timeout')));
  });
}
const r = await fetch('https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/');
const body = r.body;
let idx = 0, n = 0;
while ((idx = body.indexOf('href="/en/product/doujinshi-printing/"', idx)) >= 0) {
  n++;
  console.log('--- occurrence', n, 'at', idx, '---');
  console.log(body.slice(Math.max(0, idx - 160), idx + 160));
  idx += 10;
}
console.log('total occurrences:', n);
