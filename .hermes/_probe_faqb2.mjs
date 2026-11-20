// FAQ batch-2 probe: 6 SKUs visible FAQ + FAQPage JSON-LD (3 locales spot: zh primary)
const checks = [
  ['magnetic-calendars', '磁石年曆幾多錢？'],
  ['photo-frame-calendars', '相框年曆幾多錢？'],
  ['laminated-menus', '過膠餐牌幾多錢？'],
  ['spiral-notebooks', '線圈筆記本幾多錢？'],
  ['colored-envelopes', '彩色信封幾多錢？'],
  ['vehicle-wraps', '車身貼印刷幾多錢？'],
];
let pass = 0;
for (const [slug, q] of checks) {
  const r = await fetch(`https://zprintpro.com/zh-hk/product/${slug}/`);
  const t = await r.text();
  const visible = t.includes(q);
  const faqLd = /"@type"\s*:\s*"FAQPage"/.test(t);
  const ok = r.status === 200 && visible && faqLd;
  if (ok) pass++;
  console.log(`${slug}: ${r.status} visible=${visible} faqPage=${faqLd} -> ${ok ? 'PASS' : 'FAIL'}`);
}
// one ja locale spot check (localization present, not just zh)
const ja = await (await fetch('https://zprintpro.com/ja/product/magnetic-calendars/')).text();
console.log('JA_LOCALIZED=' + ja.includes('マグネットカレンダーの価格は'));
console.log(`RESULT ${pass}/6`);
console.log('FAQB2_DONE');
