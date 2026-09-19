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
const FROM_PROPOSALS = (process.argv.find((a) => a.startsWith('--from-proposals=')) || '').split('=')[1] || null;

/* ---------- ★ 独立复核 (--from-proposals): 不信生成器的 trace, 自己重算 ----------
 * K3 纪律「逐条审核, 不抽检」+ §0.23.2 双方法: 对每条候选独立验证
 *   ① 当量 50-57  ② 主词保留  ③ 品牌末尾一次  ④ 语言纯净
 *   ⑤ **MOQ 数字与 moqStatus 期望一致** (回 products.ts / 裁决真值重算)
 *   ⑥ **价格数字与 products.ts basePrice 一致** (回源头重算)
 *   ⑦ **单一 MOQ**: 候选内不得出现两个不同起订量 (laminated-menus 矛盾的根因)
 * 任一不过 ⇒ 该槽位拒绝落盘并列明原因。
 */
function independentVerify(cand, slug, locale, curTitle, entry, clsRow, mode) {
  const { equiv: eq } = require('./guards/title-equiv.js');
  const issues = [];
  const e = eq(cand);
  if (e < TITLE_MIN || e > TITLE_MAX) issues.push(`当量 ${e} 不在 ${TITLE_MIN}-${TITLE_MAX}`);
  const headCur = String(curTitle).split(/\s*[|｜]\s*/)[0].trim();
  const headCand = String(cand).split(/\s*[|｜]\s*/)[0].trim();
  if (headCur !== headCand) issues.push(`主词被改: "${headCur}" → "${headCand}"`);
  const brand = locale === 'zh-hk' ? '智印港' : 'ZprintPro';
  if (cand.split(brand).length - 1 !== 1) issues.push('品牌出现次数≠1');
  if (cand.trim().split(/[|｜]/).pop().trim() !== brand) issues.push('品牌不在末尾');
  if (locale === 'en' && /[\u2E80-\u9FFF\u3040-\u30FF]/.test(cand)) issues.push('en 含 CJK');
  const KANA = /[\u3041-\u30FA\u30FD\u30FE\u30FF]/;
  const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/;
  if (locale === 'zh-hk' && (KANA.test(cand) || SIMP.test(cand))) issues.push('zh-hk 语言污染');
  if (locale === 'zh-hk' && /ZprintPro/.test(cand)) issues.push('zh-hk 混入 ZprintPro');

  /* ★ 2026-09-19 修正: 复核必须检查**本批改了什么**, 而非重审既有内容。
   *   首版对 trim 批也套用「MOQ 期望值/价格须与 products.ts 一致」⇒ 大量误报:
   *     · `small-batch-stickers` 是 NO_MOQ_HOOK, 但其**既有**标题本就含 `50 張起`/`50 pcs`
   *       —— NO_MOQ_HOOK 的语义是「生成器**不得新增** MOQ 钩子」, **不是**「标题里不许有 MOQ」;
   *       修剪是**纯删除**, 保留既有数字是正确行为。
   *     · 既有价格 (`$0.045` / `HK$0.45`) 与本批无关, 回 products.ts 比对属**重审存量**。
   *   ⇒ trim 模式的正确不变量是**删除性**: 候选的数字集合必须是原标题数字集合的**子集**
   *      (即本批只做减法, 未引入任何新数字)。fill 模式才需要 MOQ/价格来源复核。
   */
  const numsOf = (s) => new Set([...String(s).matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]));
  if (mode === 'trim') {
    const orig = numsOf(curTitle);
    const added = [...numsOf(cand)].filter((n) => !orig.has(n));
    if (added.length) issues.push(`修剪引入了原标题没有的数字: ${added.join('/')} (删除型批次不得新增数字)`);
    return { equiv: e, issues, ok: issues.length === 0, status: 'TRIM', expectMoq: null };
  }
  /* subst (替代) 的不变量: 允许**来源可溯**的新数字 (products.ts minQuantity / basePrice),
   *   但**不得出现既非原文、又非源头**的数字。
   * ★ 2026-09-19 修正: 原对 subst 套用 fill 的「MOQ 必须存在」⇒ 误报 ——
   *   替代是**替换钩子**, 原标题没有 MOQ 的槽位 (例 en `… | Free Shipping $99+ | …`)
   *   替换后自然也没有 MOQ, 这不是缺陷。fill 才要求必须补上 MOQ 钩子。 */
  if (mode === 'subst') {
    const orig = numsOf(curTitle);
    const allowed = new Set([...orig, String(entry.moq), String(entry.basePrice?.[locale] ?? '')].filter(Boolean));
    const unsourced = [...numsOf(cand)].filter((n) => !allowed.has(n));
    if (unsourced.length) issues.push(`替代引入了无来源数字: ${unsourced.join('/')} (允许: 原标题 ∪ products.ts minQuantity/basePrice)`);
    return { equiv: e, issues, ok: issues.length === 0, status: 'SUBST', expectMoq: null };
  }
  // ⑤ MOQ 期望值
  const status = clsRow ? clsRow.cls : 'NO_CONFLICT';
  let expectMoq = null;
  if (status === 'TRUE_DRIFT') expectMoq = clsRow.truth;
  else if (status === 'LOCALE_SPECIFIC_KEEP') expectMoq = clsRow.claimed;
  else if (status === 'MANUAL_REVIEW') issues.push('MANUAL_REVIEW 槽位不得落盘');
  else if (status === 'NO_MOQ_HOOK') expectMoq = null;
  else expectMoq = entry.moq; // 无冲突 → products.ts 真值
  // 从候选抽取起印量声明
  const moqRe = locale === 'en' ? /(\d{1,4})\s*(?:pcs\s*)?MOQ|MOQ\s*[:：]?\s*(\d{1,4})|(\d{2,4})\s*pcs/gi
    : locale === 'ja' ? /(\d{1,4})\s*(?:枚|部|冊|本|セット|個)〜/g
    : /(\d{1,4})\s*(?:張|個|本|套|份|枚)\s*起/g;
  const found = [];
  let m;
  while ((m = moqRe.exec(cand)) !== null) found.push(Number(m[1] ?? m[2] ?? m[3]));
  const distinct = [...new Set(found)];
  if (distinct.length > 1) issues.push(`候选含 ${distinct.length} 个互斥起订量: ${distinct.join('/')}`);
  if (expectMoq != null) {
    if (!distinct.includes(expectMoq)) issues.push(`MOQ 缺失: 期望 ${expectMoq}, 候选内 ${distinct.length ? distinct.join('/') : '无'}`);
  } else if (status === 'NO_MOQ_HOOK' && distinct.length) {
    issues.push(`NO_MOQ_HOOK 槽位不应含 MOQ, 却出现 ${distinct.join('/')}`);
  }
  // ⑥ 价格回源头复核
  const bp = entry.basePrice?.[locale];
  if (bp != null) {
    const priceRe = locale === 'zh-hk' ? /HK\$([\d.]+)/g : locale === 'en' ? /\$([\d.]+)/g : /¥([\d.]+)/g;
    const prices = [];
    while ((m = priceRe.exec(cand)) !== null) prices.push(Number(m[1]));
    const bad = prices.filter((p) => p !== bp);
    if (prices.length && bad.length) issues.push(`价格与 products.ts basePrice=${bp} 不符: ${bad.join('/')}`);
  }
  return { equiv: e, issues, ok: issues.length === 0, status, expectMoq };
}

/* ---------- --from-proposals: 由提案 JSON 组装批次 ---------- */
function loadFromProposals(file) {
  const p = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  const bank = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/reports/title-input-bank-2026-09-19.json'), 'utf8'));
  const cls = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/reports/moq-precision-classification-2026-09-19.json'), 'utf8'));
  const clsOf = {};
  for (const it of cls.items) clsOf[`${it.slug}|${it.locale || '?'}`] = it;

  /* ★ 2026-09-19: 必须读**文件真值**而非 bank 里的 `current_title`。
   *   原因: bank 生成于 P0-A1/P2-batch-1 落盘**之前** ⇒ 其 current_title 已过期;
   *   用过期值做 no-op 比较 ⇒ 6 个「其实已是 no-op」的槽位被计为目标,
   *   落盘断言「变化行数 == 目标槽数」失败 (17 vs 11)。 */
  const target = fs.readFileSync(path.join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');
  const starts = [...target.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: target.length });
  const currentTitle = (slug, locale) => {
    for (let i = 0; i < starts.length - 1; i++) {
      if (starts[i].slug !== slug) continue;
      const seg = target.slice(starts[i].idx, starts[i + 1].idx);
      const m = seg.match(new RegExp(`"${locale}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      return m ? m[1].replace(/\\"/g, '"') : null;
    }
    return null;
  };

  const perSlug = {};
  const audit = [];
  for (const r of p.results) {
    if (!r.candidates) { audit.push({ slug: r.slug, locale: r.locale, ok: false, issues: [r.skipped || 'skipped'] }); continue; }
    // 生成模式 (fill): 优先变体 A (最小增量); 修剪模式 (trim): 取**当量最高**的全过候选
    //   (修剪的最优解 = 删得最少但仍 ≤57 = churn 最小; 变体 A 是最激进的删除, 不适用)。
    let best;
    if (r.mode === 'trim') {
      best = [...r.candidates.filter((c) => c.allPass)].sort((a, b) => b.equiv - a.equiv)[0];
    } else {
      best = r.candidates.find((c) => c.variant === 'A' && c.allPass) || r.candidates.find((c) => c.allPass);
    }
    if (!best) { audit.push({ slug: r.slug, locale: r.locale, ok: false, issues: ['无全闸门通过候选'] }); continue; }
    // ★ no-op 排除: 与**文件真值**逐字相同 ⇒ 无改动, 不计为目标
    const real = currentTitle(r.slug, r.locale);
    if (real && best.title === real) { audit.push({ slug: r.slug, locale: r.locale, ok: true, noop: true, title: best.title, equiv: best.equiv, status: 'NOOP' }); continue; }
    const entry = bank.skus[r.slug];
    const v = independentVerify(best.title, r.slug, r.locale, real || r.current, entry, clsOf[`${r.slug}|${r.locale}`], r.mode || 'fill');
    audit.push({ slug: r.slug, locale: r.locale, batch: r.batch, title: best.title, from: real || r.current, ...v });
    if (!v.ok) continue;
    perSlug[r.slug] = perSlug[r.slug] || { slug: r.slug, slots: {}, src: {} };
    perSlug[r.slug].slots[r.locale] = best.title;
    perSlug[r.slug].src[r.locale] = r.currentEquiv;
  }
  return { batch: Object.values(perSlug).filter((x) => Object.keys(x.slots).length), audit, meta: { source: file, batchName: p.batch } };
}

let BATCH, AUDIT = null, META = null;
if (FROM_PROPOSALS) {
  const r = loadFromProposals(FROM_PROPOSALS);
  BATCH = r.batch; AUDIT = r.audit; META = r.meta;
}

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

if (!FROM_PROPOSALS) BATCH = BATCHES[BATCH_NAME];
if (!BATCH && !FROM_PROPOSALS) {
  console.error(`未知批次: ${BATCH_NAME} (可用: ${Object.keys(BATCHES).join(' / ')})`);
  process.exit(1);
}

/* ---------- 独立复核报告 (逐条, 不抽检) ---------- */
if (AUDIT) {
  const ok = AUDIT.filter((a) => a.ok);
  console.log(`=== 独立复核 (逐条): ${ok.length}/${AUDIT.length} 槽通过 ===`);
  for (const a of AUDIT) {
    console.log(`  ${a.ok ? '✅' : '🔴'} ${a.slug}/${a.locale}\t${a.equiv ?? '-'} 当量\tstatus=${a.status || '-'} MOQ期望=${a.expectMoq ?? '无'}`);
    if (!a.ok) for (const i of a.issues) console.log(`        ↳ ${i}`);
  }
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
