/**
 * 印刷方式與起印量口徑 SSoT（MOQ / print-method policy）
 *
 * 拍板來源（依 §0.34.2 衝突優先級：K3 最新拍板 > AGENTS.md > 入口技能）:
 *   - K3 2026-09-18 業務口徑原話：「要理解一本都可以印，有數碼印刷和批量膠印，這是價格問題，
 *     1本，5本，10本，50本，100本都可以印，只是單價問題和印刷方法的問題……只要統一說明就好」
 *   - K3 2026-09-18 v10.1 決策 1 終裁 B（`docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md`）:
 *     ① 僅限真實可接 1 本的 SKU（數碼線書刊／本冊類）；柯式線 MOQ 不動
 *     ② 價格數字不動（兩次裁定鎖定：月曆 HK$8-25 / BK-002 HK$6-32）
 *     ③ 文案只寫「我哋 1 本起印」，禁寫競品 MOQ 對比數字（合規紅線）
 *     ④ 7 天後（9/25）回報書刊簇 GSC CTR/imp 變化
 *   - 方案依據：`docs/2026-09-18-moq-unified-statement-and-enhancement-plan.md` §4
 *
 * ★ 作用域（本檔只做「展示層」口徑）:
 *   - `products.ts` 的 `minQuantity` 是**報價引擎輸入**，本次**不動**（v10.1 決策 1-B：可逆優先）。
 *   - 本檔提供的是 PDP／品類頁「起訂量」的**顯示文案**，以及統一說明段。
 *
 * ★ 不新造數字: 切換點沿用站上既有表述「100 本以上柯式更經濟」
 *   （原文已在 `src/data/category-seo-content.ts` books 品類頁）。
 */

import type { Locale } from '@/types/locale';

/**
 * 統一說明 · 一句話版（各頁通用短句）
 * 只表述機制（1 本起 / 數碼 vs 柯式 / 單價與交期分流），不含任何競品 MOQ 數字。
 */
export const MOQ_ONELINER: Record<Locale, string> = {
  'zh-hk': '1 本起印，無最低起訂量。少量走數碼印刷、批量走柯式膠印，單價與交期按印量分流。',
  en: 'From 1 copy, no minimum order. Short runs print digitally, larger runs on offset — unit price and lead time scale with quantity.',
  ja: '1 部から、最低注文数なし。少部数はデジタル印刷、まとまった部数はオフセット印刷。単価と納期は部数に応じて変わります。',
};

/** 統一說明 · 標準段（PDP／品類頁／blog 通用塊） */
export const MOQ_STANDARD_PARAGRAPH: Record<Locale, string> = {
  'zh-hk':
    '起印量與印刷方式：1 本起印，無最低起訂量。少量（自費出版、試產、限量本、樣書）採數碼印刷：免開版費、按需生產、打稿與交期較快，單本單價較高。批量採柯式膠印：需攤分版費，印量愈大單本單價愈低，100 本以上柯式印刷更經濟、色彩更準確；因需排版調機，前置時間較長。兩種方式的單價與交期不同，30 秒 AI 即時報價會按你的數量與規格自動對應最適方式。',
  en: 'Minimum order and printing method: from 1 copy, no minimum order quantity. Short runs (self-publishing, prototypes, limited editions, proof copies) are printed digitally — no plate fee, on-demand production, faster proofing and lead time, higher unit price. Larger runs use offset litho: plate costs are shared across the run, so unit price drops as quantity rises, and 100+ copies is more economical on offset with more accurate colour; make-ready means a longer lead time. Unit price and lead time differ between the two methods, and our 30-second AI quote automatically matches the right method to your quantity and specs.',
  ja: '最小ロットと印刷方式：1 部から、最低注文数はありません。少部数（自費出版・試作・限定版・見本）はデジタル印刷——版代不要・オンデマンド生産・校正と納期が速く、1 部あたり単価は高めです。まとまった部数はオフセット印刷——版代を部数で割るため、部数が増えるほど 1 部あたり単価が下がり、100 部以上はオフセットがより経済的で色再現も安定します。段取りが必要なため納期は長めです。単価と納期は方式で異なり、30 秒 AI 見積もりが数量と仕様に応じて最適な方式を自動で選びます。',
};

/**
 * AEO 快速答案（最容易被 AI／SERP 摘取的問答形態）
 * 對應 `docs/2026-09-18-moq-unified-statement-and-enhancement-plan.md` §五 L1-2。
 */
export const MOQ_AEO: Record<Locale, { q: string; a: string }> = {
  'zh-hk': {
    q: '最少可以印幾本？',
    a: '1 本起印，無最低起訂量。少量走數碼印刷、批量走柯式膠印，100 本以上柯式印刷更經濟，色彩更準確。',
  },
  en: {
    q: 'What is the minimum order quantity?',
    a: 'From 1 copy, no minimum order. Short runs print digitally, larger runs on offset — 100+ copies is more economical on offset.',
  },
  ja: {
    q: '最小ロットは何部からですか？',
    a: '1 部から、最低注文数はありません。少部数はデジタル印刷、まとまった部数はオフセット印刷で、100 部以上はオフセットがより経済的です。',
  },
};

/**
 * 展示層「起訂量」短句（PDP 價格卡 / 品類頁產品卡）
 * 只在數碼線書刊／本冊類 SKU 上顯示；其餘 SKU 一律維持原本的 `minQuantity` 數字（零 churn）。
 */
export const MOQ_DISPLAY: Record<Locale, string> = {
  'zh-hk': '1 本起印（數碼）· 100 本以上柯式更經濟',
  en: 'From 1 copy (digital) · 100+ cheaper on offset',
  ja: '1 部から（デジタル）· 100 部以上はオフセットが経済的',
};

/**
 * 數碼線書刊／本冊類 SKU（真實可接 1 本，per v10.1 決策 1-B 條件①）
 * 全部屬 `books` 品類（書刊／畫冊／本冊），走數碼按需生產線。
 * ⚠️ 柯式線 SKU（如 5 個餐牌類）不在此名單 → 起訂量展示不動。
 *
 * 2026-09-19 K3 裁決 N1/N4「補進名單」: 加入 `saddle-stitch-booklets`。
 * 理由: books 品類頁既已如實寫「1 本起訂（數碼印刷）」且該表述覆蓋 5 個 SKU，
 *   而本名單原只有 4 個 ⇒ 程式碼與品類頁口徑不一致。裁決為「以品類頁為準，補進名單」。
 *   該 SKU 屬 `books`、走數碼線, 條件①（真實可接 1 本）成立; 其 `minQuantity` 仍為 100 不動
 *   （本檔僅改**展示層**口徑, 不碰引擎欄位 — per 1-B 紅線②）。
 */
export const DIGITAL_LINE_BOOK_SLUGS: readonly string[] = [
  'catalog-printing',
  'perfect-bound-books',
  'hardcover-books',
  'spiral-notebooks',
  'saddle-stitch-booklets',
];

/**
 * 紙品線 SKU（傳單／貼紙／賀卡）— 2026-09-19 K3 拍板：起印量 100 → 10。
 *
 * ★ 這批是真實口徑放寬，非純文案：`products.ts` 的 `minQuantity` 已同步改為 10，
 *   且 `src/data/price-tables/*.json` 已加入對應的 10/25/50/75/99 小批量 modeled 檔
 *   （模型 = 開機費 HK$50 + 隨量遞減單張價；區間上限 = 既有最低真實檔總價，
 *   保證 99 張不貴過 100 張）。生成器：`scripts/moq10-add-small-batch-tiers.mjs`
 *   審計閘門：`scripts/moq10-audit-ladders.mjs`
 *
 * ★ 不在本名單 = 維持原本 `minQuantity` 數字（書刊本冊 100／包裝盒 500／月曆 1000 …）。
 */
export const PAPER_GOODS_SMALL_BATCH_SLUGS: readonly string[] = [
  // 傳單線
  'a4-flyers',
  'a5-flyers',
  'double-sided-flyers',
  'folded-leaflets',
  'thick-paper-flyers',
  'eco-flyers',
  'same-day-flyers',
  'school-flyers',
  // 貼紙線
  'waterproof-stickers',
  'transparent-stickers',
  'removable-stickers',
  'small-batch-stickers',
  'die-cut-stickers',
  'foil-stickers',
  'security-stickers',
  'fluorescent-stickers',
  // 賀卡線
  'premium-greeting-cards',
  'thick-greeting-cards-400g',
  'foil-greeting-cards',
  'spot-uv-greeting-cards',
  'matte-greeting-cards',
  'rounded-corner-greeting-cards',
];

/** 紙品線起印量（K3 2026-09-19 拍板） */
export const PAPER_GOODS_MOQ = 10;

/** 該 SKU 是否屬「紙品線小批量」（10 張／個起印） */
export function isPaperGoodsSmallBatch(slug: string): boolean {
  return PAPER_GOODS_SMALL_BATCH_SLUGS.includes(slug);
}

/**
 * 紙品線「起印量 + 小批量計價」統一說明（PDP 用）。
 * 只表述機制（10 起／愈少愈貴／量大單價降），不含任何競品 MOQ 數字（合規紅線）。
 */
export const PAPER_GOODS_MOQ_NOTE: Record<Locale, string> = {
  'zh-hk': '10 張起印。小批量按開機費 + 單張價計：起印量愈低，單張單價愈高（校色、上機調試與開機成本攤在少量上）；印量愈大單張愈平，量產檔位見上表。',
  en: 'From 10 pieces. Small runs are priced as a setup fee plus a per-piece rate: the lower the quantity, the higher the unit price (colour calibration, make-ready and press start-up are spread over fewer pieces). Unit price falls as quantity rises — see the tier table above.',
  ja: '10 枚から。小ロットは段取り費＋1枚単価でのご案内です。部数が少ないほど 1 枚あたりの単価は高くなり（色校正・段取り・印刷機の立ち上げを少部数で分担するため）、部数が増えるほど単価は下がります。量産ロットは上記の表をご参照ください。',
};

/**
 * 紙品線 AEO 快速答案（PDP／品類頁／FAQ 通用）。
 */
export const PAPER_GOODS_MOQ_AEO: Record<Locale, { q: string; a: string }> = {
  'zh-hk': {
    q: '最少可以印幾張？',
    a: '10 張起印。10 張與 99 張都接，差別在單張單價：起印量愈低，單張愈貴（開機與校色成本攤在少量上）；100 張以上單張明顯較平。',
  },
  en: {
    q: 'What is the minimum order quantity?',
    a: 'From 10 pieces. We accept both 10 and 99 pieces — the difference is the unit price: the lower the quantity, the higher the unit price, because press start-up and colour calibration are spread over fewer pieces. From 100 pieces the unit price drops clearly.',
  },
  ja: {
    q: '最小ロットは何枚からですか？',
    a: '10 枚からです。10 枚でも 99 枚でも承りますが、1 枚あたりの単価が異なります。部数が少ないほど単価は高く（印刷機の立ち上げと色校正を少部数で分担）、100 枚以上で単価が明確に下がります。',
  },
};

/**
 * 該 SKU 的 PDP／品類頁「起印量」顯示值。
 * 優先序：紙品線小批量（10） > 數碼線書刊（1 本） > 原樣 minQuantity。
 */
export function getDisplayMinOrderV2(locale: Locale, slug: string, minQuantity: number): string {
  if (isPaperGoodsSmallBatch(slug)) return String(PAPER_GOODS_MOQ);
  return getDisplayMinOrder(locale, slug, minQuantity);
}

/** 該 SKU 是否屬「數碼線書刊／本冊類」（可如實宣稱 1 本起印） */
export function isDigitalLineBook(slug: string): boolean {
  return DIGITAL_LINE_BOOK_SLUGS.includes(slug);
}

/**
 * PDP／品類頁「起訂量」展示層取值。
 * - 數碼線書刊／本冊類 → `MOQ_DISPLAY[locale]`（1 本起印口徑）
 * - 其餘 SKU → 原樣回傳 `minQuantity`（與改動前完全一致）
 */
export function getDisplayMinOrder(locale: Locale, slug: string, minQuantity: number): string {
  return isDigitalLineBook(slug) ? MOQ_DISPLAY[locale] : String(minQuantity);
}

/* ============================================================================
 * P2-6 傳統膠印軟分流 (K3 2026-09-19 路線圖)
 * ============================================================================
 * 需求原話: 「傳統膠印軟分流 (報價器邏輯)」+ 研究提案 §二:
 *   「建議傳統膠印起訂量維持 100 起, 但加一條規則:
 *     100-199 本 → 使用數碼印刷承接 (無需製版)
 *     200 本以上 → 如客戶追求單價最優, 引導至膠印方案」
 *
 * ★ 「軟」分流的意思: **不阻擋落單、不改報價數字**, 只在報價器給出
 *   「你這個量走 X 更抵 / 交期更快」的建議。硬性改價或改 MOQ 屬另一決策。
 * ★ 為何 200: 100-199 走膠印要攤版費 + 調機, 短版攤不開 (研究提案已載明);
 *   200+ 才開始有明顯膠印成本優勢。此切點屬**業務規則**, 來源見函式註釋。
 * ★ 門檻可調: 集中在此常數, 不散落各檔 (與門童 #19 動態讀值同一原則)。
 */

/** 膠印起訂量 (現行真實口徑; price-tables 內 anchor 亦以此為最低檔) */
export const OFFSET_MIN_QTY = 100;
/** 膠印開始有成本優勢的數量 (低於此值引導數碼) */
export const OFFSET_ECONOMICAL_FROM = 200;

export type PrintMethod = 'digital' | 'offset';

export interface PrintMethodAdvice {
  /** 建議採用的印刷方式 */
  recommended: PrintMethod;
  /** 是否處於「過渡區間」(可兩邊走, 建議以數碼承接) */
  isCrossover: boolean;
  /** 是否應向客戶提示「加量至 200 走膠印更平」 */
  suggestBumpToOffset: boolean;
  /** 提示文字 (三語) */
  note: Record<Locale, string>;
}

/**
 * 依品類與數量給出印刷方式建議 (軟分流, 不影響報價)。
 *
 * @param slug    產品 slug
 * @param quantity 客戶輸入數量
 *
 * 規則:
 *   1. 紙品線小批量 (傳單/貼紙/賀卡) → 數碼; 數量 ≥ 200 時提示可轉膠印更平
 *   2. 數碼線書刊/本冊 (1 本起印) → 數量 < 200 數碼; ≥ 200 提示膠印
 *   3. 其他品類 (包裝盒/紙袋/月曆/海報…) → 不給建議 (回 null)
 */
export function getPrintMethodAdvice(slug: string, quantity: number): PrintMethodAdvice | null {
  const isPaper = isPaperGoodsSmallBatch(slug);
  const isBook = isDigitalLineBook(slug);
  if (!isPaper && !isBook) return null;

  if (quantity < OFFSET_MIN_QTY) {
    // 未達膠印起訂量 → 只能數碼
    return {
      recommended: 'digital',
      isCrossover: false,
      suggestBumpToOffset: false,
      note: {
        'zh-hk': `此數量走數碼印刷：免製版、免版費，最快即日打樣。${OFFSET_MIN_QTY} 件起可轉柯式膠印。`,
        en: `Digital printing at this quantity: no plates, no plate fee, fastest proofing. Offset becomes available from ${OFFSET_MIN_QTY} pcs.`,
        ja: `この部数はデジタル印刷でのご案内です。版代不要で最速校正。${OFFSET_MIN_QTY} 部からオフセット印刷が可能です。`,
      },
    };
  }

  if (quantity < OFFSET_ECONOMICAL_FROM) {
    // 100-199 過渡區: 以數碼承接, 提示加量更平
    return {
      recommended: 'digital',
      isCrossover: true,
      suggestBumpToOffset: true,
      note: {
        'zh-hk': `此數量屬過渡區間（${OFFSET_MIN_QTY}-${OFFSET_ECONOMICAL_FROM - 1}）：柯式需攤版費與調機費，短版攤不開，建議繼續走數碼。加到 ${OFFSET_ECONOMICAL_FROM} 件以上，柯式單價會明顯較低。`,
        en: `Crossover range (${OFFSET_MIN_QTY}-${OFFSET_ECONOMICAL_FROM - 1}): offset has to absorb plate and make-ready costs, which short runs cannot spread. Stay digital here — from ${OFFSET_ECONOMICAL_FROM} pcs the offset unit price drops clearly.`,
        ja: `移行レンジ（${OFFSET_MIN_QTY}-${OFFSET_ECONOMICAL_FROM - 1}）です。オフセットは版代と段取り費を部数で割るため短版では割高になります。ここはデジタルがお得で、${OFFSET_ECONOMICAL_FROM} 部以上でオフセットの単価が明確に下がります。`,
      },
    };
  }

  return {
    recommended: 'offset',
    isCrossover: false,
    suggestBumpToOffset: false,
    note: {
      'zh-hk': `此數量建議走柯式膠印：版費與調機費可攤分，單價最低、色彩最準確。交期較數碼長（需排版調機）。`,
      en: `Offset is recommended at this quantity: plate and make-ready costs spread across the run, giving the lowest unit price and most accurate colour. Lead time is longer than digital (make-ready required).`,
      ja: `この部数はオフセット印刷がおすすめです。版代と段取り費を部数で割れるため単価が最も安く、色再現も安定します。段取りのため納期はデジタルより長めです。`,
    },
  };
}
