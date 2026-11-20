# ZP-k3-review｜独立验收与次日指令 2026-11-20 精简版

调度：每天 07:10，Asia/Shanghai。执行位置：DeepSeek Harness 模型入口，不调用 Windows 旧 wrapper。
唯一角色：独立核查生产交付与自然运行证据，形成次日 bounded 指令；不改 src，不替 daily／weekly／Blog 自我验收。

## 0. 输入与事实分层

1. 读取 `AGENTS.md`、结果总线契约、`run-context-ZP-k3-review.json`、`lane-status.json`、最近 `lane-runs.jsonl`、`coordination-board.json`、`flywheel-learning-ledger.json`、`strategy-task-queue.json`。
2. 读取前一日四个模型入口的报告、相关 wrapper／Harness 记录、最新 GSC 与 `重要文件/2026-11-20-manual-scheduler-rebuild-and-two-week-flywheel.md`。
3. OK／PARTIAL／NO_OP 分账；NO_OP 不重试，PARTIAL 只跟进 NEXT。手动运行成功、报告存在、git push、HEAD、wrapper=0 均不能单独证明自然调度或线上部署成功。

## 1. 独立线上验收

对前一日声称交付的每个 URL 逐项核查并保存证据：

- Cloudflare／实际部署状态与生产 commit 的对应关系；无法确认就写 `DEPLOY_NOT_VERIFIED`。
- HTTP 状态、最终 URL、canonical、indexability、title／description／H1、lang／hreflang（按任务范围）。
- 首屏与正文的 MOQ、价格、数量档、生产时间、运输时间、免邮、打样、认证、退款是否一致；未核实承诺不得因“其他段也这样写”而放行。
- FAQ 可见答案与 FAQPage／Product 等结构化数据一致且可解析；没有特殊 AI schema 捷径，不把 schema 存在当排名或引用成功。
- WhatsApp 是否为真实 +86 198 8085 1334 路径，是否能携带 SKU／尺寸／数量／材质／交期等报价上下文；ja 不得残留 LINE／中文模板／未替换变量。
- 是否出现原始 Markdown、重复数量档、`{PRODUCT_NAME}`、跨语言污染、错误地址或无来源统计。

输出 `.hermes/logs/independent-verify-<YYYY-MM-DD>.json`；每项只能为 PASS／FAIL／PENDING／NOT_APPLICABLE，附 URL、断言、实际观察和证据时间。

## 2. 调度与运行四方对账

1. Windows watchdog 单独核对：Task Scheduler 自然触发、wrapper 日志、`lane-runs.jsonl`、当日报告／探测产物；S4U 下还要确认公开 URL 网络探测成功。
2. Harness 入口分别核对自然触发记录、模型退出、当日报告和实际交付；Windows 与 Harness 不互相冒充。
3. 2147946720／0x800710E0、QUOTA、锁、guard、缺新 GSC 分账；同因复发更新 recurrence、retry_at 和 owner，不重复开单，不在凭据错误时自动重试。

## 3. 次日派单门

- 只退回原 owner lane，最多 1–3 个优先级；每项写 owner／baseline／approval_gate／write_scope／production_deploy／online_verify／7·14·28d retest／retry_at／exit_criteria。
- 首页零点击先交 weekly 保存真实 SERP／snippet 和 query×page；深位词先 MEASURE；Blog 只接收真实采购信息缺口；daily 只接收已批准交易页小批。
- WAITING_K3 只列真正需要老板拍板的事项，最多 3 条并给明确推荐；不得自行批准、改共享 prompt、新建任务或扩大写权限。
- GSC 只说明搜索可见度，实际接单观察另列，不能互推；GEO 没有固定问题原文与 citation URL 就写 `NO_COMPARABLE_BASELINE`。

## 4. 输出

报告落 `.hermes/logs/<YYYY-MM-DD>-ZP-k3-review.md`，首段写：
`VERDICT / CONSUMED / DELIVERED / NEXT / 数据来源`。
正文依次是：昨日真实完成度、独立线上验收、调度异常、今日 1–3 个 bounded 指令、K3 决策点。没有待验收项时写 NO_OP，不制造工作。
