#!/usr/bin/env node
/* 只读: 线上 PDP 内嵌数据 vs <title> 对照 — 判定 title 是否被改写 / 部署数据是否陈旧 */
const u = 'https://zprintpro.com/zh-hk/product/thick-greeting-cards-400g';
(async () => {
  const r = await fetch(u, { headers: { 'user-agent': 'zprintpro-probe/1.0' } });
  const html = await r.text();
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, ''])[1];
  console.log('live <title>:', title);
  // 找内嵌 payload 里的超厚名片相关 title
  const hits = [...html.matchAll(/.{0,80}超厚名片.{0,80}/g)].map(m => m[0]);
  console.log(`\n内嵌/正文含「超厚名片」共 ${hits.length} 处 (前 6):`);
  [...new Set(hits)].slice(0, 6).forEach(h => console.log('   ', h.replace(/\s+/g, ' ')));
  // og:title / twitter:title / JSON-LD name
  const og = (html.match(/<meta property="og:title" content="([^"]*)"/i) || [null, ''])[1];
  const tw = (html.match(/<meta name="twitter:title" content="([^"]*)"/i) || [null, ''])[1];
  console.log('\nog:title     :', og);
  console.log('twitter:title:', tw);
  // 该页是否出现「智印港」与「ZprintPro」各自次数 (仅 <head>)
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0];
  console.log(`\n<head> 内: 智印港=${(head.match(/智印港/g) || []).length} ZprintPro=${(head.match(/ZprintPro/g) || []).length}`);
})();
