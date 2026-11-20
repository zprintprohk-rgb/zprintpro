'use strict';
/** Step 5 (B) 线上验收: size 本地化 + 栏名三语 + en FAQ 残留是否清除 */
const https = require('https');
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs\\';
const get = u => new Promise((res, rej) => { const q = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d })); }); q.on('error', rej); });

(async () => {
  const map = fs.readFileSync(P + 'src/data/product-specs-i18n.ts', 'utf8');
  const prod = fs.readFileSync(P + 'src/data/products.ts', 'utf8');
  const i = prod.indexOf("slug: 'perfect-bound-books'");
  const seg = prod.slice(i, i + 4000);
  const origSize = (seg.match(/(?:^|[\s,{])size:\s*(['"`])([\s\S]*?)\1/m) || [])[2];
  const m = map.match(new RegExp('"' + String(origSize).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '":\\s*\\{\\s*\'zh-hk\':\\s*"[^"]*",\\s*en:\\s*"([^"]*)",\\s*ja:\\s*"([^"]*)"'));
  console.log('size 原文: ' + origSize);
  console.log('size 映射 → en: ' + (m ? m[1] : '(未命中)') + ' | ja: ' + (m ? m[2] : ''));

  for (const loc of ['en', 'zh-hk', 'ja']) {
    const r = await get(`https://zprintpro.com/${loc}/product/perfect-bound-books/`);
    const t = String(r.h || '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const sizeLive = m ? t.includes(loc === 'en' ? m[1] : loc === 'ja' ? m[2] : origSize) : false;
    const sizeOld = origSize && loc !== 'zh-hk' ? t.includes(origSize) : false;
    // 欄名
    const labels = loc === 'zh-hk' ? ['材質', '尺寸', '印刷方式', '後加工']
      : loc === 'ja' ? ['素材', 'サイズ', '印刷方法', '後加工']
        : ['Material', 'Size', 'Print Method', 'Finishing'];
    const labelHits = labels.filter(x => t.includes(x)).length;
    const oldLabels = loc === 'zh-hk' ? ['material', 'printMethod', 'finishing'].filter(x => new RegExp('\\b' + x + '\\b', 'i').test(t)).length : 0;
    console.log('\n' + loc + ' HTTP ' + r.s);
    console.log('  size 本地化值在線? ' + (sizeLive ? '✅' : '❌') + ' | 原文殘留? ' + (sizeOld ? '★ 是' : '否'));
    console.log('  欄名命中 ' + labelHits + '/4 : ' + labels.join('/'));
    if (loc === 'zh-hk') console.log('  殘留英文欄名(material 等) 命中: ' + oldLabels);
  }
  // en FAQ 殘留: 檢查 category-seo-content 的 CNY 繁中 FAQ 是否仍在線
  const r2 = await get('https://zprintpro.com/en/category/red-packets/');
  if (r2.s === 200) {
    const t2 = String(r2.h).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log('\nen/red-packets HTTP ' + r2.s + ' | 仍見繁中 FAQ 跡象(利是封相關繁中): ' + (/利是封.*(訂製|印刷)|農曆新年.*印刷/.test(t2) ? '★ 是' : '否'));
  }
})();
