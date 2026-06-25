import { createClient } from '@supabase/supabase-js';

/**
 * 2026-06-25 Phase 0: 订单确认邮件 endpoint
 *
 * 触发场景:
 *   - checkout 完成后 (前端可主动调)
 *   - 银行转账订单的客服手动重发 (附 bank account info)
 *
 * Request body: { orderId: string, locale: 'zh-hk' | 'en' | 'ja' }
 *
 * 邮件内容根据 orders.payment_method 分支:
 *   - 'bank_transfer': 附 DBS HK 银行账户 + 订单参考号 + 客服 1 工作日确认 (主流程)
 *   - 'wechat_qr' / 'alipay_qr': 简短确认 + 微信/支付宝已支付 + 客服 1 工作日确认
 *   - 'airwallex' (deprecated): 降级为银行电汇邮件,不再走信用卡支付
 */

interface Env {
  RESEND_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

interface OrderRecord {
  id: string;
  order_number: string | null;
  status: string;
  payment_method: string | null;
  payment_status: string | null;
  amount: number;
  currency: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  wire_transfer_info: {
    bank_name: string;
    account_number: string;
    account_holder: string;
    swift_code: string;
    bank_code?: string;
    branch_code?: string;
    recipient_address?: string;
    reference_template: string;
    snapshot_at: string;
  } | null;
  created_at: string;
}

const ALLOWED_LOCALES = ['zh-hk', 'en', 'ja'] as const;
type AllowedLocale = (typeof ALLOWED_LOCALES)[number];

interface MailLabels {
  subject: string;
  greeting: (name: string) => string;
  intro: string;
  orderNumber: string;
  totalAmount: string;
  amount: (currency: string, value: string) => string;
  paymentMethod: string;
  // 2026-06-25: 移除 airwallexNotice 字段,所有非银行转账订单 (wechat_qr / alipay_qr / 历史 airwallex) 都走简化邮件
  /** @deprecated 不再发送 */
  airwallexNotice?: string;
  // QR 支付 (微信/支付宝国内客户)
  qrPaidNotice: string;
  // bank transfer
  bankTitle: string;
  bankSubtitle: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    swiftCode: string;
    recipientAddress: string;
    reference: string;
    bankNotice: string;
  contactCta: string;
  signature: string;
}

const labels: Record<AllowedLocale, MailLabels> = {
  'zh-hk': {
    subject: '訂單確認 - ZprintPro',
    greeting: (name) => `${name} 您好，`,
    intro: '感謝您於 ZprintPro 下單！我們已收到您的訂單，以下是訂單詳情。',
    orderNumber: '訂單編號',
    totalAmount: '應付總額',
    amount: (currency, value) => `${currency} $${value}`,
    paymentMethod: '付款方式',
    airwallexNotice: '(deprecated — 不再使用)',
    qrPaidNotice: '我們已收到您的微信支付訂單通知。請將支付截圖電郵至 zprintpro@outlook.com 以便對賬。客服將於 1 個工作天內確認收款並開始處理訂單。',
    bankTitle: '銀行電匯收款信息',
    bankSubtitle: '請於 7 個工作天內完成電匯，並將水單電郵至 zprintpro@outlook.com',
    bankName: '收款銀行',
    accountNumber: '銀行賬號',
    accountHolder: '賬戶名稱',
    swiftCode: 'SWIFT 代碼',
    recipientAddress: '收款人地址',
    reference: '匯款備註',
    bankNotice: '⚠️ 請務必填寫匯款備註（訂單編號），否則無法對賬。客服將於 1 個工作天內確認收款。',
    contactCta: '如有疑問，請聯絡客服',
    signature: 'ZprintPro 智印雲 敬上',
  },
  en: {
    subject: 'Order Confirmation - ZprintPro',
    greeting: (name) => `Hi ${name},`,
    intro: 'Thank you for your order at ZprintPro! We have received your order. Below are the details.',
    orderNumber: 'Order Number',
    totalAmount: 'Total Amount',
    amount: (currency, value) => `${currency} $${value}`,
    paymentMethod: 'Payment Method',
    airwallexNotice: '(deprecated — no longer used)',
    qrPaidNotice: 'We have received your WeChat Pay order notification. Please email the payment screenshot to zprintpro@outlook.com for reconciliation. Our team will confirm receipt and start processing your order within 1 business day.',
    bankTitle: 'Bank Wire Transfer Information',
    bankSubtitle: 'Please complete the wire transfer within 7 business days and email the receipt to zprintpro@outlook.com',
    bankName: 'Receiving Bank',
    accountNumber: 'Account Number',
    accountHolder: 'Account Holder',
    swiftCode: 'SWIFT Code',
    recipientAddress: 'Recipient Address',
    reference: 'Payment Reference',
    bankNotice: '⚠️ Must include the payment reference (order number) — otherwise we cannot match your payment. Our team will confirm receipt within 1 business day.',
    contactCta: 'Questions? Contact customer service',
    signature: 'Best regards, ZprintPro Team',
  },
  ja: {
    subject: '注文確認 - ZprintPro',
    greeting: (name) => `${name} 様`,
    intro: 'ZprintPro をご利用いただき、誠にありがとうございます。ご注文を承りました。',
    orderNumber: '注文番号',
    totalAmount: 'お支払金額',
    amount: (currency, value) => `${currency} $${value}`,
    paymentMethod: 'お支払方法',
    airwallexNotice: '(deprecated — 廃止)',
    qrPaidNotice: '微信支付のご注文通知を受領いたしました。照合のため、お支払いスクリーンショットを zprintpro@outlook.com までお送りください。担当者が1営業日以内に確認し、注文処理を開始いたします。',
    bankTitle: '銀行振込先情報',
    bankSubtitle: '7営業日以内に振込を完了し、振込控えを zprintpro@outlook.com までお送りください',
    bankName: '受取銀行',
    accountNumber: '銀行口座番号',
    accountHolder: '口座名義',
    swiftCode: 'SWIFTコード',
    recipientAddress: '受取人住所',
    reference: '振込備考',
    bankNotice: '⚠️ 振込備考（注文番号）を必ずご記入ください — 入金照合に必要です。担当者が1営業日以内に確認いたします。',
    contactCta: 'ご質問があればカスタマーサービスまで',
    signature: 'ZprintPro 智印雲',
  },
};

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatAmount(amountInSmallestUnit: number, currency: string): string {
  // JPY 无小数位, 其他币种 ÷100
  const value = currency === 'JPY' ? amountInSmallestUnit : amountInSmallestUnit / 100;
  return value.toFixed(currency === 'JPY' ? 0 : 2);
}

function buildQrEmail(order: OrderRecord, l: MailLabels, method: 'wechat_qr' | 'alipay_qr'): string {
  const name = escapeHtml(order.customer_name || 'Customer');
  const orderNumber = escapeHtml(order.order_number || order.id);
  const currency = escapeHtml(order.currency);
  const amount = formatAmount(order.amount, order.currency);
  const methodLabel = method === 'wechat_qr' ? (l as any).wechat || 'WeChat Pay' : (l as any).alipay || 'Alipay';
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:linear-gradient(135deg,#2873F5,#1E5FD1);padding:24px;border-radius:12px 12px 0 0;color:white">
        <h2 style="margin:0;font-size:20px">${l.subject}</h2>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <p>${l.greeting(name)}</p>
        <p>${l.intro}</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px;margin:16px 0">
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px 0;color:#6b7280">${l.orderNumber}</td><td style="padding:8px 0;font-family:monospace;font-weight:bold">${orderNumber}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px 0;color:#6b7280">${l.paymentMethod}</td><td style="padding:8px 0">${escapeHtml(methodLabel)} (QR)</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">${l.totalAmount}</td><td style="padding:8px 0;font-weight:bold;color:#F87314">${l.amount(currency, amount)}</td></tr>
        </table>
        <div style="margin-top:16px;padding:12px;background:#FEF3C7;border-radius:8px;border:1px solid #FCD34D">
          <p style="margin:0;font-size:14px;color:#78350F">${l.qrPaidNotice}</p>
        </div>
        <p style="margin-top:24px;font-size:14px;color:#6b7280">${l.contactCta}: <a href="mailto:zprintpro@outlook.com" style="color:#2873F5">zprintpro@outlook.com</a> | <a href="tel:+8619880851334" style="color:#2873F5">+86 198 8085 1334</a></p>
        <p style="margin-top:24px;font-size:14px">${l.signature}</p>
      </div>
    </div>
  `;
}

/**
 * 2026-06-25: Airwallex 卡支付通道下线后,此函数保留为通用"占位"邮件,
 *   实际不会再发送 (因为 payment_method !== 'bank_transfer' && !== 'qr' 的订单不会出现)。
 *   保留代码以防历史订单追溯。
 */
function buildAirwallexEmail(order: OrderRecord, l: MailLabels): string {
  const name = escapeHtml(order.customer_name || 'Customer');
  const orderNumber = escapeHtml(order.order_number || order.id);
  const currency = escapeHtml(order.currency);
  const amount = formatAmount(order.amount, order.currency);
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:linear-gradient(135deg,#2873F5,#1E5FD1);padding:24px;border-radius:12px 12px 0 0;color:white">
        <h2 style="margin:0;font-size:20px">${l.subject}</h2>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <p>${l.greeting(name)}</p>
        <p>${l.intro}</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px;margin:16px 0">
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px 0;color:#6b7280">${l.orderNumber}</td><td style="padding:8px 0;font-family:monospace;font-weight:bold">${orderNumber}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px 0;color:#6b7280">${l.paymentMethod}</td><td style="padding:8px 0">${escapeHtml((l as any).paymentMethodLegacy || 'Pending verification')}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">${l.totalAmount}</td><td style="padding:8px 0;font-weight:bold;color:#F87314">${l.amount(currency, amount)}</td></tr>
        </table>
        <p style="margin-top:24px;font-size:14px;color:#6b7280">${l.contactCta}: <a href="mailto:zprintpro@outlook.com" style="color:#2873F5">zprintpro@outlook.com</a> | <a href="tel:+8619880851334" style="color:#2873F5">+86 198 8085 1334</a></p>
        <p style="margin-top:24px;font-size:14px">${l.signature}</p>
      </div>
    </div>
  `;
}

function buildBankTransferEmail(order: OrderRecord, l: MailLabels): string {
  const name = escapeHtml(order.customer_name || 'Customer');
  const orderNumber = escapeHtml(order.order_number || order.id);
  const currency = escapeHtml(order.currency);
  const amount = formatAmount(order.amount, order.currency);
  const w = order.wire_transfer_info;
  if (!w) {
    // Defensive: 如果订单标记 bank_transfer 但没有账户信息,fallback 到简化邮件
    return buildAirwallexEmail(order, l);
  }
  const reference = w.reference_template.replace('{order_number}', orderNumber);
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:linear-gradient(135deg,#2873F5,#1E5FD1);padding:24px;border-radius:12px 12px 0 0;color:white">
        <h2 style="margin:0;font-size:20px">${l.subject}</h2>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <p>${l.greeting(name)}</p>
        <p>${l.intro}</p>

        <table style="width:100%;border-collapse:collapse;font-size:15px;margin:16px 0">
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px 0;color:#6b7280">${l.orderNumber}</td><td style="padding:8px 0;font-family:monospace;font-weight:bold">${orderNumber}</td></tr>
          <tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px 0;color:#6b7280">${l.paymentMethod}</td><td style="padding:8px 0">Bank Wire Transfer</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">${l.totalAmount}</td><td style="padding:8px 0;font-weight:bold;color:#F87314">${l.amount(currency, amount)}</td></tr>
        </table>

        <div style="margin-top:16px;padding:16px;background:#F0F9FF;border-radius:8px;border:2px solid #2873F5">
          <h3 style="margin:0 0 8px;font-size:16px;color:#1E5FD1">${l.bankTitle}</h3>
          <p style="margin:0 0 12px;font-size:13px;color:#475569">${l.bankSubtitle}</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:4px 0;color:#6b7280;width:140px">${l.bankName}</td><td style="padding:4px 0;font-weight:500">${escapeHtml(w.bank_name)}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280">${l.accountNumber}</td><td style="padding:4px 0;font-family:monospace;font-weight:bold;letter-spacing:0.5px">${escapeHtml(w.account_number)}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280">${l.accountHolder}</td><td style="padding:4px 0;font-family:monospace;font-weight:500">${escapeHtml(w.account_holder)}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280">${l.swiftCode}</td><td style="padding:4px 0;font-family:monospace;font-weight:bold">${escapeHtml(w.swift_code)}</td></tr>
            ${w.recipient_address ? `<tr><td style="padding:4px 0;color:#6b7280">${l.recipientAddress}</td><td style="padding:4px 0;font-size:13px">${escapeHtml(w.recipient_address)}</td></tr>` : ''}
          </table>
          <div style="margin-top:12px;padding:10px;background:#FEF3C7;border-radius:6px;border:1px solid #FCD34D">
            <p style="margin:0;font-size:13px;color:#78350F"><strong>${l.reference}:</strong> <code style="font-family:monospace;background:#fff;padding:2px 6px;border-radius:4px">${escapeHtml(reference)}</code></p>
            <p style="margin:6px 0 0;font-size:12px;color:#92400E">${l.bankNotice}</p>
          </div>
        </div>

        <p style="margin-top:24px;font-size:14px;color:#6b7280">${l.contactCta}: <a href="mailto:zprintpro@outlook.com" style="color:#2873F5">zprintpro@outlook.com</a> | <a href="tel:+8619880851334" style="color:#2873F5">+86 198 8085 1334</a></p>
        <p style="margin-top:24px;font-size:14px">${l.signature}</p>
      </div>
    </div>
  `;
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = (await context.request.json()) as { orderId?: string; locale?: string };
    const { orderId, locale } = body;

    if (!orderId) {
      return new Response(
        JSON.stringify({ success: false, error: 'orderId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const normalizedLocale = (ALLOWED_LOCALES as readonly string[]).includes(locale || '')
      ? (locale as AllowedLocale)
      : 'en';

    const supabaseUrl = context.env.SUPABASE_URL;
    const supabaseServiceKey = context.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = context.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseServiceKey || !resendKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required env (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / RESEND_API_KEY)' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: order, error } = await supabase
      .from('orders')
      .select('id, order_number, status, payment_method, payment_status, amount, currency, customer_name, customer_email, customer_phone, wire_transfer_info, created_at')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return new Response(
        JSON.stringify({ success: false, error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!order.customer_email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Order has no customer_email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const labelsForLocale = labels[normalizedLocale];
    let html: string;
    if (order.payment_method === 'bank_transfer') {
      html = buildBankTransferEmail(order, labelsForLocale);
    } else if (order.payment_method === 'wechat_qr' || order.payment_method === 'alipay_qr') {
      html = buildQrEmail(order, labelsForLocale, order.payment_method);
    } else {
      // 历史 airwallex 订单 / 未知 payment_method → 降级为简化邮件
      html = buildAirwallexEmail(order, labelsForLocale);
    }

    const resendBody = {
      from: 'ZprintPro <noreply@zprintpro.com>',
      to: order.customer_email,
      cc: 'zprintpro@outlook.com', // 客服抄送,便于对账
      subject: labelsForLocale.subject,
      html,
    };

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendBody),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
