// combined probe: FAQ batch2 6 SKUs + packaging category FAQ truth (zh/en)
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
  const ok = r.status === 200 && t.includes(q) && /"@type"\s*:\s*"FAQPage"/.test(t);
  if (ok) pass++;
  console.log(`${slug}: ${r.status} faq=${t.includes(q)} -> ${ok ? 'PASS' : 'FAIL'}`);
}
console.log(`FAQ6B ${pass}/6`);

// packaging category page: false claims gone?
const zh = await (await fetch('https://zprintpro.com/zh-hk/category/packaging/')).text();
const en = await (await fetch('https://zprintpro.com/en/category/packaging/')).text();
console.log('ZH_30GE_GONE=' + !zh.includes('30 個起'));
console.log('ZH_3DAY_GONE=' + !zh.includes('3 天出貨'));
console.log('ZH_100_STORY=' + zh.includes('全盒型 100 個起'));
console.log('EN_30UNITS_GONE=' + !en.includes('30 units'));
console.log('EN_3DS_GONE=' + !en.includes('Standard: 3 days'));
console.log('EN_100UNITS=' + en.includes('100 units for all box styles'));
console.log('PKGFAQ_DONE');
