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
import { generateHreflangTags } from '@/lib/hreflang';
import { generateWebsiteJsonLd } from '@/lib/seo';
import { getGaScript } from '@/lib/analytics';

export const runtime = "edge";

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://zprintpro.com'),
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
  const hreflangs = generateHreflangTags(safeLocale);

  return (
    <html lang={htmlLangMap[safeLocale] || locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.airwallex.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        {hreflangs.map((tag, i) => (
          <link key={i} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteJsonLd()),
          }}
        />
        {(() => {
          // Plausible 域名：优先 env var，否则硬编码 zprintpro.com
          // 硬编码 fallback 确保 CF Pages env 漏配时仍生效
          const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'zprintpro.com';
          return (
            <script
              async
              defer
              data-domain={plausibleDomain}
              src="https://plausible.io/js/script.js"
            />
          );
        })()}
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
              // 旧逻辑: navigator.serviceWorker.register('/sw.js')
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
