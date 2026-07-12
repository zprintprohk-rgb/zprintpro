/**
 * Google Merchant Center 商品 Feed API
 * 生成 Google Shopping XML feed，供 Merchant Center 定时抓取
 *
 * 端点: GET /api/merchant-feed/[locale]
 * locale: zh-hk | en | ja
 *
 * 用法: 在 Google Merchant Center → Feed → Scheduled fetch
 *       设置 URL 为 https://zprintpro.com/api/merchant-feed/en
 *       (根据 target country 选择对应 locale)
 */

import { products } from '@/data/products';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zprintpro.com';

const localeConfig = {
  'zh-hk': { currency: 'HKD', country: 'HK', lang: 'zh_HK' },
  en: { currency: 'USD', country: 'US', lang: 'en_US' },
  ja: { currency: 'JPY', country: 'JP', lang: 'ja_JP' },
} as const;

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

function getColor(slug: string, categorySlug: string): string | undefined {
  if (colorBySlug[slug]) return colorBySlug[slug];
  if (categorySlug === 'red-packets') return 'Red';
  if (slug.includes('kraft') || slug.includes('eco') || slug.includes('brown')) return 'Brown';
  if (slug.includes('clear') || slug.includes('transparent') || slug.includes('acrylic')) return 'Transparent';
  // 大部分印刷品默认白色纸
  return undefined;
}

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

      let item = `    <item>
      <g:id>${xmlEscape(product.sku_code)}</g:id>
      <g:title>${xmlEscape(localizedName)}</g:title>
      <g:description>${xmlEscape(localizedDesc.slice(0, 5000))}</g:description>
      <g:link>${xmlEscape(productUrl)}</g:link>
      <g:image_link>${xmlEscape(fullImageUrl)}</g:image_link>
      <g:price>${Number(product.basePrice).toFixed(2)} ${currency}</g:price>
      <g:sale_price>${Number(product.basePrice).toFixed(2)} ${currency}</g:sale_price>
      <g:availability>in_stock</g:availability>
      <g:brand>ZprintPro</g:brand>
      <g:condition>new</g:condition>
      <g:mpn>${xmlEscape(product.sku_code)}</g:mpn>
      <g:google_product_category>3370</g:google_product_category>
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

      item += `\n    </item>`;
      return item;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>ZprintPro ${config.country} Product Feed</title>
    <link>${SITE_URL}/${locale}</link>
    <description>ZprintPro printing service products for ${config.country} market. Feed updated automatically.</description>
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
