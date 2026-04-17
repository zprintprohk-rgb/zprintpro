'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Truck, Award, Phone } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface HeroBannerProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    headline: '專業印刷服務',
    subheadline: '高品質貼紙、標籤、卡片、書刊印刷',
    description: '智印港提供一站式印刷解決方案，從設計到印刷，品質保證，價格透明。支持急單，最快即日交貨。',
    ctaPrimary: '立即報價',
    ctaSecondary: '瀏覽產品',
    badges: {
      fast: '最快即日交貨',
      freeShipping: '滿$500免運費',
      quality: '品質保證',
      support: '專業客服',
    },
    stats: {
      customers: '10,000+ 滿意客戶',
      orders: '100萬+ 訂單完成',
      rating: '4.9/5 客戶評分',
    },
  },
  en: {
    headline: 'Professional Printing Services',
    subheadline: 'High-Quality Stickers, Labels, Cards & Booklets',
    description: 'ZPrintPro offers one-stop printing solutions from design to print. Quality guaranteed, transparent pricing. Rush orders available with same-day delivery.',
    ctaPrimary: 'Get Quote',
    ctaSecondary: 'Browse Products',
    badges: {
      fast: 'Same-Day Delivery',
      freeShipping: 'Free Shipping Over $500',
      quality: 'Quality Guaranteed',
      support: 'Professional Support',
    },
    stats: {
      customers: '10,000+ Happy Customers',
      orders: '1M+ Orders Completed',
      rating: '4.9/5 Customer Rating',
    },
  },
  ja: {
    headline: 'プロフェッショナル印刷サービス',
    subheadline: '高品質ステッカー、ラベル、カード、冊子印刷',
    description: 'ZPrintProはデザインから印刷までのワンストップソリューションを提供します。品質保証、透明な価格設定。急ぎ注文対応、最短当日配送。',
    ctaPrimary: '見積もり',
    ctaSecondary: '製品を見る',
    badges: {
      fast: '最短当日配送',
      freeShipping: '500ドル以上送料無料',
      quality: '品質保証',
      support: '専門サポート',
    },
    stats: {
      customers: '10,000+ 満足のお客様',
      orders: '100万+ 完了注文',
      rating: '4.9/5 顧客評価',
    },
  },
};

export function HeroBanner({ locale }: HeroBannerProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <section className="relative bg-gradient-to-br from-[#2873F5] via-[#1E5FD1] to-[#0F3A8C] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {t.headline}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-4">
                {t.subheadline}
              </p>
              <p className="text-blue-100 text-lg max-w-xl">
                {t.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`${localePrefix}/quote`}
                className="inline-flex items-center justify-center gap-2 bg-[#F87314] hover:bg-[#E56203] text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
              >
                {t.ctaPrimary}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href={`${localePrefix}/category/business-cards/`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all backdrop-blur-sm"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-[#F87314]" />
                <span className="text-sm">{t.badges.fast}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Truck className="w-5 h-5 text-[#F87314]" />
                <span className="text-sm">{t.badges.freeShipping}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Award className="w-5 h-5 text-[#F87314]" />
                <span className="text-sm">{t.badges.quality}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Phone className="w-5 h-5 text-[#F87314]" />
                <span className="text-sm">{t.badges.support}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/20">
              <span className="text-blue-100">{t.stats.customers}</span>
              <span className="text-blue-100">{t.stats.orders}</span>
              <span className="text-blue-100">{t.stats.rating}</span>
            </div>
          </div>

          {/* Hero Visual - Glassmorphism Z Card */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Glassmorphism Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="aspect-square flex items-center justify-center">
                  {/* 3D Z Icon */}
                  <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2873F5]/40 to-[#F87314]/40 rounded-3xl blur-2xl scale-110" />
                    
                    {/* Glass card */}
                    <div className="relative w-40 h-40 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 backdrop-blur-md flex items-center justify-center shadow-xl">
                      <span className="text-8xl font-bold text-white drop-shadow-lg">Z</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-white/60 text-sm mt-4">ZPrintPro Printing Services</p>
              </div>
              
              {/* Floating Labels */}
              <div className="absolute -top-2 -right-2 bg-white text-[#333333] rounded-xl px-4 py-3 shadow-xl border border-gray-100 animate-pulse">
                <p className="font-bold text-[#2873F5] text-lg">500+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-[#F87314] to-[#E56203] text-white rounded-xl px-4 py-3 shadow-xl">
                <p className="font-bold text-lg">24/7</p>
                <p className="text-sm">Support</p>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-1/2 -right-8 w-3 h-3 bg-white/40 rounded-full" />
              <div className="absolute bottom-1/4 -left-8 w-2 h-2 bg-[#F87314]/60 rounded-full" />
              <div className="absolute top-1/4 -left-6 w-4 h-4 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80V40C240 80 480 0 720 0C960 0 1200 80 1440 40V80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
