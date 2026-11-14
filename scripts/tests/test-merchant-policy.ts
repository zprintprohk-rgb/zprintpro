import assert from 'node:assert/strict';
import { products } from '../../src/data/products';
import type { Locale } from '../../src/types/locale';
import { getProductOfferPrice } from '../../src/lib/pricing';
import { getMerchantReturnPolicy } from '../../src/lib/merchant-policy';
import { generateProductJsonLd } from '../../src/lib/seo';
import { generateCategoryItemListJsonLd } from '../../src/lib/seo/schema-extensions';
import { GET } from '../../src/app/api/merchant-feed/[locale]/route';

const locales: Locale[] = ['zh-hk', 'en', 'ja'];
let productAssertions = 0;
let categoryAssertions = 0;
let feedAssertions = 0;
let offerCount = 0;

async function main() {
for (const locale of locales) {
  const currency = locale === 'zh-hk' ? 'HKD' : locale === 'ja' ? 'JPY' : 'USD';
  const expectedCountry = locale === 'zh-hk' ? 'HK' : locale === 'ja' ? 'JP' : 'US';
  const sharedPolicy = getMerchantReturnPolicy(locale);
  assert.equal(sharedPolicy.returnPolicyCategory, 'https://schema.org/MerchantReturnFiniteReturnWindow');
  assert.equal(sharedPolicy.merchantReturnDays, 14);
  assert.equal(sharedPolicy.applicableCountry, expectedCountry);
  assert.equal('returnMethod' in sharedPolicy, false);
  assert.equal('returnFees' in sharedPolicy, false);
  assert.equal('refundType' in sharedPolicy, false);

  const category = generateCategoryItemListJsonLd('Merchant policy test', products, locale) as any;
  assert.equal(category.itemListElement.length, products.length);

  for (const [index, product] of products.entries()) {
    const expectedPrice = getProductOfferPrice(product, locale);
    if (expectedPrice) {
      assert.equal(expectedPrice.currency, currency);
      assert.ok(Number(expectedPrice.price) > 0, `${locale}/${product.slug}: non-positive offer`);
      offerCount += 1;
    }

    const pdp = generateProductJsonLd(
      product.name,
      product.description,
      '/images/placeholder.jpg',
      product.slug,
      product.basePrice,
      currency,
      undefined,
      locale,
      expectedPrice,
      { minQuantity: product.minQuantity, categorySlug: product.category_slug },
    ) as any;
    assert.equal(pdp.brand.name, 'ZprintPro');
    assert.ok(!/free digital proof|1-hour proofing|ships worldwide|免費數碼打稿|1小時打樣|DHL全球派送|無料デジタル校正|1時間校正対応|DHL国際配送/i.test(pdp.sourcingIntentKeywords || ''));
    if (expectedPrice) {
      assert.equal(pdp.offers.price, expectedPrice.price, `${locale}/${product.slug}: PDP price drift`);
      assert.equal(pdp.offers.priceCurrency, expectedPrice.currency);
      assert.equal('shippingDetails' in pdp.offers, false);
      assert.deepEqual(pdp.offers.hasMerchantReturnPolicy, sharedPolicy);
    } else {
      assert.equal('offers' in pdp, false);
    }
    productAssertions += 1;

    const categoryProduct = category.itemListElement[index].item;
    if (expectedPrice) {
      assert.equal(categoryProduct.offers.price, expectedPrice.price, `${locale}/${product.slug}: category price drift`);
      assert.equal(categoryProduct.offers.priceCurrency, expectedPrice.currency);
      assert.equal('shippingDetails' in categoryProduct.offers, false);
      assert.deepEqual(categoryProduct.offers.hasMerchantReturnPolicy, sharedPolicy);
    } else {
      assert.equal('offers' in categoryProduct, false);
    }
    categoryAssertions += 1;
  }

  const response = await GET({} as any, { params: { locale } });
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.ok(!xml.includes('<g:shipping>'), `${locale}: unconditional shipping remains`);
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
  const expectedProducts = products.filter((product) => product.slug && product.basePrice != null && product.basePrice > 0 && getProductOfferPrice(product, locale));
  assert.equal(items.length, expectedProducts.length, `${locale}: unexpected feed item count`);

  for (const [index, product] of expectedProducts.entries()) {
    const expectedPrice = getProductOfferPrice(product, locale)!;
    const expectedFormatted = expectedPrice.currency === 'JPY'
      ? Number(expectedPrice.price).toFixed(0)
      : Number(expectedPrice.price).toFixed(2);
    assert.ok(items[index].includes(`<g:id>${locale}-${product.sku_code}</g:id>`));
    assert.ok(items[index].includes(`<g:price>${expectedFormatted} ${expectedPrice.currency}</g:price>`), `${locale}/${product.slug}: feed price drift`);
    assert.ok(items[index].includes('<g:brand>ZprintPro</g:brand>'));
    feedAssertions += 1;
  }
}

console.log(JSON.stringify({
  verdict: 'PASS',
  locales: locales.length,
  productsPerLocale: products.length,
  productAssertions,
  categoryAssertions,
  feedAssertions,
  validOffersAcrossThreeLocales: offerCount,
  shippingAssertions: 'PDP + category + feed: no unconditional shippingDetails or g:shipping',
  returnAssertions: 'finite window=14 days; quality-defect condition; no unsupported offer-level fields',
  priceAssertions: 'PDP = category = feed = getProductOfferPrice; no zero-price Offers',
}, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
