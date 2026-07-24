const fs = require('fs');

console.log('=== V14: Single-pass fix for all 3 tasks ===\n');

// ===== 0. Regenerate price-data with posters (ESM, run first) =====
// Already done - price-data.generated.ts has 18 slugs with posters

// ===== 1. Fix products.ts: a2-posters price_range + a1-posters =====
let prod = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf-8');

// a2-posters: find the product object and add price_range
// Structure: seoImages { ... }, <--- we need to add between seoImages closing } and variables: {
// Actually between the `seoImages` closing `},` and `variables: {`

// Find a2-posters block
const a2Slug = prod.indexOf("slug: 'a2-posters'");
const a2Next = prod.indexOf("id: 'PO-002'", a2Slug);
if (a2Slug < 0 || a2Next < 0) { console.log('FAIL: a2 boundary not found'); process.exit(1); }

const a2Block = prod.slice(a2Slug, a2Next);
// Find the `},` right before `variables:`
const varsIdx = a2Block.indexOf('  variables:');
if (varsIdx < 0) { console.log('FAIL: variables not found in a2'); process.exit(1); }

// Find the previous `},` (closing of seoImages or turnaround/minQuantity)
const beforeVars = a2Block.slice(0, varsIdx);
const lastCommaBrace = beforeVars.lastIndexOf('},\n');
const insertPos = a2Slug + lastCommaBrace + 3; // after `},\n`

// The old block should NOT have price_range already - check
const hasPR = a2Block.indexOf("price_range:") >= 0;
if (hasPR) {
  console.log('a2-posters already has price_range, updating...');
  // Replace existing price_range
  const prIdx = a2Block.indexOf("price_range:");
  const prEnd = a2Block.indexOf(",", prIdx);
  const oldPR = a2Block.slice(prIdx, prEnd + 1);
  prod = prod.replace(oldPR, "price_range: 'HK$129-703',");
  // Also update basePrice
  const bpIdx = a2Block.indexOf("basePrice:");
  const bpEnd = a2Block.indexOf(",", bpIdx);
  const oldBP = a2Block.slice(bpIdx, bpEnd + 1);
  prod = prod.replace(oldBP, "basePrice: 129,");
  console.log('  Updated price_range + basePrice');
} else {
  // Insert new
  const before = prod.slice(0, insertPos);
  const after = prod.slice(insertPos);
  prod = before + "\n    price_range: 'HK$129-703',\n    basePrice: 129,\n    basePrice_en: 23,\n    basePrice_ja: 2600,\n    weight_score: 85,\n    isHot: true,\n    isNew: false,\n    minQuantity: 10," + after;
  console.log('a2-posters: price_range inserted');
}

// a1-posters: find and update price_range
const a1Slug = prod.indexOf("slug: 'a1-posters'");
const a1Next = prod.indexOf("id: 'PO-003'", a1Slug);
const a1Block = prod.slice(a1Slug, a1Next > 0 ? a1Next : a1Slug + 3000);
const a1PR = a1Block.indexOf("price_range:");
if (a1PR > 0) {
  const a1PRend = a1Block.indexOf(",", a1PR);
  const oldPR = a1Block.slice(a1PR, a1PRend + 1);
  prod = prod.replace(oldPR, "price_range: '噴繪另議 · 正式報價',");
  console.log('a1-posters: price_range updated');
}

fs.writeFileSync('F:/zprintpro-nextjs/src/data/products.ts', prod, 'utf-8');

// ===== 2. Fix PDP page: badges + QuoteCalculator scheme A =====
let page = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', 'utf-8');

// Fix badge texts (3 locales)
page = page.replace("'滿$500免運費'", "'順豐快遞 · 運費實報'");
page = page.replace("'即日交貨'", "'標準交期'");
page = page.replace("'Free intl. shipping'", "'SF Express · Freight collect'");
page = page.replace("'Same-day delivery'", "'Standard lead time'");
page = page.replace("'国際送料無料'", "'SF Express · 配送料実費'");
page = page.replace("'即日納品'", "'標準納期'");

// Insert import for findClosestTierBatch
const importIdx = page.indexOf("import { getPriceTableForSlug }");
if (importIdx > 0) {
  const importLineEnd = page.indexOf("\n", importIdx);
  const oldImport = page.slice(importIdx, importLineEnd);
  page = page.replace(oldImport, "import { getPriceTableForSlug, findClosestTierBatch } from '@/lib/price-injector';");
}

// Replace QuoteCalculator for 17 table-backed SKUs
const oldCalc = `              {/* 报价计算器 (2026-07-13 v3: 单独渲染, 跟左 column 备注栏下面的
                  QuantityTierInteractive 通过 ProductQuoteProvider 共享 selectedQuantity) */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>
                <QuoteCalculator product={product} locale={locale} />
              </div>`;

const newCalc = `              {/* v14: 17 price-table-backed SKU 用 findClosestTierBatch 取批量价
                  其余 SKU 仍走原 QuoteCalculator */}
              {(() => {
                const batchPrice = findClosestTierBatch(product.slug, product.minQuantity || 500);
                if (batchPrice) {
                  // table-backed SKU: just show the batch price from ReferencePriceBlock below
                  return null;
                }
                return (
                  <div className="mb-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>
                    <QuoteCalculator product={product} locale={locale} />
                  </div>
                );
              })()}`;

if (page.includes(oldCalc)) {
  page = page.replace(oldCalc, newCalc);
  console.log('PDP: QuotesCalculator hidden for table-backed SKUs');
}

fs.writeFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', page, 'utf-8');

// ===== 3. Fix price-injector.ts to export findClosestTierBatch =====
let injector = fs.readFileSync('F:/zprintpro-nextjs/src/lib/price-injector.ts', 'utf-8');
if (!injector.includes('findClosestTierBatch')) {
  injector = injector.replace('export { getPriceTableForSlug }', 'export { getPriceTableForSlug, findClosestTierBatch }');
  fs.writeFileSync('F:/zprintpro-nextjs/src/lib/price-injector.ts', injector, 'utf-8');
}

console.log('\n=== Done ===');
