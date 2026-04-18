'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface HeroBannerProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    cta: '立即訂製',
    ctaArrow: '→',
    browseAll: '瀏覽全部產品',
    fromPrice: '低至',
    slides: [
      { title: '專業牛皮紙袋印刷', subtitle: '環保材質，堅固耐用，適合零售外賣', price: 'HK$1.2起', image: '/images/hero-v21/kraft-bag.jpg', href: '/product/kraft-paper-bags/' },
      { title: 'A4宣傳單張印刷', subtitle: '彩色印刷，即日可取，宣傳首選', price: 'HK$0.3起', image: '/images/hero-v21/flyer.jpg', href: '/product/a4-flyers/' },
      { title: '防水貼紙印刷', subtitle: '耐用材質，多種形狀，適用於任何表面', price: 'HK$0.5起', image: '/images/hero-v21/sticker.jpg', href: '/product/waterproof-stickers/' },
      { title: '包裝盒定制', subtitle: '精緻包裝，提升品牌形象', price: 'HK$5起', image: '/images/hero-v21/gift-box.jpg', href: '/product/gift-boxes/' },
      { title: '海報定制印刷', subtitle: '大圖輸出，色彩鮮豔，宣傳利器', price: 'HK$15起', image: '/images/hero-v21/poster.jpg', href: '/product/a2-posters/' },
    ],
  },
  en: {
    cta: 'Order Now',
    ctaArrow: '→',
    browseAll: 'Browse All Products',
    fromPrice: 'From',
    slides: [
      { title: 'Professional Kraft Paper Bags', subtitle: 'Eco-friendly, durable, perfect for retail and takeout', price: 'From HK$1.2', image: '/images/hero-v21/kraft-bag.jpg', href: '/product/kraft-paper-bags/' },
      { title: 'A4 Flyer Printing', subtitle: 'Full color, same-day pickup, ideal for promotion', price: 'From HK$0.3', image: '/images/hero-v21/flyer.jpg', href: '/product/a4-flyers/' },
      { title: 'Waterproof Sticker Printing', subtitle: 'Durable material, various shapes, for any surface', price: 'From HK$0.5', image: '/images/hero-v21/sticker.jpg', href: '/product/waterproof-stickers/' },
      { title: 'Custom Gift Boxes', subtitle: 'Premium packaging to elevate your brand', price: 'From HK$5', image: '/images/hero-v21/gift-box.jpg', href: '/product/gift-boxes/' },
      { title: 'Custom Poster Printing', subtitle: 'Large format, vivid colors, great for advertising', price: 'From HK$15', image: '/images/hero-v21/poster.jpg', href: '/product/a2-posters/' },
    ],
  },
  ja: {
    cta: '今すぐ注文',
    ctaArrow: '→',
    browseAll: 'すべての製品を見る',
    fromPrice: '最低',
    slides: [
      { title: 'クラフト紙袋印刷', subtitle: '環境に優しく耐久性があり、小売やテイクアウトに最適', price: 'HK$1.2〜', image: '/images/hero-v21/kraft-bag.jpg', href: '/product/kraft-paper-bags/' },
      { title: 'A4チラシ印刷', subtitle: 'フルカラー、当日受取可能、宣伝に最適', price: 'HK$0.3〜', image: '/images/hero-v21/flyer.jpg', href: '/product/a4-flyers/' },
      { title: '防水ステッカー印刷', subtitle: '耐久性のある素材、様々な形状、あらゆる表面に対応', price: 'HK$0.5〜', image: '/images/hero-v21/sticker.jpg', href: '/product/waterproof-stickers/' },
      { title: 'ギフトボックス定制', subtitle: '高級感のある包装でブランド価値を向上', price: 'HK$5〜', image: '/images/hero-v21/gift-box.jpg', href: '/product/gift-boxes/' },
      { title: 'ポスター印刷', subtitle: '大判出力、鮮やかな色彩、広告に最適', price: 'HK$15〜', image: '/images/hero-v21/poster.jpg', href: '/product/a2-posters/' },
    ],
  },
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
                  alt={slide.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2873F5]/40 via-[#2873F5]/15 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
                  <span className="inline-flex items-center w-fit px-3 py-1 bg-[#F87314] text-white text-sm font-medium rounded-full mb-4">
                    {t.fromPrice} {slide.price}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">{slide.title}</h1>
                  <p className="text-white/80 text-base md:text-lg mb-6 max-w-lg">{slide.subtitle}</p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`${localePrefix}${slide.href}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#F87314] hover:bg-[#E56203] text-white font-semibold rounded-md transition-colors"
                    >
                      {t.cta} {t.ctaArrow}
                    </Link>
                    <Link
                      href={`${localePrefix}/category/business-cards/`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                    >
                      {t.browseAll}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left/Right Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
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
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
