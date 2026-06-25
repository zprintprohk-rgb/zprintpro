import { createClient } from '@supabase/supabase-js';

interface PaymentIntentResponse {
  id: string;
  request_id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
  created_at: string;
  merchant_order_id?: string;
}

interface AccessTokenResponse {
  token: string;
  expires_at: number;
}

interface CreateSessionRequest {
  quote_data: Record<string, unknown>;
  amount: number;
  currency: string;
  file_url?: string;
  /**
   * 2026-06-25 Phase 0 重构: 支付方式
   * - 'bank_transfer' (主推): 银行电汇 (DBS HK 收款账户,海外/B2B 客户)
   * - 'wechat_qr' (国内 B2B 兜底): 微信扫码,人民币结算
   * - 'alipay_qr' (国内 B2B 兜底): 支付宝扫码,人民币结算
   * - 'airwallex' (deprecated): 卡支付 — Airwallex 收单深圳主体无法开通,默认走银行电汇
   * - 'paypal' (未来): PayPal 审核通过后启用
   */
  payment_method?: 'bank_transfer' | 'wechat_qr' | 'alipay_qr' | 'airwallex' | 'paypal';
}

interface WireTransferInfo {
  bank_name: string;
  account_number: string;
  account_holder: string;
  swift_code: string;
  /** 2026-06-25: HK 本地 RTGS/CHATS 用 (跨境 SWIFT 不需要) */
  bank_code?: string;
  /** 2026-06-25: HK 本地 RTGS/CHATS 用 (跨境 SWIFT 不需要) */
  branch_code?: string;
  /** 2026-06-25: 部分国家跨境电汇必填的收款人地址 */
  recipient_address?: string;
  reference_template: string;
  snapshot_at: string;
}

const AIRWALLEX_API_BASE = 'https://api.airwallex.com/api/v1';
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(apiKey: string): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry - 60000) {
    return cachedToken;
  }
  const credentials = btoa(`${apiKey}:`);
  const response = await fetch(`${AIRWALLEX_API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airwallex auth failed: ${response.status} ${errorText}`);
  }
  const data: AccessTokenResponse = await response.json();
  cachedToken = data.token;
  tokenExpiry = data.expires_at || Date.now() + 1800000;
  return cachedToken;
}

async function createAirwallexPaymentIntent(
  params: {
    amount: number;
    currency: string;
    merchant_order_id: string;
    description?: string;
  },
  apiKey: string
): Promise<PaymentIntentResponse> {
  const token = await getAccessToken(apiKey);
  const response = await fetch(`${AIRWALLEX_API_BASE}/pa/payment_intents/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      merchant_order_id: params.merchant_order_id,
      request_id: params.merchant_order_id,
      description: params.description,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airwallex payment intent creation failed: ${response.status} ${errorText}`);
  }
  return response.json() as Promise<PaymentIntentResponse>;
}

const ALLOWED_CURRENCIES = ['HKD', 'USD', 'JPY'] as const;
type AllowedCurrency = (typeof ALLOWED_CURRENCIES)[number];

function isAllowedCurrency(value: string): value is AllowedCurrency {
  return ALLOWED_CURRENCIES.includes(value as AllowedCurrency);
}

export interface Env {
  AIRWALLEX_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  // 2026-06-25: 银行转账收款账户信息 (DBS HK Airwallex 激活)
  NEXT_PUBLIC_BANK_NAME?: string;
  NEXT_PUBLIC_BANK_ACCOUNT?: string;
  NEXT_PUBLIC_BANK_ACCOUNT_HOLDER?: string;
  NEXT_PUBLIC_BANK_SWIFT?: string;
  // 2026-06-25: HK 本地 RTGS 用 (跨境 SWIFT 不需要,可选)
  NEXT_PUBLIC_BANK_CODE?: string;
  NEXT_PUBLIC_BANK_BRANCH?: string;
  // 2026-06-25: 部分国家跨境电汇必填的收款人地址 (可选,但建议填)
  NEXT_PUBLIC_BANK_RECIPIENT_ADDRESS?: string;
}

/**
 * 2026-06-25: 从 env 读取银行转账账户信息
 *
 * 必填: NAME / ACCOUNT / HOLDER / SWIFT (跨境 SWIFT 电汇核心 4 项)
 * 可选: CODE / BRANCH (HK 本地 RTGS 用) / ADDRESS (部分国家电汇必填)
 *
 * 缺失必填项抛错,缺失可选项仅留空 (后台存但 UI 不显示)
 */
function getWireTransferInfo(env: Env): WireTransferInfo {
  const {
    NEXT_PUBLIC_BANK_NAME,
    NEXT_PUBLIC_BANK_ACCOUNT,
    NEXT_PUBLIC_BANK_ACCOUNT_HOLDER,
    NEXT_PUBLIC_BANK_SWIFT,
    NEXT_PUBLIC_BANK_CODE,
    NEXT_PUBLIC_BANK_BRANCH,
    NEXT_PUBLIC_BANK_RECIPIENT_ADDRESS,
  } = env;
  if (!NEXT_PUBLIC_BANK_NAME || !NEXT_PUBLIC_BANK_ACCOUNT || !NEXT_PUBLIC_BANK_ACCOUNT_HOLDER || !NEXT_PUBLIC_BANK_SWIFT) {
    throw new Error(
      'Wire transfer env not fully configured. Required: NEXT_PUBLIC_BANK_NAME, NEXT_PUBLIC_BANK_ACCOUNT, NEXT_PUBLIC_BANK_ACCOUNT_HOLDER, NEXT_PUBLIC_BANK_SWIFT'
    );
  }
  return {
    bank_name: NEXT_PUBLIC_BANK_NAME,
    account_number: NEXT_PUBLIC_BANK_ACCOUNT,
    account_holder: NEXT_PUBLIC_BANK_ACCOUNT_HOLDER,
    swift_code: NEXT_PUBLIC_BANK_SWIFT,
    bank_code: NEXT_PUBLIC_BANK_CODE,
    branch_code: NEXT_PUBLIC_BANK_BRANCH,
    recipient_address: NEXT_PUBLIC_BANK_RECIPIENT_ADDRESS,
    reference_template: 'ZP-ORDER-{order_number}',
    snapshot_at: new Date().toISOString(),
  };
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const origin = context.request.headers.get('Origin') || '*';
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body: CreateSessionRequest = await context.request.json();
    // 2026-06-25: 默认改 'bank_transfer' (Airwallex 卡支付通道下线)
    const { quote_data, amount, currency, file_url, payment_method = 'bank_transfer' } = body;

    if (typeof amount !== 'number' || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount. Must be a number greater than 0.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof currency !== 'string' || !isAllowedCurrency(currency)) {
      return new Response(
        JSON.stringify({ error: `Invalid currency. Must be one of: ${ALLOWED_CURRENCIES.join(', ')}.` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const VALID_METHODS = ['bank_transfer', 'wechat_qr', 'alipay_qr', 'airwallex', 'paypal'] as const;
    if (!(VALID_METHODS as readonly string[]).includes(payment_method)) {
      return new Response(
        JSON.stringify({ error: `Invalid payment_method. Must be one of: ${VALID_METHODS.join(', ')}.` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = context.env.SUPABASE_URL;
    const supabaseServiceKey = context.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Supabase environment variables are not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const orderId = crypto.randomUUID();

    // ============================================================
    // 2026-06-25 Phase 0: 微信/支付宝 QR 分支 (国内 B2B 客户,人民币结算)
    //   流程: 落库 + 返回 orderId,前端跳 OrderConfirmation 显示 QR 码
    //   支付确认: 客户扫码后支付宝/微信回调 → 客服后台人工对账 (暂不接自动回调)
    // ============================================================
    if (payment_method === 'wechat_qr' || payment_method === 'alipay_qr') {
      // QR 支付走人民币,前端应根据 paymentMethod 在 UI 上提示客户扫码
      const { error: insertError } = await supabase.from('orders').insert({
        id: orderId,
        quote_data: quote_data,
        file_url: file_url || null,
        amount,
        currency: 'CNY', // QR 支付强制 CNY 结算 (无换汇)
        status: 'pending',
        payment_status: 'pending',
        payment_method: payment_method,
        airwallex_payment_intent_id: null,
      });

      if (insertError) {
        throw new Error(`Failed to create QR order: ${insertError.message}`);
      }

      return new Response(
        JSON.stringify({
          clientSecret: null,
          paymentIntentId: null,
          orderId,
          paymentMethod: payment_method,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ============================================================
    // 2026-06-25: 银行转账分支 (不调 Airwallex,落库即返回)
    // ============================================================
    if (payment_method === 'bank_transfer') {
      let wireTransferInfo: WireTransferInfo;
      try {
        wireTransferInfo = getWireTransferInfo(context.env);
      } catch (e) {
        return new Response(
          JSON.stringify({ error: e instanceof Error ? e.message : 'Wire transfer env not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error: insertError } = await supabase.from('orders').insert({
        id: orderId,
        quote_data: quote_data,
        file_url: file_url || null,
        amount,
        currency,
        status: 'pending',
        payment_status: 'awaiting_wire_transfer',
        payment_method: 'bank_transfer',
        wire_transfer_info: wireTransferInfo,
      });

      if (insertError) {
        throw new Error(`Failed to create bank transfer order: ${insertError.message}`);
      }

      return new Response(
        JSON.stringify({
          clientSecret: null,
          paymentIntentId: null,
          orderId,
          paymentMethod: 'bank_transfer',
          wireTransferInfo,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ============================================================
    // 默认分支: Airwallex 卡支付 (原有逻辑)
    // ============================================================
    const apiKey = context.env.AIRWALLEX_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AIRWALLEX_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { error: insertError } = await supabase.from('orders').insert({
      id: orderId,
      quote_data: quote_data,
      file_url: file_url || null,
      amount,
      currency,
      status: 'pending',
      payment_status: 'pending',
      payment_method: 'airwallex',
      airwallex_payment_intent_id: null,
    });

    if (insertError) {
      throw new Error(`Failed to create order: ${insertError.message}`);
    }

    const paymentIntent = await createAirwallexPaymentIntent(
      {
        amount,
        currency,
        merchant_order_id: orderId,
        description: 'ZPrintPro Order',
      },
      apiKey
    );

    await supabase
      .from('orders')
      .update({
        airwallex_payment_intent_id: paymentIntent.id,
        quote_data: {
          ...quote_data,
          _airwallex: {
            client_secret: paymentIntent.client_secret,
            payment_intent_id: paymentIntent.id,
            created_at: paymentIntent.created_at,
          },
        },
      })
      .eq('id', orderId);

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        orderId,
        paymentMethod: 'airwallex',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: message }), {
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
