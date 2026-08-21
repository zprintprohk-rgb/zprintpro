/**
 * Quote Requests 度量层 (V3.6 战略 8/20 拍板, K3 ranking→CTR→conversion 闭环)
 *
 * 用途:
 *   - 跨页跨渠道统一记录"询盘"事件 (quote form 提交 / WhatsApp click / PDP CTA)
 *   - 跨 session 关联 (ga4_client_id 拉通全链路)
 *   - 状态机跟单 (new → contacted → quoted → closed_won/lost)
 *
 * 设计原则 (跟 whatsapp-inquiry.ts 一致):
 *   - fire-and-forget (不 await, 不阻塞用户跳转)
 *   - 失败 fallback (不阻塞主流程)
 *   - 浏览器/SSR 双兼容
 *
 * 双写架构 (V3.6):
 *   - QuoteForm submit → 写 `quotes` 业务表 (001) + 写 `quote_requests` 度量表 (008)
 *   - WhatsApp click → 写 `whatsapp_inquiries` 业务表 (002) + 写 `quote_requests` 度量表 (008)
 *   - PDP CTA / footer → 写 `quote_requests` 度量表 (008) 单写
 *
 * 配套:
 *   - supabase/migrations/008_create_quote_requests.sql
 *   - src/components/quote/QuoteForm.tsx (双写)
 *   - src/lib/whatsapp.ts getWhatsAppLinkProps onClick (双写)
 */

import { supabase } from './supabase';
import type { WhatsAppContext } from './whatsapp';

export type QuoteSource =
  | 'quote-form'        // /quote/ 表单提交
  | 'whatsapp-cta'      // getWhatsAppLinkProps 触发 (footer / sticky / hero / PDP / etc.)
  | 'pdp-cta'           // PDP 价格/CTA 按钮 (非表单)
  | 'header-phone'      // header 电话点击
  | 'footer-whatsapp'   // footer WhatsApp 链接
  | 'sticky-cta'        // 浮动 sticky CTA
  | 'other';

/** ga4_client_id 解析 (从 _ga cookie) */
function getGa4ClientId(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const ga = cookies.find((c) => c.startsWith('_ga='))?.split('=')[1];
  if (!ga) return null;
  // _ga=GA1.2.1234567890.1234567890 → 取最后 2 段拼接
  const parts = ga.split('.');
  if (parts.length >= 4) {
    return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
  }
  return ga;
}

/** sessionStorage UUID (浏览器级) */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  try {
    let sid = window.sessionStorage.getItem('zp_quote_session_id');
    if (!sid) {
      sid = `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      window.sessionStorage.setItem('zp_quote_session_id', sid);
    }
    return sid;
  } catch {
    return 'unknown';
  }
}

/** UTM 参数解析 (从 URL) */
function parseUtmParams(url: string): { source: string | null; medium: string | null; campaign: string | null } {
  try {
    const u = new URL(url);
    return {
      source: u.searchParams.get('utm_source'),
      medium: u.searchParams.get('utm_medium'),
      campaign: u.searchParams.get('utm_campaign'),
    };
  } catch {
    return { source: null, medium: null, campaign: null };
  }
}

/** 设备类型解析 (UA) */
function getDeviceType(ua: string): string {
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'mobile';
  return 'desktop';
}

export interface QuoteTrackingInput {
  source: QuoteSource;
  locale: string;
  /** 触发询盘的页面 URL (默认 window.location.href) */
  pageUrl?: string;
  /** 来源链接 referrer (默认 document.referrer) */
  referrer?: string;
  /** 业务上下文 (从 QuoteForm / WhatsApp 传入) */
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  productSlug?: string;
  productName?: string;
  category?: string;
  quantity?: string;
  size?: string;
  message?: string;
}

/**
 * 记录询盘到 quote_requests 度量表 (fire-and-forget)
 *
 * @example
 *   onClick={() => {
 *     trackQuoteRequest({ source: 'whatsapp-cta', locale: 'zh-hk', productSlug: 'stickers' });
 *     // 立即跳转, 不等 Supabase 响应
 *   }}
 */
export async function trackQuoteRequest(input: QuoteTrackingInput): Promise<void> {
  try {
    // SSR 守卫
    if (typeof window === 'undefined') return;

    // Supabase 客户端未初始化 (无 env, Mavis/K3 还没粘贴 key)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (process.env.NODE_ENV === 'development') {
        console.debug('[quote-tracking] skipped: Supabase not configured');
      }
      return;
    }

    const pageUrl = input.pageUrl || window.location.href;
    const referrer = input.referrer || document.referrer || null;
    const ua = navigator.userAgent;
    const ga4 = getGa4ClientId();
    const sessionId = getOrCreateSessionId();
    const utm = parseUtmParams(pageUrl);

    const { error } = await supabase.from('quote_requests').insert({
      source: input.source,
      locale: input.locale,
      landing_page: pageUrl,
      referrer: referrer,
      utm_source: utm.source,
      utm_medium: utm.medium,
      utm_campaign: utm.campaign,
      ga4_client_id: ga4,
      session_id: sessionId,
      last_touch_at: new Date().toISOString(),
      customer_name: input.customerName || null,
      customer_email: input.customerEmail || null,
      customer_phone: input.customerPhone || null,
      product_slug: input.productSlug || null,
      product_name: input.productName || null,
      category: input.category || null,
      quantity: input.quantity || null,
      size: input.size || null,
      message: input.message || null,
      user_agent: ua,
      device_type: getDeviceType(ua),
      page_url: pageUrl,
    });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[quote-tracking] insert failed:', error.message);
      }
    }
  } catch (err) {
    // 静默失败 —— 不阻塞主流程
    if (process.env.NODE_ENV === 'development') {
      console.warn('[quote-tracking] exception:', err);
    }
  }
}

/**
 * WhatsApp 上下文 → QuoteTrackingInput 转换 (per V3.6 双写)
 *
 * @example
 *   trackQuoteRequestFromWhatsApp('whatsapp-cta', 'zh-hk', { source: 'footer', productName: '貼紙' });
 */
export function trackQuoteRequestFromWhatsApp(
  source: QuoteSource,
  locale: string,
  ctx: WhatsAppContext
): void {
  trackQuoteRequest({
    source,
    locale,
    productName: ctx.productName,
    size: ctx.size,
    quantity: ctx.quantity ? String(ctx.quantity) : undefined,
    pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
  }).catch(() => {
    // fire-and-forget, 静默失败
  });
}
