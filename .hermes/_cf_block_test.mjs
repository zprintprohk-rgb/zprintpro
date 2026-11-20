// .hermes/_cf_block_test.mjs — CF 限速自伤隔离复测 (§0.23.2 双方法)
const URLS = [
  ['homepage', 'https://zprintpro.com/zh-hk/'],
  ['product-food-boxes', 'https://zprintpro.com/zh-hk/product/food-boxes/'],
  ['category-packaging', 'https://zprintpro.com/zh-hk/category/packaging/'],
  ['blog (非规则路径)', 'https://zprintpro.com/zh-hk/blog/'],
];
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function probe(name, url) {
  const t0 = Date.now();
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    const body = await r.text();
    const blocked = body.includes('Attention Required') || body.includes('cf-errors') || body.includes('1020');
    const hasContent = body.includes('智印港') || body.includes('ZprintPro');
    console.log(`${name}: HTTP ${r.status} len=${body.length} blocked=${blocked} content=${hasContent} ${Date.now() - t0}ms`);
    return { name, status: r.status, blocked, hasContent, len: body.length };
  } catch (e) {
    console.log(`${name}: ERROR ${e.message}`);
    return { name, error: e.message };
  }
}
const results = [];
// 第一轮: 冷启动单发 (间隔 12s > 窗口 10s)
for (const [n, u] of URLS) { results.push(await probe(n, u)); await sleep(12000); }
console.log('---第二轮: /product/ 连发 5 次 (模拟 20/10s 触发)---');
for (let k = 0; k < 5; k++) {
  results.push(await probe(`product-burst-${k + 1}`, 'https://zprintpro.com/zh-hk/product/food-boxes/'));
  await sleep(400);
}
fs.writeFileSync('.hermes/logs/cf-block-test-2026-10-20.json', JSON.stringify({ tested: new Date().toISOString(), results }, null, 1), 'utf-8');
import fs from 'fs';
