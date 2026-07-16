'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { categories, products } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getWhatsAppLinkProps } from '@/lib/whatsapp';
import {
  CreditCard, Tag, ShoppingBag, FileText, ImageIcon, Package,
  BookOpen, Flag, Calendar, Mail, Gift, GraduationCap, Box,
  ChevronRight, Search
} from 'lucide-react';

interface CategorySidebarProps {
  locale: Locale;
  currentCategorySlug: string;
}

const iconMap: Record<string, React.ElementType> = {
  'business-cards': CreditCard,
  'stickers': Tag,
  'paper-bags': ShoppingBag,
  'flyers': FileText,
  'posters': ImageIcon,
  'packaging': Package,
  'books': BookOpen,
  'banners': Flag,
  'menus': BookOpen,
  'calendars': Calendar,
  'envelopes': Mail,
  'red-packets': Gift,
  'educational': GraduationCap,
};

const translations = {
  'zh-hk': {
    title: '產品分類',
    cantFind: '找不到想要的產品？',
    quickQuote: '快速詢價',
    home: '首頁',
    enterpriseCta: '企業批量訂單',
    enterpriseDesc: '專屬客戶經理，專享優惠價格',
    contactUs: '聯繫我們 →',
    whatsapp: 'WhatsApp 查詢',
    qrScan: '掃碼即時查詢',
    trustBadge: '已有 500+ 企業客戶選擇智印雲',
  },
  'en': {
    title: 'Product Categories',
    cantFind: "Can't find what you're looking for?",
    quickQuote: 'Quick Quote',
    home: 'Home',
    enterpriseCta: 'Enterprise Bulk Orders',
    enterpriseDesc: 'Dedicated account manager with exclusive pricing',
    contactUs: 'Contact Us →',
    whatsapp: 'WhatsApp Inquiry',
    qrScan: 'Scan to Chat',
    trustBadge: 'Trusted by 500+ brands',
  },
  'ja': {
    title: '製品カテゴリー',
    cantFind: 'お探しの製品が見つかりませんか？',
    quickQuote: 'お見積もり',
    home: 'ホーム',
    enterpriseCta: '企業向け大口注文',
    enterpriseDesc: '専任アカウントマネージャー、特別価格',
    contactUs: 'お問い合わせ →',
    whatsapp: 'WhatsApp 問い合わせ',
    qrScan: 'QRで即時問い合わせ',
    trustBadge: '500社以上の企業様に選ばれています',
  },
};

export function CategorySidebar({ locale, currentCategorySlug }: CategorySidebarProps) {
  const t = translations[locale];
  const pathname = usePathname() || '';
  const localePrefix = `/${locale}`;

  // 计算每个分类的SKU数量
  const categoryCounts = categories.map((cat) => {
    const count = products.filter((p) => p.category_slug === cat.slug).length;
    return { ...cat, count };
  });

  return (
    <div className="space-y-4">
      {/* 分类标题 - 蓝色背景 */}
      <div className="bg-[#2873F5] text-white px-4 py-3 rounded-t-lg flex items-center gap-2">
        <div className="w-1 h-5 bg-white/60 rounded-full" />
        <h2 className="font-bold text-base">{t.title}</h2>
      </div>

      {/* 分类列表 */}
      <div className="bg-white rounded-b-lg border border-t-0 border-gray-200 overflow-hidden">
        {categoryCounts.map((cat, idx) => {
          const Icon = iconMap[cat.slug] || Box;
          const isActive = cat.slug === currentCategorySlug;
          const isEducational = cat.slug === 'educational';
          return (
            <Link
              key={cat.slug}
              href={`${localePrefix}/category/${cat.slug}/`}
              className={`flex items-center justify-between px-4 ${isEducational ? 'py-5' : 'py-4'} border-b border-gray-100 last:border-b-0 transition-colors group ${
                isEducational
                  ? 'bg-[#2873F5] text-white hover:bg-[#1e5fd1]'
                  : isActive
                    ? 'bg-[#2873F5] text-white'
                    : 'text-[#333333] hover:bg-[#2873F5] hover:text-white'
              } ${idx === categories.length - 1 ? 'last:rounded-b-lg' : ''}`}
            >
              <div className={`flex items-center gap-3 ${isEducational ? 'text-[16px]' : ''}`}>
                <Icon className={`w-4 h-4 ${isEducational ? 'text-white' : isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} strokeWidth={1.5} />
                <span className={`text-[15.5px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {locale === 'zh-hk' ? cat.name : locale === 'en' ? cat.nameEn : cat.nameJa}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-sm ${isEducational ? 'text-white' : isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{cat.count}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white group-hover:translate-x-0.5'}`} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 快速询价 */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center">
        <p className="text-sm text-gray-500 mb-3">{t.cantFind}</p>
        <Link
          href={`${localePrefix}/contact/`}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 border-2 border-[#2873F5] text-[#2873F5] rounded-lg text-sm font-medium hover:bg-[#2873F5] hover:text-white transition-colors"
        >
          <Search className="w-4 h-4" />
          {t.quickQuote}
        </Link>
      </div>

      {/* 企業批量訂單 + 聯繫方式 */}
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
          {...getWhatsAppLinkProps(locale, { source: 'category-sidebar', phone: '85290616204' })}
          className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 border-2 border-white/50 text-white rounded-xl text-sm md:text-base font-medium hover:bg-white/15 transition-colors mb-4 whitespace-nowrap"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {t.whatsapp}
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
          <p className="text-xs text-white/90 font-medium leading-relaxed">{t.trustBadge}</p>
        </div>
      </div>
    </div>
  );
}