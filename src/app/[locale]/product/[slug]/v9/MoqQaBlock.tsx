/**
 * MoqQaBlock — PDP 内嵌 MOQ 问答块（Q-1 交付物 4，2026-09-23）
 *
 * 依据: 重要文件/deepseek-exec-prompt-render-trio-and-title-v5.md 交付物 4（Q-1）
 *   · 背景: 9/18–21 L1 批「手工注入」的 ⚡ 最少可以印幾張 块只有 a4-flyers/waterproof-stickers
 *     两槽有（wall-calendars 无），覆盖靠运气；且硬编码内容对无 price-table 档位不符的 SKU 失实。
 *     裁决: 块保留、手工路线废止 —— 模板化派生。
 *   · 动作: 本组件渲染时 100% 从数据派生 —— minQty = products.ts (minQuantity)、
 *     nextTier = price-table (getPriceTableForSlug) 中首个 > minQty 的档位。
 *     禁新增 SKU 级数据字段、禁手写数字。
 *   · 位置: 价格阶梯之后、产品详情之前（父组件接入）。
 *   · 三语模板逐字写入本组件（交付物 4 原文）。ja counter 按附录 A §7.1 量词配置表
 *     （チラシ/貼紙/ポスター=枚；禁「份」、禁全站统一「部」）——本块覆盖纸品线（传单/贴纸/贺卡），
 *     全部 counter = 枚。
 *   · 数据诚实: 无 price-table 的 SKU（nextTier 不可派生）渲染短版（只含 minQty 真值 + 机制说明，
 *     不编造档位数字），绝不手写档位。
 *   · 覆盖: 纸品线小批量（isPaperGoodsSmallBatch = 传单/贴纸/贺卡，模板单位 張/pcs/枚 逐字精确）。
 *     箱/袋/册等其他品类因模板单位（張）不适用，不在本块范围（挂账 Q-2 窗批）。
 */
import type { Locale } from '@/lib/seo';
import { getPriceTableForSlug } from '@/lib/price-injector';

interface Props {
  locale: Locale;
  slug: string;
  minQuantity: number;
}

/** zh-hk 模板（交付物 4 原文逐字; {nextTier−1} 中的「−」为 U+2212 减号） */
function zhTemplate(minQty: number, nextTier: number | null): string {
  if (nextTier !== null) {
    return (
      `最少可以印幾張？${minQty} 張起印。${minQty} 與 ${nextTier - 1} 張都接，` +
      '差別在單張單價：起印量愈低，單張愈貴（開機與校色成本攤在少量上）；' +
      `${nextTier} 張以上單張明顯較平，量產檔位見上表。`
    );
  }
  // 数据诚实短版（无 price-table 档位可派生时; 不编造档位数字）
  return `最少可以印幾張？${minQty} 張起印。起印量愈低，單張愈貴（開機與校色成本攤在少量上）；量大單張愈平，量產檔位見報價。`;
}

/** en 模板（交付物 4 原文逐字; en 原模板不含 nextTier） */
function enTemplate(minQty: number): string {
  return (
    `What's the minimum order? From ${minQty} pcs. ` +
    'Small runs carry setup + calibration costs, so unit price decreases with volume — see the price ladder above.'
  );
}

/** ja 模板（交付物 4 原文逐字; counter 按 §7.1 纸品线=枚） */
function jaTemplate(minQty: number, nextTier: number | null): string {
  const full =
    `最小注文数は？${minQty}枚〜。` +
    '小ロットはセットアップ・色校正コストが乗るため単価は高め。' +
    `量産档（${nextTier}枚〜）で単価が大幅に下がります。価格表は上記をご覧ください。`;
  if (nextTier !== null) return full;
  // 数据诚实短版（无 price-table 档位可派生时; 不编造档位数字）
  return `最小注文数は？${minQty}枚〜。小ロットはセットアップ・色校正コストが乗るため単価は高め。価格表は上記をご覧ください。`;
}

export function MoqQaBlock({ locale, slug, minQuantity }: Props) {
  // nextTier = price-table 中首个 > minQty 的档位（数据派生; 无表 → null → 短版）
  const table = getPriceTableForSlug(slug);
  const cfg = table
    ? table.configs?.[Math.max(0, table.defaultConfigIndex ?? 0)] ?? table.configs?.[0]
    : undefined;
  const nextTier = cfg?.tiers?.find((t) => t.qty > minQuantity)?.qty ?? null;

  const text =
    locale === 'zh-hk'
      ? zhTemplate(minQuantity, nextTier)
      : locale === 'ja'
        ? jaTemplate(minQuantity, nextTier)
        : enTemplate(minQuantity);

  return (
    <section
      className="max-w-[1320px] mx-auto px-6 mb-16"
      aria-label={locale === 'zh-hk' ? '起印量問答' : locale === 'ja' ? '最小注文数 Q&A' : 'MOQ Q&A'}
    >
      <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg p-5">
        <p className="text-[14.5px] text-emerald-900 leading-relaxed">
          <span className="font-semibold">⚡</span> {text}
        </p>
      </div>
    </section>
  );
}
