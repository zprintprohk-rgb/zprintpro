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
 * @returns       完整 wa.me 链接（已 encodeURIComponent）
 */
export function generateWhatsAppLink(
  locale: 'zh-hk' | 'en' | 'ja' = 'zh-hk',
  ctx: WhatsAppContext = {}
): string {
  const builder = TEMPLATE[locale] || TEMPLATE['zh-hk'];
  const text = builder(ctx);
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
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
