# Blog 资产审计 · 《两周执行方案 v2》§4 B1–B8
> 审计日期 2026-10-22 · 只读审计，未改动任何源文件 · 判据由 `docs/2026-10-16-two-week-execution-plan-v2.md` §4（12 段骨架 / ≥2500 字 / ≥2 内链 / 数字真值）与本任务验收口径（≥2500 字符、≥8 个 `<h2>`）合成
>
> **数据来源**（§0.23 强制行）:
> - `src/data/blog-data/{zh-hk,en,ja}.json`（`content` / `title` / `description` / `date` 字段，Node utf8 直读，2026-10-22）
> - `src/data/blog-posts.ts`（`slug` / `date` meta，逐条比对）
> - `public/sitemap-{zh-hk,en,ja}.xml`（`<loc>` 是否收录）
> - `src/data/products.ts`（真值：`price_range` / `basePrice` / `basePrice_en` / `basePrice_ja` / `minQuantity`）
> - 外部口径：comiket.co.jp「Comic Market 109 … December 29-31, 2026」
> - 校准状态：已校准（2026-10-22，脚本复算，输出见下表）

## 1. 八行总表

| # | slug | 存在 | 正文字符（去标签 / 原始 HTML） | `<h2>` | 内链 href | 快速答案块 | 数字真值 | GSC 黑话 | date |
|---|---|---|---|---|---|---|---|---|---|
| B1 ja | `new-year-card-printing-2027-guide` | ✅ | **5455** / 10528 | **11** | 21 | ✅「クイック回答」×3（非标准文案） | ✅ ¥20 起 / 10 枚 / 3〜5 営業日 | 0 | 2026-10-09 |
| B2 ja | `comiket-printing-prep-guide` | ✅ | **3265** / 7305 | **5** ❌ | 14 | ❌ | ✅ ¥7,500 / 10 冊 / 7 営業日 | 0 | 2026-09-29 |
| B3 en | `comiket-printing-prep-guide` | ✅ | **6755** / 10731 | **5** ❌ | 13 | ✅ Quick Answer | ✅ ¥7,500 / HK$6 / 4 days | 0（1 处 "first impression" 为营销词） | 2026-09-29 |
| B4 zh-hk | `cny-2027-red-packet-printing-guide` | ✅ | **3314** / 7382 | **7** ❌ | 13 | ✅ 快速答案 | ✅ HK$1.10 / 100 個 | 0 | 2026-09-30 |
| B5 zh-hk | `corporate-calendar-customization-2027` | ✅ | **2241** ❌ / 4354 | **7** ❌ | 8 | ✅ 快速答案 | ✅ HK$3-8 / 1 本 | 0 | 2026-10-16 |
| B6 en | `calendar-sizes-print-reference` | ✅ | **4236** / 5572 | **8** | **1** ❌ | ✅ Quick Answer | ⚠️ US$0.40 + 尺寸表，**无 MOQ/交期数字** | 0 | 2026-10-16 |
| B7 en | `corporate-holiday-cards-printing-guide` | ✅ | **8035** / 12041 | **8** | 13 | ✅ Quick Answer | ✅ US$0.13 / 10 cards / 4 days | 0 | 2026-10-10 |
| B8 zh-hk | `paper-bag-printing-guide` | ✅ | **5933** / 12859 | **5** ❌ | 10 | ❌ | ⚠️ 有数字但 **HK$1.5/個 与真值冲突** | 0 | 2026-07-02 |

## 2. 逐条判定依据（字段级）

### B1 ja 年賀状 2027 — 结构达标，文案口径非标准
- 存在：`ja.json` 键 + `blog-posts.ts` `slug` + `sitemap-ja.xml` `<loc>https://zprintpro.com/ja/blog/new-year-card-printing-2027-guide/</loc>`
- 字义：`content` 去标签 5455 字符；`<h2>` 11 个（发包时间表 / 6 SKU 价格 / 纸与工艺 / 入稿规格 / 喪中はがき / 法人 / 早割 / 品质 / 要点 / FAQ / CTA），`<table>` 3
- 快速答案：3 块文案为「クイック回答」，**不含**「快速答案 / Quick Answer」，`blog/[slug]/page.tsx` 的 `qa-answer` 识别规则（首段含「快速答案」）不会命中 → 无琥珀样式
- 真值：¥20 = `premium-greeting-cards.basePrice_ja` 20；10 枚 = `minQuantity` 10；3〜5 営業日与正文一致
- date：`date` 2026-10-09 = `blog-posts.ts` `date` 2026-10-09

### B2 ja コミケ — 结构不足 + 主题未落到「締切カレンダー」
- 字符 3265（过 2500），但 `<h2>` 仅 5（コミケ 109 準備スケジュール / 品目と価格 / 24 時間特急 / 入稿仕様 / FAQ）→ 不足 3 节
- 全文正则 `C107|締切|カットオフ|冬コミ|12月|コミケット` **0 命中**；标题「コミケ 同人誌印刷 10冊から 24時間特急対応」无 C107/締切
- 无快速答案块（同 slug 的 en 版有 → 跨语种不对等）
- 真值：¥7,500 = `doujinshi-printing.price_range`「¥7,500〜/部〜」，10 冊 = `minQuantity` 10

### B3 en Doujinshi — 结构不足，编号与 plan 不一致
- 字符 6755，`<h2>` 5（Prep Timeline / Items and Price / 24-Hour Rush / Artwork Specs / FAQ）→ 不足
- 主题：正文写 **Comiket 109 / December 29-31, 2026**（官网一致），全文无 `C107`；plan §4 写 C107，属 plan 编号笔误（C107 = 2025 冬）
- 内链 13、Quick Answer 有、真值齐（4 days / 10 pcs / ¥7,500）
- GSC：唯一 `impression` 命中为 "the first impression at your booth"，非后台黑话 → 判 0

### B4 zh-hk 利是封 — 真值正确，但 plan 生肖写错、h2 差 1
- 字符 3314，`<h2>` 7 → 不足 1 节
- 生肖：正文写「2027 年農曆新年（**丁未羊年**）…2027 年 2 月 6 日」，全文 `馬` 0 命中 → 内容正确；**plan 的「2027 馬年」是错的**（2026 才是丙午馬年）
- 真值：HK$1.10 = `foil-red-packets.basePrice` 1.10，`price_range` HK$1.10-4.80/個，`minQuantity` 100 ✅

### B5 zh-hk 企業月曆 — 唯一字数不达标
- 字符 **2241 < 2500**（缺口 ~260），`<h2>` 7 → 双不达标
- 真值：HK$3-8 / 1 本 = `desk-calendars`/`wall-calendars`/`custom-calendars` 三处 `price_range` HK$3-8/本、`minQuantity` 1 ✅
- 快速答案有、内链 8 ✅；标题缺「2027」「企業」字面（`title` = 月曆印刷訂製：尺寸×掛裝×紙材速查 1 本起 HK$3-8）

### B6 en Calendar Sizes — 内链仅 1（门槛 ≥2 未过）
- 字符 4236、`<h2>` 8 ✅、Quick Answer ✅、`<table>` 2 ✅
- 内链：`content` 内 `<a href>` 共 2 个，其中内部 1 个（`/en/quote/`），其余为 wa.me → 主题集群内链为 0
- 真值：US$0.40 = `desk-calendars.basePrice_en` 0.40 ✅；但无 `minQuantity`（1 本）与工作天数字 → 「MOQ/交期」真值缺位

### B7 en Holiday Cards — 八项全过
- 字符 8035、`<h2>` 8、内链 13、Quick Answer、`<table>` 3
- 真值：US$0.13 = `premium-greeting-cards.basePrice_en` 0.13 ✅，10 cards = `minQuantity` 10 ✅，4 days 一致
- 备注：`description` 332 字符，超 §5「150-160」口径（不属本次 8 项判据，记录备查）

### B8 zh-hk 紙袋 — h2 不足 + 无快速答案 + 真值冲突（最高风险项）
- 字符 5933、`<h2>` 5（+`<h3>` 7）、内链 10、无快速答案
- **真值冲突**：正文「牛皮紙袋訂製 — 環保首選, **HK$1.5/個起**」；`products.ts` `kraft-paper-bags` 为 `price_range: 'HK$3-8/個'`、`basePrice: 8`、`minQuantity: 100` → 正文低价无源，违反 §0.23
- date 2026-07-02（全批最旧，未按 2027 口径更新）

## 3. 汇总结论

**缺失：0 篇**（8/8 均已在 `blog-data` + `blog-posts.ts` + sitemap 三处齐备，plan §4「待写」状态列已过期）。

**结构性不达标（按 §4 口径）**
- 字数 <2500：**B5**（2241，唯一）
- `<h2>` <8：**B2 (5)、B3 (5)、B8 (5)、B4 (7)、B5 (7)** —— 5 篇
- 内链 <2：**B6**（1）
- 快速答案缺：**B2、B8**；**B1** 有 3 块但文案为「クイック回答」，不触发 `qa-answer` 样式
- 数字真值冲突：**B8**（HK$1.5 vs HK$3-8）；真值不完整：**B6**（无 MOQ/交期）
- 主题偏差：**B2**（无 C107/締切字面，实为通用备战篇）、**B3**（写 C109 而非 plan 的 C107，plan 编号错）
- 完全达标：**B7**；结构达标但口径待修：**B1**

**口径纠错（plan §4 两处需改）**
1. B2/B3「C107」→ 应为 **C109**（2026-12-29~31，comiket.co.jp 与正文一致）
2. B4「馬年」→ 应为 **羊年（丁未）**（2027-02-06）

## 4. 复算方法（可复核）
- 字符数：`content.replace(/<[^>]+>/g,'')` 后压缩空白取 `length`
- `<h2>`：`/<h2[\s>]/gi` 计数
- 内链：`/href\s*=\s*["']([^"']+)["']/gi` 中 `startsWith('/')` 或含 `zprintpro.com` 者
- 真值：与 `products.ts` 的 `price_range` / `basePrice(_en/_ja)` / `minQuantity` 逐条比对
- 双方法复核：sitemap `<loc>` 与 `blog-posts.ts` `slug` 两条路径均命中，未出现「单方法假 0」
