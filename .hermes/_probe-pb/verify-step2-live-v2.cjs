'use strict';
/**
 * Step 2 線上驗收 (v2, 已修正首版判據錯誤)
 * 修正點:
 *  ① 首版要求 zh-hk/ja 頁出現 US$ 價格 —— 錯: 港澳日顯示當地貨幣, US$ 本就不該出現
 *  ② 首版把「覆光膜／封面4P」當簡體樣本 —— 錯: 覆/光/膜/封/面 皆繁簡同形, 非簡體標記
 *  ③ 首版把「en 頁任何 CJK」一律算 Step 2 缺陷 —— 錯: en 頁另有**獨立來源**的規格區中文
 *     (src/data/products.ts 的 material/printMethod/finishing), 屬另一缺陷, 不應記在 Step 2 帳上
 * 本版: 只驗 Step 2 真正改動的對象 (價格標籤語系化 + 關鍵價格不變), 並把規格區中文另列為「已知其他缺陷」
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* 真正的「簡體專用」樣本 (逐字確認過: 各字繁體必不同形)
 * ★ 已移除「拼版」—— 拼/版 繁簡同形, 不是簡體標記 (2026-09-19 自查糾正) */
const SIMP_SAMPLES = ['无线胶装', '单粉卡', '单面', '异形', '内文', '双面', '双插盒', '银卡纸', '镭射银卡'];
/* 規格區中文 (已知另一缺陷, 用於區分歸因) */
const SPEC_MARKERS = ['四色柯式印刷', '膠裝', '覆膜', '啞膜', '銅版紙', '飛機盒', '扣底盒'];
const SIMP_ZH = '们个为无与书车门问说时东华产国学体线标签页单价简边发对开关电话后从这来让给还两么义应该当经历众飞机场击视频听读写语词记录买卖贵贱农医乐儿长张纸费计认识种类别离继续断错谁务动员双画数';

const PAGES = [
  ['en', 'perfect-bound-books', 'https://zprintpro.com/en/product/perfect-bound-books/'],
  ['zh-hk', 'perfect-bound-books', 'https://zprintpro.com/zh-hk/product/perfect-bound-books/'],
  ['ja', 'perfect-bound-books', 'https://zprintpro.com/ja/product/perfect-bound-books/'],
  ['en', 'gang-run-card-boxes', 'https://zprintpro.com/en/product/gang-run-card-boxes/'],
];

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej); req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}
async function retry(u) { for (let a = 1; a <= 5; a++) { try { const r = await get(u); if (r.status === 200) return r; } catch (e) {} await sleep(5000 * a); } return null; }

(async () => {
  const L = []; let fail = 0;
  for (const [loc, slug, u] of PAGES) {
    const r = await retry(u);
    if (!r) { L.push('★FAIL ' + loc + '/' + slug + ' 取不到'); fail++; continue; }
    const text = r.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

    // ① Step 2 對象: 價格標籤的舊簡體樣本是否已消失
    const simpLeft = SIMP_SAMPLES.filter(s => text.includes(s));
    // ② 關鍵價格 (★ 只在 en/perfect-bound-books 驗: 207.94 與 2.08 是該產品 A5 4+32PP 階梯的值;
    //    其他產品另有自己的階梯, 要求它們出現才是判據錯誤 —— 2026-09-19 自查糾正)
    const priceOk = (loc === 'en' && slug === 'perfect-bound-books')
      ? (text.includes('2.08') && text.includes('207.94')) : null;
    // ③ 規格區中文 (另一來源, 僅記錄不計 Step 2 成敗)
    const specCJK = SPEC_MARKERS.filter(s => text.includes(s));
    // ④ zh-hk 簡體專用字 (排除全站頁腳基線)
    const simpZh = loc === 'zh-hk'
      ? [...new Set([...text.matchAll(new RegExp('[' + SIMP_ZH + ']', 'g'))].map(m => m[0]))].filter(c => !'场国务产与语言无还东时'.includes(c))
      : [];

    let ok = true; const notes = [];
    if (simpLeft.length) { notes.push('★ 舊簡體樣本殘留: ' + simpLeft.join('/')); ok = false; }
    if (priceOk === false) { notes.push('★ 關鍵價格缺失 (2.08/207.94)'); ok = false; }
    if (simpZh.length) { notes.push('★ zh-hk 簡體: ' + simpZh.join('')); ok = false; }
    if (!ok) fail++;

    L.push((ok ? 'OK    ' : '★FAIL ') + loc + '/' + slug);
    L.push('        Step2 對象 · 舊簡體樣本殘留 : ' + (simpLeft.length ? simpLeft.join(', ') : '0 ✅'));
    L.push('        關鍵價格 (en 才驗 US$)      : ' + (priceOk === null ? '不適用 (當地貨幣)' : (priceOk ? '2.08 + 207.94 均在 ✅' : '★ 缺失')));
    L.push('        zh-hk 簡體專用字            : ' + (loc === 'zh-hk' ? (simpZh.length ? simpZh.join('') : '0 ✅') : '不適用'));
    L.push('        [其他缺陷·不計 Step2] 規格區中文: ' + (specCJK.length ? specCJK.length + ' 個標記 (' + specCJK.slice(0, 4).join('/') + ')' : '無'));
    if (notes.length) L.push('        判決: ' + notes.join(' | '));
    await sleep(2500);
  }
  const out = L.join('\n') + '\n\n== Step 2 線上驗收 v2: ' + (fail === 0 ? '✅ Step 2 範圍內全部通過 (' + PAGES.length + '/' + PAGES.length + ')' : '❌ ' + fail + ' 頁未過') +
    '\n（規格區中文為 src/data/products.ts 獨立來源的既有缺陷，另案處理）==\n';
  fs.writeFileSync(path.join(__dirname, '..', 'logs', '2026-09-18-step2-price-live-verify-v2.txt'), out, 'utf8');
  console.log(out);
})();
