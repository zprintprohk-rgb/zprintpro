"use client";

/**
 * WeddingBundle — 婚礼 SKU PDP 6 件整套展示
 * V3.7 DoD 5: 6 件整套 vs 竞品 3 件 (智印港 vs e-print vs intuan)
 * 位置: ProductWhyChooseUs 之后 或 RegionalCta 之前
 */

interface WeddingBundleProps {
  locale: string;
  productSlug?: string;
}

const T: Record<string, {
  title: string;
  subtitle: string;
  badge: string;
  items: Array<{ name: string; desc: string; originalPrice: string; bundlePrice: string; }>;
  totalOriginal: string;
  totalBundle: string;
  savings: string;
  cta: string;
  ctaSecondary: string;
  competitorTitle: string;
  competitorSubtitle: string;
  competitors: Array<{ name: string; items: string; total: string; pricePerSet: string; turnaround: string; }>;
  ourItems: string;
  ourTotal: string;
  ourPricePerSet: string;
  ourTurnaround: string;
  advantage: string;
}> = {
  "zh-hk": {
    title: "婚慶印刷 6 件整套 · 套裝 9 折 + 免費打樣",
    subtitle: "喜帖 + 信封 + 婚禮禮袋 + 席卡 + 桌牌 + 利是封 一站印齊,享 9 折 + 免費寄樣,適合婚慶全套 / 海外婚禮 / 教堂 / 酒店婚禮。",
    badge: "套裝 9 折",
    items: [
      { name: "喜帖 (Invitation)", desc: "100 個 / 燙金 + 對裱 + 白卡 250g", originalPrice: "HK$ 1,200", bundlePrice: "HK$ 1,080" },
      { name: "婚慶信封 (Envelope)", desc: "100 個 / C5 燙金內襯", originalPrice: "HK$ 400", bundlePrice: "HK$ 360" },
      { name: "婚禮禮袋 (Favor Bag)", desc: "100 個 / 白卡 250g + 絲帶手挽", originalPrice: "HK$ 1,500", bundlePrice: "HK$ 1,350" },
      { name: "席卡 (Place Card)", desc: "100 張 / 白卡 + 燙金賓客名", originalPrice: "HK$ 850", bundlePrice: "HK$ 765" },
      { name: "桌牌 (Table Number)", desc: "10 個 / 燙金桌號", originalPrice: "HK$ 480", bundlePrice: "HK$ 432" },
      { name: "利是封 (Red Packet)", desc: "100 個 / 燙金龍鳳", originalPrice: "HK$ 600", bundlePrice: "HK$ 540" },
    ],
    totalOriginal: "HK$ 5,030",
    totalBundle: "HK$ 4,527",
    savings: "節省 HK$ 503 (10%)",
    cta: "立即訂購整套",
    ctaSecondary: "WhatsApp 客製化報價",
    competitorTitle: "vs 競品對比 · 智印港 6 件 vs 競品 3 件",
    competitorSubtitle: "智印港提供 6 件婚慶整套一站印齊,競品只覆蓋 3 件,客人需分 3 個供應商下單,溝通成本 ×3 + 運費 ×3 + 品質不一致風險。",
    competitors: [
      { name: "智印港 ZprintPro", items: "6 件 (喜帖 + 信封 + 禮袋 + 席卡 + 桌牌 + 利是封)", total: "HK$ 4,527", pricePerSet: "HK$ 45 / 套", turnaround: "5-10 個工作天" },
      { name: "e-print", items: "3 件 (喜帖 + 信封 + 禮袋, 席卡 / 桌牌 / 利是封 需另找)", total: "HK$ 3,800", pricePerSet: "HK$ 38 / 套", turnaround: "7-14 個工作天" },
      { name: "intuan", items: "3 件 (喜帖 + 利是封 + 禮袋, 信封 / 席卡 / 桌牌 需另找)", total: "HK$ 4,200", pricePerSet: "HK$ 42 / 套", turnaround: "10-15 個工作天" },
    ],
    ourItems: "✅ 6 件全套",
    ourTotal: "HK$ 4,527 (9 折後)",
    ourPricePerSet: "HK$ 45 / 套",
    ourTurnaround: "5-10 個工作天",
    advantage: "✅ 1 個供應商 + 1 張發票 + 1 次質檢 + 1 次運費 + 1 個 WhatsApp 客服",
  },
  en: {
    title: "Wedding Stationery 6-Piece Bundle · 10% Off + Free Proofing",
    subtitle: "Invitation + envelope + favor bag + place card + table card + red packet all-in-one, 10% off + free samples, perfect for full wedding / destination / church / hotel wedding.",
    badge: "Bundle 10% Off",
    items: [
      { name: "Invitation", desc: "100 pieces / foil + duplex + white card 250g", originalPrice: "HKD 1,200", bundlePrice: "HKD 1,080" },
      { name: "Wedding Envelope", desc: "100 pieces / C5 foil-lined", originalPrice: "HKD 400", bundlePrice: "HKD 360" },
      { name: "Favor Bag", desc: "100 pieces / white card 250g + satin ribbon handle", originalPrice: "HKD 1,500", bundlePrice: "HKD 1,350" },
      { name: "Place Card", desc: "100 cards / white card + foil guest name", originalPrice: "HKD 850", bundlePrice: "HKD 765" },
      { name: "Table Number", desc: "10 cards / foil table number", originalPrice: "HKD 480", bundlePrice: "HKD 432" },
      { name: "Red Packet", desc: "100 pieces / foil dragon-phoenix", originalPrice: "HKD 600", bundlePrice: "HKD 540" },
    ],
    totalOriginal: "HKD 5,030",
    totalBundle: "HKD 4,527",
    savings: "Save HKD 503 (10%)",
    cta: "Order Bundle Now",
    ctaSecondary: "WhatsApp Custom Quote",
    competitorTitle: "vs Competitor Comparison · ZprintPro 6-Piece vs Competitors 3-Piece",
    competitorSubtitle: "ZprintPro offers all 6 wedding pieces in one order. Competitors only cover 3 pieces, requiring 3 separate vendors, 3x communication cost + 3x shipping + quality inconsistency risk.",
    competitors: [
      { name: "ZprintPro", items: "6 pieces (invitation + envelope + favor bag + place card + table card + red packet)", total: "HKD 4,527", pricePerSet: "HKD 45 / set", turnaround: "5-10 working days" },
      { name: "e-print", items: "3 pieces (invitation + envelope + favor bag, place card / table card / red packet need separate vendor)", total: "HKD 3,800", pricePerSet: "HKD 38 / set", turnaround: "7-14 working days" },
      { name: "intuan", items: "3 pieces (invitation + red packet + favor bag, envelope / place card / table card need separate vendor)", total: "HKD 4,200", pricePerSet: "HKD 42 / set", turnaround: "10-15 working days" },
    ],
    ourItems: "✅ 6 pieces full set",
    ourTotal: "HKD 4,527 (after 10% off)",
    ourPricePerSet: "HKD 45 / set",
    ourTurnaround: "5-10 working days",
    advantage: "✅ 1 vendor + 1 invoice + 1 QC + 1 shipping + 1 WhatsApp support",
  },
  ja: {
    title: 'ブライダル 6点セット · 10%OFF + 無料校正',
    subtitle: '招待状+封筒+引出物袋+席札+テーブルカード+紅包 ワンストップ印刷、10%OFF+無料サンプル、フル披露宴/海外披露宴/教会式/ホテル披露宴に最適。',
    badge: 'セット 10%OFF',
    items: [
      { name: "招待状 (Invitation)", desc: "100枚 / 箔押し+二層紙+白カード250g", originalPrice: "HKD 1,200", bundlePrice: "HKD 1,080" },
      { name: "ブライダル封筒 (Envelope)", desc: "100枚 / C5箔押し内側", originalPrice: "HKD 400", bundlePrice: "HKD 360" },
      { name: "引出物袋 (Favor Bag)", desc: "100枚 / 白カード250g+サテンリボン持ち手", originalPrice: "HKD 1,500", bundlePrice: "HKD 1,350" },
      { name: "席札 (Place Card)", desc: "100枚 / 白カード+箔押しゲスト名", originalPrice: "HKD 850", bundlePrice: "HKD 765" },
      { name: "テーブルカード (Table Number)", desc: "10枚 / 箔押しテーブル番号", originalPrice: "HKD 480", bundlePrice: "HKD 432" },
      { name: "紅包 (Red Packet)", desc: "100枚 / 箔押し龍鳳", originalPrice: "HKD 600", bundlePrice: "HKD 540" },
    ],
    totalOriginal: "HKD 5,030",
    totalBundle: "HKD 4,527",
    savings: "HKD 503 (10%) お得",
    cta: "今すぐセット注文",
    ctaSecondary: "WhatsApp カスタマイズ見積",
    competitorTitle: "vs 競合比較 · ZprintPro 6点 vs 競合 3点",
    competitorSubtitle: "ZprintProは6点ブライダルフルセット ワンストップ対応、競合は3点のみカバー、3社別注文明細、連絡コスト×3+送料×3+品質不一致リスク。",
    competitors: [
      { name: "ZprintPro", items: "6点 (招待状+封筒+引出物袋+席札+テーブルカード+紅包)", total: "HKD 4,527", pricePerSet: "HKD 45 / セット", turnaround: "5-10営業日" },
      { name: "e-print", items: "3点 (招待状+封筒+引出物袋、席札/テーブルカード/紅包は別途仕入先必要)", total: "HKD 3,800", pricePerSet: "HKD 38 / セット", turnaround: "7-14営業日" },
      { name: "intuan", items: "3点 (招待状+紅包+引出物袋、封筒/席札/テーブルカードは別途仕入先必要)", total: "HKD 4,200", pricePerSet: "HKD 42 / セット", turnaround: "10-15営業日" },
    ],
    ourItems: "✅ 6点フルセット",
    ourTotal: "HKD 4,527 (10%OFF後)",
    ourPricePerSet: "HKD 45 / セット",
    ourTurnaround: "5-10営業日",
    advantage: "✅ 1サプライヤー+1請求書+1品質検査+1送料+1WhatsApp客服",
  },
};

export default function WeddingBundle({ locale, productSlug }: WeddingBundleProps) {
  const t = T[locale] || T["zh-hk"];

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 border-2 border-rose-200 rounded-2xl p-5 md:p-8 mb-6">
      {/* Bundle Section */}
      <div className="flex items-start gap-3 mb-5">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500 text-white text-2xl flex-shrink-0">
          🎊
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="text-xl md:text-2xl font-bold text-rose-900 leading-snug">
              {t.title}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500 text-white">
              {t.badge}
            </span>
          </div>
          <p className="text-sm md:text-base text-rose-800 leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* 6-Piece Items Table */}
      <div className="bg-white rounded-xl border border-rose-200 overflow-hidden mb-5">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-rose-100 text-rose-900">
              <th className="text-left px-3 py-2.5 font-semibold">{locale === 'ja' ? 'アイテム' : 'Item'}</th>
              <th className="text-left px-3 py-2.5 font-semibold hidden sm:table-cell">{locale === 'ja' ? '仕様' : 'Spec'}</th>
              <th className="text-right px-3 py-2.5 font-semibold">{locale === 'ja' ? '通常価格' : 'Original'}</th>
              <th className="text-right px-3 py-2.5 font-semibold text-rose-700">{locale === 'ja' ? 'セット価格' : 'Bundle'}</th>
            </tr>
          </thead>
          <tbody>
            {t.items.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-rose-50/30'}>
                <td className="px-3 py-2.5 font-medium text-gray-900">{item.name}</td>
                <td className="px-3 py-2.5 text-gray-600 text-xs hidden sm:table-cell">{item.desc}</td>
                <td className="px-3 py-2.5 text-right text-gray-500 line-through">{item.originalPrice}</td>
                <td className="px-3 py-2.5 text-right text-rose-700 font-semibold">{item.bundlePrice}</td>
              </tr>
            ))}
            <tr className="bg-rose-100 border-t-2 border-rose-300">
              <td colSpan={2} className="px-3 py-3 font-bold text-rose-900">
                {locale === 'ja' ? 'セット合計' : 'Bundle Total'}
              </td>
              <td className="px-3 py-3 text-right text-gray-500 line-through font-medium">{t.totalOriginal}</td>
              <td className="px-3 py-3 text-right text-rose-700 font-bold text-lg">{t.totalBundle}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-rose-100 border border-rose-300 rounded-xl px-4 py-2.5 mb-5 text-center">
        <span className="text-rose-900 font-bold text-sm md:text-base">
          💰 {t.savings}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <a
          href="/quote/?bundle=wedding-6-piece"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-xl text-sm md:text-base transition-colors"
        >
          <span>🛒</span>
          <span>{t.cta}</span>
        </a>
        <a
          href="https://wa.me/8619880851334?text=Wedding%206-Piece%20Bundle%20%E5%92%A8%E8%A9%A2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-rose-900 font-semibold py-3 px-4 rounded-xl text-sm md:text-base border-2 border-rose-300 transition-colors"
        >
          <span>💬</span>
          <span>{t.ctaSecondary}</span>
        </a>
      </div>

      {/* Competitor Comparison Section */}
      <div className="mt-8 pt-6 border-t-2 border-rose-200">
        <h4 className="text-lg md:text-xl font-bold text-rose-900 mb-1">
          {t.competitorTitle}
        </h4>
        <p className="text-sm text-rose-700 mb-4">
          {t.competitorSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {/* ZprintPro Card (Highlighted) */}
          <div className="bg-white rounded-xl border-2 border-rose-500 p-4 shadow-md relative">
            <span className="absolute -top-2.5 left-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500 text-white">
              {locale === 'ja' ? 'おすすめ' : '★ Recommended'}
            </span>
            <h5 className="font-bold text-rose-900 mt-1 mb-2">{t.competitors[0].name}</h5>
            <p className="text-xs text-rose-700 mb-2 font-semibold">{t.competitors[0].items}</p>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '合計' : 'Total'}:</span>
                <span className="font-bold text-rose-700">{t.competitors[0].total}</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '単価' : 'Per set'}:</span>
                <span className="font-semibold">{t.competitors[0].pricePerSet}</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '納期' : 'Turnaround'}:</span>
                <span className="font-semibold">{t.competitors[0].turnaround}</span>
              </div>
            </div>
          </div>

          {/* e-print Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 opacity-75">
            <h5 className="font-bold text-gray-700 mb-2">{t.competitors[1].name}</h5>
            <p className="text-xs text-gray-500 mb-2">{t.competitors[1].items}</p>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '合計' : 'Total'}:</span>
                <span className="font-semibold">{t.competitors[1].total}</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '単価' : 'Per set'}:</span>
                <span>{t.competitors[1].pricePerSet}</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '納期' : 'Turnaround'}:</span>
                <span>{t.competitors[1].turnaround}</span>
              </div>
            </div>
          </div>

          {/* intuan Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 opacity-75">
            <h5 className="font-bold text-gray-700 mb-2">{t.competitors[2].name}</h5>
            <p className="text-xs text-gray-500 mb-2">{t.competitors[2].items}</p>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '合計' : 'Total'}:</span>
                <span className="font-semibold">{t.competitors[2].total}</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '単価' : 'Per set'}:</span>
                <span>{t.competitors[2].pricePerSet}</span>
              </div>
              <div className="flex justify-between">
                <span>{locale === 'ja' ? '納期' : 'Turnaround'}:</span>
                <span>{t.competitors[2].turnaround}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-center">
          <p className="text-sm text-rose-900 font-semibold">
            {t.advantage}
          </p>
        </div>
      </div>
    </div>
  );
}
