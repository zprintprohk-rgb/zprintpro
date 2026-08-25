'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ChevronDown } from 'lucide-react';
import { Locale, getWebLogoUrl, getWebLogoAlt } from '@/lib/seo';
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
    companyDesc: '智印港 ZprintPro 是全球智能印刷訂製平台，提供AI智能報價、在線文件上傳、安全結算。支援銀行電匯、微信、支付寶、PayPal。從貼紙到包裝，30秒報價，72小時全球交付。',
    serviceArea: '全球跨境印刷服務',
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    // 2026-07-08: zh-hk 显示 HK 虚拟办公地址（合规: 跨境展示不暴露深圳实体地址）
    address: '香港九龍新蒲崗大有街3號萬廣大廈15樓C室',
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
          { label: '傳單印刷', href: '/category/flyers/' },
          { label: '貼紙印刷', href: '/category/stickers/' },
          { label: '包裝盒印刷', href: '/category/packaging/' },
          { label: '海報印刷', href: '/category/posters/' },
          { label: '校園印刷', href: '/category/educational/' },
        ],
      },
      {
        title: '幫助中心',
        links: [
          { label: '落單須知', href: '/help-center/#order' },
          { label: '付款方式', href: '/payment-methods/' },
          { label: '送貨安排', href: '/help-center/#shipping' },
          { label: '退換政策', href: '/help-center/#returns' },
          // 2026-07-08: 隱私政策 + 使用條款 从底部 strip 移到 幫助中心 (zh-hk 不需要「經營者資訊披露」按鍵)
          { label: '隱私政策', href: '/privacy/' },
          { label: '使用條款', href: '/terms/' },
        ],
      },
      {
        title: '客戶服務',
        links: [
          { label: '聯絡方式', href: '/contact/' },
          { label: 'WhatsApp查詢', href: 'https://wa.me/8619880851334' },
          { label: '常見問題', href: '/faq/' },
          { label: '追蹤訂單', href: '/contact/' },
        ],
      },
    ],
    followUs: '關注我們',
    friendLinks: '友情連結',
    copyright: '© 2026 智印港 ZprintPro. 保留所有權利。',
    serviceHours: '週一至週六 09:00 - 18:00 (GMT+8)',
    whatsapp247: '24/7 WhatsApp 即時回覆',
    supportCN: '中國大陸 24h 響應 · 香港本地客服',
    supportEN: 'China mainland 24h · Hong Kong local support',
    supportJA: '中国本土 24時間対応 · 香港現地サポート',
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
          { label: 'Payment Methods', href: '/payment-methods/' },
          { label: 'Shipping', href: '/help-center/#shipping' },
          { label: 'Return Policy', href: '/help-center/#returns' },
          // 2026-07-08: Privacy + Terms moved here from bottom strip (en also doesn't need Legal Disclosure)
          { label: 'Privacy Policy', href: '/privacy/' },
          { label: 'Terms of Service', href: '/terms/' },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          { label: 'Contact Us', href: '/contact/' },
          { label: 'WhatsApp', href: 'https://wa.me/8619880851334' },
          { label: 'FAQ', href: '/faq/' },
          { label: 'Track Order', href: '/contact/' },
        ],
      },
    ],
    followUs: 'Follow Us',
    friendLinks: 'Friendly Links',
    copyright: '© 2026 ZprintPro. All rights reserved.',
    serviceHours: 'Mon - Sat 09:00 - 18:00 (GMT+8)',
    whatsapp247: '24/7 WhatsApp instant reply',
    supportCN: 'China mainland 24h · Hong Kong local support',
    supportEN: 'China mainland 24h · Hong Kong local support',
    supportJA: '中国本土 24時間対応 · 香港現地サポート',
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
          { label: '支払い方法', href: '/payment-methods/' },
          { label: '配送', href: '/help-center/#shipping' },
          { label: '返品ポリシー', href: '/help-center/#returns' },
          // 2026-07-08: プライバシーポリシー + 利用規約 もここに集約 (ja は 特定商取引法表記のみ底部保持)
          { label: 'プライバシーポリシー', href: '/privacy/' },
          { label: '利用規約', href: '/terms/' },
        ],
      },
      {
        title: 'カスタマーサービス',
        links: [
          { label: 'お問い合わせ', href: '/contact/' },
          { label: 'WhatsApp', href: 'https://wa.me/8619880851334' },
          { label: 'よくある質問', href: '/faq/' },
          { label: '注文追跡', href: '/contact/' },
        ],
      },
    ],
    followUs: 'フォロー',
    friendLinks: '友好リンク',
    copyright: '© 2026 ZprintPro. All rights reserved.',
    serviceHours: '月〜土 09:00 - 18:00 (GMT+8)',
    whatsapp247: '24時間 WhatsApp 即時対応',
    supportCN: '中国本土 24時間対応 · 香港現地サポート',
    supportEN: 'China mainland 24h · Hong Kong local support',
    supportJA: '中国本土 24時間対応 · 香港現地サポート',
  },
};

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];
  const localePrefix = `/${locale}`;

  // 2026-07-27: 抽出统一链接渲染（桌面 grid 与移动端手风琴共用）
  const renderFooterLink = (link: { label: string; href: string }, linkIndex: number) => {
    // WhatsApp 链接：使用统一生成器（带 source=footer 上下文 + onClick 追踪）
    const isWa = link.href.startsWith('https://wa.me/');
    if (isWa) {
      const waProps = getWhatsAppLinkProps(locale, { source: 'footer', productName: 'Site Footer WhatsApp CTA' });
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
  };

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main Footer */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 2026-07-27: 桌面端 grid 保持原样, lg 以下隐藏 (移动端走下方精简手风琴) */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              {/* 2026-07-21 v4 (K3 拍板): zh-hk 智印港品牌视觉 = 智印港中文新logo.png; en/ja = Zprintpro LOGO web.png */}
              <Image
                src={getWebLogoUrl(locale)}
                alt={getWebLogoAlt(locale)}
                width={240}
                height={240}
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
              <a href={`tel:${t.phone.replace(/\D/g, '')}`} data-cf-analytics="footer_phone_click" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{t.phone}</span>
              </a>
              <a href={`mailto:${t.email}`} data-cf-analytics="footer_email_click" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-semibold text-base">
                <Mail className="w-4 h-4" />
                <span className="text-base">{t.email}</span>
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

              {/* 2026-08-16 K3 拍板: 服務時間 + 24/7 WhatsApp + 中國大陸 24h 響應 (3 locale) */}
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2" data-footer-service-info>
                <div className="flex items-center gap-2 text-gray-300 text-xs">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span data-cf-analytics="footer_service_hours_view">{t.serviceHours}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  <span data-cf-analytics="footer_whatsapp_247_view">{t.whatsapp247}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span data-cf-analytics="footer_support_view">{(locale === 'zh-hk' ? t.supportCN : (locale === 'ja' ? t.supportJA : t.supportEN))}</span>
                </div>
              </div>

              {/* 2026-07-03 Cross-border remittance QR — Alipay Flash Collect
                  - 静态展示，不参与在线结算
                  - zh-hk 与 en 显示不同语言版本 */}
              <Link
                href={`${localePrefix}/payment-methods/`}
                className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3 hover:opacity-90 transition-opacity"
                aria-label="Cross-border remittance QR — Alipay Flash Collect"
              >
                <div className="relative w-14 h-14 bg-white rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
                  <img
                    src={locale === 'zh-hk' ? '/images/payment/shansu-collect-zh-hk.png' : '/images/payment/shansu-collect-en.png'}
                    alt="Alipay Flash Collect QR"
                    width={56}
                    height={56}
                    className="object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-300 font-semibold leading-tight">
                    {locale === 'zh-hk' && '支付寶閃速收款 · 跨境匯款'}
                    {locale === 'en' && 'Alipay Flash Collect · Cross-border'}
                    {locale === 'ja' && '支付宝フラッシュ送金 · クロスボーダー'}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {locale === 'zh-hk' && '9 大跨境匯款機構'}
                    {locale === 'en' && '9 cross-border remittance providers'}
                    {locale === 'ja' && '9 つのクロスボーダー送金機関'}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {t.columns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => renderFooterLink(link, linkIndex))}
              </ul>
            </div>
          ))}
        </div>

        {/* 2026-07-27 移动端精简页脚 (lg 以下):
            品牌一句话 + 聯絡我們/WhatsApp/報價 3 核心入口 + 產品中心 6 类目 2 列
            + 其余栏 (關於我們/幫助中心/客戶服務) 手风琴默认收起 — 信息不丢, 高度压缩至 ~1/3。
            文案全部复用 t.columns 已有翻译 key; 報價按钮文案与 Header translations 现有字符串逐字一致 */}
        <div className="lg:hidden">
          {/* 品牌 + NAP */}
          <div className="mb-3">
            {/* 2026-07-22 定稿 (user 拍板): web 横版按 locale 切 — zh-hk 智印港 / en+ja ZprintPro */}
            <Image
              src={getWebLogoUrl(locale)}
              alt={getWebLogoAlt(locale)}
              width={240}
              height={240}
              className="h-9 w-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">{t.companyDesc}</p>
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{t.address}</span>
            </div>
            <a href={`tel:${t.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-xs whitespace-nowrap">{t.phone}</span>
            </a>
          </div>

          {/* 3 核心入口 */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            <Link
              href={`${localePrefix}${t.columns[3].links[0].href}`}
              className="flex items-center justify-center rounded-lg bg-[#2873F5] text-white text-xs font-bold py-2.5 px-1 text-center"
            >
              {t.columns[3].links[0].label}
            </Link>
            <a
              {...getWhatsAppLinkProps(locale, { source: 'footer-mobile', productName: 'Mobile Footer WhatsApp CTA' })}
              className="flex items-center justify-center rounded-lg bg-[#25D366] text-white text-xs font-bold py-2.5 px-1 text-center"
            >
              WhatsApp
            </a>
            <Link
              href={`${localePrefix}/quote/`}
              className="flex items-center justify-center rounded-lg bg-[#F87314] text-white text-xs font-bold py-2.5 px-1 text-center"
            >
              {locale === 'zh-hk' ? '免費報價' : locale === 'en' ? 'Get Quote' : '見積もり'}
            </Link>
          </div>

          {/* 產品中心 — 6 类目紧凑 2 列, 常显 */}
          <div className="mb-4">
            <h3 className="font-bold text-sm mb-2 text-gray-200">{t.columns[1].title}</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {t.columns[1].links.map((link, linkIndex) => renderFooterLink(link, linkIndex))}
            </ul>
          </div>

          {/* 其余栏 — 手风琴, 默认收起 */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {[0, 2, 3].map((colIndex) => (
              <details key={colIndex} className="group">
                <summary className="flex items-center justify-between py-3 cursor-pointer list-none font-bold text-sm text-gray-200 [&::-webkit-details-marker]:hidden">
                  {t.columns[colIndex].title}
                  <ChevronDown className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-4 space-y-2.5">
                  {t.columns[colIndex].links.map((link, linkIndex) => renderFooterLink(link, linkIndex))}
                </ul>
              </details>
            ))}
          </div>
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

        {/* 2026-06-18 Phase 0: Legal disclosure / privacy / terms links
            2026-07-08: zh-hk + en 不再顯示「經營者資訊披露」按鍵 (跨境無實體, 無法律義務);
                         隱私政策 + 使用條款 已移到「幫助中心」欄;
                         ja 保留「特定商取引法に基づく表記」(日本特定商取引法要求)
        */}
        {locale === 'ja' && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <Link
                href={`${localePrefix}/legal/`}
                className="hover:text-white transition-colors"
              >
                {t.legalLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}