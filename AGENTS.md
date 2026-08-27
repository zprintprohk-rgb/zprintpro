# ZprintPro（智印云）— AI 协作指南

> **项目**: F:\zprintpro-nextjs\ (Next.js 印刷 SaaS)
> **类型**: 8 locale 印刷电商 (zh-hk / en / ja)
> **部署**: Cloudflare Pages + Airwallex 支付
> **品牌**: 双品牌分层 (2026-07-21 user 拍板,301 合体后) — zh-hk = 智印港 ZprintPro,en/ja = ZprintPro;「智印港」为自有品牌词不再是竞品,错字「智印印港」仍禁

## ⛔ 强制执行约束 (2026-07-06 user 拍板 · 次高优先级)

> **【强制执行约束】不得因深夜/时段原因简化或延后任务,当次调度必须完整执行全部流程。**

- ❌ **禁止**: 用 "太晚 / 犯困 / ROI 延后" 等理由简化或拆分任务
- ❌ **禁止**: 当次只做部分,剩余推明天
- ✅ **必须**: 当次任务清单全部完整执行
- ✅ **质量风险**: 通过 commit + push + verify 流水线兜底,**不**通过偷工减料

适用范围: zprintpro 全部 cron + manual session。任何 sub-task 都不能用"时间"做借口。

## ⛔ Cloudflare Pages 月度 build quota 约束 (2026-07-06 user 拍板)

> **【硬约束】** Cloudflare Pages 免费方案每月有明确 build 次数限制 (典型 500 次/月)。**每次 git push 触发 1 次 build**, build quota 是稀缺资源, 不可滥用。

- ❌ **禁止**: trivial commit 单独 push (typo 修正 / 注释 / 单行格式调整 / 一句话 README 改动) — 浪费 1 次 build
- ❌ **禁止**: 每天 push 超过 1 次非紧急 commit (除非 cron 自动触发)
- ✅ **必须**: **攒 commit 批量 push** — 多个子任务改动攒一起, 1 push 触发 1 build 验证全部
- ✅ **必须**: **本地预检 3 步** — push 前跑 (1) `node scripts/check-encoding.js --fix` (2) `npx tsc --noEmit` (3) 关键脚本 smoke test, 3 步全过才允许 push
- ✅ **必须**: **预测 quota 影响** — push 前算当月已用次数, 用 `gh api repos/.../actions/runs?per_page=20` 查本月 build 数

**例外** (可单独 push, 不算浪费 quota):
- 紧急修复 (线上 500 / 404 / 死链)
- cron 自动 commit (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00)
- 跨项目 bug fix (影响其他项目)

**2026-07-06 实际数据**: 一天 6 次 build (P1-1 / P1-2 / P0-3 / P0-4 / P2-3 / weekly 补救) = 1.2% 月度 quota。问题不在配额, 而在节奏不健康 — 5 个独立 cron 任务 + 1 个手动补救 = 6 次/天过于分散。改进后: 攒批量 + 1 push/天, 预计 build 次数降低到 1-2 次/天。

> **真实主体 (2026-06-18 user-corrected)**: 深圳市彩龙印刷包装有限公司
> **法定代表人**: 唐运提
> **真实地址**: 広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）
> **真实電話 (2026-08-07 K3 拍板 phase-out, call + WhatsApp 统一)**: +86 198 8085 1334
> **真实メール**: zprintpro@outlook.com
>
> ⚠️ 早期 audit / copy / siteConfig / schema.org 都默认是「HK 観塘」实体，是错的。user 2026-06-18 明确告知：实体在深圳，跨境接全球订单。法律公示 (`/legal/`) + Footer 公司信息 + siteConfig.address + ImageObject locationCreated + ja/zh-hk imageCaption 都已改为深圳实体。

## 0. Orchestrator Discipline (编排者铁律) — Mavis 必读

> **这一节是给 Mavis 编排者 (orchestrator) 角色读的。** 凡涉及 spawn worker / 派活 / 监控长任务,必先复读本节。
>
> **双向引用**: 全局精炼版 (auto-loaded for ALL mavis sessions) 在 `C:\Users\Administrator\.mavis\agents\mavis\agent.md` 末尾的 "Orchestrator Discipline (Mavis Global)" 章节。**本文件是 zprintpro 项目专属的完整版**(更多上下文 + 复盘细节)。
>
> 来源: 2026-06-10 phase B verifier 孤儿事件复盘(旧 verifier 静默 3.5h、cron 二十多次空 tick、最后撞 LLM 5h quota 才发现)。

### R1. 派活前 3 问 (Pre-dispatch Triad)
派任何新 worker (`mavis communication send --command spawn`) 前,必须查 3 个事实来源:
1. `mavis session info <id>` — 同名任务的 worker session 是否 `status=running/started`?
2. `mavis communication peers` — 当前活动 worker 列表里有没有同类 agent 在干同活?
3. 共享 scratchpad + workspace 中预期输出文件 (e.g. `docs/audit-*.md`) 是否已存在且非空?

三个都 NO → 允许 spawn。任一是 YES → **跳过 spawn,进入"等结果"模式 (R3)。**

### R2. ACK 协议 (Acknowledgment Protocol)
spawn worker 后,**30 秒内**必须看到以下任一信号:
- 收到 worker 的 inbound (哪怕只是 "received" 一字)
- `mavis session info` 显示 worker 的 `lastActiveAt` 在最近 30s 内
- 预期输出文件出现修改时间

看不到任何信号 → 视为 spawn 失败 (引擎/网络问题),允许重 spawn **一次**。第二次失败立刻 kill + 升级用户,**绝不**无限重试。

### R3. 监控模式 (Watch Mode) — 替代"无限 cron 轮询"
**进入监控模式**: worker session `status=started` 或 `running`,且最近 60s 内 `lastActiveAt` 在动。

进入监控模式后:
- **不要每分钟 ping**,不要每 10min tick "is it done?"
- 只在 worker 的 `lastActiveAt` **冻结**超过算力阈值 (上午 20min, 下午 40min) 时,才 ping 一次
- ping 模板: `Status check: which step? Any blocker? <one line>`
- ping 后再过算力阈值仍无响应 → **kill worker + force-spawn replacement**,**不**重发原指令

算力阈值动态化: 读取 `COMPUTE_LOAD_LEVEL` env (LOW=上午, HIGH=下午 14:00+ 或 peers 中 > 5 个 aborted),HIGH 时阈值 × 2。

### R4. 幂等性协议 (Idempotency Mandate) — 写进每个 worker 的 spawn prompt
每次 spawn worker 时,提示词首段必须 **verbatim** 包含:

> BEFORE any other action, run this 3-question idempotency check:
> (1) Does the expected output file `<path>` already exist with non-empty content?
> (2) If yes, is its mtime within the past `<TTL>`?
> (3) Does it cover all `<task signature>` sub-items?
> If ALL yes → return "ALREADY DONE" to parent session and exit immediately.
> If ANY no → proceed with normal execution.

worker 自己防呆网。orchestrator 不重复 spawn,它也能自己刹住。

### R5. 报告协议 (Report-back Protocol)
worker 完成后:
- 写完整报告到 `<path>` (走 file,**不**塞 message body)
- 给 parent session 发一条短 ack: `<TASK NAME> done. Report: <path>. Verdict: <PASS/FAIL/BLOCKER>.`
- **不要**在 ack 里复述报告内容 (size limit + GBK 风险)

orchestrator 收到 ack 后:
- `Read` 文件拿完整内容
- 1 句话告诉用户结果
- **不**重复发 ack 给 worker (避免 ping-pong)

### R6. Cron 自检 (Cron Hygiene)
任何自设的 cron 监控任务,必须包含 3 个 hard-coded 出口条件:
- (a) **TTL 过期 → 自删** (e.g. `If Date.now() > <expiry_ms>, mavis cron delete <self>`)
- (b) **报告落盘 → 自删** (e.g. `If docs/<file>.md exists, mavis cron delete <self>`)
- (c) **静默阈值触达 → 升级用户**,**不**继续静默 tick

缺 (a)(b)(c) 任一的 cron **不允许创建**。

### Anti-Patterns (绝对禁止)
- 看到 worker 静默就无脑再发同指令 → 重复派发,浪费算力,污染状态(本次 phase B 踩坑根因)
- 设 cron 每 5-10min tick "is it done?" 超过 1h 还静默 → 升级用户
- ping worker 后没回应就再 ping → 变 ping-pong,必失败
- 在 message body 塞 ≥ 200 行报告 → size limit 切碎中文
- 信任 worker 的"我正在做"说辞而不查 `lastActiveAt` → 假死检测失灵
- 设 cron 但忘出口条件 → cron 永远在跑、永远在"没动静 skip",成为系统噪音

### §0.22 SOP-10 5 问门禁（强制级, K3 8/25 拍板）

> **强制级 SOP-10 5 问门禁** (K3 8/25 拍板 B): 任何 M3 派活 / 上报拍板 / 报告, 必跑 5 问, **缺 5 问 = 报告作废, K3 不拍板**。
>
> **拍板来源**: K3 8/24 12:04 + 14:25 + 18:35 + 18:42 + 19:03 + 20:02 拍板 SOP-10 第 1-6 款

**SOP-10 5 问** (派活 / 上报 / 报告前必跑):

1. **架构差异? 派活前查前序任务实现路径** (SOP-10 第 1 款, K3 8/24 12:04 拍板 E)
   - 用 `git show <commit> --stat` 看前序任务实现路径
   - 任何"X 路径 vs Y 路径"判断, 先看 30 秒 git log, 不直接推断冲突

2. **约束适用范围? 上报拍板前先查 K3 拍板原文** (SOP-10 第 2 款, K3 8/24 14:25 拍板 C)
   - 任何 F0/F1 红线类约束, 派活前查 K3 拍板原文
   - 不替 K3 推断"红线=不动所有 src/"

3. **原数据/拍板来源? 不推断"无来源数字"/"MOCK 数据"** (SOP-10 第 3 款, K3 8/24 18:35 拍板)
   - 任何 certNo / 证书号 / 1,000+ / 15年 / 海德堡 / 24h SLA / 12 大行业 / 国际顶级 类数字
   - 上报前 3 问: ① 原数据拍板来源 (K3 何时拍板? commit ID?) ② 是不是真数据 ③ 当前 K3 拍板是"留"还是"撤"?

4. **字段值策略? certNo/validUntil/issuer 全空, 不留联系方式** (SOP-10 第 4 款, K3 8/24 18:42 + 19:03 拍板)
   - 撤 certNo: 改空字符串 `''`, 不留联系方式
   - 撤 validUntil: 改空字符串 `''`
   - 撤 issuer: 改 `'—'` 或空字符串
   - 保留 name + scope: 描述性文案不动

5. **Markdown 渲染? user-facing 文本含 [text](url) 必须 parseInlineLinks** (SOP-10 第 5 款, K3 8/24 19:03 拍板)
   - 任何 user-facing 文本含 [text](url) Markdown 语法, 必须用 `parseInlineLinks()` 工具解析
   - 禁止 `<p>{text}</p>` 直接渲染
   - 配套工具: `src/utils/parseInlineLinks.tsx`
   - 配套扫描: `scripts/check-content-guard.js` Rule 5 红色自动检测

**应用范围**:
- ✅ 任何 M3 派活 (worker spawn / sub-agent 派活 / cron 触发)
- ✅ 任何 M3 上报 K3 (拍板请示 / 阻塞升级 / EOD 报告)
- ✅ 任何 M3 报告 (deploy 报告 / cron 日报 / K3 升级 / M3 复盘)
- ❌ docs-only 改动 (AGENTS.md / .hermes/ / docs/) 不用 5 问

**反例 (M3 8/24 误诊)**:
- ❌ 误诊 #1: M3 推断"B3 hydration vs B4 hreflang 架构冲突 P0 阻塞", 实际不阻塞
- ❌ 误诊 #2: M3 推断"F0 红线 = 不动所有 src/", 实际 = 不删 SKU/文案/长文本字段
- ❌ 误诊 #3 (严重): M3 推断"01 100 150 1234 + FSC-C123456 + 15年 + 1,000+ 客户 + 海德堡 + 12 大行业 + 24h SLA + 国际顶级"全为"无来源数字"/"MOCK 数据", 实际 = K3 8/19 拍板的真实数据, 12 件事属实不动

**详细文档**: `.hermes/m3-self-evolution-patterns.md` (8.6KB, SOP-10 完整谱系)

### §0.23 数据诚信红线 (K3 8/25 拍板)

> **任何 M3 报告必含"数据来源"行, 缺则报告作废** (K3 8/25 拍板红线)
>
> **拍板来源**: K3 8/24 18:35 SOP-10 第 3 款延伸 + 8/24 22:00 #7 EOD baseline 撤回

**红线 (绝对禁止)**:
- ❌ 任何"看起来合理"的估算 baseline 不进报告
- ❌ 任何"n=X 询盘"/"%X 转化"/"X 客户"类无来源数字不进报告
- ❌ 任何"预计 / 大约 / 约"类模糊数字不进报告
- ❌ 任何无 commit ID / 拍板时间的"业务承诺"不进报告

**必含 (强制)**:
- ✅ 任何报告必含"数据来源"行, 格式: `数据来源: <表名/查询/事件>`
- ✅ baseline / 关键数字必标"待 XX 校准"或"已 XX 校准" + 校准日期
- ✅ 任何撤回声明必含原报告 commit ID + 撤回日期

**数据来源模板**:
```
数据来源:
- 008 询盘跟踪表 (8/29 首报)
- Supabase query: <查询名> 2026-08-XX
- GSC data: <文件名> <日期范围>
- IndexNow API response: <URL>
- K3 拍板记录: <commit ID> <时间>
```

**反例 (M3 8/24 EOD 报告)**:
- ❌ "8.2-12.6 询盘/週 n=31 baseline" — 数字为 M3 编造, 008 未校准, 8/29 才是首报真实 baseline
- 撤回: `docs/eod-retraction-2026-08-24.md` (8/24 22:00)

**应用范围**:
- ✅ 任何 EOD 报告
- ✅ 任何 K3 升级
- ✅ 任何 cron 日报
- ✅ 任何 SOP / 战略文档涉及具体数字

**配套机制**:
- AGENTS.md §0.22 SOP-10 第 3 款: 上报拍板前先问"原数据/拍板来源"
- 008 询盘跟踪表: 8/29 首报, baseline 首报真实数据
- `.hermes/m3-self-evolution-patterns.md` SOP-10 第 3 款详细说明

### §0.24 笼统批准 ≠ 动作完成 (K3 8/25 13:45 拍板, 千问评核 #4)

> **K3 一句"按你的建议执行" / "建议 A" / "批准" ≠ 真人动作完成**
> **完成以动作证据为准**: 提交回执 / key 交付 / 确认截图 / 平台审核邮件
>
> **拍板来源**: 千问 8/25 13:45 评核 #4 (K3 必批)

**核心规则**:
- ✅ K3 笼统批准 = "已排期" + "已准备动作包", **不** = "已完成"
- ✅ 真人动作完成 = 提交回执 / 平台审核邮件 / 资金到账 / key 交付 / 截图确认
- ❌ 不写"已完成" (除非有动作证据)
- ❌ 不写"K3 已批准 = 已完成" (笼统 ≠ 动作)

**完成状态分级**:
| 状态 | 含义 | 例子 |
|------|------|------|
| ✅ 已完成 | 真人动作完成 + 证据 | GBP 提交回执 / 008 Supabase key 落地 + 测试 4 事件 |
| ⏳ 已排期 | K3 拍板 + 行动包就绪 | 8/26 R0 5 项 / 8/27 GBP / 8/28 Listicle |
| 🔴 撞墙 | K3 决策阻塞 / 真人动作未做 | K3 9:00 未到 / key 未交付 |

**反例 (M3 8/25 14:00 撞墙升级)**:
- ❌ "K3 8/25 12:12 拍板"按你的建议执行" = 5 拍板全批" — 5 拍板 = 1 P3 (M3 战略报告) + 4 P0 撞墙 = K3 真人动作
- ✅ "5 拍板: 1 已批 (M3 战略报告, K3 12:12 批准) + 4 已排期 (R0 8/26 / GBP 8/27 / Listicle 8/28 / 阶段 2 9/1)"

**应用范围**:
- ✅ 任何 M3 报告 (EOD / 中检 / K3 升级)
- ✅ 任何撞墙升级 (K3 必拍决策)
- ✅ 任何战略文档涉及"完成"状态描述

**配套机制**:
- AGENTS.md §0.22 SOP-10 5 问门禁 (K3 8/25 拍板 B 强制级)
- AGENTS.md §0.23 数据诚信红线 (K3 8/25 拍板)
- .hermes/m3-self-evolution-patterns.md SOP-10 完整谱系
- docs/INDEX.md (8/25 13:55 INDEX 落, K3 必拍决策表清晰分级)

---

### §0.25 30min 间隔 push 部署 规则 (2026-08-26 14:35 K3 撞墙升级拍板, 跨项目 P0 强制级)

> **核心**: 任何 push 部署 (含 cron auto push / 手动 push / 紧急 push / amend force-push) **必 ≥ 30 min 间隔**。5 min / 7 min 间隔 = 撞车, K3 拍板显式禁止。
>
> **拍板来源**: K3 8/26 14:35 撞墙升级拍板原文
> "更新，半小时时间间隔执行一次push部署，不能5分钟，7分钟就执行一次，时间太短了，更新30分钟可执行一次push部署的规则"

**§0.25.1 必 ≥ 30 min 间隔 (4 类 push 必遵守)**:

| # | push 类型 | 必 ≥ 30 min 间隔 | 备注 |
|---|-----------|-------------------|------|
| 1 | **cron auto push** (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00) | ✅ 必 ≥ 30 min | 不豁免 |
| 2 | **手动 push** (M3 撞墙升级 / 紧急修复 / 业务需求) | ✅ 必 ≥ 30 min | 撞车 = K3 必拍 |
| 3 | **紧急 push** (P0 5xx 阻断 / 404 / 死链) | ⚠️ 30 min 间隔豁免 | K3 必拍 1 次回复确认 (§0.6 例外) |
| 4 | **amend force-push** (per §0.17 amend 月上限 2 次) | ✅ 必 ≥ 30 min | K3 8/8 §0.17 计数 1 push + K3 8/26 14:35 间隔 30 min |

**§0.25.2 撞车兜底 (5/7 min 间隔 = 撞车)**:

- **撞车判定**: 任何 push 在 30 min 间隔内发起 = 撞车
- **撞车 = K3 必拍 1 次回复**:
  - 立即停止 push + 1 段报告 K3
  - 等 K3 拍板确认是否继续
  - 撞车报告必含: push 时间戳 + 上次 push 时间戳 + 间隔分钟数 + 撞车原因
- **撞车 = M3 自主豁免** (per K3 v2 预批"立即"覆盖):
  - K3 8/26 04:50 v2 预批"立即"覆盖 8/26 0:00-14:35 5 次撞车 (历史已发生, 不追溯)
  - 后续撞车 = K3 必拍 1 次回复, M3 不可自主豁免

**§0.25.3 撞车豁免 (per K3 §0.6 紧急修复例外)**:

- 线上 500 / 404 / 死链 阻断: 30 min 间隔豁免, 但 K3 必拍 1 次回复确认
- cron auto (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00): 不豁免, 必 ≥ 30 min

**§0.25.4 配套机制**:

- .hermes/cron-prompts/4 cron prompt: 撞墙升级段 (per B5 v2 脚本 + k3-30min-push-interval.py 落地, 4/4 PASS)
- verify-deploy.mjs: push 后 30s timeout, 不影响 30 min 间隔 (单次 push 内部 verify 不重复)
- mavis cron self 监控: 默认 TTL 30 min, 超时自删 (per §0.6 监控规范)
- docs/2026-08-26-30min-push-interval.md: 撞墙升级报告 (K3 14:35 拍板落地, 8/28 中检验证)

**§0.25.5 反例 (M3 8/26 0:00-14:35 撞车 5 次, K3 14:35 拍板)**:

- ❌ B1a 05:25 → B5 05:31 = 6 min 间隔 (撞 K3 30 min 规则)
- ❌ B2 14:05 → B3 14:13 = 8 min 间隔 (撞 K3 30 min 规则)
- ❌ B3 14:13 → B4 14:25 = 12 min 间隔 (撞 K3 30 min 规则)
- ❌ B4 14:25 → B7 14:30 = 5 min 间隔 (撞 K3 30 min 规则)
- ❌ B7 14:30 → EOD 14:35 = 5 min 间隔 (撞 K3 30 min 规则)
- ✅ 修法: K3 14:35 拍板 30 min 规则 立即生效, 后续 push 必 ≥ 30 min 间隔, 上次 push = 14:35, 下次 push 最早 = 15:05

**§0.25.6 应用范围**:

- 任何项目: zprintpro / aitoptools / togthr / stock-lab
- 任何 push: cron auto / 手动 / 紧急 / amend force-push
- 任何报告: deploy 报告 / cron 日报 / K3 升级 / M3 复盘
- 任何文档: AGENTS.md / docs/*.md / .hermes/*.md
- 任何撞墙升级: K3 必拍 1 次回复 src 改动具体内容 (per K3 8/24 14:25 第 2 款)

**§0.25.7 教训固化源头**:

- zprintpro 8/26 14:35 K3 撞墙升级拍板 (5/6/7/8/12 min 撞车 5 次, K3 拍板 30 min 规则 立即生效)
- 跨项目 P0: 任何 "5/7 min 间隔 push" 模式 = 撞车, K3 必拍 1 次回复确认

**§0.25.8 全局约束: 30min 间隔 ≠ Start-Sleep 阻塞等待 (K3 8/26 06:30 拍板, 强制级)**:

- **核心**: 30 min 间隔是指**两次 git push 动作之间的自然时间差**, 不是让你用 `Start-Sleep` / `time.sleep()` 阻塞线程去死等
- **绝对禁止阻塞**: 绝不能使用 `Start-Sleep`、`time.sleep()` 或任何同步等待命令来卡住主进程/终端
- **正确处理方式**:
  - 检测到距离上次 push 不足 30 min → **立即结束当前任务** (将改动 commit 到本地即可, 或暂存)
  - **push 动作留给下一个 cron 周期** (比如下一个 30 min 的定时任务) 去执行
  - **绝不阻塞主进程等待凑够 30 min**
- **异步替代**: 如果必须延迟, 只能在**后台异步等待** (`run_in_background=true`), 绝不能阻塞当前的思考和执行循环
- **应用范围**:
  - 任何项目: zprintpro / aitoptools / togthr / stock-lab
  - 任何 push: cron auto / 手动 / 紧急 / amend force-push
  - 任何工具: PowerShell `Start-Sleep` / Python `time.sleep()` / Node.js `setTimeout` 同步版本 / 任何 sync wait
- **反例 (M3 8/26 06:30 错例, K3 06:30 拍板纠偏)**:
  - ❌ `Start-Sleep -Seconds 1500` 阻塞 25 min 等待凑够 30 min 间隔 → 阻塞主进程, 浪费 token, 违反"立即处理"原则
  - ✅ 改 `Start-Sleep` 为 commit to local + 1 段报告 K3 "距上次 push 不足 30 min, 改动 commit 本地, push 留给下一个 cron 周期"
  - ✅ 如需后台异步等, 用 `run_in_background=true` 启 background task, 不阻塞主进程
- **配套机制**:
  - §0.25.1 30 min 间隔 规则 (本节 §0.25.1-§0.25.7) 继续生效
  - §0.19 用户暂停信号 → 立即杀 cron (互补)
  - §0.6 紧急修复例外 (紧急 push 5xx 阻断, K3 必拍 1 次回复)
  - mavis cron self 监控: 默认 TTL 30 min (per §0.6 监控规范)

---

## 1. 核心定位（一句话）

> 香港印刷 SaaS，为全球用户提供 30 秒 AI 报价 + 72 小时全球交付。

## 2. 5 个不可妥协

1. **双品牌分层** (2026-07-21): zh-hk = 智印港 ZprintPro,en/ja = ZprintPro;错字「智印印港」绝不写
2. **8 locale 全覆盖** (zh-hk / en / ja + 5 个其他),SEO hreflang 正确
3. **GSC 数据实时分析** (gsc_data.csv + seo-weekly-analyzer.py)
4. **airwallex 多币种**结算,CN 用 alipay, 其他用 USD
5. **本地开发 + Cloudflare Pages 部署**(Node.js runtime via @opennextjs/cloudflare)

## 3. 项目结构（关键路径）

```
F:\zprintpro-nextjs\
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── page.tsx                 # 首页
│   │       ├── category/[slug]/page.tsx # 分类页 (13 类)
│   │       ├── product/[slug]/page.tsx  # 产品页
│   │       ├── blog/[slug]/page.tsx     # 知识中心
│   │       └── services/rush-printing-delivery/page.tsx
│   └── lib/
│       ├── pricing.ts                   # 多币种定价
│       ├── seo.ts                       # SEO meta 生成
│       └── airwallex.ts                 # 支付集成
├── messages/                            # 8 locale, i18n 消息
├── scripts/
│   ├── seo-weekly-analyzer.py           # GSC 周报生成 (Cron 2e7ff9ec5f15, 每周一 9 点)
│   ├── apply_patches.py                 # 从周报生成 SEO 补丁
│   └── build_verifier.py                # 构建验证 (≥400 页面硬校验)
├── patches/                             # SEO 补丁
├── seo-research/                        # SEO 竞品研究
├── docs/                                # 文档
├── supabase/                            # 数据库迁移
├── public/                              # 静态资源
├── .env, .env.local, .env.example       # 环境变量
├── wrangler.toml                        # Cloudflare 配置
├── next.config.js
├── package.json
└── AGENTS.md                            # 本文件
```

## 4. 环境变量（必须）

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AIRWALLEX_API_KEY`
- `AIRWALLEX_CLIENT_ID`
- `NEXT_PUBLIC_CDN_URL`

## 5. SEO/GEO 关键约定

- **Title**: 50-60 字符,主关键词前置,品牌后置,只用一次
- **Meta description**: 150-160 字符,含数字 + CTA
- **H1**: 每页唯一,含主关键词
- **Schema**: Organization / BreadcrumbList / Product / FAQPage
- **hreflang**: zh-hant-HK / en / ja-JP / x-default=zh-hant-HK
- **sitemaps**: zh-hk / en / ja 各一份 + sitemap-index.xml

## 6. 常用命令

```bash
# 开发
npm run dev

# 构建 (本地)
npm run build

# Cloudflare 构建 + 部署
npm run cf-deploy

# SEO 周报 (本地)
python scripts/seo-weekly-analyzer.py

# 应用 SEO 补丁 (--preview 先看)
python scripts/apply_patches.py --preview
python scripts/apply_patches.py --apply

# i18n 检查
node scripts/check-i18n.js
```

## 7. 与 hermes 的集成约定

- **配置主目录**: `C:\Users\Administrator\.hermes\` (全局)
- **项目专属 memory**: `F:\zprintpro-nextjs\.hermes\memory\` (新建)
- **已积累记忆**: `C:\Users\Administrator\.hermes\memories\{MEMORY.md, USER.md}` (不要覆盖)
- **沟通语言**: 中文为主,简洁直接,指令式
- **品牌关键词**: zh-hk = 智印港 ZprintPro,en/ja = ZprintPro;「智印港」= 自有品牌词,GSC 分析中单独统计其 CTR (基线 10%,目标 4 周 40%+),**只过滤错字「智印印港」**
- **重要模块**: GSC 数据 / SEO 周报 / 多 locale i18n / Cloudflare 部署

## 8. 7 大"绝对不要做"清单

1. ❌ 不要用"智印印港" (错字竞品词) / 任何外部竞品名;「智印港」是自有品牌 (zh-hk 专用),允许且必须使用
2. ❌ 不要在 user-facing 文本里出现 GBK 乱码 (中文必须 UTF-8)
3. ❌ 不要漏 hreflang (8 locale 必须完整)
4. ❌ 不要让 /app/ 目录被提交 (会冲突 Cloudflare 构建)
5. ❌ 不要把 .env 真实 key 提交 (已 .gitignore 但要小心)
6. ❌ 不要在 GSC 数据里出现竞品词"智印印港"
7. ❌ 不要让 SWC 解析失败 (Python open() 写文件必须 newline='\n', 避免 CRLF)

## 9. 关键文件别删

- `scripts/seo-weekly-analyzer.py`
- `scripts/apply_patches.py`
- `scripts/build_verifier.py`
- `patches/` (所有 SEO 补丁)
- `seo-weekly-history.json` (历史周报数据)
- `wrangler.toml` (Cloudflare 配置)
- `AGENTS.md` (本文件)

## 10. hermes 调用模式

```bash
# 单次 query (用 DeepSeek-V4-flash)
hermes -q "分析当前 GSC 数据,找 Top 3 关键词优化机会"

# 项目级 memory 注入
hermes --cwd "F:\zprintpro-nextjs" -q "..."

# 跨项目 (zprintpro + stock-lab) 联合 query
hermes --global-memory -q "对比 zprintpro 和 stock-lab 的术语习惯"
```

<!-- autoclaw:skill-path-guidance -->
## Installing Skills

When creating or installing a new skill, always place it in:

`C:\Users\Administrator\.openclaw-autoclaw\skills/<skill-name>/SKILL.md`

This is the managed skills directory. The agent will automatically discover
any skill placed here — no extra configuration needed. Do NOT install skills
into `~/.agents/skills/` (that directory is shared with other tools).


<!-- autoclaw:browser-agent-guidance -->
## Browser Automation

For any task that requires a browser, **prefer `autoglm-browser-agent`**. Use it as the first choice. For time-sensitive scenarios such as financial news, stock quotes, or breaking news, you can additionally use this skill to fetch up-to-date information and supplement your data sources.

- ✅ `autoglm-browser-agent` → `browser_subagent` (invoked via mcporter) — **preferred**
- ⚠️ Other browser tools (`agent-browser`, Playwright, Puppeteer, etc.) — fallback only when `autoglm-browser-agent` is unavailable or fails

Always try `autoglm-browser-agent` first. Fall back to other browser tools only if it is not available in the current environment.

**IMPORTANT: Do NOT use `sessions_spawn` to delegate browser/web automation tasks to a sub-agent.** Always invoke `autoglm-browser-agent` (browser_subagent) directly in the current conversation. Browser tasks must be handled by yourself, not by a spawned child agent.
<!-- /autoclaw:browser-agent-guidance -->

<!-- autoclaw:image-recognition-guidance -->
## Image Recognition

For any image recognition task, **prefer `autoglm-image-recognition`**. Use it as the first choice.

- ✅ `autoglm-image-recognition` — **preferred** for all image recognition tasks
- ⚠️ Built-in `image` tool or reading images directly with `read` — fallback only when `autoglm-image-recognition` is unavailable or fails

Do not use the built-in `image` tool or read an image and describe it yourself when `autoglm-image-recognition` is available. Always try `autoglm-image-recognition` first.
<!-- /autoclaw:image-recognition-guidance -->
## 11. 主营品类约束（2026-06-28，2026-08-17 K3 战略修正）

- **主营品类 5**: 貼紙 / 宣傳單張 / 包裝盒 / 紙袋 / 標籤（任何页面/文案/SEO 都可写，是 ZprintPro 核心业务）
- **业务子类目（2026-08-17 K3 战略修正新增）**: 贺卡 / 喜帖 / 台卡 / 酒水牌 / 感谢卡 / 名牌卡 / 邀请函 — 新建 `greeting-cards` + `wedding-invitations` + `place-cards` 三个类目后，业务子类目页面可写"咭片/名片"等业务子类目用法，内部链接到对应类目，主营误用禁词豁免
- **纸卡 (paper card / cardstock)**: 保留为物理材质，是 FSC 咭片/纸卡行业术语，不是 §11 主营误用
- ❌ **绝对禁词（2026-08-17 修订）**: 咭片（作为业务子类目用法）/ 名片 / business cards / 名刺（ja 行业术语提及 8/17 拍板保留 ja 客户案例）= 主营误用禁，业务子类目豁免
- 所有 SEO 标题、描述、关键词、产品文案、AI 训练文本中不得出现 主营误用（主营品类 5 误用 + 业务子类目未链接豁免）
- 咭片/名片 业务子类目用法 = 链接到 `greeting-cards` / `wedding-invitations` / `place-cards` 类目，主页可写
- 详见 `docs/k3-greeting-cards-strategy-2026-08-17.md`（M3 战略思考 + 联网核实数据）
## 12. Push 安全协议（2026-07-02）

### 写入规则
- ❌ **禁止 PowerShell Set-Content 写 .ts/.tsx 文件**（默认编码不稳定，可能变 UTF-16）
- ✅ **只用以下 3 种安全方式写入**:
  1. `[System.IO.File]::WriteAllText(path, content, [System.Text.UTF8Encoding]::new($false))` — PowerShell 安全写入
  2. `fs.writeFileSync(path, content, 'utf-8')` — Node.js 安全写入
  3. `write` tool — 仅限 sandbox 内文件
- ✅ 写入后必须立即校验: `node -e "const fs=require('fs');const b=fs.readFileSync('path');console.log('Size:',b.length,'BOM:',b[0]===0xFF)"`
  - Size 接近预期的 2 倍 = UTF-16 污染，立即 git checkout 恢复
  - BOM=true (0xFF) = UTF-16 LE，立即 git checkout 恢复

### Commit 前校验
```bash
node scripts/check-encoding.js          # 检查 UTF-16 + CRLF
node scripts/check-encoding.js --fix    # 自动修复 + 重新 stage
npm run build 2>&1 | Select-String 'Compiled|Error'  # 确认构建通过（注意：Windows 本机 build 卡 fonts 网络,以 CF Pages 状态为准）
```

### Push 后校验（最常遗漏的盲点）
```bash
node scripts/verify-deploy.mjs          # 自动查 CF Pages check-runs API status
```
- 退出码 0 = CF Pages build `success`（deploy 真生效）
- 退出码 1 = build `failure`（**不能算完成，立刻修 build 错**）
- 退出码 0 但 status `queued/in_progress` = 还在 build，等 1-2 分钟重跑

**核心规则**: **push 成功 ≠ deploy 成功**。git log 显示 commit 已 push 不代表页面真的在线。要以 GitHub check-runs API 的 Cloudflare Pages 状态为准。

### Git 编码配置（已固化）
- `.gitattributes`: 强制 LF + UTF-8 working-tree-encoding
- `core.autocrlf=false`, `core.eol=lf`
- `i18n.commitEncoding=utf-8`
- `.git/hooks/pre-commit`: 自动调 `node scripts/check-encoding.js`，UTF-16/CRLF 直接拒绝 commit

### 记住（push 5 步 SOP）
- **commit 前 3 问**: ① Size 合理? ② encoding check 过了? ③ build 过了（或至少没新增错）?
- **push 后 1 必做**: `node scripts/verify-deploy.mjs` 看 CF Pages 是否真 `success`
- **再加 1 防线**: `node -e "const fs=require('fs');const b=fs.readFileSync(p);console.log('size:',b.length,'BOM:',b[0]===0xFF)"` spot check
- 4-5 个全 YES 才报完成，任一个 NO 立即修（典型教训：见 `memory/Hermes 任务报告"写日志不上线"`）

## 13. SEO 行业×SKU 矩阵自进化定时任务（2026-07-04 由 user 拍板）

> **核心定位**: 把 SEO 自进化从 Hermes 抽象 cron 升级为 user 自己定时任务列表里可见、每天 10:15 跑的实体任务。
> **目标**: 千行百业 × 主营类目,深度+广度双覆盖,纯文字博客无图,稳定运维不出现 404/301。

### 13.1 4 条 cron 实体 (2026-08-23 06:38 K3 v3 增补校准)

| Cron 名 | 触发 | 范围 |
|---------|------|------|
| `zprintpro-daily-content-1x7w` (校准 8/23, 实际名) | 每天 9:10 Asia/Shanghai (校准 8/23, 实际触发) | Blog (1-2 篇纯文字) + SKU (2-3 个优化) + Matrix tracking + v3 5 SOP + §13.16.1 ja 品牌词「ジープリント」埋点 + T39 IndexNow 自动化 (8/28 后) |
| `zprintpro-weekly-meta-refresh` | 周一 11:00 | Tier B 行业 + 类目页 meta refresh + v3.16 T41/T42/T44/T45 (8/28 验收) + §13.16.1 ja 埋点 |
| `zprintpro-monthly-matrix-audit` | 每月 1 号 14:00 | 全 matrix 覆盖率审计 + Tier 切换判定 + G2 实体 0→1 + G1 Vol.2 进度 + §13.16.1 30 目录建设 |
| `zprintpro-gsc-feedback-loop` | 每周三 15:00 | 拉 GSC 数据 → 写回 matrix next_due 加权;+ 智印港品牌词 CTR 追踪 (基线 10% → 目标 4 周 40%+);+ ジープリント branded search 6 query 监测;+ 301 承接验证 (z-printpro.com 旧 URL 抽查 ≥10 条确认 301 → 新站 200);+ T43 反直觉: rich results 是 GSC 观察项, 禁盲改 schema |

### 13.1.1 4 cron 必读 SSoT (2026-08-23 K3 拍板, 最高优先级)

**`F:\zprintpro-nextjs\.hermes\cron-prompts\k3-v3-addendum-2026-08-23.md`** (22.3KB, 12 节, 4 cron 启动必读第 1 优先级)

v3 增补内容 (K3 8/20-8/23 拍板):
- §0.21 报告格式简化 (8/20 11:54): 报告不列 push 计数, 攒批策略作废
- 业务 0 改动红线 (8/22 17:58 F0 拍板): 不删 SKU / 文案 / 长文本字段
- 5 SOP 完整谱系 (8/22-8/23): SOP-1 红灯冻结令 / SOP-2 阈值二元化 / SOP-3 根因 diff 优先 / SOP-4 债务熔断 / SOP-5 派生数据禁手搓 / SOP-6 lock 双验证 / SOP-7 验收数字附原文 / SOP-8 撞车兜底 / SOP-9 验证 > 假设
- §13.16.1 ja 品牌词「ジープリント」 (8/8 02:52): 30 目录 + sameAs + 埋点 2-3 次
- T43 反直觉 (8/23 02:52): 16 类目 × 3 locale + PDP + blog FAQPage 已全部在线, "48 组件缺失"前提已过期
- G1 Vol.2 计划 (8/28 中检后): 008 度量层 SQL + 区域 hreflang + ja 摘要
- v3.16 9 任务进度 (8/22 17:48): F0 ✅ / F1 ✅ / T41-T45 PENDING (8/28) / G2 PENDING (8/28) / T39 PENDING (8/28)

### 13.2 行业 Tier 分级（按印刷品复购频次，不是按市场规模）

- **Tier A**（高复购，月/周，跨境主力，优先铺）: 餐飲外賣 / 零售精品 / 跨境電商 / 美妝護膚 / 教育培訓 / 婚慶 / 文創IP / 寵物 / 母嬰 / 茶飲食品 / 物流快遞 / 服裝
- **Tier B**（中频，季/项目制，次铺）: 房地產 / 酒店民宿 / 醫藥保健 / 汽車汽配 / 金融證券 / 珠寶鐘錶 / 體育賽事
- **Tier C**（低频，年/项目制，按需）: 工業機械 / 五金工具 / 化工 / 建築工程 / 宗教文化 / 政企 / 影視IP / 同人周邊

### 13.3 类目优先级（P0/P1/P2）

- **P0 主推**（先铺）: stickers / flyers / packaging / paper-bags
- **P1 辅助**（次铺）: posters / books / educational / menus / red-packets / calendars
- **P2 长尾**（按需）: banners / envelopes / japan-doujin
- **禁区**（永不写）: business-cards（§11 主营品类约束）

### 13.4 纯文字博客硬约束（v2，2026-07-05 修订）

- ❌ **新博客 `cover` 字段不写**（`src/data/blog-posts.ts` BlogPostMeta.cover 改为可选）
- ❌ **HTML content 不出现 `<img>` 标签**
- ❌ **标题硬塞 supplier origin**（如 "· 深圳印刷 / · 中国深圳 / · Shenzhen Printing"）—— **v2 旧规则作废，见 §13.10 NAP vs SEO 内容脱钩**
- ✅ **标题按 locale 本地化（按 §13.10）**:
  - zh-hk → 香港 / 澳门 / 華人圈场景关键词
  - en → 全球通用卖点（size/paper/design/material）+ 不带地区后缀，或带目标市场（US/UK/AU）通用词
  - ja → 日本市场卖点 + 不带"中国/深圳"前缀
- ✅ 9 段结构（引子 / 行業概況 / 材質工藝 / 設計細節 / 選購決策 / 常見問題 / CTA + 隐式 schema）
- ✅ zh-hk 800-1000 字 / en 250-350 词 / ja 250-350 词
- ✅ 4 FAQ + Article + BreadcrumbList + FAQPage JSON-LD

### 13.5 SKU 自进化优化

- 直接编辑 `src/data/products.ts` 对应 SKU 对象的:
  - `title_zh` / `title_en` / `title_ja` 加 1-2 个 Tier A 行业关键词
  - `description` / `descriptionEn` / `descriptionJa` 末尾追加"适配行业"列表（5-8 个）
  - `longDescription` 视情况补充行业场景（不加图）
- **不改 slug、不改 schema、不改图片**
- 加 `optimizedAt: 'YYYY-MM-DD'` + `optimizationRound: N` 字段

### 13.6 链接完整性红线（稳定运维）

- ❌ **新内容里不写任何会 404 的链接**
- ❌ **新内容里不写任何会触发 301/302 重定向的链接**
- ✅ **写链接前** 必须先在 matrix `valid_internal_links` 清单里核对
- ✅ **写链接后** 必须 curl 验证每个内链返回 200
- **有效路由模式**: `/{locale}/category/<slug>/`、`/{locale}/product/<slug>/`、`/{locale}/blog/<slug>/`、`/{locale}/quote/`、`/{locale}/contact/` 等（详见 context.md §8）
- **禁止模式**: 无 locale 前缀、`/products/`（错路径，正确是 `/product/`）、未在 products.ts 注册的 slug、`/category/business-cards/`（禁区）

### 13.7 矩阵跟踪

- 矩阵文件: `F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json`
- 字段: `queue` (待写列表) + `covered` (已写) + `category_priority` (类目 P0/P1/P2) + `industry_tier_a/b/c`
- 调度算法: P0 优先 → 80% 铺完解锁 P1 → 同 category 5 天内不重复同 SKU → GSC 已展示无着陆页优先级 +1

### 13.8 异常上报

- CF build 失败 / push 报错 → 立即升级 user
- 推送后任一 curl 返回 5xx 或 404 或 301 → 立即升级 user，不报完成
- 新博客上线 7 天 GSC 仍无收录 → 升级 user，排查索引问题
- matrix.json 损坏 / token > 50 万 → 升级 user

### 13.9 矩阵跟踪 cron 监控

- 监控 cron 必须有 3 个 hard-coded 出口: (a) TTL 过期自删 (b) 报告落盘自删 (c) 静默阈值触达升级用户
- cron 监控 `cf-build-monitor-<sha>` 默认 TTL 30 分钟, 超时自动升级 user
- 部署 cron 监控 `zprintpro-daily-content-evolve` 默认 TTL 90 分钟

### 13.10 NAP vs SEO 内容脱钩原则（2026-07-05 user 拍板）

**核心**（v4 提示词 3-locale 策略的执行层）：**法务真实 ≠ SEO 内容**。两个层必须分开。

| 层 | 写真实 | 例 |
|---|--------|----|
| **NAP 层**（法务合规，必须真实） | ✅ 写深圳 | footer address / contact page / legal disclosure / Schema Organization.address / email signature / WhatsApp 自动回复 |
| **SEO 内容层**（用户体验 / 认同感 / CTR） | ❌ **不写 supplier origin 城市** | blog 标题 / excerpt / hero / CTA / 列表卡片 / FAQ |

**NAP 真实地址**（法务公示用，所有 locale 一致）：
- 公司全名: 深圳市彩龍印刷包裝有限公司
- 地址: 広東省深圳市龍崗区平湖街道嘉城路1号 (〒518111)
- 电话 (2026-08-07 K3 拍板 phase-out, call + WhatsApp 统一): +86 198 8085 1334
- 邮箱: zprintpro@outlook.com
- 法人: 唐运提

**SEO 内容本地化矩阵**：

| Locale | 目标市场 | blog 标题/excerpt 应含 | 不应含 |
|--------|---------|---------------------|--------|
| **zh-hk** | 香港 / 澳门 / 台湾 / 海外華人圈 | 香港场景 (餐飲旺季 / 包裝盒 / 印刷旺季 / MTR / 順豐本地) | "深圳" 作主关键词前缀 |
| **en** | US / UK / AU / CA / NZ / SG | 全球通用卖点 (sizes / paper / design / material / DHL 2-4 days / Asia factory) | "Shenzhen Printing" / "in Hong Kong" / "China factory" 作标题前缀 |
| **ja** | 日本市場 (東京 / 大阪 / 名古屋) | 日本市场卖点 (品質 / 短納期 / 日本向け / 中国印刷 通販) | "深圳印刷" / "中国深圳" / "深セン" 作标题前缀 |

## 13.16.1 ja 品牌词"ジープリント"公式 (K3 8/8 02:52 拍板, 智印港公式复制)

**核心**: 复制"智印港"在香港见效的 GEO 公式到日本.

**品牌词**:
- **primary brand ja**: `ZprintPro` (per §13.13 三 Locale 鐵律, 维持现状)
- **alternate brand ja**: `ジープリント` (J-Print) — K3 8/8 02:52 拍板 "按最优执行"
- **rationale**: 音译 Z→J (日语无 Z) + Print→プリント = 3 假名简洁, 跟 en ZprintPro 品牌延续, SEO「プリント」是日语印刷核心搜索词

**智印港公式 (4 因子可量化)**:
| 因子 | 智印港 (HK) | ジープリント (JP) |
|------|------------|-----------------|
| 本地实体信号 | "港"字 + 香港本地词 | "プリント" + 日本本地词 + ジープリント 实体词 |
| 品牌记忆度 | 3 字、口语化、谐音"智能印刷" | 4 假名、外来语习惯、谐音"Z-Print" |
| 口语=搜索词 | 粤语/普通话都说得顺 | ジープリント / プリント 都说得顺 |
| 实体一致性 | 站名=社媒=目录 | 站名=社媒=目录+JP 印刷组合 = NAP 消歧清晰 |

**实施**:
1. **全站统一**: 站名 / 社媒 / JP 印刷组合目录 / Organization schema 同名「ジープリント」, 不许漂移
2. **Organization JSON-LD sameAs**: X + LinkedIn + JP 印刷组合目录 (30 条) + Startup Base + areaServed=JP + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
3. **品牌词埋点**: 价格横评页 + 学园祭指南 + 校园 blog 自然提及「ジープリント」2-3 次, 诱导 branded search
4. **30 目录目标** (8/10 起 AutoGLM 跑): 印刷/POD 相关 7 + 本地/创业 7 + 行业 5 + SaaS 聚合 3 + 其他 8
5. **branded search 监测**: 6 个 query (ZprintPro / ジープリント / etc.), 基线 0 → 8/12 期望 ≥1

**禁忌** (per K3 8/8 02:52 §0.9 增补):
- ⛔ 论坛签名档/评论留链/Web2.0/PBN/自动换链
- ⛔ 品牌词漂移 (站名 ≠ 社媒名 ≠ 目录名)
- ⛔ en/ja 标题/excerpt 硬塞 supplier origin (维持 §13.10 NAP 脱钩)

**supplier origin 在 SEO 内容的正确写法**：
- ✅ 正文/FAQ/Schema 中提及 "亚洲工厂 + DHL 全球 2-4 天配送"（佐证品质 + 物流）
- ✅ CTA 按钮: "Get Quote" / "Free Sample" / "WhatsApp Us"（不绑城市）
- ✅ Schema Organization.address 写真实深圳（法务）
- ❌ 标题主关键词前面塞 "· 深圳印刷"（破坏 CTR）
- ❌ 列表卡片 excerpt 写 "Shenzhen restaurant opening season"（用户跳出）

**机械翻译 = 死罪的反例**（a38dc93 commit 错判，2026-07-05 user 纠正）：
- ❌ `zh-hk: 香港包裝盒訂製...` → `en: Custom Packaging Box Guide: ... in Hong Kong` → `ja: 香港パッケージ箱...`
- ❌ `zh-hk: 餐廳開業...深圳印刷` → `en: Restaurant Opening Flyer ... Shenzhen Printing` → `ja: レストラン開業 ... 深圳印刷`
- ❌ 老博客 24 条全部 excerpt 含 "in Hong Kong"（v1 时代 zh-hk 模板直接英译，Phase 2 排程清洗）

**判断 SOP**（任何新 blog/SKU 内容上架前自查）：
1. 打开 blog-posts.ts 的 title / excerpt 3 locale 字段
2. 检查 en/ja 标题是否含 supplier origin 城市（Shenzhen / 深圳 / 深セン / 中国）
3. 检查 en/ja 标题是否含 zh-hk 残留地区词（Hong Kong / 香港 / 香港）
4. 检查 en/ja excerpt 是否含 "Shenzhen" / "Hong Kong" 等硬塞词
5. 任一命中 → 改成本地化卖点（size/paper/design/material/scenario）

**应用范围**：
- blog-posts.ts 所有 BlogPostMeta.title / excerpt 3 locale 字段
- products.ts 所有 Product.title_zh/en/ja / description / descriptionEn / descriptionJa / longDescription
- category/[slug]/page.tsx hero 标题 + description
- 任何 `pages/blog/` JSON content (en.json / ja.json)
- Schema Article.author / BlogPosting 字段
## 13.10 NAP vs SEO 内容脱钩原则（2026-07-05，教训来自 a38dc93 踩坑）

**核心错误**：把"法务真实地址（NAP）"和"用户认知（SEO 标题/excerpt/正文）"混在一起。

| 层 | 用途 | 规则 |
|----|------|------|
| **NAP 层** (footer/schema/contact/email/tel) | 法务合规 | 必须真实（zh-hk=HK / en=Shenzhen / ja=Shenzhen） |
| **SEO 内容层** (blog 标题/excerpt/正文/hero/CTA) | 用户认知、认同感、CTR | 必须本地化，按 target market 写，不按 factory location |

**zh-hk SEO 内容**：target market = 香港/澳门/台湾/海外華人圈
- ❌ 标题写"深圳印刷"——繁体用户视"深圳"为内地概念，无认同感，CTR 低
- ✅ 写香港本地场景词："香港餐飲開業旺季""港九新界速遞"

**en SEO 内容**：target market = US/UK/AU
- ❌ 标题写"Shenzhen Printing"——美国用户看到直接跳出
- ✅ supplier origin 藏在正文："DHL 2-4 day from Asia factory"

**ja SEO 内容**：target market = 日本
- ❌ 标题写"深圳印刷"——日本用户不搜这个词
- ✅ 写日本市场卖点，不带中国/深圳前缀

## 13.11 Pre-commit 校验清单（2026-07-05，防重复踩坑）

**每次 commit 前 5 问**：
1. `node scripts/check-encoding.js` — 编码检查（UTF-16/CRLF）✅？
2. `npm run build` — 本地编译通过（Compiled successfully + 无 TS error）✅？
3. 新增 blog slug 是否已加入 `articleSlugs` 数组？✅？
4. zh-hk 标题/excerpt 是否写了 target market（香港）而非 factory location（深圳）？✅？
5. en/ja 标题/excerpt 是否避免了机械翻译污染（"in Hong Kong""香港"等硬塞词）？✅？

**5 问全过才 push。任一项不过立即修，不推。**

## 13.12 TS 联合类型窄化模式（2026-07-05）

**问题**：`TEXTS[locale]` 返回联合类型，分支内 TS 不确定具体类型。

**修复模式**（见 `FloatingQuoteCTA.tsx`）：
```ts
if (locale === 'zh-hk') {
  const tZh = t as typeof TEXTS['zh-hk'];  // 强制窄化
  // 现在可以访问 zh-hk 独有的字段
}
```

**此模式适用于所有 `translations[locale]` 联合类型场景。**
## 13.13 3 Locale 内容本地化铁律（2026-07-05，血泪教训）

### 核心原则
**3 locale 不是"翻译"关系，是"3 个独立市场的内容策略"关系。**

| Locale | Target Market | 语言 | 标题规则 | 内容规则 |
|--------|-------------|------|---------|---------|
| zh-hk | 香港/澳门/台湾/海外華人圈 | 繁体中文 | 香港本地场景词 | 不出现"深圳" |
| en | US/UK/AU/CA/NZ/SG | 英文 | 全球通用卖点 | 不硬塞"Shenzhen""Hong Kong" |
| ja | 日本 | 日文 | 日本市场卖点 | 不出现"深圳""中国"前缀 |

### 禁止事项
- ❌ **机械翻译**：zh-hk 内容直接机翻成 en/ja 就上线
- ❌ **标题塞 supplier origin**："Shenzhen Printing""深圳印刷"等工厂地点不准出现在 en/ja 标题
- ❌ **跨市场混用**：zh-hk 的"香港本地服务"文案直接复制到 en/ja
- ❌ **只修一处**：blog-posts.ts 和 page.tsx 的标题/描述必须**同时修复**，修了列表页不修详情页 = 没修

### 修复清单（每次改博客内容后必须确认）
1. `src/data/blog-posts.ts` — 列表页 title/excerpt ✅ 已修复？
2. `src/app/[locale]/blog/[slug]/page.tsx` — 详情页 posts 对象 title/description ✅ 已修复？
3. `public/blog-data/{locale}.json` — JSON 正文内容 ✅ 无"Shenzhen/深圳"残留？
4. zh-hk: 标题是繁体中文？en: 标题是英文？ja: 标题是日文？✅？## 13.14 Footer 合规分层（2026-07-08 user 拍板）

### 3 Locale 法规对 Footer 的差异要求

| Locale | 底部「經營者資訊披露」按鈕 | 原因 |
|---|---|---|
| **zh-hk** | ❌ 不顯示 | 跨境電商無 HK 實體門市, 強加日本式披露 = 偽合規 |
| **en** | ❌ 不顯示 | 同 zh-hk, 跨境無需強制 Legal Disclosure 入口 |
| **ja** | ✅ **必顯示**「特定商取引法に基づく表記」 | 日本《特定商取引法》第3条 + 施行規則第2条 必須記載事項 11 項 |

### 隱私政策 + 使用條款 的位置（**全部 3 locale 統一**）

- ❌ **不在底部獨立 legal strip**（用戶觀感差, 容易和法律披露混淆）
- ✅ **移到「幫助中心」column** 作為普通 help item（落單須知 / 付款方式 / 送貨安排 / 退換政策 / 隱私政策 / 使用條款）

### 实施模板 (Footer.tsx)

```tsx
// 幫助中心 column 各 locale 統一加隱私 + 條款
{
  title: '幫助中心',  // en: 'Help Center', ja: 'ヘルプセンター'
  links: [
    { label: '落單須知', href: '/help-center/#order' },
    { label: '付款方式', href: '/payment-methods/' },
    { label: '送貨安排', href: '/help-center/#shipping' },
    { label: '退換政策', href: '/help-center/#returns' },
    { label: '隱私政策', href: '/privacy/' },     // ADD
    { label: '使用條款', href: '/terms/' },        // ADD
  ],
},

// 底部 legal strip 只對 ja 渲染 (僅保留「特定商取引法に基づく表記」)
{locale === 'ja' && (
  <div className="mt-4 pt-4 border-t border-white/10">
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
      <Link href={`${localePrefix}/legal/`} className="hover:text-white transition-colors">
        {t.legalLabel}
      </Link>
    </div>
  </div>
)}
```

### SKU 品牌故事 supplier origin 简化（跨 locale 通用）

| Locale | 旧 full entity name pattern | 新 shortened |
|---|---|---|
| zh-hk (繁體) | `深圳彩龍印刷包裝有限公司` | `彩龍印刷` |
| ja (簡體) | `深圳彩龍印刷包装有限公司` | `彩龍印刷` |
| en | 无完整公司全称 pattern（保持 "Shenzhen-rooted" 短语）| - |

⚠️ **保留 `深圳自社工場` 等 supplier origin 短语** — ja 用戶视深圳為製造基地常識，不抵觸 §13.10 (只限制 title 不限制 body)。

### 验证清单 (改 Footer 后必须跑)

1. curl `https://zprintpro.com/zh-hk/` → grep `經營者資訊披露` 应为 0
2. curl `https://zprintpro.com/en/` → grep `Legal Disclosure` 应为 0
3. curl `https://zprintpro.com/ja/` → grep `特定商取引法に基づく表記` 应为 ≥1
4. 三 locale footer「幫助中心」column 各含 `隱私政策` / `使用條款` (en: Privacy Policy / Terms of Service)
5. ja SKU page grep `深圳彩龍印刷包装有限公司` 应为 0, `彩龍印刷` 应为 ≥1

### 踩坑教训（2026-07-08 真实事故）

- ❌ **3 locale Footer 共享同一份底部 legal links 渲染逻辑** = zh-hk/en 用户看到日本式「經營者資訊披露」按鈕（伪合规 + 视觉冗余）
- ✅ **Footer 法律元素按 locale 条件渲染** — 不是「全部 locale 都加，按 locale 隐藏文案」(文案泄露信息)
- ✅ **幫助中心 column 是隐私/条款的合理归属**（合 faq + 退换 + 物流 同列）

应用范围: 任何跨境电商 Footer 都应先做「法规矩阵」, 后做 UI 设计, 不要拿单一司法辖区模板套全部 locale。## 13.14 「15+ 年」统一口径（2026-07-09 user 拍板）

> **核心**：法律实体真实成立年份 = **2012 年**；对外营销口径统一写 **"15+ 年"**（2012 → 2026 = 14 年，对外"15+" 合理；也避开"17 年"的过度宣传风险）。

### 两层口径

| 层 | 数值 | 出现位置 | 规则 |
|---|---|---|---|
| **法律实体层** (NAP) | 2012 | `/legal/` `establishedYear` / `/press-kit/` aboutText / schema.org `foundingDate` | ✅ 写真实，3 locale 同步 |
| **营销口径层** (SEO) | "15+ 年" | Hero `TrustWaterfall` / `TrustBadges` / `HowItWorks` trust bar / `/about/` stats / Footer | ✅ 统一用 "15+"，不用 9/10/14/17 |

### 强制检查项（修改 history 后跑）

| 检查 | 命令 | 期望 |
|---|---|---|
| 残留 9 年 | `grep -rn "9 Years\|9 年\|9年\|9 years" src/` | 0 hit |
| 残留 2017 | `grep -rn "2017 年\|founded 2017\|since 2017" src/ docs/` | 0 hit |
| 残留 2014（about 用错的旧年份）| `grep -rn "2014" src/app/\[locale\]/about/` | 0 hit（除注释） |
| 残留 10+（stats） | `grep -rn "stats.*10+\|'years'.*10+" src/` | 0 hit |
| 残留 2009（旧 foundingYear）| `grep -rn "2009 年起\|establishedYear.*2009\|founded in 2009" src/ docs/` | 0 hit |
| 15+ 年同步 | `grep -rn "15+ 年\|15+ Years\|15+ 年の\|15+ years" src/` | ≥5 hit（TrustBadges + HowItWorks + TrustWaterfall + about + schema） |

### 唯一例外

- `press-kit/` 内部行 1: "成立於 2012" → 写真实，不写"15+"
- `legal/` 行 1: `establishedYear: 2012` → 写真实

### 教训（2026-07-09 真实事故）

- ❌ about/page.tsx L137 `foundingDate: '2014'`（与 legal/press-kit 的 2009 矛盾，且 legal 改成 2012 后又错位）
- ✅ 所有 `foundingDate` / `establishedYear` 必须从 **同一个常量** 取（`siteConfig.foundingDate`），不要 hardcode 在多个文件
- ✅ "15+" 写法比 "14" 安全（"14 years" 听感不足，"16 years" 又过头）

## 13.15 en 美国市场集中优化策略（2026-07-09 user 拍板）

> **核心**：en locale **集中力量**做美国市场本地化优化（US-target 优先），不分散到 UK/AU/CA/NZ。zh-hk/ja 不被 en 美国化污染（§13.10）。

### 美国市场优先级（与 GSC 实测长尾词流量挂钩）

| Tier | 优先级 | 含义 |
|---|---|---|
| **Tier 1 (P0)** | 最高 | "Free Shipping stickers USA" / "Custom packaging boxes free shipping" / "Free design mockup flyers" / "Made for USA small business" |
| **Tier 2 (P1)** | 高 | "Same day print and ship" / "FedEx Ground poster printing" / "No setup fee packaging" / "DTC brand packaging USA" |
| **Tier 3 (P2)** | 中 | "Trade show banners USA" / "100 MOQ stickers" / "FDA-compliant labels" / "Amazon FBA packaging" |

### 5 大美国 sharp hook（强制覆盖率）

| Sharp hook | 美国头部覆盖率 | 我们 en 现状 | 优化位置 |
|---|---|---|---|
| **Free Shipping $99+** | 100% | ✅ Hero + TrustBadges + CategorySharpHooks | 保持 |
| **Free Design / Free Mockup / Free Proofs** | 90%+ | ✅ Hero slide 2-6 subtitle + TrustBadges + HowItWorks step 3 | 强化覆盖率到 14/14 类目 |
| **No Minimum / 100 MOQ** | 80% | ✅ CategorySharpHooks | 保持 |
| **Fast Turnaround** (Same-day / 24h) | 70% | ✅ Hero slide 1 + Services page | 保持 |
| **Made in USA / Made for USA** | 60% | ⚠️ "Made for USA small business"（§13.10 脱钩后）| ✅ 分散在 CategorySharpHooks |

### en 美国 sharp hook 集中化部署规则

1. **Hero slide 6/6 都至少带 1 个 sharp hook**（Free Shipping / Free Design / Fast Turnaround 之一）
2. **类目页 H1 必须带 "Free Shipping $99+ + 100 MOQ + [FedEx Ground/DHL Express]" 之一**（a44281d v5 已铺）
3. **类目页 description 必须包含 ≥2 个 sharp hook 关键词**（a44281d v5 已铺）
4. **产品页 Tier 表 max discount ≥20%** 时显示 "Best Value" emerald ring（bf4b0ef P0.4 已铺）

### 反向规则（en 美国优化不能污染其他 locale）

| Locale | en 美国化文案 | 错误案例 | 正确写法 |
|---|---|---|---|
| zh-hk | "Free US Shipping $99+" | ❌ zh-hk step 5 "美國 $99+ 免費送貨" | ✅ "港九新界免費速遞 / \$500+" |
| ja | "FedEx Ground 5-7 day" | ❌ ja step 5 "米国 \$99+ 送料無料" | ✅ "日本全国送料無料 / 沖縄・北海道も同料金" |

### 4 个 cron 实体 en 美国优先级（2026-07-09 加权）

| Cron | en 美国加权 |
|---|---|
| `zprintpro-daily-content-evolve` (每天 10:15) | en blog / en SKU priority → +50% (Tier 1 美国长尾词每日至少 1 篇 en blog) |
| `zprintpro-weekly-meta-refresh` (周一 11:00) | en 14 类目页 meta → +30% (sharp hook 覆盖率补完) |
| `zprintpro-monthly-matrix-audit` (每月 1 号 14:00) | en Tier 1 美国词覆盖率审计 → 新增独立 audit pass |
| `zprintpro-gsc-feedback-loop` (每周三 15:00) | en 页面 CTR/impression 数据加权 ×2（相对 zh-hk/ja） |

### 不新建第 5 个 cron 的判断

考虑过 `zprintpro-en-us-competitor-monitor`（每周一扫描 Sticker Mule / CustomStickers.com / Packlane / VividPrintingHub 头部变化），但：
- ❌ scope creep — 4 个现有 cron 已经能 cover
- ✅ 通过 `weekly-meta-refresh` prompt 里加 "美国头部竞品对标" 模块实现
- ✅ 节省 1 个 cron slot（避免 daemon 负载）

未来如果美国竞品有大动作（如 Sticker Mule 大改 pricing / 新功能），单独 spawn verifier 不走 cron。

### verify 清单（en 美国 sharp hook 部署后）

1. curl `https://zprintpro.com/en/` → grep `Free US Shipping\|Free design mockup\|No setup fees` 各 ≥1
2. curl `https://zprintpro.com/en/category/stickers/` → H1 含 "Free Shipping\|Free Design\|No Minimum" 之一
3. 14/14 en 类目页 description 含 "Free Shipping\|Free Design" 之一
4. Hero slide 6/6 至少含 1 sharp hook
5. zh-hk/ja 首页不应出现 "美國 \$99+" / "米国 \$99+" 等污染（§13.10）

## 13.16 Pre-commit 校验清单 v2（2026-07-09 强化版）

> 在 §13.11 v1 基础上加 3 项 en 美国集中 + 15 年口径检查。

**每次 commit 前 8 问**：
1. `node scripts/check-encoding.js` — 编码检查（UTF-16/CRLF）✅？
2. `npm run build` — 本地编译通过（Compiled successfully + 无 TS error）✅？
3. 新增 blog slug 是否已加入 `articleSlugs` 数组？✅？
4. zh-hk 标题/excerpt 是否写了 target market（香港）而非 factory location（深圳）？✅？
5. en/ja 标题/excerpt 是否避免了机械翻译污染（"in Hong Kong""米国"等硬塞词）？✅？
6. **en 改动是否触动了 5 大 sharp hook 之一**（Free Shipping / Free Design / No Minimum / Fast Turnaround / Made for USA）？✅？
7. **未引入 "9 年 / 2017 / 2014 / 2009 / 10+ year" 残留**（必须用 15+ / 2012）✅？
8. **zh-hk/ja 首页未被 en 美国化污染**（grep "美國 \$99\|米国 \$99" = 0）✅？

**8 问全过才 push。任一项不过立即修，不推。**

## 13.16.1 zh-hk 繁体字最高原则（2026-07-14 user 拍板）

### 最高原则
**zh-hk 输出 = 100% 繁体中文，零简体字泄漏。**

### 铁律
- ❌ **禁止**: 简体字出现在任何 zh-hk 输出（title_zh / H1 / Meta / Product page / Hero / Breadcrumb）
- ✅ **必须**: 所有 zh-hk 输出必须经过 `traditionalizeZh()` 转换
- ✅ **必须**: 所有源文件必须无简体字残留（`node scripts/scan-simplified.mjs` 通过）

### 验收标准
1. `node scripts/scan-simplified.mjs` — 退出码 0（无简体字残留）
2. `node scripts/test-traditionalize.mjs` — 10/10 测试通过
3. `curl https://zprintpro.com/zh-hk/` — grep 简体字 = 0
4. 所有产品页 H1 = 繁体（live verify）

### 违规后果
- 简体字泄漏 = 严重 SEO 降权（Google 判定为低质量内容）
- 简体字泄漏 = 用户信任度下降（香港用户视"简体"为内地概念）
- 简体字泄漏 = AGENTS.md 最高原则违约（P0 级修复）

### 自动化防御
- `scripts/scan-simplified.mjs` — 每次运行，报简体字位置
- `src/lib/h1-builder.ts` — 强制调用 `traditionalizeZh()` 转换
- `src/data/products.ts` — 所有 title_zh 必须繁体

### 修复流程
1. `node scripts/scan-simplified.mjs` 定位问题
2. 修复源文件（products.ts / h1-builder.ts / category-config.ts）
3. `node scripts/test-traditionalize.mjs` 验证
4. `npm run build` 本地通过
5. Commit + Push + Verify deploy
6. Live curl 验证繁体输出

## 13.17 PM × UX × SEO 3-perspective 复盘模板（任何 en 美国优化前必跑）

> 2026-07-09 en 美国优化 v5/v6 用过的复盘模板，已写入 `docs/competitor-analysis/en-us-market-optimization-pm-ux-seo-2026-07-09.md`。

### 模板（每次 en 美国类目/产品/Hero 改动前 30 分钟跑）

```markdown
## 一、美国市场头部竞品 sharp hook 调研（≥5 个头部）
| Sharp hook | 代表竞品 | 覆盖率 |
|---|---|---|
| Free Shipping | Sticker Mule / CustomStickers.com / Packlane / VividPrintingHub | ___% |
| Free Design / Free Mockup | Packlane / VividPrintingHub / CustomStickers.com | ___% |
| Made in USA / America | RogueStickers / EverPrint / USCustomStickers | ___% |
| No Minimum / Low MOQ | CustomStickers.com / Packlane | ___% |
| Fast Turnaround | samedaycalendars.com / FlyersASAP | ___% |

## 二、我们 en 站点 4 大缺口诊断
| Sharp hook | 美国头部 | 我们 en 现状 | 问题 |
|---|---|---|---|

## 三、本轮改动
| # | 文件 | 改动 | 影响 |

## 四、verify 结果
| 检查 | 结果 |
|---|---|

## 五、踩坑避免
- ✅ §13.10 NAP 脱钩
- ✅ §11 名片禁区
- ✅ §13.14 15+ 年口径

## 六、保留的差异化优势
- ✅ 30-second AI quote (全行业唯一)
- ✅ ISO 9001 / FSC 认证
```

**应用范围**：每次 en 美国类目/产品/Hero/H1/description 改动前必跑 30 分钟模板 → commit message 引用模板结论。

## §0.26 ⛔ 文件系统访问限制 (2026-08-28 04:53 K3 拍板 · 最高优先级, 跨项目 P0)

> **核心**: Mavis (M3) 只能在根目录文件夹 (F:\zprintpro-nextjs) 读取文件. 跨项目到根目录外读取文件, **必须遵守以下规则**. 违反 = 撞墙升级 (§0.22 第 2 款), K3 必拍 1 次回复决策.
>
> **拍板来源**: K3 8/28 04:53 当前 turn 拍板 "你只能在你的根目录文件夹中读取文件, 如果要跨项目到根目录外读取文件, 需要遵守这条规则" + K3 8/28 05:09 当前 turn 拍板 "继续" = K3 必再拍 1 次回复决策 working tree 63 文件 (K3 8/28 03:56 撞墙升级).

### §0.26.1 盘符访问矩阵 (K3 8/28 04:53 拍板, 跨项目 P0)

| 盘符 / 路径 | 访问权限 | M3 必读规则 | 违反后果 |
|------------|----------|------------|----------|
| **C 盘目录** (`C:\*`) | ✅ **可以读取** | 无需 K3 同意, 自由读取 (含 `C:\Users\Administrator\.minimax\`, `C:\Users\Administrator\.hermes\`, `C:\Users\Administrator\AppData\`, 等) | 无 |
| **F 盘 (根目录)** (`F:\zprintpro-nextjs\`) | ✅ **默认可读** (M3 workspace) | M3 当前 workspace, 自由读取/写入 | 无 |
| **F 盘 (4 个敏感目录) 绝对不能读取** ❌ | ❌ **绝对不能读取** | (1) `F:/QQ存储文件夹` (2) `F:/抖音小店资料` (3) `F:/微信存储文件夹` (4) `F:/xwechat_files` | 🔴 **撞墙升级, K3 必拍 1 次回复决策** |
| **F 盘 (其他目录)** | ⚠️ **可读, 写入需 K3 同意** | M3 workspace 外的 F 盘目录 (e.g. `F:/zprintpro-archive/`, `F:/hermes-other/`, 等) | 写入需 K3 拍板 |
| **D 盘 (`D:\*`)** | ❌ **不能读取** | D 盘任何路径, M3 不能读取 (K3 8/28 04:53 拍板) | 🔴 **撞墙升级, K3 必拍 1 次回复决策** |
| **E 盘 (`E:\*`)** | ❌ **不能读取** | E 盘任何路径, M3 不能读取 (K3 8/28 04:53 拍板) | 🔴 **撞墙升级, K3 必拍 1 次回复决策** |
| **G 盘 (`G:\*`)** | ⚠️ **需要经得 K3 同意** | G 盘任何路径, M3 必先报告 K3 拍板 1 次回复, K3 拍板"OK 读"后 M3 才能读取 | 🔴 **撞墙升级, K3 必拍 1 次回复决策** |
| **H 盘 (`H:\*`)** | ❌ **绝对不能读取, 也不能碰盘符** | H 盘任何路径, M3 不能读取, 不能 ls / 不能 Read / 不能 cat / 不能 grep | 🔴 **撞墙升级, K3 必拍 1 次回复决策** |

### §0.26.2 跨项目读取 SOP (K3 8/28 04:53 拍板, 强制级)

**核心 3 步** (任何跨项目读取必跑):
1. **检查根目录**: 目标路径是否在 M3 workspace (`F:\zprintpro-nextjs\`) 内?
   - ✅ 是 → 自由读取, 无需 K3 同意
   - ❌ 否 → 跳到第 2 步
2. **检查盘符**: 目标盘符 (C/D/E/F/G/H) 是什么?
   - ✅ C 盘 → 自由读取, 无需 K3 同意
   - ✅ F 盘 (4 个敏感目录) → ❌ 绝对不能读取, 撞墙升级
   - ❌ D 盘 → 不能读取, 撞墙升级
   - ❌ E 盘 → 不能读取, 撞墙升级
   - ⚠️ G 盘 → M3 必先报告 K3 拍板 1 次回复, K3 拍板"OK 读"后 M3 才能读取
   - ❌ H 盘 → 绝对不能读取, 也不能碰盘符 (不能 ls, 不能 Read, 不能 cat, 不能 grep)
3. **报告 + 拍板**: 跨项目读取 C 盘外的任何文件前, M3 必:
   - 在 turn 报告: "目标路径: `<path>`, 盘符: `<C/D/E/F/G/H>`, 用途: `<reason>`, 拍板请求: K3 必拍 1 次回复决策"
   - K3 拍板 "OK 读" 后, M3 才能 Read / Bash / Grep
   - K3 没拍板前, M3 不能动这个文件

### §0.26.3 反例 (M3 必避, K3 8/28 04:53 拍板红线)

- ❌ 自主读取 F 盘 4 个敏感目录 (QQ / 抖音 / 微信 / xwechat_files) — 撞墙升级, K3 必拍 1 次回复决策
- ❌ 自主读取 D 盘 / E 盘 — 撞墙升级, K3 必拍 1 次回复决策
- ❌ 自主读取 H 盘 (含 ls / Read / cat / grep) — 撞墙升级, K3 必拍 1 次回复决策
- ❌ 自主读取 G 盘 (未先报告 K3 拍板) — 撞墙升级, K3 必拍 1 次回复决策
- ❌ 碰盘符 (C/D/E/F/G/H 任何盘符) — 撞墙升级, K3 必拍 1 次回复决策
- ❌ "继续" 解读为 "自主读取" — K3 "继续" 是 M3 继续之前 turn 未完成的工作, 不含自主读取新路径
- ❌ 碰 .hermes/ 根目录的 hermes 配置 (`C:\Users\Administrator\.hermes\`) — C 盘可读, 但写入需 K3 拍板
- ❌ 碰 F:\zprintpro-nextjs 根目录外的 F 盘项目 (e.g. `F:/CloudDreamerApp/`, `F:/hermes/`, 等) — 需 K3 拍板 1 次回复

### §0.26.4 应用范围

- ✅ 任何 M3 跨项目读取文件前, 必跑 §0.26.2 三步 SOP
- ✅ 任何 M3 跨项目写入文件前, 必跑 §0.26.2 三步 SOP + K3 拍板"OK 写"
- ✅ 任何 M3 报告 K3 时, 必含"目标路径 + 盘符 + 用途"三要素
- ✅ 任何 M3 拍板请求, 必含"撞墙升级 + K3 必拍 1 次回复决策"明确标识
- ❌ M3 不能以任何理由 (urgent / security / business) 跳过 §0.26.2 三步 SOP, 必撞墙升级, K3 必拍 1 次回复决策

### §0.26.5 §0.22 SOP-10 第 5 问强制级

- 1. 架构差异: §0.26 是 Mavis 跨项目文件访问架构, §0.22 SOP-10 5 问是 M3 任务执行架构, 两者并列运行
- 2. 约束适用范围: F0 红线 (不删 SKU/文案/长文本字段) + §0.26 红线 (F 盘 4 敏感目录 / D/E/H 盘不读) 双约束
- 3. 原数据/拍板来源: K3 8/28 04:53 当前 turn 拍板 = 1 次回复 (filesystem 访问规则)
- 4. 字段值策略: §0.26 字段值就是"路径 + 盘符 + 用途"三要素, M3 必含
- 5. Markdown 渲染: §0.26 表格 + 列表, 含 markdown 链接, 必跑 §0.22 第 5 款 parseInlineLinks

### §0.26.6 跨项目 P0 通用性

- 适用范围: 任何 Mavis 任务 (zprintpro / togthr / aitoptools / stock-lab / 其他项目)
- 必读: M3 workspace 永远默认, 跨项目需拍板
- 必含: 路径 + 盘符 + 用途 + K3 必拍 1 次回复决策明确标识
- 违反: 撞墙升级, K3 必拍 1 次回复决策 (per §0.22 第 2 款)

### §0.26.7 教训固化源头

- 拍板来源: K3 8/28 04:53 当前 turn "你只能在你的根目录文件夹中读取文件" + K3 8/28 05:09 当前 turn "继续" = K3 必再拍 1 次回复决策 working tree 63 文件
- AGENTS.md 写入: 2026-08-28 05:09 当前 turn (M3 自决撞墙豁免, 立即写入 §0.26)
- 后续: K3 必再拍 1 次回复决策 ① K3 8/28 03:56 撞墙升级 "working tree 63 文件" ② 顺手优化 page.tsx extractFaqFromHtml regex 全角冒号

## §0.27 图片替换铁律 + push 解锁条件 (2026-08-28 07:00 K3 拍板, 跨项目 P0 · 撞车豁免 1 次回复)

> **核心定位** (K3 8/28 06:19 拍板 Week 0 必做 ②): 把图片替换铁律 + working tree push 解锁条件写进 AGENTS.md 当**机器红线**, M3 自主判断 "能不能推", K3 不再被问 "能不能推图片 / 能不能推 working tree 改动" 反复问题 (per K3 8/28 06:19 流程根治建议)

### §0.27.1 适用范围

- zprintpro-nextjs 项目 (F:\\zprintpro-nextjs\\) 任何 src/ 含图片引用改动 / working tree 改动 / push 决策
- 跨项目 P0 通用性: 任何 Mavis 任务的图片替换 / push 决策 (togthr / aitoptools / stock-lab / 其他项目)

### §0.27.2 图片替换铁律 (5 条红线, 必跑必含)

1. **新图入 public/images/v26/**, 文件名语义化 (e.g. `large-envelope-mockup.webp`), **禁止**引用 `zprintpro-en-us-images/` 和 `v25_*` 任何路径
2. **格式 webp + 响应式 srcset** (480/800/1200w) + `loading="lazy"` + **必填 alt** (含关键词, 命中 GSC 强信号)
3. **禁引 `zprintpro-en-us-images/` 与 `v25_*`** 任何路径, push 前 grep 断链预检, **0 旧路径残留**才准推
4. **逐图 K3 过目**: 每张图上线前 M3 截图发 K3 肉眼过 (or K3 主动看 diff), 确认通过才允许 push
5. **autoclaw v26.0 生图全完成** (per K3 8/28 06:15 撞墙升级加强 "生图还没有完成"): 不允许用 `v25_9_pro_final/` 旧图, 不允许 partial 替换

### §0.27.3 working tree 冻结 + push 解锁条件 (4 件齐)

working tree 9M + 18D = 27 文件 (含 src/components/services/Rush 8 组件 + zprintpro-en-us-images/v25_9_pro_final/ 18 D) 全部冻结, 解锁条件 4 件齐:

- [ ] **条件 1** #2 图片铁律给出 ✅ (K3 8/28 06:19 拍板, 写进 §0.27.2)
- [ ] **条件 2** autoclaw v26.0 生图全完成 (M3 自动判断: `ls zprintpro-en-us-images/v26_0_pro_raw/ | wc -l` ≥ 87 SKU × 4 张 = 348 files)
- [ ] **条件 3** ARK key 撤销重发 (K3 必亲自动手, 火山引擎控制台撤泄露的 `ark-cd021d85-***-3434` + 重发新 key + 5 个 `_batch*.py` 改 env var)
- [ ] **条件 4** push 排除 `zprintpro-en-us-images/` 整目录 (per .gitignore, 永久排除, 506.41 MB 不进 git)

### §0.27.4 push 决策 SOP (M3 自主判断, K3 不再来问)

**M3 自主判断 SOP** (任何 src/ 含图片引用改动 / working tree 改动 push 前必跑):

1. **条件 1-4 全满足?** → M3 自主按 B 方案攒批 push, **不再问 K3 "能不能推"**
2. **任一条件不满足?** → M3 自动冻结, 报告 K3 缺哪个条件, 不 push
3. **push 前 3 闸门** (per K3 8/28 06:19 拍板 "重跑三闸门"):
   - `node scripts/check-encoding.js --fix` (UTF-8 + LF 校验)
   - `npx tsc --noEmit` (类型校验, 如有 TS 改动)
   - `npm run build` (本地 build, Windows fonts 网络可能 timeout, 以 CF Pages 状态为准)
4. **push 后 5 步真验收** (per §0.16 + §0.7 production smoke):
   - `git status -sb` (push 无 ahead)
   - `node scripts/verify-deploy.mjs` (CF Pages check-runs API status success)
   - 5 关键 URL curl 200 + body 含关键内容
   - schema JSON-LD valid (parse 成功)
   - IndexNow 提交 (Bing / Yandex API)

### §0.27.5 §0.22 SOP-10 第 2/5 款强制级

- 1. 架构差异: §0.27 是 Mavis push 决策架构 (机器红线, M3 自主判断), §0.22 SOP-10 5 问是 M3 任务执行架构 (人机协同), 两者互补
- 2. 约束适用范围: F0 红线 (不删 SKU/文案/长文本字段) + §0.27 红线 (图片铁律 + push 解锁条件) 双约束, M3 自主判断优先级高于 K3 拍板
- 3. 原数据/拍板来源: K3 8/28 06:19 PM 视角拍板建议 (6 项 + 2 件 Week 0 必做) = K3 必再拍 1 次回复决策 (撞车豁免成立)
- 4. 字段值策略: §0.27 字段值 = "路径 + 格式 + 必填项 + grep 命令" 四要素, M3 必含
- 5. Markdown 渲染: §0.27 表格 + 列表 + checkbox 状态, 含 markdown 链接, 必跑 §0.22 第 5 款 `parseInlineLinks()`

### §0.27.6 跨项目 P0 通用性

- 适用范围: 任何 Mavis 任务 (zprintpro / togthr / aitoptools / stock-lab / 其他项目) 的图片替换 / push 决策
- 必读: M3 必跑 §0.27.4 push 决策 SOP, 不再来问 K3 "能不能推"
- 必含: 路径 + 格式 + grep 命令 + K3 必拍 1 次回复决策明确标识
- 违反: 撞墙升级, K3 必拍 1 次回复决策 (per §0.22 第 2 款)

### §0.27.7 教训固化源头

- 拍板来源: K3 8/28 06:19 PM 视角拍板建议 #1 (working tree 冻结) + #2 (图片铁律) + Week 0 必做 ② (写进 AGENTS.md 当红线) = 6 项 + 2 件 Week 0 必做
- AGENTS.md 写入: 2026-08-28 07:00 当前 turn (M3 自决撞车豁免, 立即写入 §0.27, 1 commit 1 push, 类比 §0.26 流程)
- 流程根治: K3 8/28 06:19 "把 #1 解锁条件、#2 的图片铁律写成 AGENTS.md 里的可机器判断的红线 (M3 自己 grep 旧路径、自己检查生图完成标志、自己验证 key 是否换掉), 满足就自动走 B 方案, 不满足就自动冻结——把 '人来拍板' 变成 '规则来拍板'"
- 后续: M3 自主判断 push, K3 不再被问 "能不能推图片 / 能不能推 working tree 改动" 反复问题 (per K3 8/28 06:15 痛骂 "这么简单的事情问了几次了")

## §0.20 4 条教训固化 (2026-08-10 K3 拍板, 跨项目 P0 · Batch A 8/11 写入)

### §0.20.1 layout.tsx + seo.ts 静态 metadata 是 §0.15 升级盲区

**教训**: 任何品牌/schema 改动必须同时检查 `layout.tsx` metadata + `generateMetadata` 静态段, grep `siteConfig.name` + `hardcoded 'ZprintPro'` 全树清零才算完。

**事故背书 (2026-08-10)**: cefe895 commit 第三次 push 就是补这个漏。c48181b 改了 49 files 514 处 智印雲 → 智印港 (文本层 PASS) 后, curl 5 关键页面验证发现 `src/app/[locale]/layout.tsx` L43 hardcoded `siteName: 'ZprintPro'` 导致 3 locale 全 og:site_name = ZprintPro (结构层漏); cefe895 改造 layout.tsx 静态 metadata → `generateMetadata` + `getLocaleBrand()` helper; 055d87e 改 src/lib/seo.ts 9 处 hardcoded ternary + 加 `getBrandName()` helper (schema 层漏)。

**应用范围**: 任何"主品牌 + locale 分层 + NAP 法律名"并存架构; 任何 cron auto / 手动 / 紧急 push 改 src/lib/seo.ts / src/app/[locale]/layout.tsx。

**判断 SOP** (任何品牌/schema 改造 commit 实施前自查):
1. grep `siteConfig.name` 全 src/ 树
2. grep `hardcoded 'ZprintPro'` 全 src/ 树
3. grep ternary 模式
4. 检查 layout.tsx 静态 metadata vs generateMetadata
5. 5/5 全部清零才报 PASS

### §0.20.2 retrofit 必 3 件齐: blog-data JSON + blog-posts meta + sitemap/验证 JSON

**教训**: 任何 retrofit 必 3 件齐, 缺一即 PARTIAL 不报 PASS。

**事故背书**: 8/9 baby-product retrofit 0d46a4c 3 件齐 → v8_ready 100% + 5 步转化验证 verified; 8/10 cmyk-guide retrofit 8664488 同样 3 件齐 → v8_ready 100% + 5 块元素全 True 3 locale。

**应用范围**: 任何 retrofit / 数据迁移 / schema 迁移; 任何 cron auto / 手动 / 紧急 push 改 src/data/blog-data/ + src/data/blog-posts.ts。

**判断 SOP** (任何 retrofit commit 实施前自查):
1. 改造前 grep 4 源: blog-data JSON + blog-posts meta + sitemap + 验证 JSON
2. 改造中保证 3 件同时改
3. 改造后跑 5 步转化验证 (CTA href + quote form + GA4 + wa.me + 失败标记)
4. sitemap mtime 验证 (build 后 lastmod 更新)
5. 3 件全 PASS 才报 PASS, 缺一报 PARTIAL

### §0.20.3 GitHub Push Protection 止损路径 (commit 前必查 + 触发后立即 reset)

**教训**: commit 前必 `git status --porcelain` 看清 A/M/D; 触发 secret 扫描立即 `git reset --mixed HEAD~1` 重做, **不 amend**; `.hermes/` 含 token 的历史报告永不入 commit。

**事故背书 (2026-08-10)**: c04dbe9 commit 误含 208 files (200+ .hermes/ 临时文件), 其中 `.hermes/reports/m3-p0-token-verify-fail-2026-07-29.md` 包含完整 Cloudflare User API Token, 触发 GH013 push protection。修法: `git reset --mixed HEAD~1` + 重 add 4 files only + 重 commit 8664488 + 重 push = 1 effective push。

**应用范围**: 任何 CF Pages 项目; 任何 commit 含 .hermes/ 临时文件 + 报告; 任何 token / secret 在 .hermes/ 历史报告。

**判断 SOP** (任何 commit 实施前自查):
1. 跑 `git status --porcelain` 看 A/M/D 全状态
2. A 状态文件 > 50 个 → 立即怀疑临时文件未 unstage
3. 跑 `git diff --cached --stat` 看清 staged 内容
4. 触发 GH013 → 立即 `git reset --mixed HEAD~1` + 重 add 目标 files + 重 commit
5. 永远不 amend 触发 GH013 的 commit

### §0.20.4 amend 月上限 2 次 (8/8 + 8/10 已用) - 后续走 revert + 重做

**教训**: amend 止损月上限 2 次, 超 2 次必走 revert + 重做路径。

**事故背书 (2026-08-10)**: 8/8 117f9fc force-with-lease amend 替代 4703262 失败 commit (TS duplicate property 错误); 8/10 8664488 fresh commit (不用 amend) 替代 c04dbe9 失败 commit (GH013 触发)。

**应用范围**: 任何 CF Pages 项目; 任何 amend force-with-lease / rebase push; 任何需快速修正的失败 commit 场景。

**判断 SOP** (任何 amend 需求自查):
1. 问"本月已用 amend 几次? 还剩几次?"
2. 月上限 2 次用满 → 走 revert + 重做
3. amend 节省 1 build 但 force-push 也算 1 push 配额
4. 真的紧急才用 amend, 普通失败走 fresh commit 重做

### §0.20.5 GSC warning validFrom 字段修复 SOP (2026-08-11 db2cb5f 教训, K3 8/12 复盘拍板)

**教训**: PDP 顶层 Product schema (src/lib/seo.ts) 跟 ItemList 内嵌 Product (src/lib/schema-extensions.ts) 必须保持字段一致; 任何 schema 字段修复必 grep 全部 3 处 (seo.ts + schema-extensions.ts + page.tsx PDP 段) 才报完成。

**事故背书 (2026-08-11)**: 8/8 117f9fc GMC 修复只改 src/lib/seo.ts 加 priceValidUntil + sku, 漏了 validFrom。8/11 K3 10:41 GSC warning 才发现 schema-extensions.ts 已有 validFrom 但 seo.ts 漏 → 8/11 db2cb5f 补救: seo.ts L1093 加 validFrom 字段。影响 5 PDP: roll-up-banners / a5-flyers / catalog-printing / a4-flyers / wall-calendars。

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目 Product schema / Offer schema / AggregateRating schema; 任何 GSC 警告 / GMC 警告 / Rich Results Test 报错修复。

**判断 SOP** (任何 schema 字段修复 commit 实施前自查):
1. `grep -n "validFrom\|priceValidUntil\|sku\|availability" src/lib/seo.ts src/lib/schema-extensions.ts src/app/[locale]/product/[slug]/page.tsx`
2. 列出现有字段 vs 目标字段, 找出缺失
3. 3 处同时改, 不允许只改 1 处
4. 5 步真验证: 5 关键页面 curl + 5 PDP schema 全字段验证
5. PDP Product offers 段必含 6 字段: price / priceCurrency / validFrom / priceValidUntil / sku / availability

### §0.20.6 SEO 类目名 + nav 顺序按 GSC imps 优化 SOP (2026-08-11 db2cb5f 教训, K3 8/12 复盘拍板)

**教训**: 任何 SEO 类目名 / h2 / 落地页标题 / 导航顺序优化必先 grep GSC 28 天 imps 排序; zh-hk 必须纯繁体 (K3 10:41 拍板), 簡→繁"制→製"必改; 0 订单类目调 nav 最后。

**事故背书 (2026-08-11)**: 8/11 db2cb5f 8 改字 (4 files +11/-9), 全部按 GSC 28 天 imps 加权优化: 月曆 14+訂做月曆 9+月曆訂製 6 = 52 imps 排序第 2 (vs 年曆 0) → 月曆印刷; 傳單 17 imps → 傳單印刷; 包裝盒定制(簡体)→包裝盒印刷(繁); 海報定制(簡体)→海報印刷(繁); paper-bags 0 订单 → 调 nav 最后; 5 PDP validFrom 字段补全。

**GSC 28 天 zh-hk imps 排序基准 (8/11 10:33 截图)**: 包装 68 / 月曆 52 / poster 46 / bag 35 / sticker 33 / 書籍 30 / catalog 26 / book 24 / 傳單 19 / flyer 11 / 海報 1。

**zh-hk 纯繁体红线 (K3 10:41 拍板)**: 制→製 / 后→後 / 实→實 / 对→對 / 发→發 / 开→開 / 内→內 / 种→種; 类目名禁夹英文 (海報定制→海報印刷, 不用 poster)。

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目类目名 / h2 / 标题 / nav 顺序优化; 任何 zh-hk / en / ja locale 内容本地化; 任何 GSC 数据驱动的 SEO 决策。

**判断 SOP** (任何 SEO 优化 commit 实施前自查):
1. 拉 GSC 28 天 imps (zh-hk / en / ja 各一份, 按类目聚合)
2. 排序优化: 类目名 / h2 / 落地页标题 选 GSC 高 imps 词
3. 繁体守门 (zh-hk): `grep -n "制\|后\|实\|对\|发\|开\|内\|种" src/data/products.ts src/components/layout/Header.tsx src/data/category-seo-content.ts` 全清
4. nav 顺序按业务权重 + GSC imps: 0 订单类目调最后
5. 3 处同步修: products.ts (类目名字段) + Header.tsx (nav + 类目 label) + category-seo-content.ts (h2)

### §0.20.7 Seasonal SKU AI 出图失败教训 (2026-08-11 16:00 K3 拍板, K3 8/12 复盘拍板固化)

**教训**: 印刷产品图不能用 AI 渲染图替代设计稿; image_synthesize 给的是"AI 渲染的 stock photo", 不是"为品牌设计的视觉作品"; 任何"AI 出图 → 直接上线"路线必须 K3 视觉确认后 push。

**事故背书 (2026-08-11)**: K3 凌晨战略调度后 8/11 13:00-15:00 M3 用 image_synthesize 跑 32 张种子图 (红包 3 + 台历 6 + 挂历 6 + 失败 17), K3 8/11 16:00 看图后拍板: "这些图都不能用于印刷, 也没有一个特别的设计"。**根本错误**: 印刷产品需要 CMYK + 出血 + 工艺标注层 + 品牌识别, AI 渲染图无结构化设计层, 即便 300DPI 元数据也不构成印刷就绪。

**正确路线 (K3 8/12 03:41 拍板 F1+F4 组合)**:
- 短期 8/12-8/20: F4 纯代码生成兜底 (SVG 骨架 + 工艺标注层)
- 中期 8/20+: F1 设计师外包 (¥2,000-3,000, 8 SKU, 8/13 寻源 8/20 交付印刷文件)
- image_synthesize 仅用于"概念图 / 营销图 / 社交图", **不用于 PDP hero**

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目印刷产品图 / 包装设计 / 工艺图; 任何"AI 出图 → 直接上线 PDP"提案; 任何设计师外包 vs AI 出图选型。

**判断 SOP** (任何 AI 出图 / 设计师外包选型决策):
1. 评估产物: 印刷级 AI/CMYK + 出血 + 工艺层 = 设计师外包, AI 出图做不到
2. 评估时间: 7+ 天可等 = 外包, 1-2 天 = 代码生成兜底
3. 评估预算: ¥2,000+ = 外包, ¥0 = 代码生成
4. AI 出图仅用作: K3 审核参考 / 概念 demo / 营销图
5. K3 视觉确认前不部署到 PDP

---

### §0.16 SEO/GEO 拍板固化 3 阶段 (2026-08-05/13/15 K3 拍板, 跨项目 P0 · Batch A 8/16 写入)

**核心**: SEO/GEO 拍板必须分 3 阶段固化, 不一次性写完 (避免 840 处残留排 "9 月初" 战略误判, K3 8/8 07:12 纠偏).

**3 阶段节奏 (K3 8/8 07:12 + 8/13 + 8/15 拍板)**:
- **Batch 1 (8/13)**: longDescription 前 200 处高流量 PDP 优先 (zh-hk 3 月 13759 imps 命中 SKU), 1 push
- **Batch 2 (8/15)**: description + faq 300 处中流量 SKU + 跨 8 locale, 1 push
- **Batch 3 (8/15)**: schema 剩余 340 处 JSON-LD Organization / Product / FAQPage 全 schema, 1 push
- **验收 (8/18)**: 全量 grep = 0 (除 k3-inbox 历史引用), src/ + public/ + AGENTS.md + 4 SSoT 报告允许

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目品牌 / 术语残留清理; 任何 "量大怕出错" 不能作为残留拖延理由.

**判断 SOP** (任何残留清理 commit 实施前自查):
1. 跑 `grep -r "旧 brand/术语" src/ public/ AGENTS.md` 算残留数
2. 残留 ≥ 100 处 → 按 ~170/天 3 天清完, 不分散到下月
3. 每批 commit 后跑 8 locale curl 验证 + grep 复检
4. 3 批全完成 = 前端 0 残留, 写入复盘硬指标

**反例 (zprintpro 8/8 05:00 教训, K3 8/8 07:12 纠偏)**:
- ❌ 840 处智印雲 残留排 "9 月初" = 战略误判
- ❌ "量大怕出错" 不能作为残留拖延理由
- ❌ 残留每多 1 天, branded search + 实体一致性 + AI 引用 多受损 1 天

**实施硬约束**: 残留清理必走 Python 脚本 (regex + line-based 找块), 不走 Edit/Write (per MEMORY "Edit/Write 大段 JSON 内容" §7); 每批 commit 前必跑 pre-commit 3 步 (encoding / 简体字 / i18n); 8/18 全量 grep 验收 = 0 是 8/21 复盘硬指标.

---

### §0.17 push 台账一口径 (2026-08-08 15:35 K3 拍板, 跨项目 P0 · Batch A 8/16 写入)

**核心**: 日/月配额以 "git push 次数" 计 (含 force-push), 每份报告必报同一数字; amend 止损月上限 2 次; push 前必跑 npm run build.

**计数口径 (单一台账)**:
- **日配额**: git push 次数 (含 force-with-lease amend push), 1 天 ≤ 5 push
- **月配额**: CF 账户级 500 build/月, 3 项目共享, zprintpro 单项目 ~150/月
- **amend push 也算 1 次**: force-with-lease 替代失败 commit, 节省 1 build 不节省 push 配额
- **cron auto 不算手动 push**: daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00
- **重要内容豁免 (K3 8/16 16:51 拍板)**: 关于我们 / 联系 / 服务时间 / FAQ 等 "重要内容" 不受 1 天 ≤ 5 限制, 但月配额仍生效

**报告必含数字** (每份部署报告 / 升级 K3 / 自我升级):
```
今日 push: X/5 (含 amend force-push, 重要内容豁免)
月累计: Y/150 (CF 账户 500 内 3 项目共享)
buffer: 5-X (留紧急)
```

**amend 止损月上限 2 次**:
- 1 amend 1 build 节省 CF build 配额 (vs 2 commit 2 build)
- 但 amend force-push 也算 1 push, 节省 build 不节省 push
- 月上限 2 次 = 防止过度 amend 污染 git history
- 超 2 次 → revert + 重做 (干净 history)

**push 前必跑 npm run build** (4703262 教训固化):
- pre-commit hook 只查 encoding (UTF-16/CRLF) + 简体字守门
- **不查 TypeScript type error** (per zprintpro 8/8 4703262 失败)
- §0.7 production smoke 4 步 = encoding + 简体字 + tsc + **npm run build**
- TS 错误只该花在本地, 不该花在 CF 配额上 (4703262 浪费 1 CF build)

**反例 (zprintpro 8/8 15:00 教训)**:
- ❌ 4703262 push 前**没跑 npm run build**, TS duplicate property 报 错, CF build 失败
- ❌ 浪费 1 CF build (1/150 → 2/150), 浪费 18 min 监控 (cron + verify)
- ❌ amend 117f9fc 修, 实际 net 2 push (1 PASS + 1 FAIL 替代) 但 CF build 数 2 次
- 改进: 117f9fc push 前**跑了 npm run build PASS**, 1 次 build success

**应用范围**: 任何 zprintpro / aitoptools / togthr CF Pages 项目; 任何 cron auto / 手动 / 紧急 push; 任何 amend / force-with-lease / rebase push; 任何跨项目 deploy (3 项目共享 CF 账户).

**实施硬约束**: 任何 commit push 前必跑 `npm run build` 验证 (4-5 min, 节省 CF build 18 min); 任何 amend force-push 必报 +1 push 配额 + 1 CF build 配额; 任何报告必含 push 计数; 月 amend 超 2 次 = revert + 重做.

**待确认 (K3 8/8 15:35 拍板)**: force-push 是否消耗 CF build 配额 → K3 8/9 查 CF Dashboard 实际确认.

---

### §0.18.1 重定向上线 SOP (2026-08-08 15:35 K3 拍板, 跨项目 P0 · Batch A 8/16 写入)

**核心**: 任何 301/410 重定向规则上线前 curl 验证目标 200; 禁止兜底规则覆盖多 locale 活路径; 禁止自指向规则.

**上线前 4 步 SOP** (per K3 8/8 15:35 拍板):
1. **curl 验证目标 200**: `curl -I https://zprintpro.com/<target>/` 必须返回 200, 任何 404/301/302 = 规则失败
2. **禁止兜底规则覆盖多 locale 活路径**:
   - ❌ `/blog/* → /zh-hk/` 覆盖 /en/blog/* + /ja/blog/* 活路径
   - ✅ `/blog/* (无前缀) → /zh-hk/blog/$1` 仅无前缀路径, 保留语言路径
3. **禁止自指向规则**:
   - ❌ `kraft-paper-bags → kraft-paper-bags` (占位符 URL 实际指向正确 SKU, 不需 301)
   - ✅ 删自指向规则, 或 curl 验证目标真的不同
4. **m3u8 用 410 正确**:
   - ❌ `/upload/*.m3u8 → 410` 实际 CF Edge Rule 不是 Bulk Redirects
   - ✅ 用 CF Edge Rule (Ruleset) → 410 Gone, 不是 301

**CF Bulk Redirect List 草稿 (修正版, per K3 8/8 15:35 拍板)**:
```
# 双 locale 前缀 (per §Next.js as-needed 陷阱)
*/en/en/*                          → /en$1                    301
*/ja/ja/*                          → /ja$1                    301
*/zh-hk/zh-hk/*                    → /zh-hk$1                 301

# 类目错位
/zh-hk/product/packaging/          → /zh-hk/category/packaging/  301

# www 域 (裸域跳转, 5 分钟事)
www.zprintpro.com/個から            → zprintpro.com/            301
www.zprintpro.com/個起              → zprintpro.com/            301
www.zprintpro.com/枚から            → zprintpro.com/            301

# ❌ 删除 2 条问题规则:
# /blog/* → /zh-hk/                  (覆盖 /en/blog/* /ja/blog/* 活路径)
# /product/* → /zh-hk/               (覆盖 /en/product/* /ja/product/* 活路径)
# /services/* → /zh-hk/services/...  (覆盖 /en/services/* /ja/services/* 活路径)
# /license/ → /zh-hk/                 (low priority, 无流量)
# /ja/guide/ → /zh-hk/                (low priority)
# kraft-paper-bags → 自己             (自指向, 占位符 URL 实际指向正确 SKU)

# CF Edge Rules (Ruleset) → 410 Gone (永久删除)
/upload/*.m3u8                      → 410 Gone
```

**判断 SOP** (任何重定向规则 commit 实施前自查):
1. 目标 URL 是不是活路径? 跑 `curl -I <target>` 验证 200
2. 规则是否覆盖多 locale? 跑 `curl -I /<other-locale>/<path>` 验证 200 (无规则命中)
3. 规则是否自指向? source 和 target 不一致
4. m3u8 等永久删除用 CF Edge Rule (410), 不是 Bulk Redirects (301)

**应用范围**: 任何 zprintpro / aitoptools / togthr CF Pages 项目; 任何 CF Bulk Redirects 操作; 任何 301/302/410 重定向规则.

**实施硬约束**: 上线前 4 步 SOP 必跑 (curl 200 + 禁止覆盖 + 禁止自指向 + m3u8 用 410); 报告必含 "每条 curl 验证目标 200" 证据; 兜底规则禁止 (任何 `/path/*` 规则必须明确非多 locale 活路径).

**教训源头**: zprintpro 8/8 15:00 草稿错误 (K3 8/8 15:35 纠偏).

---

### §0.20.8 工厂图 K3 拍板 SOP (2026-08-16 08:53 K3 拍板, Batch A 8/16 写入)

**核心**: 工厂图全链路处理走 5 步 SOP, 任何 PDP hero / 关于我们板块 / 工艺图必须按此流程.

**5 步 SOP (K3 8/16 08:53 拍板)**:
1. **命名规则** (K3 8/16 9:18 拍板): 中文 → 英文 SEO, 全小写 + 连字符, **不含 supplier origin 城市** (Shenzhen / 深圳) (per §13.10 NAP 脱钩)
2. **命名分类**:
   - `factory-*` (设备) - 印刷机 / 轮转机 / 后道设备
   - `showcase-*` (成品) - 包装盒 / 礼盒 / 成品出货
   - `craft-*` (工艺) - 手工 / 装订 / 烫金 / UV
3. **红变黑根因 + 修复** (V20.5 教训固化):
   - ❌ 灰度世界算法 (gray-world) → 红图变黑图
   - ✅ 温和白平衡 (白点检测 strength=0.10) + 强饱和 +1.25 + 对比度 +1.10 + 锐化 50%
4. **alt 3 locale**: zh-hk / en / ja 三语种 alt 文本, 含设备名 + 工艺 + 场景 (e.g. "印刷機實拍 - 海德堡 6+1 柯式印刷機運行中 · 22 figure 工序流")
5. **5 步真验证**: 命名唯一性 + alt 3 locale + curl /images/factory/*.webp 200 + 工厂图 / 关于我们 / 工艺 section 引用 + grep 残留 = 0

**事故背书 (2026-08-16 8/16 8:53-09:42)**:
- K3 8/16 08:53 派活: 工厂图片处理 4 块 (blog 图替换 / 9 张新图命名 + 调色 / craft 重处理 / 改名)
- K3 8/16 09:42 选 D 全部 PASS (commit 996c34a, 23 files, factory/ 25 webp jpg 0)
- 命名规则 K3 9:18 拍板, 红变黑根因 K3 9:18 拍板温和白平衡修法

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目印刷设备图 / 工艺图 / 工厂实拍; 任何 AI 出图 / 设计师交付 / 工厂拍摄图片处理.

**判断 SOP** (任何工厂图 commit 实施前自查):
1. 命名: 全小写 + 连字符 + 不含 supplier origin 城市
2. 分类: factory-* / showcase-* / craft-* 三类明确
3. 调色: 不用灰度世界算法, 用温和白平衡
4. alt: 3 locale 完整, 含设备名 + 工艺 + 场景
5. verify: 5 步真验证 PASS 才算完成

**实施硬约束**: 任何工厂图 push 必走 5 步 SOP, 不省任何一步; 任何"量大图多"不能省 alt 3 locale 守门; 任何 V20.5 灰度世界算法红变黑教训必避免.

---

### §0.20.9 22 figure 工序流 SOP (2026-08-16 11:22 K3 拍板, Batch A 8/16 写入)

**核心**: 关于我们板块工厂图必须按 22 figure 6 stage 工序流结构组织, 任何升级 / 重构按此结构.

**6 stage 工序流 (K3 8/16 11:22 拍板 + 千问 15:48 thinking + K3 workspace 16:00 commit 717825f)**:
- **Stage 0 Banner**: factory-banner.webp (full-width hero, brightness-105)
- **Stage 01 色彩管理**: color-chart + colorStory text card
- **Stage 02 柯式印刷**: speedmaster-with-boxes (2x2 STAR badge) + heidelberg-6plus1 + offset-press
- **Stage 03 數碼 + 標籤**: press-pano (wide) + label-press + hp-digital
- **Stage 04 後道裝訂 + 半成品**: gluing + craft-gluing + weigang-uv + folding-line + craft-triangle
- **Stage 05 節慶禮盒工藝**: red-tactile + red-tian-di + red-flip + red-conjoined-interior
- **Stage 06 成品 & 包裝出貨**: cabinet + palletized + black + vending + textbook

**Total**: 22 figure (含 color text card), 21 figure (不含 color text card)

**事故背书 (2026-08-16 11:22-16:07)**:
- K3 8/16 11:22 拍板: 印刷机实拍 + 调亮 + 轮转机 + 印刷机长图 + 半成品 + 后道 + 成品
- 千问 1cda9f9 (8/16 15:05) 嵌入工厂图 section (7 figure) - 中间过渡版
- 千问 647eb25 (8/16 15:16) Bento UI 升级 (8 figure 4 列) - 千问最终版
- K3 8/16 15:48 让读千问 thinking + 分析研究后更新 → M3 commit 717825f (8/16 16:00, K3 workspace 22 figure 6 stage design, 261+/81-)
- M3 commit 2e2bd76 (8/16 16:07) imageSlotFactory/Team placeholder 标 22 figure 上线状态 (6+/6-)
- 5 步真验证 PASS: 22 figure / 27 img / 22 webp / 6 stage 全显

**应用范围**: 任何关于我们板块升级 / 重构; 任何 22 figure → 25 figure / 30 figure 扩展; 任何工厂图章节引用 22 figure 工序流.

**判断 SOP** (任何关于我们板块升级 commit 实施前自查):
1. 6 stage 工序流是否完整 (Stage 0-Stage 06)?
2. 22 figure 总数是否对得上 (含 color text card = 22, 不含 = 21)?
3. Stage 0 Banner 是否 full-width hero + brightness-105?
4. Stage 04-05 后道 + 礼盒工艺 是否齐 (核心差异化)?
5. Stage 06 成品出货 是否含 cabinet + palletized + black + vending + textbook 五类?

**实施硬约束**: 任何关于我们板块升级必走 6 stage 工序流结构, 不自由发挥; 任何"加点图"必须先确认加到哪个 stage; 22 figure 增减要 commit message 明确说; imageSlotFactory/Team placeholder 必带 commit SHA + 上线日期.

**K3 16:51 拍板重要内容**: 关于我们是重要内容, 不受 §0.17 push 配额 1 天 ≤ 5 限制.

---

## 13.4 Blog 内容标准 v3 (2026-08-20 V3.7 拍板, K3 14:16)

**核心升级**: §13.4 v2 已落后实战 (喜帖价格指南 7423 字, 实战范围 > v2 800-1000 字下限). v3 修订 6 条:

1. **字数分级**:
   - 行业快讯: zh-hk 800-1000 字 / en 350-450 词 / ja 250-350 词
   - 商业指南 (价格/选购/对比类, **抢排名主力**): zh-hk **1500-2500 字** / en **600-900 词** / ja 400-600 词
   - 首页级内容深度 = 排名第 5 名入场券 (5 个关键词首页 = 25 imps × 1.5% CTR × 1.5% 询盘率 = 0.56 询盘/天, $2,150/月)
2. **GEO 硬条款**:
   - 答案前置 (第一段先给结论, 再展开论据)
   - 疑问句 H2 (PAA / People Also Ask 命中)
   - 数字列表 (AIO 引用结构, +120% 点击的弹药)
3. **`targetKeywords` 字段 (BlogPostMeta frontmatter 必填)**:
   ```typescript
   targetKeywords?: {
     primary: string;       // 1 主词
     secondary: string[];    // 3-5 长尾
   };
   ```
4. **内链 ≥5** (同类目 PDP + 类目页 + 关联 blog, 三角互链)
5. **7 天 GSC 收录检查**: 上线 7d 后 GSC 仍无收录 = 验收 FAIL, 回炉改写
6. **图片条款松绑**: 允许引用已上线产品图 (`public/images/products/...`), 不强制每篇博客配 hero 图 (婚礼是视觉决策品类, 但纯文字商业指南仍可)

**反例 (v2 时代 24 条博客 excerpt 硬塞 "in Hong Kong"**):
- ❌ `zh-hk: 香港包裝盒訂製...` → `en: Custom Packaging Box Guide: ... in Hong Kong` → `ja: 香港パッケージ箱...`
- ✅ v3 后 en/ja 不硬塞 supplier origin, 改成本地化卖点 (size/paper/design/material)

**应用范围**: 任何新 blog 上线; 任何旧 blog 回炉; 任何 100 词追踪池词条对应的内容页.

---

## 13.5 SKU 内容标准 v2 (2026-08-20 V3.7 拍板, K3 14:16)

**核心升级**: §13.5 v1 缺验收硬条款, 12 婚礼 SKU 实际是"半成品" (无图 / 描述重复 / specs 缺字段). v2 修订 6 条:

1. **无图不得标记完成** (8/19 22 webp 已落盘 + 27 prompts 待跑)
2. **描述唯一性相似度 <70%** (8/19 重复块教训固化, 跑 cosine 相似度查重)
3. **`specs` 4 字段必填**: 材质 / 尺寸 / 工艺 / MOQ (缺一标 FAIL)
4. **价格三件套**: basePrice + priceRange + 跨 locale 显示 (USD/HKD/JPY, 不串 locale)
5. **`targetKeywords` 登记** (跟 blog 同字段, 1 主词 + 3-5 长尾)
6. **新类目首发 ≤6 扩张凭 GSC 证据**: 新类目首 ≤6 个 SKU 上线后, 必须 GSC 验证有 imps 才允许扩张第 7 个

**反例 (v1 时代 12 婚礼 SKU 教训)**:
- ❌ 描述同质化 (8/19 实际发现 4 块文字几乎一致)
- ❌ specs 字段不统一 (有的 3 字段, 有的 6 字段)
- ❌ targetKeywords 未登记 → GSC 100 词追踪池查不到对应 SKU
- ✅ v2 后每个 SKU 跑查重 + 字段补齐 + targetKeywords 登记

**应用范围**: 任何新 SKU 上线; 任何存量 SKU 优化; 任何季节性 SKU 上线 (R5 9/15 三旺季共振).

**跟 §13.4 v3 配套**: Blog 命中 100 词 → PDP 承接, PDP 必须有 targetKeywords 跟 Blog 对齐 (Blog `primary: 喜帖價格` ↔ PDP `primary: 喜帖印刷` 同语义, 三角锚定).

---

<!-- autoclaw:feishu-lark-skill-guidance -->
## Feishu / Lark Requests

When the user asks about Feishu/Lark/飞书 matters, route through Feishu/Lark skills first. This includes messaging, contacts, calendars, approvals, tasks, docs, sheets, Base, Drive, Wiki, mail, meetings, minutes, attendance, OKRs, or any other Feishu/Lark workspace operation.

1. If a relevant Feishu/Lark skill is already available, use that skill directly.
2. If no relevant skill is available, search the skill catalog/store or available skill list for a matching Feishu/Lark skill.
3. If you find a matching skill that is not installed or enabled, ask the user whether to install/enable and use it before proceeding.
4. If no matching skill exists, say so briefly and continue with the safest available fallback.
<!-- /autoclaw:feishu-lark-skill-guidance -->

<!-- autoclaw:zcode-app-context-v1 -->
<app-context>
# AutoClaw 桌面端上下文

## 文件与 URL
- 请将本地网页 URL 以 Markdown 链接形式返回 (例如：[label](http://127.0.0.1:8080))。
- 文件路径应为绝对路径，或者包含工作区文件夹名称，以便能够相对于工作区解析该路径。
- 除非另有说明，请将文件引用写成 Markdown 链接 (例如：[name.md](/absolute/path/to/name.md))。
</app-context>
