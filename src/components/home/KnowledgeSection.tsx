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
        tag: '印刷知識', tagStyle: 'blue', date: '2025-03-15',
        title: '貼紙印刷終極指南：材質、工藝與應用',
        description: '深入了解各種貼紙材質的特性，選擇最適合您需求的貼紙類型，從防水到可移除應有盡有...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: '設計靈感', tagStyle: 'pink', date: '2025-03-10',
        title: '企業品牌物料清單：從名片到展架的全套印刷方案',
        description: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: '品牌故事', tagStyle: 'amber', date: '2025-03-05',
        title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？',
        description: '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: '印刷技巧', tagStyle: 'green', date: '2025-02-28',
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
        tag: 'Knowledge', tagStyle: 'blue', date: '2025-03-15',
        title: 'Ultimate Sticker Printing Guide: Materials, Techniques & Applications',
        description: 'Deep dive into various sticker materials to choose the best type for your needs, from waterproof to removable...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: 'Design', tagStyle: 'pink', date: '2025-03-10',
        title: 'Corporate Brand Materials Checklist: From Cards to Banners',
        description: 'A complete brand materials printing checklist to help you systematically plan all printing needs...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'Brand Story', tagStyle: 'amber', date: '2025-03-05',
        title: 'The ZprintPro Story: From Kwun Tong to All of Hong Kong',
        description: 'Learn about our journey from a small print shop to a leading Hong Kong printing service...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'Tips', tagStyle: 'green', date: '2025-02-28',
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
        tag: '知識', tagStyle: 'blue', date: '2025-03-15',
        title: 'ステッカー印刷究極ガイド：材質、技術と応用',
        description: '様々なステッカー材質を深く理解し、防水から剥がせるタイプまでニーズに最適なものを選びましょう...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: 'デザイン', tagStyle: 'pink', date: '2025-03-10',
        title: '企業ブランド素材チェックリスト：名刺から展示パネルまで',
        description: 'スタートアップからブランドアップグレードまで、完全なブランド素材印刷チェックリスト...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'ブランドストーリー', tagStyle: 'amber', date: '2025-03-05',
        title: 'ZprintProのストーリー：観塘から香港全土へ',
        description: '小さな印刷店から香港を代表する印刷サービスへ成長した軌跡をご紹介...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'ヒント', tagStyle: 'green', date: '2025-02-28',
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
    <section className="py-10 md:py-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — 紧凑 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{t.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
          </div>
          <Link
            href={`${localePrefix}/blog/`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            {t.viewMore}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5/12 大文章 + 7/12 列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* 左侧大卡片 — 深遮罩 + 文字压图 */}
          <Link
            href={`${localePrefix}${feature.href}`}
            className="lg:col-span-5 group relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <PictureImage
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            {/* 极深渐变遮罩 (from-black/70 强压底) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            {/* 文字压图 */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border backdrop-blur-sm ${TAG_STYLES[feature.tagStyle]}`}
              >
                {feature.tag}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mt-2.5 leading-snug group-hover:text-blue-200 transition-colors line-clamp-2">
                {feature.title}
              </h3>
              <p className="text-white/75 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1 text-white/80 text-xs font-medium">
                <Calendar className="w-3 h-3" />
                {feature.date}
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* 右侧 3 篇列表 — 紧凑 */}
          <div className="lg:col-span-7 flex flex-col">
            {rest.map((article, index) => (
              <Link
                key={index}
                href={`${localePrefix}${article.href}`}
                className="group flex items-center gap-4 py-3.5 border-b border-slate-100 last:border-0 transition-colors hover:bg-white/60 rounded-lg px-2 -mx-2"
              >
                {/* 缩略图 w-24 (缩小) */}
                <div className="relative w-20 md:w-24 aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                  <PictureImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* 文案区 — 标题加粗, 描述缩小 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${TAG_STYLES[article.tagStyle]}`}
                    >
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-[15px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-relaxed">
                    {article.description}
                  </p>
                </div>
                {/* 右侧箭头 */}
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 hidden md:block" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
