/**
 * Hreflang 标签生成器
 * 2026-06-07 升级：en 语言加 4 个区域变体（en-US / en-GB / en-AU / en-CA）
 * 解决 GSC en 0 搜索量问题：Google 需要精确 hreflang 信号判断市场
 */

import { Locale, locales, hreflangMap, defaultLocale } from '@/types/locale';

const BASE_URL = 'https://zprintpro.com';

// en 区域变体：所有英语市场共享同一路径，但告诉 Google 各自的目标
const EN_REGIONS = ['en-US', 'en-GB', 'en-AU', 'en-CA'] as const;

export interface HreflangTag {
  rel: 'alternate';
  hrefLang: string;
  href: string;
}

export function generateHreflangTags(currentLocale: Locale, path: string = ''): HreflangTag[] {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const tags: HreflangTag[] = [];

  if (currentLocale === 'en') {
    // en 页面：发 4 个区域变体（精确本地化信号）
    EN_REGIONS.forEach(region => {
      tags.push({
        rel: 'alternate',
        hrefLang: region,
        href: `${BASE_URL}/en${normalizedPath}`,
      });
    });
    // 通用 en 兜底
    tags.push({
      rel: 'alternate',
      hrefLang: 'en',
      href: `${BASE_URL}/en${normalizedPath}`,
    });
    // 其他语言
    tags.push({
      rel: 'alternate',
      hrefLang: hreflangMap['ja'],
      href: `${BASE_URL}/ja${normalizedPath}`,
    });
    tags.push({
      rel: 'alternate',
      hrefLang: hreflangMap['zh-hk'],
      href: `${BASE_URL}/zh-hk${normalizedPath}`,
    });
  } else {
    // 非 en 页面：3 语言基础 + en 区域变体（让 Google 知道 en 用户该看 /en）
    locales.forEach(locale => {
      tags.push({
        rel: 'alternate',
        hrefLang: hreflangMap[locale],
        href: `${BASE_URL}/${locale}${normalizedPath}`,
      });
    });
    EN_REGIONS.forEach(region => {
      tags.push({
        rel: 'alternate',
        hrefLang: region,
        href: `${BASE_URL}/en${normalizedPath}`,
      });
    });
  }

  // x-default
  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${BASE_URL}/en${normalizedPath}`,
  });

  return tags;
}

export function generateHreflangLinkTags(currentLocale: Locale, path: string = ''): string {
  return generateHreflangTags(currentLocale, path)
    .map(tag => `<link rel="${tag.rel}" hreflang="${tag.hrefLang}" href="${tag.href}" />`)
    .join('\n');
}
