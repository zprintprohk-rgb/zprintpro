'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale } from '@/lib/seo';

function getQuoteHref(slideHref: string): string {
  // /product/xxx/ → /contact/?product=xxx
  const match = slideHref.match(/^\/product\/(.+?)\/$/);
  return match ? `/contact/?product=${match[1]}` : slideHref;
}

interface HeroBannerProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    cta: '獲取報價',
    ctaArrow: '→',
    browseAll: '瀏覽全部產品',
    fromPrice: '低至',
    slides: [
      { title: '專業牛皮紙袋印刷', subtitle: '環保材質，堅固耐用，適合零售外賣', price: 'HK$1.2起', image: '/images/hero/hero-kraft-bag-zh-hk.webp', href: '/product/kraft-paper-bags/' },
      { title: 'A4宣傳單張印刷', subtitle: '彩色印刷，即日可取，宣傳首選', price: 'HK$0.3起', image: '/images/hero/hero-flyer-zh-hk.webp', href: '/product/a4-flyers/' },
      { title: '防水貼紙印刷', subtitle: '耐用材質，多種形狀，適用於任何表面', price: 'HK$0.5起', image: '/images/hero/hero-sticker-zh-hk.webp', href: '/product/waterproof-stickers/' },
      { title: '包裝盒定制', subtitle: '精緻包裝，提升品牌形象', price: 'HK$5起', image: '/images/hero/hero-gift-box-zh-hk.webp', href: '/product/gift-boxes/' },
      { title: '海報定制印刷', subtitle: '大圖輸出，色彩鮮豔，宣傳利器', price: 'HK$15起', image: '/images/hero/hero-poster-zh-hk.webp', href: '/product/a2-posters/' },
    ],
  },
  en: {
    cta: 'Get Quote',
    ctaArrow: '→',
    browseAll: 'Browse All Products',
    fromPrice: 'From',
    slides: [
      { title: 'Professional Kraft Paper Bags', subtitle: 'Eco-friendly, durable, perfect for retail and takeout', price: 'From HK$1.2', image: '/images/hero/hero-kraft-bag-en.webp', href: '/product/kraft-paper-bags/' },
      { title: 'A4 Flyer Printing', subtitle: 'Full color, same-day pickup, ideal for promotion', price: 'From HK$0.3', image: '/images/hero/hero-flyer-en.webp', href: '/product/a4-flyers/' },
      { title: 'Waterproof Sticker Printing', subtitle: 'Durable material, various shapes, for any surface', price: 'From HK$0.5', image: '/images/hero/hero-sticker-en.webp', href: '/product/waterproof-stickers/' },
      { title: 'Custom Gift Boxes', subtitle: 'Premium packaging to elevate your brand', price: 'From HK$5', image: '/images/hero/hero-gift-box-en.webp', href: '/product/gift-boxes/' },
      { title: 'Custom Poster Printing', subtitle: 'Large format, vivid colors, great for advertising', price: 'From HK$15', image: '/images/hero/hero-poster-en.webp', href: '/product/a2-posters/' },
    ],
  },
  ja: {
    cta: '見積もり',
    ctaArrow: '→',
    browseAll: 'すべての製品を見る',
    fromPrice: '最低',
    slides: [
      { title: 'クラフト紙袋印刷', subtitle: '環境に優しく耐久性があり、小売やテイクアウトに最適', price: 'HK$1.2〜', image: '/images/hero/hero-kraft-bag-ja.webp', href: '/product/kraft-paper-bags/' },
      { title: 'A4チラシ印刷', subtitle: 'フルカラー、当日受取可能、宣伝に最適', price: 'HK$0.3〜', image: '/images/hero/hero-flyer-ja.webp', href: '/product/a4-flyers/' },
      { title: '防水ステッカー印刷', subtitle: '耐久性のある素材、様々な形状、あらゆる表面に対応', price: 'HK$0.5〜', image: '/images/hero/hero-sticker-ja.webp', href: '/product/waterproof-stickers/' },
      { title: 'ギフトボックス定制', subtitle: '高級感のある包装でブランド価値を向上', price: 'HK$5〜', image: '/images/hero/hero-gift-box-ja.webp', href: '/product/gift-boxes/' },
      { title: 'ポスター印刷', subtitle: '大判出力、鮮やかな色彩、広告に最適', price: 'HK$15〜', image: '/images/hero/hero-poster-ja.webp', href: '/product/a2-posters/' }
    ],
  },
};

export function HeroBanner({ locale }: HeroBannerProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % t.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.slides.length]);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + t.slides.length) % t.slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % t.slides.length);
  };

  return (
    <section>
      <div className="max-w-[1320px] mx-auto">
        {/* Banner Slider - full width, no gap, no rounded corners */}
        <div className="relative overflow-hidden bg-white">
          <div className="relative h-[400px]">
            {t.slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={slide.image}
                  alt={`智印云 ${slide.title}`}
                  fill
                  className="object-cover object-right"
                  unoptimized
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* PC端左侧渐变覆盖层 */}
                <div className="hidden md:block absolute inset-y-0 left-0 w-[55%] lg:w-[50%] bg-gradient-to-r from-[#2873F5]/95 via-[#3B82F6]/80 to-transparent" />
                {/* PC端文字内容 */}
                <div className="hidden md:flex absolute inset-0 flex-col justify-start items-start pt-14 md:pt-18 px-8 md:px-12">
                  <span className="inline-flex items-center w-fit px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full mb-3 shadow-lg border border-white/20">
                    {t.fromPrice} {slide.price}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{slide.title}</h1>
                  <p className="text-white/95 text-base sm:text-lg mb-6 max-w-md drop-shadow-md">{slide.subtitle}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <Link
                      href={`${localePrefix}${getQuoteHref(slide.href)}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:-translate-y-0.5 w-full sm:w-auto"
                    >
                      {t.cta} {t.ctaArrow}
                    </Link>
                    <Link
                      href={`${localePrefix}/category/business-cards/`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-white/10 border-2 border-white/80 text-white font-medium rounded-xl hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto"
                    >
                      {t.browseAll}
                    </Link>
                  </div>
                </div>
                {/* 移动端只显示获取报价按钮 */}
                <div className="flex md:hidden absolute bottom-6 left-4 right-4">
                  <Link
                    href={`${localePrefix}${getQuoteHref(slide.href)}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                  >
                    {t.cta} {t.ctaArrow}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Left/Right Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 hover:scale-110 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 hover:scale-110 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {t.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 md:w-8 h-2 md:h-2.5 bg-orange-500 shadow-lg shadow-orange-500/50' : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
