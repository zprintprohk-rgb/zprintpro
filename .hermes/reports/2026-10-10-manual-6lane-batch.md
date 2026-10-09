# 2026-10-10 手动执行 6 条定时任务（ZP-* 车道）· 批次报告

> **这不是车道报告**（命名不含 `<YYYY-MM-DD>-<lane>.md` 口径，`lane-status.mjs` 不应把它当车道产物）。
> 位置：`.hermes/reports/`（非 `.hermes/logs/`），避免污染 §0.35.3.6 报告归属判据。

## 0. 一句话

用户指令「执行6条定时任务」→ 发现 **6 条车道全部失效**（共同根因：`dsh.cmd` 启动器指向已不存在的安装路径）→ 修复启动器 → **6/6 车道按序真跑完成，全部 wrapper_exit=0**。

## 1. 根因（本次查案核心结论）

### 1.1 现象
| 观察 | 值 |
|---|---|
| `lane-status.json` verdict | `ATTENTION`，problems=10，ZP-daily-content `quarantined`、4 条 `blocked/pending` |
| ZP-k3-review | 从未跑过（`LastTaskResult=267011` = `SCHED_S_TASK_HAS_NOT_RUN`） |
| 已触发的车道 | dsh 在 **55 秒内** exit=1，零产出（STALE / 空转） |

### 1.2 直接证据（`.hermes/logs/cron-ZP-daily-content.log`，2026-10-09 23:48:43 档）
```
[preflight] verdict=ok lock=True retry=0 siblings=0     <- preflight 全绿，锁已拿到
Error: Cannot find module 'D:\...\DSH Desktop\resources\app.asar\lib\desktop-cli.js'
Node.js v24.18.1
===== dsh exit=1 =====                                   <- 55 秒内死掉
```
即：**preflight 通过、锁正常、wrapper 正常，死的是「执行器」本身**。车道 prompt 一个字都没读到。

### 1.3 机制
`\ZP-<lane>` → `.hermes/cron-run/ZP-<lane>.cmd` → `%APPDATA%\DSH Desktop\host-commands\desktop\bin\dsh.cmd` → `DSH Desktop.exe --expose-internals <cli.js> `。

该 `dsh.cmd`（活跃副本）被手改成一个**两头都不存在**的组合：
```
"C:\Users\Administrator\AppData\Local\Programs\DeepSeek Harness\DeepSeek Harness.exe" \
  --expose-internals "C:\...\resources\app.asar\lib\desktop-cli.js"
```
- `.bak-20261009`（手改前）指向 `D:\...\DSH Desktop.exe` + `D:\...\resources\app.asar\lib\desktop-cli.js`
- 现网真实布局：`D:\Program Files (x86)\DeepSeek Harness\DSH Desktop\`（exe 在）、CLI 在 **`resources\app\lib\desktop-cli.js`**（注意是 `app\`，**不是** `app.asar\`）
- C: 那份 `Local\Programs\DeepSeek Harness` 是**旧安装**，其 `resources\` 下没有 `app.asar`，也没有 `app\lib\desktop-cli.js`

### 1.4 修复（本次动作）
从 DSH 自己产出的权威 generation 恢复活跃启动器（**不是手搓路径，是回灌 DSH 生成物**）：
- 源：`...\host-commands\desktop\generations\58aa23e2...-6196ddd3...\bin\dsh.cmd`（生成于 2026-10-09 11:59:06）
- 目标：`...\host-commands\desktop\bin\dsh.cmd`
- 备份：`...\bin\dsh.cmd.bak-broken-20261009`
- 恢复后该文件指向 `D:\...\DSH Desktop.exe` + `D:\...\resources\app\lib\desktop-cli.js`（**两者 Test-Path 均 True**），并恢复 DSH 自带的 `chcp 65001` CJK 代码页处理。

### 1.5 验证链
1. `dsh.cmd --help` → 正常打印 usage（不再 MODULE_NOT_FOUND）
2. 嵌套 headless 冒烟：`dsh --profile headless "用 read 工具读 .hermes/cron-lanes.json，回 LANE_TEST_OK + lanes 个数"` → 回 `LANE_TEST_OK 6`，exit=0（证明 **file 工具链在工作区内可用**）
3. 6 条车道真跑（见 §2）

### 1.6 与另一会话的关系（不冲突，互补）
- `56527944`（23:55，另一会话）已给 `scripts/register-cron-tasks.ps1` 加了 **exec 冒烟测试**（`& $Dsh --version` 不过就 throw）→ 好加固，能防同类复现；但该提交注释里的路径结论（"新 CLI 在 `resources\app.asar\dsh\...`"）与实机不符。
- 本批次的实际修复 = 回灌 generation 启动器。两者叠加：**加固 + 真修**。

## 2. 执行结果（23:54:50 → 00:23:56，串行，lane.lock 互斥）

| # | 车道 | 时长 | wrapper exit | 自报 VERDICT | 报告 | 交付产物 |
|---|------|------|--------------|--------------|------|----------|
| 1 | ZP-daily-content | 6.8 min | 0 | **OK** | `.hermes/logs/2026-10-09-ZP-daily-content.md` | `blog-data/{zh-hk,en,ja}.json`（new-year-card-printing-2027-guide 三语全文）+ `blog-posts.ts` + `blog/[slug]/page.tsx` + `sitemap*.xml` ×4（738→741 URL） |
| 2 | ZP-gsc-feedback | 5.6 min | 0 | **OK** | `.hermes/logs/2026-10-10-ZP-gsc-feedback.md` | `.hermes/industry-keyword-matrix.json`（gsc_feedback_2026_10_10 block）+ `GSC數據/index.json`（10/9 檔登記，freshnessStatus=FRESH）+ `2026-10-10-gsc-suggested-src-fixes.md` |
| 3 | ZP-weekly-meta | 3.7 min | 0 | **OK** | `.hermes/logs/2026-10-10-ZP-weekly-meta.md` | `src/lib/seo.ts`（5 条 category description 前置 GSC 零点击查询词）+ `.hermes/ctr-meta-20261010-livefield.json` |
| 4 | ZP-blog-deepfix | 6.2 min | 0 | **PARTIAL** | `.hermes/logs/2026-10-10-ZP-blog-deepfix.md` | `zprintpro-sku-seo-data.csv` + `src/data/sku-seo-data.ts`（greeting-cards 系 4 改 / 2 ALREADY_DONE） |
| 5 | ZP-monthly-matrix | 4.4 min | 0 | **PARTIAL** | `.hermes/logs/2026-10-10-ZP-monthly-matrix.md` | `.hermes/monthly-matrix-audit-20261010.json`（新建独立 ledger） |
| 6 | ZP-k3-review | 2.4 min | 0 | **OK** | `.hermes/logs/2026-10-10-ZP-k3-review.md` | 该车道**史上首跑**；K3 复盘/次日指令报告 |

**注**：
- 序号 1、2 的 commit 已在 `origin/main`（另一会话 00:09 的 push `250285f8` 顺带带上）；序号 3-6 的 6 个 commit 仍留本地（见 §3）。
- `lane-runs.jsonl` 6 条记录 `verdict=OK`（总线判据=机械层：preflight/guard/commit 全绿）；车道自报 2 条 PARTIAL，差异来自"总线看机制、报告看交付完成度"，两者都要读。
- 跨车道避让生效：weekly-meta / monthly-matrix 各自发现同日兄弟车道已改 `industry-keyword-matrix.json` / `seo.ts`，**放弃回灌、改落独立 ledger 文件**（正是 §0.35.5 防 9/19 撞车的设计目的）。

## 2.5 host 侧门禁实测（各车道沙箱无 node/pwsh，故由 host 补跑）

| 门禁 | 命令 | 结果 |
|---|---|---|
| 编码 | `node scripts/check-encoding.js` | exit=0（该脚本只看 **staged** 文件；本批无 staged → N/A，非"通过"证据，**不得据此声称编码门禁已过**） |
| 类型 | `npx tsc --noEmit` | **54 条错误 = 文档基线 54=54 持平**；全部落在既有 `src/lib/quote-engine/__tests__/*`（13/13/10/9/6/3），**车道改动的 `src/lib/seo.ts` / `src/data/sku-seo-data.ts` 0 条** |
| 未跑（明确记录） | `build` / 门童六命令 / 线上 curl | 未跑 —— 留待 push 前按 §12 push 5 步 SOP 执行；**不得以"tsc 持平"充当"已验收"** |

## 3. push 状态（遵守 §0.25，未强推）

| 项 | 值 |
|---|---|
| 上次真实 push | ~00:09（另一会话 `250285f8`，见 `origin/main`） |
| 本地待推 | 6 个 commit（`.hermes/logs/*` 报告 + `src/lib/seo.ts` + `src/data/sku-seo-data.ts`） |
| 6 条车道 `pushed` | **全 False** — `lane-git-commit.py` 的 §0.25 30 min 硬下限拦下（距 00:09 不足 30 min） |
| 处置 | 按 **§0.25.8**：**不阻塞等待**（禁 `Start-Sleep` 凑窗口），commit 留本地，push 交下一个周期（周六 05:37 `ZP-blog-deepfix` 自然档位 → gap 已 >30 min，或主会话攒批 push） |

## 4. 交给下一步的 handoff（各车道报告 NEXT 摘录）

1. **ZP-monthly-matrix 查出根因级缺陷（建议尽快归档）**：历史月度报告命名为 `YYYY-MM-monthly-matrix-audit.md`（8/9/10 月三份），**不符合** §0.35.3.6 强制的 `<YYYY-MM-DD>-<lane>.md` → `lane-status.mjs` / `lane-preflight.py` 对本车道判 `lastReportFile=null` / `previous_run=null`，**幂等账本与数据继承已断链 3 个月**。本报告起改用合口径命名。
2. **ZP-blog-deepfix**：host 侧需跑 `node scripts/csv-to-sku-seo.mjs`（dry-run）证 CSV→TS 幂等；`npx tsc --noEmit` 需 54=54；下周轮换 books/catalog 簇。
3. **ZP-k3-review**：等 K3 三决策 —— ① 调度器健康（4 车道 `LastTaskResult=2147946720`）② §0.0 名片展示层 (a)/(b)/(c) ③ 客户可见真值口径批。
4. **调度器侧仍未修的一类**：`2147946720` = `0x800710E0`（operator/admin refused the request）是**启动拒绝**，与本次修的"执行器死亡"是**两类**故障；另一会话 `52f19e3d` 已补 `RestartCount=2/PT5M` 吸收 4 车道 10/07-08 的 `0x80070020` sharing violation。**建议下一自然触发日实测 `LastTaskResult` 复验**，不要以"启动器修好了"推断"调度层也好了"（§0.35.4 判据铁律）。

## 5. 数据来源（§0.23 强制）

```
数据来源:
- 用户指令: 「执行6条定时任务」(2026-10-09 23:5x)
- 6 车道自产报告: .hermes/logs/2026-10-09-ZP-daily-content.md, 2026-10-10-ZP-{gsc-feedback,weekly-meta,blog-deepfix,monthly-matrix,k3-review}.md
- 总线: .hermes/logs/lane-runs.jsonl (本批 6 条), lane-status.json/md @ 2026-10-09 23:48:45
- 失效证据: .hermes/logs/cron-ZP-daily-content.log (MODULE_NOT_FOUND @ 2026-10-09 23:48:43)
- 启动器: %APPDATA%\DSH Desktop\host-commands\desktop\bin\dsh.cmd (+ .bak-broken-20261009 / .bak-20261009)
- 权威源: ...\generations\58aa23e2108a429b00b66b60dc4b059\...\bin\dsh.cmd (生成于 2026-10-09 11:59:06)
- 批次日志: .hermes/logs/_manual-6-lane-batch-20261009.log
- 实时进程: Get-Process 'DSH Desktop' → 7 进程全部 Path=D:\Program Files (x86)\DeepSeek Harness\DSH Desktop\DSH Desktop.exe
```
