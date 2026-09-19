# §7 七段交付报告 — Etsy 卖家印刷指南（en 单语）· 2026-09-19

> **执行层**: deepseek hermes ｜ **工作目录**: `F:\zprintpro-nextjs`（main）
> **交付**: `dc13b23b`（入库）+ `7c0c1b7e`（注册）｜ **远端**: `bc8ea014`（含本批）
> **K3 裁决依据**: Etsy 三项终裁（en 单语 / 聚焦 4 痛点 / 客服话术卡暂缓）+「维持 From 10 pieces，不退回 From 1 copy」

---

## §7.1 交付物（Deliverables）

| # | 交付物 | 路径 | 说明 |
|---|---|---|---|
| 1 | **Etsy 篇正文（en 单语）** | `src/data/blog-data/en.json` → `etsy-seller-printing-guide` | 10,902 字符；H1 ×1 / H2 ×7 / FAQ 段 / 10 内链 / 作者与数据来源行；**非 ASCII = 0** |
| 2 | **BlogPostMeta 注册** | `src/data/blog-posts.ts`（+31/−4 行）| `lpEtsySellerPrintingGuide`，`categoryKey: 'printing'`，`source: 'daily'`，三语 title/excerpt |
| 3 | 措辞卡定稿 | `.hermes/logs/2026-09-19-etsy-wording-card.md` | 两项终裁已落卡 + §6 复制警告 |
| 4 | 写作要件 | `.hermes/_probe-pb/etsy-article-requirements.md` | 标题/描述/骨架/内链（口径全部经核实）|
| 5 | 起订量权威基线工具 | `.hermes/_probe-pb/_moq-authority.cjs` | 99 SKU 全量扫描 `products.ts` |
| 6 | 事实来源预核工具 | `.hermes/_probe-pb/etsy-fact-check.cjs` | 16 项断言，拦下 2 项 |
| 7 | 线上验收探针 | `.hermes/_probe-pb/etsy-live-verify.cjs` | 6 组判据（含 INVALID 分离，per 技术债 9）|

---

## §7.2 关键口径（Values）

| 项 | 值 | 来源 |
|---|---|---|
| 标题 | `Etsy Printing: 10-Piece Min, Free Proof \| ZprintPro` | **51 半角**（写满区 50-54）· 品牌末尾一次 |
| meta description | 154 字符 | 目标 150-160 ✅ |
| **起订口径** | **`From 10 pieces`**（100 件起单价明显下降）| `PAPER_GOODS_MOQ_AEO.en`（已上线）+ `products.ts` 真值 |
| 篇目总数 | 92 → **93** | `en.json` |
| 内链 | **10 条**，全部经真实 slug 反查核实 | `en.json` 键名 |

---

## §7.3 验收证据（Evidence）

| 检查 | 命令 / 探针 | 结果 |
|---|---|---|
| 门禁 `--commit`（pre-commit 同口径）| `node scripts/check-regression-guard.js --commit` | **🔴 0**（仅 shadow 预警，来自并发会话档）|
| tsc | `npx tsc --noEmit` | **54 = 54**（基线持平）|
| 编码 | 直读字节 | 无 BOM / 无 mojibake / **非 ASCII = 0** |
| 门童 #15 blog-data | `node scripts/guards/blog-data-integrity-guard.js` | 三语严格校验**全过** |
| 门童 #16 / #18 / #20 | 同上 | GSC 泄漏 **0** / 承诺口径 **0** / 未注册 meta **0** |
| 内容红线（7 类）| `etsy-article-write.cjs` 断言 | 竞品名 0 · 量级数字 0 · 倍数 0 · 绝对化 0 · 内部定价 0 · GSC 黑话 0 |
| **本地渲染（注册后）** | `_etsy-local-render-check.cjs` | `<title>`/`<h1>`/`og:title` 正确 · meta 154 字符 · **未退化为 slug** · blog 列表已含该篇 |
| **线上验收** | `etsy-live-verify.cjs`（后台 `pwsh-63`）| 见 §7.6 |

---

## §7.4 过程中发现并纠正的问题（Findings & Fixes）

### ① 起订口径过期（**影响第一卖点**）
- **用户确认表原写** `From 1 copy`（1-B 时代表述）；
- **实测站上已过期**：`PAPER_GOODS_MOQ_AEO.en`（k3 第三波，已上线）= `From 10 pieces … From 100 pieces the unit price drops clearly`；`products.ts` 真值：贴纸 8 款 / 贺卡 6 款 / 传单 7 款 = **10**；
- `print-method-policy.ts` 自述「1 本已与 minQuantity=10 **矛盾**，必须同步」；
- **处置**：按线上一致改为 `From 10 pieces`；**K3 已裁决维持**（不退回，理由：退回会重犯「展示层与数据层矛盾」）。

### ② 未注册 ⇒ title/h1 退化 slug（**会导致线上缺陷，验收清单漏项**）
- 仅写 `en.json` 时，`/en/blog/` **列表不含该篇**；根因 = 新篇必须在 `blog-posts.ts` 注册 `BlogPostMeta`（全站 92 篇均已注册）；
- 后果（文件内 2026-09-18 先例注释明载）：`getBlogPostMetaBySlug()` 返 `undefined` ⇒ `<title>`/`<h1>` 退化成 slug + 无 meta description；
- **处置**：注册 `lpEtsySellerPrintingGuide`；**注册前后本地实测对比**证实修复。

### ③ 断言拦下 2 处（写作期）
- 标题 **57 → 51**（超 54 上限）；
- 正文 `cheapest` → `lowest-cost`（撞绝对化红线）。

### ④ 协议第 2 条再次救命（连续第 3 次）
提交前清点发现暂存区混入**并发会话 6 档**（`moq-price-sync-action-list-v3.*` / `scripts/moq10-*` / `print-method-policy.ts`），该批命中 **🔴 50**（`智印港` 跨语系混用，`BRAND_LOCALE_MISMATCH`）。按 5 步协议剔除后 **🔴 0**。**零污染。**

---

## §7.5 风险与挂账（Risks & Carry-over）

| # | 项 | 状态 | 处置 |
|---|---|---|---|
| 1 | **术语复核清单待转发** | ⏳ **你侧唯一必须动作** | 60 条/8 族，装订族为 FAMILY 1（须整族一次批）|
| 2 | §0.0 名片 6 字 | ⏳ 挂账 | 待 (a)/(b)/(c) 裁决 |
| 3 | ja 剩余 9 字 | ⏳ 已批准 | 并入下一批（不单独成波）|
| 4 | Etsy 篇 **ja/zh-hk 后置** | ✅ 按裁决 | 正文 en 单语；BlogPostMeta 三语齐备（接口要求），ja/zh-hk 页会回退显示英文 body —— **后续补译时须同步** |
| 5 | 客服话术卡 | ✅ 暂缓但预留 | Etsy 篇上线后按实际询盘反馈再定 |

---

## §7.6 线上验收（Live Acceptance）

**探针**: `.hermes/_probe-pb/etsy-live-verify.cjs`（后台任务 `pwsh-63`，等 CF 部署 PASS → 传播 60s → 跑）
**判据 6 组**：
1. 文章 URL **HTTP 200**（非 200 报 `INVALID`，**不计入内容失败** —— per 技术债 9）
2. **旧/红线串必须消失**：`From 1 copy` / `cheapest` / `Alibaba` / `Sticker Mule` / `Vistaprint` / `500-piece minimum order`
3. **新串必须存在**（10 项）：标题 / `From 10 pieces` / `no 500-piece minimum` / `free digital proof` / `DHL` / `2-4 day` / `FDA 21 CFR 175.105` / `EU REACH` / `available on request` / `30-second`
4. H1 存在
5. **8 条内链各 200**
6. **blog 列表含该篇**（注册生效的线上确证）

**本轮本地等效验证已过**（§7.3 本地渲染行）；线上结果见 `.hermes/logs/2026-09-19-etsy-live-verify.log`。

---

## §7.7 下一步（Next）

| 序 | 动作 | 责任 | 前置 |
|---|---|---|---|
| 1 | 读线上验收日志、确认 PASS | 执行层 | `pwsh-63` 完成 |
| 2 | **转发术语复核清单**给英/日母语者 | **你** | — |
| 3 | §0.0 名片 6 字裁决 | **你** | — |
| 4 | ja 剩余 9 字（并入下一批）| 执行层 | — |
| 5 | Etsy 篇 ja/zh-hk 补译（若需要）| 执行层 | 你确认 |
| 6 | 客服话术卡 | 执行层 | Etsy 篇上线后按询盘反馈 |

---

**数据来源**: 本报告全部数字来自 `products.ts`（99 SKU minQuantity 扫描）、`print-method-policy.ts`（MOQ 口径常量）、`blog-posts.ts`（注册计数）、`en.json`（篇目与字段长度）、门禁与探针实测输出；无估算、无推断数字。
