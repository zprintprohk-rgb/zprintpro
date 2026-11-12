# 2026-11-13 三站点 SEO/AEO/GEO 全面盘点 · 54 词大词/带钱词评估 · 优先级执行（承接 CT-20261113 裁决）

> 日期：2026-11-13 03:3x（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据：`2026-11-13-three-market-seo-aeo-geo-two-week-flywheel.md`（本阶段 SSoT）· `2026-11-13-commercial-truth-optimal-value-decisions.md`（CT-20261113-D1-D6 裁决）· `2026-11-07-three-market-seo-aeo-geo-flywheel-strategy.md` · `2026-10-31-money-keyword-strategy-and-cron-upgrade.md` · `zprintpro-blog-deepfix.md`（车道规则）· `2026-10-30-k3-commercial-truth-decision-sheet.md` · `2026-10-30-three-strategy-completion-and-next-phase.md` · `.hermes/logs/gsc-2026-11-12-money-keyword-delta.json`（54 词）· 11-11/11-12 车道报告与调度对账
> 性质：测量与战略（PROPOSE_ONLY）；零 `src/`、零线上页面改动；生产任务已在队列 READY，由今晚自然车道消费。

## 〇、一句话结论

**54 个重点精确词中 8 行业大词 / 34 采购带钱词 / 8 季节带钱词 / 6 歧义词 / 14 缺当前精确行；28d 首页 7 词除 `即日印刷`（55/2/8.16）外全部零点击。商业真值已按 CT-20261113 全面裁决（D1-D6，8 个 READY 生产任务），真值修正优先于一切长文；catalog 我 11-09 提案的 en H1 100+→10 已上线（线上 H1=`Catalog Printing 10+ | ZprintPro`，commit a33abd3b + zh/ja desc 对齐 392c5f30），队列已转 remeasure。真实 SERP 双引擎仍被拦截（SERP_UNAVAILABLE），首页零点击诊断维持证据缺口。今晚 gsc 20:13 / weekly 20:52 / daily 21:17 三车道自然触发，将消费 8 个 READY 真值任务；k3/monthly 调度 `0x800710E0` 仍未闭合。**

## 一、行业大词 vs 真正带钱词（54 词，最新 28d，11-12 导出）

### 1.1 分类汇总

| 分类 | 计数 | 词（pos / imp / clk；无值=NO_CURRENT_BASELINE） |
|---|---|---|
| **行业大词 8** | 有当前行 3 | `印刷` 20.32/110/1 · `印刷公司` 26.76/147/2（最大展示+2 点击）· `香港印刷` 11.63/27/2（近首页有点击） |
| | 无当前行 5 | `印刷服務`·`印刷廠`·`網上印刷`·`printing company`·`printing services`——不盲开泛词内容 |
| **采购带钱词 34** | 首页 5 | `即日印刷` 8.16/55/**2**（唯一有点击）· `食品包裝印刷` 8.53/107/0 · `small batch sticker printing` 7.29/21/0 · `書籍印刷`(歧义) 7.60/5/0 · `卒アル販売` 5.0/16/0 |
| | 10-20 位零点击优先池 8 | `印海報` 15.91/118/0 · `china catalog printing` 13.98/91/0 · `doujinshi printing` 10.53/60/0 · `小冊子印刷` 11.25/24/0 · `可移貼紙` 15.64/39/0 · `pvc シール` 15.71/24/0 · `戶外貼紙` 16.37/75/0 · `學校印刷` 18.02/53/0 |
| | 连续两窗转弱 4 | `海報印刷` 17.23/206/1 · `a2 poster` 40.0/38/1 · `教材 印刷製本` 36.95/56/0 · `コミケ 印刷`(季节) 25.74/129/0 |
| | 其余深位 | `貼紙印刷` 34.35/136/0 · `宣傳單張` 36.46/136/0 · `宣傳單張印刷` 28.17/126/0 · `書刊印刷` 33.74/129/0 · `摺頁印刷` 22.72/65/0 · `印書`(歧义) 31.05/59/0 · `包裝盒訂製` 34.45/56/0 · `紙盒印刷`/`紙盒訂製`/`禮盒訂製` 32-46 位 · `喜帖印刷` 42.59/27/0 · `貼紙訂製` 28.64/42/0 · `catalog printing china` 14.95/41/0 · `catalogs printing china` 20.4/5/0 · `small batch stickers` 15.88/51/0 · `易拉架印刷` 40.12/40/0 · `證書印刷` 10.0/7/0 · `a2印刷`(歧义) 11.18/11/0 |
| **季节/事件带钱词 8** | 有当前行 3 | `月曆印刷` 22.48/141/0 · `利是封印刷` 23.65/60/1 · `コミケ 印刷` 25.74/129/0 |
| | 无当前行 5 | `corporate holiday cards`·`business holiday cards`·`年賀状印刷`·`2027年賀状`·`貼紙订制`（简中变体） |
| **歧义词 6** | | `印書`·`書籍印刷`·`教科書印刷`·`小冊子印刷`·`a2印刷`·`large envelopes`（en/zh 跨语言或意图不唯一；结合承接与市场判读，不自行指定 locale） |

### 1.2 优先级判读（沿用 §2.1 分类用途）

1. **采购带钱词是主战场**：交易页、采购信息、内链与 CTR。首页高展示零点击 = 摘要/CTR 诊断（食品包裝印刷 107、c109 184、c109 日期 98、a1海報 56@pos1）；10-20 位 = 承接与页面价值优先（印海報/ china catalog/ doujinshi/ 學校印刷）。
2. **行业大词只做可见性**：`印刷公司`（147 imp/2 clk）与 `香港印刷`（27/2，近首页）是唯二值得跟踪的行业大词；不单独铺文，随实体与采购路径承接复测。
3. **季节词按窗承接**：月曆（Q4 高峰）、利是封（春节前）、コミケ（C109 2026-12-29~31 官方日期已核，安全截稿日 DELETE）。
4. **歧义词不派单**：`教科書印刷`/`large envelopes` 等无当前行或意图不明，不自行分配语言市场。

## 二、三站点 SEO/AEO/GEO 深度盘点（11-13 截面）

### 2.1 商业真值 P0（CT-20261113 已裁决，8 个 READY 任务）

| 任务 | owner | 范围 | 今晚消费车道 |
|---|---|---|---|
| `FIX-20261030-STICKER-ZH-TRUTH-CONFLICT` | daily | stickers category MOQ/出血/交付/统计一致（9 SKU 中 8 个 MOQ=10；食品标签 500 保留；出血默认 3mm 模板优先） | daily 21:17 |
| `FIX-20261031-FIVE-CATEGORY-TRUTH`（剩余） | daily | flyers/books/packaging/posters 剩余；不得重做 b4b0c0f2 | daily 21:17 |
| `FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL` | daily | CSV 回源+生成器；10 stickers/US$0.55 条件化；部署后重置测量窗（RESET_BY_TRUTH_FIX） | daily 21:17 |
| `FIX-20261113-CATALOG-TRUTH-RESIDUAL` | daily | MOQ 不重做；清 proof/交期/色彩（90%+/95%+→ICC 定性流程） | daily 21:17 |
| `FIX-20261030-STICKER-PRICE-THREE-LAYER` | blog-deepfix | 仅既有 zh 贴纸指南价格表；与 category 写入分离 | blog 11-14 23:47 |
| `FIX-20261030-BLOG-CERT-PHRASES` | blog-deepfix | 三语 Blog 认证声明 A/B/C 上下文清理，禁全局替换 | blog 11-14 23:47 |
| `FIX-20261113-POSTER-BLOG-TRUTH` | blog-deepfix | 首轮仅 poster-printing-guide 旧价格/时效/认证/统计/退款；常青标题另过 50-57 当量 | blog 11-14 23:47 |
| `FIX-20261113-JA-EDUCATION-C109-TRUTH` | blog-deepfix | ja 教材/校园/C109 旧承诺；官方活动事实与自有履约分离 | blog 11-14 23:47 |

**测量纪律**：真值修正以实际部署日建新 baseline，旧实验标 `RESET_BY_TRUTH_FIX`；生产、运输、proof 一律报价/订单确认；无证据数字 DELETE 或 CONDITIONAL，不以竞品值补空。

### 2.2 zh-hk（智印港）

- **已上线**：74ffa5a9（flyer 价格/教材/コミケ/A2 MOQ）、9acc3d16（海报/喜帖主 URL 分工）、b4b0c0f2（五类目真值首轮）。
- **测量窗**：海报（主 URL=category/posters，11-21 份额复测）、喜帖（意图剥离，11-21）、flyer（价格修正复测）。
- **待修（今晚起）**：stickers category 真值、flyers/books/packaging 剩余、poster-guide 旧口径清理（blog 车道）。
- **首页零点击**：食品包裝印刷 107@8.53（批 1b desc 上线后 11-13/11-20 复测）、a1海報 56@pos1（必须 SERP 证据，现 SERP_UNAVAILABLE）、大信封 40@4.22、海報印刷即日 24@9.62、海報印刷一張 21@3.10。
- **冻结**：贺卡资产、middleware 301、海报/喜帖 title 与结构（K3 已拍板主 URL 不重拍）。

### 2.3 en（ZprintPro）

- **catalog 闭环（本会话 11-09 提案 → 已上线）**：en H1 `100+`→`10+`（a33abd3b，11-09 06:51，CSV 源+生成器，单变量）；zh desc 100 起→10 本起印、ja desc 100〜→10冊〜（392c5f30，12:44，两语言独立查询粒度）；线上复核 H1=`Catalog Printing 10+ | ZprintPro` ✓、desc 10-piece MOQ ✓。**本阶段冻结新增变量**，11-18 看完整 7d，12-04 经营判断；队列 catalog-en=`remeasure`（recheck 11-28，mh=4）。剩余真值（proof/交期/色彩）走 `FIX-20261113-CATALOG-TRUTH-RESIDUAL`。
- **small batch**：21@7.29 首页零点击；11-28 前 HOLD，残留真值走 SMALLBATCH-TRUTH-RESIDUAL（部署后重置窗）。
- **doujin**：60@10.53 页 1 下沿零点击；先 SERP/装订/交付信息，不新写泛文。
- **a2 poster**：38/1/40.0 连续两窗转弱；MOQ 已修，检查 PDP/SERP 承接，不与 zh-hk 海报混为同一实验。
- **c109**（en 信息词）：184@9.65 + c109 日期 98@9.53——信息意图，官方日期答案 + citation，不强求采购 CTA。

### 2.4 ja（ZprintPro）

- **已上线**：74ffa5a9（教材 100冊から ¥1,288〜、コミケ ¥7,500 订单起价非每部单价）。
- **待修（今晚起）**：`FIX-20261113-JA-EDUCATION-C109-TRUTH`——教材/校园旧承诺清理（内部文件名、认证、退款、市场规模数字 DELETE）、C109 安全截稿日 DELETE、会场直送/DHL 时效 CONDITIONAL。
- **首页**：卒アル販売 16@5.0（销售≠印刷意图，先分清）。
- **近首页**：小冊子印刷 11.25/24/0、pvc シール 15.71/24/0、コミケ 25.74/129/0（季节）。
- **歧义**：教科書印刷 NO_CURRENT_BASELINE，不派单。

### 2.5 运行面（11-13 00:29 只读对账 + 本会话复核）

| 项 | 状态 |
|---|---|
| 调度器 | gsc Next=11-13 20:13 · weekly Next=**11-13 20:52（今晚，脚本修复后首自然验证）** · daily Next=11-13 21:17 · blog-deepfix Next=11-14 23:47；**monthly Next=12-01 / k3 Next=11-13 07:10 仍 `0x800710E0`**（管理员级调度诊断，未猜根因） |
| 数据面 | 11-12 无导出；最新 11-11 三档（数据日 11-09），7d/28d 已于 11-13 00:00 越 72h；detector 第 9 日缺失；恢复系数：官方最后 123.7%（11-03），派生 11-10 130.0% / 11-11 105.3%（CARRIED 非今日） |
| 宿主 | lane-git-commit/lane-status/lane-preflight/strategy-feedback PARTIAL+NO_OP 修复已落地，25/25 隔离测试通过；PARTIAL 不再误判 STALE |
| SERP | Bing/Google 双引擎仍被网络拦截 → **SERP_UNAVAILABLE**（首页零点击诊断证据缺口未闭合，如实登记不编造） |

## 三、按优先级执行下一步（11-13 当日 + 两周）

| 优先级 | 动作 | owner/时点 | 退出条件 |
|---|---|---|---|
| **P0** | 8 个 READY 真值任务由今晚车道消费（daily 2 批 + weekly A51 三页 title + blog 4 批）；**catalog/smallbatch 部署后重置测量窗** | daily 21:17 / weekly 20:52 / blog 11-14 23:47 | 逐任务：CSV 回源+生成器、门禁、CF 部署、线上核验、新 baseline、D1/D2、7/14/28d |
| **P1** | 首页零点击 SERP/snippet：食品包裝印刷 107@8.53 为首；SERP 出口仍不可得则维持证据缺口 | GSC 11-15 | 真实 SERP 或显式 SERP_UNAVAILABLE + FIX/HOLD 提案 |
| **P1** | 11-14 首轮复测（flyer/sticker/books + 海报/喜帖方向+真值一致性；28d BACKGROUND_ONLY） | 11-14 各车道 | 只判方向，不判胜负；无新信息缺口 NO_OP |
| **P2** | 10-20 位优先池承接与页面价值诊断（印海報/china catalog/doujinshi/學校印刷） | GSC+daily | query×page 份额 + 采购 UX 六项核对 |
| **P2** | GEO S2（固定引擎固定问题完整答案+citation URL） | 11-20..24 | S2 完成前 NO_COMPARABLE_BASELINE；普通 WebSearch 不算 |
| 承接 | 调度修复（monthly/k3 0x800710E0）+ K3 补 11-12 四档导出 + detector + index | K3/管理员 | 自然轮四方一致；不靠手动轮冒充恢复 |

## 四、本会话本轮已执行（测量闭环）

1. **catalog 提案闭环核验**：11-09 决策包的 en H1 单变量已按 K3-3 A 上线（a33abd3b），zh/ja desc 对齐已上线（392c5f30）；线上 H1/desc 复核通过；队列 catalog-en 已转 `remeasure`（recheck 11-28，mh=4，含 11-09 测量记录）。
2. **54 词全表提取**（§一）：为两周复测与车道派单提供机器可读基线。
3. **调度与数据面对账**（§2.5）：weekly 今晚为首个自然验证点；SERP 重试仍不可用。
4. **策略文件核读**：10-31 带钱词战略（交易主词由 category/PDP 承接、每轮最多 1 篇、NO_OP 合法）与 blog-deepfix 车道规则（10 条边界）与 CT-20261113 裁决继承链对齐。

## 五、边界与数据来源

- 零 `src/`、零线上页面改动、零队列状态翻转；本报告 docs-only（+重要文件副本）。
- 数据来源：`gsc-2026-11-12-money-keyword-delta.json`（54 词）· `2026-11-12-ZP-gsc-feedback.md`（PARTIAL/数据供给闸门）· `2026-11-12-ZP-daily-content.md`（NO_OP/A51 锚点）· `commercial-truth-decisions-2026-11-13.json` + 裁决 md · `strategy-task-queue.json`（10 READY）· `blog-money-keyword-queue.json`（catalog-en remeasure）· git（a33abd3b/392c5f30/74ffa5a9/9acc3d16）· 调度器 Get-ScheduledTaskInfo · 线上 curl（en PDP H1/desc、SERP 尝试）。
- SOP-10 五问：架构（CSV→生成器 vs 手改派生）已核对；K3 裁决原文（CT-20261113）为真值唯一来源；无来源数字一律 DELETE/CONDITIONAL 不估算；certNo/validUntil/issuer 策略沿用；本报告无 user-facing Markdown 渲染改动。

（本报告落 `docs/`，同步副本 `重要文件/`；不冒充 `2026-11-13-ZP-*.md` 车道命名。）
