# 定时任务查案与结果总线落地 — 证据记录 (2026-09-19 07:5x, DSH 会话)

> 案由：K3 提出 5 问 ——「定时任务设在哪 / 主程序有没有读 / 每次执行有没有报告 / 未分组里一堆 read 开头是什么 / 把执行结果和数据交给主程序做判断依据」。
> 本文只记**实测证据 + 已改动的文件 + 验收结果**；完整分析与执行方案见 `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`，规则固化见 `AGENTS.md §0.35`。

## 一、实测证据（全部本机可复现）

### 1. 触发层 = Windows Task Scheduler（7 条）
```
schtasks /query /tn <name> /v /fo LIST
\ZP-daily-content    Daily  21:17  Last 2026-09-18 21:17:01  Result 0  Enabled/Ready
\ZP-gsc-feedback     Daily  22:43  Last 2026-09-18 22:43:01  Result 0  Enabled/Ready
\ZP-weekly-meta      Weekly FRI 23:07  Last 2026-09-18 23:07:00  Result 0  Enabled/Ready
\ZP-blog-deepfix     Weekly SAT 05:37  Last 2026-09-19 05:37:00  Result 0  Enabled/Ready
\ZP-monthly-matrix   Monthly 1 06:13   Last 1999-11-30 (从未跑) Result 267011 Enabled/Ready
\ZP-cron-watchdog    Daily  06:43  Last 2026-09-19 06:43:01  Result 0  Enabled/Ready
\ZprintPro-CronWatchdog-2125  Daily 21:25  Last 2026-09-18 21:25:01  Result 0  ← 遗留/读错对象
```
`Get-ScheduledTask` 交叉验证：5 lane + watchdog `State=Ready`；`monthly-matrix` `Result=267011`。

### 2. autoclaw 注册表不含任何 ZP 车道
`jobs.json` 24 条：23 条 `enabled=false`（8 月一次性历史任务，`lastRunStatus=error`），唯一 `enabled=true` = `印刷需求雷达·每日采集 01:00`（`consecutiveErrors=4`，`lastError=402`，与本站无关）。
⇒ `AGENTS.md §0.34.3` 记的「autoclaw Blueprint Automation 5 实体」是**从未创建**的调度层（`cron-check-tonight.md` 9/13–9/17 每日实测 `首次启动 0/5`）。

### 3. 权限边界（实测）
```
[System.Security.Principal.WindowsIdentity]::GetCurrent() -> JEROME\Administrator
IsInRole(Administrator) -> False
```
⇒ 本会话无法 `schtasks /delete` / `Unregister-ScheduledTask`；`.hermes/cron-run/delete-legacy-watchdog.cmd` 9/18 备好但因权限未执行。

### 4. 空转事故（9/17 daily-content，4 分钟算力烧在已删除 worktree）
`cron-ZP-daily-content.log` L12048–12587：
```
===== run start 2026/09/17 21:17:01.44 =====
dsh ... F:\zprintpro-main-tmp 是空的 (worktree 已于 9/17 移除) ...
===== run end   2026/09/17 21:21:20.38 exit=0 =====
```
零产出、零报告、Task Scheduler `Result=0`、watchdog 9/18 06:43 仍判 `[OK]`（用的是 9/16 旧报告的 mtime）。

### 5. mtime 已失真
`.hermes/logs/2026-09-14/16-daily-content.md`、`2026-09-13/14/15/16-gsc-feedback.md` 等 mtime 全被刷成 `2026-09-17 13:31:55` ⇒ 看门狗唯一依赖的 mtime 不再是新鲜度证据。

### 6. 9/19 blog-deepfix：跑成功但报告里没有
wrapper 日志 05:37:09 → 05:49:40 `exit=0`，`[lane-git] ZP-blog-deepfix: 白名单改动 11 个`，随后 `src commit 被拦`/`生产文件未过 guard` → `cron-execution-report.md` **无 9/19 blog-deepfix 行**（该文件最后一行是 06:43 watchdog）。
根因（源码）：`lane-git-commit.py` L156–164 在 src commit 失败时 `return 4`，**跳过 `write_exec_report()`**。

### 7. 报告文件从未入库
`.hermes/logs/2026-09-19-blog-deepfix.md`（28,746B，05:49:19）与 `.hermes/logs/blog-deepfix-2026-09-19.md`（7,186B，06:10:28）实测 `NOT-IN-HEAD`（untracked）。

### 8. 报告路径取错（历史行实锤）
`cron-execution-report.md:13`：`ZP-daily-content` 的报告列写的是 `.hermes/reports/title-audit-2026-09-09.md`（9/9 旧文件）；
`:17`：`ZP-gsc-feedback` 写的是 `.hermes/logs/cron-check-tonight.md`（别人的文件）。根因：原实现取 git status 里字母序第一个 `.md`。

### 9. 遗留看门狗每天写假结果
`\ZprintPro-CronWatchdog-2125` → `.hermes/cron-check-tonight.py` 读 autoclaw `jobs[5..9]`，而这 5 个下标实为 `8/16 07:20 主任务触发核验` / `W2-0823 集群合并push` / `W3-0831 IndexNow全推` / `legit 信任产线` / `W2-0819 GEO首读数`（全 disabled）。
`cron-check-tonight.md`：9/13–9/17 每天 `FAIL: 5 条仍未被调度器装载`；9/18 `PASS: 至少一个任务已首次运行` —— 两次结论都与 5 条 ZP 车道无关。

### 10. 「未分组一堆 read 开头」= DSH headless lane 会话
`C:\Users\Administrator\.dsh\sessions\--F-zprintpro-nextjs--\`：
```
session-6ffe0619-...  9/18 21:17:05  <- ZP-daily-content
session-258f43f2-...  9/18 22:43:30  <- ZP-gsc-feedback
session-85fa1de8-...  9/18 23:07:02  <- ZP-weekly-meta
session-8798d496-...  9/19 05:37:13  <- ZP-blog-deepfix (3.4 MB)
```
会话首行 `cwd=F:\zprintpro-nextjs`；prompt verbatim 以 `Read .hermes/cron-prompts/...` 开头（wrapper 内写死）⇒ GUI 按首条 prompt 起标题，故成「未分组 / read 开头」条目。**是运行记录，不是任务定义，无副作用。**
另有 `--F-zprintpro-main-tmp--`（9/17 22:43 仍写）= 已删除 worktree 的幽灵会话目录。

### 11. 9/19 撞车事实链（非"遗留同名任务"）
- `\ZP-blog-deepfix` 09-19 05:37:00 正常触发（Last Result 0，Next 2026-09-26 05:37）；
- lane wrapper `run start 05:37:09` → `run end 05:49:40`；
- 人手会话 05:41 起并发改同一文件 `src/data/blog-data/zh-hk.json` → 坏版备份 `.hermes/_broken-zhhk-lane-20260919.json`（1,120,662B，06:01:16）；
- `d193adda` 06:09:11 落重写（zh-hk.json 内 `a5-vs-a6-flyer-size` 条目实测 13,496 字符，含 3 个琥珀答案块 + 10 个问句 H2 + `ISO 216`/`ANA/DMA 2025`/`Lob 2025`/`USPS`/`Canada Post`/`Grand View Research` 数据源行）—— **重写内容确实在 HEAD 里**（`--stat` 只显示 6 行是因为 content 字段单行承载全文）。
⇒ 修因 = 加互斥锁（§0.35.6），不是删任务。

## 二、本批已改动文件

| 文件 | 改动 |
|------|------|
| `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md` | 新增：全案查案报告 + 执行方案 P0–P3 + 验收判据 |
| `AGENTS.md` | 新增 §0.35（触发层 / 结果总线 / 判据铁律 / 已知坑 / 待落地）；§0.34.3 定时任务行加 2026-09-19 修正 |
| `.hermes/cron-lanes.json` | 新增：车道清单 SSoT（5 lane + watchdog + 待清理遗留任务 + 报告命名规则） |
| `scripts/lane-status.mjs` | 新增：结果总线汇总器 → `lane-status.json`（机器读）+ `lane-status.md`（人读） |
| `scripts/remove-legacy-cron-tasks.ps1` | 新增：管理员清理遗留任务（幂等 + 验证 + 证据输出） |
| `scripts/lane-git-commit.py` | 修复：① 失败也写报告（抽出 `_commit_reports()`，guard 拦下时先落报告再返回 4）② 报告路径取本 lane 产物 ③ 结果列写真实 verdict+exit ④ 新增 `write_lane_run()` 写 `lane-runs.jsonl` |
| `.hermes/logs/lane-runs.jsonl` | 新增：结果总线首条记录（自测记录，已标 `test_record:true`，lane-status 汇总时排除） |
| `.hermes/logs/lane-status.json` / `.md` | 新增：本批生成的实况状态（首跑即判出 blog-deepfix 9/19 = STALE、monthly-matrix `LastTaskResult=267011`） |

## 三、验收结果

### 3.1 `lane-status.mjs` 实测（`node scripts/lane-status.mjs --days=7`）
```
verdict=ATTENTION problems=2
  PENDING  ZP-daily-content    last=2026-09-19 report=yes
  PENDING  ZP-gsc-feedback     last=2026-09-19 report=yes
  OK       ZP-weekly-meta      last=2026-09-18 report=yes
  STALE    ZP-blog-deepfix     last=2026-09-19 report=yes   <- 9/19 guard 拦截迹象（suspected）
  UNKNOWN  ZP-monthly-matrix   last=-           report=no
problems: ZP-blog-deepfix 2026-09-19 -> STALE ; ZP-monthly-matrix scheduler LastTaskResult=267011
```
- 9/13 之前判 `MISSING` 与事实吻合（v9.4 于 9/13 20:10 武装、触发层 9/14 起才有）；
- 判据**未使用 mtime**，故不受 §一.5 的 mtime 失真影响；
- 报告匹配已加固：`step5-merge-batch-report-2026-09-19.md` 这类第三方文件不再被误认（首版曾误配，已修）。

### 3.2 `lane-git-commit.py` 行为测试（临时目录内跑，断言全过）
```
--- cron-execution-report.md (临时目录) ---
| 2026-09-19 07:52:16 | ZP-blog-deepfix | FAILED(guard) (exit=4) | `.hermes/logs/2026-09-19-blog-deepfix.md` | src/data/blog-data/zh-hk.json | ⏳ commit(未 push) |
--- lane-runs.jsonl ---
{"run_id":"ZP-blog-deepfix-20260919T075216", ..., "wrapper_exit":4, "verdict":"BLOCKED", ...}
ASSERTIONS: PASS   (report 路径正确 / verdict 正确 / exit=4 正确)
```
`python -m py_compile scripts/lane-git-commit.py` → exit 0；`--dry-run` → 白名单 19 文件、未写盘。

## 四、未完成（不得报"已解决"）

| 项 | 状态 | 阻塞 |
|----|------|------|
| 清理 `\ZprintPro-CronWatchdog-2125`（每天 21:25 写假报告） | 🔴 撞墙 | 需 K3 管理员跑 `scripts/remove-legacy-cron-tasks.ps1`（会话 `IsAdmin=False` 实测无法 delete） |
| 看门狗改「期望触发 vs 实跑记录」对账 | ⏳ 已设计未落地 | 见 §0.35.6-1（需改 `scripts/cron-watchdog.py` 并重跑 `register-cron-tasks.ps1 -ArtifactsOnly`） |
| lane 前置检查 `lane-preflight.py` | ⏳ 已设计未落地 | §0.35.6-2（防 9/17 空转复发） |
| `.hermes/locks/lane.lock` 互斥 | ⏳ 已设计未落地 | §0.35.6-3（防 9/19 撞车复发） |
| `k3-ceo-daily-review.md` 改为读 `lane-status.json` | ⏳ 已设计未落地 | §0.35.6-4（旧文引用 main-tmp/mavis 已失效，且未被任何调度器注册） |
| 本批 commit / push | ⏳ commit 本地 | §0.25 30min 窗口（origin/main 8e67354e @ 09-19 07:34；下次可推 ≥ 08:04） |

## 六、下一阶段落地（K3 2026-09-19 指令：结果要喂给 **执行层**，不是喂给 K3）

### 6.0 第二轮（P1/P3 收尾）实测结论

| 项 | 结论 | 证据 |
|----|------|------|
| P3-10 幂等键 | ✅ 落地 | `idempotency_key = sha256(lane\|intent\|target\|day)[:16]`；单测：同模块/跨模块同日同目标一致、换天/换 intent 得新 key；负向用例注入重复 key → `warnings.DUPLICATE_IDEMPOTENCY_KEY 152fae94b2081d68` |
| P3-11 恢复分类 | ✅ 落地 | `recovery_plan.action`：`blog-deepfix → modify_payload`（guard 拦 src commit 须先过断言）、`monthly-matrix → request_human`（窗口内无触发日但 `LastTaskResult=267011`） |
| P3-12 8 态状态机 | ✅ 落地 | `state_machine` 迁移表导出；`blog-deepfix state=quarantined`、`weekly-meta state=completed` |
| P1-3 K3 复盘 v2 | ✅ 文本完成（**未注册**） | `k3-ceo-daily-review.md` 第一输入 = `lane-status.json`；附处置表 + 注册方式；明示未注册 |
| P1-5 锁互斥压测 | ✅ PASS | 两进程同时 `--acquire`：先到 `EXIT=0` 持锁，后到 `EXIT=10 blocked`（lock_free: ZP-daily-content 持锁 pid=10960）且不调用 dsh |
| P1-6 legacy 断链 | ✅ PASS | `lane-status.mjs` / `lane-preflight.py` / `cron-watchdog.py` 全 clean；全仓 `jobs.json` 仅剩 2 处注释/独立清理脚本 |
| P2-9 CJK 清理 | ✅ 落地 | `delete-legacy-watchdog.cmd` → 纯 ASCII（cmd.exe OEM 码页会吃掉 CJK） |

**本轮又抓到 2 个真实缺陷（已修）**：
1. **TDZ 崩溃**：幂等去重循环写在 `warnings`/`seenIdem` 声明之前 → `ReferenceError: Cannot access 'warnings' before initialization` ⇒ **整个对账器静默失效**（只在真正开始对账时才崩）。已把三个容器集中前移，并留注释记教训。
2. **报告归属串档**：`monthly-matrix` 的最近报告曾被匹配成 `2026-09-19-cron-source-of-truth-findings.md`（本查案文档）⇒ 加**车道 token 归属判定**（文件名必须含车道名或完整 task 名），现正确显示 `—`。

### 6.1 结果回喂执行层（本批新增，闭环真正合上）

| 件 | 作用 |
|----|------|
| `.hermes/cron-prompts/lane-results-bus-contract.md` | **结果总线消费契约**：先读结果再干活 / 幂等判定（不重复做已完成的事）/ 不重犯（上次被 guard 拦的先过断言）/ 跨车道避让（同一文件同日不被两条路径改写）/ 数据继承（上轮 X → 本轮 Y）/ 写回格式（报告首段 `VERDICT / CONSUMED / DELIVERED / NEXT`） |
| 5 条 lane prompt 首部注入 | 用 `scripts/inject-results-bus-contract.mjs` 在该 5 个 prompt 最前插入**第 -1 优先级**引用块（含计数断言/形状断言/备份/幂等，断言未过不写盘；实测二次运行 `inject=0 skip=5` 幂等） |
| `.hermes/cron-run/lane-prompt-template.txt` | wrapper 的 dsh prompt 模板（ASCII）；把 `run-context` + `lane-status` + 契约文件列为 **STEP 0**，先读结果再决定今天干什么 |
| `scripts/lane-preflight.py` | 前置检查（repo/worktree/branch/锁）+ 抢 `.hermes/locks/lane.lock` + 生成 `run-context-<lane>.json`（上一轮结果=**幂等账本**、retry_queue、sibling_lanes=今日其他车道动作）；不过则不调用 dsh 并写 `BLOCKED` 总线记录 |
| `scripts/cron-watchdog.py` v2 | 看门狗从「mtime 新鲜度」改为**四方对账**（调度器 + `lane-runs.jsonl` + wrapper 日志 + 当日报告），实现委托 `lane-status.mjs`；另查陈旧锁 |

### 6.2 集成测试暴露并修复的 4 个真实缺陷（**若不测就会带病上线**）

| # | 缺陷 | 后果 | 探测方式 |
|---|------|------|----------|
| 1 | PS 5.1 把「多行字符串 + 行首 `+`」拼接**静默退化成 `$null`** | 生成的 wrapper 里 `dsh ... ""` —— **5 条车道全部收到空 prompt** | 生成后逐行核对 wrapper，发现 `dsh-line-len=181`（应为 1400+） |
| 2 | 生成器含 CJK 注释 → PS 5.1 按 ANSI/GBK 解码 BOM-less UTF-8 → 解析崩 | `MissingEndParenthesisInExpression`，wrapper 生成失败/带病 | 直接跑生成器看 exit code + 报错 |
| 3 | `.cmd` 由 `-Encoding ASCII` 写出，CJK 变 `?` | 车道 prompt 被搅成乱码（`STEP 0 (?? ? ????????)`） | 读生成的 .cmd 首 300 字符 |
| 4 | `if not "%PF%"=="0" ( ... )` 块内含带引号 echo | cmd.exe 报 `-- was unexpected at this time.` **整条 wrapper 中止**，preflight 形同不存在、锁可能泄漏 | 端到端跑 wrapper（dsh 替换为 no-op 探针）→ `[harness exit=255]` |

修法：①③模板移出到 ASCII 的 `lane-prompt-template.txt`（PS 侧只读+断言 ASCII 纯净度，CJK 契约文本留在 `.md`）；②生成器恢复**纯 ASCII**（实测 `non-ASCII count: 0`）；④改单行 `if "%PF%"=="0" goto preflight_ok`，退出码/日志都在块外。
负向用例：模板注入 CJK → 生成器**必须** `exit 1` 并报 "would mangle them to '?'"（实测通过）。

### 6.3 端到端集成测试实测（dsh 替换为 no-op 探针）

```
===== run start 周六 2026/09/19  8:19:02.56 =====
[preflight] 上下文已写: .hermes/logs/run-context-ZP-blog-deepfix.json
[preflight] verdict=ok lock=True retry=1 siblings=2
  [OK  ] repo_worktree_branch / lock_free / lane_status_available / lock_acquired
  [FAIL] prev_run_known: 总线无本车道记录 (首次/总线刚启用) -> 以报告文件为准     <- 预期
[TEST-HARNESS] dsh no-op
===== dsh exit=0 -- host-side git commit/push -- =====
[lane-git] src commit 完成 / report commit 完成 / push 完成
[lane-git] 执行报告已追加 / 结果总线已追加
[preflight] 锁已释放
```
⇒ **preflight → 锁 → 干活 → host 侧 commit → 释放锁** 全链路通；且 `lane-git-commit.py` 2026-09-19 修复被实证生效（报告行 + 总线记录都写出来了，不再"成功却无记录"）。

### 6.4 ⚠️ 事故自查上报（本会话造成，per §0.25.3 / 事故 6 惯例）

集成测试直接跑**真实 wrapper**，其 host 侧 commit/push 步骤不依赖 dsh 结果，于是**真的 push 了两次**：

| push | commit | 时间 | 距上次间隔 | §0.25 判定 |
|------|--------|------|-----------|-----------|
| 1 | `0efaf31e` | 09-19 07:53 | **18.4 min** | 🔴 撞车（<30 min） |
| 2 | `cb73f581` + `f5bb90b6` | 09-19 08:19 | **25.7 min** | 🔴 撞车（<30 min） |

- 推送内容 = 本批 cron 修复 + 车道 9/19 两份报告（315 行 / 79 行）+ i18n/step4/step5 既有报告 + `run-context`/`lane-status`/`lane-runs`（均为正规产物，**无 src/ 生产文件被误推**：`src commit` 那一步只加了 5 个白名单文件，实测 diff 全在 `.hermes/`）。
- 代价：违反 30 min 硬下限 2 次（下次可推窗口 = 上次 push + 30 min）。
- 根因：把"端到端集成测试"跑在了**真实生产 wrapper** 上。修法（后续）：集成测试只在**副本** wrapper 上跑，且把 host 侧 `lane-git-commit.py` 行也一并替换为 no-op；已在本文 §6.2 #4 记录为流程教训。
- 后续动作：本批剩余修复 **只 commit 不 push**，push 交给下一个车道周期（per §0.25.9）。


## 五、数据来源

- `schtasks /query /tn <name> /v /fo LIST` 与 `Get-ScheduledTask`/`Get-ScheduledTaskInfo`（2026-09-19 实测）
- `C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json`（24 条 job 及其 state）
- `.hermes/cron-run/{ZP-*.cmd,ZP-*.ps1,delete-legacy-watchdog.cmd}`、`scripts/{register-cron-tasks.ps1,lane-git-commit.py,cron-watchdog.py}`
- `.hermes/logs/cron-ZP-{daily-content,gsc-feedback,weekly-meta,blog-deepfix,cron-watchdog}.log`
- `.hermes/logs/{cron-execution-report.md,cron-check-tonight.md,cron-check-tonight.py}`
- `C:\Users\Administrator\.dsh\{sessions\--F-zprintpro-nextjs--,profiles\headless,settings.yaml}`
- `git log/show`（d193adda / ab288758 / 8e67354e / e2048652）、`git status --porcelain`
- 自测输出：`node scripts/lane-status.mjs --days=7`、`python -m py_compile scripts/lane-git-commit.py`
