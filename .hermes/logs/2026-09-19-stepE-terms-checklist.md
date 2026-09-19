# Step E 剩余 29 条术语 — 逐条确认清单（K3 勾选用）

> **前置**: 6 个核心术语已由 K3 拍板（`internationally certified` / `Heidelberg presses` / `FSC-certified paper` /
> `rush orders, 18:00 cutoff` / `答案`13 连重复整串删）。
> **本表**: 剩余 29 条（占 778 的 ~13%），逐条给出建议译法与处置，**K3 只需在「采纳」列打勾或改写**。
> **口径**: 门童 #4 `I18N_POLLUTION_EN`（en 值内 CJK）；白名单 4 行（32 字）**已显式排除**，不在本表。

---

## A. 白名单 — 已批准，**不动**（列此仅供核对，无需勾选）

| 术语 | 字符 | 位置 | 依据 |
|---|---|---|---|
| `深圳市彩龍印刷包裝有限公司` | 13 | `payment-methods/page.tsx:697` `beneficiaryCn` | 法人全称（受益人栏必须中文） |
| `唐运提` | 3 | 同上 QR 行 | 法人姓名（保留简体，以身份证为准） |
| `中国本土` / `時間対応` / `香港現地` | 12 | `Footer.tsx:146` `supportJA` | `supportJA` 是 **ja 别名键**，门童记入 en 属口径伪影 |
| `彩龍印刷` | 4 | `en.json` 品牌名 | 品牌名，允许中文 |

**小计 32 字** ⇒ 有效待清 = 778 − 32 = **746 字**

---

## B. 待确认 29 条

### B-1 中文残留（直译即可，风险低）

| # | 术语 | 字符 | 位置 | 建议英文 | 采纳 |
|---|---|---|---|---|---|
| 1 | `輸入六色印刷設備` | 8 | `buying-guides.ts` | `six-colour printing presses` | ☐ |
| 2 | `批量以上` | 8 | `buying-guides.ts` | `and above`（按上下文） | ☐ |
| 3 | `月最後黃金窗` | 6 | `category/[slug]/page.tsx:206` | `late-September window` | ☐ |
| 4 | `月前就位` | 4 | `category/[slug]/page.tsx:170` | `in place by November` | ☐ |
| 5 | `认证体系`（简体残留） | 4 | `blog-posts.ts` ×2 | `ISO 9001` | ☐ |
| 6 | `餐牌` | 4 | `blog-data/en.json` | `table tent` / `menu card` | ☐ |
| 7 | `騎馬釘` | 3 | `blog-data/en.json` | `saddle stitch` | ☐ |
| 8 | `核心頁` | 3 | `blog-data/en.json` | `core page` | ☐ |
| 9 | `坑紙` | 2 | `blog-data/en.json` | `corrugated board` | ☐ |
| 10 | `衍生` | 2 | `blog-data/en.json` | `derivative` | ☐ |
| 11 | `紅包` | 2 | `blog-data/en.json` | `red packet` | ☐ |
| 12 | `中綴` | 2 | `blog-data/en.json` | `centrefold` | ☐ |
| 13 | `细分` | 2 | `blog-data/en.json` | `segmented` | ☐ |
| 14 | `满足` | 2 | `blog-data/en.json` | `meets` | ☐ |
| 15 | `镂空` | 2 | `category-seo-content.ts`（批 1 未覆盖的另一处） | `laser-cut openwork` | ☐ |
| 16 | `離島` | 2 | `category-seo-content.ts`（同） | `outlying islands` | ☐ |

### B-2 中文误填（该处本应是英文）

| # | 术语 | 字符 | 位置 | 建议英文 | 采纳 |
|---|---|---|---|---|---|
| 17 | `燙金名片` | 4 | `sku-seo-data.ts` en 块 | `Foil-Stamped Business Cards` | ☐ |
| 18 | `名片` | 2 | `sku-seo-data.ts` en 块 | `Business Cards` | ☐ |
| 19 | `厚口`（**日文**混入 en） | 2 | `sku-seo-data.ts` en 块 | `Thick` | ☐ |
| 20 | `箔押`（**日文**混入 en） | 2 | `sku-seo-data.ts` en 块 | `Foil-Stamped` | ☐ |

> ⚠️ B-2 是**同一类缺陷**：`sku-seo-data.ts` 的 `en` 块里 h1/description 被填成中文/日文
> （批 1 已修 4 条：`壓紋名片`/`婚禮名片`/`金屬禮名片`；此处余 4 条）。
> **建议处置**：与其逐条替换，不如**按该 SKU 的 `en.title` 派生**（同批 1 做法，一致性更好）。

### B-3 生成器坏输出（**删除**，非翻译）

| # | 术语 | 字符 | 位置 | 处置建议 | 采纳 |
|---|---|---|---|---|---|
| 21 | `答案`（13 连重复） | 24 | `blog-data/en.json` | **整串删除**（已由 K3 拍板） | ✅ 已批 |
| 22 | `月`（单字残留） | 2 | `blog-data/en.json` | 删除 | ☐ |
| 23 | `段`（单字残留） | 1 | `blog-data/en.json` | 删除 | ☐ |

> ⚠️ **`答案` 需注意**：抽样发现 `en.json` 里有 **12 处正常的 `💡 答案 nugget:`** 文案（「答案 nugget」是正常表达），
> **不能无差别删**。规则已改为「只删 2 连以上重复」（干跑实测：13 连串删掉，12 处正常用法保留）。
> **请确认**：这 12 处 `答案 nugget` 是否也要改成英文（如 `💡 Answer nugget:`）？

### B-4 第三方品牌名（**删除**，AGENTS.md 禁对外字段出现第三方品牌名）

| # | 术语 | 字符 | 位置 | 处置建议 | 采纳 |
|---|---|---|---|---|---|
| 24 | `万邑通` | 3 | `blog-data/en.json` | 删除（或改 `3PL warehouses`） | ☐ |

### B-5 ja 语系同族（**另一语系，需日语译法**）

| # | 术语 | 字符 | 位置 | 建议日文 | 采纳 |
|---|---|---|---|---|---|
| 25 | `國際認證體系` | 47 处 | `ja.json` | `国際認証` | ☐ |
| 26 | `進口印刷設備` | 21 处 | `ja.json` | `ハイデルベルク印刷機` | ☐ |
| 27 | `認證紙` | 16 处 | `ja.json` | `認証紙`（已有 `FSC 認証紙` 形态） | ☐ |
| 28 | `急件` | ? | `ja.json` | `特急` | ☐ |
| 29 | `截單` | ? | `ja.json` | `締切` | ☐ |

> ⚠️ **B-5 说明**：`ja.json` 里的中文属**另一向污染**（门童 #4 的 `I18N_POLLUTION_JA` = 197 字符，**不在** en 的 778 内）。
> 处置口径建议：**与 en 批 2 同批做**（一次 push 省 CF build），但**单独记账**（两条基线分别递减）。

---

## C. 执行顺序建议

| 波次 | 内容 | 字符量 | 说明 |
|---|---|---|---|
| **波 1** | B-1（16 条）+ B-2（4 条）+ B-3（3 条）+ B-4（1 条） | ~60 字 | 低风险，可立即执行 |
| **波 2** | B-5（ja 5 条） | ~197 字（`I18N_POLLUTION_JA` 口径） | 与波 1 同批 push，单独记账 |
| **波 3** | 批 2 的 content 档其余部分（697 字中的剩余） | 视波 1/2 结果 | 术语已归一，剩多为逐条语境改写 |

---

## D. 风险提示（批 2 抽样已实测）

全局替换的**语法断裂风险已量化并修好**（干跑全绿，无重复词）：
- `國際認證體系 certified` → 消费尾部 `certified`（防 `internationally certified certified`）
- `進口印刷設備 presses` → 消费尾部 `presses`（防 `... presses presses`）
- `FSC 認證紙 certified` → 消费尾部 `certified`（防 `FSC-certified paper certified`）
- `答案` → 只删 2 连以上重复（保留 12 处正常用法）
- `進口印刷設備 6+1 press` → `Heidelberg 6+1 press`（单数形态单列）

干跑证据：`.hermes/_probe-pb/stepC2-rule-dryrun.cjs`（只读，未改任何文件）
