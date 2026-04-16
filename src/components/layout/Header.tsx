'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ShoppingCart, ChevronDown } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface HeaderProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    home: '首頁',
    products: '產品',
    about: '關於我們',
    contact: '聯絡我們',
    quote: '免費報價',
    phone: '2154 1318',
    categories: {
      stickers: '貼紙',
      labels: '標籤',
      cards: '卡片',
      booklets: '書刊',
      packaging: '包裝',
      largeFormat: '大型噴畫',
      stationery: '文具',
      promotional: '宣傳品',
    },
  },
  en: {
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    quote: 'Get Quote',
    phone: '2154 1318',
    categories: {
      stickers: 'Stickers',
      labels: 'Labels',
      cards: 'Cards',
      booklets: 'Booklets',
      packaging: 'Packaging',
      largeFormat: 'Large Format',
      stationery: 'Stationery',
      promotional: 'Promotional',
    },
  },
  ja: {
    home: 'ホーム',
    products: '製品',
    about: '会社概要',
    contact: 'お問い合わせ',
    quote: '見積もり',
    phone: '2154 1318',
    categories: {
      stickers: 'ステッカー',
      labels: 'ラベル',
      cards: 'カード',
      booklets: '冊子',
      packaging: '包装',
      largeFormat: '大型印刷',
      stationery: '文房具',
      promotional: '販促品',
    },
  },
};

const categorySlugs: Record<string, string[]> = {
  stickers: ['circular-stickers', 'rectangular-stickers', 'die-cut-stickers', 'kiss-cut-stickers', 'hologram-stickers', 'clear-stickers'],
  labels: ['product-labels', 'shipping-labels', 'food-labels', 'cosmetic-labels', 'wine-labels', 'thermal-labels'],
  cards: ['business-cards', 'name-cards', 'postcards', 'greeting-cards', 'thank-you-cards', 'appointment-cards'],
  booklets: ['booklets', 'catalogues', 'brochures', 'flyers', 'leaflets', 'menus'],
  packaging: ['product-boxes', 'mailer-boxes', 'shopping-bags', 'gift-boxes', 'paper-bags', 'tissue-paper'],
  largeFormat: ['banners', 'posters', 'foam-boards', 'roll-up-banners', 'vinyl-banners', 'backdrops'],
  stationery: ['letterheads', 'envelopes', 'notepads', 'folders', 'ncr-forms', 'invoices'],
  promotional: ['bookmarks', 'magnets', 'coasters', 'lanyards', 'badges', 'tote-bags'],
};

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const t = translations[locale];

  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] text-white py-2">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:21541318" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <Phone className="w-4 h-4" />
              <span>{t.phone}</span>
            </a>
            <a href="mailto:info@zprintpro.com" className="hidden sm:flex items-center gap-1 hover:text-white/80 transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@zprintpro.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`${localePrefix}/quote`} className="bg-[#F87314] hover:bg-[#E56203] px-4 py-1 rounded-full font-medium transition-colors">
              {t.quote}
            </Link>
            <Link href={`${localePrefix}/cart`} className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={`${localePrefix}/`} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2873F5] to-[#F87314] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-[#333333]">智印港</span>
                <span className="text-xs text-[#666666]">ZPrintPro</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link 
                href={`${localePrefix}/`} 
                className={`font-medium transition-colors ${pathname === `${localePrefix}/` ? 'text-[#2873F5]' : 'text-[#333333] hover:text-[#2873F5]'}`}
              >
                {t.home}
              </Link>
              
              {/* Products Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="flex items-center gap-1 font-medium text-[#333333] hover:text-[#2873F5] transition-colors">
                  {t.products}
                  <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {productsOpen && (
                  <div className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-lg mt-2 p-6 grid grid-cols-3 gap-4">
                    {Object.entries(t.categories).map(([key, name]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-[#333333] mb-2">{name}</h4>
                        <ul className="space-y-1">
                          {categorySlugs[key]?.slice(0, 3).map((slug) => (
                            <li key={slug}>
                              <Link 
                                href={`${localePrefix}/category/${slug}/`}
                                className="text-sm text-[#666666] hover:text-[#2873F5] transition-colors"
                              >
                                {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href={`${localePrefix}/about`} 
                className={`font-medium transition-colors ${pathname.includes('/about') ? 'text-[#2873F5]' : 'text-[#333333] hover:text-[#2873F5]'}`}
              >
                {t.about}
              </Link>
              <Link 
                href={`${localePrefix}/contact`} 
                className={`font-medium transition-colors ${pathname.includes('/contact') ? 'text-[#2873F5]' : 'text-[#333333] hover:text-[#2873F5]'}`}
              >
                {t.contact}
              </Link>
            </nav>

            {/* Language Switcher */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/zh-hk/" className={`px-3 py-1 rounded text-sm ${locale === 'zh-hk' ? 'bg-[#2873F5] text-white' : 'text-[#666666] hover:text-[#2873F5]'}`}>
                繁
              </Link>
              <Link href="/en/" className={`px-3 py-1 rounded text-sm ${locale === 'en' ? 'bg-[#2873F5] text-white' : 'text-[#666666] hover:text-[#2873F5]'}`}>
                EN
              </Link>
              <Link href="/ja/" className={`px-3 py-1 rounded text-sm ${locale === 'ja' ? 'bg-[#2873F5] text-white' : 'text-[#666666] hover:text-[#2873F5]'}`}>
                日
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <Link href={`${localePrefix}/`} className="block font-medium text-[#333333]">{t.home}</Link>
            <Link href={`${localePrefix}/category/business-cards/`} className="block font-medium text-[#333333]">{t.products}</Link>
            <Link href={`${localePrefix}/about`} className="block font-medium text-[#333333]">{t.about}</Link>
            <Link href={`${localePrefix}/contact`} className="block font-medium text-[#333333]">{t.contact}</Link>
            
            {/* Mobile Language Switcher */}
            <div className="flex gap-2 pt-4 border-t">
              <Link href="/zh-hk/" className="px-4 py-2 bg-[#2873F5] text-white rounded">繁體中文</Link>
              <Link href="/en/" className="px-4 py-2 border border-[#DDDDDD] rounded">English</Link>
              <Link href="/ja/" className="px-4 py-2 border border-[#DDDDDD] rounded">日本語</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
