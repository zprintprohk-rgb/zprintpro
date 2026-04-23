import type { Metadata } from 'next';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { JsonLd } from '@/components/JsonLd';
import { generateQuotePageMetadata } from '@/lib/seo';
import { Locale } from '@/lib/seo';

interface QuotePageProps {
  params: { locale: string };
}

const locales = ['zh-hk', 'en', 'ja'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const { locale } = params;
  return generateQuotePageMetadata(locale as Locale);
}

export default function QuotePage({ params }: QuotePageProps) {
  const { locale } = params;
  const safeLocale = locale as Locale;

  const translations = {
    'zh-hk': {
      pageTitle: '免費獲取報價',
      pageSubtitle: '填寫下方表單，我們將在24小時內以郵件回覆專屬報價',
      features: ['24小時內回覆', '免費設計諮詢', '專屬客戶經理', '量大價優'],
    },
    en: {
      pageTitle: 'Get a Free Quote',
      pageSubtitle: 'Fill out the form below and we will send you a customized quote via email within 24 hours',
      features: ['Reply within 24h', 'Free design consultation', 'Dedicated account manager', 'Volume discounts'],
    },
    ja: {
      pageTitle: '無料お見積もり',
      pageSubtitle: '以下のフォームにご記入いただければ、24時間以内にメールで専用の見積もりをご返信いたします',
      features: ['24時間以内に返信', '無料デザイン相談', '専任担当者', '大口割引'],
    },
  };
  const t = translations[locale as keyof typeof translations] || translations['zh-hk'];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'ZPrintPro',
        url: 'https://zprintpro.com',
        logo: 'https://zprintpro.com/images/logo.png',
        sameAs: [
          'https://www.facebook.com/zprintpro',
          'https://www.instagram.com/zprintpro',
        ],
      },
      {
        '@type': 'ContactPage',
        url: `https://zprintpro.com/${locale}/quote`,
        name: t.pageTitle,
        description: t.pageSubtitle,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム',
            item: `https://zprintpro.com/${locale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t.pageTitle,
            item: `https://zprintpro.com/${locale}/quote`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main className="min-h-screen bg-gray-50 py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">
              {t.pageTitle}
            </h1>
            <p className="text-gray-500 text-lg">{t.pageSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {t.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <QuoteForm locale={safeLocale} />
        </div>
      </main>
    </>
  );
}
