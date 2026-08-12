'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { getAbVariant, CTA_VARIANTS, HERO_H1_VARIANTS, trackEvent, AbVariant } from '@/lib/analytics';

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
    // zh-hk 定位: 香港本地印刷服務 · 3小時急件 · 港九新界速遞 · WhatsApp 中文客服
    slides: [
      { title: '⚡ 香港最速 3 小時急件印刷', subtitle: '今天下單 ・ 3 小時內取貨 ・ 港九新界免費速遞 ・ WhatsApp 中文客服 24 小時在線', price: '3hr 可取', image: '/images/hero/hero-flyer-zh-hk.webp', href: '/zh-hk/services/rush-printing-delivery' },
      { title: 'ISO 9001 認證 · 專業牛皮紙袋', subtitle: '深圳實體工廠 · FSC 認證紙 · 200 個起印 · 港九新界送貨上門', price: 'HK$1.2 起', image: '/images/hero/hero-kraft-bag-zh-hk.webp', href: '/product/kraft-paper-bags/' },
      { title: 'A4 傳單印刷 · 即日可取', subtitle: '128-200g 銅版紙 · 雙面 CMYK · 500 張起印 · 上門收送稿服務', price: 'HK$0.3 起', image: '/images/hero/hero-flyer-zh-hk.webp', href: '/product/a4-flyers/' },
      { title: '防水貼紙 · 適用任何表面', subtitle: 'UV 防水材質 · 任意形狀模切 · 戶外耐候 3-5 年 · 全港配送上門', price: 'HK$0.5 起', image: '/images/hero/hero-sticker-zh-hk.webp', href: '/product/waterproof-stickers/' },
      { title: '精裝盒定製 · 提升品牌', subtitle: '燙金 · UV · 擊凸 · 100 個起訂 · 免費排版設計', price: 'HK$8 起', image: '/images/hero/hero-gift-box-zh-hk.webp', href: '/product/rigid-boxes/' },
      { title: 'A2 大圖海報 · 即日輸出', subtitle: 'Heidelberg 4 色印刷 · 200-300g 銅版紙 · 大圖輸出色彩鮮豔', price: 'HK$15 起', image: '/images/hero/hero-poster-zh-hk.webp', href: '/product/a2-posters/' },
    ],
  },
  en: {
    cta: 'Get Quote',
    ctaArrow: '→',
    fromPrice: 'From',
    // en 定位: Asia's Premium Printing — ISO 9001 · FSC Certified · Free US Shipping · 72h Global Delivery
    slides: [
      { title: '⚡ Same-Day Printing · Free US Shipping $99+', subtitle: 'Order by 10AM, ship same day. ISO 9001 · FSC paper · Free design mockup in 4h · No setup fees', price: 'Same Day Ship', image: '/images/hero/hero-flyer-en.webp', href: '/en/services/rush-printing-delivery' },
      { title: 'Eco Kraft Paper Bags · Free Design', subtitle: 'FSC-certified kraft · 100% recyclable · GRS available · From 200pcs MOQ · Free dieline mockup · DHL Express 72h', price: 'From US$0.15', image: '/images/hero/hero-kraft-bag-en.webp', href: '/product/kraft-paper-bags/' },
      { title: 'A4 Flyers · Free Mockup in 4h', subtitle: '128-200gsm coated art paper · Double-sided CMYK · Spot Pantone available · Free design proof · No setup fees', price: 'From US$0.04', image: '/images/hero/hero-flyer-en.webp', href: '/product/a4-flyers/' },
      { title: 'Waterproof Stickers · UV Resistant', subtitle: 'UV-resistant vinyl · Custom die-cut shapes · 3-5 year outdoor durability · Free dieline mockup · FDA-compliant option', price: 'From US$0.06', image: '/images/hero/hero-sticker-en.webp', href: '/product/waterproof-stickers/' },
      { title: 'Custom Rigid Gift Boxes · Free Design', subtitle: 'Premium rigid setup · Foil stamping · Spot UV · Embossing · 100pcs MOQ · Free 3D mockup · No setup fees', price: 'From US$1.00', image: '/images/hero/hero-gift-box-en.webp', href: '/product/rigid-boxes/' },
      { title: 'A2 Posters · Free Design Proof', subtitle: 'Heidelberg 4-color offset · 200-300gsm art paper · Vivid colors · Free design mockup · 3-5 day global delivery', price: 'From US$1.95', image: '/images/hero/hero-poster-en.webp', href: '/product/a2-posters/' },
    ],
  },
  ja: {
    cta: '見積もり',
    ctaArrow: '→',
    fromPrice: '最低',
    // ja 定位: 深圳発・高品質印刷 — 小ロット試刷り OK · 日本語スタッフ対応 · 和紙対応
    slides: [
      { title: '⚡ 即日印刷 · 翌日正午まで配送', subtitle: '小ロット試刷り OK · 日本語スタッフ対応 · 緊急対応・深圳直結で安心', price: '即日対応', image: '/images/hero/hero-flyer-ja.webp', href: '/ja/services/rush-printing-delivery' },
      { title: 'クラフト紙袋 · 和紙対応可', subtitle: 'FSC 認証紙 · 環境に優しい素材 · 200 個〜小ロット対応 · 日本品質基準', price: '¥23〜', image: '/images/hero/hero-kraft-bag-ja.webp', href: '/product/kraft-paper-bags/' },
      { title: 'A4 チラシ印刷 · 当日受取', subtitle: '128-200g コート紙 · 両面 CMYK · 試し刷りサービス · 少ロット 500 枚〜', price: '¥6〜', image: '/images/hero/hero-flyer-ja.webp', href: '/product/a4-flyers/' },
      { title: '防水ステッカー · 屋外耐候', subtitle: 'UV 耐性ビニール · ダイカット自由形状 · 屋外 3-5 年耐久性 · 和紙素材対応', price: '¥10〜', image: '/images/hero/hero-sticker-ja.webp', href: '/product/waterproof-stickers/' },
      { title: 'ギフトボックス · 箔押し UV 加工', subtitle: '高級貼箱 · 箔押し · スポット UV · エンボス · 100 個〜対応 · 無料設計', price: '¥120〜', image: '/images/hero/hero-gift-box-ja.webp', href: '/product/rigid-boxes/' },
      { title: '大判ポスター印刷 · 高品質', subtitle: 'Heidelberg 4 色オフセット · 200-300g アート紙 · 鮮やかな発色 · 日本品質基準対応', price: '¥285〜', image: '/images/hero/hero-poster-ja.webp', href: '/product/a2-posters/' }
    ],
  },
};

export function HeroBanner({ locale }: HeroBannerProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [currentSlide, setCurrentSlide] = useState(0);
  // A/B 测试：客户端读 cookie 决定 CTA 文案
  const [abVariant, setAbVariant] = useState<AbVariant>('A');

  useEffect(() => {
    const variant = getAbVariant();
    setAbVariant(variant);
    trackEvent('hero_ab_exposure', { variant, locale });
  }, [locale]);

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
      {/* P1.1 增强：SEO H1 顶层元素（按 variant 切换），slide 内的 H1 保留为视觉标题 */}
      <h1 className="sr-only">{HERO_H1_VARIANTS[abVariant][locale]}</h1>
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
                  alt={locale === 'ja' ? `${slide.title} | ZprintPro` : locale === 'en' ? `${slide.title} | ZprintPro` : `智印港 ${slide.title}`}
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
                        onClick={() => trackEvent('hero_cta_click', { variant: abVariant, locale, slide_idx: currentSlide })}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-lg whitespace-nowrap flex-shrink-0"
                      >
                        {CTA_VARIANTS[abVariant][locale]} <ArrowRight className="h-4 w-4" />
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
                    onClick={() => trackEvent('hero_cta_click', { variant: abVariant, locale, slide_idx: currentSlide, mobile: true })}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition-colors"
                  >
                    {CTA_VARIANTS[abVariant][locale]} <ArrowRight className="h-4 h-4" />
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