#!/usr/bin/env node
/* 只读: 月曆 en/ja Pillar + 指纹清毒 线上验收 (批 1 = caedc4f7 范围) */
const URLS = [
  '/en/blog/calendar-printing-guide',
  '/ja/blog/calendar-printing-guide',
  '/zh-hk/blog/calendar-printing-guide',
  '/zh-hk/blog/poster-printing-guide',
  '/en/blog/kraft-paper-box-types-comparison-2026',
];
(async () => {
  for (const p of URLS) {
    const u = 'https://zprintpro.com' + p;
    try {
      const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-verify/1.0', 'cache-control': 'no-cache' } });
      const html = await r.text();
      const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, ''])[1];
      const fp = { '18,500': html.split('18,500').length - 1, '8,000+': html.split('8,000+').length - 1, '張志明': html.split('張志明').length - 1, 'Alex Zhang': html.split('Alex Zhang').length - 1 };
      console.log(`${r.status} ${p} | len=${html.length}`);
      console.log(`   title: ${title}`);
      console.log(`   指纹: ${JSON.stringify(fp)}`);
    } catch (e) { console.log(`ERR ${p}: ${e.message}`); }
  }
})();
