/**
 * 可视化面包屑导航
 * 支持多语言，基于当前路径动态生成
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types/locale';
import { getSegmentName } from '@/data/breadcrumb-names';

interface BreadcrumbNavProps {
  locale: Locale;
}

const homeLabels: Record<Locale, string> = {
  'zh-hk': '首頁',
  'en': 'Home',
  'ja': 'ホーム',
};

export function BreadcrumbNav({ locale }: BreadcrumbNavProps) {
  const pathname = usePathname();
  if (!pathname) return null;

  // 分类页面包屑由 Hero 内部接管，不渲染独立面包屑
  if (pathname.includes('/category/')) return null;
  // 产品页面包屑由 page.tsx 内部渲染（含真实分类名），不渲染独立面包屑
  if (pathname.includes('/product/')) return null;

  const segments = pathname.replace(`/${locale}`, '').split('/').filter(Boolean);
  if (segments.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="bg-white border-b">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center text-sm text-gray-500 space-x-2">
          <li>
            <Link href={`/${locale}/`} className="hover:text-[#2873F5]">
              {homeLabels[locale]}
            </Link>
          </li>
          {segments.map((segment, index) => {
            const label = getSegmentName(segment, locale);
            const isLast = index === segments.length - 1;
            const href = `/${locale}/${segments.slice(0, index + 1).join('/')}`;
            return (
              <li key={segment + index} className="flex items-center space-x-2">
                <span className="text-gray-300">/</span>
                {isLast ? (
                  <span className="text-gray-900">{label}</span>
                ) : (
                  <Link href={href} className="hover:text-[#2873F5]">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
