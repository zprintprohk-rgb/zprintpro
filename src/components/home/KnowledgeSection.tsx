'use client';

import React from 'react';
import { PictureImage } from '@/components/picture-image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface KnowledgeSectionProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '印刷知識',
    subtitle: '專業指南與行業資訊',
    viewMore: '查看更多',
    articles: [
      {
        image: '/images/articles/sticker-guide.jpg',
        tag: '印刷知識',
        tagColor: 'bg-blue-100 text-blue-600',
        date: '2025-03-15',
        title: '貼紙印刷終極指南：材質、工藝與應用',
        description: '深入了解各種貼紙材質的特性，選擇最適合您需求的貼紙類型...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: '設計靈感',
        tagColor: 'bg-pink-100 text-pink-600',
        date: '2025-03-10',
        title: '企業品牌物料清單：從名片到展架的全套印刷方案',
        description: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: '品牌故事',
        tagColor: 'bg-amber-100 text-amber-600',
        date: '2025-03-05',
        title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？',
        description: '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: '印刷技巧',
        tagColor: 'bg-green-100 text-green-600',
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
        tagColor: 'bg-blue-100 text-blue-600',
        date: '2025-03-15',
        title: 'Ultimate Sticker Printing Guide: Materials, Techniques & Applications',
        description: 'Deep dive into various sticker materials to choose the best type for your needs...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: 'Design',
        tagColor: 'bg-pink-100 text-pink-600',
        date: '2025-03-10',
        title: '2025 New Year Greetings: Red Packet Design Inspiration',
        description: 'Curated collection of the most popular 2025 New Year greetings for your red packet designs...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'Brand Story',
        tagColor: 'bg-amber-100 text-amber-600',
        date: '2025-03-05',
        title: 'The ZprintPro Story: From Kwun Tong to All of Hong Kong',
        description: 'Learn about our journey from a small print shop to a leading Hong Kong printing service...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'Tips',
        tagColor: 'bg-green-100 text-green-600',
        date: '2025-02-28',
        title: 'Printing Tips: CMYK vs RGB',
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
        tagColor: 'bg-blue-100 text-blue-600',
        date: '2025-03-15',
        title: 'ステッカー印刷究極ガイド：材質、技術と応用',
        description: '様々なステッカー材質を深く理解し、ニーズに最適なタイプを選びましょう...',
        href: '/blog/sticker-guide/',
      },
      {
        image: '/images/articles/lai-see.jpg',
        tag: 'デザイン',
        tagColor: 'bg-pink-100 text-pink-600',
        date: '2025-03-10',
        title: '2025年新年の挨拶：ポチ袋デザインのインスピレーション',
        description: '2025年に最も人気のある新年の挨拶を厳選し、ポチ袋デザインのインスピレーションを提供...',
        href: '/blog/brand-materials-checklist/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'ブランドストーリー',
        tagColor: 'bg-amber-100 text-amber-600',
        date: '2025-03-05',
        title: 'ZprintProのストーリー：観塘から香港全土へ',
        description: '小さな印刷店から香港を代表する印刷サービスへ成長した軌跡をご紹介...',
        href: '/blog/hong-kong-printing-guide/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'ヒント',
        tagColor: 'bg-green-100 text-green-600',
        date: '2025-02-28',
        title: '印刷のヒント：CMYK vs RGB',
        description: 'CMYKとRGBの違いを理解し、デザインが印刷時に最適な効果を発揮するように...',
        href: '/blog/cmyk-guide/',
      },
    ],
  },
};

export function KnowledgeSection({ locale }: KnowledgeSectionProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">{t.title}</h2>
            <p className="text-base text-gray-500 mt-2">{t.subtitle}</p>
          </div>
          <Link
            href={`${localePrefix}/blog/`}
            className="inline-flex items-center gap-1.5 text-[#2873F5] hover:text-[#1E5FD1] font-semibold transition-colors text-base"
          >
            {t.viewMore}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.articles.map((article, index) => (
            <Link
              key={index}
              href={`${localePrefix}${article.href}`}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-gray-200 transition-all duration-300"
            >
              {/* Image — 1:1 统一视觉 */}
              <div className="aspect-square relative overflow-hidden">
                <PictureImage
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className={`inline-block px-2.5 py-1 text-sm font-semibold rounded-md ${article.tagColor}`}>
                    {article.tag}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                </div>
                <h3 className="font-bold text-[#333333] text-base group-hover:text-[#2873F5] transition-colors line-clamp-2 mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
