'use strict';
/** 精確判定: 1-B 展示層是否真的上線 + 該路由由哪個組件渲染 */
const fs = require('fs');
const https = require('https');
const P = 'F:\\zprintpro-nextjs\\';
const get = u => new Promise((res, rej) => { const q = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d })); }); q.on('error', rej); });

/* 1. 路由目錄結構 (用 fs, 避開 PowerShell 的 [] 通配) */
const dir = P + 'src\\app\\[locale]\\product\\[slug]';
console.log('=== 路由目錄 ===');
const walk = (d, pre) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { console.log('  ' + pre + e.name + (e.isDirectory() ? '/' : '')); if (e.isDirectory()) walk(d + '\\' + e.name, pre + '  '); } };
try { walk(dir, ''); } catch (e) { console.log('  ' + e.message); }

/* 2. page.tsx 是否為真路由 (是否 export default) 且是否含 1-B 代碼 */
const pt = fs.readFileSync(dir + '\\page.tsx', 'utf8');
console.log('\n=== page.tsx ===');
console.log('  行數 ' + pt.split('\n').length + ' | 含 getDisplayMinOrder: ' + /getDisplayMinOrder/.test(pt) + ' | 含 MOQ_AEO: ' + /MOQ_AEO/.test(pt) + ' | export default: ' + /export default/.test(pt));
const idx = pt.indexOf('ProductPageV9');
console.log('  提及 ProductPageV9: ' + (idx >= 0 ? '是 (位置 ' + idx + ')' : '否'));

/* 3. 線上精確字串 */
(async () => {
  const EXACT = { 'zh-hk': '1 本起印（數碼）', en: 'From 1 copy (digital)', ja: '1 部から（デジタル）' };
  for (const [loc, slug] of [['zh-hk', 'perfect-bound-books'], ['en', 'perfect-bound-books'], ['ja', 'perfect-bound-books']]) {
    const r = await get(`https://zprintpro.com/${loc}/product/${slug}/`);
    const h = String(r.h || '');
    console.log('\n=== ' + loc + '/product/' + slug + ' HTTP ' + r.s + ' ===');
    console.log('  MOQ_DISPLAY 精確字串在線: ' + (h.includes(EXACT[loc]) ? '✅ 是' : '❌ 否') + '  («' + EXACT[loc] + '»)');
    console.log('  ⚡ (U+26A1) 在線: ' + (h.includes('\u26a1') ? '✅ 是' : '❌ 否'));
    console.log('  MOQ_AEO 文案在線: ' + (/1 本都可以印|1 本起印|From 1 copy/.test(h) ? '✅ 有 1本字樣' : '❌ 無'));
    // 抓「最低訂購量 / Minimum order / 最低注文」附近原文
    const t = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
    const m = t.match(/.{0,25}(最低訂購量|Minimum order|最低注文).{0,55}/);
    console.log('  實際渲染片段: ' + (m ? m[0].replace(/\s+/g, ' ').trim() : '(找不到)'));
  }
})();
