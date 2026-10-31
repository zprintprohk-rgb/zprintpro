/**
 * POST /api/create-payment-session — 创建订单 + 返回支付指引
 *
 * 2026-11-01 新建（根因修复）:
 *   原实现只存在于 functions/api/create-payment-session.ts（Cloudflare Pages 旧式 Functions）。
 *   本站改用 @opennextjs/cloudflare 构建后，functions/ 目录**不进构建产物** →
 *   线上 POST /api/create-payment-session 恒 404 → 结算页提交必失败 →
 *   GMC「用户无法完成购买交易」(79 商品未获批准) 的直接技术根因。
 *   本文件把同一业务逻辑移植为 Next.js App Router Route Handler（edge runtime）。
 *
 * 设计原则（客户可见路径不依赖 DB）:
 *   1. 银行电汇账户信息由本路由直接返回（env 优先，缺省用 migration 006 登记的真实 DBS 账户）；
 *   2. orders 落库为 best-effort（双 schema 自适应：001 主 schema → 旧 v2 列 → 均失败不阻断）；
 *   3. 无论落库成败，均触发 /api/order-notify 邮件，保证订单不丢；
 *   4. 永不因配置缺失返回 5xx 卡死客户（配置缺失时降级为「客服将发送付款指示」）。
 *
 * 支付方式（K3 2026-06-25 Phase 0 口径）:
 *   bank_transfer 主推（DBS HK 收款）· wechat_qr / alipay_qr 国内兜底（CNY 结算）
 *   airwallex 卡支付已下线（深圳主体无法开通）· paypal 审核中
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const SITE_URL = 'https://zprintpro.com';

const ALLOWED_CURRENCIES = ['HKD', 'USD', 'JPY', 'CNY'] as const;
const VALID_METHODS = ['bank_transfer', 'wechat_qr', 'alipay_qr'] as const;
type PaymentMethod = (typeof VALID_METHODS)[number];

interface WireTransferInfo {
  bank_name: string;
  account_number: string;
  account_holder: string;
  swift_code: string;
  bank_code?: string;
  branch_code?: string;
  reference_template: string;
  snapshot_at: string;
}

/**
 * 真实收款账户（来源: supabase/migrations/006_bank_transfer_payment.sql 字段示例，
 * 为彩龙印刷 DBS HK 实户）。env 提供 NEXT_PUBLIC_BANK_* 时以 env 为准。
 * 注: 收款人地址在迁移里是占位符 (Room XXX)，不采用，避免对外披露错误地址。
 */
const DEFAULT_WIRE: Omit<WireTransferInfo, 'reference_template' | 'snapshot_at'> = {
  bank_name: 'DBS Bank (Hong Kong) Limited',
  account_number: '7949835442',
  account_holder: 'SHEN ZHEN SHI CAI LONG YIN SHUA BAO ZHUANG YOU XIAN GONG SI',
  swift_code: 'DHBKHKHH',
  bank_code: '016',
  branch_code: '478',
};

/**
 * 2026-11-01 修正: Pages 的 Secret 类型变量（如 SUPABASE_SERVICE_ROLE_KEY）是**运行时绑定**，
 * 在 @cloudflare/next-on-pages 下不保证出现在 process.env（process.env 仅确保有构建时内联的 NEXT_PUBLIC_*）。
 * 官方通道 = getOptionalRequestContext().env。两路合并，前者优先。
 */
interface RuntimeEnvResult {
  env: Record<string, string | undefined>;
  diag: {
    /** 运行时实际可见的 SUPABASE/SERVICE/RESEND/STRIPE 变量名（只报名，不报值） */
    processEnvCandidates: string[];
    processEnvKeyCount: number;
    /** NODE_ENV 供确认跑在 production 上 */
    nodeEnv: string | null;
  };
}

/**
 * 2026-11-01: 环境读取 + 自诊断。
 * 不再尝试导入 @cloudflare/next-on-pages/api（该子路径无类型且可能拉入 Node 内置，构建风险大于收益）；
 * 先由 process.env 读，再用 diag 报告«运行时到底能看到哪些变量名»——用以区分三种情况：
 *   a) 名存在但拼写不同 → 看 candidates
 *   b) 名不存在 → Secret 可能只设到 Preview 环境，或未触发新部署
 *   c) 存在但取不到值 → 需改走绑定通道
 */
async function getRuntimeEnv(): Promise<RuntimeEnvResult> {
  const bag: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(process.env)) {
    if (typeof v === 'string') bag[k] = v;
  }
  return {
    env: bag,
    diag: {
      processEnvCandidates: Object.keys(process.env).filter((k) =>
        /SUPABASE|SERVICE|RESEND|STRIPE/i.test(k)
      ),
      processEnvKeyCount: Object.keys(process.env).length,
      nodeEnv: process.env.NODE_ENV ?? null,
    },
  };
}

function buildWireTransferInfo(env: Record<string, string | undefined>): WireTransferInfo {
  return {
    bank_name: env.NEXT_PUBLIC_BANK_NAME || DEFAULT_WIRE.bank_name,
    account_number: env.NEXT_PUBLIC_BANK_ACCOUNT || DEFAULT_WIRE.account_number,
    account_holder: env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER || DEFAULT_WIRE.account_holder,
    swift_code: env.NEXT_PUBLIC_BANK_SWIFT || DEFAULT_WIRE.swift_code,
    bank_code: env.NEXT_PUBLIC_BANK_CODE || DEFAULT_WIRE.bank_code,
    branch_code: env.NEXT_PUBLIC_BANK_BRANCH || DEFAULT_WIRE.branch_code,
    ...(env.NEXT_PUBLIC_BANK_RECIPIENT_ADDRESS
      ? { recipient_address: env.NEXT_PUBLIC_BANK_RECIPIENT_ADDRESS }
      : {}),
    reference_template: 'ZP-ORDER-{order_number}',
    snapshot_at: new Date().toISOString(),
  } as WireTransferInfo;
}

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin || SITE_URL,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function makeOrderNumber(): string {
  // 与 001 迁移 trigger 同格式: ZP + YYYYMMDD + '-' + 4 位随机
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const rnd = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `ZP${ymd}-${rnd}`;
}

/** 双 schema 自适应落库：先 001 主 schema，失败再试旧 v2 列；返回实际生效的 schema 名或错误 */
async function persistOrder(
  row: Record<string, unknown>,
  legacyRow: Record<string, unknown>,
  env: Record<string, string | undefined>
): Promise<{ ok: boolean; schema?: string; error?: string }> {
  const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KE || env.SUPABASE_SERVICE_KEY;
  if (!url || !serviceKey) {
    return { ok: false, error: 'supabase_service_role_not_configured' };
  }

  const post = async (body: Record<string, unknown>, label: string) => {
    const res = await fetch(`${url}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true, schema: label };
    const text = await res.text();
    return { ok: false, schema: label, error: text.slice(0, 300) };
  };

  const primary = await post(row, 'orders_v1');
  if (primary.ok) return primary;
  const legacy = await post(legacyRow, 'orders_legacy_v2');
  if (legacy.ok) return legacy;
  return { ok: false, error: `${primary.error} | ${legacy.error}` };
}

export async function POST(request: NextRequest) {
  const cors = corsHeaders(request.headers.get('origin'));
  const { env, diag: runtimeDiag } = await getRuntimeEnv();

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers: cors });
  }

  const {
    quote_data: quoteData = {},
    amount,
    currency,
    payment_method: rawMethod = 'bank_transfer',
    file_url: fileUrl,
  } = body || {};

  if (typeof amount !== 'number' || !(amount > 0)) {
    return NextResponse.json(
      { error: 'Invalid amount. Must be a number greater than 0.' },
      { status: 400, headers: cors }
    );
  }
  if (typeof currency !== 'string' || !(ALLOWED_CURRENCIES as readonly string[]).includes(currency)) {
    return NextResponse.json(
      { error: `Invalid currency. Must be one of: ${ALLOWED_CURRENCIES.join(', ')}.` },
      { status: 400, headers: cors }
    );
  }

  // airwallex / paypal 已下线：一律降级到银行电汇，避免客户卡死
  const paymentMethod: PaymentMethod = (VALID_METHODS as readonly string[]).includes(rawMethod)
    ? (rawMethod as PaymentMethod)
    : 'bank_transfer';

  // 客户可见币种: QR 走 CNY 结算（无换汇），其余按下单币种
  const settleCurrency = paymentMethod === 'bank_transfer' ? currency : 'CNY';

  const orderId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const orderNumber = makeOrderNumber();

  const items = Array.isArray(quoteData.items) ? quoteData.items : [];
  const contact = quoteData.contact || {};
  // amount 为最小单位（HKD/USD 分, JPY/CNY 整数元）→ 主单位
  const amountMajor = currency === 'JPY' || currency === 'CNY' ? amount : amount / 100;

  const wireTransferInfo = paymentMethod === 'bank_transfer' ? buildWireTransferInfo(env) : undefined;

  // ── 落库（best-effort，永不阻断客户） ──────────────────────────────
  const primaryRow: Record<string, unknown> = {
    id: orderId,
    order_number: orderNumber,
    customer_name: contact.name || '',
    customer_email: contact.email || '',
    customer_phone: contact.phone || null,
    shipping_address: contact.address || null,
    items,
    subtotal: amountMajor,
    total_amount: amountMajor,
    status: 'pending',
    payment_status: paymentMethod === 'bank_transfer' ? 'awaiting_wire_transfer' : 'pending',
    payment_method: paymentMethod,
    customer_notes: JSON.stringify({
      currency: settleCurrency,
      display_currency: currency,
      amount_minor: amount,
      locale: quoteData.locale || null,
      file_url: fileUrl || null,
      source: 'web_checkout',
    }),
    ...(wireTransferInfo ? { wire_transfer_info: wireTransferInfo } : {}),
  };
  const legacyRow: Record<string, unknown> = {
    id: orderId,
    quote_data: quoteData,
    file_url: fileUrl || null,
    amount,
    currency: settleCurrency,
    status: 'pending',
    payment_status: paymentMethod === 'bank_transfer' ? 'awaiting_wire_transfer' : 'pending',
    payment_method: paymentMethod,
    ...(wireTransferInfo ? { wire_transfer_info: wireTransferInfo } : {}),
  };

  let persist: { ok: boolean; schema?: string; error?: string };
  try {
    persist = await persistOrder(primaryRow, legacyRow, env);
  } catch (e) {
    persist = { ok: false, error: e instanceof Error ? e.message : 'persist_failed' };
  }

  // 2026-11-01 自诊断: 只报“变量名是否存在” (不泄值), 供上线核对 Secret 是否真的进了运行时绑定
  const envDiag = {
    supabaseUrl: Boolean(env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRoleKey: Boolean(
      env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KE || env.SUPABASE_SERVICE_KEY
    ),
    serviceRoleCandidates: Object.keys(env).filter((k) => /SERVICE_ROLE/i.test(k)),
    runtimeBindingSource: env.SUPABASE_SERVICE_ROLE_KEY ? 'binding_or_process' : 'absent',
    ...runtimeDiag,
  };

  // ── 订单通知邮件（best-effort，5s 上限，失败不影响下单） ────────────
  try {
    await fetch(`${SITE_URL}/api/order-notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        orderNumber,
        paymentMethod,
        amountMinor: amount,
        amountMajor,
        currency: settleCurrency,
        displayCurrency: currency,
        contact,
        items: items.map((i: any) => ({
          sku: i.sku_code,
          name: i.name || i.nameEn || i.nameJa,
          qty: i.quantity,
          unitPrice: i.unitPrice,
        })),
        persisted: persist.ok,
        persistSchema: persist.schema || null,
        locale: quoteData.locale || null,
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    /* 通知失败不阻断下单 */
  }

  return NextResponse.json(
    {
      clientSecret: null,
      paymentIntentId: null,
      orderId,
      orderNumber,
      paymentMethod,
      currency: currency,
      amountMajor,
      ...(wireTransferInfo ? { wireTransferInfo } : {}),
      persisted: persist.ok,
      envDiag,
      ...(persist.ok ? {} : { persistError: persist.error }),
    },
    { status: 200, headers: cors }
  );
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
}
