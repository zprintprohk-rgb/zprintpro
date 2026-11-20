#!/usr/bin/env node
/* 只读: 逐点线上验收 — 批3 (a16f95a9) 与 T 批 (8f549cb9) 标记
 * 用法: node .hermes/verify-live-T1.cjs [轮询次数]   默认 1 次
 */
const TARGETS = [
  {
    name: '批3: blog JSON-LD name 单品牌化',
    url: '/zh-hk/blog/foil-stamping-3-applications-2026',
    gone: ['智印港 ZprintPro 跨境印刷 SaaS', '智印港 ZprintPro 首頁'],
    keep: ['TOP3 突入 | 智印港 ZprintPro'],
  },
  {
    name: 'T1c: 伪造 FSC 证号 + 重复品牌',
    url: '/zh-hk/blog/campus-education-printing-pillar-guide',
    gone: ['FSC C123456', 'FSC-C123456', 'ZprintPro (ZprintPro)'],
    keep: ['智印港'],
  },
  {
    name: 'T1d: §0.32 法人全称 (zh-hk 不得出现)',
    url: '/zh-hk/blog/food-packaging-printing-guide',
    gone: ['深圳市彩龍印刷包裝有限公司'],
    keep: ['智印港（彩龍印刷旗下）'],
  },
  {
    name: 'T1: zh-hk blog 品牌口',
    url: '/zh-hk/blog/company-intro',
    gone: [],
    keep: ['智印港'],
  },
];
const MAX = Number(process.argv[2] || 1), INTERVAL = 60000;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  for (let i = 0; i < MAX; i++) {
    let allOk = true;
    console.log(`\n===== 轮次 ${i} ${new Date().toISOString()} =====`);
    for (const t of TARGETS) {
      try {
        const r = await fetch('https://zprintpro.com' + t.url + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-verify/1.0', 'cache-control': 'no-cache' } });
        const h = await r.text();
        // 2026-09-13 修正: 必须要求 200 + 非空正文, 否则「应清项=0」会**真空成立** (503 空响应体 = 假通过)
        if (r.status !== 200 || h.length < 5000) {
          allOk = false;
          console.log(`  ${r.status} ?? 长度 ${h.length} ${t.name} —— 非 200 或正文过短, 本轮判为未上线 (不计 0 命中)`);
          continue;
        }
        const goneStat = t.gone.map(s => `${s.slice(0, 26)}=${h.split(s).length - 1}`).join(' ');
        const keepStat = t.keep.map(s => `${s.slice(0, 22)}=${h.split(s).length - 1}`).join(' ');
        const ok = t.gone.every(s => h.split(s).length - 1 === 0) && t.keep.some(s => h.split(s).length - 1 > 0);
        if (!ok) allOk = false;
        console.log(`  ${r.status} ${ok ? 'OK ' : 'OLD'} ${t.name}\n      应清: ${goneStat || '(无)'} | 应留: ${keepStat}`);
      } catch (e) { allOk = false; console.log(`  ERR ${t.name}: ${e.message}`); }
    }
    if (allOk) { console.log('\n[done] T 批 + 批3 全部上线'); process.exit(0); }
    if (i < MAX - 1) await sleep(INTERVAL);
  }
  console.log('\n[pending] 仍有未上线项 (CF 构建较慢)');
  process.exit(2);
})();
