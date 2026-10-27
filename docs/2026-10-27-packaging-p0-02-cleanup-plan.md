# 三语包装声明清理方案 + 主 URL 映射复核（PKG-P0-02 · D3 前置）

> 日期：2026-10-27（D3 原排 10-29，前置完成以加速拍板后执行）
> 角色：执行层（DeepSeek）——本方案为**分析交付物**，未改任何 `src/`
> 依据：`docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` §4.2（三类处理）/ §6.1（唯一主承接表）/ §6.2（内链原则）/ §7.1.3（title 冻结）/ §8.1（真值→主URL→内容顺序）/ §9 PKG-P0-02 / §11（K3 真值清单）
> 冲突台账 SSoT：`docs/2026-10-26-packaging-truth-ledger.md`（68 claim）+ `.kimi-work/packaging-research-20261026/packaging-truth-ledger.json`

**闸门声明**：本方案中的「删除/限制」指令在 **K3 拍板（D2, 10-28）后**方可对 `src/` 执行——P0-01 允许改动明确「K3 拍板后才修改被点名源头」，P0-02 源头（category-seo-content.ts / SKU CSV / 博客源数据）均属被点名源头。方案已按可立即 apply 的标准编写，拍板后按 Part E 批次执行。

**状态字典**：`blocked`＝等 K3 真值拍板｜`needs-data`＝等业务证据｜`keep-approved`＝K3 8/19 已批保留（复核范围）｜`clean`＝已清/无需动作｜`audit-p2`＝D22-23 审计。

**执行状态总览（2026-10-27 19:3x 三源复核）**：

| 源 | 状态 | 说明 |
|---|---|---|
| sku-seo-data.ts（B2） | 🔶 部分已清 | 同侪 9efc9da3（18:38）已清 boxes/stickers FDA→食品級（0 残留）；**真值冲突项仍待 K3**；无值依赖清毒（B2-2/17/22/23/30/31 等）待批 1 |
| category-seo-content.ts（B1） | 🔴 全项未动 | e-print 竞品对比/FDA/FSC/SGS/ISTA/清关承诺/导航 FDA 全部在线（L84-411），B1 全项待批 1 |
| products.ts（B3） | 🔴 源头未清 | 「internationally certified」9 处；**FDA 5 处源头**（food title/desc L2982-83、cosmetic features L3087、fruit-label L6631/6634）；线上 title/description/features 仍显示 FDA（2026-10-28 01:15 探针 18-28 处/页） |
| blog-data（B4） | 🔴 全项未动 | FDA 21 CFR/GB 4806/FSC/65%/60%/多個残片全部在线，D20-21 + 批 1 |
| 线上 | 🔶 半清 | sku-seo body/H1 已清（zh「食品級」/ja「食品グレード」/en「Food-Grade」✅）；**title/description/features 仍渲染 products.ts 源头 FDA** |

---

## 0. 数据来源行（§0.23）

- 线上事实：2026-10-27 01:33 HTTP probe（en rigid / zh food / ja kraft / ja rigid / en category 全部 200，title/H1 与台账冲突全命中——**双方法复核通过**）
- 源码：`src/data/category-seo-content.ts:78-414`（三语 packaging 段）、`src/data/sku-seo-data.ts:1034-1205 / 2474-2533`、`src/data/products.ts`（P0-01 源头，仅登记）、`src/data/blog-data/zh-hk.json:104,131,653,717`（blog HTML content）、`src/data/blog-posts.ts:1441-1462,1919-1934`
- 冲突台账：`docs/2026-10-26-packaging-truth-ledger.md` §二-§十一
- 派生链：`zprintpro-sku-seo-data.csv` → `scripts/csv-to-sku-seo.mjs` → `src/data/sku-seo-data.ts`（禁手改派生 TS）
- K3 8/19 拍板保留清单（防误清）：SOP-10 反例#3（15 年经验 / 1,000+ 品牌客户 / 海德堡设备 / 12 大行业 / 24h SLA / 国际顶级）+ 车道 2026-10-26 保留 12 件（FSC 認證紙張 / 大豆油墨 / 多年印刷經驗 / 長年の印刷実績 / 沖縄・北海道追加料金なし / DHL 国際2-4日 / 100%可回收）

---

## Part A · 主 URL 映射复核（§6.1 vs 现状）

| locale | 意图 | 唯一主 URL（§6.1） | 现状合规 | 违规/风险 | 处置任务 |
|---|---|---|---|---|---|
| zh-hk | 包裝盒訂製／印刷 | `/zh-hk/category/packaging/` | ✅ 200/自 canonical | H1 食品类词前置（「食品紙盒/紙袋/防油紙卡」在禮盒/彩盒前）→ 部分收窄通用意图；title「100個起」与 blog「50 個起印」冲突 | D6-D7 分工 + P0-02 清毒（blog 50 起） |
| zh-hk | 食品包裝訂製 | `/zh-hk/product/food-boxes/` | ✅ | H1「FDA 食品級」无证（CER-001）；title HK$2.5 vs products.ts HK$4（PR-001） | D6-D7 + 拍板后 H1/title 清毒 |
| zh-hk | 食品包裝印刷／材質 | `/zh-hk/blog/food-packaging-printing-guide/` | ✅ | blog 正文已销售化（100 個起/HK$2.5/3-5 天/FDA 21 CFR 176.170/GB 4806.8-2022 断言）→ 违反「blog 做教育、不复制供应商页」 | D6-D7 修内链+去销售化；P0-02 清毒认证断言 |
| zh-hk | 牛皮紙盒 | `/zh-hk/product/kraft-paper-packaging-box/` | ✅ | H1「250-350g」vs products.ts「300-350g」gsm 冲突；环保声明无标准证据（PF2-005） | D4-D5 类比任务（kraft zh 随 ja 拍板） |
| en | custom packaging boxes | `/en/category/packaging/` | ✅ | H1「Made for USA · Food-Safe」收窄通用意图（SB-005）；title「$0.51」vs PDP 起价口径（PR-009） | D13 |
| en | custom mailer boxes | `/en/product/mailer-boxes/` | ✅ | description $100 vs body $99 免运自冲突（PR-008）；ja H1 英文残留（SB-007） | P0-02 清毒（拍板后） |
| en | food packaging supplier | `/en/product/food-boxes/` | ✅ | 需供应商采购表（D10）；FDA 泛化声明待清（CER-001） | D10 |
| en | electronics packaging supplier | `/en/product/electronics-packaging-box/` | ✅ | **防静电声明（PF2-006）直接违反 PKG-P1-EN-01 禁止「虚构 ESD」**；公差 ≤0.5mm 无据（PF2-007） | D8-D9 + P0-02 |
| ja | クラフト紙 パッケージ印刷 | `/ja/product/kraft-paper-packaging-box/` | ✅ | H1「エコ FSC認証」无证（CER-002+エコ）；category 抢词（cannibalization：kraft 32/category 16 imps）；ja body「100枚から/即日発送」vs 300個（MOQ-004+SB-008） | D4-D5（category 改比较并链入） |
| ja | パッケージ印刷 | `/ja/category/packaging/` | ✅ | 正文含「上製本箱」术语泄漏（SB-006） | P0-02 全站扫 |
| ja | 貼り箱／リジッドボックス | `/ja/product/rigid-boxes/` | ⚠️ | title 用「上製本箱」作产品名（SB-006/P1-JA-02）；H1 泛企业文案；MOQ 100 vs 价格表 50（MOQ-002） | D11-D12 |
| ja | 食品パッケージ製作 | `/ja/product/food-boxes/` | ✅ | H1「FDA食品グレード」无证（CER-001）；正文含「上製本箱」 | D10 类比 + P0-02 |

**内链复核（§6.2）**：
- ✅ 已有：en category→PDP 锚（食品类前置段）；zh blog→category/food PDP 锚（packaging-box-custom-guide→category、menu→food-boxes）
- ⚠️ 缺口：kraft blog↔kraft PDP 双向链待 D4-D5（kraft-paper-box-types-comparison-2026 目前无 kraft PDP 采购锚）；food blog→food PDP 锚已存在但锚文含销售化断言；category→rigid/mailer/folding PDP 采购分流锚待 D13
- ⛔ 禁改：`gift-boxes→rigid-boxes` 301 映射（middleware.ts:43）

---

## Part B · 清毒方案（按源文件，全部可 apply）

### B1 · `src/data/category-seo-content.ts`（三语 packaging 段 L78-414）

**立即暂停发布类（删除或条件化，blocked→拍板后执行）**

| # | 位置 | 现值 | 动作 | 草稿替换（不编值） | 关联 claim |
|---|---|---|---|---|---|
| B1-1 | zh featuredSnippet | 「對比 e-print HK$300-800 刀模費行業慣例」 | **删除竞品价格对比**（无实证） | 「拼版免刀模費，自訂刀模以報價為準」 | DL-003 |
| B1-2 | zh featuredSnippet | 「白卡彩盒 HK$0.03/個起」 | **条件化**（口径未拍板） | 「白卡彩盒拼版價按數量分檔，詳見報價」 | PR-009 |
| B1-3 | zh featuredSnippet | 「拼版 8-15 天交期」 | **条件化** | 「交期自文件確認後起算，以報價單為準」 | LT-003 |
| B1-4 | zh featuredSnippet | 「FDA 食品級 + FSC 認證」 | **删除认证断言**（无证） | 「食品級內襯視材質與訂單確認（見食品盒頁）」 | CER-001/002 |
| B1-5 | zh techSpecs | 「100 個起／異形 500」 | **条件化** | 「MOQ 視盒型與數量，以報價為準」 | MOQ-008 |
| B1-6 | zh techSpecs | 「打樣當日完成」 | **删除**（自矛盾） | 「打樣方案（數碼/無地/結構/實物）以報價確認」 | PF-001 |
| B1-7 | zh techSpecs | 「瓦楞箱抗壓/跌落測試」 | **删除绝对值**（无测试条件） | 「可提供結構測試說明（以訂單規格為準）」 | PF2-002/003 |
| B1-8 | zh serviceNodes | 「旺角打樣中心」 | **条件化/删除**（实体待确认） | 「打樣服務可預約（位置以客服確認為準）」 | SH-004 |
| B1-9 | zh FAQ | 「5 天免費打樣」vs「打樣當日完成」 | **两处删除**（自矛盾） | 统一为打样矩阵（拍板后按 PF-001 结论填） | PF-001 |
| B1-10 | zh FAQ | 「免費 2 小時打稿」 | **条件化** | 「數碼打稿以報價流程為準」 | PF-001 |
| B1-11 | en h2 | 「From 100 Units, Free Die-Cut Design, 3-5 Day Production」 | **条件化**（MOQ/刀模/交期全未拍板） | 按拍板结果重构为真值句 | MOQ-008/DL-001/LT-004 |
| B1-12 | en techSpecs | 「3-5 days digital / 5-7 offset / rush 2-3 days / prototyping same day」 | **条件化** | 按 LT-001/PF-001 拍板结果填 | LT-004/PF-001 |
| B1-13 | en FAQ | 「SGS 認證」 | **删除**（无证书） | 「可提供檢測報告（視訂單索取）」 | CER-003 |
| B1-14 | en FAQ | 「ISTA compression and drop testing」 | **删除**（无报告） | 「結構穩定性以訂單規格與測試說明為準」 | PF2-002 |
| B1-15 | en FAQ | 「EU WEEE, US FTC Green Guides」 | **删除或需证据** | 业务提供合规依据后才可保留 | CER-007 |
| B1-16 | en FAQ | 「free shipping over $99」 | **条件化** | 「免運門檻與地區以訂單為準」（拍板后统一 $99/$100/$500） | PR-006/007/008 |
| B1-17 | en FAQ | 「From 100 units」 | **条件化** | 按 MOQ 拍板结果填 | MOQ-008 |
| B1-18 | ja FAQ | 「SGS認証取得済み、日本の食品衛生基準に準拠」 | **删除**（无证书） | 「食品衛生基準への適合は材料・仕様により確認」 | CER-003/005 |
| B1-19 | ja FAQ | 「FDA 適合 + FSC 認証紙」 | **删除认证断言** | 「食品グレード内張りは仕様により選択可」 | CER-001/002 |
| B1-20 | ja FAQ | 「ISTA基準の圧縮・落下テスト」 | **删除** | 「構造強度は仕様確認による」 | PF2-002 |
| B1-21 | ja FAQ | 「DHL/FedEx 日本全国」 | **条件化** | 「DHL 国際配送 2-4 日（地域・輸送区分による）」 | SH-001 |
| B1-22 | ja coreAdvantages | 「アジア自社工場直送」 | **条件化** | 「アジアの工場から直送（深圳拠点）」 | SB-009 |
| B1-23 | zh buyingGuide | 「抗壓 80-200kg」 | **删除绝对值** | 「強度は材質・構造により異なる（要確認）」 | PF2-003 |
| B1-24 | zh buyingGuide | 「免費刀模」 | **条件化** | 「刀模費條件以報價為準」 | DL-001 |
| B1-25 | zh featuredSnippet | 「DHL 全球 2-4 天」 | **keep-approved（DHL 国際2-4日）**，但需区域限定 | 「DHL 全球主要城市 2-4 天（詳見運輸政策）」 | SH-001 |
| B1-26 | zh L170 | 「出口歐美用 FSC 認證紙，**通關文件我們一併提供**」 | **删除清关承诺**（§4.2 清关类立即暂停；FSC scope 未定） | 「出口訂單可提供材料說明（以訂單確認）」 | CER-002 + §4.2 清关 |
| B1-27 | zh L172 nav label | 「食品包裝訂製 — **FDA 食品級**紙盒」 | **删除 FDA 断言**（导航标签亦为客户可见） | 「食品包裝訂製」 | CER-001 |

**可保留可观察事实（clean，不动）**：页内真实盒型/材质选项/文件格式/报价流程、胶袋/真空袋不接边界（SB-001）、深圳主体表述、纸类专精定位。

### B2 · `zprintpro-sku-seo-data.csv` → 生成器 → `sku-seo-data.ts`（拍板后改 CSV + 重跑 `scripts/csv-to-sku-seo.mjs`，禁手改派生）

> **2026-10-27 18:38 同侪 9efc9da3（order 28b/28a）已清 sku-seo-data.ts 的 boxes/stickers FDA 断言**（FDA→食品級，当前 0 残留）——原 B2-7/9/10/29 的 **sku-seo 部分标记 ✅ 已完成**；**真值冲突（MOQ/价格/交期）仍待 K3 拍板后执行**；products.ts 源头残留见 B3 扩展。

| # | SKU/字段 | 现值 | 动作 | 状态 | 关联 claim |
|---|---|---|---|---|---|
| B2-1 | rigid en H1 | 「250+」 | **拍板后按真值改**（title 过门检） | 待 K3 | MOQ-001 |
| B2-2 | rigid en description | 「2100-MOQ」（残片） | **删除残句**（无值依赖，拍板后第一批） | 待执行 | MOQ-001 |
| B2-3 | rigid en description vs body | free ship $100 vs $99 | **统一**（拍板后） | 待 K3 | PR-007 |
| B2-4 | rigid ja title | 「上製本箱（リジッドボックス）」 | **D11-D12 以「貼り箱（リジッドボックス）」重写** | D11-D12 | SB-006 |
| B2-5 | rigid ja/zh H1 | 泛企业文案 | **D11-D12 重写为产品 BLUF** | D11-D12 | SB-006 |
| B2-6 | rigid zh title | 「HK$4.5起」 | **拍板后统一**（HK$8-42 vs 4.5） | 待 K3 | PR-002 |
| B2-7 | food zh H1 | 「FDA 食品級」→「食品級」 | ✅ **已完成**（9efc9da3；products.ts 源头见 B3-4） | ✅ | CER-001 |
| B2-8 | food zh title | 「HK$2.5」vs products.ts「HK$4」 | **拍板后统一**（title 已重写，价格口径仍冲突） | 待 K3 | PR-001 |
| B2-9 | food ja H1 | 「FDA食品グレード」→「食品グレード・防油内層」 | ✅ **已完成**（9efc9da3） | ✅ | CER-001 |
| B2-10 | food ×3 imageAlt | 「FDA食品級」→ 0 残留 | ✅ **已完成**（9efc9da3） | ✅ | CER-001 |
| B2-11 | kraft zh H1 | 「250-350g」 | **拍板后对齐 products.ts SSoT**（300-350g 待业务确认） | 待 K3 | gsm 冲突 |
| B2-12 | kraft ja H1 | 「エコ FSC認証」 | **删除 エコ/FSC 断言**（D4-D5 kraft 重写时） | D4-D5 | CER-002 |
| B2-13 | kraft ja body | 「100枚から対応/100個〜即日発送」 | **枚→個 修正 + 删除即日発送**（D4-D5） | D4-D5 | MOQ-004/SB-008/LT-006 |
| B2-14 | kraft en body | 「100-piece minimum」vs title 300 | **拍板后统一** | 待 K3 | MOQ-004 |
| B2-15 | kraft zh desc | 「48 小時快遞」 | **条件化/删除**（口径未拍板） | 待 K3 | LT-006 |
| B2-16 | kraft features | 「完全生物降解 90 天／無塑化劑殘留」 | **删除或加标准限定**（ASTM/ISO 证据前） | needs-data | PF2-005 |
| B2-17 | mailer ja H1 | 「Sturdy and durable」（英文） | **重写自然日语**（缺陷修复，拍板后第一批） | 待执行 | SB-007 |
| B2-18 | mailer en description vs body | $100 vs $99 | **统一** | 待 K3 | PR-008 |
| B2-19 | mailer ja desc | 「7-10営業日」vs body 3-5 | **拍板后统一** | 待 K3 | LT-002 |
| B2-20 | folding zh H1/body | 「80cm 跌落測試 5kg 不開口」 | **条件化/删除**（测试报告前） | needs-data | PF2-001 |
| B2-21 | folding ja | 「100枚〜」 | **枚→個 修正** | 待执行 | SB-008 |
| B2-22 | gang-run zh/ja | 「香港無對手價/香港無競合価格」 | **删除**（无证据竞品断言） | 待执行 | SB-004 |
| B2-23 | gang-run en body | 「internationally certified factory / decade / global clients」 | **删除** | 待执行 | CER-007 |
| B2-24 | gang-run | zh 8-15 vs en/ja 8-12 天 | **拍板后统一** | 待 K3 | LT-003 |
| B2-25 | gang-run ja | ¥4.4 vs ¥3,800/500 | **拍板后统一** | 待 K3 | PR-005 |
| B2-26 | gang-run en | free ship $500 vs $99 | **拍板后统一** | 待 K3 | PR-006 |
| B2-27 | cosmetic zh features | 「藥機法/FDA 21 CFR/EU 1223/2013 合規」 | **删除**（合规文件前；sku-seo title FDA 已清，features 需复核） | 待复核 | CER-004 |
| B2-28 | cosmetic en body | HK$8-65/pc（en 页用 HK$） | **币种统一**（watch） | watch | PR-011 |
| B2-29 | fruit-food-label | 「FDA 食品級/SGS 通過/直接接觸」→「食品接觸安全」+ 食品級膠水 | ✅ **已完成**（9efc9da3）；products.ts 源头见 B3-4 | ✅ | FC-001/004, CER-001 |
| B2-30 | electronics en | 「防靜電符合電子產品防護標準」 | **删除**（PKG-P1-EN-01 明确禁止虚构 ESD） | 待执行 | PF2-006 |
| B2-31 | electronics zh | 「公差 ≤0.5mm」 | **条件化/删除** | 待执行 | PF2-007 |
| B2-32 | white-card desc_zh | 「50-10,000 件」vs minQ 500 | **拍板后统一**（products.ts 源头） | 待 K3 | MOQ-006 |

### B3 · `src/data/products.ts`（P0-01 被点名源头，仅登记；拍板后执行）

> **2026-10-27 复核修正**：「internationally certified quality management system」实际残留 **9 处**（台账原登记 3 处——双方法复核：git grep + read 工具逐行确认）。其中包装盒域 = food-boxes / mailer-boxes 2 处（本策略执行）；纸袋族 5 处 + flyers/posters 2 处属七簇策略域（协同或由对端执行，先登记不越域）。另 food description_zh「FDA級食品接觸安全材質」源头仍在（sku-seo 已清，源头未清）。

| # | SKU | 现值 | 动作 | 关联 claim |
|---|---|---|---|---|
| B3-1 | products.ts「internationally certified quality management system」**9 处**：kraft-paper-bags(1365)/gift-bags(1555)/eco-paper-bags(1650)/handle-bags(1749)/jumbo-bags(1843)/a4-flyers(1917)/a1-posters(2550)/food-boxes(2983)/mailer-boxes(3185) | 无证认证断言 | **删除**；本域先清 food/mailer 2 处，纸袋/flyers/posters 交七簇会话 | CER-007 |
| B3-2 | rigid title_zh HK$4.5 / food title_zh HK$4 / kraft price_range HK$1.5-1000 / white-card basePrice=129 | 冲突值 | **拍板后统一** | PR-001~004 |
| B3-3 | kraft variables 100 vs minQuantity 300 | 冲突值 | **拍板后统一** | MOQ-009 |
| B3-4 | food title_zh L2982「HK$4起/個 FDA級」＋ description L2983「FDA級食品接觸安全材質」＋ descriptionEn「internationally certified」（B3-1 food 处） | **FDA 源头残留**（sku-seo H1 已清，源头未清——线上页面 title/description 仍显示 FDA，2026-10-28 01:15 线上探针 18-28 处/页） | **拍板后清**：title 去 FDA 并统一 HK$4 vs 2.5（PR-001）；description 改「食品級紙材（以訂單確認）」 | CER-001/FC-001 + PR-001 |
| B3-5 | cosmetic features L3087「藥機法 / FDA 21 CFR / EU 1223/2013 合規」 | 合规文件前不得发布 | **拍板后删除** | CER-004 |
| B3-6 | fruit-food-label title_zh L6631「FDA 食品級」＋ features L6634「SGS／FDA 通過…可直接接觸食品」 | 无检测文件 | **拍板后删除 FDA/SGS/直接接觸**（改「防水・防油標籤紙」） | CER-001/FC-001 |

### B4 · 博客源数据（`blog-data/*.json` + `blog-posts.ts`；D20-21 全量清毒预排 + P0-02 即时项）

**P0-02 即时清毒项（拍板后第一批）**

| # | blog | 现值 | 动作 | 关联 |
|---|---|---|---|---|
| B4-1 | packaging-box-price-2026 excerpt | 「FDA 21 CFR 食品級、FSC 認證」 | **删除认证断言**（blog-posts.ts:1929-1932） | CER-001/002 |
| B4-2 | food-packaging-printing-guide (zh) | 「認證至少齊 FDA 21 CFR 176.170（美國）同 GB 4806.8-2022」「HK$2.5 起/個、100 個起、3-5 天、HK$500 免運」 | **认证断言删除 + 价格/交期/MOQ 条件化**（与价格表/台账冲突） | CER-001, PR/LT/MOQ |
| B4-3 | packaging-box-custom-guide (zh) | 「50 個起印」「天地蓋盒 50 個起已達 65% 品牌」「大豆油墨成為 60% 品牌首選」「磁吸盒可重複使用 500 次」 | **删除假统计与无据 MOQ**（65%/60%/500 次无来源） | MOQ-008, 编造 lint |
| B4-4 | kraft-paper-box-types-comparison-2026 (zh) | 「100 個起 HK$2.5-4.5/個…FDA 21 CFR 175.300 + EU REACH + FSC 4 大國際認證齊全」 | **认证断言删除 + 价格条件化** | CER-001/002, PR |
| B4-5 | packaging-box-pricing-2026 (zh) | 「坑盒 500 個 HK$8-15/個」 | **audit-p2**（D22-23，先审计后改，禁止未看数据删除） | PR-010 |

**D20-D21 全量清毒范围（预排）**：所有包装 blog 的趋势/客户数/认证/绝对化交期声明；方法 = 逐帖提取声明 → 对照 §4.2 三类 → 无来源数字删除或标注「以報價為準」。相邻观察（非包装 blog 但同模式）：stickers 知识原子【國際質量認證】【FDA 級食品接觸材質】【歐盟 CPR 合規】（FDA/国际认证部分按 CER 规则处理；**15 年/1,000+ 客户/海德堡/12 大行业/24h SLA 属 K3 8/19 拍板，保留**）、menu blog「FDA + EU REACH 雙認證」、envelope blog「+35%」「90%」统计。

### B4 扩展 · 跨簇包装场景 blog 毒源（2026-10-27 三语实读，D20-21 主战场 + 残片 P0）

> 来源：`src/data/blog-data/{en,ja,zh-hk}.json` 内容 HTML 直读。这些为 9 月 12 段骨架重构产物（双引擎/七簇策略资产），**清毒执行时须与对应策略会话协调避让**；其中「多個」占位残片属 P0（客户可见），拍板后第一批优先。

| # | blog 族（三语） | 毒源模式 | 动作 | 关联 |
|---|---|---|---|---|
| B4-6 | gang-run（en:413 / ja:413 / zh:406） | **「多個/多年件」占位残片**（en 有完整数字 500-1,000，zh/ja 被替换为「多個」）；「型代 ¥40,000-100,000」「刀模費 HK$3,000-8,000」竞品型代断言；「40-60%」成本；「95% 零售 SKU」 | 残片回填真实数字或删除；型代断言核实/删除；95% 删除或加依据 | SB-004/PF2-009 + 编造 lint |
| B4-7 | cosmetics（en:182 / ja:182 / zh:175） | 「72% 消費者」「48% 支付 5-15% premium」「68%」「45%」假统计；「FDA 食品級內襯認證」「BPA-free」 | 假统计删除；认证删除 | CER-004/001 |
| B4-8 | baby food（en:378 / ja:378 / zh:371） | 「FDA 認證食品級內襯」「BPA-free 大豆油墨」认证断言；「$99 全美無料」「5-7 営業日」交期/免运与台账冲突 | 认证删除；交期/免运条件化 | CER-001 + PR/LT |
| B4-9 | sports merch / IP merch（en:328,410 / ja:328,410 / zh:321,403） | 「35% 二手市場溢價」「超過 5 億件」「350 億美元」趋势/统计；「刀型無料」「免費刀模」；「$99 全美無料配送」 | 无来源统计删除；刀模/免运条件化 | DL-001/PR-006 |
| B4-10 | tea gift（en:189 / ja:189 / zh:182） | 「30 個起印」「茶飲店超過 多間」（占位残片）；「24 小時特急」 | 残片回填/删除；MOQ 30 vs SKU 真值核对 | MOQ + 残片 |
| B4-11 | custom guide（en:138 / ja:138 / zh:131） | 「50 個 MOQ」「65% 品牌」「60% 品牌」假统计；「磁吸盒 500 次重複使用」 | 50→真值（拍板后）；假统计删除 | MOQ-008 + 编造 lint |
| B4-12 | 全 blog 品牌 lint | ja「ZprintPro (ZprintPro)」重复（ja:413） | 去重 | 品牌 lint |

**内链复核补充**：category L168/L208 指向 `/zh-hk|en/product/magnetic-closure-gift-box/` = **活 SKU**（middleware.ts:50 映射到自身，非 301）——链接合法，无需修；「對標 e-print 10 個盒型獨立頁」（L168）竞品对比保留待 DL-003 裁决。

---

## Part C · 分类汇总（§4.2 三类）

**立即暂停发布（删除/限制，共约 30 处）**：FDA/FSC/SGS/ISTA/EU WEEE/FTC/日本食品衛生基準/藥機法/EU 1223/2013 认证断言（CER-001~005）；「香港無對手價」（SB-004）；「防靜電」（PF2-006）；「80cm 跌落/抗壓 80-200kg/承重/降解 90 天/無塑化劑」（PF2-001~005）；e-print HK$300-800 竞品对比（DL-003）；65%/60%/500 次假统计；「internationally certified factory」残留（CER-007）；「旺角打樣中心」未确认（SH-004）；「即日発送」无源（LT-006）；上製本箱术语（SB-006）；ja「枚」单位（SB-008）；mailer ja 英文 H1（SB-007）。

**可改成条件式但需真值（拍板后填值）**：MOQ（8 处）、价格口径（12 处）、生产交期（6 处）、运输边界（3 处）、打样矩阵（3 处）、刀模范围（2 处）、免运门槛（3 处）。

**可保留可观察事实（clean）**：盒型/材质/文件格式/报价流程、深圳主体表述、胶袋/真空袋不接边界、K3 8/19 拍板 12+ 件（FSC 認證紙張（scope 限定）/大豆油墨/多年印刷經驗/長年の印刷実績/沖縄北海道/DHL 国際2-4日/100%可回收/15年/1000+客户/海德堡/12大行业/24h SLA）、沖縄・北海道追加料金なし。

---

## Part D · 验收与门禁清单（每批执行后必过）

1. `node scripts/check-brand-mentions.mjs --strict`（编造 lint：假评审人/无人拍板数字 0 命中）
2. `node scripts/check-encoding.js --fix`（UTF-8）
3. `npx tsc --noEmit`（54=54 持平）
4. 内容门童全量：title-v5（title 变更必过）/ i18n / entity / brand / gsc-leak（门童 #16）
5. JSON 严格解析（blog-data JSON 改动后）
6. `git diff` 逐行核对：只含本次指令范围文件与行
7. 线上复核：发布后 curl 重灾页（rigid/food/kraft ×3 locale + category）确认 title/H1/可见文本无残留
8. 无新增 unsupported claim（§10.1 护栏指标 0）

---

## Part E · 执行批次（K3 拍板后）

| 批次 | 内容 | 时机 |
|---|---|---|
| 批 1（无值依赖清毒） | B2-2/17/22/23/27/29/30、B3-1、B4-1/3、category-seo B1-1/6/13/14/18/19/20 | D2 拍板后立即（D3-D4 窗口） |
| 批 2（真值依赖） | MOQ/价格/交期/免运统一（B1-2/3/5/11/12/16/17、B2-1/3/6/8/14/18/19/24/25/26/32、B3-2/3） | D2 拍板值落定后 |
| 批 3（任务包联动） | D4-D5 kraft（B2-12/13）、D6-D7 zh 分工（B1-1 前置+B4-2）、D8-D10 en electronics/food（B2-30/31）、D11-D12 rigid 貼り箱（B2-4/5）、D13 category（B1-11） | 按路线图周序 |
| 批 4（D20-21） | 包装 blog 全量清毒（B4 全量） | 11-13—14 |
| 批 5（D22-23） | pricing blog 审计归并（B4-5） | 11-17—18 |

---

> 本方案只盘点未改源：`src/` 零改动；未 commit/push 前与决策包同批处理（见执行报告）。

---

## Part F · 批 1 执行状态（2026-10-28，K3 05:44「指令按最优推荐执行」授权后）

> 完整执行记录见 `docs/2026-10-28-packaging-batch1-execution-report.md`（commit `2412ac6f`）。本表为幂等标记（已清 ✓ / 本批未覆盖 →）。

| 项 | 现值 | 状态 |
|---|---|---|
| B1-1 e-print 竞品对比（L84/L168/L169/L182） | 删除/重写（保留拼版免刀模費商业模式，去对家对比与 40-60%/HK$300-800） | ✓ |
| B1-2/3 价格/交期 | 条件化「以報價為準」；food HK$2.5、100 個起（推荐值） | ✓ |
| B1-5 打樣當日 | 删除（zh L144/164/185/186/191；en L279/298；ja L366/386/405） | ✓ |
| B1-6/7 FSC/可降解/無塑化劑 | 环保纸材选项化（L123 zh、L345 ja）；FSC 保留「可选项」表述 | ✓ |
| B1-13/14 抗壓/ISTA/清关 | 条件化「以訂單規格為準」；清关承诺删除（zh/en/ja 三语） | ✓ |
| B1-18/19 FDA 断言（FAQ/nav） | 条件化/删除（L172 nav、L190 zh、L297 en、L404 ja、L411 ja） | ✓ |
| B1-20 旺角打樣中心 | 条件化（zh L152、ja L374；同人誌域 L4004/4192 七簇移交） | ✓（包装域） |
| B1-23 3D 模型/免費 5 天打樣 | 删除（L186 zh） | ✓ |
| B1-27 nav FDA 标签 | 删除（L172） | ✓ |
| B2-2 rigid en 2100-MOQ | 删除（sku-seo + CSV） | ✓ |
| B2-17 mailer ja H1 英文 | 改日文 H1（TS L1130 + CSV） | ✓ |
| B2-21 folding ja 100枚 | 枚→個（TS + CSV） | ✓ |
| B2-22 無對手價/無競合 | 源头已无残留（双方法复核） | ✓（存量已清） |
| B2-24 拼版 8-15 天 | 条件化「以報價為準」（zh/en desc+body、ja title） | ✓ |
| B2-27 cosmetic 藥機法 features | products.ts 已删（P1-4）；sku-seo 无残留 | ✓ |
| B2-29 fruit-label FDA/SGS | 同侪 9efc9da3 已清 TS；**CSV 10 单元格本批同步**（SGS/FDA/直接接觸/?起印） | ✓（CSV 补同步） |
| B2-30/31 electronics 防靜電/公差 | 双方法复核无残留（TS+CSV） | ✓（存量已清） |
| B2-32 white-card desc_zh 50-10,000 | 拍板后统一（D6-D7 zh 分工） | → |
| B3-1 products.ts internationally certified | 本域 food(2983)/mailer(3185) 2 处已清；纸袋 5 + flyers/posters 2 处 = 七簇移交 | ✓（本域） |
| B3-4 food title/desc FDA | 全清（title 改 HK$2.5 防油紙卡、desc 改食品級紙材以訂單確認） | ✓ |
| B3-5 cosmetic features 藥機法 | 已删（P1-4） | ✓ |
| B3-6 fruit-label title/features FDA | 已删（P1） | ✓ |
| B4-1/2/3/4 price-2026/food/custom/kraft | 认证断言删 + 假统计删 + 50→100 对齐 + 价格条件化 | ✓ |
| B4-6 gang-run 残片/40-60% | 40-60% 条件化（zh/en/ja）；型代断言/95% 待 D20-21 | ✓（部分） |
| B4-7 cosmetics 假统计/FDA | 68%/45%/多年件/50 件起印已清；72%/48% 在 en/ja 版待 D20-21 | ✓（zh 已清） |
| B4-8 baby food FDA/BPA-free | zh L371 已清；en/ja 版待 D20-21 | ✓（zh 已清） |
| B4-10 tea 30 個/占位/24h 特急 | zh L182 已清；en/ja 版待 D20-21 | ✓（zh 已清） |
| B4-11 custom-guide 假统计 | zh L131 已清（三处 重点摘要 + 關鍵洞察 ×2）；en/ja 版待 D20-21 | ✓（zh 已清） |
| B4-12 ja「ZprintPro (ZprintPro)」 | 待 D20-21 | → |
| 快遞盒/9大材質/食品級合規（L144/L553/L104 扩展） | zh 已清（e-print 76-87%/抗壓 80-120kg/FSC/500-多個/100 國家占位/FDA 175.300/總遷移量段） | ✓（zh 已清） |
| category en/ja 全段 | ISTA/FSC/SGS/FDA/清關/40-60%/無料当日/自社工場直送 全清 | ✓ |

**残留移交（非本批范围）**：七簇域（纸袋/flyers/posters/stickers/横幅/菜單/同人誌/药标/学校/海报）FDA 与认证断言；彩盒族 en body 8-15 days（corrugated/tuck-end/white-card，批 2 与 rigid 交期统一时处理）；gang-run ja title 混合中英（watch）；kraft blog 18,500 訂單數字来源（D22 审计）。

**伴随源补漏（2026-10-28 线上复核，commit `46c83ac6`）**：product-faqs.ts（15 处）、CategoryIndustries/CategorySharpHooks（5 处）、seo.ts category meta（3 处）、category-conversion-blocks.ts（41 处）、products.ts kraft/folding（4 处）——全部包装域 FDA/SGS/FSC 绝对断言、拼版单价 HK$0.03/0.8、HK$300-800 行业对比、8-15 天、MOQ 30/50→100、生分解性/無可塑剤/国際環境基準/即日打樣/当日完成 已清。**教训固化：category 页渲染源不止 category-seo-content.ts，复核必须覆盖伴随组件（CategoryIndustries/SharpHooks/seo.ts/conversion-blocks）+ 线上探针。**
