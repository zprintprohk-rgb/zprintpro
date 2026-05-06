import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';

interface SearchPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '搜尋結果 | 智印云 ZprintPro',
    description: '在智印云搜尋印刷產品和服務。',
    h1: '搜尋結果',
    placeholder: '輸入關鍵字搜尋...',
    noResults: '沒有找到相關結果，請嘗試其他關鍵字。',
  },
  en: {
    title: 'Search Results | ZprintPro',
    description: 'Search for printing products and services on ZprintPro.',
    h1: 'Search Results',
    placeholder: 'Enter keywords to search...',
    noResults: 'No results found. Please try different keywords.',
  },
  ja: {
    title: '検索結果 | ZprintPro',
    description: 'ZprintProで印刷製品とサービスを検索。',
    h1: '検索結果',
    placeholder: 'キーワードを入力...',
    noResults: '結果が見つかりませんでした。別のキーワードをお試しください。',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/search/`,
    },
  };
}

export default function SearchPage({ params }: SearchPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#333333] mb-4">{t.h1}</h1>
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder={t.placeholder}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5]"
            />
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">{t.noResults}</p>
        </div>
      </div>
    </main>
  );
}
