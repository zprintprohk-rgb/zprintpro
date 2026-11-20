'use strict';
// 範圍界定: blog 頁是否全站缺 description meta?
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = 'F:\\zprintpro-nextjs';

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    https.get(u, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) {
        return get(r.headers.location, depth + 1).then(res, rej);
      }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, html: d }));
    }).on('error', rej);
  });
}

// 從 blog-posts.ts 取前 N 個 slug (含較舊文章)
const ts = fs.readFileSync(path.join(root, 'src/data/blog-posts.ts'), 'utf8');
const slugs = [...ts.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const uniq = [...new Set(slugs)];
console.log('blog-posts.ts slug 總數:', uniq.length);

// 抽樣: 最新幾個 + 最早幾個 + 中間
const sample = [
  ...uniq.slice(0, 6),
  ...uniq.slice(Math.floor(uniq.length / 2), Math.floor(uniq.length / 2) + 3),
  ...uniq.slice(-6),
];
const finalSample = [...new Set(sample)];

(async () => {
  const rows = [];
  for (const s of finalSample) {
    for (const loc of ['zh-hk', 'en']) {
      const u = `https://zprintpro.com/${loc}/blog/${s}/`;
      try {
        const { status, html } = await get(u);
        const md = /<meta[^>]*name="description"[^>]*>/i.test(html);
        const og = /<meta[^>]*property="og:description"[^>]*>/i.test(html);
        const tw = /<meta[^>]*name="twitter:description"[^>]*>/i.test(html);
        const ti = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim().slice(0, 45);
        rows.push([loc, s, status, md ? 'YES' : 'NO', og ? 'YES' : 'NO', tw ? 'YES' : 'NO', ti].join(' | '));
      } catch (e) {
        rows.push([loc, s, 'ERR', e.message].join(' | '));
      }
    }
  }
  console.log('\n格式: locale | slug | HTTP | meta-desc | og-desc | tw-desc | title');
  console.log(rows.join('\n'));
})();
