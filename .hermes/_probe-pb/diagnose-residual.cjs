'use strict';
// 診斷修復後仍缺 description 的 11 個組合: 三個來源各自為何?
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const targets = [
  ['zh-hk', 'wedding-invitation-pricing-guide'], ['en', 'wedding-invitation-pricing-guide'], ['ja', 'wedding-invitation-pricing-guide'],
  ['zh-hk', 'wedding-invitation-cost-guide'], ['en', 'wedding-invitation-cost-guide'], ['ja', 'wedding-invitation-cost-guide'],
  ['zh-hk', 'wedding-table-card-printing-guide'], ['en', 'wedding-table-card-printing-guide'], ['ja', 'wedding-table-card-printing-guide'],
  ['en', 'construction-material-sample-book-printing-guide'],
  ['en', 'packaging-box-pricing-2026'],
];

const pageSrc = fs.readFileSync(path.join(ROOT, 'src/app/[locale]/blog/[slug]/page.tsx'), 'utf8');
const postsSrc = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf8');

/* legacyPosts (page.tsx 內聯) */
const legacy = { 'zh-hk': {}, en: {}, ja: {} };
{
  const start = pageSrc.indexOf('const posts: Record<string');
  const block = pageSrc.slice(start, pageSrc.indexOf('\n};', start));
  let loc = null;
  for (const line of block.split('\n')) {
    const lm = line.match(/^\s*'?(zh-hk|en|ja)'?:\s*\{\s*$/);
    if (lm) { loc = lm[1]; continue; }
    if (!loc) continue;
    const sm = line.match(/^\s*'?([A-Za-z0-9][A-Za-z0-9-]*)'?:\s*\{/);
    if (sm) {
      const dm = line.match(/description:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
      legacy[loc][sm[1]] = dm ? (dm[1] !== undefined ? dm[1] : dm[2]) : '';
    }
  }
}

/* blog-posts.ts: 是否有此 slug 的 meta + excerpt */
const metaHas = {};
const excerptHas = {};
{
  const arr = postsSrc.slice(postsSrc.indexOf('const bgBusinessCard'));
  const re = /slug:\s*'([^']+)'[\s\S]*?excerpt:\s*\{([\s\S]*?)\n  \},/g;
  let m;
  while ((m = re.exec(arr)) !== null) {
    metaHas[m[1]] = true;
    const e = {};
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const q = m[2].match(new RegExp("'?" + loc + "'?:\\s*(\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)')"));
      e[loc] = q ? (q[2] !== undefined ? q[2] : q[3]) : '';
    }
    excerptHas[m[1]] = e;
  }
}

/* 是否在 export const blogPosts 陣列中 (getBlogPostMetaBySlug 只查這個) */
const arrSrc = postsSrc.slice(postsSrc.indexOf('export const blogPosts'));
const inArray = {};
{
  const re = /^\s*(\w+),?\s*$/gm;
  let m;
  while ((m = re.exec(arrSrc)) !== null) inArray[m[1]] = true;
}
/* 由 const 名 -> slug 建表 */
const nameToSlug = {};
{
  const re = /const (\w+): BlogPostMeta = \{\s*slug:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(postsSrc)) !== null) nameToSlug[m[1]] = m[2];
}
/* 已註冊 (在陣列中) 的 slug 集合 */
const registeredSlugs = new Set();
for (const name of Object.keys(inArray)) if (nameToSlug[name]) registeredSlugs.add(nameToSlug[name]);

const json = {};
for (const loc of ['zh-hk', 'en', 'ja']) json[loc] = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data/' + loc + '.json'), 'utf8'));

console.log('=== 11 個殘留組合逐一診斷 ===\n');
for (const [loc, slug] of targets) {
  const lp = legacy[loc][slug] || '';
  const jd = (json[loc][slug] && json[loc][slug].description) || '';
  const ex = (excerptHas[slug] && excerptHas[slug][loc]) || '';
  const reg = registeredSlugs.has(slug);
  const resolve = lp || jd || ex || '';
  console.log(loc + '/' + slug);
  console.log('   legacyPost.description : ' + (lp ? '「' + lp.slice(0, 50) + '…」' : '(空)'));
  console.log('   blog-posts.ts 有 meta  : ' + (metaHas[slug] ? 'YES' : 'NO') + ' | 已註冊進 blogPosts 陣列: ' + (reg ? 'YES' : 'NO'));
  console.log('   meta.excerpt[locale]   : ' + (ex ? '「' + ex.slice(0, 50) + '…」' : '(空)'));
  console.log('   JSON description       : ' + (jd ? '「' + jd.slice(0, 50) + '…」' : '(空)'));
  console.log('   ⇒ 解析結果            : ' + (resolve ? '應有值 (與線上不符!)' : '★ 仍為空 (來源三者皆空)'));
  // JSON 條目是否存在
  console.log('   JSON 有此 slug 條目    : ' + (json[loc][slug] ? 'YES' : 'NO'));
  console.log('');
}
