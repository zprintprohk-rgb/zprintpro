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

const PAYMENT_API_URL = process.env.NEXT_PUBLIC_PAYMENT_API_URL || '/api/payment';

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
