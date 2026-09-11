'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/seo';
import { blogPosts } from '@/data/blog-posts';
import { MessageCircle, Clock, Calendar } from 'lucide-react';

/**
 * v9.2.3 任务 D — Blog 列表页 UX/UI 重设计 (2026-09-11)
 * 视觉语言与 PLP v9.1 同族: 三色调令牌 / 17.5px 基线 / 1320px 容器 / 满版色交替 / 编辑式排版
 * 结构: Banner(藏青渐变+几何装饰) → 精选(头条 2:1 + 次条 2 卡) → 分类筛选单行条 → 3 列白卡网格(hover 仅边框+阴影) → 页底 CTA
 * 禁动: 文章 slug/标题/摘要/blog 详情/articleSlugs 注册表 (只读 blogPosts)
 */

interface BlogContentProps {
  locale: Locale;
  /** D: 服务器端从真实正文算出的阅读分钟数 (blog/page.tsx) */
  readTimes: Record<string, number>;
  /** 2026-09-11 老板指令: 每篇 blog 的 SKU 真实图 (blog/page.tsx 服务器端算好) */
  blogImages: Record<string, string>;
}

const translations: Record<string, {
  h1: string;
  subtitle: string;
  eyebrow: string;
  allArticles: string;
  featured: string;
  buyingGuideTag: string;
  readMore: string;
  empty: string;
  heroCheck: string[];
  categories: { key: string; label: string }[];
}> = {
  'zh-hk': {
    h1: '印刷知識',
    subtitle: '專業印刷知識與行業洞察 — 從材質工藝到設計技巧，智印港印刷專家為你逐一拆解。',
    eyebrow: '印刷知識庫',
    allArticles: '全部文章',
    featured: '本週精選',
    buyingGuideTag: '選購指南',
    readMore: '閱讀全文 →',
    empty: '暫無相關文章',
    heroCheck: ['印刷工藝・設計技巧・行業趨勢', '30 秒 AI 報價', '15 分鐘內專人回覆'],
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
      // 2026-08-04 K3 拍板: 加 12 新产品类目 tabs (25 blog 全部归类)
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
    subtitle: 'Professional printing insights and industry trends — materials, techniques and design tips from our experts.',
    eyebrow: 'Printing Knowledge',
    allArticles: 'All Articles',
    featured: 'Featured',
    buyingGuideTag: 'Buying Guide',
    readMore: 'Read more →',
    empty: 'No articles yet',
    heroCheck: ['Techniques, Design Tips & Industry Trends', '30s AI Quote', 'Reply within 15 minutes'],
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
      { key: 'paper-bags', label: 'Paper Bags' },
      { key: 'flyers', label: 'Flyers' },
      { key: 'posters', label: 'Posters' },
      { key: 'creator-ip', label: 'Creator IP' },
      { key: 'wedding-envelope', label: 'Wedding Envelope' },
      { key: 'japan-doujin', label: 'Doujin Goods' },
      { key: 'menus', label: 'Menus' },
      { key: 'red-packets', label: 'Red Packets' },
      { key: 'cross-border', label: 'Cross-border E-commerce' },
      { key: 'education', label: 'Education' },
      { key: 'banners', label: 'Banners' },
      { key: 'food-packaging', label: 'Food Packaging' },
    ],
  },
  'ja': {
    h1: '印刷知識',
    subtitle: '印刷技術・デザインノウハウ・業界トレンドを、専門スタッフが分かりやすく解説します。',
    eyebrow: '印刷ナレッジ',
    allArticles: 'すべての記事',
    featured: '注目記事',
    buyingGuideTag: '選び方ガイド',
    readMore: '続きを読む →',
    empty: '関連記事はありません',
    heroCheck: ['印刷技術・デザイン・業界トレンド', '30秒AI見積もり', '15分以内に専門スタッフが返信'],
    categories: [
      { key: 'company-news', label: '会社ニュース' },
      { key: 'sticker', label: 'ステッカー知識' },
      { key: 'card', label: 'カード知識' },
      { key: 'packaging', label: '包装知識' },
      { key: 'printing', label: '印刷技術' },
      { key: 'design', label: 'デザインチップ' },
      { key: 'branding', label: 'ブランディング' },
      { key: 'hongkong', label: '香港ローカル' },
      { key: 'trends', label: '業界トレンド' },
      { key: 'buying-guide', label: '選び方ガイド' },
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

/** D: 封面占位 — 无 cover 的每日 SEO 博客用纯几何渐变, 不放图 (覆盖既有无图逻辑) */
function CardCover({
  image,
  alt,
  ratio,
  label,
}: {
  image: string;
  alt: string;
  ratio: string;
  label: string;
}) {
  if (image) {
    return (
      <div className={`relative ${ratio} w-full overflow-hidden bg-gray-100`}>
        <Image src={image} alt={alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative ${ratio} w-full overflow-hidden`} style={{ background: 'var(--color-royal-navy-grad)' }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 35%, rgba(255,255,255,.6) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-semibold backdrop-blur-sm">{label}</span>
      </div>
    </div>
  );
}

const FEATURED_COUNT = 3; // 头条 1 + 次条 2

export default function BlogContent({ locale, readTimes, blogImages }: BlogContentProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

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
      image: blogImages[post.slug] || post.cover?.[locale] || post.cover?.['zh-hk'] || '',
      readMin: readTimes[post.slug] || 3,
    }))
    .sort((a, b) => (b.date || '').localeCompare(a.date || '')),
    [locale, t, readTimes, blogImages]
  );

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((post) => {
      if (activeCategory !== 'all' && post.categoryKey !== activeCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, query, allPosts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allPosts.forEach((post) => {
      counts[post.categoryKey] = (counts[post.categoryKey] || 0) + 1;
    });
    return counts;
  }, [allPosts]);

  const featured = filteredPosts.slice(0, FEATURED_COUNT);
  const rest = filteredPosts.slice(FEATURED_COUNT);

  const readMinText = (n: number) =>
    locale === 'zh-hk' ? `${n} 分鐘` : locale === 'ja' ? `読了 ${n} 分` : `${n} min read`;

  return (
    <main className="min-h-screen bg-white">
      {/* D1 Banner — 1320px 横色块 (同导航栏宽度, 对齐 PLP wedding-invitations; 颜色不变=藏青渐变) */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative overflow-hidden min-h-[300px] md:min-h-[400px] text-white" style={{ background: 'var(--color-royal-navy-grad)' }}>
          <div aria-hidden className="hidden lg:block absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none">
            <div className="absolute -right-20 -top-24 w-[420px] h-[420px] rounded-full border-[3px] border-white/10" />
            <div className="absolute -right-6 -top-8 w-[300px] h-[300px] rounded-full border-2 border-white/10" />
            <div className="absolute right-44 bottom-6 w-[160px] h-[160px] rounded-full border-2 border-[#F87314]/30" />
            <div className="absolute right-64 top-16 w-[8px] h-[8px] rounded-full bg-[#F87314]/60" />
            <div className="absolute right-40 top-40 w-[5px] h-[5px] rounded-full bg-white/50" />
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,.6) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
            />
          </div>
          <div className="relative z-[1] h-full flex flex-col justify-center px-6 md:px-10 py-10">
            <nav aria-label="breadcrumb" className="text-[13px] text-white/75 mb-4">
              <a href={`${localePrefix}/`} className="hover:text-white transition-colors underline decoration-white/40 underline-offset-4">
                {locale === 'zh-hk' ? '首頁' : locale === 'ja' ? 'ホーム' : 'Home'}
              </a>
              <span className="mx-2">/</span>
              <span className="text-white">{locale === 'zh-hk' ? '印刷知識' : locale === 'ja' ? 'ブログ' : 'Blog'}</span>
            </nav>
            <p className="inline-flex items-center gap-2 text-[#F87314] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">
              <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />
              {t.eyebrow}
            </p>
            <h1 className="text-[clamp(24px,2.5vw,34px)] font-extrabold tracking-[-0.01em] leading-[1.3] max-w-[720px] drop-shadow-sm">{t.h1}</h1>
            <p className="mt-2.5 text-[16.5px] text-white/85 max-w-[640px] leading-relaxed">{t.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              {t.heroCheck.map((s) => (
                <span key={s} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#F87314]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {s}
                </span>
              ))}
            </div>
            <a
              href={`https://wa.me/8619880851334?text=${encodeURIComponent(locale === 'zh-hk' ? '我想查詢印刷報價' : locale === 'ja' ? '印刷の見積もりを依頼したい' : 'I want a printing quote')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-[#F87314] text-white font-bold px-6 py-3 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all"
              data-event="whatsapp_click" data-source="blog-hero" data-locale={locale}
            >
              <MessageCircle size={18} />
              {locale === 'zh-hk' ? 'WhatsApp 即時報價' : locale === 'ja' ? 'WhatsAppで見積もり' : 'WhatsApp for a Quote'}
            </a>
          </div>
        </div>
      </section>

      {/* D2 精选区 — 1320px 浅蓝块 (对齐 PLP 卡片化; 头条 2:1 + 次条 2 卡横排) */}
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="rounded-2xl bg-[#F2F6FF] border border-blue-50 px-6 md:px-8 py-8 md:py-10">
          {featured.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[13px] font-bold tracking-[.12em] uppercase text-[#2873F5]">{t.featured}</p>
                <span className="text-xs text-gray-500">{filteredPosts.length} {locale === 'zh-hk' ? '篇' : locale === 'ja' ? '件' : 'posts'}</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                {/* 头条大图卡 2:1 */}
                <Link
                  href={`${localePrefix}/blog/${featured[0].slug}/`}
                  className="lg:col-span-2 group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-[#2873F5] hover:shadow-lg transition-all"
                >
                  <CardCover image={featured[0].image} alt={featured[0].title} ratio="aspect-[2/1]" label={featured[0].categoryLabel} />
                  <div className="p-6 md:p-8">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(featured[0].categoryKey).bg} ${getCategoryColor(featured[0].categoryKey).text}`}>
                      {featured[0].categoryLabel}
                    </span>
                    <h2 className="mt-3 text-xl md:text-2xl font-extrabold text-[#111827] leading-snug group-hover:text-[#2873F5] transition-colors line-clamp-2">{featured[0].title}</h2>
                    <p className="mt-3 text-[15px] text-gray-600 leading-relaxed line-clamp-2">{featured[0].excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{featured[0].date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={13} />{readMinText(featured[0].readMin)}</span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#F87314]">
                      {t.readMore}
                    </span>
                  </div>
                </Link>

                {/* 次条 2 卡横排 (右列纵向) */}
                <div className="flex flex-col gap-6">
                  {featured.slice(1, 3).map((post) => (
                    <Link
                      key={post.slug}
                      href={`${localePrefix}/blog/${post.slug}/`}
                      className="group flex-1 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-[#2873F5] hover:shadow-lg transition-all"
                    >
                      <CardCover image={post.image} alt={post.title} ratio="aspect-[16/9]" label={post.categoryLabel} />
                      <div className="p-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.categoryKey).bg} ${getCategoryColor(post.categoryKey).text}`}>
                          {post.categoryLabel}
                        </span>
                        <h3 className="mt-3 text-lg font-bold text-[#111827] leading-snug group-hover:text-[#2873F5] transition-colors line-clamp-2">{post.title}</h3>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{post.date}</span>
                          <span className="inline-flex items-center gap-1.5"><Clock size={13} />{readMinText(post.readMin)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
          </div>
        </div>
      </section>

      {/* D3 分类筛选条 (单行紧凑, SpecFinder 语言) + 搜索条 + D4 文章网格 (白底 3 列) */}
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
            <label className="relative flex-1 max-w-[380px]">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" /></svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={locale === 'zh-hk' ? '搜尋文章…' : locale === 'ja' ? '記事を検索…' : 'Search articles…'}
                className="w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm text-[#333333] outline-none focus:border-[#2873F5] focus:bg-white focus:ring-2 focus:ring-[#2873F5]/15 transition-all"
                aria-label={locale === 'zh-hk' ? '搜尋文章' : locale === 'ja' ? '記事検索' : 'Search articles'}
              />
            </label>
            <span className="text-xs text-gray-500 sm:ml-auto">
              {query.trim()
                ? `${filteredPosts.length} ${locale === 'zh-hk' ? '篇結果' : locale === 'ja' ? '件の結果' : 'results'}`
                : `${filteredPosts.length} ${locale === 'zh-hk' ? '篇' : locale === 'ja' ? '件' : 'posts'}`}
            </span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors border ${
                activeCategory === 'all'
                  ? 'bg-[#F87314] border-[#F87314] text-white shadow-sm shadow-orange-500/30'
                  : 'bg-white border-gray-200 text-[#333333] hover:border-[#2873F5] hover:text-[#2873F5]'
              }`}
            >
              {t.allArticles}
              <span className={`text-xs ${activeCategory === 'all' ? 'text-white/80' : 'text-gray-400'}`}>{allPosts.length}</span>
            </button>
            {t.categories.filter((c) => categoryCounts[c.key]).map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors border ${
                  activeCategory === c.key
                    ? 'bg-[#F87314] border-[#F87314] text-white shadow-sm shadow-orange-500/30'
                    : 'bg-white border-gray-200 text-[#333333] hover:border-[#2873F5] hover:text-[#2873F5]'
                }`}
              >
                {c.label}
                <span className={`text-xs ${activeCategory === c.key ? 'text-white/80' : 'text-gray-400'}`}>{categoryCounts[c.key]}</span>
              </button>
            ))}
          </div>

          {/* 3 列白卡网格 — hover 仅边框+阴影 (禁缩放位移) */}
          {rest.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`${localePrefix}/blog/${post.slug}/`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-[#2873F5] hover:shadow-lg transition-all"
                >
                  <CardCover image={post.image} alt={post.title} ratio="aspect-[16/9]" label={post.categoryLabel} />
                  <div className="p-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.categoryKey).bg} ${getCategoryColor(post.categoryKey).text}`}>
                      {post.categoryLabel}
                    </span>
                    <h3 className="mt-3 text-[17px] font-bold text-[#111827] leading-snug group-hover:text-[#2873F5] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="mt-2.5 text-sm text-gray-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{post.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={13} />{readMinText(post.readMin)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            filteredPosts.length === 0 && (
              <div className="py-20 text-center text-gray-400">{t.empty}</div>
            )
          )}
        </div>
      </section>

      {/* D5 页底 CTA — 藏青渐变 + 橙免費報價 + 绿 WhatsApp */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20">
        <div className="rounded-2xl overflow-hidden text-white px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'var(--color-royal-navy-grad)' }}>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              {locale === 'zh-hk' ? '睇完仲未決定？' : locale === 'ja' ? 'まだお決まりでないですか？' : 'Still deciding?'}
            </h2>
            <p className="mt-2 text-white/75 text-sm md:text-base">
              {locale === 'zh-hk' ? 'WhatsApp 30 秒攞精準報價，15 分鐘內專人回覆。' : locale === 'ja' ? 'WhatsAppで30秒の見積もり、15分以内に専門スタッフが返信。' : 'Get a precise quote in 30 seconds on WhatsApp; reply within 15 minutes.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href={`${localePrefix}/quote/`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F87314] text-white font-bold px-6 py-3 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all"
              data-event="contact_click" data-source="blog-bottom-cta" data-locale={locale}>
              {locale === 'zh-hk' ? '免費報價' : locale === 'ja' ? '無料見積もり' : 'Free Quote'}
            </Link>
            <a href={`https://wa.me/8619880851334`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold px-6 py-3 shadow-lg shadow-green-500/30 hover:brightness-105 transition-all"
              data-event="whatsapp_click" data-source="blog-bottom-cta" data-locale={locale}>
              <MessageCircle size={17} />
              {locale === 'zh-hk' ? 'WhatsApp 詢價' : locale === 'ja' ? 'WhatsAppで見積もり' : 'WhatsApp Us'}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
