/**
 * 008 度量层 (env-gated, K3 8/26 给 Supabase key 后激活)
 * 2026-08-25 P1 #6 落 (千问 8/25 13:45 评核 P0 撞墙 = 0)
 * 拍板来源: K3 8/22 17:58 R0 拍板 + 千问 8/25 13:45 8/26 R0 行动包
 *
 * 4 事件 (form_submit / whatsapp_click / tel_click / mailto_click)
 * env-gated: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY 未配置时本地 console.log
 *
 * SOP-10 §0.22 + §0.23 + §0.24 配套:
 * - 5 问门禁: 撞墙 = K3 给 key
 * - 数据诚信: 含"数据来源"行 (K3 §0.23)
 * - 笼统批准≠动作完成: 撞墙 = K3 给 key + 4 事件测试 + 截图 (K3 §0.24)
 */

export type MetricsEventType = 'form_submit' | 'whatsapp_click' | 'tel_click' | 'mailto_click';

export interface MetricsEvent {
  type: MetricsEventType;
  timestamp: string;
  locale: string;
  page: string;
  metadata?: Record<string, any>;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_TABLE = 'zprintpro_008_events';

const isEnvConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * 上报 1 个事件到 Supabase (env-gated)
 * env 未配置时本地 console.log (撞墙 = 0, K3 给 key 前可观察事件)
 */
export async function trackEvent(event: Omit<MetricsEvent, 'timestamp'>): Promise<void> {
  const fullEvent: MetricsEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  if (!isEnvConfigured) {
    // env 未配置: 本地 console.log (M3 自进化, K3 给 key 前可观察)
    // eslint-disable-next-line no-console
    console.log('[008 度量层 env-gated 本地 log]', JSON.stringify(fullEvent, null, 2));
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(fullEvent),
    });

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('[008 度量层] Supabase 上报失败:', response.status, response.statusText);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[008 度量层] 网络错误:', err);
  }
}

/**
 * 4 事件 helpers
 * 撞墙 = 0: 全站可调用, env 未配置时本地 log
 */
export const trackFormSubmit = (locale: string, page: string, metadata?: Record<string, any>) =>
  trackEvent({ type: 'form_submit', locale, page, metadata });

export const trackWhatsAppClick = (locale: string, page: string, metadata?: Record<string, any>) =>
  trackEvent({ type: 'whatsapp_click', locale, page, metadata });

export const trackTelClick = (locale: string, page: string, metadata?: Record<string, any>) =>
  trackEvent({ type: 'tel_click', locale, page, metadata });

export const trackMailtoClick = (locale: string, page: string, metadata?: Record<string, any>) =>
  trackEvent({ type: 'mailto_click', locale, page, metadata });

/**
 * 008 度量层状态 (K3 撞墙 = K3 给 Supabase key)
 * 撞墙 = 0 部分: env 未配置时本地 console.log
 * 撞墙 = K3 key: K3 给 key 后激活 Supabase 上报
 */
export const metrics008Status = {
  envConfigured: isEnvConfigured,
  supabaseUrl: SUPABASE_URL || '未配置 (撞墙 = K3 8/26 给 key)',
  events: ['form_submit', 'whatsapp_click', 'tel_click', 'mailto_click'] as MetricsEventType[],
};
