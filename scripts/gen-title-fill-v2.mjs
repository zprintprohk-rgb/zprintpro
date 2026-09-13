#!/usr/bin/env node
/**
 * scripts/gen-title-fill-v2.mjs — T2-1b 标题对齐 (按 K3 2026-09-13 口径重做)
 *
 * 依据:
 *   · 角色/权限: docs/2026-09-10-autoclaw-executor-v1.2.md (执行层 v1.2, 两级决策权: 执行层自主落地)
 *   · 规则: docs/2026-09-09-k3-title-rule-v4-write-full.md + docs/2026-09-08-title-rules-and-deep-blog-standard.md
 *   · 补词来源: 重要文件/money-keyword-map-20260905.md (**只从这里取词**)
 *   · 字符数: **尽可能 ≤58 半角当量, 非硬规则** (K3 2026-09-13)
 *
 * 算法: 主词前置(保留原主词) + 数字钩子(原样保留) + 品牌末尾一次 + 用该 SKU 所属类目的带钱词按优先级补足,
 *       贪心加到「≤58 且尽量接近 58」; 超 58 时从「非主词 / 非品牌 / 非数字」的尾段开始裁。
 * 输出: docs/2026-09-13-title-batch-T2-1b-proposals.md (逐条 before/after + 当量 + 取自哪个带钱词)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const equiv = (s) => { let n = 0; for (const ch of s) n += ch.charCodeAt(0) > 127 ? 2 : 1; return n; };
const MONEY = [
  'F:\\zprintpro-nextjs\\重要文件\\money-keyword-map-20260905.md',
  join(ROOT, 'docs/2026-09-08-money-keyword-map-v4.2-consolidated.md'),
].find(p => existsSync(p));
if (!MONEY) { console.error('未找到带钱词地图'); process.exit(1); }

// ---------- 1) 解析带钱词地图 ----------
const rows = [];
for (const line of readFileSync(MONEY, 'utf8').split(/\r?\n/)) {
  if (!line.trim().startsWith('|')) continue;
  const c = line.split('|').map(x => x.trim());
  if (c.length < 11) continue;
  const kw = c[1], market = c[2], pos = parseFloat(c[3]), imps = parseInt(c[4], 10), score = parseFloat(c[7]);
  const landing = c[8] || '';
  if (!kw || Number.isNaN(imps) || /^[-:]+$/.test(kw) || kw === '关键词') continue;
  rows.push({ kw, market, pos, imps, score: Number.isNaN(score) ? 0 : score, landing });
}
const hkRows = rows.filter(r => r.market === 'zh-hk').sort((a, b) => b.score - a.score || b.imps - a.imps);
console.log(`带钱词地图: ${MONEY}`);
console.log(`解析 ${rows.length} 条 (zh-hk ${hkRows.length}) | Top5: ${hkRows.slice(0, 5).map(r => `${r.kw}(${r.score})`).join(', ')}`);

// 类目词池: landing page 形如 /zh-hk/category/xxx
const byCat = {};
for (const r of hkRows) {
  const m = r.landing.match(/category\/([a-z-]+)/);
  if (!m) continue;
  (byCat[m[1]] = byCat[m[1]] || []).push(r);
}
// 类目名 -> slug 近似映射 (products.ts 用 category_slug)
console.log('地图覆盖类目:', Object.keys(byCat).join(', '));

// ---------- 2) 读 products.ts 目标 title ----------
const prod = readFileSync(join(ROOT, 'src/data/products.ts'), 'utf8').split(/\r?\n/);
const targets = [];
let slug = null, cat = null;
for (let i = 0; i < prod.length; i++) {
  const s = prod[i].match(/^\s*slug:\s*'([a-z0-9-]+)'/); if (s) slug = s[1];
  const c = prod[i].match(/^\s*category_slug:\s*'([a-z0-9-]+)'/); if (c) cat = c[1];
  const t = prod[i].match(/title_zh:\s*'([^']{5,300})'/);
  if (!t) continue;
  const title = t[1];
  targets.push({ line: i + 1, slug, cat, title, e: equiv(title) });
}
console.log(`products.ts title_zh 共 ${targets.length} 条; 需对齐 (<50 或 >58): ${targets.filter(t => t.e < 50 || t.e > 58).length}`);

// ---------- 3) 组稿 ----------
const BRAND = /智印港|ZprintPro|ジープリント/;
const hasNumber = (s) => /\d/.test(s);
const out = [];
for (const t of targets) {
  if (t.e >= 50 && t.e <= 58) continue;
  const segs = t.title.split(/\s*[·|]\s*/);
  const brandSeg = segs.find(s => BRAND.test(s)) || '智印港';
  const bodySegs = segs.filter(s => !BRAND.test(s));
  const mainSeg = bodySegs[0] || '';
  const numSegs = bodySegs.slice(1).filter(hasNumber);
  const otherSegs = bodySegs.slice(1).filter(s => !hasNumber(s));
  const pool = (byCat[t.cat] || []).map(r => r.kw).filter(k => !t.title.includes(k));
  let picked = [];
  let cur = [...bodySegs, brandSeg];
  // (a) 超 58: 先丢非数字尾段
  if (equiv(cur.join(' · ')) > 58) {
    const keep = [mainSeg, ...otherSegs.slice(0, Math.max(0, otherSegs.length)), ...numSegs];
    while (keep.length > 1 && equiv([...keep, brandSeg].join(' · ')) > 58) keep.pop();
    cur = [...keep, brandSeg];
  }
  // (b) 不足: 按带钱词优先级补到尽量接近 58
  let i = 0;
  while (equiv([...cur.slice(0, -1), ...picked, brandSeg].join(' · ')) < 58 && i < pool.length) {
    const cand = [...cur.slice(0, -1), ...picked, pool[i], brandSeg];
    if (equiv(cand.join(' · ')) <= 58) picked.push(pool[i]);
    i++;
  }
  const finalSegs = [...cur.slice(0, -1), ...picked, brandSeg];
  const proposal = finalSegs.join(' · ');
  out.push({ ...t, proposal, pe: equiv(proposal), added: picked, source: t.cat && byCat[t.cat] ? 'money-map:category' : 'money-map:none' });
}

// ---------- 4) 输出提案表 ----------
let md = '# T2-1b 提案表 v2（带钱词地图驱动 · 尽可能 ≤58 当量 · 非硬规则）\n\n';
md += `- 角色/权限: \`docs/2026-09-10-autoclaw-executor-v1.2.md\`（执行层 v1.2 两级决策权）\n`;
md += `- 规则: \`docs/2026-09-09-k3-title-rule-v4-write-full.md\` + \`docs/2026-09-08-title-rules-and-deep-blog-standard.md\`\n`;
md += `- 补词来源: **\`重要文件/money-keyword-map-20260905.md\`**（${rows.length} 条，zh-hk ${hkRows.length} 条；按类目 landing page 归池）\n`;
md += `- 字符数: **尽可能 ≤58 半角当量，不作硬规则**（K3 2026-09-13）\n\n`;
md += `共 ${out.length} 条（<50 补足 / >58 收敛）\n\n`;
md += `| # | 行 | slug | 类目 | 原当量 | 提案当量 | 补入带钱词 | 提案 title |\n|---|---|---|---|---|---|---|---|\n`;
out.forEach((r, i) => { md += `| ${i + 1} | L${r.line} | ${r.slug} | ${r.cat || '-'} | ${r.e} | ${r.pe} | ${r.added.join('、') || '—'} | ${r.proposal} |\n`; });
writeFileSync(join(ROOT, 'docs/2026-09-13-title-batch-T2-1b-proposals.md'), md, 'utf8');
console.log(`\n提案 ${out.length} 条 -> docs/2026-09-13-title-batch-T2-1b-proposals.md`);
console.log(`当量分布: ≤58 ${out.filter(r => r.pe <= 58).length} / >58 ${out.filter(r => r.pe > 58).length} / ≥50 ${out.filter(r => r.pe >= 50).length}`);
out.slice(0, 15).forEach(r => console.log(`  L${r.line} ${r.e}→${r.pe} [${(r.added || []).join(',')}] ${r.proposal.slice(0, 80)}`));
