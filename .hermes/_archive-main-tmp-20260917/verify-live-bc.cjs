#!/usr/bin/env node
/* 线上验收轮询 (B+C 批 + 前批合并): 逐项标记出现即通过
 * 标记:
 *  M1 author meta = 智印港 (前: 智印港 ZprintPro)         [批2]
 *  M2 名片 SKU title 尾缀 = 智印港                        [批1]
 *  M3 zh-hk PDP FAQ 问句不含 智印港 ZprintPro              [批2]
 *  M4 zh-hk PDP imageAlt 尾缀 = 智印港                     [批2]
 */
const P = '/zh-hk/product/kraft-paper-bags';
const P2 = '/zh-hk/product/thick-greeting-cards-400g';
const MAX = Number(process.argv[2] || 25), INTERVAL = 60000;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (u) => (await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-verify/1.0', 'cache-control': 'no-cache' } })).text();

(async () => {
  for (let i = 0; i < MAX; i++) {
    try {
      const [h1, h2] = await Promise.all([get('https://zprintpro.com' + P), get('https://zprintpro.com' + P2)]);
      const m1 = /<meta name="author" content="智印港"\/>/.test(h1);
      const t2 = (h2.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, ''])[1];
      const m2 = /智印港$/.test(t2.trim());
      const m3 = !/智印港 ZprintPro/.test(h1);
      const alt = (h1.match(/<meta property="og:image:alt" content="([^"]*)"/i) || [null, ''])[1] || '';
      const m4 = /智印港/.test(alt) && !/ZprintPro/.test(alt);
      const line = `[${i}] ${new Date().toISOString()} M1=${m1} M2=${m2} M3=${m3} M4=${m4} :: title="${t2}"`;
      console.log(line);
      if (m1 && m2 && m3) { console.log('[done] B+C 批已上线 (M1/M2/M3 全绿)'); process.exit(0); }
    } catch (e) { console.log(`[${i}] ERR ${e.message}`); }
    await sleep(INTERVAL);
  }
  console.log('[timeout] 窗口内未观察到全绿');
  process.exit(2);
})();
