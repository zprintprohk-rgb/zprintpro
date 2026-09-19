# K3 复盘 / 次日指令生成器 — SSoT prompt (v2, 2026-09-19 重写)

> **v1 (2026-08-17) 作废原因**: 正文引用 `F:\zprintpro-main-tmp`（worktree 已于 2026-09-17 移除）、`mavis cron`（执行层已迁移）、`.hermes/logs/$(date).md`（`date` 是 bash 语法，Windows 不成立），
> 且**从未在任何调度器注册**（Windows Task Scheduler 无此任务、autoclaw jobs.json 无此条）⇒ 实际长期失效。
> **v2 口径**: 第一输入 = `.hermes/logs/lane-status.json`（机器可读结果总线），不是散报告。
> **注册方式见文末「§注册」**；未注册前本文件仅是 SSoT 文本，不得声称"已在跑"。

## 0. 定位

- **消费者关系（K3 2026-09-19 更正）**：结果总线的**第一消费者是执行层**（deepseek 车道，见 `.hermes/cron-prompts/lane-results-bus-contract.md`）；**本复盘是第二消费者** —— 用于把"执行结果"翻译成"次日指令"。
- **目的**：把 5 条车道的机器对账结果，转成次日可执行的指令清单 + 需要人（K3）拍板的少数事项。

## 1. 执行步骤（严格按序）

### Step 1 · 读结果总线（第一输入，不可跳过）
1. `Read .hermes/logs/lane-status.json`
   - `verdict` / `problems[]` / 每条 lane 的 `days[]`（逐日 `status` = `OK|MISSING|FAILED|BLOCKED|STALE|PENDING` + `report` + `notes`）
   - `recovery_plan`（每条异常附带 `retry|modify_payload|request_human|abort`）与 `state`（8 态状态机）
2. `Read .hermes/logs/lane-runs.jsonl` 的最近记录（`idempotency_key` / `verdict` / `blocked_reason` / `files` / `pushed` / `head`）
3. 需要查证某条判定时，才打开对应 `.hermes/logs/cron-ZP-<lane>.log` 与当日报告 `<YYYY-MM-DD>-<lane>.md`。

### Step 2 · 读业务数据（次输入）
- GSC：`.hermes/gsc-*/extract.json`（用最近一次落盘目录，勿假设固定日期）
- 线上：`node scripts/verify-deploy.mjs`（CF Pages 状态）+ 关键页 curl 抽查
- HEAD：`git log -1`；待推队列：`git log --oneline origin/main..HEAD`

### Step 3 · 判定与分类（每条异常必须落到 4 类之一）
| recovery_plan | 含义 | 次日动作 |
|---------------|------|----------|
| `retry` | 瞬时/外部原因（网络、额度、锁竞争） | 写进次日车道 `run-context.retry_queue`，等自然重跑 |
| `modify_payload` | 输入/前置条件变了（slug 不存在、文件已改名） | 先改 prompt/入参，再重跑 |
| `request_human` | 需 K3 动作（管理员权限、拍板、外部平台） | 单列"需 K3 一件事"，附**一条可直接粘贴的命令** |
| `abort` | 设计缺陷/红线冲突 | 停手 + 撞墙升级，不带病重试第三次 |

### Step 4 · 出次日指令（≤10 行）
必含 5 段：① 昨日执行摘要（按 lane，带 verdict）② 关键数据（GSC 展示/点击/CTR 环比）③ 风险/阻塞（带 recovery_plan）④ 今日 1-3 优先级任务 ⑤ K3 决策点（只列真正需要拍板的，≤3 条）

### Step 5 · 落盘
- `.hermes/logs/<YYYY-MM-DD>-k3-daily-review.md`（**必须**用这个命名：`lane-status.mjs` 的口径要求日期前缀）
- 首段写机器可读 4 行：`VERDICT / CONSUMED / DELIVERED / NEXT`（同执行层契约 §三）

## 2. 硬约束

- ❌ **禁用 mtime 判活**、❌ **禁用 "wrapper exit=0 / Task Scheduler Result=0" 判成功**（见 `AGENTS.md §0.35.4`）
- ❌ 不得把 GSC 后台数据（pos/imps）写进任何客户可见内容（`AGENTS.md §0.23.1`）
- ❌ 不得在没有 `lane-status.json` 的情况下凭印象总结车道状态；读不到就写 `BUS_UNAVAILABLE` 并只做业务分析
- ✅ 涉及 push 的判断一律先算与上次 push 的间隔（`AGENTS.md §0.25`，30 min 硬下限）

## 3. 反例（v1 失效的直接表现）

- ❌ 引用 `F:\zprintpro-main-tmp`：该 worktree 2026-09-17 已移除，9/17 21:17 车道因此空转 4 分钟零产出
- ❌ 引用 `.hermes/logs/$(date +%Y-%m-%d).md`：Windows 下 `$(date)` 不成立，永远读不到文件
- ❌ 声称"K3 每晚 21:12 复盘 cron"：实际从未注册，属"声称已完成"（`AGENTS.md §0.24`）

## §注册（要真正跑起来，二选一）

**方式 A（推荐，与现有 6 条同构）**：在 `scripts/register-cron-tasks.ps1` 的 `$Lanes` 之外新增一个"复盘"实体（建议名 `ZP-k3-review`，每日 07:10，即 watchdog 06:43 之后），wrapper 用同一套 preflight/commit 收尾，prompt 指本文件；随后**管理员**执行一次注册（`schtasks /create` 需提升权限，非提升会话实测被拒）。

**方式 B（临时）**：由任一条 lane 的收尾（`lane-git-commit.py` 之后）追加调用一个 `scripts/k3-next-directive.mjs`，读 `lane-status.json` 生成指令草稿 —— 不改调度器，但依赖该 lane 当天确实跑过。

> 两种方式都**未落地**时为准确状态；报告里必须写"未注册"，不得写成"已启用"。
