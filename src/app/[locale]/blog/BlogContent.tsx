'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/seo';
import { blogPosts } from '@/data/blog-posts';
import { products, getProductTitle, getProductDescription } from '@/data/products';
import { convertPriceRangeString } from '@/lib/pricing';
import { getProductMainImage } from '@/lib/product-image';
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
    author: '智印雲印刷專家',
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

// 封面图与 categoryKey 现已统一在 src/data/blog-posts.ts (2026-06-25)

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

  // 19 篇统一从 @/data/blog-posts 读取 (9 选购指南 + 10 legacy 文章)
  const allPosts = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title[locale],
    date: post.date,
    categoryKey: post.categoryKey,
    categoryLabel:
      post.categoryKey === 'buying-guide'
        ? t.buyingGuideTag
        : t.categories.find((c) => c.key === post.categoryKey)?.label || t.allArticles,
    excerpt: post.excerpt[locale],
    image: post.cover?.[locale] || post.cover?.['zh-hk'] || '',
  }));

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
                        loading="lazy"
                        decoding="async"
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
                        src={getProductMainImage(product, locale)}
                        alt={getProductTitle(product, locale)}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                        loading="lazy"
                        decoding="async"
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
