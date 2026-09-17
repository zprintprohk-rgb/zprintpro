/**
 * Lane O 归因模块 (K3 v10 outbound masterplan P0-3, 2026-09-17)
 *
 * 用途:
 *   outbound 深链带 UTM 触达 (Reddit / LinkedIn / Quora / Email / WhatsApp) 的归因捕获,
 *   跨页/跨浏览保留, 最终落 008 quote_requests + 009 tracking_events 的 lead_source 车道字段。
 *
 * 深链标准 (v10 §三 Spec 1, 话术上线前强制):
 *   /{locale}/quote/?utm_source={reddit|linkedin|quora|email|wa}
 *            &utm_medium=outreach&utm_campaign=lane-o-{品类}&utm_content={lead_id}
 *   lead_id = 雷达台账行号 → 没有 lead_id 的触达 = 白做
 *
 * 设计约束 (为什么独立成模块):
 *   quote-tracking.ts (询盘层, import supabase client) 与 tracking.ts (事件层, 纯 sendBeacon)
 *   都要归因。本模块 **零依赖** (只用浏览器原生 API), 被两者共用 —— 既避免逻辑重复,
 *   又避免 tracking.ts 因 import quote-tracking 而把 supabase client 拉进 bundle。
 *
 * 归因策略 = last-touch deeplink + 30 天窗口 (见 getAttribution 注释)
 */

/** 从 URL 解析 UTM 四件套 */
export function parseUtmParams(url: string): {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
} {
  try {
    const u = new URL(url);
    return {
      source: u.searchParams.get('utm_source'),
      medium: u.searchParams.get('utm_medium'),
      campaign: u.searchParams.get('utm_campaign'),
      content: u.searchParams.get('utm_content'),
    };
  } catch {
    return { source: null, medium: null, campaign: null, content: null };
  }
}

/**
 * 获客车道 —— 与 supabase/migrations/010 的 CHECK 约束值域严格一致
 * (改这里必须同步改 010 的值域约束, 否则 insert 被 DB 拒绝)
 */
export type LeadSource = 'reddit' | 'linkedin' | 'quora' | 'email' | 'wa' | 'organic';

/**
 * utm_source → 获客车道的归一化映射
 *
 *   - outbound 5 值 → 对应车道
 *   - 无 utm_source, 或非 outbound (如 google/cpc) → 'organic' 兜底车道
 *     (细粒度不丢: utm_source 原值仍完整落库, 可 SQL 细查)
 */
export function resolveLeadSource(utmSource: string | null | undefined): LeadSource {
  const s = (utmSource || '').trim().toLowerCase();
  if (!s) return 'organic';
  if (s === 'reddit') return 'reddit';
  if (s === 'linkedin' || s === 'linked-in' || s === 'lnkd') return 'linkedin';
  if (s === 'quora') return 'quora';
  if (s === 'email' || s === 'mail' || s === 'newsletter') return 'email';
  if (s === 'wa' || s === 'whatsapp' || s === 'whats-app') return 'wa';
  return 'organic';
}

export interface Attribution {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  /** ?utm_content= 原样 (雷达台账行号 lead_id) */
  utmContent: string | null;
  /** 雷达台账行号 (与 utmContent 同值, 语义别名便于代码可读) */
  leadId: string | null;
  /** 归一化车道 */
  leadSource: LeadSource;
  /** 捕获该归因的落地页 URL */
  landingUrl: string | null;
  /** 归因捕获时间 (ISO) */
  capturedAt: string | null;
}

const ATTRIBUTION_KEY = 'zp_lane_o_attribution';
/** 归因窗口 30 天 (对齐 GA4 默认归因窗口) */
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * 事件层降级标记 key
 *
 * migration 010 是 K3 手动在 Supabase SQL Editor 跑的一次性迁移 (同 008 模式)。
 * 若代码先上线而迁移未跑, 带新列的 insert 会被 PostgREST 拒 (PGRST204 / column not found)。
 * 事件层 (sendBeacon) 拿不到响应体, 故一旦探测到缺失就记标记, 后续直接降级不再试新列。
 */
const COLUMN_MISSING_KEY = 'zp_010_lead_cols_missing';

interface StoredAttribution {
  utmSource: string;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  landingUrl: string;
  capturedAt: number;
}

const EMPTY_ATTRIBUTION: Attribution = {
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmContent: null,
  leadId: null,
  leadSource: 'organic',
  landingUrl: null,
  capturedAt: null,
};

function readStoredAttribution(): StoredAttribution | null {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as StoredAttribution;
    if (!o || !o.utmSource) return null;
    if (Date.now() - (o.capturedAt || 0) > ATTRIBUTION_TTL_MS) {
      window.localStorage.removeItem(ATTRIBUTION_KEY);
      return null;
    }
    return o;
  } catch {
    return null;
  }
}

function writeStoredAttribution(a: StoredAttribution): void {
  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(a));
  } catch {
    // 隐私模式/配额满 → 静默降级 (归因仅本次会话内有效)
  }
}

function toAttribution(rec: StoredAttribution): Attribution {
  return {
    utmSource: rec.utmSource,
    utmMedium: rec.utmMedium,
    utmCampaign: rec.utmCampaign,
    utmContent: rec.utmContent,
    leadId: rec.utmContent,
    leadSource: resolveLeadSource(rec.utmSource),
    landingUrl: rec.landingUrl,
    capturedAt: new Date(rec.capturedAt).toISOString(),
  };
}

/**
 * 取当前归因 (Lane O 深链触达)
 *
 * 归因策略 = last-touch deeplink + 30 天窗口:
 *   1. 当前 URL 带 utm_source → 视为一次新触达, 落 localStorage (覆盖旧值)
 *   2. URL 无 UTM (用户在站内跳了几页才提交) → 读 localStorage 兜底, UTM 不丢
 *   3. 都没有 → organic
 *
 * 为什么不用 URL-only: outbound 深链落地 quote 页后, 用户常先浏览其他页再回来提交,
 * 那时 window.location.href 已无 UTM → 归因断裂, lead_id 全丢 = 车道 ROI 不可判。
 */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return EMPTY_ATTRIBUTION;

  const fromUrl = parseUtmParams(window.location.href);
  if (fromUrl.source) {
    const rec: StoredAttribution = {
      utmSource: fromUrl.source,
      utmMedium: fromUrl.medium,
      utmCampaign: fromUrl.campaign,
      utmContent: fromUrl.content,
      landingUrl: window.location.href,
      capturedAt: Date.now(),
    };
    writeStoredAttribution(rec);
    return toAttribution(rec);
  }

  const stored = readStoredAttribution();
  return stored ? toAttribution(stored) : EMPTY_ATTRIBUTION;
}

/** 010 新列是否已知缺失 (事件层降级依据) */
export function isLeadColumnKnownMissing(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(COLUMN_MISSING_KEY) === '1';
  } catch {
    return false;
  }
}

/** 标记 010 新列缺失 (探测到 PGRST204 时调用, 本次会话后续降级) */
export function markLeadColumnMissing(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COLUMN_MISSING_KEY, '1');
  } catch {
    // 忽略
  }
}

/**
 * PostgREST 错误信息 → 是否属于「010 新列不存在」
 *
 * 用于 invoke 层容错: 迁移未应用时降级重试, 保证 008/009 写入不破 (P0 回归防护)。
 */
export function isMissingLeadColumnError(message: string | undefined | null): boolean {
  if (!message) return false;
  return (
    /PGRST204/i.test(message) ||
    /could not find the '(lead_source|utm_content|lead_id)' column/i.test(message) ||
    /column .*(lead_source|utm_content|lead_id).* does not exist/i.test(message)
  );
}

/**
 * 构造重定向目标 URL, **保留 UTM 归因参数** (v10 P0-3)
 *
 * 存在理由: `/quote/` 是 outbound 深链的落点, 但它只做重定向 (无 product → /contact/,
 * 有 product → 产品页)。旧实现无 product 分支直接跳 `/contact/` 不带参数 →
 * **深链 UTM 在重定向瞬间永久丢失** → 用户在 contact 提交询盘时 lead_id 归零,
 * Lane O 车道 ROI 系统性低估。故 URL 构造必须收敛到这个可测试的纯函数。
 *
 * @param locale   语言 (zh-hk / en / ja)
 * @param path     目标路径 (如 '/contact/' 或 '/product/stickers/')
 * @param search   当前 query string (含或不含 '?' 均可)
 * @param dropKeys 需要剔除的参数名 (如 'product' / 'locale')
 * @returns 形如 `/zh-hk/contact/?utm_source=reddit&...`
 */
export function buildRedirectUrl(
  locale: string,
  path: string,
  search: string,
  dropKeys: string[] = []
): string {
  const params = new URLSearchParams(search);
  for (const k of dropKeys) params.delete(k);
  const qs = params.toString();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath}${qs ? '?' + qs : ''}`;
}
