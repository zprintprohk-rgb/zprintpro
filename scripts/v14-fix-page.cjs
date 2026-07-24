const fs = require('fs');
let page = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', 'utf-8');

// 1. Fix import
page = page.replace(
  "import { getPriceTableForSlug } from '@/lib/price-injector';",
  "import { getPriceTableForSlug, findClosestTierBatch } from '@/lib/price-injector';"
);
console.log('Import: ' + page.includes('findClosestTierBatch'));

// 2. Find the QuoteCalculator block and replace
const oldBlock = '              {/* 报价计算器 (2026-07-13 v3: 单独渲染, 跟左 column 备注栏下面的\n                  QuantityTierInteractive 通过 ProductQuoteProvider 共享 selectedQuantity) */}\n              <div className="mb-5">\n                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>\n                <QuoteCalculator product={product} locale={locale} />\n              </div>';

const newBlock = '              {/* v14 方案A: 17 price-table-backed SKU 由 v13 ReferencePriceBlock 接管价格展示;\n                  其余无表 SKU 仍走原 QuoteCalculator */}\n              {(() => {\n                const hasTable = !!findClosestTierBatch(product.slug, product.minQuantity || 500);\n                if (!hasTable) {\n                  return (\n                    <div className="mb-5">\n                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>\n                      <QuoteCalculator product={product} locale={locale} />\n                    </div>\n                  );\n                }\n                return null;\n              })()}';

if (page.includes(oldBlock)) {
  page = page.replace(oldBlock, newBlock);
  console.log('Calc block: replaced');
} else {
  console.log('Calc block: NOT FOUND');
}
fs.writeFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', page, 'utf-8');
console.log('Done');
