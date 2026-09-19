'use strict';
/** 未注册篇目清点 + 取注册模板 (只读) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const bp = fs.readFileSync(path.join(REPO, 'src', 'data', 'blog-posts.ts'), 'utf8');
const en = JSON.parse(fs.readFileSync(path.join(REPO, 'src', 'data', 'blog-data', 'en.json'), 'utf8'));

const keys = Object.keys(en).filter(k => en[k] && en[k].content);
const notIn = keys.filter(k => !bp.includes("'" + k + "'"));
console.log(`en.json 有内容篇目: ${keys.length}`);
console.log(`已在 blog-posts.ts 注册: ${keys.length - notIn.length}`);
console.log(`未注册: ${notIn.length}`);
if (notIn.length) console.log('  未注册清单:', notIn.join(', '));

// 取一个 source:'daily' 的条目作模板
const m = bp.match(/\{\s*\n\s*slug: '[^']+',[\s\S]{0,700}?source: 'daily',[\s\S]{0,300}?\n  \},/);
if (m) { console.log('\n=== 注册模板 (source: daily) ===\n' + m[0].slice(0, 1000)); }
else console.log('\n(未匹配到模板)');

// blogPosts 数组结尾
const i = bp.indexOf('export const blogPosts');
console.log('\n=== blogPosts 声明附近 ===\n' + bp.slice(i, i + 200));
