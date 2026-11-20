'use strict';
// 「只上 en」可行性: 現有架構是否已存在「註冊了但某語系無 content」的狀態?
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const posts = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf8');
const start = posts.indexOf('export const blogPosts');
const arr = posts.slice(start, posts.indexOf('];', start));
const registered = new Set([...arr.matchAll(/([A-Za-z_]\w*)\s*,/g)].map(m => m[1]));

const nameToSlug = {};
for (const m of posts.matchAll(/const\s+(\w+)\s*:\s*BlogPostMeta\s*=\s*\{\s*\n?\s*slug:\s*'([^']+)'/g)) nameToSlug[m[1]] = m[2];

const metas = [...registered].map(n => nameToSlug[n]).filter(Boolean);
console.log('已註冊 slug 數: ' + metas.length + ' (唯一 ' + new Set(metas).size + ')');

const json = {};
for (const loc of ['zh-hk', 'en', 'ja']) json[loc] = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data', loc + '.json'), 'utf8'));

console.log('\n=== 各語系「已註冊但無 blog-data content」的 slug ===');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const missing = [...new Set(metas)].filter(s => {
    const e = json[loc][s];
    return !e || !e.content || !String(e.content).trim();
  });
  console.log('\n' + loc + ': ' + missing.length + ' 個');
  missing.slice(0, 15).forEach(s => console.log('   ' + s));
}

// 反向: 各語系 JSON 中「有 content 但未註冊」的 slug
console.log('\n=== 有 JSON content 但未在 blogPosts 註冊 (孤兒內容) ===');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const orphans = Object.entries(json[loc]).filter(([s, e]) => e.content && e.content.trim() && !new Set(metas).has(s)).map(([s]) => s);
  console.log(loc + ': ' + orphans.length + ' 個' + (orphans.length ? ' -> ' + orphans.slice(0, 8).join(', ') : ''));
}
