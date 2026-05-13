/**
 * Hreflang 标签生成器
 */

import { Locale, locales, hreflangMap, defaultLocale } from '@/types/locale';

const BASE_URL = 'https://zprintpro.com';

export interface HreflangTag {
  rel: 'alternate';
  hrefLang: string;
  href: string;
}

export function generateHreflangTags(currentLocale: Locale, path: string = ''): HreflangTag[] {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const tags: HreflangTag[] = locales.map(locale => ({
    rel: 'alternate',
    hrefLang: hreflangMap[locale],
    href: `${BASE_URL}/${locale}${normalizedPath}`,
  }));

  // x-default
  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${BASE_URL}/${defaultLocale}${normalizedPath}`,
  });

  return tags;
}

export function generateHreflangLinkTags(currentLocale: Locale, path: string = ''): string {
  return generateHreflangTags(currentLocale, path)
    .map(tag => `<link rel="${tag.rel}" hreflang="${tag.hrefLang}" href="${tag.href}" />`)
    .join('\n');
}
