/**
 * gen-p0-title-batch.mjs — P0 标题批次: 校验 + 安全落盘 (只改指定 title 槽)
 *
 * 规则 SSoT: docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 9/13 终裁 目标区 50-58)
 * 当量 SSoT: scripts/guards/title-equiv.js (TITLE_MIN=50 / TITLE_MAX=58)
 * 数字钩子来源: src/data/products.ts 的 minQuantity / basePrice / price_range (禁编造, §0.23)
 *
 * 为什么直接改 src/data/sku-seo-data.ts 而不是走 CSV→生成器 (SOP-5 例外, 有据):
 *   scripts/check-sku-csv-sync.mjs 实测: 源头 CSV 仍停留 75 SKU 旧模板,
 *   与派生 TS 漂移 216/297 (72.7%), 且 CSV 缺 25 个 SKU。
 *   直接跑 scripts/csv-to-sku-seo.mjs 会 (a) 回退 216 个线上标题 (b) 删掉 24 个 SKU
 *   (c) 用 ZH 关键词列覆盖 en/ja keywords (生成器 col('SEO关键') 三语同索引 bug)。
 *   ⇒ 本批采「外科式槽位替换」; CSV 反向同步 + 生成器加固列为待办。
 *
 * 用法:
 *   node scripts/gen-p0-title-batch.mjs            # 只校验 + 打印 diff (dry-run, 默认)
 *   node scripts/gen-p0-title-batch.mjs --apply    # 落盘 (先备份, 再断言只有目标行改变)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const TARGET = 'src/data/sku-seo-data.ts';
const APPLY = process.argv.includes('--apply');

/* ---------- 批次定义 ----------
 * 只改「违规槽位」; 已达标的槽位不动 (防 churn, per v4 §5.1 冻结纪律精神)。
 * 每页用自身 specs 差异化 (消除同簇同质化: 原 4 个信封 SKU 共用「雙面印刷 多規格」)。
 * ★ 纪律: **保留既有主词** (公司信封/大號信封/Large Envelopes/会社封筒/大型封筒 一字不改),
 *   只在后缀补 规格修饰 + 数字钩子 —— 主词即现排名承接词, 换词 = churn 风险 (§7 红线)。
 */
const BATCH = [
  {
    slug: 'business-envelopes',
    slots: {
      // 原 35 (FILL): 公司信封 | 雙面印刷 多規格 | 智印港
      'zh-hk': '公司信封 | DL/C5/C4 開窗全封 100個起 HK$0.22起 | 智印港',
      // ja 原 44 (FILL): 会社封筒 | 両面印刷 マルチサイズ | ZprintPro
      // 会社封筒(8) + DL/C5/C4(8) + 窓付き(6) + 自黏封口(8, specs.finishing) + 100枚〜(7) = 56
      ja: '会社封筒 | DL/C5/C4 窓付き・自黏封口 100枚〜 | ZprintPro',
      // en 原 51 (已达标) — 不动
    },
    src: { 'zh-hk': 35, ja: 44, note: 'specs: DL/C5/C4, 開窗貼片, 80–120g 書紙; MOQ 100, HK$0.22 起 (products.ts)' },
  },
  {
    slug: 'large-envelopes',
    slots: {
      // 原 35 (FILL)
      'zh-hk': '大號信封 | C4 229×324mm 平放A4 100個起 HK$0.60起 | 智印港',
      // 原 48 (FILL)
      en: 'Large Envelopes C4 | Fits A4 Flat | 100 MOQ | ZprintPro',
      // 原 44 (FILL)
      ja: '大型封筒 | C4 229×324mm A4対応 100枚〜 | ZprintPro',
    },
    src: { 'zh-hk': 35, en: 48, ja: 44, note: 'specs: C4 229×324mm, 可平放 A4; MOQ 100, HK$0.60 起 (products.ts)' },
  },
];

/* ---------- 校验 ---------- */
const errors = [];
const rows = [];
for (const item of BATCH) {
  for (const [locale, title] of Object.entries(item.slots)) {
    const e = equiv(title);
    const brand = locale === 'zh-hk' ? '智印港' : 'ZprintPro';
    const brandCount = title.split(brand).length - 1;
    const atEnd = title.trim().split('|').pop().trim() === brand;
    const doubleBrand = locale === 'zh-hk' && /ZprintPro/.test(title);
    const simp = locale !== 'en' && /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/.test(title);
    const ok = e >= TITLE_MIN && e <= TITLE_MAX && brandCount === 1 && atEnd && !doubleBrand && !simp;
    if (!ok) {
      errors.push(`${item.slug}/${locale}: equiv=${e} brand=${brandCount} end=${atEnd} dbl=${doubleBrand} simp=${simp}`);
    }
    rows.push({ slug: item.slug, locale, from: item.src[locale], to: title, equiv: e, was: item.src[locale], delta: e - (item.src[locale] || 0), ok });
  }
}

console.log(`=== P0 批次校验 (${rows.length} 槽, 目标 ${TITLE_MIN}-${TITLE_MAX}) ===`);
for (const r of rows) console.log(`  ${r.ok ? '✅' : '🔴'} ${r.slug}\t${r.locale}\t${r.from}→${r.equiv}\t${r.to}`);
if (errors.length) {
  console.error('\n🔴 校验失败:\n' + errors.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log('\n全部通过 ✅');

/* ---------- dry-run diff ---------- */
const file = path.join(ROOT, TARGET);
let text = fs.readFileSync(file, 'utf8');
const orig = text;
const changed = [];

for (const item of BATCH) {
  // 定位该 SKU 段 (顶层键, 0 或 2 空格缩进)
  const re = new RegExp(`^(?: {2})?"${item.slug}": \\{`, 'm');
  const m = re.exec(text);
  if (!m) { console.error(`🔴 找不到 SKU 段: ${item.slug}`); process.exit(1); }
  const segStart = m.index;
  const nextRe = /^(?: {2})?"[a-z0-9-]+": \{/gm;
  nextRe.lastIndex = segStart + m[0].length;
  const nxt = nextRe.exec(text);
  const segEnd = nxt ? nxt.index : text.length;
  let seg = text.slice(segStart, segEnd);

  for (const [locale, title] of Object.entries(item.slots)) {
    // 该 locale 块内的 title 行
    const blockRe = new RegExp(`("${locale}": \\{\\s*"title": ")((?:[^"\\\\]|\\\\.)*)(")`, 's');
    const bm = seg.match(blockRe);
    if (!bm) { console.error(`🔴 找不到 title 槽: ${item.slug}/${locale}`); process.exit(1); }
    const oldTitle = bm[2].replace(/\\"/g, '"');
    const newEsc = title.replace(/"/g, '\\"');
    seg = seg.replace(blockRe, `$1${newEsc}$3`);
    changed.push({ slug: item.slug, locale, oldTitle, newTitle: title });
  }
  text = text.slice(0, segStart) + seg + text.slice(segEnd);
}

console.log('\n=== 变更 (仅以下槽位) ===');
for (const c of changed) console.log(`  ${c.slug}/${c.locale}\n    - ${c.oldTitle}\n    + ${c.newTitle}`);

// 断言: 除目标槽外无其他行变化
const origLines = orig.split('\n');
const newLines = text.split('\n');
if (origLines.length !== newLines.length) {
  console.error(`🔴 行数变化 ${origLines.length} → ${newLines.length} (应保持不变)`);
  process.exit(1);
}
const diffLines = origLines.map((l, i) => (l !== newLines[i] ? i + 1 : null)).filter(Boolean);
console.log(`\n变化行数: ${diffLines.length} (期望 ${changed.length}) @ L${diffLines.join(', L')}`);
if (diffLines.length !== changed.length) {
  console.error('🔴 变化行数 != 目标槽数, 中止');
  process.exit(1);
}

/* ---------- 落盘 ---------- */
const outDir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'p0-title-batch-2026-09-19.json'), JSON.stringify({ batch: BATCH, changed, rows }, null, 1));

if (!APPLY) {
  console.log('\n[dry-run] 未落盘。加 --apply 执行。');
} else {
  const bakDir = path.join(ROOT, '.hermes/_bak-p0-title-20260919');
  fs.mkdirSync(bakDir, { recursive: true });
  fs.copyFileSync(file, path.join(bakDir, 'sku-seo-data.ts'));
  fs.writeFileSync(file, text, 'utf8');
  console.log(`\n✅ 已落盘 ${TARGET} (备份: .hermes/_bak-p0-title-20260919/sku-seo-data.ts)`);
}
