import type { Metadata } from 'next';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { FileUploader } from '@/components/quote/FileUploader';
import { JsonLd } from '@/components/JsonLd';
import { generateQuotePageMetadata } from '@/lib/seo';

interface QuotePageProps {
  params: { locale: string };
}

const locales = ['zh-hk', 'en', 'ja'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const { locale } = params;
  return generateQuotePageMetadata(locale as 'zh-hk' | 'en' | 'ja');
}

export default function QuotePage({ params }: QuotePageProps) {
  const { locale } = params;
  const safeLocale = locale as 'zh-hk' | 'en' | 'ja';

  const pageTitle =
    locale === 'zh-hk'
      ? '即時報價'
      : locale === 'en'
      ? 'Instant Quote'
      : '見積もり';

  const pageSubtitle =
    locale === 'zh-hk'
      ? '上傳檔案或選擇參數，快速獲取印刷報價'
      : locale === 'en'
      ? 'Upload your file or select parameters to get a quick printing quote'
      : 'ファイルをアップロードするか、パラメータを選択して素早く見積もりを取得';

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
        '@type': 'Product',
        name: 'Printing Service',
        description:
          locale === 'zh-hk'
            ? '專業印刷服務，支援多種材料與後處理'
            : locale === 'en'
            ? 'Professional printing services with multiple materials and post-processing'
            : '複数の材料と後加工に対応したプロフェッショナル印刷サービス',
        brand: {
          '@type': 'Brand',
          name: 'ZPrintPro',
        },
        offers: {
          '@type': 'Offer',
          url: `https://zprintpro.com/${locale}/quote`,
          priceCurrency: 'HKD',
          price: '5.00',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
        },
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
            name: locale === 'zh-hk' ? '即時報價' : locale === 'en' ? 'Quote' : '見積もり',
            item: `https://zprintpro.com/${locale}/quote`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name:
              locale === 'zh-hk'
                ? '印刷報價需要多久？'
                : locale === 'en'
                ? 'How long does it take to get a printing quote?'
                : '印刷の見積もりにはどのくらい時間がかかりますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                locale === 'zh-hk'
                  ? '參數報價即時生成，上傳檔案後複雜訂單通常需 2 小時內回覆。'
                  : locale === 'en'
                  ? 'Parametric quotes are instant. For uploaded files, complex orders are usually quoted within 2 hours.'
                  : 'パラメータ見積もりは即座に生成されます。ファイルをアップロードした場合、複雑な注文は通常2時間以内にお見積もりします。',
            },
          },
          {
            '@type': 'Question',
            name:
              locale === 'zh-hk'
                ? '支援哪些檔案格式？'
                : locale === 'en'
                ? 'What file formats are supported?'
                : 'どのファイル形式に対応していますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                locale === 'zh-hk'
                  ? '支援 PDF、AI、PSD、PNG、JPG 等常見格式。'
                  : locale === 'en'
                  ? 'We support PDF, AI, PSD, PNG, and JPG formats.'
                  : 'PDF、AI、PSD、PNG、JPGに対応しています。',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="mt-2 text-muted-foreground">{pageSubtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <section aria-label={locale === 'zh-hk' ? '參數報價' : locale === 'en' ? 'Parametric Quote' : 'パラメータ見積もり'}>
            <h2 className="mb-4 text-lg font-semibold">
              {locale === 'zh-hk'
                ? '參數報價'
                : locale === 'en'
                ? 'Parametric Quote'
                : 'パラメータ見積もり'}
            </h2>
            <QuoteForm locale={safeLocale} />
          </section>

          <section aria-label={locale === 'zh-hk' ? '上傳檔案' : locale === 'en' ? 'Upload File' : 'ファイルアップロード'}>
            <h2 className="mb-4 text-lg font-semibold">
              {locale === 'zh-hk'
                ? '上傳檔案'
                : locale === 'en'
                ? 'Upload File'
                : 'ファイルアップロード'}
            </h2>
            <FileUploader locale={safeLocale} />
          </section>
        </div>
      </main>
    </>
  );
}
