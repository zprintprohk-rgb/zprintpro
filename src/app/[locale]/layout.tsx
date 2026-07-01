/**
 * 根布局组件
 * 包含全局样式、字体、SEO基础配置
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { CartProvider } from '@/lib/cart-context';
import { htmlLangMap } from '@/types/locale';
import { generateWebsiteJsonLd } from '@/lib/seo';
import { getGaScript } from '@/lib/analytics';

export const runtime = "edge";

// 2026-06-14 Phase B P0-4: 多语言字体集
// - Inter: EN 拉丁文
// - Noto Sans SC: 简体中文（zh-hk 用作中文 fallback，繁中也用 Noto Sans CJK，但 Noto Sans SC 在 next/font 也支持拉丁）
// - Noto Sans JP: 日文假名 + 漢字
// CSS 变量全局生效，body className 按 locale 选字体
// 2026-06-14 Phase B P1 bugfix 调查结论: 本地 next/font/google (next@14.1.0)
//   在 Noto_Sans_JP 和 Noto_Sans_SC 上只暴露 4 个 subset:
//     'cyrillic' | 'latin' | 'latin-ext' | 'vietnamese'
//   'japanese' / 'chinese-simplified' 子集名称不存在 (虽然 next/font 上游
//   TypeScript 类型有声明), 实际 Google Fonts CSS2 API 不返回, 会导致
//   `next/font` error: Unknown subset `japanese` for font `Noto Sans JP`.
//   P0-4 的 subsets: ['latin'] 是本地 next/font API 实际允许的最佳选择,
//   JA 假名/汉字与 SC 简中必须依赖系统 fallback。真正修复需迁移到
//   next/font/local 路径 (从 fonts.gstatic.com 下载 woff2 +
//   手动声明 unicode-range), 不在 P1 范围。
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const notoJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-jp',
  preload: true,
});
const notoSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sc',
  preload: false, // zh-hk 不在 preload 列表（减少首屏字节）
});

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
  description: 'Custom printing service online for US, UK, AU markets. Stickers, packaging, paper bags, business cards, posters, books. 72h global delivery from Shenzhen factory. AI instant quote in 30s.',
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
    description: 'Custom printing for US/UK/AU. Stickers, packaging, bags, books. AI instant quote, 72h global delivery from Shenzhen factory.',
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
  // 2026-06-14 Phase B P0-4: 按 locale 选字体 class
  const fontClass =
    safeLocale === 'ja'
      ? notoJP.className
      : safeLocale === 'zh-hk'
        ? notoSC.className
        : inter.className;
  // 把所有字体的 CSS variable 一起挂到 html，方便子类混排
  const fontVars = `${inter.variable} ${notoJP.variable} ${notoSC.variable}`;

  return (
    <html lang={htmlLangMap[safeLocale] || locale} data-locale={safeLocale} className={fontVars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        {/* 2026-06-17 Per-locale PWA manifest — 3 locale 分 manifest,Chrome 自动按 lang 匹配 */}
        <link rel="manifest" href={`/manifest.${safeLocale}.json`} />
        <link rel="manifest" href="/manifest.zh-hk.json" hrefLang="zh-HK" />
        <link rel="manifest" href="/manifest.en.json" hrefLang="en" />
        <link rel="manifest" href="/manifest.ja.json" hrefLang="ja" />
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
        {/* 2026-07-02 Bing Webmaster Tools 站驗證 — zsprintpro.com (msvalidate.01)
            保留，不要轻易移除 (即使驗證成功官方也不建議移除) */}
        <meta name="msvalidate.01" content="E8317AC5B9BB7C684DDA79DFD66C0AEE" />
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
      <body className={fontClass}>
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
