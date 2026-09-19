// .hermes/logs/_classify-drifts.mjs — 用既有的 classifyMoqString() 對 272 條漂移分類
import fs from 'node:fs';

const j = JSON.parse(fs.readFileSync('.hermes/logs/moq-scan-latest.json', 'utf8'));
console.log(`總漂移 ${j.drift}\n`);

/**
 * 分類啟發式（對應 print-method-policy.ts 的 classifyMoqString 語義）：
 *   industry_fact  = 行業事實陳述（「一般」「傳統」「普遍」「市場」「同業」等主語）
 *   price_tier     = 價格承諾綁數量檔（同行含 HK$/US$/¥ 或「/張」「/個」單價）
 *   moq_display    = 我方起印量門檻（應對齊真值）
 */
const INDUSTRY_SIGNAL = /(一般|傳統|普遍|市面|業界|通常|慣例|行業|市場(?:上|零售)|同業|多く|一般的|typically|generally|standard industry)/i;
const PRICE_SIGNAL = /(HK\$|US\$|NT\$|¥|＄|\/\s*(?:張|個|本|枚|pcs|pc|sheet|copy))/i;

const buckets = { industry_fact: [], price_tier: [], moq_display: [], other: [] };
for (const h of j.findings) {
  const t = h.text;
  let kind = 'other';
  if (INDUSTRY_SIGNAL.test(t)) kind = 'industry_fact';
  else if (PRICE_SIGNAL.test(t)) kind = 'price_tier';
  else kind = 'moq_display';
  buckets[kind].push(h);
}

for (const [k, arr] of Object.entries(buckets)) {
  console.log(`══════ ${k}: ${arr.length} 條 ══════`);
  for (const h of arr.slice(0, 4)) {
    console.log(`  [${h.slug}] ${h.file.split('/').pop()}:${h.line} found=${h.found}/truth=${h.truth}`);
    console.log(`     ${h.text.slice(0, 135)}`);
  }
  console.log('');
}

console.log('=== 建議處置 ===');
console.log(`  industry_fact ${buckets.industry_fact.length} 條 → 保留（行業事實陳述，非我方報價）`);
console.log(`  price_tier   ${buckets.price_tier.length} 條 → 需人工核對價格檔位（不可機械改數字）`);
console.log(`  moq_display  ${buckets.moq_display.length} 條 → 應對齊真值（可批量修正）`);
console.log(`  other        ${buckets.other.length} 條 → 逐一判定`);
