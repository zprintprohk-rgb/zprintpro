/* 2026-11-25 en/ja 首页 Organization schema 探针 — 补齐三站点口径 */
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function probe(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA, 'accept': '*/*' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
  const body = await res.text();
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = []; let mm;
  while ((mm = re.exec(body))) blocks.push(mm[1].trim());
  const found = [];
  function walk(x) {
    if (Array.isArray(x)) { x.forEach(walk); return; }
    if (x && typeof x === 'object') {
      const t = x['@type'];
      const types = Array.isArray(t) ? t : (t ? [String(t)] : []);
      if (types.includes('Organization') || types.includes('LocalBusiness')) {
        found.push({ '@type': types, name: x.name, legalName: x.legalName, alternateName: x.alternateName, sameAsCount: Array.isArray(x.sameAs) ? x.sameAs.length : (x.sameAs ? 1 : 0) });
      }
      for (const k of Object.keys(x)) walk(x[k]);
    }
  }
  let ok = 0, fail = 0;
  for (const b of blocks) { try { const j = JSON.parse(b); ok++; walk(j); } catch (e) { fail++; } }
  return { url, status: res.status, blockCount: blocks.length, parseOk: ok, parseFail: fail, orgLikeFound: found };
}

(async () => {
  const a = await probe('https://zprintpro.com/en/'); a.probeTs = new Date().toISOString();
  await sleep(2200);
  const b = await probe('https://zprintpro.com/ja/'); b.probeTs = new Date().toISOString();
  const out = { results: [a, b] };
  fs.writeFileSync(path.join(ROOT, '.hermes', 'logs', 'tmp-orgprobe-enja-result-20261125.json'), JSON.stringify(out, null, 2), 'utf8');
  console.log(JSON.stringify(out, null, 2));
})().catch(e => { console.error('FATAL', e); process.exit(1); });
