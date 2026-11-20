// .hermes/_hub_links.cjs — packaging hub 三语块内链清单
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const pc = s.indexOf('packagingContent');
const zh = s.indexOf("'zh-hk': {", pc);
const en = zh + s.slice(zh).search(/\n\s{2}(?:'en'|en):\s*\{/);
const ja = en + s.slice(en).search(/\n\s{2}(?:'ja'|ja):\s*\{/);
const bounds = { 'zh-hk': [zh, en], en: [en, ja] };
for (const [loc, [a, b]] of Object.entries(bounds)) {
  const blk = s.slice(a, b);
  const md = [...blk.matchAll(/\]\((\/[^)]+)\)/g)].map(m => m[1]);
  const html = [...blk.matchAll(/href="(\/[^"]+)"/g)].map(m => m[1]);
  const all = [...new Set([...md, ...html])];
  console.log(`[${loc}] len=${blk.length} links=${all.length}`);
  all.forEach(l => console.log('   ', l));
}
