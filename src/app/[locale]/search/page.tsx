import { Metadata } from 'next';
import Link from 'next/link';
import { Locale, siteConfig } from '@/lib/seo';
import { searchProducts, categories, getCategoryBySlug } from '@/data/products';

interface SearchPageProps {
  params: { locale: string };
  searchParams: { q?: string };
}

const translations = {
  'zh-hk': {
    title: '搜尋結果 | 智印云 ZprintPro',
    description: '在智印云搜尋印刷產品和服務。',
    h1: '搜尋結果',
    placeholder: '輸入關鍵字搜尋...',
    noResults: '沒有找到相關結果，請嘗試其他關鍵字。',
    searching: '正在搜尋...',
    resultsFor: (q: string) => `"${q}" 的搜尋結果`,
    showing: (n: number) => `共 ${n} 個結果`,
    viewProduct: '查看詳情',
    browseCategory: '瀏覽分類',
  },
  en: {
    title: 'Search Results | ZprintPro',
    description: 'Search for printing products and services on ZprintPro.',
    h1: 'Search Results',
    placeholder: 'Enter keywords to search...',
    noResults: 'No results found. Please try different keywords.',
    searching: 'Searching...',
    resultsFor: (q: string) => `Results for "${q}"`,
    showing: (n: number) => `${n} results`,
    viewProduct: 'View Details',
    browseCategory: 'Browse Category',
  },
  ja: {
    title: '検索結果 | ZprintPro',
    description: 'ZprintProで印刷製品とサービスを検索。',
    h1: '検索結果',
    placeholder: 'キーワードを入力...',
    noResults: '結果が見つかりませんでした。別のキーワードをお試しください。',
    searching: '検索中...',
    resultsFor: (q: string) => `「${q}」の検索結果`,
    showing: (n: number) => `${n}件`,
    viewProduct: '詳細を見る',
    browseCategory: 'カテゴリを見る',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params, searchParams }: SearchPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const q = searchParams.q || '';
  return {
    title: q ? `"${q}" - ${t.title}` : t.title,
    description: t.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/search${q ? `?q=${encodeURIComponent(q)}` : ''}`,
    },
  };
}

function getProductName(p: any, locale: string): string {
  if (locale === 'en') return p.nameEn || p.name;
  if (locale === 'ja') return p.nameJa || p.name;
  return p.name;
}

function getCategoryName(c: any, locale: string): string {
  if (locale === 'en') return c.nameEn || c.name;
  if (locale === 'ja') return c.nameJa || c.name;
  return c.name;
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const query = (searchParams.q || '').trim();

  // 服务端直调 searchProducts + 分类搜索（避免额外 API 往返）
  let productResults: any[] = [];
  let categoryResults: any[] = [];
  if (query) {
    const q = query.toLowerCase();
    productResults = searchProducts(query).slice(0, 30);
    categoryResults = categories
      .filter((c: any) => {
        const names = [c.name, c.nameEn, c.nameJa].map((n: string) => (n || '').toLowerCase());
        return names.some((n) => n.includes(q)) || c.slug.toLowerCase().includes(q);
      })
      .slice(0, 5);
  }

  const total = productResults.length + categoryResults.length;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333] mb-4">
            {query ? t.resultsFor(query) : t.h1}
          </h1>
          {query && (
            <p className="text-sm text-gray-500">{t.showing(total)}</p>
          )}
        </div>

        {!query && (
          <form action={`/${locale}/search`} method="get" className="max-w-xl mb-8">
            <input
              type="text"
              name="q"
              defaultValue=""
              autoFocus
              placeholder={t.placeholder}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5]"
            />
          </form>
        )}

        {query && total === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">{t.noResults}</p>
            <Link
              href={`/${locale}/`}
              className="inline-block text-[#2873F5] hover:underline"
            >
              ← {locale === 'en' ? 'Back to Home' : locale === 'ja' ? 'ホームへ戻る' : '返回首頁'}
            </Link>
          </div>
        )}

        {categoryResults.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#333333] mb-4">
              {locale === 'en' ? 'Categories' : locale === 'ja' ? 'カテゴリ' : '分類'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categoryResults.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/category/${c.slug}/`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#2873F5] hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-[#333333]">{getCategoryName(c, locale)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {productResults.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-[#333333] mb-4">
              {locale === 'en' ? 'Products' : locale === 'ja' ? '製品' : '產品'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productResults.map((p) => (
                <Link
                  key={p.sku_code}
                  href={`/${locale}/product/${p.slug}/`}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#2873F5] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-[#333333] line-clamp-2">
                      {getProductName(p, locale)}
                    </h3>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      {p.isHot && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-medium rounded">HOT</span>
                      )}
                      {p.isNew && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded">NEW</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {locale === 'en' ? p.descriptionEn || p.description : locale === 'ja' ? p.descriptionJa || p.description : p.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#F87314]">{p.price_range}</span>
                    <span className="text-xs text-[#2873F5] font-medium">{t.viewProduct} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
