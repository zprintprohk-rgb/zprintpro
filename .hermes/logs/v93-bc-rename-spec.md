# 名片 SKU 回归规格（K3 2026-09-12 拍板 · 执行前必读）

> 拍板原话：「把这个贺卡的SKU改回名片，咭片，这就一款厚卡的，因为英国的客户是订的750-810G的，三合一的高档卡片，才有利润，或者还有哪个是描述高档的名片相关的，就保留2款是名片的SKU，这样决定了，在贺卡下，保留两款名片的SKU，一个6个SKU不变」「其它按推荐执行」
> 配套规则层：`AGENTS.md` §0.0 解禁块（2026-09-12）｜门禁 `scripts/check-bc-ban.mjs` 已降级为报告式

## 一、6 个原名片 SKU → 处置表（总数 6 不变）

| # | slug（**不改**，改 slug = churn 红线） | 现名 | 处置 | 理由 |
|---|---|---|---|---|
| 1 | `premium-greeting-cards` | 高級賀卡 | **→ 名片（高級名片）** | 「高級」正是「描述高档的名片」；原 slug 即 `premium-business-cards`，语义平移最干净；该 SKU 无专属贺卡场景词，改走损失最小 |
| 2 | `thick-greeting-cards-400g` | 厚身賀卡(400g) | **→ 名片（厚卡名片）** | 就是老板点的「一款厚卡的」；对口英国客户 750-810g 三合一高档卡（有 400+ USD 成交实证） |
| 3 | `foil-greeting-cards` | 燙金/燙銀賀卡｜賀卡/燙金工藝/婚禮卡 | **保贺卡** | 名称含**婚禮卡**场景词，已有独立流量资产；改名片会烧掉婚禮词（备选：若老板更想要燙金名片，则本款改名片、第 1 款保贺卡） |
| 4 | `spot-uv-greeting-cards` | UV局部光油賀卡 | **保贺卡** | UV 局部光油在名片语境多为「厚卡+UV」组合工艺，由第 2 款承载即可 |
| 5 | `matte-greeting-cards` | 啞膠賀卡 | **保贺卡** | 哑胶非「高档名片」描述词 |
| 6 | `rounded-corner-greeting-cards` | 圓角賀卡 | **保贺卡** | 圆角非「高档名片」描述词 |

**执行层拍的 2 款 = `premium` + `thick-400g`**；老板若指定燙金，则改为 `foil` + `thick-400g`（一行切换，见 §四）。

## 二、第 2 款的两条候选（差异化，供老板一句话裁）

- **premium（我的推荐）**：`premium-business-cards` 是原名片 slug，语义/关键词平移零损耗；「高級名片」是通用高档名片词，不抢其它 SKU 的场景词。
- **foil**：燙金名片是名片行业最经典的高档工艺词，搜索意图强；**代价** = 现 `foil-greeting-cards` 承载的「燙金賀卡 / 婚禮卡」资产要一并转移或弃用（churn）。

## 三、厚卡名片规格要点（英国订单实证驱动）

- 客户实证：**750-810g 三合一高档卡片**，成交 **400+ USD**（K3 2026-09-12 口述，§0.23 已标来源=K3 口述，未经 008 台账校准）
- 现 `thick-greeting-cards-400g` 仅 **400g** → 需补「厚卡档位」描述：400g 标准厚卡 + **700-810g 三合一/裱贴**高档档位（**具体克重与裱贴工艺须 K3 确认可用产能**，不得编造）
- 名片高价值工艺组合：厚卡 + 燙金/燙銀 + 局部UV + 圓角 + 三合一裱贴

## 四、执行清单（下一轮按序做，全程 Edit 定点改，守 v9.3.1 R1-R4）

1. `src/data/products.ts`：改 **2 款**的 `name/nameEn/nameJa`、`title_zh/title_en/title_ja`、`description*`、`longDescription`、keywords —— 将贺卡语义替换为名片/咭片/business card/名刺；**slug 不动**；**另 4 款一字不改**
2. `src/data/sku-seo-data.ts` + `src/lib/seo.ts`：2 款对应 SEO 字段按 **v4 写满原则**（50-54 半角当量）改词
3. 类目归属：老板口径 =「**在贺卡下**保留两款名片 SKU」→ 最低成本 = 挂在 `greeting-cards` 类目内、以「名片 / 咭片」标签区分；**若**要独立类目页则走 §五（选项 c 承接页），二者不冲突
4. 新承接页（§五）：`/{locale}/category/name-cards/`（或 `business-card-printing`）三语 + title/description/H1/FAQ + 内链指向 2 款名片 SKU
5. `src/middleware.ts`：4 条旧名片 301（premium/thick/foil/spot-uv-business-cards）→ **第 1 步不动**，等承接页上线观察 2-4 周再决定是否改指向（避免 churn）
6. 门禁 4 件 + 探针：tsc 54=54 / build exit 0 / bc-ban（现为报告式，0 阻断）/ encoding；线上探针查 2 款新名片 SKU + 承接页 200
7. **禁止**：改 slug / 删任何既有文案字段（§0 F0）/ 动其余 4 款 / 回滚 v22 已部署 title

## 五、展示层选项 (c)（老板已批「其它按推荐执行」）

新增 1 个「名片 · 咭片印刷」承接落地页（**不动**贺卡资产、不动 301），抢回 GSC 实测的 **286 展示/月、0 点击、pos 31-39** 的名片搜索需求。属「新页面」→ 按 §0.25.10.5 **不走免预览直推**。

## 六、GA4 缺口（008 度量层实测缺口，需 K3 补）

- cron prompt 引用的 `scripts/fetch_ga4_events.py` **在仓库中不存在**（实测 `python scripts/fetch_ga4_events.py --days 7` → exit=2, can't open file）
- 现有凭证：GSC service account `C:\Users\Administrator\gsc-key.json`（2424B, 2026-07-07）；`.env.production` 只有 `NEXT_PUBLIC_GA_ID`（测量 ID，**不能**用于 GA4 Data API）
- **需要 K3 给**：GA4 **property ID**（形如 `properties/XXXXXXXXX`）+ 确认该 service account 已被加入 GA4 媒体资源（只读）→ 拿到后我建 `scripts/fetch_ga4_events.py` 拉 09-10~09-12 的 `whatsapp_click` × 落地页/来源，把「为什么名片询盘集中」从推断升级为实测
- 在此之前：原因结论保持「推断」标签（证据 = GSC 09-03 快照 286 展示/0 点击 + 案例/内容层名片语境 + K3 口述三单）

## 七、数据来源

- K3 2026-09-12 口述（三单：HK 小单 ×2 / 英国地产 400+ USD / 美国名片+A4三折页）
- `GSC数据/gsc-fresh-2026-09-03.json`（calibration_date 2026-09-03）
- 本轮实测：`products.ts` 6 SKU 行号（L137/235/333/430/525/622）、`middleware.ts` L98-103 旧名片 301 映射、`case-studies/page.tsx` 名片语境 8 行、全站「卡片」250 命中
