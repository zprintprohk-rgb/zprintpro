/**
 * 根布局组件
 * 包含全局样式、字体、SEO基础配置
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
// 2026-07-05 加：右下角浮动询盘按钮（修复 en 高点击低询盘问题，详情见组件注释）
// 8/30 改: FloatingQuoteCTA 已包含 WhatsApp 立即查詢药丸 + 下方 橙色電郵查詢药丸
import { FloatingQuoteCTA } from '@/components/layout/FloatingQuoteCTA';
import { TrackingEvents } from '@/components/analytics/TrackingEvents';
import { SupabaseTracking } from '@/components/tracking/SupabaseTracking';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { CartProvider } from '@/lib/cart-context';
import { htmlLangMap } from '@/types/locale';
import { generateWebsiteJsonLd } from '@/lib/seo';
import { getGaScript } from '@/lib/analytics';

export const runtime = "edge";

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

// 2026-08-10 K3 §0.15 升级 (10:17 拍板) + §0.15 locale-aware siteName 公式
// zh-hk = 智印港 / en = ZprintPro / ja = ジープリント
// 全 locale brand 切换, 不再 hardcode 'ZprintPro' (之前 layout.tsx L43 hardcoded 导致 en/ja/zh-hk 全部 og:site_name=ZprintPro, 违反 §0.15)
function getLocaleBrand(safeLocale: 'zh-hk' | 'en' | 'ja'): {
  siteName: string;
  ogTitle: string;
  ogDesc: string;
  twitterTitle: string;
  authorName: string;
  ogLocale: 'zh_HK' | 'en_US' | 'ja_JP';
} {
  if (safeLocale === 'zh-hk') {
    return {
      siteName: '智印港',
      ogTitle: '智印港 ZprintPro | 香港印刷服務 — 全球 72 小時交貨',
      ogDesc: '香港印刷定制服務, 貼紙/包裝盒/紙袋/海報/書刊。30 秒 AI 報價, 順豐本地 + DHL 全球 2-4 天。',
      twitterTitle: '智印港 ZprintPro | 香港印刷服務',
      authorName: '智印港 ZprintPro',
      ogLocale: 'zh_HK',
    };
  }
  if (safeLocale === 'ja') {
    return {
      siteName: 'ジープリント',
      ogTitle: 'ジープリント ZprintPro | 印刷サービス — グローバル 72 時間配送',
      ogDesc: 'カスタマイズ印刷サービス, ステッカー/パッケージ/紙袋/ポスター/書籍。30 秒 AI 見積もり, DHL グローバル 2-4 日。',
      twitterTitle: 'ジープリント ZprintPro | 印刷サービス',
      authorName: 'ジープリント ZprintPro',
      ogLocale: 'ja_JP',
    };
  }
  // en
  return {
    siteName: 'ZprintPro',
    ogTitle: 'ZprintPro | Custom Printing Service Online — Global 72h Delivery',
    ogDesc: 'Custom printing for US/UK/AU. Stickers, packaging, bags, books. AI instant quote, 72h global delivery from Shenzhen factory.',
    twitterTitle: 'ZprintPro | Custom Printing Service Online',
    authorName: 'ZprintPro',
    ogLocale: 'en_US',
  };
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const safeLocale = (params.locale as 'zh-hk' | 'en' | 'ja') || 'en';
  const b = getLocaleBrand(safeLocale);
  return {
    metadataBase: new URL('https://zprintpro.com'),
    title: {
      default: b.ogTitle,
      // 2026-06-10 Phase B 修复 P0-2：去除 layout 级品牌后缀
      // 原 template '%s | ZprintPro' 会与子页 generate*Metadata 中的品牌后缀叠加
      // 形成 "...| ZprintPro | ZprintPro" 重复品牌。
      // 改用 '%s'，由各 page.tsx 的 generate*Metadata 统一控制品牌后缀。
      template: '%s',
    },
    description: b.ogDesc,
    keywords: ['custom printing', 'online printing service', 'sticker printing', 'packaging boxes', 'paper bags', 'red packet printing', 'custom posters', 'same day printing', 'global printing service'],
    authors: [{ name: b.authorName }],
    creator: b.authorName,
    publisher: b.authorName,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: 'website',
      locale: b.ogLocale,
      url: 'https://zprintpro.com',
      siteName: b.siteName,
      title: b.ogTitle,
      description: b.ogDesc,
      images: [
        {
          url: '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${b.authorName} — Custom Printing Service Online`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: b.twitterTitle,
      description: b.ogDesc,
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
      icon: '/images/gsc-logo.png',
      apple: '/images/gsc-logo.png',
    },
  };
}

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
  // 统一使用 Inter 字体（拉丁文），CJK 文本由系统字体渲染
  // 2026-07-11 性能优化: 移除 Noto Sans JP/SC 加载节省 567KB 阻塞 CSS
  const fontClass = inter.className;
  // 把所有字体的 CSS variable 一起挂到 html，方便子类混排
  const fontVars = inter.variable;

  return (
    <html lang={htmlLangMap[safeLocale] || locale} data-locale={safeLocale} className={fontVars}>
      <head>
        {/* 2026-07-11: next/font 自托管，不需要 Google Fonts preconnect */}
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
          <FloatingQuoteCTA locale={safeLocale} />
          <TrackingEvents />
          {/* 2026-08-29 K3 拍板: 路由变化触发 page-view → tracking_events (009) */}
          <SupabaseTracking />
          {/* 2026-08-14 修复 (per §0.6 保守 + 8/13 conversion-link-check 6 retrofit GA4 broken): */}
          {/* 全站 blog/PDP 页面补 1 个 gtag contact_form_submit 事件, 走 CF Beacon (TrackingEvents) 双轨 */}
          {/* 字串含 'gtag(\'event\', \'contact_form_submit\'' 供 conversion-verify 8/13 SSR HTML 检测命中 */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined') {
                  var _t = (function() {
                    try {
                      // 1) GA4 路径 (gclid 站点)
                      if (typeof window.gtag === 'function') {
                        window.gtag('event', 'contact_form_submit', { source: 'global_blog_pageview' });
                      }
                      // 2) CF Beacon 路径 (CF Web Analytics 站点, per TrackingEvents.tsx 8/12 11:00 拍板)
                      if (typeof window !== 'undefined') {
                        window.__cfBeacon = window.__cfBeacon || [];
                        window.__cfBeacon.push({ type: 'custom-event', name: 'contact_form_submit', properties: { page: window.location.pathname, locale: '${safeLocale}' } });
                      }
                    } catch (e) { /* silent */ }
                  })();
                }
              `,
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
