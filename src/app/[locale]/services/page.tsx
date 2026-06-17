import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/lib/seo';

export function generateStaticParams() {
  return [
    { locale: 'zh-hk' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  
  const meta: Record<string, { title: string; description: string }> = {
    'zh-hk': {
      title: '印刷服務 | 即日速递·專業印刷 | 智印雲 ZprintPro',
      description: '智印雲提供專業香港印刷服務：宣傳單張、海報、貼紙、名片、畫冊、易拉寶等。最快即日出貨，港鐵站交收，支持全球速遞。',
    },
    'en': {
      title: 'Printing Services | Same-Day Delivery | ZprintPro',
      description: 'ZprintPro offers professional printing services: flyers, posters, stickers, business cards, booklets, banners. Same-day delivery available, worldwide shipping.',
    },
    'ja': {
      title: '印刷サービス | 即日納品・プロ品質 | ZprintPro',
      description: 'ZprintProはプロフェッショナル印刷サービスを提供：チラシ、ポスター、ステッカー、名刺、パンフレット、バナー。即日納品可能、世界各国へ発送。',
    },
  };

  return {
    title: meta[locale]?.title || meta['en'].title,
    description: meta[locale]?.description || meta['en'].description,
    alternates: {
      canonical: `https://zprintpro.com/${locale}/services/`,
    },
  };
}

const servicesList: Record<string, Array<{
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
}>> = {
  services: [
    {
      slug: 'rush-printing-delivery',
      name: {
        'zh-hk': '即日速递服务',
        'en': 'Rush Printing & Delivery',
        'ja': '即日印刷・翌日正午配送',
      },
      description: {
        'zh-hk': '今天下單明天12點前到！6PM截單，通宵印刷。傳單、海報、貼紙、名片、畫冊、易拉寶，支持港鐵站交收。',
        'en': 'Order today, receive by 12PM tomorrow! Cut-off at 6PM. Flyers, posters, stickers, business cards, booklets, banners. MTR station pickup available.',
        'ja': '本日注文、明日12時までにお届け！18:00締切。チラシ、ポスター、ステッカー、名刺、パンフレット。MTR駅受け取り可能。',
      },
    },
  ],
};

export default function ServicesPage({ params }: Props) {
  const locale = params.locale;

  const t = {
    'zh-hk': {
      title: '印刷服務',
      subtitle: '專業印刷解決方案，快速交貨',
      backToHome: '← 返回首頁',
      allServices: '所有服務',
      learnMore: '了解更多',
    },
    'en': {
      title: 'Printing Services',
      subtitle: 'Professional printing solutions, fast delivery',
      backToHome: '← Back to Home',
      allServices: 'All Services',
      learnMore: 'Learn More',
    },
    'ja': {
      title: '印刷サービス',
      subtitle: 'プロフェッショナル印刷ソリューション、迅速納品',
      backToHome: '← ホームに戻る',
      allServices: 'すべてのサービス',
      learnMore: '詳しく見る',
    },
  };

  const labels = t[locale as keyof typeof t] || t['en'];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-500">
            <Link href={`/${locale}/`} className="hover:text-[#2873F5]">
              {locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {locale === 'zh-hk' ? '服務' : locale === 'en' ? 'Services' : 'サービス'}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2873F5] to-[#1a5fd4] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{labels.title}</h1>
          <p className="text-xl text-blue-100 max-w-2xl">{labels.subtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.services.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}/`}
              className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:border-[#2873F5]/30"
            >
              <h3 className="text-lg font-bold text-[#333333] mb-3 group-hover:text-[#2873F5] transition-colors">
                {service.name[locale] || service.name['en']}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {service.description[locale] || service.description['en']}
              </p>
              <span className="inline-flex items-center text-[#2873F5] font-medium text-sm group-hover:underline">
                {labels.learnMore} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links to Product Categories */}
      <section className="bg-white border-t">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-[#333333] mb-8 text-center">
            {locale === 'zh-hk' ? '熱門產品分類' : locale === 'en' ? 'Popular Product Categories' : '人気製品カテゴリー'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { slug: 'flyers', name: { 'zh-hk': '宣傳單張', 'en': 'Flyers', 'ja': 'チラシ' } },
              { slug: 'posters', name: { 'zh-hk': '海報', 'en': 'Posters', 'ja': 'ポスター' } },
              { slug: 'stickers', name: { 'zh-hk': '貼紙', 'en': 'Stickers', 'ja': 'ステッカー' } },
              { slug: 'business-cards', name: { 'zh-hk': '名片', 'en': 'Business Cards', 'ja': '名刺' } },
              { slug: 'packaging', name: { 'zh-hk': '包裝盒', 'en': 'Packaging', 'ja': 'パッケージ' } },
              { slug: 'books', name: { 'zh-hk': '書籍', 'en': 'Books', 'ja': '書籍' } },
              { slug: 'paper-bags', name: { 'zh-hk': '紙袋', 'en': 'Paper Bags', 'ja': '紙袋' } },
              { slug: 'banners', name: { 'zh-hk': '易拉寶', 'en': 'Banners', 'ja': 'バナー' } },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/category/${cat.slug}/`}
                className="block text-center p-4 rounded-lg bg-gray-50 hover:bg-[#2873F5]/5 hover:border-[#2873F5]/30 border border-gray-100 transition-all"
              >
                <span className="text-sm font-medium text-gray-700 hover:text-[#2873F5]">
                  {cat.name[locale as keyof typeof cat.name] || cat.name['en']}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-[#333333] mb-4">
            {locale === 'zh-hk' ? '需要定制印刷服務？' : locale === 'en' ? 'Need Custom Printing Services?' : 'カスタム印刷サービスが必要ですか？'}
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            {locale === 'zh-hk' ? '聯繫我們的專業團隊，獲取免費報價和建議' : locale === 'en' ? 'Contact our professional team for a free quote and advice' : '専門チームに連絡して、無料見積もりとアドバイスを入手'}
          </p>
          <Link
            href={`/${locale}/contact/`}
            className="inline-flex items-center px-6 py-3 bg-[#2873F5] text-white font-semibold rounded-lg hover:bg-[#1a5fd4] transition-colors"
          >
            {locale === 'zh-hk' ? '聯繫我們' : locale === 'en' ? 'Contact Us' : 'お問い合わせ'}
          </Link>
        </div>
      </section>
    </main>
  );
}