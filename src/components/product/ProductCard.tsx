'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, CreditCard, Tag, ShoppingBag, FileText, ImageIcon, Package, BookOpen, Flag, Calendar, Mail, Gift, GraduationCap, Box } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

const translations = {
  'zh-hk': {
    from: '起',
    popular: '熱門',
    new: '新品',
    minQty: '個起',
  },
  en: {
    from: 'From',
    popular: 'Popular',
    new: 'New',
    minQty: ' pcs+',
  },
  ja: {
    from: 'から',
    popular: '人気',
    new: '新着',
    minQty: '個〜',
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

export function ProductCard({ product, locale }: ProductCardProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [imgError, setImgError] = useState(false);

  const getProductName = () => {
    switch (locale) {
      case 'en': return product.nameEn;
      case 'ja': return product.nameJa;
      default: return product.name;
    }
  };

  const getProductDescription = () => {
    switch (locale) {
      case 'en': return product.descriptionEn;
      case 'ja': return product.descriptionJa;
      default: return product.description;
    }
  };

  const fallback = categoryFallbacks[product.category] || { icon: Package, gradient: 'from-gray-400/15 to-gray-600/15', iconColor: 'text-gray-500' };
  const FallbackIcon = fallback.icon;
  const imageSrc = product.images?.[0] || '';
  const hasImage = imageSrc && !imgError;

  return (
    <Link 
      href={`${localePrefix}/product/${product.slug}/`}
      className="group bg-white rounded-xl border border-[#EEEEEE] overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={getProductName()}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`w-20 h-20 bg-gradient-to-br ${fallback.gradient} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <FallbackIcon className={`w-9 h-9 ${fallback.iconColor}`} strokeWidth={1.5} />
            </div>
            <span className="text-xs text-gray-400 font-medium text-center px-4 line-clamp-1">
              {getProductName()}
            </span>
          </div>
        )}
        
        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[#F87314] text-white text-xs font-medium px-2 py-1 rounded">
            {t.new}
          </div>
        )}
        {product.isHot && !product.isNew && (
          <div className="absolute top-3 left-3 bg-[#2873F5] text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
            <Star className="w-3 h-3" />
            {t.popular}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#2873F5]/0 group-hover:bg-[#2873F5]/10 transition-colors" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-1">
          {getProductName()}
        </h3>
        <p className="text-sm text-[#666666] mt-1 line-clamp-2">
          {getProductDescription()}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#F87314] font-bold">
            {t.from} ${product.basePrice}
          </span>
          <span className="text-xs text-[#999999]">
            {product.minQuantity}{t.minQty}
          </span>
        </div>
      </div>
    </Link>
  );
}
