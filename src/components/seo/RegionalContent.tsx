'use client';

import { Locale } from '@/lib/seo';

interface RegionalContentProps {
  locale: Locale;
  type: 'trustSignals' | 'shipping' | 'pricingNote' | 'contactCta' | 'expertIntro';
}

const content: Record<Locale, Record<RegionalContentProps['type'], string>> = {
  'zh-hk': {
    trustSignals: '香港實體工廠（觀塘工業區）· 港鐵站免費交收 · 24小時本地報價 · ISO9001認證',
    shipping: '香港本地免費送貨（離島除外）· 觀塘/九龍/港島即日達 · 新界1-2個工作天',
    pricingNote: '以上價格以港幣（HKD）計算。量大價優，歡迎致電查詢批量報價。',
    contactCta: 'WhatsApp即時查詢',
    expertIntro: '智印云位於香港觀塘工業區，專注本地印刷服務超過15年。我們熟悉香港各區的商業環境和物流網絡，能夠為您提供最貼合本地需求的印刷解決方案。',
  },
  'en': {
    trustSignals: 'Hong Kong ISO Certified Factory · Worldwide DHL/FedEx Shipping · USD/GBP/AUD Accepted · Factory Direct Pricing',
    shipping: 'Worldwide shipping via DHL Express: 3-5 days to US/UK/Australia · 5-7 days to Europe · Tracking number provided',
    pricingNote: 'Prices shown in HKD. USD/GBP/AUD quotes available. No hidden fees — factory direct pricing guaranteed.',
    contactCta: 'Get International Quote',
    expertIntro: 'Based in Hong Kong\'s Kwun Tong industrial district, ZprintPro has been serving international clients for over 15 years. We understand the unique requirements of cross-border printing and offer IP-protected, quality-assured manufacturing with worldwide logistics support.',
  },
  'ja': {
    trustSignals: '品質管理徹底（QCチェック体制）· 納期厳守（航空便3-5日）· 日本語サポート対応 · ISO9001認証取得',
    shipping: '香港から日本へ国際配送（航空便3-5日、税関対応可）· DHL/FedEx追跡番号付き · 日本全国対応',
    pricingNote: '表示価格はHKDです。日本円（JPY）でのお見積もりも対応可能です。追加料金なしの工場直送価格をご提供します。',
    contactCta: 'お見積もり依頼（日本語対応）',
    expertIntro: '香港の観塘工業区に拠点を置くZprintProは、15年以上にわたり日本企業向けの印刷サービスを提供してきました。日本市場特有の品質基準への適合、厳密な納期管理、そして日本語対応スタッフによる丁寧なサポートで、香港から日本への高品質印刷輸出を実現します。',
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
    ? `/${basePath}quote?product=${productSlug}`
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
      { icon: '🏭', label: '觀塘實體工廠' },
      { icon: '🚚', label: '順豐直達' },
      { icon: '🎨', label: '免費打樣' },
      { icon: '⚡', label: '即日交貨' },
    ],
    'en': [
      { icon: '🏭', label: 'HK ISO Factory' },
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
