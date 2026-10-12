# 荧光贴纸裁决 · 卷裝貼紙新建 · 全局无用 SKU 处置方案

> **状态**: ✅ **已完成并上线** — push `5cc341b4`（含 11 图）→ 探针 16/16 PASS（2026-10-12 16:1x）
> **日期**: 2026-10-12 · 执行层: deepseek hermes 人手会话
> **线上探针数据来源**: `.hermes/_roll_probes.py` 实测 zprintpro.com（串行+间隔+三重校验）— roll 三语 200 + 荧光 301→roll ×3 + Tier1 八 301 目标全对 + webp 200；CF Pages 部署耗时 170s
> **生图数据来源**: doubao-seedream-5-0-flash-260915 API（账户 2122227803），2048² PNG 原图 11 张存 `.hermes/_roll_raw/`，费用 1.20 元（额度 2.88 内）
> **触发**: K3 指令「把荧光贴纸替换成卷裝貼紙……深度思考理解问题，荧光贴纸是没有看到一个实际搜索依据，穷尽100%能力分析研究后给到解决方案，同时也一并全局思考现有SKU明显无用的SKU处置方案」

---

## 一、荧光贴纸（fluorescent-stickers）裁决：替换成立 ✅

### 1.1 站内搜索证据（一手，无可辩驳）

GSC 28 天（2026-09-08~10-06，三站点汇总，来源 `GSC数据/*28天*.xlsx` 网页+查询 sheet → `.hermes/analysis/gsc-product-page-imps-28d.json` / `sticker-family-gsc-28d.txt`）：

| 贴纸 SKU | 网页曝光 | 点击 |
|---|---|---|
| small-batch-stickers | 194 | 0 |
| waterproof-stickers | 149 | 0 |
| transparent-stickers | 107 | 0 |
| removable-stickers | 88 | 0 |
| foil-stickers | 63 | 0 |
| **fluorescent-stickers** | **39** | **0** |
| die-cut-stickers | 39 | 1 |
| security-stickers | 18 | 0 |
| fruit-food-label-stickers | 23 | 0 |

查询词级：螢光/荧光/fluorescent 全族 6 词 32 曝光 0 点击（custom fluorescent stickers / fluorescent sticker paper / neon sticker printing / 螢光貼紙 等）。**荧光 = 全簇倒数第三、0 点击、无任何长尾词进来**。K3「没有实际搜索依据」的直觉被数据证实。

### 1.2 业务性质佐证

- 荧光是**一次性促销点缀品**：低客单、无复购、无 B2B 产线绑定；与站内战略（B2B 标签/包装产线客户，见 fruit-food 食品标签 23 imps 的存在感）方向相反。
- 产品仍在产（quote 引擎 fluorescent 键保留接单能力即可，展示页退役不影响报价接单 —— 若 K3 要连报价键一起删，另说一句）。

### 1.3 处置路径（推荐）

荧光 PDP 退役 + **301 → /product/roll-stickers/**（承接 39 imps 的微薄权重与任何外链；不 410，因为 URL 已被 GSC 收录，410 会白扔重新爬取预算）。

---

## 二、卷裝貼紙（roll-stickers）新建方案

### 2.1 为什么这是对的替换（外部证据）

| 证据 | 数字 | 来源 |
|---|---|---|
| 全球 roll-fed labels 市场 | **$12.5B (2024) → $18.7B (2033)，CAGR 4.5%** | [Strategic Packaging Insights](https://www.strategicpackaginginsights.com/report/roll-fed-labels-market) |
| 美国市场 | $3.5B，CAGR 5% | 同上 |
| 中国市场 | $1.8B，**CAGR 7%**（全球最快之一） | 同上 |
| 最大应用行业 | **食品饮料**（其次制药/个护） | 同上 + [Research and Markets](https://www.researchandmarkets.com/reports/6012455/roll-fed-labels-market-type-application) + [GII 日版](https://www.gii.co.jp/report/ires1855396-roll-fed-labels-market-by-adhesive-type.html) |
| 增长驱动 | **数码短版定制**（正是本厂模式）、电商扩张 | SPI 报告 Opportunities 节 |
| 需求形态 | 贴标机量产线 = **高频复购 B2B**，与荧光一次性促销相反 | [Avery roll vs sheet 指南](https://www.avery.com/blog/should-you-use-roll-labels-or-sheet-labels/) + [Onpack applicator-ready roll labels](https://www.onpack.com.au/roll-labels/) |

### 2.2 决定性事实：报价引擎已支持卷裝，零新增产线风险

`src/data/price-tables/digital-stickers-cost.json` cfg[4]（供应商实询档，本地化为「卷裝/平裝標籤」）+ `scripts/gen-price-data.mjs` L98-103：

| 数量 | HKD | USD | JPY | 单张 |
|---|---|---|---|---|
| 10 | 55 | 7 | 1,100 | 5.50 |
| 25 | 57.5 | 7 | 1,160 | 2.30 |
| 50 | 61 | 8 | 1,220 | 1.22 |
| 75 | 65.5 | 8 | 1,320 | 0.87 |
| 99 | 70 | 9 | 1,400 | 0.71 |
| 3000 | 610 | 78 | 12,200 | **0.20** |

规格真值（报价引擎原文）：**卷芯直徑 4cm · 出標方向橫版左出標 · 每卷 1000 張 · 格仔底紙/銅板熱熔膠 · 150×100mm · 異形模切 · 不覆膜**。另同表 4 条 HP Indigo 數碼標籤配置（片裝覆光膜 105×148/210×148/210×297，10 張起）可作页内「卷裝 vs 片裝」對照与升级选项。

**Qwen 稿的教训已吸收**：它整页驳回只因 SKU 不存在+死链；产品判断（roll label 值得做）本身是对的，被报价引擎数据证实。其编造数字（±0.15mm/95% 遮光/8,000 单/年/MOQ 50/Sato·Zebra·Cab·TSC 贴标机型号表）**一律禁用**。

### 2.3 新建执行清单（9 系统，全走既有管线）

| # | 系统 | 动作 | 权威源 |
|---|---|---|---|
| 1 | `scripts/gen-price-data.mjs` | 增 `map['roll-stickers']`（defaultConfigIndex=4 卷裝档），`node scripts/gen-price-data.mjs` 重生成 | 生成器 |
| 2 | `src/lib/pricing.ts` | 增 roll-stickers 键（仿 fluorescent L367 结构） | 手写+对照 price-data |
| 3 | `src/data/products.ts` | 新条目：slug `roll-stickers`，category stickers，id 顺延 ST 序列，minQuantity 10，basePrice **HK$0.20 / $0.03? / ¥3?**（待拍板①：锚点），weight 80-85，name 卷裝貼紙/Roll Labels/ロールラベル | K3 定价拍板 |
| 4 | `zprintpro-sku-seo-data.csv` | 新行 ×（title/desc/h1/keywords/alt ×3 语）→ `csv-to-sku-seo.mjs --apply` | CSV 权威域 |
| 5 | `src/data/sku-seo-data.ts` | body ×3 语直写（ts 权威例外域）：貼標機產線決策頁（卷芯/出標方向/每卷張數/熱熔膠 vs 水膠/食品間接接觸），锚差异化 = 「機貼 vs 手貼」+「卷裝 vs 片裝對照」+ fruit-food 互鏈 | ts 直写 |
| 6 | `src/data/products-content.ts` | 新内容块（PDP 中段） | 手写 |
| 7 | `src/data/print-method-policy.ts` | 增条目（仿 L124/280） | 手写 |
| 8 | `src/middleware.ts` | **追加** `'fluorescent-stickers' → '/product/roll-stickers/'` 301（不动现有任何映射，§0.0 贺卡映射零接触） | 手写 |
| 9 | 荧光退役 | 删 products.ts 条目 + pricing 键 + products-content 块 + policy 条目 + CSV 行 + sku-seo 块（regen 同步）；图片 webp 归档不删文件 | — |
| 10 | sitemap ×6 + IndexNow 3 语 ×新页 + GSC 手动索引 | generate-sitemap + ping | 生成器 |

**页内 SEO 定位（差异化锚）**：主词 卷裝貼紙 / roll labels / ロールラベル；长尾 L1 取自 GSC 食品标签族（batch label / die cut labels / 防水標籤貼紙 —— `sticker-family-gsc-28d.txt` 通用族真实查询）；决策表 = 卷芯 4cm·出標方向·每卷 1000 vs 片裝；内链 = fruit-food-label-stickers（食品标签锚页 23 imps）、waterproof-stickers、安全线 security-stickers。**禁用** Qwen 全部数字。

### 2.4 硬依赖：图片资产（阻塞项）

新 PDP 需要 `/images/products/seedream-webp/zprintpro-stickers-roll-stickers-{zh-hk,en,ja}-*.webp` 实拍级图片（hero/detail/multi-angle/variety 各 locale 3-4 张）。两条路待拍板②：K3 供厂拍图 / 走 seedream AI 生图管线（现有贴纸图同款流程）。

---

## 三、全局明显无用 SKU 处置方案

### 3.1 裁决框架（先立规则，再砍）

1. **季节性 SKU 只在季内判**——red-packets 6 兄弟 10 月全 0-2 imps 是**正常淡季**（CNY 峰值 11-1 月），**保留不动**；calendars 同理（10 月正是年曆季，custom-calendars 257 imps 全簇第 3 可证品类活着）。
2. **零曝光 + 非季 + 无战略价值 + 批量长尾出身** → 退役/合并（301 收拢）。
3. **低曝光但产线真实/战略卡位** → 保留（security-stickers 18 imps：VOID/易碎紙真产线，B2B 防伪卡位）。
4. **数据窗不足不动刀**：当前只有 28d 窗（GSC 3mo 窗连续第 2 档缺失，`GSC数据/index.json` freshnessNote 已记），本方案只动「结构性无用」项，不動「疑似弱」项。

### 3.2 Tier 1：结构性无用（建议退役或合并，待拍板③）

GSC 28d 网页曝光（`.hermes/analysis/gsc-product-page-imps-28d.json`）：

| SKU | imps | 出身 | 建议 |
|---|---|---|---|
| drink-tokens（酒水牌/飲品標記） | **0** | 2026-08-18 place-cards 批量长尾族 | 退役 301 → place-cards |
| cafe-table-cards（餐廳枱卡） | **0** | 同上 | 退役 301 → place-cards |
| wedding-place-cards（婚宴枱卡） | **0** | 同上 | 退役 301 → place-cards |
| save-the-date-cards | **0** | 同上 | 退役 301 → wedding-invitations |
| wedding-seating-charts | 1 | 同上 | 退役 301 → wedding-invitations |
| wedding-suite-bundle | 2 | 同上 | 退役 301 → wedding-invitations |
| eco-tote-bag（環保托特袋） | **0** | 孤立实验品 | 退役 301 → paper-bags（或問 K3 是否产线已停） |
| postcard-set（明信片套裝） | 1 | 孤立实验品 | 退役 301 → japan-doujin 族或 greeting-cards |
| wedding-invitations / place-cards（两个**母页**自身） | **0 / 0** | 同上批量族 | **保留母页**（结构锚），但其 8 个子项中 6 个零曝光 → 子项收拢 |

同族有脉搏的保留：foil-wedding-invitations 19 imps/1 click、wedding-thank-you-cards 26 imps。

**结构性佐证**：该族 8+2 个 SKU weight 全部 =50（全场最低档）、optimizedAt 全空、28 天母女页+6 子页零曝光 —— 2026-08-18 批量建页后从未被搜索市场认领。

### 3.3 Tier 2：弱但不动（记录在案）

| SKU | imps | 不动理由 |
|---|---|---|
| japan-doujin | 0 | 需求集中在 doujinshi-printing（237/2），保留观察 1 窗，再弱则 301 收拢 |
| small-bags | 0 | ts-only 孤儿（CSV 排除已立案），走 B1c 尾巴清理，不在本次 |
| gang-run-card-boxes | 0 | 「免刀模費」战略卡位，保留 |
| thick-paper-flyers / display-posters / disposable-menus / pearl-envelopes / tuck-end-boxes / rigid-boxes 等 ≤5 imps | 1-5 | 强簇内正常长尾分布，不动 |

### 3.4 §0.0 关联输入（供 K3 的 (a)/(b)/(c) 裁决，本次不动）

4 个 0 曝光贺卡槽：**thick-greeting-cards-400g / spot-uv-greeting-cards / matte-greeting-cards / rounded-corner-greeting-cards 28d 全 0 imps**（premium 3 / foil 2）。即：改名贺卡后近一个月搜索市场零认领——「贺卡改名承接名片权重」策略未生效的数据证据，供 (a)/(b)/(c) 裁决参考。按 §0.0，本次**不碰**。

---

## 四、执行结果（2026-10-12 13:02 commit f9935e4b，25 文件）

K3 四项拍板全批（HK$0.20 起 / seedream AI 生图 / Tier1 全名单 / 301→roll-stickers）。已落地：

| 系统 | 动作 | 验证 |
|---|---|---|
| gen-price-data.mjs | +`map['roll-stickers']`（defaultConfigIndex=4，锚定尊重修正 + sheets 单位） | 20 slug 断言过，anchor HK$0.20/10張整批 HK$55 ✓ |
| pricing.ts | 荧光键→roll-stickers（en 0.03-0.71 / ja 4-110）；postcard-set/eco-tote-bag 锚删 | — |
| products.ts | 删 9 条目 + 新建 ST-010 roll-stickers（全真值字段 + variables 六档） | tsc 54 基线 ✓ |
| CSV + regen | 删 9 行 + roll 行 31 列；regen --apply 五断言 PASS、二次跑完全幂等 | 0 漂移 ✓ |
| sku-seo-data.ts | roll 块 body ×3 直写（卷裝決策頁 + fruit-food/waterproof 內鏈）；删 9 块 | — |
| title 门童 | 初版 en 70 / ja 62 当量超阻断 → 修正 en 57 / ja 56 / zh 54 | HARD 11→8（余 8 全存量）✓ |
| middleware.ts | QUOTE 映射重指 + 新增 RETIRED_PRODUCT_REDIRECTS 九键 + 处理器（优先级 2.65） | 直接 /product/ 旧 URL 301 ✓ |
| QuoteRedirect.tsx | 荧光键重指 roll-stickers | — |
| products-content / policy / image-alt-map / scenario-links / DoujinSKU | 荧光块删；policy 键 swap；2 块删；2 场景改指 doujinshi-printing；6 卡删 | — |
| SkuSeoBody.tsx | renderLine 改 parseInlineLinks 組件化（SOP-10 #5），废 dangerouslySetInnerHTML | **bold** 行为保留 ✓ |
| blog-data ×3 | 91→83 计数修正（8/7/7 处） | — |
| sitemap ×4 + image + content | 全量 regen；IndexNow 3 locale 随脚本已 ping | roll 在列、9 退役 0 残留 ✓ |
| 相似度 | roll body vs 8 贴纸兄弟 8-gram Jaccard | max 0.104（簇1 门槛 0.35）✓ |
| gsc-leak / brand / encoding 门童 | 全绿 | ✓ |

### 遗留（图齐后 5 分钟收口）
1. seedream 11 张图：`zprintpro-stickers-roll-stickers-{zh-hk,en,ja}-{1..4}.webp`（zh 3 张）
2. 图齐 → 复跑 image-sitemap → commit → push（§0.25 窗口）→ curl 探针（roll 200 / fluorescent 301 → roll / Tier1 301）→ GSC 手动索引 roll 三语
3. 探针验收后释放 SESSION_LOCK

### 阻塞说明（§0.24 分级：⏳ 已排期，待 K3 真人动作）
- **Ark API 实测 403 `AccountOverdueError`（火山引擎账户欠费）** — 生图 key 本身有效，账户层面的账单问题需 K3 处理
- **K3 二选一**：① 火山引擎充值 → 我重跑 `.hermes/_roll_images.py`（约 5 分钟出 11 张）；② 任意途径（seedream 网页版/厂拍/供应商图）供 11 张源图丢 `.hermes/_roll_raw/`（命名 `roll_zh-hk_1.png` 等）→ 我跑 `.hermes/_roll_convert.py` 一键转码落盘

## 五、原研究正文（拍板依据存档）

### 数据来源
- GSC 28d 三站点 xlsx（2026-10-09 档）网页/查询 sheet → `.hermes/analysis/gsc-product-page-imps-28d.json`、`sticker-family-gsc-28d.txt`、`sticker-terms-gsc-28d.txt`
- 报价真值：`src/data/price-tables/digital-stickers-cost.json` cfg[4] + `src/lib/price-data.generated.ts` 卷裝档 tiers
- 市场：[Strategic Packaging Insights](https://www.strategicpackaginginsights.com/report/roll-fed-labels-market) / [Research and Markets](https://www.researchandmarkets.com/reports/6012455/roll-fed-labels-market-type-application) / [GII](https://www.gii.co.jp/report/ires1855396-roll-fed-labels-market-by-adhesive-type.html) / [Avery](https://www.avery.com/blog/should-you-use-roll-labels-or-sheet-labels/) / [Onpack](https://www.onpack.com.au/roll-labels/)
- 管线：`scripts/gen-price-data.mjs` L98-103、`scripts/csv-to-sku-seo.mjs`（SOP-5）
