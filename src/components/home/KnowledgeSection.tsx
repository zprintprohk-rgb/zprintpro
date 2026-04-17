'use client';

import React from 'react';
import Image from 'next/image';
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
        title: '新年賀詞2025精選：利是封設計靈感',
        description: '精選2025年最受歡迎的新年賀詞，為您的利是封設計提供靈感...',
        href: '/blog/lai-see-design/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: '品牌故事',
        tagColor: 'bg-amber-100 text-amber-600',
        date: '2025-03-05',
        title: '智印港品牌故事：從觀塘到全港',
        description: '了解智印港的發展歷程，從一家小型印刷店到全港領先的印刷服務商...',
        href: '/blog/brand-story/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: '印刷技巧',
        tagColor: 'bg-green-100 text-green-600',
        date: '2025-02-28',
        title: '印刷知識小貼士：CMYK vs RGB',
        description: '了解CMYK和RGB的區別，確保您的設計在印刷時呈現最佳效果...',
        href: '/blog/cmyk-rgb-guide/',
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
        href: '/blog/lai-see-design/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'Brand Story',
        tagColor: 'bg-amber-100 text-amber-600',
        date: '2025-03-05',
        title: 'The ZPrintPro Story: From Kwun Tong to All of Hong Kong',
        description: 'Learn about our journey from a small print shop to a leading Hong Kong printing service...',
        href: '/blog/brand-story/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'Tips',
        tagColor: 'bg-green-100 text-green-600',
        date: '2025-02-28',
        title: 'Printing Tips: CMYK vs RGB',
        description: 'Understand the difference between CMYK and RGB to ensure your designs print perfectly...',
        href: '/blog/cmyk-rgb-guide/',
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
        href: '/blog/lai-see-design/',
      },
      {
        image: '/images/articles/brand-story.jpg',
        tag: 'ブランドストーリー',
        tagColor: 'bg-amber-100 text-amber-600',
        date: '2025-03-05',
        title: 'ZPrintProのストーリー：観塘から香港全土へ',
        description: '小さな印刷店から香港を代表する印刷サービスへ成長した軌跡をご紹介...',
        href: '/blog/brand-story/',
      },
      {
        image: '/images/articles/cmyk-rgb.jpg',
        tag: 'ヒント',
        tagColor: 'bg-green-100 text-green-600',
        date: '2025-02-28',
        title: '印刷のヒント：CMYK vs RGB',
        description: 'CMYKとRGBの違いを理解し、デザインが印刷時に最適な効果を発揮するように...',
        href: '/blog/cmyk-rgb-guide/',
      },
    ],
  },
};

export function KnowledgeSection({ locale }: KnowledgeSectionProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">{t.title}</h2>
            <p className="text-gray-500 mt-1">{t.subtitle}</p>
          </div>
          <Link
            href={`${localePrefix}/blog/`}
            className="inline-flex items-center gap-1 text-[#2873F5] hover:text-[#1E5FD1] font-medium transition-colors text-sm"
          >
            {t.viewMore}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.articles.map((article, index) => (
            <Link
              key={index}
              href={`${localePrefix}${article.href}`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${article.tagColor}`}>
                    {article.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                </div>
                <h3 className="font-semibold text-[#333333] text-sm group-hover:text-[#2873F5] transition-colors line-clamp-2 mb-1">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
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
