# DeepSeek Harness 自动任务修复与周/月学习闭环交付报告

> 日期：2026-10-28（Asia/Shanghai）。范围：`scripts/`、`.hermes/`、`docs/`；未修改 src，未 commit，未 push，未运行生产 wrapper 做测试。
> 当前结论：**防假成功、严格验收、周/月复盘、幂等派发和学习门槛已落地并通过隔离测试；计划任务本身仍未恢复，硬阻塞是管理员凭据及独立调度器错误。**

## 1. 实测根因，不混为一谈

1. **凭据失败**：10 月 27 日 daily-content、gsc-feedback、k3-review 均实际触发，wrapper 记录 `MISSING_CREDENTIAL` 与 `dsh exit=1`。2026-10-28 只读复核 Process/User/Machine 三个作用域均无 `DEEPSEEK_API_KEY`。
2. **模型截图是另一问题**：`deepseek-v4-pro not allowed` 不是本次计划任务停跑的直接原因。当前 headless effective route 为 `provider=deepseek-official model=deepseek-flash`，预检允许 flash 变体，拒绝 pro/未知路由。
3. **假成功放大器**：旧收尾未接收 dsh exit，失败仍可能提交；缺报告时生成 AUTO-FILLED 后仍写 OK；旧报告/其他报告可冒充当日产物；状态汇总取当天第一条记录，旧 OK 可覆盖新失败。
4. **独立调度器错误**：Windows 实测 weekly-meta、blog-deepfix、monthly-matrix 的 LastTaskResult 为 `2147946720 (0x800710E0)`。这不能与凭据失败合并归因，已分别派发 K3-admin 检查任务。

## 2. 已落地的修复

### 2.1 运行前硬预检

`scripts/lane-preflight.py` 新增：

- dsh CLI 可执行文件检查；
- 计划任务进程环境必须有 `DEEPSEEK_API_KEY`，只检查存在性，不读取、打印或落盘密钥；
- `--dump-config` 的有效 provider/model 检查；
- 失败则不调用 dsh、不抢锁、不写 src，写 `BLOCKED` 报告和真实总线；
- weekly/monthly 在 dsh 前由 host 自动生成复盘，避免 sandbox 无 shell 时手编复盘。

### 2.2 凭据安全恢复路径

新增纯 ASCII `scripts/repair-dsh-scheduler-credential.ps1`：

- 默认只审计，不修改计划任务；
- `-Apply` 必须管理员，使用隐藏安全输入，密钥只在内存转换并写 Machine 环境，不落仓库、不打印、不写日志；
- 生成的六个 lane wrapper 会在自身进程内读取 Machine/User 凭据，避免 Task Scheduler 服务保留旧环境；
- `-SmokeTest` 只做一个受控 dsh 简单调用，不运行生产 wrapper。

### 2.3 失败禁提交与严格报告归属

`scripts/lane-git-commit.py` 与生成器 `scripts/register-cron-tasks.ps1` 已改：

- wrapper 传入真实 `--dsh-exit %RC%`；非零立即 `FAILED`，0 commit / 0 push；
- dsh=0 但没有当日 exact 本车道完整 OK 报告时返回 `STALE`，0 commit / 0 push；
- AUTO-FILL 仅为失败证据，永远不是 OK 证据；旧报告、短名报告、其他车道报告均不可冒充；
- guard、report commit、push 失败均写真实总线；生产提交使用 pathspec，避免携带其他人 staged 内容；
- 共享 bus、wrapper log、run-context、lane-status 不再作为单车道提交产物。

### 2.4 状态对账与恢复分类

`scripts/lane-status.mjs` 已改：

- 当日最新 run 优先，旧 OK 不再覆盖新 FAILED/BLOCKED/STALE；
- bus 缺 dsh_exit 时使用当天 wrapper 真实退出码；
- AUTO-FILLED 或四字段/OK 契约不完整不得判 OK；
- 凭据、模型、CLI 类问题恢复动作是 `request_human`，不盲目 retry。

校正后，10 月 27 日 daily-content / gsc-feedback / k3-review 均为 `FAILED, dsh_exit=1`。历史 AUTO-FILLED 报告保留作事故证据，没有改写成当时成功。wrapper 日志现已按日期独立解析，较新的 preflight 阻断不会抹掉旧日期的真实 dsh 退出码。

**自然触发验收（非人工测试）**：10 月 28 日 07:10，ZP-k3-review 在新机制下被 preflight 诚实阻断；报告明确 `VERDICT: BLOCKED`、`DELIVERED: NONE`、`dsh was not called`，且未抢锁。它证明防假成功闸门已在真实计划任务路径生效，但不证明凭据已恢复。

### 2.5 周/月复盘、派发和学习

新增 `scripts/strategy-feedback.py` 并接入共享契约：

- 周窗 7 天、月窗 30 天汇总 OK/FAILED/BLOCKED/STALE；历史记录由校正后的逐日状态覆盖，避免旧假 OK 污染统计；
- 到期任务给 SCALE/HOLD/FIX/STOP；WAITING_K3 不得自我批准；
- FIX 使用确定 task_id，并按活动 target 去重；基础设施问题归 K3-admin，不派成 daily 页面改写；同一 DeepSeek 凭据问题只保留一个共享修复项；
- 只有同一任务具备 `baseline / change / online_verify / retest` 才进入 learning candidates；禁止自动改 prompt、扩权或泛化偶然波动。

2026-10-28 最终实测产物：

- 周窗 12 次运行：`FAILED=7, OK=2, STALE=2, BLOCKED=1`；
- 月窗 44 次运行：`OK=32, BLOCKED=3, FAILED=7, STALE=2`；
- 派发 weekly-meta、blog-deepfix、monthly-matrix 三个独立调度器检查任务；重复周/月执行未重复排队；
- 队列共 13 项（含原有战略/测量/拍板任务）；学习候选 **0 条**，因为当前没有完整的基线—改动—线上验收—复测记录。

## 3. 验证结果

- 隔离 unittest：**9/9 PASS**。
  - dsh=1 时 0 commit / 0 push / bus=FAILED；
  - dsh=0 无当日报告为 STALE；
  - 旧报告与 AUTO-FILL 均不可冒充成功；
  - 有效报告且无改动时可诚实记录 OK；
  - 缺凭据、pro 模型会阻断，flash 可通过；
  - 最新失败覆盖当天旧 OK；较新 preflight 阻断不抹掉旧日期的 dsh 失败；
  - 周/月派发幂等、学习候选不伪造。
- Python `py_compile`：PASS；Node `lane-status.mjs --check`：PASS。
- 两个 PowerShell 文件 parser：PASS；纯 ASCII：PASS。
- 仅运行 `register-cron-tasks.ps1 -ArtifactsOnly` 重新生成包装文件；该生成步骤未修改 Task Scheduler、未触发生产车道。07:10 自然触发证据见 §2.4。
- 6 个 lane wrapper 均含 `--dsh-exit %RC%` 和进程内凭据加载，ASCII 断言 PASS。
- 队列、周/月报告、lane-status JSON 解析 PASS；相关 `git diff --check` PASS。
- 诊断用未脱敏临时副本已删除，仅保留脱敏诊断材料。

## 4. 仍需 K3 管理员完成

### 4.1 恢复 DeepSeek 凭据并做受控 smoke test

在**管理员 PowerShell**运行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\repair-dsh-scheduler-credential.ps1" -Apply -SmokeTest
```

运行后按提示**粘贴完整 DeepSeek API key 并回车**；输入隐藏、最多重试 3 次，空白输入不会修改环境。当前 19:27 的执行结果显示 Machine/User/Process 仍为 MISSING，说明当时收到的是空值，尚未完成恢复。

只有在脚本显示 `PASS: controlled dsh smoke test returned exit=0 and DSH_OK` 后，才允许做一次真实车道验收。DSH UI 显示“已保存”不等于计划任务已恢复。

### 4.2 独立检查 0x800710E0

对 weekly-meta、blog-deepfix、monthly-matrix 检查任务定义、权限和最后错误；不要在未查原因时批量重注册或连续手动触发。队列已有三个 K3-admin 项及证据命令。

### 4.3 恢复验收门槛

一次真实运行只有同时满足以下条件才可宣称恢复：

1. wrapper 真实 `dsh exit=0`；
2. 当日 exact 本车道报告含 VERDICT/CONSUMED/DELIVERED/NEXT 且 VERDICT=OK；
3. lane-runs、wrapper、当日报告、Task Scheduler 四方一致；
4. 内容任务有对应线上探针，数据任务有对应数据产物。

目前第 1 项尚未发生，因此本报告不宣称自动任务已恢复。

数据来源：Windows Task Scheduler 实测、`.hermes/logs/cron-ZP-*.log`、`lane-runs.jsonl`、`lane-status.json`、隔离测试输出、周/月复盘 JSON/MD。
