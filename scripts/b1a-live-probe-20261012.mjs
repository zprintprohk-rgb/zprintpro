/**
 * b1a-live-probe-20261012.mjs — B1a 线上断言: 全站 <meta name="keywords"> = 0, title/description 不受影响
 * 用法: node scripts/b1a-live-probe-20261012.mjs
 */
const BASE = 'https://zprintpro.com';
const PAGES = [
  '/zh-hk/product/waterproof-stickers/',
  '/en/product/folding-boxes/',
  '/ja/product/a5-flyers/',
  '/zh-hk/',
  '/en/category/stickers/',
  '/en/service-areas/',
  '/zh-hk/services/rush-printing-delivery/',
  '/ja/services/business-cards-printing/',
];
const MUST_NOT = /<meta\s+name="keywords"/i;

let pass = 0, fail = 0;
for (const p of PAGES) {
  const url = BASE + p;
  try {
    const r = await fetch(url, { redirect: 'follow' });
    const html = await r.text();
    const hasKw = MUST_NOT.test(html);
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const hasDesc = /<meta\s+name="description"\s+content="[^"]{20,}/i.test(html);
    const ok = r.status === 200 && !hasKw && title.length > 10 && hasDesc;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${p} | status=${r.status} keywords_meta=${hasKw ? 'STILL_PRESENT!!' : '0'} title="${title.slice(0, 40)}" desc=${hasDesc}`);
    ok ? pass++ : fail++;
  } catch (e) {
    console.log(`FAIL ${p} | fetch error: ${e.message}`);
    fail++;
  }
}
console.log(`\n== ${pass}/${PAGES.length} PASS, ${fail} FAIL ==`);
process.exit(fail ? 1 : 0);
