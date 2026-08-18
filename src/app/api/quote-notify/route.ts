import { NextRequest, NextResponse } from 'next/server';
import { guardApiRequest, getGuardedBody } from '@/lib/api-security';

export const runtime = 'edge';

/**
 * 询盘邮件通知 API (2026-07-20 P0-3 v3)
 * 背景: FormSubmit → outlook.com 被微软静默丢弃 (已激活但零送达, 对照实验证实)
 * 方案: 自有域名发信 Resend API (SPF/DKIM 验证域名, 可达性好)
 * 环境变量: RESEND_API_KEY (CF Pages dashboard 配置)
 * 降级: 未配置 key 时返回 200 skipped, 前端不阻塞 (WhatsApp 兜底仍在)
 *
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: true, skipped: 'RESEND_API_KEY not configured' });
  }

  const body = getGuardedBody<Record<string, string>>(req);
  if (!body) {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const { ref, name, phone, email, product, quantity, size, message, locale, referrer } = body;
  if (!phone || !email) {
    return NextResponse.json({ ok: false, error: 'phone/email required' }, { status: 400 });
  }

  const html = `
    <h2>新詢盤 [${ref || ''}] ${product || ''}</h2>
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><b>姓名</b></td><td>${name || '(未填)'}</td></tr>
      <tr><td><b>電話</b></td><td>${phone}</td></tr>
      <tr><td><b>電郵</b></td><td>${email}</td></tr>
      <tr><td><b>產品</b></td><td>${product || ''}</td></tr>
      <tr><td><b>數量</b></td><td>${quantity || '(未填)'}</td></tr>
      <tr><td><b>尺寸</b></td><td>${size || '(未填)'}</td></tr>
      <tr><td><b>語言</b></td><td>${locale || ''}</td></tr>
      <tr><td><b>來源頁</b></td><td>${referrer || '(直接訪問)'}</td></tr>
      <tr><td><b>留言</b></td><td>${(message || '').replace(/\n/g, '<br>')}</td></tr>
    </table>
    <p style="color:#666;font-size:12px">ZprintPro 询盘通知 · ${new Date().toISOString()}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'ZprintPro 詢盤 <quotes@zprintpro.com>',
      to: ['zprintpro@outlook.com'],
      reply_to: email,
      subject: `[ZprintPro 詢盤 ${ref || ''}] ${product || ''} — ${phone}`,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json({ ok: false, error: errText }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
