# K3 指令 v9.4 — 5 定时任务改派 deepseek harness · Task Scheduler 武装方案

> 2026-09-13 20:10 K3 大脑签发 · 执行层：deepseek harness（唯一执行层）
> 拍板来源：老板 2026-09-13 19:39「5 个定时任务直接改派给 deepseek harness 做执行层，autoclaw 不指望了」+ 19:43「避开高峰时段，用闲时执行」
> 废止：v7-automation-create-2026-09-09.md 的「autoclaw AutomationCreate 武装」路径作废

## 一、现状判定（deepseek 9/13 报告 + 我实测核对）

| 层 | 状态 | 证据 |
|---|---|---|
| Prompt 层（5 个 SSoT） | ✅ 已武装 | `.hermes/cron-prompts/zprintpro-*.md` 5 文件顶部均有「v9.3 指令区」标记段（9/12 刷新，grep 实证） |
| 数据层 | ✅ 已通 | GSC 9/10–9/11 数据到位，matrix 30 条回灌，报告落盘（deepseek 报告一节） |
| **触发层** | ❌ **真空 6 天** | autoclaw 侧 5 实体从未创建（jobs.json 仅 w7 + 2 提醒）；9/7–9/13 静默事故 = 无触发器 |
| 脚本层 | ⚠️ 2 缺陷 | gsc-feedback-run.py GBK print 崩 → 假失败；step 5 git rc=1 → 需非阻断化 |

**核心结论**：卡住的不是 prompt、不是数据，是**触发器**。autoclaw 的 AutomationCreate 路径已死，不再等。

## 二、最优方案：Windows Task Scheduler 直接武装（绕开所有 agent 运行时）

**为什么是最优**：
1. OS 级调度器，不依赖 autoclaw / Kimi Work / 任何 agent 会话存活——进程重启、会话重建都不影响
2. deepseek harness 以 CLI 单次调用执行（`hermes -q` 模式），天然匹配 Task Scheduler 的「到点跑一条命令」模型
3. 6 天静默事故的直接根因就是「触发依赖某 agent 会话在线」——本方案从架构上消灭该故障域
4. 零新软件、零额度消耗，schtasks 是 Windows 内置

### 5 实体（调度沿用 v7 payload，K3 9/8 06:15 拍板 19:00–07:00 窗口，tz=Asia/Shanghai）

| 任务名 | 触发 | 执行命令（单行） |
|---|---|---|
| ZP-daily-content | 每天 21:17 | `hermes --cwd F:\zprintpro-nextjs -q "完整读 .hermes/cron-prompts/zprintpro-daily-content-1x7w.md + sop-10-gate.md，当次完整执行全部流程"` |
| ZP-gsc-feedback | 每天 22:43 | 同上，prompt 文件 = `zprintpro-gsc-feedback-loop.md` |
| ZP-weekly-meta | 每周五 23:07 | 同上，prompt 文件 = `zprintpro-weekly-meta-refresh.md` |
| ZP-blog-deepfix | 每周六 05:37 | 同上，prompt 文件 = `zprintpro-blog-deepfix.md` |
| ZP-monthly-matrix | 每月 1 号 06:13 | 同上，prompt 文件 = `zprintpro-monthly-matrix-audit.md` |

**环境变量（每条任务必带）**：`PYTHONIOENCODING=utf-8`（根治 GBK 崩，见 §三-1）。

**注册脚本**：执行层落盘 `scripts/register-cron-tasks.ps1`（schtasks /create 五条 + /query 自检输出），跑完后把 `schtasks /query /tn "ZP-*" /v /fo list` 输出贴进报告 = 武装实证。

### 旧路径处理
- autoclaw jobs.json：**不动不删**（运行时活动注册表，禁外部直写纪律不变）；其内 zprintpro 相关实体已实质死亡，无需清理
- `v7-automation-payload-2026-09-09.json`：降级为**调度参数参考**（expr/tz/timeout 来源），创建方式段落作废

## 三、脚本层 2 缺陷修复（P0，随武装同批）

1. **GBK 假失败**：`gsc-feedback-run.py` + `monthly-audit-run.py` 开头加 `sys.stdout.reconfigure(encoding='utf-8', errors='replace')`（Python 3.7+ 原生，比环境变量更兜底）；同时 cron 命令带 `PYTHONIOENCODING=utf-8` 双保险
2. **git step 阻断**：step 5 改为「失败只告警不阻断」——捕获 rc≠0 时把 git 真实 stderr 写进报告，exit code 不受 git 失败影响（报告已落盘 = 任务成功，git 推送是锦上添花）

**验收**：两脚本各手动跑 1 次 → exit 0 + 报告落盘 + 报告内含 git stderr 段（如有失败）。

## 四、compaction timeout 裁决

deepseek 请示 `compaction.timeoutSeconds 300 → ≥1200`：
- **批准 1200s**。依据：w7 失败实录 = 307s 撞 300s 上限 + last phase "model-call-started"，5 个 prompt 130–205KB 是常态负载，1200s 覆盖 4 倍余量
- 该配置属 deepseek harness 宿主侧 config，执行层自改自验，改后把 config diff 贴进报告

## 五、watchdog（防第二次静默事故）

武装同批加第 6 条轻量任务：
- **ZP-cron-watchdog**：每天 **06:43** 跑 `scripts/cron-watchdog.py`（执行层新建，≤80 行）——检查 `.hermes/logs/` 各车道报告文件的 mtime 是否在期望间隔内（daily 车道 ≤26h、weekly ≤8d、monthly ≤32d），超期 → 在 `.hermes/logs/cron-watchdog-alerts.md` 追加告警行 + 控制台 exit 1
- **闲时铁律（老板 9/13 19:43 拍板）**：全部 6 实体必须落在闲时窗口 **19:00–07:00**，避开业务/算力高峰；watchdog 定 06:43 = 窗口尾段，既能覆盖当晚 5 车道（含每月 1 号 06:13 的 monthly）的运行结果，又不占白天时段
- 我（K3）每周复盘时读该文件 = 静默事故 24h 内暴露，不再等 6 天

## 六、执行顺序 + 验收

1. 修 2 脚本缺陷（§三）→ 手动各跑 1 次 PASS
2. 落 `register-cron-tasks.ps1` + 执行注册 → `schtasks /query` 输出 5+1 实体全在
3. **手动试射 1 条**（ZP-gsc-feedback，最轻）→ 报告落盘 + exit 0 = 端到端通
4. compaction 1200s 配置生效
5. 报告落 `.hermes/logs/2026-09-13-cron-rearm.md`：含 schtasks 输出 + 试射结果 + config diff + SOP-10 5 问门禁段

**今晚 21:17 ZP-daily-content 首次真实触发 = 确认而非试验**（deepseek 原话，本方案保障兑现）。

## 七、五视角裁决

- ① PM：支持。Task Scheduler 是唯一不依赖任何 agent 存活的触发层，架构上消灭 6 天静默故障域。
- ② UI/UX+CRO：中立。无页面改动。
- ③ 运营/转化：支持。daily 内容车道恢复 = blog 轮子和 8 锁词优化重新上轨道。
- ④ 数据分析师：支持。watchdog mtime 校验 = 可机审的存活证据；脚本 exit code 语义修正后 consecutiveErrors 不再被假失败污染。
- ⑤ CEO 终裁：**P0 今晚执行**。autoclaw 武装路径永久废止；compaction 1200s 批准；watchdog 同批上线。
