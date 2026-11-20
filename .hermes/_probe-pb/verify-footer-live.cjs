'use strict';
/**
 * Step 1 (止血) 的線上驗收: zh-hk 頁腳是否已由簡體變繁體
 * 判據:
 *   ① 繁體版字串出現 (面向香港及全球市場的國際印刷服務品牌)
 *   ② 簡體版字串消失 (面向香港及全球市场的国际印刷服务品牌)
 *   ③ 抽查多頁 (首頁 + 類目 + 產品 + 博客) 以證「全站每一頁」都修好
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const TRAD = '面向香港及全球市場的國際印刷服務品牌';
const SIMP = '面向香港及全球市场的国际印刷服务品牌';
const PAGES = [
  ['首頁', 'https://zprintpro.com/zh-hk/'],
  ['類目 books', 'https://zprintpro.com/zh-hk/category/books/'],
  ['產品 perfect-bound-books', 'https://zprintpro.com/zh-hk/product/perfect-bound-books/'],
  ['博客 self-publishing', 'https://zprintpro.com/zh-hk/blog/self-publishing-printing-guide/'],
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
async function retry(u) { for (let a = 1; a <= 4; a++) { try { const r = await get(u); if (r.status === 200) return r; } catch (e) {} await sleep(4000 * a); } return null; }

(async () => {
  const L = []; let fail = 0;
  for (const [label, u] of PAGES) {
    const r = await retry(u);
    if (!r) { L.push('★FAIL ' + label + ' 取不到'); fail++; continue; }
    const t = r.html;
    const hasTrad = t.includes(TRAD);
    const hasSimp = t.includes(SIMP);
    const ok = hasTrad && !hasSimp;
    if (!ok) fail++;
    L.push((ok ? 'OK    ' : '★FAIL ') + label);
    L.push('        繁體頁腳字串: ' + (hasTrad ? '存在 ✅' : '★ 不存在'));
    L.push('        簡體頁腳字串: ' + (hasSimp ? '★ 仍存在 (未部署或未修)' : '已消失 ✅'));
    await sleep(2500);
  }
  const out = L.join('\n') + '\n\n== Step 1 止血線上驗收: ' + (fail === 0 ? '✅ 全部通過 (' + PAGES.length + '/' + PAGES.length + ')' : '❌ ' + fail + ' 頁未過') + ' ==\n';
  fs.writeFileSync(path.join(__dirname, '..', 'logs', '2026-09-18-footer-fix-live-verify.txt'), out, 'utf8');
  console.log(out);
  process.exit(fail === 0 ? 0 : 1);
})();
