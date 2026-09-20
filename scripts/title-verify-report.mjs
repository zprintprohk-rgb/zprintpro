#!/usr/bin/env node
/**
 * scripts/title-verify-report.mjs — 标题飞轮验证窗闭环报告生成器 (2026-09-20)
 *
 * 背景: K3 飞轮指令第四步 — 标题改动后进入 7-10 天只读验证窗, 窗满生成闭环报告:
 *   每槽对比 CTR 变化 / 点击增量 / 位置漂移; 成功模式沉淀回素材库, 失败模式入避坑档案.
 *
 * 用法:
 *   node scripts/title-verify-report.mjs                 # 状态检查 (窗未满则提示剩余天数)
 *   node scripts/title-verify-report.mjs --gsc <extract.json>  # 窗满后喂新 GSC 抽取件, 生成报告
 *
 * 输入: .hermes/title-verify-window.json (tracker, apply 后生成)
 * 输出: .hermes/reports/title-verify-report-<batch>-<date>.md
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const TRACKER = path.join(ROOT, '.hermes/title-verify-window.json');
const gscArgIdx = process.argv.indexOf('--gsc');
const GSC_FILE = gscArgIdx > 0 ? process.argv[gscArgIdx + 1] : null;

if (!fs.existsSync(TRACKER)) { console.error('ABORT: tracker 不存在 (.hermes/title-verify-window.json)'); process.exit(1); }
const T = JSON.parse(fs.readFileSync(TRACKER, 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const end = new Date(T.windowEnd);
const daysLeft = Math.ceil((end - new Date(today)) / 86400000);

if (!GSC_FILE) {
  console.log(`批次: ${T.batch} (${T.appliedDate} 应用, ${T.slots.length} 槽)`);
  console.log(`验证窗: ${T.appliedDate} → ${T.windowEnd} (${T.windowDays} 天只读, churn 是排名杀手)`);
  console.log(daysLeft > 0 ? `⏳ 窗未满, 剩 ${daysLeft} 天. 窗满后: node scripts/title-verify-report.mjs --gsc <新extract.json>` : `✅ 窗已满 (逾期 ${-daysLeft} 天), 请尽快喂 GSC 新数据生成闭环报告`);
  process.exit(0);
}

/* ---- 读新 GSC 抽取件 (与 census 同结构: new.<bucket>.网页) ---- */
const g = JSON.parse(fs.readFileSync(path.resolve(ROOT, GSC_FILE), 'utf8'));
const bags = g?.new || {};
const pageMaps = {};
for (const [bucket, rows] of Object.entries(bags)) {
  if (!rows?.['网页']) continue;
  const m = new Map();
  for (const r of rows['网页']) {
    const u = r['排名靠前的网页'];
    if (u) m.set(u.replace(/\/$/, ''), { clicks: r['点击次数'] ?? 0, imps: r['展示'] ?? 0, pos: r['排名'] ?? null });
  }
  pageMaps[bucket] = m;
}
const pick = (locale, slug) => {
  const key = `https://zprintpro.com/${locale}/product/${slug}`;
  const bucket = locale === 'zh-hk' ? 'hk_28d' : locale === 'ja' ? 'jp_28d' : 'us_28d';
  return pageMaps[bucket]?.get(key) ?? pageMaps['combo_28d']?.get(key) ?? null;
};

/* ---- 逐槽对比 ---- */
const rows = [];
for (const s of T.slots) {
  const now = pick(s.locale, s.slug);
  const base = s.gscBaseline || { clicks: 0, imps: 0, pos: null };
  const bCtr = base.imps ? base.clicks / base.imps : 0;
  const nCtr = now && now.imps ? now.clicks / now.imps : 0;
  rows.push({
    slug: s.slug, locale: s.locale, newTitle: s.newTitle,
    base, now: now || { clicks: 0, imps: 0, pos: null },
    dClicks: (now?.clicks ?? 0) - base.clicks,
    dImps: (now?.imps ?? 0) - base.imps,
    dCtr: nCtr - bCtr,
    dPos: now?.pos != null && base.pos != null ? now.pos - base.pos : null,
  });
}
const wins = rows.filter((r) => r.dClicks > 0);
const losses = rows.filter((r) => r.dClicks < 0);
const flat = rows.filter((r) => r.dClicks === 0);

let md = `# 标题飞轮闭环报告 — ${T.batch} (${today})\n\n`;
md += `验证窗: ${T.appliedDate} → ${T.windowEnd} · GSC 基线: ${T.baselineDate} → 对比: ${T.compareDate || today}\n\n`;
md += `| 指标 | 槽数 |\n|---|---|\n| 点击增量 > 0 | ${wins.length} |\n| 点击增量 = 0 | ${flat.length} |\n| 点击增量 < 0 | ${losses.length} |\n\n`;
md += `| slug | locale | 基线 imps/clicks | 现 imps/clicks | Δ点击 | ΔCTR | Δ位置 |\n|---|---|---|---|---|---|---|\n`;
for (const r of rows) {
  md += `| ${r.slug} | ${r.locale} | ${r.base.imps}/${r.base.clicks} | ${r.now.imps}/${r.now.clicks} | ${r.dClicks >= 0 ? '+' : ''}${r.dClicks} | ${(r.dCtr * 100).toFixed(2)}% | ${r.dPos == null ? '-' : (r.dPos > 0 ? '+' : '') + r.dPos.toFixed(1)} |\n`;
}
md += `\n## 成功模式 (沉淀回 scripts/guards/title-hooks.json)\n\n(待人工归因: 钩子的类型/MOQ/价格/交期/工艺, 哪个与 ΔCTR 正相关)\n\n`;
md += `## 失败/存疑模式 (入 .hermes/regression-guard/error-patterns.md 候选)\n\n(Δ点击为负或 Δ位置显著恶化的槽, 逐个归因: 重写率 / 季节 / 排名波动)\n`;
const out = path.join(ROOT, `.hermes/reports/title-verify-report-${T.batch}-${today}.md`);
fs.writeFileSync(out, md, 'utf8');
console.log(`闭环报告: ${path.relative(ROOT, out)}`);
console.log(`胜/平/负: ${wins.length}/${flat.length}/${losses.length} (注意: 28d 滑动窗与改标题时点重叠会稀释 Δ, 归因需人工)`);
