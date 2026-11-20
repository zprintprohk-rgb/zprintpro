#!/usr/bin/env node
/* 只读: 503 事故范围探查 — 多 URL 状态码 + 响应体片段 + 响应头 */
const URLS = ['/zh-hk/', '/zh-hk/product/waterproof-stickers', '/zh-hk/category/stickers/', '/zh-hk/blog/company-intro', '/zh-hk/blog/foil-stamping-3-applications-2026', '/en/', '/ja/', '/zh-hk/contact/'];
(async () => {
  for (const p of URLS) {
    try {
      const r = await fetch('https://zprintpro.com' + p + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-probe/1.0', 'cache-control': 'no-cache' } });
      const body = await r.text();
      console.log(`${r.status} ${p} | len=${body.length} | cf-cache=${r.headers.get('cf-cache-status')} | ray=${(r.headers.get('cf-ray') || '').slice(0, 12)}`);
      if (r.status !== 200) console.log(`     body: ${body.slice(0, 220).replace(/\s+/g, ' ')}`);
    } catch (e) { console.log(`ERR ${p}: ${e.message}`); }
  }
})();
