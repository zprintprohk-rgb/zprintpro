'use client';

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
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

export function ProductCard({ product, locale }: ProductCardProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

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

  return (
    <Link 
      href={`${localePrefix}/product/${product.slug}/`}
      className="group bg-white rounded-xl border border-[#EEEEEE] overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#2873F5]/20 to-[#F87314]/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-[#2873F5]">
              {product.name.charAt(0)}
            </span>
          </div>
        </div>
        
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
