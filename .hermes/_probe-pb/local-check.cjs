'use strict';
// photo-book 本地源数据核查 (ground truth)
const fs = require('fs');
const path = require('path');
const root = 'F:\\zprintpro-nextjs';
const slug = 'photo-book-printing-guide';

for (const loc of ['zh-hk', 'en', 'ja']) {
  const p = path.join(root, 'src/data/blog-data', loc + '.json');
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const keys = Object.keys(j);
  const hitKey = keys.find(k => k.toLowerCase().includes(slug));
  console.log('=========== ' + loc + ' ===========');
  console.log('total keys:', keys.length, '| matched key:', hitKey);
  if (!hitKey) { console.log('!! NOT FOUND'); continue; }
  const e = j[hitKey];
  console.log('field names:', Object.keys(e).join(', '));
  const content = e.content || '';
  console.log('content len:', content.length);

  const count = (re) => (content.match(re) || []).length;
  console.log('  qa-answer in content :', count(/qa-answer/g));
  console.log('  <table> in content   :', count(/<table/gi));
  console.log('  <img> in content     :', count(/<img/gi));
  console.log('  <script> in content  :', count(/<script/gi));
  console.log('  wa.me in content     :', count(/wa\.me/g));
  console.log('  <h2 in content       :', count(/<h2/gi));
  console.log('  FAQ Q<digits>        :', count(/Q\s*\d+\s*[：:]/g));

  // 保證 / 承诺 context
  const m = [...content.matchAll(/.{0,60}(保證|承诺|承諾|确保|確保|已具备|已完成).{0,60}/g)];
  console.log('  promise-pattern hits :', m.length);
  m.slice(0, 6).forEach(x => console.log('     … ' + x[0].replace(/\s+/g, ' ')));

  // description / title
  console.log('  title:', JSON.stringify(e.title || e.metaTitle || ''));
  console.log('  description:', JSON.stringify(e.description || e.metaDescription || e.excerpt || ''));
}
