/**
 * Quote Engine v1 API Route
 * 2026-06-07 启动：接受报价计算记录，写 Supabase quote_calculations 表
 *
 * POST /api/quote
 * body: { productSlug, quantity, size, material, finishes, deadline, unitPrice, totalPrice, source }
 * returns: { id, created_at } | { error }
 *
 * Fallback：如果 SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 未配，
 * 仍然返回成功（写入控制台日志），不阻塞前端用户体验。
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// CF Pages (next-on-pages) 强制要求所有动态路由声明 edge runtime
// 2026-06-07 修复部署失败 — 加此声明
export const runtime = 'edge';

const QuoteRequestSchema = z.object({
  productSlug: z.string().min(1),
  quantity: z.number().int().min(1).max(1000000),
  size: z.object({
    w: z.number(),
    h: z.number(),
    unit: z.enum(['mm', 'in']),
  }),
  material: z.string().min(1),
  finishes: z.array(z.string()).default([]),
  deadline: z.enum(['standard', 'rush', 'same-day']),
  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  currency: z.string().default('USD'),
  source: z.string().default('unknown'),
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  customerCountry: z.string().optional(),
  locale: z.string().default('en'),
  referrerUrl: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = QuoteRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request', details: parsed.error.format() }, { status: 400 });
    }
    const data = parsed.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Fallback: 无 supabase 配置时，仅记录日志
    if (!supabaseUrl || !supabaseKey) {
      console.log('[Quote API] Supabase not configured. Quote:', {
        product: data.productSlug,
        qty: data.quantity,
        total: data.totalPrice,
        source: data.source,
      });
      return NextResponse.json({
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
        fallback: true,
      });
    }

    // 真实 Supabase 写入
    const response = await fetch(`${supabaseUrl}/rest/v1/quote_calculations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        product_slug: data.productSlug,
        quantity: data.quantity,
        size_w: data.size.w,
        size_h: data.size.h,
        size_unit: data.size.unit,
        material: data.material,
        finishes: data.finishes,
        deadline: data.deadline,
        unit_price: data.unitPrice,
        total_price: data.totalPrice,
        currency: data.currency,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        customer_country: data.customerCountry,
        locale: data.locale,
        source: data.source,
        referrer_url: data.referrerUrl,
        user_agent: req.headers.get('user-agent'),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Quote API] Supabase insert failed:', errText);
      return NextResponse.json(
        { error: 'Database insert failed', details: errText },
        { status: 500 }
      );
    }

    const inserted = await response.json();
    const record = Array.isArray(inserted) ? inserted[0] : inserted;
    return NextResponse.json({
      id: record.id,
      created_at: record.created_at,
    });
  } catch (err) {
    console.error('[Quote API] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
