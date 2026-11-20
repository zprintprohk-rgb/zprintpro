#!/usr/bin/env node
/* 只读: 批3 (a16f95a9 = B2/B2c) 线上标记 — 只看应清项是否归零 + title 面是否原样 */
const CHECKS = [
  { url: '/zh-hk/blog/foil-stamping-3-applications-2026', gone: ['智印港 ZprintPro 跨境印刷 SaaS', '智印港 ZprintPro 首頁'], keep: ['12 大行業 GSC pos 2.3 TOP3 突入 | 智印港 ZprintPro'] },
  { url: '/zh-hk/blog/poster-printing-guide', gone: ['智印港 ZprintPro 首頁'], keep: [] },
  { url: '/zh-hk/category/packaging/', gone: ['智印港 ZprintPro.'], keep: [] },
  { url: '/ja/category/packaging/', gone: ['ジープリント ZprintPro.'], keep: [] },
];
(async () => {
  for (const c of CHECKS) {
    const r = await fetch('https://zprintpro.com' + c.url + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-verify/1.0', 'cache-control': 'no-cache' } });
    const html = await r.text();
    const goneStat = c.gone.map(s => `${s.slice(0, 22)}=${html.split(s).length - 1}`).join(' | ');
    const keepStat = c.keep.map(s => `keep(${s.slice(-18)})=${html.split(s).length - 1}`).join(' | ');
    console.log(`${r.status} ${c.url}\n   应清项: ${goneStat}\n   应保留: ${keepStat || '(无)'}`);
  }
})();
