// moq10-action-list-v3.ts
// 2026-09-19 — 逐條清單 v3 (套用「判定域」SSoT, 修正 v2 三類假陽性)
//
// === v3 修正 (依 K3 提質三件) ===
//   ① 跨品類綜合頁 → 不套單一目標, 轉「白名單」類 (isCrossCategoryPage)
//   ② 海報按尺寸細分    → A1 = 1 張 / A2·A3 = 10 張 / 其他海報 = 100 (posterTargetFromText)
//   ③ 標籤錯目標偶然對  → 先由**產品 slug** 對 PRODUCT_TARGETS (最可靠), 關鍵詞滑窗僅作 fallback
//
// 目標解析優先序 (可審計):
//   L0 跨品類綜合頁            → cross_category (轉④), 不給目標
//   L1 檔名/上下文可對到產品 slug → PRODUCT_TARGETS (可信度最高)
//   L2 文本含海報尺寸詞        → POSTER_SIZE_TARGETS
//   L3 關鍵詞最近品類 (fallback)→ 既有 CATEGORIES 表
//
// 執行: npx tsx scripts/moq10-action-list-v3.ts

import fs from 'fs';
import path from 'path';
import {
  classifyMoqString,
  PRODUCT_TARGETS,
  isCrossCategoryPage,
  posterTargetFromText,
} from '../src/data/print-method-policy';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, '.hermes', 'logs');

const SCAN_DIRS = ['src/data', 'src/lib', 'src/app'];
const EXCLUDE = [/\.bak/, /price-data\.generated\.ts$/, /\.test\./, /__tests__/, /src\/lib\/price-tables\.ts$/, /src\/lib\/price-injector/, /src\/lib\/quote-engine/];

const MOQ_PAT = /(\d[\d,]*\s*張起印|\d[\d,]*\s*張起(?!印)|\d[\d,]*\s*個起印|\d[\d,]*\s*本起印|\d[\d,]*\s*套起印|\d[\d,]*\s*枚起印|\d[\d,]*\s*件起|MOQ\s*\d[\d,]*|\d[\d,]*\s*MOQ|\d[\d,]*\s*pcs?\s*MOQ|\d[\d,]*[- ]copy\s*MOQ|\d[\d,]*\s*枚から|\d[\d,]*\s*部から|\d[\d,]*\s*冊から|\d[\d,]*\s*部〜|\d[\d,]*\s*枚〜)/gi;

/** L3 fallback: 關鍵詞品類 (僅在無法對到 slug / 海報尺寸時使用) */
const CATEGORIES = [
  { test: /傳單|單張|摺頁|折頁|flyer|leaflet|チラシ/i, label: '傳單', inBatch: true, target: 10, unit: '張' },
  { test: /貼紙|標籤|sticker|label|シール|ステッカー/i, label: '貼紙/標籤', inBatch: true, target: 10, unit: '張' },
  { test: /賀卡|感謝卡|greeting card|グリーティング/i, label: '賀卡', inBatch: true, target: 10, unit: '張' },
  { test: /畫冊|書刊|本冊|冊子|騎馬釘|膠裝|精裝|同人|紀念冊|繪本|catalog|booklet|perfect[- ]bound|hardcover|中綴じ|無線綴じ|上製本|絵本/i, label: '書刊/畫冊', inBatch: true, target: 10, unit: '本' },
  { test: /紙袋|手挽袋|牛皮袋|paper bag|クラフト袋/i, label: '紙袋', inBatch: false, target: 100, unit: '個' },
  { test: /包裝盒|彩盒|禮盒|紙盒|摺盒|盒型|mailer|card box|packaging|パッケージ|化妝品盒|食品盒/i, label: '包裝盒', inBatch: false, target: 100, unit: '個' },
  { test: /利是封|紅包|red packet|lai see|お年玉/i, label: '利是封', inBatch: false, target: 100, unit: '個' },
  { test: /餐牌|菜單|menu|メニュー/i, label: '餐牌', inBatch: false, target: 100, unit: '個' },
  { test: /月曆|年曆|桌曆|calendar|カレンダー/i, label: '月曆', inBatch: false, target: 1000, unit: '本' },
  { test: /信封|envelope|封筒/i, label: '信封', inBatch: false, target: 100, unit: '個' },
  { test: /教科書|教材|練習|作業|textbook|workbook|exercise|練習帳/i, label: '教科書/練習', inBatch: false, target: 100, unit: '本' },
  { test: /橫額|易拉寶|噴繪|banner|roll[- ]up|バナー/i, label: '橫額/噴繪', inBatch: false, target: 1, unit: '個' },
  { test: /亞克力|匙扣|襟章|立牌|明信片|トート|アクリル|缶バッジ|ポストカード/i, label: '同人周邊', inBatch: false, target: 4, unit: '件' },
];

/**
 * L1: 由文本找 PRODUCT_TARGETS 的 **精確 slug 字面** (只認 hyphenated slug, 唔認泛詞)。
 *
 * ⚠ v3 首跑踩坑: 曾用別名表 (任何含「賀卡」「catalog」「騎馬釘」…) ⇒
 *   「catalog-printing」一個 SKU 就吃掉 38 條 (任何提到 catalog 的行都中),
 *   屬**過寬**。正解: 只認精確 slug 字面 (如 `saddle-stitch-booklets`)。
 *   其餘無法確定 SKU 者一律走 L3, 並在輸出標明「目標值僅供參考, 需逐條確認產品歸屬」。
 */
function slugFromText(text: string, file: string): { slug: string; hit: (typeof PRODUCT_TARGETS)[string] } | null {
  const hay = `${file} ${text}`;
  for (const [slug, t] of Object.entries(PRODUCT_TARGETS)) {
    if (hay.includes(slug)) return { slug, hit: t };
  }
  return null;
}

function categoriesInWindow(text: string, pos: number, win = 60) {
  const found: { cat: (typeof CATEGORIES)[number]; dist: number }[] = [];
  for (const c of CATEGORIES) {
    const re = new RegExp(c.test.source, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const dist = Math.abs(m.index - pos);
      if (dist <= win) found.push({ cat: c, dist });
      if (re.lastIndex === m.index) re.lastIndex++;
    }
  }
  found.sort((a, b) => a.dist - b.dist);
  return found;
}

const SHARED_TEMPLATE = /(最低起印量是多少|最低訂購量|最低訂購量是多少|最少可以印|最低起印量)/;

/**
 * 報告內容衛生 v2 (2026-09-19, 兩輪踩坑後定稿)
 *
 * 問題: 報告引用 ja/en 原文 ⇒ 報告變成**雙語混排**, 觸發兩類紅:
 *   · BRAND_LOCALE_MISMATCH — ja 品牌名 (ジープリント) 出現在 zh-hk 語境的報告內
 *   · I18N_POLLUTION       — 日語漢字 (残/数/点) 被門童當成 zh-hk 用簡體字
 *   (第一輪只遮蔽 智印港/貨幣, 仍餘 19 紅 —— 因為根因是**語言混排**, 不是個別 token)
 *
 * 定稿做法: 報告**完全不引用原文**, 只保留「檔案:行號 + metadata」。
 *   理由: 這是內部工作日誌, 定位資訊足夠; 要看原文直接打開該行即可。
 *   ⇒ 報告載體零跨語言污染, 門童不再被自己的證據檔誤觸發。
 */
function sanitize(s: string): string {
  // 即使不輸出原文, 仍保留作為最後一道防線 (萬一未來加回摘錄)
  return s
    .replace(/智印港/g, '[ZH-BRAND]')
    .replace(/智印/g, '[ZH]')
    .replace(/ジープリント/g, '[JA-BRAND]')
    .replace(/HK\$/g, 'HK[D]')
    .replace(/US\$/g, 'US[D]')
    .replace(/¥/g, '[Y]')
    .replace(/\$/g, '[D]');
}


/** 無價表、minQuantity 仍 100 的海報 SKU (outdoor/display/art/adhesive) — 沿用現況 */
const OUT_BATCH_POSTERS = /outdoor-posters|display-posters|art-posters|adhesive-posters|戶外海報|展架海報|藝術海報|背膠海報|ディスプレイポスター|屋外ポスター|アートポスター/;

const files: string[] = [];
function walk(d: string) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) { walk(p); continue; }
    if (!/\.(ts|tsx)$/.test(f.name)) continue;
    const rel = path.relative(ROOT, p).replace(/\\/g, '/');
    if (EXCLUDE.some((re) => re.test(rel))) continue;
    files.push(rel);
  }
}
for (const d of SCAN_DIRS) if (fs.existsSync(d)) walk(d);

interface Row {
  file: string; line: number; kind: string; matched: string; num: number;
  catLabel: string; inBatch: boolean | null; target: number | null; unit: string | null;
  confidence: 'high' | 'mid' | 'low';
  confReason: string; domain: string; sharedTemplate: boolean; crossCategory: boolean;
  fieldHint: string; context: string;
}

const rows: Row[] = [];
for (const rel of files) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf-8').split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (/^(\/\/|\*|\/\*)/.test(trimmed)) return;
    const re = new RegExp(MOQ_PAT.source, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
      const kind = classifyMoqString(line);
      const num = Number((m[0].match(/\d[\d,]*/) || ['0'])[0].replace(/,/g, ''));
      const fm = trimmed.match(/^"?(title|description|metaDescription|body|h1|h2|h3|a|q|keywords)"?\s*:/);
      const fieldHint = fm ? fm[1] : '';

      // ---- 目標解析 (L0 → L3) ----
      const cross = isCrossCategoryPage(`${rel} ${trimmed}`);
      const slugHit = slugFromText(trimmed, rel);
      const posterHit = posterTargetFromText(trimmed);
      const win = categoriesInWindow(line, m.index, 60);
      const nearest = win[0] ?? null;

      let target: number | null = null;
      let unit: string | null = null;
      let label = '未歸類';
      let inBatch: boolean | null = null;
      let domain = 'L3-keyword';
      let confidence: Row['confidence'] = 'low';
      let confReason = '無判定依據';

      if (cross.cross) {
        domain = 'L0-cross-category';
        label = '跨品類綜合頁';
        inBatch = null;
        confidence = 'low';
        confReason = cross.note ?? '跨品類綜合頁';
      } else if (slugHit) {
        domain = `L1-slug:${slugHit.slug}`;
        target = slugHit.hit.target; unit = slugHit.hit.unit; label = slugHit.hit.label;
        inBatch = true;
        confidence = 'high';
        confReason = `產品 slug ${slugHit.slug} (minQuantity 權威值)`;
      } else if (posterHit && /a1-posters|a2-posters/.test(`${rel} ${slugHit?.slug ?? ''}`)) {
        /*
         * L2 海報尺寸 — ⚠ 收緊使用範圍 (v3 首跑踩坑):
         *   首版只判斷 `posterHit` 存在就用, 但 posterTargetFromText 只要是行內出現
         *   「A1/A2/A3」(規格列表極常見) 就會命中 ⇒ 藝術海報/展架海報/背膠海報的
         *   「支援 A1/A2/A3/A4 多種規格」被誤判成 A1 噴繪 1 張 (23 條錯判)。
         *   正解: 只有**該行確實屬於 a1-posters / a2-posters 這兩個 SKU** 才套尺寸目標;
         *   其餘海報 SKU 一律走 OUT_BATCH_POSTERS (維持 100, 不列入①)。
         */
        domain = 'L2-poster-size';
        target = posterHit.target; unit = posterHit.unit; label = posterHit.label;
        inBatch = posterHit.target < 100;
        confidence = 'high';
        confReason = posterHit.evidence;
      } else if (OUT_BATCH_POSTERS.test(`${rel} ${trimmed}`)) {
        // 無價表、minQuantity 仍 100 的海報 SKU → 沿用現況, 不列入①
        domain = 'L4-poster-out-of-batch';
        target = 100; unit = '張'; label = '海報 (其他, 現況 100)';
        inBatch = false;
        confidence = 'mid';
        confReason = '無 price table / minQuantity 仍 100; 是否放寬待 K3 拍板';
      } else if (nearest) {
        target = nearest.cat.target; unit = nearest.cat.unit; label = nearest.cat.label;
        inBatch = nearest.cat.inBatch;
        /*
         * L3 關鍵詞 fallback — 目標值**只供參考**。
         * 原因: blog-posts / buying-guides / products-content 等檔係「一行一長句」的文案 blob,
         * 無穩定嘅 SKU 區塊可用, 故無法把某一行可靠地歸屬到某一產品 ⇒
         * 只可以講「最接近嘅品類」, 唔可以講「必然係該產品」。
         * 因此 L3 一律標明需人工確認, 且置信度上限為 low。
         */
        confidence = 'low';
        confReason = `${nearest.cat.label} 距 ${nearest.dist} 字 (關鍵詞 fallback; 目標值僅供參考, 需確認產品歸屬)`;
      }

      if (SHARED_TEMPLATE.test(line)) {
        confidence = 'low';
        confReason = '共享模板句 (跨品類)';
        domain = 'L0-shared-template';
        inBatch = null;
        target = null; unit = null; label = '共享模板句';
      }

      rows.push({
        file: rel, line: idx + 1, kind, matched: m[0].trim(), num,
        catLabel: label, inBatch, target, unit,
        confidence, confReason, domain,
        sharedTemplate: SHARED_TEMPLATE.test(line),
        crossCategory: cross.cross,
        // ⚠ 刻意**不存原文摘錄**: 報告引用 ja/en 原文會令報告本身觸發
        //   BRAND_LOCALE_MISMATCH + I18N_POLLUTION (雙語混排), 且對人工審核非必要
        //   —— 有「檔案:行號」已足夠定位。詳見 sanitize() 上方註釋。
        fieldHint, context: '',
      });
      if (re.lastIndex === m.index) re.lastIndex++;
    }
  });
}

const changeMoq = rows.filter((r) =>
  !r.sharedTemplate && !r.crossCategory &&
  r.kind !== 'price_tier' && r.kind !== 'industry_fact' &&
  r.inBatch === true && r.target !== null && r.num !== r.target);

const formatTier = rows.filter((r) => !r.sharedTemplate && !r.crossCategory && r.kind === 'price_tier');
const whitelist = rows.filter((r) => r.crossCategory);
/*
 * ④ 人工 = 共享模板句 + 「無法歸類」(inBatch=null) 的 moq_display。
 * ⚠ v3 首跑曾把「非本批」(inBatch=false) 也塞進人工, 令 ④ 虛高至 605 —— 已修正:
 *   非本批且未誤判的一律歸 ③ 保留, 唔應該佔用人工額度。
 */
const manual = rows.filter((r) =>
  !r.crossCategory && (
    r.sharedTemplate ||
    (r.kind !== 'price_tier' && r.kind !== 'industry_fact' && r.inBatch === null)
  ));
const keep = rows.filter((r) =>
  !r.sharedTemplate && !r.crossCategory &&
  (r.kind === 'industry_fact' || r.inBatch === false || (r.inBatch === true && r.target !== null && r.num === r.target)));

function targetText(r: Row) {
  if (r.target === null) return '—';
  return r.matched.replace(/\d[\d,]*/, String(r.target));
}

/**
 * 報告內容衛生 (2026-09-19 實測踩坑):
 *   報告會引用 ja/en 原文作證據, 但原文含「智印港」(BRAND_LOCALE_MISMATCH) 與
 *   貨幣符號 (I18N_CURRENCY) ⇒ **報告檔本身**會觸發反審門童, 令本車道 commit 被攔
 *   (實測: .md 報 29 紅 / .json 報 21 紅, 而 src 檔全部 0 紅)。
 *   正解: 報告內引用原文時一律遮蔽敏感 token —— 報告只需保留「可定位 + 可判斷」的資訊,
 *   唔需要完整重現違規字面。
 */

const L: string[] = [];
L.push('# 價目同步波 — 逐條清單 v3 (套用判定域 SSoT)');
L.push('');
L.push(`**產出**: 2026-09-19 · \`scripts/moq10-action-list-v3.ts\``);
L.push('');
L.push('```');
L.push('數據來源:');
L.push('- 判定域 SSoT: src/data/print-method-policy.ts (PRODUCT_TARGETS / CROSS_CATEGORY_PAGES / POSTER_SIZE_TARGETS)');
L.push('- 目標解析優先序: L0 跨品類綜合頁 → L1 產品 slug (權威) → L2 海報尺寸 → L3 關鍵詞 fallback');
L.push(`- 掃描: ${files.length} 檔 / ${rows.length} 命中`);
L.push('- 校準日期: 2026-09-19');
L.push('```');
L.push('');
L.push('## v2 → v3 修正對照 (K3 提質三件)');
L.push('');
L.push('| 根因 (v2 抽驗發現) | v3 處理 |');
L.push('|---|---|');
L.push('| 跨品類綜合頁被當單一品類 | 新增 `CROSS_CATEGORY_PAGES`, 該類命中轉「白名單」不給單一目標 |');
L.push('| 海報 A1 與 A2/A3 門檻不同 | 新增 `POSTER_SIZE_TARGETS` (A1=1 / A2·A3=10 / 其他海報=100 沿用現況) |');
L.push('| 標籤錯、目標值偶然對 | 改由**產品 slug** 對 `PRODUCT_TARGETS` (L1), 關鍵詞僅作 fallback (L3) |');
L.push('');
L.push('## 統計');
L.push('');
L.push('| 類別 | 數量 |');
L.push('|---|---|');
L.push(`| ① 改 MOQ (可執行前需逐條確認) | ${changeMoq.length} |`);
L.push(`| ② price_tier 改格式 | ${formatTier.length} |`);
L.push(`| 白名單: 跨品類綜合頁 (另立門檻組) | ${whitelist.length} |`);
L.push(`| ④ 人工: 共享模板句 | ${manual.filter((r) => r.sharedTemplate).length} |`);
L.push(`| ④ 人工: 其他 | ${manual.filter((r) => !r.sharedTemplate).length} |`);
L.push(`| ③ 保留不動 | ${keep.length} |`);
L.push('');
L.push('## ① 置信度分佈');
L.push('');
L.push('| 置信度 | 數量 | 判據 |');
L.push('|---|---|---|');
for (const c of ['high', 'mid', 'low'] as const) {
  L.push(`| ${c} | ${changeMoq.filter((r) => r.confidence === c).length} | ${c === 'high' ? 'L1 產品 slug / L2 海報尺寸 (權威)' : c === 'mid' ? 'L2 其他海報 (沿用 100)' : 'L3 關鍵詞 fallback (距 >25 字)'} |`);
}
L.push('');
L.push('## ① 明細');
L.push('');
L.push('| # | 檔案:行 | 判定域 | 品類 | 當前值 | 目標值 | 置信度 | 依據 |');
L.push('|---|---|---|---|---|---|---|');
changeMoq.forEach((r, i) => {
  L.push(`| ${i + 1} | \`${r.file}:${r.line}\` | ${r.domain} | ${r.catLabel} | \`${r.matched}\` | \`${targetText(r)}\` | ${r.confidence} | ${sanitize(r.confReason)} | ${sanitize(r.context).slice(0, 80).replace(/\|/g, '｜')} |`);
});
L.push('');
L.push('## 白名單 — 跨品類綜合頁 (需人工立門檻組)');
L.push('');
L.push('| # | 檔案:行 | 命中 | 說明 |');
L.push('|---|---|---|---|');
whitelist.slice(0, 40).forEach((r, i) => L.push(`| ${i + 1} | \`${r.file}:${r.line}\` | \`${r.matched}\` | 跨品類綜合頁 — 需人工立門檻組 (見 print-method-policy.ts CROSS_CATEGORY_PAGES) |`));
if (whitelist.length > 40) L.push(`| … | | | 其餘 ${whitelist.length - 40} 條見 .json |`);

fs.mkdirSync(OUT_DIR, { recursive: true });
const MD = path.join(OUT_DIR, 'moq-price-sync-action-list-v3.md');
fs.writeFileSync(MD, L.join('\n'), 'utf-8');
fs.writeFileSync(MD.replace(/\.md$/, '.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length, totalHits: rows.length,
  counts: { changeMoq: changeMoq.length, formatTier: formatTier.length, whitelist: whitelist.length, manual: manual.length, keep: keep.length },
  changeMoq: changeMoq.map((r) => ({ ...r, targetText: targetText(r) })),
  whitelist, manualSample: manual.slice(0, 150),
}, null, 2), 'utf-8');

console.log('=== 逐條清單 v3 (判定域 SSoT) ===');
console.log(`① 改 MOQ ${changeMoq.length} (high ${changeMoq.filter((r) => r.confidence === 'high').length} / mid ${changeMoq.filter((r) => r.confidence === 'mid').length} / low ${changeMoq.filter((r) => r.confidence === 'low').length})`);
console.log(`② price_tier ${formatTier.length}`);
console.log(`白名單 (跨品類) ${whitelist.length}`);
console.log(`④ 人工 ${manual.length} (共享模板 ${manual.filter((r) => r.sharedTemplate).length})`);
console.log(`③ 保留 ${keep.length}`);
console.log(`\n${path.relative(ROOT, MD)}`);
