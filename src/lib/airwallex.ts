export interface PaymentIntentResponse {
  id: string;
  request_id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
  created_at: string;
  merchant_order_id?: string;
}

export interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
  merchant_order_id?: string;
  description?: string;
}

export interface CreatePaymentSessionParams {
  quote_data: Record<string, unknown>;
  amount: number;
  currency: string;
  file_url?: string;
  /**
   * 2026-06-25: 支付方式
   * - 'airwallex' (默认): Airwallex 卡支付 Drop-in
   * - 'bank_transfer': 银行电汇 (DBS HK Airwallex 收款账户)
   */
  payment_method?: 'airwallex' | 'bank_transfer';
}

/**
 * 2026-06-25: 银行转账 / 电汇收款信息
 * 来源: 后端 create-payment-session.ts bank_transfer 分支
 *
 * 跨境 SWIFT 电汇必填: bank_name / account_number / account_holder / swift_code
 * HK 本地 RTGS 用:     bank_code / branch_code (跨境 SWIFT 不需要,UI 不显示但后台存)
 * 部分国家电汇必填:    recipient_address
 */
export interface WireTransferInfo {
  bank_name: string;
  account_number: string;
  account_holder: string;
  swift_code: string;
  bank_code?: string;
  branch_code?: string;
  recipient_address?: string;
  reference_template: string;
  snapshot_at: string;
}

export interface CreatePaymentSessionResponse {
  /** Airwallex 卡支付: payment intent client secret | 银行转账: null */
  clientSecret: string | null;
  /** Airwallex 卡支付: payment intent id | 银行转账: null */
  paymentIntentId: string | null;
  orderId: string;
  /** 实际选择的支付方式 (后端回传,前端用来路由) */
  paymentMethod: 'airwallex' | 'bank_transfer';
  /** 仅银行转账时有值 */
  wireTransferInfo?: WireTransferInfo;
}

const PAYMENT_API_URL = process.env.NEXT_PUBLIC_PAYMENT_API_URL || '/api/payment';
const PAYMENT_SESSION_API_URL =
  process.env.NEXT_PUBLIC_PAYMENT_SESSION_API_URL || '/api/create-payment-session';

export async function createPaymentIntent(
  params: CreatePaymentIntentParams
): Promise<PaymentIntentResponse> {
  const response = await fetch(PAYMENT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Payment intent creation failed: ${response.status} ${errorText}`);
  }

  const data: PaymentIntentResponse = await response.json();
  return data;
}

export async function createPaymentSession(
  params: CreatePaymentSessionParams
): Promise<CreatePaymentSessionResponse> {
  const response = await fetch(PAYMENT_SESSION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Payment session creation failed: ${response.status} ${errorText}`);
  }

  const data: CreatePaymentSessionResponse = await response.json();
  return data;
}
