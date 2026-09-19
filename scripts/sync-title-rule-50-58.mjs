/**
 * sync-title-rule-50-58.mjs — 把 5 条车道 prompt 的「失效标题口径」同步到 K3 9/13 终裁
 *
 * 背景 (§0.23.2 实测):
 *   K3 2026-09-13 终裁已把目标区从 v4 的 50-54 改为 **50-58 半角当量**
 *   (SSoT = docs/2026-09-13-title-batch-T-freeze.md §6-3), 并于 4b120b17 (9/15) 全站统一,
 *   当量口径落在 scripts/guards/title-equiv.js (TITLE_MIN=50 / TITLE_MAX=58)。
 *   但 5 条车道 prompt 的 **-1 优先级必读块** 仍写「50-54 写满 / ≥55 满格禁加」——
 *   车道据此执行会把标题压在 54 以下, 与现行门禁 (MAX=58) 直接矛盾。
 *
 * 范围纪律:
 *   - 只改 **操作性行** (攻坚动作 / 规则引用 / -1 优先级块)。
 *   - **不改写历史附录** (标 GLM 9/1 02:58 的 v3.1 研究段) —— per §0.34.2 历史正文保留不改写。
 *
 * 用法:
 *   node scripts/sync-title-rule-50-58.mjs          # dry-run
 *   node scripts/sync-title-rule-50-58.mjs --apply
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const APPLY = process.argv.includes('--apply');
const MARKER = 'K3 9/13 终裁，取代 v4 的 50-54';

const FILES = [
  '.hermes/cron-prompts/zprintpro-daily-content-1x7w.md',
  '.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md',
  '.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md',
  '.hermes/cron-prompts/zprintpro-monthly-matrix-audit.md',
  '.hermes/cron-prompts/zprintpro-blog-deepfix.md',
];

// 精确字面替换 (仅操作性表述)
const REPLACEMENTS = [
  {
    id: 'R1-攻坚动作',
    from: 'title v4 写满核查（半角当量 50-54 区间，跑当量脚本存档）',
    to: 'title 写满核查（半角当量 **50-58** 区间，跑 `node scripts/sku-title-census.mjs` 存档）',
  },
  {
    id: 'R2-规则引用',
    from: '标题规则 v4 写满原则（50-54 写满 / ≥55 禁加 / 长尾 3 筛选 / 冻结 2-4 周）',
    to: '标题规则（**50-58 目标区 / >58 禁加** / 长尾 3 筛选 / 冻结 2-4 周）→ `docs/2026-09-13-title-batch-T-freeze.md` §6-3（K3 9/13 终裁）',
  },
  {
    id: 'R3-负一优先级块',
    from: '①标题规则 v4 写满原则：半角当量 **50-54 写满目标区**（主词前置 + GSC 实证长尾 1-2 个 + 数字钩子 + 品牌末尾一次），≥55 满格禁加，<50 按序补；细则 SSoT = `docs/2026-09-09-k3-title-rule-v4-write-full.md`',
    to: '①标题规则：半角当量 **50-58 目标区**（主词前置 + GSC 实证长尾 1-2 个 + 数字钩子 + 品牌末尾一次），**>58 禁加，<50 按序补**；**规则 SSoT = `docs/2026-09-13-title-batch-T-freeze.md` §6-3（K3 9/13 终裁，取代 v4 的 50-54）**；当量口径 = `scripts/guards/title-equiv.js`（MIN=50 / MAX=58）；⚠️ `docs/2026-09-09-k3-title-rule-v4-write-full.md` §1.2 的「50-54 / ≥55 禁加」已失效，勿再据此压标题',
  },
];

const report = [];
for (const rel of FILES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) { report.push({ rel, status: 'MISSING_FILE' }); continue; }
  let text = fs.readFileSync(abs, 'utf8');
  const before = text;

  if (text.includes(MARKER)) { report.push({ rel, status: 'ALREADY_SYNCED (idempotent skip)' }); continue; }

  const applied = [];
  for (const r of REPLACEMENTS) {
    const n = text.split(r.from).length - 1;
    if (n > 0) {
      text = text.split(r.from).join(r.to);
      applied.push(`${r.id}x${n}`);
    }
  }
  if (text === before) { report.push({ rel, status: 'NO_MATCH (检查字面量)' }); continue; }

  // 断言: 除目标串外无其他改动 (行数不变)
  if (before.split('\n').length !== text.split('\n').length) {
    report.push({ rel, status: 'ABORT 行数变化' });
    continue;
  }

  if (APPLY) {
    const bak = path.join(ROOT, '.hermes/_bak-title-rule-sync-20260919');
    fs.mkdirSync(bak, { recursive: true });
    fs.copyFileSync(abs, path.join(bak, path.basename(rel)));
    fs.writeFileSync(abs, text, 'utf8');
  }
  report.push({ rel, status: APPLY ? 'SYNCED' : 'DRY_RUN_OK', applied });
}

console.log(`=== 标题口径同步 (${APPLY ? 'APPLY' : 'DRY-RUN'}) ===`);
for (const r of report) console.log(`  ${r.status}\t${r.rel}${r.applied ? '\t' + r.applied.join(', ') : ''}`);
const needApply = report.some((r) => r.status === 'DRY_RUN_OK');
console.log(needApply && !APPLY ? '\n[dry-run] 加 --apply 执行。' : '');
