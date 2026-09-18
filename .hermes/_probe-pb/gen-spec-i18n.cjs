'use strict';
/**
 * 生成器/校驗器: _spec-tr-*.json (作者手寫的三語譯文, 按 _spec-strings.json 位置索引)
 *   -> src/data/product-specs-i18n.ts (源頭映射, key = products.ts 原文)
 *
 * 三件套 (§12): ① 計數斷言 = dump 長度 ② 形狀斷言 (anchor 前綴必須逐條吻合, 譯文不得空, en 不得含 CJK)
 *               ③ 備份 (已存在檔案自動 .bak); 斷言未過 -> 不寫盤
 * 用法: node .hermes/_probe-pb/gen-spec-i18n.cjs          # 校驗 + 生成
 *       node .hermes/_probe-pb/gen-spec-i18n.cjs --check   # 只校驗不寫盤
 *
 * [Step 5] dump 由 238 條擴到 311 條: 第一段 1-238 = material/printMethod/finishing (Step 4, 索引不變);
 *          第二段 239-311 = size 全覆蓋 73 條 (_spec-tr-6.json)。
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'F:\\zprintpro-nextjs';
// 權威 dump = 真跑 products 陣列 (95 SKU / 285 欄位[三欄] + 95 size 欄位 / 311 唯一字串);
// 舊文字掃描 dump (_spec-strings.json, 223 條) 漏 5 個縮排更深的 SKU, 僅留作索引位移稽核
const DUMP = path.join(ROOT, '.hermes', '_probe-pb', '_spec-strings-full.json');
const TRS = [1, 2, 3, 4, 5, 6].map(n => path.join(ROOT, '.hermes', '_probe-pb', `_spec-tr-${n}.json`));
const OUT = path.join(ROOT, 'src', 'data', 'product-specs-i18n.ts');

const dump = JSON.parse(fs.readFileSync(DUMP, 'utf8'));
const tr = {};
for (const p of TRS) {
  if (!fs.existsSync(p)) continue;
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const [k, v] of Object.entries(j)) {
    if (k.startsWith('__')) continue;
    if (tr[k]) throw new Error('索引重複: ' + k);
    tr[k] = v;
  }
}

// ① 計數斷言
const expected = dump.length;
const got = Object.keys(tr).length;
let bad = 0;
if (got !== expected) {
  console.log(`❌ 計數斷言失敗: 譯文 ${got} 條, products.ts 唯一字串 ${expected} 條`);
  const missing = [];
  for (let i = 1; i <= expected; i++) if (!tr[String(i)]) missing.push(i);
  console.log('   缺索引: ' + (missing.join(',') || '(無)'));
  bad++;
}

// ② 形狀斷言: anchor 前綴逐條吻合 + 譯文非空 + en 無 CJK
const CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
const rows = [];
const mismatches = [];
for (let i = 1; i <= expected; i++) {
  const o = dump[i - 1];
  const t = tr[String(i)];
  if (!t) continue;
  const [en, ja, anchor] = t;
  if (!anchor || !o.v.startsWith(anchor)) {
    mismatches.push(`#${i} anchor 不符\n    原文: ${o.v}\n    anchor: ${anchor || '(空)'}`);
  }
  if (!en || !ja) mismatches.push(`#${i} 譯文為空: en=${JSON.stringify(en)} ja=${JSON.stringify(ja)}`);
  if (CJK.test(en)) mismatches.push(`#${i} en 含 CJK: ${en}`);
  rows.push({ i, key: o.v, field: o.field, en, ja });
}
// ②b 形狀斷言 (Step 5 新增): 欄名映射 4 條 + 各語系非空 + en 無 CJK + ja 不得是英文/零漢字假名
//    (欄名是短 UI 詞, 日文可為純漢字如「素材」「後加工」, 故不要求假名; 但必須含漢字或假名)
const KANA = /[\u3040-\u309F\u30A0-\u30FF]/;
const FIELD_LABELS = [
  ['material', '材質', 'Material', '素材'],
  ['size', '尺寸', 'Size', 'サイズ'],
  ['printMethod', '印刷方式', 'Print Method', '印刷方法'],
  ['finishing', '後加工', 'Finishing', '後加工'],
];
for (const [k, hk, en, ja] of FIELD_LABELS) {
  if (!hk || !en || !ja) mismatches.push(`欄名 ${k} 有空值: ${JSON.stringify([hk, en, ja])}`);
  if (CJK.test(en)) mismatches.push(`欄名 ${k} en 含 CJK: ${en}`);
  if (!CJK.test(ja) && !KANA.test(ja)) mismatches.push(`欄名 ${k} ja 必須含漢字或假名 (疑似漏譯英文): ${ja}`);
  if (ja === en) mismatches.push(`欄名 ${k} ja 與 en 同值 (漏譯): ${ja}`);
}
// ②c 形狀斷言 (Step 5 新增): size 欄覆蓋率 = size 唯一字串全在映射內
const sizeKeys = new Set(dump.filter(d => d.field === 'size').map(d => d.v));
const mappedKeys = new Set(rows.map(r => r.key));
const sizeMissing = [...sizeKeys].filter(v => !mappedKeys.has(v));
if (sizeMissing.length) {
  mismatches.push(`size 欄未覆蓋 ${sizeMissing.length} 條: ${sizeMissing.slice(0, 5).map(JSON.stringify).join(' | ')}`);
}
console.log(`size 欄唯一字串 ${sizeKeys.size} 條 / 映射覆蓋 ${sizeKeys.size - sizeMissing.length} 條`);
console.log(`欄名映射 ${FIELD_LABELS.length} 條 (material/size/printMethod/finishing) 形狀斷言完畢`);
if (mismatches.length) {
  console.log(`❌ 形狀斷言失敗 (${mismatches.length} 條):`);
  console.log(mismatches.slice(0, 40).join('\n'));
  if (mismatches.length > 40) console.log(`   ... 其餘 ${mismatches.length - 40} 條省略`);
  bad++;
  if (mismatches.some(m => m.includes('anchor'))) {
    console.log('\n提示: anchor 不符 = 索引對位錯誤。實際順序參考 .hermes/_probe-pb/_spec-numbered.tsv');
  }
}
if (bad) {
  console.log('\n⛔ 斷言未過 -> 不寫盤 (三件套硬約束)');
  process.exit(1);
}

const header = `/**
 * products.ts 規格四欄 (specs.material / specs.size / specs.printMethod / specs.finishing) 三語映射 — **源頭資料**
 *
 * 為什麼是這一份 (Step 4 方案 (a), K3 拍板):
 *   · products.ts 的 material / size / printMethod / finishing **保持中文單值 = 事實源**, 不改型別契約
 *     (不動 data layer schema; zh-hk 頁面輸出逐字不變 ⇒ 零 churn)。
 *   · 本檔以**原文為 key** 提供 zh-hk / en / ja 三語值, 渲染層查表; 查不到 -> fallback 中文原文 (不報錯/不留空)。
 *   · 與 src/components/ProductTabs.tsx 既有的 specsBySlug 分工不同, 故不併入:
 *     specsBySlug 是**按 slug/類目**的 16 條策展文案 (類目級, 粗粒度);
 *     本檔是**按規格值**的 ${rows.length} 條逐字映射 (products.ts 逐 SKU 事實源, 細粒度), 兩者 key 空間不同、不可互換。
 *   · zh-hk 值 = 原文逐字 (原文本身即繁體港式, 已用門童 #4 SIMP_ZH 字集實測 0 命中);
 *     en = 門店/海外印刷通用英文 (C1S art paper / 4-color offset / matte or gloss lamination / spot UV /
 *          foil stamping / rounded-corner die-cut / grey board / book paper);
 *     ja = 日文印刷術語 (コート紙 / 4色オフセット / マット・グロスラミネート / スポットUV / 箔押し /
 *          角丸型抜き / グレー板紙)。
 *   · 數字與尺寸一律照抄原文 (350g → 350g, 210×297mm → 210×297mm, 20–120mm 原樣), 未做任何單位換算;
 *     size 欄只譯自然語言詞 (標準/可客製/自訂…), 括號依目標語系慣例 (en 半角, ja 全角)。
 *
 * 生成: node .hermes/_probe-pb/gen-spec-i18n.cjs (源 = .hermes/_probe-pb/_spec-tr-*.json, 逐條 anchor 斷言);
 *       本檔為**資料源頭**, 請直接改譯文並重跑生成器, 不要手改渲染層的字面量。
 */
import type { Locale } from '@/lib/seo';

export interface SpecI18nValue {
  'zh-hk': string;
  en: string;
  ja: string;
}

/** key = products.ts 規格原文 (material / size / printMethod / finishing) */
export const SPEC_I18N: Record<string, SpecI18nValue> = {
`;

const body = rows.map(r => {
  return `  ${JSON.stringify(r.key)}: { 'zh-hk': ${JSON.stringify(r.key)}, en: ${JSON.stringify(r.en)}, ja: ${JSON.stringify(r.ja)} },`;
}).join('\n');

const footer = `
};

/**
 * 規格值本地化: 命中映射 -> 取該語系值; 未命中 -> **fallback 中文原文** (不報錯, 不留空)
 */
export function localizeSpecValue(value: string | null | undefined, locale: Locale | string): string {
  if (!value) return '';
  const hit = SPEC_I18N[value];
  if (!hit) return value;
  const localized = hit[locale as keyof SpecI18nValue];
  return localized || value;
}

/**
 * 規格物件整批本地化 (PDP 規格條目: { material, size, printMethod, finishing })
 * 只對有映射的欄位生效, 其餘欄位原樣返回 -> 不影響未覆蓋欄位
 */
export function localizeSpecs<T extends Record<string, string | undefined>>(
  specs: T | undefined | null,
  locale: Locale | string,
): Record<string, string> {
  if (!specs) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(specs)) {
    if (typeof v === 'string' && v) out[k] = localizeSpecValue(v, locale);
  }
  return out;
}

/**
 * PDP 規格條目的**欄名** (dt) 三語映射 — Step 5 (B2)
 *
 * 為什麼需要: v9 PDP 用 Object.keys(specs) 原文渲染 dt, 導致 **zh-hk 頁也顯示英文欄名**
 * (material / size / printMethod / finishing)。欄名是 UI 文案, 不是資料值, 必須本地化。
 * · zh-hk: 材質 / 尺寸 / 印刷方式 / 後加工 (港式印刷用語)
 * · en   : Material / Size / Print Method / Finishing
 * · ja   : 素材 / サイズ / 印刷方法 / 後加工
 * ⚠️ 已知站內不一致 (未在本批修): legacy ProductTabs.tsx 的同欄名為「加工工藝」/「加工」。
 *    若要全站統一, 改本表一行並重跑生成器即可 (改動會再動 zh-hk/ja 既有輸出, 需另行拍板)。
 */
export const SPEC_FIELD_LABELS: Record<string, SpecI18nValue> = {
${FIELD_LABELS.map(([k, hk, en, ja]) => `  ${k}: { 'zh-hk': ${JSON.stringify(hk)}, en: ${JSON.stringify(en)}, ja: ${JSON.stringify(ja)} },`).join('\n')}
};

/**
 * 規格欄名本地化: 命中映射 -> 取該語系值; 未命中 -> **fallback 原 key** (不報錯, 不留空)
 */
export function localizeSpecField(key: string, locale: Locale | string): string {
  const hit = SPEC_FIELD_LABELS[key];
  if (!hit) return key;
  return hit[locale as keyof SpecI18nValue] || key;
}
`;

const content = header + body + footer;
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  console.log(`✅ 斷言全過: ${rows.length} 條; --check 模式不寫盤; 與現存檔案${cur === content ? '一致 (冪等)' : '不一致 (需重跑生成器)'}`);
  process.exit(0);
}
if (fs.existsSync(OUT)) fs.writeFileSync(OUT + '.bak', fs.readFileSync(OUT));
fs.writeFileSync(OUT, content, 'utf8');
console.log(`✅ 斷言全過 -> 已寫 ${path.relative(ROOT, OUT)} (${rows.length} 條, ${Buffer.byteLength(content, 'utf8')} B)`);
