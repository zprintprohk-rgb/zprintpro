import { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Tag, FileText, Package, ImageIcon, ShoppingBag, Printer, Palette, Newspaper, ArrowRight } from 'lucide-react';
import { Locale, siteConfig } from '@/lib/seo';
import { buyingGuides } from '@/data/buying-guides';

interface BlogPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '印刷知識 | 智印港 ZprintPro',
    description: '智印港印刷知識專欄，分享貼紙、名片、包裝、書刊等印刷工藝、設計技巧與行業趨勢。',
    h1: '印刷知識',
    subtitle: '專業印刷知識與行業洞察',
    buyingGuideTag: '選購指南',
  },
  en: {
    title: 'Printing Knowledge | ZprintPro',
    description: 'ZprintPro printing knowledge blog. Sharing insights on stickers, business cards, packaging, booklets printing techniques and design tips.',
    h1: 'Printing Knowledge',
    subtitle: 'Professional printing insights and industry trends',
    buyingGuideTag: 'Buying Guide',
  },
  ja: {
    title: '印刷知識 | ZprintPro',
    description: 'ZprintPro印刷知識ブログ。ステッカー、名刺、包装、冊子などの印刷技術とデザインノウハウをご紹介。',
    h1: '印刷知識',
    subtitle: 'プロの印刷技術と業界トレンド',
    buyingGuideTag: '選び方ガイド',
  },
};

// Blog category navigation data
const blogCategories = {
  'zh-hk': [
    { name: '名片知識', slug: 'business-cards', count: 1, icon: CreditCard, gradient: 'from-blue-500 to-blue-600', bgClass: 'bg-blue-50', textClass: 'text-blue-600' },
    { name: '貼紙知識', slug: 'stickers', count: 1, icon: Tag, gradient: 'from-pink-500 to-pink-600', bgClass: 'bg-pink-50', textClass: 'text-pink-600' },
    { name: '傳單知識', slug: 'flyers', count: 1, icon: FileText, gradient: 'from-green-500 to-green-600', bgClass: 'bg-green-50', textClass: 'text-green-600' },
    { name: '包裝知識', slug: 'packaging', count: 1, icon: Package, gradient: 'from-amber-500 to-amber-600', bgClass: 'bg-amber-50', textClass: 'text-amber-600' },
    { name: '海報知識', slug: 'posters', count: 1, icon: ImageIcon, gradient: 'from-purple-500 to-purple-600', bgClass: 'bg-purple-50', textClass: 'text-purple-600' },
    { name: '紙袋知識', slug: 'paper-bags', count: 1, icon: ShoppingBag, gradient: 'from-cyan-500 to-cyan-600', bgClass: 'bg-cyan-50', textClass: 'text-cyan-600' },
    { name: '印刷工藝', slug: 'printing-techniques', count: 2, icon: Printer, gradient: 'from-gray-500 to-gray-600', bgClass: 'bg-gray-50', textClass: 'text-gray-600' },
    { name: '設計技巧', slug: 'design-tips', count: 1, icon: Palette, gradient: 'from-rose-500 to-rose-600', bgClass: 'bg-rose-50', textClass: 'text-rose-600' },
    { name: '公司新聞', slug: 'company-news', count: 0, icon: Newspaper, gradient: 'from-red-500 to-red-600', bgClass: 'bg-red-50', textClass: 'text-red-600' },
  ],
  'en': [
    { name: 'Business Cards', slug: 'business-cards', count: 1, icon: CreditCard, gradient: 'from-blue-500 to-blue-600', bgClass: 'bg-blue-50', textClass: 'text-blue-600' },
    { name: 'Stickers', slug: 'stickers', count: 1, icon: Tag, gradient: 'from-pink-500 to-pink-600', bgClass: 'bg-pink-50', textClass: 'text-pink-600' },
    { name: 'Flyers', slug: 'flyers', count: 1, icon: FileText, gradient: 'from-green-500 to-green-600', bgClass: 'bg-green-50', textClass: 'text-green-600' },
    { name: 'Packaging', slug: 'packaging', count: 1, icon: Package, gradient: 'from-amber-500 to-amber-600', bgClass: 'bg-amber-50', textClass: 'text-amber-600' },
    { name: 'Posters', slug: 'posters', count: 1, icon: ImageIcon, gradient: 'from-purple-500 to-purple-600', bgClass: 'bg-purple-50', textClass: 'text-purple-600' },
    { name: 'Paper Bags', slug: 'paper-bags', count: 1, icon: ShoppingBag, gradient: 'from-cyan-500 to-cyan-600', bgClass: 'bg-cyan-50', textClass: 'text-cyan-600' },
    { name: 'Techniques', slug: 'printing-techniques', count: 2, icon: Printer, gradient: 'from-gray-500 to-gray-600', bgClass: 'bg-gray-50', textClass: 'text-gray-600' },
    { name: 'Design Tips', slug: 'design-tips', count: 1, icon: Palette, gradient: 'from-rose-500 to-rose-600', bgClass: 'bg-rose-50', textClass: 'text-rose-600' },
    { name: 'Company News', slug: 'company-news', count: 0, icon: Newspaper, gradient: 'from-red-500 to-red-600', bgClass: 'bg-red-50', textClass: 'text-red-600' },
  ],
  'ja': [
    { name: '名刺知識', slug: 'business-cards', count: 1, icon: CreditCard, gradient: 'from-blue-500 to-blue-600', bgClass: 'bg-blue-50', textClass: 'text-blue-600' },
    { name: 'ステッカー知識', slug: 'stickers', count: 1, icon: Tag, gradient: 'from-pink-500 to-pink-600', bgClass: 'bg-pink-50', textClass: 'text-pink-600' },
    { name: 'チラシ知識', slug: 'flyers', count: 1, icon: FileText, gradient: 'from-green-500 to-green-600', bgClass: 'bg-green-50', textClass: 'text-green-600' },
    { name: 'パッケージ知識', slug: 'packaging', count: 1, icon: Package, gradient: 'from-amber-500 to-amber-600', bgClass: 'bg-amber-50', textClass: 'text-amber-600' },
    { name: 'ポスター知識', slug: 'posters', count: 1, icon: ImageIcon, gradient: 'from-purple-500 to-purple-600', bgClass: 'bg-purple-50', textClass: 'text-purple-600' },
    { name: '紙袋知識', slug: 'paper-bags', count: 1, icon: ShoppingBag, gradient: 'from-cyan-500 to-cyan-600', bgClass: 'bg-cyan-50', textClass: 'text-cyan-600' },
    { name: '印刷技術', slug: 'printing-techniques', count: 2, icon: Printer, gradient: 'from-gray-500 to-gray-600', bgClass: 'bg-gray-50', textClass: 'text-gray-600' },
    { name: 'デザインチップ', slug: 'design-tips', count: 1, icon: Palette, gradient: 'from-rose-500 to-rose-600', bgClass: 'bg-rose-50', textClass: 'text-rose-600' },
    { name: '会社ニュース', slug: 'company-news', count: 0, icon: Newspaper, gradient: 'from-red-500 to-red-600', bgClass: 'bg-red-50', textClass: 'text-red-600' },
  ],
};

const articles = {
  'zh-hk': [
    { slug: 'hong-kong-printing-guide', title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？', date: '2024-05-20', category: '香港本地' },
    { slug: 'design-file-specs', title: '印刷文件設計規範：出血位、分辨率、色彩模式一次搞懂', date: '2024-05-15', category: '設計技巧' },
    { slug: 'brand-materials-checklist', title: '企業品牌物料清單：從名片到展架的全套印刷方案', date: '2024-05-10', category: '品牌建設' },
    { slug: 'mtr-advertising-specs', title: '港鐵廣告印刷規格全解析：港島線、觀塘線、荃灣線投放指南', date: '2024-05-05', category: '香港本地' },
    { slug: 'sticker-guide', title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解', date: '2024-04-15', category: '貼紙知識' },
    { slug: 'business-card-design', title: '名片設計的10個黃金法則：打造令人難忘的專業形象', date: '2024-04-10', category: '名片知識' },
    { slug: 'packaging-trends', title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出', date: '2024-04-05', category: '包裝知識' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB：印刷色彩模式完全詳解', date: '2024-03-28', category: '印刷工藝' },
    { slug: 'paper-materials', title: '印刷紙材選擇指南：從銅版紙到特種紙', date: '2024-03-20', category: '印刷工藝' },
    { slug: 'eco-printing', title: '環保印刷：企業ESG與可持續包裝的未來', date: '2024-03-15', category: '行業趨勢' },
  ],
  en: [
    { slug: 'hong-kong-printing-guide', title: 'Hong Kong Printing Company Guide: Kwun Tong, Kowloon & NT', date: '2024-05-20', category: 'Hong Kong Local' },
    { slug: 'design-file-specs', title: 'Print File Design Specifications: Bleed, Resolution & Color Modes', date: '2024-05-15', category: 'Design Tips' },
    { slug: 'brand-materials-checklist', title: 'Corporate Brand Materials Checklist: From Cards to Displays', date: '2024-05-10', category: 'Branding' },
    { slug: 'mtr-advertising-specs', title: 'MTR Advertising Print Specs: Island, Kwun Tong & Tsuen Wan Lines', date: '2024-05-05', category: 'Hong Kong Local' },
    { slug: 'sticker-guide', title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications', date: '2024-04-15', category: 'Sticker Guide' },
    { slug: 'business-card-design', title: '10 Golden Rules for Business Card Design', date: '2024-04-10', category: 'Card Guide' },
    { slug: 'packaging-trends', title: '2024 Packaging Design Trends Analysis', date: '2024-04-05', category: 'Packaging Guide' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB: Complete Guide to Print Color Modes', date: '2024-03-28', category: 'Printing Techniques' },
    { slug: 'paper-materials', title: 'Paper Selection Guide: From Art Paper to Specialty Stock', date: '2024-03-20', category: 'Printing Techniques' },
    { slug: 'eco-printing', title: 'Eco-Friendly Printing: The Future of Sustainable Packaging', date: '2024-03-15', category: 'Industry Trends' },
  ],
  ja: [
    { slug: 'hong-kong-printing-guide', title: '香港印刷会社選び完全ガイド：観塘、九龍、新界', date: '2024-05-20', category: '香港ローカル' },
    { slug: 'design-file-specs', title: '印刷用デザインファイル仕様：裁ち落とし、解像度、カラーモード', date: '2024-05-15', category: 'デザインチップ' },
    { slug: 'brand-materials-checklist', title: '企業ブランド物料チェックリスト：名刺から展示物まで', date: '2024-05-10', category: 'ブランディング' },
    { slug: 'mtr-advertising-specs', title: 'MTR広告印刷仕様：港島線、観塘線、荃湾線', date: '2024-05-05', category: '香港ローカル' },
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
  const langPrefix = `${locale}/`;
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${langPrefix}blog/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/zh-hk/blog/`,
        'en': `${siteConfig.url}/en/blog/`,
        'ja-JP': `${siteConfig.url}/ja/blog/`,
        'x-default': `${siteConfig.url}/en/blog/`,
      },
    },
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const legacyPosts = articles[locale] || articles['zh-hk'];
  const categories = blogCategories[locale] || blogCategories['zh-hk'];

  // Map buying guides for this locale
  const guidePosts = buyingGuides.map((guide) => ({
    slug: guide.slug,
    title: guide.title[locale],
    date: guide.date,
    category: `${t.buyingGuideTag} · ${guide.category[locale]}`,
    isBuyingGuide: true,
  }));

  // Combine: buying guides first, then legacy articles
  const allPosts = [...guidePosts, ...legacyPosts];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Category Navigation */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-[#2873F5] to-[#1E5FD1] rounded-full" />
            <h2 className="text-xl font-bold text-[#333333]">{locale === 'zh-hk' ? '文章分類' : locale === 'en' ? 'Categories' : 'カテゴリー'}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`${localePrefix}/blog/`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-xl ${cat.bgClass} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${cat.textClass}`} />
                      </div>
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                        {cat.count} {locale === 'zh-hk' ? '篇' : locale === 'en' ? 'posts' : '記事'}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-[#333333] group-hover:text-[#2873F5] transition-colors">
                      {cat.name}
                    </h3>
                    <div className="mt-3 flex items-center text-sm text-gray-400 group-hover:text-[#2873F5] transition-colors">
                      <span className="font-medium">{locale === 'zh-hk' ? '查看文章' : locale === 'en' ? 'View Posts' : '記事を見る'}</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`${localePrefix}/blog/${post.slug}/`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-[#2873F5]/10 to-[#F87314]/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#2873F5]/20">{post.title.charAt(0)}</span>
              </div>
              <div className="p-5">
                <span className={`text-xs font-medium px-2 py-1 rounded ${'isBuyingGuide' in post && post.isBuyingGuide ? 'bg-green-50 text-green-600' : 'text-[#F87314] bg-orange-50'}`}>
                  {post.category}
                </span>
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
