/**
 * sync-title-rule-50-57.mjs — 标题口径归一化到 **50-57** (K3 2026-09-19 裁决)
 *
 * 取代 sync-title-rule-50-58.mjs。本脚本做**全量归一化**, 同时处理三种历史文本形态:
 *   ① v4 原始 (K3 9/9)      : 「50-54 写满 / ≥55 禁加」
 *   ② 9/13 终裁 (K3 9/13)    : 「50-58 目标区 / >58 禁加」
 *   ③ 现行 (K3 2026-09-19)   : 「**50-57 目标区 / >57 禁加**」  ← 目标
 *
 * 为什么需要**可重跑**: 2026-09-20 00:41 实测 `daily-content-1x7w` 与 `blog-deepfix`
 *   **被并行会话从 `.hermes/_bak-bus-inject-20260919/` 还原成 v4 旧文本** (50-54/≥55),
 *   把 09-19 的同步**回退**了。⇒ 归一化必须幂等且可重复执行, 并覆盖两种旧形态。
 *
 * 用法:
 *   node scripts/sync-title-rule-50-57.mjs            # dry-run (默认)
 *   node scripts/sync-title-rule-50-57.mjs --apply
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const APPLY = process.argv.includes('--apply');
const MARKER = '50-57 目标区';

const FILES = [
  'AGENTS.md',
  '.hermes/cron-prompts/zprintpro-daily-content-1x7w.md',
  '.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md',
  '.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md',
  '.hermes/cron-prompts/zprintpro-monthly-matrix-audit.md',
  '.hermes/cron-prompts/zprintpro-blog-deepfix.md',
];

// 有序替换: 先长串后短串, 避免短串先吃掉长串的一部分
const REPLACEMENTS = [
  // ① v4 原始形态 → 现行
  { id: 'v4-区间', from: '半角当量 50-54 区间', to: '半角当量 50-57 区间' },
  { id: 'v4-规则引用', from: '标题规则 v4 写满原则（50-54 写满 / ≥55 禁加 / 长尾 3 筛选 / 冻结 2-4 周）', to: '标题规则（**50-57 目标区 / >57 禁加** / 长尾 3 筛选 / 冻结 2-4 周）→ `docs/2026-09-13-title-batch-T-freeze.md` §6-3（K3 2026-09-19 收窄）' },
  { id: 'v4-负一优先级', from: '半角当量 **50-54 写满目标区**（主词前置 + GSC 实证长尾 1-2 个 + 数字钩子 + 品牌末尾一次），≥55 满格禁加，<50 按序补', to: '半角当量 **50-57 目标区**（主词前置 + GSC 实证长尾 1-2 个 + 数字钩子 + 品牌末尾一次），**>57 禁加**，<50 按序补' },
  // ② 9/13 中间形态 → 现行
  { id: '58-目标区', from: '50-58 目标区', to: '50-57 目标区' },
  { id: '58-目标区括号', from: '目标区 50-58', to: '目标区 50-57' },
  { id: '58-区间', from: '50-58 区间', to: '50-57 区间' },
  { id: '58-加粗', from: '**50-58**', to: '**50-57**' },
  { id: '58-当量', from: '50-58 半角当量', to: '50-57 半角当量' },
  // ③ 禁加线表述 (两种旧写法 → 现行)
  { id: '禁加-55', from: '≥55 满格禁加', to: '>57 满格禁加' },
  { id: '禁加-58', from: '>58 满格禁加', to: '>57 满格禁加' },
  { id: '禁加-58短', from: '>58 禁加', to: '>57 禁加' },
  { id: '禁加-58硬', from: '≥58 硬拦', to: '>57 硬拦' },
  // ④ 门禁阈值描述
  { id: '守卫阈值', from: 'MIN=50 / MAX=58', to: 'MIN=50 / MAX=57' },
  { id: '守卫阈值短', from: 'MIN 50 / MAX 58', to: 'MIN 50 / MAX 57' },
  // ⑤ AGENTS.md 三条操作性行 (精确整段, 含繁体/括号变体)
  { id: 'agents-50', from: 'SKU 标题规则（**K3 9/13 终裁 目标区 50-58 半角当量 / >58 满格禁加**，取代 v4 的 50-54；', to: 'SKU 标题规则（**K3 2026-09-19 目标区 50-57 半角当量 / >57 满格禁加**，取代 v4 的 50-54 与 9/13 的 50-58；' },
  { id: 'agents-60', from: '标题规则 SSoT = `docs/2026-09-13-title-batch-T-freeze.md` §6-3（K3 9/13 终裁 目标区 50-58，取代 v4 的 50-54）', to: '标题规则 SSoT = `docs/2026-09-13-title-batch-T-freeze.md` §6-3（**K3 2026-09-19 收窄为 50-57**，58 为阻断线；取代 v4 的 50-54 与 9/13 的 50-58）' },
  { id: 'agents-643', from: '**K3 2026-09-13 终裁 目标区 50-58 半角当量**（取代 v4 的 50-54）', to: '**K3 2026-09-19 裁决 目标区 50-57 半角当量**（取代 v4 的 50-54 与 9/13 的 50-58；58 为阻断线）' },
  { id: 'agents-643b', from: '**>58 满格禁加**', to: '**>57 满格禁加**' },
];

/* ⚠️ **不做** `50-54 → 50-57` 的通用兜底替换（上一版做过, 已撤）:
 *   「取代 v4 的 50-54」是**历史陈述**（描述 v4 当时的区间）, 不是当前阈值。
 *   通用替换会把它改成「取代 v4 的 50-57」= **篡改史实**, 违反 §0.34.2(历史正文不改写)。
 *   故只做**精确整段**替换; 历史行 (v3.1 段 L1790/L1814/L2429「滿格 ≥55 禁加」等) 一律不动。
 */
const HIST_ALLOW = /(?:取代|取替)\s*v4\s*的\s*50-54|50-54[^0-9]{0,6}(?:与|與)\s*9\/13/;

const report = [];
for (const rel of FILES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) { report.push({ rel, status: 'MISSING_FILE' }); continue; }
  let text = fs.readFileSync(abs, 'utf8');
  const before = text;
  const applied = [];
  for (const r of REPLACEMENTS) {
    const n = text.split(r.from).length - 1;
    if (n > 0) { text = text.split(r.from).join(r.to); applied.push(`${r.id}x${n}`); }
  }
  // 残留检测: 历史豁免 (「取代 v4 的 50-54」) 不算残留; 其余 50-54 视为残留
  const staleHit58 = /50-58/.test(text);
  const staleHit54 = text.split('\n').some((l) => /50-54/.test(l) && !HIST_ALLOW.test(l));
  const stillStale = staleHit58 || staleHit54;
  if (text === before) {
    report.push({ rel, status: text.includes(MARKER) ? 'ALREADY_OK' : (stillStale ? 'STALE_NO_MATCH' : 'NO_MATCH'), applied });
    continue;
  }
  if (before.split('\n').length !== text.split('\n').length) { report.push({ rel, status: 'ABORT 行数变化' }); continue; }
  if (APPLY) {
    const bak = path.join(ROOT, '.hermes/_bak-title-rule-50-57');
    fs.mkdirSync(bak, { recursive: true });
    fs.copyFileSync(abs, path.join(bak, path.basename(rel)));
    fs.writeFileSync(abs, text, 'utf8');
  }
  report.push({ rel, status: APPLY ? 'SYNCED' : 'DRY_RUN_OK', applied, residual: stillStale ? '⚠️ 仍有 50-54/50-58' : '✅ 无残留' });
}

console.log(`=== 标题口径归一化 50-57 (${APPLY ? 'APPLY' : 'DRY-RUN'}) ===`);
for (const r of report) console.log(`  ${r.status}\t${r.rel}${r.applied?.length ? '\t' + r.applied.join(', ') : ''}${r.residual ? '\t' + r.residual : ''}`);
console.log(APPLY ? '' : '\n[dry-run] 加 --apply 执行。');
