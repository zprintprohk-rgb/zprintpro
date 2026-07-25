'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronRight, Search, ShoppingBag, FileText, Tag, Package, ImageIcon, GraduationCap, CreditCard, Mail, BookOpen, Calendar, Gift, Flag, StickyNote } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { shouldShowPrice, getQuoteLabel, convertToFromPrice, getPriceUnitWord, getDisplayAnchor } from '@/lib/pricing';
import { getProductMainImage } from '@/lib/product-image';
import { products, categories, getProductDisplayTitle, getProductDescription, getProductImageAlt } from '@/data/products';
import { getWhatsAppLinkProps } from '@/lib/whatsapp';

interface HotProductsProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '熱門印刷產品',
    subtitle: '專業品質，價格透明，快速交貨',
    viewAll: '查看全部產品',
    categoryTitle: '產品分類',
    getQuote: '立即訂購',
    viewMore: '查詢更多',
    hotBadge: '熱銷',
    popular: '熱門',
    enterpriseCta: '企業批量訂單',
    enterpriseDesc: '專屬客戶經理，專享優惠價格',
    contactUs: '聯繫我們 →',
    qrScan: '掃碼即時查詢',
    trustBadge: '已有 15,000+ 客戶選擇智印雲',
    cantFind: '找不到想要的產品?',
    quickQuote: '快速詢價',
    from: '起',
    freeDesign: '免費設計',
  },
  en: {
    title: 'Hot Printing Products',
    subtitle: 'Professional quality, transparent pricing, fast delivery',
    viewAll: 'View All Products',
    categoryTitle: 'Categories',
    getQuote: 'Order Now',
    viewMore: 'View More',
    hotBadge: 'Hot',
    popular: 'Popular',
    enterpriseCta: 'Enterprise Bulk Orders',
    enterpriseDesc: 'Dedicated account manager with exclusive pricing',
    contactUs: 'Contact Us →',
    qrScan: 'Scan to Chat',
    trustBadge: 'Trusted by 15,000+ customers',
    cantFind: "Can't find what you need?",
    quickQuote: 'Quick Quote',
    from: 'From',
    freeDesign: 'Free design',
  },
  ja: {
    title: '人気の印刷製品',
    subtitle: 'プロ品質、透明な価格、迅速な納品',
    viewAll: 'すべての製品を見る',
    categoryTitle: 'カテゴリー',
    getQuote: '今すぐ注文',
    viewMore: '詳細を見る',
    hotBadge: '人気',
    popular: '人気',
    enterpriseCta: '企業向け大口注文',
    enterpriseDesc: '専任アカウントマネージャー、特別価格',
    contactUs: 'お問い合わせ →',
    qrScan: 'QRで即時問い合わせ',
    trustBadge: '15,000人以上のお客様に選ばれています',
    cantFind: 'お探しの製品が見つからない？',
    quickQuote: 'お見積もり',
    from: '〜',
    freeDesign: '無料デザイン',
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

// 首頁熱門產品：每個分類取 weight_score 最高1條，共12條（3列x4行）
// 排序：貼紙→宣傳單張→包裝盒→海報→紙袋→咭片→書籍→餐牌→噴繪→信封→年曆→利是封
const priorityCategories = [
  'stickers', 'flyers', 'packaging', 'posters', 'paper-bags', 'business-cards',
  'books', 'menus', 'banners', 'envelopes', 'calendars', 'red-packets',
];
const hotProducts = priorityCategories
  .map((catSlug) => {
    const catProducts = products.filter((p) => p.category === catSlug);
    return catProducts.sort((a, b) => b.weight_score - a.weight_score)[0];
  })
  .filter(Boolean)
  .slice(0, 12);

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
        loading="lazy"
        decoding="async"
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
  const localePrefix = `/${locale}`;
  const pathname = usePathname() || '';

  return (
    <section className="pt-4 pb-6 bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header 已移除 (2026-07-11 PM+UX 复盘: header 行无实际作用, 占用版面, 影响直接观看 SKU 产品图) */}

        {/* Two Column Layout */}
        <div className="flex gap-6 items-start">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0 relative left-[-5px] space-y-4">
            {/* Product Categories — 只包含分类列表 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-[#2873F5] text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-white/80 rounded-full" />
                <h3 className="font-semibold text-base">{t.categoryTitle}</h3>
              </div>
              <div>
                {categories.map((cat, idx) => {
                  const isEducational = cat.slug === 'educational';
                  const isActive = pathname.includes(`/category/${cat.slug}/`);
                  return (
                    <Link
                      key={cat.slug}
                      href={`${localePrefix}/category/${cat.slug}/`}
                      className={`flex items-center justify-between px-4 ${isEducational ? 'py-5' : 'py-4'} text-[15.5px] transition-colors border-b border-gray-100 ${
                        isEducational
                          ? 'bg-gray-400 text-white hover:bg-[#2873F5]'
                          : isActive
                            ? 'bg-[#2873F5] text-white'
                            : 'text-gray-600 hover:bg-[#2873F5] hover:text-white'
                      } ${idx === categories.length - 1 ? 'border-b-0 last:rounded-b-lg' : ''}`}
                    >
                      <span className={`flex items-center gap-2.5 ${isEducational ? 'text-[16px]' : ''}`}>
                        <span className={isEducational ? 'text-white' : 'text-gray-400'}>{categoryIcons[cat.slug] || <ShoppingBag className="w-4 h-4" />}</span>
                        <span>{locale === 'zh-hk' ? cat.name : locale === 'en' ? cat.nameEn : cat.nameJa}</span>
                      </span>
                      <span className={`flex items-center gap-1 text-sm ${isEducational ? 'text-white' : 'text-gray-400'}`}>
                        {categoryCounts[cat.slug] || 0}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Quote Search — 独立卡片 */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500 text-center mb-2">{t.cantFind}</p>
              <Link
                href={`${localePrefix}/contact/`}
                className="flex items-center justify-center gap-2 w-full py-2 border border-[#3090FF] text-[#3090FF] rounded-lg text-sm hover:bg-[#3090FF] hover:text-white transition-colors"
              >
                <Search className="w-4 h-4" />
                {t.quickQuote}
              </Link>
            </div>

            {/* Enterprise CTA — 独立卡片 */}
            <div className="bg-gradient-to-br from-[#2873F5] to-[#1E5FD1] rounded-2xl px-3 md:px-4 py-5 md:py-6 text-white">
              <h3 className="font-bold text-base md:text-lg mb-2 text-center whitespace-nowrap">{t.enterpriseCta}</h3>
              <p className={`text-white/85 mb-4 text-center leading-snug ${
                locale === 'en'
                  ? 'text-[11.5px] leading-snug line-clamp-2 px-0.5'
                  : 'text-[12px] leading-snug whitespace-nowrap'
              }`}>{t.enterpriseDesc}</p>
              <Link
                href={`${localePrefix}/contact/`}
                className="flex items-center justify-center w-full text-[#2873F5] text-sm md:text-base font-semibold bg-white hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-colors mb-3 shadow-lg whitespace-nowrap"
              >
                {t.contactUs}
              </Link>
              <a
                {...getWhatsAppLinkProps(locale, { source: 'hot-products', phone: '85290616204' })}
                className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 border-2 border-white/50 text-white rounded-xl text-sm md:text-base font-medium hover:bg-white/15 transition-colors mb-4 whitespace-nowrap"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              {/* WhatsApp QR 二维码 (Fusion Plan 规范) */}
              <div className="flex flex-col items-center gap-1.5 mb-4">
                <div className="w-[120px] h-[120px] bg-white border border-white/30 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
                  <Image
                    src="/whatsapp-qr.jpg?v=2"
                    alt="WhatsApp QR Code | ZprintPro"
                    width={120}
                    height={120}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-white/80">{t.qrScan}</p>
              </div>
              {/* 社交证明 (Fusion Plan 规范) */}
              <div className="text-center pt-3 border-t border-white/20">
                <p className="text-xs text-white/90 font-medium leading-[1.76]">{t.trustBadge}</p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 relative right-[-5px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {hotProducts.map((product, index) => {
                const productName = getProductDisplayTitle(product, locale);
                const productDesc = getProductDescription(product, locale);
                const imageSrc = getProductMainImage(product, locale);
                return (
                  <div
                    key={product.sku_code}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image — 1:1, clickable to PDP */}
                    <Link href={`${localePrefix}/product/${product.slug}/`} className="aspect-square relative overflow-hidden bg-gray-50 block">
                      <ProductImage src={imageSrc} alt={getProductImageAlt(product, locale)} />
                      {product.isHot && (
                        <div className="absolute top-3 left-3 bg-[#F87314] text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
                          {t.hotBadge}
                        </div>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-[#333333] text-center mb-1 line-clamp-3 h-[84px] leading-7">
                        {productName}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2 text-center h-[44px] leading-5">
                        {productDesc}
                      </p>
                      {/* price area — 单价小锚 + MOQ 副行 (2026-07-26 K3: getDisplayAnchor 优先), clickable to PDP */}
                      {(() => { const anchor = getDisplayAnchor(product.slug, locale); return (
                      <div className="mb-2 text-center">
                        <Link href={`${localePrefix}/product/${product.slug}/`} className="text-[#F87314] font-bold text-sm tracking-wider hover:underline">
                          {locale === 'en' && <span className="text-xs font-medium text-gray-400 mr-1 tracking-normal">{t.from}</span>}
                          {anchor ? anchor.big : convertToFromPrice(product.price_range, locale, product.category_slug, product.slug)}
                          {anchor && <span className="text-xs font-normal text-gray-400 ml-0.5 tracking-normal">{anchor.unitLabel}</span>}
                          {locale !== 'en' && <span className="text-xs font-normal text-gray-400 ml-0.5 tracking-normal">{t.from}</span>}
                        </Link>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                          {anchor
                            ? anchor.sub
                            : locale === 'zh-hk'
                            ? `${product.minQuantity}${getPriceUnitWord(product.price_range) || '件'}起訂 · 量大更優`
                            : locale === 'ja'
                            ? `${product.minQuantity}個〜 · 大口割引`
                            : `MOQ ${product.minQuantity} · Volume pricing`}
                        </p>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{t.freeDesign}</p>
                      </div>
                      ); })()}
                      {/* dual buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`${localePrefix}/product/${product.slug}/`}
                          className="flex-1 text-center py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-[#2873F5] hover:text-[#2873F5] transition-colors"
                        >
                          {t.viewMore}
                        </Link>
                        <Link
                          href={`${localePrefix}/product/${product.slug}/`}
                          className="flex-1 text-center py-2 bg-[#3090FF] text-white rounded-lg text-sm font-medium hover:bg-[#1E5FD1] transition-colors"
                        >
                          {t.getQuote}
                        </Link>
                      </div>
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