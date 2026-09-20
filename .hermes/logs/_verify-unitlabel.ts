// .hermes/logs/_verify-unitlabel.ts — 驗證 unitLabel 接線（5 個 menus SKU × 3 語系）
import { getDisplayMinOrderV2, getUnitLabelFor, composeMoqLabel } from '../../src/data/print-method-policy';

const CASES: [string, number, string][] = [
  ['pvc-menus', 10, '張'],
  ['laminated-menus', 10, '份'],
  ['hardcover-menus', 10, '本'],
  ['drink-menus', 10, '份'],
  ['disposable-menus', 100, '份'],
];

const LOCALES = ['zh-hk', 'en', 'ja'] as const;
let pass = 0;
let fail = 0;

console.log('=== unitLabel 接線驗證 ===\n');
for (const [slug, mq, expectZh] of CASES) {
  console.log(`[${slug}] minQuantity=${mq} 期望 zh 單位=${expectZh}`);
  const zhUnit = getUnitLabelFor('zh-hk', slug);
  if (zhUnit === expectZh) pass++;
  else {
    fail++;
    console.log(`  🔴 zh 單位 ${zhUnit} ≠ ${expectZh}`);
  }
  for (const loc of LOCALES) {
    const label = getDisplayMinOrderV2(loc, slug, mq);
    console.log(`  ${loc.padEnd(6)} → 「${label}」`);
    if (!label.includes(String(mq))) {
      fail++;
      console.log(`     🔴 不含數量 ${mq}`);
    } else pass++;
  }
  console.log('');
}

console.log('=== 向後兼容：未設 unitLabel 的 SKU 行為不變 ===');
for (const slug of ['a5-flyers', 'waterproof-stickers', 'certificates']) {
  const label = getDisplayMinOrderV2('zh-hk', slug, 10);
  console.log(`  [${slug}] composeMoqLabel = ${composeMoqLabel('zh-hk', slug, 10)} ｜ getDisplayMinOrderV2 = 「${label}」`);
  const unit = getUnitLabelFor('zh-hk', slug);
  if (unit === null) pass++;
  else {
    fail++;
    console.log(`     🔴 未設 unitLabel 卻回傳 ${unit}`);
  }
}

console.log(`\n結果: PASS ${pass} / FAIL ${fail}`);
process.exit(fail === 0 ? 0 : 1);
