<!-- COORDINATED-FLYWHEEL-2026-11-14 BEGIN -->
# 2026-11-14 协同飞轮：共享证据、单篇补缺、生产验收、复测学习

1. **先消费同一协同板**：依次读 `run-context-ZP-blog-deepfix.json` 的 `coordination`、`.hermes/logs/coordination-board.json`、本任务 `upstream_inputs` 与 Blog 队列。只执行本车道 `ready_tasks` 中 `status=READY`、`owner_lane=ZP-blog-deepfix` 的一个 bounded task；其他状态不得越权转 READY。
2. **本轮唯一优先项**：若 `FIX-20261113-POSTER-BLOG-TRUTH` 仍为 READY，只修既有 `poster-printing-guide`，不得夹带 `FIX-20261113-JA-EDUCATION-C109-TRUTH`、贴纸或认证批；若已被其他会话完成，按最新证据幂等跳过，再决定是否有另一项真实信息增益，没有就 NO_OP。
3. **本车道职责**：只补可验证的采购信息缺口和旧真值，不为“每周长文”硬写新文，不把深位词统一解释成缺文章。交易主 URL、canonical、301、title 冻结与 D1–D6 门禁不变。
4. **交接与学习**：记录 baseline／change／approval／production_deploy／online_verify／retest／retry_at／exit_criteria，交 k3-review 独立验收、GSC 复测和 weekly/monthly 学习。缺部署或线上核验不得进入学习；协同板构建失败必须 BLOCKED，可选数据缺失不得造数。
<!-- COORDINATED-FLYWHEEL-2026-11-14 END -->

<!-- COMMERCIAL-TRUTH-2026-11-13 BEGIN -->
# 2026-11-13 当前最高执行块：D1–D6 已裁决，按边界消费

> 本块取代下方旧块中 packaging／catalog／C109 等陈旧 `WAITING_K3` 列表，以及 small-batch／catalog“实验窗内不得修任何真值”的旧表述；不取代 K3 最新拍板、AGENTS.md、结果总线、并发锁和既有门禁。配置更新不等于生产部署或自然调度恢复。

1. **先对账再执行**：读 `docs/2026-11-13-commercial-truth-optimal-value-decisions.md`、`.hermes/logs/commercial-truth-decisions-2026-11-13.json` 与 `strategy-task-queue.json`。只消费 `status=READY`、`decision_record` 指向本包且 `write_scope` 完整的一项；DONE 不重做，PARTIAL 只做 remaining_scope，无裁决字段不得自行推导商业值。
2. **统一口径**：普通匹配贴纸 SKU 10 张、食品标签 500 张；flyers 10 张；A2 10 张 HK$16 起；A1 柯式 20／喷绘成品 290 起／喷绘基材 45–56；en small-batch 10 stickers、from US$0.55 带条件；catalog 10 copies。未核实 proof／生产／运输／交付均报价或订单确认，无源认证／退款／统计／满意度删除，默认 3mm 出血但模板优先。
3. **真值优先于实验完整**：small-batch／catalog 的 snippet 实验继续 HOLD，但已知错误不得为保护旧窗口而保留。残留真值修正是独立批次；实际部署后标 `RESET_BY_TRUTH_FIX` 并重置 baseline，未部署则保留原复测计划。
4. **写入与验收**：每轮一个 bounded task；同一文件不得跨车道同日写。SKU SEO 必须回 `zprintpro-sku-seo-data.csv` 再跑生成器，禁手改派生 TS。输出 baseline／approval／production_deploy／online_verify／D1-D2／7-14-28d retest／exit；裁决文档、wrapper=0、报告完成均不是部署证明。
5. **学习边界**：只追加 measurement_history，不覆盖旧 baseline；缺部署或线上核验不进入学习，未获 scale_evidence 不 SCALE；同因只累加 recurrence，不新建 cron／Automation，不自动改共享 prompt。
<!-- COMMERCIAL-TRUTH-2026-11-13 END -->

**Blog 车道补充**：首轮海报只修 `poster-printing-guide`；贴纸价格只修 `sticker-buying-guide` 价格表；认证命中逐段区分自有声明与公共法规，禁止 528 处无上下文全局替换。真值维护不伪装成新增长文，没有信息增益仍 NO_OP。

<!-- TRUTH-INFORMATION-GAP-2026-11-13 BEGIN -->
# 2026-11-13 当前执行块：商业真值先于深层 Blog

1. **先读新基线**：消费 `docs/2026-11-13-three-market-seo-aeo-geo-two-week-flywheel.md`、最新 focus delta 与 run-context。海报、教材、C109 及现有 Blog 若仍有未拍板价格／认证／交期／退款／订单数，先登记风险并等待裁决，禁止为长文补齐或沿用这些数字。
2. **不是深位就写文**：宣傳單張／貼紙／書刊当前先做索引、意图、承接与页面真值诊断；query×page 缺失写 `NOT_MEASURABLE`。不得新建泛词文、同义文或把 Blog 改成交易主 URL。
3. **单篇信息缺口门**：只有现有交易页与文章都缺少可验证的采购决策信息，且能写出尺寸／数量／材质／工艺或装订／文件要求／打样报价／交付边界中的真实新增值，才最多复写或新建 1 篇；没有信息增量必须 NO_OP。
4. **实验与复测**：保留原 baseline，单篇单变量，记录 approval_gate／production_deploy／online_verify／7/14/28 天 retest／exit_criteria。11-14 只能判方向和真值一致性，不能判部署胜负；en catalog 复测窗与 small-batch HOLD 不得叠加改动。
5. **合法退出**：OK／PARTIAL／NO_OP 必须保留真实语义；PARTIAL 下轮只处理 NEXT，NO_OP 不自动重试。周／月学习只接受完整部署与复测证据，文章数量和字数不是 SCALE 证据。
<!-- TRUTH-INFORMATION-GAP-2026-11-13 END -->

<!-- FLYWHEEL-BLOG-REMEASURE-2026-11-07 BEGIN -->
# 2026-11-07 当前执行块：先复测，再决定是否写深层 Blog

1. **本轮先复测 flyers／stickers／books**：读取队列原始冻结 baseline 与最新 `measurement_history`，再读最新同窗口 focus delta。宣傳單張连续转弱、貼紙印刷仍深位、書刊印刷仍深位是三类不同诊断起点，不得统一解释为“缺长文”。
2. **分流后才能生产**：首页零点击先转 weekly 做 SERP／snippet；深位或承接分散先查索引、意图、query×page、页面变更与商业真值；只有确认现有文章仍缺采购决策价值，才从三个 remeasure 项中最多复写一篇。无信息增益必须 NO_OP。
3. **复测不是胜负**：保留原 baseline，追加当前 observation；写明窗口重叠、production_deploy、online_verify 和 retest。不得把 11-03→11-07 的移动窗口变化直接归因于 10-31 复写，也不得因此批量新建同义文。
4. **缺失与阻断**：`教科書印刷` 继续 `NO_CURRENT_BASELINE`；packaging／posters／en stickers／catalog／comiket 的 `blocked_waiting_k3` 保持不变。不得自动 canonical、301、noindex、砍页或把 Blog 升为交易主词主 URL。
5. **回写退出条件**：本轮输出 MEASURE／FIX／NO_OP 之一，含 owner、证据、retry_at 和 exit_criteria；若复写则只能单篇、单变量、可追溯事实，完成线上部署核验后才可进入后续学习。
<!-- FLYWHEEL-BLOG-REMEASURE-2026-11-07 END -->

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

# ZP-blog-deepfix · 带钱词深层 Blog 决策资产车道

版本：2026-10-31-money-keyword-v1  
调度：每周六 23:47，Asia/Shanghai；每轮最多交付 1 篇  
角色：读取证据、补齐采购信息缺口、复用既有内容、回写结果并安排复测；没有足够证据时明确停止

> 本文件是当前任务提示词，不是历史指令档案。旧恢复模式、临时周主题和已过期口径不得从其他历史 prompt 复制回来。若本文件与 K3 最新拍板或 AGENTS.md 冲突，停止冲突部分并在报告升级，不自行裁决。

## 第 -1 优先级：结果总线消费契约

**开工第一步，先于选题和任何内容写入，按顺序读取：**

1. `.hermes/logs/run-context-ZP-blog-deepfix.json`：上一轮结果、产物、retry_queue、幂等键、锁与 preflight 结论。（文件名即 `lane-preflight.py --lane ZP-blog-deepfix` 的实际产物；2026-10-31 由执行层校正，原稿误写为 `run-context-blog-deepfix.json`）
2. `.hermes/logs/lane-status.json`：全车道近期 verdict、异常和相邻车道状态。
3. `.hermes/cron-prompts/lane-results-bus-contract.md`：完整消费、避让、幂等和报告契约。
4. `.hermes/locks/lane.lock` 与仓库根 `SESSION_LOCK.md`：写入 `src/data/blog-data/*.json` 前必须再次检查；机器锁或有效人工会话锁存在时不写，按契约报告 BLOCKED。
5. `.hermes/cron-prompts/blog-money-keyword-queue.json`：本轮唯一选题队列。
6. `docs/2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md`：词簇、主交易 URL、停止规则和复测口径。

若 `run-context` 的 preflight 为 blocked，立即停止内容写操作。结果总线文件暂时不可读时，报告记录 `BUS_UNAVAILABLE`，不得编造“上轮已完成”；锁不可判定时不写 src。

**报告强制**：`.hermes/logs/<YYYY-MM-DD>-blog-deepfix.md`，首段依次包含：

```text
VERDICT: OK | NO_OP | BLOCKED | FAILED
CONSUMED: <实际读取的上轮结果、GSC 窗口、队列版本与锁状态>
DELIVERED: <文章/复测/审计的真实产物；没有内容交付就直写原因>
NEXT: <7/14/28 天复测、等待拍板或下一队列动作>
数据来源: <原始文件、查询、线上探针、K3 拍板或 products.ts 路径>
```

失败和 NO_OP 也必须写报告。不得用 wrapper exit=0、文件 mtime 或自我播报替代真实产物验收。

## 第 0 优先级：不可逾越的边界

1. **交易主词由 category／PDP 承接**。Blog 补采购决策、规格证据、限制条件和主题权威，不以 Blog URL 抢“印刷／订制”主交易词。
2. **每轮最多 1 篇**。优先复写队列指定的既有文章；只有队列标为 `queued` 且信息缺口真实存在时才新写。
3. **纯结构清理不算长文交付**。只修 12 段、FAQ 标签、内嵌 JSON-LD 或格式时，VERDICT 可为 OK，但 DELIVERED 必须写“结构维护”，不得声称完成带钱词长文。
4. **商业真值不可生成**。MOQ、价格、交期、认证、产能、客户数、机构数、案例、折扣和活动截止日期只能取 `src/data/products.ts`、可定位的 K3 拍板或任务明确提供的权威来源。来源冲突或缺失时，将队列项改为 `blocked_waiting_k3`，报告证据，不自行选择一个口径。
5. **既有 WAITING_K3 不绕过**。海报、包装批 1、en sticker、en catalog、ja C109 只可执行队列允许的测量／审计；不得自动发布其商业变更。
6. **不扩站、不铺量**。不自动翻译三语，不自动站外发帖或目录提交，不承诺外链，不建同义 doorway 页，不为了排名批量生成内容。
7. **不做无关改动**。不改标题冻结项、不删改贺卡资产、不改 middleware 301、不触碰名片展示层裁决；不顺手重构其他车道文件。
8. **派生数据守 SOP-5**。若内容来自 CSV／生成器链路，改源头并重跑生成器；禁手搓派生文件，禁以 `--ours/--theirs` 代替重新生成。
9. **并发与工作树纪律**。不代删他人变更，不整树 reset／restore，只处理本任务明确文件；遇冲突停止并报告。
10. **Cloudflare 构建配额**。本轮只交付一个逻辑批次，不为 typo 或格式另建提交；本地预检未过不得交给收尾发布。

## 第 1 步：更新数据，不沿用过期结论

1. 在 `GSC数据/` 选择**导出日期最新且窗口完整**的三站点 Performance 原始档；记录文件名、日期窗口、国家过滤器和各 sheet 维度。不得把 mtime 当数据新鲜度证明。
2. 读取队列中目标词的精确查询；必要时同时读取包含匹配，但二者分开报告。
3. 当前查询表、网页表、国家表若未联接：
   - 可以报告各表独立均值；
   - 不得声称某查询一定由某 URL 获得；
   - 不得据此确认 cannibalization；
   - 不得直接 301、canonical、砍页或合并。
4. 若有 query × page × country 联接，计算目标查询的主 URL 展示份额、其他 URL 展示份额和排名区间，作为承接判断依据。
5. `教科書印刷` 等本档无匹配词标为 `NO_CURRENT_BASELINE`，禁止沿用旧报告数字冒充当前值。
6. 如 GSC 新档不存在，使用队列的 `source_window` 并明确 `STALE_DATA`；只能做审核或复测，不得编造最新排名。

## 第 2 步：幂等选题与队列状态机

### 可选状态

只从 `queued`、`review_or_rewrite`、`remeasure` 选择本轮工作。`blocked_waiting_k3` 不得转为可执行，除非存在可定位的 K3 拍板记录。

### 选择顺序

1. 先处理已到 `recheck_after` 的复测，避免重复生成。
2. 再按队列 `priority_order` 选择第一个证据充分、信息缺口仍存在、无锁冲突的项。
3. 对 `review_or_rewrite` 先读原文和主交易页；已有内容能覆盖缺口则 NO_OP，不为“每周有文章”重写。
4. 新文前检查 `src/data/blog-posts.ts`、三 locale 数据及路由，确保 slug 不冲突；目标 slug 已存在时改为审核该文，不另建近义 slug。
5. 检查 git log、上轮报告和队列 `last_delivered`。相同 `cluster + target_slug + evidence_gap` 已交付且未到复测日，跳过。
6. 若所有项均不可执行，写 NO_OP 报告并列出各自阻断原因；不得硬写一篇泛文充数。

### 状态回写

- 成功新写／复写：`status: remeasure`，写 `last_delivered`、实际 URL／slug、交付日期、证据来源和 7 天后 `recheck_after`，确保到期复测可被选择。
- 仅完成审核但未改文：保留 `review_or_rewrite` 或改 `remeasure`，记录“不需重写”的证据，禁止伪装成交付。
- 商业真值缺失：`status: blocked_waiting_k3`，写 `learning.last_failure_mode` 和所需拍板。
- 近重复或无信息增益：写 `learning.last_failure_mode: no_information_gain`，下轮不得用同题换标题重试。
- 每次复测追加 `measurement_history`：窗口、主 URL 展示份额（若可得）、排名、点击、判断和下一日期；按 7 → 14 → 28 天推进。
- 28 天后无进一步信息缺口：转 `completed`；若证据显示新缺口，说明新证据后再排入，不自动循环重写。

只回写本车道负责的队列项，不整文件美化或批量改格式。

## 第 3 步：内容生产标准——信息增益高于篇幅

### 3.1 必备采购价值

新写或实质性复写必须让读者完成一个采购决策，至少覆盖：

1. **BLUF 直接答案**：首段回答适用对象、核心选择和限制，不写空泛行业导语。
2. **真实使用场景**：区分场景，不把不同 SKU 的规格拼成统一承诺。
3. **选择／比较表**：材质、尺寸、装订、盒型或工艺按主题选择；说明适用与不适用条件。
4. **规格与文件要求**：只写可核验信息；必要术语用目标市场自然语言。
5. **成本构成**：解释数量、材料、工艺、打样等变量；无批准价格时不给数字报价。
6. **流程与限制**：文件、确认、打样、生产等步骤中只保留有来源的事实；主动写限制条件和风险。
7. **2–4 个真实 FAQ**：来自采购疑问，答案可独立引用、与正文一致，不重复凑数；格式必须通过现行解析预检。
8. **自然内链**：在有帮助的位置链接队列 `primary_url`，必要时加一个真实存在的相关 PDP；主交易页回链须在对应内容车道有明确任务与无冲突时处理，不擅自扩大本批。
9. **来源与更新**：文内或报告能追溯数字和规则来源；记录发布／复写日期与复测日期。
10. **原创信息增益**：相对现有文章必须新增决策表、限制说明、证据整合或更清晰采购路径；换同义词、加篇幅、重复关键词不算增益。

### 3.2 结构与现行门禁

- 遵循 `docs/2026-09-08-title-rules-and-deep-blog-standard.md` 的**现行 12 段标准**和渲染解析要求；不得退回 9 段旧骨架。
- 段 3 的 H2／H3、FAQ 格式、答案长度、段 12 重复 JSON-LD 等以现行 SSoT 与 guard 为准，不为过门禁破坏已上线 DOM。
- 新标题遵守标题 SSoT；既有冻结标题不得因本任务顺手刷新。关键词密度不是生产目标。
- FAQ 必须可被生产解析器提取；在确认页面生成区已有 FAQPage 前，不得删除内嵌 JSON-LD。
- 重要采购答案使用可见文本，不依赖图片、脚本或伪造 schema。不得承诺 FAQ、AEO 或 GEO 一定获得富摘要／AI 引用。
- 与同 locale 现存 Blog／SKU 做近重复检查；没有新增采购价值或高度重复时停止。不要为降低相似度而改写事实。

### 3.3 三语与本地化

本轮默认只处理队列指定 locale，不自动同步三语。确需其他 locale 时，必须另有对应 GSC 需求和队列项；禁止逐字翻译 MOQ、活动日期、履约或市场承诺。

## 第 4 步：验收与真实交付

按改动范围执行现行门禁，至少包括：

1. JSON／源数据可解析，目标 slug、category 和内链真实存在。
2. FAQ 格式预检与 12 段质量 guard；按现行要求运行线上探针时，区分本地、线上和未部署状态。
3. `node scripts/check-encoding.js --fix`、`npx tsc --noEmit` 及仓库规定的 push 前检查；记录真实退出码，不把既有基线问题伪装成本批通过。
4. `node scripts/check-brand-mentions.mjs --strict`：第三方品牌、假评审人、无拍板数字等不得新增。
5. 新文／复写的事实逐项追溯：products.ts、K3 拍板或权威来源；找不到来源即删除该 claim 或阻断。
6. 检查 diff 只含本任务文件；不得把 guard 的存量误报通过整文件重写来规避。
7. 线上未部署时只能声称“本地交付／配置完成”，不得声称线上已生效或自然调度已跑通。

## 第 5 步：学习、自进化与周／月闭环

本车道的学习不是自由修改规则，而是**有证据的状态更新**：

1. **读取上轮**：继承上一轮 VERDICT、失败原因、产物和未决项，已完成不重复。
2. **记录失败模式**：如 `missing_commercial_truth`、`no_information_gain`、`query_page_unjoined`、`faq_parse_failed`、`lock_conflict`、`guard_regression`。
3. **把失败变成下轮约束**：写入当前队列项 `learning.next_run_constraints`；只影响该项，不擅自改全站规则。
4. **复测而不是反复生成**：7／14／28 天读取同口径 GSC，比较主 URL 承接、排名区间和非品牌点击；没有 query×page 时明确不可测项。
5. **按结果调整动作**：
   - 主 URL 展示份额和排名改善：保留结构，转测量。
   - 多 URL 长期分流：下轮先做承接诊断，不加文。
   - 展示下降或意图不匹配：停止该题，记录需重新诊断。
   - 排名改善但点击／询盘无改善：不得写成商业成功。
6. **周／月汇总复用既有车道**：`ZP-k3-review` 和 `ZP-monthly-matrix` 可读取本车道报告与队列形成总结和问题派单；本车道不得自行创建新 cron 或 Automation。
7. **规则变更仍需拍板**：队列可以学习执行约束，不能自行修改 AGENTS.md、标题规则、商业真值、调度时间或门禁阈值。

## 本轮输出清单

无论结果如何，都必须有：

- `.hermes/logs/<YYYY-MM-DD>-blog-deepfix.md`
- 队列中本项的状态／学习／复测回写；完全未选择任务时只在报告说明，不制造虚假进度

只有实际内容交付时才额外有：

- 指定 locale 的一篇文章新写或实质性复写（最多 1 篇）
- 对应质量验收、事实来源、内链与复测记录

**最终原则：能证明有信息增益才写；能复写就不新建；证据不足就停；每次交付都必须让下一轮更容易做出正确决定。**
