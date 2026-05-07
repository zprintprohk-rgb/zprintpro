/**
 * 产品分类页 (PLP - Product Listing Page)
 * 对标 e-print.com.hk 二级页面布局
 * 顶部 1320×300 banner → 左侧分类导航 → 右侧 3列产品卡片（最多6个SKU）
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategoryName,
  categories,
  products
} from '@/lib/products';
import {
  generateCategoryMetadata,
  generateBreadcrumbJsonLd,
  generateBusinessJsonLd,
  Locale
} from '@/lib/seo';
import Image from 'next/image';
import { JsonLd } from '@/components/JsonLd';
import { CategorySidebar } from '@/components/category/CategorySidebar';
import { CategoryProductCard } from '@/components/category/CategoryProductCard';
import { Pagination } from '@/components/Pagination';
import { CategoryPillarContent, generateFaqSchema } from '@/components/CategoryPillarContent';
import { RegionalContent, RegionalCta, RegionalTrustBadges } from '@/components/seo/RegionalContent';

export const dynamic = 'force-static';

// 生成静态参数 - 13分类 × 3语言 = 39个路径
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  const locales: Locale[] = ['zh-hk', 'en', 'ja'];
  const categorySlugs = categories.map((c) => c.slug);

  locales.forEach((locale) => {
    categorySlugs.forEach((slug) => {
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
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Not Found' };
  }

  return generateCategoryMetadata(locale, category.name, category.nameEn, category.nameJa);
}

// 分类页组件
export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { locale: Locale; slug: string };
  searchParams: { page?: string; sort?: string };
}) {
  const { locale, slug } = params;
  const category = getCategoryBySlug(slug);

  // 分类不存在时返回404
  if (!category) {
    notFound();
  }

  // 获取分类下的产品
  const categoryProducts = getProductsByCategory(slug);

  // 分页 - 每页最多6个SKU（引流分类不赚钱，不展示太多）
  const currentPage = parseInt(searchParams.page || '1', 10);
  const productsPerPage = 12;
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);
  const paginatedProducts = categoryProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // 获取分类名称
  const categoryName = getCategoryName(category, locale);

  // 面包屑数据
  const breadcrumbItems = [
    { name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム', url: `/${locale}/` },
    { name: categoryName, url: `/${locale}/category/${slug}/` },
  ];

  // 面包屑JSON-LD
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  // Category ItemList Schema — 产品列表结构化数据
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: categoryName,
    itemListElement: categoryProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zprintpro.com'}/${locale}/product/${product.slug}/`,
      name: locale === 'zh-hk' ? product.name : locale === 'en' ? product.nameEn : product.nameJa,
    })),
  };

  // Business Schema — 按地區切換 LocalBusiness / Organization
  const businessJsonLd = generateBusinessJsonLd(locale);

  // 翻译文本
  const translations = {
    'zh-hk': {
      productsCount: `共 ${categoryProducts.length} 款產品`,
      sortBy: '排序方式',
      priceAsc: '價格由低到高',
      priceDesc: '價格由高到低',
      popularity: '熱門程度',
      noProducts: '暫無產品',
      prev: '上一頁',
      next: '下一頁',
      bannerTitle: '專業品質，價格透明，快速交貨',
      bannerSubtitle: '香港領先的印刷服務平台',
      cta: '立即報價',
    },
    'en': {
      productsCount: `${categoryProducts.length} Products`,
      sortBy: 'Sort By',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      popularity: 'Popularity',
      noProducts: 'No products found',
      prev: 'Previous',
      next: 'Next',
      bannerTitle: 'Professional Quality, Transparent Pricing, Fast Delivery',
      bannerSubtitle: 'Hong Kong\'s Leading Printing Service Platform',
      cta: 'Get Quote',
    },
    'ja': {
      productsCount: `全 ${categoryProducts.length} 商品`,
      sortBy: '並び替え',
      priceAsc: '価格: 安い順',
      priceDesc: '価格: 高い順',
      popularity: '人気順',
      noProducts: '商品が見つかりません',
      prev: '前へ',
      next: '次へ',
      bannerTitle: 'プロ品質、透明な価格、迅速な納品',
      bannerSubtitle: '香港を代表する印刷サービスプラットフォーム',
      cta: 'お見積もり',
    },
  };

  const t = translations[locale];
  const localePrefix = `/${locale}`;

  // 分类 Banner 背景图映射
  const categoryBannerImages: Record<string, string> = {
    'paper-bags': '/images/hero/paper-bags.jpg',
    'flyers': '/images/hero/flyers.jpg',
    'stickers': '/images/hero/stickers.jpg',
    'packaging': '/images/hero/packaging.jpg',
    'posters': '/images/hero/posters.jpg',
    'business-cards': '/images/hero-v21/sticker.jpg',
    'banners': '/images/hero-v21/poster.jpg',
    'books': '/images/hero-v21/gift-box.jpg',
    'menus': '/images/hero-v21/flyer.jpg',
    'envelopes': '/images/hero-v21/kraft-bag.jpg',
    'calendars': '/images/hero-v21/white-bag.jpg',
    'red-packets': '/images/hero-v21/gift-box.jpg',
    'educational': '/images/hero-v21/flyer.jpg',
  };
  const bannerImage = categoryBannerImages[slug];
  const hasBannerImage = !!bannerImage;

  return (
    <>
      {/* 结构化数据：面包屑 + 产品列表 + 本地商家 + FAQPage */}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={businessJsonLd} />
      {(() => {
        const faqSchema = generateFaqSchema(locale, slug);
        return faqSchema ? <JsonLd data={faqSchema} /> : null;
      })()}

      <main className="min-h-screen bg-gray-50">
        {/* Banner 区域 - 1320×400，紧贴导航栏，图片背景 */}
        <div className="max-w-[1320px] mx-auto">
          <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden">
            {/* 背景图或渐变 */}
            {hasBannerImage ? (
              <>
                <Image
                  src={bannerImage}
                  alt={categoryName}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-[#2873F5] via-[#3B82F6] to-[#1E5FD1]" />
            )}
            {/* Banner 内容 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                {categoryName}
              </h1>
              <p className="text-white/80 text-sm md:text-base mb-5">
                {t.bannerTitle}
              </p>
              <a
                href={`${localePrefix}/contact/`}
                className="inline-flex items-center justify-center px-8 py-3 bg-[#3090FF] hover:bg-[#2873F5] text-white rounded-lg text-sm font-medium transition-colors shadow-lg"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </div>

        {/* 面包屑导航 - 位于 Banner 下方 */}
        <div className="bg-white border-b">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="text-sm text-gray-500">
              <a href={`/${locale}/`} className="hover:text-[#2873F5]">
                {locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム'}
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{categoryName}</span>
            </nav>
          </div>
        </div>

        {/* 主内容区 - 左侧分类 + 右侧产品 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧分类导航 */}
            <aside className="w-full lg:w-56 flex-shrink-0">
              <CategorySidebar locale={locale} currentCategorySlug={slug} />
            </aside>

            {/* 右侧产品列表 */}
            <div className="flex-1">
              {/* 排序栏 */}
              <div className="flex items-center justify-between mb-6 bg-white rounded-lg border border-gray-200 px-4 py-3">
                <span className="text-gray-500 text-sm">
                  {t.productsCount}
                </span>
                <select
                  className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#2873F5] focus:border-transparent bg-white"
                  defaultValue="popularity"
                >
                  <option value="popularity">{t.popularity}</option>
                  <option value="price-asc">{t.priceAsc}</option>
                  <option value="price-desc">{t.priceDesc}</option>
                </select>
              </div>

              {/* 产品网格 - 3列，最多12条单页显示 */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedProducts.map((product, index) => (
                    <CategoryProductCard
                      key={product.sku_code}
                      product={product}
                      locale={locale}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500">{t.noProducts}</p>
                </div>
              )}

              {/* 分页 — 仅当超过12条时显示 */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    locale={locale}
                    baseUrl={`/${locale}/category/${slug}/`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buying Guide CTA — 选购指南入口 */}
        <BuyingGuideCta locale={locale} categorySlug={slug} />

        {/* Pillar Content — SEO支柱内容区 */}
        <CategoryPillarContent locale={locale} categorySlug={slug} />

        {/* 地區化內容區域 — CTA + 信任信號 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-12">
          <div className="bg-gradient-to-b from-white to-blue-50/50 rounded-3xl border border-blue-100 p-8 md:p-12 space-y-8">
            {/* 主標題 */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-5">
                {locale === 'zh-hk' ? '為何選擇智印云？' : locale === 'en' ? 'Why Choose ZprintPro?' : 'なぜZprintProを選ぶ？'}
              </h3>
              <RegionalTrustBadges locale={locale} />
            </div>
            {/* 專家介紹 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100/60">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center">
                <RegionalContent locale={locale} type="expertIntro" />
              </p>
            </div>
            {/* CTA區 */}
            <div className="text-center space-y-4">
              <p className="text-base md:text-lg text-gray-500">
                <RegionalContent locale={locale} type="shipping" />
              </p>
              <RegionalCta locale={locale} />
              <p className="text-sm text-gray-400">
                <RegionalContent locale={locale} type="pricingNote" />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Buying Guide CTA Component
const categoryGuideMap: Record<string, string> = {
  'business-cards': 'business-card-buying-guide',
  'stickers': 'sticker-buying-guide',
  'flyers': 'flyer-buying-guide',
  'packaging': 'packaging-buying-guide',
  'posters': 'poster-buying-guide',
  'paper-bags': 'paper-bag-buying-guide',
};

function BuyingGuideCta({ locale, categorySlug }: { locale: Locale; categorySlug: string }) {
  const guideSlug = categoryGuideMap[categorySlug];
  if (!guideSlug) return null;

  const t = {
    'zh-hk': { label: '選購指南', cta: '查看完整指南 →', title: '不知道怎麼選？看看我們的專業選購指南', desc: '從材質、工藝到價格，為您詳細拆解選購要點。' },
    'en': { label: 'Buying Guide', cta: 'Read Full Guide →', title: 'Not Sure What to Choose?', desc: 'From materials to finishes to pricing, our expert guide has you covered.' },
    'ja': { label: '選び方ガイド', cta: 'ガイドを読む →', title: 'どれを選べばいいか迷っていますか？', desc: '材質から加工、価格まで、専門家のガイドで解決。' },
  }[locale];

  const localePrefix = `/${locale}`;

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <a
        href={`${localePrefix}/blog/${guideSlug}/`}
        className="block bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] rounded-xl p-6 md:p-8 text-white hover:shadow-lg transition-shadow"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-block bg-white/20 text-white text-xs font-medium px-2 py-1 rounded mb-2">
              {t.label}
            </span>
            <h3 className="text-xl md:text-2xl font-bold">{t.title}</h3>
            <p className="text-blue-100 mt-1 text-sm md:text-base">{t.desc}</p>
          </div>
          <span className="inline-flex items-center text-white font-semibold whitespace-nowrap">
            {t.cta}
          </span>
        </div>
      </a>
    </div>
  );
}
