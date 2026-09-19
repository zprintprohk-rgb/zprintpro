// .hermes/logs/_check-schema-shapes.mjs — 檢查各掃描目標的 SKU key 格式（找出「整檔跳過」盲區）
import fs from 'node:fs';

const FILES = [
  'src/data/products.ts',
  'src/data/sku-seo-data.ts',
  'src/data/products-content.ts',
  'src/lib/seo.ts',
  'src/data/category-seo-content.ts',
];

for (const f of FILES) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split(/\r?\n/);
  const slugStyle = lines.filter((l) => /^\s{4}slug:\s*'/.test(l)).length;
  const jsonKeyStyle = lines.filter((l) => /^\s{2}"[a-z0-9-]+":\s*\{/.test(l)).length;
  const recordKeyStyle = lines.filter((l) => /^\s{2}'?[a-z0-9-]+'?:\s*\{/.test(l)).length;
  const moqHits = (src.match(/\d+\s*[張個本份枚]\s*起(?:印|訂|から)?/g) || []).length;

  let verdict = '✓ 可掃（slug 風格）';
  if (slugStyle === 0 && jsonKeyStyle > 0) verdict = '🔴 **整檔跳過**（JSON key 風格，掃描器認不出 SKU）';
  else if (slugStyle === 0 && recordKeyStyle > 0) verdict = '⚠️ 無 slug 風格（可能整檔跳過）';
  else if (slugStyle > 0) verdict = `✓ 含 ${slugStyle} 個 slug 行`;

  console.log(`[${f}]`);
  console.log(`   slug 風格 ${slugStyle} ｜ JSON key 風格 ${jsonKeyStyle} ｜ record key 風格 ${recordKeyStyle}`);
  console.log(`   MOQ 樣式總數 ${moqHits}`);
  console.log(`   → ${verdict}\n`);
}
