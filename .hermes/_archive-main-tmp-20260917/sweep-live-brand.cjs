#!/usr/bin/env node
/* 只读: 线上品牌面巡检 (8 URL × zh-hk/en/ja): metadata 品牌口径 + JSON-LD 双品牌 */
const URLS = [
  '/zh-hk/', '/zh-hk/product/waterproof-stickers', '/zh-hk/category/stickers/',
  '/zh-hk/blog/calendar-printing-guide', '/zh-hk/about/', '/zh-hk/terms/',
  '/en/', '/ja/',
];
(async () => {
  const rows = [];
  for (const p of URLS) {
    try {
      const r = await fetch('https://zprintpro.com' + p + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-sweep/1.0', 'cache-control': 'no-cache' } });
      const html = await r.text();
      const m = (n) => (html.match(new RegExp(`<meta name="${n}" content="([^"]*)"`, 'i')) || [null, ''])[1];
      const ld = (html.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || []).join('\n');
      const dualInLd = (ld.match(/智印港\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro/g) || []).length;
      const dualInHead = ((html.match(/<head[\s\S]*?<\/head>/i) || [''])[0].match(/智印港\s*ZprintPro|ZprintPro\s*智印港/g) || []).length;
      rows.push({ p, status: r.status, author: m('author'), creator: m('creator'), publisher: m('publisher'), dualInHead, dualInLd });
    } catch (e) { rows.push({ p, status: 'ERR ' + e.message }); }
  }
  console.log('URL | status | author | creator | publisher | head 双品牌 | JSON-LD 双品牌');
  rows.forEach(r => console.log(`${r.p} | ${r.status} | ${r.author ?? '-'} | ${r.creator ?? '-'} | ${r.publisher ?? '-'} | ${r.dualInHead ?? '-'} | ${r.dualInLd ?? '-'}`));
})();
