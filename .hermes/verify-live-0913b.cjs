#!/usr/bin/env node
/* 只读: 线上验收 — (1) 月曆 en/ja pillar 200 + 篇幅 (2) 名片 2 SKU title (3) 指纹清毒线上实证 */
const fs = require('fs');
const ts = fs.readFileSync('F:\\zprintpro-main-tmp\\src\\data\\sku-seo-data.ts', 'utf8');
const lines = ts.split(/\r?\n/);
let slug = null, cur = null;
const cardSlugs = [];
lines.forEach((l) => {
  const s = l.match(/^  "([a-z0-9-]+)":\s*\{/);
  if (s) slug = s[1];
  const m = l.match(/"(zh-hk|en|ja)"\s*:\s*[{"\[]/);
  if (m) cur = m[1];
  if (cur === 'zh-hk' && /"title":/.test(l) && /名片/.test(l)) cardSlugs.push({ slug, title: l.trim().slice(0, 110) });
});
console.log('=== 名片 zh-hk title 条目 ===');
cardSlugs.forEach(c => console.log(`  ${c.slug} :: ${c.title}`));

const BASE = 'https://zprintpro.com';
const targets = [
  '/en/blog/calendar-printing-guide',
  '/ja/blog/calendar-printing-guide',
  '/zh-hk/blog/calendar-printing-guide',
  ...cardSlugs.map(c => `/zh-hk/product/${c.slug}`),
];
(async () => {
  for (const t of targets) {
    try {
      const r = await fetch(BASE + t, { headers: { 'user-agent': 'zprintpro-probe/1.0' } });
      const html = await r.text();
      const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, '(none)'])[1];
      const z = (html.match(/ZprintPro/g) || []).length;
      const fp = ['18,500', 'LinkedIn', 'linkedin'].map(k => `${k}=${html.split(k).length - 1}`).join(' ');
      console.log(`${r.status} ${t}\n    title=${title}\n    len=${html.length} ZprintPro=${z} 指纹: ${fp}`);
    } catch (e) {
      console.log(`ERR ${t}: ${e.message}`);
    }
  }
})();
