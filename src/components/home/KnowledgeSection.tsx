'use client';

import React from 'react';
import { PictureImage } from '@/components/picture-image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface KnowledgeSectionProps {
  locale: Locale;
}

interface ArticleConfig {
  image: string;
  tag: string;
  /** 标签色 token (与原文一致, 4 个值循环) */
  tagStyle: 'blue' | 'pink' | 'amber' | 'green';
  date: string;
  title: string;
  description: string;
  href: string;
}

const TAG_STYLES: Record<ArticleConfig['tagStyle'], string> = {
  blue: 'border-blue-200 text-blue-600 bg-blue-50/50',
  pink: 'border-pink-200 text-pink-600 bg-pink-50/50',
  amber: 'border-amber-200 text-amber-600 bg-amber-50/50',
  green: 'border-emerald-200 text-emerald-600 bg-emerald-50/50',
};

const translations: Record<Locale, { title: string; subtitle: string; viewMore: string; articles: ArticleConfig[] }> = {
  'zh-hk': {
    title: '印刷知識',
    subtitle: '專業指南與行業資訊',
    viewMore: '查看更多',
    articles: [
      {
        image: '/images/articles/sticker-guide.jpg',
        tag: '印刷知識',
        tagStyle: 'blue',
        date: '2025-03-15',
        title: '貼紙印刷終極指南：材質、工藝與應用',
        description: '深入了解各種貼紙材質的特性，選擇最適合您需求的貼紙類型，從防水到可移除應有盡有...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: '設計靈感',
        tagStyle: 'pink',
        date: '2025-03-10',
        title: '企業品牌物料清單：從名片到展架的全套印刷方案',
        description: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: '品牌故事',
        tagStyle: 'amber',
        date: '2025-03-05',
        title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？',
        description: '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: '印刷技巧',
        tagStyle: 'green',
        date: '2025-02-28',
        title: 'CMYK vs RGB：印刷色彩模式完全詳解',
        description: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果...',
        href: '/blog/cmyk-guide/',
      },
    ],
  },
  en: {
    title: 'Printing Knowledge',
    subtitle: 'Professional guides and industry insights',
    viewMore: 'View More',
    articles: [
      {
        image: '/images/articles/sticker-guide.jpg',
        tag: 'Knowledge',
        tagStyle: 'blue',
        date: '2025-03-15',
        title: 'Ultimate Sticker Printing Guide: Materials, Techniques & Applications',
        description: 'Deep dive into various sticker materials to choose the best type for your needs, from waterproof to removable...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: 'Design',
        tagStyle: 'pink',
        date: '2025-03-10',
        title: 'Corporate Brand Materials Checklist: From Cards to Banners',
        description: 'A complete brand materials printing checklist to help you systematically plan all printing needs...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'Brand Story',
        tagStyle: 'amber',
        date: '2025-03-05',
        title: 'The ZprintPro Story: From Kwun Tong to All of Hong Kong',
        description: 'Learn about our journey from a small print shop to a leading Hong Kong printing service...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'Tips',
        tagStyle: 'green',
        date: '2025-02-28',
        title: 'CMYK vs RGB: A Complete Guide to Print Color Modes',
        description: 'Understand the difference between CMYK and RGB to ensure your designs print perfectly...',
        href: '/blog/cmyk-guide/',
      },
    ],
  },
  ja: {
    title: '印刷知識',
    subtitle: 'プロフェッショナルガイドと業界情報',
    viewMore: 'もっと見る',
    articles: [
      {
        image: '/images/articles/sticker-guide.jpg',
        tag: '知識',
        tagStyle: 'blue',
        date: '2025-03-15',
        title: 'ステッカー印刷究極ガイド：材質、技術と応用',
        description: '様々なステッカー材質を深く理解し、防水から剥がせるタイプまでニーズに最適なものを選びましょう...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: 'デザイン',
        tagStyle: 'pink',
        date: '2025-03-10',
        title: '企業ブランド素材チェックリスト：名刺から展示パネルまで',
        description: 'スタートアップからブランドアップグレードまで、完全なブランド素材印刷チェックリスト...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'ブランドストーリー',
        tagStyle: 'amber',
        date: '2025-03-05',
        title: 'ZprintProのストーリー：観塘から香港全土へ',
        description: '小さな印刷店から香港を代表する印刷サービスへ成長した軌跡をご紹介...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'ヒント',
        tagStyle: 'green',
        date: '2025-02-28',
        title: 'CMYK vs RGB：印刷カラーモード完全解説',
        description: 'CMYKとRGBの違いを理解し、デザインが印刷時に最適な効果を発揮するように...',
        href: '/blog/cmyk-guide/',
      },
    ],
  },
};

export function KnowledgeSection({ locale }: KnowledgeSectionProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [feature, ...rest] = t.articles;

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t.title}</h2>
            <p className="text-base text-slate-500 mt-2">{t.subtitle}</p>
          </div>
          {/* "查看更多" 按钮升级: 圆角 + 箭头 hover 右移 */}
          <Link
            href={`${localePrefix}/blog/`}
            className="group inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 rounded-full font-semibold transition-all duration-200"
          >
            {t.viewMore}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ===== 主布局: 5/12 大文章 + 7/12 列表 ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左侧大卡片 (5/12) */}
          <Link
            href={`${localePrefix}${feature.href}`}
            className="lg:col-span-5 group relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-500"
          >
            <PictureImage
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            {/* 底部黑色渐变覆盖层 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            {/* 浮在图上的 tag + 标题 + 描述 */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${TAG_STYLES[feature.tagStyle]}`}
              >
                {feature.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-3 leading-snug group-hover:text-blue-200 transition-colors line-clamp-2">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm mt-2 line-clamp-2 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-white/90 text-sm font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {feature.date}
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* 右侧 3 篇列表 (7/12) */}
          <div className="lg:col-span-7 flex flex-col">
            {rest.map((article, index) => (
              <Link
                key={index}
                href={`${localePrefix}${article.href}`}
                className="group flex items-start gap-5 md:gap-6 py-6 border-b border-slate-100 last:border-0 transition-colors hover:bg-white/60 rounded-xl px-3 -mx-3"
              >
                {/* 缩略图 128px (4/3) */}
                <div className="relative w-28 md:w-32 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                  <PictureImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* 文案区 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    {/* 药丸 tag */}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${TAG_STYLES[article.tagStyle]}`}
                    >
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>
                {/* 右侧箭头 (hover 时右移) */}
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2 hidden md:block" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
