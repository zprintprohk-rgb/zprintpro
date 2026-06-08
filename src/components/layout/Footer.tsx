'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Globe,
  ShieldCheck,
  Palette,
  Headphones,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { Locale } from '@/lib/seo';
import { GeoFooterText } from '@/components/seo/GeoFooterText';
import { getWhatsAppLinkProps } from '@/lib/whatsapp';

interface FooterProps {
  locale: Locale;
}

interface PaymentBrand {
  name: string;
  abbr: string;
  /** hover 时显示的彩色 (作为内联 style 注入) */
  brandColor: string;
}

const PAYMENT_BRANDS: PaymentBrand[] = [
  { name: 'Visa', abbr: 'VISA', brandColor: '#1A1F71' },
  { name: 'Mastercard', abbr: 'MC', brandColor: '#EB001B' },
  { name: 'PayPal', abbr: 'PayPal', brandColor: '#003087' },
  { name: 'Alipay', abbr: '支付宝', brandColor: '#1677FF' },
  { name: 'WeChat Pay', abbr: '微信', brandColor: '#07C160' },
  { name: 'Airwallex', abbr: 'AWX', brandColor: '#612FFF' },
];

const translations: Record<Locale, {
  slogan: string;
  trustBar: { icon: 'globe' | 'shield' | 'palette' | 'headphones'; text: string }[];
  companyDesc: string;
  serviceArea: string;
  phone: string;
  email: string;
  address: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  followUs: string;
  copyright: string;
  serviceRegions: string;
  regionLine: string;
}> = {
  'zh-hk': {
    slogan: '30秒報價，72小時全球交付',
    trustBar: [
      { icon: 'globe', text: '72小時全球交付' },
      { icon: 'shield', text: 'Airwallex 安全支付' },
      { icon: 'palette', text: '免費設計支援' },
      { icon: 'headphones', text: '24/7 即時客服' },
    ],
    companyDesc: '智印云 ZprintPro 是全球智能印刷定制平台，提供AI智能報價、在線文件上傳、Airwallex安全支付。',
    serviceArea: '香港本地印刷服務',
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    address: '香港九龍觀塘偉業街182號 成運工業大廈',
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
    copyright: '© 2026 智印云 ZprintPro. 保留所有權利。',
    serviceRegions: '服務覆蓋',
    regionLine: '香港 🇭🇰 | 美國 🇺🇸 | 英國 🇬🇧 | 澳洲 🇦🇺 | 日本 🇯🇵',
  },
  en: {
    slogan: 'Quote in 30s · Global delivery in 72h',
    trustBar: [
      { icon: 'globe', text: '72h Global Delivery' },
      { icon: 'shield', text: 'Airwallex Secure Pay' },
      { icon: 'palette', text: 'Free Design Support' },
      { icon: 'headphones', text: '24/7 Live Support' },
    ],
    companyDesc: 'ZprintPro is a global smart printing platform — AI instant quotes, online file upload, and Airwallex secure payment.',
    serviceArea: 'Shipping & printing services for US, UK, and Australia',
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    address: '182 Wai Yip Street, Kwun Tong, Kowloon, Hong Kong',
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
    copyright: '© 2026 ZprintPro. All rights reserved.',
    serviceRegions: 'Service Coverage',
    regionLine: 'Hong Kong 🇭🇰 | USA 🇺🇸 | UK 🇬🇧 | Australia 🇦🇺 | Japan 🇯🇵',
  },
  ja: {
    slogan: '30秒で見積もり、72時間でグローバル配送',
    trustBar: [
      { icon: 'globe', text: '72時間グローバル配送' },
      { icon: 'shield', text: 'Airwallex 安全決済' },
      { icon: 'palette', text: '無料デザインサポート' },
      { icon: 'headphones', text: '24/7 ライブサポート' },
    ],
    companyDesc: 'ZprintProはグローバルスマート印刷プラットフォーム — AI即時見積もり、オンラインファイルアップロード、Airwallex安全決済。',
    serviceArea: '香港を含むアジア圏印刷サービス',
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    address: '香港九龍観塘偉業街182号 成運工業ビル',
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
    copyright: '© 2026 ZprintPro. All rights reserved.',
    serviceRegions: 'サービス範囲',
    regionLine: '香港 🇭🇰 | アメリカ 🇺🇸 | イギリス 🇬🇧 | オーストラリア 🇦🇺 | 日本 🇯🇵',
  },
};

const TrustIcon = ({ kind }: { kind: 'globe' | 'shield' | 'palette' | 'headphones' }) => {
  const cls = 'w-5 h-5 flex-shrink-0';
  switch (kind) {
    case 'globe':
      return <Globe className={cls} />;
    case 'shield':
      return <ShieldCheck className={cls} />;
    case 'palette':
      return <Palette className={cls} />;
    case 'headphones':
      return <Headphones className={cls} />;
  }
};

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* ===== 顶部信任栏 (bg-slate-900) — 升级为 pill 风格 trust badges (2026-06-09 P0 信任锚点包) ===== */}
      <div className="bg-slate-900 border-b border-white/5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
            {t.trustBar.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition-all duration-200"
              >
                <span className="text-cyan-400 flex-shrink-0">
                  <TrustIcon kind={item.icon} />
                </span>
                <span className="font-medium whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Main Footer ===== */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand 区 (2/6) — 取代长段落文字 */}
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
            {/* 短 Slogan (取代长段落) */}
            <p className="text-white text-base font-semibold mb-2 leading-snug">
              {t.slogan}
            </p>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">{t.companyDesc}</p>

            {/* 支付方式图标组 (灰度 → hover 变彩色) */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2.5">
                {locale === 'zh-hk' ? '支付方式' : locale === 'ja' ? 'お支払い方法' : 'Payment Methods'}
              </p>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_BRANDS.map((b) => (
                  <span
                    key={b.name}
                    title={b.name}
                    className="group/pay inline-flex items-center justify-center min-w-[44px] h-8 px-2 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
                  >
                    {/* 文字内容 + 真实品牌色: 静态类 (white) → hover 变回品牌色 (style 注入避免 JIT 扫不到) */}
                    <span style={{ color: b.brandColor }} className="opacity-60 group-hover/pay:opacity-100 transition-opacity">
                      {b.abbr}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 列链接 */}
          {t.columns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className="font-bold text-base mb-4 text-white">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => {
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

        {/* ===== 联系方式 (精简) + 全球服务范围 (国旗) ===== */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          {/* 联系方式 — 图标 + 文字 */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a
              href={`https://wa.me/8618126380255`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-medium">{t.phone}</span>
            </a>
            <a
              href={`mailto:${t.email}`}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>{t.email}</span>
            </a>
            <span className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{t.address}</span>
            </span>
          </div>

          {/* 全球服务范围 (国旗 emoji 矩阵) */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              {t.serviceRegions}:
            </span>
            <span className="text-gray-300 font-medium tracking-wide">{t.regionLine}</span>
          </div>
        </div>

        {/* ===== 社交 + 版权 ===== */}
        <div className="mt-6 pt-6 border-t border-white/10">
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
      </div>
    </footer>
  );
}
