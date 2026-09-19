// moq10-runtime-check.ts — 以 npx tsx 實跑真實模組, 驗證展示口徑與價格函式
// 執行: npx tsx scripts/moq10-runtime-check.ts
import {
  isPaperGoodsSmallBatch,
  getDisplayMinOrderV2,
  PAPER_GOODS_MOQ,
  PAPER_GOODS_MOQ_NOTE,
  PAPER_GOODS_MOQ_AEO,
} from '../src/data/print-method-policy';
import { getPriceTableForSlug } from '../src/lib/price-injector';
import { getPrintMethodAdvice } from '../src/data/print-method-policy';

let pass = 0, fail = 0;
const ok = (m: string) => { pass++; console.log('  ✓ ' + m); };
const bad = (m: string) => { fail++; console.log('  ✗ ' + m); };

console.log('A. 展示口徑 getDisplayMinOrderV2');
/* ⚠ 每個 case 必須傳該 SKU **真實** 的 minQuantity (由 products.ts 讀),
   否則測唔到「非名單 SKU 原樣回傳」嘅行為 (首版全部傳 100 ⇒ 假失敗) */
import { products } from '../src/data/products';
const realMq = new Map(products.map((p) => [p.slug, p.minQuantity]));
const cases: [string, string][] = [
  ['a5-flyers', '10'],
  ['die-cut-stickers', '10'],
  ['premium-greeting-cards', '10'],
  ['fluorescent-stickers', '10'],
  ['catalog-printing', '1 本起印（數碼）· 100 本以上柯式更經濟'],
  ['saddle-stitch-booklets', '1 本起印（數碼）· 100 本以上柯式更經濟'],
  ['gang-run-card-boxes', '500'],
  ['wall-calendars', '1000'],
  // 2026-09-19 P0-2: A1 海報已獨立為 minQuantity=1 (K3 路線圖), 故期望值由 '100' 改為 '1'
  ['a1-posters', '1'],
  ['white-card-bags', '100'],
];
for (const [slug, want] of cases) {
  const mq = realMq.get(slug);
  if (mq === undefined) { bad(`${slug}: 不在 products.ts`); continue; }
  const got = getDisplayMinOrderV2('zh-hk', slug, mq);
  if (got === want) ok(`${slug} (minQuantity=${mq}) → "${got}"`);
  else bad(`${slug} (minQuantity=${mq}) → "${got}" (期望 "${want}")`);
}

console.log('\nB. isPaperGoodsSmallBatch 邊界');
for (const [slug, want] of [
  ['a5-flyers', true], ['foil-stickers', true], ['die-cut-stickers', true],
  ['saddle-stitch-booklets', false], ['a1-posters', false], ['gang-run-card-boxes', false],
] as [string, boolean][]) {
  const got = isPaperGoodsSmallBatch(slug);
  if (got === want) ok(`${slug} = ${got}`);
  else bad(`${slug} = ${got} (期望 ${want})`);
}

console.log('\nC. 三語文案齊備且含 10 起印口徑');
/* 檢查「起印量宣稱」而唔係整個字串有冇 "10": 標題問題句本身唔含數字係正常嘅 */
const CLAIM = /10\s*(張|枚|pieces|pcs)/;
for (const loc of ['zh-hk', 'en', 'ja'] as const) {
  const note = PAPER_GOODS_MOQ_NOTE[loc];
  const aeo = PAPER_GOODS_MOQ_AEO[loc];
  const problems: string[] = [];
  if (!note) problems.push('note 空');
  if (!aeo.q) problems.push('q 空');
  if (!aeo.a) problems.push('a 空');
  if (!CLAIM.test(note)) problems.push('note 未含 10 起印宣稱');
  if (!CLAIM.test(aeo.a)) problems.push('a 未含 10 起印宣稱');
  if (problems.length) bad(`${loc}: ${problems.join(' / ')}`);
  else ok(`${loc}: note + AEO 齊備, 且明示 10 起印 (問題句為提問不計)`);
}
if (PAPER_GOODS_MOQ === 10) ok('PAPER_GOODS_MOQ = 10');
else bad(`PAPER_GOODS_MOQ = ${PAPER_GOODS_MOQ}`);

console.log('\nD. price table 渲染資料 (runtime)');
for (const slug of ['a5-flyers', 'a4-flyers', 'waterproof-stickers', 'folded-leaflets', 'custom-flyers', 'same-day-flyers', 'eco-flyers']) {
  const d = getPriceTableForSlug(slug);
  if (!d) { bad(`${slug}: 無 price table`); continue; }
  const t = d.configs[0].tiers;
  const min = Math.min(...t.map((x) => x.qty));
  const first = t.find((x) => x.qty === 10);
  if (min === 10 && first) ok(`${slug}: 首檔 ${min} 張 · 整批 HK$${first.priceHKD}`);
  else bad(`${slug}: 首檔 ${min} 張 (期望 10)`);
}
for (const slug of ['die-cut-stickers', 'small-batch-stickers', 'transparent-stickers']) {
  const d = getPriceTableForSlug(slug);
  if (!d) ok(`${slug}: 無 price table → 走 QuoteCalculator (預期)`);
  else bad(`${slug}: 竟然有 price table`);
}

console.log('\nE. P2-6 傳統膠印軟分流 (邊界)');
{
  const cases: [number, 'digital' | 'offset'][] = [[99, 'digital'], [100, 'digital'], [199, 'digital'], [200, 'offset']];
  for (const [q, want] of cases) {
    const a = getPrintMethodAdvice('a5-flyers', q);
    if (a?.recommended === want) ok(`a5-flyers qty ${q} → ${a.recommended}`);
    else bad(`a5-flyers qty ${q} → ${a ? a.recommended : 'null'} (期望 ${want})`);
  }
  if (getPrintMethodAdvice('white-card-bags', 500) === null) ok('非適用品類 → null (不顯示建議)');
  else bad('非適用品類竟然有建議');
}

console.log('\nF. P2-7 書刊 10-99 本價階 (price table runtime)');
for (const slug of ['saddle-stitch-booklets', 'perfect-bound-books', 'exercise-books']) {
  const d = getPriceTableForSlug(slug);
  if (!d) { bad(`${slug}: 無 price table`); continue; }
  const t = d.configs[0].tiers;
  const t10 = t.find((x) => x.qty === 10);
  const anchor = [...t].filter((x) => x.qty > 99).sort((a, b) => a.qty - b.qty)[0];
  if (!t10) { bad(`${slug}: 缺 10 本檔`); continue; }
  if (anchor && t10.priceHKD > anchor.priceHKD) bad(`${slug}: 10本 HK$${t10.priceHKD} > anchor HK$${anchor.priceHKD} (倒掛)`);
  else ok(`${slug}: 10本 HK$${t10.priceHKD} ≤ anchor ${anchor ? anchor.qty + '本 HK$' + anchor.priceHKD : 'n/a'}`);
}

console.log(`\n結果: ${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
