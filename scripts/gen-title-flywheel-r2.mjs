#!/usr/bin/env node
/**
 * scripts/gen-title-flywheel-r2.mjs — 标题飞轮第二轮 (2026-09-21)
 *
 * 任务来源: K3 2026-09-21《全站三语言SKU标题SEO+AEO+GEO飞轮提升指令》
 * 拍板: 「没有进前10的主词全部不冻结」→ 冻结 21 slug / 解冻 79 slug
 *       (.hermes/reports/freeze-repartition-2026-09-21.json)
 *
 * 第一轮 (9/20 + T1) 已使 300 槽全部落入 50-57 OK 带。本轮不是修长度,
 * 是「带钱词优化」: 用 GSC 28d 实证查询 (同簇长尾) 替换/补强标题中段,
 * 目标 = 带钱词进首页。
 *
 * 输入:
 *   - src/data/sku-seo-data.ts            活 title 主源 (K2.8 今日产物)
 *   - src/data/products.ts                真值: minQuantity / basePrice(_en/_ja)
 *   - .hermes/gsc-2026-09-18/extract.json GSC 28d (combo_28d 查询表 1000 行 + 页面级)
 *   - .hermes/keyword-lib/02-关键词词库.csv 带钱词库 (仅 en/category 47 条可用于标题;
 *     intent/tender 为 B2B 获客 scraping 词, 不进消费者标题; zh-hk/ja 无行)
 *   - scripts/guards/title-equiv.js       当量 SSoT (50-57, 58 阻断)
 *
 * 纪律:
 *   1. 冻结避让 — TITLE_WINDOW_FROZEN 21 slug 一律跳过
 *   2. 主词不改 — 第 1 段保持现标题主词
 *   3. 不发明数字 — 中段只换 GSC 实证查询词 (展示量为证据), 数字钩子段不动
 *   4. 品牌末尾一次 · 跨语言零容忍 · 禁空洞修饰词
 *   5. 只写 .hermes/reports/, 不碰 src
 *
 * 用法: node scripts/gen-title-flywheel-r2.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const LOCALES = ['zh-hk', 'en', 'ja'];
const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };
const TODAY = '2026-09-21';

/* ---------- 冻结集合 ---------- */
const repart = JSON.parse(read('.hermes/reports/freeze-repartition-2026-09-21.json'));
const FROZEN = new Set(repart.frozenSlugs);
const UNFROZEN = new Set(repart.unfrozenSlugs);

/* ---------- 解析 sku-seo-data.ts (沿用 r1/census 正则) ---------- */
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

/* ---------- GSC 28d: 查询表 + 页面级 ---------- */
function loadGsc() {
  const g = JSON.parse(read('.hermes/gsc-2026-09-18/extract.json'));
  const bags = g?.new || {};
  const qt = bags.combo_28d?.['查詢數'] || bags.combo_28d?.['查询数'] || [];
  const queries = qt
    .map((r) => ({ q: String(r['热门查询'] ?? r['熱門查詢'] ?? '').trim(), clicks: r['点击次数'] ?? 0, imps: r['展示'] ?? 0, pos: r['排名'] ?? null }))
    .filter((r) => r.q && !/zprint|智印港/i.test(r.q));
  const pages = new Map();
  for (const r of bags.combo_28d?.['网页'] || []) {
    const u = r['排名靠前的网页'];
    if (u) pages.set(u.replace(/\/$/, ''), { clicks: r['点击次数'] ?? 0, imps: r['展示'] ?? 0, pos: r['排名'] ?? null });
  }
  return { queries, pages };
}
const pageKey = (locale, slug) => `https://zprintpro.com/${locale}/product/${slug}`;

/* ---------- 查询词语言归属 ---------- */
const KANA = /[ぁ-んァ-ヶー]/;
const CJK = /[一-鿿]/;
function qLang(q) {
  if (KANA.test(q)) return 'ja';
  if (CJK.test(q)) return 'zh-hk';
  return 'en';
}

/* ---------- 闸门 (沿用 r1 口径) ---------- */
const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/;
const JA_TRAD = /[曆紙裝禮廣貼豐麼]/;
const EMPTY_MOD = /印刷專家|品質保證|品質保证|專業印刷|专业印刷|香港印刷(?!\w)/;
function gates(slot, cand) {
  const g = [];
  const e = equiv(cand);
  if (e < TITLE_MIN || e > TITLE_MAX) g.push(`G1_当量${e}`);
  const brand = BRAND[slot.locale];
  const parts = cand.split(/[|｜]/).map((s) => s.trim());
  if ((cand.split(brand).length - 1) !== 1 || parts[parts.length - 1] !== brand) g.push('G2_品牌末尾一次');
  if (slot.locale === 'en' && /[⺀-鿿＀-｠　-〿]/.test(cand)) g.push('G3_跨语言');
  if (slot.locale === 'zh-hk' && (KANA.test(cand) || SIMP.test(cand))) g.push('G3_跨语言');
  if (slot.locale === 'ja' && (JA_TRAD.test(cand) || cand.includes('份'))) g.push('G3_跨语言(ja禁份/繁)');
  if (EMPTY_MOD.test(cand)) g.push('G6_空洞修饰词');
  return { e, pass: g.length === 0, gates: g };
}
/* G7 语义重复: 查询词与主词/保留段共享实义 token → 拒绝
   先剥通用后缀 (印刷/訂製/訂做/製作/custom/printing/print),
   再比: 和字+假名最长公共子串 >=2; 拉丁单词词干互相包含 (>=4 字母) */
const GENERIC = /印刷|訂製|訂做|製作|制作|custom|printing|print/gi;
function lcsCJK(a, b) {
  const clean = (s) => (s.replace(GENERIC, ' ').match(/[一-鿿ぁ-んァ-ヶー]/g) || []).join('');
  const ca = clean(a), cb = clean(b);
  if (!ca || !cb) return 0;
  let best = 0;
  const dp = Array.from({ length: ca.length + 1 }, () => new Array(cb.length + 1).fill(0));
  for (let i = 1; i <= ca.length; i++) for (let j = 1; j <= cb.length; j++) {
    dp[i][j] = ca[i - 1] === cb[j - 1] ? dp[i - 1][j - 1] + 1 : 0;
    if (dp[i][j] > best) best = dp[i][j];
  }
  return best;
}
function latinDup(a, b) {
  const wa = (a.toLowerCase().match(/[a-z]{4,}/g) || []);
  const wb = (b.toLowerCase().match(/[a-z]{4,}/g) || []);
  return wa.some((x) => wb.some((y) => x.startsWith(y) || y.startsWith(x)));
}
function semDup(query, segs) {
  for (const seg of segs) {
    if (lcsCJK(query, seg) >= 2) return seg;
    if (latinDup(query, seg)) return seg;
  }
  return null;
}
/* 尺寸词旗标: 查询含尺寸数字 (a1/a2/數字+mm 等) → 与产品规格匹配需人工核 */
const SIZE_Q = /\b(a[0-9]|b[0-9])\b|\d+\s*(mm|cm|inch|")/i;

/* ---------- 主流程 ---------- */
const slots = parseSkuSeo().filter((s) => s.title && UNFROZEN.has(s.slug));
const { queries, pages } = loadGsc();

const proposals = [];
for (const s of slots) {
  const brand = BRAND[s.locale];
  const parts = s.title.split(/[|｜]/).map((x) => x.trim());
  const main = parts[0];
  const body = parts.slice(0, -1); // 不含品牌
  const midSegs = body.slice(1);   // 主词外的中段 (含数字钩子段)

  // 同簇实证查询: 同语言 + 包含主词(或主词包含查询且查询>=4字符) + 未出现在现标题
  const titleLow = s.title.toLowerCase();
  const cluster = queries
    .filter((r) => qLang(r.q) === s.locale)
    .filter((r) => {
      const q = r.q.toLowerCase(), m = main.toLowerCase();
      if (titleLow.includes(q)) return false; // 已在标题
      if (q.includes(m)) { r._rel = 'direct'; return true; }
      // 反向: 核心主词包含查询词 (CJK>=2字 / 拉丁>=4字母)
      const mc = m.replace(GENERIC, ' ').replace(/\s+/g, ' ').trim();
      if (mc && mc.includes(q) && (CJK.test(q) ? q.replace(/\s/g, '').length >= 2 : q.length >= 4)) { r._rel = 'direct'; return true; }
      const qc = q.replace(GENERIC, ' ').replace(/\s+/g, ' ').trim();
      if (qc && mc && q.includes(mc) && mc.length >= 2) { r._rel = 'direct'; return true; }
      // keywords 池同簇 (弱关联, relation=keyword, 强制人工过目; 排除通用词)
      const GENERIC_KW = /^(印刷|訂製|訂做|製作|制作|custom|printing|print)$/i;
      if (s.keywords.some((k) => !GENERIC_KW.test(k) && (CJK.test(k) ? k.length >= 2 : k.length >= 3) && q.includes(k.toLowerCase()) && k.toLowerCase() !== m)) { r._rel = 'keyword'; return true; }
      return false;
    })
    .filter((r) => r.imps >= 3 && r.pos !== null && r.pos > 10) // 冲刺区: 未进前10才有提升空间
    .filter((r) => !semDup(r.q, [main])) // G7: 与主词语义重复的查询不带新增量
    .sort((a, b) => b.imps - a.imps || a.pos - b.pos);

  if (cluster.length === 0) continue;
  const page = pages.get(pageKey(s.locale, s.slug)) || { imps: 0, pos: null, clicks: 0 };

  // 中段可替换段 = 无数字 且 无 GSC 查询命中 的最弱段
  const segHasQuery = (seg) => queries.some((r) => qLang(r.q) === s.locale && (r.q.toLowerCase().includes(seg.toLowerCase()) || seg.toLowerCase().includes(r.q.toLowerCase())));
  const replaceable = midSegs.filter((seg) => !/\d/.test(seg) && !segHasQuery(seg) && seg !== brand);

  const cands = [];
  const top = cluster[0];
  const topText = top.q.replace(/^\w/, (c) => c.toUpperCase());
  const sizeFlag = SIZE_Q.test(top.q);
  const mkCand = (variant, nb, swap, q, keptSegs) => {
    const cand = [...nb, brand].join(' | ');
    const dupVs = semDup(q, keptSegs);
    const g = gates(s, cand);
    if (dupVs) { g.gates.push('G7_与保留段重复'); g.pass = false; }
    return { variant, cand, swap, sizeFlag, ...g };
  };
  // 变体 A: 替换最弱中段
  if (replaceable.length > 0) {
    const victim = replaceable[replaceable.length - 1];
    const nb = body.map((seg) => (seg === victim ? topText : seg));
    cands.push(mkCand('A_换中段', nb, `${victim} → ${topText}`, top.q, body.slice(1).filter((seg) => seg !== victim)));
  }
  // 变体 B: 主词后插入 (若当量允许)
  {
    const nb = [body[0], topText, ...body.slice(1)];
    cands.push(mkCand('B_插入', nb, `+ ${topText}`, top.q, body.slice(1)));
  }
  // 变体 C: 双词版 (top2 都上)
  if (cluster.length >= 2 && replaceable.length >= 2) {
    const t2 = cluster[1].q.replace(/^\w/, (c) => c.toUpperCase());
    if (!semDup(cluster[1].q, [main, top.q])) {
      const v1 = replaceable[replaceable.length - 1], v2 = replaceable[replaceable.length - 2];
      const nb = body.map((seg) => (seg === v1 ? topText : seg === v2 ? t2 : seg));
      cands.push(mkCand('C_双词', nb, `${v2}+${v1} → ${topText}+${t2}`, top.q, body.slice(1).filter((seg) => seg !== v1 && seg !== v2)));
    }
  }
  // 变体 D: 换最弱段 + 丢次弱段 (P0-A 紧缩救档, 现标题已 50-57 时腾位置)
  {
    const aPass = cands.some((c) => c.pass);
    if (!aPass && replaceable.length >= 2) {
      const v1 = replaceable[replaceable.length - 1], v2 = replaceable[replaceable.length - 2];
      const nb = body.filter((seg) => seg !== v2).map((seg) => (seg === v1 ? topText : seg));
      cands.push(mkCand('D_换+丢', nb, `${v1} → ${topText}, 丢 ${v2}`, top.q, body.slice(1).filter((seg) => seg !== v1 && seg !== v2)));
    }
  }

  const tier = page.pos !== null && page.pos <= 20 && page.imps >= 30 ? 'P0-A' : page.imps >= 10 ? 'P0-B' : 'P1';
  proposals.push({
    slug: s.slug, locale: s.locale, tier,
    relation: top._rel || 'direct',
    needsHuman: (top._rel || 'direct') === 'keyword' || sizeFlag,
    curTitle: s.title, curEquiv: equiv(s.title),
    page, cluster: cluster.slice(0, 5),
    candidates: cands,
  });
}

// 排序: P0-A > P0-B > P1, 同档按 page imps
const rank = { 'P0-A': 0, 'P0-B': 1, P1: 2 };
proposals.sort((a, b) => rank[a.tier] - rank[b.tier] || (b.page.imps || 0) - (a.page.imps || 0));

const flat = [];
for (const p of proposals) for (const c of p.candidates) flat.push({ ...p, ...c });
const passed = flat.filter((f) => f.pass);
const withPass = proposals.filter((p) => p.candidates.some((c) => c.pass));

fs.writeFileSync(
  path.join(ROOT, `.hermes/reports/title-flywheel-r2-proposals-${TODAY}.json`),
  JSON.stringify({
    generatedFor: TODAY,
    round: 'r2 带钱词优化 (K3 2026-09-21 指令 + 解冻拍板)',
    rule: `equiv ${TITLE_MIN}-${TITLE_MAX}; 冻结避让 21 slug; 主词不改; 中段仅换 GSC 实证同簇查询`,
    frozenSlugs: [...FROZEN],
    slotCount: slots.length, proposedSlots: proposals.length, passSlots: withPass.length,
    proposals,
  }, null, 1),
  'utf8'
);

let md = `# 标题飞轮 R2 带钱词候选 — ${TODAY}\n\n`;
md += `> 口径: 当量 ${TITLE_MIN}-${TITLE_MAX} · 冻结 21 slug 避让 · 主词不改 · 中段仅换 GSC 28d 实证同簇查询 (未进前10才有提升空间) · 数字钩子段不动\n`;
md += `> 关键词词库说明: 02-关键词词库.csv 仅 en/category 47 条适用于消费者标题 (intent/tender 为 B2B 获客 scraping 词; zh-hk/ja 无行), 本轮主证据 = GSC 查询表\n\n`;
md += `**解冻槽**: ${slots.length} · **有同簇实证词**: ${proposals.length} · **有全闸门通过候选**: ${withPass.length}\n\n`;
md += `| # | 档 | 关联 | slug | locale | 页 imps | 页 pos | 现标题 | 候选 | 当量 | 换词 | 需人工 | 闸门 |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
flat.forEach((f, i) => {
  const gateStr = f.pass ? '✅' : '🔴 ' + (f.gates || []).join(',');
  const hu = f.needsHuman ? '🖐' : '';
  md += `| ${i + 1} | ${f.tier} | ${f.relation} | ${f.slug} | ${f.locale} | ${f.page.imps} | ${f.page.pos ?? '-'} | ${f.curTitle} | ${f.cand} | ${f.e} | ${f.swap} | ${hu} | ${gateStr} |\n`;
});
fs.writeFileSync(path.join(ROOT, `.hermes/reports/title-flywheel-r2-proposals-${TODAY}.md`), md, 'utf8');

console.log(`slots=${slots.length} proposed=${proposals.length} pass=${withPass.length} flat=${flat.length} passedCands=${passed.length}`);
console.log(`tier P0-A=${proposals.filter((p) => p.tier === 'P0-A').length} P0-B=${proposals.filter((p) => p.tier === 'P0-B').length} P1=${proposals.filter((p) => p.tier === 'P1').length}`);
