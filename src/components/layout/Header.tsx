'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ShoppingCart, User, Search, ChevronDown } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface HeaderProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    whatsapp: 'WhatsApp',
    support: '24/7 客戶服務',
    searchPlaceholder: '搜尋印刷產品...',
    search: '搜尋',
    login: '登入',
    cart: '購物車',
    home: '首頁',
    knowledge: '印刷知識',
    contact: '聯絡我們',
    categories: {
      'paper-bags': '紙袋印刷',
      'flyers': '宣傳單張',
      'stickers': '貼紙印刷',
      'packaging': '包裝盒定制',
      'posters': '海報定制',
      'educational': '校園印刷',
    },
    navOrder: ['paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'educational'] as const,
  },
  en: {
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    whatsapp: 'WhatsApp',
    support: '24/7 Customer Service',
    searchPlaceholder: 'Search printing products...',
    search: 'Search',
    login: 'Login',
    cart: 'Cart',
    home: 'Home',
    knowledge: 'Knowledge',
    contact: 'Contact Us',
    categories: {
      'paper-bags': 'Paper Bags',
      'flyers': 'Flyers',
      'stickers': 'Stickers',
      'packaging': 'Packaging',
      'posters': 'Posters',
      'educational': 'Educational',
    },
    navOrder: ['paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'educational'] as const,
  },
  ja: {
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    whatsapp: 'WhatsApp',
    support: '24時間年中無休サポート',
    searchPlaceholder: '印刷製品を検索...',
    search: '検索',
    login: 'ログイン',
    cart: 'カート',
    home: 'ホーム',
    knowledge: '印刷知識',
    contact: 'お問い合わせ',
    categories: {
      'paper-bags': '紙袋印刷',
      'flyers': 'チラシ印刷',
      'stickers': 'ステッカー印刷',
      'packaging': 'パッケージ印刷',
      'posters': 'ポスター印刷',
      'educational': '教育印刷',
    },
    navOrder: ['paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'educational'] as const,
  },
};

const categorySubItems: Record<string, string[]> = {
  'paper-bags': ['kraft-paper-bags', 'white-card-bags', 'gift-bags', 'eco-paper-bags', 'handle-bags'],
  'flyers': ['a4-flyers', 'a5-flyers', 'a3-flyers', 'dl-flyers', 'door-hangers'],
  'stickers': ['waterproof-stickers', 'transparent-stickers', 'foil-stickers', 'die-cut-stickers', 'hologram-stickers'],
  'packaging': ['product-boxes', 'mailer-boxes', 'gift-boxes', 'display-boxes', 'food-packaging'],
  'posters': ['a2-posters', 'a1-posters', 'a0-posters', 'foam-board-posters', 'backlit-posters'],
  'educational': ['workbooks', 'certificates', 'diplomas', 'educational-banners'],
};

const categoryCounts: Record<string, number> = {
  'paper-bags': 7,
  'flyers': 7,
  'stickers': 8,
  'packaging': 6,
  'posters': 6,
  'educational': 4,
};

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${localePrefix}/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm py-2">
          <div className="flex items-center gap-4 text-gray-600">
            <a href={`tel:${t.phone.replace(/\D/g, '')}`} className="flex items-center gap-1 hover:text-[#2873F5] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.phone}</span>
            </a>
            <a href={`mailto:${t.email}`} className="hidden md:flex items-center gap-1 hover:text-[#2873F5] transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>{t.email}</span>
            </a>
            <a href="https://wa.me/8618126380255" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t.whatsapp}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {t.support}
            </span>
            <div className="flex items-center gap-1">
              <Link href="/zh-hk/" className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${locale === 'zh-hk' ? 'bg-[#2873F5] text-white' : 'text-gray-500 hover:text-[#2873F5]'}`}>
                繁
              </Link>
              <Link href="/en/" className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${locale === 'en' ? 'bg-[#2873F5] text-white' : 'text-gray-500 hover:text-[#2873F5]'}`}>
                EN
              </Link>
              <Link href="/ja/" className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${locale === 'ja' ? 'bg-[#2873F5] text-white' : 'text-gray-500 hover:text-[#2873F5]'}`}>
                日
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20 gap-4">
            {/* Logo */}
            <Link href={`${localePrefix}/`} className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="智印港 ZprintPro"
                width={164}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-4 pr-24 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-5 bg-[#F87314] hover:bg-[#E56203] text-white rounded-r-lg flex items-center gap-1.5 transition-colors text-sm font-medium"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden lg:inline">{t.search}</span>
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-5">
              <Link href={`${localePrefix}/login`} className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-[#2873F5] transition-colors text-sm">
                <User className="w-5 h-5" />
                <span>{t.login}</span>
              </Link>
              <Link href={`${localePrefix}/cart`} className="flex items-center gap-1.5 text-gray-600 hover:text-[#2873F5] transition-colors text-sm">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#F87314] text-white text-[10px] rounded-full flex items-center justify-center font-bold">0</span>
                </div>
                <span className="hidden sm:inline">{t.cart}</span>
              </Link>
              <button
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Navigation Bar */}
      <nav className="hidden lg:block bg-[#2873F5]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-[43px]">
            <Link 
              href={`${localePrefix}/`}
              className={`flex-1 h-full flex items-center justify-center text-sm font-medium transition-colors ${pathname === `${localePrefix}/` ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
            >
              {t.home}
            </Link>

            {t.navOrder.map((catSlug) => (
              <div
                key={catSlug}
                className="relative h-full flex-1"
                onMouseEnter={() => setActiveDropdown(catSlug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`${localePrefix}/category/${catSlug}/`}
                  className={`h-full flex items-center justify-center gap-1 text-sm font-medium transition-colors ${pathname.includes(`/category/${catSlug}`) ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
                >
                  {t.categories[catSlug]}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === catSlug ? 'rotate-180' : ''}`} />
                </Link>

                {activeDropdown === catSlug && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-lg py-2 border border-gray-100">
                    {categorySubItems[catSlug]?.map((subSlug) => (
                      <Link
                        key={subSlug}
                        href={`${localePrefix}/product/${subSlug}/`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-[#2873F5] hover:bg-gray-50 transition-colors"
                      >
                        {subSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href={`${localePrefix}/category/${catSlug}/`}
                        className="block px-4 py-2 text-sm font-medium text-[#2873F5] hover:bg-gray-50 transition-colors"
                      >
                        {locale === 'zh-hk' ? '查看全部' : locale === 'en' ? 'View All' : 'すべて見る'} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link 
              href={`${localePrefix}/blog/`}
              className={`flex-1 h-full flex items-center justify-center text-sm font-medium transition-colors ${pathname.includes('/blog') ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
            >
              {t.knowledge}
            </Link>
            <Link 
              href={`${localePrefix}/contact/`}
              className={`flex-1 h-full flex items-center justify-center text-sm font-medium transition-colors ${pathname.includes('/contact') ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="md:hidden mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-200 rounded-lg text-sm"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-3 text-[#F87314]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            <Link href={`${localePrefix}/`} className="block font-medium text-[#333333] py-2">{t.home}</Link>
            {t.navOrder.map((catSlug) => (
              <Link key={catSlug} href={`${localePrefix}/category/${catSlug}/`} className="block font-medium text-[#333333] py-2">
                {t.categories[catSlug]}
              </Link>
            ))}
            <Link href={`${localePrefix}/blog/`} className="block font-medium text-[#333333] py-2">{t.knowledge}</Link>
            <Link href={`${localePrefix}/contact/`} className="block font-medium text-[#333333] py-2">{t.contact}</Link>
            
            <div className="flex gap-2 pt-4 border-t">
              <Link href="/zh-hk/" className={`px-4 py-2 rounded text-sm ${locale === 'zh-hk' ? 'bg-[#2873F5] text-white' : 'border border-gray-200'}`}>繁</Link>
              <Link href="/en/" className={`px-4 py-2 rounded text-sm ${locale === 'en' ? 'bg-[#2873F5] text-white' : 'border border-gray-200'}`}>EN</Link>
              <Link href="/ja/" className={`px-4 py-2 rounded text-sm ${locale === 'ja' ? 'bg-[#2873F5] text-white' : 'border border-gray-200'}`}>日</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
