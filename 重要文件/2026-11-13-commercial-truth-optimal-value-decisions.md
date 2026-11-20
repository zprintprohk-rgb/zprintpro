# ZprintPro D1–D6 商业真值最优值裁决与 Harness 执行方案

日期：2026-11-13  
裁决编号：`CT-20261113-D1-D6`  
机器可读执行包：`.hermes/logs/commercial-truth-decisions-2026-11-13.json`  
状态：**策略与执行包已裁决；生产页面尚未在本批修改、部署或复测**

## 执行摘要

本次不再把 D1–D6 整体留在 `WAITING_K3`。K3 已明确要求在全站盘点和竞品研究后“按最优值方案进行拍板把值更新任务策略与方案”，因此本文件对执行口径作出统一裁决：能够由既有 K3 批准、`products.ts`、真实价格表或已核验 SKU 证明的值直接继承；无法证明的价格、交期、认证、订单量、客户数、满意度、退款与配送承诺，不以竞品数字或“SEO 最优值”补空，而是删除绝对声明，或改为与规格、数量、稿件、打样、产能和运输方式绑定的报价确认。

核查同时发现，海报、small-batch、catalog、C109 的主体裁决在 10 月 30 日已经完成，部分后续修正在 11 月 8–9 日部署。此次不是重新发明第二套价格，而是继承既有批准、清理旧字段、纠正陈旧队列状态，并把剩余工作拆成有边界的生产任务。历史 `DONE` 记录不改写；已经交付的内容不重复执行；`PARTIAL` 项只处理剩余字段。

**最重要的测量修正是：真实错误的存续不能因为页面处于实验窗而被允许。** small-batch 与 catalog 的 snippet／排名实验可以 HOLD，但残留商业真值修正应作为独立批次执行；部署后重置测量窗，不把修正前后的数据混成一次 CTR 实验，也不把真值修正宣传为排名提升。

## 1. 裁决权限与真值优先级

本批的授权范围是**裁决执行口径、更新任务策略、队列与 Harness 提示词**。它不构成“本批已修改生产页”的证明，也不要求执行层在同一时间把所有变更上线。后续生产批次仍须通过项目既有的并发锁、门禁、Cloudflare 构建配额、部署与线上核验流程。

真值采用以下顺序，不允许执行车道跳过上级来源自行选择更好看的数字：

1. K3 最新明确裁决与既有已执行批准；
2. 与具体 SKU、规格、数量和币种匹配的 `src/data/products.ts` 及真实价格表；
3. 可追溯的官方活动事实、法规或制作规范；
4. 可核验的公司履约政策与产能记录；
5. 以上均缺失时，删除绝对声明或改为报价确认，**不得用竞品价格、MOQ、交期、认证或评价数字替代本站事实**。

`KEEP` 表示保留已批准口径；`REPLACE` 表示用有来源的一致口径替换旧值；`DELETE` 表示删除无证据声明；`CONDITIONAL` 表示只在规格、数量、文件、打样、产能、区域与运输方式等条件齐全时展示。若价格无法绑定“SKU＋规格＋数量＋币种＋有效日期”，优先撤下价格钩，不制造另一组短命数字。

## 2. D1——posters 海报

### 2.1 确定口径

| 字段 | 动作 | 裁决值／写法 | 依据与边界 |
|---|---|---|---|
| A2 标准数码海报 | KEEP | **10 张起，HK$16 起** | 继承 K3 2026-10-30 裁决与 `a2-posters` 当前 SKU；不得回到 HK$9／HK$12.9 |
| A1 柯式海报 | KEEP | **basePrice HK$20 起** | 继承 10 月 30 日 A1 三产品线裁决；不得把该值写成所有 A1 产品形态的唯一价格 |
| A1 喷绘成品 | KEEP | **HK$290 起** | 仅适用于喷绘成品，不含的安装／裱贴等条件须清楚展示 |
| A1 喷绘基材 | KEEP | **HK$45–56** | 仅适用于已批准的基材形态；与柯式、喷绘成品分栏，禁止合并成“A1 统一 HK$45” |
| A1 小批建模档 | CONDITIONAL | `modeled-small-batch` 与“待工廠實詢校準”不得包装成已校准普遍价格 | 价格表标识已存在；无校准前不进入 title、FAQ、schema 或 AEO 直答 |
| 标准尺寸 | KEEP | 可展示已有标准 A3–A0 规格 | 仅展示真实可选规格，不以关键词堆砌增加尺寸 |
| `3200×5000mm` 最大尺寸 | DELETE／CONDITIONAL | 没有产能证据时删除“最大”绝对值；超大尺寸改为按材质、拼接、文件与报价确认 | 不用竞品最大尺寸替代自有产能 |
| 批量价格 | REPLACE／DELETE | 只有能绑定 SKU、纸质、尺寸和数量档才保留；旧 `A2 HK$6–9／A1 HK$10–16` 等不自洽区间撤下 | 禁止从不同产品线拼接批量区间 |
| 生产、运输、proof | CONDITIONAL | **均以报价／订单确认为准**；生产与运输分开，急件以文件确认和产能为前提 | 继承 K3 2026-10-30 全站模板批准，不重新填写 3–5 天或 24h |
| 订单量、满意度、客户比例、耐候年限 | DELETE | 无正式记录或测试协议即删除，不进入正文、FAQ、schema 或 Blog | 统计数字不能作为无来源 SEO 钩子 |

### 2.2 执行边界

第一批只处理 posters 的交易页可见冲突和既有海报 Blog 的旧口径，不重做已经完成的 A2／A1 主价格裁决。`FIX-20261031-FIVE-CATEGORY-TRUTH` 已交付的 `b4b0c0f2` 保留为历史，下轮不得再次把 HK$12.9 当成未修项。海报主承接 URL 继续使用 K3 2026-11-08 已拍板的 `/zh-hk/category/posters/`，本裁决不授权 canonical、301 或主 URL 变更。

海报 Blog 中含旧价格的 title 可以改为**不带价格的常青标题**，但执行时必须逐条通过 50–57 半角当量与冻结规则，保留原 slug。不得为了消除一个旧价格，把 title、H1、正文、内链和主承接一次性全部重写。第一批建议只修 `poster-printing-guide`，其余海报文章登记后续批次。

## 3. D2——stickers 贴纸与 flyers 宣传单张

### 3.1 确定口径

| 字段 | 动作 | 裁决值／写法 | 依据与边界 |
|---|---|---|---|
| 普通贴纸 MOQ | KEEP／REPLACE | **逐 SKU 展示；普通小批贴纸 10 张起** | 当前 9 个贴纸 SKU 中 8 个为 10；删除无来源的 50／100 全类统一口径 |
| 食品标签 MOQ | KEEP | **500 张起** | `fruit-food-label-stickers` 的合法 SKU 真值，不得误删为“冲突” |
| 户外／可移 100 张起 | DELETE／REPLACE | 没有对应 SKU 依据时删除；可移贴纸按对应 SKU 的 10 张口径 | 不把“户外／可移”另造为一个没有价格表支持的 MOQ 层 |
| 小批 A4 与单枚贴纸 | CONDITIONAL | `10 A4 sheets` 与 `10 stickers／pcs` 分开，不互换 | zh 小批 A4 不机械继承 en 的 10 stickers／US$0.55 |
| 出血 | REPLACE／CONDITIONAL | **默认 3mm；已有刀模／模板时以对应模板为准** | 解决 2mm／3mm 同页冲突；特殊标签与刀模不机械覆盖 |
| 生产、运输、proof | CONDITIONAL | 均以报价／订单确认为准，分开描述；删除无条件即日、2–3／5–7 天和“打样当日” | 继承全站模板批准；若未来取得真实 SLA，再按 SKU 和条件新增 |
| 贴纸价格三层 | REPLACE／DELETE | 指南、分类卡和 PDP 必须绑定相同 SKU、材质、尺寸、数量与工艺；无法对齐的参考价表撤下价格，改成本构成与报价入口 | 不把 `basePrice` 当成所有数量档的普遍成交价 |
| 统计与交付平均值 | DELETE | 无正式统计记录即删除订单数、平均交付天数、满意度与客户比例 | 不用估算值填统计卡 |
| flyers MOQ | KEEP | **10 张起** | 当前 flyers SKU 均为 10；已部署的 100→10 不重复执行 |
| flyers 起价 | CONDITIONAL | 仅在对应 SKU／数量档明确时展示；A5 的已确认最低 basePrice 为 **HK$0.25**，旧 HK$0.18／0.14 不得作为无条件全类起价 | 卡片价格若来自阶梯价，必须标明对应条件，否则删除价格钩 |
| flyers 交期 | CONDITIONAL | 报价／订单确认，不再并列标准 3 天与 2–3 天 | 与全站模板批准一致 |

### 3.2 执行边界

`FIX-20261030-STICKER-ZH-TRUTH-CONFLICT` 负责 category 内的 MOQ、出血、交付与统计冲突；`FIX-20261030-STICKER-PRICE-THREE-LAYER` 只负责既有贴纸指南的价格表与分类／PDP 对账，移除其 category 写入范围，避免两个任务同时改同一文件。两个任务不得在同一天由不同车道写 `category-seo-content.ts`。

 flyers 与 books 的既有指南已经覆盖大量采购内容，下一轮不得为了“每周长文”重新生成同义文章。先修交易页可见真值，再检查是否还存在具体、可验证的采购信息缺口。

## 4. D3——en small-batch stickers

| 字段 | 动作 | 裁决值／写法 | 依据与边界 |
|---|---|---|---|
| MOQ | KEEP | **10 stickers／pcs per design** | 继承 K3 2026-10-30 与 `ST-004`；不写成 10 A4 sheets |
| 起价 | KEEP／CONDITIONAL | **from US$0.55**，必须带适用规格／数量条件 | 继承既有批准与 `basePrice_en`；不能展示为所有尺寸和数量的固定单价 |
| zh 小批 A4 | KEEP | 保留 zh 对应 SKU 的 `HK$38–120/A4` 条件，不套 en 的 10 stickers／US$0.55 | 市场、单位与产品形态不同 |
| proof／sample | CONDITIONAL | 类型、费用、是否需要与完成时间均以报价／订单确认为准 | 不宣传未确认的 free proof、free sample 或一小时打稿 |
| 生产与运输 | CONDITIONAL | 分开写，均以报价／订单确认为准 | 不恢复 4-day USA、DHL 2–4 日等未确认承诺 |
| 统计、退款与案例 | DELETE | 无证据的订单量、评价、100% 退款和客户案例删除 | 不由 AI 生成社会证明 |

**测量裁决**：保留 10 月 30 日部署、11 月 8 日 SERP 诊断与 11 月 28 日复测计划作为历史。若本批之后执行残留真值修正，必须以实际部署日建立新的 `truth_fix` baseline，D1／D2 做健康检查，7／14／28 天复测；原 snippet 实验标为 `RESET_BY_TRUTH_FIX`，不得继续拿旧窗判胜负。若未执行生产修正，则原 11 月 28 日 SERP 复测不变。

执行必须回到 `zprintpro-sku-seo-data.csv` 对应行，再运行 `node scripts/csv-to-sku-seo.mjs --apply`；禁止手改派生 `src/data/sku-seo-data.ts`，禁止用 `--ours/--theirs` 代替重新生成。

## 5. D4——catalog

| 字段 | 动作 | 裁决值／写法 | 依据与边界 |
|---|---|---|---|
| MOQ | KEEP | **10 copies／10+** | 继承 K3 2026-10-30；11 月 9 日 en H1、zh／ja description 修正已部署，不重做 |
| 币种与价格 | KEEP／CONDITIONAL | en 使用已确认的 USD 业务价；缺失时不以 HKD 换算冒充 USD 实报价 | 当前 `basePrice_en=4.6` 只能在匹配 SKU 条件下使用 |
| proof | CONDITIONAL | 打样类型、费用、时间与是否计入生产以报价／订单确认为准 | 删除 1h／4h 等多套无批准承诺 |
| 生产与运输 | CONDITIONAL | 分开表达，均以报价／订单确认为准 | 不再并列 at-quote 与 3–5 天 |
| 90%+／95%+ 色彩 | DELETE／REPLACE | 无测量协议、样本与容差定义时删除百分比；改为 ICC／色彩管理、文件检查与打样确认的定性流程 | 不把相对描述改写成另一种绝对准确率 |
| 认证、退款与样本承诺 | DELETE／CONDITIONAL | 无文件不宣称自有认证；退款与样本政策无正式条款即删除或报价确认 | 与 D6 旧 Blog 清理同规则 |

**测量裁决**：11 月 9 日 H1／description 单变量部署及其 11 月 14、11 月 21 日复测记录保留。若执行色彩、proof 或交期残留修正，则以新部署日重置测量窗，旧实验标 `RESET_BY_TRUTH_FIX`；禁止为了保护旧实验而继续展示互相矛盾的采购答案。

`catalog-en` 队列从陈旧的 `blocked_waiting_k3` 改为 `remeasure`，并关联 `FIX-20261113-CATALOG-TRUTH-RESIDUAL`。这不是允许立即叠加任意 title 改动，而是把“商业真值残留修正”和“snippet 实验”分成不同任务。

## 6. D5——ja 教材／校园／C109

| 字段 | 动作 | 裁决值／写法 | 依据与边界 |
|---|---|---|---|
| C109 官方活动事实 | KEEP | **2026 年 12 月 29–31 日，东京国际展示场** | 仅引用 Comiket 官方；官方日期不证明本站交付能力 |
| C109 ¥7,500 | KEEP／CONDITIONAL | 指定规格／数量的**订单起价**，不是每部单价 | 继承 10 月 30 日裁决与 11 月 8 日 `/注文` 修正 |
| C109 安全入稿日 | DELETE | 未取得生产与运输真值前不发布倒排天数或“安全截止日” | 保留入稿检查清单与官方活动日期 |
| rush／特急 | CONDITIONAL | 只在文件、规格、数量、产能与报价确认后成立，不承诺无条件 24h | 继承既有批准 |
| 会场／酒店直送、DHL 时效 | DELETE／CONDITIONAL | 不宣传未确认的会场／酒店直送；配送方式、区域、费用和时效以报价确认为准 | 官方活动物流信息不能转写成本站服务 |
| 教材／校园价格 | CONDITIONAL | 只使用匹配 SKU 的 JPY 数据，并绑定规格、数量与日期；缺失时不以 HKD／USD 换算 | 已批准的 `100冊から 基本仕様 ¥1,288〜` 只在原适用 SKU 与条件下保留 |
| 认证、退款、市场规模、月度数字 | DELETE | 无正式文件或数据来源即删除，不用于新 Blog、FAQ 或 schema | 法规可中性解释，但不能写成 ZprintPro 已获认证 |
| 内部文件名 | DELETE／REPLACE | 用户可见正文删除 `products.ts` 等内部路径，改为“按对应 SKU 规格与报价确认” | 内部证据保留在执行报告，不暴露在采购答案中 |

日本竞品将受付确定、数据检查、生产出货和送达分开，本裁决采用同样的信息架构，但不复制其营业日、价格或配送承诺。C109 已完成的主价格与 `/注文` 修正不重开；剩余任务只清理旧 Blog 和匹配 SKU 的未核实承诺。

## 7. D6——旧 Blog 无来源声明清理

### 7.1 清理规则

| 类型 | 动作 | 允许保留的内容 |
|---|---|---|
| 无来源价格、折扣、MOQ | DELETE／CONDITIONAL | 能绑定 SKU＋规格＋数量＋币种＋日期的真实价格；否则改为成本构成与报价入口 |
| FDA、SGS、REACH、ISO、LFGB 等 | DELETE／CONDITIONAL／KEEP | 自有认证与“证书可索取”无文件即删除；法规要求可中性保留；材料合规写报价／订单确认 |
| 订单量、客户数、机构数、满意度、客户比例 | DELETE | 只有可追溯正式统计才能保留；待校准标记不得直接当成用户可见成果 |
| 100% 退款、满意保证、免费样本 | DELETE／CONDITIONAL | 有正式条款才按条件展示，否则删除；不得留联系方式替代政策 |
| 交期、特急、运输与配送 | CONDITIONAL | 生产、出货、运输、送达分开；未确认时统一报价／订单确认 |
| 假案例、假评审人、虚构团队或作者权威 | DELETE | 可保留真实流程、技术与采购知识，不伪造社会证明 |
| 官方活动与公共法规 | KEEP | 必须链接官方来源，且与 ZprintPro 自有承诺分段、分 schema 表达 |

旧认证清单采用原报告的 A／B／C 处置：**A 组删除自有测试／认证声明并保留工艺知识，B 组条件化为材料与订单合规确认，C 组仅保留明确作为公共法规解释的内容**。不得对 528 个命中做无上下文全局替换；执行器必须逐段判断“自有声明”与“法规引用”，并输出 before／after 与未决项。

### 7.2 标题与结构化数据

旧价格出现在 title 时，优先改为不带价格的常青标题，而不是换成另一组可能很快过期的价格。既有 slug 不动；title 遵守 50–57 半角当量与冻结规则；正文、FAQ、meta description、结构化数据和可见答案必须一致。清理 Blog 不等于可以顺手修改主 URL、canonical、301、noindex 或贺卡资产。

## 8. 三市场官方竞品研究结论

竞品只用于验证采购信息架构和用户对条件表达的熟悉程度，不提供本站商业真值。

| 市场 | 官方页面观察 | 对 ZprintPro 的可用启示 |
|---|---|---|
| 香港 | e-print 将不同贴纸形态、尺寸、数量与交货档分开，部分产品规范使用 3mm 出血并存在产品例外。[e-print 貼紙](kimi-cite://web?url=https%3A%2F%2Fwww.e-print.com.hk%2Fproducts_Labels "citation") | MOQ 按 SKU／产品形态展示；默认出血规则必须允许模板例外 |
| 英文 | Sticker Mule 将尺寸、数量、打样与最终规格确认连成流程。[Sticker Mule](kimi-cite://web?url=https%3A%2F%2Fwww.stickermule.com%2Fcustom-stickers "citation") | 强化“起价条件＋打样类型＋确认后生产”，不借用免费或时效承诺 |
| 英文 | UPrinting 明确生产在可印文件、付款与所需 proof 批准后开始，运输另计。[UPrinting](kimi-cite://web?url=https%3A%2F%2Fwww.uprinting.com%2Fblog%2Fuprinting-faq-series-printing-turnaround-times-explained%2F "citation") | 生产、运输、送达分开；未核实天数统一报价确认 |
| 日本 | プリントパック以订单、入稿、付款与数据检查确定受付，追加加工可改变工期。[プリントパック](kimi-cite://web?url=https%3A%2F%2Fwww.printpac.co.jp%2Fglobal%2Finquiry%2Ffaq.html "citation") | 不从活动日期倒推出未经证实的安全入稿日 |
| 日本 | ラクスル将印刷方式、装订、页数、数量、数据检查与出货档分开展示。[ラクスル](kimi-cite://web?url=https%3A%2F%2Fraksul.com%2Fprint%2Fbooklet%2F "citation") | 优化规格选择器和采购条件，不以未证实特急或直送争点击 |
| 日本 | 官方出血指南通常为 3mm，同时明确部分产品需按专用规范。[ラクスル出血指南](kimi-cite://web?url=https%3A%2F%2Fraksul.com%2Fguide%2Fcreate-data%2Fknowledge-of-printing%2Fextra-length-from-trim-mask%2F "citation") | 支持“默认 3mm、模板优先”的 D2 裁决 |
| C109 | 官方公布 2026 年 12 月 29–31 日举办。[Comiket](kimi-cite://web?url=https%3A%2F%2Fwww.comiket.co.jp%2Finfo-a%2FC109%2FC109Info.html "citation") | 活动事实可保留；自有生产与跨境配送另证、另写 |

## 9. 生产执行任务与顺序

以下状态只表示**执行包已经具备裁决依据**，不是已部署。每个车道每轮只消费一个边界完整的任务；同一文件不得由两条车道同日写入。

| 顺序 | 任务 | 状态 | owner | 范围与退出条件 |
|---:|---|---|---|---|
| 1 | `FIX-20261030-STICKER-ZH-TRUTH-CONFLICT` | READY | `ZP-daily-content` | 仅 stickers category；MOQ／出血／交付／统计一致，部署后进入复测 |
| 2 | `FIX-20261031-FIVE-CATEGORY-TRUTH` | READY（剩余项） | `ZP-daily-content` | 仅剩余 flyers／books／packaging／posters；stickers 由上一任务负责；不得重做 `b4b0c0f2` |
| 3 | `FIX-20261030-STICKER-PRICE-THREE-LAYER` | READY | `ZP-blog-deepfix` | 仅既有 zh 贴纸指南价格表；与 category 写入分离 |
| 4 | `FIX-20261030-BLOG-CERT-PHRASES` | READY | `ZP-blog-deepfix` | 三语 Blog 认证声明按 A／B／C 上下文清理；禁止盲目全局替换 |
| 5 | `FIX-20261113-POSTER-BLOG-TRUTH` | READY | `ZP-blog-deepfix` | 首轮仅 `poster-printing-guide`；旧价格／时效／认证／统计／退款清理，常青标题另过门禁 |
| 6 | `FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL` | READY | `ZP-daily-content` | CSV 回源＋生成器；10 stickers／US$0.55 条件化；部署后重置测量窗 |
| 7 | `FIX-20261113-CATALOG-TRUTH-RESIDUAL` | READY | `ZP-daily-content` | MOQ 不重做；清 proof／交期／色彩残留；部署后重置测量窗 |
| 8 | `FIX-20261113-JA-EDUCATION-C109-TRUTH` | READY | `ZP-blog-deepfix` | ja 教材／校园／C109 旧承诺；官方活动事实与自有履约分离 |

`FIX-20261030-BLOG-H1-BRAND-SUFFIX` 的“全站模板去品牌后缀”不属于本次 D1–D6 商业真值授权，继续保持原审批门；其中海报旧价格已拆到独立任务，不得借模板任务重复修改。`FIX-20261031-PRIMARY-URL-MISMATCH` 与本次裁决无关，保持原状态。

## 10. Harness 学习与自进化规则

本轮升级不是让车道自由改规则，而是让它消费**可追溯的裁决、状态和复测证据**。daily、blog、weekly 三个提示词增加同一套约束：只消费 `commercial-truth-decisions-2026-11-13.json` 中已裁决字段，以及 `strategy-task-queue.json` 中 `READY` 且 `decision_record` 指向本包的任务；不得自行推导商业值，不得把裁决文档当成部署证明，不得自动 SCALE。

队列学习按以下闭环运行：

`读取既有批准与 DONE／PARTIAL → 消费裁决 → 单任务生产变更 → 门禁 → 部署 → 线上核验 → 新 baseline → D1／D2 → 7／14／28 天复测 → 保留／修正／停止`

每次复测只追加 `measurement_history`，不覆盖旧 baseline。真值修正导致的实验重置必须记录 `RESET_BY_TRUTH_FIX`；移动窗口本身不是胜负；缺部署或线上核验不得进入学习候选；同因问题只增加 recurrence，不重复建单；周／月总结继续由既有车道消费，不新增第八条 Windows 任务或 Kimi Automation。

## 11. 数据来源、审批边界与 SOP-10 自检

数据来源：

- K3 2026-11-13 指令：“按最优值方案进行拍板把值更新任务策略与方案”。
- 既有批准与执行台账：`.hermes/logs/strategy-task-queue.json`，含 `7b396bd9`、`9f7b348c`、`d450abbc`、`b4b0c0f2` 等历史记录。
- 后续部署记录：catalog `a33abd3b`、`392c5f30`；JA 教材／C109 与 EN A2 `74ffa5a9668034e47a3e93b6d0c76dac902e4c91`。
- 站内真值：`src/data/products.ts`、`src/data/category-seo-content.ts`、`src/data/price-tables/posters.json`、`src/data/price-tables/en/stickers.json`。
- 审计：`.hermes/logs/2026-10-30-blog-cert-claims-inventory.md`、`.hermes/logs/2026-10-31-five-category-truth-audit.md`、`.hermes/logs/2026-10-30-sticker-ranking-regression-diagnosis.md`。
- 外部研究：第 8 节列出的官方竞品与 Comiket 页面，检索日期 2026-11-13；未采用其数值作为本站经营事实。

SOP-10 五问：

1. **架构差异**：已区分 category、PDP、Blog、CSV→生成器和既有部署，不把派生文件当源头。
2. **约束适用范围**：本批仅 docs／queue／prompts；未授权名片展示层、贺卡资产、middleware 301、canonical 或主 URL 改动。
3. **原数据／拍板来源**：所有保留数值均回指既有 K3 批准或 SKU；无来源数字采用删除／报价确认，不估算。
4. **字段值策略**：未填 certNo、validUntil、issuer、联系方式或未确认时效；派生 SEO 数据必须回 CSV 源头。
5. **Markdown 渲染**：本文件为内部裁决；生产执行若含 Markdown 链接，必须使用项目 `parseInlineLinks()` 并通过内容门禁。

**本批完成的是“可以正确执行”的任务系统，不是“已经上线”的商业真值修复。**
