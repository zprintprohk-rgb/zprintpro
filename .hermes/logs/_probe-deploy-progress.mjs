// .hermes/logs/_probe-deploy-progress.mjs — 判斷 CF Pages 部署進度（用已知變更當 marker）
const BASE = 'https://zprintpro.com';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CHECKS = [
  {
    name: 'art-posters 首屏（早前已驗證生效的改動）',
    url: `${BASE}/zh-hk/product/art-posters/`,
    expect: ['1張起印', '1 張起印'],
    stale: ['100張起印'],
  },
  {
    name: 'pvc-menus 底部模板句（本輪新改動）',
    url: `${BASE}/zh-hk/product/pvc-menus/`,
    expect: ['10 張起印，48 小時快遞'],
    stale: ['50 張起印，48 小時快遞'],
  },
];

for (const c of CHECKS) {
  const r = await fetch(c.url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZP-probe/1.0)' } });
  const html = await r.text();
  const valid = r.status === 200 && html.length > 20000;
  const staleHit = c.stale.some((s) => html.includes(s));
  const expectHit = c.expect.some((s) => html.includes(s));
  console.log(`[${c.name}]`);
  console.log(`  HTTP ${r.status} ｜ ${html.length} bytes ｜ ${valid ? '有效' : '🔴 INVALID'}`);
  console.log(`  預期值命中: ${expectHit ? '✓' : '✗'} ｜ 舊值殘留: ${staleHit ? '🔴 是' : '✓ 否'}`);
  console.log('');
  await sleep(700);
}
console.log('判讀：');
console.log('  · 若「art-posters 已生效」但「pvc-menus 仍殘留」→ 部署落後於最新 commit（正常延遲）');
console.log('  · 若兩者都殘留/都失效 → 可能站點整體未更新（需查 CF Pages build）');
