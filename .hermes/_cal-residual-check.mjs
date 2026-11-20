import fs from 'node:fs';
for (const f of ['src/data/blog-data/zh-hk.json', 'src/data/blog-data/en.json', 'src/data/blog-data/ja.json']) {
  JSON.parse(fs.readFileSync(f, 'utf8'));
  console.log('JSON OK', f);
}
function seg(p, s, e) {
  const t = fs.readFileSync(p, 'utf8');
  const i = t.indexOf(s);
  const j = t.indexOf(e, i + s.length);
  return t.slice(i, j);
}
const checks = [
  ['zh-hk CG 1000/50/500', 'src/data/blog-data/zh-hk.json', '"calendar-printing-guide"', '\n  "', /1000 本起印|數碼 50 本起|柯式 500 本起/],
  ['zh-hk MC floor', 'src/data/blog-data/zh-hk.json', '"2027-monthly-calendar-printing-timetable"', '\n  "', /100 本起印|100 本起）/],
  ['en CG', 'src/data/blog-data/en.json', '"calendar-printing-guide"', '\n  "poster-size-guide"', /1000pc|1000-pc|1,000 pcs|1,000-unit/],
  ['ja CG', 'src/data/blog-data/ja.json', '"calendar-printing-guide"', '\n  "poster-size-guide"', /1000部|500部/],
  ['sku-seo 日历区', 'src/data/sku-seo-data.ts', '"wall-calendars"', '"pvc-menus"', /1000|100-MOQ|100 MOQ|50冊〜、7-10|500部から|1,000-unit|Calendars 100\+/],
  ['products-content', 'src/data/products-content.ts', null, null, /1000 本起印，48 小時快遞/],
  ['seo.ts calendars', 'src/lib/seo.ts', "'calendars': {", "'japan-doujin'", /1000/],
  ['conversion-blocks 月曆', 'src/data/category-conversion-blocks.ts', '"title": "月曆印刷', '"title": "香港月曆訂製類型', /1000本起訂|50 本起訂|"50 本起"/],
  ['blog-posts lpCalendar', 'src/data/blog-posts.ts', 'lpCalendarPrinting', 'lpPosterSizeGuide', /1000 本起印|1000-piece|1000部から/],
  ['blog-posts lpMonthly', 'src/data/blog-posts.ts', 'lpMonthlyCalendarPrinting2027', 'lpLargeEnvelopePrinting', /100 本起|100 MOQ|100 冊〜/],
  ['page.tsx calendars', 'src/app/[locale]/category/[slug]/page.tsx', "'calendars': {", "'greeting-cards': {", /1000/],
];
let bad = 0;
for (const [name, p, s, e, pat] of checks) {
  const t = s ? seg(p, s, e) : fs.readFileSync(p, 'utf8');
  const m = t.match(pat);
  if (m) { bad++; console.log('🔴', name, '残留:', m[0]); }
  else console.log('✅', name);
}
// 全库日历语境 1000 兜底（排除折扣阶梯/价格语境）
const pc = fs.readFileSync('src/data/products-content.ts', 'utf8');
console.log('✅ products.ts minQuantity 1000 剩余:', (fs.readFileSync('src/data/products.ts', 'utf8').match(/minQuantity: 1000/g) || []).length);
process.exit(bad ? 1 : 0);
