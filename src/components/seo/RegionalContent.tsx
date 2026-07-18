'use client';

import { Locale } from '@/lib/seo';

interface RegionalContentProps {
  locale: Locale;
  type: 'trustSignals' | 'shipping' | 'pricingNote' | 'contactCta' | 'expertIntro';
}

const content: Record<Locale, Record<RegionalContentProps['type'], string>> = {
  'zh-hk': {
    trustSignals: '深圳自有工廠 · 順豐香港本地派送 (48小時) · 24小時報價 · ISO9001認證',
    shipping: '順豐香港本地送貨 · 港島/九龍/新界 48小時達 · DHL 全球 2-4 日',
    pricingNote: '以上價格以港幣（HKD）計算。量大價優，歡迎致電查詢批量報價。',
    contactCta: 'WhatsApp即時查詢',
    expertIntro: '智印雲（ZprintPro）為彩龍印刷旗下國際印刷服務品牌，深圳自有工廠，服務日本及全球客戶。我們熟悉跨境印刷需求，提供 IP 保護、ISO 認證品質保證，以及全球物流支援。',
  },
  en: {
    trustSignals: 'Shenzhen Production Facility · Worldwide DHL/FedEx Shipping · USD/GBP/AUD Accepted · Factory Direct Pricing',
    shipping: 'Worldwide shipping via DHL Express: 3-5 days to US/UK/Australia · 5-7 days to Europe · Tracking number provided',
    pricingNote: 'Prices shown in USD. No hidden fees — factory direct pricing guaranteed.',
    contactCta: 'Get International Quote',
    expertIntro: 'ZprintPro is the international printing service brand of Cailong Printing. Operating from our Shenzhen production facility, we serve cross-border printing clients in the US, UK, Australia, Japan, and beyond. We understand the unique requirements of international printing and offer IP-protected, ISO-certified quality manufacturing with worldwide logistics support.',
  },
  ja: {
    trustSignals: '品質管理徹底（QCチェック体制）· 納期厳守（航空便3-5日）· 日本語サポート対応 · ISO9001認証取得',
    shipping: '深圳から日本へ国際配送（航空便3-5日、税関対応可）· DHL/FedEx追跡番号付き · 日本全国対応',
    pricingNote: '表示価格はHKDです。日本円（JPY）でのお見積もりも対応可能です。追加料金なしの工場直送価格をご提供します。',
    contactCta: 'お見積もり依頼（日本語対応）',
    expertIntro: '智印雲（ZprintPro）は、彩龍印刷が運営する国際印刷サービスブランドです。深圳自社工場から、DHL Express で日本を含む全世界へ高品質印刷を輸出しています。日本市場特有の品質基準への適合、厳密な納期管理、日本語対応スタッフによる丁寧なサポートで、深圳から日本への高品質印刷輸出を実現します。',
  },
};

export function RegionalContent({ locale, type }: RegionalContentProps) {
  return <>{content[locale][type]}</>;
}

// 地區化CTA鏈接組件
interface RegionalCtaProps {
  locale: Locale;
  productSlug?: string;
  className?: string;
}

export function RegionalCta({ locale, productSlug, className = '' }: RegionalCtaProps) {
  const basePath = `${locale}/`;
  const href = productSlug
    ? `/${basePath}product/${productSlug}`
    : `/${basePath}quote/`;

  const text = {
    'zh-hk': '立即獲取報價',
    'en': 'Get Instant Quote',
    'ja': '無料お見積もり',
  }[locale];

  const subtext = {
    'zh-hk': '24小時內回覆 · 免費設計諮詢',
    'en': 'Response within 24h · Free design consultation',
    'ja': '24時間以内に返信 · 無料デザイン相談',
  }[locale];

  return (
    <a
      href={href}
      className={`inline-flex flex-col items-center justify-center px-10 py-5 bg-[#2873F5] hover:bg-[#1E5FD1] text-white rounded-xl transition-colors shadow-lg hover:shadow-xl ${className}`}
    >
      <span className="text-xl font-bold">{text}</span>
      <span className="text-base text-white/80 mt-1.5">{subtext}</span>
    </a>
  );
}

// 地區化信任徽章組件
export function RegionalTrustBadges({ locale }: { locale: Locale }) {
  const badges = {
    'zh-hk': [
      { icon: '🏭', label: '深圳自有工廠' },
      { icon: '🚚', label: '順豐直達' },
      { icon: '🎨', label: '免費打樣' },
      { icon: '⚡', label: '即日交貨' },
    ],
    'en': [
      { icon: '🏭', label: 'Shenzhen ISO Factory' },
      { icon: '🌍', label: 'Worldwide Shipping' },
      { icon: '💳', label: 'Multi-Currency' },
      { icon: '⚡', label: 'Express Available' },
    ],
    'ja': [
      { icon: '🔍', label: 'QC徹底管理' },
      { icon: '✈️', label: '航空便3-5日' },
      { icon: '💬', label: '日本語対応' },
      { icon: '⚡', label: '急行対応可' },
    ],
  }[locale];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-base font-semibold"
        >
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </span>
      ))}
    </div>
  );
}
