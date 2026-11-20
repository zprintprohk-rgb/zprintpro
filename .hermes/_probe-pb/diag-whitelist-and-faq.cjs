'use strict';
/** 勘察: 白名单候选 4 行的实际内容 + category-seo-content 的 res独有区间内容 + en.json FAQ 结构 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const show = (f, lines) => {
  const src = fs.readFileSync(P + f, 'utf8').split('\n');
  console.log('=== ' + f);
  for (const [a, b] of lines) {
    for (let i = a; i <= Math.min(b, src.length); i++) console.log('  L' + i + ': ' + src[i - 1].slice(0, 230));
    console.log('  ---');
  }
};
show('src/app/[locale]/payment-methods/page.tsx', [[693, 700], [755, 760]]);
show('src/components/layout/Footer.tsx', [[144, 147]]);
show('src/data/category-seo-content.ts', [[2145, 2160], [3168, 3175]]);

// en.json: FAQ 相关结构
const en = JSON.parse(fs.readFileSync(P + 'src/data/blog-data/en.json', 'utf8'));
const cjk = /[\u3400-\u4dbf\u4e00-\u9fff]/;
console.log('\n=== en.json 顶层条目数与含 CJK 字段 ===');
for (const [slug, e] of Object.entries(en)) {
  const hit = [];
  for (const [k, v] of Object.entries(e)) {
    if (typeof v === 'string' && cjk.test(v)) hit.push(k + '(' + (v.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g) || []).length + ')');
    if (Array.isArray(v)) {
      const s = JSON.stringify(v);
      if (cjk.test(s)) hit.push(k + '[array](' + (s.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g) || []).length + ')');
    }
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const s = JSON.stringify(v);
      if (cjk.test(s)) hit.push(k + '{obj}(' + (s.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g) || []).length + ')');
    }
  }
  if (hit.length) console.log('  ' + slug + ': ' + hit.join(', '));
}
console.log('\n=== en.json 条目的全部键 (第一个条目) ===');
console.log('  ' + Object.keys(Object.values(en)[0]).join(', '));
console.log('\n=== FAQPage / ld+json 出现在哪些条目 ===');
for (const [slug, e] of Object.entries(en)) {
  const s = JSON.stringify(e);
  const f = [];
  if (/application\/ld\+json/.test(s)) f.push('ld+json');
  if (/"@type"\s*:\s*"FAQPage"/.test(s)) f.push('FAQPage');
  if (/<strong>Q\d|FAQ/i.test(s)) f.push('Qmark/FAQ');
  if (f.length && cjk.test(s)) console.log('  ' + slug + ': ' + f.join(','));
}
