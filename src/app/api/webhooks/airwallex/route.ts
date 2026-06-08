import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const sigBytes = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
  const dataBytes = encoder.encode(payload);
  const result = await crypto.subtle.verify('HMAC', key, sigBytes, dataBytes);
  return result;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const signature = request.headers.get('x-signature') || '';
    const payload = await request.text();
    const secret = process.env.AIRWALLEX_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: 'AIRWALLEX_WEBHOOK_SECRET is not configured' },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isValid = await verifyWebhookSignature(payload, signature, secret);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const eventData = JSON.parse(payload) as {
      name: string;
      data?: {
        payment_intent?: { id: string; status: string; merchant_order_id?: string };
      };
    };

    if (eventData.name === 'payment_intent.succeeded') {
      const paymentIntent = eventData.data?.payment_intent;
      const orderId = paymentIntent?.merchant_order_id;

      if (orderId && paymentIntent?.status === 'SUCCEEDED') {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabaseServiceKey) {
          return NextResponse.json(
            { error: 'Supabase env not configured' },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error } = await supabase
          .from('orders')
          .update({ status: 'paid', airwallex_payment_intent_id: paymentIntent.id })
          .eq('id', orderId);

        if (error) {
          throw new Error(`Failed to update order: ${error.message}`);
        }
      }
    }

    return NextResponse.json(
      { received: true },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
