/**
 * 18 个关键事件追踪 + Vercel Edge Config A/B 分组
 * GA4 + 降级到 console.log（开发环境调试）
 *
 * 事件清单（与 P0-P3 文档一致）：
 *   quote_start, quote_step_1, quote_step_2, quote_step_3, quote_submit
 *   whatsapp_click, whatsapp_context_click
 *   product_view
 *   file_upload, file_preflight_pass, file_preflight_fail, file_preflight_warning
 *   calculator_interaction
 *   delivery_timeline_view
 *   compare_table_view
 *   faq_expand
 *   contact_form_submit
 *   rush_order_click
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function isAnalyticsEnabled(): boolean {
  return (
    typeof window !== 'undefined' &&
    ((!!GA_ID && typeof window.gtag === 'function') ||
      (!!PLAUSIBLE_DOMAIN && typeof window.plausible === 'function'))
  );
}

export function trackPageView(path: string) {
  if (!isAnalyticsEnabled()) return;
  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('config', GA_ID!, { page_path: path });
  }
  // Plausible 自动追踪 pageview（script.js 默认开启），无需手动调用
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (!isAnalyticsEnabled()) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug(`[track] ${action}`, params);
    }
    return;
  }
  // 优先 Plausible（更轻量）
  if (PLAUSIBLE_DOMAIN && typeof window.plausible === 'function') {
    window.plausible(action, { props: params });
    return;
  }
  // 降级到 GA4
  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

// ============ 18 个事件便捷函数 ============

export const trackQuoteStart = (source?: string) =>
  trackEvent('quote_start', { source: source || 'unknown' });

export const trackQuoteStep1 = () => trackEvent('quote_step_1');
export const trackQuoteStep2 = () => trackEvent('quote_step_2');
export const trackQuoteStep3 = () => trackEvent('quote_step_3');

export const trackQuoteStep = (step: 1 | 2 | 3) =>
  trackEvent(`quote_step_${step}`);

export const trackQuoteSubmit = (params?: Record<string, string | number>) =>
  trackEvent('quote_submit', params);

export const trackWhatsappClick = (context: { source?: string; hasContext?: boolean; productName?: string }) =>
  trackEvent(context.hasContext ? 'whatsapp_context_click' : 'whatsapp_click', {
    source: context.source || 'unknown',
    product_name: context.productName || '',
  });

export const trackProductView = (productSlug: string, productName: string) =>
  trackEvent('product_view', { product_slug: productSlug, product_name: productName });

export const trackFileUpload = (fileType: string, fileSizeKB: number) =>
  trackEvent('file_upload', { file_type: fileType, file_size_kb: fileSizeKB });

export const trackPreflight = (status: 'pass' | 'warning' | 'fail', fileName: string) =>
  trackEvent(`file_preflight_${status}`, { file_name: fileName });

export const trackCalculatorInteraction = (field: 'size' | 'material' | 'quantity' | 'finishing', value: string) =>
  trackEvent('calculator_interaction', { field, value });

export const trackDeliveryTimelineView = (mode: 'standard' | 'express') =>
  trackEvent('delivery_timeline_view', { mode });

export const trackCompareTableView = (materialCount: number) =>
  trackEvent('compare_table_view', { material_count: materialCount });

export const trackFaqExpand = (faqId: string) =>
  trackEvent('faq_expand', { faq_id: faqId });

export const trackContactFormSubmit = (hasFile: boolean) =>
  trackEvent('contact_form_submit', { has_file: hasFile });

export const trackRushOrderClick = (category: string) =>
  trackEvent('rush_order_click', { category });

// ============ A/B Test (Vercel Edge Config 方案) ============

/**
 * 从 cookie 读取分组；不存在则随机分组并写回
 * 用于 Hero 标题、CTA 文案等 A/B 测试
 * 配合 Vercel Edge Config 可以在边缘函数里读取动态配置
 */
export type AbVariant = 'A' | 'B';

const AB_COOKIE = 'zp_ab_bucket';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 天

export function getAbVariant(): AbVariant {
  if (typeof document === 'undefined') return 'A';
  // 已有分组
  const existing = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${AB_COOKIE}=`))
    ?.split('=')[1];
  if (existing === 'A' || existing === 'B') return existing;
  // 50/50 随机
  const variant: AbVariant = Math.random() < 0.5 ? 'A' : 'B';
  document.cookie = `${AB_COOKIE}=${variant}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  // 追踪
  trackEvent('ab_assigned', { variant });
  return variant;
}

/**
 * Hero H1 A/B 测试（v2 融合方案 P3）
 * - A: "香港本地印刷" 
 * - B: "跨境印刷服務 (深圳自有工廠)"
 */
export const HERO_H1_VARIANTS: Record<AbVariant, { 'zh-hk': string; en: string; ja: string }> = {
  A: {
    'zh-hk': '香港本地印刷 · 即日交貨',
    en: 'Custom Printing Delivered · Same-Day Rush Available',
    ja: '国内印刷 · 最短3日納品 · エコ素材対応',
  },
  B: {
    'zh-hk': '跨境印刷服務 · 香港 48 小時派送',
    en: 'Shenzhen Factory Direct · HK MTR Pickup',
    ja: '深圳自社工場印刷 · 香港 MTR 受取可',
  },
};

/**
 * CTA 按钮 A/B
 * - A: "免費獲取報價"
 * - B: "30秒獲取報價"
 */
export const CTA_VARIANTS: Record<AbVariant, { 'zh-hk': string; en: string; ja: string }> = {
  A: {
    'zh-hk': '免費獲取報價',
    en: 'Get Free Quote',
    ja: '無料見積もり',
  },
  B: {
    'zh-hk': '30秒獲取報價',
    en: '30-Second Quote',
    ja: '30秒で見積もり',
  },
};

export function getGaScript(): string {
  if (!GA_ID) return '';
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { send_page_view: true });
  `;
}

// ============ A/B Test 配置（静态 fallback）============
// 部署在 Cloudflare Pages，cookie 分组由 middleware 写入
// 改文案 → 改 HERO_H1_VARIANTS / CTA_VARIANTS → git push
// 如需后台改文案不部署：后续可接 Cloudflare Workers KV（不在当前范围）
