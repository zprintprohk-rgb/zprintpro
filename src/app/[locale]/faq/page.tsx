import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import { generateFaqSchema } from '@/utils/faqSchema';

import faqZhHk from '@/data/faq/zh-hk.json';
import faqEn from '@/data/faq/en.json';
import faqJa from '@/data/faq/ja.json';

const FAQ_DATA_MAP: Record<string, { metadata: any; categories: any[] }> = {
  'zh-hk': faqZhHk,
  'en': faqEn,
  'ja': faqJa,
};

const LANGUAGE_MAP: Record<string, string> = {
  'zh-hk': 'zh-HK',
  'en': 'en',
  'ja': 'ja-JP',
};

export async function generateStaticParams() {
  return [
    { locale: 'zh-hk' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const data = FAQ_DATA_MAP[params.locale];
  if (!data) return {};
  const locale = params.locale;
  const totalFaqs = data.categories.reduce((sum: number, c: any) => sum + c.faqs.length, 0);
  return {
    title: data.metadata.title,
    description: data.metadata.description,
    openGraph: {
      title: data.metadata.title,
      description: data.metadata.description,
      url: `https://zprintpro.com/${locale}/faq/`,
      siteName: locale === 'zh-hk' ? '智印港' : 'ZprintPro',
      locale: locale === 'zh-hk' ? 'zh_HK' : locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metadata.title,
      description: data.metadata.description,
    },
    other: {
      'faq:count': totalFaqs.toString(),
      'faq:categories': data.categories.length.toString(),
    },
    alternates: {
      canonical: `https://zprintpro.com/${params.locale}/faq/`,
      languages: {
        'zh-HK': 'https://zprintpro.com/zh-hk/faq/',
        'en': 'https://zprintpro.com/en/faq/',
        'ja-JP': 'https://zprintpro.com/ja/faq/',
      },
    },
  };
}

export default function FaqPage({ params }: { params: { locale: string } }) {
  const data = FAQ_DATA_MAP[params.locale];
  if (!data) notFound();

  const pageUrl = `https://zprintpro.com/${params.locale}/faq/`;
  const inLanguage = LANGUAGE_MAP[params.locale] || 'en';
  const faqSchema = generateFaqSchema({
    pageUrl,
    categories: data.categories,
    inLanguage,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFF] py-12 md:py-20">
      {/* FAQPage JSON-LD Schema (P2 #11 SEO 优化配套, 8/25 实施) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
            {data.metadata.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {data.metadata.description}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Last updated: {data.metadata.lastUpdated} · Version {data.metadata.version} ·{' '}
            {data.categories.length}{' '}
            {params.locale === 'zh-hk' ? '個類別' : params.locale === 'ja' ? 'カテゴリー' : 'categories'} ·{' '}
            {data.categories.reduce((sum: number, c: any) => sum + c.faqs.length, 0)}{' '}
            {params.locale === 'zh-hk' ? '條 FAQ' : params.locale === 'ja' ? '件の FAQ' : 'FAQs'}
          </p>
        </div>

        {/* FAQ Accordion */}
        <FaqAccordion categories={data.categories} defaultOpenCategory={0} defaultOpenFaq={0} />

        {/* Footer CTA */}
        <div className="mt-12 text-center bg-white rounded-xl p-6 md:p-8 border border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-[#333333] mb-3">
            {params.locale === 'zh-hk' && '仍有問題?'}
            {params.locale === 'en' && 'Still have questions?'}
            {params.locale === 'ja' && 'まだ質問がありますか?'}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            {params.locale === 'zh-hk' &&
              'WhatsApp 我們 24 小時內專業跟進, 或填寫報價表 30 秒 AI 即時報價.'}
            {params.locale === 'en' &&
              'WhatsApp us for professional follow-up within 24 hours, or fill the quote form for 30-second AI instant quote.'}
            {params.locale === 'ja' &&
              'WhatsApp で 24 時間以内に専門スタッフが対応, または見積もりフォームで 30 秒 AI 即時見積もり.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/8619880851334"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1DA851] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`/${params.locale}/quote/`}
              className="inline-flex items-center justify-center gap-2 bg-[#2873F5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E5BD8] transition-colors"
            >
              {params.locale === 'zh-hk' && '獲取 30 秒報價'}
              {params.locale === 'en' && 'Get 30-second Quote'}
              {params.locale === 'ja' && '30秒で見積もり'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
