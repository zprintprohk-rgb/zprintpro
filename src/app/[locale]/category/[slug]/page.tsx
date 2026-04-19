/**
 * 产品分类页 (PLP - Product Listing Page)
 * 显示分类下的所有产品，支持筛选和分页
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
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Pagination } from '@/components/Pagination';
import { CategoryPillarContent } from '@/components/CategoryPillarContent';
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
  
  // 分页
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
    { name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム', url: `/${locale}` },
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
      filter: '篩選',
      material: '材質',
      size: '尺寸',
      priceRange: '價格範圍',
      reset: '重置',
      apply: '應用',
      noProducts: '暫無產品',
      prev: '上一頁',
      next: '下一頁',
    },
    'en': {
      productsCount: `${categoryProducts.length} Products`,
      sortBy: 'Sort By',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      popularity: 'Popularity',
      filter: 'Filter',
      material: 'Material',
      size: 'Size',
      priceRange: 'Price Range',
      reset: 'Reset',
      apply: 'Apply',
      noProducts: 'No products found',
      prev: 'Previous',
      next: 'Next',
    },
    'ja': {
      productsCount: `全 ${categoryProducts.length} 商品`,
      sortBy: '並び替え',
      priceAsc: '価格: 安い順',
      priceDesc: '価格: 高い順',
      popularity: '人気順',
      filter: 'フィルター',
      material: '素材',
      size: 'サイズ',
      priceRange: '価格帯',
      reset: 'リセット',
      apply: '適用',
      noProducts: '商品が見つかりません',
      prev: '前へ',
      next: '次へ',
    },
  };
  
  const t = translations[locale];
  
  return (
    <>
      {/* 结构化数据：面包屑 + 产品列表 + 本地商家 */}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={businessJsonLd} />
      
      <main className="min-h-screen bg-gray-50">
        {/* 页面标题区 */}
        <div className="bg-white border-b">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="text-sm text-gray-500 mb-4">
              <a href={`/${locale}`} className="hover:text-[#2873F5]">
                {locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム'}
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{categoryName}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-500">{t.productsCount}</p>
          </div>
        </div>
        
        {/* 主内容区 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 侧边筛选器 */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <CategoryFilter locale={locale} />
            </aside>
            
            {/* 产品列表 */}
            <div className="flex-1">
              {/* 排序栏 */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-500 text-sm">
                  {t.productsCount}
                </span>
                <select 
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                  defaultValue="popularity"
                >
                  <option value="popularity">{t.popularity}</option>
                  <option value="price-asc">{t.priceAsc}</option>
                  <option value="price-desc">{t.priceDesc}</option>
                </select>
              </div>
              
              {/* 产品网格 */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard 
                      key={product.sku_code} 
                      product={product} 
                      locale={locale} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500">{t.noProducts}</p>
                </div>
              )}
              
              {/* 分页 */}
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
        
        {/* 地區化內容區域 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8 border-t border-gray-200 space-y-8">
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
            <RegionalCta locale={locale} />
            <p className="text-xs text-gray-400">
              <RegionalContent locale={locale} type="pricingNote" />
            </p>
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
  
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;
  
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
