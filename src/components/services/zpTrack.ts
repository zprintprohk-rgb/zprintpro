// 2026-08-26 K3 拍板 brief: window.zpTrack 埋点 wrapper
// 来源: deliverables/rush-nextjs-component-map.md §埋点接口
// 事件类型: whatsapp_click / tel_click / form_submit / form_open
// 数据流: page [data-event] click → window.zpTrack → 已有 whatsapp-inquiry.ts 落 Supabase

'use client';

export type ZpEvent = 'whatsapp_click' | 'tel_click' | 'form_submit' | 'form_open';

export interface ZpTrackPayload {
  event: ZpEvent;
  source: string;
  locale?: string;
  productName?: string;
  extra?: Record<string, unknown>;
}

export function zpTrack(payload: ZpTrackPayload): void {
  // 客户端运行时,如未挂载(window 在 SSR 期间不存在)就静默跳过
  if (typeof window === 'undefined') return;
  try {
    // 已有基建: window.zpTrack 由 trackContactFormSubmit / WhatsAppFloat 注入
    // 我们的组件层只负责触发,具体 Supabase 落库由 metrics-008 + whatsapp-inquiry 接管
    const detail = { ...payload, ts: Date.now() };
    window.dispatchEvent(new CustomEvent('zp:track', { detail }));

    // 兜底: 直接调 window.zpTrack (如已注入)
    const w = window as unknown as { zpTrack?: (p: ZpTrackPayload) => void };
    if (typeof w.zpTrack === 'function') {
      w.zpTrack(payload);
    }

    // 开发期日志(线上无副作用)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[zpTrack]', payload);
    }
  } catch {
    // 埋点失败不影响主流程
  }
}
