# PDP 渲染层三件套规则 · title / H1 / meta（v5.1 · 2026-09-23）

> **性质**：SKU 标题规则 v5 的姊妹篇。v5 管「SERP 弹药」（title），本文件管「落地确认」（H1）、「摘要底稿」（meta）、「首屏问答锚点」（MOQ 块）与执行细化包，四件套各司其职。
> **拍板衔接**：H1 主词式维持 K3 2026-09-14 T4 渲染层收口（commit 10580cd3，295 槽生效 / 36 冻结避让 / 5 空槽回落）**不变**；本文件仅做执行层细化与护栏，不改拍板本体。

## 一、三件套分工总表

| 层 | 字段 | 用户在哪看到 | 核心职能 | 长度纪律 |
|---|------|-------------|----------|----------|
| SEO title | `seo.<locale>.title` | 浏览器标签页、Google SERP | **抢点击**：五段式弹药（v5 规则） | 半角当量 50–57，≥58 硬拦 |
| H1 | `h1` | 商品页顶部大字 | **确认落地**：主词式，1 秒对齐搜索意图 | ≤30 全角（en ≤60 char），一页一个 |
| Meta description | `seo.<locale>.description` | Google SERP 摘要行、社交分享卡 | **兜底弹药**：title 被改写时保住钩子；说服点击的第二战场 | 150–160 半角当量（zh-hk/ja ≈75–80 全角），首句前置钩子 |
| MOQ 问答块 | 内嵌组件（§八） | PDP 价格阶梯后 | **打消量虑**：回答买家第一问，可被 AI 整句引用 | 模板派生，无长度自由裁量 |

**为什么 H1 不复制 title**：H1 堆关键词会被 Google 判 over-optimization 反伤排名；title 与 H1 应「讲同一个故事、用不同的措辞」——title 为 SERP 竞争而写，H1 为已到访用户而写。

## 二、H1 规则（T4 拍板的执行层细化）

### 2.1 两种合法形态
- **A · 标准主词式**（默认）：主词本身已含规格/品类信息。示例：`A4傳單印刷` / `防水貼紙` / `Small Batch Stickers`
- **B · 规格锚式**：主词不含规格，且规格是买家首决策因子（紙厚/尺寸/材质）。示例：`A4 傳單 157g 光粉紙` / `防水 PVC 貼紙 異形裁切`

### 2.2 铁律
1. 一页一个 H1，置于 PDP 首屏顶部；logo/徽章/价格条均不得用 H1 标签；
2. 必含主词，主词前置（前 3–5 字内）；
3. 禁塞：数字钩子（价格/MOQ/交期）、品牌、空洞修饰词（專業/品質保證/high quality）——这些归 title 与首屏转化区块；
4. 规格锚 ≤1 个，且必须真实（products.ts 可证）；B 形态全角 ≤30；
5. 与 title 同故事：H1 主词必须与 title 主词一致，不得出现 title 里没有的品类词；
6. 36 冻结 slug 继续避让，5 空槽维持回落逻辑（T4 拍板不动）。

### 2.3 副标题锚点行（二次拍板 · 双层结构 · 实现属 C-4 后续任务）
H1 维持主词式（T4 拍板不动），H1 正下方新增一行 `<p class="pdp-subtitle">`：
```
<h1>{{sku.h1}}</h1>                                    ← T4 SSoT，不改
<p class="pdp-subtitle">10起印 ｜ HK$0.35起 ｜ 圓角・覆膜</p>   ← CRO 为主 AEO 为辅
```
五条铁律：
1. **数据零新增**：渲染时从 products.ts 派生（minQty / basePrice「起」口径 / finishTags ≤2 个）；
2. **定位**：CRO 改动，AEO/GEO 收益为顺带红利，不单独承诺引用率；
3. **去重**：若首屏已有 MOQ/价格渲染元素（转化区块），合并而非叠加——同一信息首屏只出现一次；`hasPriceBlock/hasMoqBadge` 必须从布局配置读取，禁硬编码（以 S-1 首屏审计输出为准，审计前不得上线）；
4. **一致性断言**：副标题数字与 Product schema Offer 逐 SKU 线上比对，差 1 处 = 门童红；
5. **可逆**：单 commit 回滚；窗后 CTR Δ ≤0 且探针无引用 → 撤下并回写月报。

### 2.4 护栏（防「Google 用 H1 换 title」场景丢弹药）
- Google 判定 title 弱时可能以 H1 替换 SERP 标题（改写量级可达 70%）。缓释 = meta description 首句必须前置完整钩子（见 §三.2），即使 title 被换，摘要行仍带 MOQ/价格/交期；
- 每月 GSC 校准窗抽查：若 SERP 实查显示 Google 以 H1 替换了 title → 该槽 title 重写进窗（title 弱信号，不是 H1 加长信号）。**H1 永不因改写而加长**。

## 三、Meta description 规则（完整版）

### 3.1 结构（三段式 · 当量预算硬指标）
`[段A 钩子 ≤45 当量：MOQ/价格/交期 三选二，数字 ≥1] + [段B 信任 ≤50 当量：工艺/材质/场景 1–2 个，禁 ≥3 堆砌] + [段C CTA ≤25 当量：动作 1 个 + 品牌 1 次]`
总当量 150–160（zh-hk/ja ≈75–80 全角）。

### 3.2 硬规则
1. **长度**：150–160 半角当量；写满（Google ~70% 情形改写 snippet，高质量 description 是默认底稿）；
2. **钩子前置**：第一句 45 当量内必须出现数字钩子；
3. **回答式首句（第一优先级）**：首句必须是「可直接被 AI 引擎引用为答案」的完整句，优先回答「多少钱/多少起订/几天交货」三问之一；
4. **唯一性**：每槽独立撰写，禁跨 SKU 模板复用（全站两两相似度 >85% = 门童红）；同 SKU 三语 meta 独立撰写，禁止互译复用；
5. **实例数字纪律**：任何模板示例中的价格/MOQ/交期一律写 `{占位符}`；真实值只许渲染时从 products.ts 派生。手填数字 = 数据诚信违规；
6. **禁**：关键词堆砌、空洞修饰、无来源数字、跨语言污染、ja 用「份」；
7. **品牌**：zh-hk 可带「智印港」一次，en/ja 可带「ZprintPro」一次——品牌归 description 而非 H1。

### 3.3 示例结构（a4-flyers zh-hk · 数字为占位演示）
`{主詞}{MOQ}張起印、{basePrice}起，{turnaround}。{紙張/工藝}，適合{場景1}與{場景2}。即刻 WhatsApp 索取報價｜智印港`

## 四、一致性红线
三件套 + Product schema + 首屏价格条 + MOQ 问答块的 MOQ/价格/交期数字必须同源（products.ts），任何两处冲突 = 门童红 + 数据诚信违规。跨层检查一行式：`Title 数字 = Meta 数字 = Subtitle 数字 = Schema 数字 = 首屏价格条数字 = MOQ 块数字 = products.ts`，差一处阻断上线。

## 五、执行方案（P0–P2 · 与 commit 序列 C-0~C-8 对应）

| # | 动作 | 优先级 | Commit |
|---|------|--------|--------|
| T-0 | PDP title 模板层品牌错配修复 + 门童品牌·语种扫描 | P0 | C-0 |
| T-1 | 全槽 title 五段式普查（钩子位空缺清单，只读） | P0 | C-1 |
| T-2 | 全站数字对账清零（徽章/正文/信任段/FAQ/阶梯/schema vs products.ts） | P0 | C-2 |
| T-3 | meta 三段式：模板定稿 + 门童 #20 扩参 + top30 槽 | P0 | C-3 |
| T-4 | subtitle 锚点行（S-1 首屏审计先行） | P1 | C-4 |
| T-5 | en/ja title 五段式补齐 + ja 全链路 | P1 | C-8 |
| T-6 | 月度 GSC 校准窗 + SERP 实查抽样 10 槽 + AEO 探针（并入 G-01） | P1 | C-7 |

不做什么：不改 T4 H1 拍板本体；不把五段式 title 塞回 H1；不碰 36 冻结 slug。

## 六、一页纸对照
```
SERP 上用户看到：
  标题：{v5 五段式 50-57 当量}
  摘要：{三段式 150-160 当量}
页面上用户看到：
  H1：主词式（±规格锚）              ← T4
  副标题：{minQty}起印 ｜ {price}起 ｜ 工艺  ← C-4（派生自 products.ts）
  MOQ 问答块：最少可以印幾張？…       ← §八（派生自 products.ts）
  首屏：价格条 + MOQ 徽章 + CTA       ← 转化区块
```

## 七、多语言渲染模板（实测增补）

### 7.1 副标题锚点行 · 三语模板（products.ts 派生，零新增字段）
| 语言 | 模板 | 示例 |
|------|------|------|
| zh-hk | `{{minQty}}起印 ｜ {{currency}}{{fromPrice}}起 ｜ {{finishTags[≤2]}}` | `10起印 ｜ HK$0.35起 ｜ 圓角・覆膜` |
| en | `From {{minQty}} pcs · {{currency}}{{fromPrice}}+ /pc{{ " · " + finishTags[≤2] }}` | `From 10 pcs · $0.045+/pc · Waterproof · Die Cut` |
| ja | `{{minQty}}{{counter}}〜 ・ {{currency}}{{fromPrice}}〜{{ " ・ " + finishTags[≤2] }}` | `10枚〜 ・ ¥6.3〜 ・ 防水・型抜き` |

**量词配置表（ja 铁律）**：チラシ/貼紙/ポスター=枚、冊子/カタログ=冊、カレンダー=部、箱/袋=個、名刺=箱。渲染时按品类查表取量词，**禁统一用「部」**（「部」仅用于日历/电话等；「份」全站禁用）。

### 7.2 Meta 三段式 · 三语适配
| 语言 | 钩子句写法 | CTA 用词 | 长度带 |
|------|-----------|----------|--------|
| zh-hk | `{{主詞}}{{qty}}張起印、{{currency}}{{price}}起，{{turnaround}}` | `即刻 WhatsApp 索取報價` | 75–80 全角 |
| en | `{{Main}} from {{qty}} pcs, {{currency}}{{price}}+ each, {{turnaround}}` | `Get a free quote via WhatsApp` | 150–160 char |
| ja | `{{主詞}}{{qty}}{{量词表}}から、1{{量词表}}{{currency}}{{price}}〜、{{turnaround}}`（量词按 §7.1 配置表） | `今すぐLINE/WhatsAppで見積もり` | 75–80 全角 |

### 7.3 2026-09-23 线上实测登记（执行优先于一切规划）
| # | 缺口 | 级别 | 处置 |
|---|------|------|------|
| 1 | PDP title 模板层品牌错配：en/ja 产品页 title 末尾为「智印港」（应 ZprintPro），9/20 清账漏模板层，波及全站 en/ja PDP | P0 | C-0 修复 + 门童品牌·语种扫描 |
| 2 | title 数字钩子位空缺：a4-flyers 三语 title 均无 MOQ/价格/交期，当量≈43<50，与「300/300 落带」口径矛盾 | P0 | C-1 全槽五段式普查 → 入窗批 |
| 3 | MOQ/价格三口径并存：en a4-flyers 同页 10pc/100-flyer MOQ/sample 10-50；zh-hk meta HK$0.3 vs hero HK$0.35 vs 阶梯 0.31；waterproof 信任段 500張起印；wall-calendars 徽章 HK$12-40 vs 正文 HK$3-8 | P0 | C-2 数字对账，products.ts 为唯一裁决源 |
| 4 | MOQ 问答块手工注入、覆盖不全（a4-flyers/waterproof-stickers 有，wall-calendars 无） | P0 | Q-1 模板化（本任务交付物 4） |
| 5 | 竞品 Top10 表未经实时复核（print100/vistaprint/gotprint 抓取失败）；e-print 已核：title 无价格钩子、卡片带 MOQ+价 | 备注 | 引用前必复核 |

## 八、PDP 首屏问答锚点块 · MOQ 解释块（三次拍板）

> 起源：9/18–21 L1/MOQ 统一批**手工注入**的「⚡ 最少可以印幾張？」块（a4-flyers、waterproof-stickers 有，wall-calendars 无）——覆盖靠运气，且已注入页的其他区块残留冲突口径。裁决：**块保留、路线废止——模板化派生 + 全页对账**。

### 8.1 规则
1. **位置**：价格阶梯之后、产品详情之前；
2. **渲染**：全站 295 槽统一模板，内容 100% 派生自 products.ts（minQty / nextTier），**禁手写数字**；
3. **三语模板**：见本提示词交付物 4（与组件 i18n 逐字一致）；
4. **FAQ 归并**：每槽 `faqs[]` 第 1 条强制为同一模板生成的 MOQ 问答（自动进 FAQPage schema）；手写重复 MOQ FAQ 删除——一处问答一个源（C-6 后续任务）；
5. **存量清零**：全页 MOQ/价格口径对账范围 = 首屏徽章 / 正文 / 信任段 / FAQ / 价格阶梯 / Product schema，唯一源 products.ts，冲突 = 门童红（C-2 后续任务）；
6. **定位**：CRO 为主（消除量少的下单顾虑）+ AEO 为辅（整句可被 AI 引用）；AI Overview 时代交易型查询幸存、信息型被吞，本块服务的是幸存的交易意图。

### 8.2 执行链
Q-1 模板化替换手工块（P0，1 窗，本任务交付物 4）→ Q-2 存量数字对账清零（P0，2 窗，C-2）→ Q-3 FAQ 归并（P1，C-6）→ Q-4 门童双扫描：块存在性 + 全数字一致性（P1，C-5）→ Q-5 窗后观测 + Perplexity 探针加 MOQ 类查询（P2，T-6）。

## 九、执行层细化包（v5.1）

### 9.1 Meta 三段式当量预算
段A ≤45 / 段B ≤50 / 段C ≤25，总 150–160；实例数字一律 `{占位符}`，真实值只许 products.ts 派生；名片品类全站已 301 贺卡，不得再作为示例/测试 SKU。

### 9.2 Subtitle 组件规格
去重决策树采纳（价格条在→隐价格；MOQ 徽章在→隐 MOQ；全隐→不渲染）；禁硬编码布局判断；ja 量词按 §7.1 配置表；一致性断言脚本（subtitle vs schema Offer，差 1 = 门童红）。**实现属 C-4，本任务不做。**

### 9.3 AEO 探针 SOP（并入 G-01，不另起体系）
查询矩阵 4 类（价格/MOQ/比较/工艺）× 5 SKU × 3 语（zh-hk 20 + en 20 + ja 20 = 60 条/月）；名片 4 条删除，替换贺卡・小冊子；ja 立即覆盖。引擎 Perplexity + Google SGE 双 P0；判定 ✅⚠️❌🆕，⚠️ = P0 修复 48h SLA。节奏 = 每月 15 日并入 ACR-7，报告落 `.hermes/reports/aeo-probe-YYYY-MM.md`。红线：引用率是观测红利不是承诺 KPI，北极星不变（月询盘数）。**实现属 C-7，本任务不做。**

### 9.4 门童 #20 扩参规格（7 项 · C-3 实施）
长度带 150–160 / 钩子前置（前 45 当量含数字）/ 唯一性（相似度 >85% = 红）/ 品牌 ≤1 次 / 禁词表（zh:專業・品質保證・最好・第一・份；en:best・professional・guaranteed・#1；ja:最高・プロ品質・部滥用）/ 数字一致性（vs products.ts）/ 三段结构完整性（缺 CTA = 黄）。

### 9.5 上线前联动检查清单（每窗必过）
Title 五项 + H1 四项 + Subtitle 四项 + Meta 七项 + Schema 四项 + MOQ 块两项（存在性 + 数字一致）+ 跨层一致性一行（§四）。

### 9.6 Commit 序列
```
C-0  fix(pdp): brand·locale mismatch in PDP title template (T-0, P0)          ← 本任务交付物 3
C-1  test(gate): brand-locale scan + five-segment title census (T-1, P0)       ← 本任务交付物 3
C-2  fix(data): MOQ/price reconciliation, products.ts as sole source (T-2+Q-2) ← 后续任务
C-3  feat(meta): 三段式模板 + 门童#20扩参 + top30 zh-hk meta (T-3, P0)          ← 后续任务
C-4  feat(pdp): PdpSubtitle 组件 + CSS + 布局配置去重 (T-4, P1, S-1 先行)       ← 后续任务
C-5  test(gate): subtitle-schema 断言 + MOQ 块存在性双扫描 (Q-4, P1)             ← 后续任务
C-6  feat(faq): faqs[] 首位模板化归并 (Q-3, P1)                                  ← 后续任务
C-7  feat(aeo): AEO 探针 SOP 并入 G-01 + 首月 60 查询基线 (T-6, P1)              ← 后续任务
C-8  i18n: en/ja title 五段式补齐 + ja 全链路 (T-5, P1-P2)                       ← 后续任务
```
每 commit 独立可回滚；C-0~C-2 未 green 前 C-3 之后全部不启动。

*与 v5 规则文件配合使用；冲突处以 K3 最新拍板为准。*
