/**
 * 根布局组件
 * 包含全局样式、字体、SEO基础配置
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://zprintpro.com'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <html lang={locale === 'zh-hk' ? 'zh-HK' : locale}>
      <head>
        {/* Hreflang标签 */}
        <link rel="alternate" hrefLang="zh-HK" href="https://zprintpro.com/zh-hk/" />
        <link rel="alternate" hrefLang="en" href="https://zprintpro.com/en/" />
        <link rel="alternate" hrefLang="ja" href="https://zprintpro.com/ja/" />
        <link rel="alternate" hrefLang="x-default" href="https://zprintpro.com/" />
      </head>
      <body className={inter.className}>
        <Header locale={locale as 'zh-hk' | 'en' | 'ja'} />
        {children}
        <Footer locale={locale as 'zh-hk' | 'en' | 'ja'} />
      </body>
    </html>
  );
}
