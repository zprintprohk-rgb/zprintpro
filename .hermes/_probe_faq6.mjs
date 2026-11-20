// 6 new skuMoneyFAQs SKUs: visible FAQ + FAQPage JSON-LD live check
const checks = [
  ['desk-calendars', '座檯年曆幾多錢一本？'],
  ['custom-calendars', '定製年曆幾多錢？'],
  ['mini-calendars', '迷你年曆幾多錢？'],
  ['hardcover-books', '精裝書印刷幾多錢？'],
  ['outdoor-vinyl-banners', '戶外噴繪幾多錢？'],
  ['drink-menus', '飲品餐牌印刷幾多錢？'],
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
console.log(`RESULT ${pass}/6`);
console.log('FAQ6_DONE');
