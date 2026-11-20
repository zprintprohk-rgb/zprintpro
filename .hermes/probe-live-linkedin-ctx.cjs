#!/usr/bin/env node
/* 只读: 线上 linkedin 残留上下文 + zh-hk PDP title 来源核 */
const url = 'https://zprintpro.com/zh-hk/blog/calendar-printing-guide';
const url2 = 'https://zprintpro.com/zh-hk/product/foil-greeting-cards';
(async () => {
  for (const u of [url, url2]) {
    const r = await fetch(u, { headers: { 'user-agent': 'zprintpro-probe/1.0' } });
    const html = await r.text();
    console.log(`\n=== ${u} (${r.status}) ===`);
    for (const re of [/linkedin/gi, /LinkedIn/g]) {
      const ms = [...html.matchAll(re)].slice(0, 6);
      ms.forEach(m => {
        const s = Math.max(0, m.index - 70), e = Math.min(html.length, m.index + 90);
        console.log(`  [${m[0]}] ...${html.slice(s, e).replace(/\s+/g, ' ')}...`);
      });
    }
  }
})();
