// .hermes/logs/_check-key-overlap.mjs — 檢查各檔 SKU key 與 products.ts slug 的重疊度
import fs from 'node:fs';

/** 取 products.ts 的 94 個產品 slug */
const prodLines = fs.readFileSync('src/data/products.ts', 'utf8').split(/\r?\n/);
const prodSlugs = new Set();
prodLines.forEach((l) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) prodSlugs.add(m[1]);
});

function keysOf(file, re) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const keys = [];
  lines.forEach((l) => {
    const m = l.match(re);
    if (m) keys.push(m[1]);
  });
  return keys;
}

const targets = [
  ['src/data/sku-seo-data.ts', /^\s{2}"([a-z0-9][a-z0-9-]*)":\s*\{/],
  ['src/data/products-content.ts', /^\s{2}'?([a-z0-9][a-z0-9-]*)'?:\s*\{/],
];

for (const [f, re] of targets) {
  const keys = keysOf(f, re);
  const overlap = keys.filter((k) => prodSlugs.has(k));
  const orphan = keys.filter((k) => !prodSlugs.has(k));
  console.log(`[${f}]`);
  console.log(`  key 總數 ${keys.length} ｜ 與 products.ts 重疊 ${overlap.length} ｜ 孤兒 key ${orphan.length}`);
  if (orphan.length) {
    console.log(`  孤兒 key（無真值 → 掃描器會跳過）共 ${orphan.length} 個，前 15 個:`);
    console.log(`    ${orphan.slice(0, 15).join(', ')}`);
  }
  console.log('');
}
console.log(`products.ts 產品 slug 數: ${prodSlugs.size}`);
