// W3 live probes: a1/a2 posters + doujinshi-printing x3 locales.
const https = require('node:https');
const BASE = 'https://zprintpro.com';
const PAGES = [
  { slug: 'a2-posters', loc: 'zh-hk', pos: ['A2 海報印刷是零售與活動推廣的標準規格選擇', 'A2 海報最少印幾多張'], neg: ['1 張起印', 'Giclée 級 1200 DPI'] },
  { slug: 'a2-posters', loc: 'en', pos: ['A2 posters are the standard retail-size workhorse', 'Q1: What is the minimum order for A2 posters?'], neg: ['50 MOQ', 'wall art for home decor'] },
  { slug: 'a2-posters', loc: 'ja', pos: ['A2ポスターは小売・イベント宣伝の標準サイズです', 'Q1: 最小注文数は？'], neg: ['Standard A2 size', 'a2 posters'] },
  { slug: 'a1-posters', loc: 'zh-hk', pos: ['A1 大幅海報是展覽與櫥窗的衝擊力首選', 'A1 真的 1 張起印'], neg: ['HK$45'] },
  { slug: 'a1-posters', loc: 'en', pos: ['A1 posters are the impact choice for exhibitions and windows'], neg: ['wall art for home decor'] },
  { slug: 'a1-posters', loc: 'ja', pos: ['A1ポスターは展示会とウィンドウのインパクト担当です'], neg: ['A1 large size'] },
  { slug: 'doujinshi-printing', loc: 'ja', pos: ['コミケに向けた同人誌印刷', 'C107', 'comiket-printing-prep-guide'], neg: [] },
  { slug: 'doujinshi-printing', loc: 'en', pos: ['Doujinshi printing for Comiket cycles', 'C107'], neg: [] },
  { slug: 'doujinshi-printing', loc: 'zh-hk', pos: ['C107 直答'], neg: [] },
];
function fetchPage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'w3-probe/1.0' } }, (res) => {
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
    const url = `${BASE}/${p.loc}/product/${p.slug}/`;
    const r = await fetchPage(url);
    if (r.status !== 200 || r.body.length < 30000) { console.log(`INVALID ${p.loc}/${p.slug} ${r.status} len=${r.body.length}`); inv++; await new Promise(s => setTimeout(s, 1200)); continue; }
    const miss = p.pos.filter(m => !r.body.includes(m));
    const hit = p.neg.filter(m => r.body.includes(m));
    const ok = miss.length === 0 && hit.length === 0;
    if (!ok) fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${p.loc}/${p.slug}` + (miss.length ? ` missing+${JSON.stringify(miss).slice(0, 100)}` : '') + (hit.length ? ` neg+${JSON.stringify(hit).slice(0, 100)}` : ''));
    await new Promise(s => setTimeout(s, 1200));
  }
  console.log(`\nRESULT: ${PAGES.length - fail - inv}/${PAGES.length} pass, ${inv} invalid, ${fail} fail`);
  process.exit(fail + inv > 0 ? 2 : 0);
})();
