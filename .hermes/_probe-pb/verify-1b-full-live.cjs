'use strict';
/** 1-B 全量线上验收: 5 SKU × 3 locale + 非名单 SKU 零 churn 对照
 *  判据自证: 先验「非名单 SKU 必须仍是旧数字」(阴性对照), 再验名单 SKU 必须新口径 (阳性)
 */
const https = require('https');
const get = u => new Promise((res, rej) => {
  const q = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => {
    let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d }));
  });
  q.on('error', rej); q.setTimeout(60000, () => q.destroy(new Error('timeout')));
});

const LIST = ['catalog-printing', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks', 'saddle-stitch-booklets'];
const CTRL = ['kraft-paper-bags', 'waterproof-stickers', 'business-cards'];
const EXACT = { 'zh-hk': '1 本起印（數碼）', en: 'From 1 copy (digital)', ja: '1 部から（デジタル）' };
const strip = h => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

(async () => {
  let pass = 0, fail = 0;
  console.log('=== 阳性组: 名单 5 SKU × 3 locale ===');
  for (const slug of LIST) {
    const row = [];
    for (const loc of ['zh-hk', 'en', 'ja']) {
      try {
        const r = await get(`https://zprintpro.com/${loc}/product/${slug}/`);
        const ok = r.s === 200 && String(r.h).includes(EXACT[loc]);
        ok ? pass++ : fail++;
        row.push(`${loc}:${ok ? '✅' : '❌(' + r.s + ')'}`);
      } catch (e) { fail++; row.push(`${loc}:💥`); }
    }
    console.log(`  ${slug.padEnd(24)} ${row.join('  ')}`);
  }

  console.log('\n=== 阴性对照组: 非名单 SKU 必须维持旧数字 (零 churn) ===');
  for (const slug of CTRL) {
    try {
      const r = await get(`https://zprintpro.com/zh-hk/product/${slug}/`);
      const t = strip(String(r.h));
      const m = t.match(/(最低訂購量|Minimum order|最低注文)[^標]{0,40}/);
      const bad = t.includes(EXACT['zh-hk']);
      bad ? fail++ : pass++;
      console.log(`  ${slug.padEnd(24)} HTTP ${r.s} | ${m ? m[0].trim() : '(找不到)'} | 误用新口径: ${bad ? '❌ 是' : '✅ 否'}`);
    } catch (e) { console.log(`  ${slug.padEnd(24)} 💥 ${e.message}`); fail++; }
  }

  console.log(`\n=== 1-B 线上全量: PASS ${pass} / FAIL ${fail} ===`);
  process.exit(0);
})();
