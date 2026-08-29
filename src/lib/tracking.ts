/**
 * 统一事件追踪 API (K3 8/29 拍板 B 方案)
 *
 * 用途:
 *   - 9 个事件 → tracking_events 表 (009)
 *   - 跟 008 quote_requests 协同: 008 是业务跟单 (PII + 状态机),
 *     009 是观察 + 转化漏斗 (0 PII, 高容量, 可定期清表)
 *
 * 设计原则:
 *   - sendBeacon (主) + fetch keepalive (兜底) = 页面跳转不丢事件
 *   - 0 PII: no customer_name/email/phone/message, 只记 event_type + 上下文
 *   - fire-and-forget: 不 await, 失败 console.warn, 不阻塞用户操作
 *   - 浏览器/SSR 双兼容
 *
 * 9 事件清单:
 *   page-view / cta-click / category-view / product-view
 *   quote-submit / quote-submit-success / quote-submit-error
 *   whatsapp-click / phone-click
 *
 * 配套:
 *   - supabase/migrations/009_create_tracking_events.sql
 *   - src/app/[locale]/layout.tsx (page-view)
 *   - src/app/[locale]/category/[slug]/page.tsx (category-view)
 *   - src/app/[locale]/product/[slug]/page.tsx (product-view)
 *   - src/components/quote/QuoteForm.tsx (quote-submit 3 态)
 *   - src/lib/whatsapp.ts getWhatsAppLinkProps (whatsapp-click)
 *   - src/components/layout/Header.tsx (phone-click)
 *   - src/components/layout/Footer.tsx (phone-click / cta-click)
 *   - src/components/home/HeroBanner.tsx (cta-click)
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ============ 类型定义 ============

export type TrackingEventType =
  | 'page-view'
  | 'cta-click'
  | 'category-view'
  | 'product-view'
  | 'quote-submit'
  | 'quote-submit-success'
  | 'quote-submit-error'
  | 'whatsapp-click'
  | 'phone-click';

export interface TrackingEvent {
  event: TrackingEventType;
  /** 产品 slug (PDP 触发时填) */
  productSlug?: string;
  /** 产品名 (PDP 触发时填) */
  productName?: string;
  /** 主营品类 (category 页触发时填) */
  category?: string;
  /** 自由标注 (CTA 文本 / 错误类型 / 报价 ref 等, 不含 PII) */
  label?: string;
}

// ============ Auto-fill helpers ============

/** sessionStorage UUID (浏览器级, 跨 SPA 路由保持) */
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  try {
    let sid = window.sessionStorage.getItem('zp_track_sid');
    if (!sid) {
      sid = `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      window.sessionStorage.setItem('zp_track_sid', sid);
    }
    return sid;
  } catch {
    return 'unknown';
  }
}

/** GA4 client_id 解析 (从 _ga cookie) - V3.6 拉通全链路 */
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

/** Locale 从 URL path 解析 (e.g., /zh-hk/category/... → 'zh-hk') */
function getLocale(): string {
  if (typeof window === 'undefined') return 'unknown';
  const m = window.location.pathname.match(/^\/([a-z]{2}(?:-[a-z]{2})?)/);
  return m ? m[1] : 'unknown';
}

/** Device type 解析 (UA) */
function getDeviceType(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'mobile';
  return 'desktop';
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

// ============ sendBeacon + fetch keepalive 兜底 ============

/**
 * sendBeacon (主) + fetch keepalive (兜底) 双发, 页面跳转不丢事件
 *  - sendBeacon: ~64KB 上限, 无 CORS preflight, 浏览器 unload 时仍能发
 *  - fetch keepalive: 现代浏览器同样 navigation-survivable, 是 sendBeacon 失败兜底
 *  - 0 .select() / 0 Prefer: return=representation (避免 42501 SELECT 权限陷阱)
 *  - 失败只 console.warn, 不抛异常
 */
function beacon(url: string, body: string): boolean {
  // 主路径: sendBeacon
  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon(url, blob)) return true;
    } catch {
      // 落到 fetch 兜底
    }
  }
  // 兜底: fetch keepalive
  if (typeof fetch === 'function') {
    try {
      fetch(url, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        credentials: 'omit',
      }).catch(() => {
        // fire-and-forget, 静默失败
      });
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

// ============ 主 track 函数 ============

/**
 * 记录一个事件到 tracking_events 表 (fire-and-forget)
 *
 * @example
 *   track({ event: 'cta-click', label: '立即 WhatsApp 咨询' });
 *   track({ event: 'product-view', productSlug: 'stickers', productName: '貼紙' });
 */
export function track(event: TrackingEvent): void {
  // SSR 守卫
  if (typeof window === 'undefined') return;

  // Supabase 未配置 (Mavis/K3 还没贴 key)
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[tracking] skipped: Supabase not configured');
    }
    return;
  }

  try {
    const pageUrl = window.location.href;
    const referrer = document.referrer || null;
    const ua = navigator.userAgent;
    const utm = parseUtmParams(pageUrl);

    // payload 严格对齐 009 tracking_events schema
    // 0 PII: no customer_name/email/phone/message
    const payload = {
      event_type: event.event,
      locale: getLocale(),
      page_url: pageUrl,
      session_id: getSessionId(),
      referrer,
      ga4_client_id: getGa4ClientId(),
      product_slug: event.productSlug || null,
      product_name: event.productName || null,
      category: event.category || null,
      label: event.label || null,
      utm_source: utm.source,
      utm_medium: utm.medium,
      utm_campaign: utm.campaign,
      user_agent: ua,
      device_type: getDeviceType(),
    };

    const body = JSON.stringify(payload);
    // PostgREST anon INSERT, apikey 在 URL (避免 Authorization 头 CORS)
    const url = `${SUPABASE_URL}/rest/v1/tracking_events?apikey=${encodeURIComponent(SUPABASE_ANON_KEY)}`;

    const sent = beacon(url, body);
    if (!sent && process.env.NODE_ENV === 'development') {
      console.warn('[tracking] beacon failed for', event.event);
    }
  } catch (err) {
    // 静默失败 —— 不阻塞主流程
    if (process.env.NODE_ENV === 'development') {
      console.warn('[tracking] exception:', err);
    }
  }
}

// ============ 9 Event 便捷函数 ============

/** SPA 路由变化 + 首次加载 */
export const trackPageView = (path?: string) =>
  track({ event: 'page-view', label: path });

/** 任意 CTA 按钮点击 (Hero / Footer / Sticky / Inline) */
export const trackCtaClick = (label: string, productSlug?: string) =>
  track({ event: 'cta-click', label, productSlug });

/** 类目页触发 */
export const trackCategoryView = (category: string, productSlug?: string) =>
  track({ event: 'category-view', category, productSlug });

/** 产品页触发 */
export const trackProductView = (productSlug: string, productName: string) =>
  track({ event: 'product-view', productSlug, productName });

/** QuoteForm 提交时 (3 态分离) */
export const trackQuoteSubmit = (productSlug?: string) =>
  track({ event: 'quote-submit', productSlug });

/** QuoteForm 成功 (ref 是报价单号, 跟 008 quote_requests 关联) */
export const trackQuoteSubmitSuccess = (ref: string, productSlug?: string) =>
  track({ event: 'quote-submit-success', label: ref, productSlug });

/** QuoteForm 失败 (降级到 WhatsApp 时) */
export const trackQuoteSubmitError = (error: string) =>
  track({ event: 'quote-submit-error', label: error });

/** WhatsApp 链接点击 (footer / sticky / PDP / hero / form 加速) */
export const trackWhatsappClick = (source: string, productSlug?: string) =>
  track({ event: 'whatsapp-click', label: source, productSlug });

/** Phone 链接点击 (header / footer / sticky) */
export const trackPhoneClick = (source: string) =>
  track({ event: 'phone-click', label: source });
