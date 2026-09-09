# §0.0 最高规则 + 技能自动化 同步报告（v7 收尾，2026-09-09）

> **任务来源**: K3 9/9 指令「同步更新最高规则 和技能自动化」（承接 9/8-9/9 M3→新执行层迁移两交付物：规则主文档 SSoT v1.0 + zprintpro-content-standards 入口技能）
> **执行**: 新执行层同步会话；docs/脚本/技能类改动按 §0.25.9 全部留本地随攒批窗口，本窗口不 push

## 一、改动清单（11 文件）

| # | 文件 | 改动 |
|---|------|------|
| 1 | AGENTS.md | +§0.0.3 最高规则执行层承接：新执行层（autoclaw / deepseek hermes）不豁免 / 开工自检第 1 问=名片扫描 / push 兜底由 `scripts/check-bc-ban.mjs` + 入口技能门童承接 / 历史记述不改写 |
| 2 | AGENTS.md §0.34.1 | 入口技能描述同步：启动自检 5 问→6 问、规则 SSoT 内容行 v3→v4 写满原则 |
| 3 | AGENTS.md §13.1 | +v7 迁移 banner：调度 SSoT → §0.34.3（autoclaw Blueprint Automation 5 实体），旧 4 cron 触发时间降为 8/23 历史口径（仅存范围定义） |
| 4 | docs/2026-09-08-title-rules-and-deep-blog-standard.md | §1.5 收口：待拍板 → ✅ 已终裁（K3 9/9 06:18 v4：独立长尾 1-2 个，第 2 个仅 <50 补词时启用；工艺修饰 1-3 不变；v3/v4.0§5.3 旧口径作废）；来源行补 v4 终裁指针 |
| 5 | skills/zprintpro-content-standards/SKILL.md | +「⛔ 最高规则 · 名片禁令」段（置于自检前）；自检 5 问→6 问（第 1 问=名片扫描）；§4 门童命令 + `check-bc-ban.mjs` 首位；§6 主营品类修正为 §11.1 v2 口径（4 pillar + 2 横向，紙袋 L3）；+§10 自动化窗口速查 |
| 6-10 | `.hermes/cron-prompts/` 5 个 prompt（daily-content / weekly-meta / gsc-feedback / monthly-matrix / blog-deepfix） | v7 段内 SKU 标题规则 v3 残留→v4 写满原则；+最高规则名片禁令句（承接=贺卡 greeting-cards）+ `node scripts/check-bc-ban.mjs` 门童指针 |
| 11a | scripts/check-bc-ban.mjs | **新建**（§0.0.1 第 3 条写明但仓库此前缺失）：关键词 `名片\|咭片\|名刺\|business[-\s]?card\|name[-\s]?card`，范围 src/+public/+根配置，豁免 .bak/gsc/seo-weekly-history.json/根目录 .md；redirect 源行 + bc→greeting 承接映射 + 禁区声明仅记录不阻断；命中>0 exit 1 |
| 11b | `.hermes/cron-prompts/v7-automation-payload-2026-09-09.json` + `v7-automation-create-2026-09-09.md` | **新建**：5 实体建任务 payload（逐字段对齐 jobs.json 既有 schema）+ 创建操作书（含 SOP-10 5 问 + 数据来源） |

## 二、技能自动化实体状态（重要挂账）

- autoclaw 活动注册表 `cron/jobs.json` 盘点（2026-09-09）：仅 `zprintpro-w7-strategy-m1-weekly-check` + 2 条 K3 提醒类任务，**5 个内容 cron 实体未建**。
- 本会话（DSH）无 autoclaw 原生 AutomationCreate 工具，且 jobs.json 为运行时活动注册表（服务持续写回 + .bak 机制），禁外部直写 → 以 payload 交付，**下一步 = 在 autoclaw 会话用 AutomationCreate 逐条创建**（操作书就绪：`.hermes/cron-prompts/v7-automation-create-2026-09-09.md`）。
- timeoutSeconds 依据（实录非估算）：w7 任务 300s 已 4 连败 `execution timed out` → 新任务重作业 3600 / 轻作业 1800，首次真实运行后按 `lastDurationMs` 校准。

## 三、门童首跑实况（清积压请 K3 拍板）

`node scripts/check-bc-ban.mjs` 终态：**阻断 418 处 / 允许形态仅记录 40 处**（全文 `.hermes/reports/bc-scan-2026-09-09.txt`）。三类分布：

| 类 | 规模 | 代表 | 性质 |
|---|------|------|------|
| A 线上 GEO 面 | ~17 | `public/llms-ja.txt` + `public/llms-zh-hk.txt` 仍把 咭片/Business Cards/名刺 6 SKU 列为在售（en 版 llms.txt 已是禁区声明）；`case-studies/page.tsx` en 正文 "Business card retention up 60%" | **撞墙级**：llms.txt 是 AI 爬虫直接读取面，ja/zh-hk 版未同步 v22 改名 |
| B 生成层活代码 | ~50 | `quote-engine/formulas/business-cards.ts`（整公式仍注册于 engine）、`pricing.ts` / `h1-builder.ts` / `ProductTabs` 键名、`__tests__` 22 处 | §0.0.2 所指「没改规则层与生成层」残留；涉及定价/公式行为，禁自主改 |
| C 根目录历史产物 | ~350 | sitemap_check_sample / rename-reports / seedream-tasks / sku-list.json / lighthouse 等一次性审计与生图产物 | 非活数据；可移 docs/ 归档或加豁免 |

**请 K3 拍板**：
1. A 类是否授权本窗口清理（llms-ja/zh-hk 同步禁区版 + case-study 文案替换——涉及 user-facing，需拍板）；
2. B 类 quote-engine 名片公式处置（删除 or 保留代码但断开 engine 注册）；
3. C 类归档方式（移 docs/ 或门童豁免清单）。

拍板前门童维持 BLOCK 现状（§0.0.1「命中>0 先清再发」）；docs/技能类攒批不受影响，但 src/ 类改动会被它拦下，直到清完。

## 数据来源（§0.23）

- jobs.json 盘点: `C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json`（2026-09-09 读取，1615 行）
- 调度拍板: AGENTS.md §0.34.3（K3 9/8 06:15）；v4 终裁: `docs/2026-09-09-k3-title-rule-v4-write-full.md`（K3 9/9 06:18）
- 扫描实况: `node scripts/check-bc-ban.mjs` 终跑（2026-09-09，扫描 454 文本文件，阻断 418 / 记录 40，exit 1），全文 `.hermes/reports/bc-scan-2026-09-09.txt`
- 主营 v2 口径: AGENTS.md §11.1（K3 9/1 16:16）
- payload schema 对齐基准: jobs.json 既有 `zprintpro-w7-strategy-m1-weekly-check` 实体字段
