'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Locale } from '@/lib/seo';
import { GeoFooterText } from '@/components/seo/GeoFooterText';
import { generateWhatsAppLink, getWhatsAppLinkProps } from '@/lib/whatsapp';

function getLocalizedHref(href: string, locale: Locale): string {
  if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('javascript')) {
    return href;
  }
  const prefix = '/' + locale;
  return prefix + href;
}

interface FooterProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    companyDesc: '智印雲 ZprintPro 是全球智能印刷定制平台，提供AI智能報價、在線文件上傳、安全結算。支援銀行電匯、微信、支付寶、PayPal。從貼紙到包裝，30秒報價，72小時全球交付。',
    serviceArea: '全球跨境印刷服務',
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    address: '廣東省深圳市龍崗區平湖街道嘉城路1號（518111）',
    legalLabel: '經營者資訊披露',
    privacyLabel: '隱私政策',
    termsLabel: '使用條款',
    columns: [
      {
        title: '關於我們',
        links: [
          { label: '關於我們', href: '/about/' },
          { label: '品牌故事', href: '/blog/company-intro/' },
          { label: '客戶案例', href: '/case-studies/' },
          { label: '印刷知識', href: '/blog/' },
          { label: '人才招聘', href: '/contact/' },
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
          { label: '落單須知', href: '/help-center/#order' },
          { label: '付款方式', href: '/help-center/#payment' },
          { label: '送貨安排', href: '/help-center/#shipping' },
          { label: '退換政策', href: '/help-center/#returns' },
        ],
      },
      {
        title: '客戶服務',
        links: [
          { label: '聯絡方式', href: '/contact/' },
          { label: 'WhatsApp查詢', href: 'https://wa.me/8618126380255' },
          { label: '常見問題', href: '/faq/' },
          { label: '追蹤訂單', href: '/contact/' },
        ],
      },
    ],
    followUs: '關注我們',
    friendLinks: '友情連結',
    copyright: '© 2026 智印雲 ZprintPro. 保留所有權利。',
  },
  en: {
    companyDesc: 'ZprintPro is a global smart printing platform offering AI instant quotes, online file upload, and secure settlement via bank wire, WeChat Pay, Alipay, and PayPal. From stickers to packaging, get a quote in 30 seconds, delivered globally in 72 hours.',
    serviceArea: 'Global cross-border printing services',
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    address: 'No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111, China',
    legalLabel: 'Legal Disclosure',
    privacyLabel: 'Privacy Policy',
    termsLabel: 'Terms of Service',
    columns: [
      {
        title: 'About Us',
        links: [
          { label: 'About Us', href: '/about/' },
          { label: 'Brand Story', href: '/blog/company-intro/' },
          { label: 'Case Studies', href: '/case-studies/' },
          { label: 'Printing Knowledge', href: '/blog/' },
          { label: 'Careers', href: '/contact/' },
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
          { label: 'How to Order', href: '/help-center/#order' },
          { label: 'Payment Methods', href: '/help-center/#payment' },
          { label: 'Shipping', href: '/help-center/#shipping' },
          { label: 'Return Policy', href: '/help-center/#returns' },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          { label: 'Contact Us', href: '/contact/' },
          { label: 'WhatsApp', href: 'https://wa.me/8618126380255' },
          { label: 'FAQ', href: '/faq/' },
          { label: 'Track Order', href: '/contact/' },
        ],
      },
    ],
    followUs: 'Follow Us',
    friendLinks: 'Friendly Links',
    copyright: '© 2026 ZprintPro. All rights reserved.',
  },
  ja: {
    companyDesc: 'ZprintProはグローバルスマート印刷プラットフォームです。AI即時見積、オンラインファイルアップロード、銀行振込・微信支付・支付宝・PayPal決済を提供。ステッカーからパッケージングまで、30秒で見積もり、72時間でグローバル配送。',
    serviceArea: 'グローバル越境印刷サービス',
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    address: '広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）',
    legalLabel: '特定商取引法に基づく表記',
    privacyLabel: 'プライバシーポリシー',
    termsLabel: '利用規約',
    columns: [
      {
        title: '会社概要',
        links: [
          { label: '会社概要', href: '/about/' },
          { label: 'ブランドストーリー', href: '/blog/company-intro/' },
          { label: '導入事例', href: '/case-studies/' },
          { label: '印刷知識', href: '/blog/' },
          { label: '採用情報', href: '/contact/' },
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
          { label: '注文方法', href: '/help-center/#order' },
          { label: '支払い方法', href: '/help-center/#payment' },
          { label: '配送', href: '/help-center/#shipping' },
          { label: '返品ポリシー', href: '/help-center/#returns' },
        ],
      },
      {
        title: 'カスタマーサービス',
        links: [
          { label: 'お問い合わせ', href: '/contact/' },
          { label: 'WhatsApp', href: 'https://wa.me/8618126380255' },
          { label: 'よくある質問', href: '/faq/' },
          { label: '注文追跡', href: '/contact/' },
        ],
      },
    ],
    followUs: 'フォロー',
    friendLinks: '友好リンク',
    copyright: '© 2026 ZprintPro. All rights reserved.',
  },
};

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main Footer */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/logo-dark.svg"
                alt="ZprintPro"
                width={240}
                height={53}
                className="h-11 w-auto"
                loading="lazy"
                decoding="async"
              />
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
              {/* 2026-06-14 Phase B P0-6: JA 市场专属客服入口（LINE / +81 电话 / JA 邮箱）
                  - 仅 locale === 'ja' 时渲染
                  - 所有值从 env 读，未配置则不显示对应入口
                  - env 配置由用户（owner）上线前填入真实值 */}
              {locale === 'ja' && (process.env.NEXT_PUBLIC_LINE_URL || process.env.NEXT_PUBLIC_JA_PHONE || process.env.NEXT_PUBLIC_JA_EMAIL) && (
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2" data-ja-contact-block>
                  <div className="flex items-center gap-2 text-gray-300 text-xs font-semibold uppercase tracking-wider">
                    <span>日本市場サポート</span>
                  </div>
                  {process.env.NEXT_PUBLIC_LINE_URL && (
                    <a
                      href={process.env.NEXT_PUBLIC_LINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-[#06C755] transition-colors"
                      aria-label="LINE 公式アカウント"
                    >
                      {/* LINE official green logo SVG (small) */}
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#06C755" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 5.926 2 10.748c0 4.341 3.577 7.945 8.32 8.6.323.07.764.214.876.493.1.252.066.65.032.906l-.143.86c-.044.252-.198.984.862.535 1.06-.448 5.717-3.366 7.798-5.764C20.78 14.43 22 12.694 22 10.748 22 5.926 17.523 2 12 2zm-3.6 9.6a.9.9 0 110-1.8.9.9 0 010 1.8zm5.4 0a.9.9 0 110-1.8.9.9 0 010 1.8z" />
                      </svg>
                      <span className="text-sm">LINE 公式アカウント</span>
                    </a>
                  )}
                  {process.env.NEXT_PUBLIC_JA_PHONE && (
                    <a
                      href={`tel:${process.env.NEXT_PUBLIC_JA_PHONE.replace(/\D/g, '')}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      aria-label="日本電話"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{process.env.NEXT_PUBLIC_JA_PHONE}</span>
                    </a>
                  )}
                  {process.env.NEXT_PUBLIC_JA_EMAIL && (
                    <a
                      href={`mailto:${process.env.NEXT_PUBLIC_JA_EMAIL}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      aria-label="日本メール"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{process.env.NEXT_PUBLIC_JA_EMAIL}</span>
                    </a>
                  )}
                </div>
              )}
              {/* Service Area - Only show for English version */}
              {locale === 'en' && t.serviceArea && (
                <div className="flex items-center gap-2 text-gray-400 mt-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{t.serviceArea}</span>
                </div>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {t.columns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => {
                  // WhatsApp 链接：使用统一生成器（带 source=footer 上下文 + onClick 追踪）
                  const isWa = link.href.startsWith('https://wa.me/');
                  if (isWa) {
                    const waProps = getWhatsAppLinkProps(locale, { source: 'footer' });
                    return (
                      <li key={linkIndex}>
                        <a
                          href={waProps.href}
                          target={waProps.target}
                          rel={waProps.rel}
                          onClick={waProps.onClick}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }
                  const href = link.href.startsWith('http') ? link.href : `${localePrefix}${link.href}`;
                  return (
                    <li key={linkIndex}>
                      <Link
                        href={href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* GEO 锚定文本 — 供 AI 搜索引擎抓取 */}
        <GeoFooterText locale={locale} />

        {/* Social & Bottom */}
        <div className="mt-2 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">{t.followUs}</span>
              <div className="flex gap-3">
                <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed" title="Coming soon">
                  <Facebook className="w-4 h-4" />
                </span>
                <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed" title="Coming soon">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed" title="Coming soon">
                  <Linkedin className="w-4 h-4" />
                </span>
                <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed" title="Coming soon">
                  <Youtube className="w-4 h-4" />
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{t.copyright}</p>
          </div>
        </div>

        {/* 2026-06-18 Phase 0: Legal disclosure / privacy / terms links */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
            <Link
              href={`${localePrefix}/legal/`}
              className="hover:text-white transition-colors"
            >
              {t.legalLabel}
            </Link>
            <Link
              href={`${localePrefix}/privacy/`}
              className="hover:text-white transition-colors"
            >
              {t.privacyLabel}
            </Link>
            <Link
              href={`${localePrefix}/terms/`}
              className="hover:text-white transition-colors"
            >
              {t.termsLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}