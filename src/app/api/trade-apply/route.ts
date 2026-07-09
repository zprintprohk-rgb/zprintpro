/**
 * /api/trade-apply — B2B Trade Program 申请 API route handler (P1.2)
 * Receives trade application, persists to file, sends notification to ops
 *
 * Environment variables (set in CF Pages dashboard):
 *   RESEND_API_KEY       — Resend API key
 *   RESEND_FROM_EMAIL    — Sender email
 *   RESEND_OPS_EMAIL     — Ops notification recipient
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

interface TradeApplication {
  fullName: string;
  email: string;
  company: string;
  website?: string;
  useCase: string;
  monthlyVolume: string;
  locale: string;
}

interface PersistRecord {
  type: 'trade_application';
  fullName: string;
  email: string;
  company: string;
  website: string;
  useCase: string;
  monthlyVolume: string;
  locale: string;
  appliedAt: string;
  userAgent: string;
  ip: string;
  opsNotificationSent: boolean;
}

const STORAGE_FILE = path.join(process.cwd(), '.hermes', 'trade-applications.jsonl');

function persistRecord(record: PersistRecord): boolean {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFileSync(STORAGE_FILE, JSON.stringify(record) + '\n', 'utf-8');
    return true;
  } catch (err) {
    console.error('[trade-apply] persist failed:', err);
    return false;
  }
}

async function sendResendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'team@zprintpro.com';
  if (!apiKey) {
    console.log('[trade-apply] RESEND_API_KEY not set, skipping email');
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from: fromEmail, to: [to], subject, html }),
    });
    if (!res.ok) {
      console.error('[trade-apply] Resend error:', res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[trade-apply] Resend failed:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: TradeApplication;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Validate required fields
  const errors: string[] = [];
  if (!body.fullName || body.fullName.length < 2) errors.push('fullName');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('email');
  if (!body.company || body.company.length < 2) errors.push('company');
  if (!body.useCase || body.useCase.length < 10) errors.push('useCase');
  if (!body.monthlyVolume) errors.push('monthlyVolume');

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: 'Missing or invalid fields', fields: errors },
      { status: 400 }
    );
  }

  const userAgent = req.headers.get('user-agent') || 'unknown';
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';

  // Persist
  const persisted = persistRecord({
    type: 'trade_application',
    fullName: body.fullName,
    email: body.email,
    company: body.company,
    website: body.website || '',
    useCase: body.useCase,
    monthlyVolume: body.monthlyVolume,
    locale: body.locale || 'en',
    appliedAt: new Date().toISOString(),
    userAgent,
    ip,
    opsNotificationSent: false,
  });

  if (!persisted) {
    return NextResponse.json({ ok: false, error: 'Persist failed' }, { status: 500 });
  }

  // Notify ops
  const opsEmail = process.env.RESEND_OPS_EMAIL;
  let opsSent = false;
  if (opsEmail) {
    opsSent = await sendResendEmail(
      opsEmail,
      `[Trade Program Application] ${body.company} (${body.email})`,
      `
        <h2>New B2B Trade Program Application</h2>
        <ul>
          <li><strong>Name:</strong> ${body.fullName}</li>
          <li><strong>Email:</strong> ${body.email}</li>
          <li><strong>Company:</strong> ${body.company}</li>
          <li><strong>Website:</strong> ${body.website || 'N/A'}</li>
          <li><strong>Use Case:</strong> ${body.useCase}</li>
          <li><strong>Monthly Volume:</strong> ${body.monthlyVolume}</li>
          <li><strong>Locale:</strong> ${body.locale || 'en'}</li>
          <li><strong>Time:</strong> ${new Date().toISOString()}</li>
          <li><strong>IP:</strong> ${ip}</li>
        </ul>
        <p>Reply within 7 business days with: 20% off trade pricing + dedicated account manager.</p>
      `
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Application submitted successfully',
    opsNotificationSent: opsSent,
    nextStep: 'Reply within 7 business days with your trade account details',
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    resendConfigured: !!process.env.RESEND_API_KEY,
    storageFile: STORAGE_FILE.replace(process.cwd(), '.'),
  });
}
