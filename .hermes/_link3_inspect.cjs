// .hermes/_link3_inspect.cjs — pricing/kraft 稿 锚点候选 (三语)
const fs = require('fs');
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  for (const slug of ['packaging-box-pricing-2026', 'kraft-paper-box-types-comparison-2026']) {
    const p = j[slug]; if (!p) { console.log(l, slug, 'MISSING'); continue; }
    const c = p.content || '';
    const hasGuide = c.includes('food-packaging-printing-guide');
    const sents = c.split(/(?<=。)|(?<=\.\s)|(?<=<\/p>)/).filter(s =>
      /食品|food|食品|包裝|packaging|パッケージ/i.test(s) && !/href=|food-packaging-printing-guide/.test(s)
    );
    console.log(`\n[${l}|${slug}] len=${c.length} hasGuideLink=${hasGuide} cand=${sents.length}`);
    sents.slice(0, 2).forEach((s, i) => console.log(`  ${i + 1}.`, JSON.stringify(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110))));
  }
}
