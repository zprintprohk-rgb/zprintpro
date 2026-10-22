// .hermes/_probe_faq7.mjs — 7 SKU FAQ 线上验收（可见 FAQ + FAQPage JSON-LD + 真值锚）
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const CASES = [
  ['zh-hk', 'transparent-stickers', '透明貼紙最少印幾多', 'HK$0.38-1.50'],
  ['zh-hk', 'removable-stickers', '可移貼紙最少印幾多', 'HK$0.45-1.60'],
  ['zh-hk', 'foil-stickers', '燙金貼紙最少印幾多', 'HK$0.78-2.80'],
  ['zh-hk', 'security-stickers', '防偽貼紙最少印幾多', 'HK$1.15-4.00'],
  ['zh-hk', 'a4-flyers', 'A4 傳單最少印幾多', 'HK$0.35-0.95'],
  ['zh-hk', 'a5-flyers', 'A5 傳單最少印幾多', 'HK$0.25-0.65'],
  ['ja', 'wall-calendars', '壁掛けカレンダーの最小ロット', 'HK$3-8'],
];
let pass = 0, fail = 0;
const t = (ok, n, x = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' | ' + x : ''}`); };
for (const [loc, slug, needle, price] of CASES) {
  await sleep(5000);
  const r = await fetch(`https://zprintpro.com/${loc}/product/${slug}/`, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  const hasFaqLd = /FAQPage/.test(b);
  t(r.status === 200, `${loc}/${slug} 200`, `status=${r.status}`);
  t(vis.includes(needle), `${loc}/${slug} 可见 FAQ`);
  t(vis.includes(price), `${loc}/${slug} 价格真值`, price);
  t(hasFaqLd, `${loc}/${slug} FAQPage JSON-LD`);
}
console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
