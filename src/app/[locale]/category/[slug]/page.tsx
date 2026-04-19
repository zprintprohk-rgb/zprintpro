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
  Locale
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Pagination } from '@/components/Pagination';

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
      {/* 面包屑结构化数据 */}
      <JsonLd data={breadcrumbJsonLd} />
      
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
      </main>
    </>
  );
}
