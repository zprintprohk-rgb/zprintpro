import { Metadata } from 'next';
import Link from 'next/link';
import { Locale, siteConfig } from '@/lib/seo';

interface BlogPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '印刷知識 | 智印港 ZprintPro',
    description: '智印港印刷知識專欄，分享貼紙、名片、包裝、書刊等印刷工藝、設計技巧與行業趨勢。',
    h1: '印刷知識',
    subtitle: '專業印刷知識與行業洞察',
  },
  en: {
    title: 'Printing Knowledge | ZprintPro',
    description: 'ZprintPro printing knowledge blog. Sharing insights on stickers, business cards, packaging, booklets printing techniques and design tips.',
    h1: 'Printing Knowledge',
    subtitle: 'Professional printing insights and industry trends',
  },
  ja: {
    title: '印刷知識 | ZprintPro',
    description: 'ZprintPro印刷知識ブログ。ステッカー、名刺、包装、冊子などの印刷技術とデザインノウハウをご紹介。',
    h1: '印刷知識',
    subtitle: 'プロの印刷技術と業界トレンド',
  },
};

const articles = {
  'zh-hk': [
    { slug: 'sticker-guide', title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解', date: '2024-04-15', category: '貼紙知識' },
    { slug: 'business-card-design', title: '名片設計的10個黃金法則：打造令人難忘的專業形象', date: '2024-04-10', category: '名片知識' },
    { slug: 'packaging-trends', title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出', date: '2024-04-05', category: '包裝知識' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB：印刷色彩模式完全詳解', date: '2024-03-28', category: '印刷工藝' },
    { slug: 'paper-materials', title: '印刷紙材選擇指南：從銅版紙到特種紙', date: '2024-03-20', category: '印刷工藝' },
    { slug: 'eco-printing', title: '環保印刷：企業ESG與可持續包裝的未來', date: '2024-03-15', category: '行業趨勢' },
  ],
  en: [
    { slug: 'sticker-guide', title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications', date: '2024-04-15', category: 'Sticker Guide' },
    { slug: 'business-card-design', title: '10 Golden Rules for Business Card Design', date: '2024-04-10', category: 'Card Guide' },
    { slug: 'packaging-trends', title: '2024 Packaging Design Trends Analysis', date: '2024-04-05', category: 'Packaging Guide' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB: Complete Guide to Print Color Modes', date: '2024-03-28', category: 'Printing Techniques' },
    { slug: 'paper-materials', title: 'Paper Selection Guide: From Art Paper to Specialty Stock', date: '2024-03-20', category: 'Printing Techniques' },
    { slug: 'eco-printing', title: 'Eco-Friendly Printing: The Future of Sustainable Packaging', date: '2024-03-15', category: 'Industry Trends' },
  ],
  ja: [
    { slug: 'sticker-guide', title: 'ステッカー印刷完全ガイド：材質、加工と応用場面', date: '2024-04-15', category: 'ステッカー知識' },
    { slug: 'business-card-design', title: '名刺デザインの10の黄金法則', date: '2024-04-10', category: '名刺知識' },
    { slug: 'packaging-trends', title: '2024年パッケージデザイントレンド解析', date: '2024-04-05', category: '包装知識' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB：印刷カラーモード完全解説', date: '2024-03-28', category: '印刷技術' },
    { slug: 'paper-materials', title: '印刷用紙選択ガイド：アート紙から特殊紙まで', date: '2024-03-20', category: '印刷技術' },
    { slug: 'eco-printing', title: 'エコ印刷：持続可能な包装の未来', date: '2024-03-15', category: '業界トレンド' },
  ],
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}blog/`,
    },
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;
  const posts = articles[locale] || articles['zh-hk'];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${localePrefix}/blog/${post.slug}/`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-[#2873F5]/10 to-[#F87314]/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#2873F5]/20">{post.title.charAt(0)}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-[#F87314] bg-orange-50 px-2 py-1 rounded">{post.category}</span>
                <h2 className="mt-2 text-lg font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-gray-400">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
