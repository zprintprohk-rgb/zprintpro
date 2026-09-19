// 只读: 定位指定 slug 的内嵌 LD 位置 (行首 vs 中部)
import fs from 'fs';
const slug = process.argv[2] || 'poster-printing-guide';
const NEEDLE = '<script type="application/ld+json"';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const e = d[slug]; if (!e) continue;
  const c = e.content || '';
  const i = c.indexOf(NEEDLE);
  const all = (c.match(/application\/ld\+json/g) || []).length;
  console.log(`${loc}: content=${c.length} | 首个 LD 位置=${i} | LD 块数=${all}`);
  console.log(`   head: ${JSON.stringify(c.slice(0, 100))}`);
  if (i >= 0) console.log(`   ctx : ${JSON.stringify(c.slice(Math.max(0, i - 70), i + 80))}`);
}
