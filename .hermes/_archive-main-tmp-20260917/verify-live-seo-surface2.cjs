#!/usr/bin/env node
/* 只读: 批2/3 线上验收 (只看 SEO 面: head metas + JSON-LD + PDP 正文 FAQ, 不看 RSC payload 噪声)
 * 验收项:
 *  A. meta author/creator/publisher = 智印港 (不含 ZprintPro)
 *  B. og:image:alt / imageAlt zh-hk 单品牌
 *  C. PDP FAQ 问句不含双品牌
 *  D. PDP description 不含 "ZprintPro 15+ 年自有品牌"
 *  E. 首页 Footer 新文案 (批2 标志)
 */
const P = '/zh-hk/product/kraft-paper-bags';
const P2 = '/zh-hk/product/waterproof-stickers';
(async () => {
  for (const p of [P, P2, '/zh-hk/']) {
    const r = await fetch('https://zprintpro.com' + p + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-verify/1.0', 'cache-control': 'no-cache' } });
    const html = await r.text();
    const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0];
    const meta = (n) => (html.match(new RegExp(`<meta name="${n}" content="([^"]*)"`, 'i')) || [null, '(none)'])[1];
    const ogAlt = (html.match(/<meta property="og:image:alt" content="([^"]*)"|\"imageAlt\":\s*\"([^\"]*)\"/i) || [null, null, null]);
    const desc = meta('description');
    const faqQ = [...html.matchAll(/<summary[^>]*>([\s\S]{0,140}?)<\/summary>/g)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const faqDual = faqQ.filter(q => /智印港\s*ZprintPro|ZprintPro\s*智印港/.test(q));
    const ld = (html.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || []).join('\n');
    console.log(`\n=== ${p} (${r.status}) ===`);
    console.log(`  A author=${meta('author')} | creator=${meta('creator')} | publisher=${meta('publisher')}`);
    console.log(`  B og:image:alt=${ogAlt[1] || ogAlt[2] || '(none)'}`);
    console.log(`  C FAQ 问句含双品牌 = ${faqDual.length} / 共 ${faqQ.length}${faqDual.length ? ' :: ' + faqDual[0].slice(0, 60) : ''}`);
    console.log(`  D desc 含「ZprintPro 15+」= ${/ZprintPro 15\+/.test(desc) ? 1 : 0} | desc 前 40 = ${(desc || '').slice(0, 40)}`);
    console.log(`  E JSON-LD 内双品牌 = ${(ld.match(/智印港\s*ZprintPro|ZprintPro\s*智印港/g) || []).length}`);
  }
})();
