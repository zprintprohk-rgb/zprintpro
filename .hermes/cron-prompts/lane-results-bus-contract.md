# 结果总线消费契约 — 执行层（deepseek 车道）每轮开工第一段必读

> **签发**: K3 2026-09-19 指令 —— 「这些定时任务结果是要给 deepseek 执行任务的数据依据和支撑的，不是给 K3 的」。
> **本文件是 5 条车道共享段**（daily-content / gsc-feedback / weekly-meta / blog-deepfix / monthly-matrix），位于各 prompt 首部第 -1 优先级。
> **上游产物**: `scripts/lane-status.mjs` → `.hermes/logs/lane-status.json`；`scripts/lane-preflight.py` → `.hermes/logs/run-context-<lane>.json`。

## 一、铁律：先读结果，再干活（顺序不可颠倒）

每轮开工，**在决定"今天做什么"之前**，必须按顺序读完这两个文件：

| 顺序 | 文件 | 作用 |
|------|------|------|
| 1 | `.hermes/logs/run-context-<本车道名>.json` | 本轮专属上下文：上次跑了几次/结果如何/上次产物文件/待重做事项/今日已发生的其他车道动作/锁与前置检查结论 |
| 2 | `.hermes/logs/lane-status.json` | 全车道近 7 天对账：每条车道逐日 verdict（`OK / MISSING / FAILED / BLOCKED / STALE / PENDING`）+ 证据路径 |

**两个文件都读不到时（首次运行/文件被清）**：在报告里记一行 `BUS_UNAVAILABLE`，然后按 prompt 正常流程执行；**不得**因为读不到结果就跳过流程，也**不得**凭空编造"上次已做过"。

## 二、结果即依据（怎么用）

1. **幂等判定（最高价值）**：`run-context` 里 `previous_run` 的 `report` 与 `files` 就是"上一轮实际交付了什么"的事实账本。K3 幂等铁律「不重复做已完成的事」据此执行：
   - 若本轮目标与 `previous_run` 已交付项相同且其 verdict ∈ `OK` → **跳过该项**，报告写 `ALREADY_DONE(since <date>)`，把算力移到未完成项；
   - 若上次 verdict ∈ `{FAILED, BLOCKED, STALE}` → **优先重做未完成部分**，并在报告里指名 `RETRY_OF(<上次 run_id>)`，附上次失败原因。
2. **幂等键（P3-10，机器判定，别靠记忆）**：每次执行带 `idempotency_key = sha256(lane|intent|target|day)[:16]`，写入 `lane-runs.jsonl` 与 `run-context.idempotency.this_run_key`。
   - **命中同一个 key = 同一件事今天已处理过 → 跳过**（先查 key，不要凭印象）；
   - 换天或换 target（如换另一篇文章）自然得到新 key → 允许重做（重做是合法的新工作，不是重复）；
   - 若 `lane-status.json.warnings` 出现 `DUPLICATE_IDEMPOTENCY_KEY`，说明同一件事被处理了两次，必须查因后再动。
3. **恢复分类（P3-11，下一步该干什么）**：`lane-status.json` 每条异常都带 `recovery_plan.action`：
   | action | 你的动作 |
   |--------|----------|
   | `retry` | 瞬时/外部原因（网络、额度、锁竞争）→ 本轮跳过，下轮自然重跑 |
   | `modify_payload` | 输入或前置条件变了（guard 拦下 src commit / slug 不存在 / 文件改名）→ **先改入参或 prompt 再跑**，禁止原样重试 |
   | `request_human` | 需 K3 动作（管理员权限 / 拍板 / 外部平台）→ 报告里单列一行，附**一条可直接粘贴的命令** |
   | `abort` | 设计缺陷或红线冲突 → 停手撞墙，**不带病重试第三次** |
4. **执行状态机（P3-12，合法迁移）**：`pending → running → {completed | failed | blocked | quarantined}`；`failed | blocked | quarantined → {pending | dead_letter}`；`pending → skipped`（幂等命中时用 `skipped`）。
   - 同一原因连续失败 2 次 → `dead_letter`（停止自动重试，等人工）；
   - 产物可疑/疑似毒数据 → `quarantined`（需人工放行，不得自动重跑写盘）。
5. **不重犯**：`run-context.previous_run.guard` / `notes` 记录上轮的拦截与告警（如 pre-commit guard 拦下 src commit、答案块字数断言未过、slug 不存在）→ 本轮改动**先过对应断言再提交**，同因失败第二次必须升级上报（不得静默重试第三次）。
6. **跨车道避让**：`run-context.sibling_lanes`（今日其他车道的实跑情况）用于避免同一天撞同一批文件。若某文件今日已被别的车道动过，**不得**在同一轮再次改写同一文件（9/19 `zh-hk.json` 撞车事故根因）；必须改时先看 `lock` 段结论。
7. **数据继承**：上一轮报告里的基线数字（GSC 位置/展示量、字数、门禁计数）是本轮的**对比基准**，报告中必须写"上轮 X → 本轮 Y"，禁止只写绝对值。

## 三、写回（每轮收尾必做）

1. 报告文件名强制 `<YYYY-MM-DD>-<本车道名>.md` 落 `.hermes/logs/`（`lane-status.mjs` 只认这个口径，否则判 `STALE`）；
2. 报告**第一段**必须含 4 行机器可读前缀（供下一轮 `run-context` 与主程序解析）：
   ```
   VERDICT: OK|PARTIAL|BLOCKED|FAILED
   CONSUMED: run-context-<lane>.json @ <生成时间> | lane-status.json @ <生成时间>
   DELIVERED: <本次实际改动的文件逗号分隔，无则 NONE>
   NEXT: <下一轮该做什么，一行；或 NONE>
   ```
3. 失败也写报告：`VERDICT: BLOCKED|FAILED` + 阻塞原因 + 已完成部分。**空转（跑了但零产出）必须显式写 `VERDICT: FAILED` + 原因**，不得静默结束。

## 四、判据纪律（防"只看触发就算成功"）

- ❌ 禁用「我跑过了」当成功；成功 = 有当日报告 + 报告里有 `DELIVERED` 与验收数字。
- ❌ 禁用「Task Scheduler Result=0 / wrapper exit=0」当成功（wrapper 恒 `exit /b %RC%`，dsh 空转也返回 0）。
- ✅ 自检顺序：`run-context` 的 `preflight` 段若为 `blocked` → 立即停手、写 `VERDICT: BLOCKED`、不要调用任何写操作。

## 五、与本 prompt 的关系

- 本契约是**执行顺序的第 -1 优先级**（先于任何内容任务、先于任何 SSoT 必读），但它**不改变**各 prompt 的业务规则；
- 业务规则冲突时以 K3 最新拍板 > AGENTS.md > 本契约 > 各专项技能（per AGENTS.md §0.34.2）；
- 本契约的落地脚本：`scripts/lane-status.mjs`（汇总）、`scripts/lane-preflight.py`（前置 + 上下文）、`scripts/lane-git-commit.py`（收尾 + 写总线），规则 SSoT = `AGENTS.md §0.35` 与 `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md`。
