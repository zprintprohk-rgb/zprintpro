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
    companyDesc: '智印港 Z-PrintPro 是香港領先的線上印刷平台，提供高品質、低價格、快交貨的專業印刷服務。從紙袋到海報，滿足您的一切印刷需求。',
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    address: '香港觀塘成業街16號怡生工業中心',
    columns: [
      {
        title: '關於我們',
        links: [
          { label: '公司簡介', href: '/about/' },
          { label: '服務條款', href: '/terms/' },
          { label: '私隱政策', href: '/privacy/' },
          { label: '人才招聘', href: '/careers/' },
        ],
      },
      {
        title: '產品中心',
        links: [
          { label: '紙袋印刷', href: '/category/paper-bags/' },
          { label: '宣傳單張', href: '/category/flyers/' },
          { label: '貼紙印刷', href: '/category/stickers/' },
          { label: '包裝盒定制', href: '/category/packaging/' },
          { label: '海報定制', href: '/category/posters/' },
          { label: '校園印刷', href: '/category/educational/' },
        ],
      },
      {
        title: '幫助中心',
        links: [
          { label: '如何落單', href: '/faq/' },
          { label: '付款方式', href: '/faq/' },
          { label: '送貨安排', href: '/faq/' },
          { label: '退換政策', href: '/faq/' },
        ],
      },
      {
        title: '客戶服務',
        links: [
          { label: '聯絡方式', href: '/contact/' },
          { label: 'WhatsApp查詢', href: 'https://wa.me/8618126380255' },
          { label: '常見問題', href: '/faq/' },
          { label: '追蹤訂單', href: '/account/orders/' },
        ],
      },
    ],
    followUs: '關注我們',
    copyright: '© 2025 智印港 ZPrintPro. 保留所有權利。',
  },
  en: {
    companyDesc: 'ZPrintPro is Hong Kong\'s leading online printing platform, offering high-quality, low-cost, fast-delivery professional printing services. From paper bags to posters, we meet all your printing needs.',
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    address: '16 Shing Yip Street, Kwun Tong, Hong Kong',
    columns: [
      {
        title: 'About Us',
        links: [
          { label: 'Company Profile', href: '/about/' },
          { label: 'Terms of Service', href: '/terms/' },
          { label: 'Privacy Policy', href: '/privacy/' },
          { label: 'Careers', href: '/careers/' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Paper Bags', href: '/category/paper-bags/' },
          { label: 'Flyers', href: '/category/flyers/' },
          { label: 'Stickers', href: '/category/stickers/' },
          { label: 'Packaging', href: '/category/packaging/' },
          { label: 'Posters', href: '/category/posters/' },
          { label: 'Educational', href: '/category/educational/' },
        ],
      },
      {
        title: 'Help Center',
        links: [
          { label: 'How to Order', href: '/faq/' },
          { label: 'Payment Methods', href: '/faq/' },
          { label: 'Shipping', href: '/faq/' },
          { label: 'Return Policy', href: '/faq/' },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          { label: 'Contact Us', href: '/contact/' },
          { label: 'WhatsApp', href: 'https://wa.me/8618126380255' },
          { label: 'FAQ', href: '/faq/' },
          { label: 'Track Order', href: '/account/orders/' },
        ],
      },
    ],
    followUs: 'Follow Us',
    copyright: '© 2025 ZPrintPro. All rights reserved.',
  },
  ja: {
    companyDesc: 'ZPrintProは香港を代表するオンライン印刷プラットフォームで、高品質・低価格・迅速納品のプロフェッショナル印刷サービスを提供しています。紙袋からポスターまで、あらゆる印刷ニーズにお応えします。',
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    address: '香港観塘成業街16号怡生工業中心',
    columns: [
      {
        title: '会社概要',
        links: [
          { label: '会社紹介', href: '/about/' },
          { label: '利用規約', href: '/terms/' },
          { label: 'プライバシーポリシー', href: '/privacy/' },
          { label: '採用情報', href: '/careers/' },
        ],
      },
      {
        title: '製品',
        links: [
          { label: '紙袋印刷', href: '/category/paper-bags/' },
          { label: 'チラシ印刷', href: '/category/flyers/' },
          { label: 'ステッカー印刷', href: '/category/stickers/' },
          { label: 'パッケージ印刷', href: '/category/packaging/' },
          { label: 'ポスター印刷', href: '/category/posters/' },
          { label: '教育印刷', href: '/category/educational/' },
        ],
      },
      {
        title: 'ヘルプセンター',
        links: [
          { label: '注文方法', href: '/faq/' },
          { label: '支払い方法', href: '/faq/' },
          { label: '配送', href: '/faq/' },
          { label: '返品ポリシー', href: '/faq/' },
        ],
      },
      {
        title: 'カスタマーサービス',
        links: [
          { label: 'お問い合わせ', href: '/contact/' },
          { label: 'WhatsApp', href: 'https://wa.me/8618126380255' },
          { label: 'よくある質問', href: '/faq/' },
          { label: '注文追跡', href: '/account/orders/' },
        ],
      },
    ],
    followUs: 'フォロー',
    copyright: '© 2025 ZPrintPro. All rights reserved.',
  },
};

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main Footer */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2873F5] to-[#F87314] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">智印港</span>
                <span className="text-xs text-gray-400">ZprintPro.com</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t.companyDesc}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{t.address}</span>
              </div>
              <a href={`tel:${t.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{t.phone}</span>
              </a>
              <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{t.email}</span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {t.columns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href.startsWith('http') ? link.href : `${localePrefix}${link.href}`}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">{t.followUs}</span>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2873F5] transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{t.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
