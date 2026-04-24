'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, Tag, ShoppingBag, FileText, ImageIcon, Package, BookOpen, Flag, Calendar, Mail, Gift, GraduationCap, Box } from 'lucide-react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { shouldShowPrice, convertPriceRangeString } from '@/lib/pricing';

interface CategoryProductCardProps {
  product: Product;
  locale: Locale;
  index: number;
}

const topBarColors = [
  'bg-[#2873F5]', 'bg-[#10B981]', 'bg-[#F87314]',
  'bg-[#8B5CF6]', 'bg-[#EC4899]', 'bg-[#06B6D4]',
];

const categoryFallbacks: Record<string, { icon: typeof Box; bgColor: string; iconColor: string }> = {
  'business-cards': { icon: CreditCard, bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
  'stickers': { icon: Tag, bgColor: 'bg-orange-50', iconColor: 'text-orange-500' },
  'paper-bags': { icon: ShoppingBag, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  'flyers': { icon: FileText, bgColor: 'bg-cyan-50', iconColor: 'text-cyan-600' },
  'posters': { icon: ImageIcon, bgColor: 'bg-purple-50', iconColor: 'text-purple-500' },
  'packaging': { icon: Package, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  'books': { icon: BookOpen, bgColor: 'bg-rose-50', iconColor: 'text-rose-500' },
  'banners': { icon: Flag, bgColor: 'bg-green-50', iconColor: 'text-green-600' },
  'menus': { icon: BookOpen, bgColor: 'bg-orange-50', iconColor: 'text-orange-500' },
  'calendars': { icon: Calendar, bgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  'envelopes': { icon: Mail, bgColor: 'bg-gray-50', iconColor: 'text-gray-500' },
  'red-packets': { icon: Gift, bgColor: 'bg-red-50', iconColor: 'text-red-500' },
  'educational': { icon: GraduationCap, bgColor: 'bg-violet-50', iconColor: 'text-violet-500' },
};

const translations = {
  'zh-hk': { hot: '熱銷', getQuote: '立即訂購', viewMore: '查詢更多', from: '起' },
  'en': { hot: 'Hot', getQuote: 'Order Now', viewMore: 'View More', from: 'From' },
  'ja': { hot: '人気', getQuote: '今すぐ注文', viewMore: '詳細を見る', from: 'から' },
};

export function CategoryProductCard({ product, locale, index }: CategoryProductCardProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [imgError, setImgError] = useState(false);

  const topBarColor = topBarColors[index % topBarColors.length];
  const fallback = categoryFallbacks[product.category] || { icon: Package, bgColor: 'bg-gray-50', iconColor: 'text-gray-500' };
  const FallbackIcon = fallback.icon;
  const imageSrc = product.images?.[0] || '';
  const hasImage = imageSrc && !imgError;

  const getName = () => {
    switch (locale) {
      case 'en': return product.nameEn;
      case 'ja': return product.nameJa;
      default: return product.name;
    }
  };

  const getDesc = () => {
    switch (locale) {
      case 'en': return product.descriptionEn;
      case 'ja': return product.descriptionJa;
      default: return product.description;
    }
  };

  const shortDesc = getDesc().slice(0, 40) + (getDesc().length > 40 ? '...' : '');
  const showPrice = shouldShowPrice(product.category_slug);

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* top bar */}
      <div className={`h-2 ${topBarColor}`} />

      {/* hot badge */}
      {product.isHot && (
        <div className="relative">
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#EF4444] text-white text-[11px] font-bold px-2.5 py-1 rounded">
              {t.hot}
            </span>
          </div>
        </div>
      )}

      {/* image — 1:1, clickable to PDP */}
      <Link href={`${localePrefix}/product/${product.slug}/`} className="aspect-square relative overflow-hidden bg-gray-50 block">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={getName()}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 ${fallback.bgColor} flex items-center justify-center`}>
            <FallbackIcon className={`w-16 h-16 ${fallback.iconColor}`} strokeWidth={1.5} />
          </div>
        )}
      </Link>

      {/* product name + desc */}
      <div className="px-4 pt-2">
        <h3 className="text-lg font-bold text-[#333333] text-center">{getName()}</h3>
        <p className="text-sm text-gray-500 text-center mt-1 line-clamp-2 h-[40px]">{shortDesc}</p>
      </div>

      {/* divider */}
      <div className="mx-4 border-t border-gray-100 mt-2" />

      {/* price + dual buttons */}
      <div className="p-4 flex flex-col flex-1">
        {/* price area — fixed height for alignment, clickable to PDP */}
        <div className="h-[28px] mb-2 flex items-center justify-center">
          <Link href={`${localePrefix}/product/${product.slug}/`} className="text-[#F87314] font-bold text-base hover:underline">
            {convertPriceRangeString(product.price_range, locale).split('-')[0]}
            <span className="text-xs text-gray-400 ml-1">{t.from}</span>
          </Link>
        </div>

        {/* dual buttons — half length, centered */}
        <div className="flex gap-2 mt-auto justify-center">
          <Link
            href={`${localePrefix}/product/${product.slug}/`}
            className="flex-1 max-w-[140px] text-center py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-[#2873F5] hover:text-[#2873F5] transition-colors"
          >
            {t.viewMore}
          </Link>
          <Link
            href={`${localePrefix}/product/${product.slug}/`}
            className="flex-1 max-w-[140px] text-center py-2 bg-[#3090FF] text-white rounded-lg text-sm font-medium hover:bg-[#1E5FD1] transition-colors"
          >
            {t.getQuote}
          </Link>
        </div>
      </div>
    </div>
  );
}
