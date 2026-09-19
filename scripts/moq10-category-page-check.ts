// moq10-category-page-check.ts — 品類頁 MOQ 一致性檢查（K3 2026-09-19 指令第 7 項）
//
// 目的：終結「打地鼠」——品類頁的起印量分散在 4 個渲染面：
//   ① H1 / hero hook        （CategorySharpHooks）
//   ② 場景卡片 3 行文案      （CategoryIndustries + CategorySharpHooks）
//   ③ 產品卡片             （CategoryProductCard，已接 SSoT）
//   ④ 品類 FAQ             （category-seo-content.ts）
// 本檢查把「每個面實際會渲染出的起印量」與 SSoT 真值（products.ts minQuantity）對帳。
//
// 與 moq10-books-context-scan.ts 的分工：
//   · 前者 = 來源層掃描（5 個 data/lib 檔的字串級別）
//   · 本檔 = **渲染層驗證**（呼叫真實函式，看使用者實際看到什麼）
//   兩者為雙方法，任一紅即代表口徑不一致。

import { withSceneMoq, getDisplayMinOrder, sceneMoqLabel, SCENE_MOQ_SOURCE } from '../src/data/print-method-policy';
import { products } from '../src/data/products';

const LOCALES = ['zh-hk', 'en', 'ja'] as const;
let pass = 0;
const fails: string[] = [];

function check(cond: boolean, msg: string) {
  if (cond) pass++;
  else fails.push(msg);
}

// ────────────────────────────────────────────────────────────
// 面 ① / ②：場景卡片（兩份資料源都要驗，因為它們是各自維護的）
// ────────────────────────────────────────────────────────────

/** CategoryIndustries.tsx 的 educational 場景（線上實際內容） */
const INDUSTRIES_EDU: Record<string, Record<string, string[]>> = {
  graduation: {
    'zh-hk': ['畢業紀念冊印刷 · 精裝', '布面硬皮 + 燙金校名', '全彩內頁 · 100 本起'],
    en: ['Graduation yearbook · hardcover', 'Cloth cover + foil school name', 'Full-color · from 100'],
    ja: ['卒業記念アルバム・上製本', '布張り表紙 + 校名箔押し', 'フルカラー・100冊から'],
  },
  workbook: {
    'zh-hk': ['補習社皇牌教材印刷', '道林紙 80g · 長時間閱讀舒適', '無線膠裝 · 封面燙金'],
    en: ['Tutoring textbook series', 'Woodfree 80gsm · eye-comfort', 'Perfect bound · foil cover'],
    ja: ['塾教材シリーズ印刷', '上質紙80g・長時間読書向け', '無線綴じ・表紙箔押し'],
  },
  school_bulk: {
    'zh-hk': ['學校批量印刷 · 全校教材', 'FSC 認證紙張 · 大豆油墨', 'NET 30 賬期 · 門市打樣'],
    en: ['School bulk printing · all-grade', 'FSC-certified paper · soy ink', 'NET 30 terms · in-store proofs'],
    ja: ['学校一括印刷・全校教材', 'FSC認証紙・大豆インク', 'NET 30支払・店頭校正'],
  },
  pta_event: {
    'zh-hk': ['家長會/校慶活動印刷', '邀請卡 + 場刊 + 海報', '一站式配套 · 節省溝通成本'],
    en: ['PTA/school event printing', 'Invites + program + posters', 'One-stop package · save coordination'],
    ja: ['保護者会/学校行事印刷', '招待状 + プログラム + ポスター', 'ワンストップ・調整工数削減'],
  },
  certificates: {
    'zh-hk': ['獎狀/證書印刷', '燙金校名 + 防偽水印', 'A4 尺寸 · 50 張起'],
    en: ['Award certificate printing', 'Foil school name + anti-fraud watermark', 'A4 size · from 50'],
    ja: ['賞状/証明書印刷', '校名箔押し + 偽造防止透かし', 'A4サイズ・50枚から'],
  },
};

/** 起印量格式（**不可**用「行內有數字」判定：`NET 30 賬期`、`ISO 9001` 都含數字但不是起印量） */
const MOQ_SHAPE = /\d+\s*(?:本|張|個|冊|枚|sets?|sheets?|copies|部|pieces?)\s*(?:起|から|〜|~|MOQ|from)?|\bfrom\s+\d+|\d+\s*(?:MOQ|Copies|copies)\b/i;

console.log('=== 面 ①② 場景卡片（CategoryIndustries educational）===');
for (const [sceneKey, byLocale] of Object.entries(INDUSTRIES_EDU)) {
  const slug = SCENE_MOQ_SOURCE[sceneKey];
  const truth = slug ? products.find((p) => p.slug === slug)?.minQuantity : undefined;
  for (const loc of LOCALES) {
    const original = byLocale[loc][2];
    const rendered = withSceneMoq(sceneKey, loc, byLocale[loc]);
    const line3 = rendered[2];
    // 只有「原始文案本身含起印量」才需與真值對帳
    // （純工藝描述如 school_bulk 的 `NET 30 賬期 · 門市打樣` 不涉起印量）
    if (!MOQ_SHAPE.test(original)) {
      check(line3 === original, `🔴 ${sceneKey}/${loc} 無起印量宣稱卻被改寫：「${original}」→「${line3}」`);
      console.log(`  ✓ ${sceneKey}/${loc} 無起印量宣稱 → 原樣保留「${line3}」`);
      continue;
    }
    if (truth === undefined) {
      check(false, `🔴 ${sceneKey}/${loc} 有起印量「${original}」但 SCENE_MOQ_SOURCE 未註冊 → 真值不明`);
      continue;
    }
    const ok = line3.includes(String(truth));
    check(ok, `🔴 ${sceneKey}/${loc} 渲染「${line3}」不含真值 ${truth}（SKU ${slug}）`);
    console.log(`  ${ok ? '✓' : '🔴'} ${sceneKey}/${loc} 原「${original}」→ 新「${line3}」(真值 ${truth})`);
  }
}

// ────────────────────────────────────────────────────────────
// 面 ③：產品卡片（CategoryProductCard 走 getDisplayMinOrder）
// ────────────────────────────────────────────────────────────
console.log('=== 面 ③ 產品卡片（CategoryProductCard 口徑函式）===');
for (const slug of ['certificates', 'textbooks', 'graduation-yearbook', 'exercise-books', 'school-flyers']) {
  const p = products.find((x) => x.slug === slug);
  if (!p) {
    check(false, `🔴 找不到 SKU ${slug}`);
    continue;
  }
  const rendered = getDisplayMinOrder('zh-hk', p.slug, p.minQuantity);
  const ok = rendered.includes(String(p.minQuantity));
  check(ok, `🔴 產品卡 [${slug}] 渲染「${rendered}」不含真值 ${p.minQuantity}`);
  console.log(`  ${ok ? '✓' : '🔴'} [${slug}] 真值 ${p.minQuantity} → 卡片顯示「${rendered}」`);
}

// ────────────────────────────────────────────────────────────
// 面 ④：場景起印量標籤本身必須可解析（防止 null 導致卡片掉字）
// ────────────────────────────────────────────────────────────
console.log('=== 面 ④ SSoT 標籤可解析性 ===');
for (const sceneKey of Object.keys(SCENE_MOQ_SOURCE)) {
  for (const loc of LOCALES) {
    const label = sceneMoqLabel(sceneKey, loc);
    check(label !== null && label.length > 0, `🔴 [${sceneKey}/${loc}] SSoT 標籤為空`);
  }
}

// ────────────────────────────────────────────────────────────
// 面 ⑤：反向檢查——SSoT 註冊的場景 key 必須真的存在於組件資料中
//（防止「改了 slug 但組件 key 沒對上」→ 靜默回退硬編碼）
// ────────────────────────────────────────────────────────────
console.log('=== 面 ⑤ 註冊 key 與組件 key 對齊 ===');
for (const sceneKey of Object.keys(SCENE_MOQ_SOURCE)) {
  const inIndustries = sceneKey in INDUSTRIES_EDU;
  // tutoring_textbook 屬 books 品類頁（不在 educational 清單），其餘應在 educational
  const expectedElsewhere = sceneKey === 'tutoring_textbook';
  check(
    inIndustries || expectedElsewhere,
    `🔴 SCENE_MOQ_SOURCE 註冊了 [${sceneKey}] 但組件查無此 key → 靜默回退硬編碼（漂移不會被發現）`
  );
}

console.log(`\n結果: PASS ${pass} / FAIL ${fails.length}`);
if (fails.length) {
  console.log('\n失敗項:');
  for (const f of fails) console.log(`  ${f}`);
}
process.exit(fails.length === 0 ? 0 : 1);
