/**
 * Google Merchant Center 商品 Feed API
 * 生成 Google Shopping XML feed，供 Merchant Center 定时抓取
 *
 * 端点: GET /api/merchant-feed/[locale]/  (必带尾斜杠)
 *   ⚠️ 无尾斜杠版本 (trailingSlash:true + next-on-pages 适配层) 会 308 到带斜杠版本 —
 *      Google 定时抓取会跟随 308, 但建议在 Merchant Center 配置带尾斜杠的 URL 以直达 200。
 * locale: zh-hk | en | ja
 *
 * 用法: 在 Google Merchant Center → Feed → Scheduled fetch
 *       设置 URL 为 https://zprintpro.com/api/merchant-feed/en/
 *       (根据 target country 选择对应 locale)
 *
 * 2026-10-06 修复 (GMC 数据源质量 4 项, 线上探针实证):
 *   ① SITE_URL 强制生产域 zprintpro.com — CF Pages 环境变量被配成 pages.dev 预览域时
 *     feed link/image_link 全量污染 (10/6 实测 3 locale × 91 = 273 条全部指向预览域);
 *     预览域对 Googlebot-Image 抓取稳定性无 SLA, 是「图片类型不受支持」间歇失败的最大嫌疑源。
 *   ② locale 真值价格 — 旧版直接用 HKD basePrice 数值配 locale 币种 (ja feed 出现 1.00 JPY,
 *     实际 ja 定价 ¥20), 价格失真 = 价格不匹配拒批风险。
 *   ③ google_product_category 按官方 taxonomy 映射 — 旧版全 SKU 硬编码 3370 =
 *     "Sporting Goods > ... > Kneeboarding" (滑水板, taxonomy-with-ids.en-US.txt 核实)。
 *   ④ 纸品默认 color=White — 修 GMC「缺少颜色」类未获批准。
 */

import { products } from '@/data/products';
import { getProductAggregateRating } from '@/data/product-reviews';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// 2026-10-06: 强制生产域名 (schema-extensions.ts 2026-07-18 同款修复先例)。
// CF Pages 的 NEXT_PUBLIC_SITE_URL 曾被误配为 pages.dev 预览域导致 schema URL 污染 (GSC 实测已发生),
// feed 同病: 10/6 线上探针 273/273 条 link/image_link 指向 zprintpro-19p.pages.dev。
const SITE_URL = 'https://zprintpro.com';

const localeConfig = {
  'zh-hk': { currency: 'HKD', country: 'HK', lang: 'zh_HK' },
  en: { currency: 'USD', country: 'US', lang: 'en_US' },
  ja: { currency: 'JPY', country: 'JP', lang: 'ja_JP' },
} as const;

// 2026-09-29: feed brand 按 locale 取品牌 (单品牌分层 K3 9/1 02:54) —
// 修复前 3 locale 统一一个品牌词, 与页面 schema 品牌不一致
const brandByLocale: Record<keyof typeof localeConfig, string> = {
  'zh-hk': '智印港',
  en: 'ZprintPro',
  ja: 'ジープリント',
};

type Locale = keyof typeof localeConfig;

// 颜色映射：为常见品类提供默认颜色
// Google Merchant Center color 属性用于产品搜索过滤
const colorBySlug: Record<string, string> = {
  'kraft-paper-bags': 'Brown',
  'eco-paper-bags': 'Brown',
  'red-packets': 'Red',
  'gold-foil-red-packets': 'Red',
  'cartoon-red-packets': 'Red',
  'premium-red-packets': 'Red',
  'acrylic-keychain': 'Transparent',
  'clear-acrylic-stand': 'Transparent',
  // 默认白色纸品
};

function getColor(slug: string, categorySlug: string): string {
  if (colorBySlug[slug]) return colorBySlug[slug];
  if (categorySlug === 'red-packets') return 'Red';
  if (slug.includes('kraft') || slug.includes('eco') || slug.includes('brown')) return 'Brown';
  if (slug.includes('clear') || slug.includes('transparent') || slug.includes('acrylic')) return 'Transparent';
  // 2026-10-06: 未映射品类默认 White (纸品主色 = 白) — 修 GMC「缺少颜色」类未获批准
  return 'White';
}

// ============================================================================
// 2026-10-06 C1 locale 真值价格:
//   旧版直接输出 HKD basePrice 数值 × locale 币种 (ja feed 实测 "1.00 JPY", 实际 ¥20)。
//   取 locale 专属定价 (basePrice_en/_ja), 缺失时按 src/lib/pricing.ts
//   LIVE_FX_RATES_FALLBACK 同款汇率换算 (USD 0.128 / JPY 19.5), 口径一致可追溯。
// ============================================================================
const HKD_FALLBACK_RATES = { USD: 0.128, JPY: 19.5 } as const;

type ProductLike = (typeof products)[number];

function getLocalePrice(product: ProductLike, locale: Locale): number {
  if (locale === 'en') {
    return product.basePrice_en ?? Number((product.basePrice * HKD_FALLBACK_RATES.USD).toFixed(2));
  }
  if (locale === 'ja') {
    return product.basePrice_ja ?? Math.round(product.basePrice * HKD_FALLBACK_RATES.JPY);
  }
  return product.basePrice; // zh-hk: HKD 真值
}

function formatPrice(value: number, currency: string): string {
  // JPY 按价格规范 0 位小数, 其余 2 位
  return currency === 'JPY' ? value.toFixed(0) : value.toFixed(2);
}

// ============================================================================
// 2026-10-06 C2 google_product_category 按 category_slug 映射官方 taxonomy
// (taxonomy-with-ids.en-US.txt, 2021-09-21 版, 10/6 下载核实)。
// 旧版全 SKU 硬编码 3370 = "Sporting Goods > Outdoor Recreation > Boating & Water
// Sports > Towed Water Sports > Kneeboarding", 与印刷品完全不符。
// 未映射品类省略该可选属性, 宁缺毋错。
// ============================================================================
const gpcByCategory: Record<string, string> = {
  'greeting-cards': '95', // Party & Celebration > Gift Giving > Greeting & Note Cards
  'wedding-invitations': '1371', // Party & Celebration > Party Supplies > Invitations
  'place-cards': '2104', // Party & Celebration > Party Supplies > Place Cards
  stickers: '4054', // Arts & Crafts > Embellishments & Trims > Decorative Stickers
  'paper-bags': '1837', // Business & Industrial > Retail > Paper & Plastic Shopping Bags
  packaging: '973', // Office Supplies > Shipping Supplies > Moving & Shipping Boxes
  'red-packets': '958', // Office Supplies > Paper Products > Envelopes
  calendars: '927', // Office Supplies > Filing & Organization > Calendars, Organizers & Planners
  menus: '3457', // Office Supplies > Paper Products > Stationery
  banners: '976', // Business & Industrial > Signage
  books: '784', // Media > Books
  envelopes: '958',
  educational: '961', // Office Supplies > Paper Products > Notebooks & Notepads
  'japan-doujin': '784',
  flyers: '5884', // Business & Industrial > Advertising & Marketing > Brochures
  posters: '500044', // Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork
};

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildFeed(locale: Locale): string {
  const config = localeConfig[locale];
  const currency = config.currency;

  const items = products
    .filter((p) => p.slug && p.basePrice != null && p.basePrice > 0)
    .map((product) => {
      const localizedName =
        locale === 'zh-hk' ? product.name : locale === 'en' ? product.nameEn : product.nameJa;
      const localizedDesc =
        locale === 'zh-hk'
          ? product.description
          : locale === 'en'
          ? product.descriptionEn
          : product.descriptionJa;
      const productUrl = `${SITE_URL}/${locale}/product/${product.slug}/`;

      // 图片 fallback
      const localeImg = product.imagesByLocale?.[locale]?.[0];
      const generalImg = product.images?.[0];
      const imageUrl = localeImg || generalImg || '/images/placeholder.jpg';
      const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${SITE_URL}${imageUrl}`;

      const color = getColor(product.slug, product.category_slug);
      const priceValue = getLocalePrice(product, locale);
      const priceStr = formatPrice(priceValue, currency);
      const gpc = gpcByCategory[product.category_slug];

      let item = `    <item>
      <g:id>${xmlEscape(product.sku_code)}</g:id>
      <g:title>${xmlEscape(localizedName)}</g:title>
      <g:description>${xmlEscape(localizedDesc.slice(0, 5000))}</g:description>
      <g:link>${xmlEscape(productUrl)}</g:link>
      <g:image_link>${xmlEscape(fullImageUrl)}</g:image_link>
      <g:price>${priceStr} ${currency}</g:price>
      <g:sale_price>${priceStr} ${currency}</g:sale_price>
      <g:availability>in_stock</g:availability>
      <g:brand>${xmlEscape(brandByLocale[locale])}</g:brand>
      <g:condition>new</g:condition>
      <g:mpn>${xmlEscape(product.sku_code)}</g:mpn>
      <!-- 2026-09-29: 定制印刷商品无 GTIN → identifier_exists=false (避免 GMC「缺少 GTIN」警告) -->
      <g:identifier_exists>false</g:identifier_exists>
      ${gpc ? `<g:google_product_category>${xmlEscape(gpc)}</g:google_product_category>` : ''}
      <g:product_type>${xmlEscape(product.category)}</g:product_type>
      <g:shipping>
        <g:country>${config.country}</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 ${currency}</g:price>
      </g:shipping>
      <g:custom_label_0>printing</g:custom_label_0>
      <g:custom_label_1>${xmlEscape(product.category_slug)}</g:custom_label_1>`;

      if (color) {
        item += `\n      <g:color>${xmlEscape(color)}</g:color>`;
      }

      // 2026-09-29 GSC「未填写 aggregateRating/review」449 项修复 (feed 层):
      // 与 PDP JSON-LD 同源 (src/data/product-reviews.ts 真实评价)。当前 0 条 → 不输出,
      // 填入真实评价后 feed 自动携带评分属性 (Merchant Center product ratings 规范)。
      const agg = getProductAggregateRating(product.slug, locale);
      if (agg) {
        item += `\n      <g:aggregate_rating>${agg.ratingValue}</g:aggregate_rating>`;
        item += `\n      <g:review_count>${agg.reviewCount}</g:review_count>`;
        item += `\n      <g:rating_range>1-5</g:rating_range>`;
      }

      item += `\n    </item>`;
      return item;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${brandByLocale[locale]} ${config.country} Product Feed</title>
    <link>${SITE_URL}/${locale}</link>
    <description>${brandByLocale[locale]} printing service products for ${config.country} market. Feed updated automatically.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return feed;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { locale: string } }
) {
  const locale = params.locale as Locale;

  if (!localeConfig[locale]) {
    return new Response(`Unsupported locale: ${locale}. Use zh-hk, en, or ja.`, {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const feed = buildFeed(locale);

  return new Response(feed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      // 防止 CF 缓存陈旧版本
      'X-Robots-Tag': 'noindex',
    },
  });
}
