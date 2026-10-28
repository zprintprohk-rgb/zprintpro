/**
 * SKU 客戶評價 API (K3 2026-10-28 方案A · A1批)
 * POST: 服務端校驗 + IP 哈希 + 經 RLS 插入 (status 強制 pending, 審核後才可見)
 * GET ?slug=&locale=: 只返回 approved (RLS 雙保險)
 * 紅線 (§0.23 + src/data/product-reviews.ts): 0 編造 — schema/星級管线不变, 本路由只做收集与展示
 * fail-closed: 表未建(功能未啟用) → 404, 前端整段隐藏
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

const LOCALES = ['zh-hk', 'en', 'ja'] as const;
type Locale = (typeof LOCALES)[number];

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = (searchParams.get('slug') || '').trim();
  const locale = (searchParams.get('locale') || '').trim();
  if (!slug || !/^[a-z0-9-]+$/.test(slug) || !isLocale(locale)) {
    return NextResponse.json({ error: 'invalid_params', reviews: [] }, { status: 400 });
  }
  const { data, error } = await supabase
    .from('product_reviews')
    .select('author, rating, title, body, created_at')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) {
    return NextResponse.json({ error: 'unavailable', reviews: [] }, { status: 404 });
  }
  return NextResponse.json({ reviews: data ?? [] });
}

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // 蜜罐: 正常用戶看不到該字段, 有值 = bot, 靜默丟棄
  if (String(payload.website || '')) {
    return NextResponse.json({ ok: true });
  }

  const slug = String(payload.slug || '').trim();
  const locale = String(payload.locale || '').trim();
  const author = String(payload.author || '').trim().slice(0, 40) || '匿名';
  const rating = Number(payload.rating);
  const title = payload.title ? String(payload.title).trim().slice(0, 80) : null;
  const body = String(payload.body || '').trim();
  const consent = payload.consent === true;

  if (!slug || !/^[a-z0-9-]+$/.test(slug) || slug.length > 80) {
    return NextResponse.json({ error: 'invalid_slug' }, { status: 400 });
  }
  if (!isLocale(locale)) {
    return NextResponse.json({ error: 'invalid_locale' }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'invalid_rating' }, { status: 400 });
  }
  if (body.length < 10 || body.length > 1000) {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: 'consent_required' }, { status: 400 });
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const ipHash = await sha256(`${ip}|${process.env.SUPABASE_REVIEW_SALT || 'zprintpro-reviews-v1'}`);

  const { error } = await supabase
    .from('product_reviews')
    .insert({ slug, locale, author, rating, title, body, consent, status: 'pending', ip_hash: ipHash });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'duplicate_day' }, { status: 409 });
    }
    return NextResponse.json({ error: 'unavailable' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
