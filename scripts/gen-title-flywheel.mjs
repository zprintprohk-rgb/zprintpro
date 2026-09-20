#!/usr/bin/env node
/**
 * scripts/gen-title-flywheel.mjs — 标题-GSC-关键词库增长飞轮 · 候选生成器 (2026-09-20)
 *
 * 任务来源: K3 2026-09-20 「构建标题-GSC-关键词库增长飞轮」+ 附件《SKU 标题长度违规：行业实证分析与系统性修复方案》
 *
 * 输入:
 *   - src/data/sku-seo-data.ts              活 title 主源 (100 SKU × 3 locale)
 *   - src/data/products.ts                  真值: minQuantity / basePrice(_en/_ja) / unitLabel / category_slug
 *   - .hermes/gsc-2026-09-18/extract.json   GSC 28d 页面级 (combo/hk/jp/us)
 *   - scripts/guards/title-hooks.json       素材库 (白名单钩子, 带 source/status)
 *   - scripts/guards/title-equiv.js         当量 SSoT (MIN=50 / MAX=57, 58 阻断)
 *
 * 纪律 (附件 §七 + SOP-10 + §0.23):
 *   1. 不发明数字 — MOQ/价格一律引 products.ts; 修饰词一律引 SKU 自身 keywords 池 或素材库白名单
 *   2. 主词不改 — 第 1 段保持现标题主词
 *   3. 品牌末尾一次 — zh-hk=智印港 / en·ja=ZprintPro
 *   4. 跨语言污染零容忍 — en 无 CJK; zh-hk 无假名/简体; ja 无繁中特有词
 *   5. 冻结避让 — same-day-flyers 三槽 2026-09-20 批次1 已改, 冻结期内不碰 (幂等铁律)
 *
 * 输出 (只写 .hermes/reports/, 不碰 src):
 *   - .hermes/reports/title-flywheel-proposals-2026-09-20.json  (机器读, 供审阅/apply)
 *   - .hermes/reports/title-flywheel-proposals-2026-09-20.md    (人读)
 *
 * 用法: node scripts/gen-title-flywheel.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const LOCALES = ['zh-hk', 'en', 'ja'];
const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };
const TODAY = '2026-09-20';
const FROZEN_SLOTS = new Set(['same-day-flyers']); // 2026-09-20 批次1 已改, 冻结 2-4 周

/* ---------- 1. 解析 sku-seo-data.ts (沿用 census 正则, 含 0 缩进修正) ---------- */
function parseSkuSeo() {
  const txt = read('src/data/sku-seo-data.ts');
  const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const out = [];
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    if (!seg.includes('"seo"')) continue;
    for (const loc of LOCALES) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      const km = seg.match(new RegExp(`"${loc}": \\{[\\s\\S]*?"keywords": \\[([^\\]]*)\\]`));
      out.push({
        slug: starts[i].slug,
        locale: loc,
        title: m ? m[1].replace(/\\"/g, '"') : null,
        keywords: km ? (km[1].match(/"([^"]+)"/g) || []).map((x) => x.replace(/"/g, '')) : [],
      });
    }
  }
  return out;
}

/* ---------- 2. 解析 products.ts 真值 ---------- */
function parseProducts() {
  const txt = read('src/data/products.ts');
  const map = {};
  // SKU 条目 = 行首 4 或 6 空格 slug 行 (6 空格 = japan-doujin 等嵌套数组块);
  // 块界 = 下一个 slug 行 or EOF (2026-09-20 修正: 原 {0,3000} 上限遇长块静默漏抓)
  const marks = [...txt.matchAll(/^ {4,6}slug: '([a-z0-9-]+)',$/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  for (let i = 0; i < marks.length; i++) {
    const body = txt.slice(marks[i].idx, marks[i + 1]?.idx ?? txt.length);
    const num = (k) => { const x = body.match(new RegExp(`${k}: ([0-9.]+)`)); return x ? Number(x[1]) : null; };
    const str = (k) => { const x = body.match(new RegExp(`${k}: '([^']*)'`)); return x ? x[1] : null; };
    map[marks[i].slug] = {
      category_slug: str('category_slug'),
      minQuantity: num('minQuantity'),
      basePrice: num('basePrice'),
      basePrice_en: num('basePrice_en'),
      basePrice_ja: num('basePrice_ja'),
      unitLabel: str('unitLabel'),
    };
  }
  return map;
}

/* ---------- 3. GSC 28d 页面级 ---------- */
function loadGsc() {
  const g = JSON.parse(read('.hermes/gsc-2026-09-18/extract.json'));
  const bags = g?.new || {};
  const pick = (key) => {
    const rows = bags[key]?.['网页'];
    if (!Array.isArray(rows)) return null;
    const mm = new Map();
    for (const r of rows) {
      const u = r['排名靠前的网页'];
      if (!u) continue;
      mm.set(u.replace(/\/$/, ''), { clicks: r['点击次数'] ?? 0, imps: r['展示'] ?? 0, ctr: r['点击率'] ?? 0, pos: r['排名'] ?? null });
    }
    return mm;
  };
  return {
    combo: pick('combo_28d'),
    'zh-hk': pick('hk_28d'),
    en: pick('us_28d') || pick('en_28d'),
    ja: pick('jp_28d'),
  };
}
const gscKey = (locale, slug) => `https://zprintpro.com/${locale}/product/${slug}`;

/* ---------- 4. 素材库 ---------- */
const hooksLib = JSON.parse(read('scripts/guards/title-hooks.json'));
const approvedHooks = (loc) =>
  Object.entries(hooksLib.hooks)
    .filter(([, h]) => h.status === 'approved' && h[loc])
    .map(([id, h]) => ({ id, text: h[loc], source: h.source }));

/* ---------- 5. 价格格式化 ---------- */
const fmtPrice = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

/* ---------- 6. 闸门 ---------- */
const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/;
const KANA = /[ぁ-んァ-ヶ]/;
function gates(slot, cand, truth, inserted) {
  const g = [];
  const e = equiv(cand);
  if (e < TITLE_MIN || e > TITLE_MAX) g.push('G1_当量');
  const brand = BRAND[slot.locale];
  const parts = cand.split('|').map((s) => s.trim());
  const last = parts[parts.length - 1];
  if ((cand.split(brand).length - 1) !== 1 || last !== brand) g.push('G2_品牌末尾一次');
  if (slot.locale === 'en' && /[\u2E80-\u9FFF\uFF01-\uFF60\u3000-\u303F]/.test(cand)) g.push('G3_跨语言');
  if (slot.locale === 'zh-hk' && (KANA.test(cand) || SIMP.test(cand))) g.push('G3_跨语言');
  if (slot.locale === 'ja' && /[曆紙裝禮廣貼豐麼麼]/.test(cand)) g.push('G3_跨语言');
  // G4: 插入的数字必须有源 (inserted 数组带 source, 空=无数字插入)
  for (const ins of inserted) if (!ins.source) g.push('G4_数字无源');
  // G5: 主词前置 — 第 1 段与现标题第 1 段共享前 2 字 (或现标题主词在新标题前段)
  const curFirst = (slot.title || '').split('|')[0].trim().slice(0, 2);
  if (curFirst && !cand.slice(0, Math.max(20, curFirst.length + 14)).includes(curFirst)) g.push('G5_主词前置');
  return { e, pass: g.length === 0, gates: g };
}

/* ---------- 7. FILL 候选 ---------- */
function genFill(slot, truth) {
  const brand = BRAND[slot.locale];
  const t = slot.title || '';
  const out = [];
  const rec = { mode: 'FILL' };
  // 现结构: body | brand ?  若无品牌末尾 → 需加品牌 (允许, 属补齐)
  const m = t.match(new RegExp(`^(.*?)\\s*[·|]\\s*${brand}$`));
  const body = m ? m[1].trim() : t.trim();
  const hadBrand = !!m;
  const moq = truth?.minQuantity, bp = truth?.basePrice, bpe = truth?.basePrice_en, bpj = truth?.basePrice_ja;
  const inserted = [];
  // 动态钩子 (真值)
  let dynHook = null;
  if (slot.locale === 'zh-hk' && moq && bp) {
    const unit = truth.unitLabel || '個';
    dynHook = { text: `${moq}${unit}起 HK$${fmtPrice(bp)}起`, ins: [
      { token: `${moq}${unit}起`, source: `products.ts minQuantity=${moq}` },
      { token: `HK$${fmtPrice(bp)}起`, source: `products.ts basePrice=${bp}` },
    ] };
  } else if (slot.locale === 'en' && moq && bpe) {
    dynHook = { text: `${moq} MOQ | $${fmtPrice(bpe)}`, ins: [
      { token: `${moq} MOQ`, source: `products.ts minQuantity=${moq}` },
      { token: `$${fmtPrice(bpe)}`, source: `products.ts basePrice_en=${bpe}` },
    ] };
  } else if (slot.locale === 'ja' && moq && bpj) {
    const unit = truth?.category_slug === 'books' ? '冊' : '枚';
    dynHook = { text: `${moq}${unit}〜 ¥${bpj}〜`, ins: [
      { token: `${moq}${unit}〜`, source: `products.ts minQuantity=${moq}` },
      { token: `¥${bpj}〜`, source: `products.ts basePrice_ja=${bpj}` },
    ] };
  }
  if (!dynHook) { rec.mode = 'MANUAL_REVIEW'; rec.reason = '缺真值 (minQuantity/price 不全)'; return [rec]; }

  // 变体 A: body | dynHook | brand
  {
    const cand = `${body} | ${dynHook.text} | ${brand}`;
    out.push({ variant: 'A', cand, ...gates(slot, cand, truth, dynHook.ins) });
  }
  // 变体 B: 若 A 超 57 → 压缩 dynHook 或 body 末段
  {
    const a = out[0];
    if (!a.pass && a.gates.includes('G1_当量')) {
      const shortHook = slot.locale === 'zh-hk' ? `${moq}${truth.unitLabel || '個'}起` : slot.locale === 'en' ? `${moq} MOQ` : `${moq}${truth?.category_slug === 'books' ? '冊' : '枚'}〜`;
      const cand = `${body} | ${shortHook} | ${brand}`;
      out.push({ variant: 'B_仅MOQ', cand, ...gates(slot, cand, truth, dynHook.ins.slice(0, 1)) });
    }
  }
  // 变体 C: 若 A 仍 < 50 → body 内补白名单钩子 (1h打样/DHL)
  {
    const a = out[0];
    if (a.e < TITLE_MIN) {
      for (const h of approvedHooks(slot.locale)) {
        const cand = `${body} | ${dynHook.text} | ${h.text} | ${brand}`;
        const r = gates(slot, cand, truth, [...dynHook.ins, { token: h.text, source: h.source }]);
        out.push({ variant: `C_${h.id}`, cand, ...r });
        if (r.pass) break;
      }
    }
  }
  return out;
}

/* ---------- 8. TRIM 候选 ---------- */
function genTrim(slot, truth) {
  const brand = BRAND[slot.locale];
  const t = (slot.title || '').trim();
  const parts = t.split(/\s*\|\s*/).map((s) => s.trim());
  const bi = parts.findIndex((p) => p === brand);
  if (bi < 0 || bi !== parts.length - 1) return [{ variant: 'X', mode: 'MANUAL_REVIEW', reason: '品牌不在末尾, 需人工', cand: t, e: equiv(t), pass: false, gates: ['G2_品牌末尾一次'] }];
  const body = parts.slice(0, -1);
  // 段优先级: 第 1 段主词锁死; 含数字/价格/MOQ 段高优先; 其余按序可丢
  const score = (seg, i) => {
    if (i === 0) return 99;
    let s = 10;
    if (/\d/.test(seg)) s += 40;                       // 数字钩子优先保 (v9.3 任务J)
    if (/起|MOQ|\$|HK\$|¥/.test(seg)) s += 20;
    if (/Free US Ship|Free Shipping/.test(seg)) s -= 5; // 通用承诺可压
    if (/Wind-Resistant|Tri-Fold|Wire-Bound|Perfect Bound|Spiral/.test(seg)) s += 5;
    return s;
  };
  const out = [];
  // 变体 A: 从最低优先级中间段开始整段丢
  {
    const segs = body.map((s, i) => ({ s, i })).sort((a, b) => score(a.s, a.i) - score(b.s, b.i));
    const drop = new Set();
    for (const { i } of segs) {
      if (i === 0) continue;
      const cand = [...body.filter((_, j) => j !== i && !drop.has(j) && false), brand].join(' | ');
      break;
    }
    // 简化: 迭代丢最低分段直到 ≤57
    const cur = [...body];
    while (cur.length > 1 && equiv([...cur, brand].join(' | ')) > TITLE_MAX) {
      const order = cur.map((s, i) => ({ s, i })).sort((a, b) => score(a.s, a.i) - score(b.s, b.i));
      const victim = order[0];
      if (victim.i === 0) break;
      cur.splice(victim.i, 1);
    }
    const cand = [...cur, brand].join(' | ');
    out.push({ variant: 'A_丢段', cand, ...gates(slot, cand, truth, []) });
  }
  // 变体 B: 若 A < 50 → 用短承诺替换长承诺 (Free Shipping $99+ → Free US Ship)
  {
    const a = out[0];
    if (!a.pass || a.e < TITLE_MIN) {
      let cand = a.cand;
      cand = cand.replace('Free Shipping $99+', 'Free US Ship');
      if (cand !== a.cand) out.push({ variant: 'B_短承诺', cand, ...gates(slot, cand, truth, [{ token: 'Free US Ship', source: '线上既有短钩子 en 在用的站级承诺' }]) });
    }
  }
  return out;
}

/* ---------- 主流程 ---------- */
const slots = parseSkuSeo();
const truth = parseProducts();
const gsc = loadGsc();
const issues = [];
for (const s of slots) {
  if (!s.title || FROZEN_SLOTS.has(s.slug)) continue;
  const b = band(s.title);
  if (b === 'OK') continue;
  const g = gsc[s.locale]?.get(gscKey(s.locale, s.slug)) || gsc.combo?.get(gscKey(s.locale, s.slug)) || { imps: 0, clicks: 0, pos: null };
  issues.push({ ...s, band: b, equiv: equiv(s.title), gsc: g, truth: truth[s.slug] || null });
}
issues.sort((a, b) => (b.gsc.imps || 0) - (a.gsc.imps || 0));

const proposals = [];
for (const s of issues) {
  const cands = s.band === 'FILL' ? genFill(s, s.truth) : genTrim(s, s.truth);
  proposals.push({ slug: s.slug, locale: s.locale, band: s.band, curEquiv: s.equiv, curTitle: s.title, gsc: s.gsc, truth: s.truth, candidates: cands });
}

/* 汇总 */
const flat = [];
for (const p of proposals) for (const c of p.candidates) flat.push({ ...p, ...c });
const passed = flat.filter((f) => f.pass);
const manual = proposals.filter((p) => p.candidates.some((c) => c.mode === 'MANUAL_REVIEW'));

/* JSON 输出 */
fs.writeFileSync(path.join(ROOT, `.hermes/reports/title-flywheel-proposals-${TODAY}.json`), JSON.stringify({ generatedFor: TODAY, rule: `MIN=${TITLE_MIN} MAX=${TITLE_MAX} (58 阻断)`, slotCount: issues.length, passedCount: passed.length, manualCount: manual.length, proposals }, null, 2), 'utf8');

/* MD 输出 */
let md = `# 标题飞轮候选提案 — ${TODAY}\n\n`;
md += `> 口径: 半角当量 ${TITLE_MIN}-${TITLE_MAX} (58 阻断, SSoT scripts/guards/title-equiv.js) · 不发明数字 · 主词不改 · 品牌末尾一次 · 跨语言零容忍\n\n`;
md += `**issue 槽**: ${issues.length} (FILL ${issues.filter((i) => i.band === 'FILL').length} / TRIM ${issues.filter((i) => i.band === 'TRIM').length}) · **全闸门通过候选**: ${passed.length} · **需人工**: ${manual.length}\n\n`;
md += `| # | slug | locale | 带 | 现当量 | GSC imps | 位置 | 候选 | 当量 | 闸门 |\n|---|---|---|---|---|---|---|---|---|---|\n`;
flat.forEach((f, i) => {
  const gateStr = f.mode === 'MANUAL_REVIEW' ? '🖐 ' + (f.reason || '人工') : f.pass ? '✅' : '🔴 ' + (f.gates || []).join(',');
  const eStr = f.e ?? '-';
  md += `| ${i + 1} | ${f.slug} | ${f.locale} | ${f.band} | ${f.curEquiv} | ${f.gsc.imps} | ${f.gsc.pos ?? '-'} | ${f.cand} | ${eStr} | ${gateStr} |\n`;
});
md += `\n## MANUAL_REVIEW\n`;
manual.forEach((m) => { md += `- ${m.slug}/${m.locale}: ${m.candidates[0].reason}\n`; });
fs.writeFileSync(path.join(ROOT, `.hermes/reports/title-flywheel-proposals-${TODAY}.md`), md, 'utf8');

console.log(`issue slots: ${issues.length} (FILL ${issues.filter((i) => i.band === 'FILL').length} / TRIM ${issues.filter((i) => i.band === 'TRIM').length})`);
console.log(`gate-passed candidates: ${passed.length} / manual: ${manual.length}`);
console.log('--- 通过候选 (按 imps 排序) ---');
passed.slice(0, 50).forEach((f) => console.log(`  [${f.band}] ${f.slug}/${f.locale} ${f.curEquiv}→${f.e} imps=${f.gsc.imps} :: ${f.cand}`));
if (manual.length) { console.log('--- MANUAL ---'); manual.forEach((m) => console.log(`  ${m.slug}/${m.locale}: ${m.candidates[0].reason}`)); }
