#!/usr/bin/env node
/* 只读: 核验 zh-hk 页面内 「行业」(简) vs 「行業」(繁) 实际计数 + 上下文 */
const U = 'https://zprintpro.com/zh-hk/blog/thick-paper-flyer-printing-restaurant-takeout-guide';
(async () => {
  const r = await fetch(U + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-probe/1.0', 'cache-control': 'no-cache' } });
  const h = await r.text();
  console.log(`HTTP ${r.status} len=${h.length}`);
  for (const t of ['行业', '行業']) {
    const n = h.split(t).length - 1;
    console.log(`「${t}」= ${n}`);
    let idx = -1, shown = 0;
    while ((idx = h.indexOf(t, idx + 1)) !== -1 && shown < 3) { console.log(`   …${h.slice(Math.max(0, idx - 60), idx + 40).replace(/\s+/g, ' ')}…`); shown++; }
  }
})();
