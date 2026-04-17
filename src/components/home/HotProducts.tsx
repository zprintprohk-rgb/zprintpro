'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, TrendingUp, CreditCard, Tag, ShoppingBag, FileText, ImageIcon, Package, BookOpen, Flag, Calendar, Mail, Gift, GraduationCap, Box } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { products, getProductTitle, getProductDescription } from '@/data/products';

interface HotProductsProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '熱門產品',
    subtitle: '最受客戶歡迎的印刷產品',
    viewAll: '查看全部',
    from: '起',
    popular: '熱門',
    new: '新品',
  },
  en: {
    title: 'Hot Products',
    subtitle: 'Our Most Popular Printing Products',
    viewAll: 'View All',
    from: 'From',
    popular: 'Popular',
    new: 'New',
  },
  ja: {
    title: '人気製品',
    subtitle: 'お客様に最も人気の印刷製品',
    viewAll: 'すべて見る',
    from: 'から',
    popular: '人気',
    new: '新着',
  },
};

const categoryFallbacks: Record<string, { icon: typeof Box; gradient: string; iconColor: string }> = {
  'business-cards': { icon: CreditCard, gradient: 'from-blue-500/15 to-indigo-600/15', iconColor: 'text-blue-500' },
  'stickers': { icon: Tag, gradient: 'from-orange-500/15 to-red-500/15', iconColor: 'text-orange-500' },
  'paper-bags': { icon: ShoppingBag, gradient: 'from-amber-500/15 to-orange-600/15', iconColor: 'text-amber-600' },
  'flyers': { icon: FileText, gradient: 'from-cyan-500/15 to-blue-600/15', iconColor: 'text-cyan-600' },
  'posters': { icon: ImageIcon, gradient: 'from-purple-500/15 to-pink-600/15', iconColor: 'text-purple-500' },
  'packaging': { icon: Package, gradient: 'from-emerald-500/15 to-teal-600/15', iconColor: 'text-emerald-600' },
  'books': { icon: BookOpen, gradient: 'from-rose-500/15 to-red-600/15', iconColor: 'text-rose-500' },
  'banners': { icon: Flag, gradient: 'from-green-500/15 to-emerald-600/15', iconColor: 'text-green-600' },
  'menus': { icon: BookOpen, gradient: 'from-orange-500/15 to-amber-600/15', iconColor: 'text-orange-500' },
  'calendars': { icon: Calendar, gradient: 'from-sky-500/15 to-blue-600/15', iconColor: 'text-sky-600' },
  'envelopes': { icon: Mail, gradient: 'from-gray-500/15 to-slate-600/15', iconColor: 'text-gray-500' },
  'red-packets': { icon: Gift, gradient: 'from-red-500/15 to-rose-600/15', iconColor: 'text-red-500' },
  'educational': { icon: GraduationCap, gradient: 'from-violet-500/15 to-purple-600/15', iconColor: 'text-violet-500' },
};

// 按 weight_score 排序取前8個作為熱門產品
const hotProducts = [...products].sort((a, b) => b.weight_score - a.weight_score).slice(0, 8);

export function HotProducts({ locale }: HotProductsProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#F87314]" />
              <span className="text-[#F87314] font-medium">{t.popular}</span>
            </div>
            <h2 className="text-3xl font-bold text-[#333333]">{t.title}</h2>
            <p className="text-[#666666] mt-2">{t.subtitle}</p>
          </div>
          <Link 
            href={`${localePrefix}/category/business-cards/`}
            className="inline-flex items-center gap-2 text-[#2873F5] hover:text-[#1E5FD1] font-medium transition-colors"
          >
            {t.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hotProducts.map((product) => {
            const productName = getProductTitle(product, locale);
            const fallback = categoryFallbacks[product.category] || { icon: Package, gradient: 'from-gray-400/15 to-gray-600/15', iconColor: 'text-gray-500' };
            const FallbackIcon = fallback.icon;
            const imageSrc = product.images?.[0] || '';

            return (
              <Link 
                key={product.sku_code}
                href={`${localePrefix}/product/${product.slug}/`}
                className="group bg-white rounded-xl border border-[#EEEEEE] overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image Area */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                  <ProductImageInner 
                    src={imageSrc} 
                    alt={productName} 
                    fallback={fallback}
                    FallbackIcon={FallbackIcon}
                  />
                  
                  {/* Badge */}
                  {product.weight_score >= 95 && (
                    <div className="absolute top-3 left-3 bg-[#2873F5] text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1 z-10">
                      <Star className="w-3 h-3" />
                      {t.popular}
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#2873F5]/0 group-hover:bg-[#2873F5]/10 transition-colors z-10" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-1">
                    {productName}
                  </h3>
                  <p className="text-sm text-[#666666] mt-1 line-clamp-2">
                    {getProductDescription(product, locale)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#F87314] font-bold text-sm">
                      {product.price_range}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductImageInner({ 
  src, 
  alt, 
  fallback,
  FallbackIcon 
}: { 
  src: string; 
  alt: string; 
  fallback: { gradient: string; iconColor: string };
  FallbackIcon: typeof Box;
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = src && !imgError;

  if (hasImage) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        unoptimized
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className={`w-24 h-24 bg-gradient-to-br ${fallback.gradient} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
        <FallbackIcon className={`w-10 h-10 ${fallback.iconColor}`} strokeWidth={1.5} />
      </div>
      <span className="text-xs text-gray-400 font-medium text-center px-4 line-clamp-1">
        {alt}
      </span>
    </div>
  );
}
