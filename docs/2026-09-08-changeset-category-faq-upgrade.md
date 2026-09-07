# 2026-09-08 K3 执行层变更集（autoclaw）— 品类专属 FAQ 升级

> **改动文件**: 仅 `src/data/product-faqs.ts`（1 个文件，+5,218 字节）
> **依据**: K3 v4.0 指令 A3 改道裁决 + A6（SKU-2 FAQ 填充）+ A7（月曆 9/15 死线）
> **窗口合规**: 8/30 批验证窗（9/5-9/12）内 title/keywords 只读——本改动**零 title/description/H1 改动**，仅 FAQ 数据层（v4.0 裁决①明确窗内 FAQ 可做）
> **备份**: `F:\zprintpro-nextjs\.hermes\backups\product-faqs.ts.20260908-k3-faq-upgrade.bak`

## 变更 1：envelopes 品类专属 FAQ（替代 generalProductFAQs 兜底）

**Why**: 词图 v4.1 G1 梯队大信封簇（28d pos 3.1/48 imp/0 click = 当前最大零点击单词）落地于信封页，PDP FAQPage schema 原走通用兜底（品类盲：「產品印刷 最低訂量」泛化问答），无大信封尺寸/价格/工艺钩子=富摘要浪费。

**What**: 新增 `envelopesFAQs` 4 问 × 3 locale（zh-hk/en/ja），`coreProductFAQMap.envelopes` 指向更新。

**事实锚（products.ts 实测，禁编造）**:
- 信封品类 4 SKU price_range：HK$0.22-1.80 / HK$0.38-2.60 / HK$0.60-3.40 / HK$1.15-5.20，MOQ 100
- large-envelopes（EV-003）：basePrice 0.60，specs C4（229×324mm）等、100-120g 書紙、自黏封口/開窗
- 站内既有承诺（sku-seo-data.ts 信封条目 description）：3-5 工作天交货、DHL 全球 2-4 天

**FAQ 覆盖的搜索意图**（对应 G1/G2 词）：大信封印刷幾多錢/最低訂量（价格类）、LOGO 工藝（工艺类）、交貨時間/即日（交期类）、海外配送（B2B 跨境）。

## 变更 2：calendars 品类专属 FAQ（替代通用兜底）

**Why**: G5 季节窗月曆簇 28d ~238 imp 合计、9/15 死线（P0 #4 旺季补强收尾）；v4.0 裁决④「月曆=唯一已有点击的季节词」。

**What**: 新增 `calendarsFAQs` 4 问 × 3 locale，`coreProductFAQMap.calendars` 指向更新。

**事实锚（products.ts CL-001~006 实测）**:
- price_range HK$3-8/本，minQuantity 1000，specs A3（297×420mm）/A4、250-300g 銅版紙或啞粉紙、金屬圈
- features 原文：「13 頁設計（封面+12 個月）」「免費排版 每月版面設計與節慶標註」「500 本起印 大批量柯式，小批量數碼」「Q4 為高峰期，建議 10 月底前確認」
- basePrice_en 0.40 / basePrice_ja 50（跨币报价字段在库，FAQ 不换币转写，统一 HK$ 口径+「以报价为准」）

**FAQ 覆盖意图**：月曆印刷幾多錢（价格类·主词）、起訂量（MOQ 类）、9 月落單趸唔趸切/交期（紧迫类·直击 9/15 决策窗口）、定制公司資訊（B2B 定制类）。

## 前后对照

| 项 | 改动前 | 改动后 |
|----|--------|--------|
| `coreProductFAQMap.envelopes` | `generalProductFAQs`（通用 6 问，品类盲） | `envelopesFAQs`（4 问品类定制） |
| `coreProductFAQMap.calendars` | `generalProductFAQs`（通用 6 问，品类盲） | `calendarsFAQs`（4 问品类定制） |
| 注释块 | 「greeting-cards / books / calendars / menus / banners / red-packets / envelopes / educational」 | 「greeting-cards / books / menus / banners / red-packets / educational」（envelopes/calendars 移出兜底清单） |
| title/description/H1/keywords | 无任何改动（验证窗冻结纪律） | 无任何改动 |

## 验证记录

| 闸门 | 结果 | 证据 |
|------|------|------|
| 锚点唯一性断言 | PASS | 4 锚点各 count=1（编辑前 assert） |
| 回读校验 | PASS | 7 项检查全 PASS（定义/映射/旧兜底清零/注释更新/花括号平衡 delta=0） |
| tsc --noEmit | PASS（零新增） | HEAD 基线 54 错（quote-engine 测试既有，动态基线）vs 工作区 54 错，new=0/gone=0（stash 对照法，脚本 tsc_baseline.py） |
| check-encoding | PASS | returncode 0，No staged files |
| npm run build | 见 build 日志 | .hermes/logs/build-20260908-k3-faq.log |
| 跨语言污染 | PASS | zh-hk 无简体/日文形；en 无 CJK；ja 无简体/繁中形（人工核对 8 组问答原文） |
| 名片扫描 | PASS | 新增内容 0 命中 名片/咭片/business-card/名刺 |
| 数据诚信 | PASS | 价格/交期/Q4 话术全部锚 products.ts 字段；2026-09 时间戳标注；无 4 位数无来源数字 |

## 影响面

- 生效页面：`/[locale]/product/envelopes/*`（4 SKU）与 `/[locale]/product/calendars/*`（6 SKU）× 3 locale = **30 个 PDP** 的 FAQ 手风琴 + FAQPage JSON-LD（page.tsx L203-209 渲染链）
- 不影响：其他 12 个品类映射、category/PLP 页、blog、sitemap、_redirects
- 回滚方法：`copy F:\zprintpro-nextjs\.hermes\backups\product-faqs.ts.20260908-k3-faq-upgrade.bak F:\zprintpro-nextjs\src\data\product-faqs.ts` 后重跑 build；或 git 层 `git checkout -- src/data/product-faqs.ts`（未 commit 时）/ `git revert <hash>`（commit 后）

## K3 待确认

1. push 放行（触发 CF Pages 部署，5-20 分钟后线上可见；验收探针建议用 next.config 独有路径）
2. sku-seo-data.ts 的 faqs 字段无消费方问题（masterplan §四-9）：普查回收后 top10 填充的落点架构（product-faqs.ts 加 SKU 级映射 vs 补渲染链）
