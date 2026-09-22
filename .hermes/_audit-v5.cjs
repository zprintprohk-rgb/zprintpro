// v5 全量标题审计 (只读) — K3 2026-09-23 v5 规则
// 输出 .hermes/reports/v5-title-audit-2026-09-23.json/.md
const fs = require('fs');
const path = require('path');
const ROOT = 'F:/zprintpro-nextjs';
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const { equiv, band } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');

const LOCALES = ['zh-hk', 'en', 'ja'];
const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };

// ---------- 1. sku-seo-data.ts ----------
const txt = read('src/data/sku-seo-data.ts');
const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: txt.length });
const slots = [];
for (let i = 0; i < starts.length - 1; i++) {
  const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
  if (!seg.includes('"seo"')) continue;
  const slug = starts[i].slug;
  for (const loc of LOCALES) {
    const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    slots.push({ slug, locale: loc, title: m ? m[1].replace(/\\"/g, '"') : null });
  }
}

// ---------- 2. products.ts 真值 ----------
const ptxt = read('src/data/products.ts');
const prod = {};
{
  const slugIdx = [...ptxt.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/g)];
  for (let i = 0; i < slugIdx.length; i++) {
    const slug = slugIdx[i][1];
    const start = slugIdx[i].index;
    const end = i + 1 < slugIdx.length ? slugIdx[i + 1].index : ptxt.length;
    const block = ptxt.slice(start, Math.min(end, start + 4000));
    const grab = (key) => {
      const m = block.match(new RegExp(`\\b${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
      return m ? m[1] : undefined;
    };
    const grabNum = (key) => {
      const m = block.match(new RegExp(`\\b${key}:\\s*(\\d+(?:\\.\\d+)?)`));
      return m ? Number(m[1]) : undefined;
    };
    prod[slug] = {
      name: grab('name'),
      nameEn: grab('nameEn'),
      nameJa: grab('nameJa'),
      category_slug: grab('category_slug'),
      basePrice: grabNum('basePrice'),
      basePrice_en: grabNum('basePrice_en'),
      basePrice_ja: grabNum('basePrice_ja'),
      minQuantity: grabNum('minQuantity'),
      unitLabel: grab('unitLabel'),
      turnaround: grab('turnaround'),
    };
  }
}
console.log('products parsed:', Object.keys(prod).length);

// ---------- 3. GSC 页面级 (combo 28d) ----------
const g = JSON.parse(read('.hermes/gsc-2026-09-18/extract.json'));
const pageRows = g.new.combo_28d['网页'] || [];
const pageMap = new Map();
for (const r of pageRows) {
  const u = r['排名靠前的网页'];
  if (!u) continue;
  pageMap.set(u.replace(/\/$/, ''), { imps: r['展示'] || 0, clicks: r['点击次数'] || 0, pos: r['排名'] ?? null, ctr: r['点击率'] || 0 });
}

// ---------- 4. GSC 查询级 (combo 28d, 1000 行) ----------
const queries = g.new.combo_28d['查询数'] || [];
const BRAND_RE = /智印港|ZprintPro|zprintpro|ジープリント/i;
function queryHits(word) {
  if (!word) return [];
  return queries.filter((q) => q['热门查询'] && !BRAND_RE.test(q['热门查询']) && q['热门查询'].includes(word)).map((q) => ({ q: q['热门查询'], pos: q['排名'], clk: q['点击次数'] || 0, imp: q['展示'] || 0 }));
}

// ---------- 5. DELIVERY L0 词库 (en 品类词) ----------
const kwCsv = fs.readFileSync('F:/全球印刷资讯/DELIVERY/02-关键词词库.csv', 'utf8');
const kwEn = kwCsv.split('\n').filter((l) => l.startsWith('en,') && l.includes(',category,')).map((l) => l.split(',')[1].trim());
// 我们品类相关的 en 词 (按类别映射到我们的 8 主品类)
const kwByCat = {};
for (const l of kwCsv.split('\n')) {
  const parts = l.trim().split(',');
  if (parts.length < 4 || parts[0] !== 'en' || parts[2] !== 'category') continue;
  const cat = parts[3].trim();
  (kwByCat[cat] = kwByCat[cat] || []).push(parts[1].trim());
}

// ---------- 6. 窗口/批次标记 ----------
const frozen = new Set(['certificates', 'foil-stickers']); // 新口径 (前10+有点击)
const batch1 = new Set(JSON.parse(read('.hermes/title-verify-window.json')).slots.map((s) => s.slug + '|' + s.locale));
const t1Touched = new Set();
for (const f of ['title-quality-proposals-20260921.json', 'title-quality-proposals-20260921-b31-80.json', 'title-quality-proposals-20260921-b81-130.json', 'title-quality-proposals-20260921-b131-213.json']) {
  const p = JSON.parse(read('.hermes/' + f));
  for (const pr of p.proposals || []) if (pr.title && pr.title !== null) t1Touched.add(pr.slug + '|' + pr.locale);
}
const r2Touched = new Set(['a5-flyers|zh-hk', 'double-sided-flyers|zh-hk']);

// ---------- 7. 结构检查 ----------
const HOOK_RE = {
  'zh-hk': /(起印|起$|起\s|\d+\s*(張|本|個|份|枚|套|條|張起)|HK\$|交貨|交期|截單|打稿|即日|小時|天到貨|DHL)/,
  en: /(MOQ|pcs?|pc|from \$|\$\d|free ship|delivery|days?|hours?|24h|rush|DHL)/i,
  ja: /(〜|枚|本|個|冊|部|セット|¥|納期|即日|時間|日|DHL|無料)/,
};
const EMPTY_WORDS = /香港印刷|印刷專家|品質保證|專業印刷|高品質|high quality|\bbest\b|激安|最高品質|頂級/;
const SIMP = /[订后发记观为价值乐电动净丝举宪获扩据产实当画]/;

function analyze(slot) {
  const t = slot.title || '';
  const e = equiv(t);
  const segs = t.split(/[|｜]/).map((s) => s.trim()).filter(Boolean);
  const brand = BRAND[slot.locale];
  const brandCount = t.split(brand).length - 1;
  const brandAtEnd = segs.length > 0 && segs[segs.length - 1] === brand;
  const main = segs[0] || '';
  const mid = segs.slice(1, -1).join(' | ');
  const hasHook = HOOK_RE[slot.locale].test(t);
  const emptyHits = t.match(EMPTY_WORDS);
  const issues = [];
  if (!t) issues.push('MISSING');
  if (brandCount !== 1) issues.push(`品牌x${brandCount}`);
  if (!brandAtEnd) issues.push('品牌非末尾');
  if (slot.locale === 'zh-hk') {
    // ・(U+30FB) 是中文排版常见分隔符, 不是日文假名污染 (§14-I: dump 真实样本后定口径)
    if (/[\u3040-\u30FF]/.test(t.replace(/\u30FB/g, ''))) issues.push('日文假名');
    if (SIMP.test(t)) issues.push('简体字');
    if (/ZprintPro/.test(t)) issues.push('双品牌');
  } else if (slot.locale === 'en') {
    if (/[\u2E80-\u9FFF\u3040-\u30FF]/.test(t)) issues.push('CJK污染');
  } else {
    if (/份/.test(t)) issues.push('「份」量词');
    // 画 = 日文新字体(畫), 合法; 仅检其余简体字形
    if (SIMP.test(t.replace(/画/g, ''))) issues.push('简体字');
  }
  if (!hasHook) issues.push('无数字钩子');
  if (emptyHits) issues.push(`空洞词:${emptyHits[0]}`);
  if (segs.length < 3) issues.push(`段数少(${segs.length})`);
  // 长尾判定: 中间段是否含可 GSC 实证的词
  const mainHits = queryHits(main);
  let bestMainPos = null, bestMainClicks = 0;
  for (const h of mainHits) { if (bestMainPos == null || h.pos < bestMainPos) bestMainPos = h.pos; bestMainClicks = Math.max(bestMainClicks, h.clk); }
  const page = pageMap.get(`https://zprintpro.com/${slot.locale}/product/${slot.slug}`) || null;
  const p = prod[slot.slug] || {};
  return {
    ...slot,
    equiv: e,
    band: band(t),
    segments: segs,
    main,
    mid,
    hasHook,
    issues,
    gscPage: page,
    mainQuery: { bestPos: bestMainPos, bestClicks: bestMainClicks, hits: mainHits.length },
    truth: {
      minQ: p.minQuantity, unit: p.unitLabel, bp: p.basePrice, bpe: p.basePrice_en, bpj: p.basePrice_ja,
      name: p.name, nameEn: p.nameEn, nameJa: p.nameJa, cat: p.category_slug,
    },
    flags: {
      frozen: frozen.has(slot.slug),
      batch1: batch1.has(slot.slug + '|' + slot.locale),
      t1: t1Touched.has(slot.slug + '|' + slot.locale),
      r2: r2Touched.has(slot.slug + '|' + slot.locale),
    },
  };
}

const rows = slots.map(analyze);
fs.writeFileSync(path.join(ROOT, '.hermes/reports/v5-title-audit-2026-09-23.json'), JSON.stringify(rows, null, 1));

// ---------- 汇总 ----------
const byBand = rows.reduce((m, r) => ((m[r.band] = (m[r.band] || 0) + 1), m), {});
const withIssues = rows.filter((r) => r.issues.length);
const noHook = rows.filter((r) => r.issues.includes('无数字钩子'));
const byIssue = {};
for (const r of withIssues) for (const i of r.issues) byIssue[i] = (byIssue[i] || 0) + 1;

const md = [];
md.push('# v5 SKU 标题全量审计 (2026-09-23)');
md.push('');
md.push('> 规则: `docs/zprintpro-sku-title-rule-v5-2026-09-23.md`（K3 拍板）· 当量带 50-57（58 阻断, title-equiv.js）');
md.push('> 冻结: 新口径（K3 2026-09-23 拍板: 前10+有点击才冻结）= certificates / foil-stickers');
md.push('');
md.push('## 汇总');
md.push(`- 槽位: ${rows.length} (${new Set(rows.map(r=>r.slug)).size} SKU × 3) · 带分布: ${JSON.stringify(byBand)}`);
md.push(`- 有问题的槽位: ${withIssues.length} · 问题分布: ${JSON.stringify(byIssue)}`);
md.push(`- 无数字钩子: ${noHook.length} 槽`);
md.push(`- GSC 页面级有数据: ${rows.filter(r=>r.gscPage).length} 槽`);
md.push('');
md.push('## 问题清单（按 GSC 展示降序）');
md.push('');
md.push('| slug | locale | 当量 | 展示28d | pos | clk | 冻结 | batch1窗 | T1批 | 问题 | title |');
md.push('|---|---|---|---|---|---|---|---|---|---|---|');
const sortable = withIssues.slice().sort((a, b) => (b.gscPage?.imps || 0) - (a.gscPage?.imps || 0));
for (const r of sortable) {
  md.push(`| ${r.slug} | ${r.locale} | ${r.equiv} | ${r.gscPage?.imps ?? '-'} | ${r.gscPage?.pos != null ? r.gscPage.pos.toFixed(1) : '-'} | ${r.gscPage?.clicks ?? '-'} | ${r.flags.frozen ? 'F' : ''} | ${r.flags.batch1 ? 'W' : ''} | ${r.flags.t1 ? 'T1' : ''} | ${r.issues.join('; ')} | ${(r.title || '').replace(/\|/g, '\\|')} |`);
}
md.push('');
md.push('## 无数字钩子清单');
md.push('');
md.push('| slug | locale | 当量 | 展示28d | pos | clk | 冻结 | title |');
md.push('|---|---|---|---|---|---|---|---|');
for (const r of noHook.slice().sort((a, b) => (b.gscPage?.imps || 0) - (a.gscPage?.imps || 0))) {
  md.push(`| ${r.slug} | ${r.locale} | ${r.equiv} | ${r.gscPage?.imps ?? '-'} | ${r.gscPage?.pos != null ? r.gscPage.pos.toFixed(1) : '-'} | ${r.gscPage?.clicks ?? '-'} | ${r.flags.frozen ? 'F' : ''} | ${(r.title || '').replace(/\|/g, '\\|')} |`);
}
fs.writeFileSync(path.join(ROOT, '.hermes/reports/v5-title-audit-2026-09-23.md'), md.join('\n'));
console.log('rows', rows.length, 'issues', withIssues.length, JSON.stringify(byIssue));
console.log('byBand', JSON.stringify(byBand));
console.log('noHook', noHook.length);
console.log('report: .hermes/reports/v5-title-audit-2026-09-23.md');
