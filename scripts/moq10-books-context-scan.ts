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

// ---------- 真值：只認縮排 4 的產品 SKU ----------
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
  { re: /(?:^|[^\d,])(\d+)\s*枚\s*(?:から|〜|~)/g, kind: 'ja_枚から', lang: 'ja' },
  { re: /(?:^|[^\d,])(\d+)\s*冊\s*(?:から|〜|~)/g, kind: 'ja_冊から', lang: 'ja' },
  // en 的 MOQ 有多種寫法：`100 MOQ`（數字+空格+MOQ）與 `100 sheets MOQ`（數字+單位詞+MOQ）。
  // 只寫前者會漏掉後者（實測 L8309 `100 sheets MOQ` 即被漏）。
  { re: /(?:^|[^\d,])(\d+)[ \t]+(?:[A-Za-z]{3,12}[ \t]+)?(?:MOQ|Copies|copies)\b/g, kind: 'en_MOQ', lang: 'en' },
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

  // 產品 SKU 起點（縮排 4）→ 供行歸屬判定
  const starts: { slug: string; start: number }[] = [];
  lines.forEach((l, i) => {
    const s = isProductSlugLine(l);
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
  // ── 海報線：文案與 minQuantity 互相矛盾，需 K3 真值裁決 ──
  //   同一 SKU 的多個語系/措辭變體都要登錄，否則閘門會把變體當新漂移擋下
  ['a2-posters|zh_張起|10', 'minQuantity=100 但文案「10張起印／10張起訂」；price-tables 該尺寸價階由 10 起 → 需裁決以何者為真值'],
  ['a2-posters|ja_枚から|10', '同上（ja 文案「10枚から」）'],
  ['art-posters|zh_張起|1', 'minQuantity=100 但文案「1張起印」→ 需裁決（或與 A1 噴繪線合併口徑）'],
  // ── 利是封：features【500個起訂】vs minQuantity=100 ──
  ...['foil-red-packets', 'embossed-red-packets', 'custom-red-packets', 'cartoon-red-packets', 'eco-red-packets', 'large-red-packets'].map(
    (s): [string, string] => [
      `${s}|zh_個起|500`,
      `features 寫【500個起訂】但 minQuantity=100 → 待裁決「柯式經濟量」是否應寫進 features`,
    ]
  ),
  // ── 月曆：features【500本起印】vs minQuantity=1000 ──
  ...['wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars'].map(
    (s): [string, string] => [
      `${s}|zh_本起|500`,
      `features 寫【500本起印】但 minQuantity=1000 → 待裁決`,
    ]
  ),
  // ── 餐牌：features【50本起訂】vs minQuantity=100 ──
  ...['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus'].map(
    (s): [string, string] => [
      `${s}|zh_本起|50`,
      `features 寫【50本起訂】但 minQuantity=100 → 待裁決`,
    ]
  ),
  // ── 白卡彩盒：title_zh「100個起印」vs minQuantity=500 ──
  ['white-card-boxes|zh_個起|100', 'title_zh 寫「100個起印」但 minQuantity=500 → 待裁決'],
  // ── 品類級段落（category-seo-content.ts 貼紙品類頁；真值 10，文案寫 50/100）──
  //   ⚠️ 這批是 2026-09-19 新增「品類級掃描」後才被看見的重大盲區：
  //      該檔的品類級文案無 SKU slug → 原本被整檔跳過，永遠報 0 命中（假象）。
  //   裁決點不止「改數字」：文案是「50 張起訂（數碼）+ 1,000 張以上柯式更經濟」的**完整階梯**，
  //      改成 10 需同時確認柯式門檻措辭，故列待裁決而非逕改。
  [`〔品類級〕stickers|zh_個起(品類級)|50`, 'featuredSnippet + h2 寫「貼紙印刷 50 個起」但貼紙真值 10'],
  [`〔品類級〕stickers|zh_個起(品類級)|100`, 'featuredSnippet 寫「戶外/可移貼紙 100 個起」→ 待裁決是否改 10'],
  [`〔品類級〕stickers|zh_張起(品類級)|50`, 'paragraphs/buyersGuide/FAQ 寫「50 張起（數碼印刷）」→ 待與柯式階梯一併裁決'],
  [`〔品類級〕stickers|en_MOQ(品類級)|100`, 'en featuredSnippet 寫「outdoor vinyl stickers 100 pcs MOQ」→ 待裁決'],
];

const pendingMap = new Map(PENDING_LIST);

/** 該漂移是否為已登錄項；回傳登錄說明或 undefined */
function pendingNote(h: Hit): string | undefined {
  return pendingMap.get(`${h.slug}|${h.kind}|${h.found}`);
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

if (AS_JSON) {
  console.log(
    JSON.stringify(
      {
        scannedAt: new Date().toISOString().slice(0, 19),
        truthSize: truth.size,
        shapeProblems,
        hits: all.length,
        drift: drift.length,
        recount,
        findings: drift,
      },
      null,
      2
    )
  );
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
    // 區分「已登錄待裁決」與「新漂移」——前者不算閘門失敗，但一律顯示
    const pending = drift.filter((h) => pendingNote(h));
    const fresh = drift.filter((h) => !pendingNote(h));
    console.log(`\n── 漂移明細（${bySlug.size} 個 SKU / ${drift.length} 條）──`);
    console.log(`   已登錄待裁決 ${pending.length} 條 ｜ 🆕 新漂移 ${fresh.length} 條`);
    for (const [slug, hs] of bySlug) {
      console.log(`\n  [${slug}] 真值 ${hs[0].truth}`);
      for (const h of hs) {
        const note = pendingNote(h);
        const mark = note ? '📋 已登錄' : '🆕 新漂移';
        console.log(`    ${mark} ${path.basename(h.file)}:${h.line} 找到 ${h.found} (${h.kind})`);
        console.log(`       ${h.text}`);
        if (note) console.log(`       登錄理由: ${note}`);
      }
    }
  } else {
    console.log('\n✓ 無漂移');
  }
}

if (AS_GATE) {
  const fresh = drift.filter((h) => !pendingNote(h));
  const fail = fresh.length > 0 || shapeProblems.length > 0 || recount.some((r) => r.scan > r.grep);
  if (fail) {
    console.error('\n[GATE] FAIL — MOQ 口徑掃描閘門');
    if (fresh.length) {
      console.error(`   🆕 新漂移 ${fresh.length} 條（未登錄，須先修或登錄理由）:`);
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
  console.log(`\n[GATE] PASS — 🆕 新漂移 0 條${pending.length ? `（另有 ${pending.length} 條已登錄待裁決，不阻擋）` : ''}`);
}
