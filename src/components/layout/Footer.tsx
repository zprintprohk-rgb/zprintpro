'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface FooterProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    company: '智印港 ZPrintPro',
    tagline: '專業印刷服務，品質保證',
    contact: '聯絡我們',
    address: '香港觀塘成業街16號怡生工業中心',
    phone: '2154 1318',
    email: 'info@zprintpro.com',
    quickLinks: '快速連結',
    links: {
      home: '首頁',
      products: '產品',
      about: '關於我們',
      contact: '聯絡我們',
      quote: '免費報價',
      faq: '常見問題',
    },
    services: '服務項目',
    serviceItems: ['貼紙印刷', '標籤印刷', '卡片印刷', '書刊印刷', '包裝印刷', '大型噴畫'],
    followUs: '關注我們',
    copyright: '© 2024 智印港 ZPrintPro. 保留所有權利。',
    sitemap: '網站地圖',
    privacy: '隱私政策',
    terms: '服務條款',
  },
  en: {
    company: 'ZPrintPro',
    tagline: 'Professional Printing Services, Quality Guaranteed',
    contact: 'Contact Us',
    address: '16 Shing Yip Street, Kwun Tong, Hong Kong',
    phone: '2154 1318',
    email: 'info@zprintpro.com',
    quickLinks: 'Quick Links',
    links: {
      home: 'Home',
      products: 'Products',
      about: 'About Us',
      contact: 'Contact',
      quote: 'Get Quote',
      faq: 'FAQ',
    },
    services: 'Services',
    serviceItems: ['Sticker Printing', 'Label Printing', 'Card Printing', 'Booklet Printing', 'Packaging', 'Large Format'],
    followUs: 'Follow Us',
    copyright: '© 2024 ZPrintPro. All rights reserved.',
    sitemap: 'Sitemap',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  ja: {
    company: 'ZPrintPro',
    tagline: 'プロフェッショナル印刷サービス、品質保証',
    contact: 'お問い合わせ',
    address: '香港観塘成業街16号怡生工業中心',
    phone: '2154 1318',
    email: 'info@zprintpro.com',
    quickLinks: 'クイックリンク',
    links: {
      home: 'ホーム',
      products: '製品',
      about: '会社概要',
      contact: 'お問い合わせ',
      quote: '見積もり',
      faq: 'よくある質問',
    },
    services: 'サービス',
    serviceItems: ['ステッカー印刷', 'ラベル印刷', 'カード印刷', '冊子印刷', '包装印刷', '大型印刷'],
    followUs: 'フォロー',
    copyright: '© 2024 ZPrintPro. All rights reserved.',
    sitemap: 'サイトマップ',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
  },
};

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <footer className="bg-[#333333] text-white">
      {/* Main Footer */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2873F5] to-[#F87314] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">智印港</span>
                <span className="text-xs text-gray-400">ZPrintPro</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{t.tagline}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{t.address}</span>
              </div>
              <a href="tel:21541318" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{t.phone}</span>
              </a>
              <a href="mailto:info@zprintpro.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{t.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {Object.entries(t.links).map(([key, label]) => (
                <li key={key}>
                  <Link 
                    href={`${localePrefix}/${key === 'home' ? '' : key}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.services}</h3>
            <ul className="space-y-2">
              {t.serviceItems.map((item, index) => (
                <li key={index}>
                  <span className="text-gray-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.followUs}</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            {/* Payment Methods */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-sm text-gray-400 mb-2">Accepted Payments</p>
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs">Visa</div>
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs">MC</div>
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs">Amex</div>
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs">Pay</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{t.copyright}</p>
            <div className="flex gap-6">
              <Link href={`${localePrefix}/sitemap`} className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.sitemap}
              </Link>
              <Link href={`${localePrefix}/privacy`} className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.privacy}
              </Link>
              <Link href={`${localePrefix}/terms`} className="text-gray-400 hover:text-white text-sm transition-colors">
                {t.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
