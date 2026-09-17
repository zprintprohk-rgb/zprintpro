# 内容落地记录 — Zine & Small-Batch Booklet Printing Guide（队列 A 第 1 篇）

> **数据来源**: K3 2026-09-17 拍板（4 篇新需求承接提前至 P0 三篇之前）· `docs/2026-09-17-website-traffic-expansion-plan-v1.md` §四/§五 · 线上 PDP 实测（`https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/` 2026-09-18 curl）· 门童与 tsc 实测输出。

---

## 一、任务来源与定位

| 项 | 内容 |
|---|---|
| 队列依据 | `docs/2026-09-17-website-traffic-expansion-plan-v1.md` §五 **路径 1 第 1 项**（Zine & Small-Batch Booklet） |
| 排序依据 | K3 2026-09-17 拍板「4 篇新需求承接**提前至 P0 三篇之前**」（雷达 139 条线索实证） |
| 缺口判定 | §四 差距矩阵：zine 词在 ja 同人志内容里高频出现，但 **en/zh-hk 侧 0 篇承接**（承接级判定，非内容级） |
| 承接 SKU | `saddle-stitch-booklets`（**BK-002**，类目 `books`） |
| slug | `zine-small-batch-booklet-printing-guide` |
| 目标词 | zine printing / small batch booklet printing / saddle stitch zine / zine printing cost |

**为什么不需等权重复利**：长尾、低竞争、买家「单量小、决策快、多数没有固定印刷供应商」＝ 小批量工厂甜点区，与 G4 大词的本质区别（§六 加速排序判据）。

---

## 二、三语交付物

| locale | title（半角当量） | description（半角当量） | content 长度 |
|---|---|---|---|
| zh-hk | 小誌 Zine 印刷: 騎馬釘 8-64 頁 100 本起 HK$6 起 \| 智印港（**56**） | 157 | 6,842 |
| en | Zine Printing Guide: 8-64pp, 100 MOQ, HK$6/pc \| ZprintPro（**57**） | 155 | 11,796 |
| ja | ジン印刷ガイド: 中綴じ 8〜64 ページ 100 部から \| ZprintPro（**58**） | 152 | 7,381 |

**规格核对（逐项实测，非估算）**：

| 项 | zh-hk | en | ja | 标准 |
|---|---|---|---|---|
| 快速答案块 | 3 | 3 | 3 | ≥3 |
| FAQ（`Q\d+:` 可解析格式） | 5 | 5 | 5 | 4-8 |
| WhatsApp CTA | 3 | 3 | 3 | ≤3（12 铁律）/ ≥3（Pillar 门童） |
| 比较表格（真 `<table>`） | 2 | 2 | 2 | ≥2 |
| H2 段 | 9 | 9 | 9 | 6-10 |
| 唯一内链 | 9 | 8 | 8 | ≥7（标准深度篇） |
| content 内嵌 JSON-LD | 0 | 0 | 0 | **必须 0**（§3.2 红线，page.tsx SSoT） |

**v10 §四红线四要素全部落地**：v5.1 快速答案块 ✅ / FAQPage（由 `extractFaqFromHtml` 自动提取）✅ / 「低 MOQ・快樣品・透明工廠」三要素段 ✅ / 内链到承接 SKU 与品类页 ✅。

---

## 三、价格口径（§0.23 数据诚信）

**全部取自线上 PDP 结构化区**（客户可自行 curl 核对），非我方编造：

| 事实 | 值 | 来源 |
|---|---|---|
| 產品編號 | BK-002 | PDP 结构化字段 |
| 最低訂購量 | 100 本 | PDP 结构化字段 + PDP title `100起印` + `products.ts minQuantity: 100` |
| 單價區間 | HK$6-32/本 | PDP 结构化字段 + `price_range: 'HK$6-32/本'` |
| 批量價 | 5,000 本低至 HK$1.20/本 | PDP `每個低至 HK$1.20` + `5,000本起批 整批 HK$5,777`（5,777/5,000 = HK$1.155） |
| 頁數 | 8-64 頁（4 的倍數） | PDP 規格 + features |
| 內頁紙 | 80-100g 書紙 / 128-157g 銅版紙 | PDP 規格 |
| 標準交期 | 5-7 個工作天 | PDP `標準交期 5-7 天` |
| 打稿 | 提交檔案後 1 小時內免費數碼打稿 | PDP 结构化區 |
| 運費 | 港九新界滿 HK$500 順豐免運 | PDP |
| 跨境 | DHL／FedEx 全球 2-4 天 | PDP |
| 裝訂升級 | 膠裝 +HK$30/本、精裝 +HK$100/本 | PDP 6 步流程段 |

### 3.1 🔴 同批发现、**未自行裁决**的 SLE SKU 内部口径互斥（升级 K3）

**同一个 SKU 在同一页上显示两套互斥价格与 MOQ**：

| 来源 | MOQ | 價格 |
|---|---|---|
| **结构化区 / PDP title / `products.ts` 结构化字段** | **100 本** | **HK$6-32/本**（批量 HK$1.20） |
| 同一 SKU 的**自由文本**（`description` 字段 / `name` 字段 / `features`） | **50 本** | **HK$14-57/pc**（= US$1.84-7.36） |

**Git 溯源（谁更可能是旧的）**：
- `HK$6-32/本` + `price_range` + `basePrice: 6` 来自 `b2f35945`（**pricing system 修复**）
- `basePrice_en: 1.84` / `basePrice_ja: 258` 由 `d5967a93`（修 28 SKU 三币种倒挂）校正保留
- `MOQ 50 本` + `US$1.84-7.36` 来自 `d78e8f02`（**SEO 内容批**，非定价批）

**本次处置**：新篇**一律采用结构化区口径**（三处结构化来源互相一致），并把冲突原文交 K3 一句话裁决。
**未改动** SKU 描述字段与既有 2 篇含 `HK$14-57/本` 的文章 —— 与月曆那次同类问题，同等待 K3 口径。

**影响面**：`saddle-stitch-booklet-printing-guide`（zh-hk description ×1 + content ×2）、
`catalog-printing-china-supplier-guide`（content ×1）共 4 处 `HK$14-57/本`；门童 #19 当前把这 4 处
判为「需保留的小冊子價」—— **若 K3 裁定 HK$6-32 为准，需同步改这 4 处 + 更新门童 #19 边界断言**。

---

## 四、机器验收（全部实测）

| 闸门 | 结果 |
|---|---|
| 门童 #15 blog-data JSON 严格校验 | ✅ 0 命中 |
| 门童 #16 GSC 内部数据泄漏 | ✅ 0 命中 |
| 门童 #17 ce 截断残缺词 | ✅ 0 命中 |
| 门童 #18 机构页承诺口径 | ✅ 0 命中 |
| 门童 #19 跨文价格口径一致性 | ✅ 0 命中 |
| 门童 #14 十二铁律（5 Pillar × 3 locale） | ✅ 0 命中 |
| 门童 #12 blog 标准（title 当量/date/模板字） | ✅ 新篇 0 命中（存量 campus pillar 有历史命中） |
| 门童 #13 内链/CTA | ✅ 新篇 0 命中（存量 campus pillar 有历史命中） |
| **汇总** | 🔴 **51（= 基线，零新增）** \| 🟠 1538 \| 🟡 1088 |
| `tsc --noEmit` | **54 = 54 基线持平** |
| sitemap | ✅ 三语 hreflang 全含（每 locale 241 URLs，较前 +1） |

**🟠 橙档 +10 的说明（诚实披露）**：新篇正文含 `海德堡`／`HP Indigo`／`ISO 9001`／`1,000+ 品牌客戶`／
`自有廠房` 等表述，触发 `CRED_HEIDELBERG` / `CRED_ISO_9001` / `CRED_1000_PLUS` / `CRED_SELF_FACTORY`
等 **shadow 规则**（橙档不拦 commit）。这些表述是 **§5.3 GEO 知識原子段列明的 K3 8/19 拍板 12 件事實**，
且与线上 PDP 公开表述一致，故保留；橙档增量已在报告中披露。

---

## 五、事故与自纠（DoD：已入 rules）

**⚙️ 事故**: 注册脚本把 `const` 声明插进了 `blogPosts` **数组字面量内部**（锚点 `  lpPackagingBoxPrice2026,\n  ];` 位于数组之内）→ **TS1137 语法错误**。

**★ 最危险的表现**: 重跑 tsc，错误数从 **基线 54 掉到 2**。
若把「下降」当作通过（"54 → 2 比基线还好"），就会放过一个整个文件解析失败的破坏。
修复后回到 54 才判定通过。

**已固化**: `.hermes/regression-guard/error-patterns.md` → 规则 **`TSC_ERROR_COUNT_DROP_IS_A_RED_FLAG`**
（含三条可复用修法：结构性插入锚点必须在结构之外 / 断言锚点相对位置 / 三件套必须含「语言级可解析性」维度）。

**脚本自纠**: 首版 `register-zine-post-20260918.cjs` 已废弃（未入库），改用
`register-zine-post-fix-20260918.cjs`（断言 `indexOf(声明块) < indexOf('export const blogPosts')`）。

---

## 六、B 项（en 30 目录 + sameAs）

**状态**: 未开始。本轮按 K3 选择「C · 两份都要，按 A→B 顺序」先完成 A 项第 1 篇。
下一轮进入 B 项（v10 §五.2 / v10 卡 §四.3：复制 ja ジープリント 30 目录公式到 en）。

---

## 七、数据来源（§0.23）

```
数据来源:
- K3 拍板: 2026-09-17 会话「4 篇新需求承接提前至 P0 三篇之前」= 「是的」; 2026-09-18 会话「C · 两份都要, 按 A→B 顺序」+「完成 1 篇完整落地 + 上线」
- 队列/缺口依据: docs/2026-09-17-website-traffic-expansion-plan-v1.md §四 差距矩阵 + §五 路径 1 + §六 加速排序
- 价格/规格来源: 线上 PDP curl 实测 https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/ (2026-09-18)
- 代码事实: src/data/products.ts (BK-002 / price_range / basePrice / minQuantity) 实测
- Git 溯源: b2f35945 (pricing system) / d5967a93 (三币种倒挂) / d78e8f02 (SEO 内容批)
- 机器验收: 门童汇总 + tsc + sitemap 生成器实测输出
校准状态: 本记录不含任何估算询盘/转化/排名数字; 价格一律标注 PDP 来源与时间
```

---

**文件结束。**
