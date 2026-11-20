#!/usr/bin/env node
/* 只读: ④ faqs 乱数据是否上线 (PDP FAQ 区块 + FAQPage JSON-LD) */
const TARGETS = [
  ['/zh-hk/product/waterproof-stickers', '耐久ラベル'],
  ['/en/product/waterproof-stickers', '耐久ラベル'],
  ['/ja/product/waterproof-stickers', '耐久ラベル'],
  ['/zh-hk/product/transparent-stickers', 'fast delivery.'],
];
(async () => {
  for (const [p, needle] of TARGETS) {
    const u = 'https://zprintpro.com' + p;
    try {
      const r = await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-probe/1.0' } });
      const html = await r.text();
      const n = html.split(needle).length - 1;
      const faqPage = (html.match(/"@type":"FAQPage"/g) || []).length;
      const faqBlocks = (html.match(/<details/g) || []).length;
      // 抓 FAQ 区块里的前两个问题文本
      const qs = [...html.matchAll(/<summary[^>]*>([\s\S]{0,120}?)<\/summary>/g)].slice(0, 3).map(m => m[1].replace(/<[^>]*>/g, '').trim().slice(0, 70));
      console.log(`${r.status} ${p}`);
      console.log(`   含「${needle}」= ${n} | FAQPage JSON-LD = ${faqPage} | <details> = ${faqBlocks}`);
      qs.forEach(q => console.log(`   Q: ${q}`));
    } catch (e) { console.log(`ERR ${p}: ${e.message}`); }
  }
})();
