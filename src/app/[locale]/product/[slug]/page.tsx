/**
 * 产品详情页 (PDP - Product Detail Page)
 * 显示单个产品的详细信息、报价计算器、加入购物车
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getCategoryBySlug,
  getCategoryName,
  getProductTitle,
  getProductDescription,
  getProductImageAlt,
  products
} from '@/lib/products';
import { buildProductH1ZhHk, buildProductH1En, buildProductH1Ja } from '@/lib/h1-builder';
import { 
  generateProductMetadata, 
  generateProductJsonLd,
  generateProductImageJsonLd,
  generateBreadcrumbJsonLd,
  generateBusinessJsonLd,

  generateProductReviewsJsonLd,
  Locale 
} from '@/lib/seo';
import {
  generateHowToJsonLd,
  generateSpeakableJsonLd,
  getCategoryHowToSteps,
  standardSpeakableSelectors,
} from '@/lib/seo/schema-extensions';
import { JsonLd } from '@/components/JsonLd';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductQuoteProvider } from '@/components/quote/ProductQuoteProvider';
import { QuantityTierInteractive } from '@/components/quote/QuantityTierInteractive';
import { QuoteCalculator } from '@/components/quote/QuoteCalculator';
import { ProductTabs } from '@/components/ProductTabs';
import { RelatedProducts } from '@/components/RelatedProducts';
import { ProductFaq } from '@/components/ProductFaq';
import { getProductSeo } from '@/data/product-seo';
import { getSkuSeo } from '@/data/sku-seo-data';
import { generateFAQSchema } from '@/lib/faq-schema';
import { coreProductFAQMap } from '@/data/product-faqs';
import { RegionalContent, RegionalCta, RegionalTrustBadges } from '@/components/seo/RegionalContent';
import { convertPriceRangeString, convertToFromPrice, getUnitPriceAnchor, getDisplayAnchor } from '@/lib/pricing';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { getPriceTableForSlug, findClosestTierBatch } from '@/lib/price-injector';
import ReferencePriceBlock from '@/components/pdp/referencepriceblock';
import { getProductMainImage, getProductImages } from '@/lib/product-image';
import { ProductWhyChooseUs } from '@/components/ProductWhyChooseUs';
import RushDeliveryBadge from '@/components/sections/RushDeliveryBadge';
import { TrustWaterfall } from '@/components/home/TrustWaterfall';

// 生成静态参数 - 79产品 × 3语言 = 237个路径
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  const locales: Locale[] = ['zh-hk', 'en', 'ja'];
  const productSlugs = products.map((p) => p.slug);
  
  locales.forEach((locale) => {
    productSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  
  return params;
}

// 生成页面元数据
export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Not Found' };
  }
  
  const category = getCategoryBySlug(product.category_slug);
  const categoryName = category ? getCategoryName(category, locale) : '';
  
  const rushDescriptions: Record<string, Record<string, string>> = {
    'zh-hk': {
      'flyers': '宣傳單張印刷，A4/A5/A6尺寸、157g銅版紙，100張起訂。滿$500包郵，標準交期。',
      'posters': 'A2/A1/A3海報印刷，防水材質，10張起訂。滿$500包郵，標準交期 1-2 工作天。',
      'stickers': '貼紙印刷，防水/PVC/透明材質，100張起訂，支持異形切割。滿$500包郵，標準交期。',
      'business-cards': '名片印刷，燙金、棉紙、局部UV工藝，100張起訂。滿$500包郵，標準交期。',
      'books': '畫冊印刷，騎馬釘/膠裝、封面覆膜，50本起訂。滿$500包郵，標準交期。',
      'banners': '易拉寶噴繪，鋁合金支架、高清噴繪，1個起訂。滿$500包郵，標準交期。',
    },
  };
  
  const metadata = generateProductMetadata(locale, product.name, product.nameEn, product.nameJa, product.description, product.descriptionEn, product.descriptionJa, product.slug, categoryName, product.price_range);
  
  // 优先：SKU 级 SEO 数据（来自 zprintpro-sku-seo-data.csv）— 78 个 SKU
  const skuSeo = getSkuSeo(slug);
  if (skuSeo?.seo?.[locale]) {
    return {
      ...metadata,
      title: skuSeo.seo[locale].title || metadata.title,
      description: skuSeo.seo[locale].description || metadata.description,
      keywords: skuSeo.seo[locale].keywords,
    };
  }

  // 兼容：核心分类 SEO（5 个）— 旧路径
  const coreSeo = getProductSeo(slug);
  if (coreSeo?.[locale]) {
    return {
      ...metadata,
      title: coreSeo[locale].title || metadata.title,
      description: coreSeo[locale].description || metadata.description,
      keywords: coreSeo[locale].keywords,
    };
  }

  if (rushDescriptions[locale]?.[product.category_slug]) {
    return {
      ...metadata,
      description: rushDescriptions[locale][product.category_slug],
    };
  }
  
  return metadata;
}

// 产品详情页组件
export default function ProductPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const product = getProductBySlug(slug);
  
  // 产品不存在时返回404
  if (!product) {
    notFound();
  }
  
  // 获取分类信息
  const category = getCategoryBySlug(product.category_slug);
  const categoryName = category ? getCategoryName(category, locale) : '';
  
  // 获取产品信息
  const productTitle = getProductTitle(product, locale);
  const productDescription = getProductDescription(product, locale);
  const skuSeo = getSkuSeo(slug);
  
  // 面包屑数据
  const breadcrumbItems = [
    { name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム', url: `https://zprintpro.com/${locale}/` },
    { name: categoryName, url: `https://zprintpro.com/${locale}/category/${product.category_slug}/` },
    { name: productTitle, url: `https://zprintpro.com/${locale}/product/${slug}/` },
  ];
  
  // 核心产品 SEO 数据
  const productSeo = getProductSeo(slug);

  // JSON-LD结构化数据
  // 2026-07-28 P1 v2.1: 删 productRating 假数据 (K3 v2 §3.3 约束 4: 无真实评价数据, 删 aggregateRating 禁止编造)
  // productRating 之前由 weight_score 算伪随机 ratingValue (4.2-4.9) + reviewCount (15-64), 违反 v2 §3.3
  // generateProductJsonLd 在 rating 未传时会自动跳过 aggregateRating 字段, 符合 Schema.org 真实数据原则
  // 2026-06-08 修复: og:image fallback chain — 优先用 locale 专属图, 再用通用图, 最后才 placeholder
  // 之前: 直接 fallback 到 placeholder.jpg (0 字节, GSC 显示通用图标)
  const ogImage = getProductMainImage(product, locale);
  // 2026-06-10 Phase B 修复 P0-1：使用 locale 本地化的 name / description（不再传 product.name / product.description）
  // 之前 en/ja 页直接传中文，导致 Product JSON-LD name 字段是 "牛皮紙袋" 等中文。
  // productTitle / productDescription 来自 getProductTitle / getProductDescription，已经按 locale 切换。
  const productJsonLd = generateProductJsonLd(
    productTitle,
    productDescription,
    ogImage,
    product.slug,
    product.basePrice,
    locale === 'zh-hk' ? 'HKD' : locale === 'ja' ? 'JPY' : 'USD',
    undefined, // 2026-07-28 P1 v2.1: 不传 rating → 跳过 aggregateRating (K3 v2 §3.3 约束 4)
    locale
  );
  // ImageObject Schema（獨立節點，不影響 Product ranking）
  const productImageJsonLd = generateProductImageJsonLd(
    getProductImages(product, locale),
    productTitle,
    locale
  );
  const businessJsonLd = generateBusinessJsonLd(locale);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  // FAQPage Schema — 优先使用新集中式FAQ数据（按分类映射）
  // 兜底：所有 category 已在 product-faqs.ts 注册 generalProductFAQs 通用集
  const coreFaqs = coreProductFAQMap[product.category_slug] || coreProductFAQMap['educational'];
  const faqItems = coreFaqs
    ? coreFaqs.map((faq: { question: Record<Locale, string>; answer: Record<Locale, string> }) => ({ q: faq.question[locale], a: faq.answer[locale] }))
    : undefined;
  const faqJsonLd = coreFaqs ? generateFAQSchema(coreFaqs, locale) : null;

  // 2026-06-10 Phase B 修复 P0-3：HowTo + Speakable 注入
  // 仅对 4 个主钻品类（packaging / paper-bags / books / calendars）的产品页注入 HowTo。
  // Speakable 通用注入（与 P0-3 任务说明一致：选 2-3 个核心 cssSelector）。
  const mainDrillingCategories = ['packaging', 'paper-bags', 'books', 'calendars', 'stickers', 'flyers', 'posters', 'business-cards', 'banners', 'menus', 'envelopes', 'red-packets', 'educational', 'japan-doujin'];
  const categoryHowto = mainDrillingCategories.includes(product.category_slug)
    ? getCategoryHowToSteps(product.category_slug, locale)
    : null;
  const howToJsonLd = categoryHowto
    ? generateHowToJsonLd(
        categoryHowto.name,
        categoryHowto.description,
        categoryHowto.steps,
        locale,
        categoryHowto.totalTime
      )
    : null;
  const speakableJsonLd = generateSpeakableJsonLd(
    standardSpeakableSelectors.product.xpath,
    standardSpeakableSelectors.product.cssSelector
  );

  // 长描述
  const longDesc = locale === 'zh-hk' ? product.longDescription : locale === 'en' ? product.longDescriptionEn : product.longDescriptionJa;

  // 相关博客链接（暂不启用）
  const relatedBlog = null;
  const localePrefix = `/${locale}`;
  
  // 翻译文本
  const translations = {
    'zh-hk': {
      home: '首頁',
      specifications: '規格選擇',
      price: '價格',
      priceRange: '價格範圍',
      getQuote: '獲取報價',
      addToCart: '加入購物車',
      buyNow: '立即購買',
      description: '產品詳情',
      specs: '規格參數',
      shipping: '配送信息',
      reviews: '客戶評價',
      relatedProducts: '相關產品',
      sku: '產品編號',
      category: '產品分類',
      deliveryTime: '交貨時間',
      freeShipping: '滿$500包郵',
      sameDay: '標準交期',
      quality: '品質保證',
      minOrder: '最低訂購量',
    },
    'en': {
      home: 'Home',
      specifications: 'Specifications',
      price: 'Price',
      priceRange: 'Price Range',
      getQuote: 'Get Quote',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      description: 'Description',
      specs: 'Specifications',
      shipping: 'Shipping',
      reviews: 'Reviews',
      relatedProducts: 'Related Products',
      sku: 'SKU',
      category: 'Category',
      deliveryTime: 'Delivery Time',
      freeShipping: 'Free shipping over $500',
      sameDay: 'Standard lead time',
      quality: 'Quality Guarantee',
      minOrder: 'Minimum Order',
    },
    'ja': {
      home: 'ホーム',
      specifications: '仕様選択',
      price: '価格',
      priceRange: '価格帯',
      getQuote: '見積もり',
      addToCart: 'カートに追加',
      buyNow: '今すぐ購入',
      description: '製品詳細',
      specs: '仕様',
      shipping: '配送情報',
      reviews: 'レビュー',
      relatedProducts: '関連製品',
      sku: '製品番号',
      category: 'カテゴリー',
      deliveryTime: '納期',
      freeShipping: '$500 相当以上 送料無料',
      sameDay: '標準納期',
      quality: '品質保証',
      minOrder: '最小注文数',
    },
  };
  
  const t = translations[locale];
  
  return (
    <>
      {/* 结构化数据 */}
      <JsonLd data={productJsonLd} />
      <JsonLd data={productImageJsonLd} />
      <JsonLd data={businessJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {howToJsonLd && <JsonLd data={howToJsonLd} />}
      {/* 2026-06-10 Phase B 修复 P0-3：Speakable 注入（语音 / AI 抓取） */}
      <JsonLd data={speakableJsonLd} />
      {/* 2026-06-10 Phase B 修复 P0-1：reviews schema 也使用 locale 本地化 productTitle（之前是中文 product.name） */}
      <JsonLd data={generateProductReviewsJsonLd(productTitle, slug, locale)} />
      
      <main className="min-h-screen bg-gray-50">
        {/* 面包屑导航 */}
        <div className="bg-white border-b">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm text-gray-500">
              <a href={`/${locale}/`} className="hover:text-[#2873F5]">
                {t.home}
              </a>
              <span className="mx-2">/</span>
              <a href={`/${locale}/category/${product.category_slug}/`} className="hover:text-[#2873F5]">
                {categoryName}
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{productTitle}</span>
            </nav>
          </div>
        </div>
        
        {/* 2026-07-27 移动端信任条 (lg:hidden): 首屏 3 要素 — 价格锚点 / 交付承诺 / WhatsApp 联系入口。
            背景: 移动端 grid-cols-1 先渲染左栏产品大图, 标题/价格/CTA 被挤出首屏;
            此条放面包屑下方, 保证 3 秒内可见。文案复用 t.sameDay / t.freeShipping (3 locale 已本地化, en/ja 无香港词)。
            注: FloatingQuoteCTA 浮动按钮仅桌面端渲染 (hidden lg:...), 移动端无浮动按钮遮挡问题。 */}
        <div className="lg:hidden bg-white border-b">
          <div className="max-w-[1320px] mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              {(() => {
                const anchor = getDisplayAnchor(product.slug, locale);
                return anchor ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-extrabold text-[#F87314] whitespace-nowrap">
                        {anchor.big}
                      </span>
                      <span className="text-xs text-gray-400">
                        {anchor.unitLabel}{locale === 'zh-hk' ? '起' : locale === 'en' ? ' from' : '〜'}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 truncate">
                      {anchor.sub}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-extrabold text-[#F87314] whitespace-nowrap">
                        {convertToFromPrice(product.price_range, locale, product.category_slug, product.slug)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {locale === 'zh-hk' ? '起' : locale === 'en' ? 'From' : '〜'}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 truncate">
                      {t.sameDay} · {t.freeShipping}
                    </div>
                  </>
                );
              })()}
            </div>
            <a
              href={generateWhatsAppLink(locale, { source: 'pdp-mobile-trustbar', productName: productTitle })}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 bg-[#25D366] text-white text-sm font-bold px-3.5 py-2 rounded-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* 产品详情区 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 2026-07-13 v3: ProductQuoteProvider 包住整个 grid, 跟右 column QuoteCalculator 通过 context 共享 selectedQuantity; 2026-07-16 左 column 上传/备注移除 */}
          <ProductQuoteProvider product={product}>
          <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-8 justify-between">
            {/* 左侧：产品图片 + 批量折扣色块 (上传/备注已移除，统一走 /contact/) */}
            <div>
              <ProductGallery
                images={getProductImages(product, locale)}
                title={productTitle}
                alt={getProductImageAlt(product, locale)}
              />

              {/* 2026-07-16: 上传设计稿 + 备注栏已移除 — 文件上传统一走 /contact/; 批量折扣色块通过 ProductQuoteProvider context 联动右栏 QuoteCalculator */}
              <div className="mt-6">
                <QuantityTierInteractive locale={locale} />
              </div>
            </div>
            
            {/* 右侧：产品信息和报价计算器 */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {locale === 'zh-hk'
                  ? buildProductH1ZhHk(productTitle, categoryName, product.category_slug, product.slug)
                  : locale === 'en'
                  ? buildProductH1En(productTitle, product.category_slug)
                  : buildProductH1Ja(productTitle, product.category_slug)}
              </h1>
              
              {['flyers', 'posters', 'stickers', 'business-cards', 'books', 'banners'].includes(product.category_slug) && (
                <RushDeliveryBadge locale={locale} />
              )}
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>
              
              {/* 价格显示 — 去色块简洁风格 (2026-07-26 K3: 单价小锚主显示, 整批价降级小字) */}
              <div className="mb-5">
                {(() => {
                  const anchor = getDisplayAnchor(product.slug, locale);
                  return (
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                        {anchor ? anchor.big : convertToFromPrice(product.price_range, locale, product.category_slug, product.slug)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {anchor ? `${anchor.unitLabel}${locale === 'zh-hk' ? '起' : locale === 'en' ? ' from' : '〜'}` : (locale === 'zh-hk' ? '起' : locale === 'en' ? 'From' : '〜')}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        {anchor ? anchor.sub : (locale === 'zh-hk' ? `完整價格 ${product.price_range}` : locale === 'en' ? `Full price: ${convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug)}` : `価格 ${convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug)}`)}
                      </span>
                    </div>
                  );
                })()}
                {locale !== 'zh-hk' && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      {locale === 'en' ? 'Free shipping over $500' : '$500 相当以上 送料無料'}
                    </span>
                    <span className="text-xs text-gray-400">{locale === 'en' ? 'DHL/FedEx 3-5 days to USA, 2-4 days to Japan' : 'DHL/FedEx アメリカ3-5日、日本2-4日'}</span>
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
              </div>

              {/* v14 方案A: price-table-backed SKU 由 ReferencePriceBlock 接管; 其余无表 SKU 仍走 QuoteCalculator */}
              {(() => {
                const hasPriceTable = !!findClosestTierBatch(product.slug, product.minQuantity || 500);
                if (!hasPriceTable) {
                  return (
                    <div className="mb-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>
                      <QuoteCalculator product={product} locale={locale} />
                    </div>
                  );
                }
                return null;
              })()}

              {/* v13: 參考價格表 (server 端注入实际价格数据, 无匹配则降级不显示) */}
              {(() => {
                const priceData = getPriceTableForSlug(product.slug);
                if (priceData) {
                  return <ReferencePriceBlock data={priceData} locale={locale} />;
                }
                return null;
              })()}

              {/* SKU & 最低订购量 (2026-06-07: 靠右对齐 + 减右 padding 2/3)
                  2026-07-13 v3: QuantityTier 已从右栏移除, 放在左 column 备注栏下面 */}
              <div className="flex items-center justify-end gap-3 text-xs text-gray-400 mb-4 pr-2">
                <span>{t.sku}: <span className="font-mono text-gray-500">{product.sku_code}</span></span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span>{t.minOrder}: {product.minQuantity}</span>
              </div>
            </div>
          </div>
          </ProductQuoteProvider>
          
          {/* 产品详情Tabs — 上方加 trust badges (2026-06-07) */}
          <div className="mt-12">
            <TrustWaterfall locale={locale} />
            <ProductTabs product={product} locale={locale} />
          </div>


          {/* 长描述 SEO 内容 */}
          {longDesc && (
            <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-[#333333] mb-4">
                {locale === 'zh-hk' ? '產品詳情' : locale === 'en' ? 'Product Details' : '製品詳細'}
              </h2>
              <div
                className="text-gray-600 leading-relaxed prose prose-sm max-w-none [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#333333] [&_h3]:mt-6 [&_h3]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:text-sm [&_thead]:bg-[#2873F5] [&_thead]:text-white [&_th]:p-2 [&_th]:text-center [&_th:first-child]:text-left [&_th:last-child]:text-left [&_td]:p-2 [&_td]:text-center [&_td:first-child]:text-left [&_td:first-child]:font-medium [&_td:last-child]:text-left [&_tr.border-b]:border-b [&_tr.border-b]:border-gray-200 [&_tr.bg-gray-50]:bg-gray-50"
                dangerouslySetInnerHTML={{ __html: longDesc }}
              />
              
              {/* 相关博客链接 */}
              {relatedBlog && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">
                    {locale === 'zh-hk' ? '延伸閱讀：' : locale === 'en' ? 'Related Reading:' : '関連記事：'}
                  </p>
                  <a
                    href={`${localePrefix}/blog/${relatedBlog}/`}
                    className="inline-flex items-center text-[#2873F5] hover:underline font-medium"
                  >
                    {locale === 'zh-hk' ? '了解更多關於此產品的知識 →' : locale === 'en' ? 'Learn more about this product →' : 'この製品について詳しく知る →'}
                  </a>
                </div>
              )}
            </section>
          )}
          
          {/* FAQ Accordion */}
          {faqItems && faqItems.length > 0 && (
            <ProductFaq items={faqItems} locale={locale} />
          )}
          
          {/* HowTo 流程（暫不啟用） */}
          {/* howToJsonLd && <ProductHowTo steps={[]} locale={locale} productName={productTitle} /> */}

          {/* 相关产品 */}
          <div className="mt-12">
            <RelatedProducts 
              currentProduct={product} 
              locale={locale} 
            />
          </div>
          
          {/* 地區化內容區域 */}
          <div className="mt-16 pt-10 border-t border-gray-200 space-y-8">
            {skuSeo?.seo?.[locale]?.body && (
            <div className="prose prose-gray max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {skuSeo.seo[locale].body}
              </div>
            </div>
          )}
          <ProductWhyChooseUs locale={locale} />
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                <RegionalContent locale={locale} type="expertIntro" />
              </p>
            </div>
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-500">
                <RegionalContent locale={locale} type="shipping" />
              </p>
              <RegionalCta locale={locale} productSlug={product.slug} />
              <p className="text-xs text-gray-400">
                <RegionalContent locale={locale} type="pricingNote" />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
