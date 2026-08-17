import { NextRequest, NextResponse } from 'next/server';
import { searchAll } from '@/data/products';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();
  const locale = (searchParams.get('locale') || 'zh-hk') as 'zh-hk' | 'en' | 'ja';

  if (!query) {
    return NextResponse.json({
      query: '',
      results: [],
      categories: [],
      total: 0,
    });
  }

  // 2026-06-08: 用 searchAll 统一入口 — 同时支持 简繁互通 + 业务别名 (贴纸/纸卡/名刺)
  const { products: matchedProducts, categories: matchedCategories } = searchAll(query, {
    productLimit: 8, // typeahead 只需要 8 个产品, 太多会撑爆 UI
    categoryLimit: 3,
  });

  return NextResponse.json({
    query,
    locale,
    results: matchedProducts.map((p) => ({
      type: 'product' as const,
      slug: p.slug,
      category_slug: p.category_slug,
      sku_code: p.sku_code,
      name: locale === 'en' ? p.nameEn : locale === 'ja' ? p.nameJa : p.name,
      description: locale === 'en' ? p.descriptionEn : locale === 'ja' ? p.descriptionJa : p.description,
      price_range: p.price_range,
      isHot: p.isHot,
      isNew: p.isNew,
    })),
    categories: matchedCategories.map((c) => ({
      type: 'category' as const,
      slug: c.slug,
      name: locale === 'en' ? c.nameEn : locale === 'ja' ? c.nameJa : c.name,
    })),
    total: matchedProducts.length + matchedCategories.length,
  });
}
