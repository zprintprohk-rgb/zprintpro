// 只读: 打印 4 组答案全文 (B3 print-specs 事实源, 供改写时逐字引用)
import fs from 'fs';
const slug = 'print-specifications-reference-guide-2026';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const blocks = [...d[slug].content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const faq = blocks.map(b => { try { return JSON.parse(b); } catch (e) { return null; } }).find(o => o && o['@type'] === 'FAQPage');
  if (!faq) { console.log(loc + ': 无'); continue; }
  console.log(`\n===== ${loc} =====`);
  faq.mainEntity.forEach((q, i) => console.log(`[${i + 1}] ${q.name}\n${q.acceptedAnswer.text}\n`));
}
