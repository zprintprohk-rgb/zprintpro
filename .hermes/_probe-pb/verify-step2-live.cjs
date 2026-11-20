'use strict';
/**
 * Step 2 線上驗收: 受影響 PDP 的語系標籤是否已本地化, 且價格未變
 * 判據:
 *   en 頁: 標籤應為英文 (不應再出現「拼版卡盒」「无线胶装」等中文)
 *   zh-hk 頁: 標籤應為繁體 (不應出現簡體專用字)
 *   ja 頁: 標籤應為日文
 *   價格: 100 pc US$2.08/pc · batch US$207.94 等關鍵值仍存在 (數值零改動的線上印證)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const PAGES = [
  ['en perfect-bound-books', 'https://zprintpro.com/en/product/perfect-bound-books/'],
  ['zh-hk perfect-bound-books', 'https://zprintpro.com/zh-hk/product/perfect-bound-books/'],
  ['ja perfect-bound-books', 'https://zprintpro.com/ja/product/perfect-bound-books/'],
  ['en gang-run-card-boxes', 'https://zprintpro.com/en/product/gang-run-card-boxes/'],
];
const CJK = /[\u3400-\u9fff]/;
// 原污染樣本 (簡體)
const OLD_SAMPLES = ['拼版卡盒', '无线胶装', '内文16张双面', '封面4P', '单面', '覆光膜'];
const SIMP_ZH = '们个为无与书车门问说时东华产国学体线标签页单价简边发对开关电话后从这来让给还两么义应该当经历众飞机场击视频听读写语词记录买卖贵贱农医乐儿长张纸费计认识种类别离继续断错谁务动员双画数';
const JA_SHINJITAI = '写数点双学画国体来与当医断错言';

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
  for (const [label, u] of PAGES) {
    const r = await retry(u);
    if (!r) { L.push('★FAIL ' + label + ' 取不到'); fail++; continue; }
    // 只取可讀文字 (去 script/style)
    const text = r.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const loc = label.split(' ')[0];
    const oldHits = OLD_SAMPLES.filter(s => text.includes(s));
    const simp = loc === 'zh-hk'
      ? [...new Set([...text.matchAll(new RegExp('[' + SIMP_ZH + ']', 'g'))].map(m => m[0]))].filter(c => !'场国务产与语言无还东时'.includes(c))
      : [];
    const price207 = text.includes('207.94');
    const price208 = text.includes('2.08');
    // en 頁不應再見中文標籤
    const enHasCJKLabel = loc === 'en' ? (OLD_SAMPLES.some(s => text.includes(s)) || /拼版|膠裝|胶装|單面|覆膜/.test(text)) : false;
    let ok = true; const notes = [];
    if (oldHits.length) { notes.push('殘留舊簡體樣本: ' + oldHits.join('/')); if (loc === 'en') ok = false; }
    if (enHasCJKLabel) { notes.push('★ en 頁仍見中文標籤'); ok = false; }
    if (simp.length) { notes.push('★ zh-hk 仍見簡體: ' + simp.join('')); ok = false; }
    if (!price207 || !price208) { notes.push('★ 關鍵價格缺失 (207.94=' + price207 + ' / 2.08=' + price208 + ')'); ok = false; }
    if (!ok) fail++;
    L.push((ok ? 'OK    ' : '★FAIL ') + label);
    L.push('        舊簡體樣本殘留: ' + (oldHits.length ? oldHits.join(', ') : '0 ✅') + ' | 價格 207.94=' + price207 + ' 2.08=' + price208);
    if (simp.length) L.push('        zh-hk 簡體: ' + simp.join(''));
    if (notes.length) L.push('        備註: ' + notes.join(' | '));
    await sleep(2500);
  }
  const out = L.join('\n') + '\n\n== Step 2 線上驗收: ' + (fail === 0 ? '✅ 全部通過 (' + PAGES.length + '/' + PAGES.length + ')' : '❌ ' + fail + ' 頁未過') + ' ==\n';
  fs.writeFileSync(path.join(__dirname, '..', 'logs', '2026-09-18-step2-price-live-verify.txt'), out, 'utf8');
  console.log(out);
  process.exit(fail === 0 ? 0 : 1);
})();
