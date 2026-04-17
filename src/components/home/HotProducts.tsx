'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Star, ShoppingBag, FileText, Tag, Package, ImageIcon, GraduationCap, CreditCard, Mail, BookOpen, Calendar, Gift, Flag, StickyNote } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { products, categories, getProductTitle, getProductDescription } from '@/data/products';

interface HotProductsProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '熱門印刷產品',
    subtitle: '專業品質，價格透明，快速交貨',
    viewAll: '查看全部產品',
    categoryTitle: '產品分類',
    orderNow: '立即訂購',
    hotBadge: '熱銷',
    popular: '熱門',
    enterpriseCta: '企業批量訂單',
    enterpriseDesc: '專屬客戶經理，專享優惠價格',
    contactUs: '聯繫我們 →',
  },
  en: {
    title: 'Hot Printing Products',
    subtitle: 'Professional quality, transparent pricing, fast delivery',
    viewAll: 'View All Products',
    categoryTitle: 'Categories',
    orderNow: 'Order Now',
    hotBadge: 'Hot',
    popular: 'Popular',
    enterpriseCta: 'Enterprise Bulk Orders',
    enterpriseDesc: 'Dedicated account manager with exclusive pricing',
    contactUs: 'Contact Us →',
  },
  ja: {
    title: '人気の印刷製品',
    subtitle: 'プロ品質、透明な価格、迅速な納品',
    viewAll: 'すべての製品を見る',
    categoryTitle: 'カテゴリー',
    orderNow: '今すぐ注文',
    hotBadge: '人気',
    popular: '人気',
    enterpriseCta: '企業向け大口注文',
    enterpriseDesc: '専任アカウントマネージャー、特別価格',
    contactUs: 'お問い合わせ →',
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  'paper-bags': <ShoppingBag className="w-4 h-4" />,
  'flyers': <FileText className="w-4 h-4" />,
  'stickers': <Tag className="w-4 h-4" />,
  'packaging': <Package className="w-4 h-4" />,
  'posters': <ImageIcon className="w-4 h-4" />,
  'books': <BookOpen className="w-4 h-4" />,
  'business-cards': <CreditCard className="w-4 h-4" />,
  'envelopes': <Mail className="w-4 h-4" />,
  'menus': <StickyNote className="w-4 h-4" />,
  'calendars': <Calendar className="w-4 h-4" />,
  'red-packets': <Gift className="w-4 h-4" />,
  'banners': <Flag className="w-4 h-4" />,
  'educational': <GraduationCap className="w-4 h-4" />,
};

// Get category counts
const categoryCounts: Record<string, number> = {};
categories.forEach((cat) => {
  categoryCounts[cat.slug] = products.filter((p) => p.category === cat.slug).length;
});

// 按 weight_score 排序取前6個作為熱門產品（3列x2行）
const hotProducts = [...products].sort((a, b) => b.weight_score - a.weight_score).slice(0, 6);

function ProductImage({ src, alt }: { src: string; alt: string }) {
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
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <span className="text-gray-300 text-4xl font-bold">{alt.charAt(0)}</span>
    </div>
  );
}

export function HotProducts({ locale }: HotProductsProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <section className="pt-4 pb-6 bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">{t.title}</h2>
            <p className="text-gray-500 mt-1">{t.subtitle}</p>
          </div>
          <Link
            href={`${localePrefix}/category/business-cards/`}
            className="inline-flex items-center gap-1 text-[#2873F5] hover:text-[#1E5FD1] font-medium transition-colors text-sm"
          >
            {t.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
              <div className="px-4 py-3 bg-[#2873F5] text-white">
                <h3 className="font-semibold text-sm">{t.categoryTitle}</h3>
              </div>
              <div className="py-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`${localePrefix}/category/${cat.slug}/`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-[#2873F5] hover:bg-blue-50 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-gray-400">{categoryIcons[cat.slug] || <ShoppingBag className="w-4 h-4" />}</span>
                      <span>{locale === 'zh-hk' ? cat.name : locale === 'en' ? cat.nameEn : cat.nameJa}</span>
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      {categoryCounts[cat.slug] || 0}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>

              {/* Enterprise CTA */}
              <div className="p-4 bg-gradient-to-br from-[#2873F5] to-[#1E5FD1] m-3 rounded-lg">
                <p className="text-white font-semibold text-sm mb-1">{t.enterpriseCta}</p>
                <p className="text-white/80 text-xs mb-3">{t.enterpriseDesc}</p>
                <Link
                  href={`${localePrefix}/contact/`}
                  className="inline-flex items-center text-white text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors"
                >
                  {t.contactUs}
                </Link>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {hotProducts.map((product, index) => {
                const productName = getProductTitle(product, locale);
                const productDesc = getProductDescription(product, locale);
                const imageSrc = product.images?.[0] || '';
                const isHot = index < 3;

                return (
                  <div
                    key={product.sku_code}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                      <ProductImage src={imageSrc} alt={productName} />
                      {isHot && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                          {t.hotBadge}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors mb-1">
                        {productName}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {productDesc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#F87314] font-bold text-sm">
                          {product.price_range}
                        </span>
                      </div>
                      <Link
                        href={`${localePrefix}/product/${product.slug}/`}
                        className="mt-3 w-full inline-flex items-center justify-center py-2.5 bg-[#2873F5] hover:bg-[#1E5FD1] text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        {t.orderNow}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
