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
    const { quote_data, amount, currency, file_url } = body;

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

    const apiKey = context.env.AIRWALLEX_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AIRWALLEX_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
    const { error: insertError } = await supabase.from('orders').insert({
      id: orderId,
      quote_data: quote_data,
      file_url: file_url || null,
      amount,
      currency,
      status: 'pending',
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
