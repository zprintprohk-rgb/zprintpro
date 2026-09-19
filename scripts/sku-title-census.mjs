/**
 * sku-title-census.mjs — SKU 标题全量普查 (只读) + GSC 28d 交叉
 *
 * 口径 SSoT:
 *   - scripts/guards/title-equiv.js  (半角当量 / TITLE_MIN=50 / TITLE_MAX=58)
 *   - docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 9/13 终裁 目标区 50-58)
 *   - docs/2026-09-09-k3-title-rule-v4-write-full.md §一 (v4 50-54, 已被 9/13 取代)
 *
 * 双方法复算 (§0.23.2): methodA = guards/title-equiv.js (regex 逐字), methodB = 数值区间逐码点,
 * 另计 UTF-16 length / 码点数, 三者不一致即报 MISMATCH。
 *
 * 数据来源 (§0.23):
 *   - src/data/sku-seo-data.ts        活 title 主源
 *   - src/data/products.ts            slug → category_slug / 名称
 *   - .hermes/gsc-2026-09-18/extract.json  GSC 28d 页面级 (combo / hk / jp / us)
 *
 * 用法:
 *   node scripts/sku-title-census.mjs            # 打印摘要 + 落盘报告
 *   node scripts/sku-title-census.mjs --stdout   # 只打印, 不落盘
 *
 * 性质: 只读审计, 不改任何 src; 报告落 .hermes/reports/ (新增文件, 不覆盖既有审计)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const TODAY = '2026-09-19';
const LOCALES = ['zh-hk', 'en', 'ja'];

/* ---------- 双方法复算 (§0.23.2) ---------- */
// methodB: 数值区间逐码点 (与 guard 的 regex 实现路径独立)
const WIDE = (cp) =>
  (cp >= 0x2e80 && cp <= 0x9fff) ||
  (cp >= 0xf900 && cp <= 0xfaff) ||
  (cp >= 0xff01 && cp <= 0xff60) ||
  (cp >= 0x3000 && cp <= 0x303f);
function equivNum(s) {
  if (!s) return 0;
  let n = 0;
  for (const ch of String(s)) n += WIDE(ch.codePointAt(0)) ? 2 : 1;
  return n;
}

/* ---------- 解析 sku-seo-data.ts ---------- */
function parseSkuSeo() {
  const txt = read('src/data/sku-seo-data.ts');
  // ★ 2026-09-19 修正: 原正则 /^  "slug": \{/ 硬要求 2 空格缩进,
  //   漏掉 "fruit-food-label-stickers" (L3086, 写在 0 缩进) ⇒ 99 SKU (应为 100)。
  //   教训 (§0.23.2): 单方法计数失误。现只接受 0 或 2 空格缩进 = skuSeoData 顶层键,
  //   以排除 4 空格缩进的 "name"/"seo"/"imageAlt" 子块。
  const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const out = [];
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    // 防误收: 真 SKU 段必须含 "seo" 块
    if (!seg.includes('"seo"')) continue;
    for (const loc of LOCALES) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      out.push({
        slug: starts[i].slug,
        locale: loc,
        title: m ? m[1].replace(/\\"/g, '"') : null,
        present: !!m,
      });
    }
  }
  return out;
}

/* ---------- rarity: products.ts slug → category ---------- */
function parseProducts() {
  const txt = read('src/data/products.ts');
  const map = {};
  const re = /slug: '([a-z0-9-]+)',[\s\S]{0,400}?category_slug: '([a-z0-9-]+)'/g;
  let m;
  while ((m = re.exec(txt)) !== null) map[m[1]] = m[2];
  return map;
}

/* ---------- GSC 页面级 28d ---------- */
function loadGsc() {
  const g = JSON.parse(read('.hermes/gsc-2026-09-18/extract.json'));
  const bags = g?.new || {};
  const pick = (key) => {
    const rows = bags[key]?.['网页'];
    if (!Array.isArray(rows)) return null;
    const m = new Map();
    for (const r of rows) {
      const u = r['排名靠前的网页'];
      if (!u) continue;
      m.set(u.replace(/\/$/, ''), {
        clicks: r['点击次数'] ?? 0,
        imps: r['展示'] ?? 0,
        ctr: r['点击率'] ?? 0,
        pos: r['排名'] ?? null,
      });
    }
    return m;
  };
  return {
    combo: pick('combo_28d'),
    'zh-hk': pick('hk_28d'),
    en: pick('us_28d') || pick('en_28d'),
    ja: pick('jp_28d'),
  };
}
const gscKey = (locale, slug) => `https://zprintpro.com/${locale}/product/${slug}`;

/* ---------- 分类 + 标注 ---------- */
const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/;
const BRAND_OK = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };

function annotate(row) {
  const t = row.title || '';
  const e = equiv(t);
  const eB = equivNum(t);
  row.equiv = e;
  row.equivB = eB;
  row.recount = e === eB ? 'AGREE' : 'MISMATCH';
  row.utf16 = t.length;
  row.codepoints = [...t].length;

  // 现行规则 (K3 9/13): 50-58
  row.band = band(t); // OK / FILL / TRIM
  // v4 旧规则 (已被取代, 仅作对照): 目标 50-54, >=55 满格
  row.bandV4 = e < 50 ? 'FILL' : e <= 54 ? 'OK' : e <= 60 ? 'LEGACY' : 'RED';

  const brand = BRAND_OK[row.locale];
  row.brandCount = t.split(brand).length - 1;
  row.brandAtEnd = t.trim().split('|').pop().trim() === brand;
  row.hasBrand = row.brandCount >= 1;

  const issues = [];
  if (!t) issues.push('MISSING');
  if (row.locale === 'zh-hk') {
    if (/智印云|智印印港/.test(t)) issues.push('禁用品牌');
    if (/[A-Za-z]/.test(t) && /ZprintPro/.test(t)) issues.push('双品牌(zh-hk 含 ZprintPro)');
    if (row.brandCount !== 1) issues.push(`品牌次数=${row.brandCount}`);
    if (!row.brandAtEnd) issues.push('品牌不在末尾');
    if (/[\u3040-\u30FF]/.test(t)) issues.push('日文假名污染');
    if (SIMP.test(t)) issues.push('简体字形污染');
  } else {
    if (row.brandCount !== 1) issues.push(`品牌次数=${row.brandCount}`);
    if (!row.brandAtEnd) issues.push('品牌不在末尾');
    if (row.locale === 'en' && /[\u2E80-\u9FFF\u3040-\u30FF]/.test(t)) issues.push('CJK 污染(P0)');
    if (row.locale === 'ja' && SIMP.test(t)) issues.push('简体污染');
  }
  if (/品質保證|香港印刷專家|日本向け高品質印刷/.test(t)) issues.push('无效填充词');
  row.issues = issues;
  return row;
}

/* ---------- 主 ---------- */
const skuSeo = parseSkuSeo();
const catOf = parseProducts();
const gsc = loadGsc();

const rows = skuSeo.map((r) => {
  const a = annotate(r);
  const u = gscKey(r.locale, r.slug);
  a.category = catOf[r.slug] || '';
  const mkt = gsc[r.locale]?.get(u) || null;
  const all = gsc.combo?.get(u) || null;
  a.gsc = all || mkt;
  a.gscMarket = mkt;
  return a;
});

const withG = rows.filter((r) => r.gsc);
const byBand = rows.reduce((m, r) => ((m[r.band] = (m[r.band] || 0) + 1), m), {});
const byBandV4 = rows.reduce((m, r) => ((m[r.bandV4] = (m[r.bandV4] || 0) + 1), m), {});
const mismatches = rows.filter((r) => r.recount === 'MISMATCH');
const missing = rows.filter((r) => !r.present);
const issueRows = rows.filter((r) => r.issues.length);

// 与 v4 旧规则的差异 = 本次规则变更口径的实际影响面
const ruleDelta = rows.filter((r) => r.band === 'OK' && r.bandV4 !== 'OK');

const sortByImp = (a, b) => (b.gsc?.imps || 0) - (a.gsc?.imps || 0);
const listUnder = rows.filter((r) => r.band === 'FILL').sort(sortByImp);
const listOver = rows.filter((r) => r.band === 'TRIM').sort(sortByImp);

const summary = {
  generatedFor: TODAY,
  ruleSSoT: 'docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 9/13 终裁 目标区 50-58)',
  equivSSoT: 'scripts/guards/title-equiv.js',
  TITLE_MIN,
  TITLE_MAX,
  skuCount: new Set(rows.map((r) => r.slug)).size,
  slotCount: rows.length,
  slotsPresent: rows.filter((r) => r.present).length,
  slotsMissing: missing.length,
  byBand,
  byBandV4,
  recountMismatch: mismatches.length,
  ruleDeltaOkOnlyUnderNewRule: ruleDelta.length,
  withGscRows: withG.length,
  issueSlots: issueRows.length,
};

/* ---------- 报告 ---------- */
const md = [];
md.push(`# SKU 标题全量普查 (${TODAY})`);
md.push('');
md.push(`> 性质: **只读审计**。口径 SSoT = \`scripts/guards/title-equiv.js\` (半角当量, MIN=${TITLE_MIN} / MAX=${TITLE_MAX})`);
md.push(`> 规则 SSoT = \`docs/2026-09-13-title-batch-T-freeze.md\` §6-3 (K3 9/13 终裁 目标区 **50-58 半角当量**, 取代 v4 的 50-54)`);
md.push('');
md.push('## 数据来源 (§0.23)');
md.push(`校准日期: ${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`);
md.push('- `src/data/sku-seo-data.ts` — 活 title 主源 (SKU × 3 locale)');
md.push('- `src/data/products.ts` — slug → category_slug');
md.push('- `.hermes/gsc-2026-09-18/extract.json` — GSC 28d 页面级 (窗口 2026-08-19~09-15, FRESH)');
md.push('- 复算方法: methodA `title-equiv.js` (regex) vs methodB 数值逐码点 (§0.23.2)');
md.push('');
md.push('## 汇总');
md.push('```json');
md.push(JSON.stringify(summary, null, 1));
md.push('```');
md.push('');
md.push(`## A. 不足清单 (<${TITLE_MIN} 半角当量, 按 GSC 展示降序)`);
md.push('');
md.push('| SKU slug | locale | 当量 | GSC展示28d | GSC位置 | CTR | 类别 | title |');
md.push('|---|---|---|---|---|---|---|---|');
for (const r of listUnder) {
  md.push(`| ${r.slug} | ${r.locale} | ${r.equiv} | ${r.gsc?.imps ?? '-'} | ${r.gsc?.pos != null ? r.gsc.pos.toFixed(2) : '-'} | ${r.gsc ? (r.gsc.ctr * 100).toFixed(2) + '%' : '-'} | ${r.category || '-'} | ${(r.title || '').slice(0, 70)} |`);
}
md.push('');
md.push(`## B. 超标清单 (>${TITLE_MAX} 半角当量, 按 GSC 展示降序)`);
md.push('');
md.push('| SKU slug | locale | 当量 | GSC展示28d | GSC位置 | CTR | 类别 | title |');
md.push('|---|---|---|---|---|---|---|---|');
for (const r of listOver) {
  md.push(`| ${r.slug} | ${r.locale} | ${r.equiv} | ${r.gsc?.imps ?? '-'} | ${r.gsc?.pos != null ? r.gsc.pos.toFixed(2) : '-'} | ${r.gsc ? (r.gsc.ctr * 100).toFixed(2) + '%' : '-'} | ${r.category || '-'} | ${(r.title || '').slice(0, 70)} |`);
}
md.push('');
md.push('## C. 品牌 / 污染 / 填充词问题槽位');
md.push('');
md.push('| SKU slug | locale | 当量 | 问题 | title |');
md.push('|---|---|---|---|---|');
for (const r of issueRows) md.push(`| ${r.slug} | ${r.locale} | ${r.equiv} | ${r.issues.join('; ')} | ${(r.title || '').slice(0, 70)} |`);
md.push('');
md.push(`## D. 复算结果 (§0.23.2 双方法)`);
md.push('');
md.push(`- methodA vs methodB 不一致: **${mismatches.length}** 条 ${mismatches.length === 0 ? '✅ 两法一致' : '🔴 需查指标'}`);
md.push(`- 槽位总数 ${rows.length} / 有 title ${summary.slotsPresent} / 缺 title ${missing.length}`);
md.push('');
md.push(`## E. 规则口径影响面 (v4 50-54 vs 现行 50-58)`);
md.push('');
md.push(`- v4 旧口径分布: ${JSON.stringify(byBandV4)}`);
md.push(`- 现行口径分布: ${JSON.stringify(byBand)}`);
md.push(`- **仅因新口径 (50-58) 才判达标**的槽位: ${ruleDelta.length} 条 (旧口径下属 55-58 由「满格禁加」变为「合规」)`);

/* ---------- F. 优先级分层 (以真实数据为准, 非doc估计) ---------- */
// P0 定义 (来源: 用户 2026-09-19 方案稿): 位置<=20 且 展示>=30 且 当量<40
const p0 = rows
  .filter((r) => r.band === 'FILL' && r.equiv < 40 && r.gsc && r.gsc.imps >= 30 && r.gsc.pos != null && r.gsc.pos <= 20)
  .sort(sortByImp);
// P1: 当量 40-49 且 展示>=50
const p1 = rows.filter((r) => r.band === 'FILL' && r.equiv >= 40 && r.equiv < 50 && r.gsc && r.gsc.imps >= 50).sort(sortByImp);
// P2: 超高展示但零点击
const zeroClick = rows.filter((r) => r.gsc && r.gsc.imps >= 100 && r.gsc.clicks === 0).sort(sortByImp);
// 同簇同质后缀检测 (同一 locale 下多 SKU 共享完全相同的修饰段)
const suffixMap = new Map();
for (const r of rows) {
  if (!r.title || !r.title.includes('|')) continue;
  const tail = r.title.split('|').slice(1).join('|').trim();
  const k = `${r.locale}::${tail}`;
  if (!suffixMap.has(k)) suffixMap.set(k, []);
  suffixMap.get(k).push(r);
}
const homogeneous = [...suffixMap.entries()]
  .filter(([, v]) => v.length >= 4)
  .map(([k, v]) => ({ locale: k.split('::')[0], tail: k.split('::')[1], count: v.length, slugs: v.map((x) => x.slug), equivs: [...new Set(v.map((x) => x.equiv))] }))
  .sort((a, b) => b.count - a.count);

md.push('');
md.push('## F. 优先级分层 (真实数据实测)');
md.push('');
md.push(`### P0 — 位置 ≤20 且 展示 ≥30 且 当量 <40 (共 ${p0.length} 条: 排名已到位, 标题是唯一瓶颈)`);
md.push('');
md.push('| 当量 | locale | SKU | 展示28d | 位置 | CTR | title |');
md.push('|---|---|---|---|---|---|---|');
for (const r of p0) md.push(`| ${r.equiv} | ${r.locale} | ${r.slug} | ${r.gsc.imps} | ${r.gsc.pos.toFixed(2)} | ${(r.gsc.ctr * 100).toFixed(2)}% | ${r.title.slice(0, 60)} |`);
md.push('');
md.push(`### P1 — 当量 40-49 且 展示 ≥50 (共 ${p1.length} 条)`);
md.push('');
md.push('| 当量 | locale | SKU | 展示28d | 位置 | CTR | title |');
md.push('|---|---|---|---|---|---|---|');
for (const r of p1) md.push(`| ${r.equiv} | ${r.locale} | ${r.slug} | ${r.gsc.imps} | ${r.gsc.pos != null ? r.gsc.pos.toFixed(2) : '-'} | ${(r.gsc.ctr * 100).toFixed(2)}% | ${r.title.slice(0, 60)} |`);
md.push('');
md.push(`### 零点击 — 展示 ≥100 且 0 点击 (共 ${zeroClick.length} 条)`);
md.push('');
md.push('| band | 当量 | locale | SKU | 展示28d | 位置 |');
md.push('|---|---|---|---|---|---|');
for (const r of zeroClick) md.push(`| ${r.band} | ${r.equiv} | ${r.locale} | ${r.slug} | ${r.gsc.imps} | ${r.gsc.pos != null ? r.gsc.pos.toFixed(2) : '-'} |`);
md.push('');
md.push('## G. 结构性缺陷: 同簇标题同质化 (≥4 SKU 共享完全相同修饰段)');
md.push('');
md.push('| locale | 共享修饰段 | SKU 数 | 当量 | 涉及 SKU |');
md.push('|---|---|---|---|---|');
for (const h of homogeneous) md.push(`| ${h.locale} | ${h.tail} | ${h.count} | ${h.equivs.join('/')} | ${h.slugs.join(', ')} |`);

/* ---------- H. 违规清单 ledger (黄灯期跟踪 + 升级判据) ----------
 * K3 2026-09-19 指令: 门禁保持 yellow 告警, 期间建「违规清单」跟踪修复进度;
 * 存量降到阈值 (<10) 后再把 severity 升 red 硬拦。
 * ledger 以 slug|locale 为稳定键, 记录 firstSeen / lastSeen / 历史当量, 支持 --ledger-sync 合并。
 */
const LEDGER_PATH = path.join(ROOT, '.hermes/reports/sku-title-ledger.json');
const LEDGER_ESCALATE_AT = 10;

function buildLedger() {
  const prev = fs.existsSync(LEDGER_PATH) ? JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8')) : { entries: {} };
  const entries = prev.entries || {};
  const violations = rows.filter((r) => r.band !== 'OK');
  const currentKeys = new Set(violations.map((r) => `${r.slug}|${r.locale}`));

  for (const r of violations) {
    const k = `${r.slug}|${r.locale}`;
    const e = entries[k] || { slug: r.slug, locale: r.locale, firstSeen: TODAY, equivHistory: [] };
    e.lastSeen = TODAY;
    e.band = r.band;
    e.equiv = r.equiv;
    e.issues = r.issues;
    e.gscImps = r.gsc?.imps ?? null;
    e.gscPos = r.gsc?.pos != null ? Number(r.gsc.pos.toFixed(2)) : null;
    e.status = 'OPEN';
    if (!e.equivHistory.some((h) => h.date === TODAY)) e.equivHistory.push({ date: TODAY, equiv: r.equiv });
    entries[k] = e;
  }
  // 已不在违规集的 = 已修复
  for (const [k, e] of Object.entries(entries)) {
    if (!currentKeys.has(k) && e.status === 'OPEN') {
      e.status = 'FIXED';
      e.fixedOn = TODAY;
    }
  }
  const open = Object.values(entries).filter((e) => e.status === 'OPEN');
  const fixed = Object.values(entries).filter((e) => e.status === 'FIXED');
  const ledger = {
    schema: 'sku-title-ledger-v1',
    updatedAt: TODAY,
    rule: { min: TITLE_MIN, max: TITLE_MAX, sov: 'scripts/guards/title-equiv.js' },
    gatePhase: open.length <= LEDGER_ESCALATE_AT ? 'READY_TO_ESCALATE_RED' : 'YELLOW_WARN',
    escalateThreshold: LEDGER_ESCALATE_AT,
    counts: { open: open.length, fixed: fixed.length, total: Object.keys(entries).length },
    entries,
  };
  return ledger;
}

const ledger = buildLedger();
if (!process.argv.includes('--stdout')) {
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 1));
}

md.push('');
md.push('## H. 违规清单 ledger (黄灯期跟踪 · K3 2026-09-19 指令)');
md.push('');
md.push(`- ledger: \`.hermes/reports/sku-title-ledger.json\` (稳定键 slug|locale, 记 firstSeen / 当量历史 / status)`);
md.push(`- **未修复 ${ledger.counts.open}** / 已修复 ${ledger.counts.fixed} / 累计 ${ledger.counts.total}`);
md.push(`- 门禁阶段: **${ledger.gatePhase}** (存量 ≤${LEDGER_ESCALATE_AT} 时把 severity 由 yellow 升 red 硬拦)`);

const report = { summary, ruleDelta, listUnder, listOver, issueRows, p0, p1, zeroClick, homogeneous, ledger, rows };

/* ---------- I. 批次归属 + 全景 Markdown 清单 (K3 2026-09-19 两天冲刺方案) ---------- */
function batchOf(r) {
  const imps = r.gsc?.imps ?? 0;
  const pos = r.gsc?.pos ?? null;
  if (r.band === 'TRIM') return 'P2-修剪';
  if (r.band === 'FILL') {
    if (pos != null && pos <= 20 && imps >= 30 && r.equiv < 40) return 'P0-A';
    if (pos != null && pos <= 20 && imps >= 30 && r.equiv >= 40 && r.equiv < 50) return 'P0-B';
    if (pos != null && pos > 20 && pos <= 50 && imps >= 50) return 'P1';
  }
  return 'P3-低优先';
}
for (const r of rows) r.batch = batchOf(r);
const ledgerRows = rows.filter((r) => r.band !== 'OK').sort((a, b) => (b.gsc?.imps || 0) - (a.gsc?.imps || 0));
const batchCounts = ledgerRows.reduce((m, r) => ((m[r.batch] = (m[r.batch] || 0) + 1), m), {});

const lmd = [];
lmd.push(`# SKU 标题违规全景清单 (${TODAY})`);
lmd.push('');
lmd.push(`校准日期: ${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`);
lmd.push('');
lmd.push('> 口径: `scripts/guards/title-equiv.js` (半角当量, 目标 ' + TITLE_MIN + '-' + TITLE_MAX + ') · 规则 SSoT = `docs/2026-09-13-title-batch-T-freeze.md` §6-3');
lmd.push(`> **开放违规 ${ledgerRows.length} 条** / 300 槽 (${((ledgerRows.length / 300) * 100).toFixed(1)}%) · 门禁阶段 ${ledger.gatePhase} (存量 ≤${LEDGER_ESCALATE_AT} 升 red)`);
lmd.push('');
lmd.push('## 批次归属 (供分批独立 commit · 每批可单独 revert)');
lmd.push('');
lmd.push('| 批次 | 定义 | 条数 | 审核策略 |');
lmd.push('|---|---|---|---|');
lmd.push(`| P0-A | 位置≤20 + 展示≥30 + 当量<40 (排名已到位, 标题是唯一瓶颈) | ${batchCounts['P0-A'] || 0} | 100% 逐条过目 |`);
lmd.push(`| P0-B | 位置≤20 + 展示≥30 + 当量 40-49 | ${batchCounts['P0-B'] || 0} | 抽检 30% |`);
lmd.push(`| P1 | 位置 21-50 + 展示≥50 | ${batchCounts['P1'] || 0} | 抽检 20% |`);
lmd.push(`| P2-修剪 | 超上限 >${TITLE_MAX} (需删内容, 风险较高) | ${batchCounts['P2-修剪'] || 0} | 逐条过目 |`);
lmd.push(`| P3-低优先 | 其余 (en/ja 低展示, 受排名限制) | ${batchCounts['P3-低优先'] || 0} | 抽检 10% |`);
lmd.push('');
for (const b of ['P0-A', 'P0-B', 'P1', 'P2-修剪', 'P3-低优先']) {
  const sub = ledgerRows.filter((r) => r.batch === b);
  if (!sub.length) continue;
  lmd.push(`## 批次 ${b} (${sub.length} 条)`);
  lmd.push('');
  lmd.push('| # | slug | locale | band | 当量 | 展示28d | 位置 | CTR | 问题 | 当前 title |');
  lmd.push('|---|---|---|---|---|---|---|---|---|---|');
  sub.forEach((r, i) => {
    lmd.push(`| ${i + 1} | ${r.slug} | ${r.locale} | ${r.band} | ${r.equiv} | ${r.gsc?.imps ?? '-'} | ${r.gsc?.pos != null ? r.gsc.pos.toFixed(2) : '-'} | ${r.gsc ? (r.gsc.ctr * 100).toFixed(2) + '%' : '-'} | ${r.issues.join(';') || '-'} | ${(r.title || '').slice(0, 62)} |`);
  });
  lmd.push('');
}
lmd.push('## 同簇同质化 (≥4 SKU 共享完全相同修饰段 — 修标题时须差异化, 防同簇互相稀释)');
lmd.push('');
lmd.push('| locale | 共享修饰段 | SKU 数 | 当量 |');
lmd.push('|---|---|---|---|');
for (const h of homogeneous) lmd.push(`| ${h.locale} | ${h.tail} | ${h.count} | ${h.equivs.join('/')} |`);

if (!process.argv.includes('--stdout')) {
  const dir = path.join(ROOT, '.hermes/reports');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `sku-title-census-${TODAY}.json`), JSON.stringify(report, null, 1));
  fs.writeFileSync(path.join(dir, `sku-title-census-${TODAY}.md`), md.join('\n'));
  fs.writeFileSync(path.join(dir, `sku-title-ledger-${TODAY}.md`), lmd.join('\n'));
}

console.log(JSON.stringify(summary, null, 1));
console.log('--- FILL (top 12 by imps) ---');
for (const r of listUnder.slice(0, 12)) console.log(`  ${r.equiv}\t${r.locale}\t${r.slug}\timps=${r.gsc?.imps ?? '-'}\t${(r.title || '').slice(0, 60)}`);
console.log('--- TRIM (top 12 by imps) ---');
for (const r of listOver.slice(0, 12)) console.log(`  ${r.equiv}\t${r.locale}\t${r.slug}\timps=${r.gsc?.imps ?? '-'}\t${(r.title || '').slice(0, 60)}`);
if (!process.argv.includes('--stdout')) console.log(`\nreport: .hermes/reports/sku-title-census-${TODAY}.md`);
