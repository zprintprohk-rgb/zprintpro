'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, products } from '@/data/products';
import { Locale } from '@/lib/seo';
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
  },
  'en': {
    title: 'Product Categories',
    cantFind: "Can't find what you're looking for?",
    quickQuote: 'Quick Quote',
    home: 'Home',
  },
  'ja': {
    title: '製品カテゴリー',
    cantFind: 'お探しの製品が見つかりませんか？',
    quickQuote: 'お見積もり',
    home: 'ホーム',
  },
};

export function CategorySidebar({ locale, currentCategorySlug }: CategorySidebarProps) {
  const t = translations[locale];
  const pathname = usePathname();
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
        {categoryCounts.map((cat) => {
          const Icon = iconMap[cat.slug] || Box;
          const isActive = cat.slug === currentCategorySlug;
          return (
            <Link
              key={cat.slug}
              href={`${localePrefix}/category/${cat.slug}/`}
              className={`flex items-center justify-between px-4 py-3.5 border-b border-gray-100 last:border-b-0 transition-colors group ${
                isActive
                  ? 'bg-blue-50 text-[#2873F5]'
                  : 'text-[#333333] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2873F5]' : 'text-gray-400 group-hover:text-[#2873F5]'}`} strokeWidth={1.5} />
                <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {locale === 'zh-hk' ? cat.name : locale === 'en' ? cat.nameEn : cat.nameJa}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">{cat.count}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-[#2873F5]' : 'text-gray-300 group-hover:text-[#2873F5] group-hover:translate-x-0.5'}`} />
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
    </div>
  );
}
