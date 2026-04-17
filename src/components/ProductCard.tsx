/**
 * 产品卡片组件
 * 用于产品列表页展示
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CreditCard, Tag, ShoppingBag, FileText, ImageIcon, Package, BookOpen, Flag, Calendar, Mail, Gift, GraduationCap, Box } from 'lucide-react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getProductTitle, getProductDescription } from '@/data/products';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

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

export function ProductCard({ product, locale }: ProductCardProps) {
  const title = getProductTitle(product, locale);
  const description = getProductDescription(product, locale);
  const [imgError, setImgError] = useState(false);
  
  const fallback = categoryFallbacks[product.category] || { icon: Package, gradient: 'from-gray-400/15 to-gray-600/15', iconColor: 'text-gray-500' };
  const FallbackIcon = fallback.icon;
  const imageSrc = product.images?.[0] || '';
  const hasImage = imageSrc && !imgError;
  
  // 翻译
  const translations = {
    'zh-hk': { from: '起', viewDetails: '查看詳情' },
    'en': { from: 'From', viewDetails: 'View Details' },
    'ja': { from: 'から', viewDetails: '詳細を見る' },
  };
  
  const t = translations[locale];
  
  return (
    <a
      href={`/${locale}/product/${product.slug}`}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* 产品图片 */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${fallback.gradient} rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
              <FallbackIcon className={`w-8 h-8 ${fallback.iconColor}`} strokeWidth={1.5} />
            </div>
            <span className="text-xs text-gray-400 font-medium text-center px-4 line-clamp-1">
              {title}
            </span>
          </div>
        )}
        
        {/* 权重标签 */}
        {product.weight_score >= 90 && (
          <span className="absolute top-2 left-2 bg-[#F87314] text-white text-xs px-2 py-1 rounded z-10">
            HOT
          </span>
        )}
      </div>
      
      {/* 产品信息 */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#2873F5] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {description.slice(0, 60)}...
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[#2873F5] font-bold">
            {t.from} {product.price_range.split('-')[0]}
          </span>
          <span className="text-sm text-gray-400 group-hover:text-[#2873F5] transition-colors">
            {t.viewDetails} →
          </span>
        </div>
      </div>
    </a>
  );
}
