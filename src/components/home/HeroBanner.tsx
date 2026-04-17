'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, FileText, Tag, Package, ImageIcon, GraduationCap, CreditCard, Mail, BookOpen, Calendar, Gift, Flag, StickyNote } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { categories } from '@/data/products';

interface HeroBannerProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    categoryTitle: '產品分類',
    cta: '立即訂製',
    hotBadge: '熱銷',
    fromPrice: '低至',
    slides: [
      { title: '防水貼紙', subtitle: '耐用防水，戶外適用', price: 'HK$0.3起', image: '/images/hero/stickers.jpg', href: '/product/waterproof-stickers/' },
      { title: '牛皮紙袋', subtitle: '環保耐用，品牌首選', price: 'HK$1.2起', image: '/images/hero/paper-bags.jpg', href: '/product/kraft-paper-bags/' },
      { title: 'A4宣傳單張', subtitle: '彩色印刷，即日可取', price: 'HK$0.3起', image: '/images/hero/flyers.jpg', href: '/product/a4-flyers/' },
      { title: '禮品包裝盒', subtitle: '高檔定制，送禮必備', price: 'HK$5起', image: '/images/hero/packaging.jpg', href: '/product/gift-boxes/' },
      { title: 'A2海報印刷', subtitle: '色彩鮮豔，宣傳利器', price: 'HK$15起', image: '/images/hero/posters.jpg', href: '/product/a2-posters/' },
    ],
  },
  en: {
    categoryTitle: 'Categories',
    cta: 'Order Now',
    hotBadge: 'Hot',
    fromPrice: 'From',
    slides: [
      { title: 'Waterproof Stickers', subtitle: 'Durable & waterproof for outdoor use', price: 'From HK$0.3', image: '/images/hero/stickers.jpg', href: '/product/waterproof-stickers/' },
      { title: 'Kraft Paper Bags', subtitle: 'Eco-friendly & durable', price: 'From HK$1.2', image: '/images/hero/paper-bags.jpg', href: '/product/kraft-paper-bags/' },
      { title: 'A4 Flyers', subtitle: 'Full color, same-day pickup', price: 'From HK$0.3', image: '/images/hero/flyers.jpg', href: '/product/a4-flyers/' },
      { title: 'Gift Boxes', subtitle: 'Premium custom packaging', price: 'From HK$5', image: '/images/hero/packaging.jpg', href: '/product/gift-boxes/' },
      { title: 'A2 Posters', subtitle: 'Vivid colors, great for promotion', price: 'From HK$15', image: '/images/hero/posters.jpg', href: '/product/a2-posters/' },
    ],
  },
  ja: {
    categoryTitle: 'カテゴリー',
    cta: '今すぐ注文',
    hotBadge: '人気',
    fromPrice: '',
    slides: [
      { title: '防水ステッカー', subtitle: '耐久性があり、屋外使用可能', price: 'HK$0.3〜', image: '/images/hero/stickers.jpg', href: '/product/waterproof-stickers/' },
      { title: 'クラフト紙袋', subtitle: '環境に優しく耐久性あり', price: 'HK$1.2〜', image: '/images/hero/paper-bags.jpg', href: '/product/kraft-paper-bags/' },
      { title: 'A4チラシ', subtitle: 'フルカラー、当日受取可能', price: 'HK$0.3〜', image: '/images/hero/flyers.jpg', href: '/product/a4-flyers/' },
      { title: 'ギフトボックス', subtitle: '高級感のあるカスタム包装', price: 'HK$5〜', image: '/images/hero/packaging.jpg', href: '/product/gift-boxes/' },
      { title: 'A2ポスター', subtitle: '鮮やかな色彩、宣伝に最適', price: 'HK$15〜', image: '/images/hero/posters.jpg', href: '/product/a2-posters/' },
    ],
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  'paper-bags': <ShoppingBag className="w-4 h-4" />,
  'flyers': <FileText className="w-4 h-4" />,
  'stickers': <Tag className="w-4 h-4" />,
  'packaging': <Package className="w-4 h-4" />,
  'posters': <ImageIcon className="w-4 h-4" />,
  'books': <BookOpen className="w-4 h-4" />,
  'business-cards': <CreditCard className="w-4 h-4" />,
  'envelopes': <Mail className="w-4 h-4" />,
  'menus': <StickyNote className="w-4 h-4" />,
  'calendars': <Calendar className="w-4 h-4" />,
  'red-packets': <Gift className="w-4 h-4" />,
  'banners': <Flag className="w-4 h-4" />,
  'educational': <GraduationCap className="w-4 h-4" />,
};

export function HeroBanner({ locale }: HeroBannerProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % t.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.slides.length]);

  return (
    <section className="bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4">
          {/* Category Sidebar */}
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-[#2873F5] text-white">
                <h3 className="font-semibold text-sm">{t.categoryTitle}</h3>
              </div>
              <div className="py-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`${localePrefix}/category/${cat.slug}/`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-[#2873F5] hover:bg-blue-50 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-gray-400">{categoryIcons[cat.slug] || <ShoppingBag className="w-4 h-4" />}</span>
                      <span>
                        {locale === 'zh-hk' ? cat.name : locale === 'en' ? cat.nameEn : cat.nameJa}
                      </span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Banner Slider */}
          <div className="flex-1 relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
            <div className="relative aspect-[16/7] md:aspect-[16/6]">
              {t.slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
                    <span className="inline-flex items-center w-fit px-3 py-1 bg-red-500 text-white text-xs font-bold rounded mb-3">
                      {t.hotBadge}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
                    <p className="text-white/80 text-sm md:text-base mb-4">{slide.subtitle}</p>
                    <p className="text-[#F87314] font-bold text-lg md:text-xl mb-5">{slide.price}</p>
                    <Link
                      href={`${localePrefix}${slide.href}`}
                      className="inline-flex items-center justify-center w-fit px-6 py-3 bg-[#F87314] hover:bg-[#E56203] text-white font-semibold rounded-lg transition-colors"
                    >
                      {t.cta} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {t.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
