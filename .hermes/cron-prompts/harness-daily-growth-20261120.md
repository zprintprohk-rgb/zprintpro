# ZP-daily-content｜每日增长总控（GSC＋交易页）2026-11-20 精简版

调度：每天 21:17，Asia/Shanghai（2026-11-23 对齐现行排程，原草稿 18:17 作废）。执行位置：DeepSeek Harness 模型入口，不调用 Windows 旧 wrapper。
唯一角色：先更新搜索证据，再完成最多一个已批准的交易页小批；不是 Blog 生产者，也不是自我验收者。

## 0. 开工必读与停止条件

1. 依次读取 `AGENTS.md`、`.hermes/cron-prompts/lane-results-bus-contract.md`、`.hermes/logs/run-context-ZP-daily-content.json`、`.hermes/logs/lane-status.json`、`.hermes/logs/coordination-board.json`、`.hermes/logs/flywheel-learning-ledger.json`、`.hermes/logs/strategy-task-queue.json`。
2. 再读 `重要文件/2026-11-20-manual-scheduler-rebuild-and-two-week-flywheel.md`、最近一轮 daily／weekly／Blog 报告，以及 `SESSION_LOCK.md` 和 `.hermes/locks/lane.lock`。锁冲突、preflight blocked、协同板不可用时停止 src 写入并报告 BLOCKED。
3.  DONE 不重做；PARTIAL 只做 NEXT／remaining_scope；WAITING_K3、BLOCKED_INFRA、SCHEDULED、MEASURE_HOLD 不得自行转 READY。不得新建 cron、Automation、战略任务或共享规则。

## 1. 合并原 GSC-feedback：先供证据，不直接改页

1. 在 `GSC数据/` 选择导出日期最新且窗口完整的 24h／7d／28d 三站点原始档，记录实际窗口起止、导出日、文件 hash；mtime 不是新鲜度。没有新档就写 `available:false`＋最近真实日期，不伪造今日读数。
2. 24h 只看健康，7d 看风险，28d 看连续方向；query／page／country 独立 sheet 不得拼接成 query×page 或 locale 结论。缺精确行写 `NO_CURRENT_BASELINE`，缺逐词逐页写 `CANNIBALIZATION_NOT_MEASURABLE`。
3. 对照首页零点击、10–20 位冲刺、深位大词和季节词；同因只累加 recurrence，不重复派单。窗口移动不等于实验胜负，GSC 不证明询盘、订单或收入。
4. 到期复测必须先写回学习账本：baseline／change／approval_gate／production_deploy／online_verify／retest／retry_at／exit_criteria。缺部署或线上核验不得进入学习或 SCALE。

## 2. 每轮最多一个交易页 bounded task

只从协同板／队列选择 `status=READY`、`owner_lane=ZP-daily-content`、`approval_gate_satisfied=true` 且 write_scope 完整的一项。优先级如下，但不能越权把候选变成 READY：

1. P0 商业真值与报价路径：A2 海报、即日传单、贴纸类目／small-batch en+ja、可移贴纸、catalog 的 MOQ、价格、交期、打样、免邮、退款、认证和 WhatsApp 口径冲突。
2. P1 首页零点击与小单承接：食品包裝印刷、海報印刷一張／即日、a1／a2 印刷即日、透明／可移貼紙、small batch sticker printing、ステッカー 小ロット。
3. P1 季节交易页：2027 利是封／gold foil red packets、月曆；先核真实交期和活动日期，不新建过期主题。
4. P2 10–20 位：china catalog printing 变体、可移貼紙、學校印刷、摺頁印刷、doujinshi printing、防水ステッカー、クラフト紙 パッケージ印刷。
5. 深位行业大词只做根因诊断和既有主交易页增强，不为“出产量”新建近义页或泛 Blog。

## 3. 商业真值与三语边界

- 数字只能取当前 products.ts、price-tables 或可定位的 K3 拍板；冲突未裁决就只列证据，不自行选值。已批准的 D1–D6 按原记录执行。
- title 遵守现行 50–57 半角当量及冻结窗；SKU SEO 只改 CSV 源头后运行生成器，禁手改派生 TS。
- 同一商业事实必须在 title／description／H1／首屏／价格表／正文／FAQ／可见配送说明／schema 保持一致；schema 不得包含页面不可见承诺。
- zh-hk 用繁体自然采购语言；en 明确深圳生产＋国际运输与小批量条件；ja 清除中文残留、模板变量和不真实日本本地化承诺，不逐字翻译交期、免邮或 MOQ。
- 不碰名片展示层、贺卡资产、middleware 301、冻结组件；不做 canonical／noindex／砍页，除非已有明确裁决和独立任务。

## 4. 验收、交接与合法 NO_OP

1. 改动前保存 baseline 和 diff 范围，运行相关 JSON／形状断言、encoding、tsc、品牌与内容 guard；只提交本任务文件，遵守批量 push 与 Cloudflare 配额纪律。
2. push／HEAD／wrapper=0 不是部署证明。报告分别填写 production_deploy 与 online_verify；未验证就标 PENDING，交 `ZP-k3-review` 独立核查，不自行关闭。
3. 线上核查至少包括 URL 状态、title／H1、首屏 MOQ／价格／交期、正文与 FAQ 一致、schema 可解析、WhatsApp 链接与预填规格路径；核查失败保持 PARTIAL／FAILED。
4. 报告落 `.hermes/logs/<YYYY-MM-DD>-ZP-daily-content.md`，首段写：
   `VERDICT / CONSUMED / DELIVERED / NEXT / 数据来源`。
5. 没有合格 READY、没有新 GSC 或没有信息增益均可 NO_OP；NO_OP 是合法完成，不重试、不代写 Blog、不用报告数量冒充业务成果。
