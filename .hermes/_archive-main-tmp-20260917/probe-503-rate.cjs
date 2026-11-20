#!/usr/bin/env node
/* 只读: CF Worker 资源超限 503 的发生率实测 (判定是否系统性) */
const URLS = ['/zh-hk/', '/zh-hk/blog/food-packaging-printing-guide', '/zh-hk/product/waterproof-stickers', '/zh-hk/category/stickers/'];
const N = Number(process.argv[2] || 8);
const stat = {};
for (const u of URLS) stat[u] = { 200: 0, 503: 0, other: 0 };
async function main() {
  for (let i = 0; i < N; i++) {
    for (const u of URLS) {
      try {
        const r = await fetch('https://zprintpro.com' + u + '?cb=' + Date.now() + '-' + i, { headers: { 'user-agent': 'zprintpro-probe/1.0', 'cache-control': 'no-cache' } });
        if (r.status === 200) stat[u][200]++; else if (r.status === 503) stat[u][503]++; else stat[u].other++;
        await r.text();
      } catch { stat[u].other++; }
    }
  }
  let t200 = 0, t503 = 0, to = 0;
  for (const [u, s] of Object.entries(stat)) {
    console.log(`${u}: 200=${s[200]} 503=${s[503]} other=${s.other}  → 503 率 ${(s[503] / N * 100).toFixed(0)}%`);
    t200 += s[200]; t503 += s[503]; to += s.other;
  }
  console.log(`\n合计: 200=${t200} 503=${t503} other=${to} | 总请求 ${N * URLS.length} | **503 率 ${(t503 / (N * URLS.length) * 100).toFixed(1)}%**`);
}
main();
