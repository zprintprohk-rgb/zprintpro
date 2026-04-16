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

interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
  merchant_order_id?: string;
  description?: string;
}

interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  merchant_order_id?: string;
  description?: string;
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

async function createPaymentIntent(
  params: CreatePaymentIntentParams,
  apiKey: string
): Promise<PaymentIntentResponse> {
  const token = await getAccessToken(apiKey);

  const response = await fetch(`${AIRWALLEX_API_BASE}/pa/payment_intents/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airwallex payment intent creation failed: ${response.status} ${errorText}`);
  }

  const data: PaymentIntentResponse = await response.json();
  return data;
}

const ALLOWED_CURRENCIES = ['HKD', 'USD', 'JPY'] as const;
type AllowedCurrency = (typeof ALLOWED_CURRENCIES)[number];

function isAllowedCurrency(value: string): value is AllowedCurrency {
  return ALLOWED_CURRENCIES.includes(value as AllowedCurrency);
}

export interface Env {
  AIRWALLEX_API_KEY: string;
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
    const body: CreatePaymentIntentRequest = await context.request.json();
    const { amount, currency, merchant_order_id, description } = body;

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

    if (merchant_order_id && merchant_order_id.length > 128) {
      return new Response(
        JSON.stringify({ error: 'merchant_order_id must not exceed 128 characters.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = context.env.AIRWALLEX_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AIRWALLEX_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentIntent = await createPaymentIntent(
      { amount, currency, merchant_order_id, description },
      apiKey
    );

    return new Response(JSON.stringify(paymentIntent), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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
