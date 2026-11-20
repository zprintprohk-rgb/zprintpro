'use strict';
const fs = require('fs');
const path = require('path');
const dir = __dirname;

for (const loc of ['zh-hk', 'en', 'ja']) {
  const html = fs.readFileSync(path.join(dir, loc + '.html'), 'utf8');
  console.log('=========== ' + loc + ' ===========');
  // 1. 真正的 name="description"
  const md = html.match(/<meta[^>]*name="description"[^>]*>/i);
  console.log('name="description" tag:', md ? md[0] : '!! ABSENT');
  const md2 = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)
           || html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
  console.log('  -> content:', md2 ? JSON.stringify(md2[1]) : '(none)');
  // og:description for comparison
  const og = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"/i);
  console.log('  og:description:', og ? JSON.stringify(og[1]) : '(none)');

  // 2. qa-answer 出現位置分類
  const qaCount = (html.match(/qa-answer/g) || []).length;
  console.log('qa-answer occurrences:', qaCount);

  // 3. 保證 / promise 上下文
  const promises = [...html.matchAll(/.{0,90}(保證|承諾|確保|已具備|已完成|承诺|确保).{0,90}/g)];
  console.log('promise-pattern on live HTML:', promises.length);
  promises.slice(0, 10).forEach((x, i) => {
    console.log('  [' + (i + 1) + '] ' + x[0].replace(/\s+/g, ' '));
  });

  // 4. <img> 上下文 (前 3 個)
  const imgs = [...html.matchAll(/<img[^>]{0,160}>/gi)];
  console.log('<img> count:', imgs.length);
  imgs.slice(0, 3).forEach((x, i) => console.log('  img[' + (i + 1) + '] ' + x[0].slice(0, 150)));
  console.log('');
}
