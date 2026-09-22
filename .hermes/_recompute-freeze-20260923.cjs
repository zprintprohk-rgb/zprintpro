// K3 2026-09-23 拍板: 「只有排名进前10的SKU,并且是有点击的情况下，SKU标题才冻结，不满足这个要求的全部解冻」
// 重算冻结集: slug 任一 locale 主词（标题首段）在 GSC 28d 查询表存在「完整包含主词」且 排名<=10 且 点击>0 的查询 → 冻结
// 数据源: .hermes/gsc-2026-09-18/extract.json new.combo_28d['查询数'] (1000 行, 品牌词排除)
// 主词兜底: 2026-09-21 repartition 的 per[locale].core（去掉通用后缀的主词）
const fs = require('fs');
const path = require('path');

const ROOT = 'F:/zprintpro-nextjs';
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const LOCALES = ['zh-hk', 'en', 'ja'];

// 1) 解析 sku-seo-data.ts 当前活 title（复用 census 锚点口径）
const txt = read('src/data/sku-seo-data.ts');
const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: txt.length });
const skuTitles = {};
for (let i = 0; i < starts.length - 1; i++) {
  const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
  if (!seg.includes('"seo"')) continue;
  const slug = starts[i].slug;
  skuTitles[slug] = {};
  for (const loc of LOCALES) {
    const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    skuTitles[slug][loc] = m ? m[1].replace(/\\"/g, '"') : null;
  }
}
console.log('live slugs:', Object.keys(skuTitles).length);

// 2) 旧 repartition 的 per-locale core（2026-09-21 口径，作主词兜底）
const old = JSON.parse(read('.hermes/reports/freeze-repartition-2026-09-21.json'));
const oldCore = {};
for (const d of old.detail || []) {
  oldCore[d.slug] = {};
  for (const loc of LOCALES) oldCore[d.slug][loc] = d.per?.[loc]?.core || null;
}

// 3) GSC 28d 查询表
const g = JSON.parse(read('.hermes/gsc-2026-09-18/extract.json'));
const queries = g.new.combo_28d['查询数'];
const BRAND_RE = /智印港|ZprintPro|zprintpro|ジープリント/i;

function mainWord(title) {
  if (!title) return null;
  const seg = title.split(/[|｜]/)[0].trim();
  return seg || null;
}

const detail = [];
const frozenSlugs = [];
const unfrozenSlugs = [];
for (const slug of Object.keys(skuTitles)) {
  let slugBest = null, slugHit = null, slugClicks = 0, slugTop10Click = false;
  const per = {};
  for (const loc of LOCALES) {
    const t = skuTitles[slug][loc];
    const main = mainWord(t);
    const core = oldCore[slug]?.[loc] || null;
    const cands = [main, core].filter(Boolean);
    // 去重 + 去「印刷/printing」类后缀变体过长问题: 保持原样做包含匹配即可
    const uniq = [...new Set(cands)];
    let best = null, hit = null, clicks = 0, top10Click = false;
    const qualifiers = [];
    for (const q of queries) {
      const qn = q['热门查询'];
      if (!qn || BRAND_RE.test(qn)) continue;
      const matched = uniq.some((c) => qn.includes(c));
      if (!matched) continue;
      const pos = q['排名'];
      const clk = q['点击次数'] || 0;
      if (best == null || pos < best) { best = pos; hit = qn; clicks = clk; }
      if (pos <= 10 && clk > 0) {
        top10Click = true;
        qualifiers.push({ query: qn, pos, clicks: clk, imps: q['展示'] || 0 });
      }
    }
    per[loc] = { main, core, best, hit, clicks, top10Click, qualifiers };
    if (best != null && (slugBest == null || best < slugBest)) { slugBest = best; slugHit = hit; slugClicks = clicks; }
    if (top10Click) slugTop10Click = true;
  }
  const frozen = slugTop10Click;
  (frozen ? frozenSlugs : unfrozenSlugs).push(slug);
  detail.push({ slug, slugBest, slugHit, slugClicks, frozen, per });
}

frozenSlugs.sort();
unfrozenSlugs.sort();
const out = {
  rule: 'K3 2026-09-23: slug 任一 locale 主词在 GSC 28d 查询表存在「完整包含主词」且 排名<=10 且 点击>0 → 冻结; 其余全部解冻',
  source: '.hermes/gsc-2026-09-18/extract.json new.combo_28d 查询数 (1000 行, 品牌词排除)',
  generatedAt: '2026-09-23',
  frozenCount: frozenSlugs.length,
  unfrozenCount: unfrozenSlugs.length,
  frozenSlugs,
  unfrozenSlugs,
  detail,
};
fs.writeFileSync(path.join(ROOT, '.hermes/reports/freeze-repartition-2026-09-23.json'), JSON.stringify(out, null, 1));
console.log('FROZEN (' + frozenSlugs.length + '):', frozenSlugs.join(', '));
console.log('UNFROZEN (' + unfrozenSlugs.length + '):', unfrozenSlugs.join(', '));
