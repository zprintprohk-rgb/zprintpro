/**
 * Google Analytics 4 追踪工具
 * 当 NEXT_PUBLIC_GA_ID 未设置时静默跳过
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function isAnalyticsEnabled(): boolean {
  return typeof window !== 'undefined' && !!GA_ID && typeof window.gtag === 'function';
}

export function trackPageView(path: string) {
  if (!isAnalyticsEnabled()) return;
  window.gtag('config', GA_ID, {
    page_path: path,
  });
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (!isAnalyticsEnabled()) return;
  window.gtag('event', action, params);
}

export function trackProductClick(productSlug: string, productName: string) {
  trackEvent('product_click', {
    product_slug: productSlug,
    product_name: productName,
  });
}

export function getGaScript(): string {
  if (!GA_ID) return '';
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { send_page_view: false });
  `;
}
