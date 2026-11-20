'use strict';
/**
 * 全量掃描 price-data.generated.ts 跨語系污染 (行掃描版, K3 高優支線 1)
 *   A) en / ja 鍵位值含漢字 → 語言污染 (本次事故類型)
 *   B) zh-hk 鍵位值含簡體字
 *   C) ja 鍵位有漢字但零假名 → 疑似直貼中文
 * 逐 SKU / 逐欄位列清單 (K3: 絕不只修 perfect-bound-books)
 */
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs\\src\\lib\\price-data.generated.ts';
const lines = fs.readFileSync(P, 'utf8').split('\n');

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;
const KANA = /[\u3040-\u30ff]/;
const SIMP = /[们个为无与书车门问说时东华产国学体线标签页单价格质简边发对开关电话后从这来让给还两么义应该当经历众]/;

const colA = [], colB = [], colC = [];
const slugRe = /^\s{2}'([^']+)':\s*\{\s*$/;
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;
const blockRe = /^\s*"(productName|label)":\s*\{\s*$/;

let slug = null, inBlock = null, fieldCount = 0, cfgIdx = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const s = line.match(slugRe);
  if (s) { slug = s[1]; inBlock = null; cfgIdx = 0; continue; }
  const b = line.match(blockRe);
  if (b && slug) { inBlock = b[1]; continue; }
  if (inBlock && /^\s*\},?\s*$/.test(line)) { inBlock = null; continue; }
  if (!inBlock || !slug) continue;
  const m = line.match(locRe);
  if (!m) continue;
  const loc = m[1];
  const val = m[2].replace(/\\"/g, '"').replace(/\\n/g, ' ');
  if (!val.trim()) continue;
  fieldCount++;
  const path = inBlock + '@L' + (i + 1);
  const hasCJK = CJK.test(val), hasKana = KANA.test(val);
  if ((loc === 'en' || loc === 'ja') && hasCJK) colA.push({ slug, loc, path, val });
  if (loc === 'zh-hk' && SIMP.test(val)) colB.push({ slug, loc, path, val });
  if (loc === 'ja' && hasCJK && !hasKana && val.length >= 4) colC.push({ slug, loc, path, val });
}

const uniqA = [...new Set(colA.map(o => o.slug))];
const uniqB = [...new Set(colB.map(o => o.slug))];
console.log('掃描欄位數: ' + fieldCount + '\n');

console.log('=== A) en / ja 鍵位含漢字 (語言污染) ===');
console.log('  命中欄位: ' + colA.length + ' | 受影響 SKU: ' + uniqA.length + ' 個');
const bySlug = {};
for (const o of colA) bySlug[o.slug] = (bySlug[o.slug] || 0) + 1;
Object.entries(bySlug).sort((a, b) => b[1] - a[1]).forEach(([s, n]) => console.log('   ' + String(n).padStart(3) + '  ' + s));
console.log('\n  前 14 條明細:');
colA.slice(0, 14).forEach(o => console.log('   [' + o.loc + '] ' + o.slug + ' ' + o.path + ' -> ' + o.val.slice(0, 70)));

console.log('\n=== B) zh-hk 鍵位含簡體字 ===');
console.log('  命中欄位: ' + colB.length + ' | 受影響 SKU: ' + uniqB.length);
colB.slice(0, 12).forEach(o => console.log('   ' + o.slug + ' ' + o.path + ' -> ' + o.val.slice(0, 70)));

console.log('\n=== C) ja 鍵位有漢字但零假名 (疑似直貼中文) ===');
console.log('  命中欄位: ' + colC.length);
colC.slice(0, 12).forEach(o => console.log('   ' + o.slug + ' ' + o.path + ' -> ' + o.val.slice(0, 70)));

fs.writeFileSync('F:\\zprintpro-nextjs\\.hermes\\_probe-pb\\price-data-pollution-report.json',
  JSON.stringify({ fieldCount, colA, colB, colC, uniqA, uniqB }, null, 2), 'utf8');
console.log('\n明細已寫: .hermes/_probe-pb/price-data-pollution-report.json');
