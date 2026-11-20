// .hermes/_loyin_inspect.cjs — 裡印块原文 + 3 目标行 body 尾部 + eco/menu slug
const fs = require('fs');
const lines = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8').split('\n');
const rows = lines.map(r => r.split('\t'));
const idx = {};
rows.forEach((r, i) => { if (r[3]) idx[r[3]] = i; });
const fb = rows[idx['food-boxes']];
for (const [name, ci] of [['ZH', 17], ['EN', 18], ['JA', 19]]) {
  const body = fb[ci] || '';
  const k = body.indexOf('裡印');
  const k2 = body.indexOf('内側印刷');
  const at = k >= 0 ? k : k2;
  console.log(`[food-boxes body-${name}] has裡印=${k >= 0} has内側=${k2 >= 0} len=${body.length}`);
  if (at >= 0) console.log('  ctx:', JSON.stringify(body.slice(Math.max(0, at - 80), at + 260)));
}
for (const s of ['folding-boxes', 'mailer-boxes', 'white-card-bags']) {
  const r = rows[idx[s]];
  for (const [name, ci] of [['ZH', 17], ['EN', 18], ['JA', 19]]) {
    const body = r[ci] || '';
    console.log(`[${s} ${name}] len=${body.length} tail:`, JSON.stringify(body.slice(-140)));
  }
}
// eco/menu blogs
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const keys = Object.keys(zh);
console.log('zh blog keys sample:', keys.filter(k => /eco|menu|restaurant|green|環保|餐/i.test(k)).join(', '));
