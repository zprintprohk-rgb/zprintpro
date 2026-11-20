'use strict';
// 決定性檢查: en/ja PDP 的「規格區」是否真的換成映射後的英文/日文 (而非既有英文文案的假陽性)
const fs = require('fs');
const https = require('https');
const P = 'F:\\zprintpro-nextjs\\';

// 取 perfect-bound-books 的三欄原文, 再從映射取對應 en/ja
const prod = fs.readFileSync(P + 'src/data/products.ts', 'utf8');
const i = prod.indexOf("slug: 'perfect-bound-books'");
const seg = prod.slice(i, i + 4000);
const pick = f => (seg.match(new RegExp('(?:^|[\\s,{])' + f + ":\\s*(['\"`])([\\s\\S]*?)\\1", 'm')) || [])[2];
const originals = { material: pick('material'), printMethod: pick('printMethod'), finishing: pick('finishing') };
console.log('=== products.ts 原文 (perfect-bound-books) ===');
for (const k of Object.keys(originals)) console.log('  ' + k + ': ' + originals[k]);

const map = fs.readFileSync(P + 'src/data/product-specs-i18n.ts', 'utf8');
const expect = {};
for (const k of Object.keys(originals)) {
  const o = originals[k];
  if (!o) continue;
  const re = new RegExp('"' + o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '":\\s*\\{\\s*\'zh-hk\':\\s*"[^"]*",\\s*en:\\s*"([^"]*)",\\s*ja:\\s*"([^"]*)"');
  const m = map.match(re);
  expect[k] = m ? { en: m[1], ja: m[2] } : null;
}
console.log('\n=== 映射期望值 ===');
for (const k of Object.keys(expect)) console.log('  ' + k + ' → en: ' + (expect[k] ? expect[k].en : '(未命中)') + ' | ja: ' + (expect[k] ? expect[k].ja : ''));

const get = u => new Promise((res, rej) => { const q = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d })); }); q.on('error', rej); });

(async () => {
  for (const loc of ['en', 'ja']) {
    const r = await get(`https://zprintpro.com/${loc}/product/perfect-bound-books/`);
    const t = String(r.h || '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log('\n=== ' + loc + ' PDP HTTP ' + r.s + ' ===');
    let hitNew = 0, hitOld = 0;
    for (const k of Object.keys(expect)) {
      if (!expect[k]) continue;
      const exp = loc === 'en' ? expect[k].en : expect[k].ja;
      const hasNew = t.includes(exp);
      const hasOld = originals[k] && t.includes(originals[k]);
      if (hasNew) hitNew++;
      if (hasOld) hitOld++;
      console.log('  ' + k.padEnd(12) + ' 映射值在線? ' + (hasNew ? '✅' : '❌') + '  原文殘留在線? ' + (hasOld ? '★ 是' : '否'));
    }
    console.log('  ⇒ 判決: ' + (hitNew === 3 && hitOld === 0 ? '★ 已本地化 (Step 4 已上線)' : hitNew === 0 && hitOld > 0 ? '★ 未上線 (仍顯示中文規格)' : '混合: 新=' + hitNew + ' 舊=' + hitOld));
  }
})();
