// moq10-fix-blog-moq.mjs  (v2 — 文章層白名單 + 上下文硬性約束)
// 2026-09-19 — K3 路線圖 P1-5「博客內容層 118 處修正 (逐篇判斷)」
//
// === v1 為何被否決 ===
// v1 只用「命中前後 160 字是否含 in-scope 詞」判斷, 結果改錯多篇:
//   · industrial-nameplate-printing-guide: 「100 張起 $180、1,000 張 $1,200」—— 價目表與 100 張檔綁定,
//     改成 10 張起會令價目全錯 (銘牌屬工業標識, 非本批紙品線)
//   · kraft-paper-box / packaging-box-price / campus-education / school-exercise-book / hotel-keycard:
//     分別屬包裝盒 / 校園 / 酒店客用品, 均不在本批
// 教訓 (per §0.23.2 雙方法復算精神): 品類歸屬唔可以只靠關鍵詞滑窗, 必須先由**文章主題**決定。
//
// === v2 規則 (兩層) ===
//   第 1 層 (必要條件): 文章 slug 必須命中 IN_SCOPE_ARTICLES 白名單 —— 即文章主題本身就係
//                       傳單 / 貼紙 / 標籤 / 賀卡 / 卡片 / 即日(紙品) 之一。
//   第 2 層 (充分條件): 命中處的上下文中, OUT_SCOPE_TERMS 必須 0 命中 ——
//                       防同一篇文章內雜有紙袋 / 包裝盒 / 餐牌 / 月曆 / 信封 / 工業銘牌等段落的數字。
//   兩層都過才改; 否則保留並登錄「待人工複核」。
//
// ★ JSON 安全: JSON.parse → 改字串 → JSON.stringify (門童 #15)。
// ★ dry-run 預設, --apply 才寫盤。

import fs from 'fs';
import path from 'path';

const APPLY = process.argv.includes('--apply');
const DIR = path.join(process.cwd(), 'src', 'data', 'blog-data');
const LOCALES = ['zh-hk', 'en', 'ja'];

/** 第 1 層: 文章主題白名單 (regex 對 slug 比對) — 只涵蓋本批已降至 10 的紙品線 */
const IN_SCOPE_ARTICLES =
  /(flyer|leaflet|sticker|label|greeting|thank[-_]?you|card|傳單|單張|摺頁|折頁|貼紙|標籤|賀卡|卡片|感謝卡|チラシ|ステッカー|シール|ラベル|グリーティング|リーフレット)/i;

/**
 * 第 1 層排除: 主題雖然含 card/sticker 等字, 但屬**婚慶線** —— 婚慶 SKU 維持 50 起,
 * 不在本批 (K3 2026-09-19 裁決: 只做傳單 / 貼紙 / 賀卡)。
 * 實證: wedding-table-card-printing-guide 被 in-scope 的 `card` 誤納 ⇒ 需顯式排除。
 */
const EXCLUDE_ARTICLES =
  /(wedding|bridal|bride|groom|婚宴|婚禮|婚礼|喜帖|喜卡|枱卡|台卡|席位|座位|伴娘|新郎|新娘|ウエディング|結婚式|席札)/i;

/** 第 2 層: 上下文禁用詞 — 命中即不改 (該處屬其他品類) */
const OUT_SCOPE_TERMS =
  /(paper\s*bag|kraft\s*bag|gift\s*bag|shopping\s*bag|paper\s*box|card\s*box|packaging|mailer|corrugated|rigid\s*box|menu|calendar|envelope|lai\s*see|red\s*pocket|notebook|exercise\s*book|nameplate|keycard|key\s*card|yearbook|textbook|workbook|campus|school|university|paper\s*material|紙袋|牛皮袋|手提袋|包裝盒|彩盒|禮盒|紙盒|瓦楞|餐牌|菜單|月曆|年曆|桌曆|信封|利是封|紅包|筆記本|練習冊|作業簿|課本|教材|銘牌|房卡|紀念冊|年鑑|校園|學校|大學|紙材|紙張|パッケージ|箱|メニュー|カレンダー|封筒|ノート|名札|校|大学|紙袋|クラフト袋)/i;

/**
 * 第 3 層: 價目保護 — 上下文若係「價目/批量單價」語境, 唔可以改起印量。
 *
 * 實證 (zh-hk/sticker-guide): 「PVC 防水貼紙 100 張起印，每張低至 HK$0.22」
 *   —— 呢個 100 張係**價目表的起批量**, 即「HK$0.22/張 係 100 張檔的價」。
 *   改成 10 張起印會令報價當場變假 (10 張實際 HK$71 起, 唔係 HK$0.22/張)。
 *   正確處理: 起印量宣稱 (10 張) 與價目檔位 (100 張起 HK$0.22/張) 係兩件事, 後者留待價目同步波。
 *
 * 例外: 該處若正在回答「最低起印量/MOQ」問題, 即使含價格亦要改
 *   (例: 「Q1: 貼紙印刷最低起印量係幾多？ A1: 全部 100 張起印，PVC HK$0.22/張起」)。
 */
const PRICE_TIER_TERMS = new RegExp(
  [
    '每張低至', '每張約', '低至\\s*HK', '約\\s*HK\\$',
    'HK\\$[\\d.,]+\\s*\\/\\s*(張|枚|個|本|pc|pcs|sheet)',
    '價格參考', '單價參考', '價目', '批量價', '起批', '量產',
    // 2026-09-19 補 (英文側「價格綁定 MOQ」):
    //   "US$1.20-1.80 per piece at 100 MOQ" / "from $0.36/pc" / "at 100 MOQ, from $..."
    //   呢類一改 MOQ 就會令報價當場變假 (100 件批量價 ≠ 10 件價), 必須一併保護。
    'per\\s*piece', 'per\\s*pc\\b', 'from\\s*\\$', '\\$[\\d.,]+\\s*\\/\\s*pc',
    '\\bUS\\$[\\d.,]+', 'starting\\s*at\\s*\\$',
    // 2026-09-19 補 (日文側「價格綁定 MOQ」):
    //   「100 枚から、1 枚 HK$0.22〜」「100 枚からの単価目安 ¥50/枚〜」
    //   呢兩類都係「該 MOQ 對應的單價」, 改 MOQ 一樣會令報價變假。
    '1\\s*枚\\s*HK\\$', '単価目安', '単価は', '1\\s*枚\\s*¥', '¥[\\d,]+\\s*\\/\\s*枚',
  ].join('|'),
  'i',
);
const IS_MOQ_QUESTION = new RegExp(
  [
    '最低起印量', '最少印幾多', '最小起訂', '最小ロット', '最少可以印',
    '起印量\\s*\\(MOQ\\)', 'MOQ\\s*係幾多', 'minimum order', 'minimum quantity',
    'lowest quantity', '起訂量', 'minimum\\s*order\\s*quantity',
  ].join('|'),
  'i',
);

const PATTERNS = [
  { re: /100\s*張起印/g, loc: 'zh-hk', to: '10 張起印' },
  { re: /100\s*張起(?!印)/g, loc: 'zh-hk', to: '10 張起' },
  { re: /100[- ]copy MOQ/gi, loc: 'en', to: '10-copy MOQ' },
  { re: /MOQ\s*100\b/g, loc: 'en', to: 'MOQ 10' },
  { re: /\b100\s*MOQ\b/g, loc: 'en', to: '10 MOQ' },
  { re: /\b100\s*pcs?\s*MOQ\b/gi, loc: 'en', to: '10 pcs MOQ' },
  { re: /100\s*枚から/g, loc: 'ja', to: '10枚から' },
  { re: /100\s*枚〜/g, loc: 'ja', to: '10枚〜' },
];

const SLICE = 200;
const SHOW_CONTEXT = !APPLY;   // dry-run 時逐處印出上下文供人工確認
const contexts = [];
let changed = 0, kept = 0, priceKept = 0, uncertain = 0, skippedArticles = 0;
const report = [];
const uncertainList = [];
const skipped = [];

for (const loc of LOCALES) {
  const file = path.join(DIR, `${loc}.json`);
  if (!fs.existsSync(file)) continue;
  const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let locChanged = 0;

  for (const slug of Object.keys(json)) {
    // 第 1 層
    if (!IN_SCOPE_ARTICLES.test(slug) || EXCLUDE_ARTICLES.test(slug)) {
      const has = Object.values(json[slug]).some((v) => typeof v === 'string' && PATTERNS.some((p) => p.loc === loc && p.re.test(v)));
      if (has) { skippedArticles++; if (skipped.length < 25) skipped.push(`${loc}/${slug}`); }
      continue;
    }
    const entry = json[slug];
    for (const [field, val] of Object.entries(entry)) {
      if (typeof val !== 'string') continue;
      let next = val;
      const applied = [];
      for (const p of PATTERNS) {
        if (p.loc !== loc) continue;
        next = next.replace(p.re, (m, offset) => {
          const ctx = next.slice(Math.max(0, offset - SLICE), offset + m.length + SLICE);
          // 第 2 層: 他品類
          if (OUT_SCOPE_TERMS.test(ctx)) {
            kept++;
            if (uncertainList.length < 30) {
              const hit = ctx.match(OUT_SCOPE_TERMS);
              uncertainList.push(`[保留:上下文含「${hit[0]}」] ${loc}/${slug}/${field}: …${ctx.replace(/\s+/g, ' ').slice(Math.max(0, SLICE - 60), SLICE + 50)}…`);
            }
            return m;
          }
          // 第 3 層: 價目/檔位語境 (除非正在回答 MOQ 問題)
          if (PRICE_TIER_TERMS.test(ctx) && !IS_MOQ_QUESTION.test(ctx)) {
            priceKept++;
            return m;
          }
          applied.push(`${m}→${p.to}`);
          if (SHOW_CONTEXT && contexts.length < 130) {
            contexts.push(`${loc}/${slug}#${field} :: …${ctx.replace(/\s+/g, ' ').slice(Math.max(0, SLICE - 75), SLICE + 45)}…`);
          }
          return p.to;
        });
      }
      if (next !== val) {
        entry[field] = next;
        locChanged += applied.length;
        report.push(`${loc}/${slug}/${field}: ${applied.length} 處`);
      }
    }
  }

  if (locChanged && APPLY) fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  changed += locChanged;
  console.log(`${loc}: ${locChanged} 處${APPLY ? ' 已寫盤' : ' (dry-run)'}`);
}

console.log(`\n=== 改動明細 (${report.length} 個欄位) ===`);
for (const r of report) console.log('  ' + r);
console.log(`\n統計: 改 ${changed} | 他品類保留 ${kept} | 價目檔位保留 ${priceKept} | 非本批主題文章略過 ${skippedArticles} 篇`);
if (skipped.length) {
  console.log('\n=== 略過的文章樣本 (主題非紙品線) ===');
  for (const s of skipped) console.log('  ' + s);
}
if (uncertainList.length) {
  console.log('\n=== 因上下文保留樣本 ===');
  for (const u of uncertainList) console.log('  ' + u);
}
if (!APPLY) {
  console.log('\n=== 逐處修改上下文 (人工確認用) ===');
  for (const c of contexts) console.log('  ' + c);
  console.log('\n(dry-run — 加 --apply 才寫盤)');
}
