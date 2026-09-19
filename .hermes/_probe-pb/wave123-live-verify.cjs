'use strict';
/**
 * 波 1/2/3 合并线上验收 (只读)
 * 判据: ① 旧串必须消失 (阴性) ② 新串必须在 (阳性) —— 两组缺一不可
 */
const https = require('https');
const get = u => new Promise((res, rej) => {
  const q = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => {
    let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d }));
  });
  q.on('error', rej); q.setTimeout(90000, () => q.destroy(new Error('timeout')));
});
const txt = h => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

// 旧串 (必须消失) —— 按语系分
const GONE = {
  en: ['國際認證體系', '進口印刷設備', '認證紙 certified', '急件 18:00 截單', '答案 nugget', '答案答案', '核心頁', 'Hong Kong衍生', '批量以上 pcs', 'FSC FSC-certified'],
  ja: ['國際認證體系', '進口印刷設備', '認證紙', '骑马钉', '特急特急'],
};
// 新串 (必须存在)
const STAY = {
  en: ['internationally certified', 'Heidelberg presses', 'FSC-certified paper', 'rush orders, 18:00 cutoff', 'Answer nugget'],
  ja: ['国際認証', 'ハイデルベルク印刷機', '認証紙', '中綴じ'],
};

// 抽样 URL: 覆盖波 1/2/3 改动的重灾文章与页面
const URLS = [
  ['en', '/en/blog/hong-kong-printing-guide/'],
  ['en', '/en/blog/candle-soap-label-printing-guide/'],
  ['en', '/en/blog/school-exercise-book-printing-guide/'],
  ['en', '/en/blog/campus-education-printing-guide/'],
  ['en', '/en/blog/tea-beverage-gift-box-printing-guide/'],
  ['en', '/en/product/kraft-paper-bags/'],
  ['ja', '/ja/blog/hong-kong-printing-guide/'],
  ['ja', '/ja/blog/candle-soap-label-printing-guide/'],
  ['ja', '/ja/product/kraft-paper-bags/'],
];

(async () => {
  const bodies = { en: [], ja: [] };
  let fail = 0;
  for (const [loc, p] of URLS) {
    try {
      const r = await get('https://zprintpro.com' + p);
      const t = txt(r.h);
      bodies[loc].push(t);
      const gone = GONE[loc].filter(s => t.includes(s));
      console.log(`${r.s === 200 ? '✅' : '⚠️'} ${p} (HTTP ${r.s}, ${t.length})  旧串残留: ${gone.length ? '❌ ' + JSON.stringify(gone) : '0'}`);
      if (gone.length) fail++;
    } catch (e) {
      console.log(`💥 ${p} — ${e.message}`);
      fail++;
    }
  }
  console.log('\n=== 阳性对照 (新串必须在) ===');
  for (const loc of ['en', 'ja']) {
    const all = bodies[loc].join(' ');
    for (const s of STAY[loc]) {
      const ok = all.includes(s);
      if (!ok) fail++;
      console.log(`  ${ok ? '✅' : '❌'} [${loc}] ${JSON.stringify(s)}`);
    }
  }
  console.log(`\n=== 线上验收: FAIL ${fail} ===`);
  process.exit(0);
})();
