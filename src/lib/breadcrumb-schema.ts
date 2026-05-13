/**
 * BreadcrumbList Schema 生成器
 */

import { Locale } from '@/types/locale';
import { SchemaOrgData } from '@/types/seo';

export interface BreadcrumbItem {
  name: Record<Locale, string>;
  path: string; // 相对路径，如 /products/stickers
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  locale: Locale,
  baseUrl: string
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name[locale],
      item: `${baseUrl}/${locale}${item.path}`,
    })),
  };
}
