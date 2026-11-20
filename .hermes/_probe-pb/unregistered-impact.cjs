'use strict';
// 3 個「已宣告未註冊」meta 的完整影響: title / description 會 fallback 到什麼?
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const pageSrc = fs.readFileSync(path.join(ROOT, 'src/app/[locale]/blog/[slug]/page.tsx'), 'utf8');
const postsSrc = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf8');

/* 內聯 legacyPosts: 連 title 一齊抽 */
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
      const tm = line.match(/title:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
      legacy[loc][sm[1]] = tm ? (tm[1] !== undefined ? tm[1] : tm[2]) : '(存在但標題解析失敗)';
    }
  }
}

/* blogPosts 陣列成員 */
const ids = new Set();
{
  const arr = postsSrc.slice(postsSrc.indexOf('export const blogPosts'), postsSrc.indexOf('];', postsSrc.indexOf('export const blogPosts')));
  for (const m of arr.matchAll(/([A-Za-z_]\w*)\s*,/g)) ids.add(m[1]);
}
/* 常數名 → slug */
const nameToSlug = {};
for (const m of postsSrc.matchAll(/const (\w+): BlogPostMeta = \{\s*slug:\s*'([^']+)'/g)) nameToSlug[m[1]] = m[2];

const json = {};
for (const loc of ['zh-hk', 'en', 'ja']) json[loc] = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data', loc + '.json'), 'utf8'));

const unregistered = Object.keys(nameToSlug).filter(n => !ids.has(n));
console.log('=== 已宣告但未進 blogPosts 陣列 ===');
for (const n of unregistered) console.log('   ' + n + '  ->  slug: ' + nameToSlug[n]);

console.log('\n=== 這些 slug 的 title/description 實際會 fallback 成什麼 ===');
for (const n of unregistered) {
  const slug = nameToSlug[n];
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const meta = undefined;                                    // 未註冊 → find() 找不到
    const lp = legacy[loc][slug];
    const je = json[loc][slug];
    const title = (meta && meta.title) || lp || (je && je.content ? slug : '');
    const desc = (lp && lp.description) || (je && je.description) || '';
    console.log(loc + '/' + slug);
    console.log('   內聯 legacyPost 是否存在 : ' + (lp !== undefined ? 'YES -> 「' + lp.slice(0, 45) + '」' : 'NO'));
    console.log('   JSON 條目是否存在        : ' + (je ? 'YES (JSON title: 「' + String(je.title).slice(0, 40) + '」)' : 'NO'));
    console.log('   ⇒ 渲染 title = ' + (title === slug ? '★★ 就是 slug 本身 (嚴重)' : '「' + String(title).slice(0, 50) + '」'));
    console.log('   ⇒ 渲染 description = ' + (desc ? '「' + String(desc).slice(0, 45) + '」' : '★ 空'));
    console.log('');
  }
}
