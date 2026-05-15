'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/seo';

function getQuoteHref(slideHref: string): string {
  // /product/xxx/ → /contact/?product=xxx
  const match = slideHref.match(/^\/product\/(.+?)\/$/);
  return match ? `/contact/?product=${match[1]}` : slideHref;
}

interface HeroBannerProps {
  locale: Locale;
}

// 每张轮播图定义不同的遮罩颜色和强调色（透明度变浅50%）
const slideStyles = [
  {
    // 第1张：即日服务 — 活力红色系
    overlay: 'bg-gradient-to-r from-red-900/35 via-rose-700/25 to-transparent',
    accentColor: 'bg-red-500',
    accentHover: 'hover:bg-red-400',
  },
  {
    // 第2张：牛皮纸袋 — 暖棕色系
    overlay: 'bg-gradient-to-r from-amber-900/35 via-orange-800/25 to-transparent',
    accentColor: 'bg-orange-500',
    accentHover: 'hover:bg-orange-400',
  },
  {
    // 第3张：宣传单张 — 品牌橙色系
    overlay: 'bg-gradient-to-r from-orange-900/35 via-amber-700/25 to-transparent',
    accentColor: 'bg-orange-500',
    accentHover: 'hover:bg-orange-400',
  },
  {
    // 第4张：贴纸 — 清新绿色系
    overlay: 'bg-gradient-to-r from-emerald-900/35 via-teal-700/25 to-transparent',
    accentColor: 'bg-emerald-500',
    accentHover: 'hover:bg-emerald-400',
  },
  {
    // 第5张：包装盒 — 高端紫色系
    overlay: 'bg-gradient-to-r from-violet-900/35 via-purple-700/25 to-transparent',
    accentColor: 'bg-violet-500',
    accentHover: 'hover:bg-violet-400',
  },
  {
    // 第6张：海报 — 深海蓝色系
    overlay: 'bg-gradient-to-r from-blue-900/35 via-cyan-700/25 to-transparent',
    accentColor: 'bg-blue-500',
    accentHover: 'hover:bg-blue-400',
  },
];

const translations = {
  'zh-hk': {
    cta: '獲取報價',
    ctaArrow: '→',
    fromPrice: '低至',
    slides: [
      { title: '⚡ 印刷即日速递送货', subtitle: '今天下單·明天12點前到，專為臨急任務而生', price: '即日可取', image: '/images/hero/hero-flyer-zh-hk.webp', href: '/zh-hk/services/rush-printing-delivery' },
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
    fromPrice: 'From',
    slides: [
      { title: ' Same-Day Printing Delivery', subtitle: 'Order Today, Receive by 12PM Tomorrow. Rush service for urgent jobs', price: 'Same Day', image: '/images/hero/hero-flyer-en.webp', href: '/en/services/rush-printing-delivery' },
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
    fromPrice: '最低',
    slides: [
      { title: '⚡ 即日印刷・翌日正午配送', subtitle: '本日注文・明日12時までお届け。緊急印刷対応', price: '即日対応', image: '/images/hero/hero-flyer-ja.webp', href: '/ja/services/rush-printing-delivery' },
      { title: 'クラフト紙袋印刷', subtitle: '環境に優しく耐久性があり、小売やテイクアウトに最適', price: 'HK$1.2〜', image: '/images/hero/hero-kraft-bag-ja.webp', href: '/product/kraft-paper-bags/' },
      { title: 'A4チラシ印刷', subtitle: 'フルカラー、当日受取可能、宣伝に最適', price: 'HK$0.3〜', image: '/images/hero/hero-flyer-ja.webp', href: '/product/a4-flyers/' },
      { title: '防水ステッカー印刷', subtitle: '耐久性のある素材、様々な形状、あらゆる表面に対応', price: 'HK$0.5〜', image: '/images/hero/hero-sticker-ja.webp', href: '/product/waterproof-stickers/' },
      { title: 'ギフトボックス印刷', subtitle: '高級感のある包装でブランド価値を向上', price: 'HK$5〜', image: '/images/hero/hero-gift-box-ja.webp', href: '/product/gift-boxes/' },
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

  const currentStyle = slideStyles[currentSlide];

  return (
    <section>
      <div className="max-w-[1320px] mx-auto">
        {/* Banner Slider - full width, no gap, no rounded corners */}
        <div className="relative overflow-hidden bg-white">
          <div className="relative h-[300px] md:h-[400px]">
            {t.slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={slide.image}
                  alt={locale === 'ja' ? `${slide.title} | ZprintPro` : locale === 'en' ? `${slide.title} | ZprintPro` : `智印云 ${slide.title}`}
                  fill
                  className="object-cover object-right"
                  unoptimized
                  priority={index === 0}
                  loading={index === 0 ? undefined : 'lazy'}
                  decoding="async"
                />
                {/* 每张图使用不同的品牌色渐变遮罩 */}
                <div className={`absolute inset-0 ${slideStyles[index].overlay}`} />
                {/* PC端文字内容 - 三行主视觉+描述作为整体下移 + dots在最底部 */}
                <div className="hidden md:flex absolute inset-0 flex-col justify-between px-8 md:px-12 py-6 md:py-8 z-10">
                  {/* === 上半区：空白占位，将内容推下（增加两个描述文字高度） === */}
                  <div className="flex-1" />
                  <div className="h-[50px] md:h-[58px]" />

                  {/* === 中间区：三行主视觉 + 描述文字（整体下移到红线位置） === */}
                  <div className="mb-6">
                    {/* 第1行：低至标签（蓝色底色，白色文字，圆角胶囊） */}
                    <span className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-3 shadow-md w-fit">
                      {t.fromPrice} {slide.price}
                    </span>
                    
                    {/* 第2行：大标题 + 获取报价按钮（同一行，按钮在标题右侧） */}
                    <div className="flex items-center gap-4 mb-3">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        {slide.title}
                      </h1>
                      <Link
                        href={`${localePrefix}${getQuoteHref(slide.href)}`}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-lg whitespace-nowrap flex-shrink-0"
                      >
                        {t.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* 第3行：描述文字（标题下方） */}
                    <p className="text-sm md:text-base text-white/90 max-w-xl drop-shadow-md leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* === 底部：dots 指示器（最底部，与描述文字有足够间距） === */}
                  <div className="flex justify-center gap-2 pb-2">
                    {t.slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 w-2 rounded-full transition-colors ${idx === currentSlide ? 'bg-white' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </div>
                {/* 移动端只显示获取报价按钮 */}
                <div className="flex md:hidden absolute bottom-6 left-4 right-4">
                  <Link
                    href={`${localePrefix}${getQuoteHref(slide.href)}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition-colors"
                  >
                    {t.cta} <ArrowRight className="h-4 w-4" />
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
        </div>
      </div>
    </section>
  );
}