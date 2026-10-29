#!/usr/bin/env node
/**
 * scripts/inject-recovery-mode-20261012.mjs  (2026-10-12, K3 spam 恢复指令)
 *
 * 目的: 把「spam 恢复模式」注入 5 条 lane prompt 首部, 让执行层 (deepseek 车道)
 *       恢复期每轮围绕「止血 / 恢复曲线 / B1c 差异化 / 防回流」干活, 而非盲目增产。
 *
 * 背景: 2026-09 spam 更新 10/8 完成推送后整站命中 (诊断 v2, commit fcdd5b57);
 *       B1a+B1b 已上线 (f9d9b1b7); 实时 24h 恢复系数仅 7.5% (scripts/gsc-cliff-detector.py)。
 *
 * 安全 (同 inject-results-bus-contract.mjs 三件套 + 幂等 + 备份):
 *   ① 目标文件数 == 5, 缺一不写盘; ② 注入后字节数增加 == 块长度;
 *   ③ 幂等: 已含 RECOVERY-MODE-2026-10-12 标记则跳过; ④ 写前备份 .hermes/_bak-recovery-inject-<date>/。
 *
 * 用法: node scripts/inject-recovery-mode-20261012.mjs [--dry-run]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROMPTS = path.join(REPO, '.hermes', 'cron-prompts');
const MARK_BEGIN = '<!-- RECOVERY-MODE-2026-10-12 BEGIN -->';
const MARK_END = '<!-- RECOVERY-MODE-2026-10-12 END -->';
const DRY = process.argv.includes('--dry-run');

const HEAD = `${MARK_BEGIN}
> # 🚨 【恢复模式 · 限定凌驾级】spam 命中恢复期 (K3 2026-10-12 拍板 · SSoT: \`docs/2026-10-12-recovery-lane-defense-plan.md\`)
>
> **事实**: 2026-09 spam 更新 10/8 完成推送后整站命中 (scaled content abuse 画像, 诊断 v2 = \`docs/2026-10-11-gsc-cliff-diagnosis.md\` 系列); 实时 24h 恢复系数仅 **7.5%** (展示 44/天 vs 断崖前日均 ~585)。B1a+B1b 去毒已上线 (f9d9b1b7)。
>
> **优先级**: 结果总线契约 (-1) > **本恢复模式** > 大脑区 (10-09) 增产类指令。大脑区的 CTR c 值判据 / 盲开词纪律 / churn 盯梢**继续有效, 不被本块覆盖**。恢复期内的「增产」「铺量」「新词开拓」类指令一律降级: 先保恢复, 再谈增长。
>
> **全车道通用红线 (恢复期)**:
> ① 任何内容批次**先过门童 #29** (keywords 去毒) 与既有 #25/#27/#28, 被拦不得绕过;
> ② 报告首段 VERDICT 行后必须加一行 \`RECOVERY: <实时恢复系数>%\` (数据来自 \`python scripts/gsc-cliff-detector.py\` 产出的 \`.hermes/logs/gsc-cliff-<当日>.json\`);
> ③ 禁止制造新的近重复正文 (8-gram Jaccard vs 同 locale 任一现存 SKU 正文 >60% 即停手, 报告写 BLOCKED + 证据);
> ④ 数字钩子只能来自 products.ts / K3 拍板 (§0.23), 恢复期造假 = 直接扼杀恢复;
> ⑤ 名片解禁仅限接单层: 不动贺卡资产 / 不动 middleware 301 / 不建名片页 (§0.0 解禁块 (a)/(b)/(c) 未裁决)。
>
`;

const LANE_BLOCKS = {
  'zprintpro-daily-content-1x7w.md': `${HEAD}
> **本车道 (daily-content 21:17) 恢复期任务定义**:
> 1. **首务 = B1c 差异化重写队列消费**, 每日 1 页 (三语同步), 队列顺序 (按 B1 审计实锤近重复簇 + Q4 商机): \`stickers 5 兄弟 (waterproof/transparent/foil/fluorescent/security, 互扫 96%)\` → \`red-packets 族 (CNY Q4 在即)\` → \`a4↔a5 flyers (98%)\` → \`food↔folding boxes (98%)\` → \`kraft↔eco bags (98%)\` → \`a1↔a2 posters (98%)\` → calendars → 其余。簇内**主推页保留**, 兄弟页正文改写 30-40% (差异化 = 材质/工艺/场景/最小起订真实差异, 数字从 products.ts 现取)。
> 2. 队列消费进度登记: \`.hermes/logs/b1c-queue-progress.json\` (每日追加 {date, slug, locales, similarity_before_after}), 供下一棒幂等。
> 3. 原「每日新内容」指令恢复期降级为次务: 当日 B1c 完成且时间富余才做; 新内容同样受通用红线 ③ 约束。
> 4. 开工先跑 \`python scripts/gsc-cliff-detector.py\`: 若报 CRITICAL_CLIFF (新断崖), 当日只写诊断报告, 不做内容动作。
${MARK_END}

`,
  'zprintpro-gsc-feedback-loop.md': `${HEAD}
> **本车道 (gsc-feedback 20:13) 恢复期任务定义**:
> 1. **STEP 0.5 (新, 先于一切)**: 跑 \`python scripts/gsc-cliff-detector.py\` 并读 \`.hermes/logs/gsc-cliff-<当日>.json\`:
>    - \`CRITICAL_CLIFF\` → 当日报告只写断崖证据 + 升级 K3, 不做词表动作;
>    - \`WARN_STALE\` → 报告标注「数据龄 >5 天, 需 K3 导出新档」, 后续判读降置信;
>    - 每次报告必含 \`RECOVERY: <recovery_ratio_vs_mean28_dynamic>%\`（A17 修复后口径: 优先同口径动态分母, 全国家 caliber 与 109.9%/107.2% 恢复链一致; \`recovery_ratio_vs_precliff\` 为固定 585.2 单站和口径不得当恢复系数）与**逐日序列** (从 10-12 起累积, 画恢复曲线)。
> 2. 恢复判读口径: 恢复系数连续 3 日抬升 = 再评估启动信号; 重回 ≥60% = 部分恢复; ≥90% = 基本恢复。10-09 大脑区的 8 锁词 / 盲开词 (年賀状 / corporate holiday cards) 追踪**继续**, 但结论必须区分「spam 压制导致的位置失真」与「真实需求信号」—— spam 恢复前, 位置数据整体失真, CTR c 值判据照旧有效 (c 是相对量)。
> 3. 恢复期内每周报告加一节「spam 恢复周报」: 恢复系数曲线 / 索引覆盖率变化 / 人工处罚页状态 (K3 核验后登记) / 下次 Google 更新窗口预测。
${MARK_END}

`,
  'zprintpro-weekly-meta-refresh.md': `${HEAD}
> **本车道 (weekly-meta 周五 20:52) 恢复期任务定义**:
> 1. 周报告**改组为 SEO 健康周报**, 固定四节: ① 恢复系数周曲线 (gsc-cliff-detector 逐日 JSON 汇总) ② 门童 #25/#27/#28/#29 本周审计 JSON 摘要 (存量 issue 增减, 只准减不准增) ③ 本周新上线内容的相似度抽检 (8-gram Jaccard, >50% 列出) ④ 下周 B1c 队列建议 (与 daily-content 进度对账 \`.hermes/logs/b1c-queue-progress.json\`)。
> 2. meta 刷新动作本身恢复期**限缩**: 只刷「已恢复展示但 CTR 低于 c 值判据」的页; 对仍被 spam 压制的页不改 meta (改了也测不出效果, 还会污染验证窗)。
> 3. 发现任何 keywords meta 回流 / 标题带外溢 / 品牌语种错配的新发例 → 当周报告标红置顶, 不进「下周再说」。
${MARK_END}

`,
  'zprintpro-blog-deepfix.md': `${HEAD}
> **本车道 (blog-deepfix 周六 05:37) 恢复期任务定义**:
> 1. **相似度闸门前置**: 任何 blog 重写/新写落盘前, 与同 locale 现存 blog + SKU 正文跑 8-gram Jaccard; >60% = 停手, 报告写 BLOCKED + 相似对证据。FAQ 块全站 0 重复的现状 (B1 审计已证) 必须保持 — 新 FAQ 与现存 FAQ >50% 相似同样停手。
> 2. 深度 blog 12 段骨架照旧, 但恢复期选题材**优先服务 B1c 簇与 Q4 品类** (利是封/年賀状/corporate holiday cards/日历), 每篇深度文必须给对应簇主推页至少 2 条内链 (hub-spoke, 锚文本用 GSC 实证词)。
> 3. 严禁批量生成: 单次运行 ≤2 篇, 每篇必须人工级质检清单 (12 段齐 / 数字有 products.ts 出处 / 无空洞词)。
${MARK_END}

`,
  'zprintpro-monthly-matrix-audit.md': `${HEAD}
> **本车道 (monthly-matrix 每月 1 号 06:13) 恢复期任务定义**:
> 1. 月度审计**首节固定为 spam 恢复月度复扫**: ① 门童 #29 全扫 (keywords 回流 0 容忍) ② 全站 SKU 正文 8-gram Jaccard 矩阵复扫 (对照 B1 审计基线 150/108/115 对, 只准减) ③ meta keywords 渲染复探 (\`node scripts/b1a-live-probe-20261012.mjs\`, 必须 8/8 PASS) ④ B1d 薄页清单更新 (字数 <阈值 且无 FAQ 无 schema 的页, 出 noindex 候选清单给 K3 拍板)。
> 2. 月度报告必须含「恢复总账」: 恢复系数月度曲线 / B1c 队列完成度 / 索引覆盖 / 距下次 Google 更新窗口的倒计时准备度清单。
> 3. 其他 matrix 审计维度照旧, 但任何「扩张/新增」类建议恢复期一律标注「恢复后执行」并入挂账区, 不当月动手。
${MARK_END}

`,
};

function main() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const bakDir = path.join(REPO, '.hermes', `_bak-recovery-inject-${date}`);
  const targets = Object.keys(LANE_BLOCKS);
  const planned = [];

  // 断言① 目标齐 5
  for (const t of targets) {
    const p = path.join(PROMPTS, t);
    if (!fs.existsSync(p)) { console.error(`FATAL: 目标 prompt 缺失 ${t} -> 不写盘`); process.exit(2); }
  }

  for (const t of targets) {
    const p = path.join(PROMPTS, t);
    const src = fs.readFileSync(p, 'utf8');
    if (src.includes(MARK_BEGIN)) { planned.push({ t, action: 'skip(already)' }); continue; }
    // 断言② 形状: 结果总线契约块必须已在首部 (v1 注入已跑过)
    if (!src.slice(0, 120).includes('RESULTS-BUS-CONTRACT v1')) { console.error(`FATAL: ${t} 首部缺结果总线契约块 -> 不写盘`); process.exit(3); }
    const block = LANE_BLOCKS[t];
    const out = block + src;
    if (out.length !== src.length + block.length) { console.error(`FATAL: ${t} 长度断言失败 -> 不写盘`); process.exit(4); }
    if (!out.includes(MARK_END) || !out.includes('recovery-lane-defense-plan.md')) { console.error(`FATAL: ${t} 结果形状断言失败 -> 不写盘`); process.exit(5); }
    planned.push({ t, action: 'inject', before: src.length, after: out.length, out, p });
  }

  const toWrite = planned.filter((x) => x.action === 'inject');
  console.log(`targets=${targets.length} inject=${toWrite.length} skip=${planned.length - toWrite.length}`);
  if (!toWrite.length) { console.log('nothing to do (idempotent)'); return; }
  if (DRY) { for (const w of toWrite) console.log(`  [dry] ${w.t}: ${w.before} -> ${w.after} B`); return; }

  // 断言③ 备份
  fs.mkdirSync(bakDir, { recursive: true });
  for (const w of toWrite) fs.copyFileSync(w.p, path.join(bakDir, w.t));
  console.log(`backup -> ${path.relative(REPO, bakDir)}`);

  for (const w of toWrite) {
    fs.writeFileSync(w.p, w.out, 'utf8');
    const back = fs.readFileSync(w.p, 'utf8');
    if (back.length !== w.after || !back.includes(MARK_BEGIN)) { console.error(`FATAL: ${w.t} 写盘后校验失败`); process.exit(6); }
    console.log(`  injected ${w.t}: ${w.before} -> ${w.after} B`);
  }
  console.log('OK: 5 条 lane prompt 已注入 spam 恢复模式块 (凌驾增产类指令, 不动 CTR/盲开词纪律)');
}

main();
