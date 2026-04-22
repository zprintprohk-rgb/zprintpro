'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, CreditCard, Tag, ShoppingBag, FileText, ImageIcon, Package, BookOpen, Flag, Calendar, Mail, Gift, GraduationCap, Box } from 'lucide-react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';

interface CategoryProductCardProps {
  product: Product;
  locale: Locale;
  index: number; // 用于决定顶部条颜色
}

const topBarColors = [
  'bg-[#2873F5]', // 蓝
  'bg-[#10B981]', // 绿
  'bg-[#F87314]', // 橙
  'bg-[#8B5CF6]', // 紫
  'bg-[#EC4899]', // 粉
  'bg-[#06B6D4]', // 青
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
  'zh-hk': {
    hot: '熱銷',
    orderNow: '立即訂購',
    // priceNote 已移除，保持界面簡潔
    from: '起',
  },
  'en': {
    hot: 'Hot',
    orderNow: 'Order Now',
    // priceNote removed for cleaner UI
    from: 'From',
  },
  'ja': {
    hot: '人気',
    orderNow: '注文する',
    // priceNote removed for cleaner UI
    from: 'から',
  },
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

  // 截断描述，e-print风格较短
  const shortDesc = getDesc().slice(0, 45) + (getDesc().length > 45 ? '...' : '');

  return (
    <Link
      href={`${localePrefix}/product/${product.slug}/`}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* 顶部彩色条 */}
      <div className={`h-2 ${topBarColor}`} />

      {/* 热销标签 */}
      {product.isHot && (
        <div className="relative">
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#EF4444] text-white text-[11px] font-bold px-2.5 py-1 rounded">
              {t.hot}
            </span>
          </div>
        </div>
      )}

      {/* 图片区域 - e-print风格：圆形占位 */}
      <div className="block pt-6 pb-4 px-4">
        <div className="flex flex-col items-center">
          {hasImage ? (
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-50 mb-3 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={imageSrc}
                alt={getName()}
                width={112}
                height={112}
                className="object-cover w-full h-full"
                unoptimized
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className={`w-28 h-28 rounded-full ${fallback.bgColor} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300`}>
              <FallbackIcon className={`w-12 h-12 ${fallback.iconColor}`} strokeWidth={1.5} />
            </div>
          )}

          {/* 产品中文名 */}
          <h3 className="text-lg font-bold text-[#333333] text-center group-hover:text-[#2873F5] transition-colors">
            {product.name}
          </h3>

          {/* 英文名 */}
          <p className="text-sm text-gray-500 text-center mt-0.5">
            {product.nameEn}
          </p>

          {/* 日文名 - 更小 */}
          <p className="text-xs text-gray-400 text-center mt-0.5">
            {product.nameJa}
          </p>

          {/* 品牌小字 */}
          <p className="text-[10px] text-gray-300 text-center mt-1.5 tracking-wider">
            ZprintPro 智印港 · 香港專業印刷 Hong Kong Professional Printing
          </p>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="mx-4 border-t border-gray-100" />

      {/* 产品描述 + 价格 + 按钮 */}
      <div className="p-4 flex flex-col flex-1">
        {/* 描述 — 固定3行高度，确保价格位置统一 */}
        <p className="text-sm text-gray-500 leading-relaxed mb-3 h-[66px] overflow-hidden">
          {shortDesc}
        </p>

        {/* 价格 */}
        <div className="mb-3">
          <span className="text-[#F87314] font-bold text-lg">
            {product.price_range.split('-')[0]}
          </span>
          <span className="text-xs text-gray-400 ml-1">
            {t.from}
          </span>
        </div>

        {/* 立即订购按钮 — 颜色减25% */}
        <span
          className="block w-full text-center py-2.5 bg-[#3090FF] text-white rounded-lg text-sm font-medium hover:bg-[#1E5FD1] transition-colors mt-auto"
        >
          {t.orderNow}
        </span>
      </div>
    </Link>
  );
}
