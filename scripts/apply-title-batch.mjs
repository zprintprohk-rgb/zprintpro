/**
 * apply-title-batch.mjs — 标题批次: 校验 + 安全落盘 (只改指定 title 槽)
 *
 * 规则 SSoT: docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 9/13 终裁 目标区 50-58)
 * 当量 SSoT: scripts/guards/title-equiv.js (TITLE_MIN=50 / TITLE_MAX=58)
 * 数字钩子来源: src/data/products.ts 的 minQuantity / basePrice / price_range (禁编造, §0.23)
 *
 * 为什么直接改 src/data/sku-seo-data.ts 而不是走 CSV→生成器 (SOP-5 例外, 有据):
 *   scripts/check-sku-csv-sync.mjs 实测: 源头 CSV 仍停留 75 SKU 旧模板,
 *   与派生 TS 漂移 216/297 (72.7%), 且 CSV 缺 25 个 SKU。
 *   直接跑 scripts/csv-to-sku-seo.mjs 会 (a) 回退 216 个线上标题 (b) 删掉 24 个 SKU
 *   (c) 用 ZH 关键词列覆盖 en/ja keywords。⇒ 采「外科式槽位替换」; CSV 反向同步列为待办。
 *
 * 批次:
 *   p0       — business-envelopes + large-envelopes 补齐 (35/44/48 → 50-58), 已落 commit 9a1a2a07
 *   a2-trim  — a2-posters 三语超限修剪 (65/62/63 → 50-58), K3 2026-09-19 决策「立即修剪」
 *
 * 用法:
 *   node scripts/apply-title-batch.mjs --batch=a2-trim           # dry-run (默认)
 *   node scripts/apply-title-batch.mjs --batch=a2-trim --apply
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const TARGET = 'src/data/sku-seo-data.ts';
const APPLY = process.argv.includes('--apply');
const BATCH_NAME = (process.argv.find((a) => a.startsWith('--batch=')) || '--batch=p0').split('=')[1];

const BATCHES = {
  p0: [
    {
      slug: 'business-envelopes',
      slots: {
        'zh-hk': '公司信封 | DL/C5/C4 開窗全封 100個起 HK$0.22起 | 智印港',
        ja: '会社封筒 | DL/C5/C4 窓付き・自黏封口 100枚〜 | ZprintPro',
      },
      src: { 'zh-hk': 35, ja: 44, note: 'specs: DL/C5/C4, 開窗貼片; MOQ 100, HK$0.22 起 (products.ts)' },
    },
    {
      slug: 'large-envelopes',
      slots: {
        'zh-hk': '大號信封 | C4 229×324mm 平放A4 100個起 HK$0.60起 | 智印港',
        en: 'Large Envelopes C4 | Fits A4 Flat | 100 MOQ | ZprintPro',
        ja: '大型封筒 | C4 229×324mm A4対応 100枚〜 | ZprintPro',
      },
      src: { 'zh-hk': 35, en: 48, ja: 44, note: 'specs: C4 229×324mm, 可平放 A4; MOQ 100, HK$0.60 起' },
    },
  ],

  /* ---------- a2-trim: 超限修剪 ----------
   * 最高流量产品页 (zh-hk 980 展示 / 17 点击 / CTR 1.73% / pos 16.13)。
   * 修剪原则 (§7 红线):
   *   ① 主词一字不改 (A2 海報印刷 / A2 Poster Printing / A2 ポスター印刷)
   *   ② **不新增任何数字** —— 只删冗余填充, 原有数字钩子原样保留, 防 §0.23 编造
   *   ③ zh-hk 唯一新增项 = 420×594mm (products.ts specs.size 实证: 'A2 420×594mm（可改比例）')
   * 三语同修: 三语皆 >58 超标, 只修 zh-hk 会留下同 SKU 内部不一致。
   */
  'a2-trim': [
    {
      slug: 'a2-posters',
      slots: {
        // 原 65: 删冗余「印海報一張小訂單適用」(21 当量, 纯填充) + 补尺寸实证 420×594mm → 54
        'zh-hk': 'A2 海報印刷 420×594mm 1張起印 HK$9起 即日交貨 | 智印港',
        // 原 62: 删「from」, 价格钩 $2.30 保留 (products.ts basePrice_en=2.3) → 57
        en: 'A2 Poster Printing $2.30 | Free Shipping $99+ | ZprintPro',
        // 原 63: 删「・防水」(A2 海報核心卖点非防水, PP 裱貼仅为可选项) → 57
        ja: 'A2 ポスター印刷｜¥300〜・1枚から・無料デザイン｜ZprintPro',
      },
      src: { 'zh-hk': 65, en: 62, ja: 63, note: 'products.ts: basePrice_en 2.3 / basePrice_ja 300 / specs.size A2 420×594mm' },
    },
  ],
  'a2-moq-align': [
    {
      slug: 'a2-posters',
      slots: {
        // K3 2026-09-19 19:43 (commit c18107a0) 裁決: a2-posters 真值 minQuantity 100→10,
        // 「全站文案 10張起印」為對齊真值。a2-trim 保留了舊文案「1張起印」⇒ 與新裁決矛盾, 必須對齊。
        // 55 当量 (1張起印 7 → 10張起印 8, 54→55)
        'zh-hk': 'A2 海報印刷 420×594mm 10張起印 HK$9起 即日交貨 | 智印港',
        // ja 同步 (1枚から 7 → 10枚〜 6, 57→56)
        ja: 'A2 ポスター印刷｜¥300〜・10枚〜・無料デザイン｜ZprintPro',
      },
      src: { 'zh-hk': 54, ja: 57, note: 'K3 c18107a0: a2-posters minQuantity=10 (真值), 文案须对齐 10; en 标题无 MOQ 钩不受影响' },
    },
  ],
};

const BATCH = BATCHES[BATCH_NAME];
if (!BATCH) {
  console.error(`未知批次: ${BATCH_NAME} (可用: ${Object.keys(BATCHES).join(' / ')})`);
  process.exit(1);
}

/* ---------- ★ 前置闸门: 复查 24h 内是否有新 K3 裁决影响数字口径 ----------
 * 事故背书 (2026-09-19): a2-trim 于 19:35 修剪时**原样保留**旧文案「1張起印」,
 * 而 K3 已于 19:43 (commit c18107a0) 裁定 a2-posters 真值 minQuantity=10 /
 * 「全站文案 10張起印」。若不复查 log, 该错值会随 commit 写入线上。
 * 纪律: 「不动数字」只在**没有新裁决**时安全 ⇒ 本闸门把该纪律变成可执行检查。
 */
function checkRecentRulings() {
  const { execSync } = require('node:child_process');
  try {
    const out = execSync(
      'git log --since="24 hours ago" --pretty=format:"%h|%ad|%s" --date=format:"%H:%M" -- src/data/products.ts docs .hermes/regression-guard/error-patterns.md',
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    if (!out) return [];
    return out.split('\n').filter((l) => /裁決|裁决|真值|minQuantity|MOQ|口径|口徑|title/i.test(l));
  } catch { return []; }
}

const rulings = checkRecentRulings();
if (rulings.length) {
  console.log('\n⚠️  前置闸门: 过去 24h 有涉及「真值/口径/裁決/title」的提交 — 本批数字钩子须逐项对照:');
  for (const l of rulings) console.log(`     ${l}`);
  console.log('   → 若本批保留的任何数字与上述裁决冲突, **先改再提交** (a2 「1張起印」教训)。\n');
} else {
  console.log('\n✅ 前置闸门: 过去 24h 无新 K3 真值/口径裁决 (数字钩子无冲突风险)\n');
}


/* ---------- 校验 ---------- */
const errors = [];
const rows = [];
for (const item of BATCH) {
  for (const [locale, title] of Object.entries(item.slots)) {
    const e = equiv(title);
    const brand = locale === 'zh-hk' ? '智印港' : 'ZprintPro';
    const brandCount = title.split(brand).length - 1;
    // 品牌末尾判定: 兼容 ASCII `|` 与全角 `｜` (站点两种分隔符并存, 实测 ja 多用 ｜)
    const atEnd = title.trim().split(/[|｜]/).pop().trim() === brand;
    const doubleBrand = locale === 'zh-hk' && /ZprintPro/.test(title);
    const simp = locale !== 'en' && /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/.test(title);
    const ok = e >= TITLE_MIN && e <= TITLE_MAX && brandCount === 1 && atEnd && !doubleBrand && !simp;
    if (!ok) errors.push(`${item.slug}/${locale}: equiv=${e} brand=${brandCount} end=${atEnd} dbl=${doubleBrand} simp=${simp}`);
    rows.push({ slug: item.slug, locale, was: item.src[locale], to: title, equiv: e, ok });
  }
}

console.log(`=== 批次 [${BATCH_NAME}] 校验 (${rows.length} 槽, 目标 ${TITLE_MIN}-${TITLE_MAX}) ===`);
for (const r of rows) console.log(`  ${r.ok ? '✅' : '🔴'} ${r.slug}\t${r.locale}\t${r.was}→${r.equiv}\t${r.to}`);
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
    const blockRe = new RegExp(`("${locale}": \\{\\s*"title": ")((?:[^"\\\\]|\\\\.)*)(")`, 's');
    const bm = seg.match(blockRe);
    if (!bm) { console.error(`🔴 找不到 title 槽: ${item.slug}/${locale}`); process.exit(1); }
    const oldTitle = bm[2].replace(/\\"/g, '"');
    const newEsc = title.replace(/"/g, '\\"');
    // ★ 必须用 replacer 函数, 不能用 "$1...$3" 替换串:
    //   标题内的 `$2.30` / `$99+` 会被 String.replace 当成**捕获组反向引用** ($2 = 旧标题),
    //   实测把 en 标题写坏成 "A2 Poster Printing A2 Poster Printing from $2.30 | ...ZprintPro.30 | ..."。
    //   (2026-09-19 踩坑: 首次 --apply 即为该 bug, 靠 §0.25.10.3 逐行 diff 核对发现并回滚。)
    seg = seg.replace(blockRe, (_m, p1, _p2, p3) => p1 + newEsc + p3);
    changed.push({ slug: item.slug, locale, oldTitle, newTitle: title });
  }
  text = text.slice(0, segStart) + seg + text.slice(segEnd);
}

console.log('\n=== 变更 (仅以下槽位) ===');
for (const c of changed) console.log(`  ${c.slug}/${c.locale}\n    - ${c.oldTitle}\n    + ${c.newTitle}`);

const origLines = orig.split('\n');
const newLines = text.split('\n');
if (origLines.length !== newLines.length) {
  console.error(`🔴 行数变化 ${origLines.length} → ${newLines.length} (应保持不变)`);
  process.exit(1);
}
const diffLines = origLines.map((l, i) => (l !== newLines[i] ? i + 1 : null)).filter(Boolean);
console.log(`\n变化行数: ${diffLines.length} (期望 ${changed.length}) @ L${diffLines.join(', L')}`);
if (diffLines.length !== changed.length) { console.error('🔴 变化行数 != 目标槽数, 中止'); process.exit(1); }

/* ---------- 落盘 ---------- */
const outDir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `title-batch-${BATCH_NAME}-2026-09-19.json`), JSON.stringify({ batch: BATCH, changed, rows }, null, 1));

if (!APPLY) {
  console.log('\n[dry-run] 未落盘。加 --apply 执行。');
} else {
  const bakDir = path.join(ROOT, `.hermes/_bak-title-batch-${BATCH_NAME}-20260919`);
  fs.mkdirSync(bakDir, { recursive: true });
  fs.copyFileSync(file, path.join(bakDir, 'sku-seo-data.ts'));
  fs.writeFileSync(file, text, 'utf8');

  // ★ 落盘后断言: 每个新 title 必须**逐字**出现在文件中 (防 $ 反向引用/转义类写坏)
  const after = fs.readFileSync(file, 'utf8');
  const bad = changed.filter((c) => !after.includes(c.newTitle.replace(/"/g, '\\"')));
  if (bad.length) {
    console.error(`\n🔴 落盘断言失败 (文件未含预期 title), 已回滚:`);
    for (const b of bad) console.error(`   ${b.slug}/${b.locale}: ${b.newTitle}`);
    fs.copyFileSync(path.join(bakDir, 'sku-seo-data.ts'), file);
    process.exit(1);
  }
  console.log(`\n✅ 已落盘 ${TARGET} (备份: .hermes/_bak-title-batch-${BATCH_NAME}-20260919/sku-seo-data.ts)`);
  console.log(`✅ 落盘断言通过: ${changed.length}/${changed.length} 个新 title 逐字命中`);
}
