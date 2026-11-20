'use strict';
/** 1-B 本地渲染驗證 (與 decisive-1b-live.cjs 同判據, 端點換 localhost)
 *  目的: 分離「代碼落點錯」與「只是沒部署」兩種失敗 */
const http = require('http');
const BASE = 'http://localhost:3999';
const get = u => new Promise((res, rej) => {
  const q = http.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => {
    let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d }));
  });
  q.on('error', rej);
  q.setTimeout(180000, () => { q.destroy(new Error('timeout')); });
});

const EXACT = {
  'zh-hk': '1 本起印（數碼）',
  en: 'From 1 copy (digital)',
  ja: '1 部から（デジタル）',
};

(async () => {
  let fail = 0;
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const slug = 'perfect-bound-books';
    let r;
    try {
      r = await get(`${BASE}/${loc}/product/${slug}/`);
    } catch (e) {
      console.log(`\n=== ${loc} 請求失敗: ${e.message} ===`);
      fail++;
      continue;
    }
    const h = String(r.h || '');
    const hit = h.includes(EXACT[loc]);
    const bolt = h.includes('\u26a1');
    const aeo = /1 本都可以印|1 本起印|From 1 copy|1 部から/.test(h);
    console.log(`\n=== ${loc}/product/${slug} HTTP ${r.s}  (len ${h.length}) ===`);
    console.log('  MOQ_DISPLAY 精確字串在本地渲染: ' + (hit ? '✅ 是' : '❌ 否') + '  («' + EXACT[loc] + '»)');
    console.log('  ⚡ (U+26A1) 在本地渲染: ' + (bolt ? '✅ 是' : '❌ 否'));
    console.log('  MOQ_AEO 文案在本地渲染: ' + (aeo ? '✅ 有' : '❌ 無'));
    const t = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
    const m = t.match(/.{0,25}(最低訂購量|Minimum order|最低注文).{0,60}/);
    console.log('  實際渲染片段: ' + (m ? m[0].replace(/\s+/g, ' ').trim() : '(找不到)'));
    if (!hit || !bolt) fail++;
    // 負向: 不該出現舊的 100 本起訂量數字行
    if (loc === 'zh-hk') {
      const bad = /最低訂購量\s*100本/.test(t.replace(/\s+/g, '')) || /最低訂購量100本/.test(t.replace(/\s+/g, ''));
      console.log('  負向(舊 100本 數字行不應出現): ' + (bad ? '❌ 仍出現' : '✅ 未出現'));
      if (bad) fail++;
    }
  }
  // 零 churn 對照組: 非名單 SKU 應維持原數字
  try {
    const r2 = await get(`${BASE}/zh-hk/product/paper-bags/`);
    const t2 = String(r2.h || '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
    const m2 = t2.replace(/\s+/g, '').match(/最低訂購量[^標]{0,12}/);
    console.log('\n=== 對照組(非名單 SKU paper-bags) ===');
    console.log('  ' + (m2 ? m2[0] : '(找不到)'));
  } catch (e) {
    console.log('\n對照組請求失敗: ' + e.message);
  }
  console.log('\n=== 本地結論: ' + (fail === 0 ? '✅ 本地渲染正確 (落點無誤)' : `❌ ${fail} 項不符`) + ' ===');
  process.exit(0);
})();
