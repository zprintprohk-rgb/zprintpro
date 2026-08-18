/**
 * 共享 API 安全守卫 (2026-08-19 P0 紧急修复, 配合 commit 95bd62b)
 *
 * 背景: /api/quote-notify 与 /api/order-notify 原代码 0 鉴权 0 限流,
 *       可被脚本 POST 刷爆 outlook 邮箱 (收件人固定 zprintpro@outlook.com,
 *       不泄露数据, 但邮件配额 + 反垃圾信誉会被消耗)。
 *
 * 防护层级 (从廉到贵, 全部 edge runtime 友好):
 *  1. Origin/Referer 校验 - 仅允许 zprintpro.com 同源 POST, 阻断跨站脚本/CSRF
 *  2. Body 大小硬限 (8KB) - 抗小流量 POST flood
 *  3. 必填字段校验 (现有 endpoint 各自再做) - 这里只做公共层
 *  4. Honeypot 字段 - 隐藏的 bot 陷阱, 真人填了空字符串, 机器人会原样提交
 *  5. 软频率限流 (进程内 token bucket, ~5 req / IP / 5min) - 缓解刷量,
 *     多 edge node 不强一致, 但配合 origin 校验可挡 99% 自动化
 *  6. 失败响应统一格式, 不暴露后端细节
 *
 * 升级路径 (K3 后续可选, 写在这里不阻断当前 push):
 *  - CF Turnstile (官方人机验证, 需 sitekey + CF 账号配置)
 *  - CF KV 跨 node 严格频率限
 *  - 原 API 路由再加 IP 黑名单
 */

import { NextRequest, NextResponse } from 'next/server';

// 允许的来源域名 (生产主域 + www + preview)
const ALLOWED_ORIGINS = new Set<string>([
  'https://zprintpro.com',
  'https://www.zprintpro.com',
  // 预览环境 (CF Pages preview deployments)
  'https://*.zprintprohk.workers.dev',
  // 本地开发
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

// 进程内软频率限: IP -> { windowStart: ms, count: number }
const RATE_BUCKET = new Map<string, { windowStart: number; count: number }>();
const RATE_WINDOW_MS = 5 * 60 * 1000;   // 5 min 滑窗
const RATE_MAX = 5;                       // 单 IP 单窗口最多 5 次

/** 校验 Origin 头是否在白名单 (含通配符 *.zprintprohk.workers.dev) */
export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // 通配符匹配: https://xxx.zprintprohk.workers.dev
  for (const allowed of ALLOWED_ORIGINS) {
    if (allowed.includes('*.')) {
      const regex = new RegExp('^' + allowed.replace(/\./g, '\\.').replace(/\*/g, '[^/]+') + '$');
      if (regex.test(origin)) return true;
    }
  }
  return false;
}

/** 软频率限, 返回 true = 放行, false = 触发限流 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = RATE_BUCKET.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_WINDOW_MS) {
    RATE_BUCKET.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  if (bucket.count >= RATE_MAX) return false;
  bucket.count += 1;
  return true;
}

/** 提取客户端 IP (CF 优先, 然后 X-Forwarded-For, 然后 unknown) */
export function getClientIp(req: NextRequest | Request): string {
  // 优先 Cloudflare 提供的 CF-Connecting-IP (edge runtime 下可读)
  const cfIp = (req.headers as any).get?.('cf-connecting-ip');
  if (cfIp) return cfIp;
  // 兜底 X-Forwarded-For
  const xff = (req.headers as any).get?.('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return 'unknown';
}

/**
 * 统一守卫入口: 4 件套一次过, 任一失败返回 NextResponse 错误, 成功返回 null
 * 用法:
 *   const block = await guardApiRequest(req);
 *   if (block) return block;
 */
export async function guardApiRequest(
  req: NextRequest | Request,
  options: { maxBodyBytes?: number; requireHoneypot?: boolean } = {}
): Promise<NextResponse | null> {
  const { maxBodyBytes = 8 * 1024, requireHoneypot = true } = options;

  // 1. 方法限制 (只允许 POST)
  if (req.method !== 'POST') {
    return NextResponse.json({ ok: false, error: 'method not allowed' }, { status: 405 });
  }

  // 2. Origin 校验 (同源策略)
  const origin = (req.headers as any).get?.('origin') || (req.headers as any).get?.('referer');
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json(
      { ok: false, error: 'forbidden: invalid origin' },
      { status: 403 }
    );
  }

  // 3. 频率限 (按 IP)
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'rate limit: try again in 5 minutes' },
      { status: 429 }
    );
  }

  // 4. Content-Length 预检 (避免大 body 拖死 worker)
  const contentLength = parseInt((req.headers as any).get?.('content-length') || '0', 10);
  if (contentLength > maxBodyBytes) {
    return NextResponse.json(
      { ok: false, error: `payload too large (max ${maxBodyBytes}B)` },
      { status: 413 }
    );
  }

  // 5. Honeypot 字段 (如启用): 隐藏的 bot 陷阱, 机器人会原样提交
  if (requireHoneypot) {
    try {
      const cloned = req.clone();
      const body = await cloned.json();
      // 字段名 (前端不渲染此字段, 任何提交 = bot)
      if (body.website || body.url_field || body.email_confirm) {
        // 静默 200 (不告诉攻击者为何失败, 防探测)
        return NextResponse.json({ ok: true, skipped: 'bot' });
      }
      // 把 body 暂存 request 上让后续 handler 用
      (req as any)._parsedBody = body;
    } catch {
      return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
    }
  }

  return null;
}

/** 取已经校验过的 body (guardApiRequest 后调用) */
export function getGuardedBody<T = any>(req: NextRequest | Request): T | null {
  return (req as any)._parsedBody ?? null;
}
