/**
 * audit-sku-quality.mjs — SKU 标题/描述/h1/faq 全量质量审计 × GSC 28d 定级（只读）
 *
 * 触发: K3 2026-09-21 11:32 指令 — 「本路核心 = SKU 标题/描述/meta 检查，启动 SEO+AEO+GEO 飞轮
 *       打带钱词首页；没有排名或排名 30 名后的就大改（全站三语言 SKU）」。
 *
 * 口径 SSoT:
 *   - 当量带: scripts/guards/title-equiv.js (MIN=50 / MAX=57, K3 2026-09-19 裁决)
 *   - 标题规则: docs/2026-09-13-title-batch-T-freeze.md §6-3
 *   - 验证窗: 42 槽 (title-flywheel-approved-2026-09-20.json) 冻结至 2026-09-30
 *   - GSC: .hermes/gsc-2026-09-18/extract.json new.{hk,jp,us}_28d 网页级
 *
 * 解析方式: tsx 直 import sku-seo-data.ts / products.ts（禁正则猜嵌套归属，避坑 4）
 *
 * 用法: node --import tsx scripts/audit-sku-quality.mjs [--stdout]
 * 产物: .hermes/reports/sku-quality-audit-<date>.json + .md（报告不入库，per 9/20 教训 #3）
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const TODAY = '2026-09-21';
const LOCALES = ['zh-hk', 'en', 'ja'];
const GSC_GROUP = { 'zh-hk': 'hk_28d', en: 'us_28d', ja: 'jp_28d' };

const { skuSeoData } = await import('../src/data/sku-seo-data.ts');
const { products } = await import('../src/data/products.ts');

/* ---------- GSC 网页级 → slug 映射 ---------- */
const gsc = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/gsc-2026-09-18/extract.json'), 'utf8'));
const pageStats = {}; // `${locale}|${slug}` → {imps, clicks, pos}
for (const [locale, grp] of Object.entries(GSC_GROUP)) {
  for (const row of gsc.new[grp].网页) {
    const m = String(row['排名靠前的网页']).match(new RegExp(`/${locale}/product/([a-z0-9-]+)/`));
    if (!m) continue;
    const k = `${locale}|${m[1]}`;
    const cur = pageStats[k] || { imps: 0, clicks: 0, posW: 0, posN: 0 };
    cur.imps += row['展示'] || 0;
    cur.clicks += row['点击次数'] || 0;
    if (row['排名'] != null && row['展示'] > 0) { cur.posW += row['排名'] * row['展示']; cur.posN += row['展示']; }
    pageStats[k] = cur;
  }
}
for (const k of Object.keys(pageStats)) {
  const s = pageStats[k];
  s.pos = s.posN ? +(s.posW / s.posN).toFixed(2) : null;
  delete s.posW; delete s.posN;
}

/* ---------- 42 槽验证窗 ---------- */
const approved = JSON.parse(
  fs.readFileSync(path.join(ROOT, '.hermes/reports/title-flywheel-approved-2026-09-20.json'), 'utf8'));
const windowSet = new Set(approved.proposals.map((p) => `${p.locale}|${p.slug}`));

/* ---------- products.ts 真值 ---------- */
const truth = {};
for (const p of products) {
  truth[p.slug] = {
    minQuantity: p.minQuantity, basePrice: p.basePrice,
    basePrice_en: p.basePrice_en, basePrice_ja: p.basePrice_ja,
    unitLabel: p.unitLabel, category: p.category_slug,
  };
}

/* ---------- 检查器 ---------- */
const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };
const KANA = /[ぁ-んァ-ン]/;
const FLUFF = /專家|专家|品質保證|品质保证|High Quality|Best Quality|Printing Services|Professionally? Printed/i;

function checks(locale, slug, t) {
  const issues = [];
  const name = (skuSeoData[slug].name || {})[locale] || slug;
  const seo = (skuSeoData[slug].seo || {})[locale] || {};
  const title = seo.title || '';
  const desc = seo.description || '';
  const h1 = seo.h1 || '';
  const kw = seo.keywords || [];
  const tr = truth[slug] || {};

  // 1) title 当量带
  const eq = equiv(title);
  const bd = band(title);
  if (bd !== 'OK') issues.push({ level: 'P0', field: 'title', kind: `band_${bd}`, cur: eq });

  // 2) title 数字钩（MOQ/价格/交期）——批次1后应全有，缺则报
  const hasMoq = /(起印|起|MOQ|枚〜|pcs|Minimum|min\.?\s?\d|\d+\s?(pcs|pieces))/i.test(title);
  const hasPrice = /(HK\$|¥|US\$|\$\d)/.test(title);
  const hasTurn = /(小時|小时|打稿|即日|Same[- ]?Day|24\s?h|Rush|速遞|配送|Days|days|翌日)/.test(title);
  if (!hasMoq) issues.push({ level: 'P1', field: 'title', kind: 'no_moq_hook' });
  if (!hasPrice) issues.push({ level: 'P1', field: 'title', kind: 'no_price_hook' });
  if (!hasTurn) issues.push({ level: 'P2', field: 'title', kind: 'no_turnaround_hook' });
  if (FLUFF.test(title)) issues.push({ level: 'P1', field: 'title', kind: 'fluff_words', cur: title });

  // 3) title 品牌末尾（容许尾部空格/分隔符）
  const tail = title.replace(/[\s｜|·・|]+$/, '');
  if (!tail.endsWith(BRAND[locale])) issues.push({ level: 'P1', field: 'title', kind: 'brand_not_tail', cur: title.slice(-30) });

  // 4) title 币种/语种污染
  if (locale === 'ja' && /HK\$/.test(title)) issues.push({ level: 'P0', field: 'title', kind: 'currency_pollution', cur: title });
  if (locale === 'en' && /HK\$|¥/.test(title)) issues.push({ level: 'P0', field: 'title', kind: 'currency_pollution', cur: title });
  if (locale === 'zh-hk' && KANA.test(title)) issues.push({ level: 'P1', field: 'title', kind: 'kana_pollution', cur: title });

  // 5) h1 质量：主词必须在、不得是纯口水句
  if (!h1) issues.push({ level: 'P0', field: 'h1', kind: 'missing' });
  else {
    const mainKw = locale === 'ja' ? name.replace(/\s/g, '') : name.toLowerCase().replace(/\s/g, '');
    const h1c = h1.toLowerCase().replace(/\s/g, '');
    if (!h1c.includes(mainKw)) issues.push({ level: 'P0', field: 'h1', kind: 'main_kw_missing', cur: h1.slice(0, 60) });
    if (FLUFF.test(h1)) issues.push({ level: 'P1', field: 'h1', kind: 'fluff_words', cur: h1.slice(0, 60) });
    if (equiv(h1) < 12) issues.push({ level: 'P1', field: 'h1', kind: 'too_thin', cur: h1.slice(0, 60) });
    if (locale === 'zh-hk' && KANA.test(h1)) issues.push({ level: 'P1', field: 'h1', kind: 'kana_pollution', cur: h1.slice(0, 60) });
    if (locale === 'en' && /HK\$|¥/.test(h1)) issues.push({ level: 'P0', field: 'h1', kind: 'currency_pollution', cur: h1.slice(0, 60) });
  }

  // 6) description：长度 / 主词 / 币种 / MOQ 与 title 矛盾
  if (!desc) issues.push({ level: 'P0', field: 'desc', kind: 'missing' });
  else {
    if (desc.length < 80) issues.push({ level: 'P0', field: 'desc', kind: 'too_short', cur: desc.length });
    const dc = desc.toLowerCase().replace(/\s/g, '');
    const mainKw2 = locale === 'ja' ? name.replace(/\s/g, '') : name.toLowerCase().replace(/\s/g, '');
    if (!dc.includes(mainKw2)) issues.push({ level: 'P1', field: 'desc', kind: 'main_kw_missing', cur: desc.slice(0, 60) });
    if (locale === 'ja' && /HK\$/.test(desc)) issues.push({ level: 'P0', field: 'desc', kind: 'currency_pollution', cur: desc.slice(0, 60) });
    if (locale === 'en' && /HK\$|¥/.test(desc)) issues.push({ level: 'P0', field: 'desc', kind: 'currency_pollution', cur: desc.slice(0, 60) });
    if (locale === 'zh-hk' && KANA.test(desc)) issues.push({ level: 'P1', field: 'desc', kind: 'kana_pollution', cur: desc.slice(0, 60) });
    if (!hasTurn && !/(小時|小时|打稿|即日|Same[- ]?Day|Rush|速遞|配送|Days|days|翌日|交貨|纳期|納期|納品)/.test(desc))
      issues.push({ level: 'P2', field: 'desc', kind: 'no_turnaround' });
    // MOQ 矛盾：title 说 X 起，desc 说 Y 起（数字不同）
    const moqOf = (s) => { const m = s.match(/(\d+)\s*(張起|张起|個起|个起|本起|件起|枚起|張|张|個|个|本|件|枚)?/); return m ? +m[1] : null; };
    const tm = title.match(/(\d+)\s*(起印|起|MOQ|枚〜|pcs|pieces)/i);
    if (tm) {
      const dm = desc.match(/(\d+)\s*(張起|张起|個起|个起|本起|件起|枚起|起印|MOQ|张起印|張起印|pcs)/i);
      if (dm && +dm[1] !== +tm[1] && tr.minQuantity != null && +dm[1] !== tr.minQuantity)
        issues.push({ level: 'P0', field: 'desc', kind: 'moq_conflict_title', cur: `title=${tm[1]} desc=${dm[1]} truth=${tr.minQuantity}` });
    }
  }

  // 7) keywords 主词兜底
  const mainKw3 = locale === 'ja' ? name : name.toLowerCase();
  if (kw.length && !kw.some((k) => k.toLowerCase().replace(/\s/g, '') === mainKw3.replace(/\s/g, '')))
    issues.push({ level: 'P2', field: 'keywords', kind: 'main_kw_not_first' });

  return { eq, band: bd, issues };
}

/* ---------- 主循环 ---------- */
const slots = [];
for (const slug of Object.keys(skuSeoData)) {
  for (const locale of LOCALES) {
    const g = pageStats[`${locale}|${slug}`] || null;
    const inWindow = windowSet.has(`${locale}|${slug}`);
    let tier;
    if (inWindow && g && g.imps > 0 && g.pos != null && g.pos <= 30) tier = 'T2_WINDOW_KEEP';
    else if (!g || g.imps === 0 || g.pos == null || g.pos > 30) tier = 'T1_REWRITE';
    else tier = 'T3_KEEP';
    const r = checks(locale, slug, truth[slug]);
    slots.push({
      slug, locale, tier, inWindow,
      gsc: g ? { imps: Math.round(g.imps), clicks: Math.round(g.clicks), pos: g.pos } : null,
      eq: r.eq, band: r.band, issues: r.issues,
      title: skuSeoData[slug].seo?.[locale]?.title || '',
    });
  }
}

/* ---------- 汇总 ---------- */
const by = (f) => slots.reduce((a, s) => ((a[f(s)] = (a[f(s)] || 0) + 1), a), {});
const tierCount = by((s) => s.tier);
const issueCount = {};
for (const s of slots) for (const i of s.issues) { const k = `${i.level}|${i.field}|${i.kind}`; issueCount[k] = (issueCount[k] || 0) + 1; }

const summary = {
  generatedFor: TODAY, skuCount: Object.keys(skuSeoData).length, slotCount: slots.length,
  TITLE_MIN, TITLE_MAX, tierCount,
  issueCount: Object.fromEntries(Object.entries(issueCount).sort((a, b) => b[1] - a[1])),
  t1ByLocale: by((s) => (s.tier === 'T1_REWRITE' ? s.locale : 'x')),
  t1Slots: slots.filter((s) => s.tier === 'T1_REWRITE').length,
};

console.log(JSON.stringify(summary, null, 2));

if (!process.argv.includes('--stdout')) {
  const rp = path.join(ROOT, '.hermes/reports', `sku-quality-audit-${TODAY}.json`);
  fs.writeFileSync(rp, JSON.stringify({ summary, slots }, null, 2));
  // 人读 T1 清单
  const md = ['# SKU 质量审计 T1 大改清单 (' + TODAY + ')', '',
    `> 定级: T1 = GSC 28d 无展示 或 加权位置>30（K3 11:32 授权大改）；T2 = 验证窗 42 槽且位置≤30（冻结至 9/30）；T3 = 位置≤30 保留。`, '',
    `槽位总数 ${slots.length}；T1 ${summary.t1Slots} / T2 ${tierCount.T2_WINDOW_KEEP || 0} / T3 ${tierCount.T3_KEEP || 0}`, ''];
  for (const locale of LOCALES) {
    md.push(`## ${locale} T1（${slots.filter((s) => s.tier === 'T1_REWRITE' && s.locale === locale).length} 槽）`, '');
    md.push('| slug | imps | pos | 当量 | issues | title |', '|---|---|---|---|---|---|');
    for (const s of slots.filter((x) => x.tier === 'T1_REWRITE' && x.locale === locale).sort((a, b) => (b.gsc?.imps || 0) - (a.gsc?.imps || 0))) {
      md.push(`| ${s.slug} | ${s.gsc?.imps ?? 0} | ${s.gsc?.pos ?? '-'} | ${s.eq} | ${s.issues.map((i) => `${i.field}:${i.kind}`).join(', ') || '-'} | ${s.title.replace(/\|/g, '｜')} |`);
    }
    md.push('');
  }
  fs.writeFileSync(path.join(ROOT, '.hermes/reports', `sku-quality-audit-${TODAY}-T1.md`), md.join('\n'));
  console.log('\n[落盘] .hermes/reports/sku-quality-audit-' + TODAY + '.json / -T1.md');
}
