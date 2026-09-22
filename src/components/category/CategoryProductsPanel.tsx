/**
 * CategoryProductsPanel — 分类页产品面板 (排序/分页下沉客户端)
 *
 * 2026-09-22 Cloudflare Workers CPU 修复 (K3 拍板):
 *   背景: 分类页服务端读 searchParams → 39 个类目页 (13类 × 3语) 全部动态 SSR,
 *         每次请求执行完整 React SSR 烧 Worker CPU。CF 免费版 10ms CPU/请求,
 *         账户 24h 内超限 100+ 次 (CF 告警邮件 2026-09-22)。
 *   方案: 页面回归静态 SSG (generateStaticParams 已有), 排序/分页用 useState 客户端处理。
 *         初始 SSR HTML 仍渲染全部产品卡 (与改造前默认视图逐字节一致 → SEO 无损);
 *         'use client' 组件的初始渲染同样进 HTML, 爬虫可见全部产品链接。
 *   行为变化: ?sort= / ?page= URL 参数不再服务端生效 (改为客户端状态);
 *         现全站 16 类 ≤12 SKU, totalPages 恒为 1, 分页本就不触发, 变化为零。
 *
 * 真值: 排序 key 与改造前同一 parseMinPrice 逻辑 (price_range 起始价)。
 */

'use client';

import { useState, useMemo } from 'react';
import { CategoryProductCard } from './CategoryProductCard';
import { CategorySortSelect } from './CategorySortSelect';
import { Pagination } from '@/components/Pagination';
import type { Product } from '@/data/products';
import type { Locale } from '@/lib/seo';

interface CategoryProductsPanelProps {
  products: Product[];
  locale: Locale;
  slug: string;
  t: {
    productsCount: string;
    sortBy: string;
    noProducts: string;
  };
  sortOptions: { value: string; label: string }[];
}

// 与改造前服务端逻辑同一口径: 取 price_range 起始价数字
const parseMinPrice = (priceRange: string): number => {
  const match = (priceRange || '').match(/[\d,.]+/);
  if (!match) return 0;
  const num = parseFloat(match[0].replace(/,/g, ''));
  return isNaN(num) ? 0 : num;
};

export function CategoryProductsPanel({ products, locale, slug, t, sortOptions }: CategoryProductsPanelProps) {
  const [sortKey, setSortKey] = useState('popularity');

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    if (sortKey === 'price-asc') {
      arr.sort((a, b) => parseMinPrice(a.price_range) - parseMinPrice(b.price_range));
    } else if (sortKey === 'price-desc') {
      arr.sort((a, b) => parseMinPrice(b.price_range) - parseMinPrice(a.price_range));
    }
    // popularity / default: 保留 products 数组原顺序 (与服务端默认一致)
    return arr;
  }, [products, sortKey]);

  // 每页 12 条 (与原口径一致); 现全站类目 ≤12 SKU → 恒为 1 页, 分页组件预留
  const currentPage = 1;
  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      {/* 排序栏 — 浅灰条（產品數 + 熱門程度下拉）+ 橙色 CTA 无缝拼接 (样式与原服务端渲染一致) */}
      <div className="flex items-stretch mb-4 gap-0 rounded-t-lg overflow-hidden">
        <div className="bg-gray-100 text-slate-700 px-4 py-3 flex items-center gap-3 flex-1 min-w-0">
          <div className="w-1 h-5 bg-gray-300 rounded-full flex-shrink-0" />
          <span className="font-semibold text-base whitespace-nowrap">
            {t.productsCount}
          </span>
          <div className="ml-auto flex items-center gap-2 min-w-0">
            <span className="text-slate-500 text-sm whitespace-nowrap hidden sm:inline">{t.sortBy}:</span>
            <CategorySortSelect
              defaultValue={sortKey}
              onChange={setSortKey}
              options={sortOptions}
              className="bg-white hover:bg-gray-50 text-slate-700 text-sm font-medium border border-gray-300 rounded-md pl-3 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-[#2873F5]/40 cursor-pointer transition-colors appearance-none bg-no-repeat bg-right disabled:opacity-60"
            />
          </div>
        </div>
        <a
          href={`/${locale}/quote/`}
          className="bg-[#F87314] hover:bg-[#E06613] text-white font-bold px-5 py-3 flex items-center gap-1.5 whitespace-nowrap transition-colors flex-shrink-0 text-[22px] leading-none"
        >
          {locale === 'zh-hk' ? '免費獲取報價' : locale === 'ja' ? '無料見積もり' : 'Get Free Quote'}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* 产品网格 - 3列，最多12条单页显示 */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedProducts.map((product, index) => (
            <CategoryProductCard
              key={product.sku_code}
              product={product}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">{t.noProducts}</p>
        </div>
      )}

      {/* 分页 — 仅当超过12条时显示 (现全站类目恒为 1 页, 逻辑预留) */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            locale={locale}
            baseUrl={`/${locale}/category/${slug}/`}
          />
        </div>
      )}
    </>
  );
}
