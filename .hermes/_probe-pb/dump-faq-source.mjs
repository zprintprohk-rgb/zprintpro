// 只读: 提取指定 slug × 3 locale 的内嵌 FAQPage 问答 (B3 事实源; 禁编造)
import fs from 'fs';
const slugs = process.argv.slice(2);
for (const slug of slugs) {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
    const e = d[slug];
    if (!e) { console.log(`${loc}/${slug}: 无该 slug`); continue; }
    const blocks = [...e.content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
    const faq = blocks.map(b => { try { return JSON.parse(b); } catch (err) { return null; } }).find(o => o && o['@type'] === 'FAQPage');
    console.log(`\n=== ${loc} / ${slug} === FAQPage: ${faq ? faq.mainEntity.length + ' 组' : '无'}`);
    if (faq) faq.mainEntity.forEach((q, i) => console.log(`${i + 1}. Q: ${q.name}\n   A: ${q.acceptedAnswer.text}`));
    // 同时输出正文 FAQ 可解析组数 (确认是否真无可见 FAQ)
    const PROD = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]/gi;
    console.log(`   [正文可解析 FAQ 组数] ${(e.content.match(PROD) || []).length}`);
  }
}
