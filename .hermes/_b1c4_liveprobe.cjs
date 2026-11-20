// Cluster4 live probes: 6 PDP URLs, positive (new) + negative (purged) markers.
const https = require('node:https');
const BASE = 'https://zprintpro.com';
const PAGES = [
  { slug: 'food-boxes', loc: 'en',
    pos: ['Food-safe box printing starts with matching the stock and the lining', 'mooncake and festival gift boxes', 'Q1: What is the MOQ and price for food boxes?'],
    neg: ['Custom food boxes designed for US small business', 'cosmetic and skincare product packaging', 'pet food'] },
  { slug: 'food-boxes', loc: 'ja',
    pos: ['食品パッケージ箱印刷は、中身に合わせて紙と防油内層を選ぶ', 'Q1: 最小注文数と価格は？'],
    neg: ['カスタム 食品包裝箱', '包裝', '同人・D2C'] },
  { slug: 'food-boxes', loc: 'zh-hk',
    pos: ['食品包裝印刷訂製，100 個起印'], neg: [] },
  { slug: 'folding-boxes', loc: 'zh-hk',
    pos: ['折疊盒印刷訂製，100 個起印、HK$2.5-15/個', '80cm 跌落測試', '折疊盒同精裝盒點揀'],
    neg: ['推廣單張', '指示牌', '10 張起印', '可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。智印港提供'] },
  { slug: 'folding-boxes', loc: 'en',
    pos: ['Folding boxes earn their keep in the warehouse math', 'Q1: Folding boxes or rigid boxes'],
    neg: ['Custom folding boxes designed for US small business', 'pet food'] },
  { slug: 'folding-boxes', loc: 'ja',
    pos: ['折りたたみ箱は倉庫計算で価値を出します', 'Q1: 折りたたみ箱と上製本箱、どっち？'],
    neg: ['折り畳み箱の折り畳み箱は', '高品質・短納期・グローバル配送'] },
];
function fetchPage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'b1c4-probe/1.0' } }, (res) => {
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
    console.log(`${ok ? 'PASS' : 'FAIL'} ${p.loc}/${p.slug}` + (miss.length ? ` missing+${JSON.stringify(miss).slice(0, 110)}` : '') + (hit.length ? ` neg+${JSON.stringify(hit).slice(0, 110)}` : ''));
    await new Promise(s => setTimeout(s, 1200));
  }
  console.log(`\nRESULT: ${PAGES.length - fail - inv}/${PAGES.length} pass, ${inv} invalid, ${fail} fail`);
  process.exit(fail + inv > 0 ? 2 : 0);
})();
