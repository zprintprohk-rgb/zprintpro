/**
 * 根布局组件
 * 包含全局样式、字体、SEO基础配置
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { CartProvider } from '@/lib/cart-context';
import { htmlLangMap } from '@/types/locale';
import { generateWebsiteJsonLd } from '@/lib/seo';
import { getGaScript } from '@/lib/analytics';

export const runtime = "edge";

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://zprintpro.com'),
  title: {
    default: 'ZprintPro | Custom Printing Service Online — Stickers, Packaging, Bags, Books',
    // 2026-06-10 Phase B 修复 P0-2：去除 layout 级品牌后缀
    // 原 template '%s | ZprintPro' 会与子页 generate*Metadata 中的品牌后缀叠加
    // 形成 "...| ZprintPro | ZprintPro" 重复品牌。
    // 改用 '%s'，由各 page.tsx 的 generate*Metadata 统一控制品牌后缀。
    template: '%s',
  },
  description: 'Custom printing service online for US, UK, AU markets. Stickers, packaging, paper bags, business cards, posters, books. 72h global delivery from Hong Kong factory. AI instant quote in 30s.',
  keywords: ['custom printing', 'online printing service', 'sticker printing', 'packaging boxes', 'paper bags', 'business cards', 'custom posters', 'same day printing', 'global printing service'],
  authors: [{ name: 'ZprintPro' }],
  creator: 'ZprintPro',
  publisher: 'ZprintPro',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zprintpro.com',
    siteName: 'ZprintPro',
    title: 'ZprintPro | Custom Printing Service Online — Global 72h Delivery',
    description: 'Custom printing for US/UK/AU. Stickers, packaging, bags, books. AI instant quote, 72h global delivery from Hong Kong factory.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'ZprintPro — Custom Printing Service Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZprintPro | Custom Printing Service Online',
    description: 'Custom printing for US/UK/AU. Stickers, packaging, bags, books. AI instant quote, 72h global delivery.',
    images: ['/images/og-default.jpg'],
    creator: '@zprintpro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'en-GB': '/en',
      'en-AU': '/en',
      'en-CA': '/en',
      'ja-JP': '/ja',
      'zh-HK': '/zh-hk',
      'x-default': '/',
    },
  },
  icons: {
    icon: '/images/logo-icon.svg',
    apple: '/images/logo-icon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2873F5',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const safeLocale = locale as 'zh-hk' | 'en' | 'ja';

  return (
    <html lang={htmlLangMap[safeLocale] || locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.airwallex.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        {/* 2026-06-10 Phase B 修复 P0-4：移除 layout 级 hreflang 重复渲染。
            Next.js 14+ 已通过 metadata.alternates.languages 自动输出 hreflang <link>，
            且各 page.tsx 的 generate*Metadata 已经传了正确的当前页 path（含 /product/${slug}/）。
            此处手渲染的 generateHreflangTags(safeLocale) 不带 path，
            会导致深层页（产品/分类）hreflang 全部指向 home URL，Google 区域信号紊乱。
            让所有 page 完全靠 metadata.alternates.languages 输出 hreflang。 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteJsonLd()),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: getGaScript(),
              }}
            />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 2026-06-07 改造：禁用 SW 缓存（高频迭代期缓存导致用户端看到旧 500 错误页）
              // 旧逻辑已删除（参考 commit 95fae4e）
              // 新逻辑: 访问时自动注销所有 SW + 清除所有 caches，下次刷新拿最新代码
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (var i = 0; i < registrations.length; i++) {
                    registrations[i].unregister();
                  }
                });
              }
              if ('caches' in window) {
                caches.keys().then(function(names) {
                  for (var i = 0; i < names.length; i++) {
                    caches.delete(names[i]);
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header locale={safeLocale} />
          <BreadcrumbNav locale={safeLocale} />
          {children}
          <Footer locale={safeLocale} />
        </CartProvider>
      </body>
    </html>
  );
}
