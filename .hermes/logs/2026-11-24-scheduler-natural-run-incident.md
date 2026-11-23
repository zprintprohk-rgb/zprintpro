# 2026-11-24 调度器自然轮事件记录（06:59 watchdog 拒绝 + 07:10 k3-review 误杀事故）

> 记录者：执行层 autoclaw · 07:15-07:30 · 数据来源行见文末 · **本档为内部日志，非车道报告**（不冒充 lane 产物, per §0.35.3.6）

## 1. 事件时间线（全部机器证据）

| 时间 (11-24) | 事件 | 证据 |
|---|---|---|
| 06:43:00 | ZP-cron-watchdog 名义触发点 | 机器**睡眠中**（Power-Troubleshooter 无此窗 EVT）→ 触发错过（WakeToRun=false 不唤醒） |
| 06:53:45 | 机器唤醒 | System 日志 Kernel-Power 130/131 + Power-Troubleshooter EVT1 @06:53:45 |
| 06:59:43 | 调度器对错过触发的补尝试 → **S4U 登录被拒** | LastRunTime=06:59:43, LastTaskResult=**2147946720 (0x800710E0)**；任务 XML Principal LogonType=S4U（与已证自然的 daily-content 逐字段一致） |
| 06:59:43-07:02 | 四方对账（§0.35.4） | ① lane-runs.jsonl 无 11-24 记录 ② cron-run 无今日 wrapper 日志 ③ logs 无 06:40 后新档 ④ Result=0x800710E0 → **全败 = 未执行** |
| 07:10:01 | ZP-k3-review 自然触发**成功启动**（活跃登录会话下 S4U 被接受） | LastRunTime=07:10:01, Result=**267009 (SCHED_S_TASK_RUNNING)**；cron-ZP-k3-review.log 有 dsh 流水 |
| 07:11:47 | **事故**：执行层手动跑 watchdog 链路隔离测试，与 k3-review 车道首 2 分钟重叠 | watchdog `check_stuck_lane_tasks()`（无实例年龄护栏）把 07:10 新实例当残留 → `schtasks /end` ✅ |
| 07:11:58 | k3-review 被终止 | LastTaskResult=**267014 (SCHED_S_TASK_TERMINATED)**；总线无 11-24 k3-review 记录（未到写盘点） |
| 07:15 | 执行层手动恢复：`cmd /c .hermes\cron-run\ZP-k3-review.cmd`（幂等 STEP 0） | wrapper pid 24780 后台运行中 |
| 07:2x | watchdog 启发式修复落地（仓库侧） | `scripts/cron-watchdog.py` 加 **90 min 实例年龄护栏**（<90min 仅观察告警不 /end）；AST OK |

## 2. 根因判定

### 2a. 06:59 watchdog 拒绝（自然轮失败）
- **不是 S4U 注册缺陷**：任务 XML 与 daily-content（11-23 21:17 自然轮 Result=0 真产出）逐字段一致。
- **是睡眠窗问题**：06:43 机器睡眠 → 触发错过（WakeToRun=false, StartWhenAvailable=false 均空）→ 06:53 唤醒 → 06:59 补尝试时点在交互登录建立前 → S4U 一次性登录被拒 → 0x800710E0。
- **同型历史证据**：ZP-blog-deepfix Last=11-22 16:29 Result=0x800710E0（11-21 周六 23:47 名义触发同为夜间睡眠窗）。
- **规律**：活跃会话窗触发（21:17 晚 / 07:10 晨）S4U 全部成功；睡眠/离人窗触发（06:43 / 23:47）被拒或错过。

### 2b. 07:10 k3-review 误杀（执行层操作事故，如实记录）
- 事故链：手动 watchdog 链路测试（合法目的：隔离"调度器拒绝 vs 脚本链故障"）与 07:10 车道重叠；watchdog 卡死启发式**缺最小年龄护栏**（10-10~10-12 卡死事件设计时未考虑"活车道被重叠审计"形态）→ /end 误杀。
- 影响：今日 k3-review 车道丢失（审计性质、幂等、无 src 写入预期），07:15 已手动恢复。
- 修复：`scripts/cron-watchdog.py` `STUCK_MIN_AGE_MINUTES=90` 护栏（合法运行 5-45min + wrapper 墙钟 ~45min，90min 仍在跑必为真卡死）；与 10-10 卡死处置逻辑兼容（真卡死仍 /end + 告警）。

## 3. 对任务单 canary 判据的影响（重点）

- **任务单 prescribed canary 终判 = 11-25 06:43**（DoD 明写 11-25）。今晨 06:59 事件为 apply 后首个自然触发尝试，**不构成 prescribed 判据**，故 CanaryVerified 暂不勾也不划。
- **风险预警**：若今晚机器照常睡眠，11-25 06:43 触发将大概率**复现同一拒绝**（错过→唤醒补尝试→登录前被拒）→ canary 二连败 → 按单"任一不过 → 停，回报"。
- **K3 管理员修复选项（任选其一，均为机器级）**：
  - **A（推荐）**：5 条 ZP 任务 `StartWhenAvailable=true`（错过的触发在机器可用后补跑——唤醒+登录后即正常执行）。方法：先 `Export-ScheduledTask` 备份 5 份 XML 到 `.hermes/backups/startwhenavailable-20261124/`，再逐条 `Set-ScheduledTask -TaskName <t> -Settings (New-ScheduledTaskSettingsSet -StartWhenAvailable ...)`——**只动这一个设置，不碰 RestartInterval**（0x80041318 教训）。
  - B：`WakeToRun=true` + 电源计划允许唤醒计时器（06:43 准点跑，代价=夜间唤醒机器）。
  - C：触发时间改到登录后窗（如 watchdog 07:30 / blog-deepfix 保持周六但明确"开机后跑"）。
- 选项 A 与 S4U 最小修复哲学一致（不动 Principal、单设置、可逐条回滚）。

## 4. 数据来源
- `Get-ScheduledTaskInfo` / `Export-ScheduledTask`（11-24 07:02-07:12 实测）
- System 日志：Microsoft-Windows-Kernel-Power 130/131 @06:53:43-44；Microsoft-Windows-Power-Troubleshooter EVT1 @06:53:45
- `.hermes/logs/lane-runs.jsonl`（11-24 无记录）、`.hermes/logs/cron-ZP-k3-review.log`、`.hermes/logs/cron-ZP-cron-watchdog.log`（07:11:47 手动轮 exit=1, 6 告警）
- `scripts/cron-watchdog.py` L155-191（修复前）/ L155-215（修复后）
- 任务单原文：`重要文件/2026-11-24-scheduler-s4u-canary-task-sheet.md` §5/§9（11-25 判据 + DoD）
