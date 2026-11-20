// foodx probe: food-boxes x3 direct-answer phrases live + hub link check.
const https = require('node:https');
const BASE = 'https://zprintpro.com';
const PAGES = [
  { path: '/zh-hk/product/food-boxes/', pos: ['食品包裝訂製直答', '內側印刷（裡印）', '100 個起（標準現貨尺寸起）'], neg: [] },
  { path: '/en/product/food-boxes/', pos: ['Ordering direct answer: custom food packaging', 'reverse) printing on the food-contact face'], neg: [] },
  { path: '/ja/product/food-boxes/', pos: ['食品パッケージのオーダーメイド直答', '内側印刷（裏刷り）'], neg: [] },
  { path: '/zh-hk/category/packaging/', pos: ['食品包裝訂製 — FDA 食品級紙盒', '/zh-hk/product/food-boxes/'], neg: [] },
];
function fetchPage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'foodx-probe/1.0' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return resolve({ status: res.statusCode, body: '' }); }
      let d = ''; res.on('data', (c) => { d += c; }); res.on('end', () => resolve({ status: 200, body: d }));
    });
    req.on('error', (e) => resolve({ status: -1, body: String(e) }));
    req.setTimeout(20000, () => { req.destroy(); resolve({ status: -2, body: 'timeout' }); });
  });
}
(async () => {
  let fail = 0, inv = 0;
  for (const p of PAGES) {
    const r = await fetchPage(BASE + p.path);
    if (r.status !== 200 || r.body.length < 30000) { console.log(`INVALID ${p.path} ${r.status} len=${r.body.length}`); inv++; await new Promise(s => setTimeout(s, 1200)); continue; }
    const miss = p.pos.filter(m => !r.body.includes(m));
    const hit = p.neg.filter(m => r.body.includes(m));
    const ok = miss.length === 0 && hit.length === 0;
    if (!ok) fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${p.path}` + (miss.length ? ` missing+${JSON.stringify(miss).slice(0, 90)}` : '') + (hit.length ? ` neg+${JSON.stringify(hit)}` : ''));
    await new Promise(s => setTimeout(s, 1200));
  }
  console.log(`\nRESULT: ${PAGES.length - fail - inv}/${PAGES.length} pass, ${inv} invalid, ${fail} fail`);
})();
