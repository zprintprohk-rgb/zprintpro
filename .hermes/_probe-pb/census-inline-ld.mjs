// 只读普查: 全站 blog-data 内嵌 JSON-LD 分布 (B2 剩余批次范围)
import fs from 'fs';
const NEEDLE = '<script type="application/ld+json"';
const tally = {};
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const hits = [];
  for (const [slug, e] of Object.entries(d)) {
    const c = (e && e.content) || '';
    const n = (c.match(/<script type="application\/ld\+json"/g) || []).length;
    if (n) hits.push({ slug, n });
  }
  tally[loc] = hits;
  console.log(`\n${loc}: ${hits.length} 篇仍含内嵌 LD`);
  for (const h of hits) console.log(`   ${h.slug} ×${h.n}`);
}
// 跨 locale 并集 (B2 目标清单)
const all = new Set();
for (const loc of Object.keys(tally)) for (const h of tally[loc]) all.add(h.slug);
console.log(`\n=== B2 剩余目标 (跨 locale 并集, ${all.size} 篇) ===`);
for (const s of [...all].sort()) {
  const per = ['zh-hk', 'en', 'ja'].map(l => `${l}:${(tally[l].find(x => x.slug === s) || {}).n || 0}`).join(' / ');
  console.log(`   ${s}  (${per})`);
}
fs.writeFileSync('.hermes/reports/inline-ld-census-2026-09-19.json',
  JSON.stringify({ generated_at: new Date().toISOString(), perLocale: tally, union: [...all].sort() }, null, 1), 'utf8');
console.log('\n[证据留档] .hermes/reports/inline-ld-census-2026-09-19.json');
