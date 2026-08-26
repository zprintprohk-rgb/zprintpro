## 1. 现状盘点：供给建设期收官与三个缺口

### 1.1 阶段判定：从供给建设进入排名变现

ZprintPro（zprintpro.com）的供给侧建设在 2026 年 8 月中旬宣告收官：600 页内容在线、品牌统一（智印雲→智印港/ZprintPro/ジープリント 三语分层）落地、6 篇 retrofit 博客全部完成、转化链路 5 步验证通过。站点当前处于"供给建设期→排名变现期"的切换点上，核心矛盾从"缺内容"切换为"缺排名激活"。

近两天（8/13-8/14）定时任务的执行结果印证了这一判断。8/13 daily cron 在 0 push 约束下完成了三件事：验证 J3 凌晨推送的 353a8fa（e-print 竞品词 26 处清扫 + 内链占比 23.2%→30.4%，超额完成 4 周计划的 30% 目标）、定位 6 个 retrofit 页面 GA4 转化事件全部断链、盘点 16 个未提交文件的积压清单。8/14 daily cron 用 1 个 push（commit 27f0c7f）完成"三合一"交付：§11 名片禁区文案清扫 32 hits 清零（zh-hk.json 20→0 + ja.json 12→0）、6 个 retrofit 页 GA4 事件修复后 6/6 verified、16 个积压文件全部 bundle 提交，9 步真 verify 全部 PASS。月 push 累计约 25/150，配额余量充足。

**表1：8/12-8/14 定时任务核心交付**

| 日期 | commit | 交付内容 | verify 状态 |
|------|--------|---------|------------|
| 8/12 | e06c1d0 / b77cddf / f0dd885 / 232ece5 | 品牌统一 batch 1+2（53 文件 101 类旧 label 清零 + products.ts 985 处智印雲替换）+ §11 名片禁区 150 处清零 + CF Web Analytics 挂载 | PASS |
| 8/13 | 353a8fa（J3 03:40） | e-print 竞品词 26 处清扫 + 内链占比 23.2%→30.4% | PASS（CF run 94229774541） |
| 8/14 | 27f0c7f（M3 09:25） | §11 名片清扫 32 hits 清零 + 6 retrofit GA4 修复 + 16 files bundle（21 文件） | PASS（CF run 94646110146，9 步真 verify 9/9） |

但供给完成不等于流量兑现。GSC 直连 28 天数据（8/12 拉取）显示全站 10,989 imps / 475 页，环比上一窗口仅 +2.8%，几乎持平。retrofit 组合拳已被证明对博客页有效：a5-vs-a6-flyer-size 排名 7.4、doujin-guide 排名 5.8，两篇均进入 Google 第 1 页并开始拿点击；而真正的钱页——类目页——仍卡在第 4-5 页（zh-hk flyers 类目排名 45.4、posters 类目排名 43.6）。44 imps × 排名 45→10 的爬升空间，比再写 50 篇新博客的变现效率更高，这就是"排名变现期"的判断依据。

### 1.2 三市场结构：HK 收割、JP 种子、US 冷启动黑洞

GSC 4 市场导出（窗口 2026-08-04 至 08-10，7 天）揭示了高度失衡的市场结构：78% 的点击集中在 HK 单一市场，且进一步集中在单一着陆页；US 市场 544 imps 零点击，是占全站 17% 展示量的冷启动黑洞。

**表2：4 市场 7 天数据对照（2026-08-04 至 08-10，GSC 导出）**

| 市场 | 点击 | 展示 | CTR | 平均排名 | 状态 |
|------|------|------|-----|---------|------|
| 中国香港 | 38 | 1514 | 2.51% | 21.6 | 收割期主战场（占总点击 78%） |
| 日本 | 7 | 385 | 1.82% | 28.8 | 种子期（移动端排名 13.0 接近首页） |
| 美国 | 0 | 544 | 0.0% | 37.2 | 冷启动黑洞（占总展示 17%） |
| 汇总 | 49 | 3203 | 1.53% | 26.5 | 覆盖 82 国家/地区 |

HK 的结构性问题是"38 个点击集中在 1 个着陆页"：唯一有点击的页面是 /zh-hk/category/posters/（1 click / 44 imps / CTR 2.27%），其余高展示着陆页全部零点击——/zh-hk/product/a2-posters/（85 imps，排名 22.2）、/zh-hk/category/stickers/（84 imps，排名 37.5）、/zh-hk/product/a5-flyers/（70 imps，排名 39.8）、/zh-hk/category/flyers/（70 imps，排名 49.0）、/zh-hk/category/packaging/（65 imps，排名 37.2）。这不是排名问题，是 meta description 集体失效导致的 CTR 问题：月曆印刷排名已到 19.4、餐牌印刷排名 15.8，均为零点击，说明即使排进第 2 页也没有用户愿意点击。

JP 呈现"移动强、桌面弱"的分裂结构：移动端平均排名 13.0（接近首页），桌面端排名 37.0，拖累整体至 28.8。品牌词 ジープリント 在 8/9 拍板后 5 天仍是 0 收录。US 则是纯粹的 CTR 危机：排名 8-89 位均有分布（small batch stickers 排名 7.2、exercise book printing business 排名 16.8），全部零点击，根因诊断为 meta 文案与 US 搜索意图错位（页面强调 Asia factory，US 用户找的是 fast / free sample / no minimum）。

### 1.3 三个缺口：排名卡位、GEO 实体闭环、B2B 度量盲区

缺口一：类目页排名卡位。zh-hk 主营词有真实搜索需求但排名全部在第 4-6 页：宣傳單張排名 37.2、月曆印刷排名 19.4、貼紙印刷排名 37.8、海報印刷排名 29.8、餐牌印刷排名 15.8。28 天口径下 宣傳單張印刷 350 imps 排名 57.2、貼紙印刷 151 imps 排名 55.1。这是全站点确定性最高的排名提升空间。

缺口二：GEO 实体闭环被 K3 输入阻塞。Batch B 三输入（X URL / LinkedIn URL / IndexNow key）截至 8/14 已 PENDING 5 天以上，IndexNow 实测返回 415（key 未配置）。ジープリント 30 目录提交、Organization sameAs 闭环全部卡在这一步。7/29 AI 可见性基线测试 0/7 query 被引用，8/14 凌晨 4 引擎自测仅 1/4 命中。

缺口三：B2B 询盘漏斗度量盲区。Supabase SERVICE_ROLE_KEY 截至 8/14 已 PENDING 6 天，北极星三引擎中权重最高的 B2B 复购引擎（50%）至今无法度量询盘数。6 个 retrofit 页的 GA4 事件虽已在 8/14 修复为 6/6 verified，但没有询盘读数，8/21 双周复盘只能看流量侧。此外 §11 名片禁区仍有 57 hits 残留（sku-seo-data.ts 28 + category-seo-content.ts 20 + case-studies 9），是 8/18 验收日的硬风险。

## 2. 竞品对标：2026 头部印刷电商的 SEO/GEO 打法与 Q4 战术

### 2.1 五大竞品策略画像

2026 年的头部印刷/定制包装电商已分化为四种可辨识的打法：品牌提及型、内容权威型、B2B 结构化型、AI 搜索专岗型。

Sticker Mule 走品牌提及路线：依靠极高的品牌提及率与用户生成内容维持 GEO 优势，Q4 不做大幅折扣，以 Free Samples 与 Fast Shipping 服务维持品牌忠诚度@@REF_3@@。Ahrefs 2026 研究显示品牌提及与 AI 引用的相关性是反向链接的 3 倍，Sticker Mule 在这一维度上的积累构成其 GEO 护城河@@REF_6@@。其商业基本盘依然稳固：Similarweb 2026 年 6 月数据显示 stickermule.com 在 Printing & Self Publishing 类别排名全球第 6。

Vistaprint（Cimpress）走内容权威路线：用庞大的小企业营销指南库（假日营销技巧、Black Friday 准备清单）占据信息类搜索首位，并通过发布行业报告增强 E-E-A-T，Q4 推出 Print Your Possible 品牌平台@@REF_4@@。

Printful 走内容营销+比较页面路线：通过"Printful vs Printify"类比较页面与解决方案指南捕获高意图流量，Q4 提前发布 Black Friday/Cyber Monday 营销指南，强调定制包装与品牌 Inserts 作为假日季差异化卖点@@REF_30@@。

Packlane 走 B2B 垂直结构化路线：针对 custom mailer boxes、FDA approved packaging 等高商业价值词优化，用结构化数据标记产品参数，让 AI 引擎能直接提取其低 MOQ 优势@@REF_15@@。

StickerGiant 是 5 家中 GEO 动作最激进的：设立专门的 AI Search Strategy 角色优化网站以适配 AI 检索，Q4 实施早期 Black Friday 促销（11 月上旬 25% 折扣）锁定大额订单，并用 Refer a Friend 计划（双方获 25% 优惠）与免费设计支持降低决策门槛@@REF_35@@。

**表3：五大竞品 SEO/GEO 打法与 Q4 策略对照**

| 竞品 | Q4 核心策略 | 卖点布局 | GEO/SEO 亮点 |
|------|------------|---------|-------------|
| Sticker Mule | 品牌忠诚度，少折扣重服务@@REF_3@@ | Durability / Free Samples / Fast Shipping@@REF_3@@ | 极高品牌提及率@@REF_6@@ |
| Vistaprint | 权威指南 + AI 创意平台@@REF_4@@ | One-stop Shop / AI Logomaker@@REF_4@@ | 行业报告增强 E-E-A-T@@REF_4@@ |
| Printful | 内容营销引导，强调品牌化包装@@REF_32@@ | Custom Packaging / Branded Inserts@@REF_32@@ | 比较页面与解决方案指南@@REF_30@@ |
| Packlane | B2B 垂直优化，结构化数据@@REF_15@@ | Low MOQ / FDA Compliance / Quick Proofing@@REF_15@@ | 产品参数结构化标记@@REF_15@@ |
| StickerGiant | 早期折扣（25% Off）锁定大额订单@@REF_36@@ | Refer a Friend / Free Design Support@@REF_37@@ | 专门 AI 搜索策略角色@@REF_35@@ |

### 2.2 对 ZprintPro 的差异化启示

竞品对标的第一个启示是 GEO 竞争已经开始组织化：StickerGiant 设立 AI 搜索专岗说明头部玩家已把 GEO 当作独立职能而非 SEO 的附属@@REF_35@@。ZprintPro 的 Agent 集群（M3/J3/verifier）在组织形态上实际领先于多数竞品，但缺少"GEO 专岗"的职责切分，建议在第 7 章的集群编成中补齐。

第二个启示是 Q4 存在内容空档：Sticker Mule 不做黑五折扣（维持 $1/10 引流款 + 全场免运策略），"black friday sticker deals / holiday sticker deals"类搜索词缺少头部供给；StickerGiant 的早期 25% 折扣@@REF_36@@ 与 Printful 的定制包装内容@@REF_32@@ 都证明 11 月上旬是抢占窗口的时点。ZprintPro 的 Q4 内容攻势（12 篇起）正好切入这一空档。

第三个启示是错位竞争空间：头部竞品靠本土 4 天交付 + 全场免运获客，ZprintPro 的"亚洲工厂 + DHL 全球 2-4 天 + 100 MOQ + 免费设计"组合在本土时效上处于劣势，但在跨境小批量定制（包装市场小批量趋势：MOQ 降至 300-500 件、交付压缩到 7-12 天）与价格带上具备错位空间。打法上应避免与 Sticker Mule 拼时效，转而强化"免费设计 + 低 MOQ + 全球配送"的三语本地化表达。

## 3. GEO 实证战术：2026 研究数据下的杠杆排序

### 3.1 六大战术效果量排序

2026 年的 GEO 研究已能给出可量化的战术效果排序。以下六项战术均有实证数据支撑，按对 AI 引用率的影响强度排列。

**表4：GEO 战术实证效果排序（2026 研究）**

| 战术 | 实证效果 | 来源 |
|------|---------|------|
| 品牌提及（Brand Mentions） | 与 AI 引用相关性 0.664，为反向链接（0.218）的 3 倍；顶级品牌 AI 引用量为第二梯队 10 倍以上@@REF_6@@ | Ahrefs（2026） |
| 添加可验证引文 | AI 引用率相对增益 41%@@REF_1@@ | Martinez（2026） |
| FAQ Schema | 带 FAQ 标记页面在 AI 概述中被引用几率提高 41%@@REF_5@@ | Ransen（2026） |
| 添加统计数据 | AI 引用率从 19.3% 提升至 25.2%@@REF_1@@ | Martinez（2026） |
| 内容新鲜度 | AI 引用内容平均比有机结果新 25.7%（约 368 天）@@REF_6@@ | Ahrefs（2026） |
| hreflang 修复 | 多语言站 SEO 点击 +28%、CTR +12%@@REF_25@@ | TenStrat 案例 |

这组数据有三个值得深究的含义。其一，品牌提及的相关性（0.664）是反向链接（0.218）的 3 倍@@REF_6@@，意味着 GEO 时代的"外链建设"应该重定义为"品牌名称的全网一致性出现"——无论是否带链接。这直接改变了 ZprintPro 30 目录提交的目标函数：目录的价值不在链接权重，在于让"智印港 / ZprintPro / ジープリント"以 NAP 一致的形式出现在更多页面上。其二，引文与统计数据两类"可引用性改造"合计能带来 41% 的引用增益与 6 个百分点的引用率提升@@REF_1@@，而这两项恰恰是纯内容工程，不需要任何外部输入，是 Agent 集群可以完全自主执行的。其三，AI 引用内容比有机结果平均新 25.7%@@REF_6@@，为"内容定期刷新"提供了量化理由——这正好接入 weekly-meta-refresh cron 的职责扩展。

结构化数据是 AI 提取的直接原料：Product / Organization / FAQPage 的 JSON-LD 标记中，price、availability、reviewRating 字段能被 AI 引擎直接提取用于比较@@REF_13@@。ZprintPro 已有 Product schema 全量覆盖（8/11 补全 validFrom 等 6 字段），下一步是把 FAQPage schema 从博客扩展到 14 个类目页。

### 3.2 对 ZprintPro 的战略含义：llms.txt 降级与可引用性转向

内部实证与外部研究指向同一个结论：llms.txt 路线应降级维持，GEO 资源转向可引用性建设。内部数据：5.15 亿次 AI 爬虫流量中仅 408 次命中 llms.txt，占比在统计上可忽略；llms.txt 采用率 18 个月仅 10.13%。外部研究：结构化 Schema + 权威内容在 AI 引擎引用概率提升 3-7 倍；AI 引荐流量转化率 14.2%，是 Google 自然流量转化率 2.8% 的 5 倍；被 AI 引用的品牌点击 +35%；ChatGPT 流量份额一年内从 77.6% 降至 53.7%，Gemini 从 7.3% 升至 26.7%，是增长最快的 AI 入口。

由此得出 GEO v3.0 的三条执行原则：第一，llms.txt 三语版本维持现状（零边际成本）但不再追加投入；第二，GEO KPI 从"llms.txt 读取量"改为"AI 答案中的品牌提及数"，监测 4 引擎（ChatGPT / Gemini / Perplexity / Google AI Overview）每月复测，基线 8/14 为 1/4；第三，GEO 资源投向三处——品牌提及一致性（Batch B 三输入解锁后执行）、FAQPage schema 扩展到类目页、内容中系统性埋入带来源的统计数字（每篇 v8 博客至少 3 个可引用数据点）。

## 4. 类目页排名攻坚：第 4-5 页到首页的实证手段

### 4.1 内链权重：确定性最高的排名杠杆

Zyppy 的实证研究给出了内链与流量的量化关系：拥有 40-44 个内链的页面，其 Google 搜索流量是只有 0-4 个内链页面的 4 倍；至少包含一个精确匹配锚文本的页面，流量是无精确匹配页面的 5 倍@@REF_2@@。

ZprintPro 的内链建设已走过第一阶段：8/12 补链将内链占比从 9.4% 提到 23.2%，8/13 J3 进一步提到 30.4%（超额完成 4 周计划的 30% 目标）。但对照 Zyppy 数据，当前的内链结构还有两个改进方向：一是内链总量尚未达到 40-44 条/页的流量倍增区间，6 篇 retrofit 博客共 240 条内链中指向类目页的占比需要审计（目标 ≥30%）；二是锚文本需要从泛化词升级为本地化精确匹配——en 站用 custom stickers、ja 站用 カスタムステッカー、zh-hk 用 貼紙印刷，从首页与高权威博客直接指向 flyers / posters / packaging 三个目标类目页。retrofit 博客进第 1 页的事实（a5-vs-a6 排名 7.4、doujin-guide 排名 5.8）已证明"v8 改造 + 内链"组合拳有效，缺的只是把同样的火力对准类目页。

### 4.2 Meta CTR、FAQ Schema 与 Core Web Vitals 组合拳

HK 市场的诊断结论明确：高展示着陆页零点击的根因是 meta description 集体失效。修复方案是 12 个着陆页的 meta 重写（HK 7 页 + US 5 页），一次 commit 即可完成，风险为零（只改 description 不影响排名结构），预期 HK 7 页 460 imps 从 0 click 爬到 10 click 以上、US 5 页 170 imps 爬到 2 click 以上。

**表5：HK/US 待修复高展示着陆页清单（GSC 7 天窗口）**

| 页面 | 市场 | 展示 | 平均排名 | 修复动作 |
|------|------|------|---------|---------|
| /zh-hk/product/a2-posters/ | HK | 85 | 22.2 | meta 重写（A2 海報 30 秒報價） |
| /zh-hk/category/stickers/ | HK | 84 | 37.5 | meta 重写（防水/透明/圓角） |
| /zh-hk/product/a5-flyers/ | HK | 70 | 39.8 | meta 重写（100 張起印） |
| /zh-hk/category/flyers/ | HK | 70 | 49.0 | meta 重写（A4/A5/A6 長條） |
| /zh-hk/category/packaging/ | HK | 65 | 37.2 | meta 重写（禮盒/食品級） |
| /en/product/small-batch-stickers/ | US | 55 | 48.4 | meta 重写（50 min MOQ / Free Sample） |
| /en/product/saddle-stitch-booklets/ | US | 54 | 83.2 | meta 重写（8-96 pages / Ships in 5 days） |
| /en/product/catalog-printing/ | US | 30 | 30.8 | meta 重写（Perfect Bound + Saddle Stitch） |

FAQ Schema 的双重收益使其成为第二优先动作：既提升传统 SERP 的 CTR，又把页面在 AI 概述中的引用几率提高 41%@@REF_5@@。HK 5 个高频类目页（flyers / stickers / posters / packaging / calendars）应各加 3-5 个高频 FAQ（MOQ、交期、运费、打样），与 §13.15 的 sharp hook 布局（Free Shipping / Free Design / No Minimum / Fast Turnaround）对齐。

Core Web Vitals 在 2026 年仍是 Google 核心排名因素：LCP 应控制在 2.5 秒以内，INP 低于 200 毫秒@@REF_21@@；优化 CWV 后电商站转化率提升幅度达 8-100%@@REF_23@@。JP 桌面端排名 37.0 与移动端 13.0 的巨大落差，提示桌面端 CWV 体检是 JP 市场的免费杠杆。

### 4.3 多语言特有杠杆：hreflang 修复

TenStrat 案例实证：修复错误的 hreflang 标签可使多语言电商站的 SEO 点击量提升 28%、CTR 提升 12%@@REF_25@@。这是三语站点独有的免费杠杆，且与 ZprintPro 的架构高度相关——8 locale、三套独立 sitemap、zh-hant-HK / en / ja-JP / x-default 的 hreflang 矩阵。

执行建议是对全站 hreflang 做一次双向审计：每个 zh-hk / en / ja 页面是否都有指向另外两个语言版本的双向 hreflang，x-default 是否正确指向 zh-hant-HK，以及 301/308 重定向后的 URL 是否与 hreflang 声明一致（8/12 发现的 next-intl 308 行为变化需要纳入检查，K3 已拍板 A 方案接受 308，Google 官方声明 308 与 301 在权重传递上等价）。审计发现错误即修复，预期收益参照 TenStrat 的 +28% 点击量@@REF_25@@，审计本身不产生 push。

## 5. Q4 窗口时间节奏：关键词需求曲线与部署排期

### 5.1 三类需求窗口精确时间表

Q4 假日季是印刷电商全年最大的需求峰，2026 年的窗口节奏已有明确数据。

**表6：Q4 关键词需求窗口时间表（2026）**

| 关键词类别 | 启动期 | 峰值期 | 对应动作 |
|-----------|--------|--------|---------|
| Holiday Packaging / Custom Boxes（B2B） | 7-8 月备货下单@@REF_7@@ | 11 月中旬至 12 月初@@REF_39@@ | 8 月已应发布 B2B 备货指南 |
| Holiday Packaging（C 端搜索） | 9 月下旬@@REF_19@@ | 11 月中旬至 12 月初@@REF_39@@ | 9/15 前内容全部在线 |
| Christmas Stickers / Gift Labels | 9 月（DIY 人群开始浏览）@@REF_9@@ | 10 月中旬至 11 月中旬@@REF_10@@ | 9 月上线系列页面 + FAQ Schema |
| Black Friday / Cyber Monday | 10 月预热 | 11 月第三周（黑五当周）@@REF_11@@ | 10 月内链建设 + 预热页 |

一个反直觉的发现：holiday packaging 的 B2B 备货期在 7-8 月@@REF_7@@——品牌方与大型企业为确保纸厂产能提前数月下单@@REF_39@@——这意味着 ZprintPro 面向 B2B 的 Q4 内容窗口实际上已经打开，而非等到 9 月。当前已是 8 月中旬，B2B 备货指南类内容应列为 Q4 首批写作的最高优先级。

### 5.2 部署节奏：9/15 硬截止的倒推排期

从搜索峰值倒推：C 端 holiday packaging 搜索 9 月下旬启动@@REF_19@@，为新页面留 2-3 周索引爬升期，内容必须在 9/15 前全部上线——这是未来 4 周唯一的硬截止，篇数可砍、日期不可拖。

倒推排期：8/15-8/17 完成 Q4 首批最强 2 篇写作（礼品包装盒 + 节庆纸袋）；8/18 验收日同时上线首批 4 篇（合批 1 push）；8/20-8/26 完成首批剩余 4 篇 + 二批 4 篇写作；8/25 首批 8 篇全部在线核验（sitemap + IndexNow，IndexNow key 待 K3 解锁）；9/1 前二批全部上线；9/2-9/15 为补漏缓冲期。内容主题对齐竞品空档：Black Friday sticker deals（Sticker Mule 不做折扣留下的空档）、holiday packaging B2B 备货指南、Christmas stickers DIY 指南、电商旺季包装（对应 Printful 的定制包装内容方向@@REF_32@@）。写作采用并行 Agent 集群（每篇 1 个 writer agent + 共享禁区检查表：0 名片 / 0 supplier origin / zh-hk 纯繁体），push 严格串行合批（每日 ≤1）。

## 6. 战略方向 v3.0：三引擎权重不变下的打法升级

### 6.1 北极星与三引擎再确认

北极星目标维持 12 个月月营收 $20,000，三引擎分担维持 B2B 复购 50%（$10,000）+ SEO 自然 35%（$7,000）+ GEO AI 引用 15%（$3,000）。数学模型未变：混合客单 $150 假设下需约 133 单/月，自然流量转化率 1-2% 需日均 220-440 organic UV，而当前月点击仅 18-49，纯 SEO 存在 370 倍以上的点击缺口——这决定了必须叠加高 AOV B2B 单（AOV 从 $150 拉到 $400+）、复购/订阅（1 个餐飲连锁客户 = 每月 5-10 单）与 GEO AI 引用带来的直接流量。K3 8/10 拍板不做付费投放的结论继续有效（ROAS 2.5 时每单净亏 3%）。

当前真实位置：月营收基线约 $14，全站自然 CTR 0.36%（28 天口径）至 1.53%（7 天口径）。阶段判定更新为：筑基期供给目标已超额完成，8 月下旬-9 月的主战场切换为四大战役，三引擎权重不变但打法从"建设"切换为"激活"。SEO 从 retrofit + 品牌统一切换为类目页排名攻坚 + Q4 内容攻势；GEO 从实体一致性 + llms.txt 切换为可引用性建设（schema 全覆盖 + 内容埋数据点 + 品牌提及闭环）；B2B 从转化链路验证切换为询盘读数接入与首单转化。

### 6.2 下一阶段四大战役

**表7：8 月下旬-9 月四大战役**

| 战役 | 目标 | 决定性动作 | 验收指标 | 时点 |
|------|------|-----------|---------|------|
| HK 类目页 CTR 修复战 | 12 着陆页 meta 重写 | HK 7 页 + US 5 页 meta 重写（1 push）+ 5 类目页 FAQ Schema | 8/20 复测：HK 7 页总 click ≥10、US 5 页总 click ≥2 | 8/15-8/20 |
| Q4 内容攻势战 | 12 篇 Q4 内容 9/15 前全上线 | 并行 writer 集群写作 + 串行合批 push + IndexNow 提交 | 8/25 首批 8 篇在线、9/15 全部在线 | 8/15-9/15 |
| GEO 实体闭环战 | Batch B 解锁 + 品牌提及建设 | X/LinkedIn/IndexNow 三输入落地 + 30 目录 NAP 一致提交 + 每篇内容 3 个可引用数据点 | 9/9 品牌词总展示 ≥20 / 总点击 ≥8；AI 自测 ≥2/4 | 8/15 起 |
| B2B 度量点火战 | 询盘漏斗可读数 | Supabase 接入 + GA4 事件复测 + 首批 Tier A 客户接触 | 8/21 复盘可输出询盘数；询盘 ≥5 即点火 | 8/15-8/21 |

四大战役的排序逻辑：CTR 修复战成本最低（1 push、零风险）、见效最快（meta 改 1 行对排名 15-20 位的词立竿见影），且是 8/21 双周复盘的数据基础；Q4 攻势战有硬截止约束；GEO 与 B2B 两战依赖 K3 输入解锁，解锁后立即自动执行。

## 7. 执行层建议：autoclaw 目标模式与 Agent 集群编成

### 7.1 目标模式：月度 goal 与可测闸门

8/12 验收日已证明"目标模式 + 集群"的执行力（4 小时完成原需数日的 16 项交付）。下一阶段的升级是把北极星月目标翻译成带可测闸门的 autoclaw goal，每个闸门有 curl / GSC 可验证判据，杜绝"自报完成"（cron 自报永不采信，必走 5 步真 verify + verify-deploy.mjs，这是 8/13-8/14 日报反复验证的纪律）。

9 月 goal 建议：zh-hk flyers / posters 类目页平均排名 45→25 以内（GSC 28 天窗口验证）+ Q4 内容 12 篇上线（sitemap + curl 200 验证）+ 询盘读数接入（Supabase 查询返回真实行数）。每个闸门写成可执行断言，goal 完成度以断言通过率计，不以报告文字计。

### 7.2 Agent 角色分工与三条集群纪律

**表8：Agent 角色分工与任务匹配**

| 角色 | 职责 | 适配任务类型 | 运行模式 |
|------|------|-------------|---------|
| writer agent | Q4 内容写作（每篇 1 agent + 共享禁区检查表） | 篇间独立的内容生产 | 并行集群，push 串行合批 |
| retrofit agent | 加权队列博客改造（单篇内链路耦合高） | retrofit 第二波（70 篇 backlog） | 单会话 goal mode，每篇独立 |
| verifier agent | curl 200 + schema 注入 + 5 步真 verify | 复盘/验收（8/18、8/21） | 5 路交叉核验集群 |
| data agent | GSC 周三 15:00 拉取 + 双窗口对比 + 排名变化标红 | 数据监控 | cron 标准动作 |
| K3-interface agent | 每周日把待 K3 输入打包成 30 分钟决策卡 | 人类决策带宽管理 | 周日定时 |
| GEO monitor agent | 4 引擎品牌提及月度复测 + 目录提交跟踪 | GEO 可引用性监测 | 月度任务 |

三条集群纪律（从 8/11-8/14 执行中提炼）：第一，锚点替换类脚本必须带断言——8/12 补链执行中 6 次锚点失配证明无断言的批量替换不可信；第二，并行写作 agent 的产出必须过统一 pre-commit 闸门（scan-simplified + 禁区 grep + npm run build），不许各自为政；第三，台账只写 push-ledger.csv 单一口径，集群产出报告不另立计数。8/14 autoclaw v17 出图事故（credits 耗尽 + 239 张图丢失，336 张仅 3 张幸存）补充了第四条教训：大批量后台任务必须有增量落盘与断点续跑机制，且 AI 出图不得直接上 PDP（印刷产品需 CMYK + 出血 + 工艺标注层，K3 8/11 拍板维持 F1 设计师外包 + F4 代码生成兜底路线）。

### 7.3 解锁清单：K3 决策批与配额纪律

当前执行体的空转风险集中在 8 项待拍板事项上，应固化为每周日决策批（K3-interface agent 打包，30 分钟可清）：§11 残留 57 hits 清理方案（建议渐进清理，9 SKU 逐个 commit 与 Q4 写作并行）；retrofit 加权队列 #1（flyer-sizes-compared 276 imps）执行者归属；Batch B 三输入（X URL / LinkedIn URL / IndexNow key，PENDING 5 天以上，GEO 实体闭环唯一阻塞）；Supabase SERVICE_ROLE_KEY（PENDING 6 天，8/21 复盘前置）；5 SKU 优化顺序；1 PDP 转化审查候选；10:15 daily cron Q-005 运行确认；F1 设计师 brief 进度确认。

配额纪律维持现状：每日 ≤1 push、攒批合批、amend 月上限 2 次（本月已用满，后续走 revert + 重做）、push 后必跑 verify-deploy.mjs。月度 push 预算测算：8/15-8/31 约 10-12 push（Q4 内容 2-3 篇/push、清扫与 retrofit 合批），月累计预计 ≤70/150，余量充足。执行产能不是瓶颈，人类决策带宽才是——这正是把自主 backlog 做厚（加权队列 70 篇）+ 决策攒批的制度意义。

## 8. 风险清单与校准里程碑

**表9：风险与止损对照**

| 风险 | 等级 | 止损动作 |
|------|------|---------|
| K3 输入持续滞后，GEO/询盘闭环无限延后 | 高 | 周日决策批制度；Batch B 三输入 5 分钟可完成；8/15 EOD 仍不拍则 M3 按默认方案推进可自主项 |
| Q4 二批拖过 9/15，错过 10 月索引窗口 | 高 | 砍篇数不砍日期：保礼品包装盒/节庆纸袋/圣诞贴纸/holiday packaging 总纲 4 篇最强 + 二批头部 |
| 类目页排名长期不动（内链权重不足） | 中 | 9 月内链审计：240 条 retrofit 内链中指向类目页占比 <30% 即补链 |
| AI 零点击持续侵蚀 SEO 排名红利 | 高 | GEO 双轨对冲，不单一押注排名；AI 引用流量转化率 5 倍于自然流量是独立增量赛道 |
| §11 残留 57 hits 拖到 8/18 验收日 | 中 | 渐进清理与 Q4 写作并行，8/18 全站 grep 验收 = 0（图片文件名白名单除外） |
| B2B 复购引擎跑不通，$20k 不可达 | 中 | 季度复盘若 B2B 线索 <5，下调目标到 $12-15k，加重 GEO 引用与直接流量 |

两个校准里程碑是不可提前收割的纪律线：8/21 双周复盘为趋势检查点（校准值按排名期望 ×0.5-0.7 打折，zh-hk 考核 CTR/转化，en/ja 只看 imps 环比），前提是 Supabase 读数在 8/15-8/20 之间接入；9/21 为 en/ja 打通满 3 个月后的首次正式校准，在此之前 en/ja 只投内容基建、不投转化资源。GEO 侧的复测节奏同步锚定：8/23 ジープリント 30 目录提交完成后复测品牌词收录（期望 ≥1 imp），9/9 品牌词总展示目标 ≥20、总点击 ≥8，AI 引擎自测从基线 1/4 向 2/4 爬升。

战略方向一句话收束：供给建设期已收官，排名变现期的胜负手不在新增供给量，而在三件事——把 HK 高展示零点击页面的 meta 修好（1 push 的确定性收益）、把 Q4 内容在 9/15 前铺进索引（有硬截止的窗口红利）、把 Batch B 与 Supabase 两个 K3 输入解锁（GEO 闭环与 B2B 度量的总闸门）。执行产能与配额余量都已就位，8/15 起每日 1 push 的节奏足以在 9/21 正式校准前完成全部四大战役的第一轮。
