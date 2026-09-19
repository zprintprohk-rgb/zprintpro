#!/usr/bin/env node
/**
 * scripts/inject-results-bus-contract.mjs  (2026-09-19, K3 指令)
 *
 * 目的: 把「结果总线消费契约」注入 5 条 lane prompt 首部 (第 -1 优先级),
 *       让执行层(deepseek 车道)每轮开工先读上一轮结果, 再决定今天干什么。
 *
 * 安全 (per AGENTS.md §12 危险写入三件套: 计数断言 + 形状断言 + 备份):
 *   ① 目标文件数必须 == 5, 否则不写盘;
 *   ② 每个文件必须含 v9.3 指令区首行锚点, 且注入后必须"只多不炸"(字节数增加 == 块长度);
 *   ③ 幂等: 已含标记的结果总线块则跳过 (第二次运行不改任何文件);
 *   ④ 备份: 写前把原文件备份到 .hermes/_bak-bus-inject-<date>/, 断言未过不落盘。
 *
 * 用法: node scripts/inject-results-bus-contract.mjs [--dry-run]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROMPTS = path.join(REPO, '.hermes', 'cron-prompts');
const MARK = '<!-- RESULTS-BUS-CONTRACT v1 (2026-09-19) -->';

const TARGETS = [
  'zprintpro-daily-content-1x7w.md',
  'zprintpro-gsc-feedback-loop.md',
  'zprintpro-weekly-meta-refresh.md',
  'zprintpro-blog-deepfix.md',
  'zprintpro-monthly-matrix-audit.md',
];

const ANCHOR = '**[v9.3 指令区';   // 5 条 prompt 首行共有锚点 (位于 "> " 引用前缀之后)
const DRY = process.argv.includes('--dry-run');

const BLOCK = `${MARK}
> # ⛔ 【第 -1 优先级 · 结果总线消费契约】先读结果, 再干活 (K3 2026-09-19 指令)
>
> **K3 原话**: 「这些定时任务结果是要给 deepseek 执行任务的数据依据和支撑的，不是给 K3 的」。
>
> **开工第一步 (先于本 prompt 任何内容任务与 SSoT 必读)**: 按顺序读
> 1. \`.hermes/logs/run-context-<本车道名>.json\` — 本轮专属上下文 (上次跑了几次/结果/产物/待重做/今日其他车道动作/锁与前置检查结论)
> 2. \`.hermes/logs/lane-status.json\` — 全车道近 7 天逐日 verdict (\`OK / MISSING / FAILED / BLOCKED / STALE / PENDING\`) + 证据路径
>
> **全契约 (必读)**: \`.hermes/cron-prompts/lane-results-bus-contract.md\` — 幂等判定 (不重复做已完成的事) / 不重犯 (上次被 guard 拦下的必须先过断言) / 跨车道避让 (同一文件不在同一天被两条路径改写) / 数据继承 (上轮 X → 本轮 Y) / 写回格式 (报告首段必含 \`VERDICT / CONSUMED / DELIVERED / NEXT\` 四行)。
>
> **红线**: ① 报告名强制 \`<YYYY-MM-DD>-<本车道名>.md\` 落 \`.hermes/logs/\`; ② 失败也写报告, 空转必须显式写 \`VERDICT: FAILED\` + 原因; ③ \`run-context\` 的 \`preflight\` 段为 \`blocked\` 时立即停手写 \`VERDICT: BLOCKED\`, 不做任何写操作; ④ 两个文件都读不到时报告写一行 \`BUS_UNAVAILABLE\` 后按正常流程执行, 禁止编造"上次已做过"。
${MARK.replace('v1', 'v1-end')}

`;

function main() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const bakDir = path.join(REPO, '.hermes', `_bak-bus-inject-${date}`);
  const planned = [];

  // 断言① 目标齐 5
  for (const t of TARGETS) {
    const p = path.join(PROMPTS, t);
    if (!fs.existsSync(p)) { console.error(`FATAL: 目标 prompt 缺失 ${t} -> 不写盘`); process.exit(2); }
  }

  for (const t of TARGETS) {
    const p = path.join(PROMPTS, t);
    const src = fs.readFileSync(p, 'utf8');
    if (src.includes(MARK)) { planned.push({ t, action: 'skip(already)' }); continue; }
    // 断言② 形状: v9.3 指令区锚点必须出现在文件最前 200 字符内 (允许 "> " 引用前缀)
    if (!src.slice(0, 200).includes(ANCHOR)) { console.error(`FATAL: ${t} 首行锚点不匹配 -> 不写盘`); process.exit(3); }
    const out = BLOCK + src;
    if (out.length !== src.length + BLOCK.length) { console.error(`FATAL: ${t} 长度断言失败 -> 不写盘`); process.exit(4); }
    if (!out.includes(ANCHOR) || !out.includes('lane-results-bus-contract.md')) { console.error(`FATAL: ${t} 结果形状断言失败 -> 不写盘`); process.exit(5); }
    planned.push({ t, action: 'inject', before: src.length, after: out.length, out, p });
  }

  const toWrite = planned.filter((x) => x.action === 'inject');
  console.log(`targets=${TARGETS.length} inject=${toWrite.length} skip=${planned.length - toWrite.length}`);
  if (!toWrite.length) { console.log('nothing to do (idempotent)'); return; }
  if (DRY) { for (const w of toWrite) console.log(`  [dry] ${w.t}: ${w.before} -> ${w.after} B`); return; }

  // 断言③ 备份
  fs.mkdirSync(bakDir, { recursive: true });
  for (const w of toWrite) fs.copyFileSync(w.p, path.join(bakDir, w.t));
  console.log(`backup -> ${path.relative(REPO, bakDir)}`);

  // 写盘 (Node fs 写 UTF-8 无 BOM, per AGENTS.md §12 安全写入)
  for (const w of toWrite) {
    fs.writeFileSync(w.p, w.out, 'utf8');
    const back = fs.readFileSync(w.p, 'utf8');
    if (back.length !== w.after || !back.includes(MARK)) { console.error(`FATAL: ${w.t} 写盘后校验失败`); process.exit(6); }
    console.log(`  injected ${w.t}: ${w.before} -> ${w.after} B`);
  }
  console.log('OK: 5 条 lane prompt 已注入结果总线消费契约 (第 -1 优先级)');
}

main();
