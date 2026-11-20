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
import { products } from '@/data/products';

/**
 * 統一說明 · 一句話版（各頁通用短句）
 * 只表述機制（10 本起 / 數碼 vs 柯式 / 單價與交期分流），不含任何競品 MOQ 數字。
 * 2026-09-19 K3 拍板第三波: 書刊 10 本起 (原「1 本起印」已與 minQuantity=10 矛盾)。
 */
export const MOQ_ONELINER: Record<Locale, string> = {
  'zh-hk': '10 本起印。少量走數碼印刷、批量走柯式膠印，單價與交期按印量分流。',
  en: 'From 10 copies. Short runs print digitally, larger runs on offset — unit price and lead time scale with quantity.',
  ja: '10 部から。少部数はデジタル印刷、まとまった部数はオフセット印刷。単価と納期は部数に応じて変わります。',
};

/** 統一說明 · 標準段（PDP／品類頁／blog 通用塊） */
export const MOQ_STANDARD_PARAGRAPH: Record<Locale, string> = {
  'zh-hk':
    '起印量與印刷方式：10 本起印。少量（自費出版、試產、限量本、樣書）採數碼印刷：免開版費、按需生產、打稿與交期較快，單本單價較高。批量採柯式膠印：需攤分版費，印量愈大單本單價愈低，100 本以上柯式印刷更經濟、色彩更準確；因需排版調機，前置時間較長。兩種方式的單價與交期不同，30 秒 AI 即時報價會按你的數量與規格自動對應最適方式。',
  en: 'Minimum order and printing method: from 10 copies. Short runs (self-publishing, prototypes, limited editions, proof copies) are printed digitally — no plate fee, on-demand production, faster proofing and lead time, higher unit price. Larger runs use offset litho: plate costs are shared across the run, so unit price drops as quantity rises, and 100+ copies is more economical on offset with more accurate colour; make-ready means a longer lead time. Unit price and lead time differ between the two methods, and our 30-second AI quote automatically matches the right method to your quantity and specs.',
  ja: '最小ロットと印刷方式：10 部から。少部数（自費出版・試作・限定版・見本）はデジタル印刷——版代不要・オンデマンド生産・校正と納期が速く、1 部あたり単価は高めです。まとまった部数はオフセット印刷——版代を部数で割るため、部数が増えるほど 1 部あたり単価が下がり、100 部以上はオフセットがより経済的で色再現も安定します。段取りが必要なため納期は長めです。単価と納期は方式で異なり、30 秒 AI 見積もりが数量と仕様に応じて最適な方式を自動で選びます。',
};

/**
 * AEO 快速答案（最容易被 AI／SERP 摘取的問答形態）
 * 對應 `docs/2026-09-18-moq-unified-statement-and-enhancement-plan.md` §五 L1-2。
 * 2026-09-19 K3 拍板第三波: 答案由「1 本起印」同步為「10 本起印」。
 */
export const MOQ_AEO: Record<Locale, { q: string; a: string }> = {
  'zh-hk': {
    q: '最少可以印幾本？',
    a: '10 本起印。少量走數碼印刷、批量走柯式膠印，100 本以上柯式印刷更經濟，色彩更準確。',
  },
  en: {
    q: 'What is the minimum order quantity?',
    a: 'From 10 copies. Short runs print digitally, larger runs on offset — 100+ copies is more economical on offset.',
  },
  ja: {
    q: '最小ロットは何部からですか？',
    a: '10 部から。少部数はデジタル印刷、まとまった部数はオフセット印刷で、100 部以上はオフセットがより経済的です。',
  },
};

/**
 * 展示層「起訂量」短句（PDP 價格卡 / 品類頁產品卡）
 * 2026-09-19 K3 拍板第三波: 書刊本冊 minQuantity 100 → **10**, 故本口徑由「1 本起印」改為
 *   「10 本起印」。原文的「1 本」已與產品資料層矛盾 (minQuantity=10), 必須同步,
 *   否則 PDP 會同時出現「1 本起印」(本檔) 與「10」(minQuantity) 兩個數字。
 * 保留「100 本以上柯式更經濟」的機制說明 (與 P2-6 膠印軟分流同一分水嶺)。
 */
export const MOQ_DISPLAY: Record<Locale, string> = {
  'zh-hk': '10 本起印（數碼）· 100 本以上柯式更經濟',
  en: 'From 10 copies (digital) · 100+ cheaper on offset',
  ja: '10 部から（デジタル）· 100 部以上はオフセットが経済的',
};

/**
 * 數碼線書刊／本冊類 SKU — 走數碼按需生產線。
 * ⚠️ 柯式線 SKU（如 5 個餐牌類）不在此名單 → 起訂量展示不動。
 *
 * 2026-09-19 K3 裁決 N1/N4「補進名單」: 加入 `saddle-stitch-booklets`。
 * 2026-09-19 K3 拍板第三波: 本名單 6 個 SKU 的 `products.ts minQuantity` 已由 100 改為 **10**,
 *   口徑 (MOQ_DISPLAY / MOQ_AEO) 同步為「10 本起印」。
 *   (歷史: 2026-09-18 v10.1 決策 1-B 曾只改展示層為「1 本起印」而 minQuantity 不動;
 *    本次為 K3 拍板的正式放開, 展示層與資料層已一致。)
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
 * 起訂量**單位**的語系對照（K3 2026-09-20 裁決：按品類區分，不統一為「本」）。
 *
 * 為什麼需要獨立映射：`products.ts` 的 `unitLabel` 存的是**中文量詞**（張／本／份，客戶可見的
 * 中文口徑），但同一數量的英文/日文量詞不同（張→sheets、本→books、份→sets）。
 * 若直接拿中文量詞去組英文句會出現「10 張 MOQ」這種混語。
 *
 * 市場依據（K3）：PVC 餐牌用「張」、精裝用「本」、紙質餐牌用「張」、酒水單用「份」。
 */
const UNIT_LOCALE_MAP: Record<string, { en: string; ja: string }> = {
  張: { en: 'sheets', ja: '枚' },
  本: { en: 'books', ja: '冊' },
  份: { en: 'sets', ja: '部' },
  個: { en: 'pcs', ja: '個' },
};

/** 取該 SKU 的顯示單位（中文量詞）；未設定時回傳 undefined（呼叫端沿用既有行為） */
export function getUnitLabel(slug: string): string | undefined {
  return products.find((p) => p.slug === slug)?.unitLabel;
}

/** 依語系取單位詞；未設定或未知量詞時回傳 null（呼叫端沿用既有「本」口徑） */
export function getUnitLabelFor(locale: Locale, slug: string): string | null {
  const zh = getUnitLabel(slug);
  if (!zh) return null;
  if (locale === 'en' || locale === 'ja') return UNIT_LOCALE_MAP[zh]?.[locale] ?? null;
  return zh;
}

/**
 * 依 SKU 的 `unitLabel` 把「數量」組成帶單位的起訂量文案。
 * 未設定 unitLabel 的 SKU → 回傳 null（呼叫端沿用既有「本」組句，向後兼容）。
 *
 * 例：`composeMoqLabel('zh-hk', 'pvc-menus', 10)` → `「10 張起」`
 */
export function composeMoqLabel(locale: Locale, slug: string, minQuantity: number): string | null {
  const unit = getUnitLabelFor(locale, slug);
  if (!unit) return null;
  switch (locale) {
    case 'en':
      return `${minQuantity} ${unit}`;
    case 'ja':
      return `${minQuantity}${unit}から`;
    default:
      return `${minQuantity} ${unit}起`;
  }
}

/**
 * 該 SKU 的 PDP／品類頁「起印量」顯示值。
 * 優先序：紙品線小批量（10） > 數碼線書刊（1 本） > 原樣 minQuantity。
 *
 * ★ 2026-09-20：若該 SKU 設有 `unitLabel`，改以 `composeMoqLabel()` 組句
 *   （餐牌用「張/份」、精裝用「本」）；未設定者行為完全不變（向後兼容）。
 */
export function getDisplayMinOrderV2(locale: Locale, slug: string, minQuantity: number): string {
  const withUnit = composeMoqLabel(locale, slug, minQuantity);
  if (withUnit) return withUnit;
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
 * 起印量「判定域」SSoT (K3 2026-09-19 價目同步波提質三件)
 * ============================================================================
 * 為什麼需要: 價目同步波 v2 分類報告抽驗發現假陽性, 三個根因全部係「判定域」唔清楚:
 *   ① 跨品類綜合頁被當單一品類 —— 例: 即日印刷指南「100 張起印，6 大場景
 *      (展會/投標/海報/傳單/易拉寶/貼紙)」被歸為海報 ⇒ 目標 1 張 = 錯。
 *   ② 同一品類內門檻唔同 —— 海報 A1 噴繪 1 張起 vs A2/A3 銅版紙 10 張起。
 *   ③ 標籤錯但目標值偶然對 —— 「1冊から」因窗內先出現「ステッカー」被標成貼紙。
 *
 * ⇒ 本章建立三個明確判定域, 令分類器唔再靠關鍵詞滑窗猜:
 *   A. PRODUCT_TARGETS    : SKU → 目標起印量 (單一品類產品)
 *   B. CROSS_CATEGORY_PAGES: 跨品類綜合頁 / 對比頁 → **不套用單一目標**, 另立門檻組
 *   C. POSTER_SIZE_TARGETS: 海報按尺寸細分目標
 */

/** A. 單一產品 SKU → 目標起印量 (與 products.ts minQuantity 同步; 變動時一併更新) */
export const PRODUCT_TARGETS: Record<string, { target: number; unit: string; label: string }> = {
  // 傳單線
  'a4-flyers': { target: 10, unit: '張', label: '傳單' },
  'a5-flyers': { target: 10, unit: '張', label: '傳單' },
  'double-sided-flyers': { target: 10, unit: '張', label: '傳單' },
  'folded-leaflets': { target: 10, unit: '張', label: '傳單' },
  'thick-paper-flyers': { target: 10, unit: '張', label: '傳單' },
  'eco-flyers': { target: 10, unit: '張', label: '傳單' },
  'same-day-flyers': { target: 10, unit: '張', label: '傳單' },
  'school-flyers': { target: 10, unit: '張', label: '傳單' },
  // 貼紙線
  'waterproof-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  'transparent-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  'removable-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  'small-batch-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  'die-cut-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  'foil-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  'security-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  'fluorescent-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },
  // 賀卡線
  'premium-greeting-cards': { target: 10, unit: '張', label: '賀卡' },
  'thick-greeting-cards-400g': { target: 10, unit: '張', label: '賀卡' },
  'foil-greeting-cards': { target: 10, unit: '張', label: '賀卡' },
  'spot-uv-greeting-cards': { target: 10, unit: '張', label: '賀卡' },
  'matte-greeting-cards': { target: 10, unit: '張', label: '賀卡' },
  'rounded-corner-greeting-cards': { target: 10, unit: '張', label: '賀卡' },
  // 書刊線
  'catalog-printing': { target: 10, unit: '本', label: '書刊/畫冊' },
  'saddle-stitch-booklets': { target: 10, unit: '本', label: '書刊/畫冊' },
  'perfect-bound-books': { target: 10, unit: '本', label: '書刊/畫冊' },
  'hardcover-books': { target: 10, unit: '本', label: '書刊/畫冊' },
  'spiral-notebooks': { target: 10, unit: '本', label: '書刊/畫冊' },
  'exercise-books': { target: 10, unit: '本', label: '書刊/畫冊' },
  // 海報 (見 C: 按尺寸細分; 此處為 fallback)
  'a1-posters': { target: 1, unit: '張', label: '海報 A1 噴繪' },
  'a2-posters': { target: 10, unit: '張', label: '海報 A2/A3' },
};

/**
 * B. 跨品類綜合頁 / 對比頁 — **不套用單一目標**, 需人工立門檻組。
 *
 * 判據 (任一即算): slug 含指南/對比類詞 **且** 內容同時覆蓋 ≥2 個支柱品類。
 * 這些頁的「100 張起印」通常係**多品類共同描述**, 唔應該被改成單一品類的 10 或 1。
 */
export const CROSS_CATEGORY_PAGES: { match: RegExp; note: string }[] = [
  { match: /rush-printing-hk-guide|即日急件/, note: '即日印刷綜合頁: 涵蓋展會/投標/海報/傳單/易拉寶/貼紙 ⇒ 需列各品類門檻' },
  { match: /instant-printing|即日印刷/, note: '即日印刷綜合頁 (跨品類)' },
  { match: /printing-cost-baseline|成本基準/, note: '成本基準比較頁 (跨品類)' },
  { match: /print-specifications-reference|規格速查/, note: '規格速查參考頁 (跨品類)' },
  // 多尺寸/多物料套裝頁 (例: 馬拉松賽事 = A1/A2 海報 + 跑手包 + 賽事指南 全套)
  { match: /marathon|賽事|跑手包|スタートアーチ|起跑拱門/, note: '多尺寸/多物料套裝頁 (海報 + 周邊打包) ⇒ 唔可用單一尺寸門檻' },
  { match: /-vs-|對比|比較/, note: '品類/規格對比頁' },
];

/** 判斷某文章 slug / 文本是否屬跨品類綜合頁 */
export function isCrossCategoryPage(slugOrText: string): { cross: boolean; note?: string } {
  for (const c of CROSS_CATEGORY_PAGES) {
    if (c.match.test(slugOrText)) return { cross: true, note: c.note };
  }
  return { cross: false };
}

/* ============================================================================
 * D. 品類頁「場景卡片」起印量 SSoT (K3 2026-09-19 線上探針發現)
 * ============================================================================
 * 問題: 品類頁的場景卡片把起印量**硬編碼**在文案第三行, 與 `products.ts` 真值漂移:
 *   · educational `graduation` 卡寫「100 本起」, 真值 50
 *   · educational `certificates` 卡寫「50 張起」, 真值 100
 *   (同頁 sku 卡「畢業紀念冊 全彩內頁 · 100 本起」同樣漂移)
 *
 * ⇒ 本節提供「由 SKU 真值渲染起印量文案」的唯一入口, 卡片只註冊 slug, 不再寫死數字。
 * ★ 真值直接讀 `products.ts` 的 `minQuantity`（**不另設平行對照表**, 避免再次漂移）。
 */

/** 場景卡片 → 其起印量真值所屬的 SKU slug（只有需要顯示起印量的場景才註冊） */
export const SCENE_MOQ_SOURCE: Record<string, string> = {
  // educational 品類頁場景卡
  graduation: 'graduation-yearbook',
  certificates: 'certificates',
  // books 品類頁場景卡
  tutoring_textbook: 'textbooks',
  // ⚠️ 未註冊者 = 該卡第三行**本來就沒有起印量宣稱**（如 educational `workbook` 是
  //    「無線膠裝 · 封面燙金」純工藝描述）→ 不可註冊，否則會被改成純起印量而丟失工藝資訊。
  //    注意 `workbook` 這個 key 在兩個組件中文案不同：CategorySharpHooks 版有「200 本起」
  //    但那是另一份資料源（待收斂，見 docs 報告「雙資料源」項）。
  // 其他品類頁若有同類卡片, 在此追加 slug 即可（組件無需改動）
};

/**
 * 場景卡片第三行為「工藝 · 起印量 · 交期」複合句時，起印量前後要保留的文字。
 *
 * 為什麼需要: 部分卡片第三行是複合句（例 `無線膠裝 · 50 本起 · 7 天交貨`）。
 *   若整行換成純起印量標籤，會連帶丟掉工藝與交期資訊 → 卡片資訊量下降。
 * 處理: 有註冊者 → `前綴 · SSoT起印量 · 後綴`；未註冊者 → 整行僅 SSoT 起印量。
 */
const SCENE_MOQ_AFFIX: Record<
  string,
  { prefix?: { 'zh-hk': string; en: string; ja: string }; suffix?: { 'zh-hk': string; en: string; ja: string } }
> = {
  tutoring_textbook: {
    prefix: { 'zh-hk': '無線膠裝', en: 'Perfect bound', ja: '無線綴じ' },
    suffix: { 'zh-hk': '7 天交貨', en: '7-day delivery', ja: '7日納品' },
  },
  // 畢業紀念冊：原卡片第三行為「全彩內頁 · 100 本起」→ 保留「全彩內頁」
  graduation: {
    prefix: { 'zh-hk': '全彩內頁', en: 'Full-color', ja: 'フルカラー' },
  },
  // 獎狀證書：原卡片第三行為「A4 尺寸 · 50 張起」→ 保留「A4 尺寸」
  //   註：起印量單位隨 SSoT SKU 口徑為「本」（證書屬本冊類），與原「張」不同屬**修正**
  certificates: {
    prefix: { 'zh-hk': 'A4 尺寸', en: 'A4 size', ja: 'A4サイズ' },
  },
};

/**
 * 由 SKU 真值渲染場景卡片第三行的起印量文案。
 *
 * @param sceneKey 場景卡片的 key（如 `graduation`）
 * @param locale   語系
 * @returns 起印量文案；該場景未註冊或 SKU 不存在時回傳 null（呼叫端保留原硬編碼文案）
 *
 * 單位一律取「張／枚」= sheets, 「本／冊」= books 的既有站上口徑：
 *   graduation-yearbook / certificates / textbooks 皆為**本冊類**（本／冊／books）
 */
export function sceneMoqLabel(sceneKey: string, locale: Locale): string | null {
  const slug = SCENE_MOQ_SOURCE[sceneKey];
  if (!slug) return null;
  const product = products.find((p) => p.slug === slug);
  if (!product || typeof product.minQuantity !== 'number') return null;
  const n = product.minQuantity;
  switch (locale) {
    case 'en':
      return `From ${n} copies`;
    case 'ja':
      return `${n}冊から`;
    default:
      return `${n} 本起`;
  }
}

/**
 * 把場景卡片第三行換成由 SSoT 真值渲染的起印量。
 * 卡片文案只有 2 行（無起印量宣稱）時**不追加**，維持原樣。
 * 第三行為複合句（有註冊 affix）時保留工藝與交期，只換起印量。
 *
 * 分隔符依語系：zh-hk/ja 站上用「 · 」（全角中點 + 半角空格）為既有慣例。
 */
export function withSceneMoq(sceneKey: string, locale: Locale, lines: string[]): string[] {
  if (lines.length < 3) return lines;
  const label = sceneMoqLabel(sceneKey, locale);
  if (!label) return lines;
  const affix = SCENE_MOQ_AFFIX[sceneKey];
  if (!affix) return [...lines.slice(0, 2), label];
  const parts = [affix.prefix?.[locale], label, affix.suffix?.[locale]].filter(Boolean);
  return [...lines.slice(0, 2), parts.join(' · ')];
}

/* ============================================================================
 * E. 貼紙子品類 MOQ 分層（K3 2026-09-19 裁決）
 * ============================================================================
 * K3 原話：「贴纸『户外/可移 100 个起』是正确的分层设置，不是漂移——市场数据显示
 *   3M 户外贴和可移贴确实需要更高门槛，应在 SSoT 中明确子品类 MOQ 映射。」
 *
 * ★ 兩層概念必須分開，否則必然誤判為漂移：
 *   ① **SKU 起訂量**（`products.ts minQuantity`）= 引擎可接的最小量 → 貼紙線 8 個 SKU 皆 10
 *   ② **子品類檔位**（本節）= 對外說明用的分層門檻，含「大量檔」
 *
 *   2026-09-19 實測：貼紙線**無「大批量」專屬 SKU**（8 個 SKU 全部 minQuantity=10，
 *   價表 stickers.json 兩個 config 價階亦由 10 起）。
 *   ⇒ K3 所述「戶外可移大批量 100」屬**大量檔位**，不是任何 SKU 的起訂量，
 *     故與 `minQuantity` 不矛盾。把兩者混為一談，正是本輪漂移誤判的來源之一。
 */
export const STICKER_SUBCATEGORY_MOQ = {
  /** 通用貼紙（銅版紙／合成紙／透明等標準面材） */
  general: { minQty: 10, kind: 'sku' as const },
  /** 3M 戶外貼（耐候膠系；對應 waterproof-stickers） */
  outdoor3m: { minQty: 10, kind: 'sku' as const },
  /** 可移貼（無殘膠；對應 removable-stickers） */
  removable: { minQty: 10, kind: 'sku' as const },
  /** 戶外可移·**大量檔**（非 SKU 起訂量，是批量經濟門檻） */
  outdoorRemovableBulk: { minQty: 100, kind: 'bulk_tier' as const },
} as const;

/** 取子品類門檻；`kind` 區分「SKU 起訂量」與「大量檔」，呼叫端不得混用 */
export function getStickerSubcategoryMoq(key: keyof typeof STICKER_SUBCATEGORY_MOQ) {
  return STICKER_SUBCATEGORY_MOQ[key];
}



/**
 * C. 海報按尺寸細分目標。
 *
 * 事實依據 (2026-09-19 實查 src/data/price-tables/posters.json):
 *   · A1 config ×2 (PP/環保 Yupo、相紙) — 噴繪成品, 價階 qty 由 **1** 起 (modeled 檔)
 *   · A2 config ×6 / A3 config ×6 (銅版紙/啞粉紙 × 157g/250g × 單/雙面) — 價階 qty 由 **10** 起
 *   ⇒ 同一「海報」品類內, A1 與 A2/A3 的起印量本就不同, 唔可以用單一 target。
 *
 * ⚠ 其餘海報 SKU (outdoor/display/art/adhesive-posters) 目前 **無 price table、
 *   minQuantity 仍為 100** ⇒ 本表暫列 100 (沿用現況), 是否放寬為 10 待 K3 拍板。
 */
export const POSTER_SIZE_TARGETS: { match: RegExp; target: number; unit: string; label: string; evidence: string }[] = [
  { match: /\bA1\b|A1\s|A1•|A1噴繪|A1 噴繪/i, target: 1, unit: '張', label: '海報 A1 噴繪', evidence: 'posters.json A1 config 價階自 qty=1 起 (噴繪無製版)' },
  { match: /\bA2\b|\bA3\b|A2|A3/i, target: 10, unit: '張', label: '海報 A2/A3', evidence: 'posters.json A2/A3 config 價階自 qty=10 起' },
  { match: /outdoor-posters|display-posters|art-posters|adhesive-posters|戶外海報|展架海報|藝術海報|背膠海報/i, target: 100, unit: '張', label: '海報 (其他, 現況 100)', evidence: '無 price table, minQuantity 仍 100; 是否放寬待 K3 拍板' },
];

/** 依文字判定海報子品類目標 (取第一個命中; A1 優先於 A2/A3) */
export function posterTargetFromText(text: string): { target: number; unit: string; label: string; evidence: string } | null {
  for (const r of POSTER_SIZE_TARGETS) if (r.match.test(text)) return { target: r.target, unit: r.unit, label: r.label, evidence: r.evidence };
  return null;
}

/* ============================================================================
 * 「價目同步波」工具 (K3 2026-09-19 規劃)
 * ============================================================================
 * 為什麼需要: 站內大量字串同時含 MOQ 口徑與價目檔位, 例如
 *   「100 張起印，HK$0.22/張」 —— 呢個 100 係**價目檔位** (HK$0.22/張 係 100 張檔的價),
 *   唔係 MOQ。若機械改成「10 張起印，HK$0.22/張」, 10 張實際 HK$71 起 ⇒ 報價當場變假。
 *   ⇒ 任何批量修正前必須先分類。本組函式即該分類器 (純函式, 無副作用)。
 */

export type MoqStringKind =
  /** 「最低 10 張起印」——純門檻, 應改為現行 MOQ */
  | 'moq_display'
  /** 「100 張起印，HK$0.22/張」——價格承諾綁定該數量檔, 保留數字, 只改格式 */
  | 'price_tier'
  /** 「傳統柯式印刷普遍 500 張起」——行業事實陳述, 保留不動 */
  | 'industry_fact'
  /** 無法判定 */
  | 'other';

/**
 * 價格/檔位特徵 (與 bulk 修正腳本的價目保護同一口徑, 集中於此)。
 *
 * ⚠ 逐項都有實測依據 (首版漏了 3 類, 由 moq10-classify-check.ts 攔下):
 *   · 「100 張起印 HK$0.45-0.80/張, 1000 張 …」→ 需一般 HK$ 金額特徵
 *   · 「100 copies at US$1.20-1.80 per piece」→ 需 `copies` 與 `at US$…`
 *   · 「100 枚から、1 枚 HK$0.22〜」→ 需容許「枚」後接逗號/〜 等非空白字元
 */
const PRICE_SIGNAL =
  /(HK\$[\d.,]+|US\$[\d.,]+|\$[\d.,]+|¥[\d,]+|每張低至|每張約|低至\s*HK|約\s*HK|價格參考|單價參考|價目|批量價|起批|量產|per\s*piece|per\s*pc\b|\/\s*(張|枚|個|本|pc|pcs|sheet|copy|copies)|1\s*枚[^。，,]{0,3}HK\$|単価目安)/i;

/**
 * MOQ 口徑特徵。
 * ⚠ 補上英文 `start at N copies` 與日文 `N 枚から` (首版漏, 由 moq10-classify-check.ts 攔下):
 *   呢兩個係 en/ja 最常見的 MOQ 寫法, 缺了就會令「Saddle stitch booklets start at 100 copies
 *   at US$1.20-1.80 per piece」被判成 other, 無法進入價目保護流程。
 * ⚠ 再補 `N 張起` / `N 本起` 等**無「印」字**的變體 (smoke G 段攔下):
 *   「100 張起，HK$0.25/張起」係站上常見寫法, 只寫「起印」會漏判。
 */
const MOQ_SIGNAL =
  /(起印|起訂|\d+\s*(張|本|個|枚|套|部|冊)\s*起|最低訂購|最低起印|最低數量|最小ロット|最小注文|minimum\s*order|MOQ|from\s*\d+\s*(copies|pcs)|\d+\s*copies?|\d+\s*枚から|\d+\s*部から|\d+\s*冊から)/i;

/** 行業事實特徵 (講市場慣例, 非自家門檻) */
const INDUSTRY_SIGNAL = /(傳統|行業|普遍|同業|市面|業界|通常|Alibaba|黃頁|競品|業內|一般的|多くの)/i;

/**
 * 分類一段含起印量字樣的文本。
 *
 * 判序:
 *   ① 含 MOQ 特徵 **且** 含價格特徵 → `price_tier`  (最保守, 優先)
 *   ② 含行業事實特徵              → `industry_fact`
 *   ③ 只含 MOQ 特徵               → `moq_display`
 *   ④ 其餘                        → `other`
 *
 * ⚠ ① 必須優先於 ③: 「100 張起印，HK$0.22/張」兩個特徵皆有, 必須判 price_tier,
 *   否則就會產生本次已實測過的「假報價」風險。
 */
export function classifyMoqString(text: string): MoqStringKind {
  if (typeof text !== 'string' || !text) return 'other';
  const hasPrice = PRICE_SIGNAL.test(text);
  const hasMoq = MOQ_SIGNAL.test(text);
  if (hasMoq && hasPrice) return 'price_tier';
  if (INDUSTRY_SIGNAL.test(text)) return 'industry_fact';
  if (hasMoq) return 'moq_display';
  return 'other';
}

/**
 * `price_tier` 的新展示格式 (K3 規劃表):
 *   「100 張起印，HK$0.22/張」→「100 張檔位：HK$0.22/張」
 * 只把「起印/起訂」語意改為「檔位」, **不動任何數字** ⇒ 報價承諾不變。
 */
export function formatPriceTier(text: string): string {
  return text
    .replace(/(\d[\d,]*)\s*張起印[，,]\s*/g, '$1 張檔位：')
    .replace(/(\d[\d,]*)\s*張起[，,]\s*/g, '$1 張檔位：')
    .replace(/(\d[\d,]*)\s*本起印[，,]\s*/g, '$1 本檔位：')
    .replace(/(\d[\d,]*)\s*個起印[，,]\s*/g, '$1 個檔位：')
    .replace(/(\d[\d,]*)\s*copies?[，,]\s*/gi, '$1 copies: ')
    .replace(/(\d[\d,]*)\s*冊から[，,]\s*/g, '$1 冊〜: ');
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
/**
 * 數碼／柯式的**經濟分界點**（≥ 此量建議走柯式）。
 *
 * 200 → 300（K3 2026-09-19 中期項，原話）：
 *   「胶印建议门槛从 200 微调至 300 —— 市场数据显示数码/胶印经济分界点
 *     通常在 **300-500**，而非 200。」
 * 影響：`getPrintMethodAdvice()` 的過渡區間（OFFSET_MIN_QTY ~ 此值-1）與三語文案；
 *   文案皆以變數插值，改此常數即同步（無硬編碼殘留）。
 */
export const OFFSET_ECONOMICAL_FROM = 300;

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
