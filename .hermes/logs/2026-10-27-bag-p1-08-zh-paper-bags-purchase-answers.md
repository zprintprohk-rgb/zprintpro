# BAG-P1-08 zh 纸袋 — 采购答案内部数据包（2026-10-27 01:5x）

> 任务源: `docs/2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md` §10.2 BAG-P1-08（category 采购答案＋主 URL 内链；袋型 PDP 分工；环保声明治理）。
> 执行: DeepSeek 执行层 · 2026-10-27 01:5x · **docs-only 数据包（未落 src；环保声明部分待 K3 拍板）**。
> 停止条: 不新建纸袋页；无实测不写承重／100%环保。

## 1. 数据来源行（§0.23）

- 真值源: `src/data/products.ts` L1355-1900（paper-bags 6 SKU：price_range / basePrice_en / basePrice_ja / minQuantity / specs）
- 线上探针: Invoke-WebRequest UA=Mozilla/5.0，2026-10-27 01:5x（category + kraft/eco/handle PDP，三闸门 200）
- 先遣: 基线冻结 v1.0（zh 纸袋簇基线 663 展示／3 点击）；策略 §1.2 结论
- 平行会话: packaging 簇（rigid/food/kraft **box**）与纸袋簇独立，无重叠（已核其 cleanup-plan 覆盖 category-seo B1×25 不含 paper-bags 类目）

## 2. 真值表（products.ts SSoT）

| SKU | price_range (HK$) | basePrice_en | basePrice_ja | minQ | 材质克重 | 尺寸 | 工艺／手挽 |
|---|---|---|---|---|---|---|---|
| kraft-paper-bags | HK$3-8/個 | $1.84 | ¥240 | **100** | 牛皮紙 120–200g | 小/中/大或客製展開 | 燙金/燙銀/局部UV/覆膜；棉繩/紙繩手挽 |
| white-card-bags | HK$5-12/個 | $2.76 | ¥360 | **100** | 白卡紙 200–300g | 小/中/大或客製展開 | 覆膜/燙金/燙銀/局部UV/模切糊袋 |
| gift-bags | HK$10-20/個 | $4.60 | ¥600 | **100** | 白卡/特種/珠光 | 中/大或客製 | 燙金/局部UV/緞帶或棉繩手挽 |
| eco-paper-bags | HK$3-8/個 | $1.84 | ¥240 | **100** | FSC牛皮/再生紙（依供應）+大豆油墨 | 小/中/大或客製 | 手挽/可選燙金/覆膜 |
| handle-bags | HK$3-8/個 | $1.84 | ¥240 | **100** | 牛皮/白卡+棉繩或扁紙手挽 | 中/大為主 | 穿孔打釘/底卡加固/可覆膜 |
| large-bags | HK$6-15/個 | $3.45 | ¥450 | **100** | 250g白卡/300g牛皮/280g特種紋理 | 展開約 320×120×380mm | 燙金/擊凸/手挽繩/底部加固 |

- 全 6 SKU **minQ 统一 100 個起印**（products.ts 真值，与 category desc 一致）。
- 交期真值: kraft/eco desc「標準生產 3-5 個工作天」（PDP 正文同源）。
- 打样真值: kraft printMethod「可數碼打樣」→ 免費數碼打樣为可核口径；「即日打樣」见 §4 flag。

## 3. 主 URL 内链现状（2026-10-27 01:5x 线上）

| 方向 | 现状 | 结论 |
|---|---|---|
| category → 6 PDP | kraft/white-card/eco/handle/large/gift **6/6 均 True** | ✅ 已齐，无需新增 |
| PDP → category | kraft/eco/handle 抽查 **back-to-cat=True**（另 3 SKU 同源模板，抽查即证） | ✅ 已齐 |
| category ↔ guide | 待查（paper-bag guide 是否链 category；策略要求 guide 商业词链 category/PDP） | 🔶 次批补核 |

**结论**: BAG-P1-08「主 URL 内链」部分**已闭环**（6/6 双向），本轮不新增链接；仅需在报告中登记现状，防重复劳动。

## 4. 环保声明治理清单（K3-7 拍板项；BAG-P1-08 停止条触发点）

| # | 声明 | 位置（线上） | products.ts 真值 | 建议（分析师推荐） |
|---|---|---|---|---|
| 1 | **承重能力強** | **handle-bags H1 线上现挂** | 无承重实测字段 | 🔴 **违反停止条「无实测不写承重」——优先请 K3 裁决：删除或改为「手挽加固／底卡加固设计」描述性口径**（products.ts finishing 有「底卡加固」可支撑） |
| 2 | FSC 認證 | kraft title_zh + eco H1 + category desc | material「FSC 牛皮／再生紙（**依供應**）」 | 请业务给认证证据（证号/范围）；否则统一为「可選 FSC 認證紙材（視供應）」条件口径（真值已如此表述，与线上 H1 的绝对化「FSC 認證」冲突） |
| 3 | 再生紙 | eco H1「FSC 認證或再生紙」 | 同字段「再生紙」 | 同上（供应商确认可回收再生纸供货） |
| 4 | 大豆油墨 | eco desc/spec | material「大豆油墨」 | 供应商确认油墨合规（SGS/报告） |
| 5 | 免費設計打稿**即日打樣** | category desc | 仅「可數碼打樣」（免費） | 「即日打樣」为额外承诺，请业务确认时效；否则删「即日」 |
| 6 | 港九新界滿 HK$500 免費順豐速遞 | category desc + kraft desc | 无字段 | 运营承诺，与 packaging 簇同口径待业务确认 |
| 7 | 100%環保 | 纸袋簇范围**未发现**（已扫描） | — | ✅ 无需处理（记录在案防新增） |

## 5. 采购答案草稿（内部；待 K3 对 §4 拍板后落 category 首屏直答）

> 首屏直答（AEO 黄金法则：150 字内直接回答核心问题）：

- **起印量**: 100 個起印（全袋型統一）。
- **價格**: 牛皮紙袋 HK$3-8/個、白卡紙袋 HK$5-12/個、禮品袋 HK$10-20/個、大袋 HK$6-15/個（依尺寸/工藝/數量）。
- **尺寸**: 小／中／大標準袋型，支援客製展開尺寸（大袋基準 320×120×380mm）。
- **材質克重**: 牛皮紙 120–200g、白卡紙 200–300g、特種紋理紙 280g。
- **手挽**: 棉繩／紙繩／扁紙／緞帶／穿孔打釘＋底卡加固。
- **打樣**: 免費數碼打樣；印前展開圖與糊位檢查。
- **交期**: 標準 3-5 個工作天；港九新界滿 HK$500 免費順豐速遞。
- **工藝**: 燙金／燙銀／局部 UV／覆膜／擊凸。

- **袋型分工锚（category 内链 anchor 已存在，登记口径）**: kraft=入門基礎袋／white-card=高端白卡／gift=節日禮品／eco=ESG 環保／handle=手挽加固／large=服裝大袋。

## 6. 数据卫生发现

- category desc 价格带「HK$3-8/個」只覆盖 kraft/eco/handle 下限带，**未含** white-card（HK$5-12）／gift（HK$10-20）／large（HK$6-15）→ 采购答案建议写「HK$3 起/個，按袋型分檔（見下）」避免以偏概全。
- eco PDP H1 与 products.ts「依供應」口径冲突（H1 绝对化 FSC）→ 已列 §4-2。

## 7. NEXT（待 K3）

1. **K3-7 裁决 §4 清单**（优先 #1 承重、#2 FSC）→ 拍板后当日落地: category 首屏采购答案 + handle/eco H1 声明治理（1 src 批）。
2. **次批补核**: paper-bag guide ↔ category/PDP 双向链接现状。
3. **基线复测**: 11-23 同口径复跑（zh 纸袋簇 663 展示／3 点击基线）。

> 数据来源: products.ts L1355-1900；线上探针 2026-10-27 01:5x（3 URL）；基线冻结 v1.0；平行会话 packaging cleanup-plan（确认无纸袋重叠）。本包为内部文档，GSC/探针数据未入客户可见内容（§0.23.1）。
