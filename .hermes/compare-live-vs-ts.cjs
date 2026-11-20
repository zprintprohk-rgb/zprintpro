#!/usr/bin/env node
/* 只读: 线上 PDP 元数据 vs 本地 TS 条目 对照 (判定线上是否用了 skuSeoData / 是否陈旧) */
const fs = require('fs');
const ts = fs.readFileSync('F:\\zprintpro-main-tmp\\src\\data\\sku-seo-data.ts', 'utf8');
const lines = ts.split(/\r?\n/);
function zhHkFields(slug) {
  let start = -1;
  for (let i = 0; i < lines.length; i++) if (lines[i].startsWith(`  "${slug}": {`)) { start = i; break; }
  if (start < 0) return null;
  const out = {};
  let cur = null;
  for (let i = start; i < Math.min(start + 90, lines.length); i++) {
    const m = lines[i].match(/"(zh-hk|en|ja)"\s*:\s*[{"\[]/);
    if (m) cur = m[1];
    if (cur === 'zh-hk') {
      const tm = lines[i].match(/"title":\s*"(.*)",\s*$/);
      const dm = lines[i].match(/"description":\s*"(.*)",\s*$/);
      const hm = lines[i].match(/"h1":\s*"(.*)",\s*$/);
      if (tm && !out.title) out.title = tm[1];
      if (dm && !out.description) out.description = dm[1];
      if (hm && !out.h1) out.h1 = hm[1];
    }
    if (lines[i].startsWith('  },') && i > start) break;
  }
  return out;
}
const SLUGS = ['thick-greeting-cards-400g', 'foil-greeting-cards', 'kraft-paper-bags'];
(async () => {
  for (const s of SLUGS) {
    const loc = zhHkFields(s);
    const u = `https://zprintpro.com/zh-hk/product/${s}?cachebust=${Date.now()}`;
    const r = await fetch(u, { headers: { 'user-agent': 'zprintpro-probe/1.0', 'cache-control': 'no-cache' } });
    const html = await r.text();
    const liveTitle = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, ''])[1];
    const liveDesc = (html.match(/<meta name="description" content="([^"]*)"/i) || [null, ''])[1];
    console.log(`\n=== ${s} ===`);
    console.log(`  本地 TS title      : ${loc && loc.title}`);
    console.log(`  线上 <title>       : ${liveTitle}`);
    console.log(`  本地 TS desc(前60) : ${loc && (loc.description || '').slice(0, 60)}`);
    console.log(`  线上 desc(前60)    : ${liveDesc.slice(0, 60)}`);
    console.log(`  一致? title=${!!(loc && liveTitle.includes(loc.title))} desc=${!!(loc && liveDesc.slice(0, 40) === (loc.description || '').slice(0, 40))}`);
  }
})();
