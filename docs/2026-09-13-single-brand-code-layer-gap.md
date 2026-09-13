# 执行层呈报：单品牌分层「代码层存量」缺口（2026-09-13 17:00）

**呈报人**: 执行层（deepseek hermes / autoclaw 承接）
**触发**: 本轮 push 线上验收时，verifying 过程中发现——修的不是主要发生地
**数据来源**: `node .hermes/inventory-dual-brand.cjs`（Node utf8 只读扫描 `src/` + `messages/` + `scripts/`）+ 线上实测 `https://zprintpro.com/zh-hk/...` + `git show` + `.hermes/probe-*.cjs`
**规则依据**: AGENTS.md §2 / §7「单品牌分层（K3 2026-09-01 02:54 拍板）：zh-hk = 智印港（单品牌，不加 ZprintPro 后缀）」「双品牌『智印港 ZprintPro』不再同时出现」

---

## 1. 结论（一句话）

**单品牌规则（9/1 拍板）在「数据层」已修，在「代码层」几乎未执行**：代码层仍有 **443 处 / 47 文件** 的双品牌 `智印港 ZprintPro`，且覆盖 zh-hk 的**全站元数据面**（author / creator / publisher / og:title / JSON-LD name），线上每一张 zh-hk 页面都在输出双品牌。

---

## 2. 硬证据

### 2.1 代码层存量：443 处 / 47 文件（Top）

| 文件 | 处数 | 面 |
|---|---|---|
| `src/data/products-content.ts` | 224 | PDP 正文/FAQ HTML（zh-hk 可见） |
| `src/data/blog-data/zh-hk.json` | 49 | blog 正文 + JSON-LD |
| `src/app/[locale]/blog/[slug]/page.tsx` | 18 | blog 标题映射 |
| `src/data/products.ts` | 14 | SKU `title_zh` |
| `src/data/blog-data/ja.json` | 12 | ja 侧（`ジープリント ZprintPro`） |
| `src/lib/seo-keywords.ts` | 12 | 类目 SEO title/desc |
| `src/lib/seo.ts` | 10 | **元数据生成器** |
| `src/data/blog-posts.ts` | 8 | blog meta title |
| `src/data/category-seo-content.ts` | 8 | 类目 featuredSnippet |
| `src/app/[locale]/layout.tsx` | 6 | **全站 og:title / twitter:title / author** |
| `src/lib/seo/schema-extensions.ts` | 6 | **JSON-LD publisher/Organization name** |

按面（`inventory-dual-brand.cjs`）：**SEO/元数据层 35 处 / 5 文件**、**数据 title 层 91 处 / 5 文件**、**页面文案层 73 处 / 30 文件**、其余为正文/内部件。

按「是否落在 title/meta/desc/alt 字段行」二次分类（`classify-dual-brand.cjs`，逐处判定）：

| 类别 | 处数 | 含义 |
|---|---|---|
| 落在 title / meta / description / alt 字段行 | **118** | 改它 = 动 title/churn 区 |
| 落在正文 / 其他行 | **325** | 改它 ≈ 零 churn（文案与元数据非 title 面） |

title 行命中 Top：`blog-data/zh-hk.json` 49、`blog/[slug]/page.tsx` 17、`products.ts` 11、`blog-data/ja.json` 6、`category-seo-content.ts` 6、`layout.tsx` 4。

### 2.2 线上实测（zh-hk，deploy 8de45a05）

```
https://zprintpro.com/zh-hk/product/kraft-paper-bags
  <meta name="author"    content="智印港 ZprintPro">
  <meta name="creator"   content="智印港 ZprintPro">
  <meta name="publisher" content="智印港 ZprintPro">
  <meta name="twitter:title" content="智印港 ZprintPro | 香港印刷服務">
  <meta name="description" ...>… 立即 WhatsApp 報價。ZprintPro 15+ 年自有品牌。
https://zprintpro.com/zh-hk/                 ← 首页
  <title>智印港 ZprintPro | 香港印刷公司 | 急件印刷·即日交貨 | …</title>
  <meta property="og:title" content="智印港 ZprintPro | …">
```

来源即 `src/lib/seo.ts`（**同一文件内两套口径并存**）：
- L24 `getWebLogoAlt('zh-hk')` → `'智印港 ZprintPro'`（**双品牌**，注释引 2026-08-10 §0.15）
- L34 `getBrandName('zh-hk')` → `'智印港'`（**单品牌**，注释引 K3 2026-08-10 §0.15 locale-aware 公式）
- L41-54 `siteConfig.name` / `displayName` 已是 `'智印港'`，但注释仍记「2026-07-21 301 合体后改双品牌分层」（**已被 9/1 拍板取代的旧口径**）

### 2.3 为什么没被门禁拦下（机制性原因）

- `scripts/guards/brand-guard.js`（门童 #3 品牌分层，red 硬拦）**存在且已接线**（`check-regression-guard.js` L39 + pre-commit hook L75）。
- 但 hook 以 **`--commit` 模式**运行 = **只扫 staged diff**（源码注释：「仅扫 staged diff (< 5s, pre-commit hook 性能优化)」）。
- ⇒ **存量 443 处天然豁免**；9/1 设计文档自评也写到「8/31 之前 809 处 48 文件 …… ⚠️ 部分拦到（但 8/31 之前漏过数月）」（`docs/2026-09-01-k3-regression-guard-v1-design.md` L31）。
- 另一条：`AGENTS.md` §8 挂的 `check-brand-mentions.mjs --strict` 只查**第三方品牌名 + 编造指纹**（A 类），**不含自有品牌双品牌规则**（该文件内无 `智印港` / `DOUBLE_BRAND` 逻辑）。

### 2.4 关联：数据层也同样有残留（本轮发现，非本轮引入）

| 位置 | 残留 | 说明 |
|---|---|---|
| `zprintpro-sku-seo-data.csv` | **69 格** `… \| ZprintPro智印港` + **75 格** `图片Alt标签(ZH)` 含 ZprintPro；`SEO标题(ZH)/(SEO描述(ZH)/正文(ZH)` 各 6 格含 ZprintPro | 本轮只修了 `智印港 ZprintPro`（69 处）这一种形态 |
| `src/data/sku-seo-data.ts` | zh-hk 段 **9 个 SKU** 的 description 尾部 `ZprintPro 15+ 年自有品牌。` | 线上已生效（zh-hk 页 meta description 可见） |
| `src/data/sku-seo-data.ts` | `faqs` 数组**不按 locale 分键**：`a` = `專業可移貼紙(無殘膠)服務 \| 智印港`，`q` = 一段日文描述句 | 结构问题，非文案问题；会同时出现在 en/ja 页面 → 需 K3 裁决口径 |

---

## 3. 为什么要 K3 拍板（不能执行层自主做）

1. **触及 title**：L1 层 SEO/元数据 + 91 处数据 title，改动 = 全站 title 变更 → 撞 §11.8「禁止回滚已部署 title（churn 红线）」与 title v4「冻结 2–4 周」。
2. **触及实体身份**：JSON-LD `Organization.name` / `alternateName` 直接关系 Google 实体识别（2026-06-17 曾因双品牌导致实体共享/降权，属已知 P0 历史事故）。
3. **两种修法收益/风险不同**（见 §4），需 K3 选一条。

---

## 4. 三选项（含我的建议）

| 选项 | 范围 | 收益 | 风险 | 建议 |
|---|---|---|---|---|
| **A. 全面单品牌化（含 title）** | 443 处全清 + 门童升全域扫描 | 直接释放 zh-hk title 的 10 半角当量/SKU（FILL 169 条成因之一）；实体口径统一 | 118 处 title 行全线 churn，撞 title v4 冻结窗；需按批 + 观察窗 | 不建议一次性 |
| **B. 先清「非 title 面」**（推荐） | **325 处**（元数据 author/creator/publisher、logo alt、JSON-LD name、正文/FAQ/press-kit/terms 等） | 零 title churn；实体口径先统一；线上「每页双品牌」立即消失 | 不动 title，双品牌仍留在 118 处 title 行（等于现状） | **建议先做 B**；title 面留到冻结窗结束后按批做 A |
| **C. 只装门禁不动存量** | 把门童 #3 从 `--commit`（仅 staged diff）扩到「全量 red + 存量白名单递减」 | 防复发 + 进度可量化 | 存量不动，线上现状不变 | 作为 B 的配套（B + C 同批） |

**我的推荐 = B + C 同批执行**：先清非 title 面 **325 处**（零 churn），同时把门童 #3 升级为「全量扫描 + 存量白名单递减」，白名单计数即进度指标；title 面（**118 处**）等 K3 指定窗口。

---

## 5. K3 裁决（2026-09-13 17:35，已回）

- **选中 B + C**：先清非 title 面 + 门童升全域。
- **数据层 ①②③ 同批修**；**④（`faqs` 不按 locale 分键）单独评估后出方案**，本批不动手。
- **ja 侧统一为 `ZprintPro`**（按 9/1 §2 字面；`ジープリント` 继续作 alternate 单独埋点，不与 ZprintPro 同现）。

---

## 6. 执行结果（2026-09-13 17:45，B + C 批已落地）

| 项 | 结果 | 证据 |
|---|---|---|
| 非 title 面清理 | **292 处 / 26 文件**（清单人工过审后执行） | `scripts/fix-dual-brand-nontitle.mjs` + `.hermes/dual-brand-allowlist.json`（allowCount 292 / holdCount 30） |
| 形态处理 | `智印港 ZprintPro`(→智印港) / `ZprintPro 智印港`(→智印港) / `ジープリント ZprintPro`(→ZprintPro) | 断言：改后该行双品牌 = 0、无「\| \|」、无相邻重复品牌、行不变长、zh-hk 行保「智印港」、ja 行保「ZprintPro」 |
| 数据层 ① | CSV `图片Alt标签(ZH)` 69+6 格、`SEO标题(ZH)` 6 格、`SEO描述(ZH)` 6 格、`正文内容优化(ZH)` 6 格 → 全部 0 | 列感知替换 + EN/JA 列零改动断言 + 75 行 × 31 列守恒 |
| 数据层 ② | `products.ts` alt 兜底模板 `ZprintPro智印港` → `智印港`（1 处，L8491） | 越界断言：title 面 `智印港 ZprintPro` 13 处**未被动** |
| 数据层 ③ | `sku-seo-data.ts` `ZprintPro 15+ 年自有品牌` ×9 → 智印港；zh-hk imageAlt 尾缀 ×4 → 智印港 | 文件级 ZprintPro 断言 −13 |
| 门禁 C | 新建 `scripts/check-brand-baseline.mjs`（全量扫 src/+messages/，对 `.hermes/brand-baseline.json` 基线只许递减）+ 接入 pre-commit（含 canonical SSoT 与已安装 hook） | **负向测试通过**：故意注入 1 处 → exit 1 拦截；基线 **150** 处 / 33 文件 |
| 门禁 | tsc 54=54（错误全在 `src/lib/quote-engine/__tests__/*`，本批改动文件 0 错）；`check-brand-mentions --strict` A 类 0 | `.hermes/tsc-analyze.cjs` |

**剩余存量 150 处 / 33 文件 = title 面 + 多行 locale-map 页 title**（`seo-keywords.ts` 12、`blog-posts.ts` 8、`products.ts` title_zh 13、`layout.tsx` og:title/twitter:title、`metadata.ts` title 模板、`seo.ts` 首页 title 等）→ 等 K3 指定窗口做 A，门禁基线数字即进度表。

### 6.2 补漏两轮（同日 18:45，把 150 → **83**）

B 批的允许清单是「行内字段名」启发式生成的，实测漏了三类**非 title 面**，已用两支 pattern 级脚本补齐（同样三件套 + 更强断言）：

| 轮次 | 脚本 | 清除 | 覆盖 |
|---|---|---|---|
| B2 | `scripts/fix-dual-brand-nontitle-b2.mjs` | **15 处** | `seo-keywords.ts` 的 `intro/outro` 正文（6）、`products.ts` 的 `seoImages.alt`（3）、`category-seo-content.ts` 的 `featuredSnippet` 答案块（6） |
| B2c | `scripts/fix-dual-brand-jsonld-names.mjs` | **52 处** | blog-data 内嵌 JSON-LD：`\"name\":\"智印港 ZprintPro\"` ×26、`\"name\":\"ZprintPro 智印港\"` ×5、`ZprintPro ジープリント` ×3、`智印港 ZprintPro 首頁` ×12、`跨境印刷 SaaS` ×5、`印刷規格指南` ×1 |

**为什么 blog-data 必须 pattern 级而不能整行替换**：`content` 是「整篇一行」字符串，同一行里既有 `\"name\"`（JSON-LD Organization 名 → 非 title 面，本批范围内），也有 `\"headline\"` / `<h1>`（文章标题镜像 → title 面，按裁决留待冻结窗）。因此脚本断言：**JSON.parse 合法性 + 键数不变 + 长度差 == 预期 + headline 含双品牌数前后不变**（实测 1 → 1，未被误伤）。

### 6.3 最终口径（2026-09-13 18:45）

| 项 | 数值 |
|---|---|
| 起始存量（本日发现） | **443 处 / 47 文件** |
| 本日清除合计 | **360 处**（B 292 + B2 15 + B2c 52 + 前批数据层 1） |
| 剩余存量（门禁基线） | **83 处 / 32 文件 = 纯 title 面 + `alternateName` 别名** |
| 剩余构成 | `blog/[slug]/page.tsx` 17（blog title 映射）、`products.ts` 10（`title_zh`）、`blog-posts.ts` 7、`seo-keywords.ts` 6（title/h1）、`blog-data/zh-hk.json` 5（3 title + 1 headline + 1 h1）、`layout.tsx` og/twitter 4、`about` 3、`seo.ts` 3（含首页 title）、`contact` 2、`press-kit` 2、**`OrganizationSchema` 2（`alternateName` 别名表 —— 语义上「别名」本就是多名称，建议 K3 单独确认，本批未动）**、其余单点 |

**门禁 C 的价值即在此**：83 = 存量白名单，此后任何新增双品牌都会在 pre-commit 被拦（已负向测试验证）；清一批 → `--update` 重录 → 数字即进度。


### 6.1 本批两条工具教训（已固化 `.hermes/logs/tool-lessons-2026-09-13.md`）

1. **假零**：在无 `node_modules` 的 worktree 里跑 `npx tsc` 会直接失败，而我当时只统计 `error TS` 行数 → 误报「0 error」。修法：守卫必须断言「命令真跑起来」（`.hermes/tsc-analyze.cjs` 现在会校验 exit code 与输出）。
2. **尾随逗号丢失**：v1 替换正则把 `,?\s*$` 吃掉 → 4 处 `TS1005`。修法：替换保留 `(,?)` 分组 + 新增「引号/括号守恒」与「尾随逗号保持」断言。**备份让这次回滚零成本**（§12 三件套的价值实证）。

