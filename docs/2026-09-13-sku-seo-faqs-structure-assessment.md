# ④ 评估：`sku-seo-data.ts` 的 `faqs` 字段结构问题（2026-09-13，K3 要求「单独评估后出方案」）

**评估人**: 执行层
**数据来源**: `node .hermes/measure-faqs.cjs`（Node utf8 只读解析）+ 线上实测 `.hermes/probe-faqs-live.cjs` + `grep -rn '\.faqs' src/`
**结论一句话**: 这不是「渲染口径」问题，而是**一个没人读的死字段里装着错位数据**——线上 0 命中，先别按 P0 处理。

---

## 1. 实测现状

| 指标 | 数值 | 证据 |
|---|---|---|
| `faqs` 数组数 | 100 | `measure-faqs.cjs` |
| 其中空数组 | 36 | 同上 |
| `q`/`a` 条目总数 | 196 | 同上 |
| 条目语言分布 | ja 68 / zh 90 / en 32 / 其它 6 | 假名/汉字/拉丁判定 |
| 结构 | `faqs: Array<{q,a}>`（**不按 locale 分键**） | `sku-seo-data.ts` L10 |
| **线上是否渲染** | **否，0 命中** | 见 §2 |

典型错位样本（均为 CSV 列错位采集的产物）：

| slug | 字段 | 内容 | 判断 |
|---|---|---|---|
| `waterproof-stickers` | q | `防水ステッカー` | 关键词，不是问题 |
| 同上 | a | `耐久ラベル` | 关键词，不是答案 |
| `transparent-stickers` | q | ` fast delivery.` | 英文句尾碎片 |
| 同上 | a | `透明PET素材、貼り付け後無感効果。…ZprintProは透明ステッカーサービスを提供。` | 日文 description 段落 |

## 2. 线上影响评估（关键，避免误报）

- `grep -rn '\.faqs' src/`：**没有任何消费方读 `skuSeo.faqs`**（PDP 只用 title / description / keywords / imageAlt）。
- 线上探针（`/zh-hk|en|ja /product/waterproof-stickers`）：`耐久ラベル` 命中 **0**、`fast delivery.` 命中 **0**；PDP 的 FAQ 区块与 `FAQPage` JSON-LD 来自 `products-content.ts` 的 FAQ HTML 与 `faqSchema.ts`，**与本字段无关**。
- ⇒ 定性：**死字段 + 脏数据**（数据卫生问题），不是线上缺陷，也不是结构化数据风险。

## 3. 三方案（含建议）

| 方案 | 内容 | 成本 | 风险 | 建议 |
|---|---|---|---|---|
| **1. 删字段（推荐）** | 从 `SkuSeoEntry` 移除 `faqs`，并删掉 CSV 的 `FAQ问题1-3(ZH)/FAQ答案1-3(ZH)` 6 列 + 生成器映射 | 低（结构减负） | 若将来有人想用会缺字段（可随时重建） | **推荐**：现状是「死 + 脏」，留着只有误导成本 |
| **2. 改造并按 locale 分键** | `faqs: Record<Locale, Array<{q,a}>>`；CSV 增 6 列（FAQ EN / JA）；重写 196 条为真问答；PDP 接上（含 `FAQPage` schema） | 中高（等于新做一轮 FAQ 内容工程） | 与现有 `products-content.ts` FAQ + `faqSchema.ts` **重复甚至冲突**（同页两套 FAQ / 两段 FAQPage = 结构化数据重复，T43 反直觉条款警告过） | 不建议现在做，除非同时决定「FAQ 单一来源」 |
| **3. 止损式：保留字段但清空脏数据** | 196 条清 0，数组置空，字段保留待用 | 低 | 无收益（本来就是死字段） | 次选，仅在不想动 schema 时用 |

**执行层建议 = 方案 1**，理由：该字段零消费方（死）、数据错位（脏）、且与站内既有 FAQ 来源重复（惑）；「删掉」比「修好再接上」更符合「FAQ 单一来源」原则。

**前置条件（若 K3 选 2）**：必须先拍板「FAQ 单一来源」——是 `products-content.ts` FAQ HTML，还是 `sku-seo-data.ts` 的 per-locale FAQ；两者并存会让同一 PDP 出现两套 FAQ 与两段 `FAQPage`，属 §T43 明确警告的反面。

## 4. 待 K3 一句话裁决

- 方案 1（删字段+删 CSV 6 列，推荐）/ 方案 2（改造并按 locale 分键，需先定 FAQ 单一来源）/ 方案 3（清空脏数据保留字段）？
