'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/seo';
import { blogPosts } from '@/data/blog-posts';
import { products, getProductTitle, getProductDescription } from '@/data/products';
import { convertPriceRangeString } from '@/lib/pricing';
import { getProductMainImage } from '@/lib/product-image';
import { ChevronRight, Calendar, Tag, MessageCircle } from 'lucide-react';

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
  featured: string;
  moreArticles: string;
  readMore: string;
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
    author: '智印港印刷專家',
    featured: '本週精選',
    moreArticles: '更多文章',
    readMore: '閱讀全文 →',
    categories: [
      { key: 'company-news', label: '公司新聞' },
      { key: 'sticker', label: '貼紙知識' },
      { key: 'card', label: '贴纸知識' },
      { key: 'packaging', label: '包裝盒知識' },
      { key: 'printing', label: '印刷工藝' },
      { key: 'design', label: '設計技巧' },
      { key: 'branding', label: '品牌建設' },
      { key: 'hongkong', label: '香港本地' },
      { key: 'trends', label: '行業趨勢' },
      { key: 'buying-guide', label: '選購指南' },
      // 2026-08-04 K3 拍板: 加 12 新产品类目 tabs (25 blog 全部归类, paper-bags x7 + flyers x3 + posters x3 + creator-ip/wedding-envelope/japan-doujin x2 + menus/red-packets/cross-border/education/banners/food-packaging x1)
      { key: 'paper-bags', label: '紙袋印刷' },
      { key: 'flyers', label: '傳單印刷' },
      { key: 'posters', label: '海報印刷' },
      { key: 'creator-ip', label: '文創IP' },
      { key: 'wedding-envelope', label: '婚慶信封' },
      { key: 'japan-doujin', label: '同人週邊' },
      { key: 'menus', label: '餐牌印刷' },
      { key: 'red-packets', label: '利是封' },
      { key: 'cross-border', label: '跨境電商' },
      { key: 'education', label: '教育培訓' },
      { key: 'banners', label: '易拉寶' },
      { key: 'food-packaging', label: '食品包裝' },
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
    featured: 'Featured This Week',
    moreArticles: 'More Articles',
    readMore: 'Read more →',
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
      // 2026-08-04 K3 拍板: 加 12 新产品类目 tabs
      { key: 'paper-bags', label: 'Paper Bags' },
      { key: 'flyers', label: 'Flyers' },
      { key: 'posters', label: 'Posters' },
      { key: 'creator-ip', label: 'Creator IP' },
      { key: 'wedding-envelope', label: 'Wedding Envelope' },
      { key: 'japan-doujin', label: 'Japan Doujin' },
      { key: 'menus', label: 'Menus' },
      { key: 'red-packets', label: 'Red Packets' },
      { key: 'cross-border', label: 'Cross-Border' },
      { key: 'education', label: 'Education' },
      { key: 'banners', label: 'Banners' },
      { key: 'food-packaging', label: 'Food Packaging' },
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
    featured: '今週のおすすめ',
    moreArticles: 'もっと記事を見る',
    readMore: '続きを読む →',
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
      // 2026-08-04 K3 拍板: 加 12 新产品类目 tabs
      { key: 'paper-bags', label: '紙袋印刷' },
      { key: 'flyers', label: 'チラシ' },
      { key: 'posters', label: 'ポスター' },
      { key: 'creator-ip', label: 'クリエイターIP' },
      { key: 'wedding-envelope', label: 'ウェディング封筒' },
      { key: 'japan-doujin', label: '同人周邊' },
      { key: 'menus', label: 'メニュー' },
      { key: 'red-packets', label: '紅包' },
      { key: 'cross-border', label: '越境EC' },
      { key: 'education', label: '教育研修' },
      { key: 'banners', label: 'バナー' },
      { key: 'food-packaging', label: '食品パッケージ' },
    ],
  },
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
  'flyers': { bg: 'bg-rose-50', text: 'text-rose-600' },
  'food-packaging': { bg: 'bg-lime-50', text: 'text-lime-700' },
  'paper-bags': { bg: 'bg-amber-50', text: 'text-amber-700' },
  'posters': { bg: 'bg-violet-50', text: 'text-violet-600' },
  'restaurant-flyer': { bg: 'bg-orange-50', text: 'text-orange-700' },
};

function getCategoryColor(key: string) {
  return categoryColors[key] || { bg: 'bg-gray-50', text: 'text-gray-600' };
}

/**
 * Top 2 = "Featured" (hero cards with cover images, big & visual).
 * Rest = compact text list (no image) — saves vertical space, easy to scan
 * when article count grows to hundreds.
 *
 * Sort: by date DESC (latest = most recent and most relevant).
 * No analytics -> use latest as proxy for "popular/new".
 */
const FEATURED_COUNT = 2;

export default function BlogContent({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const allPosts = useMemo(() => blogPosts
    .map((post) => ({
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
    }))
    // Newest first
    .sort((a, b) => (b.date || '').localeCompare(a.date || '')),
    [locale, t]
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return allPosts;
    return allPosts.filter((post) => post.categoryKey === activeCategory);
  }, [activeCategory, allPosts]);

  const featured = filteredPosts.slice(0, FEATURED_COUNT);
  const rest = filteredPosts.slice(FEATURED_COUNT);

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
    <main className="min-h-screen bg-white">
      {/* Hero band — professional knowledge base */}
      <section className="bg-[#0F1F3D] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="inline-flex items-center gap-2 text-[#F87314] text-[13px] font-semibold tracking-[.12em] uppercase mb-4">
            <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />
            {locale === 'zh-hk' ? '印刷知識庫' : locale === 'ja' ? '印刷ナレッジ' : 'Printing Knowledge'}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.15] tracking-tight max-w-[720px]">{t.h1}</h1>
          <p className="mt-4 text-white/80 text-base md:text-lg max-w-[560px] leading-relaxed">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/85">
            {[
              locale === 'zh-hk' ? '印刷工藝・設計技巧・行業趨勢' : locale === 'ja' ? '印刷技術・デザイン・業界トレンド' : 'Process, Design Tips & Industry Trends',
              locale === 'zh-hk' ? '30 秒 AI 報價' : locale === 'ja' ? '30秒AI見積もり' : '30s AI Quote',
              locale === 'zh-hk' ? '15 分鐘內專人回覆' : locale === 'ja' ? '15分以内に専門スタッフが返信' : 'Reply within 15 minutes',
            ].map((s) => (
              <span key={s} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F87314]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                {s}
              </span>
            ))}
          </div>
          <a
            href={`https://wa.me/8619880851334?text=${encodeURIComponent(locale === 'zh-hk' ? '我想查詢印刷報價' : locale === 'ja' ? '印刷の見積もりを依頼したい' : 'I want a printing quote')}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-9 rounded-xl bg-[#F87314] text-white font-bold px-7 py-3.5 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all"
            data-event="whatsapp_click" data-source="blog-hero" data-locale={locale}
          >
            <MessageCircle size={18} />
            {locale === 'zh-hk' ? 'WhatsApp 即時報價' : locale === 'ja' ? 'WhatsAppで見積もり' : 'WhatsApp for a Quote'}
          </a>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          {/* Left rail: categories + hot products */}
          <aside className="w-full lg:w-[260px] flex-shrink-0">
            <div className="hidden lg:block">
              <p className="text-[13px] font-bold tracking-[.12em] uppercase text-[#2873F5] mb-4">{t.contentCategories}</p>
              <ul className="border-t border-gray-100">
                <li className="border-b border-gray-100">
                  <button onClick={() => setActiveCategory('all')} className={`w-full text-left py-3 text-[15px] font-semibold flex items-center justify-between transition-colors ${activeCategory === 'all' ? 'text-[#2873F5]' : 'text-gray-600 hover:text-[#2873F5]'}`}>
                    <span>{t.allArticles}</span>
                    <span className="text-xs text-gray-400">{allPosts.length}</span>
                  </button>
                </li>
                {t.categories.map((cat) => (
                  <li key={cat.key} className="border-b border-gray-100">
                    <button onClick={() => setActiveCategory(cat.key)} className={`w-full text-left py-3 text-[15px] font-semibold flex items-center justify-between transition-colors ${activeCategory === cat.key ? 'text-[#2873F5]' : 'text-gray-600 hover:text-[#2873F5]'}`}>
                      <span>{cat.label}</span>
                      <span className="text-xs text-gray-400">{categoryCounts[cat.key] || 0}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile category scroll */}
            <div className="lg:hidden mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-colors ${activeCategory === 'all' ? 'bg-[#2873F5] text-white border-[#2873F5]' : 'bg-white text-gray-600 border-gray-200'}`}>{t.allArticles}</button>
                {t.categories.map((cat) => (
                  <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-colors ${activeCategory === cat.key ? 'bg-[#2873F5] text-white border-[#2873F5]' : 'bg-white text-gray-600 border-gray-200'}`}>{cat.label}</button>
                ))}
              </div>
            </div>

            {/* Hot products card */}
            <div className="mt-2 rounded-2xl border border-gray-100 bg-[#F9FAFB] p-5">
              <p className="text-[13px] font-bold tracking-[.12em] uppercase text-[#2873F5] mb-4">{t.hotProducts}</p>
              <ul className="space-y-3">
                {hotProducts.map((prod) => (
                  <li key={prod.slug}>
                    <Link href={`${localePrefix}/product/${prod.slug}/`} className="flex items-center gap-3 group">
                      <span className="w-12 h-12 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                        {getProductMainImage(prod, locale) ? <Image src={getProductMainImage(prod, locale)} alt={getProductTitle(prod, locale)} width={48} height={48} className="object-cover w-full h-full" /> : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13.5px] font-semibold text-[#111827] group-hover:text-[#2873F5] truncate">{getProductTitle(prod, locale)}</span>
                        <span className="block text-xs text-[#F87314] font-bold mt-0.5">{convertPriceRangeString(prod.price_range, locale, prod.category_slug, prod.slug)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main: article grid */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-[#111827]">{activeCategory === 'all' ? t.allArticles : t.categories.find((c) => c.key === activeCategory)?.label}</h2>
              <span className="text-sm text-gray-400">{filteredPosts.length} {countSuffix}</span>
            </div>

            {featured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featured.map((post) => (
                  <Link key={post.slug} href={`${localePrefix}/blog/${post.slug}/`} className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-white">
                    <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                      {post.image ? <Image src={post.image} alt={post.title} width={640} height={360} className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300" /> : null}
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                        <span className="inline-flex items-center gap-1.5 text-[#2873F5] font-semibold"><Tag size={13} />{post.categoryLabel}</span>
                        <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{post.date}</span>
                      </div>
                      <h3 className="text-[17px] md:text-lg font-bold text-[#111827] leading-snug group-hover:text-[#2873F5] transition-colors line-clamp-2">{post.title}</h3>
                      <p className="mt-2.5 text-sm text-gray-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#F87314]">
                        {t.readMore}
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className="mt-10">
                <h3 className="text-[13px] font-bold tracking-[.12em] uppercase text-[#2873F5] mb-2">{t.moreArticles}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                  {rest.map((post) => (
                    <Link key={post.slug} href={`${localePrefix}/blog/${post.slug}/`} className="group py-5 border-b border-gray-100 flex items-start gap-4">
                      <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {post.image ? <Image src={post.image} alt={post.title} width={160} height={112} className="object-cover w-full h-full" /> : null}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs text-[#2873F5] font-semibold">{post.categoryLabel} · {post.date}</span>
                        <h4 className="text-[15px] font-bold text-[#111827] leading-snug group-hover:text-[#2873F5] transition-colors line-clamp-2 mt-1">{post.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="py-20 text-center text-gray-400">
                {locale === 'zh-hk' ? '暫無相關文章' : locale === 'ja' ? '関連記事はありません' : 'No articles yet'}
              </div>
            )}
          </div>
        </div>

        {/* Bottom inquiry CTA */}
        <section className="mt-14 rounded-2xl bg-[#0F1F3D] px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              {locale === 'zh-hk' ? '睇完仲未決定？' : locale === 'ja' ? 'まだお決まりでないですか？' : 'Still deciding?'}
            </h2>
            <p className="mt-2 text-white/75 text-sm md:text-base">
              {locale === 'zh-hk' ? 'WhatsApp 30 秒攞精準報價，15 分鐘內專人回覆。' : locale === 'ja' ? 'WhatsAppで30秒の見積もり、15分以内に専門スタッフが返信。' : 'Get a precise quote in 30 seconds on WhatsApp; reply within 15 minutes.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href={`https://wa.me/8619880851334`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F87314] text-white font-bold px-6 py-3 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all"
              data-event="whatsapp_click" data-source="blog-bottom-cta" data-locale={locale}>
              <MessageCircle size={17} />
              {locale === 'zh-hk' ? 'WhatsApp 詢價' : locale === 'ja' ? 'WhatsAppで見積もり' : 'WhatsApp Us'}
            </a>
            <Link href={`${localePrefix}/contact/`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 text-white font-bold px-6 py-3 hover:bg-white/10 transition-all"
              data-event="contact_click" data-source="blog-bottom-cta" data-locale={locale}>
              {locale === 'zh-hk' ? '填寫詢價表' : locale === 'ja' ? '見積もりフォーム' : 'Quote Form'}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
