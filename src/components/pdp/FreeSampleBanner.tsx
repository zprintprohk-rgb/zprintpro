"use client";

/**
 * FreeSampleBanner — 婚礼 SKU PDP 置顶横幅
 * V3.7 DoD 5: 免费打样置顶 (5 天免费打样 + 100+ 件可全额抵扣)
 * 位置: ProductGallery 之后, QuoteCalculator 之前
 */

interface FreeSampleBannerProps {
  locale: string;
  productSlug?: string;
}

const T: Record<string, {
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  features: string[];
  disclaimer: string;
}> = {
  "zh-hk": {
    title: "5 天免費打樣 · 確認滿意再下單",
    subtitle: "智印港 100 個起印享免費設計 + 免費材質樣本 + 5 天打樣",
    cta: "WhatsApp 19880851334 即時報價",
    ctaSecondary: "查看材質樣本",
    features: [
      "5 種材質 (白卡 / 珠光 / 萊妮紋 / 棉 / 燙金專用) 免費寄順豐到付",
      "100 個起印享免費設計 (3 輪免費修改)",
      "5 天數碼打樣 + 1 張實物樣本,確認滿意後正式下單可全額抵扣",
      "打樣不滿意全額退款 (質量問題),100% 無風險",
    ],
    disclaimer: "* 急件 48 小時可議, 詳情 WhatsApp 客服",
  },
  en: {
    title: "5-Day Free Proofing — Confirm Before Production",
    subtitle: "ZprintPro 100+ pieces get free design + material samples + 5-day proofing",
    cta: "WhatsApp 19880851334 for instant quote",
    ctaSecondary: "Request material samples",
    features: [
      "5 materials (white card / pearl / linen / cotton / foil-ready) free SF Express COD",
      "Free design for 100+ pieces (3 free revision rounds)",
      "5-day digital proof + 1 physical sample, full refund on orders 100+ pieces",
      "100% risk-free, full refund on quality issues",
    ],
    disclaimer: "* 48-hour rush available, contact WhatsApp for details",
  },
  ja: {
    title: "5日間無料校正 — 本生産前に確認",
    subtitle: "ZprintProは100枚以上で無料デザイン+素材サンプル+5日間校正",
    cta: "WhatsApp 19880851334 で即時見積",
    ctaSecondary: "素材サンプル請求",
    features: [
      "5素材 (白カード / パール / ラインペーパー / コットン / 箔押し) 無料順豊着払い",
      "100枚以上無料デザイン (3回無料修正)",
      "5日間デジタル校正+1枚実物サンプル、100枚以上発注で全額返金",
      "100%リスクフリー、品質問題は全額返金",
    ],
    disclaimer: "* 48時間特急対応可能、詳細はWhatsApp客服まで",
  },
};

export default function FreeSampleBanner({ locale, productSlug }: FreeSampleBannerProps) {
  const t = T[locale] || T["zh-hk"];

  return (
    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-300 rounded-2xl p-5 md:p-7 mb-6 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white text-xl flex-shrink-0">
          🎁
        </span>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-1.5 leading-snug">
            {t.title}
          </h3>
          <p className="text-sm md:text-base text-amber-800 leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      <ul className="space-y-2 mb-4 pl-1">
        {t.features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm md:text-[15px] text-amber-900 leading-relaxed">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex-shrink-0 mt-0.5">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <a
          href="https://wa.me/8619880851334"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-4 rounded-xl text-sm md:text-base transition-colors"
        >
          <span>💬</span>
          <span>{t.cta}</span>
        </a>
        <a
          href="#material-samples"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-amber-900 font-semibold py-3 px-4 rounded-xl text-sm md:text-base border-2 border-amber-300 transition-colors"
        >
          <span>📦</span>
          <span>{t.ctaSecondary}</span>
        </a>
      </div>

      <p className="text-xs text-amber-700 mt-3 text-center">
        {t.disclaimer}
      </p>
    </div>
  );
}
