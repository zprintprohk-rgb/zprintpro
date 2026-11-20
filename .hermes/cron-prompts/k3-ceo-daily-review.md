<!-- COORDINATED-FLYWHEEL-2026-11-14 BEGIN -->
# 2026-11-14 协同飞轮：日协调、独立生产验收与次日派单

1. **先消费同一协同板**：读 `run-context-ZP-k3-review.json` 的 `coordination`、`.hermes/logs/coordination-board.json`、lane-status 与 recent bus。按 lane 汇总 READY／WAITING_K3／BLOCKED_INFRA／MEASURE_HOLD，次日指令不得越权改状态。
2. **独立验收优先**：`VERIFY-FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL` 为 READY 时，只核查 Cloudflare 部署证据与线上 URL 断言；ff97d235／push 只能证明代码推送，线上未核实前保持 PENDING，不重做 daily 的源修改。
3. **本车道职责**：检查各车道是否消费同一 baseline、是否同文件撞车、是否缺 production_deploy／online_verify／retest，再把未完成交接退回原 owner；不替 GSC 造数、不替 weekly 自批 snippet、不替 Blog 产文。
4. **运行与业务分账**：2147946720、自然缺跑和协同板构建失败单列；手动 Harness、报告存在、隔离测试通过均不证明自然调度恢复。GSC 只说明搜索表现，AI 引用和转化仍按各自实测门槛。
<!-- COORDINATED-FLYWHEEL-2026-11-14 END -->

<!-- TRUTH-CEO-REVIEW-2026-11-13 BEGIN -->
# 2026-11-13 当前执行块：真实完成度与商业裁决优先级

1. `days[].status` 现含 `OK|PARTIAL|NO_OP|MISSING|FAILED|BLOCKED|STALE|PENDING`；PARTIAL=completed+ATTENTION，只跟进 NEXT，NO_OP=completed 且不重试。不得把 PARTIAL 写成 OK，也不得把完整真实报告误判为空转。
2. 首读 `docs/2026-11-13-three-market-seo-aeo-geo-two-week-flywheel.md` 与最新 GSC 复核资产：全站不是全面排名下跌，28d 展示增加、平均位置微升，但点击与 CTR 回落；不得宣称询盘、订单或收入变化。
3. 第一商业优先级是 posters／stickers／flyers／en small-batch／en catalog／ja 教材与 C109 的商业真值冲突裁决，其次才是首页零点击 CTR 和深层 Blog。未拍板数字只列冲突与推荐裁决流程，不替 K3 选值。
4. 调度器 LastTaskResult=2147946720 与自然触发缺跑必须独立列出；手动立即执行、wrapper=0、脚本测试通过均不证明自然调度恢复。不得自行改触发时刻或新增任务。
5. 次日指令只派 bounded 项：owner／baseline／approval／deploy／verify／retest／exit 必填；历史异常若后续已有 OK／PARTIAL／NO_OP 真实终态，读 suppressed_retry_queue 并不再重排。
<!-- TRUTH-CEO-REVIEW-2026-11-13 END -->

<!-- EVIDENCE-LEARNING-CLOSED-LOOP-2026-11-03 BEGIN -->
# 2026-11-03 最新执行块：证据分流与学习闭环

> 本块是当前执行口径，置于历史恢复／增产指令之前；不取代 K3 拍板、AGENTS.md、结果总线契约和商业真值门禁。配置文本更新不等于自然定时调度已验证恢复。

1. **先读证据再选题**：依次消费结果总线、不晚于当日的最新 `.hermes/logs/gsc-daily-anomaly-*.json`、最新 `.hermes/logs/periodic-review-weekly-*.json`（月度再加 `periodic-review-monthly-*`）、`evidence_handoffs`、本车道队列及上轮报告。缺失可选输入必须写 `available:false`，不得编造。
2. **统一口径**：xlsx 文件新鲜不代表 API 平面新鲜；首个 `RECOVERY` 值必须使用当日 detector 的 `recovery_ratio_vs_mean28_dynamic`。123.7% 是 2026-11-03 全国家曝光指标口径，不等于排名、处罚、询盘、订单或收入恢复。
3. **FIX／MEASURE／SCALE 分流**：页一高展示零点击只进入 FIX 候选，先记录 SERP feature 与真实 title/snippet，再决定单变量修改；深位词、query×page 分散和 AI 缺席进入 MEASURE，不直接发长文、301、canonical 或 noindex；只有 `baseline + change + production_deploy + online_verify + retest + scale_evidence` 全部齐全才可 SCALE。
4. **实验账本**：每项 FIX 必须记录审批门、冻结 baseline、唯一变更、production deploy／CF 状态、线上核验、D1/D2 健康检查及 7/14/28 天复测、结果、失败原因和下一动作。窗口移动只是观察，不是实验胜负。
5. **重试与退出**：同因失败不得无间隔重试；写明 retry_at／cooldown、恢复条件和 owner。复测完成、WAITING_K3、BLOCKED_INFRA 或有依据的 NO_OP 都是合法退出，禁止为产文而产文。
6. **学习只沉淀证据**：周／月反馈由既有 `scripts/strategy-feedback.py` 生成；未部署或缺 online_verify 不得进入学习候选。不得自行放宽权限、自批准 WAITING_K3、自动改写共享 prompt，或新建 cron／Kimi Automation。
<!-- EVIDENCE-LEARNING-CLOSED-LOOP-2026-11-03 END -->

# K3 复盘 / 次日指令生成器 — SSoT prompt (v2, 2026-09-19 重写)

> **v1 (2026-08-17) 作废原因**: 正文引用 `F:\zprintpro-main-tmp`（worktree 已于 2026-09-17 移除）、`mavis cron`（执行层已迁移）、`.hermes/logs/$(date).md`（`date` 是 bash 语法，Windows 不成立），
> 且**从未在任何调度器注册**（Windows Task Scheduler 无此任务、autoclaw jobs.json 无此条）⇒ 实际长期失效。
> **v2 口径**: 第一输入 = `.hermes/logs/lane-status.json`（机器可读结果总线），不是散报告。
> **注册状态（2026-10-29 D7 修正）**: `\ZP-k3-review` 每日 07:10 **已注册实跑**（bus 记录 + 10-29 07:10 preflight OK + wrapper runsTotal=8）；本文件即该 lane 的 prompt SSoT，**不得再写「未注册」**。

## 0. 定位

- **消费者关系（K3 2026-09-19 更正）**：结果总线的**第一消费者是执行层**（deepseek 车道，见 `.hermes/cron-prompts/lane-results-bus-contract.md`）；**本复盘是第二消费者** —— 用于把"执行结果"翻译成"次日指令"。
- **目的**：把 5 条车道的机器对账结果，转成次日可执行的指令清单 + 需要人（K3）拍板的少数事项。

## 1. 执行步骤（严格按序）

### Step 1 · 读结果总线（第一输入，不可跳过）
1. `Read .hermes/logs/lane-status.json`
   - `verdict` / `problems[]` / 每条 lane 的 `days[]`（逐日 `status` = `OK|MISSING|FAILED|BLOCKED|STALE|PENDING` + `report` + `notes`）
   - `recovery_plan`（每条异常附带 `retry|modify_payload|request_human|abort`）与 `state`（8 态状态机）
2. `Read .hermes/logs/lane-runs.jsonl` 的最近记录（`idempotency_key` / `verdict` / `blocked_reason` / `files` / `pushed` / `head`）
3. 需要查证某条判定时，才打开对应 `.hermes/logs/cron-ZP-<lane>.log` 与当日报告 `<YYYY-MM-DD>-ZP-<lane>.md`（唯一权威名，契约 §7.1.3；短名仅作参考/失败证据）。

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
- `.hermes/logs/<YYYY-MM-DD>-ZP-k3-review.md`（**必须**用这个命名：契约 §7.1.3 权威名 `<YYYY-MM-DD>-ZP-<lane>.md`；`lane-status.mjs` 兼容短名但首选 `ZP-` 前缀，避免 STALE）
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

## §注册（2026-10-29 D7 修正：已落地）

**已注册（2026-09-19 后某日 + 10-29 确认）**：`\ZP-k3-review` 每日 07:10 已注册实跑，wrapper 用同一套 preflight/commit 收尾，prompt 指本文件（方式 A）。证据：bus 记录 63 条（10-29）、preflight 07:10:02 9 项全 OK、wrapper runsTotal=8。**后续报告一律写「已注册」，不再写「未注册」**。

> 若日后调度器被重建/清空导致任务丢失，恢复方式（二选一）：
>
> **方式 A（推荐，与现有 6 条同构）**：在 `scripts/register-cron-tasks.ps1` 的 `$Lanes` 之外确认"复盘"实体 `ZP-k3-review`（每日 07:10，即 watchdog 06:43 之后），wrapper 用同一套 preflight/commit 收尾，prompt 指本文件；随后**管理员**执行一次注册（`schtasks /create` 需提升权限，非提升会话实测被拒）。
>
> **方式 B（临时）**：由任一条 lane 的收尾（`lane-git-commit.py` 之后）追加调用一个 `scripts/k3-next-directive.mjs`，读 `lane-status.json` 生成指令草稿 —— 不改调度器，但依赖该 lane 当天确实跑过。
