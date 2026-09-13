#!/usr/bin/env node
/**
 * scripts/fix-title-batch-T2-1b.mjs — T2-1b: products.ts 标题对齐 (带钱词地图驱动)
 *
 * 依据 (K3 2026-09-13):
 *   · 角色/权限: docs/2026-09-10-autoclaw-executor-v1.2.md (执行层 v1.2 两级决策权 → 执行层自主落地)
 *   · 规则: docs/2026-09-09-k3-title-rule-v4-write-full.md + docs/2026-09-08-title-rules-and-deep-blog-standard.md
 *   · 补词来源: 重要文件/money-keyword-map-20260905.md (**只从此文件取词**, 不编造)
 *   · 字符数: 尽可能 ≤58 半角当量, **非硬规则**
 *
 * 组稿: 主词前置(保留) + 数字钩子(保留) + 品牌末尾**恰好一次** + 带钱词按优先级补足至「≤58 且尽量接近」
 *       >58 时先丢「非主词/非数字/非品牌」尾段, 直到 ≤58 (保证收敛)
 * 断言: ① 品牌末尾一次 ② 新增段必须能在带钱词地图里找到 ③ 当量 ≤58 (能收敛时) ④ TS 改动仅限 title_zh 行
 * §12 三件套 + T 批配套(回滚映射 + 备份 + 探针清单)
 * 用法: node scripts/fix-title-batch-T2-1b.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const TS = new Date().toISOString().replace(/[:.]/g, '-');
const equiv = (s) => { let n = 0; for (const ch of s) n += ch.charCodeAt(0) > 127 ? 2 : 1; return n; };
const BRAND = '智印港';

// ---- 带钱词地图 ----
const MONEY = ['F:\\zprintpro-nextjs\\重要文件\\money-keyword-map-20260905.md'].find(p => existsSync(p));
if (!MONEY) { console.error('[FAIL] 找不到带钱词地图'); process.exit(1); }
const moneyRows = [];
for (const line of readFileSync(MONEY, 'utf8').split(/\r?\n/)) {
  if (!line.trim().startsWith('|')) continue;
  const c = line.split('|').map(x => x.trim());
  if (c.length < 10) continue;
  const kw = c[1], market = c[2], imps = parseInt(c[4], 10), score = parseFloat(c[7]), landing = c[8] || '';
  if (!kw || Number.isNaN(imps) || /^[-:]+$/.test(kw) || kw === '关键词') continue;
  moneyRows.push({ kw, market, imps, score: Number.isNaN(score) ? 0 : score, landing });
}
const hk = moneyRows.filter(r => r.market === 'zh-hk').sort((a, b) => b.score - a.score || b.imps - a.imps);
const byCat = {};
for (const r of hk) { const m = r.landing.match(/category\/([a-z-]+)/); if (m) (byCat[m[1]] = byCat[m[1]] || []).push(r.kw); }
const MONEY_SET = new Set(hk.map(r => r.kw));
console.log(`带钱词地图: ${hk.length} 条 zh-hk | 类目池: ${Object.keys(byCat).length}`);

// ---- 组稿 ----
const compose = (title, cat) => {
  const segs = title.split(/\s*[·|]\s*/).filter(Boolean);
  const brandSegs = segs.filter(s => /智印港|ZprintPro|ジープリント/.test(s));
  let body = segs.filter(s => !/智印港|ZprintPro|ジープリント/.test(s));
  if (!body.length) return { proposal: title, added: [] };
  const main = body[0];
  const rest = body.slice(1);
  const nums = rest.filter(s => /\d/.test(s));
  const others = rest.filter(s => !/\d/.test(s));
  // 收敛到 <=58: 先丢 others 尾段, 再丢 nums 尾段 (主词与品牌永不留失)
  let keep = [main, ...others, ...nums];
  const build = (k, extra = []) => [...k, ...extra, BRAND].join(' · ');
  while (keep.length > 1 && equiv(build(keep)) > 58) keep.pop();
  // 主词单独就超 58 时: 在主词内按 — / ，分隔裁剪 (保主词主干)
  if (keep.length === 1 && equiv(build(keep)) > 58) {
    const sub = keep[0].split(/\s*[—–]\s*|\s*\/\s*|，/).filter(Boolean);
    while (sub.length > 1 && equiv(build([sub.join(' / ')])) > 58) sub.pop();
    keep = [sub.join(' / ')];
  }
  const added = [];
  const pool = (byCat[cat] || []).filter(k => !title.includes(k) && !added.includes(k));
  let i = 0;
  while (equiv(build(keep, added)) < 58 && i < pool.length) {
    const cand = [...keep, ...added, pool[i], BRAND].join(' · ');
    if (equiv(cand) <= 58) added.push(pool[i]);
    i++;
  }
  return { proposal: build(keep, added), added };
};

// ---- 目标 ----
const rel = 'src/data/products.ts';
const raw = readFileSync(join(ROOT, rel), 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);
const errs = [], rollback = [], probe = [];
let changed = 0, le58 = 0, ge50 = 0;
let slug = null, cat = null;
const out = lines.map((line, idx) => {
  const s = line.match(/^\s*slug:\s*'([a-z0-9-]+)'/); if (s) slug = s[1];
  const c = line.match(/^\s*category_slug:\s*'([a-z0-9-]+)'/); if (c) cat = c[1];
  const t = line.match(/title_zh:\s*'([^']{5,300})'/);
  if (!t) return line;
  const old = t[1];
  const e0 = equiv(old);
  if (e0 >= 50 && e0 <= 58) return line;                 // 已在目标区, 不动
  const { proposal, added } = compose(old, cat);
  if (proposal === old) return line;
  // 断言
  const brandCount = (proposal.match(/智印港/g) || []).length;
  if (brandCount !== 1) errs.push(`L${idx + 1} 断言失败: 品牌出现 ${brandCount} 次 (期望 1)`);
  if (!proposal.trim().endsWith(BRAND)) errs.push(`L${idx + 1} 断言失败: 品牌未在末尾`);
  for (const a of added) if (!MONEY_SET.has(a)) errs.push(`L${idx + 1} 断言失败: 补入词「${a}」不在带钱词地图内`);
  const e1 = equiv(proposal);
  // 58 是「尽可能」而非硬规则 (K3 2026-09-13): 无法再裁 (主词主干已到极限) 时记 warning, 不阻断
  if (e1 > 58) {
    const droppable = keep.length > 1;
    if (droppable) errs.push(`L${idx + 1} 断言失败: 当量 ${e1} > 58 且仍有可裁段 (应继续收敛)`);
    else console.log(`  ⚠️ L${idx + 1} 当量 ${e1} > 58: 主词主干已达极限, 按「非硬规则」保留`);
  }
  if (e1 < e0 && !added.length && e1 < 50) console.log(`  ℹ️ L${idx + 1} 收敛后 ${e1} 当量 (该类目无可用带钱词, 按「尽可能」保留)`);
  changed++; if (e1 <= 58) le58++; if (e1 >= 50) ge50++;
  rollback.push({ file: rel, line: idx + 1, slug, beforeSnippet: old.slice(0, 140), afterSnippet: proposal.slice(0, 140), e0, e1, added });
  if (slug) probe.push({ slug, url: `https://zprintpro.com/zh-hk/product/${slug}` });
  const i = line.indexOf(`'${old}'`);
  if (DRY) console.log(`  L${idx + 1} ${e0}→${e1} [${added.join(',') || '-'}] ${proposal.slice(0, 86)}`);
  return line.slice(0, i) + `'${proposal}'` + line.slice(i + old.length + 2);
});

console.log(`\n目标: 改动 ${changed} 条 | ≤58 当量 ${le58} | ≥50 当量 ${ge50} | 探针 ${probe.length} URL`);
if (errs.length) { console.error('\n[FAIL] 断言未过, 未写盘:'); errs.slice(0, 20).forEach(e => console.error('  - ' + e)); process.exit(1); }
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }
const BK = `.hermes/backup-title-T2-1b-${TS}`;
mkdirSync(join(ROOT, BK), { recursive: true });
copyFileSync(join(ROOT, rel), join(ROOT, BK, 'products.ts'));
writeFileSync(join(ROOT, `.hermes/rollback-T2-1b-${TS}.json`), JSON.stringify({ at: TS, moneyMap: MONEY, items: rollback }, null, 1), 'utf8');
writeFileSync(join(ROOT, `.hermes/probe-T2-1b-${TS}.json`), JSON.stringify({ at: TS, targets: probe }, null, 1), 'utf8');
writeFileSync(join(ROOT, rel), out.join(eol), 'utf8');
console.log(`[备份] → ${BK}\n[回滚] .hermes/rollback-T2-1b-${TS}.json (${rollback.length} 点)\n[探针] .hermes/probe-T2-1b-${TS}.json (${probe.length} URL)`);
