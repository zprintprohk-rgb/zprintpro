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
}

export interface CreatePaymentSessionResponse {
  clientSecret: string;
  paymentIntentId: string;
  orderId: string;
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
