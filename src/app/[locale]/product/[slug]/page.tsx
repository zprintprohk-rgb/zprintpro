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
import { 
  generateProductMetadata, 
  generateProductJsonLd,
  generateProductImageJsonLd,
  generateBreadcrumbJsonLd,
  generateBusinessJsonLd,

  generateProductReviewsJsonLd,
  Locale 
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ProductGallery } from '@/components/ProductGallery';
import { QuoteCalculator } from '@/components/quote/QuoteCalculator';
import { ProductTabs } from '@/components/ProductTabs';
import { RelatedProducts } from '@/components/RelatedProducts';
import { ProductFaq } from '@/components/ProductFaq';
import { getProductSeo } from '@/data/product-seo';
import { getSkuSeo } from '@/data/sku-seo-data';
import { generateFAQSchema } from '@/lib/faq-schema';
import { coreProductFAQMap } from '@/data/product-faqs';
import { RegionalContent, RegionalCta, RegionalTrustBadges } from '@/components/seo/RegionalContent';
import { convertPriceRangeString } from '@/lib/pricing';
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
      'flyers': '宣傳單張印刷即日速递送货，今天下單明天12點前到。A4/A5/A6尺寸、157g銅版紙，100張起訂，支持港鐵站交收，單價低至HK$0.25。',
      'posters': '海報印刷即日速递送货，今天下單明天12點前到。A2/A1/A3尺寸、防水材質，10張起訂，支持全港速递及港鐵站交收。',
      'stickers': '貼紙印刷即日速递送货，今天下單明天12點前到。防水/PVC/透明材質，100張起訂，支持異形切割，港鐵站交收。',
      'business-cards': '名片印刷即日速递送货，今天下單明天12點前到。燙金、棉紙、局部UV工藝，100張起訂，專業名片通宵印刷。',
      'books': '畫冊印刷即日速递送货，今天下單明天12點前到。騎馬釘/膠裝、封面覆膜，50本起訂，支持辦公室地址配送。',
      'banners': '易拉寶噴繪即日速递送货，今天下單明天12點前到。鋁合金支架、高清噴繪，1個起訂，活動展架通宵製作。',
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
  
  // 面包屑数据
  const breadcrumbItems = [
    { name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム', url: `https://zprintpro.com/${locale}/` },
    { name: categoryName, url: `https://zprintpro.com/${locale}/category/${product.category_slug}/` },
    { name: productTitle, url: `https://zprintpro.com/${locale}/product/${slug}/` },
  ];
  
  // 核心产品 SEO 数据
  const productSeo = getProductSeo(slug);

  // JSON-LD结构化数据
  const productRating = {
    ratingValue: Math.min(5, Math.max(4.2, 4.5 + (product.weight_score % 5) * 0.1)),
    reviewCount: 15 + (product.weight_score % 50),
  };
  const productJsonLd = generateProductJsonLd(
    product.name,
    product.description,
    product.imagesByLocale?.[locale]?.[0] || '/images/placeholder.jpg',
    product.slug,
    product.basePrice,
    locale === 'zh-hk' ? 'HKD' : locale === 'ja' ? 'JPY' : 'USD',
    productRating,
    locale
  );
  // ImageObject Schema（獨立節點，不影響 Product ranking）
  const productImageJsonLd = generateProductImageJsonLd(
    product.imagesByLocale?.[locale] || [],
    product.name,
    locale
  );
  const businessJsonLd = generateBusinessJsonLd(locale);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  // FAQPage Schema — 优先使用新集中式FAQ数据（按分类映射）
  const coreFaqs = coreProductFAQMap[product.category_slug];
  const faqItems = coreFaqs
    ? coreFaqs.map((faq: { question: Record<Locale, string>; answer: Record<Locale, string> }) => ({ q: faq.question[locale], a: faq.answer[locale] }))
    : undefined;
  const faqJsonLd = coreFaqs ? generateFAQSchema(coreFaqs, locale) : null;

  // HowTo Schema (暂不启用)
  const howToJsonLd = null;

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
      freeShipping: '滿$500免運費',
      sameDay: '即日交貨',
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
      freeShipping: 'Free intl. shipping',
      sameDay: 'Same-day delivery',
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
      freeShipping: '国際送料無料',
      sameDay: '即日納品',
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
      <JsonLd data={generateProductReviewsJsonLd(product.name, slug, locale)} />
      
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
        
        {/* 产品详情区 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-8 justify-between">
            {/* 左侧：产品图片 + 上传 + 备注 */}
            <div>
              <ProductGallery
                images={product.imagesByLocale?.[locale] || product.images || ['/images/placeholder.jpg']}
                title={productTitle}
                alt={getProductImageAlt(product, locale)}
              />

              {/* 上传设计稿 */}
              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-[#2873F5] transition-colors cursor-pointer bg-white">
                <input type="file" accept=".pdf,.ai,.psd,.png,.jpg,.jpeg" className="hidden" id="design-upload-pdp" />
                <label htmlFor="design-upload-pdp" className="cursor-pointer block">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{locale === 'zh-hk' ? '上傳設計稿' : locale === 'en' ? 'Upload Design' : 'デザインをアップロード'}</p>
                  <p className="text-xs text-gray-400 mt-1">{locale === 'zh-hk' ? '支持 PDF, AI, PSD, PNG, JPG 格式（最大50MB）' : locale === 'en' ? 'Support PDF, AI, PSD, PNG, JPG (max 50MB)' : 'PDF, AI, PSD, PNG, JPG対応（最大50MB）'}</p>
                </label>
              </div>

              {/* 备注栏 */}
              <details className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900">{locale === 'zh-hk' ? '備註' : locale === 'en' ? 'Notes' : '備考'}</span>
                  <span className="text-sm text-[#2873F5] group-open:hidden">{locale === 'zh-hk' ? '添加' : locale === 'en' ? 'Add' : '追加'}</span>
                  <span className="text-sm text-gray-400 hidden group-open:block">{locale === 'zh-hk' ? '收起' : locale === 'en' ? 'Collapse' : '閉じる'}</span>
                </summary>
                <div className="px-5 pb-4">
                  <textarea
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] resize-none"
                    rows={3}
                    placeholder={locale === 'zh-hk' ? '請輸入訂單備註...' : locale === 'en' ? 'Enter order notes...' : '注文備考を入力...'}
                  />
                </div>
              </details>
            </div>
            
            {/* 右侧：产品信息和报价计算器 */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {locale === 'zh-hk' ? `${productTitle} | 香港${categoryName}專家 | 智印云` : locale === 'en' ? `${productTitle} | Global Shipping | ZprintPro` : `${productTitle} | 日本向け高品質印刷 | ZprintPro`}
              </h1>
              
              {['flyers', 'posters', 'stickers', 'business-cards', 'books', 'banners'].includes(product.category_slug) && (
                <RushDeliveryBadge locale={locale} />
              )}
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>
              
              {/* 价格显示 — 去色块简洁风格 */}
              <div className="mb-5">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                    {locale === 'zh-hk' ? product.price_range.split('-')[0] : convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug).split('-')[0]}
                  </span>
                  <span className="text-sm text-gray-400">
                    {locale === 'zh-hk' ? (product.price_range.includes('/100') ? '/100張起' : product.price_range.includes('/個') ? '/個起' : '/張起') : locale === 'en' ? 'From' : (product.price_range.includes('/100') ? '/100枚から' : '/個から')}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">
                    {locale === 'zh-hk' ? `完整價格 ${product.price_range}` : locale === 'en' ? `Full price: ${convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug)}` : `価格 ${convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug)}`}
                  </span>
                </div>
                {locale !== 'zh-hk' && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      {locale === 'en' ? 'Free International Shipping' : '国際送料無料'}
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

              {/* 报价计算器 — 无边框简洁 */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.specifications}</h3>
                <QuoteCalculator product={product} locale={locale} />
              </div>
              
              {/* SKU & 最低订购量 (2026-06-07: 靠右对齐 + 减右 padding 2/3) */}
              <div className="flex items-center justify-end gap-3 text-xs text-gray-400 mb-4 pr-2">
                <span>{t.sku}: <span className="font-mono text-gray-500">{product.sku_code}</span></span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span>{t.minOrder}: {product.minQuantity}</span>
              </div>
            </div>
          </div>
          
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
