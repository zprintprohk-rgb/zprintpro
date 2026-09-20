// moq10-books-context-scan.ts — MOQ 口徑一致性掃描（逐 SKU 真值對帳）· 門童 #22
//
// 【用途】K3 2026-09-19 指令第 5 項：把「MOQ 文案漂移」從人工打地鼠，改為可重複執行的機器閘門。
//   已接入 pre-commit hook（scripts/canonical/pre-commit 步驟 3.6，編號 #22 =
//   現有最大 #21 rule-translation-guard 之後）。
//
// 【真值唯一定義】src/data/products.ts 的 minQuantity（引擎實際輸入），不採人工維護表。
//
// 【掃描範圍】SKU 歸屬明確的來源檔（blog-data/*.json 跨品類噪音大，需逐篇判斷，不在範圍）。
//
// 【三次指標踩坑記錄 — 本檔的價值就在這裡，勿簡化回舊寫法】
//   坑 1: `slug:` 未加字邊界 → 誤匹配 `category_slug:` → 真值表混入分類名
//   坑 2: 真值表混入 **CategoryDef 陣列**（L111-128，縮排 2）→ 99 膨脹到 115，
//         且 `truth.get('books')` 回 undefined → 整段**靜默跳過**（假陰性 5 條）
//   坑 3: 對帳把「掃描器命中數」對「全文所有 MOQ 樣式數」→ 定義域不同 → 假紅
//   → 修法: 產品 SKU **只認縮排 4 的 `slug:`**（分類恆為 2）；逐樣式同定義域對帳；
//     並以 assertShape() 硬斷言防再次靜默崩壞。
//
// 用法:
//   npx tsx scripts/moq10-books-context-scan.ts            # 人讀報告
//   npx tsx scripts/moq10-books-context-scan.ts --json      # 機器讀
//   npx tsx scripts/moq10-books-context-scan.ts --gate      # 閘門模式：有 🔴 則 exit 1

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const AS_JSON = process.argv.includes('--json');
const AS_GATE = process.argv.includes('--gate');

const SELF = 'src/data/products.ts';

/* ============================================================================
 * 多 schema 支援（2026-09-19 第三次「整檔跳過」盲區修復）
 * ============================================================================
 * 事故：掃描器原本只認 `slug: 'x'` 風格，導致 4 個目標檔**整檔被跳過**：
 *   · sku-seo-data.ts      → `"waterproof-stickers": {`（JSON key，99 個 SKU，390 個 MOQ 樣式）
 *   · products-content.ts  → record key 風格（78 個 key，295 個 MOQ 樣式）
 *   · seo.ts               → record key 風格（40 個 key，31 個 MOQ 樣式）
 *   · category-seo-content.ts → record key 風格（45 個 key，112 個 MOQ 樣式）
 * 後果：閘門報「0 命中」被誤讀為「乾淨」，實際只覆蓋了 products.ts（76/904 樣式 ≈ 8%）。
 *   ⇒ 這是本輪第 3 次「0 命中 ≠ 乾淨」型盲區（前兩次：category-seo-content 品類級、
 *     sku-seo-data 檔內字串被當成「非本批品類」）。
 *
 * 修法：每個檔案宣告自己的 **SKU key 樣式**，掃描器據此定位區塊邊界。
 * 判據都要求「行首縮排恰為 2 或 4 且 key 為 kebab-case」，避免吃進無關物件。
 */

/** 各掃描目標的 SKU key 樣式 */
type KeyStyle = 'slug' | 'json_key' | 'record_key';
const FILE_KEY_STYLE: Record<string, KeyStyle> = {
  'src/data/products.ts': 'slug',
  'src/data/sku-seo-data.ts': 'json_key',
  'src/data/products-content.ts': 'record_key',
  'src/lib/seo.ts': 'record_key',
  'src/data/category-seo-content.ts': 'record_key',
};

/** 產品 SKU 的 slug 縮排（分類 slug 恆為 2，必須排除） */
const PRODUCT_SLUG_INDENT = 4;

function isProductSlugLine(line: string): string | undefined {
  if (/^\s*(\/\/|\*|\/\*)/.test(line)) return undefined;
  const m = line.match(/^(\s*)slug:\s*'([^']+)'/);
  if (!m) return undefined;
  if (m[1].length !== PRODUCT_SLUG_INDENT) return undefined;
  return m[2];
}

/**
 * 依 key 樣式取「這行是否為某 SKU 區塊的起點」。
 * @returns SKU 識別字（slug / key），非起點則 undefined
 */
function skuKeyAt(line: string, style: KeyStyle): string | undefined {
  if (/^\s*(\/\/|\*|\/\*)/.test(line)) return undefined;
  switch (style) {
    case 'slug':
      return isProductSlugLine(line);
    case 'json_key': {
      // `  "waterproof-stickers": {`
      const m = line.match(/^\s{2}"([a-z0-9][a-z0-9-]*)":\s*\{/);
      return m?.[1];
    }
    case 'record_key': {
      // `  'waterproof-stickers': {` 或 `  waterproof-stickers: {`
      const m = line.match(/^\s{2}'?([a-z0-9][a-z0-9-]*)'?:\s*\{/);
      return m?.[1];
    }
  }
}

/**
 * ⚠️ 真值取值策略與嵌套結構白名單（第 4 次指標踩坑後確立）
 *
 * 坑 4: 曾斷言「全檔 minQuantity 行數 = 產品 slug 行數」，得 99 ≠ 94 → 誤判「5 個 SKU 缺 minQuantity」。
 *       真相: 94 個產品 SKU **全部**都有 minQuantity；另有 5 個 minQuantity 屬於
 *       `japan-doujin`（同人周邊）的**嵌套子商品**（doujinshi-printing / acrylic-keychain /
 *       can-badge / postcard-set / eco-tote-bag），它們**沒有自己的頂層 slug**，
 *       所以永遠不會被 `slug:` 掃到 → 行數必然對不上。這是**資料結構，不是資料缺漏**。
 *       （postcard-set 真值 4 = 4 張起訂，本身合理。）
 *
 * → 正確斷言語義: 「每個產品 slug 區塊內**至少**有一個 minQuantity」，
 *   而非「全檔 minQuantity 行數 == 產品 slug 行數」。
 * → 真值 = 區塊內**第一個** minQuantity（= 該 SKU 自身宣告；嵌套子商品在其後）。
 */
const NESTED_MINQTY_WHITELIST = new Set(['fruit-food-label-stickers']);

function readTruth(): Map<string, number> {
  const lines = fs.readFileSync(path.join(ROOT, SELF), 'utf-8').split(/\r?\n/);
  const starts: { slug: string; start: number }[] = [];
  lines.forEach((l, i) => {
    const s = isProductSlugLine(l);
    if (s) starts.push({ slug: s, start: i });
  });
  const out = new Map<string, number>();
  starts.forEach((s, idx) => {
    const end = idx + 1 < starts.length ? starts[idx + 1].start : lines.length;
    for (let i = s.start; i < end; i++) {
      const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
      if (m) {
        if (!out.has(s.slug)) out.set(s.slug, Number(m[1]));
        break;
      }
    }
  });
  return out;
}

// ---------- MOQ 樣式（依真實樣本 dump 後撰寫，勿憑空擴充） ----------
/**
 * 量詞模式說明（每條都對應一次誤配修正，勿憑空簡化）：
 *   - 「起」後必須緊跟數量詞或量詞：「100張起印」/「100本起」為 MOQ；
 *     「HK$2.2起/個」是【單價】，`zh_個起` 若寫成 `(\d+)\s*個\s*起` 會把「每2.2起/個」吃進來 → 必須排除 `/`。
 *   - 日文「N枚から」的數字與量詞之間**可無空格**（`10枚から`），量詞後才是から/〜。
 *     舊寫法 `\s*(?:MOQ|枚〜|枚から)` 把「枚」塞進「單位」位置 → 跨語言欄位誤配（吃掉 en 欄位的 MOQ 100）。
 *   - en 的 `N MOQ` 要求**單位詞在前**（`100 MOQ`）；寫成 `(\d+)\s*MOQ` 時，
 *     「0.5-1.0mm PVC (MOQ 100)」的 `1.0` / `2.2起/個` 的 `2` 都會被當成 MOQ。
 */
const MOQ_PATTERNS: { re: RegExp; kind: string; lang: string }[] = [
  { re: /(?:^|[^\d,])(\d+)\s*本\s*起(?:印|訂)?(?!\s*\/)/g, kind: 'zh_本起', lang: 'zh' },
  { re: /(?:^|[^\d,])(\d+)\s*張\s*起(?:印|訂)?(?!\s*\/)/g, kind: 'zh_張起', lang: 'zh' },
  { re: /(?:^|[^\d,])(\d+)\s*個\s*起(?:印|訂)?(?!\s*\/)/g, kind: 'zh_個起', lang: 'zh' },
  { re: /(?:^|[^\d,])(\d+)\s*份\s*起(?:印|訂)?(?!\s*\/)/g, kind: 'zh_份起', lang: 'zh' },
  // ★ 2026-09-19 模式集补漏 (K3 决策 2.1: 关闭 2-SKU banner 缺口) —— 含一次自伤修正
  //   缺口: 上方四条 zh 模式均要求「数字 → **单位字** → 起」, 而横幅/易拉宝类标题的实际表述是
  //   **无单位**的「10起印」(例 `展示易拉架 | 防水材質 10起印 HK$85起・4小時打稿 | 智印港`)
  //   ⇒ 全部 zh 模式零命中 ⇒ roll-up-banners / adhesive-banners 在门童侧完全不可见。
  //   ⚠️ 自伤记录: 首版写成 `(?:^|[^\d,])(\d+)\s*起(?:印|訂)` ⇒ 把 **`A4 起印`** 的 `4` 当成了 MOQ
  //   (前缀 `A` 满足 `[^\d,]`) ⇒ products.ts:1013/1023 误报, 门童由 PASS 翻成 🔴 阻断 2 条。
  //   修正: ① lookbehind 排除**字母**前缀 (`A4`/`A3` 等规格名) ② 数字要求 **≥2 位**
  //   (本站 MOQ 全 ≥10 ⇒ 单位数必为规格/件数, 非起订量)。
  { re: /(?<![A-Za-z0-9,])(\d{2,})\s*起(?:印|訂)(?!\s*\/)/g, kind: 'zh_起印(無單位)', lang: 'zh' },
  { re: /(?:^|[^\d,])(\d+)\s*枚\s*(?:から|〜|~)/g, kind: 'ja_枚から', lang: 'ja' },
  { re: /(?:^|[^\d,])(\d+)\s*冊\s*(?:から|〜|~)/g, kind: 'ja_冊から', lang: 'ja' },
  // en 的 MOQ 有多種寫法：`100 MOQ`（數字+空格+MOQ）與 `100 sheets MOQ`（數字+單位詞+MOQ）。
  // 只寫前者會漏掉後者（實測 L8309 `100 sheets MOQ` 即被漏）。
  { re: /(?:^|[^\d,])(\d+)[ \t]+(?:[A-Za-z]{3,12}[ \t]+)?(?:MOQ|Copies|copies)\b/g, kind: 'en_MOQ', lang: 'en' },
  // ★ 2026-09-19 模式集补漏之二 (K3 决策 4.1「配对 commit」: 模式 + 注册 + 分层, 三者不可拆分)
  //   缺口: 上一模式要求 MOQ/Copies, 但本站 en 标题大量使用 **`100pcs` / `50 pcs`** 形态
  //   (例 `Premium Greeting Cards 100pcs Foil & UV`) ⇒ 全部 en 模式零命中
  //   ⇒ small-batch-stickers + 4 个 greeting-cards 的 **en 行**在门童侧不可见 (两法行键差 5)。
  //   数字要求 **≥2 位**: 排除套装件数式 «6 Pcs» (单数字必为件数/规格, 非起订量) ——
  //   与 classify-moq-precision.mjs / resolve-moq-conflicts.mjs 的 en 判据完全一致, 保证两法同源。
  //   ⚠️ 该模式同时命中非标题语境 (方法档位/产品文案) ⇒ 必须在**同一 commit** 内配套登记,
  //      否则门童由 PASS 翻 🔴 (2026-09-19 首次试扩即踩, 已回退一次; 本次成对上台)。
  { re: /(?<![A-Za-z0-9,])(\d{2,})\s*pcs\b/g, kind: 'en_pcs', lang: 'en' },
  // ⚠️ 2026-09-19 **已回退**: 曾加 `en_pcs`（`N pcs`，为关闭两法与 5 行 en 标题差）——
  //   实测该模式把门童的判定面扩进**品类级 FAQ 的方法档位语句**与新产品段，
  //   连续揭发 `catalog-printing products.ts:5754 (100)` / `category-seo-content.ts:2769 (100)×2` /
  //   `:2860 (50)` / `:2867 (500)` 等新命中 ⇒ 门童由 PASS 翻 🔴 阻断。
  //   每一轮扩面都需配套的 approved/pending 分层登记，属**独立一轮工作**；
  //   在门童（生产安全网）上做半成品扩面 = 拿安全网试错 ⇒ 本批**回退**，恢复 PASS。
  //   代价（已知、已定位、不阻断生产）: en 标题的 `100pcs` / `50 pcs` 形态在门童侧仍不可见,
  //   致两法行键差 5 行（small-batch-stickers/en + 4 个 greeting-cards/en）。
  //   修法（下轮）: 加 `en_pcs` 模式 **并同时**为上述 5 类新命中登记分层, 一次成对上台。
];

const TARGETS = [
  'src/data/products.ts',
  'src/data/sku-seo-data.ts',
  'src/data/products-content.ts',
  'src/lib/seo.ts',
  'src/data/category-seo-content.ts',
];

type Hit = {
  file: string;
  line: number;
  slug: string;
  kind: string;
  found: number;
  truth: number;
  /** 命中處前後文（**不可用行首**：products.ts 常把 zh/en/ja 三語欄位壓在同一行，
   *  真正的漂移欄位可能在行內 700+ 字元處，只看行首會誤判成「行首欄位漂移」） */
  text: string;
};

/**
 * 品類級段落掃描（第二類判定域）。
 *
 * ⚠️ 為什麼需要（2026-09-19 發現的**重大盲區**）：
 *   `category-seo-content.ts` 的品類級文案（h2 / heading / paragraphs / buyersGuide
 *   / specs / FAQ）**不含任何 SKU slug**，因此 `scanFile()` 的 SKU 歸屬判定會把
 *   整個檔案跳過 → 該檔永遠報 0 命中。
 *   實測：貼紙品類段落有 8 處寫「50 張起訂 / 50 個起印」，而貼紙真值已改 **10**，
 *   掃描器卻完全看不到 → **「0 命中」是假象，不是乾淨**。
 *
 * 判據：以「檔案內文出現的品類關鍵詞」推導預期門檻，非以 slug 歸屬。
 *   只檢查**明確品類**的段落；跨品類綜合段（同時提多品類）留待人工。
 */
const CATEGORY_LEVEL_TARGETS: {
  file: string;
  /** 該品類段落中出現即算命中的關鍵詞 */
  keywords: RegExp;
  /** 該品類的真值門檻（來自 products.ts 該 category 多數 SKU 的 minQuantity） */
  expected: number;
  /** 真值依據說明 */
  basis: string;
}[] = [
  {
    file: 'src/data/category-seo-content.ts',
    keywords: /貼紙|sticker/i,
    expected: 10,
    basis: 'stickers 品類 9 個 SKU 中 8 個 minQuantity=10（small-batch/die-cut/waterproof/transparent/removable/foil/security/fluorescent）',
  },
];

/** 品類級漂移命中 */
function scanCategoryLevel(): Hit[] {
  /**
   * 跨品類段落排除清單：`category-seo-content.ts` 有「同人誌 10 本起 / 貼紙 50 張起 /
   * 海報 10 張起 / 壓克力 5 個起」這類**一行列多品類門檻**的段落，
   * 行內含「貼紙」但「5 個起」屬壓克力 → 不可歸給貼紙。
   * 判據：若該數字前 20 字內出現其他品類名，且更靠近該數字，則不算本品類。
   */
  const OTHER_CATEGORY = /(壓克力|同人誌|海報|月曆|餐牌|信封|包裝盒|紙袋|賀卡|利是封|枱卡|傳單)/;

  const hits: Hit[] = [];
  for (const target of CATEGORY_LEVEL_TARGETS) {
    const abs = path.join(ROOT, target.file);
    if (!fs.existsSync(abs)) continue;
    const lines = fs.readFileSync(abs, 'utf-8').split(/\r?\n/);
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // forEach 回調內不可用 continue
      for (const { re, kind } of MOQ_PATTERNS) {
        const r = new RegExp(re.source, 'g');
        let m: RegExpExecArray | null;
        while ((m = r.exec(line))) {
          const found = Number(m[1]);
          if (found === target.expected) continue;
          // 只認「同行也提到該品類」者，避免把別品類的段落誤歸
          if (!target.keywords.test(line)) continue;
          // 若緊鄰數字處出現其他品類名 → 該數字屬別品類，不算本品類漂移
          const near = line.slice(Math.max(0, m.index - 20), m.index);
          if (OTHER_CATEGORY.test(near)) continue;
          const s = Math.max(0, m.index - 50);
          const e = Math.min(line.length, m.index + m[0].length + 30);
          hits.push({
            file: target.file,
            line: i + 1,
            slug: `〔品類級〕${target.file.includes('seo') ? 'stickers' : '?'}`,
            kind: `${kind}(品類級)`,
            found,
            truth: target.expected,
            text: `…${line.slice(s, e).trim()}…`,
          });
        }
      }
    });
  }
  return hits;
}

/**
 * 找出「非產品級」的嵌套子商品區間，避免假陽性。
 *
 * 實例（2026-09-19 發現）：`japan-doujin` 分類的 5 個子商品
 * （doujinshi-printing / acrylic-keychain / can-badge / postcard-set / eco-tote-bag）
 * 以**縮排 6 的 `category_slug: 'japan-doujin'`** 開頭，**沒有自己的產品級 `slug:`**，
 * 緊接在 `fruit-food-label-stickers` 區塊之後。其 `minQuantity`（10/10/10/4/10）
 * 會被誤算進 fruit-food-label-stickers（真值 500）。
 *
 * 邊界判據：**以下一個「產品級 slug 行」為結束**，而非「縮排 ≤ 4」。
 *   ⚠️ 首版用縮排判結束 → 遇到子商品內某行縮排改成 4（如 `images: [`）
 *      就提前 break，範圍只蓋到 10 行，L7633 反而漏掉。
 *   產品級 slug 行 = `^ {4}slug: '...'`（與 isProductSlugLine 同判據）。
 */
function nestedSubProductRanges(lines: string[]): [number, number][] {
  const ranges: [number, number][] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)category_slug:\s*'/);
    if (!m || m[1].length <= PRODUCT_SLUG_INDENT) continue;
    let end = lines.length - 1;
    for (let j = i + 1; j < lines.length; j++) {
      if (isProductSlugLine(lines[j])) {
        end = j - 1;
        break;
      }
    }
    ranges.push([i, end]);
    i = end;
  }
  return ranges;
}

function scanFile(file: string, truth: Map<string, number>): Hit[] {
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) return [];
  const lines = fs.readFileSync(abs, 'utf-8').split(/\r?\n/);
  const nested = nestedSubProductRanges(lines);
  const inNested = (i: number) => nested.some(([s, e]) => i >= s && i <= e);
  const style = FILE_KEY_STYLE[file] ?? 'slug';

  // SKU 區塊起點（依該檔的 key 樣式）→ 供行歸屬判定
  const starts: { slug: string; start: number }[] = [];
  lines.forEach((l, i) => {
    const s = skuKeyAt(l, style);
    if (s) starts.push({ slug: s, start: i });
  });

  /** 行 → SKU：後向最近（slug 行通常在 name/description 之前），找不到才向前 40 行 */
  const slugForLine = (i: number): string | undefined => {
    let back: { slug: string; start: number } | undefined;
    let fwd: { slug: string; start: number } | undefined;
    for (const b of starts) {
      if (b.start <= i && (!back || b.start > back.start)) back = b;
      if (b.start > i && (!fwd || b.start < fwd.start)) fwd = b;
    }
    if (back) return back.slug;
    if (fwd && fwd.start - i <= 40) return fwd.slug;
    return undefined;
  };

  /**
   * 跨品類行的排除清單（2026-09-19 第四次盲區修復：改為多 schema 後**假陽性暴增**）。
   *
   * 事故：把 SKU key 樣式擴充到 `sku-seo-data.ts` / `products-content.ts` 後，
   *   漂移由 0 暴增到 672 條——但抽樣發現大量**歸屬錯誤**：
   *     · 賀卡 SKU 區塊內的「防水 Vinyl／透明 PVC 50 張起，銅版紙…100 張起」實為**貼紙 FAQ**
   *     · 賀卡 SKU 區塊內的「同仕様クラフト紙袋 500 枚から」實為**紙袋**
   *     · 賀卡 SKU 區塊內的「500 個起印已可壓到…」實為**包裝盒**
   *   根因：這兩個檔的內容是**跨品類綜合**（一段/一篇同時講多品類），
   *     「後向最近 SKU key」的歸屬假設在此**不成立**（假設只對 products.ts 這種
   *     一 SKU 一區塊的結構有效）。
   *
   * 判據（任一即視為跨品類行 → 不對帳）：
   *   ① 該數字**緊鄰**（前 18 字內）出現其他品類名 → 歸屬可疑
   *   ② 該行同時出現 ≥2 個不同品類名 → 綜合段落
   */
  const OTHER_CATEGORY_NAMES =
    /(貼紙|ステッカー|sticker|紙袋|クラフト|bag|包裝|パッケージ|box|海報|ポスター|poster|月曆|カレンダー|calendar|餐牌|メニュー|menu|信封|封筒|envelope|利是封|ポチ袋|名片|カード|枱卡|席札|傳單|チラシ|flyer|繪本|絵本|picture|掛曆|日曆)/i;
  const countCategoryNames = (s: string): number => {
    const set = new Set<string>();
    for (const m of s.matchAll(new RegExp(OTHER_CATEGORY_NAMES.source, 'gi'))) set.add(m[0].toLowerCase());
    return set.size;
  };

  const hits: Hit[] = [];
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    if (inNested(i)) return; // 嵌套子商品（無頂層 slug）→ 真值不可歸屬，跳過
    const slug = slugForLine(i);
    if (!slug) return;
    const t = truth.get(slug);
    if (t === undefined) return; // 非產品 SKU（分類 slug 等）→ 不掃

    for (const { re, kind } of MOQ_PATTERNS) {
      const r = new RegExp(re.source, 'g');
      let m: RegExpExecArray | null;
      while ((m = r.exec(line))) {
        const found = Number(m[1]);
        // products.ts 是**真值來源檔本身**：該檔內等於真值的宣告不算漂移，
        // 但同一行若另有多個出現（如 zh/en/ja 三語欄位擠一行），只保留與真值衝突者。
        if (file === SELF && found === t) continue;
        // 跨品類行排除（見上方 OTHER_CATEGORY_NAMES 說明）：
        //   ① 數字緊鄰（前 18 字內）出現其他品類名 → 歸屬可疑
        //   ② 整行同時出現 ≥2 個品類名 → 綜合段落
        //   注意：`products.ts` 是一 SKU 一區塊的乾淨結構，**不做此排除**（避免誤殺）。
        //
        // ★ 2026-09-19 判定域補漏（K3 指令：擴展門童 #24 至 title 字段）
        //   事故：menus 簇「【50本起訂】 vs 真值 100」在 c18107a0 只修了 **features 版**，
        //        **title 版殘留至今**；而本門童對 title 行恆判為「跨品類行」→ 靜默 continue
        //        → 報「🆕 0 漂移」= 假零，掩蓋了 24 條 title 級漂移。
        //   機制：本站標題格式恆為 `主詞(含品類名) | 修飾 MOQ鉤子 | 品牌`
        //        ⇒ 品類名**必然**落在數字前 18 字內 ⇒ 規則 ① 對 title 行必然命中。
        //   判據：title 是 SKU 區塊內的**單行標量字段**，結構上不可能是跨品類綜合段落
        //        （該過濾器的設計目標是 `sku-seo-data.ts` 的 body/description 散文）
        //        ⇒ title 行**豁免規則 ①②**，但 inNested() 與 slugForLine() 歸屬檢查不變。
        const isTitleLine = (l: string): boolean =>
          /^\s*"title"\s*:\s*"/.test(l) || /^\s*title\s*:\s*['"]/.test(l);
        if (file !== SELF && !isTitleLine(line)) {
          const nearText = line.slice(Math.max(0, m.index - 18), m.index);
          if (OTHER_CATEGORY_NAMES.test(nearText)) continue;
          if (countCategoryNames(line) >= 2) continue;
        }
        const s = Math.max(0, m.index - 50);
        const e = Math.min(line.length, m.index + m[0].length + 30);
        hits.push({
          file,
          line: i + 1,
          slug,
          kind,
          found,
          truth: t,
          text: `…${line.slice(s, e).trim()}…`,
        });
      }
    }
  });
  return hits;
}

// ---------- 形狀斷言（硬防護：指標崩壞就別出結論） ----------
/**
 * 檢查 3 件事（**不含**「全檔 minQuantity 行數 == 產品 slug 行數」——那條是錯的，見上坑 4）：
 *   ① 每個產品 slug 區塊內都有 minQuantity（缺 → 真值不確定，必須修資料）
 *   ② 區塊內多值者必須在白名單（否則真值取值不確定，須先裁決歸屬）
 *   ③ 產品 slug 縮排假設仍成立（縮排 4 命中 > 0），否則本檔規則已失效須重新 dump
 */
function assertShape(truth: Map<string, number>): string[] {
  const problems: string[] = [];
  const lines = fs.readFileSync(path.join(ROOT, SELF), 'utf-8').split(/\r?\n/);
  const nestedRanges = nestedSubProductRanges(lines);
  const starts: { slug: string; start: number }[] = [];
  lines.forEach((l, i) => {
    const s = isProductSlugLine(l);
    if (s) starts.push({ slug: s, start: i });
  });

  if (starts.length === 0) problems.push('縮排 4 的產品 slug 命中 0 → 縮排假設已失效，請重新 dump 樣本');
  if (truth.size !== starts.length)
    problems.push(`真值表 ${truth.size} ≠ 產品 slug 區塊數 ${starts.length}`);

  const multiValue: string[] = [];
  starts.forEach((s, idx) => {
    const end = idx + 1 < starts.length ? starts[idx + 1].start : lines.length;
    const vals = new Set<number>();
    let count = 0;
    for (let i = s.start; i < end; i++) {
      if (nestedRanges.some(([ns, ne]) => i >= ns && i <= ne)) continue; // 嵌套子商品不屬本 SKU
      const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
      if (m) {
        vals.add(Number(m[1]));
        count++;
      }
    }
    if (count === 0) problems.push(`SKU [${s.slug}] (L${s.start + 1}) 區塊內無 minQuantity → 真值不確定`);
    else if (vals.size > 1 && !NESTED_MINQTY_WHITELIST.has(s.slug))
      multiValue.push(`[${s.slug}] (L${s.start + 1}) → ${[...vals].join('/')}`);
  });
  if (multiValue.length)
    problems.push(`區塊內多值且不在白名單（真值取值不確定）: ${multiValue.join('; ')}`);

  return problems;
}

/* ============================================================================
 * 已登錄的「待 K3 裁決」漂移（**已知且已上報，不是放行**）
 * ============================================================================
 * 為什麼需要這份名單：閘門若把「已知待裁決」與「新漂移」一視同仁擋下，
 *   24 條已知項會讓全站無法 push → 閘門必然被人繞過，等於沒有閘門。
 * 設計：閘門只擋**名單外的新漂移**；名單內每一條都會出現在報告中並標記
 *   `📋 已登錄`（**不是** ✓），避免被誤讀成「已修好」。
 *
 * 登錄日期：2026-09-19（本輪掃描首次建立）
 * 詳見 docs/2026-09-19-moq-consistency-gate-and-scene-ssot-report.md
 */
const PENDING_LIST: [string, string][] = [
  // ══════════════════════════════════════════════════════════════════════
  // ⚠️ 2026-09-19 第四次盲區修復後揭發：**先前的「0 漂移」是假象**
  // ══════════════════════════════════════════════════════════════════════
  // 掃描器原本只認 `slug: 'x'` 風格 → 只覆蓋 products.ts（76 個 MOQ 樣式），
  // 而 4 個目標檔中的 sku-seo-data.ts（390 樣式）/ products-content.ts（295）
  // / seo.ts（31）/ category-seo-content.ts（112）**整檔被跳過** → 覆蓋率僅 ~8%。
  // 修復多 schema 支援 + 跨品類歸屬排除後，真實候選數為 **272 條**。
  //
  // 依 §0.23.2（雙方法復算 + 不帶壞計數下結論），本批**不聲稱已修**，
  // 而是登錄為「已知待修」，並附分類（用 .hermes/logs/_classify-drifts.mjs 產生）：
  //   · moq_display  187 條 = 我方起印量門檻，應對齊真值（可批量修正）
  //   · price_tier    48 條 = 價格承諾綁數量檔，**不可機械改數字**（須核對價表檔位）
  //   · industry_fact 37 條 = 行業事實陳述（應保留）
  //
  // 分布：sku-seo-data.ts 229 ｜ products-content.ts 39 ｜ category-seo-content.ts 4
  // 明細：.hermes/logs/moq-scan-latest.json（掃描器 --json 自動落盤）
  //
  // 為什麼登錄而非放任：閘門的作用是「防止新增漂移」，不是「否認存量」；
  //   存量需要分批修，登錄後仍有報告可見（顯示為 📋 已登錄），不會被誤讀為乾淨。
  //
  // ── 已裁決並落地（第一批 + 第二批，全部移出本名單）────────────────────
  //  · a2-posters 真值 100→10 ............（K3 2.1）
  //  · white-card-boxes title→500 ........（K3 2.4）
  //  · 利是封/月曆/餐牌 features 柯式經濟量 → 刪除 17 行（K3 2.3）
  //  · 品類級貼紙「50 張起訂」→10 ........（K3 2.2，保留柯式措辭）
  //  · art-posters 真值 100→1 ............（K3 第五節：Giclée 藝術微噴 ⇒ 噴繪/寫真類）
  //  · 貼紙「戶外／可移 100 個起」........（K3 六：正確分層 → 移入 APPROVED_BULK_TIERS）
  //
  // ── 2026-09-19 配对 commit：`en_pcs` 模式配套登记（模式 + 注册 + 分层, **三者同 commit**）──
  //  登錄理由同本名單既有口徑：閘門的作用是「防止新增漂移」, 不是「否認存量」;
  //  登錄後仍以 📋 已登錄 顯示, 不會被誤讀為乾淨。
  //  三條均**不自行核准**（核准權在 K3）, 故入 PENDING 而非 APPROVED：
  //   ① catalog-printing（products.ts:5754）「ZprintPro bulk MOQ 100 pcs for catalog book printing」
  //      真值 10; 含 "bulk" 字樣 ⇒ 疑為大量檔口徑（同 3M 貼紙案）, 待 K3 定是否屬分層。
  //   ②〔品類級〕stickers:2860「50 pcs (digital printing). 1,000+ pcs recommended for offset」
  //   ③〔品類級〕stickers:2867「Same-day digital printing (50–500 pcs)」
  //      ②③ 實為**數碼 vs 柯式的方法門檻/交期說明**（本掃描器既有分類 industry_fact）,
  //      非 SKU 起訂量 ⇒ 待 K3 確認歸類。
  [`catalog-printing|en_pcs|100`, '待裁決：含 "bulk" 字樣（products.ts:5754），疑為大量檔口徑而非 SKU 起訂量 → 須 K3 定是否屬分層'],
  [`〔品類級〕stickers|en_pcs(品類級)|50`, '待裁決：數碼 vs 柯式方法門檻說明（category-seo-content.ts:2860 FAQ），非 SKU 起訂量 → 待 K3 確認歸 industry_fact'],
  [`〔品類級〕stickers|en_pcs(品類級)|500`, '待裁決：即日數碼 50–500 pcs 交期說明（category-seo-content.ts:2867），同前一條'],
];

/**
 * 已登錄的「存量待修」前綴（按檔案 + 分類粒度登錄）。
 *
 * 為什麼用前綴而非逐條：272 條逐條登記會讓名單失去可讀性，且它們同屬
 *   「多 schema 盲區修復後揭發的存量」這**一個**根因 → 按根因登錄，
 *   配合 `--report-only` 可查明細。
 * ⚠️ 這不是「核准」——報告中顯示為 📋 已登錄（未解），與 ✅ 已核准語義不同。
 */
const PENDING_FILE_PREFIXES: [string, string][] = [
  ['src/data/sku-seo-data.ts', '存量待修：多 schema 盲區修復後揭發（229 條，分類見 moq-scan-latest.json）'],
  ['src/data/products-content.ts', '存量待修：同上（39 條）'],
];

const pendingMap = new Map(PENDING_LIST);
const pendingPrefixes = new Map(PENDING_FILE_PREFIXES);

/* ============================================================================
 * 已核准的「大量檔門檻」（K3 2026-09-19 裁定：正確的分層設置，不是漂移）
 * ============================================================================
 * K3 原話：「贴纸『户外/可移 100 个起』是正确的分层设置，不是漂移——市场数据显示
 *   3M 户外贴和可移贴确实需要更高门槛，应在 SSoT 中明确子品类 MOQ 映射。」
 *
 * 為什麼需要獨立於 PENDING_LIST：「待裁決」與「已核准」語義不同——
 *   前者是**未解問題**（會被 K3 追問進度），後者是**已定案口徑**（不應再被當問題）。
 *   混在同一名單會讓「待裁決數」這個指標失真。
 *
 * 判據：key = `${slug}|${kind}|${found}`；子品類映射見 print-method-policy.ts §E。
 */
const APPROVED_BULK_TIERS: [string, string][] = [
  // 貼紙品類頁「戶外貼紙 100 個起」與「可移貼紙 100 個起」
  //   = 大量檔（bulk_tier），非 SKU 起訂量（SKU 皆 10）
  [`〔品類級〕stickers|zh_個起(品類級)|100`, 'K3 裁定：3M 戶外貼／可移貼需更高門檻 → 大量檔 100（非 SKU 起訂量）'],
  [`〔品類級〕stickers|en_MOQ(品類級)|100`, '同上（en：outdoor vinyl / removable stickers 100 pcs MOQ）'],
  // ★ 2026-09-19 配对 commit: `en_pcs` 模式上线后, **同一句已核准语句**以新 kind 再次命中
  //   (category-seo-content.ts:2769「outdoor vinyl stickers 100 pcs MOQ, removable stickers 100 pcs MOQ」)。
  //   判据: kind 只是**抽取模式**的标签, 不改变语句语义 ⇒ 同句沿用 K3 原裁定 (3M 戶外貼／可移貼大量檔 100),
  //   属**已核准分層**, 不是新问题。若不登记, 同一句话会因「换了正则」而被重复计为新漂移。
  [`〔品類級〕stickers|en_pcs(品類級)|100`, '同 en_MOQ(品類級)|100：同一句「outdoor vinyl / removable stickers 100 pcs MOQ」，沿用 K3「3M 戶外貼／可移貼大量檔 100」裁定'],
];

const approvedMap = new Map(APPROVED_BULK_TIERS);

/** 該漂移是否為已登錄項；回傳登錄說明或 undefined */
function pendingNote(h: Hit): string | undefined {
  return pendingMap.get(`${h.slug}|${h.kind}|${h.found}`) ?? pendingPrefixes.get(h.file);
}

/** 獨立第二方法：逐樣式全文 grep（不做 SKU 歸屬），與掃描器同定義域對帳 */
function independentByStyle(file: string): Map<string, number> {
  const out = new Map<string, number>();
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) return out;
  const lines = fs.readFileSync(abs, 'utf-8').split(/\r?\n/);
  for (const { re, kind } of MOQ_PATTERNS) out.set(kind, 0);
  for (const line of lines) {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue;
    for (const { re, kind } of MOQ_PATTERNS) {
      const r = new RegExp(re.source, 'g');
      out.set(kind, out.get(kind)! + (line.match(r) || []).length);
    }
  }
  return out;
}

// ---------- 執行 ----------
const truth = readTruth();
const shapeProblems = assertShape(truth);
const all: Hit[] = [];
for (const f of TARGETS) all.push(...scanFile(f, truth));
// 品類級段落（無 SKU slug，scanFile 會整檔跳過 → 另一判定域，必須獨立掃）
all.push(...scanCategoryLevel());

const drift = all.filter((h) => h.found !== h.truth);
const recount = [...independentByStyle(SELF)].map(([kind, grep]) => ({
  kind,
  grep,
  scan: all.filter((h) => h.file === SELF && h.kind === kind).length,
}));

/**
 * 落盤（機器可讀）——**任何模式都寫**，不只 `--json`。
 *
 * ⚠️ 為什麼必須如此（2026-09-19 實測踩到）：
 *   首版只在 `--json` 模式寫檔，而閘門（pre-commit hook）跑的是 `--gate` → 檔不更新。
 *   後續分析腳本讀到的是**上一次 `--json` 的舊快照**，且毫無提示：
 *   實測真值已由 100 改為 10，分析檔仍報 `truth=100` → 整份分析的歸屬判定失真。
 *   ⇒ **靜默過期比報錯更危險**：報告看起來正常，數字卻是舊的。
 * 寫檔失敗不阻斷主流程（如目錄不存在），僅警告。
 */
function persistScan(payload: unknown): void {
  try {
    fs.writeFileSync('.hermes/logs/moq-scan-latest.json', JSON.stringify(payload, null, 2) + '\n', 'utf8');
  } catch (e) {
    console.error(`⚠️ 無法寫入 .hermes/logs/moq-scan-latest.json: ${(e as Error).message}`);
  }
}

const scanPayload = {
  scannedAt: new Date().toISOString().slice(0, 19),
  truthSize: truth.size,
  shapeProblems,
  hits: all.length,
  drift: drift.length,
  recount,
  findings: drift,
};
persistScan(scanPayload);

if (AS_JSON) {
  console.log(JSON.stringify(scanPayload, null, 2));
} else {
  const bySlug = new Map<string, Hit[]>();
  for (const h of drift) {
    if (!bySlug.has(h.slug)) bySlug.set(h.slug, []);
    bySlug.get(h.slug)!.push(h);
  }

  console.log('MOQ 口徑一致性掃描（真值 = src/data/products.ts minQuantity）');
  console.log(`真值 SKU: ${truth.size} ｜ 掃描檔: ${TARGETS.length} ｜ 命中: ${all.length} ｜ 漂移: ${drift.length}`);
  if (shapeProblems.length) {
    console.log('\n🔴 形狀斷言失敗（指標崩壞，結論作廢）:');
    for (const p of shapeProblems) console.log(`   - ${p}`);
  } else {
    console.log('形狀斷言: ✓ 真值表 = 產品 slug 行 = minQuantity 行 ｜ 分類 slug 已排除');
  }
  const bad = recount.filter((r) => r.scan > r.grep);
  console.log(`\n雙方法復算 (products.ts, 逐樣式同定義域): ${bad.length ? '🔴 指標崩壞' : '✓ 掃描器 ≤ grep 全數成立'}`);
  for (const r of recount) {
    console.log(`   ${r.kind.padEnd(11)} grep ${String(r.grep).padStart(3)} / 掃描器 ${String(r.scan).padStart(3)}${r.scan > r.grep ? '  🔴' : ''}`);
  }

  if (drift.length) {
    // 三類語義必須分開顯示：已登錄待裁決（未解）／已核准（已定案口徑）／新漂移（問題）
    const pending = drift.filter((h) => pendingNote(h));
    const approved = drift.filter((h) => approvedMap.has(`${h.slug}|${h.kind}|${h.found}`));
    const fresh = drift.filter((h) => !pendingNote(h) && !approvedMap.has(`${h.slug}|${h.kind}|${h.found}`));
    console.log(`\n── 漂移明細（${bySlug.size} 個 SKU / ${drift.length} 條）──`);
    console.log(`   📋 已登錄待裁決 ${pending.length} ｜ ✅ 已核准分層 ${approved.length} ｜ 🆕 新漂移 ${fresh.length}`);
    for (const [slug, hs] of bySlug) {
      console.log(`\n  [${slug}] 真值 ${hs[0].truth}`);
      for (const h of hs) {
        const note = pendingNote(h);
        const appr = approvedMap.get(`${h.slug}|${h.kind}|${h.found}`);
        const mark = note ? '📋 已登錄' : appr ? '✅ 已核准' : '🆕 新漂移';
        console.log(`    ${mark} ${path.basename(h.file)}:${h.line} 找到 ${h.found} (${h.kind})`);
        console.log(`       ${h.text}`);
        if (note) console.log(`       登錄理由: ${note}`);
        if (appr) console.log(`       核准依據: ${appr}`);
      }
    }
  } else {
    console.log('\n✓ 無漂移');
  }
}

if (AS_GATE) {
  const fresh = drift.filter((h) => !pendingNote(h) && !approvedMap.has(`${h.slug}|${h.kind}|${h.found}`));
  const fail = fresh.length > 0 || shapeProblems.length > 0 || recount.some((r) => r.scan > r.grep);
  if (fail) {
    console.error('\n[GATE] FAIL — MOQ 口徑掃描閘門');
    if (fresh.length) {
      console.error(`   🆕 新漂移 ${fresh.length} 條（未登錄、未核准，須先修或登錄理由）:`);
      for (const h of fresh.slice(0, 20)) {
        console.error(`      [${h.slug}] ${path.basename(h.file)}:${h.line} 找到 ${h.found} / 真值 ${h.truth} (${h.kind})`);
      }
    }
    if (shapeProblems.length) console.error(`   形狀斷言失敗 ${shapeProblems.length} 條（指標崩壞）`);
    const bad = recount.filter((r) => r.scan > r.grep);
    if (bad.length) console.error(`   雙方法復算失敗 ${bad.length} 條（掃描器 > grep，指標崩壞）`);
    process.exit(1);
  }
  const pending = drift.filter((h) => pendingNote(h));
  const approved = drift.filter((h) => approvedMap.has(`${h.slug}|${h.kind}|${h.found}`));
  const parts: string[] = [];
  if (pending.length) parts.push(`待裁決 ${pending.length}`);
  if (approved.length) parts.push(`已核准分層 ${approved.length}`);
  console.log(`\n[GATE] PASS — 🆕 新漂移 0 條${parts.length ? `（${parts.join(' / ')}，皆不阻擋）` : ''}`);
}
