/**
 * 统一 WhatsApp 链接生成器
 * 替换所有硬编码 wa.me 链接，带上下文（产品名/尺寸/材质/数量/来源）
 */
import { trackWhatsappClick } from './tracking';

export interface WhatsAppContext {
  productName?: string;
  size?: string;
  material?: string;
  quantity?: number | string;
  source?: string; // 例如 'hero-banner' | 'product-detail' | 'calculator' | 'contact' | 'footer'
  extra?: string;  // 任意补充文本
  phone?: string;  // 覆盖默认 PHONE（例：香港号 85290616204）
}

const PHONE = '8619880851334'; // +8619880851334，去掉 +

const TEMPLATE: Record<string, (ctx: WhatsAppContext) => string> = {
  'zh-hk': (ctx) => {
    const lines = [
      `你好，我想咨询${ctx.productName || '印刷'}的报价。`,
      ctx.size ? `尺寸：${ctx.size}` : null,
      ctx.material ? `材质：${ctx.material}` : null,
      ctx.quantity ? `数量：${ctx.quantity}` : null,
      ctx.extra || null,
      `来源：${ctx.source || 'zprintpro.com'}`,
    ].filter(Boolean);
    return lines.join('\n');
  },
  en: (ctx) => {
    const lines = [
      `Hi, I'd like to inquire about ${ctx.productName || 'printing'} services.`,
      ctx.size ? `Size: ${ctx.size}` : null,
      ctx.material ? `Material: ${ctx.material}` : null,
      ctx.quantity ? `Quantity: ${ctx.quantity}` : null,
      ctx.extra || null,
      `Source: ${ctx.source || 'zprintpro.com'}`,
    ].filter(Boolean);
    return lines.join('\n');
  },
  ja: (ctx) => {
    const lines = [
      `お世話になっております。ZprintPro サイトより${ctx.productName || '印刷'}のお見積もりをお願いいたします。`,
      ctx.size ? `サイズ：${ctx.size}` : null,
      ctx.material ? `材質：${ctx.material}` : null,
      ctx.quantity ? `数量：${ctx.quantity}` : null,
      ctx.extra || null,
      `日本語でのご対応を希望します。(Source: ${ctx.source || 'zprintpro.com'})`,
    ].filter(Boolean);
    return lines.join('\n');
  },
};

/**
 * 生成带上下文的 WhatsApp Web/App 链接
 * @param locale  当前语言
 * @param ctx     上下文
 * @returns       完整 wa.me 链接（已 encodeURIComponent，含 #src=... 追踪 hash）
 */
export function generateWhatsAppLink(
  locale: 'zh-hk' | 'en' | 'ja' = 'zh-hk',
  ctx: WhatsAppContext = {}
): string {
  const builder = TEMPLATE[locale] || TEMPLATE['zh-hk'];
  const text = builder(ctx);

  // 用 URL hash 携带追踪参数（不破坏 wa.me 协议，WhatsApp 端可读）
  const trackingParams: string[] = [];
  if (ctx.source) trackingParams.push(`src=${ctx.source}`);
  if (ctx.productName) trackingParams.push(`sku=${encodeURIComponent(ctx.productName)}`);
  if (ctx.size) trackingParams.push(`size=${encodeURIComponent(ctx.size)}`);
  if (ctx.material) trackingParams.push(`mat=${encodeURIComponent(ctx.material)}`);
  if (ctx.quantity) trackingParams.push(`qty=${ctx.quantity}`);
  const hash = trackingParams.length > 0 ? `#${trackingParams.join('&')}` : '';

  return `https://wa.me/${(ctx.phone || PHONE).replace(/\D/g, '')}?text=${encodeURIComponent(text)}${hash}`;
}

/**
 * 包装一个 a 标签，onClick 时自动追踪（客户端）
 * 用于在 React 组件中替换 <a href={generateWhatsAppLink(...)}>
 *
 * @example
 *   <a {...getWhatsAppLinkProps(locale, { source: 'hero-banner' })}>立即 WhatsApp 咨询</a>
 */
export function getWhatsAppLinkProps(
  locale: 'zh-hk' | 'en' | 'ja' = 'zh-hk',
  ctx: WhatsAppContext = {}
): {
  href: string;
  target: '_blank';
  rel: 'noopener noreferrer';
  onClick: () => void;
} {
  return {
    href: generateWhatsAppLink(locale, ctx),
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: () => {
      // 客户端动态 import 避免 SSR 引入 analytics + inquiry 模块
      if (typeof window !== 'undefined') {
        // 1) 埋点（Plausible / GA 事件）
        import('@/lib/analytics').then(({ trackWhatsappClick }) => {
          trackWhatsappClick({
            source: ctx.source,
            hasContext: !!(ctx.productName || ctx.size || ctx.material || ctx.quantity),
            productName: ctx.productName,
          });
        });
        // 2) 询盘落库（Supabase whatsapp_inquiries 表）
        import('@/lib/whatsapp-inquiry').then(({ trackWhatsappInquiry }) => {
          trackWhatsappInquiry({ locale, ctx });
        });
        // 3) V3.6 双写 (008) - WhatsApp click 算询盘 (新增, 度量口径统一)
        import('@/lib/quote-tracking').then(({ trackQuoteRequestFromWhatsApp }) => {
          trackQuoteRequestFromWhatsApp('whatsapp-cta', locale, ctx);
        });
        // 4) 2026-08-29 K3 拍板: 统一事件 (009 tracking_events, 0 PII, sendBeacon 兜底)
        trackWhatsappClick(ctx.source || 'unknown', ctx.productName || undefined);
      }
    },
  };
}

/**
 * 纯文本版（用于 button onClick 内 window.open 时直接用）
 */
export function generateWhatsAppText(
  locale: 'zh-hk' | 'en' | 'ja' = 'zh-hk',
  ctx: WhatsAppContext = {}
): string {
  const builder = TEMPLATE[locale] || TEMPLATE['zh-hk'];
  return builder(ctx);
}


/* ===================== 結構化報價單（P0-2 · 2026-07-17） =====================
 * 用途：QuoteForm 提交成功頁的 WhatsApp 加速 CTA + 提交失敗時的降級通道。
 * 報價單帶參考編號，同一編號會寫入 Supabase quotes.design_notes，方便對賬。
 */

export interface QuoteSheetContext {
  ref: string;                 // 報價參考編號（generateQuoteRef 生成）
  name?: string;
  phone?: string;
  email?: string;
  productName?: string;
  size?: string;
  material?: string;
  quantity?: number | string;
  finishing?: string;
  turnaround?: string;
  message?: string;
  source?: string;
}

/** 生成報價參考編號：ZP-YYYYMMDD-XXXX（客戶端隨機，無需後端） */
export function generateQuoteRef(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZP-${ymd}-${rand}`;
}

const QUOTE_SHEET_TEMPLATE: Record<string, (q: QuoteSheetContext) => string> = {
  'zh-hk': (q) => {
    const lines = [
      '【報價請求 Quote Request】',
      `參考編號：${q.ref}`,
      q.name ? `姓名：${q.name}` : null,
      q.phone ? `聯絡電話：${q.phone}` : null,
      q.email ? `電郵：${q.email}` : null,
      '────────────',
      q.productName ? `品類：${q.productName}` : null,
      q.size ? `尺寸：${q.size}` : null,
      q.quantity ? `數量：${q.quantity}` : null,
      q.material ? `材質：${q.material}` : null,
      q.finishing ? `工藝：${q.finishing}` : null,
      q.turnaround ? `交期：${q.turnaround}` : null,
      '────────────',
      '需求詳情：',
      q.message || '（待補充）',
      '────────────',
      `請回覆報價（請註明有效期）。來源：${q.source || 'zprintpro.com 報價表單'}`,
    ].filter(Boolean);
    return lines.join('\n');
  },
  en: (q) => {
    const lines = [
      '[Quote Request]',
      `Ref: ${q.ref}`,
      q.name ? `Name: ${q.name}` : null,
      q.phone ? `Phone: ${q.phone}` : null,
      q.email ? `Email: ${q.email}` : null,
      '--------------------',
      q.productName ? `Product: ${q.productName}` : null,
      q.size ? `Size: ${q.size}` : null,
      q.quantity ? `Qty: ${q.quantity}` : null,
      q.material ? `Material: ${q.material}` : null,
      q.finishing ? `Finishing: ${q.finishing}` : null,
      q.turnaround ? `Turnaround: ${q.turnaround}` : null,
      '--------------------',
      'Details:',
      q.message || '(to be provided)',
      '--------------------',
      `Please reply with your best quote (incl. validity). Source: ${q.source || 'zprintpro.com quote form'}`,
    ].filter(Boolean);
    return lines.join('\n');
  },
  ja: (q) => {
    const lines = [
      '【お見積もり依頼】',
      'お世話になっております。ZprintPro サイトより下記の通りお見積もりをお願いいたします。',
      `番号：${q.ref}`,
      q.name ? `お名前：${q.name}` : null,
      q.phone ? `電話番号：${q.phone}` : null,
      q.email ? `メール：${q.email}` : null,
      '────────────',
      q.productName ? `製品：${q.productName}` : null,
      q.size ? `サイズ：${q.size}` : null,
      q.quantity ? `数量：${q.quantity}` : null,
      q.material ? `材質：${q.material}` : null,
      q.finishing ? `加工：${q.finishing}` : null,
      q.turnaround ? `納期：${q.turnaround}` : null,
      '────────────',
      '詳細：',
      q.message || '（後ほどお送りします）',
      '────────────',
      `お手数ですが、ご返信のほどよろしくお願いいたします。日本語でのご対応を希望します。(Source: ${q.source || 'zprintpro.com 見積もりフォーム'})`,
    ].filter(Boolean);
    return lines.join('\n');
  },
};

/** 結構化報價單純文本（3 locale） */
export function buildQuoteSheetMessage(
  locale: 'zh-hk' | 'en' | 'ja' = 'zh-hk',
  q: QuoteSheetContext
): string {
  const builder = QUOTE_SHEET_TEMPLATE[locale] || QUOTE_SHEET_TEMPLATE['zh-hk'];
  return builder(q);
}

/** 結構化報價單 WhatsApp 直鏈 */
export function generateQuoteSheetLink(
  locale: 'zh-hk' | 'en' | 'ja' = 'zh-hk',
  q: QuoteSheetContext
): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(buildQuoteSheetMessage(locale, q))}`;
}
