const fs = require('fs');
const path = require('path');

// ---------- A) BK-002 free-text 字段盘点 ----------
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const i = prod.indexOf("slug: 'saddle-stitch-booklets'");
const j = prod.indexOf("slug: '", i + 20);
const seg = prod.slice(i, j);
console.log('===== BK-002 段落内出现 50 / 14-57 / 1.84 / 258 的字段 =====');
for (const key of ['name:', 'nameEn:', 'nameJa:', 'title_zh:', 'description:', 'descriptionEn:', 'descriptionJa:', 'description_zh:', 'price_range:', 'basePrice:', 'basePrice_en:', 'basePrice_ja:', 'minQuantity:']) {
  const k = seg.indexOf(key);
  if (k === -1) { console.log('  (缺) ' + key); continue; }
  let end = seg.indexOf('\n', k);
  const line = seg.slice(k, end === -1 ? k + 400 : end);
  const flags = [];
  if (/50\s*(本|copy|copies|冊)/.test(line)) flags.push('★50');
  if (/14-57/.test(line)) flags.push('★14-57');
  if (/1\.84-7\.36|1\.84/.test(line)) flags.push('1.84');
  if (/258-1030|258/.test(line)) flags.push('258');
  if (/6-32/.test(line)) flags.push('6-32');
  if (/100\s*(本|copies|冊)/.test(line)) flags.push('100');
  console.log('  ' + key.padEnd(18) + ' [' + flags.join(',') + ']  ' + line.slice(0, 150));
}
const feat = seg.match(/features: \[[\s\S]*?\],/);
console.log('\n  features 含 50 的行: ' + (feat ? (feat[0].split('\n').filter((l) => /50/.test(l)).join(' | ') || '(无)') : '(缺)'));

// ---------- B) 两篇既有文章的 HK$14-57/本 上下文 ----------
console.log('\n===== 既有文章 HK$14-57/本 上下文 (zh-hk) =====');
const arr = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
for (const [slug, p] of Object.entries(arr)) {
  for (const k of ['title', 'description', 'excerpt', 'content']) {
    const v = p[k];
    if (typeof v !== 'string') continue;
    let idx = -1, n = 0;
    while ((idx = v.indexOf('HK$14-57/本', idx + 1)) !== -1) {
      n++;
      console.log('\n--- ' + slug + ' [' + k + ' #' + n + '] ---');
      console.log('   ' + v.slice(Math.max(0, idx - 190), idx + 120).replace(/\n/g, '\\n'));
    }
  }
  // 顺带查 50 本起
  const c = p.content || '';
  for (const needle of ['50 本起印', '50 本起', '起訂：騎馬釘小冊子 50']) {
    if (c.includes(needle)) console.log('\n[50本] ' + slug + ' :: ' + needle + ' → ' + c.slice(Math.max(0, c.indexOf(needle) - 100), c.indexOf(needle) + 120).replace(/\n/g, '\\n'));
  }
}

// ---------- C) hreflang / metadata 现状 ----------
console.log('\n===== seo.ts / layout metadata =====');
const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');
console.log('seo.ts bytes ' + seo.length);
for (const re of [/alternates/g, /hreflang/g, /languages/g, /canonical/g, /export const locales|locales *=/g]) {
  const m = seo.match(re);
  console.log('  ' + re + ' → ' + (m ? m.length : 0));
}
const li = seo.search(/export const locales|locales\s*[:=]/);
if (li !== -1) console.log('  locales 定义: ' + seo.slice(li, li + 300).replace(/\n/g, ' '));
// 全站搜 alternates 使用
const { execSync } = require('child_process');
