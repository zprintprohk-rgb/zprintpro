/**
 * MobileValueStrip — 移动端首屏品牌定位 + 核心卖点条 (2026-07-19 移动端信息架构对标优化)
 * 位置: header 下方 / hero 上方, 仅移动端 (lg:hidden)。
 * 用户 3 秒内拿到「你是谁 / 值不值」: 主行品牌定位, 副行 4 个核心卖点。
 * 文案组件内 TEXTS 常量 (参照 FloatingQuoteCTA / MobileCategoryEntry 模式)。
 * §13.10: en 不出现 Hong Kong/Shenzhen, ja 不出现 香港/深圳/中国, zh-hk 纯繁体。
 */

import { Locale } from '@/types/locale';

interface MobileValueStripProps {
  locale: Locale;
}

const TEXTS: Record<Locale, { main: string; sub: string }> = {
  'zh-hk': {
    main: '香港專業印刷 · 一站式定制服務',
    sub: '一張起印｜免費打樣｜港九新界 $500+ 免費速遞｜最快 24 小時出貨',
  },
  en: {
    main: 'Custom Printing, One-Stop Service',
    sub: 'Low MOQ from 100 pcs ｜ Free Design & Mockup ｜ Free US Shipping $99+ ｜ 2-4 Day DHL',
  },
  ja: {
    main: 'オーダー印刷 · ワンストップサービス',
    sub: '小ロット対応｜無料デザイン｜日本全国送料無料｜DHL 2〜4日',
  },
};

export function MobileValueStrip({ locale }: MobileValueStripProps) {
  const t = TEXTS[locale] || TEXTS['en'];

  return (
    <div className="lg:hidden bg-gray-50 border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 py-2.5 text-center">
        <div className="font-bold text-base text-slate-900 leading-snug">{t.main}</div>
        <div className="text-xs text-gray-500 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {t.sub}
        </div>
      </div>
    </div>
  );
}
