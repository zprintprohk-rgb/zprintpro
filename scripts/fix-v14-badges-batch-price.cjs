// fix-v14-badges-batch-price.cjs — v14 任务 1+2+3
const fs = require('fs');

// ====== TASK 1: QuoteCalculator 批量价 fix → 方案B (隐藏旧计算器) ======
// 17 个 price-table-backed SKU 已经有 v13 ReferencePriceBlock
// 对它们隐藏旧 QuoteCalculator 区块（避免 totalPrice = unitPrice × qty 的错误放大）

const PDP_PAGE = 'F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx';
let page = fs.readFileSync(PDP_PAGE, 'utf-8');

// Replace 3 locale badge texts
page = page.replace("'滿$500免運費'", "'順豐快遞 · 運費實報'");
page = page.replace("'即日交貨'", "'標準交期'");
page = page.replace("'Free intl. shipping'", "'SF Express · Freight collect'");
page = page.replace("'Same-day delivery'", "'Standard lead time'");
page = page.replace("'国際送料無料'", "'SF Express · 配送料実費'");
page = page.replace("'即日納品'", "'標準納期'");

// 17 SKU slugs that have v13 price tables
const TABLE_SKUS = [
  'gang-run-card-boxes','white-card-boxes','tuck-end-boxes','corrugated-boxes',
  'white-card-bags','waterproof-stickers','digital-stickers',
  'a5-flyers','a4-flyers','same-day-flyers','eco-flyers',
  'saddle-stitch-booklets','perfect-bound-books','exercise-books',
  'folded-leaflets','special-fold-leaflets','custom-flyers',
];

// Replace old QuoteCalculator + specifications heading for table-backed SKUs
// Wrap with condition to hide for 17 SKUs (they have v13 ReferencePriceBlock)
const OLD_BLOCK = `              {/* 报价计算器 (2026-07-13 v3: 单独渲染, 跟左 column 备注栏下面的
                  QuantityTierInteractive 通过 ProductQuoteProvider 共享 selectedQuantity) */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>
                <QuoteCalculator product={product} locale={locale} />
              </div>`;

const NEW_BLOCK = `              {/* v14: 报价计算器 — 对 price-table-backed SKU 隐藏 (v13 ReferencePriceBlock 已提供完整价格互动) */}
              {(() => {
                const HIDE_CALCULATOR_SKUS = new Set(${JSON.stringify(TABLE_SKUS)});
                if (!HIDE_CALCULATOR_SKUS.has(product.slug)) {
                  return (
                    <div className="mb-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>
                      <QuoteCalculator product={product} locale={locale} />
                    </div>
                  );
                }
                return null;
              })()}`;

page = page.replace(OLD_BLOCK, NEW_BLOCK);
fs.writeFileSync(PDP_PAGE, page, 'utf-8');
console.log('TASK 1+2: badges fixed + QuoteCalculator hidden for 17 table SKUs');

// ====== TASK 3: poster price_range ======
const PROD_PATH = 'F:/zprintpro-nextjs/src/data/products.ts';
let prod = fs.readFileSync(PROD_PATH, 'utf-8');

// a2-posters: price_range 填实价
const A2_OLD_PR = "price_range: 'Pending intuan calibration'"; // might not exist
// Find a2-posters block
const a2Idx = prod.indexOf("slug: 'a2-posters'");
if (a2Idx >= 0) {
  const a2Block = prod.slice(a2Idx, a2Idx + 1500);
  // Check if price_range already has a value
  const prMatch = a2Block.match(/price_range:\s*'([^']*)'/);
  if (prMatch && prMatch[1] === 'Pending intuan calibration') {
    prod = prod.replace("price_range: 'Pending intuan calibration',\n    basePrice: 0", "price_range: 'HK$129-703',\n    basePrice: 129");
    console.log('a2-posters price_range + basePrice fixed');
  } else if (prMatch) {
    console.log('a2-posters price_range already: ' + prMatch[1]);
  } else {
    console.log('a2-posters: no price_range found');
  }
}

// a1-posters: 标「喷绘另议」
const a1Idx = prod.indexOf("slug: 'a1-posters'");
if (a1Idx >= 0) {
  const a1Block = prod.slice(a1Idx, a1Idx + 1500);
  const prMatch = a1Block.match(/price_range:\s*'([^']*)'/);
  if (prMatch && prMatch[1] !== '噴繪另議 · 正式報價') {
    prod = prod.replace(`price_range: '${prMatch[1]}'`, "price_range: '噴繪另議 · 正式報價'");
    console.log('a1-posters price_range fixed');
  } else {
    console.log('a1-posters price_range: ' + (prMatch ? prMatch[1] : 'not found'));
  }
}

fs.writeFileSync(PROD_PATH, prod, 'utf-8');
console.log('TASK 3: posters price_range done');

// ====== Verify ======
const page2 = fs.readFileSync(PDP_PAGE, 'utf-8');
console.log('\n=== Verify ===');
console.log('Badge zh: ' + (page2.includes('順豐快遞 · 運費實報') ? 'OK' : 'FAIL'));
console.log('Badge en: ' + (page2.includes('SF Express · Freight collect') ? 'OK' : 'FAIL'));
console.log('Badge ja: ' + (page2.includes('SF Express · 配送料実費') ? 'OK' : 'FAIL'));
console.log('SameDay zh: ' + (page2.includes('標準交期') ? 'OK' : 'FAIL'));
console.log('Calc hidden: ' + (page2.includes('HIDE_CALCULATOR_SKUS') ? 'OK' : 'FAIL'));
console.log('Price tables: ' + (page2.includes('getPriceTableForSlug') ? 'OK' : 'FAIL'));
const prod2 = fs.readFileSync(PROD_PATH, 'utf-8');
console.log('a2-posters price_range: ' + (prod2.indexOf('HK$129-703') >= 0 ? 'OK' : 'FAIL'));
console.log('a1-posters price_range: ' + (prod2.indexOf('噴繪另議') >= 0 ? 'OK' : 'FAIL'));
