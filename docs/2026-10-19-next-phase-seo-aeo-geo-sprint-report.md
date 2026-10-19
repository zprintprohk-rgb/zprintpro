# ZprintPro 下一阶段 SEO/AEO/GEO 首页排名冲刺与系统增强战略报告

> **角色**: ZprintPro 首席 SEO/AEO/GEO 数据战略分析师
> **日期**: 2026-10-19（数据截止 24h 档 10-19 / 28d 档 10-15 导出）
> **触发**: K3 指令附件（四模块结构 + 五条铁律）
>
> **数据来源**（§0.23 强制行）:
> - GSC: `GSC数据/24小时三站点汇总数据…2026-10-19.xlsx`（413 展/8 击/120 查询行）、`GSC数据/28天三站点汇总数据…2026-10-15.xlsx`（7,561 展/59 击/1,000 查询行）
> - 断崖检测: `scripts/gsc-cliff-detector.py` 本 run 现跑 → `.hermes/logs/gsc-cliff-2026-10-19.json`
> - 代码层: `src/data/products.ts`、`src/data/product-faqs.ts`、`src/data/category-seo-content.ts`、`src/app/[locale]/product/[slug]/page.tsx`、`src/lib/seo.ts` @ HEAD（全部一手直读，行号可 rg 复核）
> - commit 链: `git log` 10-16~10-19（255e55df / fb92ee3f / e9b3af70 / fea00143 / 17cc6c8d / 09047d20 等）
> - 既有 SSoT: `docs/2026-10-17-category-seo-enja-truth-audit.md`、`docs/2026-10-17-weekly-deep-review-and-packaging-cluster-plan.md`、`docs/2026-10-16-anti-scrape-hardening.md`
> - 校准状态: 已校准（2026-10-19 20:xx，全部一手直读 + 双方法复算处已标注）

---

## §0 与附件交接上下文的事实对账（先校正，再诊断）

附件交接上下文截至 10-17/18；10-18/19 两天 commit 链已推进多项。**为避免重复建议，先对账**：

| 附件口径 | 10-19 实测 | 状态 |
|---|---|---|
| B1c 13 簇全 DONE，en 0.982→0.139 | 台账 13 entries DONE 复核成立 | ✅ 确认 |
| CRED 清扫 ISO 9001 576→0 + 只许递减基线 | 9a991b48 / c99033ba + `record-cred-baseline.mjs` 在役 | ✅ 确认 |
| 恢复系数 120.6%，条件① 2/3 日 | **10-19 档：413 展/8 击，系数 70.6%**；10-15/16/19 三个有数据日全部 ≥60%，但 **10-17/18 档缺失未补导**，且 10-19 较 10-16 峰值（120.6%）明显回落 | ⚠️ **回落信号**，见模块 1 |
| 「faqSchema 全站 en-only」 | **不准确，需修正**：PDP 可见 FAQ 与 FAQPage JSON-LD 已走 `product-faqs.ts` 三语结构（`page.tsx` L273-281，`faq.question[locale]` 同源渲染）；真正缺口 = ① SKU 级带钱 FAQ 仅覆盖 ~10/83 slug ② `products.ts` 的 en-only `faqSchema` 字段（82 处）是**零消费方死字段**且 82 SKU 克隆同一段英文 greeting-cards FAQ 文本 = 潜在指纹源 | 🔧 口径修正，见模块 2-AEO |
| 「en/ja 包装类目需真值重导」 | 「16 类目仅 zh-hk」已于 10-17 正式撤回（单方法 regex 误判）；16 类目 en/ja 块全部存在且线上渲染（curl 双方法确证）。真问题 = **真值漂移残余**，且方案 A 大部已被 fb92ee3f/e9b3af70 落地：大豆油墨 38 处→环保油墨选项式、3-Day→3-5 天、10→12 series、ja MOQ 30/50→100 | 🔧 大部已落地，残项见模块 2 |
| 「食品包裝印刷急需价格钩子」 | **已不成立**：food-boxes zh title 现为「食品包裝盒印刷 訂製 100個起 HK$2.5 防油紙卡 \| 智印港」，当量 52 ∈ [50,57]，价格/MOQ 双钩子已在位（HK$2.5 = basePrice 2.5 一致 ✓） | 🔧 CTR 战进入第二阶段，见模块 2-SEO |
| SGS 7 处在线待核 | 确认：渲染域 7 处冻结不变量（e9b3af70「SGS frozen 7=7 pending K3 #7」）；全仓 rg 命中 91 处含 CSV 源/注释，渲染域 = 7 | ✅ 确认，仍卡 K3 #7 |
| rigid-boxes title 4.5 vs basePrice 8 | 确认：title_zh「HK$4.5起/個」vs `basePrice=8`（ja ¥240 反而一致）；并入 PRICE_MISMATCH 残余 7 处，全卡 K3 价格 SSoT 裁定（255e55df 明示） | ✅ 确认，卡 K3 |
| CF 限速 20 req/10s 疑未豁免 Googlebot | 确认风险开放：v2 单规则（ruleset `810c7bc2…`，/category/+/product/ HTML 20/10s）落地记录中**无任何 verified-bot 豁免验证**（09047d20 + anti-scrape-hardening.md 全文无 `cf.client.bot` 字样） | 🔴 **P0 仍开放** |
| 守位词：牛皮紙盒 pos 2.5 / 化粧品の箱 pos 1.0 | 28d 档复核：牛皮紙盒 pos 2.5（8 展 1 击）✓；「化粧品箱」pos 1.0（1 展）+「化粧品 箱」pos 2.0 ✓（查询形实为「化粧品箱」） | ✅ 确认，零触碰 |
| ja クラフト紙パッケージ印刷 108 展 pos 25 | 28d 复核：两查询形合计 108 展（52+56）pos 25.3/26.1 ✓；10-19 单日 pos 34.5/40.5（小样本波动） | ✅ 确认 |

---

## 模块 1：根因深度诊断（Deep Diagnostics）

### 1.1 爬虫抓取层：止血已见效，但悬着一把未验证的刀

**事实链**：
- 恢复系数序列（固定基线 585.2 展/日）：7.5%（断崖底）→ 127.6%（10-15）→ 97.2% → 120.6%（10-16）→ **[10-17/18 缺档]** → **70.6%（10-19）**。
- 10-19 单日 413 展/8 击，较 10-16 峰值（706 展窗）回落约 41%。三个有数据日（10-15/16/19）均 ≥60% 门槛，但**缺档两日使条件①无法正式宣判**，且回落方向需要正视而非粉饰。
- sitemap-image 生成器 P0 已修（83/83 产品、249 页、1,077 image locs，bf4108e0）；v28_5 W1+CL 波次 132 张新图上线。

**根因判断**：
1. **CF 限速自伤风险 = 当前全站最大单一技术风险**。免费版限速配额仅 1 条，现规则为 /category/ + /product/ HTML 20 次/10 秒 block，**落地全程未验证 Googlebot 豁免**。Googlebot 抓取峰（多 URL 并发 + 单页多子资源）完全可能触发 429/1015。10-19 展示回落 41% 与该规则的因果关系**不可证实也不可证伪**——正因为没验证，它必须作为 P0 第一动作关闭（验证方法见模块 3）。
2. 28d 档数据龄 7 天（止 10-12），词簇决策只能依赖 10-15 导出 + 24h 档拼接，**观测面本身在老化**——K3 每日导出纪律是恢复期的生命线。

### 1.2 内容语义层：指纹已清，真值漂移收尾，覆盖缺口在 SKU 级 FAQ

**已关闭**：B1c 13 簇（en 0.982→0.139）、CRED 大清扫（ISO 9001 ×576→0 等 5 族）、en/ja 类目「无内容」误判撤回（16 类目 en 6.5-11.3K / ja 4.2-6.0K 字符全部在线渲染）。

**仍开放的三层缺口**（按严重度）：
1. **真值漂移残余 = 信任资产暗雷**：SGS 7 处三语客户可见文案在线（zh L190 / en L294 / ja L399 等），K3 #7 未核——若伪，属确定性诚信违规；若真，是 GEO 引用资产。**两个方向都需要 K3 一句话，悬置本身就是风险**。
2. **SKU 级 FAQ 覆盖 10/83**：类目级 FAQ 三语兜底已全盖（`coreProductFAQMap` 14 类目），但带钱 SKU 级问答（`skuMoneyFAQs`）仅 10 个 slug。zh/ja 的 PAA 捕获在 73 个 SKU 上只能靠通用集，**语义区分度不足**。
3. **products.ts `faqSchema` 死字段 82 处**：零消费方（rg `\.faqSchema` 全仓除定义外 0 命中），且 82 个 SKU 克隆同一段英文 greeting-cards FAQ——不渲染但留在源码权威域，是指纹污染源 + 误导后续生成器的陷阱。**建议删除（纯删赘肉，零渲染风险）**。

### 1.3 用户意图层：CTR 归零病灶的精确解剖

**28d 全站总账**：7,561 展 / 59 击 = **CTR 0.78%**。其中品牌词（智印港 19 + zprintpro 4 = 23 击）占全站点击 **39%**——**非品牌词 CTR ≈ 0.48%**（36 击 / 7,500+ 展）。

**包装盒词簇（28d，黄金战区）**：

| 词 | 展 | 击 | pos | 分层 |
|---|---|---|---|---|
| 食品包裝印刷 | 120 | 0 | 9.73 | 🔴 CTR 战 #1（首页底部） |
| 食品印刷 | 63 | 0 | 11.13 | 🔴 二页头部，一步之遥 |
| クラフト紙 パッケージ印刷 (两形合计) | 108 | 0 | 25-26 | 🔵 ja 主攻带 |
| 包裝盒印刷 / 紙盒印刷 | 46+41 | 0 | 31.3/30.3 | 🔵 zh 主攻带 |
| 包裝盒訂製 / 紙盒訂製 | 36+32 | 0 | 27.9/30.8 | 🔵 zh 主攻带 |
| 食品包裝訂製 | 36 | 0 | 16.08 → **24h 6.5** | 🟡 速赢窗（直答段起效迹象） |
| 包裝食品 裡印 | 30 | 0 | 9.93 | 🟡 AEO 直答段已布 |
| 食品包裝材質 | 6 | 0 | 4.67 | 🟢 低位高值 |
| 牛皮紙盒 | 8 | 1 | 2.5 | 🛡️ 守位（零触碰） |

**病灶归因（双方法：title 审查 + SERP 位置分层）**：
1. ~~缺价格钩子~~ **已排除**——food-boxes title 已带「100個起 HK$2.5」且当量 52 合规。
2. **真病灶 = 位置 × 同构**：pos 9-16 区间天然 CTR <1%；且香港印刷 SERP 前排（e-print/print100 等）title 全带价格，我们的钩子**与竞品同构无差异**。CTR 翻转的主变量已从「title 有无钩子」转为「**排名爬升 + 差异化钩子**」。
3. 产品摘要呈现（Product rich result）206 展 pos 34.2（10-19 24h）——rich 资格有，但展示集中在三页后，**Schema 资产被排名浪费**。

### 1.4 为什么 AI 搜索引擎（GEO）拿不到高引用率——四重根因

1. **实体信号被诚信策略主动压低**：主站 Organization `sameAs` 为空（`seo.ts` L1029 注释：无真实社交账号不传假链接——这是正确的诚信选择，但代价是实体图谱稀薄）；G1 层有 X/LinkedIn（L1781）。AI 引擎判「这是不是一家真实知名的厂」时，可交叉验证信号少。
2. **SKU 级实体字段全空壳**：`relatedEntities.sameAs: []` / `expertReview` / `authorBio` 全站空字符串——AI 找不到「谁在说、谁背书」的引用钩子。
3. **可引用的独特事实密度不足**：真值（100個起 / HK$2.5 / 3-5 天 / FDA 食品級紙）已埋，但被同类词稀释；AI 偏爱「唯一出处的事实 + 明确数字 + 可验证主张」，SGS 悬置恰恰卡住最强的一个潜在引用点。
4. **GEO 通道未选**：15 词基线已固化（`.hermes/geo/geo_citation_baseline-2026-10-15.json`），但三选一通道（K3 待办）未拍板，引用率零主动运营。

---

## 模块 2：30 天首页排名提升方案（包装盒词簇 + 全站系统层）

### 2.1 SEO（传统搜索）

**A. 食品包裝印刷 CTR 翻转（pos 9.73 / 120 展 / 0 击）——分两阶段**

- **阶段 1（本周，零 SSoT 依赖）**：title 保持不动（已有钩子且在 52 当量），**改打差异化 meta description 直答句**（AEO 40-60 字口径）：「食品包裝盒 100 個起，HK$2.5/個起，防油紙卡 FDA 食品級紙可選，3-5 天出貨。提交檔案 2 小時內免費數碼打稿。」——其中「FDA 食品級紙可選」须沿用 fea00143 的**诚实请求式**口径（「可選/落單註明」），禁铺开主张。
- **阶段 2（K3 SSoT 裁定后）**：若裁定确认 HK$2.5 为可公开承诺价，title 当量腾挪方案 = 删「防油紙卡」（8 当量）→ 补「免費打稿」（8 当量），52→52 零当量漂移，差异化钩子入 title。**冻结纪律**：title 改动后进入 7-10 天验证窗，同批词不再动。
- **排名爬升主杠杆（pos 9.73→前 5）**：food-boxes PDP 已有直答段 + 9 条 blog 内链（fea00143/17cc6c8d）；下一步 = 包装簇深度 blog 2 篇（见 2.3）+ zh hub v2 补「食品包裝」专节。

**B. en/ja 包装类目「真值重导」——修正为「真值收尾」**

- 已落地（fb92ee3f/e9b3af70，勿重做）：大豆油墨选项式 ×12、3-5 天 ×2、12 series ×2、ja MOQ 100 ×4、conversion-blocks ×5。
- **残项仅此两件**：① SGS 7 处（等 K3 #7）；② rigid-boxes title HK$4.5 vs basePrice 8（等 K3 SSoT）。
- 新工作面：packaging en/ja 块**数字字段审计常态化**——以 `products.ts`（food 100/2.5 · folding 100/2.5 · mailer 100/3.5 · rigid 100/8 · cosmetic 100/8 · white-card 500/129/5-7 天）为唯一真值源，把 en/ja 块内所有 `minQuantity`/`basePrice` 衍生数字纳入 `scripts/guards/` 断言（防 regen 回流，SOP-5 派生文件禁手搓）。

### 2.2 AEO（答案引擎）

**C. FAQ 三语化工程——口径修正：不是架构改造，是覆盖扩展**

- **现状（一手核实）**：渲染链已三语——`page.tsx` L273-281 读 `coreProductFAQMap`（14 类目兜底）+ `skuMoneyFAQs`（10 slug），`faq.question[locale]` 同源出可见 FAQ + FAQPage JSON-LD。**附件建议的 `seo.ts`/`schema-extensions.ts` 架构改造不需要**。
- **正确动作 1（P1）**：`skuMoneyFAQs` 扩编，包装簇 12 SKU 优先（food/folding/mailer/rigid/cosmetic/white-card/kraft/eco/gift/mailbox/display/luxury），每 SKU 4-6 问 × 3 语，答案锚定 `products.ts` 真值 + GSC 词（食品包裝材質 pos 4.67 = 现成问句）。落点：`src/data/product-faqs.ts`。
- **正确动作 2（P1，零风险）**：删除 `products.ts` 死字段 `faqSchema` 82 处（先双方法确认零消费方：rg `\.faqSchema` + `generateFAQSchema` 调用点复核），指纹源清除。
- **直答段扩展**：「裡印工藝」（pos 9.93）已布 food-boxes；扩到 folding/mailer/white-card 三 PDP（同一诚实请求式模板，数字各自溯源）。

### 2.3 GEO（生成式引擎）

**D. 品牌实体权威性（让 AI 回答「香港/深圳印刷厂推荐」时引用我们）**

1. **实体信号补强（K3 三选一拍板后执行）**：若 K3 确认 X/LinkedIn 官方账号在运营 → 把 `seo.ts` L1031 主站 `sameAs` 从空数组接上 L1781 的真实社媒（1 行改动，GEO 收益最大）；若账号不活跃 → 保持空（诚信优先），改走**行业目录实体**路径（Wikidata 条目申请 / 香港印刷商会名录 / 阿里巴巴国际站已认证档案互相 sameAs）。
2. **可引用事实密度工程**：每类目 1 条「独家事实锚」（例：packaging = 「8 檔標準尺寸免刀模費，對比行業 HK$300-800 刀模費」——已在 zh featuredSnippet，**en/ja 块需对齐同型锚点**）；数字全部溯源 products.ts 或已拍板事实。
3. **竞品 GEO 反向内容（Packlane/bmpack）**：写「Packlane alternative for Asia manufacturing」「bmpack vs 深圳直邮」对比型 blog（en 为主，ja 辅），诚实对比结构 = 对方强项承认 + 我方差异化（100 個起 vs Packlane 低起订量定位、HK 直送时效、FDA/FSC 可選）。**对比事实须 web 核验 + K3 过目**（涉竞品表述合规），列入 K3 待办。
4. **基线运营**：GEO 15 词基线（10-15 固化）每月复跑，引用率进 lane-status 周报。

### 2.4 30 天排程（W1=10/20-26 … W4=11/9-15）

| 周 | SEO | AEO | GEO | 门 |
|---|---|---|---|---|
| W1 | CF bot 豁免验证（K3）+ 食品包裝 description 直答句 + 年賀状 10/22 上线 | products.ts faqSchema 死字段删除 | GEO 通道 K3 拍板 | 死字段删除后 tsc 54=54 |
| W2 | 包装簇深度 blog #1（zh 食品包裝完全指南，12 段骨架） | skuMoneyFAQs 包装簇 6 SKU × 3 语 | 主站 sameAs 处置（按拍板） | KEEP 断言 + CRED 递减 |
| W3 | blog #2（en Packlane-alternative 对比，K3 过目后）+ zh hub v2 食品节 | skuMoneyFAQs 包装簇余 6 SKU + 裡印扩 3 PDP | en/ja 独家事实锚对齐 | 门童零违规 |
| W4 | title 冻结窗验收（10-19 解冻批 + 本批）→ CTR 首判 | PAA 捕获抽查（zh/ja 各 5 词） | GEO 基线月复跑 | 恢复系数三条件宣判 |

---

## 模块 3：执行优先级 Top 5 + K3 阻塞项清单

### 3.1 Top 5 行动清单（ROI × 风险排序）

| # | 行动 | 预期收益 | 成本/风险 | 依赖 |
|---|---|---|---|---|
| 1 | **CF 限速 Googlebot 豁免验证与补豁免**（表达式加 `not (cf.client.bot)` 或等效） | 关闭全站最大单一自伤风险；10-19 展示回落 41% 的嫌疑项 | 零内容风险；需 CF token | **K3 动作** |
| 2 | **食品包裝印刷 CTR 翻转阶段 1**（description 直答句）+ 阶段 2 预案 | 120 展/28d × pos 9.73；行业 pos 5-10 CTR 基准 2-4% → 月 3-5 击（B2B 高客单） | 低；title 冻结纪律 | 阶段 2 需 SSoT |
| 3 | **skuMoneyFAQs 包装簇 12 SKU × 3 语扩编** | 73→61 SKU 缺口收窄；zh/ja PAA + GEO 引用面；复用已验证三语架构 | 中（内容产能）；零架构风险 | products.ts 真值 |
| 4 | **价格 SSoT 裁定解锁 7 处 title**（含 rigid-boxes 4.5 vs 8） | 7 个 title 一次清账；CTR 钩子全簇解锁 | 零执行成本；**纯决策** | **K3 一句话** |
| 5 | **包装簇深度 blog ×2**（zh 指南 + en 竞品对比） | pos 27-31 主攻带的 hub-spoke 权重；GEO 引用素材 | 中；竞品稿需 K3 过目 | #4 不阻塞 |

### 3.2 K3 拍板阻塞项清单（按死线排序）

| # | 阻塞项 | 死线/窗口 | 缺它的代价 |
|---|---|---|---|
| 1 | **年賀状三真值** | **10-21（后天）** | 10/22 上线窗口错过，年賀状季流量拱手让人 |
| 2 | **CF 规则截图或 token**（bot 豁免验证） | 本周 | 自伤风险持续悬顶，回落归因永远说不清 |
| 3 | **10-17/18 24h GSC 档补导**（+ 每日导出纪律） | 尽快 | 恢复条件①无法宣判（有数据日 3/3 ≥60% 但断档） |
| 4 | **价格 SSoT 裁定**（7 处 PRICE_MISMATCH） | W2 前 | title 钩子批冻结，CTR 战只能打半场 |
| 5 | **SGS #7 真伪** | W2 前 | 7 处三语文案悬置：真→GEO 资产闲置；假→诚信暗雷在线 |
| 6 | **GEO 通道三选一** | W2 前 | GEO 零主动运营 |
| 7 | **GA4 实时核验**（恢复条件③） | 本周 | 恢复解除三条件缺最后一环 |
| 8 | **§0.0 名片承接层一句话裁决**（材料 `.hermes/decisions/0.0_ruling_brief_2026-10-16.md`，建议确认 (c) 终局收口） | 择机 | 6 槽重写队列冻结 |
| 9 | **竞品对比稿合规过目**（Packlane/bmpack） | W3 前 | blog #2 不发 |

---

## 模块 4：推送前强制自查 Checklist（Pre-push Gate）

每次代码/内容推送前，逐项打勾，**任一不过 = 不 push**：

**数据诚信层**
- [ ] 所有价格/MOQ/交期数字可溯源至 `products.ts` 字段或 K3 拍板记录（commit ID + 时间）；无来源数字 = 0
- [ ] CRED 基线只许递减：`node scripts/record-cred-baseline.mjs` 后 4_PLUS 不升
- [ ] 批量改动双方法复算（rg 计数 + 第二方法，计数写进 commit message）

**守位与冻结层**
- [ ] 守位词零触碰：牛皮紙盒（pos 2.5）/ 化粧品箱（pos 1.0）着陆页 title/H1/核心 body 的 diff 为空
- [ ] 验证窗内的 title/H1 批次零改动（10-19 解冻批窗内）
- [ ] §0.0：不删改贺卡资产、不动 middleware 301 映射；名片展示层动作须 K3 裁决在先

**工程质量层**
- [ ] `git add` 后 `node scripts/check-encoding.js --fix` 零新增违规
- [ ] `npx tsc --noEmit` 54=54（不增不减）
- [ ] 门童（pre-commit hook）零违规；KEEP 断言全过；品牌扫描 A0
- [ ] 派生文件（sku-seo-data 等）只改 CSV 源头 + regen，禁手搓、禁 --ours/--theirs（SOP-5）
- [ ] 语言纯净：ja 禁「份」、en/ja 禁繁中、品牌末尾一次、无「智印印港」

**推送纪律层**
- [ ] `node scripts/push-gate-check.mjs` 30 分钟机器门通过（强制，不人肉绕过）
- [ ] 只 stage 本会话文件；`.hermes/logs/` 车道脏文件不代持不清理
- [ ] 改 `src/data/blog-data/*.json` 前查 `.hermes/locks/lane.lock` + `SESSION_LOCK.md` 双条件
- [ ] push 后双端 `ls-remote` 验证 + CF Pages build 成功探针
- [ ] 攒批：单日非紧急 push ≤1 次（build quota 纪律）

---

> **本报告边界**：全部建议已落到文件路径/字段级；价格 SSoT、SGS 真伪、GEO 通道、竞品表述四件商业决策全部上交 K3，未越权拍板。恢复系数 70.6% 回落为单日读数，方向判断待 10-20 档确认，本报告不做恐慌性结论。
