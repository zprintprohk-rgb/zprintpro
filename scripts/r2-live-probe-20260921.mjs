// r2-live-probe-20260921.mjs — R2 带钱词轮 push 後線上驗收探針 (2 槽 zh-hk title)
// 三閘門: includes 檢查 / 狀態碼+長度+marker 三重有效 / 重試 4 次間隔 20s
const BASE = 'https://zprintpro.com';
const RETRY = 4, WAIT_MS = 20000;
const CHECKS = [
  {
    name: 'a5-flyers zh-hk title (R2-A)',
    url: `${BASE}/zh-hk/product/a5-flyers/`,
    marker: 'A5 傳單印刷',
    mustHave: ['A5 傳單印刷 | 單張印刷 | 10張起印 HK$0.25起 | 智印港'],
    mustNot: ['A5 傳單印刷 | 圓角 覆膜'],
  },
  {
    name: 'double-sided-flyers zh-hk title (R2-A)',
    url: `${BASE}/zh-hk/product/double-sided-flyers/`,
    marker: '雙面傳單印刷',
    mustHave: ['雙面傳單印刷 | 單張印刷 | 10張起印 HK$0.40起 | 智印港'],
    mustNot: ['雙面傳單印刷 | 圓角 覆膜'],
  },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fail = 0;
for (const c of CHECKS) {
  let ok = false, lastInfo = '';
  for (let i = 0; i < RETRY && !ok; i++) {
    try {
      const res = await fetch(c.url, { headers: { 'accept-encoding': 'identity' } });
      const body = await res.text();
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
