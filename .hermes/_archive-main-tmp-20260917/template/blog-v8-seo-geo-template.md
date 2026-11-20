# Blog v8 SEO+GEO 排版模板 (2026-08-05 K3 拍板 · 源: cosmetics v8 3 locale)

> **基线**: cosmetics-packaging-box-printing-guide 8/5 v8 重写 3 locale 实际渲染 (`zprintpro.com/{zh-hk,en,ja}/blog/cosmetics-packaging-box-printing-guide/`)
> **拍板**: K3 8/5 17:11 截图"以这条 Blog 文章为标准, 给到排版格式和要求, 执行排版修复"
> **目标**: 68 篇 blog 全部按本模板升级排版 + 后续 daily cron 新写 blog 自动套用

---

## 一、9 段固定结构 (3 locale 通用)

> 段编号风格按 locale 区分:
> - zh-hk: 中文序号 `一、二、三...` (8 段必填)
> - en: 阿拉伯序号 `1. 2. 3...` (8 段必填)
> - ja: 阿拉伯序号 `1. 2. 3...` + 日文标题 (8 段必填)

| # | 段名 | 必含元素 | 备注 |
|---|------|---------|------|
| **0** | **TL;DR / 重點摘要 / 要約** | 1 个蓝字 (text-[#1A56DB] font-medium mb-4) + 120-200 字摘要 | ❌ 不写 `TL;DR` 英文缩写 zh-hk/ja (4 英文字符 ≈ 2 个汉字宽度, 视觉突兀) |
| **1** | 引子 / Why (主题重要性) | 1 段 + 1 黄底 callout box (bg-#FFF8E6 border-l-4 border-#F59E0B) 含关键数据洞察 | 黄 callout 必须 1 个 (内有数字 68% / 72% / 48% 等具体数据) |
| **2** | 2026 市场概況 | 1 段 + 1 个 table (≥ 4 行 细分市场/规模/场景) | table 必须 1 个 + 有真实数据 |
| **3** | 3 大主结构对比 (盒型/工艺/材质 3 大类) | 1 段 + 3 个 H3 + 1 个 table | H3 数字编号 3.1 / 3.2 / 3.3 (zh-hk 习惯) |
| **4** | 材质/工艺 详细对比 | 1 段 + 1 个 table (≥ 4 行 材质/硬度/单价/场景) | table 必含真实价格区间 + 推荐场景 |
| **5** | 5 大行业应用场景 | 1 段 + 1 个 UL/LI (5 项, 1 行 1 场景 + 价格) | 5 个 li 严格, 每条含 MOQ + 单价 |
| **6** | 跨境/特殊场景 5 大要点 | 1 段 + 1 个 OL/LI (5 项, 序号列表) | 用 OL 不用 UL, 体现顺序性 |
| **7** | 采购决策 / MOQ | 1-2 段 | 必含 "50/100/500/1000/10000" 真实 MOQ 数字 |
| **8** | 4 大 FAQ (3 locale 4 个 H3, Q+A 格式) | 4 个 H3 + 每 H3 下面 1-2 段 A | 4 个 H3 严格, 跟作者 KOL 角色匹配 (护肤品牌/餐厅/教育/...) |
| **CTA** | 蓝色 CTA box (bg-#E0F2FE border-l-4 border-#1A56DB) | 1 段 + H3 标题 + 4 个 UL/LI (3 SKU 内链 + 1 报价入口) | 4 个 li 严格, 必须 3 SKU + 1 quote |
| **Author Bio** | 作者团队介绍 | 1 段 (团队名 + 经验年数 + 客户数) | "15+ 年印刷经验 + 服务 100+ 国家 15,000+ 客户" 模板, 改行业后保留 |
| **资料来源** | 真实可信数据源 | 1 段 (≥ 3 个来源) | 行业报告 / FDA / FSC / ISO / 协会数据 |
| **免责声明** | 法律合规 | 1 段 (价格仅参考 + 实测为准) | 必须含, 保护法律风险 |

**总段数**: 8 H2 + 8 H3 (3.1-3.3 + 4 个 FAQ) + 2 table + 1 黄 callout + 1 蓝 CTA + 3 底部块 (Author/Sources/Disclaimer)

**3 locale H3 数字格式差异**:
- zh-hk: `3.1 天地盒（Top & Bottom Box）— 預算優先` (中文数字 + 英文括号)
- en: `3.1 Lid-base Box (Top & Bottom) — Budget Priority` (纯英文)
- ja: `3.1 天地蓋箱（Top & Bottom Box）— 予算優先` (日文 + 英文括号, 类似 zh-hk)

---

## 二、3 Locale 排版规范

### 2.1 TL;DR 字符本地化 (K3 8/5 17:11 拍板)

| Locale | TL;DR 字符 | 视觉宽度 | 备注 |
|--------|------------|----------|------|
| zh-hk | **重點摘要：** | 4 汉字 (匹配正文) | 不用 `TL;DR` (4 英文字符 ≈ 2 汉字宽度, 视觉突兀) |
| en | **TL;DR:** | 4 英文字符 | 英语博客习惯, 保留 |
| ja | **要約：** | 2 汉字 + 1 字符 | 不用 `TL;DR`, 日语 摘要 = 要約 |

### 2.2 段编号风格

| Locale | H2 编号 | H3 编号 | 标点 |
|--------|---------|---------|------|
| zh-hk | `一、二、三...` | `3.1 3.2 3.3` | 中文 `、`, 段落 `？` 句号 |
| en | `1. 2. 3...` | `3.1 3.2 3.3` | 阿拉伯 `1.` + 段落 `?` 句号 `.` |
| ja | `1. 2. 3...` | `3.1 3.2 3.3` | 阿拉伯 `1.` + 段落 `？` 句号 `。` |

### 2.3 颜色 + 排版 token (Tailwind 复用, 跨 locale 一致)

| 元素 | Tailwind class | 用途 |
|------|----------------|------|
| **TL;DR** | `p class="text-base text-[#1A56DB] font-medium mb-4"` | 蓝字摘要, 在 H1 后第一段 |
| **黄 Callout** | `p class="bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-4 my-4"` | 关键洞察 + 数据, 段 1 末尾 |
| **H2** | `h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4"` | 8 段大标题 |
| **H3** | `h3 class="text-xl font-bold text-[#333333] mt-6 mb-3"` 或 `text-lg mt-4 mb-2` (FAQ 用) | 3.1-3.3 + 4 FAQ |
| **Table** | `table class="w-full text-sm border-collapse my-6"` | 段 2 (市场) + 段 4 (材质) |
| **Table head** | `thead tr class="bg-gray-100" th class="border p-3 text-left"` | 4 列起 |
| **Table body** | `tbody tr td class="border p-3"` | 每行 4-7 列 |
| **UL/OL** | `ul class="list-disc pl-5 my-3 space-y-2"` 或 `ol class="list-decimal ..."` | 段 5 (5 场景) + 段 6 (5 要点) |
| **蓝 CTA box** | `div class="bg-[#E0F2FE] border-l-4 border-[#1A56DB] p-5 my-6"` | 末尾 SKU 内链 |
| **CTA H3** | `h3 class="text-lg font-bold text-[#1A56DB] mb-3"` | CTA box 内标题 |
| **Author 块** | `div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200"` | 末尾底部块 |
| **strong** | `strong` | 内联强调 |

---

## 三、SEO + GEO 9 项硬规范 (K3 8/4 11:36 拍板)

> §13.4 3 locale 铁律: zh-hk 香港场景, en 全球 sharp hook, ja 日本市场
> §13.10 NAP 脱钩: zh-hk 写香港场景, en/ja 隐藏 supplier origin
> §13.13 3 locale 强本地化

### 3.1 SEO 基础 (5 项)
1. **H1** 唯一含主关键词 (zh-hk 50-60 字 / en 60-80 字 / ja 60-80 字)
2. **Meta description** 150-160 字含数字 + CTA
3. **URL slug** 含主关键词 (lowercase, hyphens, no stop words)
4. **Canonical** self-referencing, hreflang 3 locale 完整
5. **Schema** Article + BreadcrumbList + FAQPage (4 FAQ 自动生成)

### 3.2 GEO 增强 (3 项)
1. **Author Bio** 团队名 + 经验年数 + 客户数 (15+ 年 + 100+ 国家 + 15,000+ 客户 模板)
2. **ISO 标准引用** 行业相关 (FDA 21 CFR / FSC / ISO 9001 / GMP 等)
3. **实体全称+别名** Corrugated Fiberboard=cardboard=坑紙=段ボール (e.g.)

### 3.3 Anti-AI-Slop 8 项 (K3 11:36 拍板)
1. **事实密度**: 300 字/事实 (具体数据点 ≥ 1/300 字)
2. **第一手经验**: 团队经验 + 客户案例 (不是网上拼凑)
3. **SKU 锚定**: ≥ 2 真实产品页内链 (cosmetics 模板: 18 unique SKU / 39 total link)
4. **3 层问答**: 1) 段 8 FAQ H3 Q/A  2) 段 1 黄 callout 数据  3) Schema FAQPage JSON-LD
5. **反共识**: 不抄通用答案, 给具体场景 (e.g. "磁吸盒同天地盒點揀?" 给 MOQ + 价格决策)
6. **多语言原生**: 3 locale 独立本地化, 不机械翻译
7. **Schema 全字段**: Article + BreadcrumbList + FAQPage + SpeakableSpecification
8. **时效**: 含 2026 真实数据, 标日期

---

## 四、长度基准 (K3 11:36 拍板)

| 类型 | zh-hk 字数 | en 词数 | ja 文字数 |
|------|-----------|---------|----------|
| **Pillar** (旗舰 Pillar Page) | 3000-5000 | 1500-2500 | 1500-2500 |
| **Cluster** (品类深入) | 1500-2500 | 800-1500 | 800-1500 |
| **Case** (场景应用) | 1000-1800 | 500-1000 | 500-1000 |
| **News** (新闻) | 600-1000 | 300-600 | 300-600 |

**cosmetics v8 实际长度** (1 篇 Case 案例, 不是 Pillar):
- zh-hk: 8085 chars
- en: 12683 chars
- ja: 8931 chars

→ 适合 1000-1800 字 Case 基准, 适合 v8 标准应用.

---

## 五、Anti-pattern 清单 (K3 拍板禁用)

| ❌ 禁止 | ✅ 改用 |
|---------|---------|
| 标题硬塞 supplier origin (`Shenzhen Printing`, `深圳印刷`, `深セン`) | 隐藏 supplier origin, 用 顺豐本地 / DHL 全球 2-4 天 / Asia factory |
| 机械翻译污染 (zh-hk 直接机翻 en/ja 上线) | 3 locale 独立本地化, target market 驱动 |
| en 标题带 `in Hong Kong` / `香港` 残留 | 改 US/UK/AU 通用词 (size/paper/design/material) |
| zh-hk 输出简体字 | 全繁体 (跑 `node scripts/scan-simplified.mjs` 验证 0 简体) |
| 单引号/双引号错配 (`'zh-hk': "...`, closing 缺) | 跑 `npm run build` 验证 syntax |
| 段 8 末尾 `v8 SEO+GEO 重寫` 内部 process 备注 | 不暴露 process, 只保留 "Last Updated: 2026-08-05" |

---

## 六、SKU 内链策略 (cosmetics 模板: 18 unique / 39 total)

| 段 | 内链数量 | 类型 |
|----|----------|------|
| 段 5 (5 大场景) | 5 | 1 行业对应 1 SKU |
| 段 7 (MOQ) | 3 | 跨价位 SKU |
| 段 CTA box | 3-4 | 主推 SKU + 报价入口 |
| Related Products (page.tsx 自动) | 4 | 同类目 top 4 |
| **总计** | **18 unique / 39 total** | 1 篇 Case 案例约 18-25 unique SKU |

→ 1 篇 Pillar Page 约 30-50 unique SKU (按品类扩展)

---

## 七、修改当前 68 篇 blog 应用规则

### 7.1 应用范围
- **现有 68 篇 blog** (含 buying-guides 9 + articles 60+ + clusters)
- **跳过**: 已是 v8 模板的 (目前 1 篇: cosmetics)

### 7.2 排期 (3 阶段)

| 阶段 | 排期 | 范围 | 风险 |
|------|------|------|------|
| **A. 5 Pillar 候选** | 8/3-8/5 | 5 篇产品类目顶级 Pillar (e.g. packaging / paper-bags / stickers / flyers / posters) | 中 (5 篇大改) |
| **B. 1 篇 Pillar 试水** | 8/6 (本日) | cosmetics (✅ 已完) | 低 |
| **C. 7 Pillar 补完** | 8/7-8/9 | 6 篇类目 Pillar (menus / books / banners / red-packets / calendars / wedding-envelope) | 中 |
| **D. 60+ Cluster / Case 优化** | 8/10-8/30 | 60+ 篇按 daily cron 2-3 篇/天 + weekly meta refresh | 低 |

**commit / push**:
- 每阶段 1 commit 1 push (K3 拍板 1 push/天 §0.6)
- v8 模板应用 1 篇约 +5000-8000 chars 改 (zh-hk), 跨 3 locale +20000 chars
- 1 commit 6 files (3 locale JSON + page.tsx 调 + 1 verification 报告)

---

## 八、自进化 skills 集成

### 8.1 写入 daily-content-1x7w.md cron prompt

```diff
+ ## 2026-08-05 v8.1 升级: 引用 Blog v8 模板 (K3 拍板)
+ - 新写 blog 必读 .hermes/template/blog-v8-seo-geo-template.md
+ - 9 段结构 + 2 table + 1 黄 callout + 1 蓝 CTA + Author Bio + Sources + Disclaimer
+ - TL;DR 字符: zh-hk 重點摘要 / en TL;DR / ja 要約
+ - 长度基准: Pillar 3000-5000 / Cluster 1500-2500 / Case 1000-1800 / News 600-1000
+ - 跨 locale 编号: zh-hk 一/二/三 / en 1.2.3. / ja 1.2.3.
+ - SKU 内链: 18+ unique per Case, 30+ per Pillar
+ - 禁止: TL;DR/zh-hk + 简体字 + supplier origin 硬塞 + v8 process 备注
+ - verify 必跑: node scripts/scan-simplified.mjs (zh-hk) + npm run build (syntax)
```

### 8.2 写入 gsc-feedback-loop.md cron prompt

```diff
+ ## 8 月 SEO 优先: v8 模板应用 GSC 数据
+ - GSC 反馈: 缺 v8 模板的 68 篇 blog 优先排期 (按 impression × CTR gap 排序)
+ - matrix.audit 8/6 加新字段: v8_template_applied (true/false)
+ - daily cron 写新 blog 必套 v8 模板 (自进化)
```

---

## 九、Apply 到 68 篇 blog 的 5 步流水线

1. **审计** (8/3-8/4): 标不符合 v8 的 68 篇 + 优化优先级列表
2. **试水** (8/5): cosmetics 1 篇 v8 升级 (✅ 已完 commit 56f254c + c22d626)
3. **补完 Pillar** (8/6-8/9): 6 篇类目 Pillar 按 v8 重写
4. **Cluster 优化** (8/10-8/16): 30 篇 Case/Cluster 按 v8 升级
5. **News 优化** (8/17-8/30): 31 篇 News 短文按 v8 升级

**每 1 篇 v8 升级流程**:
- 读源 JSON 3 locale
- 写 v8.1 Python 脚本 (3 locale + 9 段 + table + callout + CTA + author + sources + disclaimer)
- 跑 `node scripts/scan-simplified.mjs` (zh-hk 0 简体)
- 跑 `npm run build` (syntax PASS)
- 跑 1 commit 1 push + R6 step 0 check-runs
- 跑 5 步 verify (push ahead / sitemap / curl 200 / schema / IndexNow)
- 写 K3 inbox 报告 +1 markdown

---

## 十、视觉 / 排版 token 详细 (K3 8/6 2:20 拍板补)

> **触发**: K3 看 cosmetics v8 截图说"排得非常整洁、大方、段落间的距离和行距等都的非常好, 修复旧 blog 文章也要学这些"。

### 10.1 字号 + 行高 token (cosmetics 8/5 实际渲染)

| 元素 | Tailwind class | 字号 | 行高 | 颜色 | 用途 |
|------|----------------|-----|------|------|------|
| **H1** | `text-3xl md:text-4xl font-bold text-[#222222]` | 30/36 px | 1.2 (36/30 → 1.2 line-height) | #222222 | 顶部主标题, 唯一 |
| **重點摘要** | `text-base text-[#1A56DB] font-medium mb-4` | 16 px | 1.6 | #1A56DB 蓝 | 段 0, H1 后第一段 |
| **H2** | `text-2xl font-bold text-[#333333] mt-10 mb-4` | 24 px | 1.3 | #333333 | 8 段大标题, 段间距 mt-10 (40px) |
| **H3** | `text-xl font-bold text-[#333333] mt-6 mb-3` | 20 px | 1.3 | #333333 | 3.1-3.3 段 3 子标题, mt-6 (24px) |
| **H3 (FAQ)** | `text-lg font-bold text-[#333333] mt-4 mb-2` | 18 px | 1.3 | #333333 | 段 8 FAQ Q1-Q4, mt-4 mb-2 |
| **段落 p** | `text-base text-[#444] leading-relaxed mb-4` | 16 px | 1.7 (relaxed) | #444 | 正文, 段落 ≤ 4 行 (移动端 ≤ 3 行) |
| **黄 callout** | `bg-[#FFF8E6] border-l-4 border-[#F59E0B] p-4 my-4` | 16 px | 1.6 | 底 #FFF8E6 / 边 #F59E0B | 段 1 末尾关键数据 |
| **蓝 CTA** | `bg-[#E0F2FE] border-l-4 border-[#1A56DB] p-5 my-6` | 16 px | 1.6 | 底 #E0F2FE / 边 #1A56DB | 末尾 SKU 内链 + 报价 |
| **CTA H3** | `text-lg font-bold text-[#1A56DB] mb-3` | 18 px | 1.3 | #1A56DB 蓝 | CTA box 内标题 |
| **Table** | `w-full text-sm border-collapse my-6` | 14 px | 1.5 | — | 段 2 + 段 4 表格 |
| **Table head** | `bg-gray-100 p-3 text-left border` | 14 px | 1.5 | #F3F4F6 灰底 | 4 列起 |
| **UL/OL** | `list-disc list-inside pl-5 my-3 space-y-2` (UL) / `list-decimal` (OL) | 16 px | 1.6 | — | 段 5 + 段 6 |
| **Author 块** | `text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200` | 14 px | 1.6 | #6B7280 灰 | 末尾 3 块 (Author/Sources/Disclaimer) |

### 10.2 间距规则 (cosmetics 8/5 实际)

| 元素 | 上间距 | 下间距 | 备注 |
|------|-------|-------|------|
| H1 → 摘要 | 0 | 16 px (mb-4) | — |
| 摘要 → H2 (一) | 0 | 40 px (H2 的 mb-4) | — |
| H2 → 段落 | 0 (H2 mt-10 算入) | 16 px (mb-4) | — |
| 段落 → H3 | 16 px (段落 mb-4) | 24 px (H3 mt-6 + mb-3) | — |
| 段落 → 黄 callout | 16 px | 16 px (my-4) | — |
| H3 → 段落 | 0 (H3 mt-6 算入) | 16 px | — |
| 段落 → 蓝 CTA | 16 px | 24 px (my-6) | — |
| 蓝 CTA → Author | 24 px | 16 px (Author mt-8 pt-4 border-t) | border-t 分隔 |

### 10.3 移动端适配 (Tailwind responsive)

| 元素 | mobile (<768px) | desktop (≥768px) |
|------|----------------|------------------|
| H1 | `text-3xl` (30 px) | `md:text-4xl` (36 px) |
| H2 | `text-2xl` (24 px) | `md:text-3xl` (30 px) |
| 段落 | 段落 ≤ 3 行 | 段落 ≤ 4 行 |
| Table | 横向滚动 (`overflow-x-auto`) | 正常显示 |
| 蓝 CTA | 全宽 | max-w-4xl 居中 |

### 10.4 必含元素清单 (K3 8/6 2:20 截图确认)
- ✅ **大 H1** (text-3xl font-bold)
- ✅ **重點摘要** (蓝字第一段, text-[#1A56DB])
- ✅ **H2 间距** (mt-10 mb-4, 段间 40 px)
- ✅ **段落 ≤ 4 行** (text-base leading-relaxed)
- ✅ **黄 callout** (关键洞察, bg-[#FFF8E6] border-l-4)
- ✅ **Table** (border-collapse, 4 列起, 真实数据)
- ✅ **3 H3 子标题** (3.1/3.2/3.3, mt-6 mb-3)
- ✅ **4 FAQ H3** (Q1-Q4, mt-4 mb-2)
- ✅ **蓝 CTA box** (开始印你的... / 3 SKU + 1 quote)
- ✅ **Author Bio** (15+ 年 + 100+ 国家 + 15,000+ 客户)
- ✅ **资料来源** (≥3 来源, 行业报告 / FDA / FSC / ISO)
- ✅ **免责声明** (价格仅参考 + 实测为准)

---

## 十一、Retrofit 模式 (vs 新写模式, K3 8/6 2:20 拍板补)

> **触发**: K3 看 cosmetics v8 截图说"修复旧 blog 文章和新写的 blog 文章, 这些也是要学会的, 不单单是结构"。

### 11.1 Retrofit vs 新写 区别

| 维度 | 新写 (8/6-8/12 60 篇) | Retrofit (8/6-8/30 61 篇) |
|------|----------------------|--------------------------|
| **范围** | 新题材 (8 周 60 篇 Pillar/Cluster/Case/News) | 现有 61 篇 blog 升级排版 |
| **字数** | 从 0 写到 1500-5000 字 | 现有 2200-5400 字 + 2000-3000 字 (补 9 段结构) |
| **耗时** | 90 min/篇 (写 + verify) | 60 min/篇 (改造 + verify) |
| **commit** | 1 commit 1 push (新文件) | 1 commit 1 push (3 locale JSON + 兜底) |
| **风险** | 中 (新内容 SEO 效应未知) | 低 (现有 URL 已索引, 改造不改 slug) |
| **推 quota** | 1 push/天 (1 篇/天) | 1 push/天 (1 篇/天) → 合并 1 push/天 |

### 11.2 Retrofit 4 步流水线 (与新写共享 9 段模板)

1. **审计** (audit_v8.py): 标 < 12/15 篇, 列出缺哪几项
2. **diff 改造** (不重写, 只补结构):
   - 在 H1 后插 段 0 重點摘要
   - 在 段 1 末尾插 黄 callout (提取现有数字/洞察)
   - 段 2 表格化 (现有数据转 table)
   - 段 3 加 3 H3 (3.1/3.2/3.3 命名规则, 现有段落重新归类)
   - 段 4 表格化 (材质/工艺 现有数据)
   - 段 5 加 UL/LI 5 项 (从现有段落提取 5 场景)
   - 段 6 加 OL/LI 5 项 (从现有段落提取 5 要点)
   - 段 7 采购决策 (现有 MOQ/价格 数据)
   - 段 8 加 4 FAQ (从现有段落提取 Q/A, 缺则新写)
   - 末尾加 蓝 CTA box + Author + Sources + Disclaimer
3. **Tailwind class 应用** (按 §10 token):
   - H1/H2/H3/段落 字号 + 颜色 + 间距
   - 黄 callout + 蓝 CTA box class
   - Table / UL / OL class
4. **verify 6 步**:
   - `node scripts/scan-simplified.mjs` (zh-hk 0 简体)
   - `npm run build` (syntax PASS)
   - 1 commit 1 push + R6 step 0 (check-runs.conclusion=success)
   - 5 步 verify (push ahead / sitemap mtime / curl 200 / schema / IndexNow)
   - live spot check: 1 URL × 3 locale = 3 URL HTTP 200 + 9 段结构 + Tailwind class 抽样
   - 写 K3 inbox 报告 (含 diff summary)

### 11.3 Retrofit 必保留

- **slug 不改** (URL 路径不变, 已有 SEO 权重保留)
- **主关键词不改** (改前后 H1/H2 主关键词一致, 避免标题党)
- **产品锚定不改** (现有内链 SKU 保留, 只补新 SKU)
- **NAP 不改** (法务真实地址保留, 不要改 §13.10 脱钩)

### 11.4 Retrofit 风险控制

- **不破坏现有 GSC 索引**: slug/H1/canonical 不动, 只改内容 body
- **不引入新错误**: npm run build + live verify 必跑
- **不破坏现有 schema**: Article + BreadcrumbList 保留, FAQPage 可加 (4 FAQ 必含)
- **不破坏现有内链**: 现有内链保留, 新内链只补

---

## 十二、61 篇 retrofit 排期 (K3 8/6 2:20 拍板)

> **基线**: audit 8/6 2:20 完成, 62 篇中 1 篇 v8_ready (cosmetics) + 6 篇 partial + 55 篇 old_format

### 12.1 排期总览 (8/6-8/30, 25 天 ÷ 61 篇 = 2.4 篇/天, 1 push/天 = 1-2 篇/push)

| 阶段 | 日期 | 范围 | 篇数 | 累计 |
|------|-----|------|-----|-----|
| **A. partial 补完** | 8/6-8/12 | 6 篇 partial (8-11/15) → 100% v8_ready | 6 | 6/61 |
| **B. P0/P1 优先** | 8/13-8/19 | 25 篇 old_format 优先 (P0 主推类目) | 25 | 31/61 |
| **C. P1/P2 补完** | 8/20-8/26 | 20 篇 old_format (P1/P2 类目) | 20 | 51/61 |
| **D. News / 长尾** | 8/27-8/30 | 10 篇 News / 长尾 (P2 类目) | 10 | 61/61 (100%) |
| **8/30 验收** | — | 62/62 篇 v8_ready (100% 合规) | — | ✅ |

### 12.2 优先级评分 (GSC imps × CTR gap 排序, 高分优先)

| Score | 维度 | 权重 |
|-------|-----|-----|
| GSC 7d imps | 流量基数 | ×3 |
| CTR gap (目标 5% - 当前 CTR) | 提升空间 | ×5 |
| 关键词排名 (pos < 30) | 排名优势 | ×2 |
| v8 评分差 (15 - 当前分) | 改造空间 | ×1 |

### 12.3 daily cron 双任务 (v8.2)

| 时间 | 任务 | 类型 | 1 commit 1 push |
|------|-----|------|----------------|
| 10:15 daily cron 早跑 | 1 篇新写 (按 8 周 60 篇排期) | Pillar/Cluster/Case/News | — |
| 10:15 同 push | 1 篇 retrofit (按 61 篇优先级) | partial/old_format | 1 push |
| **合计** | **2 篇/天** | **1 push/天** | 1 push |

### 12.4 push quota 测算

- **8/6-8/30 (25 天) × 1 push/天 = 25 push**
- **月度 23/500 + 25/500 = 48/500 (9.6%)** — 安全
- **8/6 今日 3 push 已用 (T1+T1-r2+T2+T4), 剩 0/2 (8/6 daily 排期需要 1 push)**
- **明天起严格 1 push/天**: 1 新写 + 1 retrofit 合并

### 12.5 验收口径 (8/30 收尾)

- ✅ 62/62 篇 v8_ready (audit 评分 12+/15)
- ✅ zh-hk 0 简体 (跑 scan-simplified.mjs)
- ✅ Tailwind class 跨 62 篇一致
- ✅ 9 段结构跨 62 篇 100% 一致
- ✅ GSC 7d 平均 CTR > 0.5% (从 0.23% 起点目标 +120%)
- ✅ 月度 push ≤ 50/500 (10%)

---

## 十三、版本

**v1.0** (2026-08-05): K3 17:11 拍板, 9 段 + 3 locale 排版 token
**v2.0** (2026-08-06 02:20): K3 2:20 拍板补
- §10 视觉/排版 token 详细 (K3 强调"排得非常整洁、间距好")
- §11 Retrofit 模式 (K3 强调"修复旧 blog 文章也要学")
- §12 61 篇 retrofit 排期 (audit 8/6 2:20 完成)
- 8/30 验收: 62/62 篇 v8_ready

**作者**: 智印港 ZprintPro 模板工程组 (K3 拍板 8/5 17:11 + 8/6 2:20)
**下版**: 8/7 首批 3 篇 retrofit 实战后, 调 Tailwind class token + §10 间距规则
