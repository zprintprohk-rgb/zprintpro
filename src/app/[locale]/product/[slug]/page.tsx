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
  products 
} from '@/lib/products';
import { 
  generateProductMetadata, 
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
  generateBusinessJsonLd,
  generateFaqJsonLd,
  generateProductReviewsJsonLd,
  Locale 
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ProductGallery } from '@/components/ProductGallery';
import { QuoteCalculator } from '@/components/quote/QuoteCalculator';
import { ProductTabs } from '@/components/ProductTabs';
import { RelatedProducts } from '@/components/RelatedProducts';
import { ProductFaq } from '@/components/ProductFaq';
import { ProductHowTo } from '@/components/ProductHowTo';
import { getProductSeo } from '@/data/product-seo';
import { RegionalContent, RegionalCta, RegionalTrustBadges } from '@/components/seo/RegionalContent';

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
  
  return generateProductMetadata(locale, product.name, product.nameEn, product.nameJa, product.description, product.descriptionEn, product.descriptionJa, product.slug);
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
    { name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム', url: `/${locale}/` },
    { name: categoryName, url: `/${locale}/category/${product.category_slug}/` },
    { name: productTitle, url: `/${locale}/product/${slug}/` },
  ];
  
  // 核心产品 SEO 数据
  const productSeo = getProductSeo(slug);
  
  // JSON-LD结构化数据
  const productJsonLd = generateProductJsonLd(product.name, product.description, product.images[0] || '', product.slug, product.basePrice);
  const businessJsonLd = generateBusinessJsonLd(locale);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);
  
  // FAQPage Schema (仅核心产品有)
  const faqItems = productSeo?.faq[locale];
  const faqJsonLd = faqItems && faqItems.length > 0 
    ? generateFaqJsonLd(faqItems.map(item => ({ question: item.q, answer: item.a }))) 
    : null;
  
  // HowTo Schema (仅核心产品有)
  const howToSteps = productSeo?.processSteps[locale];
  const howToJsonLd = howToSteps && howToSteps.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: locale === 'zh-hk' ? `${product.name} 印刷流程` : locale === 'en' ? `How to Print ${product.nameEn}` : `${product.nameJa} の製作方法`,
        step: howToSteps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;
  
  // 长描述
  const longDesc = productSeo?.longDescription[locale];
  
  // 相关博客链接
  const relatedBlog = productSeo?.relatedBlogSlug;
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
      freeShipping: 'Free shipping over $500',
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
      freeShipping: '500ドル以上送料無料',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 左侧：产品图片 */}
            <div>
              <ProductGallery images={product.images} title={productTitle} />
            </div>
            
            {/* 右侧：产品信息和报价计算器 */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {productSeo?.h1Suffix[locale] || productTitle}
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>
              
              {/* 价格显示 - e-print风格 */}
              <div className="bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] rounded-xl p-5 mb-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">{t.priceRange}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white/90">
                    {locale === 'zh-hk' ? '價格以客服確認為準' : locale === 'en' ? 'Price subject to confirmation' : '価格は確認が必要'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold">
                    {product.price_range.split('-')[0]}
                  </span>
                  <span className="text-sm text-white/60">
                    {product.price_range.includes('/100') ? '/100張起' : product.price_range.includes('/個') ? '/個起' : '/張起'}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-2">
                  {locale === 'zh-hk' ? `完整價格: ${product.price_range} · 聯繫客服獲取準確報價` : locale === 'en' ? `Full price: ${product.price_range} · Contact us for accurate quote` : `価格: ${product.price_range} · 正確な見積もりはお問い合わせください`}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 text-white text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {t.sameDay}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 text-white text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg>
                    {t.freeShipping}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 text-white text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {t.quality}
                  </span>
                </div>
              </div>
              
              {/* 报价计算器 */}
              <div className="bg-white rounded-xl border-2 border-[#2873F5]/20 shadow-lg shadow-[#2873F5]/5 p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-[#2873F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  <h3 className="text-lg font-semibold">{t.specifications}</h3>
                </div>
                <QuoteCalculator product={product} locale={locale} />
              </div>
              
              {/* SKU & 最低订购量 */}
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span>{t.sku}: <span className="font-mono text-gray-500">{product.sku_code}</span></span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span>{t.minOrder}: {product.minQuantity}</span>
              </div>
            </div>
          </div>
          
          {/* 产品详情Tabs */}
          <div className="mt-12">
            <ProductTabs product={product} locale={locale} />
          </div>
          
          {/* 长描述 SEO 内容 */}
          {longDesc && (
            <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-[#333333] mb-4">
                {locale === 'zh-hk' ? '產品詳情' : locale === 'en' ? 'Product Details' : '製品詳細'}
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{longDesc}</p>
              
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
          
          {/* HowTo 流程 */}
          {howToSteps && howToSteps.length > 0 && (
            <ProductHowTo steps={howToSteps} locale={locale} productName={productTitle} />
          )}
          
          {/* 相关产品 */}
          <div className="mt-12">
            <RelatedProducts 
              currentProduct={product} 
              locale={locale} 
            />
          </div>
          
          {/* 地區化內容區域 */}
          <div className="mt-16 pt-10 border-t border-gray-200 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-[#333333] mb-4 text-center">
                {locale === 'zh-hk' ? '為何選擇智印港？' : locale === 'en' ? 'Why Choose ZprintPro?' : 'なぜZprintProを選ぶ？'}
              </h3>
              <RegionalTrustBadges locale={locale} />
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
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
