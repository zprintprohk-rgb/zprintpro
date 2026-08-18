import { NextResponse, NextRequest } from 'next/server';
import { guardApiRequest, getGuardedBody } from '@/lib/api-security';

export const runtime = 'edge';

/**
 * 订单通知 API (formsubmit.co → outlook.com 转发)
 * 2026-08-19 P0 安全加固: 接入 src/lib/api-security.ts 4 件套
 *   - Origin 校验 (仅 zprintpro.com 同源)
 *   - 软频率限 (5 req/IP/5min, 进程内 token bucket)
 *   - Content-Length 8KB 硬限
 *   - Honeypot 反机器人
 */
export async function POST(req: NextRequest) {
  // 共享安全守卫 (origin + 限流 + body 上限 + honeypot)
  const block = await guardApiRequest(req);
  if (block) return block;

  const body = getGuardedBody<Record<string, any>>(req);
  if (!body || !body.orderId) {
    return NextResponse.json({ success: false, error: 'orderId required' }, { status: 400 });
  }

  try {
    // Forward to same email channel as FormSubmit
    await fetch('https://formsubmit.co/zprintpro@outlook.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _subject: 'New Order ' + body.orderId, ...body }),
    });
    return NextResponse.json({ success: true, orderId: body.orderId });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
