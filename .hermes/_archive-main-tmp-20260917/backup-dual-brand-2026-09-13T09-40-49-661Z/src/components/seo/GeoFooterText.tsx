/**
 * GeoFooterText — 自然语言地理锚定段落
 * 供 AI 搜索引擎（Perplexity/SearchGPT/Claude）抓取，
 * 明确陈述品牌、服务区域、交付能力。
 * 视觉低调（text-slate-500 / py-4 / border-t），不抢主视觉。
 */

import { Locale } from '@/types/locale';

interface GeoFooterTextProps {
  locale: Locale;
}

const TEXT: Record<Locale, string> = {
  // 2026-07-08: zh-hk 移除 "总部位于中国深圳"（合规: 跨境展示不暴露深圳实体地址）
  // en / ja 保持不变（这两个市场按法规需要真实披露 supplier origin）
  // 2026-07-22 v6: zh-hk 品牌词 智印港→智印港, 全 locale casing ZPrintPro→ZprintPro
  'zh-hk':
    '智印港 ZprintPro 是面向香港及全球市场的国际印刷服务品牌，由亚洲生产基地提供专业印刷与品控。' +
    '服务覆盖香港（顺豐本地派送）、美国、英国、澳大利亚、日本（DHL Express 全球 2-4 日送达）等市场。' +
    '支持多语言客服和本地化支付。' +
    '无论您在香港、纽约、伦敦、悉尼还是东京，都能享受 ZprintPro 的专业印刷服务与 72 小时全球交付承诺。',
  en:
    'ZprintPro is headquartered in Shenzhen, China, providing cross-border printing services to the US and global markets. ' +
    'US delivery via DHL Express (2-4 days); worldwide shipping to 100+ countries. ' +
    'Our services cover the United States, the United Kingdom, Australia, and Japan, ' +
    'with multilingual customer support and localized payment options. ' +
    'Whether you are in New York, Los Angeles, London, Sydney, or Tokyo, you can enjoy ZprintPro’s professional printing service and 72-hour global delivery commitment.',
  ja:
    'ZprintPro（智印港）は中国深圳に本社を置く国際印刷サービスブランドで、香港を含む世界市場向けにカスタマイズされた印刷ソリューションを提供しております。' +
    '越境EC形式でサービスを提供し、香港向けは順豐速運で 48 時間配達、海外は DHL Express で 2-4 日配送しております。' +
    'サービス対象地域はアメリカ（United States）、イギリス（United Kingdom）、オーストラリア（Australia）、日本（Japan）で、' +
    '多言語カスタマーサポートと現地決済に対応しています。' +
    '香港、ニューヨーク、ロンドン、シドニー、東京のいずれにお住まいでも、ZprintPro の専門印刷サービスと 72 時間グローバル配送をお受け取りいただけます。',
};

export function GeoFooterText({ locale }: GeoFooterTextProps) {
  const text = TEXT[locale] || TEXT['en'];
  return (
    <section
      className="text-xs md:text-sm text-slate-400 leading-relaxed py-5 border-t border-white/10"
      aria-label="Service area description for search engines"
    >
      <p>{text}</p>
    </section>
  );
}
