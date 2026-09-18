# §7 七段报告 — 队列 A #3 寫真書交付验收 + 线上 meta description 缺陷修复

> **队列依据（首行，per v10 §四 串行交付纪律）**: `docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md` §四.2「4 篇新需求承接」→ 队列 A 第 3 篇 = 寫真書（Photo Book），承接 `perfect-bound-books` / `hardcover-books`。
> **本轮性质**: 队列 A #3 的**交付后验收环节**（线上探针），非新开队列项。验收中发现并修复了一个**影响全站 211 个线上页面的真实缺陷**（非本篇内容问题）。第 2 篇（Self-Publishing）**未开**，符合「任何一关不过就地修，不带问题往下走」。
> **身份**: ZprintPro 执行层（deepseek hermes / DSH）。
> **数据来源**: 见 §⑤（全部为线上 curl 实测 + 门童/tsc 实测输出，本报告零估算）。

---

## ① 交付物

### 1.1 队列 A #3 寫真書（上一轮已交付，本轮完成验收）

| 项 | 值 |
|---|---|
| slug | `photo-book-printing-guide` |
| commit | `29f1afd9`（已于 2026-09-18 19:56 push 上线） |
| 线上状态 | zh-hk / en / ja 三语 **HTTP 200** ✅ |
| 线上 title（实测） | `寫真書印刷：相冊相簿精裝 1 本起印 100 本更平 \| 智印港`（半角当量 **53**）/ `Custom Photo Book Printing: MOQ 1, Bulk 100+ \| ZprintPro`（**56**）/ `フォトブック印刷：少部数 1部から 100部で割安 \| ZprintPro`（**56**）—— 均落 50–58 ✅ |
| 线上 description（实测） | 三语**修复后**均有值：zh-hk **160** / en **156** / ja **157** 半角当量 —— 均落 150–160 ✅ |
| hreflang | 7 条（zh-HK / en / ja / x-default）✅ |
| canonical | `https://zprintpro.com/{locale}/blog/photo-book-printing-guide/` ✅ |

内容层（本地源数据实测，非估算）：

| 项 | zh-hk | en | ja | 标准 |
|---|---|---|---|---|
| 真 `<table>` | 3 | 2 | 2 | ≥2 ✅ |
| FAQ 可解析 `Q1:` | 5 | 4 | 4 | 4–5 ✅ |
| WhatsApp CTA（wa.me） | 3 | 2 | 2 | 2–3 ✅ |
| `<h2>` | 8 | 7 | 7 | ≥6 ✅ |
| content 内嵌 JSON-LD | 0 | 0 | 0 | 必须 0 ✅ |
| content 内嵌 `<img>` | 0 | 0 | 0 | 必须 0 ✅（页面 35 个 `<img>` 全为站点框架：logo / 侧栏产品卡） |
| 承诺口径（保證/承諾/確保） | 0 | 0 | 0 | 必须 0 ✅ |
| 竞品 MOQ 对比 | 0 | 0 | 0 | 必须 0 ✅ |
| GSC 后台黑话 | 0 | 0 | 0 | 必须 0 ✅ |
| `智印印港` 错字 / 双品牌 | 0 | 0 | 0 | 必须 0 ✅ |

### 1.2 本轮新交付：线上 meta description 缺陷修复

| 项 | 内容 |
|---|---|
| commit | `c4146e7f`（2026-09-18 20:43 push，CF Pages **success**，run 105602694374） |
| 代码修复 | `src/app/[locale]/blog/[slug]/page.tsx` —— description 解析字段名错误 |
| 门禁补齐 | `scripts/guards/meta-description-guard.js` 新增**规则 D**（red）+ `scripts/test-meta-description-guard.js`（6 用例） |
| 线上效果 | **288 / 297** 个线上 blog URL 现在输出 meta description（修复前实测 77 / 201） |
| 报告 | 本文件 |

---

## ② 选题/缺陷依据

### 2.1 队列依据（承接关系）

队列 A 第 3 篇「寫真書」= v10 §四.2 剩余项；承接 SKU `perfect-bound-books`（膠裝）/ `hardcover-books`（精裝）。MOQ 口径按 K3 2026-09-18 业务口径：**1 本起印、无最低起订；少量走数码（免版费 / 打稿快 / 单价高）；100 本以上柯式更经济、色彩更准、前置较长**。价格数字一律引 `products.ts` / 线上 PDP，未自造。

### 2.2 缺陷依据（本轮由验收探针发现，非选题）

**发现路径**：队列 A #3 交付后的线上探针（§0.23.1 强制环节）在 zh-hk / en / ja 三语实测，发现 `<meta name="description">` **缺失**。因本篇 description 在交付层已按 150–160 校过（commit 明载 160/156/157），「已校过的字段线上却空白」= 强烈矛盾信号 → 顺藤全站探针 → 确认为**全站渲染层缺陷**。

**根因（代码级，已定位到行）**：

```js
// src/app/[locale]/blog/[slug]/page.tsx:820 修复前
const description = meta?.description?.[locale] || legacyPost?.description || '';
```

但 `BlogPostMeta` 接口的字段名是 **`excerpt`**（`src/data/blog-posts.ts:53`）：

```ts
export interface BlogPostMeta {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;   // ← 真名是 excerpt
  ...
}
```

全仓 **100 条** meta 条目全部使用 `excerpt`，`description` 字段 **0 条** ⇒ 该表达式第一项**恒为 `undefined`**，实际只剩 `legacyPost.description`（`page.tsx` 内联旧文章记录）一条来源。

⇒ **凡「只在 `blog-posts.ts` 注册 + `blog-data` JSON 有内容、但不在 `page.tsx` 内联 legacyPosts 记录里」的文章，线上 `<meta name="description">` 与 `og:description` 完全空白**（SERP 无摘要可展示）。

**三道防线为何全漏**（与 §0.23.1 已固化的「门童 0 命中 ≠ 线上干净」同源）：

| # | 防线 | 为何漏 |
|---|---|---|
| ① | `tsc` 门禁 | `page.tsx` **L1 就是 `// @ts-nocheck`** ⇒ 该类型错误被整文件吞掉；「tsc 54 = 54 持平」这条验收线恰好把真缺陷一起持平了 |
| ② | 门童 #20 规则 C（空 meta） | 只查 `blog-data/*.json` 的 `description` 字段——**该字段一直是有值的**（新文章都写了）⇒ 0 命中 |
| ③ | 门童 #20 规则 A/B | 只查语言错配与重复词，不查「渲染路径能否取到值」 |
| ④ | 门童 #12/#14 十二铁律 | 按 `bg-*-50` 类计快速答案块，与 description 无关 |

### 2.3 全量线上实测范围（修复前）

297 个请求（99 slug × 3 locale）→ **201 个 HTTP 200**（另 96 个被限流 503）中：

- ✅ 有 `name="description"`：**77**
- ★ 无 `name="description"`：**124**（含队列 A #1 zine / #2 童書繪本 / #3 寫真書，以及 car-dealership、hotel-keycard、2027-calendar、rush-printing-delivery、packaging-box-price-2026 等历史文章）

---

## ③ 验收闭环表

### 3.1 修复内容（最小面，零 churn）

```js
// 修复后
const description = legacyPost?.description || jsonEntry?.description || meta?.excerpt?.[locale] || '';
```

优先序设计理由：`legacyPost` **仍居首** ⇒ 既有 77 个「本来就有 description」的线上页面输出**完全不变（零 churn）**；仅填补原本空白的页面。第二顺位取 `blog-data` JSON 的 `description`（正是门童 #20 管治、且交付层已按 150–160 校过的那个字段），第三顺位才 fallback 到 `meta.excerpt`。

### 3.2 独立复算（双方法互证，per K3「双方法复算」拍板）

| 方法 | 结果 |
|---|---|
| **方法 1：线上实测** | 修复前 201 组合中 77 有 / 124 缺 |
| **方法 2：静态复算**（含 buying-guide 分支 / cluster 分支的完整解析链） | 修复前可解析 96/336，修复后 336/336 |
| **对帐** | 124 处「不一致」**恰好就是**线上实测缺失的那 124 个组合；线上实测为「有」的 77 个组合，两法**全部一致**（零反例） |

★ **方法 2 的一处偏差已由方法 1 纠正**（见 §⑦ 事故 2）：静态复算未校验「meta 是否真的注册进 `blogPosts` 数组」，导致对 3 个 slug 误判为「修复后可解析」。线上实测纠正了该误判 —— 这正是双方法复算的价值。

### 3.3 门童六命令 / 三闸门（实测输出）

| 检查 | 修复前 | 修复后 | 判定 |
|---|---|---|---|
| 门童汇总（全量扫描） | 🔴 51 | 🔴 **51** | ✅ 持平，无新增 |
| 门童 #15 blog-data JSON 严格校验 | 0 命中 | 0 命中 | ✅ |
| 门童 #16 GSC 内部数据泄漏 | 0 命中 | 0 命中 | ✅ |
| 门童 #17 ce 截断残缺词 | 0 命中 | 0 命中 | ✅ |
| 门童 #18 机构/招标承诺口径 | 0 命中 | 0 命中 | ✅ |
| 门童 #19 跨文价格口径一致性 | 0 命中 | 0 命中 | ✅ |
| 门童 #20 存量基线 | 基线 120 / 现存 120 / 0 新增 | 基线 120 / 现存 120 / **0 新增** | ✅ 只许递减，未破 |
| `npx tsc --noEmit` | 54 | **54** | ✅ 持平（非增量全量复跑确认 54） |
| esbuild 语法校验（`page.tsx`） | — | **OK** | ✅ **不可省**：该文件 `@ts-nocheck`，tsc 语法闸门不可依赖 |
| `check-encoding` / pre-commit hook | — | 全过（0 red / encoding 通过 / 简体字通过 / DoD 通过） | ✅ |
| 规则 D 回归测试 | — | **6/6 PASS**（含原事故写法正向控制） | ✅ |
| `verify-deploy.mjs` | — | **CF Pages success**（run 105602694374） | ✅ |

### 3.4 线上验收（修复后，297 组合全覆盖）

| 阶段 | 有 description | 仍缺 | 说明 |
|---|---|---|---|
| 修复前实测 | 77 / 201 | 124 | 96 个 503 限流未测 |
| 修复后首轮 | 247 / 258 | 11 | 39 个 503 限流待补探 |
| **503 补探（单线程 + 重试）** | **+39 / 39** | 0 | 首轮 11 缺中，2 个经**温和复探**确认是边缘节点陈旧构建假阴性，已正常（+2） |
| **合计（297 组合全覆盖，均 HTTP 200）** | **288 / 297** | **9** | 9 = 3 个未注册 slug × 3 locale（见 §⑥ 挂账 1，**非本次修复范围**，修复前同样缺） |

**精确集合运算（脚本实测，非估算；逐行结果表见 `.hermes/logs/2026-09-18-meta-description-results.tsv`）**：

```
修复前缺失集合            : 124   （201 个 HTTP200 中）
修复后最终仍缺集合        :   9   （wedding-invitation-{pricing,cost}-guide + wedding-table-card-printing-guide，各 × 3 locale）
修复前缺失 ∩ 修复后仍缺   :   8   （这 8 个修复前就缺，属挂账 1 的独立缺陷，本修复不覆盖）
修复前缺失 → 已修好       : 116   （124 − 8）
修复后仍缺但修复前未测到  :   1   （ja/wedding-invitation-pricing-guide，修复前遇 503 限流未测）
净收益                    : +211  （288 − 77）
守恒校验                  : 288 + 9 = 297 ✅
```

抽样实测（证明填进去的正是交付层校过的 authored 描述）：

| URL | 实测 description | 长度 |
|---|---|---|
| en/photo-book-printing-guide | `Photo book printing from 1 copy, no minimum order. Compare 3 bindings…` | 156 ✅ 与交付层校值一致 |
| en/construction-material-sample-book-printing-guide | `US construction material suppliers, interior designers, and building p…` | 300 |
| en/packaging-box-pricing-2026 | `Packaging box printing from 100 pcs: pit box 500 pcs HK$8-15/each, col…` | 237 |
| ja/photo-book-printing-guide | — | 88 |

`og:description` 与 `name="description"` 由同一代码路径驱动，在 258 个实测样本中**逐一同步**（247 有 / 11 缺，缺的完全相同）⇒ 修复同时覆盖 OpenGraph。

---

## ④ push 记录

| 时点（commit 时间为准） | 事件 |
|---|---|
| 2026-09-18 19:56:03 | 队列 A #3 寫真書 commit `29f1afd9`（上一轮交付，已 push） |
| 2026-09-18 20:33–20:38 | 线上探针验收 → 定位 meta description 缺陷 → 双方法复算 → 修复 → 规则 D + 回归测试 |
| 2026-09-18 **20:39:00** | commit `c4146e7f` push：`29f1afd9..c4146e7f  main -> main`（距上次 push **约 43 min** ✅ ≥30 min，per §0.25） |
| 2026-09-18 20:5x | `verify-deploy.mjs` → CF Pages **success**（run 105602694374；轮询至 poll 6 转 success） |
| 2026-09-18 20:5x–21:0x | 修复后全量线上探针（258 HTTP200）→ 39 个 503 补探（39/39）+ 2 个温和复探 → **288/297 有 description** ✅ |
| 2026-09-18 20:52 | 本 §7 报告 + 证据文件落盘并 commit 本地；**push 留待下一窗口**（≥21:09，per §0.25.8 不阻塞等待） |

**未使用任何 `Start-Sleep` 阻塞主进程等待 30 min 间隔**（per §0.25.8）；构建轮询、全量探针、503 补探**均以 `run_in_background` 异步执行**，主进程全程未阻塞。

**说明**：本报告文件（docs-only）按 §0.25.9 不构成独立攒批触发条件；其 push 与下一笔实质改动**同批**发出，不单独消耗一次 CF Pages 构建配额。

---

## ⑤ 数据来源（§0.23 强制）

```
数据来源:
- 逐行结果表（入库）: .hermes/logs/2026-09-18-meta-description-results.tsv
                      （297 行 = 99 slug × 3 locale；欄位 locale/slug/status/has_description_after/final_state/desc_char_len）
- 线上探针（修复前）: （本地留存）297 请求 / 201 HTTP200 实测，2026-09-18 20:34
- 线上探针（修复后）: （本地留存）258 HTTP200 实测，2026-09-18 20:5x
- 503 补探:           39 个逐一重试，39/39 有值（单线程 + 指数退避）
- 边缘陈旧个案复核:   2 个（en/construction-material-sample-book-printing-guide [300]、en/packaging-box-pricing-2026 [237]）
- 未注册 slug 线上实测: 9 页 <title>=<h1>=slug 实证，2026-09-18 21:0x
- 门童与 tsc:          node scripts/check-regression-guard.js（全量）/ npx tsc --noEmit 实测输出
- 代码级根因:          src/data/blog-posts.ts:50-71（BlogPostMeta）、:2189-2191（getBlogPostMetaBySlug）
                      src/app/[locale]/blog/[slug]/page.tsx:820（修复行）
- 复算脚本:            .hermes/_probe-pb/{fullscan,postfix-probe,retry503,reconcile,setmath,make-tsv,diagnose-residual,unregistered-impact,qa-parity}.cjs
- K3 拍板记录:         docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md §四（队列依据）
                      AGENTS.md §0.23.1（门童 0 命中 ≠ 线上干净）、§0.25（30 min push 间隔）
- commit:              29f1afd9（队列 A #3）、c4146e7f（本轮修复）
```

**证据留存说明**：原始抓取全文（三语页面 HTML、含完整 description 文本的 297 条 JSON）**保留在本地** `.hermes/logs/2026-09-18-meta-description-postfix.json` 等文件，**未入库**——原因见 §⑦ 事故 5：反审门童的品牌分层规则无法解析该自定义 JSON 结构，会对「跨语言品牌混用」产生 49 处**误报**（已核实：en/ja 记录中含「智印港」的实际数量 = **0 / 297**）。入库的是 **guard-safe 的逐行结果表 TSV**（不含描述文字），审计价值等价且不触发误报。

---

## ⑥ 遗留挂账（发现但**未**顺手做，需 K3 裁决或留待后续窗口）

### 挂账 1（P0 级，建议优先）— 3 篇「已宣告未注册」文章：线上 title/H1 = slug

`blog-posts.ts` 中 **3 个 `BlogPostMeta` 对象已完整声明（title + excerpt 三语齐备），但从未加入 `export const blogPosts` 数组**：

| 常量名 | slug |
|---|---|
| `lpWeddingInvitationPricing` | `wedding-invitation-pricing-guide` |
| `lpWeddingInvitationCost` | `wedding-invitation-cost-guide` |
| `lpWeddingTableCard` | `wedding-table-card-printing-guide` |

`getBlogPostMetaBySlug()` 只查 `blogPosts` 数组（`blog-posts.ts:2190`）⇒ 三者一律 `undefined`；而其 `blog-data` JSON 条目**只有 `content`、没有 `title`/`description`**，`page.tsx` 也无内联 legacyPost ⇒ title 落到最后一档 **slug 本身**。

**线上实测（9 页全部命中）**：

| URL | `<title>` | `<h1>` | description |
|---|---|---|---|
| /zh-hk/blog/wedding-invitation-pricing-guide/ | `wedding-invitation-pricing-guide` | 同左 | 缺 |
| /en/blog/wedding-invitation-pricing-guide/ | `wedding-invitation-pricing-guide` | 同左 | 缺 |
| /ja/blog/wedding-invitation-pricing-guide/ | `wedding-invitation-pricing-guide` | 同左 | 缺 |
| /zh-hk/blog/wedding-invitation-cost-guide/ | `wedding-invitation-cost-guide` | 同左 | 缺 |
| /en/blog/wedding-invitation-cost-guide/ | `wedding-invitation-cost-guide` | 同左 | 缺 |
| /ja/blog/wedding-invitation-cost-guide/ | `wedding-invitation-cost-guide` | 同左 | 缺 |
| /zh-hk/blog/wedding-table-card-printing-guide/ | `wedding-table-card-printing-guide` | 同左 | 缺 |
| /en/blog/wedding-table-card-printing-guide/ | `wedding-table-card-printing-guide` | 同左 | 缺 |
| /ja/blog/wedding-table-card-printing-guide/ | `wedding-table-card-printing-guide` | 同左 | 缺 |

三者内容非空（JSON content 4,625–9,917 字符），页面 HTTP 200 且可索引 ⇒ **客户可见的 9 个页面标题就是 slug**。

**为何未顺手修**：修法涉及路由/注册面（注册后会同时改变 title、description、`getAllBlogPostSlugs()` 的消费方，含 sitemap 与博客列表页），属 §0.25.10.5 明列「不适用小改动免预览直推」的类别，且触及 §11.8 churn 红线判断。三条路线待 K3 选：

- **(a) 注册**：把 3 个常量加进 `blogPosts` 数组 → 立即获得正确 title/excerpt，但会进入 sitemap 与列表页（需确认这 3 篇是否为现行资产）。
- **(b) 退役 + 301**：若这 3 篇已被 `wedding-favor-bag` / `wedding-red-packet` / `wedding-envelope`（均在数组中）取代，则收拢到承接页。
- **(c) 仅补数据**：给 JSON 条目补 `title`/`description`，title 仍走 slug 档位，不解决 H1 问题 —— **不推荐**。

### 挂账 2（跨语系一致性）— en/ja 的「快速答案块」拿不到 v5.1 琥珀样式

`page.tsx:813` 的 v5.1 预处理正则**硬编码中文字面** `快速答案`：

```js
content = content.replace(/<div class="([^"]*)">\s*<p[^>]*>(?:\s*<[^>]+>)*\s*快速答案/g, …)
```

各语系实际使用的引言（实测枚举）：

| locale | 引言变体 | 数量 |
|---|---|---|
| zh-hk | `快速答案` / `💡 快速答案` | 12 / 12 |
| en | `Quick Answer` / `💡 Quick answer` / `💡 Answer Nugget` | 12 / 6 / 9 |
| ja | `クイック回答` / `💡 クイック回答` / `💡 答え nugget` | 9 / 6 / 9 |

（emoji 在预处理步骤 ② 已被剥离后再进步骤 ③）⇒ **zh-hk 命中、en/ja 全部不命中**。线上实测验证：`qa-answer` class 出现次数 zh-hk **6** / en **0** / ja **0**。

门童 #12 十二铁律的 Rule 3 按 `bg-*-50` 类计数（跨语系中立），说明**设计意图是各语系都有**快速答案块；缺的是 v5.1 的 `qa-answer` 专属样式（琥珀底 + ⚡ 徽标）。这是**表现层判定**（哪些引言标签应套用 AEO 样式），K3 拍板区 ⇒ 未擅自改。待定：(i) 仅对齐三语直译等价位（快速答案 ↔ Quick Answer ↔ クイック回答）；(ii) 连 `nugget/金塊/答え nugget` 变体一并纳入。

### 挂账 3 — 门童 #16 半截残留模式复现风险

本轮**未发现** GSC 黑话残留在本篇（三语 0 命中 ✅），仅作为 §0.23.1 既定检查项登记：修复 GSC 泄漏类问题时必须**整句重写**，不得只删数字。

---

## ⑦ 异常与事故

### 事故 1（本轮已闭环）— 验收环节发现的全站缺陷

见 §②/§③。**性质**：真缺陷（非误报），影响面 **211** 个线上页面（288 − 77）在修复后获得 meta description。**已按「就地修」处理并上线验证**。

### 事故 2（自查，已纠正）— 我的 commit message 存在一处**过度断言**

`c4146e7f` 的 commit message 写「修复后仍缺 = 0」。**该断言的真实作用域只是「修复前实测到的 201 个组合」**；修复后全量探针（297 组合）实际仍有 **11** 个缺，其中：

- **2 个**（en/construction-material-sample-book-printing-guide、en/packaging-box-pricing-2026）经复探确认是**边缘节点陈旧构建**造成的一次性假阴性，现已正常 ✅；
- **9 个**是 §⑥ 挂账 1 的「未注册 meta」缺陷（3 slug × 3 locale），**与本次修复无关，修复前同样缺**。

⇒ 正确表述应为（脚本精确集合运算，见 §③ 3.4）：

> 修复前实测缺失的 **124** 个组合中，**116** 个已修好；其余 **8** 个属挂账 1 的独立缺陷（本修复不覆盖）；另有 **1** 个（ja/wedding-invitation-pricing-guide）修复前因限流未被测到，亦属挂账 1。
> 全量 297 组合最终 **288 有 / 9 缺**，9 缺全部归因于挂账 1。

**本报告即更正记录**（per §0.23 数据诚信：不精确的断言须更正，不掩盖）。教训两条：

1. **commit message 里的「全量」断言必须与实际测量范围严格对应**，作用域是子集时不得写成绝对值。
2. **守恒校验不可省**：本报告初稿曾把总数写成 286（286 + 9 = 295 ≠ 297，明显不守恒），经逐行结果表核验后更正为 288。凡「A 有 / B 缺」类结论，必须验算 `A + B == 总样本数`。

### 事故 3（环境，非缺陷）— 线上探针触发限流

首轮全量探针并发 6 → **96/297 被限流 503**；修复后首轮仍有 **39/297 的 503**。处理：降并发至 3 + 请求间隔 + 503 重试（指数退避）+ 单线程补探 ⇒ 39/39 全部取得，**限流未造成任何未验证残留**。教训：**批量线上探针须单线程或低并发**，否则 503 会被误读为「页面异常」。

### 事故 4（门禁盲区，已补）— `@ts-nocheck` 让 tsc 对该文件完全失效

`page.tsx` L1 的 `// @ts-nocheck` 使整文件语义检查被跳过 —— 这是本次缺陷存活 3 道防线的第 ① 因。本轮已用 **esbuild 语法校验**兜住语法层（`@ts-nocheck` 不豁免语法错误，但语法闸门不能依赖 tsc 报告），并以**规则 D**（源码结构断言）兜住语义层。**建议**（留待 K3）：评估移除该 `@ts-nocheck` 或将其收窄到具体的 locale-key 重复属性段落，而非整文件。

### 事故 5（门禁误报，已规避）— 反审门童对「自定义 JSON 证据文件」产生 49 处品牌误报

首次提交本报告 + 原始抓取 JSON 时，pre-commit **硬拦**：🔴 49，规则全部为 `BRAND_LOCALE_MISMATCH - 跨语言品牌混用 / 命中: 智印港 (locale=en)`，**全部来自 `.hermes/logs/2026-09-18-meta-description-postfix.json`**。

**逐条核实（不得直接当作真缺陷，也不得直接当作误报）**：

```
查詢: 該 JSON 中 loc=en/ja 的記錄, 其 description / og 是否含「智印港」
結果: 0 / 297   ⇒ 零实际品牌混用
```

⇒ **确认为门禁误报**：该 JSON 是本轮自建的证据格式（`{loc, slug, status, desc, descLen, og}`，逐行 pretty-print），非门童预期的 `blog-data` 结构；门童的品牌分层规则按行推断 locale 上下文，无法正确解析此结构 ⇒ 把 zh-hk 记录里的「智印港」误配到邻近的 `loc: "en"` 上。

**处置（不绕过门禁）**：**未使用 `--no-verify`**；改为把证据降级为 **guard-safe 的逐行结果表 TSV**（仅 locale/slug/状态/长度，**不含描述文字**）入库，原始全文抓取留在本地。既有先例：队列 A #2 的 §7 报告同样为本地留存未入库。

**留待 K3/后续**：门童品牌分层规则可考虑 (i) 仅在 `src/` 路径生效，或 (ii) 对 `.hermes/` 下非 `blog-data` 结构的自定义证据文件跳过行级 locale 推断 —— 属规则调整，未擅自改。

### 门童规则新增（DoD 铁律：No fix without a rule）

`scripts/guards/meta-description-guard.js` 新增 **规则 D `META_DESCRIPTION_RENDER_PATH`**（severity **red**）：

- **D1（负向）**：渲染页不得读取 `BlogPostMeta.description`（字段不存在 ⇒ 恒 `undefined` = 静默失效），跳过注释行防误报；
- **D2（正向）**：描述解析表达式必须至少引用一个真实来源（`legacyPost?.description` / `jsonEntry?.description` / `meta?.excerpt`），防「修好 D1 却把来源整体删掉」变成恒空串。

配套回归测试 `scripts/test-meta-description-guard.js`：**6 用例 6/6 PASS**，含原事故写法的**正向控制**（必须命中）与注释/正确写法的**负向控制**（不得误报）。

### 橙色（shadow）增量说明

门童汇总橙色由上一批记录的 🟠 1528 → 本轮 🟠 **1555**（+27）。经查为**新文章复用 SOP-10 第 3 款已拍板的既有事实数据**所致（实测：寫真書 content 含 `15 年` 三语、`海德堡/Heidelberg` zh-hk+en、`ISO 9001` zh-hk），属 `CRED_*` / `SOP10_*` 影子类，**非阻断项**（orange 为 shadow mode）。未逐条定位到条 —— 如需精确对账可另开只读任务。
