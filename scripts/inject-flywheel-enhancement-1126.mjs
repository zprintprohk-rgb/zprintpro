#!/usr/bin/env node
/**
 * scripts/inject-flywheel-enhancement-1126.mjs  (2026-11-26, K3 批准增强包 D1/W1)
 *
 * 目的: 把「飞轮运营指挥中心增强包」两项 prompt 增补注入 lane prompt:
 *   D1 -> zprintpro-daily-content-1x7w.md   (STEP -1 GSC API 自动拉取)
 *   W1 -> zprintpro-weekly-meta-refresh.md  (季节守望块)
 * 依据: 重要文件/2026-11-26-flywheel-command-center-lane-upgrade-and-deep-blog-plan.md §2
 *       (K3 2026-11-26 拍板: D1/WD1/W1 生成器注入批准)
 *
 * 安全 (与 inject-results-bus-contract.mjs 同规: 计数断言 + 形状断言 + 备份 + 幂等):
 *   ① 目标文件必须存在, 否则不写盘;
 *   ② 每个文件必须含 RESULTS-BUS-CONTRACT v1-end 锚点, 注入在其后;
 *   ③ 幂等: 已含本块标记则跳过;
 *   ④ 备份: 写前备份到 .hermes/_bak-flywheel-inject-<date>/, 断言未过不落盘。
 *
 * 用法: node scripts/inject-flywheel-enhancement-1126.mjs [--dry-run]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROMPTS = path.join(REPO, '.hermes', 'cron-prompts');
const ANCHOR = '<!-- RESULTS-BUS-CONTRACT v1-end (2026-09-19) -->';
const DRY = process.argv.includes('--dry-run');

const D1_MARK = '<!-- FLYWHEEL-ENHANCE-D1 v1 (2026-11-26) -->';
const D1_BLOCK = `${D1_MARK}
> # 【STEP -1 · GSC API 自动拉取】(K3 2026-11-26 批准 · 增强包 D1)
>
> **时机**: 结果总线消费契约之后、任何内容任务之前。
> **判定**: 若 \`GSC数据/\` 今日无新人工导出 (无 mtime=今天的 xlsx/csv), 自动拉取补齐; 有人工新批则跳过本步直接消费。
> **命令** (逐档执行, 失败单档降级不影响其它档):
> \`\`\`
> GSC_PROXY=http://127.0.0.1:7890 python scripts/fetch_gsc_data.py --days 28 --dimensions query        --out GSC数据/gsc-query-28d-api-<YYYY-MM-DD>.csv
> GSC_PROXY=http://127.0.0.1:7890 python scripts/fetch_gsc_data.py --days 28 --dimensions query,page    --out GSC数据/gsc-query-page-28d-api-<YYYY-MM-DD>.csv
> GSC_PROXY=http://127.0.0.1:7890 python scripts/fetch_gsc_data.py --days 28 --dimensions query,country --out GSC数据/gsc-query-country-28d-api-<YYYY-MM-DD>.csv
> \`\`\`
> **代理命脈**: 127.0.0.1:7890 (FlClash 常驻服务, 已验证开机自启); 脚本默认 7892 未启用, 必须用环境变量覆盖, 禁止改脚本默认值。
> **降级纪律**: 代理或 API 失败 -> 用最近一批 GSC 数据继续 (NO_CURRENT_BATCH 纪律不变), 报告 CONSUMED 行注明 \`GSC_API=FAIL, fallback=<最近批文件名>\`; 禁止因拉取失败空转或编造数据。
> **承接**: 新鲜 query×page 档 = 承接层决策输入 (SSoT: 重要文件/2026-11-26-query-page-primary-url-decisions.md)。
${D1_MARK.replace('v1 (', 'v1-end (')}

`;

const W1_MARK = '<!-- FLYWHEEL-ENHANCE-W1 v1 (2026-11-26) -->';
const W1_BLOCK = `${W1_MARK}
> # 【季节守望块】(K3 2026-11-26 批准 · 增强包 W1 · 每周五固定读窗)
>
> 每周五 meta 刷新时固定评估三个季节窗, 写进周报独立小节「季节守望」:
> 1. **C109 倒计时** (~5 周窗, 实测 431imp@pos10): 圣诞/新年贺卡与节庆印刷簇; 窗开启 -> 提案专题页直答块 (并入深层 blog 队列 1.5 位)。
> 2. **利是封/月历 2027 窗**: red-packets / calendars 族的 GSC 展示量环比; 启动信号 = 2 周连升。
> 3. **易拉架活动季** (7d 暴起簇): roll-up-banner 族 7d 窗突变检测; 启动信号 = 周环比 >50%。
> **纪律**: 只读 GSC 既有三档 + API 新档, 不编造季节数字; 窗口日期一律标「以站内专题页为准」; 提案走队列 WAITING_K3, 不直接上 src。
${W1_MARK.replace('v1 (', 'v1-end (')}

`;

const TARGETS = [
  { file: 'zprintpro-daily-content-1x7w.md', mark: D1_MARK, block: D1_BLOCK, tag: 'D1' },
  { file: 'zprintpro-weekly-meta-refresh.md', mark: W1_MARK, block: W1_BLOCK, tag: 'W1' },
];

function main() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const bakDir = path.join(REPO, '.hermes', `_bak-flywheel-inject-${date}`);
  const planned = [];

  // 断言① 目标齐全
  for (const t of TARGETS) {
    const p = path.join(PROMPTS, t.file);
    if (!fs.existsSync(p)) { console.error(`FATAL: 目标 prompt 缺失 ${t.file} -> 不写盘`); process.exit(2); }
  }

  for (const t of TARGETS) {
    const p = path.join(PROMPTS, t.file);
    const src = fs.readFileSync(p, 'utf8');
    if (src.includes(t.mark)) { planned.push({ t, action: 'skip(already)' }); continue; }
    // 断言② 形状: 结果总线块结束锚点必须在场
    const idx = src.indexOf(ANCHOR);
    if (idx < 0) { console.error(`FATAL: ${t.file} 缺 RESULTS-BUS-CONTRACT v1-end 锚点 -> 不写盘`); process.exit(3); }
    const insertAt = idx + ANCHOR.length;
    const out = src.slice(0, insertAt) + '\n\n' + t.block.trimEnd() + '\n' + src.slice(insertAt);
    if (out.length !== src.length + t.block.trimEnd().length + 3) { console.error(`FATAL: ${t.file} 长度断言失败 -> 不写盘`); process.exit(4); }
    if (!out.includes(t.mark) || out.indexOf(t.mark) < idx) { console.error(`FATAL: ${t.file} 结果形状断言失败 -> 不写盘`); process.exit(5); }
    planned.push({ t, action: 'inject', before: src.length, after: out.length, out, p });
  }

  const toWrite = planned.filter((x) => x.action === 'inject');
  console.log(`targets=${TARGETS.length} inject=${toWrite.length} skip=${planned.length - toWrite.length}`);
  if (!toWrite.length) { console.log('nothing to do (idempotent)'); return; }
  if (DRY) { for (const w of toWrite) console.log(`  [dry] ${w.t.tag} ${w.t.file}: ${w.before} -> ${w.after} B`); return; }

  // 断言③ 备份
  fs.mkdirSync(bakDir, { recursive: true });
  for (const w of toWrite) fs.copyFileSync(w.p, path.join(bakDir, w.t.file));
  console.log(`backup -> ${path.relative(REPO, bakDir)}`);

  // 写盘 (Node fs 写 UTF-8 无 BOM, per AGENTS.md §12 安全写入)
  for (const w of toWrite) {
    fs.writeFileSync(w.p, w.out, 'utf8');
    const back = fs.readFileSync(w.p, 'utf8');
    if (back.length !== w.after || !back.includes(w.t.mark)) { console.error(`FATAL: ${w.t.file} 写盘后校验失败`); process.exit(6); }
    console.log(`  injected ${w.t.tag} -> ${w.t.file}: ${w.before} -> ${w.after} B`);
  }
  console.log('OK: D1/W1 增强块已注入 (WD1 = scripts/cron-watchdog.py 第五方对账, 另行补丁)');
}

main();
