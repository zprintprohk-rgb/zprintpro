/**
 * Quote Engine v1 API Route
 * 2026-08-07 18:30 修 (per K3 P0 拍板 A):
 *   旧: 写 quote_calculations 表 (migration 003, 但生产不存在) → 所有询盘 500 黑洞
 *   新: 写 quotes 表 (migration 001, 已部署), customer_name/email 必填, 询盘可查
 *
 * POST /api/quote
 * body: { productSlug, quantity, size, material, finishes, deadline, unitPrice, totalPrice, source, customerName, customerEmail, customerPhone, customerCountry, locale, referrerUrl }
 * returns: { id, created_at } | { error }
 *
 * Fallback: 如果 SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 未配,
 * 仍然返回成功（写入控制台日志），不阻塞前端用户体验。
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { resolveLeadSource } from '@/lib/attribution';

// CF Pages (next-on-pages) 强制要求所有动态路由声明 edge runtime
// 2026-06-07 修复部署失败 — 加此声明
export const runtime = 'edge';

const QuoteRequestSchema = z.object({
  productSlug: z.string().min(1),
  productName: z.string().min(1), // 8/7 18:30 加: 用于 design_notes 留底
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
  // 8/7 18:30 修: customer_name/email 必填 (quotes 表 NOT NULL 约束, 不传就 500)
  customerName: z.string().min(1, 'Customer name required'),
  customerEmail: z.string().email('Valid email required'),
  customerPhone: z.string().optional(),
  customerCountry: z.string().optional(),
  // 8/26 修 2 补全: locale default 'en' → 'zh-hk' (zprintpro 是香港公司, 默认 zh-hk)
  locale: z.string().default('zh-hk'),
  referrerUrl: z.string().optional(),
  // Lane O 归因 (v10 P0-3, K3 2026-09-17): outbound 深链 UTM 由前端上送, 服务端落 008 车道字段
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
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
        customer: data.customerEmail,
      });
      return NextResponse.json({
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
        fallback: true,
      });
    }

    // 8/7 18:30 修: 写 quotes 表 (migration 001), 不是 quote_calculations (migration 003 不存在)
    // 字段映射: productSlug → product_id, size{w,h,unit} → size string concat, finishes[0] → finishing,
    //          deadline → turnaround, referrerUrl+source → referrer, ip_address + user_agent 写齐
    const sizeString = `${data.size.w}${data.size.unit === 'mm' ? '' : '"'}x${data.size.h}${data.size.unit === 'mm' ? 'mm' : '"'}`;
    const finishingString = data.finishes.length > 0 ? data.finishes.join(', ') : null;
    // Lane O 归因留底 (v10 P0-3): 业务表也留一行 UTM, 方便 K3 在 quotes 表直接看到来源车道
    const utmLine = data.utmSource
      ? `\nUTM: ${data.utmSource}/${data.utmMedium || '-'}/${data.utmCampaign || '-'}/${data.utmContent || '-'}`
      : '';
    const designNotes = `Product: ${data.productName}\nPrice: ${data.currency} ${data.totalPrice} (unit ${data.unitPrice})\nSource: ${data.source}\nLocale: ${data.locale}\nIP country: ${data.customerCountry || 'unknown'}${utmLine}`;

    const response = await fetch(`${supabaseUrl}/rest/v1/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        // 必填字段
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        product_id: data.productSlug,
        product_name: data.productName,
        quantity: data.quantity,
        // 可填字段
        customer_phone: data.customerPhone || null,
        material: data.material,
        size: sizeString,
        finishing: finishingString,
        turnaround: data.deadline,
        design_notes: designNotes,
        // 元数据
        ip_address: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
        user_agent: req.headers.get('user-agent'),
        referrer: data.referrerUrl || data.source,
        // 状态 (默认 'pending' 由表默认值填)
        status: 'pending',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Quote API] Supabase quotes insert failed:', errText);
      return NextResponse.json(
        { error: 'Database insert failed', details: errText },
        { status: 500 }
      );
    }

    const inserted = await response.json();
    const record = Array.isArray(inserted) ? inserted[0] : inserted;

    // 8/26 修 3 真修复: 服务端插入 quote_requests 度量层 (不依赖 env-gated 客户端 trackQuoteRequest)
    // 业务表成功后才插, 失败不影响业务主流程
    // Lane O 归因 (v10 P0-3): 透传前端 UTM → utm_source/medium/campaign/content +
    //   lead_source 车道 (迁移 010 未应用时自动降级重试, 保证度量层不破)
    try {
      const metricBase: Record<string, unknown> = {
        source: data.source,
        locale: data.locale,
        landing_page: data.referrerUrl || null,
        referrer: data.referrerUrl || null,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        product_slug: data.productSlug,
        product_name: data.productName,
        category: data.material,
        quantity: String(data.quantity),
        size: sizeString,
        message: data.productName,
        last_touch_at: new Date().toISOString(),
      };
      const metricFull = {
        ...metricBase,
        utm_content: data.utmContent || null,
        lead_id: data.utmContent || null,
        lead_source: resolveLeadSource(data.utmSource),
      };

      const postMetric = (payloadObj: Record<string, unknown>) =>
        fetch(`${supabaseUrl}/rest/v1/quote_requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(payloadObj),
        });

      let metricRes = await postMetric(metricFull);
      if (!metricRes.ok && metricRes.status === 400) {
        // 迁移 010 未应用 (PGRST204 / column not found) → 降级重试, 不带车道字段
        const errText = await metricRes.text();
        if (/PGRST204|lead_source|utm_content|lead_id/i.test(errText)) {
          metricRes = await postMetric(metricBase);
        } else {
          console.warn('[Quote API] quote_requests 度量层插入失败:', metricRes.status, errText);
        }
      }
      if (!metricRes.ok) {
        console.warn('[Quote API] quote_requests 度量层插入失败:', metricRes.status, await metricRes.text());
      }
    } catch (metricErr) {
      console.warn('[Quote API] quote_requests 度量层异常:', metricErr);
    }

    return NextResponse.json({
      id: record.id,
      created_at: record.created_at,
    });
  } catch (err) {
    console.error('[Quote API] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
