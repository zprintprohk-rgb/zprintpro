'use strict';
/**
 * Self-Publishing 註冊進 blog-posts.ts (交付層)
 * 安全三件套: 備份 + 計數斷言 + 形狀斷言; 以 JSON.stringify 生成字串 (避免手抄長字串出錯)
 * 冪等: 已註冊則中止不動
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const ST = path.join(ROOT, '.hermes', 'staging');
const P = path.join(ROOT, 'src', 'data', 'blog-posts.ts');
const BAK = path.join(ROOT, '.hermes', '_bak-selfpub-20260918');
const SLUG = 'self-publishing-printing-guide';
const NAME = 'lpSelfPublishingGuide';

const en = JSON.parse(fs.readFileSync(path.join(ST, 'self-publishing-content.json'), 'utf8'));
const zj = JSON.parse(fs.readFileSync(path.join(ST, 'self-publishing-content.zhhk-ja.json'), 'utf8'));
const pick = (k, loc) => (loc === 'en' ? en : zj)[k][loc];

let src = fs.readFileSync(P, 'utf8');

/* 冪等 + 前置斷言 */
const errors = [];
if (src.includes(`slug: '${SLUG}'`)) errors.push('blog-posts.ts 已含該 slug (冪等中止)');
const arrStart = src.indexOf('export const blogPosts');
const arrEnd = src.indexOf('];', arrStart);
if (arrStart < 0 || arrEnd < 0) errors.push('找不到 blogPosts 陣列邊界');
const beforeIds = [...src.slice(arrStart, arrEnd).matchAll(/([A-Za-z_]\w*)\s*,/g)].map(m => m[1]);
if (beforeIds.length !== 109) errors.push(`陣列項目數 ${beforeIds.length} ≠ 預期 109`);
if (!src.includes('  lpPhotoBookPrintingGuide,\n')) errors.push('找不到陣列錨點 lpPhotoBookPrintingGuide');
if (errors.length) { console.error('❌ 前置斷言未過, 不寫盤:'); errors.forEach(e => console.error('   - ' + e)); process.exit(1); }

const T = l => JSON.stringify(pick('title', l));
const E = l => JSON.stringify(pick('excerpt', l));

const block = `
// 2026-09-18 队列 (v10 §四.2「P0 三篇 en blog」第 2 篇: Candle/Soap → Self-Publishing → Etsy)
// 队列依据: docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md §四.2
// 承接 SKU: perfect-bound-books / hardcover-books / saddle-stitch-booklets / spiral-notebooks / catalog-printing (books 类目)
// 3 locale native | MOQ 口径 (K3 2026-09-18): 1 copy 起印无最低起订; 少量数码免版费; 100+ 柯式更经济
// 价格/规格一律引 products.ts 与线上 PDP (batch total US$207.94 等经线上 Price Ladder 实测核对)
const ${NAME}: BlogPostMeta = {
  slug: '${SLUG}',
  categoryKey: 'printing',
  source: 'daily',
  date: '2026-09-18',
  title: {
    'zh-hk': ${T('zh-hk')},
    en: ${T('en')},
    ja: ${T('ja')},
  },
  excerpt: {
    'zh-hk': ${E('zh-hk')},
    en: ${E('en')},
    ja: ${E('ja')},
  },
  targetKeywords: {
    primary: 'self publishing printing',
    secondary: [
      'print my own book', 'self publish a book printing', 'book printing for authors',
      'paperback book printing', 'hardcover book printing', 'book printing 1 copy',
      'small batch book printing', '自費出版印刷', '自助出版印刷', '一本起印',
      '自費出版 印刷', '自主出版 印刷', '少部数 製本',
    ],
  },
};

`;

/* 插入 const 區塊 (置於 export const blogPosts 之前) */
src = src.slice(0, arrStart) + block + src.slice(arrStart);
/* 插入陣列條目 */
src = src.replace('  lpPhotoBookPrintingGuide,\n', '  lpPhotoBookPrintingGuide,\n  ' + NAME + ',\n');

/* 寫盤前形狀斷言 */
const arrStart2 = src.indexOf('export const blogPosts');
const arrEnd2 = src.indexOf('];', arrStart2);
const afterIds = [...src.slice(arrStart2, arrEnd2).matchAll(/([A-Za-z_]\w*)\s*,/g)].map(m => m[1]);
const checks = [
  [src.includes(`const ${NAME}: BlogPostMeta = {`), 'const 宣告缺失'],
  [afterIds.length === 110, `陣列項目數 ${afterIds.length} ≠ 110`],
  [afterIds.includes(NAME), '陣列未含新識別字'],
  [afterIds.filter(x => x === NAME).length === 1, '陣列重複插入'],
  [(src.match(new RegExp(`slug: '${SLUG}'`, 'g')) || []).length === 1, 'slug 出現次數 ≠ 1'],
];
const bad = checks.filter(c => !c[0]);
if (bad.length) { console.error('❌ 寫盤前斷言未過:'); bad.forEach(b => console.error('   - ' + b[1])); process.exit(1); }

fs.mkdirSync(BAK, { recursive: true });
fs.copyFileSync(P, path.join(BAK, 'blog-posts.ts'));
fs.writeFileSync(P, src, 'utf-8');
console.log('✅ 註冊完成: ' + NAME + ' → 陣列 ' + beforeIds.length + ' → ' + afterIds.length);
console.log('   備份: ' + path.join(BAK, 'blog-posts.ts'));
