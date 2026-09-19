// moq10-classify-transparent-hits.mjs — 把「收費透明：100 張起印」35 處按 SKU 主題分類
import fs from 'fs';
const s = fs.readFileSync('src/data/sku-seo-data.ts', 'utf-8');
const lines = s.split('\n');
let cur = '?';
const buckets = { poster: [], other: [] };
lines.forEach((l, i) => {
  const m = l.match(/"title": "([^"]{0,70})/);
  if (m) cur = m[1];
  if (l.includes('收費透明：100 張起印')) {
    const isPoster = /海報|poster/i.test(cur);
    (isPoster ? buckets.poster : buckets.other).push(`L${i + 1} ${cur.slice(0, 56)}`);
  }
});
console.log(`POSTER 類 (應改為 1 張起印): ${buckets.poster.length}`);
buckets.poster.forEach((x) => console.log('  ' + x));
console.log(`\n其他類 (需逐類判斷): ${buckets.other.length}`);
buckets.other.slice(0, 20).forEach((x) => console.log('  ' + x));
