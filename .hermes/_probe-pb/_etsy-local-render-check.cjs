'use strict';
/** 本地验证 Etsy 篇注册后的渲染 (title / h1 / meta description / blog 列表) */
const http = require('http');
const get = (u) => new Promise((res, rej) => {
  const q = http.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => {
    let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d }));
  });
  q.on('error', rej); q.setTimeout(300000, () => q.destroy(new Error('timeout')));
});
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

(async () => {
  const url = 'http://localhost:3999/en/blog/etsy-seller-printing-guide/';
  const r = await get(url);
  console.log('文章 HTTP', r.s, '| HTML len', r.h.length);
  const ti = r.h.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  console.log('  <title>          :', ti ? ti[1].trim() : '(无)');
  const h1 = r.h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  console.log('  <h1>             :', h1 ? h1[1].replace(/<[^>]+>/g, '').trim().slice(0, 100) : '(无)');
  const md = r.h.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  console.log('  meta description :', md ? `${md[1].length} 字符 | ${md[1].slice(0, 90)}…` : '(无)');
  const og = r.h.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  console.log('  og:title         :', og ? og[1].slice(0, 90) : '(无)');
  // 回退检查: title/h1 是否退化成 slug
  const degrade = (ti && ti[1].includes('etsy-seller-printing-guide')) || (h1 && h1[1].includes('etsy-seller-printing-guide'));
  console.log('  slug 退化        :', degrade ? '❌ 仍退化为 slug' : '✅ 未退化');

  const b = await get('http://localhost:3999/en/blog/');
  const tb = strip(b.h);
  console.log('\nblog 列表 HTTP', b.s, '| 含该篇:', tb.includes('10-Piece Min') ? '✅ 是' : '❌ 否');
  if (tb.includes('10-Piece Min')) {
    const i = tb.indexOf('10-Piece Min');
    console.log('  列表片段:', JSON.stringify(tb.slice(Math.max(0, i - 80), i + 90)));
  }
  process.exit(0);
})();
