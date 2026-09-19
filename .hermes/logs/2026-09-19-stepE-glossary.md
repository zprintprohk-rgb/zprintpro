# Step E — en 值内中文术语表（全量清单 · 待 K3 / 母语者一次性确认）

> **生成**: 2026-09-19 · 执行层 · **性质: 纯只读盘点**（本表未修改任何文件，仅产出清单与建议译法）
> **口径**: 门童 #4 双向化 `I18N_POLLUTION_EN`（en 值内 CJK）—— 与 `i18n-pollution-baseline.json` **同源**，不新造第二套判据
> **当前真值**: **778 字符 / 35 术语条**（基线 total 1320 → **1071**，其中 en 向 1032 → **778**）
> **产出脚本**: `.hermes/_probe-pb/stepE-glossary-v3.cjs` → 机读版 `.hermes/_probe-pb/stepE-terms.json`

---

## 一、与派活书口径的差异（先说清，避免重复裁决）

| 项 | 派活书 v2 §3.2 | 本次实测 | 说明 |
|---|---|---|---|
| 术语档总字符 | 847（含这些 token 的条目共 46 条） | **778** | 差额 = **Step B/C 批 1 已修复部分**（`證書編號備索` 92 字 + 三语尾巴 38 字 + K3 等）**+ 口径细化**：本次按「中文连续片段」归并，不再把同一术语的重复计入条目 |
| 术语条数 | 46 条（含术语的条目） | **35 条**（术语本身） | 同上：按**术语**计，不按**含术语的条目**计 |

> ⚠️ **记账口径提醒**：派活书 §3.2 的 847 是「含这些 token 的**条目**所涉字符」；本表 778 是「en 值内 CJK **字符**」，
> 两者**不同层**。后续批 2 验收应以**门童口径 778 → 递减**为准（与基线机制一致）。

---

## 二、★ 需 K3 / 母语者确认的 6 个核心术语（占 778 的 ~87%）

| # | 术语 | 字符数 | 出现位置 | 现状（文件里的形态） | 我的建议译法 | 待确认 |
|---|---|---|---|---|---|---|
| 1 | `國際認證體系` | **270**（46 次） | `blog-data/en.json` | 中英混排，如 `國際認證體系 certified` | `ISO 9001 certified` | **指哪个体系？** 若指 ISO 9001 则用此；若泛指则用 `internationally certified` |
| 2 | `進口印刷設備` | **240**（40 次） | `blog-data/en.json` | 如 `German 進口印刷設備 presses` | `imported presses` / `Heidelberg presses` | **是否可写品牌？** `CRED_HEIDELBERG` 已特批「允许」，但本词是中文占位形态（见 §五 单独一案） |
| 3 | `認證紙` | **72**（23 次） | `blog-data/en.json` | 如 `FSC 認證紙 certified` | `FSC-certified paper` | 是否统一为 `FSC-certified paper` |
| 4 | `急件` | **34**（17 次） | `blog-data/en.json` | 如 `Rush 急件 18:00 截單` | `rush orders` | 与 `截單` 合并成固定句式？ |
| 5 | `截單` | **34**（17 次） | `blog-data/en.json` | 同上 | `(cut-off)` / `order cutoff` | 固定句式建议：`rush orders, 18:00 cutoff` |
| 6 | `答案` | **24**（约 13 次） | `blog-data/en.json` | JSON-LD 内 `答案答案答案…` 重复 13 次 | **删除**（疑似生成器坏输出，见 §五） | **是否为坏输出？** 若是则整串删除而非翻译 |

---

## 三、其余 29 条（占 ~13%）

### 3.1 已批准的 4 行白名单（**不动**，K3 已裁定）

| 术语 | 字符数 | 位置 | 依据 |
|---|---|---|---|
| `深圳市彩龍印刷包裝有限公司` | 13 | `payment-methods/page.tsx:697` `beneficiaryCn` | 白名单 WL-1（法人全称，受益人栏，**必须中文**） |
| `唐运提` | 3 | 同上 QR 行 | 白名单（法人姓名以身份证为准，**保留简体**） |
| `中国本土 24時間対応 · 香港現地サポート`（`中国本土`/`時間対応`/`香港現地`） | 12 | `Footer.tsx:146` `supportJA` | 白名单 WL-3（**别名键按 ja 语系归属**，门童记为 en 属口径伪影） |
| `彩龍印刷` | 4 | `en.json` 品牌名 | 白名单（品牌名，允许中文） |

> 4 行白名单合计 **32 字符**，建议**从 778 中扣除后**再定清理目标（即有效待清 746）。

### 3.2 中文误填 / 术语欠译（需译或删）

| 术语 | 字符数 | 位置 | 性质 | 建议 |
|---|---|---|---|---|
| `輸入六色印刷設備` | 8 | `buying-guides.ts` | 日文汉字混入 en | 译 `six-colour printing presses` |
| `批量以上` | 8 | `buying-guides.ts` | 中文残留 | 译 `and above` / 按上下文 |
| `月最後黃金窗` | 6 | `category/[slug]/page.tsx:206` | 中文残留（en 值） | 译 `late-September window` |
| `月前就位` | 4 | `category/[slug]/page.tsx:170` | 中文残留（en 值） | 译 `in place by November` |
| `认证体系` | 4 | `blog-posts.ts`（2 处） | 简体残留（批 1 未覆盖） | `ISO 9001` |
| `燙金名片` | 4 | `sku-seo-data.ts` en 块 | 中文误填 | `Foil-Stamped Business Cards` |
| `餐牌` | 4 | `blog-data/en.json` | 中文残留 | `table tent` / `menu card` |
| `騎馬釘` | 3 | `blog-data/en.json` | 中文残留 | `saddle stitch` |
| `核心頁` | 3 | `blog-data/en.json` | 中文残留 | `core page` |
| `万邑通` | 3 | `blog-data/en.json` | **第三方物流品牌名**（中文） | 删（对外字段禁第三方品牌名） |
| `坑紙` | 2 | `blog-data/en.json` | 中文残留 | `corrugated board` |
| `衍生` | 2 | `blog-data/en.json` | 中文残留 | `derivative` |
| `紅包` | 2 | `blog-data/en.json` | 中文残留 | `red packet` |
| `中綴` | 2 | `blog-data/en.json` | 中文残留 | `centrefold` / `insert` |
| `细分` | 2 | `blog-data/en.json` | 中文残留 | `segmented` |
| `月` / `段` | 2 / 1 | `blog-data/en.json` | **单字残留**（多为生成器切词残留） | 删除 |
| `满足` | 2 | `blog-data/en.json` | 中文残留 | `meets` |
| `镂空` | 2 | `category-seo-content.ts`（批 1 未覆盖的另一处） | 中文残留 | `laser-cut openwork` |
| `離島` | 2 | `category-seo-content.ts`（批 1 未覆盖的另一处） | 中文残留 | `outlying islands` |
| `名片` | 2 | `sku-seo-data.ts` en 块 | 中文残留 | `business cards` |
| `厚口` | 2 | `sku-seo-data.ts` en 块 | **日文**混入 en | `thick` |
| `箔押` | 2 | `sku-seo-data.ts` en 块 | **日文**混入 en | `foil-stamped` |

---

## 四、批 2 执行预案（待 §二 拍板后即可执行）

| 步 | 动作 | 说明 |
|---|---|---|
| 1 | 拍定 §二 6 个核心术语的批准译法 | 一次拍板即覆盖 ~87% |
| 2 | 生成替换表（术语对 → 全局替换） | 用同一套「计数断言 + 形状断言 + 备份」脚本（`.hermes/_probe-pb/stepC1-execute.cjs` 模板） |
| 3 | 执行 + 断言 + 基线递减 | 门童口径 778 → N，`i18n-pollution-baseline.json` 同步递减 |
| 4 | 门禁 + tsc + 渲染验收 + 线上探针 | 同 Step B/C 批 1 流程 |
| 5 | 白名单 4 行**显式排除**在替换范围外 | 防误伤法人全称 / 受益人栏 / ja 别名键 |

> ⚠️ **风险提示**：`認證紙`（23 次）与 `國際認證體系`（46 次）在 `en.json` 内会与 `FSC` / `ISO 12647` / `ISO 9001` 等既有英文并存，
> 全局替换需**逐上下文**确认不产生 `ISO 9001 ISO 9001` 式重复（批 1 已踩过同类：`ISO 國際認證體系 certified` 形态）。

---

## 五、★ 附带发现：两处疑为**生成器坏输出**（非 i18n 欠译，建议单独立案）

| # | 位置 | 形态 | 判断 |
|---|---|---|---|
| 1 | `blog-data/en.json` L644 等（JSON-LD/正文） | `答案答案答案答案答案答案答案答案答案答案答案答案答案`（13 连）+ `證書編號備索` 反复 | 人类不会这样写；`證書編號備索` 部分已完成（撤值遗留已修），**`答案` 重复串待处置** |
| 2 | `blog-data/en.json` 多处 | `German 進口印刷設備 presses` / `進口印刷設備 press` / `進口印刷設備 6+1 Press` | **中文术语被插进中英混排句**的形态 —— 疑为「品牌名脱敏/替换脚本用中文术语占位但未回填英文」。与 §二#2 同源，建议排查 `Heidelberg` 替换脚本 |

---

## 六、复跑命令

```bash
cd F:\zprintpro-nextjs
node .hermes/_probe-pb/stepE-glossary-v3.cjs     # 本表数据源 (门童口径, 只读)
node .hermes/_probe-pb/_stepC1-counts.cjs        # 术语出现次数与上下文
node scripts/check-regression-guard.js           # 门童 #4 实测值 (当前 1071)
```
