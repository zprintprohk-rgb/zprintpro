#!/usr/bin/env node
/* 只读: 线上 zh-hk 页「SEO 面」品牌口径探针
 * 只统计 head 区 meta / title / link alternate / JSON-LD 脚本, 排除 RSC payload 噪声
 */
const BASE = 'https://zprintpro.com';
const targets = [
  '/zh-hk/product/kraft-paper-bags',
  '/zh-hk/product/graduation-yearbook',
  '/zh-hk/',
];

function seoSurface(html) {
  const out = [];
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0];
  out.push(...(head.match(/<meta\b[^>]*>/gi) || []));
  out.push(...(head.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) || []));
  out.push(...(head.match(/<link\b[^>]*>/gi) || []));
  const lds = html.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || [];
  return { metas: out, ldCount: lds.length, ldText: lds.join('\n') };
}

(async () => {
  for (const t of targets) {
    const url = BASE + t;
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'zprintpro-probe/1.0' } });
      const html = await r.text();
      const s = seoSurface(html);
      const metaText = s.metas.join('\n');
      const dual = [...metaText.matchAll(/[^"'<>]{0,30}(?:智印港\s*ZprintPro|ZprintPro\s*智印港)[^"'<>]{0,20}/g)].map(m => m[0].trim());
      const author = (html.match(/<meta name="author"[^>]*>/i) || ['(none)'])[0];
      const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, '(none)'])[1];
      const ldZ = (s.ldText.match(/ZprintPro/g) || []).length;
      const ldC = (s.ldText.match(/智印港/g) || []).length;
      console.log(`\n=== ${url} (${r.status}) ===`);
      console.log(`title: ${title}`);
      console.log(`author meta: ${author}`);
      console.log(`head meta+title+link 内双品牌形态: ${dual.length}`);
      [...new Set(dual)].slice(0, 6).forEach(d => console.log(`   - ${d}`));
      console.log(`JSON-LD 块数=${s.ldCount} 内 ZprintPro=${ldZ} 智印港=${ldC}`);
      // head 内 ZprintPro 出现的具体 meta
      const zMetas = s.metas.filter(m => /ZprintPro/.test(m));
      console.log(`head 内含 ZprintPro 的 meta/link 数: ${zMetas.length}`);
      zMetas.slice(0, 5).forEach(m => console.log(`   * ${m.replace(/\s+/g, ' ').slice(0, 170)}`));
    } catch (e) {
      console.log(`ERR ${url}: ${e.message}`);
    }
  }
})();
