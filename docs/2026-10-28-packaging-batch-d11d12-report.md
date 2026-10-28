# D11-D12 rigid（P1-JA-02）执行报告

> 日期：2026-10-28 · commit `d96186fb`（3 files 10+/10-）
> 依据：`docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` §9 PKG-P1-JA-02

## 0. 数据来源行（§0.23）

- 价格/MOQ：`src/data/products.ts` rigid（basePrice=8、basePrice_en=1.84、basePrice_ja=**240**、minQuantity=100，L3398-3401）
- 术语：C式/かぶせ式/中ゲス/木型/無地サンプル = ja 印刷包装行业标准术语（纸器箱构造，非编造）
- 门禁：title-v5 HARD=7（存量）/ tsc 54=54 / brand 0 / gsc 0

## 一、交付（全量 9 处 上製本箱 → 貼り箱（リジッドボックス））

| # | 位置 | 改动 |
|---|---|---|
| 1 | sku-seo rigid ja title | `上製本箱（リジッドボックス）｜100個〜 ¥240〜` → **`貼り箱（リジッドボックス）｜100個〜 ¥240〜｜ZprintPro`**（当量 53 ✓，¥240=basePrice_ja ✓） |
| 2 | sku-seo rigid ja desc | 病句 `リジッドボックスのリジッドボックスは` → `貼り箱・リジッドボックスの特注印刷は`；交期 7-10→**3-5 営業日**（与 body 真值统一） |
| 3 | sku-seo rigid ja h1 | **泛企业 H1** `高品質・短納期・グローバル配送...` → `貼り箱（リジッドボックス）特注印刷｜100個〜・C式/かぶせ式/中ゲス対応`（首屏明确产品+采购，P1-JA-02 验收） |
| 4 | sku-seo rigid ja body | 上製本箱 ×3 → 貼り箱；`HK$8-42/個` → **`¥240-1,260/個`**（JPY 本地化）；新增**结构术语段**：C式・かぶせ式（オーバーラップ）・中ゲス式・ブック型・引き出し式；木型（ダイカット型）标准尺寸免费、特殊形状按报价；無地サンプル（白箱）按报价确认（K3 无免费实物样拍板 → 条件化） |
| 5 | sku-seo rigid name.ja | `上製本箱` → `貼り箱（リジッドボックス）` |
| 6 | sku-seo rigid imageAlt ja | `上製本箱 / 化粧箱 | 香港の上製本箱印刷` → `貼り箱 / 化粧箱 | 香港の貼り箱印刷` |
| 7 | products.ts nameJa | `上製本箱 / 上製本箱 見積もり` → `貼り箱（リジッドボックス） / 見積もり`（面包屑/相关产品卡/JSON-LD 派生源） |
| 8 | products.ts imageAlt ja | 上製本箱 → 貼り箱；`最短3日` → `最短3-5日`（交期区间化） |
| 9 | category FAQ ja 价格表 | `上製本箱100個¥240〜` → `貼り箱100個¥240〜` |
| 10 | folding ja body 内链 | `[上製本箱](/ja/product/rigid-boxes/)` → `[貼り箱](/ja/product/rigid-boxes/)` |

## 二、验收（草案 §验收）

- ✅ ja 自然语言（貼り箱 前置 + 行业术语），非直译
- ✅ 首屏明确产品（贴り箱）与采购下一步（100個〜/¥240-1,260/見積もり CTA）
- ✅ 价格真值对照 basePrice_ja=240（title ¥240 / body ¥240-1,260）
- ✅ 无本の製本语义混入（上製本箱 全站 9 处清 0）
- ✅ 术语段真实（C式/かぶせ式/中ゲス = 纸器构造标准）；無地サンプル/木型特殊形状 条件化（无免费实物样断言）

## 三、执行教训

- **泛企业 ja H1 是全站模板**（sku-seo 17 SKU）——rigid 仅改 1 处，其余 16 处 = **watch 项**（D13+ 或后续批逐 SKU 修）
- **repInBlock 块定位**：en 替换用 `end='"ja": {'`（en 块在 ja 前）✓；**ja 块替换必须 `end='"faqs":'`**（ja 是 seo 末块）——两次踩坑（h1 0 匹配 / body 0 匹配）
- **dbg 截断误统计**：body 上製本箱 实为 3 处（dbg 2200 字符截断片段统计 5）——双方法复算教训再演

## 四、下一批

- D13 category/LINK（P1-LINK-01）：category 页采购锚 + LINK 强化（zh/en/ja）
- push 记录：`d96186fb` 待 10:18 窗口

## 五、watch 登记

- **全站 ja 泛企业 H1**（`高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。` ×16 SKU 未修）→ D13+ 或后续批逐 SKU 修（首屏产品词）
- en category `Made for USA` / gang-run ja title 混合中英 → 已有 watch（批 3 报告）
