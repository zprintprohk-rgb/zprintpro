'use strict';
/** Step B-6: 量化两档内部口径文案的完整范围 (不只 guard 命中的那 7 处) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

function scanFile(rel, needles) {
  const p = path.join(REPO, rel);
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  console.log(`\n########## ${rel} (${lines.length} 行) ##########`);
  const tally = {};
  lines.forEach((L, i) => {
    needles.forEach(nd => {
      if (L.includes(nd)) {
        tally[nd] = (tally[nd] || 0) + 1;
        if (tally[nd] <= 3) console.log(`  L${i + 1} 「${nd}」: ${JSON.stringify(L.slice(Math.max(0, L.indexOf(nd) - 90), L.indexOf(nd) + 110))}`);
      }
    });
  });
  console.log('  小计:');
  Object.entries(tally).forEach(([k, v]) => console.log(`    ${k.padEnd(18)} ${v} 行`));
  return tally;
}

console.log('=== A. products-content.ts 内部定价口径词全量 ===');
scanFile('src/data/products-content.ts', [
  '校準報價', '校準來源', '真實校準', '参考價格 × 1.3', '參考實詢', '2026-07-18', '合理利潤', 'RMB→HKD',
]);

console.log('\n=== B. category-seo-content.ts 中的 K3 代号 ===');
scanFile('src/data/category-seo-content.ts', ['K3 真實身份', 'K3 ≤', 'K3']);

console.log('\n=== C. 同族代号全站排查 (K3 之外的内部代号出现在客户可见值) ===');
for (const rel of ['src/data/category-seo-content.ts', 'src/data/products-content.ts', 'src/data/buying-guides.ts']) {
  const p = path.join(REPO, rel);
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  const pat = /\bK[1-9]\b|008 案例|M3\b|autoclaw|hermes/i;
  lines.forEach((L, i) => {
    const t = L.trim();
    if (t.startsWith('//') || t.startsWith('*')) return;   // 注释豁免
    if (pat.test(L)) console.log(`  ${rel}:L${i + 1}  ${JSON.stringify(L.trim().slice(0, 190))}`);
  });
}
