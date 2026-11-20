#!/usr/bin/env node
/* 轮询批3 (a16f95a9) 上线: 应清项归零 + title 面原样保留 */
const U = '/zh-hk/blog/foil-stamping-3-applications-2026';
const MAX = Number(process.argv[2] || 40), INTERVAL = 60000;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  for (let i = 0; i < MAX; i++) {
    try {
      const r = await fetch('https://zprintpro.com' + U + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-verify/1.0', 'cache-control': 'no-cache' } });
      const h = await r.text();
      const g1 = h.split('智印港 ZprintPro 跨境印刷 SaaS').length - 1;
      const g2 = h.split('智印港 ZprintPro 首頁').length - 1;
      const keep = h.split('TOP3 突入 | 智印港 ZprintPro').length - 1;
      const ok = g1 === 0 && g2 === 0;
      console.log(`[${i}] ${new Date().toISOString()} 应清 Saa=${g1} 首頁=${g2} | 应留 headline=${keep} :: ${ok ? 'DEPLOYED' : 'pending'}`);
      if (ok) { console.log('[done] 批3 已上线 (JSON-LD name 单品牌化生效, headline 仍按裁决保留)'); process.exit(0); }
    } catch (e) { console.log(`[${i}] ERR ${e.message}`); }
    await sleep(INTERVAL);
  }
  console.log('[timeout] 窗口内未观察到批3 上线');
  process.exit(2);
})();
