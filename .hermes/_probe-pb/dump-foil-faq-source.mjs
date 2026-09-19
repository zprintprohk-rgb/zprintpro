// 只读: 提取 foil × 3 locale 内嵌 FAQPage 的问答 (作为 B3 补写的**既有事实源**, 禁编造)
import fs from 'fs';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const c = d['foil-stamping-3-applications-2026'].content;
  const blocks = [...c.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const faq = blocks.map(b => { try { return JSON.parse(b); } catch (e) { return null; } }).find(o => o && o['@type'] === 'FAQPage');
  console.log(`\n========== ${loc} ==========`);
  if (!faq) { console.log('未找到内嵌 FAQPage'); continue; }
  const ents = faq.mainEntity || [];
  console.log(`共 ${ents.length} 组:`);
  ents.forEach((q, i) => {
    console.log(`${i + 1}. Q: ${q.name}`);
    console.log(`   A: ${q.acceptedAnswer.text}`);
  });
}
