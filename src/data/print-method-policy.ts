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
