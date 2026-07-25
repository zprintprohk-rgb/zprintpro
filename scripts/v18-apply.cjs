// v18-apply.cjs — all 4 tasks in one pass
const fs = require('fs');

console.log('=== V18 Apply ===\n');

// ============================================================
// TASK 1: Unit-price-first anchor in PDP + pricing.ts
// ============================================================

// 1a. Add getUnitPriceAnchor to pricing.ts
let pricing = fs.readFileSync('F:/zprintpro-nextjs/src/lib/pricing.ts', 'utf-8');
const newFn = `
/** v18: Compute lowest per-unit price from price-data.generated.ts */
export function getUnitPriceAnchor(slug: string, locale: string) {
  try {
    const { PRICE_TABLE_MAP } = require('./price-data.generated');
    const d = PRICE_TABLE_MAP[slug];
    if (!d) return null;
    const cfg = d.configs[0];
    let best = { price: Infinity, qty: 0, batch: 0 };
    cfg.tiers.forEach(t => {
      const p = locale === 'ja' ? t.priceJPY : locale === 'en' ? t.priceUSD : t.priceHKD;
      if (p / t.qty < best.price) best = { price: p / t.qty, qty: t.qty, batch: p };
    });
    const sym = locale === 'ja' ? '\u00a5' : locale === 'en' ? '\u0024' : 'HK$';
    const fmt = best.price < 1 ? best.price.toFixed(2) : best.price < 10 ? best.price.toFixed(1) : Math.round(best.price).toLocaleString();
    const sheets = ['a2-posters','a1-posters','a4-flyers','a5-flyers','folded-leaflets','same-day-flyers','eco-flyers'];
    const books = ['saddle-stitch-booklets','perfect-bound-books','hardcover-books','exercise-books','catalog-printing','spiral-notebooks'];
    const uw = sheets.includes(slug) ? 'x' : books.includes(slug) ? 'per book' : 'per pc';
    return { price: best.price, qty: best.qty, batchPrice: best.batch, symbol: sym, display: sym + fmt, unitLabel: uw };
  } catch { return null; }
}
`;
pricing = pricing.replace('export function convertPriceRangeString', newFn + '\nexport function convertPriceRangeString');
fs.writeFileSync('F:/zprintpro-nextjs/src/lib/pricing.ts', pricing, 'utf-8');
console.log('T1a: getUnitPriceAnchor added to pricing.ts');

// 1b. Update PDP page — unit-price-first display
let page = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', 'utf-8');

// Add import
page = page.replace(
  "import { convertPriceRangeString, convertToFromPrice } from '@/lib/pricing';",
  "import { convertPriceRangeString, convertToFromPrice, getUnitPriceAnchor } from '@/lib/pricing';"
);

// Replace RushDeliveryBadge condition + price display block
const oldBlock = `              {['flyers', 'posters', 'stickers', 'business-cards', 'books', 'banners'].includes(product.category_slug) && (
                <RushDeliveryBadge locale={locale} />
              )}
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>
              
              {/* 价格显示 — 去色块简洁风格 */}
              <div className="mb-5">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                    {convertToFromPrice(product.price_range, locale, product.category_slug, product.slug)}
                  </span>
                  <span className="text-sm text-gray-400">
                    {locale === 'zh-hk' ? '起' : locale === 'en' ? 'From' : '〜'}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">
                    {locale === 'zh-hk' ? \`完整價格 \${product.price_range}\` : locale === 'en' ? \`Full price: \${convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug)}\` : \`価格 \${convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug)}\`}
                  </span>
                </div>
                {locale !== 'zh-hk' && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      {locale === 'en' ? 'Free International Shipping' : 'SF Express \u00b7 配送料実費'}
                    </span>
                    <span className="text-xs text-gray-400">{locale === 'en' ? 'DHL/FedEx 3-5 days to USA, 2-4 days to Japan' : 'DHL/FedEx \u30a2\u30e1\u30ea\u30ab3-5\u65e5\u3001\u65e5\u672c2-4\u65e5'}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-5 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-base text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {t.sameDay}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-base text-gray-600">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {t.quality}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-base text-gray-600">
                    <svg className="w-5 h-5 text-[#2873F5]" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg>
                    {t.freeShipping}
                  </span>
                </div>
              </div>`;

const newBlock = `              {['flyers', 'posters', 'stickers'].includes(product.category_slug) && (
                /* v18: only digital-fast categories keep rush badge with conditional text */
                <RushDeliveryBadge locale={locale} />
              )}
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>
              
              {/* v18: 单价优先价格锚 */}
              {(() => {
                const ua = getUnitPriceAnchor(product.slug, locale);
                if (ua) {
                  return (
                    <div className="mb-5">
                      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                        <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                          {ua.display}
                        </span>
                        <span className="text-lg font-semibold text-gray-700">
                          {ua.unitLabel} {locale === 'zh-hk' ? '起' : locale === 'en' ? 'from' : '\u304b\u3089'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {ua.qty.toLocaleString()} {locale==='ja'?'個':'個'}起批 \u00b7 {locale==='ja'?'\u30ed\u30c3\u30c8\u00a5':'整批 HK\u0024'}{ua.batchPrice.toLocaleString()} {locale==='zh-hk'?'起':locale==='en'?'from':'\u304b\u3089'}
                      </p>
                    </div>
                  );
                }
                return (
                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                        {convertToFromPrice(product.price_range, locale, product.category_slug, product.slug)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {locale === 'zh-hk' ? '起' : locale === 'en' ? 'From' : '〜'}
                      </span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex flex-wrap gap-5 mt-3">
                <span className="inline-flex items-center gap-1.5 text-base text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  {t.sameDay}
                </span>
                <span className="inline-flex items-center gap-1.5 text-base text-gray-600">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  {t.quality}
                </span>
                <span className="inline-flex items-center gap-1.5 text-base text-gray-600">
                  <svg className="w-5 h-5 text-[#2873F5]" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg>
                  {t.freeShipping}
                </span>
              </div>`;

page = page.replace(oldBlock, newBlock);
fs.writeFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', page, 'utf-8');
console.log('T1b: PDP unit-price anchor replaced');

// ============================================================
// VERIFY BUILD
// ============================================================
console.log('\n=== Changes applied. Run build to verify. ===');
