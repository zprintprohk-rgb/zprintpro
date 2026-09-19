// .hermes/logs/_locate-sku-seo-art.mjs — 定位 sku-seo-data 中 art-posters 的 100張起印
import fs from 'node:fs';

const lines = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8').split(/\r?\n/);

console.log('=== 含「藝術海報」且含「起印」的行 ===');
lines.forEach((l, i) => {
  if (/藝術海報/.test(l) && /起印|起訂/.test(l)) {
    console.log(`  L${i + 1} (len=${l.length}): ${l.trim().slice(0, 220)}`);
  }
});

console.log('\n=== 該檔的結構（前 30 行）===');
lines.slice(0, 30).forEach((l, i) => console.log(`  L${i + 1}: ${l.slice(0, 130)}`));

console.log('\n=== 掃描器是否會掃此檔？檢查 SKU 歸屬關鍵字 ===');
const hasSlug = lines.filter((l) => /slug:\s*'/.test(l)).length;
const hasArtSlug = lines.some((l) => /slug:\s*'art-posters'/.test(l));
console.log(`  含 slug: ' 的行數: ${hasSlug}`);
console.log(`  含 slug: 'art-posters' : ${hasArtSlug}`);
