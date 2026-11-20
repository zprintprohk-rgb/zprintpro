// L3 online verification for 2026-11-03 pushes (c0552853 daily-content, 7fba4c30 gsc-feedback)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const pages = [
  { id: 'en-desk-calendars', url: 'https://zprintpro.com/en/product/desk-calendars/' },
  { id: 'en-calendars-cat', url: 'https://zprintpro.com/en/category/calendars/' },
  { id: 'zh-calendars-cat', url: 'https://zprintpro.com/zh-hk/category/calendars/' },
  { id: 'ja-calendars-cat', url: 'https://zprintpro.com/ja/category/calendars/' },
];
// expired forward-looking claims that should be GONE
const EXPIRED = [
  'order calendars in September',
  'lock your order by end of October',
  'order by the end of October',
  '9 月落單印月曆',
  '10月底鎖單', '10 月底鎖單', '10月底锁单',
  '10月底までに発注確定',
  '早鳥預訂已開放', 'early-bird pre-orders',
];
const NEWER = ['報價回覆為準', 'quotation', 'quote', '見積', '檔期', 'scheduling', 'schedule confirmed'];

(async () => {
  const out = [];
  for (const p of pages) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 35000);
    try {
      const r = await fetch(p.url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en,zh-HK;q=0.8,ja;q=0.6' }, signal: ctrl.signal, redirect: 'follow' });
      const b = await r.text();
      clearTimeout(to);
      const expiredHits = EXPIRED.filter((s) => b.includes(s));
      const newerHits = NEWER.filter((s) => b.toLowerCase().includes(s.toLowerCase()));
      out.push({ id: p.id, url: p.url, status: r.status, bytes: b.length, expiredHits, newerHits: newerHits.slice(0, 5) });
    } catch (e) {
      out.push({ id: p.id, url: p.url, error: String((e && e.message) || e) });
    }
    await new Promise((s) => setTimeout(s, 1500));
  }
  console.log(JSON.stringify(out, null, 2));
})();
