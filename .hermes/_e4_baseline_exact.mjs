// E4 precise baseline — exact full-anchor match (not substring)
import https from 'node:https';
import fs from 'node:fs';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0';
function fetch(url) {
  return new Promise((res, rej) => {
    const u = new URL(url);
    u.searchParams.set('_e4c', String(Date.now()));
    const req = https.get(u, { headers: { 'User-Agent': UA } }, (r) => {
      const c = []; r.on('data', (x) => c.push(x)); r.on('end', () => res({ status: r.statusCode, body: Buffer.concat(c).toString('utf8') }));
    });
    req.on('error', rej); req.setTimeout(20000, () => req.destroy(new Error('timeout')));
  });
}
const targets = [
  ['E4-1 zine->PDP (exact)', 'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/', '<a href="/en/product/doujinshi-printing/">doujin circles</a>'],
  ['E4-2 PDP->zine (exact)', 'https://zprintpro.com/en/product/doujinshi-printing/', '<a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a>'],
  ['E4-3 PDP->comiket (exact)', 'https://zprintpro.com/en/product/doujinshi-printing/', '<a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>'],
  ['E4-1 any link to PDP on zine page', 'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/', 'href="/en/product/doujinshi-printing/"'],
  ['E4-3 any link to comiket on PDP', 'https://zprintpro.com/en/product/doujinshi-printing/', 'href="/en/blog/comiket-printing-prep-guide/"'],
];
for (const [label, url, needle] of targets) {
  try {
    const r = await fetch(url);
    const found = r.body.includes(needle);
    console.log(label + ': HTTP ' + r.status + ' | found=' + found + ' | len=' + r.body.length);
  } catch (e) { console.log(label + ': ERROR ' + e.message); }
}
