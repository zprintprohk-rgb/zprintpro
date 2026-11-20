'use strict';
/**
 * 只讀掃描: products.ts 規格三欄 (material/printMethod/finishing) 的中文-only 規模
 * 目的 (per 執行層建議 ②): 先定規模再派活, 不憑估
 */
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs\\src\\data\\products.ts';
const s = fs.readFileSync(P, 'utf8');
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;

// 以 slug 為錨, 逐 SKU 區塊
const parts = s.split(/\n  \{\n/);
const fields = ['material', 'printMethod', 'finishing'];
let withSpecs = 0, cnOnly = 0, fieldCount = 0, cnField = 0;
const cnSlugs = [];
const uniqVals = new Set();

for (const b of parts) {
  const slug = (b.match(/slug:\s*'([^']+)'/) || [])[1];
  if (!slug) continue;
  let has = false, anyCn = false;
  for (const f of fields) {
    const re = new RegExp('(?:^|[\\s,{])' + f + ":\\s*(['\"`])([\\s\\S]*?)\\1", 'm');
    const m = b.match(re);
    if (!m) continue;
    has = true; fieldCount++;
    if (CJK.test(m[2])) { cnField++; anyCn = true; uniqVals.add(m[2].trim()); }
  }
  if (has) { withSpecs++; if (anyCn) { cnOnly++; cnSlugs.push(slug); } }
}

console.log('=== products.ts 規格三欄中文-only 規模 (只讀) ===');
console.log('  SKU 區塊數            : ' + parts.length);
console.log('  含規格三欄的 SKU      : ' + withSpecs);
console.log('  規格欄位總數          : ' + fieldCount + '  其中含中文: ' + cnField);
console.log('  ★ 有中文規格值的 SKU  : ' + cnOnly);
console.log('  ★ 唯一中文規格字串數  : ' + uniqVals.size + '  (翻譯工作量基準)');
console.log('\n  樣本 SKU (前 12): ' + cnSlugs.slice(0, 12).join(', '));
console.log('\n  唯一字串樣本 (前 8):');
[...uniqVals].slice(0, 8).forEach((v, i) => console.log('    ' + (i + 1) + '. ' + v.slice(0, 88)));
