'use strict';
/**
 * Etsy 篇线上验收探针 (等部署后跑)
 * 判据: ① HTTP 200 ② 旧/红线串必须消失 ③ 新串必须存在 ④ 内链 200 ⑤ 是否进入 blog 列表
 * 技术债 9 合规: 非 200 报 INVALID, 不计入内容失败
 */
const https = require('https');
const get = (u) => new Promise((res, rej) => {
  const q = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => {
    let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d }));
  });
  q.on('error', rej); q.setTimeout(90000, () => q.destroy(new Error('timeout')));
});
const txt = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

const URL = 'https://zprintpro.com/en/blog/etsy-seller-printing-guide/';
const MUST_GONE = ['From 1 copy', 'cheapest', 'Alibaba', 'Sticker Mule', 'Vistaprint', '500-piece minimum order'];
const MUST_STAY = [
  'Etsy Printing: 10-Piece Min, Free Proof',
  'From 10 pieces',
  'no 500-piece minimum',
  'free digital proof',
  'DHL',
  '2-4 day',
  'FDA 21 CFR 175.105',
  'EU REACH',
  'available on request',
  '30-second',
];
const LINKS = [
  '/en/blog/sticker-guide/', '/en/blog/food-packaging-printing-guide/', '/en/blog/paper-bag-printing-guide/',
  '/en/blog/packaging-box-custom-guide/', '/en/blog/baby-food-packaging-box-printing-guide/',
  '/en/blog/pet-food-sticker-printing-guide/', '/en/blog/cosmetics-packaging-box-printing-guide/',
  '/en/blog/ip-character-sticker-printing-guide/',
];

(async () => {
  let fail = 0, invalid = 0;
  const r = await get(URL);
  console.log(`=== ① 文章 URL ===`);
  if (r.s !== 200) {
    console.log(`  🟡 INVALID HTTP ${r.s} — 未部署或未注册 (不计入内容失败)`);
    invalid++;
  } else {
    const t = txt(r.h);
    console.log(`  ✅ HTTP 200 (文本 ${t.length} 字符)`);
    const gone = MUST_GONE.filter(s => t.includes(s));
    console.log(`  ② 旧/红线串: ${gone.length ? '❌ ' + JSON.stringify(gone) : '✅ 0 残留'}`);
    if (gone.length) fail++;
    const miss = MUST_STAY.filter(s => !t.includes(s));
    console.log(`  ③ 新串: ${miss.length ? '❌ 缺 ' + JSON.stringify(miss) : `✅ ${MUST_STAY.length}/${MUST_STAY.length} 全在`}`);
    if (miss.length) fail++;
    console.log(`  ④ H1: ${/<h1[^>]*>/.test(r.h) ? '✅ 存在' : '⚠️ 未见 <h1>'}`);
  }

  console.log(`\n=== ⑤ 内链探针 (${LINKS.length} 条) ===`);
  for (const l of LINKS) {
    try {
      const x = await get('https://zprintpro.com' + l);
      console.log(`  ${x.s === 200 ? '✅' : '🟡 INVALID'} ${x.s}  ${l}`);
      if (x.s !== 200) invalid++;
    } catch (e) { console.log(`  💥 ${l} — ${e.message}`); invalid++; }
  }

  console.log(`\n=== ⑥ 是否进入 blog 列表 ===`);
  try {
    const b = await get('https://zprintpro.com/en/blog/');
    const t = txt(b.h);
    const listed = /Etsy Printing: 10-Piece Min/.test(t) || t.includes('etsy-seller-printing-guide');
    console.log(`  blog 列表 HTTP ${b.s} | 含该篇: ${listed ? '✅ 是' : '❌ 否 (可能需在 blog-posts.ts 注册 BlogPostMeta)'}`);
    if (!listed) fail++;
  } catch (e) { console.log('  💥 blog 列表请求失败: ' + e.message); invalid++; }

  console.log(`\n=== 结论: FAIL ${fail} | INVALID ${invalid} ===`);
  process.exit(0);
})();
