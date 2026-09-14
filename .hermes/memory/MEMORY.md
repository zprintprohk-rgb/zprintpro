# MEMORY.md — ZprintPro 项目记忆

## 品牌规则（K3 9/14 第 3 次澄清，最重要，凌驾旧口径）

**核心口径（K3 原话要点）**:
- **ZprintPro 是我们的域名/品牌前缀**，本身不是禁词——「加上 ZprintPro 是想让客户一看就能记得我们的域名，直接输入就可以了」
- **智印港 也是非常好记的中文品牌词**（zh-hk 用）
- **只禁：title 里双品牌同现**（「智印港 ZprintPro」同时出现在 title = 占黄金位置字符数，浪费）
- **正文出现 ZprintPro 单现 = 合法且有益**（品牌+域名提示），不用改、不用避免
- 小写域名 `zprintpro.com` 出现在正文 URL 完全正常（101 处基线）

**执行矩阵**:
| 位置 | 规则 |
|---|---|
| title (title/seoTitle/metaTitle/title_zh 等) | ❌ 禁双品牌同现；zh-hk title 用智印港；禁 ZprintPro 字面 |
| 正文 content | ✅ ZprintPro 单现合法（域名提示）；智印港单现合法 |
| 双品牌同现（智印港 ZprintPro 紧邻） | ❌ 全站禁（BRAND_DOUBLE 红） |
| URL/域名 zprintpro.com | ✅ 合法保留 |
| en/ja | ZprintPro 单品牌；智印港禁 |
| ja ジープリント | alternate 埋点，不与 ZprintPro 字面同现 |

**门禁配套（2026-09-14 已落地）**:
- `brand-guard.js` BRAND_LOCALE_MISMATCH: zh-hk 正文 ZprintPro 单现放行，仅 title 类字段禁
- `common.js` isInTitleField: 按 JSON 顶层键值区间判定（9/9 单测过）
- 括注形态「智印港（ZprintPro）」由 GLOSS 豁免保留（K3 9/13 拍板实体消歧别名）

## 主营品类（2026-06-28 确认）

- **核心产品线**: 貼紙 / 宣傳單張 / 包裝盒
- ❌ **绝对不要写"名片"**：包括标题、描述、关键词、产品页内容、AI 搜索文本。ZprintPro 不经营名片业务。
- SEO/GEO 文本中任何提及"名片/咭片/business cards/名刺"的，一律改为"貼紙/宣傳單張/包裝盒"。

## 3 Locale 独立策略（2026-06-28 v4）

- **zh-hk**: 虚拟 HK 地址 + +852 + LocalBusiness（灰色合规，用户接受）
- **en**: 深圳工厂透明 + +86 + Organization（跨境定位）
- **ja**: 深圳工厂严格合规 + 法人明记 + Organization（特定商取引法）