/**
 * 多语言 locale 类型与常量
 */

export type Locale = 'zh-hk' | 'en' | 'ja';
export const locales: Locale[] = ['zh-hk', 'en', 'ja'];
export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  'zh-hk': '繁體中文',
  'en': 'English',
  'ja': '日本語',
};

// hreflang 精确映射
export const hreflangMap: Record<Locale, string> = {
  'zh-hk': 'zh-HK',
  'en': 'en-US', // 英美澳共用，以 en-US 为主标签
  'ja': 'ja-JP',
};

// HTML lang 属性映射
export const htmlLangMap: Record<Locale, string> = {
  'zh-hk': 'zh-Hant-HK',
  'en': 'en-US',
  'ja': 'ja-JP',
};
