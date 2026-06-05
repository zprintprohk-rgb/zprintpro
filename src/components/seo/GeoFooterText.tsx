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
  'zh-hk':
    '智印云 ZPrintPro 总部位于香港九龙观塘伟业街182号成运工业大厦，提供香港本地即日印刷服务，并面向全球市场提供定制化印刷解决方案。' +
    '我们的服务覆盖美国（United States）、英国（United Kingdom）、澳大利亚（Australia）和日本（Japan），' +
    '支持多语言客服和本地化支付。' +
    '无论您在香港观塘、纽约、伦敦、悉尼还是东京，都能享受 ZPrintPro 的专业印刷服务与 72 小时全球交付承诺。',
  en:
    'ZPrintPro is headquartered at 182 Wai Yip Street, Kwun Tong, Kowloon, Hong Kong, ' +
    'providing same-day local printing services in Hong Kong and customized printing solutions for the global market. ' +
    'Our services cover the United States, the United Kingdom, Australia, and Japan, ' +
    'with multilingual customer support and localized payment options. ' +
    'Whether you are in Kwun Tong Hong Kong, New York, London, Sydney, or Tokyo, you can enjoy ZPrintPro\u2019s professional printing service and 72-hour global delivery commitment.',
  ja:
    'ZPrintPro（智印云）は香港九龍観塘偉業街182号成運工業ビルに本社を置き、香港現地の即日印刷サービスを提供し、' +
    '世界市場向けにカスタマイズされた印刷ソリューションを提供しております。' +
    'サービス対象地域はアメリカ（United States）、イギリス（United Kingdom）、オーストラリア（Australia）、日本（Japan）で、' +
    '多言語カスタマーサポートと現地決済に対応しています。' +
    '香港観塘、ニューヨーク、ロンドン、シドニー、東京のいずれにお住まいでも、ZPrintPro の専門印刷サービスと 72 時間グローバル配送をお受け取りいただけます。',
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
