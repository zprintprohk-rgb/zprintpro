// g1-geo-live-probe-20260921.mjs — GEO G1 批 push 後線上驗收探針 (ProcureAction + eligibleQuantity + sourcingIntentKeywords)
// 三閘門: includes 檢查 / 狀態碼+長度+marker 三重有效 / 重試 4 次間隔 20s
// 真值: products.ts minQuantity (a5-flyers=10 flyers / waterproof-stickers=10 stickers / mini-calendars=1 calendars)
const BASE = 'https://zprintpro.com';
const RETRY = 4, WAIT_MS = 20000;
const CHECKS = [
  {
    name: 'a5-flyers zh-hk (G1)',
    url: `${BASE}/zh-hk/product/a5-flyers/`,
    marker: 'A5 傳單印刷',
    mustHave: ['"@type":"ProcureAction"', '"minValue":10', '"unitText":"張"', 'MOQ 10張起', '跨境DHL全球派送', 'goodrelations/v1#Sell', '/zh-hk/quote/'],
    mustNot: ['FOB', 'fob'],
  },
  {
    name: 'waterproof-stickers en (G1)',
    url: `${BASE}/en/product/waterproof-stickers/`,
    marker: 'Waterproof',
    mustHave: ['"@type":"ProcureAction"', '"minValue":10', 'MOQ 10 pcs', 'ships worldwide via DHL', 'goodrelations/v1#Sell', '/en/quote/'],
    mustNot: ['FOB', 'fob'],
  },
  {
    name: 'mini-calendars ja (G1)',
    url: `${BASE}/ja/product/mini-calendars/`,
    marker: 'カレンダー',
    mustHave: ['"@type":"ProcureAction"', '"minValue":1', '"unitText":"冊"', '最小ロット1冊', 'DHL国際配送', 'goodrelations/v1#Sell', '/ja/quote/'],
    mustNot: ['FOB', 'fob'],
  },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fail = 0;
for (const c of CHECKS) {
  let ok = false, lastInfo = '';
  for (let i = 0; i < RETRY && !ok; i++) {
    try {
      const res = await fetch(c.url, { headers: { 'accept-encoding': 'identity' } });
      const body = (await res.text()).replace(/&quot;/g, '"');
      if (res.status !== 200 || body.length < 5000 || !body.includes(c.marker)) {
        lastInfo = `INVALID status=${res.status} len=${body.length} marker=${body.includes(c.marker)}`;
      } else {
        const miss = c.mustHave.filter((s) => !body.includes(s));
        const bad = c.mustNot.filter((s) => body.includes(s));
        ok = miss.length === 0 && bad.length === 0;
        lastInfo = ok ? 'PASS' : `miss=${JSON.stringify(miss)} bad=${JSON.stringify(bad)}`;
      }
    } catch (e) { lastInfo = 'ERR ' + e.message; }
    if (!ok && i < RETRY - 1) await sleep(WAIT_MS);
  }
  console.log(`${ok ? '✅' : '❌'} ${c.name} :: ${lastInfo}`);
  if (!ok) fail++;
}
process.exit(fail ? 1 : 0);
