'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
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
          {hotProducts.map((product) => (
            <Link 
              key={product.sku_code}
              href={`${localePrefix}/product/${product.slug}/`}
              className="group bg-white rounded-xl border border-[#EEEEEE] overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#2873F5]/20 to-[#F87314]/20 rounded-xl flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#2873F5]">
                      {getProductTitle(product, locale).charAt(0)}
                    </span>
                  </div>
                </div>
                
                {/* Badge */}
                {product.weight_score >= 95 && (
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
                  {getProductTitle(product, locale)}
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
          ))}
        </div>
      </div>
    </section>
  );
}
