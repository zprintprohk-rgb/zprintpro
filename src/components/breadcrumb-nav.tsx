/**
 * 可视化面包屑导航
 * 支持多语言，基于当前路径动态生成
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types/locale';

interface BreadcrumbNavProps {
  locale: Locale;
}

const homeLabels: Record<Locale, string> = {
  'zh-hk': '首頁',
  'en': 'Home',
  'ja': 'ホーム',
};

const segmentLabels: Record<string, Record<Locale, string>> = {
  'products': { 'zh-hk': '產品', 'en': 'Products', 'ja': '製品' },
  'product': { 'zh-hk': '產品', 'en': 'Product', 'ja': '製品' },
  'category': { 'zh-hk': '分類', 'en': 'Category', 'ja': 'カテゴリー' },
  'blog': { 'zh-hk': '印刷知識', 'en': 'Knowledge', 'ja': '印刷知識' },
  'guide': { 'zh-hk': '指南', 'en': 'Guide', 'ja': 'ガイド' },
  'contact': { 'zh-hk': '聯絡我們', 'en': 'Contact', 'ja': 'お問い合わせ' },
  'cart': { 'zh-hk': '購物車', 'en': 'Cart', 'ja': 'カート' },
  'quote': { 'zh-hk': '報價', 'en': 'Quote', 'ja': '見積もり' },
  'stickers': { 'zh-hk': '貼紙印刷', 'en': 'Stickers', 'ja': 'シール印刷' },
  'flyers': { 'zh-hk': '宣傳單張', 'en': 'Flyers', 'ja': 'チラシ印刷' },
  'packaging-boxes': { 'zh-hk': '包裝盒定制', 'en': 'Packaging Boxes', 'ja': '箱包装' },
  'posters': { 'zh-hk': '定制海報', 'en': 'Posters', 'ja': 'ポスター印刷' },
  'paper-bags': { 'zh-hk': '紙袋印刷', 'en': 'Paper Bags', 'ja': '紙袋印刷' },
};

export function BreadcrumbNav({ locale }: BreadcrumbNavProps) {
  const pathname = usePathname();
  if (!pathname) return null;

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
            const label = segmentLabels[segment]?.[locale] || segment;
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
