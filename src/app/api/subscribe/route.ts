/**
 * /api/subscribe — 邮件订阅 API route handler (P1.4)
 * Receives email from EmailSubscribePopup, persists to file + sends via Resend
 *
 * Architecture (graceful degradation):
 *   1. Persist email to .hermes/email-subscribers.jsonl (always)
 *   2. Send "10% off" coupon email via Resend API (if RESEND_API_KEY set)
 *   3. Send notification to ops via Resend API (if RESEND_API_KEY set)
 *   4. If RESEND_API_KEY NOT set: skip step 2-3, persist-only mode
 *      (ops can later export the JSONL file and bulk import to Mailchimp/etc)
 *
 * Environment variables (set in CF Pages dashboard or .env.local):
 *   RESEND_API_KEY       — Resend API key (https://resend.com/api-keys)
 *   RESEND_FROM_EMAIL    — Sender email (e.g. "team@zprintpro.com")
 *   RESEND_OPS_EMAIL     — Ops notification recipient (e.g. "ops@zprintpro.com")
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

interface SubscribePayload {
  email: string;
  locale: string;
  source?: string;
}

interface PersistRecord {
  email: string;
  locale: string;
  source: string;
  subscribedAt: string;
  userAgent: string;
  ip: string;
  resentEmailSent: boolean;
  opsNotificationSent: boolean;
}

const STORAGE_FILE = path.join(process.cwd(), '.hermes', 'email-subscribers.jsonl');

function persistRecord(record: PersistRecord) {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFileSync(STORAGE_FILE, JSON.stringify(record) + '\n', 'utf-8');
    return true;
  } catch (err) {
    console.error('[subscribe] persist failed:', err);
    return false;
  }
}

async function sendResendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'team@zprintpro.com';

  if (!apiKey) {
    console.log('[subscribe] RESEND_API_KEY not set, skipping email send');
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      console.error('[subscribe] Resend API error:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[subscribe] Resend send failed:', err);
    return false;
  }
}

function buildCouponEmailHtml(locale: string, email: string): string {
  const discountCode = 'WELCOME10';
  if (locale === 'zh-hk') {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>歡迎加入智印雲!</h2>
        <p>感謝您訂閱. 您的專屬 10% 折扣碼: <strong>${discountCode}</strong></p>
        <p>使用步驟:</p>
        <ol>
          <li>登入 zprintpro.com</li>
          <li>選擇您的產品</li>
          <li>結帳時輸入 ${discountCode}</li>
        </ol>
        <p>折扣有效期 30 天. 適用於所有產品, 不可與其他優惠疊加.</p>
        <p>— 智印雲團隊</p>
      </div>
    `;
  }
  if (locale === 'ja') {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>智印雲へようこそ!</h2>
        <p>ご購読ありがとうございます。専用 10% OFF コード: <strong>${discountCode}</strong></p>
        <p>使用方法:</p>
        <ol>
          <li>zprintpro.com にアクセス</li>
          <li>商品を選ぶ</li>
          <li>チェックアウト時に ${discountCode} を入力</li>
        </ol>
        <p>有効期限 30 日間。全商品対象。他の割引との併用不可。</p>
        <p>— 智印雲チーム</p>
      </div>
    `;
  }
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to ZprintPro!</h2>
      <p>Thanks for subscribing. Your exclusive 10% off code: <strong>${discountCode}</strong></p>
      <p>How to use:</p>
      <ol>
        <li>Visit zprintpro.com</li>
        <li>Choose your product</li>
        <li>Enter <strong>${discountCode}</strong> at checkout</li>
      </ol>
      <p>Valid for 30 days. Applies to all products. Cannot be combined with other offers.</p>
      <p>Free US shipping on $99+ orders automatically applied.</p>
      <p>— The ZprintPro Team</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  let body: SubscribePayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Validate
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  const locale = body.locale || 'en';
  const source = body.source || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  // Get client IP (CF Pages provides 'cf-connecting-ip' header)
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';

  // Step 1: persist always
  const persisted = persistRecord({
    email: body.email,
    locale,
    source,
    subscribedAt: new Date().toISOString(),
    userAgent,
    ip,
    resentEmailSent: false,
    opsNotificationSent: false,
  });

  if (!persisted) {
    return NextResponse.json({ ok: false, error: 'Persist failed' }, { status: 500 });
  }

  // Step 2: send coupon email to subscriber (if Resend configured)
  const couponSent = await sendResendEmail(
    body.email,
    locale === 'zh-hk' ? '您的智印雲 10% 折扣碼' : locale === 'ja' ? '智印雲 10% OFF コード' : 'Your ZprintPro 10% Off Code',
    buildCouponEmailHtml(locale, body.email)
  );

  // Step 3: notify ops (if Resend configured)
  const opsEmail = process.env.RESEND_OPS_EMAIL;
  let opsSent = false;
  if (opsEmail) {
    opsSent = await sendResendEmail(
      opsEmail,
      `[New subscriber] ${body.email}`,
      `<p>New email subscriber:</p><ul><li>Email: ${body.email}</li><li>Locale: ${locale}</li><li>Source: ${source}</li><li>Time: ${new Date().toISOString()}</li><li>IP: ${ip}</li></ul>`
    );
  }

  return NextResponse.json({
    ok: true,
    email: body.email,
    resentEmailSent: couponSent,
    opsNotificationSent: opsSent,
    message: 'Subscribed successfully',
  });
}

export async function GET() {
  // Health check endpoint
  const resendConfigured = !!process.env.RESEND_API_KEY;
  return NextResponse.json({
    ok: true,
    resendConfigured,
    storageFile: STORAGE_FILE.replace(process.cwd(), '.'),
  });
}
