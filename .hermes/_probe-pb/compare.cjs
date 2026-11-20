'use strict';
// 比對其他線上頁面的 meta description + 快速答案塊識別 (確認是否站點級或本篇專屬)
const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://zprintpro.com/zh-hk/blog/photo-book-printing-guide/',
  'https://zprintpro.com/en/blog/photo-book-printing-guide/',
  'https://zprintpro.com/ja/blog/photo-book-printing-guide/',
  'https://zprintpro.com/zh-hk/blog/childrens-picture-book-printing-guide/',
  'https://zprintpro.com/en/blog/childrens-picture-book-printing-guide/',
  'https://zprintpro.com/zh-hk/category/books/',
  'https://zprintpro.com/en/product/hardcover-books/',
];

function get(u) {
  return new Promise((res, rej) => {
    https.get(u, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return get(r.headers.location).then(res, rej);
      }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, html: d }));
    }).on('error', rej);
  });
}

(async () => {
  const lines = [];
  for (const u of urls) {
    try {
      const { status, html } = await get(u);
      const md = html.match(/<meta[^>]*name="description"[^>]*>/i);
      const og = html.match(/<meta[^>]*property="og:description"[^>]*>/i);
      const qa = (html.match(/qa-answer/g) || []).length;
      lines.push('--- ' + u);
      lines.push('    HTTP ' + status);
      lines.push('    name=description : ' + (md ? md[0].slice(0, 170) : '!! ABSENT'));
      lines.push('    og:description   : ' + (og ? og[0].slice(0, 130) : '!! ABSENT'));
      lines.push('    qa-answer        : ' + qa);
    } catch (e) {
      lines.push('--- ' + u + '  ERR ' + e.message);
    }
  }
  const out = lines.join('\n');
  fs.writeFileSync(path.join(__dirname, 'compare.txt'), out, 'utf8');
  console.log(out);
})();
