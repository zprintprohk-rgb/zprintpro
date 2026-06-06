/**
 * WhatsApp 询盘落库（Supabase）
 *
 * 用途：每次点击 WhatsApp 链接时，把上下文（locale/source/sku/size/material/quantity）
 *       写入 Supabase 的 whatsapp_inquiries 表，用于转化漏斗分析。
 *
 * 设计原则：
 * - fire-and-forget（不 await，不阻塞跳转）
 * - 失败 fallback（不阻塞 WhatsApp 跳转）
 * - 浏览器/SSR 双兼容
 *
 * 配套：
 * - supabase/migrations/002_create_whatsapp_inquiries.sql
 * - lib/whatsapp.ts getWhatsAppLinkProps 的 onClick 调用
 */

import { supabase } from './supabase';
import type { WhatsAppContext } from './whatsapp';

export interface WhatsAppInquiryPayload {
  locale: string;
  ctx: WhatsAppContext;
  /** 可选：覆盖 page_url（默认用 window.location.href）*/
  pageUrl?: string;
  /** 可选：覆盖 user_agent（默认用 navigator.userAgent）*/
  userAgent?: string;
}

/**
 * 记录 WhatsApp 询盘到 Supabase（fire-and-forget）
 *
 * @example
 *   onClick={() => {
 *     trackWhatsappInquiry({ locale: 'zh-hk', ctx: { source: 'footer' } });
 *     // 立即跳转，不等 Supabase 响应
 *   }}
 */
export async function trackWhatsappInquiry(
  payload: WhatsAppInquiryPayload
): Promise<void> {
  try {
    // SSR 守卫
    if (typeof window === 'undefined') return;

    // Supabase 客户端未初始化（无 env）
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (process.env.NODE_ENV === 'development') {
        console.debug('[whatsapp-inquiry] skipped: Supabase not configured');
      }
      return;
    }

    const { locale, ctx, pageUrl, userAgent } = payload;
    const hasContext = !!(ctx.productName || ctx.size || ctx.material || ctx.quantity);

    const { error } = await supabase.from('whatsapp_inquiries').insert({
      locale,
      source: ctx.source || 'unknown',
      phone: ctx.phone || null,
      product_name: ctx.productName || null,
      size: ctx.size || null,
      material: ctx.material || null,
      quantity: ctx.quantity ? String(ctx.quantity) : null,
      has_context: hasContext,
      user_agent: userAgent || navigator.userAgent,
      referrer: document.referrer || null,
      page_url: pageUrl || window.location.href,
    });

    if (error) {
      // 失败但不抛（fire-and-forget）
      if (process.env.NODE_ENV === 'development') {
        console.warn('[whatsapp-inquiry] insert failed:', error.message);
      }
    }
  } catch (err) {
    // 静默失败 —— 不阻塞 WhatsApp 跳转
    if (process.env.NODE_ENV === 'development') {
      console.warn('[whatsapp-inquiry] exception:', err);
    }
  }
}
