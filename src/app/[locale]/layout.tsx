/**
 * 根布局组件
 * 包含全局样式、字体、SEO基础配置
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://zprintpro.com'),
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
      <body className={inter.className}>
        <Header locale={locale as 'zh-hk' | 'en' | 'ja'} />
        {children}
        <Footer locale={locale as 'zh-hk' | 'en' | 'ja'} />
      </body>
    </html>
  );
}
