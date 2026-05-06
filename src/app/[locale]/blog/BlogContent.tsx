'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/seo';
import { buyingGuides } from '@/data/buying-guides';
import { products, getProductTitle, getProductDescription } from '@/data/products';
import { convertPriceRangeString } from '@/lib/pricing';
import { ChevronRight } from 'lucide-react';

const translations: Record<string, {
  h1: string;
  subtitle: string;
  allArticles: string;
  contentCategories: string;
  hotProducts: string;
  viewMore: string;
  buyingGuideTag: string;
  datePrefix: string;
  author: string;
  categories: { key: string; label: string }[];
}> = {
  'zh-hk': {
    h1: '印刷知識',
    subtitle: '專業印刷知識與行業洞察',
    allArticles: '全部文章',
    contentCategories: '內容分類',
    hotProducts: '熱門產品',
    viewMore: '查詢更多',
    buyingGuideTag: '選購指南',
    datePrefix: '發布於',
    author: '智印云印刷專家',
    categories: [
      { key: 'company-news', label: '公司新聞' },
      { key: 'sticker', label: '貼紙知識' },
      { key: 'card', label: '名片知識' },
      { key: 'packaging', label: '包裝盒知識' },
      { key: 'printing', label: '印刷工藝' },
      { key: 'design', label: '設計技巧' },
      { key: 'branding', label: '品牌建設' },
      { key: 'hongkong', label: '香港本地' },
      { key: 'trends', label: '行業趨勢' },
      { key: 'buying-guide', label: '選購指南' },
    ],
  },
  'en': {
    h1: 'Printing Knowledge',
    subtitle: 'Professional printing insights and industry trends',
    allArticles: 'All Articles',
    contentCategories: 'Categories',
    hotProducts: 'Hot Products',
    viewMore: 'View More',
    buyingGuideTag: 'Buying Guide',
    datePrefix: 'Published',
    author: 'ZprintPro Experts',
    categories: [
      { key: 'company-news', label: 'Company News' },
      { key: 'sticker', label: 'Sticker Guide' },
      { key: 'card', label: 'Card Guide' },
      { key: 'packaging', label: 'Packaging Guide' },
      { key: 'printing', label: 'Printing Techniques' },
      { key: 'design', label: 'Design Tips' },
      { key: 'branding', label: 'Branding' },
      { key: 'hongkong', label: 'Hong Kong Local' },
      { key: 'trends', label: 'Industry Trends' },
      { key: 'buying-guide', label: 'Buying Guide' },
    ],
  },
  'ja': {
    h1: '印刷知識',
    subtitle: 'プロの印刷技術と業界トレンド',
    allArticles: 'すべての記事',
    contentCategories: 'カテゴリー',
    hotProducts: '人気製品',
    viewMore: '詳細を見る',
    buyingGuideTag: '選び方ガイド',
    datePrefix: '公開日',
    author: 'ZprintPro専門家',
    categories: [
      { key: 'company-news', label: '会社ニュース' },
      { key: 'sticker', label: 'ステッカー知識' },
      { key: 'card', label: '名刺知識' },
      { key: 'packaging', label: '包装知識' },
      { key: 'printing', label: '印刷技術' },
      { key: 'design', label: 'デザインチップ' },
      { key: 'branding', label: 'ブランディング' },
      { key: 'hongkong', label: '香港ローカル' },
      { key: 'trends', label: '業界トレンド' },
      { key: 'buying-guide', label: '選び方ガイド' },
    ],
  },
};

const articleImages: Record<string, string> = {
  'company-intro': '/images/factory/factory-banner.jpg',
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

const articles: Record<string, { slug: string; title: string; date: string; category: string; excerpt: string }[]> = {
  'zh-hk': [
    { slug: 'company-intro', title: '智印云印刷公司簡介：專業設備與一站式印刷服務', date: '2024-06-01', category: 'company-news', excerpt: '智印云擁有海德堡6+1印刷機、HP數碼印刷機、馬天尼膠裝線等先進設備，提供從設計到印刷到後加工的一站式服務。' },
    { slug: 'hong-kong-printing-guide', title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？', date: '2024-05-20', category: 'hongkong', excerpt: '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價，幫您找到最適合的印刷合作夥伴。' },
    { slug: 'design-file-specs', title: '印刷文件設計規範：出血位、分辨率、色彩模式一次搞懂', date: '2024-05-15', category: 'design', excerpt: '從出血位設置到色彩模式轉換，這篇指南將幫助設計師和企業避免最常見的印刷文件錯誤。' },
    { slug: 'brand-materials-checklist', title: '企業品牌物料清單：從名片到展架的全套印刷方案', date: '2024-05-10', category: 'branding', excerpt: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求。' },
    { slug: 'mtr-advertising-specs', title: '港鐵廣告印刷規格全解析：港島線、觀塘線、荃灣線投放指南', date: '2024-05-05', category: 'hongkong', excerpt: '詳細解析港鐵各線路廣告位的印刷規格、尺寸要求和投放策略。' },
    { slug: 'sticker-guide', title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解', date: '2024-04-15', category: 'sticker', excerpt: '深入了解香港貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。' },
    { slug: 'business-card-design', title: '名片設計的10個黃金法則：打造令人難忘的專業形象', date: '2024-04-10', category: 'card', excerpt: '從排版到色彩搭配，掌握名片設計的核心技巧，助您打造令人印象深刻的專業名片。' },
    { slug: 'packaging-trends', title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出', date: '2024-04-05', category: 'packaging', excerpt: '探索2024年最新包裝盒設計趨勢，從極簡主義到環保材質，讓產品包裝成為品牌最佳代言人。' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB：印刷色彩模式完全詳解', date: '2024-03-28', category: 'printing', excerpt: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。' },
    { slug: 'paper-materials', title: '印刷紙材選擇指南：從銅版紙到特種紙', date: '2024-03-20', category: 'printing', excerpt: '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。' },
    { slug: 'eco-printing', title: '環保印刷：企業ESG與可持續包裝的未來', date: '2024-03-15', category: 'trends', excerpt: '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。' },
  ],
  'en': [
    { slug: 'company-intro', title: 'About ZprintPro: Professional Equipment & One-Stop Printing Services', date: '2024-06-01', category: 'company-news', excerpt: 'ZprintPro features Heidelberg 6+1 printing presses, HP digital printers, and Martini perfect binding lines for full-service printing.' },
    { slug: 'hong-kong-printing-guide', title: 'Hong Kong Printing Company Guide: Kwun Tong, Kowloon & NT', date: '2024-05-20', category: 'hongkong', excerpt: 'Compare printing companies across Hong Kong from pricing to quality to find your ideal partner.' },
    { slug: 'design-file-specs', title: 'Print File Design Specifications: Bleed, Resolution & Color Modes', date: '2024-05-15', category: 'design', excerpt: 'Master bleed settings, resolution requirements, and color mode conversions for perfect prints.' },
    { slug: 'brand-materials-checklist', title: 'Corporate Brand Materials Checklist: From Cards to Displays', date: '2024-05-10', category: 'branding', excerpt: 'A complete checklist of printed brand materials for startups and brand refreshes.' },
    { slug: 'mtr-advertising-specs', title: 'MTR Advertising Print Specs: Island, Kwun Tong & Tsuen Wan Lines', date: '2024-05-05', category: 'hongkong', excerpt: 'Detailed specifications and strategies for MTR advertising across Hong Kong.' },
    { slug: 'sticker-guide', title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications', date: '2024-04-15', category: 'sticker', excerpt: 'Deep dive into sticker material choices, surface treatments, and application scenarios.' },
    { slug: 'business-card-design', title: '10 Golden Rules for Business Card Design', date: '2024-04-10', category: 'card', excerpt: 'Master the core techniques of business card design.' },
    { slug: 'packaging-trends', title: '2024 Packaging Design Trends Analysis', date: '2024-04-05', category: 'packaging', excerpt: 'Explore latest packaging design trends.' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB: Complete Guide to Print Color Modes', date: '2024-03-28', category: 'printing', excerpt: 'Understand color modes for optimal print results.' },
    { slug: 'paper-materials', title: 'Paper Selection Guide: From Art Paper to Specialty Stock', date: '2024-03-20', category: 'printing', excerpt: 'Analysis of different paper characteristics.' },
    { slug: 'eco-printing', title: 'Eco-Friendly Printing: The Future of Sustainable Packaging', date: '2024-03-15', category: 'trends', excerpt: 'Learn about eco-friendly printing materials.' },
  ],
  'ja': [
    { slug: 'company-intro', title: 'ZprintPro会社概要：専門設備とワンストップ印刷サービス', date: '2024-06-01', category: 'company-news', excerpt: 'ZprintProはハイデルベルグ6+1印刷機、HPデジタル印刷機、マルティニ製本ラインなどの先進設備を保有しています。' },
    { slug: 'hong-kong-printing-guide', title: '香港印刷会社選び完全ガイド：観塘、九龍、新界', date: '2024-05-20', category: 'hongkong', excerpt: '香港の観塘、九龍、新界の印刷会社を比較し、最適なパートナーを選びましょう。' },
    { slug: 'design-file-specs', title: '印刷用デザインファイル仕様：裁ち落とし、解像度、カラーモード', date: '2024-05-15', category: 'design', excerpt: '裁ち落とし、解像度、カラーモードについて学びましょう。' },
    { slug: 'brand-materials-checklist', title: '企業ブランド物料チェックリスト', date: '2024-05-10', category: 'branding', excerpt: '名刺から展示物まで、ブランド構築に必要な印刷物料を確認しましょう。' },
    { slug: 'mtr-advertising-specs', title: 'MTR広告印刷仕様', date: '2024-05-05', category: 'hongkong', excerpt: '港島線、観塘線、荃湾線の広告印刷規格について解説します。' },
    { slug: 'sticker-guide', title: 'ステッカー印刷完全ガイド：材質、加工と応用場面', date: '2024-04-15', category: 'sticker', excerpt: 'ステッカーの材質選び、表面加工、応用場面について深く理解しましょう。' },
    { slug: 'business-card-design', title: '名刺デザインの10の黄金法則', date: '2024-04-10', category: 'card', excerpt: 'レイアウトから配色まで、名刺デザインの核心技術をマスターしましょう。' },
    { slug: 'packaging-trends', title: '2024年パッケージデザイントレンド解析', date: '2024-04-05', category: 'packaging', excerpt: '最新のパッケージデザイントレンドを探ります。' },
    { slug: 'cmyk-guide', title: 'CMYK vs RGB：印刷カラーモード完全解説', date: '2024-03-28', category: 'printing', excerpt: 'CMYKとRGBの違いを理解し、最適な印刷結果を得ましょう。' },
    { slug: 'paper-materials', title: '印刷用紙選択ガイド：アート紙から特殊紙まで', date: '2024-03-20', category: 'printing', excerpt: '異なる紙の特性を分析し、最適な用紙を選びましょう。' },
    { slug: 'eco-printing', title: 'エコ印刷：持続可能な包装の未来', date: '2024-03-15', category: 'trends', excerpt: '地球とブランドの両方のために、エコ印刷について学びましょう。' },
  ],
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  'company-news': { bg: 'bg-red-50', text: 'text-red-600' },
  'sticker': { bg: 'bg-pink-50', text: 'text-pink-600' },
  'card': { bg: 'bg-cyan-50', text: 'text-cyan-600' },
  'packaging': { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  'printing': { bg: 'bg-gray-50', text: 'text-gray-600' },
  'design': { bg: 'bg-purple-50', text: 'text-purple-600' },
  'branding': { bg: 'bg-amber-50', text: 'text-amber-600' },
  'hongkong': { bg: 'bg-blue-50', text: 'text-blue-600' },
  'trends': { bg: 'bg-green-50', text: 'text-green-600' },
  'buying-guide': { bg: 'bg-orange-50', text: 'text-orange-600' },
};

function getCategoryColor(key: string) {
  return categoryColors[key] || { bg: 'bg-orange-50', text: 'text-orange-600' };
}

export default function BlogContent({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const legacyPosts = articles[locale] || articles['zh-hk'];

  const guidePosts = buyingGuides.map((guide) => ({
    slug: guide.slug,
    title: guide.title[locale],
    date: guide.date,
    categoryKey: 'buying-guide',
    categoryLabel: t.buyingGuideTag,
    excerpt: guide.description[locale],
    image: articleImages[guide.slug] || defaultArticleImage,
  }));

  const legacyPostItems = legacyPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    categoryKey: post.category,
    categoryLabel: t.categories.find((c) => c.key === post.category)?.label || post.category,
    excerpt: post.excerpt,
    image: articleImages[post.slug] || defaultArticleImage,
  }));

  const allPosts = [...guidePosts, ...legacyPostItems];

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return allPosts;
    return allPosts.filter((post) => post.categoryKey === activeCategory);
  }, [activeCategory, allPosts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allPosts.forEach((post) => {
      counts[post.categoryKey] = (counts[post.categoryKey] || 0) + 1;
    });
    return counts;
  }, [allPosts]);

  const hotProducts = useMemo(() =>
    products
      .filter((p) => p.isHot)
      .sort((a, b) => b.weight_score - a.weight_score)
      .slice(0, 4),
    []
  );

  const countSuffix = locale === 'zh-hk' ? '篇' : locale === 'ja' ? '件' : 'posts';

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Category Tabs (Mobile/Top) */}
        <div className="mb-8 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 text-sm font-medium rounded-full border whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#2873F5] text-white border-[#2873F5]'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-[#2873F5] hover:text-white hover:border-[#2873F5]'
              }`}
            >
              {t.allArticles}
            </button>
            {t.categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full border whitespace-nowrap transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-[#2873F5] text-white border-[#2873F5]'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-[#2873F5] hover:text-white hover:border-[#2873F5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-8 items-start">
          {/* Left: Articles */}
          <div className="flex-1 min-w-0">
            {/* Desktop Category Tabs */}
            <div className="hidden lg:flex gap-2 flex-wrap mb-8">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 text-sm font-medium rounded-full border whitespace-nowrap transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-[#2873F5] text-white border-[#2873F5]'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-[#2873F5] hover:text-white hover:border-[#2873F5]'
                }`}
              >
                {t.allArticles}
              </button>
              {t.categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full border whitespace-nowrap transition-colors ${
                    activeCategory === cat.key
                      ? 'bg-[#2873F5] text-white border-[#2873F5]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-[#2873F5] hover:text-white hover:border-[#2873F5]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Article Count */}
            <p className="text-sm text-gray-400 mb-4">
              {activeCategory === 'all'
                ? `${t.allArticles} · ${filteredPosts.length} ${countSuffix}`
                : `${t.categories.find((c) => c.key === activeCategory)?.label} · ${filteredPosts.length} ${countSuffix}`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts.map((post) => {
                const colors = getCategoryColor(post.categoryKey);
                return (
                  <Link
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
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${colors.bg} ${colors.text}`}>
                        {post.categoryLabel}
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

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                {locale === 'zh-hk' ? '暫無該分類文章' : locale === 'ja' ? 'このカテゴリーの記事はありません' : 'No articles in this category'}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0 space-y-6">
            {/* Content Categories */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-base font-bold text-[#333333] mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#2873F5] rounded-full"></span>
                {t.contentCategories}
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-[#2873F5] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{t.allArticles}</span>
                  <span className={`text-xs ${activeCategory === 'all' ? 'text-white/80' : 'text-gray-400'}`}>
                    {allPosts.length}
                  </span>
                </button>
                {t.categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.key
                        ? 'bg-[#2873F5] text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-xs ${activeCategory === cat.key ? 'text-white/80' : 'text-gray-400'}`}>
                      {categoryCounts[cat.key] || 0}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-3 text-sm text-[#2873F5] hover:underline flex items-center gap-1"
              >
                {t.allArticles}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Hot Products */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="text-base font-bold text-[#333333] mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#F87314] rounded-full"></span>
                {t.hotProducts}
              </h3>
              <div className="space-y-5">
                {hotProducts.map((product) => (
                  <Link
                    key={product.sku_code}
                    href={`${localePrefix}/product/${product.slug}/`}
                    className="group flex gap-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        src={product.imagesByLocale?.[locale]?.[0] || product.images[0] || '/images/placeholder.jpg'}
                        alt={getProductTitle(product, locale)}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-2">
                        {getProductTitle(product, locale)}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {getProductDescription(product, locale).slice(0, 35)}...
                      </p>
                      <p className="text-sm text-[#F87314] font-bold mt-1">
                        {convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug).split('-')[0]}
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
