import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, siteConfig } from '@/lib/seo';
import { buyingGuides } from '@/data/buying-guides';
import { products, getProductTitle, getProductDescription } from '@/data/products';
import { convertPriceRangeString } from '@/lib/pricing';

interface BlogPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '印刷知識 | 智印港 ZprintPro',
    description: '智印港印刷知識專欄，分享貼紙、名片、包裝、書刊等印刷工藝、設計技巧與行業趨勢。',
    h1: '印刷知識',
    subtitle: '專業印刷知識與行業洞察',
    allArticles: '全部文章',
    hotProducts: '熱門產品',
    viewMore: '查詢更多',
    buyingGuideTag: '選購指南',
    datePrefix: '發布於',
    author: '智印港印刷專家',
  },
  'en': {
    title: 'Printing Knowledge | ZprintPro',
    description: 'ZprintPro printing knowledge blog. Sharing insights on stickers, business cards, packaging, booklets printing techniques and design tips.',
    h1: 'Printing Knowledge',
    subtitle: 'Professional printing insights and industry trends',
    allArticles: 'All Articles',
    hotProducts: 'Hot Products',
    viewMore: 'View More',
    buyingGuideTag: 'Buying Guide',
    datePrefix: 'Published',
    author: 'ZprintPro Experts',
  },
  'ja': {
    title: '印刷知識 | ZprintPro',
    description: 'ZprintPro印刷知識ブログ。ステッカー、名刺、包装、冊子などの印刷技術とデザインノウハウをご紹介。',
    h1: '印刷知識',
    subtitle: 'プロの印刷技術と業界トレンド',
    allArticles: 'すべての記事',
    hotProducts: '人気製品',
    viewMore: '詳細を見る',
    buyingGuideTag: '選び方ガイド',
    datePrefix: '公開日',
    author: 'ZprintPro専門家',
  },
};

// 文章圖片映射
const articleImages: Record<string, string> = {
  'hong-kong-printing-guide': '/images/articles/brand-story.jpg',
  'design-file-specs': '/images/articles/cmyk-rgb.jpg',
  'brand-materials-checklist': '/images/articles/lai-see.jpg',
  'mtr-advertising-specs': '/images/articles/brand-story.jpg',
  'sticker-guide': '/images/articles/sticker-guide.jpg',
  'business-card-design': '/images/articles/lai-see.jpg',
  'packaging-trends': '/images/articles/brand-story.jpg',
  'cmyk-guide': '/images/articles/cmyk-rgb.jpg',
  'paper-materials': '/images/articles/brand-story.jpg',
  'eco-printing': '/images/articles/sticker-guide.jpg',
};

const defaultArticleImage = '/images/articles/sticker-guide.jpg';

const articles = {
  'zh-hk': [
    { slug: 'hong-kong-printing-guide', title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？', date: '2024-05-20', category: '香港本地', excerpt: '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價，幫您找到最適合的印刷合作夥伴。' },
    { slug: 'design-file-specs', title: '印刷文件設計規範：出血位、分辨率、色彩模式一次搞懂', date: '2024-05-15', category: '設計技巧', excerpt: '從出血位設置到色彩模式轉換，這篇指南將幫助設計師和企業避免最常見的印刷文件錯誤。' },
    { slug: 'brand-materials-checklist', title: '企業品牌物料清單：從名片到展架的全套印刷方案', date: '2024-05-10', category: '品牌建設', excerpt: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求。' },
    { slug: 'mtr-advertising-specs', title: '港鐵廣告印刷規格全解析：港島線、觀塘線、荃灣線投放指南', date: '2024-05-05', category: '香港本地', excerpt: '詳細解析港鐵各線路廣告位的印刷規格、尺寸要求和投放策略。' },
    { slug: 'sticker-guide', title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解', date: '2024-04-15', category: '貼紙知識', excerpt: '深入了解香港貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。' },
    { slug: 'business-card-design', title: '名片設計的10個黃金法則：打造令人難忘的專業形象', date: '2024-04-10', category: '名片知識', excerpt: '從排版到色彩搭配，掌握名片設計的核心技巧，助您打造令人印象深刻的專業名片。' },
    { slug: 'packaging-trends', title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出', date: '2024-04-05', category: '包裝知識', excerpt: '探索2024年最新包裝盒設計趨勢，從極簡主義到環保材質，讓產品包裝成為品牌最佳代言人。' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB：印刷色彩模式完全詳解', date: '2024-03-28', category: '印刷工藝', excerpt: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。' },
    { slug: 'paper-materials', title: '印刷紙材選擇指南：從銅版紙到特種紙', date: '2024-03-20', category: '印刷工藝', excerpt: '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。' },
    { slug: 'eco-printing', title: '環保印刷：企業ESG與可持續包裝的未來', date: '2024-03-15', category: '行業趨勢', excerpt: '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。' },
  ],
  'en': [
    { slug: 'hong-kong-printing-guide', title: 'Hong Kong Printing Company Guide: Kwun Tong, Kowloon & NT', date: '2024-05-20', category: 'Hong Kong Local', excerpt: 'Compare printing companies across Hong Kong from pricing to quality to find your ideal partner.' },
    { slug: 'design-file-specs', title: 'Print File Design Specifications: Bleed, Resolution & Color Modes', date: '2024-05-15', category: 'Design Tips', excerpt: 'Master bleed settings, resolution requirements, and color mode conversions for perfect prints.' },
    { slug: 'brand-materials-checklist', title: 'Corporate Brand Materials Checklist: From Cards to Displays', date: '2024-05-10', category: 'Branding', excerpt: 'A complete checklist of printed brand materials for startups and brand refreshes.' },
    { slug: 'mtr-advertising-specs', title: 'MTR Advertising Print Specs: Island, Kwun Tong & Tsuen Wan Lines', date: '2024-05-05', category: 'Hong Kong Local', excerpt: 'Detailed specifications and strategies for MTR advertising across Hong Kong.' },
    { slug: 'sticker-guide', title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications', date: '2024-04-15', category: 'Sticker Guide', excerpt: 'Deep dive into sticker material choices, surface treatments, and application scenarios.' },
    { slug: 'business-card-design', title: '10 Golden Rules for Business Card Design', date: '2024-04-10', category: 'Card Guide', excerpt: 'Master the core techniques of business card design.' },
    { slug: 'packaging-trends', title: '2024 Packaging Design Trends Analysis', date: '2024-04-05', category: 'Packaging Guide', excerpt: 'Explore latest packaging design trends.' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB: Complete Guide to Print Color Modes', date: '2024-03-28', category: 'Printing Techniques', excerpt: 'Understand color modes for optimal print results.' },
    { slug: 'paper-materials', title: 'Paper Selection Guide: From Art Paper to Specialty Stock', date: '2024-03-20', category: 'Printing Techniques', excerpt: 'Analysis of different paper characteristics.' },
    { slug: 'eco-printing', title: 'Eco-Friendly Printing: The Future of Sustainable Packaging', date: '2024-03-15', category: 'Industry Trends', excerpt: 'Learn about eco-friendly printing materials.' },
  ],
  'ja': [
    { slug: 'hong-kong-printing-guide', title: '香港印刷会社選び完全ガイド：観塘、九龍、新界', date: '2024-05-20', category: '香港ローカル', excerpt: '香港の観塘、九龍、新界の印刷会社を比較し、最適なパートナーを選びましょう。' },
    { slug: 'design-file-specs', title: '印刷用デザインファイル仕様：裁ち落とし、解像度、カラーモード', date: '2024-05-15', category: 'デザインチップ', excerpt: '裁ち落とし、解像度、カラーモードについて学びましょう。' },
    { slug: 'brand-materials-checklist', title: '企業ブランド物料チェックリスト', date: '2024-05-10', category: 'ブランディング', excerpt: '名刺から展示物まで、ブランド構築に必要な印刷物料を確認しましょう。' },
    { slug: 'mtr-advertising-specs', title: 'MTR広告印刷仕様', date: '2024-05-05', category: '香港ローカル', excerpt: '港島線、観塘線、荃湾線の広告印刷規格について解説します。' },
    { slug: 'sticker-guide', title: 'ステッカー印刷完全ガイド：材質、加工と応用場面', date: '2024-04-15', category: 'ステッカー知識', excerpt: 'ステッカーの材質選び、表面加工、応用場面について深く理解しましょう。' },
    { slug: 'business-card-design', title: '名刺デザインの10の黄金法則', date: '2024-04-10', category: '名刺知識', excerpt: 'レイアウトから配色まで、名刺デザインの核心技術をマスターしましょう。' },
    { slug: 'packaging-trends', title: '2024年パッケージデザイントレンド解析', date: '2024-04-05', category: '包装知識', excerpt: '最新のパッケージデザイントレンドを探ります。' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB：印刷カラーモード完全解説', date: '2024-03-28', category: '印刷技術', excerpt: 'CMYKとRGBの違いを理解し、最適な印刷結果を得ましょう。' },
    { slug: 'paper-materials', title: '印刷用紙選択ガイド：アート紙から特殊紙まで', date: '2024-03-20', category: '印刷技術', excerpt: '異なる紙の特性を分析し、最適な用紙を選びましょう。' },
    { slug: 'eco-printing', title: 'エコ印刷：持続可能な包装の未来', date: '2024-03-15', category: '業界トレンド', excerpt: '地球とブランドの両方のために、エコ印刷について学びましょう。' },
  ],
};

// 分類顏色映射
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  '香港本地': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  '設計技巧': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  '品牌建設': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  '貼紙知識': { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  '名片知識': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
  '包裝知識': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  '印刷工藝': { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
  '行業趨勢': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  'Hong Kong Local': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  'Design Tips': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  'Branding': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  'Sticker Guide': { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  'Card Guide': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
  'Packaging Guide': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  'Printing Techniques': { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
  'Industry Trends': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
};

function getCategoryColor(category: string) {
  return categoryColors[category] || { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' };
}

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

  // Map buying guides
  const guidePosts = buyingGuides.map((guide) => ({
    slug: guide.slug,
    title: guide.title[locale],
    date: guide.date,
    category: `${t.buyingGuideTag}`,
    excerpt: guide.description[locale],
    isBuyingGuide: true,
    image: articleImages[guide.slug] || defaultArticleImage,
  }));

  // Combine: buying guides first, then legacy articles
  const allPosts = [
    ...guidePosts,
    ...legacyPosts.map((post) => ({
      ...post,
      isBuyingGuide: false,
      image: articleImages[post.slug] || defaultArticleImage,
    })),
  ];

  // Extract unique categories for tabs
  const uniqueCategories = Array.from(new Set(allPosts.map((p) => p.category)));
  const tabs = [t.allArticles, ...uniqueCategories];

  // Hot products for sidebar
  const hotProducts = products
    .filter((p) => p.isHot)
    .sort((a, b) => b.weight_score - a.weight_score)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                className="px-5 py-2.5 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#2873F5] hover:text-white hover:border-[#2873F5] transition-colors whitespace-nowrap"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Articles + Sidebar */}
        <div className="flex gap-8 items-start">
          {/* Left: Articles Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {allPosts.map((post) => {
                const colors = getCategoryColor(post.category);
                return (
                  <Link
                    key={post.slug}
                    href={`${localePrefix}/blog/${post.slug}/`}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {post.category}
                      </span>
                      <h2 className="mt-3 text-base font-bold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-gray-400">{post.date}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Hot Products Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="text-lg font-bold text-[#333333] mb-5 pb-3 border-b border-gray-100">
                {t.hotProducts}
              </h3>
              <div className="space-y-5">
                {hotProducts.map((product) => (
                  <Link
                    key={product.sku_code}
                    href={`${localePrefix}/product/${product.slug}/`}
                    className="group flex gap-3"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        src={product.images[0] || '/images/placeholder.jpg'}
                        alt={getProductTitle(product, locale)}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-2">
                        {getProductTitle(product, locale)}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {getProductDescription(product, locale).slice(0, 40)}...
                      </p>
                      <p className="text-sm text-[#F87314] font-bold mt-1">
                        {convertPriceRangeString(product.price_range, locale).split('-')[0]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
