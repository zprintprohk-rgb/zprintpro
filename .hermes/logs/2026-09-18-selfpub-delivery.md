# §7 七段报告 — 队列 P0 第 2 篇 Self-Publishing（自助出版印刷）三语上线

> **队列依据（首行，per v10 §四.2）**: `docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md` §四.2「**P0 三篇 en blog**」第 2 篇（Candle/Soap 标签 → **Self-Publishing** → Etsy 小批量包装）。第 1 篇（Candle/Soap 标签）9/17 已上线；第 3 篇 Etsy **未开**（按 K3 指令：须等本篇完整上线且措辞卡到手）。
> **数据来源**: 见 §⑤（门童 / tsc / 线上 curl 实测，本报告零估算）。
> **纪律声明**: 本篇按 K3 2026-09-18 拍板 **方案 (B)「en 先写、三语齐备后一次性交付」** 执行。

---

## ① 交付物

| 项 | 值 |
|---|---|
| slug | `self-publishing-printing-guide` |
| commit | `15c1e7e3`（8 files, +117）→ push `e2048652..15c1e7e3`，CF Pages **success** |
| 承接 SKU | `perfect-bound-books`（主）/ `hardcover-books` / `saddle-stitch-booklets` / `spiral-notebooks` / `catalog-printing`（`books` 类目） |
| categoryKey | `printing` |
| 语系 | **3 locale native**（zh-hk / en / ja） |
| 线上状态 | 三语 **HTTP 200** ✅（探针见 §③ 3.4） |

**三语内容实测**（交付层独立复算，不采信写手自检）：

| 项 | zh-hk | en | ja | 标准 |
|---|---|---|---|---|
| title 半角当量 | 54 | 55 | 57 | 50–58 ✅ |
| description 半角当量 | 157 | 156 | 156 | 150–160 ✅ |
| 快速答案块（class 形状 + 引语字面） | 3 / 3 | 3 / 3 | 3 / 3 | =3 ✅ |
| FAQ（可解析正则） | 4 | 4 | 4 | 4–5 ✅ |
| 真 `<table>`（带 thead） | 2 / 2 | 2 / 2 | 2 / 2 | ≥2 ✅ |
| CTA（wa.me） | 3 | 3 | 3 | 2–3 ✅ |
| 唯一内链（越白名单） | 11 / 0 | 11 / 0 | 11 / 0 | ≥7 / 0 ✅ |
| H2（问句） | 7（5） | 7（5） | 7（5） | ≥6 且过半问句 ✅ |
| `<img>` / `<script>` / JSON-LD | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 必须 0 ✅ |
| 竞品对比 / 承诺语气 / GSC 黑话 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 必须 0 ✅ |
| 品牌分层 | 仅「智印港」 | 仅「ZprintPro」 | 仅「ZprintPro」 | ✅ |
| 错字「智印印港」/ 双品牌 | 0 / 0 | 0 / 0 | 0 / 0 | ✅ |
| 新造数字（en 稿没有的） | 0 | — | 0 | 必须 0 ✅ |

**★ 快速答案块引语逐字正确**：zh-hk `快速答案：` / en `Quick Answer: ` / ja `クイック回答：` —— 这正是渲染层 v5.1 加 `qa-answer` 样式的识别字面（该识别正则的跨语系缺失正是本批次前一单修好的缺陷，本篇为修复后**首个受益的三语新篇**，线上实测三语 `qa-answer` 各 6 次命中，见 §③ 3.4）。

**v10 §四 强制四要素**（逐项确认）：① v5.1 快速答案块 ✅ ② FAQPage（渲染层由 FAQ 标记自动生成）✅ ③ 「低 MOQ / 快样品 / 透明工厂」三要素段（三义齐）✅ ④ 内链到对应 PLP/SKU（11 条全部为白名单内真实路径）✅

## ② 选题依据与方案决策

### 2.1 队列依据
v10 §四.2 明列 P0 三篇 en blog 的第 2 篇；理由（v10 原文）：雷达实证需求 + 复购型/高客单/精准社区，且与 8 锁词的 en 侧（small batch label / catalog）协同。

### 2.2 ★ 为何最终是「三语」而非「只 en」——架构事实（K3 据此裁决 (B)）

派活前侦察发现「只上 en」在本架构下**不可行**（三条硬事实，均为实测）：

| # | 事实 | 证据 |
|---|---|---|
| ① | `BlogPostMeta.title/excerpt` 型别是 `Record<Locale, string>`，**强制三语齐备** | `src/data/blog-posts.ts:50-71` |
| ② | sitemap 生成器对每个已注册 slug **无条件发射三语 URL + 三语 hreflang** | `scripts/generate-sitemap.js:106` `allBlogSlugs.forEach(s => locales.forEach(...))` |
| ③ | 全站 100 条 meta 中 **0 例外**（不存在任何 slug 处于「某语系无 content」状态） | 全量扫描实测 |

⇒ 若只注册 en，会同时产出 zh-hk / ja 两个**空 body 页**并被 sitemap 收录 + hreflang 谎报（正是 §0.23.1「门童全绿 ≠ 线上干净」最忌的线上品质事故）。**K3 裁决：en 先写、三语齐备后一次性交付**，不为早几天上线去改强类型或 sitemap 机制。

## ③ 验收闭环表

### 3.1 交付工序（§12 危险写入三件套：备份 + 计数断言 + 形状断言；断言未过不写盘）

```
注入 blog-data 三语   : 91 → 92 键 × 3 locale（写后复验 + 备份 .hermes/_bak-selfpub-20260918/）
注册 blog-posts.ts    : 数组 109 → 110（幂等 + 前后计数断言 + 单次插入断言）
→ 门童 → tsc → sitemap → commit → push → 线上探针
```

### 3.2 门童 / 三闸门（实测）

| 检查 | 结果 | 判定 |
|---|---|---|
| 门童汇总（全量） | 🔴 **51** | ✅ = 基线，未新增 |
| 门童 #15 blog-data 严格校验 | 3 JSON 全过 | ✅ |
| 门童 #20 存量基线 | 基线 120 / 现存 120 / **0 新增** | ✅ 只许递减未破 |
| `npx tsc --noEmit` | **54 = 54**，且 **0 条 blog-posts 错误** | ✅（`blog-posts.ts` 无 `@ts-nocheck`，本次注册受类型闸门真实覆盖） |
| `scan-simplified.mjs` | 无残留 | ✅ |
| `check-encoding.js` | 通过 | ✅ |
| pre-commit hook | 0 red / encoding 通过 / 简体通过 / DoD 通过 | ✅ |

### 3.3 sitemap

blog **110 → 111**；总 **732 URL**；三语 sitemap 各 **+10 行**（1 loc + 4 hreflang），`sitemap.xml` **+30**；IndexNow 已 ping 三语。diff 精确等于新增 slug，无附带改动 ✅。

### 3.4 线上探针（3/3 PASS，CF Pages success 后实测）

| locale | HTTP | title | description | hreflang | qa-answer | 表格 | 问句 H2 | 正文非空 | 品牌 |
|---|---|---|---|---|---|---|---|---|---|
| zh-hk | 200 | 自費出版印刷：1 本起印、無最低起訂量 平裝精裝 \| 智印港 | [94 字] ✅ | 4 | 6 | 2 | 5 | ✅ | 智印港 ✅ |
| en | 200 | Self-Publishing Printing: 1 Copy, Paperback \| ZprintPro | [156] ✅ | 4 | 6 | 2 | 5 | ✅ | ZprintPro ✅ |
| ja | 200 | 自費出版印刷：1 部から、最低注文数なし 並製本 \| ZprintPro | [90] ✅ | 4 | 6 | 2 | 5 | ✅ | ZprintPro ✅ |

**专项排查（K3 要求的三项）**：① **无空 body** ✅ ② **无 hreflang 谎报** ✅（三语页面均实际存在且 200）③ **无 meta description 空白** ✅（三语均有值，且本篇正是 meta 缺陷修复后的首个新篇）。

## ④ push 记录

| 时点 | 事件 |
|---|---|
| 23:36–23:39 | 前一批 3 commit（我的 `5217d1fb` + weekly-meta 的 `249e2b92`/`e2048652`）push：`07680a0a..e2048652`，**间隔 30.9 min**（守衛等 23 轮后放行 ✅） |
| 23:43:50 | 本篇 commit `15c1e7e3` → push `e2048652..15c1e7e3`，**间隔 30.1 min**（守衛判定，超出 0.1 min） |
| 23:47 | `verify-deploy.mjs` → CF Pages **success**（poll 11） |
| 23:49 | 三语线上探针 → **3/3 PASS** |

**全程零 `Start-Sleep` 阻塞主进程**；等窗口与 build 轮询一律 `run_in_background` 异步执行。守衛 `check-push-window.mjs` 基准 = `origin/main` 最新 commit（非「我上次 push」），且内建时区自检防恒真。

## ⑤ 数据来源（§0.23 强制）

```
数据来源:
- 三语内容稿: .hermes/staging/self-publishing-content.json (en 定稿)
              .hermes/staging/self-publishing-content.zhhk-ja.json (zh-hk/ja 定稿)
- 数字来源旁注: .hermes/_probe-pb/selfpub-fact-sources.md (逐条 数字 -> products.ts 行 或 线上 URL)
- 价格阶梯线上核对: https://zprintpro.com/en/product/perfect-bound-books/ 的 "Price Ladder · Reference"
                   实测含 100 pc US$2.08/pc · batch US$207.94 / 500 US$0.66 / 1000 US$0.36 / 2000 US$0.20 等
- 独立复算: .hermes/_probe-pb/independent-verify-zhja.cjs (48/48 PASS) / independent-verify-selfpub.cjs (30/30 PASS)
- 注入与注册脚本: .hermes/insert-selfpub-20260918.cjs / register-selfpub-20260918.cjs (含备份与断言)
- 线上探针: .hermes/logs/2026-09-18-selfpub-live-probe.txt
- 门童与 tsc: node scripts/check-regression-guard.js / npx tsc --noEmit 实测输出
- K3 拍板: docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md §四.2 (队列依据)
           2026-09-18 拍板 (B) 方案: en 先写、交付仍一次性三语
- commit: 15c1e7e3
```

## ⑥ 遗留挂账

1. **门童 #4 双向升级 + 假缺陷注入测试** —— 未做。设计已定（见 §⑦ 事故 4）。
2. **`price-data.generated.ts` 跨语系污染修复** —— 未动数据。规模已精确量化：**18 SKU / 342 栏位 / 114 唯一字串**。
3. **`GeoFooterText.tsx` zh-hk 简体检修** —— 本轮新发现（§⑦ 事故 5），未修。
4. **daily-content cron 孤儿交付物**（v10.1 决策 1-B 三档）—— K3 已裁「执行层接手」，本轮未审。
5. **`category` 口径对齐**（本稿 `書刊印刷`/`印刷知識` vs 同族 photo-book 两语均用「書籍印刷」）—— 待 K3 一句话裁决（文案不自主改）。

## ⑦ 异常与事故

### 事故 1（自查，已纠正）— 我方独立复算脚本的 4 处假阳性

首次复算报 4 个 ★FAIL，逐一诊断后确认**全部是我方量测 bug，非交付缺陷**，修好后 48/48 PASS：

| 假阳性 | 真相 |
|---|---|
| zh-hk 简体字 4 处（出/算/用/件） | 这 4 字是**繁简同形**；我把「進出／費用／計算／條件」拆成单字整批入集所致 |
| ja 简体字 1 处（写） | **写 是日文新字体正确写法**（写真） |
| 两语「新造数字」207.94 / 99 | 正则在句尾贪婪吃掉了句点，使 `US$207.94.` ≠ `207.94`；实际三语**数值完全一致** |

**教训固化**：简体字集只能收「繁体必与简体不同形」者，且 ja 须排除日文新字体；数字比对须剥除尾随标点。写手事前警告过 repo 既有 `title-compliance-scan.mjs` 的 SIMP 清单过宽，**我方亲身踩中同一坑** ⇒ 直接决定门童 #4 的设计（§⑦ 事故 4）。

### 事故 2（探针设计缺陷，已纠正）— 首版线上探针把「站点 footer」误判为本次交付缺陷

首版探针直接对整页文本扫简体字，zh-hk 报 `★FAIL: 场国务产与语言无还东时`。**未直接采信，先做归因**：

```
① 我注入的 zh-hk 正文含简体专用字 : 0 ✅
② 对照页 photo-book zh-hk (早前交付, 已知干净) : 命中完全相同的 11 字
③ 上下文定位 -> 站点 footer
```

**根因**：`src/components/seo/GeoFooterText.tsx:19-20` 的 zh-hk footer 文案为**简体中文**（`智印港 是面向香港及全球市场的国际印刷服务品牌，由亚洲生产基地提供专业印刷与品控…`）⇒ **全站每一个 zh-hk 页面都有**。

**修法（已落地于探针）**：改为「与对照页取集合差」——`本文页简体集合 − chrome 基线 = 本次交付引入量`。修正后 zh-hk **简体引入量 = 0**，探针 **3/3 PASS**。

### 事故 3（门禁盲区，第三例）— `scan-simplified.mjs` 不覆盖上述两处

跑 `scan-simplified.mjs` 时报「**所有 zh-hk 产品名称都是纯繁体中文**」，但同一时刻：`price-data.generated.ts` 有 **90 处 zh-hk 简体栏位**、`GeoFooterText.tsx` 的 zh-hk footer 是简体。⇒ 该扫描器**不覆盖**这两类文件。

**本轮累计确认的 3 个独立门禁盲区**：① `page.tsx` L1 `@ts-nocheck` 让 tsc 对整文件失效（已用规则 D + esbuild 语法闸门补）② 门童 #4 跨语言污染规则**只单向查 zh-hk**（`scanLocaleScoped(..., ['zh-hk'])`），从不查「en/ja 含 CJK」或「zh-hk 含简体」 ③ `scan-simplified.mjs` 覆盖范围不含 `src/components/` 与 `price-data.generated.ts`。

### 事故 4（设计结论，待落地）— 门童 #4 双向化必须「分语系字集 + 专用基线」

不可做成对称的「非该语系出现 CJK 即报」：**ja 本来就用汉字**，该判据对 ja 无意义且必然误报（本轮已实测误报集）。

正确定义：
- **en 含 CJK** → 恒为缺陷（英文不需要中文），零误报，可直接上；
- **zh-hk** → 判据 = 含**简体专用字形**（本次即命中 90 处，属 §0.8.2 / §0.0 红线）；
- **ja** → 判据 = 含**简体专用字形**，且须**排除日文新字体**（写/数/点/双/学/画 等）。

且**必须配专用基线通道**（比照门童 #20 的 `meta-baseline.json`：录入 342 处存量、只许递减），否则 red 会由 51 爆到 300+ 拦死全站 commit；反之若字集不收窄，假阳性过多会使其沦为无人理会的死守衛。**新增规则须附假缺陷注入回放测试**（K3 要求）。

### 事故 5（新发现，线上品质事故）— zh-hk 站点 footer 使用简体中文

见事故 2 根因。**影响面**：全站每一个 zh-hk 页面（含首页、所有类目页、产品页、博客页）的 footer 均显示简体中文，是 §0.0 / §8.2 的独立红线命中，且**门禁从未覆盖**。属高可见度、单点可修的缺陷，待 K3 定归属与批次。

---

## ⑧ 下一步（按 K3 串行纪律）

1. **门童 #4 双向化 + 注入测试**（本节事故 4 的设计）；
2. **`price-data`（342 栏位）与 `GeoFooterText.tsx` 两处简体治理** —— 建议合并为一批「zh-hk/ja 简体污染治理」，一次修复、一次 diff 核对、一次 push；
3. **daily-content cron 孤儿交付物**接手审查（v10.1 决策 1-B）；
4. 上述清完后，才开第 3 篇 **Etsy**，且开工前须拿到**措辞卡**。
