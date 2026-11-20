# PDP 渲染层三件套规则 · title / H1 / meta（v5 · 2026-09-23）

> **性质**：SKU 标题规则 v5 的姊妹篇。v5 管「SERP 弹药」（title），本文件管「落地确认」（H1）与「摘要底稿」（meta），三件套各司其职。
> **拍板衔接**：H1 主词式维持 K3 2026-09-14 T4 渲染层收口（commit 10580cd3，295 槽生效 / 36 冻结避让 / 5 空槽回落）**不变**；本文件仅做执行层细化与护栏，不改拍板本体。

---

## 一、三件套分工总表

| 层 | 字段 | 用户在哪看到 | 核心职能 | 长度纪律 |
| --- | --- | --- | --- | --- |
| SEO title | `seo.<locale>.title` | 浏览器标签页、Google SERP | **抢点击**：五段式弹药（v5 规则） | 半角当量 50–57，≥58 硬拦 |
| H1 | `h1` | 商品页顶部大字 | **确认落地**：主词式，1 秒对齐搜索意图 | ≤30 全角（en ≤60 char），一页一个 |
| Meta description | `seo.<locale>.description` | Google SERP 摘要行、社交分享卡 | **兜底弹药**：title 被改写时保住钩子；说服点击的第二战场 | 150–160 半角当量（zh-hk/ja ≈75–80 全角），首句前置钩子 |

**为什么 H1 不复制 title**：H1 堆关键词会被 Google 判 over-optimization 反伤排名（Shopify/Google 口径一致）；title 与 H1 应「讲同一个故事、用不同的措辞」——title 为 SERP 竞争而写，H1 为已到访用户而写。H1 只放一个主词（或主词+0–1 规格锚）是当前电商 PDP 的主流模板（Shopify/Magento 生态默认即 product-name H1）。

---

## 二、H1 规则（T4 拍板的执行层细化）

### 2.1 两种合法形态

| 形态 | 适用 | 示例 |
| --- | --- | --- |
| **A · 标准主词式**（默认） | 主词本身已含规格/品类信息 | `A4傳單印刷` / `防水貼紙` / `Small Batch Stickers` |
| **B · 规格锚式** | 主词不含规格，且规格是买家首决策因子（紙厚/尺寸/材质） | `A4 傳單 157g 光粉紙` / `防水 PVC 貼紙 異形裁切` |

### 2.2 铁律

1. **一页一个 H1**，置于 PDP 首屏顶部；logo/徽章/价格条均不得用 H1 标签；
2. **必含主词**，主词前置（前 3–5 字内）；
3. **禁塞**：数字钩子（价格/MOQ/交期）、品牌、空洞修饰词（專業/品質保證/high quality）——这些归 title 与首屏转化区块；
4. **规格锚 ≤1 个**，且必须真实（products.ts 可证）；B 形态全角 ≤30；
5. **与 title 同故事**：H1 主词必须与 title 主词一致，不得出现 title 里没有的品类词（防 Google 换标题后语义漂移）；
6. 36 冻结 slug 继续避让，5 空槽维持回落逻辑（T4 拍板不动）。

### 2.3★ 副标题锚点行（2026-09-23 二次拍板 · 双层结构）

H1 维持主词式（T4 拍板不动），H1 正下方新增一行 `<p class="pdp-subtitle">`：

```javascript
<h1>{{sku.h1}}</h1>                                    ← T4 SSoT，不改
<p class="pdp-subtitle">10起印 ｜ HK$0.35起 ｜ 圓角・覆膜</p>   ← 新增，CRO 为主 AEO 为辅
```

**五条铁律**：

1. **数据零新增**：副标题内容渲染时从 products.ts 派生（minQty / basePrice「起」口径 / finishTags ≤2 个），**禁止新增 SKU 级数据字段**（防第三数据源与 schema 打架）；
2. **定位**：CRO 改动（SERP→首屏信息连续性），AEO/GEO 收益为顺带红利，不单独承诺引用率；
3. **去重**：若首屏已有 MOQ/价格渲染元素（转化区块），合并而非叠加——同一信息首屏只出现一次；
4. **一致性断言**：副标题数字与 Product schema Offer 逐 SKU 线上比对，差 1 处 = 门童红；
5. **可逆**：单 commit 回滚；窗后 CTR Δ ≤0 且探针无引用 → 撤下并回写月报。

**执行链**：首屏审计（合并/新增定位）→ 模板改动 → CSS → 一致性断言 → GSC 窗对比 + Perplexity 探针 → 窗满裁决（保留/回滚）。

### 2.4 护栏（防「Google 用 H1 换 title」场景丢弹药）

- Google 判定 title 弱时可能以 H1 替换 SERP 标题（改写量级可达 70%）。缓释 = **meta description 首句必须前置完整钩子**（见 §三.3），即使 title 被换，摘要行仍带 MOQ/价格/交期；
- 每月 GSC 校准窗抽查：若某 SKU 的 SERP 实查显示 Google 以 H1 替换了 title → 该槽 title 重写进窗（title 弱信号，不是 H1 加长信号）。**H1 永不因改写而加长**。

---

## 三、Meta description 规则（本次补齐的完整版）

### 3.1 结构（三段式）

```javascript
[钩子句：MOQ/价格/交期 三选二，45 当量内说完] + [信任/差异句：工艺或资质 1 个] + [CTA：报价/起订 1 个]
```

### 3.2 硬规则

1. **长度**：150–160 半角当量（zh-hk/ja ≈75–80 全角）。超长被截断、过短浪费摘要行——摘要行是 SERP 第二战场；
2. **钩子前置**：第一句 45 当量内必须出现数字钩子（ buyers 在摘要行扫描数字）；Google 可能用页内其他文本改写 snippet（~70% 情形），高质量 description 是默认底稿，必须写满；
3. **唯一性**：每槽独立撰写，禁跨 SKU 模板复用（门童 #20 已查重复词，继续执行）；
4. **禁**：关键词堆砌、空洞修饰、无来源数字（同 title 数字纪律）、跨语言污染、ja 用「份」；
5. **品牌**：zh-hk 可带「智印港」一次，en/ja 可带「ZprintPro」一次——品牌归 description 而非 H1；
6. **回答式写法**：首句优先回答「多少钱/多少起订/几天交货」三问之一（AEO 兼容：AI 引擎常抓 description 作答案源）。

### 3.3 示例（a4-flyers zh-hk）

> `A4傳單印刷 10張起印、HK$0.35起，4小時快速打稿。157g光粉紙／圓角覆膜工藝，適合開業宣傳與餐飲推廣。即刻 WhatsApp 索取報價｜智印港`
> （钩子前置：10張起+HK$0.35+4小時；信任：紙張工藝；CTA：WhatsApp；品牌一次）

---

## 四、三件套 × AEO/GEO 协同

| 维度 | title | H1 | meta |
| --- | --- | --- | --- |
| SEO 排名信号 | 强（主词+长尾+钩子） | 中（主词确认） | 弱（CTR 间接） |
| SERP CTR | 主战场 | 兜底（被替换时） | 第二战场（snippet） |
| AEO 答案源 | 辅助 | 弱 | **强**（价格/起订问答句优先被抓） |
| GEO 语料 | 入引用片段 | 弱 | 中（description 常进 AI 摘要） |
| PDP 结构化数据 | — | — | 与 Product schema 价格/MOQ 必须一致（禁打架） |

**一致性红线**：三件套 + Product schema + 首屏价格条的 MOQ/价格/交期数字必须同源（products.ts），任何两处冲突 = 门童红 + 数据诚信违规。

---

## 五、执行方案（P0–P2）

| # | 动作 | 优先级 | Owner | 时间盒 | 验收 |
| --- | --- | --- | --- | --- | --- |
| E-1 | meta description 规则固化进 5 条 cron prompt 头部 + 门童 #20 扩参（查堆砌/查长度带/查钩子前置） | P0 | 执行层 | 1 窗 | 门童过检；新 meta 全合规 |
| E-2 | 全站 300 槽 meta 三段式普查：长度带 / 钩子前置 / 重复词 / 与 schema 数字一致性 | P0 | 执行层 | 2 窗 | 普查报告落 .hermes；不合规清单入窗批 |
| E-3 | 不合规 meta 按窗分批重写（同 title 窗纪律，防 churn） | P1 | 执行层 | 窗后逐批 | census + 线上 curl 断言 |
| E-4 | H1 双形态规则写成门童检查（A/B 形态白名单 + 禁塞项扫描） | P1 | 执行层 | 1 窗 | 门童新增计数为 0 引入红 |
| E-5 | 每月 GSC 校准窗加「SERP 实查抽样 10 槽」：title 被 H1/其他文本替换率统计 → 反哺 title 强度 | P1 | 执行层+大脑 | 每月 | 替换率表落月报 |
| E-6 | B 形态规格锚白名单评审（哪些 SKU 启用规格锚，防 295 槽重洗） | P2 | 大脑 | 周复盘 | 白名单落 docs |

**不做什么**：不改 T4 H1 拍板本体；不把五段式 title 塞回 H1；不碰 36 冻结 slug。

---

## 六、一页纸对照（交付即用）

```javascript
SERP 上用户看到：
  标题：A4 傳單印刷 宣傳單張 圓角覆膜 10起印 HK$0.35起 ｜ 智印港   ← v5 五段式
  摘要：A4傳單印刷 10張起印、HK$0.35起，4小時快速打稿。157g光粉紙… ← 本文件 §三
页面上用户看到：
  H1：A4傳單印刷                                                      ← T4 主词式（±规格锚）
  首屏：价格条 + MOQ 徽章 + WhatsApp CTA（转化区块承担钩子）            ← 不归 H1
```

## 七、多语言渲染模板（2026-09-23 实测增补）

### 7.1 副标题锚点行 · 三语模板（products.ts 派生，零新增字段）

| 语言 | 模板 | 示例 |
| --- | --- | --- |
| zh-hk | `{{minQty}}起印 ｜ {{currency}}{{fromPrice}}起 ｜ {{finishTags[≤2]}}` | `10起印 ｜ HK$0.35起 ｜ 圓角・覆膜` |
| en | `From {{minQty}} pcs · {{currency}}{{fromPrice}}+ /pc{{ " · " + finishTags[≤2] }}` | `From 10 pcs · $0.045+/pc · Waterproof · Die Cut` |
| ja | `{{minQty}}{{counter}}〜 ・ {{currency}}{{fromPrice}}〜{{ " ・ " + finishTags[≤2] }}` | `10枚〜 ・ ¥6.3〜 ・ 防水・型抜き` |

**量词配置表（ja 铁律）**：チラシ/貼紙/ポスター=枚、冊子/カタログ=冊、カレンダー=部、箱/袋=個、名刺=箱。渲染时按品类查表取量词，**禁统一用「部」**（「部」仅用于日历/电话等；「份」全站禁用）。

铁律：「起/from/〜」换算只用 products.ts 的 basePrice（= 价格阶梯最低档单价）；finishTags 无则整段省略，不留空分隔符。

### 7.2 Meta 三段式 · 三语适配

| 语言 | 钩子句写法 | CTA 用词 | 长度带 |
| --- | --- | --- | --- |
| zh-hk | `{{qty}}張起印、HK${{price}}起，{{leadtime}}交貨` | `即刻 WhatsApp 索取報價` | 75–80 全角 |
| en | `From {{qty}} pcs, {{currency}}{{price}}+ each, {{leadtime}} turnaround` | `Get a free quote on WhatsApp` | 150–160 char |
| ja | `{{主詞}}{{qty}}{{量词表}}から、1{{量词表}}{{currency}}{{price}}〜、{{leadtime}}`（量词按 §7.1 配置表） | `今すぐLINE/WhatsAppで見積もり` | 75–80 全角 |

**跨语言唯一性铁律**：同 SKU 的三语 meta 独立撰写，禁止互译复用——三语买家关注点不同（zh 重價錢交期、en 重 MOQ/shipping、ja 重納期/品質保証），互译 = 三个市场用一个卖点。

### 7.3 2026-09-23 线上实测登记（执行优先于一切规划）

| # | 缺口 | 级别 | 处置 |
| --- | --- | --- | --- |
| 1 | **PDP title 模板层品牌错配**：en/ja 产品页 title 末尾为「智印港」（应 ZprintPro），9/20 清账漏模板层，波及全站 en/ja PDP | P0 | T-0 修复 + 门童新增品牌·语种匹配扫描 |
| 2 | **title 数字钩子位空缺**：a4-flyers 三语 title 均无 MOQ/价格/交期，当量≈43<50，与「300/300 落带」口径矛盾 | P0 | T-1 全槽五段式普查 → 入窗批 |
| 3 | **MOQ/价格三口径并存**：en a4-flyers 同页 10pc / 100-flyer MOQ / sample 10-50 三个口径；zh-hk meta HK$0.3 vs hero HK$0.35 vs 阶梯 0.31 | P0 | T-2 数字对账脚本，products.ts 为唯一裁决源 |
| 4 | 竞品 Top10 表（千问版）未经实时复核（print100/vistaprint/gotprint 抓取失败）；e-print 已核：title 无价格钩子、卡片带 MOQ+价 | 备注 | 引用前必复核，cron 侧补抓 |

## 八、PDP 首屏问答锚点块 · MOQ 解释块（2026-09-23 三次拍板）

> 起源：9/18–21 L1/MOQ 统一批**手工注入**的「⚡ 最少可以印幾張？」块（a4-flyers、waterproof-stickers 有，wall-calendars 无）——覆盖靠运气，且已注入页的其他区块残留冲突口径（waterproof 信任段「500張起印」vs 块「10張起印」；wall-calendars 徽章「HK$12-40/本」vs 正文「HK$3-8/本」）。裁决：**块保留、路线废止——模板化派生 + 全页对账**。

### 8.1 规则

1. **位置**：价格阶梯之后、产品详情之前；
2. **渲染**：全站 295 槽统一模板，内容 100% 派生自 products.ts（minQty / nextTier），**禁手写数字**；
3. **三语模板**：

- zh-hk：`最少可以印幾張？{minQty} 張起印。{minQty} 與 {nextTier−1} 張都接，差別在單張單價：起印量愈低，單張愈貴（開機與校色成本攤在少量上）；{nextTier} 張以上單張明顯較平，量產檔位見上表。`
- en：`What's the minimum order? From {minQty} pcs. Small runs carry setup + calibration costs, so unit price decreases with volume — see the price ladder above.`
- ja：`最小注文数は？{minQty}枚〜。小ロットはセットアップ・色校正コストが乗るため単価は高め。量産档（{nextTier}枚〜）で単価が大幅に下がります。価格表は上記をご覧ください。`（量词「枚」，禁「份」）

4. **FAQ 归并**：每槽 `faqs[]` 第 1 条强制为同一模板生成的 MOQ 问答（自动进 FAQPage schema）；手写重复 MOQ FAQ 删除——一处问答一个源；
5. **存量清零**：全页 MOQ/价格口径对账范围 = 首屏徽章 / 正文 / 信任段 / FAQ / 价格阶梯 / Product schema，唯一源 products.ts，冲突 = 门童红；
6. **定位**：CRO 为主（消除量少的下单顾虑）+ AEO 为辅（整句可被 AI 引用）；AI Overview 时代交易型查询幸存、信息型被吞，本块服务的是幸存的交易意图。

### 8.2 执行链（插入 T 序列）

Q-1 模板化替换手工块（P0，1 窗）→ Q-2 存量数字对账清零（P0，2 窗，已实测 3 例冲突在案）→ Q-3 FAQ 归并（P1）→ Q-4 门童双扫描：块存在性 + 全数字一致性（P1）→ Q-5 窗后观测 + Perplexity 探针加 MOQ 类查询（P2，每月）。

## 九、执行层细化包（v5.1 · 2026-09-23 三次拍板合并）

> 本包把外部细化方案修正后并入：结构全部采纳，数字/量词/顺序三类硬伤已修正。完整代码与实例库以执行提示词附录为准，此处固化为不可违背的规则。

### 9.1 Meta 三段式当量预算（硬指标）
- 段A 钩子 ≤45 当量（数字钩子 ≥1，三选二）；段B 信任 ≤50 当量（工艺/场景 1–2 个，禁 ≥3 堆砌）；段C CTA ≤25 当量（动作 1 个 + 品牌 1 次）；总 150–160；
- **实例数字纪律**：任何模板示例中的价格/MOQ/交期一律写 `{占位符}`；真实值只许渲染时从 products.ts 派生。手填数字 = 数据诚信违规；
- **下架品类纪律**：名片已全站 301 贺卡（K3 终裁），任何模板/实例/探针查询不得再使用名片 SKU。

### 9.2 Subtitle 组件规格（修正版）
- 去重决策树采纳：价格条在 → 副标题隐价格；MOQ 徽章在 → 隐 MOQ；全隐则不渲染；
- **禁硬编码**：`hasPriceBlock/hasMoqBadge` 必须从布局配置读取，以 S-1 首屏审计输出为准（审计前组件不得上线）；
- ja 量词按 §7.1 品类配置表渲染，禁全站统一「部」；
- 一致性断言脚本采纳（subtitle 数字 vs Product schema Offer，差 1 = 门童红，阻断上线）。

### 9.3 AEO 探针 SOP（并入 G-01，不另起体系）
- 查询矩阵：4 类（价格/MOQ/比较/工艺）× 5 SKU × 3 语（zh-hk 20 条 + en 20 条 + ja 20 条 = 60 条/月）；名片 4 条删除，替换贺卡・小冊子；ja 立即覆盖（不再等冷启动）；
- 引擎：Perplexity + Google SGE 为 P0 双引擎；判定 ✅⚠️❌🆕；⚠️（信息错误）= P0 修复 48h SLA；
- 节奏：每月 15 日并入既有 ACR-7 探针，报告落 `.hermes/reports/aeo-probe-YYYY-MM.md`；月度引用率/正确率趋势表入 KPI 台账 G-01 行；
- 红线：引用率是观测红利，不是承诺 KPI；北极星不变（月询盘数）。

### 9.4 门童 #20 扩参规格（7 项）
长度带（150–160）／钩子前置（前 45 当量含数字）／唯一性（全站两两相似度 >85% = 红）／品牌次数 ≤1／禁词表（zh:專業・品質保證・最好・第一・份；en:best・professional・guaranteed・#1；ja:最高・プロ品質・部滥用）／数字一致性（vs products.ts）／三段结构完整性（缺 CTA = 黄）。

### 9.5 上线前联动检查清单（每窗必过）
Title 五项 + H1 四项 + Subtitle 四项 + Meta 七项 + Schema 四项 + **跨层一致性一行**：`Title 数字 = Meta 数字 = Subtitle 数字 = Schema 数字 = 首屏价格条数字 = products.ts`，任何一处不一致 = 门童红阻断上线。

### 9.6 Commit 序列（修正千问版顺序，按本仓 T/Q 序列）
```
C-0  fix(pdp): brand·locale mismatch in PDP title template (T-0, P0)
C-1  test(gate): brand-locale scan + five-segment title census (T-1, P0)
C-2  fix(data): MOQ/price reconciliation, products.ts as sole source (T-2+Q-2, P0)
C-3  feat(meta): 三段式模板定稿 + 门童#20扩参 + top30 zh-hk meta (T-3, P0)
C-4  feat(pdp): PdpSubtitle 组件 + CSS + 布局配置去重 (T-4, P1, 需 S-1 审计先行)
C-5  test(gate): subtitle-schema 一致性断言 + MOQ问答块存在性双扫描 (Q-4, P1)
C-6  feat(faq): faqs[] 首位模板化归并, 删手写重复MOQ问答 (Q-3, P1)
C-7  feat(aeo): AEO 探针 SOP 并入 G-01 + 首月 60 查询基线 (T-6, P1)
C-8  i18n: en/ja title 五段式补齐 + ja 全链路 (T-5, P1-P2)
```
每 commit 独立可回滚；C-0~C-2 未 green 前 C-3 之后全部不启动（防把错误数字模板化）。

*与 v5 规则文件配合使用；冲突处以 K3 最新拍板为准。*