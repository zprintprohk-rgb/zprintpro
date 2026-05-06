import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, siteConfig } from '@/lib/seo';

interface CompanyNewsPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '公司新聞 | 智印云 ZprintPro',
    description: '智印云最新公司動態、業務發展與印刷行業資訊。',
    h1: '公司新聞',
    subtitle: '了解智印云的最新動態與行業資訊',
    viewMore: '閱讀全文',
    noArticles: '暫無公司新聞',
    categories: { key: 'company-news', label: '公司新聞' },
  },
  en: {
    title: 'Company News | ZprintPro',
    description: 'Latest company updates, business developments and printing industry news from ZprintPro.',
    h1: 'Company News',
    subtitle: 'Stay updated with ZprintPro\'s latest developments',
    viewMore: 'Read More',
    noArticles: 'No company news yet',
    categories: { key: 'company-news', label: 'Company News' },
  },
  ja: {
    title: '会社ニュース | ZprintPro',
    description: 'ZprintProの最新会社情報、事業発展と印刷業界ニュース。',
    h1: '会社ニュース',
    subtitle: 'ZprintProの最新動向をチェック',
    viewMore: '続きを読む',
    noArticles: '会社ニュースはまだありません',
    categories: { key: 'company-news', label: '会社ニュース' },
  },
};

const articles: Record<string, { slug: string; title: string; date: string; excerpt: string; image: string }[]> = {
  'zh-hk': [
    {
      slug: 'company-intro',
      title: '智印云印刷公司簡介：專業設備與一站式印刷服務',
      date: '2024-06-01',
      excerpt: '智印云擁有海德堡6+1印刷機、HP數碼印刷機、馬天尼膠裝線等先進設備，提供從設計到印刷到後加工的一站式服務。',
      image: '/images/factory/factory-banner.jpg',
    },
  ],
  en: [
    {
      slug: 'company-intro',
      title: 'About ZprintPro: Professional Equipment & One-Stop Printing Services',
      date: '2024-06-01',
      excerpt: 'ZprintPro features Heidelberg 6+1 printing presses, HP digital printers, and Martini perfect binding lines for full-service printing.',
      image: '/images/factory/factory-banner.jpg',
    },
  ],
  ja: [
    {
      slug: 'company-intro',
      title: 'ZprintPro会社概要：専門設備とワンストップ印刷サービス',
      date: '2024-06-01',
      excerpt: 'ZprintProはハイデルベルグ6+1印刷機、HPデジタル印刷機、マルティニ製本ラインなどの先進設備を保有しています。',
      image: '/images/factory/factory-banner.jpg',
    },
  ],
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: CompanyNewsPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/company-news/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/company-news/`,
        'en': `${siteConfig.url}/en/company-news/`,
        'ja-JP': `${siteConfig.url}/ja/company-news/`,
        'x-default': `${siteConfig.url}/en/company-news/`,
      },
    },
  };
}

export default function CompanyNewsPage({ params }: CompanyNewsPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const news = articles[locale] || articles['zh-hk'];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((post) => (
            <a
              key={post.slug}
              href={`${localePrefix}/blog/${post.slug}/`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-red-50 text-red-600">
                  {t.categories.label}
                </span>
                <h2 className="mt-3 text-base font-bold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-sm text-[#2873F5] font-medium group-hover:underline">
                    {t.viewMore} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            {t.noArticles}
          </div>
        )}
      </div>
    </main>
  );
}
