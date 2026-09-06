'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, Tag, ShoppingBag, FileText, ImageIcon, Package, BookOpen, Flag, Calendar, Mail, Gift, GraduationCap, Box } from 'lucide-react';
import { Product, getProductDisplayTitle } from '@/data/products';
import { Locale } from '@/lib/seo';
import { shouldShowPrice, convertToFromPrice, getPriceUnitWord, getDisplayAnchor } from '@/lib/pricing';
import { getProductMainImage } from '@/lib/product-image';

interface CategoryProductCardProps {
  product: Product;
  locale: Locale;
  index: number;
}


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
  'zh-hk': { hot: '熱賣', getQuote: '立即訂購', viewMore: '查詢更多', from: '起', freeDesign: '免費設計', moqSuffix: '起訂', volumeNote: '量大更優' },
  'en': { hot: 'Hot', getQuote: 'Order Now', viewMore: 'View More', from: 'From', freeDesign: 'Free design', moqSuffix: 'MOQ', volumeNote: 'Volume pricing' },
  'ja': { hot: '人気', getQuote: '今すぐ注文', viewMore: '詳細を見る', from: '〜', freeDesign: '無料デザイン', moqSuffix: '〜', volumeNote: '大口割引' },
};

// 2026-07-15: 防御性 helper - 清理 title_zh / buildProductH1ZhHk 输出中可能的多余空白
// 同时充当 real source change 强製 Next.js 重新 bundle CategoryProductCard chunk
// (cae8fad component 改动 + 2 次空 commit rebuild 仍 hit 增量缓存, 需实质改动触发 re-compile)
const normalizeTitle = (s: string): string => s.replace(/\s+/g, ' ').trim();

export function CategoryProductCard({ product, locale, index }: CategoryProductCardProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const [imgError, setImgError] = useState(false);

  const fallback = categoryFallbacks[product.category] || { icon: Package, bgColor: 'bg-gray-50', iconColor: 'text-gray-500' };
  const FallbackIcon = fallback.icon;
  const imageSrc = getProductMainImage(product, locale);
  const hasImage = imageSrc && !imgError;

  const getName = () => {
    // 2026-07-15 列表页标题同步 V8 优化版 (rev 3: SSoT getProductDisplayTitle):
    //   修 c924465 → 全部 caller 统一到 getProductDisplayTitle (含 en/ja V8)
    //   旧: en/ja 直接返 nameEn/nameJa (V6 短名), 现: en/ja 走 buildProductH1En/Ja
    return getProductDisplayTitle(product, locale);
  };

  const showPrice = shouldShowPrice(product.category_slug);

  // 2026-07-18 P6+P7: 起价 + MOQ 表达 — 'HK$4-16/本' → 'HK$4/本起' + '100本起訂 · 量大更優'
  // 2026-07-26 K3: 优先走 getDisplayAnchor 单价小锚 (B类区间锚 > 价格表锚 > 旧 price_range 回退)
  const anchor = getDisplayAnchor(product.slug, locale);
  const fromPrice = anchor ? anchor.big : convertToFromPrice(product.price_range, locale, product.category_slug, product.slug);
  const unitWord = getPriceUnitWord(product.price_range);
  const moqLine = anchor
    ? anchor.sub
    : locale === 'zh-hk'
      ? `${product.minQuantity}${unitWord || '件'}${t.moqSuffix} · ${t.volumeNote}`
      : locale === 'ja'
      ? `${product.minQuantity}個${t.moqSuffix} · ${t.volumeNote}`
      : `${t.moqSuffix} ${product.minQuantity} · ${t.volumeNote}`;

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* image — 1:1, clickable to PDP */}
      <Link href={`${localePrefix}/product/${product.slug}/`} className="aspect-square relative overflow-hidden bg-gray-50 block">
        {/* hot badge — 简洁小圆角标签 (品牌橙) */}
        {product.isHot && (
          <span className="absolute top-3 left-3 z-10 bg-[#F87314] text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
            {t.hot}
          </span>
        )}
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={getName()}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 ${fallback.bgColor} flex items-center justify-center`}>
            <FallbackIcon className={`w-16 h-16 ${fallback.iconColor}`} strokeWidth={1.5} />
          </div>
        )}
      </Link>

      {/* product name — 2026-09-06 降噪: 删截断描述行, 标题 2 行自适应 */}
      <div className="px-4 pt-3">
        <h3 className="text-base font-bold text-[#333333] text-center line-clamp-2 leading-6 min-h-[48px]">{normalizeTitle(getName())}</h3>
      </div>

      {/* divider */}
      <div className="mx-4 border-t border-gray-100 mt-3" />

      {/* price + dual buttons */}
      <div className="p-4 pt-3 flex flex-col flex-1">
        {/* price area — 起价 + MOQ 副行, clickable to PDP */}
        <div className="mb-2 text-center">
          <Link href={`${localePrefix}/product/${product.slug}/`} className="text-[#F87314] font-bold text-base hover:underline">
            {locale === 'en' && <span className="text-xs font-medium text-gray-400 mr-1">{t.from}</span>}
            {fromPrice}
            {anchor && <span className="text-xs font-normal text-gray-400 ml-0.5">{anchor.unitLabel}</span>}
            {locale !== 'en' && <span className="text-xs font-normal text-gray-400 ml-0.5">{t.from}</span>}
          </Link>
          <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{moqLine}</p>
        </div>

        {/* single primary CTA — 2026-09-06 降噪: 双按钮同 URL 重复, 合并为单主 CTA */}
        <Link
          href={`${localePrefix}/product/${product.slug}/`}
          className="w-full text-center py-2.5 bg-[#3090FF] text-white rounded-lg text-sm font-semibold hover:bg-[#1E5FD1] transition-colors mt-auto"
        >
          {t.getQuote}
        </Link>
      </div>
    </div>
  );
}
