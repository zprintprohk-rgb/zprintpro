#!/usr/bin/env node
/**
 * scripts/fix-title-batch-T2-1.mjs — T2 第 1 批 (K3 2026-09-13 批准: products.ts + seo.ts + schema-extensions.ts + h1-builder.ts + layout.tsx)
 *
 * 处置 (K3 口径):
 *   · 品牌: zh-hk title 内「智印港 ZprintPro」→「智印港」(末尾品牌一次); ja title 内「ジープリント ZprintPro」→「ZprintPro」
 *   · 字符数: 品牌修正后按**半角当量**对齐 —— 上限 **58**(K3 2026-09-13: 「更新到 58 字符数内就可以, 标题的字符数很宝贵」),
 *             低于 50 则用该 SKU 自身的长尾词补足 (不新增任何未经证实的数据/承诺)
 *   · 简体字: 「行业」→「行業」(§0.29 跨语言污染零容忍; 线上 zh-hk 页实测 12 处来自 products.ts)
 * 仅动 title / alt / og / twitter 等**展示面字段**; schema-extensions 与 h1-builder 经复核**属误报**(locale 三元正确 / JSDoc 注释), 不动。
 *
 * §12 三件套 + T 批配套(回滚映射 before/after 片段 + 探针清单)。
 * 用法: node scripts/fix-title-batch-T2-1.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const TS = new Date().toISOString().replace(/[:.]/g, '-');
const equiv = (s) => { let n = 0; for (const ch of s) n += ch.charCodeAt(0) > 127 ? 2 : 1; return n; };
const errs = [], edits = [], rollback = [], probe = [], under50 = [], over58 = [];

/* ---------- products.ts: title_zh 品牌 + 字符数 + 简体字 ---------- */
{
  const rel = 'src/data/products.ts';
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const lines = raw.split(/\r?\n/);
  let brandFixed = 0, trimmed = 0, filled = 0, simpFixed = 0;

  const out = lines.map((line, idx) => {
    let next = line;
    // (a) 简体字
    const s0 = (next.match(/行业/g) || []).length;
    if (s0) { next = next.split('行业').join('行業'); simpFixed += s0; }

    // (b) title_zh 品牌与字符数
    const m = next.match(/title_zh:\s*'([^']{5,300})'/);
    if (!m) return next;
    const old = m[1];
    let t = old.replace(/智印港\s*ZprintPro/g, '智印港').replace(/ZprintPro\s*智印港/g, '智印港');
    if (t !== old) brandFixed++;
    // 字符数对齐: **本批不做盲目裁剪**
    //   2026-09-13 决策: 朴素「从尾部丢段」会先丢掉品牌后缀与 GSC 长尾 (实测把 4 条 title 的品牌丢了、把 86 当量砍到 43),
    //   属破坏性操作 -> 超 58 当量的 title 与低于 50 的 title 都列入 **T2-1b 逐条编辑子批**(需人工过目关键词取舍),
    //   本批只做「品牌归位 + 简体字」这两件零判断风险的事。
    let e = equiv(t);
    if (e > 58) over58.push({ line: idx + 1, e, t });
    if (e < 50) under50.push({ line: idx + 1, e, t });
    if (t !== old) {
      rollback.push({ file: rel, line: idx + 1, beforeSnippet: old.slice(0, 120), afterSnippet: t.slice(0, 120) });
      if (DRY) console.log(`   L${idx + 1}: ${equiv(old)} → ${equiv(t)} 当量\n      − ${old}\n      + ${t}`);
      const i = next.indexOf(`'${old}'`);
      next = next.slice(0, i) + `'${t}'` + next.slice(i + old.length + 2);
    }
    if (e < 50) under50.push({ line: idx + 1, e, t });
    return next;
  });
  console.log(`[${rel}] title 品牌修正 ${brandFixed} / 简体字 ${simpFixed} | 待 T2-1b 逐条编辑: 超58 ${over58.length} 条 / 低50 ${under50.length} 条`);
  if (under50.length) {
    console.log(`   ⚠️ 当量 <50 (需补长尾, T2-1b):`);
    under50.slice(0, 8).forEach(u => console.log(`      L${u.line} 当量 ${u.e} :: ${u.t.slice(0, 66)}`));
  }
  if (over58.length) {
    console.log(`   ⚠️ 当量 >58 (需裁到 <=58, 且必须保品牌末尾, T2-1b):`);
    over58.slice(0, 8).forEach(u => console.log(`      L${u.line} 当量 ${u.e} :: ${u.t.slice(0, 66)}`));
  }
  edits.push({ rel, content: out.join(eol) });
}

/* ---------- seo.ts: 首页 title + 报价页 title ---------- */
{
  const rel = 'src/lib/seo.ts';
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let next = raw, n = 0;
  const pairs = [
    ["title: '智印港 ZprintPro | 香港印刷公司 | 急件印刷·即日交貨 | 貼紙/單張/包裝盒印刷'",
     "title: '智印港 | 香港印刷公司 | 急件印刷·即日交貨 | 貼紙/單張/包裝盒'"],
    ["'zh-hk': '即時報價 | 智印港 ZprintPro'", "'zh-hk': '即時報價 | 智印港'"],
  ];
  for (const [from, to] of pairs) {
    const c = next.split(from).length - 1;
    if (c !== 1) errs.push(`${rel} 计数断言失败: 「${from.slice(0, 40)}…」= ${c} (期望 1)`);
    next = next.split(from).join(to);
    if (next.includes(from)) errs.push(`${rel} 形状断言失败: 仍残留`);
    rollback.push({ file: rel, beforeSnippet: from.slice(0, 120), afterSnippet: to.slice(0, 120) });
    n++;
  }
  console.log(`[${rel}] 修正 ${n} 处 title`);
  edits.push({ rel, content: next });
}

/* ---------- layout.tsx: og / twitter title (zh-hk 与 ja) ---------- */
{
  const rel = 'src/app/[locale]/layout.tsx';
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let next = raw, n = 0;
  const pairs = [
    ["ogTitle: '智印港 ZprintPro | 香港印刷服務 — 全球 72 小時交貨'", "ogTitle: '智印港 | 香港印刷服務 — 全球 72 小時交貨'"],
    ["twitterTitle: '智印港 ZprintPro | 香港印刷服務'", "twitterTitle: '智印港 | 香港印刷服務'"],
    ["ogTitle: 'ジープリント ZprintPro | 印刷サービス — グローバル 72 時間配送'", "ogTitle: 'ZprintPro | 印刷サービス — グローバル 72 時間配送'"],
    ["twitterTitle: 'ジープリント ZprintPro | 印刷サービス'", "twitterTitle: 'ZprintPro | 印刷サービス'"],
  ];
  for (const [from, to] of pairs) {
    const c = next.split(from).length - 1;
    if (c !== 1) errs.push(`${rel} 计数断言失败: 「${from.slice(0, 36)}…」= ${c} (期望 1)`);
    next = next.split(from).join(to);
    if (next.includes(from)) errs.push(`${rel} 形状断言失败: 仍残留`);
    rollback.push({ file: rel, beforeSnippet: from.slice(0, 120), afterSnippet: to.slice(0, 120) });
    n++;
  }
  console.log(`[${rel}] 修正 ${n} 处 og/twitter title`);
  edits.push({ rel, content: next });
}

/* ---------- 后置断言 ---------- */
for (const e of edits) {
  if (e.rel.endsWith('products.ts')) {
    const hits = (e.content.match(/title_zh:\s*'[^']*智印港\s*ZprintPro/g) || []).length;
    if (hits) errs.push(`${e.rel} 形状断言失败: title_zh 仍含双品牌 ×${hits}`);
    if (/title_zh:\s*'[^']*行业/.test(e.content)) errs.push(`${e.rel} 形状断言失败: title_zh 仍含简体「行业」`);
  }
  if (e.rel.endsWith('seo.ts') || e.rel.endsWith('layout.tsx')) {
    for (const bad of ['智印港 ZprintPro', 'ジープリント ZprintPro']) {
      // 允许历史注释里出现
      const lines = e.content.split(/\r?\n/).filter(l => l.includes(bad) && !/^\s*(\/\/|\*)/.test(l));
      if (lines.length) errs.push(`${e.rel} 形状断言失败: 仍含「${bad}」×${lines.length} (非注释): ${lines[0].trim().slice(0, 70)}`);
    }
  }
}
if (errs.length) { console.error('\n[FAIL] 断言未过, 未写盘:'); errs.forEach(x => console.error('  - ' + x)); process.exit(1); }
console.log(`\n[断言通过] 回滚映射 ${rollback.length} 点`);
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

const BK = `.hermes/backup-title-T2-1-${TS}`;
mkdirSync(join(ROOT, BK), { recursive: true });
for (const e of edits) copyFileSync(join(ROOT, e.rel), join(ROOT, BK, e.rel.split('/').pop()));
writeFileSync(join(ROOT, `.hermes/rollback-T2-1-${TS}.json`), JSON.stringify({ at: TS, items: rollback }, null, 1), 'utf8');
for (const e of edits) writeFileSync(join(ROOT, e.rel), e.content, 'utf8');
console.log(`[备份] → ${BK}\n[回滚] .hermes/rollback-T2-1-${TS}.json (${rollback.length} 点)`);
