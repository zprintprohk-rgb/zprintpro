/**
 * 统一 WhatsApp 链接生成器
 * 替换所有硬编码 wa.me 链接，带上下文（产品名/尺寸/材质/数量/来源）
 */

export interface WhatsAppContext {
  productName?: string;
  size?: string;
  material?: string;
  quantity?: number | string;
  source?: string; // 例如 'hero-banner' | 'product-detail' | 'calculator' | 'contact' | 'footer'
  extra?: string;  // 任意补充文本
  phone?: string;  // 覆盖默认 PHONE（例：香港号 85290616204）
}

const PHONE = '8618126380255'; // +86 181 2638 0255，去掉 +

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
      `こんにちは、${ctx.productName || '印刷'}についてお問い合わせしたいです。`,
      ctx.size ? `サイズ：${ctx.size}` : null,
      ctx.material ? `材質：${ctx.material}` : null,
      ctx.quantity ? `数量：${ctx.quantity}` : null,
      ctx.extra || null,
      `出典：${ctx.source || 'zprintpro.com'}`,
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
      // 客户端动态 import 避免 SSR 引入 analytics 模块
      if (typeof window !== 'undefined') {
        import('@/lib/analytics').then(({ trackWhatsappClick }) => {
          trackWhatsappClick({
            source: ctx.source,
            hasContext: !!(ctx.productName || ctx.size || ctx.material || ctx.quantity),
            productName: ctx.productName,
          });
        });
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
