# 定时任务 SSoT：触发层 / 结果总线 / 看门狗契约（2026-09-19 查案定稿）

> **本文回答 5 问**：① 定时任务到底设在哪 ② 主程序有没有"读"定时任务 ③ 每次执行有没有报告 ④「未分组里一堆 read 开头」是什么 ⑤ 怎么改成"定时任务把执行结果和数据交给主程序做判断依据"。
>
> **数据来源**（全部为本机实测，非推断）：
> - `schtasks /query /tn <name> /v /fo LIST`（7 个任务的 trigger / Last Run / Last Result / State 实测）
> - `C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json`（24 条 job 及其 `state.lastRunAtMs/nextRunAtMs/lastRunStatus/consecutiveErrors`）
> - `F:\zprintpro-nextjs\.hermes\cron-run\*.cmd|*.ps1`（6 个 wrapper 实体）
> - `F:\zprintpro-nextjs\scripts\register-cron-tasks.ps1|lanes-git-commit.py|cron-watchdog.py`（生成器 + 收尾器 + 看门狗源码）
> - `.hermes\logs\cron-ZP-*.log`（4 条 lane 原始日志，含 run start/end、dsh exit、lane-git 输出）
> - `.hermes\logs\cron-execution-report.md`（19 行，唯一"执行报告总览"）
> - `.hermes\logs\cron-check-tonight.md|.py` + 任务 `ZprintPro-CronWatchdog-2125`（遗留看门狗）
> - `git log/show`（d193adda / ab288758 / 8e67354e / e2048652 等的文件级证据）
> - DSH 会话落盘 `C:\Users\Administrator\.dsh\sessions\--F-zprintpro-nextjs--\`（session-* 目录 = headless lane 会话）

---

## 一、定时任务设在哪：**三层并存，只有一层在真跑**

| 层 | 实体位置 | 条数 | 实测状态 | 是否真触发 |
|----|----------|------|----------|------------|
| **A. Windows Task Scheduler**（真身） | `\ZP-daily-content` `\ZP-gsc-feedback` `\ZP-weekly-meta` `\ZP-blog-deepfix` `\ZP-monthly-matrix` `\ZP-cron-watchdog` `\ZprintPro-CronWatchdog-2125` | 7 | 5 lane + 1 watchdog = Enabled/Ready，`Last Result = 0`，`Run As = Administrator`，`RunLevel = HighestAvailable` | ✅ **唯一真触发层** |
| **B. autoclaw 注册表** | `C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json` | 24 | 23 条 `enabled=false`（均为 8 月一次性历史任务，`lastStatus=error`）；仅 1 条 `enabled=true` = 印刷需求雷达·每日采集 01:00 | ❌ 不属于本站 5 车道（ZP 名字在这里**一条都不存在**） |
| **C. Kimi Work Automation** | 已由用户全部恢复禁用 | 5 | 镜像/占位，只能跑 kimi 模型 | ❌ 非执行层 |

### 1.1 A 层的真实调用链（逐个文件核实）

```
Windows Task Scheduler \ZP-<lane>
  └─ powershell.exe -File .hermes\cron-run\ZP-<lane>.ps1      ← 墙钟上限守卫（1800s / 3600s，超时 kill → exit 124）
       └─ cmd.exe /c .hermes\cron-run\ZP-<lane>.cmd           ← host 侧 wrapper
            ├─ cd /d F:\zprintpro-nextjs                       ← K3 目录铁律
            ├─ call dsh.cmd --profile headless "Read .hermes/cron-prompts/<lane>.md ... 执行完整流程"
            │     └─ DSH Desktop.exe → desktop-cli.js（DSH_HOME=C:\Users\Administrator\.dsh，profile=headless）
            │        → DeepSeek 官方 key（harness 路由），产出内容 + 报告落 `.hermes/logs/`
            ├─ python scripts\lane-git-commit.py --lane ZP-<lane>   ← host 侧 commit/push + 写"执行报告"
            └─ echo run end >> .hermes\logs\cron-ZP-<lane>.log
```

**关键事实**：`AGENTS.md §0.34.3` 与 `.hermes/cron-prompts/v7-automation-payload-2026-09-09.json` 记载的"autoclaw Blueprint Automation（K3 9/8 06:15 拍板）"**已经不是实际触发层**。2026-09-13 的 v9.4 改派把触发层搬到了 Windows Task Scheduler（`docs/2026-09-13-k3-directive-v94-cron-rearm-deepseek.md`），执行器从 `hermes.exe`（402 余额耗尽）换成 `dsh --profile headless`。规则文档**没有同步**这一点，这就是"定时任务到底在哪"看起来混乱的根因之一。

触发时刻（实测 CalendarTrigger 的 StartBoundary）：**daily 21:17 / daily 22:43 / Fri 23:07 / Sat 05:37 / 每月 1 号 06:13 / watchdog 每天 06:43**，另加遗留 `ZprintPro-CronWatchdog-2125` **每天 21:25**。

### 1.2 权限边界（实测结论，别再派人"跑一次删除脚本"）

本机 DSH 会话实测：`User = JEROME\Administrator`，但 `IsAdmin = False`（非提升）。
- ❌ 本会话**无法** `schtasks /delete`、无法 `Unregister-ScheduledTask`（已实测被拒，`.hermes/cron-run/delete-legacy-watchdog.cmd` 注释亦记载）。
- ✅ 本会话**能**读全部任务定义、能读/写仓库文件、能跑 python/node。
- ⇒ 任何"删除/新建定时任务"的动作**必须 K3 人工用管理员权限执行一次**；执行层只能生成脚本 + 验收清单。

---

## 二、主程序"读不读"定时任务：**没读**

| 应有环节 | 现状证据 | 判定 |
|----------|----------|------|
| 有统一执行报告文件 | `.hermes/logs/cron-execution-report.md` 存在，19 行，最后一条 2026-09-19 06:43（watchdog 追加） | ✅ 存在 |
| 5 lane 每次跑完都写一条 | ❌ **9/19 blog-deepfix 整批成功却无记录**（见 §三 3.3） | 🔴 否 |
| 记录内容可用作判断依据 | ❌ 内容只有 `时间/任务/结果固定文字"✅ 完成"/报告路径/产物/push 状态`，**无 exit code、无 verdict、无失败原因、无验收数字** | 🔴 否 |
| 有人/程序真的读它 | ❌ 全仓库 grep：只有 `lane-git-commit.py` 与 `cron-watchdog.py` **写**过它，**没有任何** cron prompt / 脚本 / 会话把它当输入读 | 🔴 否 |
| 存在"读执行结果 → 出次日指令"的机制 | `.hermes/cron-prompts/k3-ceo-daily-review.md`（Step 1「读执行报告」）**未被任何 scheduler 注册**（schtasks 无此任务、autoclaw 24 条里无此条），且其正文仍是 8/17 口径（引用已删除的 `F:\zprintpro-main-tmp`、`mavis cron`、`.hermes/logs/$(date)` —— 实为 `date` 命令语法，Windows 下不成立） | 🔴 失效文档 |

**结论**：定时任务的产出**是"给人看的文本"，不是"给主程序判断的数据"**。主程序（K3）目前的"读"只能靠人工去翻 `.hermes/logs/` 里的散报告——这正好解释了用户看到的"K3 却去执行了一次定时任务"：K3 拿到的是 cron prompt 全文 + 散落的 md 报告，没有一份结构化结果喂给它，于是它把自己当成了执行体。

---

## 三、每次执行有没有报告：**有，但三处会静默漏**

### 3.1 9/17 空转实例（真静默，被 mtime 假通过掩盖）

`cron-ZP-daily-content.log` L12048–12587（21:17:01 → 21:21:20，**4 分钟**）：
```
===== run start 2026/09/17 21:17:01.44 =====
dsh: reasoning: The workspace appears empty. ... F:\zprintpro-main-tmp 是空的 (worktree 已于 9/17 移除)
dsh exit=0 -- host-side git commit/push --
===== run end   2026/09/17 21:21:20.38 exit=0 =====
```
- lane 花 4 分钟在**已删除的 worktree** 里空找，**零产出、零报告**，但因 `exit=0` → Task Scheduler `Last Result=0`、看门狗不告警。
- 看门狗 9/18 06:43 判 `[OK] ZP-daily-content: 最近报告 2026-09-16-daily-content.md (17.2h 前)` —— 拿**前一天的旧报告 mtime**当今天的存活证据。
- 🔴 **同批报告 mtime 还被批量改写**：`.hermes/logs/2026-09-14/16-daily-content.md`、`2026-09-13/14/15/16-gsc-feedback.md` 等全部 mtime = `2026-09-17 13:31:55`（迁移复制所致）⇒ **mtime 已不可作为新鲜度证据**，而看门狗唯一依赖的就是 mtime。

### 3.2 9/19 报告丢了（成功也不写记录）

`cron-ZP-blog-deepfix.log` L830–841 起：
```
[lane-git] src commit 被拦: ... 反审门童 v1 pre-commit ...
[lane-git] 提示: 生产文件未过 guard, 需人工处理 (不自动 --no-verify)
===== run end   2026/09/19 05:49:40.70 exit=0 =====
```
- `lane-git-commit.py` 的 `write_exec_report()` 在 **src commit 失败时直接 `return 4`，跳过写报告**（源码 L159–164）。
- ⇒ **`.hermes/logs/cron-execution-report.md` 里根本没有 2026-09-19 blog-deepfix 这条**（该文件最后一行是 06:43 watchdog）。
- 🔴 **wrapper 仍 `exit=%RC%`=0** → Task Scheduler 记 `Last Result=0`，"成功且无记录"。

### 3.3 报告内容本身失真（两条硬证据）

1. **报告路径取错**：L216 `for p in allowed: if p.endswith(".md") ... break` —— 取的是 **git status 字母序第一个** md，不是本 lane 的产物。实测 9/18 21:24 daily-content 那条写的是 `\.hermes\reports\title-audit-2026-09-09.md`（9/9 的旧文件），真正的 `2026-09-18-daily-content.md` 没进报告。
2. **push 状态只有 self-report**：`pushed_txt = "✅ push" if pushed else "⏳ commit(未 push)"`，无 `verify-deploy.mjs` 结论、无 CF Pages check-runs 状态、无线上探针 URL。按 `AGENTS.md §12`「push 成功 ≠ deploy 成功」，这一列**不能作为验收依据**。
3. **报告文件并未入库**：实测 `.hermes/logs/2026-09-19-blog-deepfix.md`（28,746B, 05:49:19）与 `.hermes/logs/blog-deepfix-2026-09-19.md`（7,186B, 06:10:28）**均为 untracked**（`NOT-IN-HEAD`），因为 src commit 被拦后脚本提前 return，报告 commit 步骤从未执行。

### 3.4 遗留看门狗每天报假结果（21:25，几乎从建立起就从未通过）

- 任务 `\ZprintPro-CronWatchdog-2125`（每天 21:25）→ `.hermes\cron-check-tonight.py` → 读 **autoclaw jobs.json 的 `jobs[5..9]` 下标**。
- 实测：`jobs[5..9]` 实为 `8/16 07:20 主任务触发核验` / `W2-0823 集群合并push` / `W3-0831 IndexNow全推` / `legit 信任产线` / `W2-0819 GEO首读数` —— **全部是一天一次性历史任务且 enabled=false**。
- 故 `.hermes/logs/cron-check-tonight.md` 从 9/13 到 9/17 每天写 `FAIL: 5 条仍未被调度器装载`，9/18 因这些历史 job 有 `lastRunAtMs` 而写 `PASS` —— **PASS/FAIL 都与 5 条 ZP 车道无关**。
- 该任务与 `ZP-cron-watchdog` 功能重叠，`.hermes/cron-run/delete-legacy-watchdog.cmd` 已于 9/18 备好删除脚本，**因需管理员权限而未执行 → 至今仍在每天 21:25 写假结果**。

---

## 四、"未分组里一堆 read 开头"是什么

**是 DSH 自己的 headless lane 会话，不是定时任务。**

- lane wrapper 的 prompt verbatim 以 `Read .hermes/cron-prompts/zprintpro-<lane>.md and .hermes/cron-prompts/sop-10-gate.md fully, then execute...` 开头（见 `register-cron-tasks.ps1` L76–83）。
- DSH 会把每次 headless 调用持久化为一个会话：实测 `C:\Users\Administrator\.dsh\sessions\--F-zprintpro-nextjs--\session-<uuid>\session.jsonl.zstd`，创建时刻与 cron 触发**一一对应**：
  `session-6ffe0619…`=9/18 21:17:05（daily-content）、`session-258f43f2…`=9/18 22:43:30（gsc-feedback）、`session-85fa1de8…`=9/18 23:07:02（weekly-meta）、`session-8798d496…`=9/19 05:37:13（blog-deepfix，3.4MB）。
- GUI 按"首条 prompt"给会话起标题 ⇒ 列表里就是一堆 `Read ...` 开头的、没有归属分组的条目；它们**只读 prompt**（无副作用），不是任务定义、不能删除任务、也不代表"有人在读结果"。
- 同目录还有 `--F-zprintpro-main-tmp--` 会话目录（9/17 22:43 仍在写）——已删除 worktree 的幽灵会话，与 §3.1 空转同源。

> 一句话：**"read 开头的一堆" = 执行层的运行记录（会话），不是调度器里的任务，也不是主程序的读取动作。**

---

## 五、执行方案（P0→P3，含验收判据）

### P0-A 遗留任务清理（K3 管理员执行一次，阻塞项）
生成一个**幂等、可审计**的管理员脚本（本次已随附 `scripts/remove-legacy-cron-tasks.ps1`），一次清掉两条：
| 要删的任务 | 为什么 |
|------------|--------|
| `\ZprintPro-CronWatchdog-2125`（每天 21:25） | 读错 registry 下标，PASS/FAIL 均与本站无关，每天写假结果 |
| `\ZprintPro-CronWatchdog-2125` 之外**不删** `ZP-*`；`ZP-blog-deepfix` 保留（它是真车道） | 9/19「撞车」实为 lane 与人手会话同时改同一文件所致，见 P1-C 的串行化，不靠删任务解决 |

> 说明：9/19 05:37 的 `ZP-blog-deepfix` 是**正常车道**（`Sch=WEEKLY/SAT/05:37`），不是"遗留同名任务"。它同时修改 `src/data/blog-data/zh-hk.json` 与 K3 人手会话冲突=**缺少互斥锁**，修法见 P1-C，删任务解决不了。

### P0-B 报告缺口归零（改 `scripts/lane-git-commit.py`）
① `write_exec_report()` 移到**所有 return 分支之前**（finally 语义），任何失败都必须留一行；
② 报告行新增机器可读列：`exit_code / verdict / guard 结果 / commit hash / push 状态 / 依据文件（直接取本 lane 报告文件名，不再取字母序第一个）`；
③ push 状态改为三段：`push → verify-deploy.mjs 退出码 → 线上探针 URL`，不再只写 self-report。

### P0-C 结果总线（给主程序"喂数据"）
- 每次 lane 收尾追加一行 JSONL 到 `.hermes/logs/lane-runs.jsonl`：
  `{run_id, lane, trigger:"schtasks", fired_at, ended_at, dsh_exit, verdict(PASS/FAIL/BLOCKED), guard:{...}, files, commit, pushed, deploy_verified, evidence:[...], next_expected_at}`
- 新增 `scripts/lane-status.mjs`：读 JSONL + 报告 mtime + schtasks 定义，输出
  - `.hermes/logs/lane-status.json`（机器读，主程序判断依据）
  - `.hermes/logs/lane-status.md`（人读，一页看完 5 lane 最近 7 天）
- **接入主程序**：把 `lane-status.json` 写进 5 个 lane prompt 的"启动必读 SSoT"与 K3 复盘流程的**第一输入**；`k3-ceo-daily-review.md` 重写为读 `lane-status.json`（旧文引用 main-tmp/mavis 的部分作废）。

### P1-A 看门狗升级（改 `scripts/cron-watchdog.py`）
弃用"文件 mtime 新鲜度"，改为**期望触发 vs 实跑记录**：
1. 每天 06:43 计算"昨天 00:00–今天 06:43 各 lane 应有的触发次数"（daily=1，Fri=weekly，Sat=blog，1 号=monthly）；
2. 与 `lane-runs.jsonl` 实跑记录对账 → `MISSING / FAILED / BLOCKED / OK`；
3. 触发点后 45 分钟内无 run 记录 = `MISSING`（覆盖 9/17 那类空转：跑过但零产出 ⇒ 由 P0-B 的 verdict 兜住）；
4. 直接把对账结果写进 `cron-execution-report.md` 的**结果列**（不再恒写"✅ 通过"）+ 写 `lane-status.json`；
5. 删除 `.hermes/logs/cron-check-tonight.py|.cmd` 的使用（文件保留作历史，任务由 P0-A 删除）。

### P1-B 车道护栏（防 9/17 空转复发）
每个 lane wrapper 增加 preflight（`scripts/lane-preflight.py`，非 0 即 exit 非 0 + 写 `BLOCKED` 记录）：
`① repo 根存在且是 git worktree ② HEAD 分支 = main ③ 上一 lane 已收尾（锁）④ 磁盘/依赖在位`。
任一不过 ⇒ **不调用 dsh**，避免再把 4 分钟算力烧在空目录上。

### P1-C 互斥锁（防 9/19「撞车」复发）
- `.hermes/locks/lane.lock`（含 pid/lane/起止时间，`lane-preflight` 抢锁、wrapper 收尾释放，超 3600s 视为陈旧可夺）；
- 人手会话（DSH Desktop）在改 `src/data/blog-data/*.json` 前**必须**读锁文件；发现 lane 持锁则**等待或只做只读分析**。
- 9/19 事实链：lane 05:37→05:49 写同一文件，人手会话 05:41 起并发写 ⇒ 坏版 `_broken-zhhk-lane-20260919.json`。锁是唯一根治手段。

### P2 文档与 SSoT 同步
- `AGENTS.md` 新增 §0.35「定时任务 SSoT 与结果总线」（触发层=Windows Task Scheduler、执行器=dsh headless、结果总线=lane-runs.jsonl、看门狗契约、exit code 映射、管理员边界）；
- 作废 `§0.34.3` 中"autoclaw Blueprint Automation 5 实体"作为调度 SSoT 的表述（保留史实、标注迁移）；
- `register-cron-tasks.ps1` 保持为**唯一生成器**（wrapper 里已有"do not hand-edit"），SSoT 变更只改它 + 重跑 `-ArtifactsOnly`。

### P2-b GUI 噪音治理（可选）
lane 会话标题固定为 `[cron] ZP-<lane> <date>` 便于分组（需在 wrapper prompt 首行加标记，或改 headless 会话标题策略）；`--F-zprintpro-main-tmp--` 幽灵会话目录归档。

### P3 验收（可判死的数字）
| # | 判据 | 目标 |
|---|------|------|
| 1 | `lane-runs.jsonl` 条数 vs schtasks 实触发次数（近 7 天） | 1:1，缺口 0 |
| 2 | `cron-execution-report.md` 中 lane 记录数 vs 实跑数 | 相等（含失败行） |
| 3 | 看门狗能复现 9/17 那类空转 | 人为构造空转 → 次日 06:43 必报 `MISSING`/`FAILED` |
| 4 | 遗留任务清除 | `schtasks /query` 中 `ZprintPro-CronWatchdog-2125` 消失，21:25 不再写假报告 |
| 5 | 主程序消费 | 任一 lane 报告首页即含 `lane-status.json` 摘要（或 K3 复盘首段引用它） |
| 6 | 锁生效 | 人为并行起两个 lane → 第二个 `BLOCKED` 且不写文件 |

---

## 六、状态分级（per §0.24 笼统批准 ≠ 动作完成）

| 项 | 状态 | 证据 |
|----|------|------|
| 触发层 = Windows Task Scheduler（6 条 ZP） | ✅ 已完成 | schtasks 实测 Enabled/Ready，9/19 05:37 实跑 |
| 执行器 = dsh --profile headless | ✅ 已完成 | wrapper L9 + 会话落盘 |
| 统一执行报告文件存在 | ✅ 已完成 | cron-execution-report.md 19 行 |
| 每 lane 必有记录 | 🔴 未达 | 9/19 blog-deepfix 缺行 |
| 记录可作判断依据 | 🔴 未达 | 无 exit code / verdict / 验收数字 |
| 主程序读定时任务结果 | 🔴 未达 | 零消费者；k3-ceo-daily-review 未注册且失效 |
| 遗留任务清理 | 🔴 撞墙（需管理员） | 会话非提升，实测无法 delete |
| 本次改动 | ⏳ 已落盘未 push | 见 git status；push 待 §0.25 30min 窗口 |
