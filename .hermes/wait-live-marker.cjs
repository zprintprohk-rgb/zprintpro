#!/usr/bin/env node
/* 线上标记轮询: 等本批部署上线 (名片 title 尾缀 ZprintPro → 智印港)
 * 免 GitHub API (匿名已 403 限流), 直接用线上探针判定部署生效
 */
const URL = 'https://zprintpro.com/zh-hk/product/thick-greeting-cards-400g';
const MAX = Number(process.argv[2] || 40), INTERVAL = 60000;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  for (let i = 0; i < MAX; i++) {
    try {
      const r = await fetch(URL + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-wait/1.0', 'cache-control': 'no-cache' } });
      const html = await r.text();
      const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, ''])[1];
      const ok = /名片/.test(t) && /智印港/.test(t);
      console.log(`[${i}] ${new Date().toISOString()} ${ok ? 'DEPLOYED' : 'still-old'} :: ${t}`);
      if (ok) { console.log('[done] 本批已上线 (title 尾缀 = 智印港)'); process.exit(0); }
    } catch (e) { console.log(`[${i}] ERR ${e.message}`); }
    await sleep(INTERVAL);
  }
  console.log('[timeout] 窗口内未观察到上线');
  process.exit(2);
})();
