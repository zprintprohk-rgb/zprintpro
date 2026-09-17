# K3 指令 v10 — 获客×SEO 双引擎战略升级（30-90 天总计划 v2 Addendum）

> 2026-09-17 06:40 K3 大脑签发 · 拍板来源：老板 9/17 06:09「深度思考拓客方案+自动化执行+30-90 天战略全面升级」
> 基础文件：deepseek《全球印刷资讯→客户开发+SEO/AEO/GEO 切入方案》(commit 266d65d8) + masterplan v1（2026-09-09，仍然有效，本卡为 v2 升级件）
> 执行层：deepseek harness（唯一）

## 一、deepseek 方案评估（先评分，再升级）

**评分：A-（88/100）**。方法论提炼（客户金字塔/信号四类/七洞察）扎实，缺口分析以 139 条实证线索为据（§0.23 合规）。
**扣 12 分的 3 个缺口（本卡补齐）**：
1. **归因断层**：话术带深链但没带 UTM—— outbound 询盘进 008 后与 organic 混在一起，北极星「周真实询盘数×赢单标记」会被污染，无法判定获客车道 ROI
2. **权威建设缺失**：方案只有「触达」没有「被引用」——GEO 时代站外实体信号（引用/目录/品牌搜索）是排名与 AI 推荐的硬通货，雷达独有数据是未被变现的 linkable asset
3. **队列冲突未解**：6 篇新 blog 与 daily-content 既有队列（8 锁词/月曆季收尾/GSC 4 簇补词 9/14 已派）撞车，无排序规则

## 二、拍板清单 6 项终裁

| # | 事项 | 终裁 |
|---|------|------|
| 1 | 第一批 6 篇 en blog | ✅ **P0 三篇批，P1 三篇缓 2 周**（理由见 §四队列规则） |
| 2 | 话术嵌站内深链 | ✅ 批，**必须带 UTM**（§三-2 spec，无 UTM 不上线） |
| 3 | /unsubscribe 三语页部署 | ✅ 批，**P0 前置**——它是 auto_send 与任何邮件触达的合规前提，先于一切触达动作 |
| 4 | 雷达 auto_send 开启 | ❌ **维持 OFF**。首轮 10 封人工复核发出 → 回复率/退订率达标（回复≥5%、退订≤2%）后再议；邮件域名信誉是新资产，烧了就没了 |
| 5 | 雷达高频词→matrix 周写入 | ✅ 批，并入 gsc-feedback cron（22:43，不新建任务） |
| 6 | 缺口品类 blog vs 类目页 | ✅ **先 blog**（deepseek 建议正确）。注：作业本 exercise-books SKU 已存在，缺口是 en 内容不是类目；zines 挂 books 簇、journals 挂 books 簇做内链，不新建类目 |

## 三、masterplan v2 升级：新增 Lane O（主动获客车道）

v1 是单引擎（SEO 内容）。v2 = **双引擎：Lane C（内容，既有 5 cron）+ Lane O（获客，本卡新建）**。

### Lane O 五环自动化（在 deepseek 闭环图上补 2 个硬 spec）

```
雷达采集(已自动) → 分级+草稿(已自动) → 话术深链+UTM(本卡 spec) → 询盘回填008(归因字段) → 高频词→matrix(并 gsc-feedback)
```

**Spec 1 — UTM 深链标准（话术上线前强制）**：
```
/zht-hk/quote/?utm_source={reddit|linkedin|quora|email|wa}&utm_medium=outreach&utm_campaign=lane-o-{品类}&utm_content={lead_id}
```
lead_id = 雷达台账行号 → 008 表新增 `lead_source` 字段（值域：reddit/linkedin/quora/email/wa/organic）→ 周报复盘可分车道看询盘。**没有 lead_id 的触达 = 白做。**

**Spec 2 — 008 双向打通**：雷达台账成交标记 ↔ 008 won_count 同步（人工周同步即可，不建自动管道，避免过度工程）。

### Lane O 节奏（闲时窗口内，不占白天）
- **不新建 cron**：雷达 01:00 已自动；话术升级 + UTM 改造作为一次性任务包派给 deepseek；每日蹲帖（Reddit 15min）是**人工/半自动动作**，deepseek 出「每日蹲帖清单」（top 5 帖 + 建议评论角度），落 `.hermes/outbox/<日期>-lane-o.md`，老板或执行层人工发
- **账号资产纪律（新增，deepseek 方案没有的）**：Reddit 主账号先养 2 周（9:1 价值:推广比），新号直接私信 = 封号；Quora/LinkedIn 公司页同步建，NAP 与站上一致（§13.10）

## 四、内容队列整合规则（解决撞车）

daily-content 21:17 队列优先级（即日起）：
1. **月曆季收尾 + GSC 4 簇补词**（9/14 已派，进行中，不动）
2. **P0 三篇 en blog**（Candle/Soap 标签 → Self-Publishing → Etsy 小批量包装）——理由：雷达实证需求 + 复购型/高客单/精准社区，且与 8 锁词的 en 侧（small batch label / catalog）协同
3. 8 锁词 T1 持续优化（weekly-meta 车道）
4. **P1 三篇缓 2 周**（zines/journals/童书）——10 月初进队列，避开 Q4 旺季内容卡点前的拥挤

**1 cron 1 交付物红线不变**；每篇 P0 blog 必含：v5.1 快速答案块（AEO）+ FAQPage + 「低 MOQ/快样品/透明工厂」三要素段（雷达实证转化要素）+ 内链到对应 PLP/SKU。

## 五、权威建设（Lane A，本卡新增第三引擎——被引用权）

GEO 的胜负手是「站外谁在说你好」。三件按序做：

1. **数据报告资产（P0，独有）**：雷达 83+ 线索台账是**全球独一份的小批量印刷需求原始数据**——每季度出 1 期《Global Small-Batch Print Demand Report》（en，insights 路由，复用 G1《HK Print Inquiry Index》已上线的页面模板 + Cite This 块）。原始数据 = 媒体/博客/AI 引用的磁石，G1 已验证模板可行性。首期 10 月中出（Q3 数据）。
2. **目录与实体**：en 侧补 30 目录（复制 ja ジープリント 30 目录公式到 en：startup base / print directories / B2B 平台）；Organization schema sameAs 同步 Reddit/Quora/LinkedIn 新建账号——实体一致性（GEO 基础）。
3. **数字公关**：数据报告发布后，用雷达触达通道向印刷/包装行业媒体投「数据故事」——不推销产品，推销数据（合规且高转化）。

## 六、KPI 框架（周复盘读这些，其它不看）

| 车道 | 领先指标（周） | 终局指标（月） |
|---|---|---|
| Lane C 内容 | 8 锁词平均位置 / 站点日均 imp（2000→3000 段） / 新篇 7 天收录率 | 首页词数 / 自然询盘数 |
| Lane O 获客 | 触达数 / 回复率（≥5%）/ 深链点击（UTM） | outbound 询盘数（008 lead_source 拆分）/ 赢单标记 |
| Lane A 权威 | referring domains 净增 / 品牌词 imp（智印港 8→50 / ZprintPro 0→破零） | AI 引用命中（GEO 抽查 6 query） |

**北极星不变**：月真实询盘数 × 赢单标记（008）。三车道全是过程指标。

## 七、执行顺序（deepseek 照跑）

1. **P0-1**：/unsubscribe 三语页部署（合规前置，1 commit）
2. **P0-2**：话术模板 4 套 + UTM 深链改造（落 `.hermes/lane-o/templates-v2/`）
3. **P0-3**：008 表加 lead_source 字段 + quote 页 UTM 捕获（透传到 008 插入）
4. **P0-4**：P0 首篇 blog（Candle & Soap Label Printing Guide）进 daily-content 队列
5. **P1-5**：Quora/LinkedIn 公司页 + sameAs 更新；Reddit 养号 SOP 落盘
6. **P1-6**：数据报告首期大纲（复用 G1 模板，10 月中发布）
7. 全部报告落 `.hermes/logs/2026-09-1x-lane-o-*.md`，周六复盘我读

## 八、五视角裁决

- ① PM：支持。队列规则解决撞车，P0/P1 分批保 Q4 卡点；不新建 cron 守额度纪律。
- ② UI/UX+CRO：条件支持。outbound 落地页（packaging PLP/quote 页）需有 low-MOQ 英文信号，随 P0 blog 批顺手校验，不单独立项。
- ③ 运营/转化：支持。auto_send 维持 OFF 正确——域名信誉是不可再生资产；人工首轮 10 封是必要成本。
- ④ 数据分析师：支持。UTM+lead_id 是归因命脉，无此不启动 Lane O；品牌词 imp 是权威车道的可量化先行指标。
- ⑤ CEO 终裁：**双引擎升三引擎（内容+获客+权威），P0 四项本周落地，auto_send 永不自动开（每次开启需老板逐次拍板）**。

## 九、数据来源（§0.23）

- deepseek 方案 commit 266d65d8（2026-09-17 05:59，本仓库 main 分支）
- masterplan v1：docs/2026-09-09-k3-brain-30-90day-masterplan-v1.md
- G1 模板先例：src/lib/insights/index-vol1.ts + /insights/hk-print-inquiry-index/（已上线）
- 雷达资产：F:\全球印刷资讯（deepseek 已穷尽读取，我引用其结论不重复读）
