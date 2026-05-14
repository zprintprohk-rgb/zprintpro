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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
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
