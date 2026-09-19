#!/usr/bin/env node
/**
 * scripts/lane-status.mjs -- 定时任务结果总线汇总器 (2026-09-19)
 *
 * 目的 (K3 2026-09-19 指令): 定时任务必须把「执行结果 + 数据」交给主程序做判断依据。
 *   本脚本把四处散落的证据汇成一份机器可读 + 一份人读的状态文件:
 *     A. .hermes/logs/lane-runs.jsonl    结构化 run 记录 (lane-git-commit.py / 后续 lane-preflight.py 写入)
 *     B. .hermes/logs/cron-ZP-<lane>.log wrapper 原始日志 (run start/end + dsh exit + guard 拦截)
 *     C. .hermes/logs|reports/<lane>     本 lane 报告文件 (文件名日期 token 必须等于目标日)
 *     D. Get-ScheduledTask 实测        (LastRunTime / LastTaskResult / NextRunTime, 不依赖控制台语言)
 *   输出:
 *     .hermes/logs/lane-status.json -- 主程序(含 cron prompt / 复盘流程)读取的判断依据
 *     .hermes/logs/lane-status.md   -- 人读一页 (5 lane x 近 N 天: 期望/实跑/verdict/证据)
 *
 * 用法: node scripts/lane-status.mjs [--days=7] [--json-only] [--quiet] [--no-sched]
 * 退出码: 0 = 无问题 / 1 = 存在 MISSING|FAILED|BLOCKED|STALE / 2 = 配置或读取错误
 *
 * 判据定义 (与 docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md §五 P1-A 一致):
 *   OK      run 记录/日志证明跑过, 且产出文件名日期 == 目标日的报告
 *   FAILED  exit != 0 (run 记录 dsh_exit, 或 wrapper 日志 dsh exit) 或调度器 LastTaskResult != 0
 *   BLOCKED 前置检查拒绝执行 (记录 blocked_reason)
 *   MISSING 触发点已过 45min 但既无 run 记录也无 wrapper 日志 (9/17 之前「触发器真空」那类)
 *   STALE   跑过但当天没有「当天日期」的报告 => 空转/零产出 (9/17 21:17 那类: dsh 在已删除 worktree 空找 4 分钟)
 *   PENDING 触发点未到或仍在 45min 宽限期内
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOGS = path.join(REPO, '.hermes', 'logs');
const REPORTS = path.join(REPO, '.hermes', 'reports');
const CFG = path.join(REPO, '.hermes', 'cron-lanes.json');
const RUNS = path.join(LOGS, 'lane-runs.jsonl');
const OUT_JSON = path.join(LOGS, 'lane-status.json');
const OUT_MD = path.join(LOGS, 'lane-status.md');
const GRACE_MIN = 45;
const DATE_RE = /\d{4}-\d{2}-\d{2}/;

const argv = process.argv.slice(2);
const DAYS = Number((argv.find((a) => a.startsWith('--days=')) || '').split('=')[1] || 7);
const JSON_ONLY = argv.includes('--json-only');
const QUIET = argv.includes('--quiet');
const NO_SCHED = argv.includes('--no-sched');

const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/**
 * 8 态执行状态机 (P3-12) —— 每次 lane 执行必须落在其中一个状态, 并只允许合法迁移:
 *   pending -> running -> completed            (正常)
 *   pending -> running -> failed -> pending    (瞬时失败, 下轮重试)
 *   pending -> running -> failed -> dead_letter(同因连败 >=2 次, 停止自动重试)
 *   pending -> blocked -> pending              (锁竞争/前置不过, 下轮重试)
 *   pending -> running -> quarantined          (产物可疑/毒数据, 需人工放行)
 *   pending -> skipped                         (显式判定无需执行, 如幂等命中)
 * 迁移表: 只允许下列边; 出现表外边 = 状态机违规 (problems 里报 STATE_MACHINE_VIOLATION)
 */
const STATE_MACHINE = {
  pending: ['running', 'skipped'],
  running: ['completed', 'failed', 'blocked', 'quarantined'],
  completed: [],
  failed: ['pending', 'dead_letter'],
  blocked: ['pending', 'dead_letter'],
  dead_letter: [],
  quarantined: ['pending', 'dead_letter'],
  skipped: [],
};
const VERDICT_TO_STATE = {
  OK: 'completed',
  PENDING: 'pending',
  MISSING: 'blocked',
  FAILED: 'failed',
  BLOCKED: 'blocked',
  STALE: 'quarantined',
  UNKNOWN: 'pending',
};

/**
 * 恢复分类 (P3-11) —— 让执行层知道下一步该干什么, 而不是只看到"失败了":
 *   retry            瞬时/外部原因 (网络/额度/锁竞争) -> 下轮自然重跑
 *   modify_payload   输入或前置条件变了 (slug 不存在/文件改名/参数错) -> 先改入参再跑
 *   request_human    需 K3 动作 (管理员权限/拍板/外部平台) -> 附一条可粘贴命令
 *   abort            设计缺陷/红线冲突 -> 停手撞墙, 不带病重试第三次
 */
function recoveryPlan(status, lane, day, notes, exitCode) {
  const n = (notes || []).join(' ');
  const seatbelt = 'node scripts/lane-status.mjs --days=7';
  if (status === 'MISSING') {
    return { action: 'request_human', reason: '触发点已过但无任何 run 记录 (调度器/执行器未装载)',
             evidence: `Get-ScheduledTask -TaskName ${lane} | Get-ScheduledTaskInfo`, retry_after_days: null };
  }
  if (status === 'BLOCKED') {
    if (/锁|lock/i.test(n)) return { action: 'retry', reason: '锁竞争 (另一条 lane 或人手会话持锁)', evidence: '.hermes/locks/lane.lock', retry_after_days: 0 };
    if (/preflight|前置|repo/i.test(n)) return { action: 'request_human', reason: '前置检查不过 (repo/worktree/branch)', evidence: `.hermes/logs/run-context-${lane}.json`, retry_after_days: null };
    return { action: 'retry', reason: '前置不过, 下轮重试', evidence: seatbelt, retry_after_days: 0 };
  }
  if (status === 'FAILED') {
    if (exitCode === 5) return { action: 'retry', reason: 'push 失败 (网络/远端)', evidence: `.hermes/logs/cron-${lane}.log`, retry_after_days: 0 };
    if (exitCode === 3) return { action: 'modify_payload', reason: 'encoding guard 拒绝 (需先修文件编码)', evidence: 'node scripts/check-encoding.js', retry_after_days: null };
    if (exitCode === 2) return { action: 'modify_payload', reason: 'git 操作失败 (冲突/状态异常)', evidence: 'git status --porcelain', retry_after_days: null };
    return { action: 'retry', reason: `dsh/wrapper 退出码 ${exitCode}`, evidence: `.hermes/logs/cron-${lane}.log`, retry_after_days: 0 };
  }
  if (status === 'STALE') {
    if (/guard/i.test(n)) return { action: 'modify_payload', reason: 'pre-commit guard 拦下 src commit -> 必须先让改动过对应断言', evidence: `node scripts/guards/sop10-guard.js`, retry_after_days: null };
    return { action: 'retry', reason: '跑过但无当日报告 (空转/零产出)', evidence: `.hermes/logs/cron-${lane}.log`, retry_after_days: 0 };
  }
  if (status === 'OK') return { action: 'none', reason: '无异常', evidence: null, retry_after_days: null };
  return { action: 'none', reason: '触发点未到或宽限期内', evidence: null, retry_after_days: null };
}


function readJson(p, fallback = null) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

function walk(dir, base = dir, acc = []) {
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of ents) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, base, acc);
    else acc.push({ full, rel: path.relative(base, full).replace(/\\/g, '/'), name: e.name, mtime: fs.statSync(full).mtimeMs });
  }
  return acc;
}

/** 该 lane 在 day 当天是否应触发; 返回 'HH:MM' 或 null */
function expectedStart(lane, d) {
  const s = lane.schedule || {};
  if (s.kind === 'DAILY') return lane.start;
  if (s.kind === 'WEEKLY') {
    const wd = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][d.getDay()];
    return wd === s.day ? lane.start : null;
  }
  if (s.kind === 'MONTHLY') return d.getDate() === s.day ? lane.start : null;
  return null;
}

/** wrapper 日志尾部解析: 最近一次 run 的 start/end/dsh exit/guard
 *  注意: lane 会话同时把 dsh 的实时输出写进同一份 console 日志, 其中可能夹带【人手会话】在仓库里
 *  跑的同类命令输出 (实测 9/19 cron-ZP-blog-deepfix.log 就混入了人手会话的 lane-git 输出)。
 *  故 guard 命中只作 suspected 记录, 不作硬判据。 */
function lastLogRun(lane) {
  const p = path.join(LOGS, `cron-${lane.task}.log`);
  let txt;
  try { txt = fs.readFileSync(p, 'utf8'); } catch { return null; }
  let start = null; let end = null; let dshExit = null; let guardBlocked = false; let commitOnly = false; let runsTotal = 0;
  for (const l of txt.split(/\r?\n/)) {
    let m = l.match(/^===== run start (\d{4})\/(\d{2})\/(\d{2})\s+\S*\s+(\d{1,2}):(\d{2}):(\d{2})/);
    if (m) {
      runsTotal++;
      start = `${m[1]}-${m[2]}-${m[3]} ${pad(m[4])}:${m[5]}:${m[6]}`;
      end = null; dshExit = null; guardBlocked = false; commitOnly = false;
      continue;
    }
    m = l.match(/^===== dsh exit=(\d+)/);
    if (m) { dshExit = Number(m[1]); continue; }
    m = l.match(/^===== run end\s+.*exit=(\d+)/);
    if (m) { end = m[1]; continue; }
    if (/src commit 被拦|生产文件未过 guard|check-encoding FAILED/.test(l)) guardBlocked = true;
    if (/只 commit 不 push|push 失败/.test(l)) commitOnly = true;
  }
  return start
    ? { start, end, dshExit, wrapperExit: end == null ? null : Number(end), guardBlocked, commitOnly, runsTotal, logFile: path.relative(REPO, p).replace(/\\/g, '/') }
    : null;
}

/** 近似「该 lane 在该日是否跑过」: 解析全日志, 列出所有 run start 的日期集合 */
function logRunDays(lane) {
  const p = path.join(LOGS, `cron-${lane.task}.log`);
  const days = new Set();
  let txt;
  try { txt = fs.readFileSync(p, 'utf8'); } catch { return days; }
  for (const l of txt.split(/\r?\n/)) {
    const m = l.match(/^===== run start (\d{4})\/(\d{2})\/(\d{2})/);
    if (m) days.add(`${m[1]}-${m[2]}-${m[3]}`);
  }
  return days;
}

/** Get-ScheduledTask 快照 (不依赖控制台语言, 不走 schtasks 本地化标签) */
function schtasksSnapshot(tasks) {
  if (NO_SCHED || !tasks.length) return {};
  const script = `Get-ScheduledTask -TaskName ${tasks.map((t) => `'${t}'`).join(',')} -ErrorAction SilentlyContinue | ` +
    `ForEach-Object { $i = $_ | Get-ScheduledTaskInfo; ` +
    `[pscustomobject]@{ Name=$_.TaskName; State=[string]$_.State; Last=$i.LastRunTime.ToString('yyyy-MM-dd HH:mm:ss'); Result=$i.LastTaskResult; Next=$i.NextRunTime.ToString('yyyy-MM-dd HH:mm:ss') } } | ConvertTo-Json -Compress`;
  const tmp = path.join(process.env.TEMP || '/tmp', `lane-status-sched-${process.pid}.ps1`);
  try {
    fs.writeFileSync(tmp, script, 'utf8');
    const out = execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', tmp], { encoding: 'utf8', windowsHide: true });
    const arr = JSON.parse(out.trim() || '[]');
    const snap = {};
    for (const row of Array.isArray(arr) ? arr : [arr]) snap[row.Name] = row;
    return snap;
  } catch {
    return {};
  } finally {
    try { fs.unlinkSync(tmp); } catch { /* ignore */ }
  }
}

function main() {
  const cfg = readJson(CFG);
  if (!cfg) { console.error(`lane-status: cannot read ${CFG}`); process.exit(2); }

  const allFiles = [...walk(LOGS), ...walk(REPORTS)];
  const runs = fs.existsSync(RUNS)
    ? fs.readFileSync(RUNS, 'utf8').split(/\r?\n/).filter(Boolean)
      .map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean)
    : [];
  const runsReal = runs.filter((r) => !r.test_record);
  const runsTest = runs.length - runsReal.length;

  const sched = schtasksSnapshot([...cfg.lanes.map((l) => l.task), cfg.watchdog?.task].filter(Boolean));

  // 幂等键去重 (P3-10): 同一 key 出现两次 = 同一 intent+target+day 被处理了两次 -> 重复处理告警
  for (const r of runsReal) {
    const k = r.idempotency_key;
    if (!k) continue;
    if (seenIdem.has(k)) warnings.push(`DUPLICATE_IDEMPOTENCY_KEY ${k}: ${seenIdem.get(k)} 与 ${r.run_id} 同日同目标重复处理`);
    else seenIdem.set(k, r.run_id);
  }

  const today = new Date();
  const window = [];
  for (let i = DAYS - 1; i >= 0; i--) window.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));

  const lanesOut = [];
  const problems = [];
  const warnings = [];
  const seenIdem = new Map();   // idempotency_key -> run_id (重复 = 同一 intent+target+day 被处理两次)

  for (const lane of cfg.lanes) {
    const logRun = lastLogRun(lane);
    const ranOn = logRunDays(lane);
    const laneRuns = runsReal.filter((r) => r.lane === lane.task);

    // 本车道当日报告判定 (K3 口径, 见 cron-lanes.json._report_naming_rule):
    //   strict = 文件名以「目标日 YYYY-MM-DD」开头 且 以车道后缀结尾 (e.g. 2026-09-19-blog-deepfix.md)
    //   loose  = 文件名含目标日 且 以车道后缀结尾 (e.g. 2026-09-18-daily-content.md)
    //   其余 (日期不在文件名 / 无车道后缀) 一律不认 —— 防 step5-merge-batch-report-<date>.md
    //   或 .hermes/logs/2026-09-19-cron-source-of-truth-findings.md 这类第三方文件冒充
    const suffix = lane.reportGlob ? lane.reportGlob.slice(lane.reportGlob.indexOf('*') + 1) : '';
    const laneToken = lane.task.replace('ZP-', '');
    const mdFiles = allFiles
      .filter((f) => f.name.endsWith('.md'))
      .map((f) => {
        const strict = f.name.match(/^(\d{4}-\d{2}-\d{2})-/);
        const anyDate = f.name.match(DATE_RE);
        // 车道归属: 文件名必须带车道 token (short 名或完整 task 名), 否则绝不认
        const laneOwned = f.name.includes(laneToken) || f.name.includes(lane.task);
        const endsOk = Boolean(suffix) && f.name.endsWith(suffix);
        const dateToken = (strict || anyDate) ? (strict ? strict[1] : anyDate[0]) : null;
        return { ...f, dateToken, laneOwned, owned: laneOwned && Boolean(dateToken), strict: Boolean(strict) && laneOwned, loose: Boolean(anyDate) && laneOwned && endsOk };
      })
      .filter((f) => f.owned)
      .sort((a, b) => Number(b.strict) - Number(a.strict) || b.dateToken.localeCompare(a.dateToken) || b.mtime - a.mtime);

    const days = [];
    for (const d of window) {
      const day = dayKey(d);
      const start = expectedStart(lane, d);
      if (!start) continue;
      const [hh, mm] = start.split(':').map(Number);
      const fireAt = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hh, mm, 0);
      const graceOver = today.getTime() > fireAt.getTime() + GRACE_MIN * 60000;

      const rec = laneRuns.find((r) => (r.fired_at || r.ended_at || '').startsWith(day)) || null;
      // 报告归属: strict = 文件名以目标日开头 (e.g. 2026-09-19-blog-deepfix.md) -> 当权威证据;
      // loose = 文件名含目标日 + 车道后缀 (e.g. 2026-09-18-daily-content.md) -> 仅参考证据,
      //         两个条件必须同时满足, 否则 NONE (防 src/data 无关报告被误当本车道产物)。
      const rep = mdFiles.find((f) => f.dateToken === day && (f.strict || f.loose)) || null;
      const hasRun = Boolean(rec) || ranOn.has(day);

      let status; const notes = [];
      if (!hasRun) {
        status = graceOver ? 'MISSING' : 'PENDING';
        if (graceOver) notes.push('no wrapper log run-start and no bus record for this trigger');
      } else {
        const exitCode = rec ? rec.dsh_exit : (logRun && logRun.start.startsWith(day) ? logRun.dshExit : null);
        status = 'OK';
        if (rec && rec.blocked_reason) { status = 'BLOCKED'; notes.push(rec.blocked_reason); }
        else if (typeof exitCode === 'number' && exitCode !== 0) status = 'FAILED';
        if (rec && rec.guard && rec.guard.ok === false) { notes.push('guard blocked src commit'); if (status === 'OK') status = 'STALE'; }
        if (logRun && logRun.start.startsWith(day) && logRun.guardBlocked) { notes.push('guard-blocked message seen in console log (suspected: log may also carry human-session output)'); if (status === 'OK') status = 'STALE'; }
        if (!rep) {
          if (status === 'OK') status = 'STALE';
          notes.push(`ran but no report file dated ${day}`);
        } else if (!rep.strict) {
          notes.push(`report naming not date-first (${rep.name}) -> treated as reference only`);
        }
      }
      days.push({
        day,
        expected: start,
        status,
        state: VERDICT_TO_STATE[status] || 'pending',
        recovery_plan: recoveryPlan(status, lane.task, day, notes, rec ? rec.dsh_exit : (logRun && logRun.start.startsWith(day) ? logRun.dshExit : null)),
        notes,
        exit: rec ? rec.dsh_exit : (logRun && logRun.start.startsWith(day) ? logRun.dshExit : null),
        report: rep ? rep.rel : null,
        reportStrict: rep ? rep.strict : null,
        idempotency_keys: laneRuns.filter((r) => (r.fired_at || r.ended_at || '').startsWith(day)).map((r) => r.idempotency_key).filter(Boolean),
      });
    }

    const last = days[days.length - 1] || null;
    if (last && !['OK', 'PENDING'].includes(last.status)) problems.push(`${lane.task} ${last.day} -> ${last.status}`);

    const s = sched[lane.task] || null;
    // 调度器自身也有结论: LastTaskResult != 0 就是 Windows 侧的失败信号 (常被 wrapper exit=0 掩盖)
    if (s && Number(s.Result) !== 0) problems.push(`${lane.task} scheduler LastTaskResult=${s.Result}`);

    lanesOut.push({
      task: lane.task,
      schedule: lane.schedule,
      start: lane.start,
      scheduler: s,
      lastReportFile: mdFiles[0] ? { file: mdFiles[0].rel, dateToken: mdFiles[0].dateToken, mtime: new Date(mdFiles[0].mtime).toISOString() } : null,
      lastWrapperRun: logRun,
      lastRunRecord: laneRuns.length ? laneRuns[laneRuns.length - 1] : null,
      days,
      verdict: last ? last.status : 'UNKNOWN',
      state: last ? (VERDICT_TO_STATE[last.status] || 'pending') : 'pending',
      recovery_plan: last
        ? last.recovery_plan
        : (s && Number(s.Result) !== 0
          ? { action: 'request_human', reason: `窗口内无应触发日, 但调度器 LastTaskResult=${s.Result} (从未成功跑过)`, evidence: `Get-ScheduledTaskInfo -TaskName ${lane.task}`, retry_after_days: null }
          : { action: 'none', reason: '窗口内无应触发日', evidence: null, retry_after_days: null }),
    });
  }

  const out = {
    generated_at: new Date().toISOString(),
    generated_local: fmt(today),
    repo: REPO,
    source_of_truth: 'docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md',
    trigger_layer: 'Windows Task Scheduler (\\ZP-*) -> .hermes/cron-run/*.cmd -> dsh --profile headless',
    bus_file: '.hermes/logs/lane-runs.jsonl',
    bus_records: runsReal.length,
    bus_records_test_excluded: runsTest,
    window_days: DAYS,
    state_machine: STATE_MACHINE,
    states_doc: 'pending -> running -> completed | failed -> {pending,dead_letter} | blocked -> {pending,dead_letter} | quarantined -> {pending,dead_letter} | skipped',
    recovery_actions_doc: 'retry (瞬时/外部原因, 下轮重跑) | modify_payload (输入/前置变了, 先改入参) | request_human (需 K3 动作, 附可粘贴命令) | abort (设计缺陷/红线, 停手撞墙)',
    consumers: {
      primary: '执行层 (deepseek 车道) — 见 .hermes/cron-prompts/lane-results-bus-contract.md; 每轮开工先读 run-context-<lane>.json + 本文件',
      secondary: 'K3 复盘 (k3-ceo-daily-review.md v2) — 把结果翻成次日指令',
    },
    need_human: problems.map((p) => ({ problem: p, hint: '见对应 lane 的 recovery_plan; K3 动作类问题请一次性处理' })),
    lanes: lanesOut,
    watchdog: { task: cfg.watchdog?.task, scheduler: sched[cfg.watchdog?.task] || null },
    legacy_tasks_pending_removal: cfg.legacyTasksToRemove || [],
    problems,
    warnings,
    verdict: problems.length ? 'ATTENTION' : 'OK',
  };

  fs.mkdirSync(LOGS, { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 2) + '\n', 'utf8');

  if (!JSON_ONLY) {
    const L = [];
    L.push('# 定时任务状态 (lane-status)');
    L.push('');
    L.push(`> 生成: ${out.generated_local} · 触发层: Windows Task Scheduler \`\\ZP-*\` → \`.hermes/cron-run/*.cmd\` → \`dsh --profile headless\``);
    L.push(`> 结构记录来源: \`${out.bus_file}\` (${out.bus_records} 条真实记录${out.bus_records_test_excluded ? `, 已排除 ${out.bus_records_test_excluded} 条自测记录` : ''}, 逐步接入中) · 兜底证据: wrapper 原始日志 \`.hermes/logs/cron-ZP-*.log\``);
    L.push(`> SSoT: \`${out.source_of_truth}\``);
    L.push(`> **verdict: ${out.verdict}**${problems.length ? ' — ' + problems.join(' ; ') : ''}`);
    L.push('');
    L.push(`| lane | 触发 | 近 ${DAYS} 天逐日 verdict | state | 最近报告 | 调度器 LastRun / Result / Next | 证据日志 |`);
    L.push('|------|------|----------------------|-------|----------|-------------------------------|----------|');
    for (const l of lanesOut) {
      const flags = l.days.map((d) => `${d.day.slice(5)}:${d.status}`).join(' ') || '—';
      const rep = l.lastReportFile ? `\`${l.lastReportFile.file}\` (${l.lastReportFile.dateToken})` : '—';
      const s = l.scheduler;
      const sc = s ? `${s.Last} / ${s.Result} / ${s.Next}` : 'n/a';
      L.push(`| ${l.task} | ${l.schedule.kind}${l.schedule.day ? ' ' + l.schedule.day : ''} ${l.start} | ${flags} | ${l.state} | ${rep} | ${sc} | \`${l.lastWrapperRun?.logFile || '—'}\` |`);
    }
    L.push('');

    // 恢复分类 (P3-11): 让执行层/主程序知道下一步该干什么
    const actionable = lanesOut.filter((l) => l.recovery_plan && l.recovery_plan.action && l.recovery_plan.action !== 'none');
    L.push('## 恢复分类 (recovery_plan — 下一步该干什么)');
    L.push('');
    if (!actionable.length) {
      L.push('无 (所有 lane 无异常)。');
    } else {
      L.push('| lane | state | 动作 | 原因 | 证据/命令 | 建议重试 |');
      L.push('|------|-------|------|------|-----------|----------|');
      for (const l of actionable) {
        const r = l.recovery_plan;
        L.push(`| ${l.task} | ${l.state} | \`${r.action}\` | ${r.reason} | ${r.evidence ? '`' + r.evidence + '`' : '—'} | ${r.retry_after_days === 0 ? '下轮自然重跑' : (r.retry_after_days ? `+${r.retry_after_days} 天` : '需人处理')} |`);
      }
      L.push('');
      L.push('> 动作含义: `retry`=瞬时/外部原因下轮重跑 ; `modify_payload`=先改入参/prompt 再跑 ; `request_human`=需 K3 动作(附一条可粘贴命令) ; `abort`=设计缺陷/红线, 停手撞墙。');
    }
    L.push('');
    if (out.warnings.length) {
      L.push('## 警告 (warnings)');
      L.push('');
      for (const w of out.warnings) L.push(`- ${w}`);
      L.push('');
    }
    L.push('## 逐 lane 明细 (最近一次应触发日)');
    L.push('');
    for (const l of lanesOut) {
      const last = l.days[l.days.length - 1];
      if (!last) { L.push(`### ${l.task}`); L.push(''); L.push('近窗口内无应触发日。'); L.push(''); continue; }
      L.push(`### ${l.task} — ${last.day} \`${last.status}\``);
      L.push('');
      L.push(`- 期望触发: ${last.expected}`);
      L.push(`- run 记录: ${l.lastRunRecord ? JSON.stringify(l.lastRunRecord) : '（总线尚无记录，证据来自 wrapper 日志）'}`);
      L.push(`- wrapper 最近一次: ${l.lastWrapperRun ? `start=${l.lastWrapperRun.start} end=${l.lastWrapperRun.end ?? '-'} dsh_exit=${l.lastWrapperRun.dshExit} guardBlocked=${l.lastWrapperRun.guardBlocked} runsTotal=${l.lastWrapperRun.runsTotal}` : '无日志'}`);
      L.push(`- 当天报告: ${last.report ? '`' + last.report + '`' : '**缺失**（空转/零产出的判据）'}`);
      L.push(`- 调度器: LastRun=${l.scheduler?.Last ?? 'n/a'} Result=${l.scheduler?.Result ?? 'n/a'} State=${l.scheduler?.State ?? 'n/a'}`);
      if (last.notes.length) L.push(`- notes: ${last.notes.join(' ; ')}`);
      L.push('');
    }
    if (out.legacy_tasks_pending_removal.length) {
      L.push('## 待 K3 管理员清理的遗留任务');
      L.push('');
      for (const t of out.legacy_tasks_pending_removal) L.push(`- \`\\${t.task}\` (${t.start}) — ${t.reason}`);
      L.push('');
      L.push('执行: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\\remove-legacy-cron-tasks.ps1` (需管理员; 非提升会话实测无法 delete)');
      L.push('');
    }
    L.push('## verdict 定义');
    L.push('');
    L.push('| verdict | 含义 |');
    L.push('|---------|------|');
    L.push('| OK | 跑过且产出「文件名日期 == 目标日」的报告 |');
    L.push('| MISSING | 触发点已过 45min 仍无 wrapper 日志 / 无总线记录 |');
    L.push('| FAILED | dsh exit != 0 |');
    L.push('| BLOCKED | 前置检查拒绝执行 |');
    L.push('| STALE | 跑过但无当日报告 (空转零产出) 或 guard 拦下 src commit |');
    L.push('| PENDING | 触发点未到 / 宽限期内 |');
    fs.writeFileSync(OUT_MD, L.join('\n') + '\n', 'utf8');
  }

  if (!QUIET) {
    console.log(`lane-status: verdict=${out.verdict} problems=${problems.length} bus_records=${runsReal.length} days=${DAYS}`);
    for (const l of lanesOut) {
      const last = l.days[l.days.length - 1];
      console.log(`  ${(last ? last.status : 'UNKNOWN').padEnd(8)} ${l.task.padEnd(18)} last=${last ? last.day : '-'} report=${last && last.report ? 'yes' : 'no'}`);
    }
    console.log(`  json -> ${path.relative(REPO, OUT_JSON)}  md -> ${path.relative(REPO, OUT_MD)}`);
  }
  process.exit(problems.length ? 1 : 0);
}

main();
