'use strict';
// 驗證註冊後 3 個 slug 的 title / description 是否真的解析出值
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const postsSrc = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf8');

/* 陣列成員 */
const start = postsSrc.indexOf('export const blogPosts');
const arrSrc = postsSrc.slice(start, postsSrc.indexOf('];', start));
const registered = new Set([...arrSrc.matchAll(/([A-Za-z_]\w*)\s*,/g)].map(m => m[1]));

/* 常數 -> slug / title / excerpt */
const entries = {};
{
  const re = /const\s+(\w+)\s*:\s*BlogPostMeta\s*=\s*\{\s*\n?\s*slug:\s*'([^']+)'[\s\S]*?title:\s*\{([\s\S]*?)\},\s*excerpt:\s*\{([\s\S]*?)\n  \},/g;
  let m;
  while ((m = re.exec(postsSrc)) !== null) {
    const parse = (body) => {
      const o = {};
      for (const loc of ['zh-hk', 'en', 'ja']) {
        const q = body.match(new RegExp("'?" + loc + "'?:\\s*(\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)')"));
        o[loc] = q ? (q[2] !== undefined ? q[2] : q[3]) : '';
      }
      return o;
    };
    entries[m[1]] = { slug: m[2], title: parse(m[3]), excerpt: parse(m[4]) };
  }
}

console.log('=== 3 個原未註冊 slug 的解析結果 (註冊後) ===');
const targets = ['wedding-invitation-pricing-guide', 'wedding-invitation-cost-guide', 'wedding-table-card-printing-guide'];
let ok = 0, bad = 0;
for (const [name, e] of Object.entries(entries)) {
  if (!targets.includes(e.slug)) continue;
  const isReg = registered.has(name);
  console.log('\n' + e.slug + '  (' + name + ')  已註冊: ' + (isReg ? 'YES ✅' : 'NO ❌'));
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const t = e.title[loc] || '';
    const d = e.excerpt[loc] || '';
    const titleOk = t && t !== e.slug;
    console.log('   ' + loc + ': title=' + (titleOk ? '「' + t.slice(0, 46) + '」' : '★ 空/slug') + ' | desc chars=' + d.length);
    if (isReg && titleOk && d.length > 0) ok++; else bad++;
  }
}
console.log('\n通過組合: ' + ok + ' | 未通過: ' + bad);
