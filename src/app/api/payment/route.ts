import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

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

function corsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get('Origin');
  const headers = corsHeaders(origin);

  try {
    const body: CreatePaymentIntentRequest = await request.json();
    const { amount, currency, merchant_order_id, description } = body;

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be a number greater than 0.' },
        { status: 400, headers }
      );
    }

    if (typeof currency !== 'string' || !isAllowedCurrency(currency)) {
      return NextResponse.json(
        { error: `Invalid currency. Must be one of: ${ALLOWED_CURRENCIES.join(', ')}.` },
        { status: 400, headers }
      );
    }

    if (merchant_order_id && merchant_order_id.length > 128) {
      return NextResponse.json(
        { error: 'merchant_order_id must not exceed 128 characters.' },
        { status: 400, headers }
      );
    }

    const apiKey = process.env.AIRWALLEX_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AIRWALLEX_API_KEY is not configured' },
        { status: 500, headers }
      );
    }

    const paymentIntent = await createPaymentIntent(
      { amount, currency, merchant_order_id, description },
      apiKey
    );

    return NextResponse.json(paymentIntent, { status: 200, headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500, headers });
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
