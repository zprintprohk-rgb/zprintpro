// E4 pre-push baseline probe — anchors must be ABSENT now (determinism attribution)
import https from 'node:https';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0';
function fetch(url) {
  return new Promise((res, rej) => {
    const u = new URL(url);
    u.searchParams.set('_e4b', String(Date.now()));
    const req = https.get(u, { headers: { 'User-Agent': UA } }, (r) => {
      const c = []; r.on('data', (x) => c.push(x)); r.on('end', () => res({ status: r.statusCode, body: Buffer.concat(c).toString('utf8') }));
    });
    req.on('error', rej); req.setTimeout(20000, () => req.destroy(new Error('timeout')));
  });
}
const targets = [
  ['E4-1 zine->PDP', 'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/', 'href="/en/product/doujinshi-printing/"'],
  ['E4-2 PDP->zine', 'https://zprintpro.com/en/product/doujinshi-printing/', 'href="/en/blog/zine-small-batch-booklet-printing-guide/"'],
  ['E4-3 PDP->comiket', 'https://zprintpro.com/en/product/doujinshi-printing/', 'href="/en/blog/comiket-printing-prep-guide/"'],
];
for (const [label, url, needle] of targets) {
  try {
    const r = await fetch(url);
    const found = r.body.includes(needle);
    console.log(label + ': HTTP ' + r.status + ' | anchor-present=' + found + ' | len=' + r.body.length);
  } catch (e) { console.log(label + ': ERROR ' + e.message); }
}
