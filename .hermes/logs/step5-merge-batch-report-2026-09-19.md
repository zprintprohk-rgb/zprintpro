# Step 5 合并批交付报告 — (A) 孤儿交付物审查 + (B) 三个真缺陷修复

- 执行单元: 执行层专项单元（Step 5 合并批）
- 日期: 2026-09-19
- 状态: **READY**（验收 7 项全过；基线真实递减 −128）
- 边界遵守: **未** commit / push / `git add -A`（§0）；**未** 改 `src/data/products.ts`；**未** 改 (A) 三个孤儿档任何一个字节（只读审查）；
  产出 = 可复核工作区改动 + 本报告，提交动作留给主执行层。
- 作业规格参照: `.hermes/logs/step4-specs-i18n-report-2026-09-19.md`（Step 4 同格式）+ `docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md`（判据原文）

---

## 0. 一句话结论

- **(A) 三项判定 = 全部「合规（a）」，可补提交**；但派活前提有 **1 处事实纠正**（该档并非零引用），另有 **2 个非红线疑点**列 §1.4，交主执行层决定提交粒度。
- **(B) 三项真缺陷全部修复并实测**：size 栏 **73/73 字串全覆盖**（95 个 size 值）；PDP 栏名 `dt` 三语化（**zh-hk 输出由英文栏名变繁体栏名 = 已授权变更**，见 §2.2 对照表）；`category-seo-content.ts` en 语系块内整条繁中 FAQ **已清除**（−106 命中），同类残留已全量扫描并列 §2.3.3。
- **验收 7/7 全过**（tsc 54 / red 0 / 注入测试 10 PASS / 基线 1448→**1320** / 幂等 byte diff = 0 / 断言未过不写盘 / UTF-8 无 BOM + LF）。

---

## 1. (A) 孤儿交付物审查 —— 对 v10.1 决策 1-B 红线逐条判定

### 1.1 事实纠正：该档**不是**零引用（派活前提需修正）

派活描述「`src/data/print-method-policy.ts`（新档、零引用 = 孤儿）」。**实测不成立**：两个 M 档的第 1 个 hunk 就是它的 import——

```
src/app/[locale]/product/[slug]/page.tsx:49   import { getDisplayMinOrder, MOQ_AEO, MOQ_STANDARD_PARAGRAPH, isDigitalLineBook } from '@/data/print-method-policy';
src/components/category/CategoryProductCard.tsx:12  import { getDisplayMinOrder, isDigitalLineBook } from '@/data/print-method-policy';
```

⇒ 「零引用」的观感来自 **`git grep` 只搜已跟踪内容**（三档同为未提交状态）；对工作区做全文搜索即命中 2 处。
**结论**：不是死代码，接线已由同批 M 档完成，无需另行接线；三档必须**同批提交**（单独提交新档会得到真孤儿）。

### 1.2 两个 M 档到底改了什么（`git diff` 逐行）

**(a) `src/app/[locale]/product/[slug]/page.tsx`（+29/−3）—— 混了 3 条 lane，需主执行层按 lane 决定提交粒度**

| hunk | 行 | lane | 内容 |
|------|----|------|------|
| @@ -45 | +2 | **v10.1 1-B** | import `print-method-policy` |
| @@ -565 | 1 改 | **v10.1 1-B** | PDP 价格卡「起訂量」行 `{product.minQuantity}` → `{getDisplayMinOrder(locale, slug, minQuantity)}` |
| @@ -590 | +11 | **v10.1 1-B** | 数码线书刊 4 SKU 专属 **AEO 快速答案块 + 印刷方式统一说明段**（`isDigitalLineBook` 条件渲染） |
| @@ -282 | +1 | weekly-meta lane | relatedBlogs 补 1 条 `wedding-invitation-envelope-printing-guide` |
| @@ -296 | +4 | weekly-meta lane | relatedBlogs 补 4 条紙袋/珠宝/服装/跨境电商/金融 博客内链 |
| @@ -647 | +5/−1 | **404 修复 lane** | `product/*` 前缀 slug 不再走 `/blog/`（原 `/zh-hk/blog/product/kraft-paper-bags/` = HTTP 404） |

⇒ 该档**不止 1-B 一件事**：另有 weekly-meta 内链自生长 + 1 个线上 404 修复。三者均属真实修复/内容补入，**但不同 lane**，建议主执行层按 lane 拆 commit（或 1 commit 并在 message 里列明 3 lane）。

**(b) `src/components/category/CategoryProductCard.tsx`（+18/−6）—— 纯 1-B**

`moqLine` 三元式改为 `isDigitalLineBook(product.slug) ? getDisplayMinOrder(...) : (原三段逻辑原样保留)`。
`getDisplayMinOrder` 对名单外 SKU **原样回传 `String(minQuantity)`** ⇒ 非名单 SKU 逐字不变（§1.3 ⑥ 实测）。

### 1.3 红线逐条判定（判据 = v10.1 决策 1-B 的 ①-④ + 派活给的 4 条）

| # | 红线（原文） | 判定 | 实测依据 |
|---|--------------|------|----------|
| ① | **仅限真实可接 1 本的 SKU（数码线书刊/本册类，HP Indigo 线）；柯式线 MOQ 不动** | ✅ 合规（且取**保守子集**） | `DIGITAL_LINE_BOOK_SLUGS` = `catalog-printing` / `perfect-bound-books` / `hardcover-books` / `spiral-notebooks`，4 个**全部属 `books` 品类**（真跑 products 数组实测）；`books` 品类共 5 个 SKU，第 5 个 `saddle-stitch-booklets` **未纳入**（= 未越权宣称，属保守侧，不构成违规；见 §1.4 N1） |
| ② | **价格数字不动（两次裁定锁定）** | ✅ 合规 | `git diff` 无任何 `price_range` / `price-tables/*` / `getDisplayAnchor` 配置改动；4 SKU 的 `minQuantity` 实测仍为 100；anchor 大字价 `anchor.big` 仍原样渲染（只有 `anchor.sub` 副行被 MOQ 行取代 → 见 §1.4 N2） |
| ③ | **文案只写「我哋 1 本起印」，禁写竞品 MOQ 对比数字** | ✅ 合规 | 新档 3 段文案全文检索 = 无任何竞品名 / 竞品 MOQ 数字；仅出现我方自己的「100 本以上柯式更經濟 / 100 本以上柯式印刷更經濟」，且该表述**站上早已存在**（`category-seo-content.ts` L728 / L769 / L793 books 品类页），**未新造数字** — 新档头部声明的这一点经实测成立。`Alibaba 黃頁 500+` 命中样本（`products.ts:5737` saddle-stitch description、`blog-posts.ts:501`、`blog-data/ja.json`）**全部为既有存量，非本批引入**，本批新档零命中 |
| ④ | **展示层先行（不碰引擎）** | ✅ 合规 | 新档头部明写作用域 = 展示层；`src/data/products.ts` 工作区 **clean**（`git status` 空）；`minQuantity` 0 改动。**旁注**：同 cron 的姊妹提交 `77ee701c` 已把 `products.ts` features 复制字段 `【50本起訂】小批量數碼，大量柯式` → `【1本起訂】…`（4 处，恰为上述 4 SKU），属 plan doc §5 第 1 行**已列入方案**的数据层**文案**字段，非 `minQuantity`，且**已提交**、不在本批工作区 |
| ⑤ | （1-B 附加条件④）7 天后（9/25）报 GSC 该簇 CTR/imp | ⏳ 流程项 | 属时间窗任务，非本次可判 |

### 1.4 判定结果与疑点（**不是**违规，但须主执行层/ K3 知悉）

**判定 = (a) 合规 ⇒ 三档可同批补提交。** 但下列 3 条「不确定/待确认」明确列出（派活要求「不得用放宽规则达标」，故不掩盖）：

- **N1｜口径不一致（既有，非本批引入）**：`category-seo-content.ts` books 品类页既有文案已写「**1 本起訂（數碼印刷）**」（L769 规格表 / L793 FAQ），覆盖整个 books 品类 5 个 SKU；而本批数码线名单只含 4 个（`saddle-stitch-booklets` 不在内）。两侧都「不过度宣称」，但**站内仍存在 1 处口径并存**。plan doc §五 L3 已设计门童 `MOQ_CLAIM_CONSISTENCY` 治本，**该门童尚未实现**。⇒ 建议：下一批（或 K3）一句话定 saddle-stitch 是否属数码线，然后同步名单或品类页文案。
- **N2｜品类页卡片副行被替换（作者有意优先级，非红线违反）**：`CategoryProductCard` 原逻辑是「有 anchor ⇒ 显示 `anchor.sub`」。改后数码线 4 SKU 一律显示 MOQ 行，因此 **2 个 SKU 的 `anchor.sub` 被顶掉**：
  `perfect-bound-books` zh-hk `10,000本起批 · 整批 HK$8,697` / `hardcover-books` zh-hk `實價按規格報價 · 滿$500包郵`（含**包郵促销信息**）。
  大字价 `anchor.big` 未受影响。⇒ 若 K3 认为包郵信息不能丢，改法 = 把 MOQ 行与 `anchor.sub` 用「·」拼接（会加长卡片行），**需拍板**；本批未擅动。
- **N3｜提交粒度**：`page.tsx` 含 3 条 lane（见 §1.2a）。本执行层受 §0 边界约束**不执行 commit**，故粒度由主执行层定。

### 1.5 (A) 造成的 zh-hk/en/ja 输出变更（**已授权**，非 churn 事故）

1-B 全部落在展示层，**必然**改变这 4 SKU 的起订量文案。逐栏位改前→改后（探针 `.hermes/_probe-pb/_step5-churn-sim.ts` 真跑 `products` + `getDisplayAnchor`）：

**品类页产品卡 `moqLine`（4 SKU × 3 locale = 12 栏位，实际变更 12）**

| SKU | locale | 改前 | 改后 |
|-----|--------|------|------|
| catalog-printing | zh-hk | `100本起訂 · 量大更優` | `1 本起印（數碼）· 100 本以上柯式更經濟` |
| catalog-printing | en | `MOQ 100 · Volume pricing` | `From 1 copy (digital) · 100+ cheaper on offset` |
| catalog-printing | ja | `100個〜 · 大口割引` | `1 部から（デジタル）· 100 部以上はオフセットが経済的` |
| perfect-bound-books | zh-hk | `10,000本起批 · 整批 HK$8,697` | 同上 zh-hk 新值（★ N2） |
| perfect-bound-books | en | `From 10,000 pcs · batch $1,114` | 同上 en 新值（★ N2） |
| perfect-bound-books | ja | `10,000冊〜 · 一括 ¥173,940` | 同上 ja 新值（★ N2） |
| hardcover-books | zh-hk | `實價按規格報價 · 滿$500包郵` | 同上 zh-hk 新值（★ N2） |
| hardcover-books | en | `Final quote by specs · Free shipping over $500` | 同上 en 新值（★ N2） |
| hardcover-books | ja | `仕様により正式見積 · 送料無料条件あり` | 同上 ja 新值（★ N2） |
| spiral-notebooks | zh-hk | `100本起訂 · 量大更優` | 同上 zh-hk 新值 |
| spiral-notebooks | en | `MOQ 100 · Volume pricing` | 同上 en 新值 |
| spiral-notebooks | ja | `100個〜 · 大口割引` | 同上 ja 新值 |

**PDP 价格卡「起訂量」行（4 SKU × 3 locale = 12 栏位，实际变更 12）**：`100` → 上述 MOQ 行（三语同上）。
**PDP AEO 快速答案块（新增，4 SKU × 3 locale）**：`最少可以印幾本？→ 1 本起印…` / `What is the minimum order quantity?` / `最小ロットは何部からですか？`。
**回归（强制 0）**：全站 **380 栏位 × 3 locale = 1140 次取值**，**名单外变更 = 0**（探针输出末段）。

---

## 2. (B) 三个真缺陷

### 2.1 `size` 栏三语化 —— 沿用 Step 4 机制（未另立第二套）

**派活数字核对（真跑 products 数组，非文字扫描）**：

| 指标 | 派活给定 | 实测真值 |
|------|----------|----------|
| size 栏位（SKU 数） | 95 | **95** ✅ |
| size 唯一字串 | 73 | **73** ✅（= 70 条含 CJK 需译 + 3 条纯 ASCII 尺寸串） |
| 其中纯 ASCII（`A4（210×297mm）` / `A5（148×210mm）` / `A1 594×841mm`） | — | **3 条**（语系中性，en/ja = 原文，无单位换算） |
| size 栏唯一字串含**简体专用字形** | — | **0 条**（故 zh-hk = 原文逐字不会引入简体污染） |

**机制沿用（未新增机制）**：

| 环节 | 载体 | 本轮改动 |
|------|------|----------|
| 权威 dump | `.hermes/_probe-pb/_dump-spec-strings-full.ts` | 扩第 2 轮扫描（`size`），**size 一律追加在 238 条之后**（索引 239-311）⇒ `_spec-tr-1..5.json` 索引**零位移**；新增对冻结基准 `_spec-strings-full.step4-238.json` 的逐条对位断言 |
| 译文源 | `.hermes/_probe-pb/_spec-tr-6.json`（**新增**，73 条，key = 索引 239-311，值 = `[en, ja, anchor]`） | 手写三语，anchor = 原文前导尺寸 token（用于抓索引错位） |
| 生成器 | `.hermes/_probe-pb/gen-spec-i18n.cjs`（**改**，非新增） | ① 计数断言 = dump 长度 311 ② 形状断言 = anchor 前缀逐条吻合 + 译文非空 + **en 无 CJK** + **栏名 4 条形状** ③ **size 覆盖率断言 73/73** ④ 备份 `.bak`；**断言未过不写盘** |
| 映射档 | `src/data/product-specs-i18n.ts`（生成） | 238 → **311 条**；`localizeSpecValue` 原样复用（`ProductTabs.tsx:180` 早已把 `specs.size` 接进查表 ⇒ 无需改渲染层） |
| 渲染层 | 无需改动 | 活 PDP（`ProductPageV9.tsx:600`）与 legacy（`ProductTabs.tsx:180`）都已是查表调用 |

**实测覆盖**（探针 `.hermes/_probe-pb/_step5-verify.ts`）：
```
size 栏覆盖: 73/73
端到端: 380 栏位 × 3 locale = 1140 次取值
zh-hk 输出 ≠ 原文 = 0 (§2.1 零 churn, 强制) | en 输出仍含 CJK = 0 | ja 含简体 = 0
映射档自检: zh-hk≠原文 = 0 | en 含 CJK = 0 | ja 无汉字假名 = 0 | zh-hk 含简体 = 0 | ja 含简体 = 0
（字集同源: SIMP_ZH 866 字 / SIMP_JA 791 字，直接取自 scripts/guards/i18n-guard.js，不另立字集）
```
数字/尺寸写法**逐字照抄原文**（`210×297mm` / `90×54mm` / `20–120mm` / `R3mm` / `60x40x20` 全原样），只译自然语言词（標準/可客製/自訂…）。

**§2.1 zh-hk 零非预期 churn**：断言 `SPEC_I18N[k]['zh-hk'] === k` 对 **311/311 条**成立，且 1140 次端到端取值 `zh-hk 输出 ≠ 原文 = 0` ⇒ zh-hk 渲染**逐字节不变**。

### 2.2 PDP 规格栏名 `dt` 本地化（**zh-hk 由英文栏名 → 繁体栏名，属预期变更**）

**缺陷位置**：`src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx:599` 原为 `<dt>{k}</dt>`（`k = Object.keys(specs)`），**zh-hk / en / ja 三语一律显示英文键名** `material` / `size` / `printMethod` / `finishing`。
（legacy `ProductTabs.tsx:173-192` 早已用 `t.specs.*` 本地化 ⇒ 缺陷只存在于活 PDP。）

**修法**：栏名映射并入同一份源头档 `src/data/product-specs-i18n.ts`（由生成器输出 `SPEC_FIELD_LABELS` + `localizeSpecField`，未命中 fallback 原 key），渲染层一行改查表。**未另立第二套机制。**

| key | 改前（三语同值） | **zh-hk 改后** | en 改后 | ja 改后 |
|-----|------------------|----------------|---------|---------|
| material | `material` | **材質** ★ | `Material` | 素材 |
| size | `size` | **尺寸** ★ | `Size` | サイズ |
| printMethod | `printMethod` | **印刷方式** ★ | `Print Method` | 印刷方法 |
| finishing | `finishing` | **後加工** ★ | `Finishing` | 後加工 |

- ★ = **zh-hk 输出变更（K3 已知并授权处理的一项，属预期变更，非 churn 事故）**：zh-hk PDP 规格栏名由英文 → 繁体港式用语。
- en 亦由 `material`/`printMethod` 变为首字母大写的 `Material`/`Print Method`（同为预期内的本地化修正）；ja 由英文 → 日文。
- 每语系**列数不变**（4 条 `dt`）、`dd` 取值逻辑不变、fallback 实测成立：`localizeSpecField('unknownKey','zh-hk') === 'unknownKey'`。
- **已知站内不一致（本批未动，明确挂账）**：legacy `ProductTabs.tsx` 同栏名为「加工工藝」（zh-hk）/「加工」（ja）；本批按派活给定的港式用语取「後加工」。若要全站统一，**改 `gen-spec-i18n.cjs` 里 `FIELD_LABELS` 一行并重跑生成器即可**（会再动一次 zh-hk/ja 既有输出，需另行拍板）。

### 2.3 `category-seo-content.ts` en 语系块内整条繁中 FAQ 残留 —— 已清除

**缺陷确认**（原 L2150，位于 `redPacketsContent.en.faq` 数组内）：

```
{ q: 'CNY 2027 利是封備貨時間線 + 行業趨勢？', a: '8 月設計 → 9 月打樣 (HK$200 含郵費) → …對打 e-print HK$1.6/個 (100 個), 我方 HK$1.2/個…' }
```
前后（L2141-2149、L2151-2153）全为英文 FAQ；**L2155 已有同一 FAQ 的完整英文版**（v3.15 S2 T36，内容逐项对得上：时间线 / 企业场景 / 行业趋势 / e-print 对比）。
⇒ `en` 页面会渲染中文 FAQ = **真缺陷**。

**修法**：**删除该繁中项**（去重，非替换 —— 英文版已在同数组内），并就地留下溯源注释（写明原 v3.14 T25 标签 + 英文版位置 + 删除理由），便于复核与反查。语义**零损失**。
- 实测 `備貨時間線` 全档命中：修前 = 2150(值) + 2 处注释；修后 = **仅剩 2 处历史注释**（`docs` 式溯源，客户不可见）。
- 该档门童 #4 命中 **159 → 53（−106）**，与 Step 4 §8 独立清点的「2150 = 106」**逐数吻合**（互为交叉验证）。

**2.3.1 影响范围（zh-hk 零 churn 证据）**：`git diff src/data/category-seo-content.ts` 仅 1 个 hunk、位于 `en:` 语系块内（`redPacketsContent.en.faq`），**zh-hk 块 / ja 块 0 改动** ⇒ §2.3 不改变 zh-hk 既有输出。

**2.3.2 同类「整段繁中摘要/FAQ/JSON-LD 串进 en 值」全量扫描（本档）**：探针 `.hermes/_probe-pb/_step5-en-cjk-residue.cjs`
- 判据：en 语系块内 `q/a/title/description/heading` 值，汉字 ≥ 8 且无假名。
- 结果：**除 2150 外 0 条**（2150 修复后已归 0）。全档 en 块逐行 CJK Top：`L2150 106（已清）` / L3170 16 / L1851 12 / **L2154 12（注释）** / **L2149 11（注释）** / L3171 7 / L1534 6 / L809 5 / L903 5 / L537 2。
- 其中 **只有 L537 是真「值」**：`'Variable size output up to 3.2 meters wide, unlimited length —满足 building hoarding…'` —— en 值里混入**简体「满足」2 字**（与 §0.23.1 记录的「半截残留」同型）。**属另一批（en 值内中文清理 / K3 白名单批次），本批未动，明确列出待批。**

**2.3.3 同类残留清单（**只列不修**，交 K3 白名单批次）**

| 档 | 位置 | 形态 | 建议 |
|----|------|------|------|
| `blog-data/en.json` | **612 / 580 / 644 / 207 / 588 / 496 / 64 / 620** 等（Step 4 §8 全量档） | 整段繁中摘要 / FAQ / JSON-LD 串入 en 值 | 清理（非专有名词） |
| `blog-data/en.json` | `认证体系` ×4、`认证` ×5 | en 值内**简体** | 清理 |
| `blog-data/ja.json` | `认证体系` ×2 | ja 值内**简体** | 清理 |
| `blog-posts.ts` | L1834 en 值 `认证体系` ×2 | 同上（Step 4 §7.4 已记录） | 清理 |
| `category-seo-content.ts` | L537 en 值 `满足` 2 字 | en 值内简体 | 清理 |
| `category-seo-content.ts` | 2149/2154/809/903/1534/1851/3170/3171 | CJK **仅存在于注释** | **非缺陷**（客户不可见，门童按「值」判定，不扫注释） |
| `blog-data/{en,ja}.json` | 整段中文 | 1138 笔 en-CJK 全量 | **§3 明确排除**，K3 白名单批次 |
| `payment-methods/page.tsx` | 法人全称 / 法代姓名 | 专有名词 | 建议白名单保留（Step 4 §8 已分档） |

---

## 3. 验收实测数字（7 项，全部真值）

| # | 项 | 要求 | 实测 | 判定 |
|---|----|------|------|------|
| 1 | `npx tsc --noEmit` | 54（项目基线，Step 4 后仍 54） | **54** | ✅ |
| 2 | `node scripts/check-regression-guard.js` 汇总 | red 不得高于 0 | **🔴 0** \| 🟠 1567 \| 🟡 1088 \| ⚪ 0 | ✅ |
| 2b | 真实计数（未截断）段 | 给真实计数 | `CRED_4_PLUS_NUMBER=3775 / SOP10_4_PLUS_NUMBER=3775 / I18N_META_LENGTH=820 / CRED_ISO_9001=706 / CRED_SELF_FACTORY=260 / CRED_HEIDELBERG=237 / BRAND_LOCALE_MISMATCH=196 / I18N_CURRENCY=168 / CRED_1000_PLUS=138 / BRAND_JA_ALTERNATE=77 / BRAND_DOUBLE=51 / CRED_FSC_C123456=13 / SOP10_HEIDELBERG_6_1=7 / SOP10_24H_SLA=2 / CRED_INTL_TOP=1 / CRED_15_YEARS=1 / SOP10_INTL_TOP=1 / SOP10_15_YEARS=1`，其余 0 | ✅ |
| 3 | `node scripts/test-i18n-pollution-bidirectional.js` | 10 PASS / 0 FAIL | **10 PASS / 0 FAIL**（test 6：空跑 red==0 且 ★新增缺陷==0） | ✅ |
| 4 | 门童 #4 基线 | `基线 1448 → N−M`，**只许递减**；同步 `.hermes/i18n-pollution-baseline.json` | **基线 1448 → 1320（−128）**；实测命中 **1453 → 1325**；既有内向 red **保留 5（不变）**；★新增缺陷 **0** | ✅ |
| 5 | zh-hk 零非预期 churn | §2.1 / §2.3 不得改变 zh-hk 既有输出 | §2.1：`zh-hk === 原文` 311/311 + 1140 次取值 `≠原文 = 0`；§2.3：diff 仅在 `en:` 块内 1 处 | ✅ |
| 5b | §2.2 zh-hk 授权变更对照 | 单独列出改动前后 | 见 §2.2 表（4 条栏名，★ 标注） | ✅ |
| 6 | 生成器幂等 + 断言未过不写盘 | 二次生成 byte diff = 0；断言未过不写盘 | 幂等：`sha256(前16) f517524388b21a21 → f517524388b21a21 → f517524388b21a21`（**byte diff = 0**）；负向：故意破坏一条 `anchor` ⇒ 生成器 `exit=1` + 打印「⛔ 斷言未過 -> 不寫盤」+ 输出档 hash **前后一致**；还原后重跑 hash 回到幂等值（零残留） | ✅ |
| 7 | 编码 | 新档/改动档 UTF-8 无 BOM、LF | 17 档逐档 spot check：**全部 BOM=false / CRLF=false** | ✅ |

**4 项基线同步明细（只下调，未上调任何条目）**

| perFile | 旧 | 新 | 归因 |
|---------|----|----|------|
| `src/data/category-seo-content.ts` | 159 | **53** | §2.3 清除 en 块整条繁中 FAQ（−106） |
| `src/data/blog-data/zh-hk.json` | 50 | **28** | 见 §4「本批额外修复」②（实测命中 57→32，−22） |
| `total` | 1448 | **1320** | = Σ perFile = 非 legacy 实测（口径与 Step 4 一致：total + legacy 5 = measured） |
| `measuredTotal` | 1453 | **1325** | 同上 |
| `perRule`（同步） | JA 197 / ZH 124 / EN 1138 | JA 197 / **ZH 96** / **EN 1032** | 与 perFile 递减一致 |

---

## 4. 本批额外修复（**超出 §2 三项，主执行层可单独回滚**）

派活 §3 明确排除「en 值内中文全量 1138 笔清理」。但验收 #3 的 test 6 断言「★新增缺陷 == 0」，而**本批开工前**该计数 = **3**，来源**不是本批**：

- 定位（探针 `.hermes/_probe-pb/_step5-newdef.cjs` + `_baseline-calc.cjs`，直接驱动 `guard.scanBidirectional` + `guard.applyI18nBaseline`）：
  **`src/data/blog-data/zh-hk.json:704` 的 3 字**（`体` / `认` / `证`），全部来自同一字符串 `ISO 认证体系`。
- 归因：该档 `git status` **clean**（= 命中在 HEAD 内，本批未碰该档）；baseline 录于本日 Step 3/4 之后，**本日 05:49 blog-deepfix 提交 `d193adda`** 之后内容与本基线出现偏差 —— 属**第三方存量漂移**，与 Step 5 改动无关（Step 4 §7.4 已把「`ISO 认证体系` 简体残留」记为存量待批）。
- 处理：① 主串 `ISO 认证体系` ×7 → **`ISO 認證體系`**（同档同串**全值修复**，采 Step 4 §6 已确立口径：只改触发字会留半截简体）；② 同句半截残留 `FSC 认证 認證` → **`FSC 認證`**（去重复词，避免修复后仍留可读性破损）。共 **2 行 / 3 字 + 2 字**，无任何语义或数字改动（`git diff` 见报告末）。
- 效果：该档实测命中 57 → 32，`★新增缺陷 3 → 0` ⇒ 验收 #3 由 9/1 变 **10/0**；基线同步递减（§3 表）。

**若主执行层认为该档不属本批范围**：回滚 `src/data/blog-data/zh-hk.json` 一处（2 行）+ 把 `.hermes/i18n-pollution-baseline.json` 的 `zh-hk.json` 条目由 28 改回 50（total 1320→1342），此时验收 #3 会回到 **9 PASS / 1 FAIL（★新增缺陷 3，非本批引入）**——两者不可同时成立，须择一。

---

## 5. 改动档清单（路径 + 行数变化）

**(B) 交付物（本批新改）**

| 文件 | 变化 | 说明 |
|------|------|------|
| `src/data/product-specs-i18n.ts` | 292 → **387 行**（git `+107/−6`） | 生成档：映射 238 → **311 条** + `SPEC_FIELD_LABELS` / `localizeSpecField`（由生成器输出，**禁手改**） |
| `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx` | `+3/−2` | §2.2 栏名查表（import 1 行 + `dt` 1 行 + 注释 1 行） |
| `src/data/category-seo-content.ts` | `+3/−2` | §2.3 删 1 条繁中 FAQ（−1 值行）+ 溯源注释 3 行 |
| `.hermes/_probe-pb/gen-spec-i18n.cjs` | 149 → **187 行**（`+38`） | 生成器扩 size 栏 + 栏名映射 + 覆盖率/栏名形状断言（**同一套机制**，未新增） |
| `.hermes/_probe-pb/_dump-spec-strings-full.ts` | 44 → **86 行**（`+42`） | 权威 dump 扩 size 第 2 轮 + 冻结基准对位断言 |
| `.hermes/_probe-pb/_spec-tr-6.json` | **新增**（73 条 / 10,435 B） | size 手写三语译文源（索引 239-311） |
| `.hermes/_probe-pb/_spec-strings-full.json` | 238 → 311 条 | dump 输出 |
| `.hermes/_probe-pb/_spec-strings-full.step4-238.json` | **新增**（32,259 B） | Step 4 的 238 条冻结基准（索引不位移的证据） |
| `.hermes/i18n-pollution-baseline.json` | `+7/−6` | 基线 1448→1320（只递减）+ `step5Dec` 归因 |

**(A) 孤儿交付物 —— 本执行层 0 字节改动，待主执行层提交**

| 文件 | 状态 | 变化 |
|------|------|------|
| `src/data/print-method-policy.ts` | 未跟踪（新档） | 95 行 / 6,582 B；被下列 2 档 import |
| `src/app/[locale]/product/[slug]/page.tsx` | `M` | `+29/−3`（含 3 条 lane，见 §1.2a） |
| `src/components/category/CategoryProductCard.tsx` | `M` | `+18/−6` |

**本批探针/证据档（`.hermes/_probe-pb/`）**：`_step5-orphan-probe.ts`（(A) 事实源）、`_step5-churn-sim.ts`（(A) 1140 栏位 churn 模拟）、`_step5-size-inventory.ts`（size 73/95/0 简体）、`_step5-size-strings.json` / `_step5-size-numbered.tsv`（size 盘点）、`_step5-verify.ts`（映射+覆盖+栏名+churn 四合一自检）、`_step5-en-cjk-residue.cjs` + `_step5-en-residue.json`（§2.3 同类扫描）、`_step5-newdef.cjs` / `_step5-baseline-calc.cjs`（★新增缺陷定位与基线复算）、`_step5-gen-idempotent.cjs`（幂等 + 负向）、`_step5-encoding.cjs`（编码自检）、`_step5-guard-out2.txt`（门童原始输出）。

**非本批（工作区内既有未提交改动，本批未触碰）**：`.hermes/industry-keyword-matrix.json`、`.hermes/logs/cron-execution-report.md`、`GSC数据/index.json`、`public/sitemap*.xml`（6 档）。

---

## 6. 未达标 / 不确定项（明确列出）

1. **N1 口径不一致（既有）**：books 品类页写「1 本起訂（數碼印刷）」（覆盖 5 SKU）vs 本批数码线名单 4 SKU（缺 `saddle-stitch-booklets`）。未擅动，待 K3 一句话。治本门童 `MOQ_CLAIM_CONSISTENCY`（plan doc §五 L3）**尚未实现**。
2. **N2 卡片副行替换**：`perfect-bound-books` / `hardcover-books` 的 `anchor.sub`（含 `滿$500包郵` 促销）被 MOQ 行取代。属作者有意优先级，**非红线违反**，若要两者并存需拍板。
3. **(A) 提交粒度**：`page.tsx` 含 v10.1 1-B / weekly-meta 内链 / 404 修复 3 条 lane；本执行层受 §0 约束不 commit，粒度待定。
4. **§2.2 术语站内不一致（未修）**：legacy `ProductTabs.tsx` 用「加工工藝」/「加工」，本批 v9 PDP 用「後加工」；统一需再动一次 zh-hk/ja 输出，未擅动。
5. **`print-method-policy.ts` 内既有源串缺陷（未修）**：其作用域外，但扫 `size` 时发现 `products.ts` 有一条 size 原文自带日文片假名：`30-80mm (自訂形狀,Illustrator パス路徑入稿)`（`パス` = path 的日文）。因 **zh-hk 值 = 原文逐字（§2.1 零 churn 硬约束）**，本批**保留原样**（若改 zh-hk 值将违反「§2.1 不得改变 zh-hk 既有输出」）。⇒ 建议单独立项把 `products.ts` 的 `パス路徑` 规范为 `路徑`（属**数据源**改动，须与 zh-hk 输出变更一并拍板）。
6. **§2.3 同类待批**：`category-seo-content.ts:537` en 值内简体「满足」2 字；`blog-data/en.json` 整段中文 8 行 + `认证体系` ×4、`ja.json` ×2、`blog-posts.ts` L1834 ×2 —— 全部列出未修（§3 排除项 / K3 白名单批次）。
7. **同批提交 77ee701c 的旁注**（非本批、已提交）：`products.ts` features 4 处 `【50本起訂】`→`【1本起訂】`，与数码线 4 SKU 名单一致；`minQuantity` 未改（红线 ④ 成立）。另 `blog-data/zh-hk.json` 该篇正文存在**多处疑似数字剥离残留**（如 `7 , 30 秒`、`累計 全球客戶`、`高達成率 達成率`），与本批无关，建议归入内容质检批次。
8. **§2.2 未做端到端 SSR 渲染验证**：受限（本批不 build/push），证据为**数据层真跑 + 渲染调用点逐行核对**（`ProductPageV9.tsx:600-601` / `ProductTabs.tsx:174-192`）；如需像素级确认，须 build + 线上 curl（属主执行层后续步骤）。

---

## 7. 数据来源（§0.23 强制）

```
数据来源:
- K3 拍板原文: docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md (2026-09-18 19:10 签发, 决策 1 终裁 B 的 ①-④ 红线)
             + docs/2026-09-18-moq-unified-statement-and-enhancement-plan.md (§4 文案候选 / §4.3 三处锚点 / §五 L0-L4)
- 派活规格: .hermes/logs/step4-specs-i18n-report-2026-09-19.md (Step 4 机制与口径, 含 §3 规模修正 / §6 全值修复先例 / §7 挂账 / §8 en-CJK 全量)
- 仓内实测 (2026-09-19 本机): npx tsx .hermes/_probe-pb/_step5-*.ts (真跑 src/data/products 95 SKU / 380 栏位) /
             node .hermes/_probe-pb/_step5-*.cjs (gen 幂等与负向 / 编码 / 基线复算 / 门童裸扫) /
             npx tsc --noEmit = 54 / node scripts/check-regression-guard.js / node scripts/test-i18n-pollution-bidirectional.js = 10 PASS 0 FAIL
- 门童字集 (不另立): scripts/guards/i18n-guard.js (SIMP_ZH 866 字 / SIMP_JA 791 字 / BIDIRECTIONAL_RULES)
- git 证据: 77ee701c (daily-content 21:24, 只含 docs+scripts+products.ts) / 249e2b92 (weekly-meta 23:13, 只含 src/lib/seo.ts)
             / d193adda (blog-deepfix 05:49) / 工作区 `git diff` 逐行
- 基线档: .hermes/i18n-pollution-baseline.json (Step 3 录, Step 4 递减, 本次 Step 5 递减 −128)
```
