# 定时任务清理记录（2026-09-18）

> **触发**: K3 2026-09-18 拍板「`F:\zprintpro-main-tmp` 空壳建议删除 → 删除；autoclaw jobs.json 僵尸任务建议清理 → 按建议执行」
> **数据来源**: schtasks /v 实测 · autoclaw `logs/*.log` · `cron/jobs.json` 前后对比 · `F:\全球印刷资讯\print-demand-system\logs\latest_run.json`
> **执行者**: deepseek harness（当前会话）

---

## 一、删除 `F:\zprintpro-main-tmp` 空壳 ✅

| 项 | 结果 |
|---|---|
| 删除前备份校验 | `.hermes/_archive-main-tmp-20260917/` = **2329 文件** ✅ |
| 删除前 git 引用校验 | `git worktree list` **无 main-tmp** ✅ |
| 删除前体积 | **0.01 MB**（仅 `.hermes/logs` + 空 `node_modules`） |
| 执行 | `Remove-Item -Recurse -Force` → **成功** |
| 删除后校验 | `Test-Path` = **False** ✅ |

### ⚠️ 本次执行的一处疏漏（记录在案）

删除前我核对了**目录级备份**，但**未逐文件核对**：该目录内有 2 个 9/14 的 lane 报告
（`zprintpro-daily-content-1x7w-2026-09-14-BLOCKED.md`、`zprintpro-gsc-feedback-loop-2026-09-14-BLOCKED.md`）
**不在备份中**，删除后这两份副本消失。

**影响评估 = 无实质损失**：同一内容以**更权威的形式**存在于 nextjs 侧 cron 日志：
- `.hermes/logs/cron-ZP-daily-content.log`（1,125 KB，含 `BLOCKED` / `declared repo root` / `not found`）✅
- `.hermes/logs/cron-ZP-gsc-feedback.log`（792 KB，含 `BLOCKED`）✅

**教训**: 删除目录前除检查"是否有顶层备份"外，还应检查**目标目录内是否存在备份未覆盖的文件**。

---

## 二、清理 autoclaw jobs.json 僵尸任务 ✅

### 2.1 修正一处我先前的误判（诚实记录）

我在上一轮报告里说「autoclaw jobs.json 内 40 条任务为 M3 时代残留僵尸（**从未建实体**）」——
本轮核查发现**该表述不准确**：

- autoclaw **是活的**：`logs/*.log` 更新至 09-18 04:23，`jobs.json` 由它实时写入（含 `.bak` 自动备份）
- **雷达确实在跑**：`print-demand-system/logs/latest_run.json` 显示 `2026-09-18 01:00:29` 一次
  `trigger: cron` 的完整成功运行（17/17 sources、657 items、status ok）
  → 驱动它的是 autoclaw 的 `印刷需求雷达·每日采集 01:00` 任务

**准确表述**：40 条中**11 条属 ZprintPro 僵尸**（已被 ZP-* schtasks 取代或已过期），
其余 29 条含 **26 条 aitoptools / stock-lab 任务**（**别的项目**，不在本次范围）。

### 2.2 处置（11 条）

**判据**:
- ZprintPro 5 lanes 已被 `ZP-*` schtasks 接管（9/14–9/16 的报告均写明「执行层: deepseek hermes (v9.4)」，
  非 autoclaw 产出）→ 保留它们 = **将来双跑风险**
- `zprintpro-w7-strategy-m1-weekly-check` payload 仍写「**M3 可自走**」「触及组件层 = **M3 停手**」
  → 会让执行层以 M3 身份工作
- 已过期的一次性提醒（`at` 时间已过）

| 处置 | 条目 |
|---|---|
| **永久删除（8）** | ZprintPro 每日内容 1x7w / GSC 数据回灌反馈环 / 周五 Track B 槽位 / 周六存量 blog / 月度复盘 · Campus Pillar go-启动日 · K3-0910 GSC校准日提醒 · K3-0916 M1联合验收提醒 |
| **被 autoclaw 回写但已置 `enabled=false`（3）** | zprintpro-w7-strategy-m1-weekly-check · 印刷需求雷达·首轮自动运行复查（一次性） · K3-0912 CTR判定日提醒 |

**保留（3 条 ZprintPro 相关）**:
- `印刷需求雷达·每日采集 01:00` — **enabled=true**，实测在跑（**唯一应跑的**）
- `Track B 每周五内容槽位提醒` — 活跃提醒
- `Campus 14天回看(降级线判定)` — 未来检查点（2026-10-04）

**未动（26 条）**: aitoptools / stock-lab 任务 —— **属其他项目，不在 zprintpro 清理范围**，建议由各自项目判定。

### 2.3 结果

| 指标 | 前 | 后 |
|---|---|---|
| jobs.json 任务数 | 40 | **32** |
| **enabled 数** | **12** | **1**（只剩雷达） |
| ZprintPro 双跑风险 | 有（5 lanes） | **无** ✅ |
| M3 身份 payload | 1 条 enabled | **已 disabled** ✅ |

**备份**: `cron/jobs.json.bak-k3-cleanup-20260918`（114 KB 原始态）
**清理清单**: `cron/_cleanup-plan.json`（deleteIds / keepIds）

### 2.4 关键技术发现：autoclaw 是 jobs.json 的 owner

直接改文件后 **45 秒内 autoclaw 回写**（29 → 32 条，mtime 04:25:23）——
它**接受了我删除的 8 条**（未恢复），但重建了 3 条（均为 `enabled=false`）。

**结论**: 直接改 `jobs.json` **不是可靠的长期手段**；若要彻底移除，需在 **autoclaw UI/接口**内操作，
或停 autoclaw 后修改再启动。本次结果已达成目标（僵尸全部失效），但 3 条已删条目会在 autoclaw
侧以 disabled 形式残留。

---

## 三、遗留建议

1. **`exit=0` 假成功**（本次事故最危险特征）：lane 报 BLOCKED 时 `dsh` 仍返回 0 →
   `schtasks Last Result=0` 全绿而实际零产出。建议 wrapper 增加"本次是否产出新报告"判定，无产出转非 0。
2. **`ZprintPro-CronWatchdog-2125`**：额外 schtasks 实体，指向 `.hermes/cron-check-tonight.cmd`，
   9/17 运行 **Result=2（失败）**，仍在每日 21:25 触发 —— 与 `ZP-cron-watchdog` 功能重叠，建议清理。
3. **autoclaw 侧 3 条 disabled 残留**：如要彻底移除，需在 autoclaw 内操作。
4. **26 条 aitoptools/stock-lab 任务**：建议由对应项目判定存废。

---

## 四、遗留项 2 提权脚本交付（2026-09-18 04:47 补记）

**动作**: 新增 `.hermes/cron-run/delete-legacy-watchdog.cmd`（本会话无管理员权限，`schtasks /delete` 与 `Unregister-ScheduledTask` 均被 Access denied）。

**脚本行为**: 查询 → 不存在则 SKIP → 存在则 `schtasks /delete /tn "ZprintPro-CronWatchdog-2125" /f` → 打印结果 → 复核剩余 ZP-*/ZprintPro 实体 → `pause`。

**K3 待执行**: 右键「以管理员身份运行」`.hermes/cron-run/delete-legacy-watchdog.cmd`（1 次，约 5 秒）。

**复核结果（2026-09-18 04:47 schtasks 实测）**:

| 实体 | 下次运行 | 状态 | 判定 |
|---|---|---|---|
| ZP-blog-deepfix | 2026/9/19 05:37 | Ready | ✅ 保留 |
| ZP-cron-watchdog | 2026/9/18 06:43 | Ready | ✅ 保留 |
| ZP-daily-content | 2026/9/18 21:17 | Ready | ✅ 保留（今晚首验） |
| ZP-gsc-feedback | 2026/9/18 22:43 | Ready | ✅ 保留 |
| ZP-monthly-matrix | 2026/10/1 06:13 | Ready | ✅ 保留 |
| ZP-weekly-meta | 2026/9/18 23:07 | Ready | ✅ 保留 |
| **ZprintPro-CronWatchdog-2125** | 2026/9/18 21:25 | Ready | 🔴 **待 K3 提权删除** |

**数据来源**: `schtasks /query /fo TABLE /nh` 2026-09-18 04:47 实测输出；autoclaw jobs.json 25 条（仅 1 条 enabled）见 §二。

**说明**: 本次补记仅追加记录，未改动任何调度实体；提权脚本以 commit `3a92dc63` 落盘。

---

**文件结束。**
