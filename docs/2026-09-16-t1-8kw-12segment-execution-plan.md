# T1 8 锁词 12 段深度执行方案（2026-09-16 大脑交付）

> **K3 指令**: 「T1 8 锁词 12 段深度：包裝盒印刷 ⭐ → 紙盒 ⭐ → 包裝盒訂製 → 貼紙 → 宣傳單張 → 即日 → 書刊 → 騎馬釘（daily-content 逐词）」+「深度思考理解问题，穷尽100%能力分析研究后执行」
> **依据**: `docs/2026-09-09-k3-brain-30-90day-masterplan-v1.md` L22（T1 词三语言内容全部达到 12 段深度）+ `docs/2026-09-15-next-phase-task-allocation.md` §3.1/§4.1（daily-content 逐词排期）
> **12 段标准**: `docs/2026-09-08-title-rules-and-deep-blog-standard.md` §3.1 + §5.3（12 铁律）

---

## 0. 核心理解（深度思考结论）

**T1 不是「每词写新 blog」，而是「8 个带钱词的落地内容全部达到 12 段深度标准」**：
1. **禁新建第 2 篇**（allocation §3.1 明示）——已有落地页一律升级
2. **12 段 = 12 铁律**（H2 问句 / 快速答案块×3 / 表格×2 / 数字≥10 标源 / E-E-A-T / CTA×2 / 内链≥7 / FAQ×4 / GEO 金块）
3. **三语言**（zh-hk / en / ja）每词都要达标
4. **执行节奏**：daily-content 21:17 lane 逐词（9/17 起，9/22-10/4 收尾）

## 1. 8 锁词差距全量体检（2026-09-16 实测）

> 方法: 逐页统计 12 段元素（H2/表格/FAQ/答案块/内链/CTA/数字），来源 = blog-data JSON + buying-guides.ts

### 1.1 差距矩阵（全部 24 落地页三语言）

| 锁词 | 承接页 | 字数(zh) | H2 | 表 | FAQ | 答案块 | 内链 | CTA | 差距等级 |
|------|--------|----------|----|----|-----|--------|------|-----|---------|
| 包裝盒印刷⭐ | packaging-buying-guide | 3,402 | **0** | 2 | **0** | **1** | **1** | **1** | 🔴 大 |
| 包裝盒印刷⭐ | packaging-box-pricing-2026 | 19,325 | 9 | 4 | **0** | 12 | 14 | 2 | 🟡 小（FAQ） |
| 紙盒⭐ | kraft-paper-box-types | 20,453 | 9 | 2 | **0** | 14 | 15 | 3 | 🟡 小（FAQ） |
| 包裝盒訂製 | packaging-box-custom-guide | 5,985 | **0** | **1** | 4 | 3 | **6** | **0** | 🔴 大 |
| 貼紙 | sticker-buying-guide | 3,428 | **0** | 2 | **0** | **1** | **1** | **1** | 🔴 大 |
| 貼紙 | sticker-guide | 8,198 | 11 | 3 | 8 | **1** | 12 | **0** | 🟡 中（块+CTA） |
| 貼紙 | sticker-material-pvc | 15,659 | 10 | 4 | **0** | 13 | 15 | 2 | 🟡 小（FAQ） |
| 宣傳單張 | flyer-buying-guide | 3,171 | **0** | 2 | **0** | **1** | **1** | **1** | 🔴 大 |
| 宣傳單張 | flyer-printing-guide | 3,235 | **0** | **1** | **0** | **1** | 5 | **1** | 🔴 大 |
| 即日 | same-day-flyers | 10,248 | **1** | 3 | **0** | **0** | 13 | **1** | 🟡 中 |
| 即日 | rush-printing-hk | 9,076 | 9 | 2 | 4 | **0** | 9 | **5** | 🟡 中 |
| 書刊 | book-buying-guide | 3,282 | **0** | 2 | **0** | **1** | **1** | **1** | 🔴 大 |
| 騎馬釘 | saddle-stitch | 3,021 | 7 | **0** | **0** | **0** | **2** | **0** | 🔴 大 |

### 1.2 差距聚类（3 类修复模式）

**A 类 · buying-guide 型**（packaging/sticker/flyer/book-buying-guide，H2=0 + FAQ=0 + 链=1）：
- 已有三语内容（3,000-5,000 字）+ 2 表格 + 1 CTA，但**缺 H2 问句骨架、FAQ、快速答案块、内链**
- 修法：**结构化升级**（补 H2 问句 ×5-7 + FAQ ×4 + 答案块 ×3 + 内链 ×7 + 顶部 CTA）

**B 类 · 中深 blog 型**（packaging-box-custom / saddle-stitch / flyer-printing / same-day / rush）：
- 有内容但单项缺（H2 骨架 / 表格 / FAQ / CTA / 内链）
- 修法：**定向补缺**（每篇 1-4 项）

**C 类 · 已深 blog 型**（packaging-box-pricing / kraft / sticker-guide / sticker-material）：
- 已 12 段基本达标（H2≥7、表≥2、链≥9、块≥8），**仅 FAQ<4**
- 修法：**补 FAQ ×4**（最小动作，FAQPage schema 立刻生效）

## 2. 执行方案（daily-content 逐词，9/17-10/4）

### 2.1 排期（按 K3 指令顺序）

| 日 | 锁词 | 承接页（升级目标） | 修复模式 |
|----|------|---------------------|----------|
| 9/17 | **包裝盒印刷⭐** | packaging-buying-guide + packaging-box-pricing | A 类 + C 类 FAQ |
| 9/18 | **紙盒⭐** | kraft-paper-box-types（FROZEN 只读——升级改为补 FAQ 需解冻/或降级处理） | C 类 FAQ（待定冻结） |
| 9/19 | 包裝盒訂製 | packaging-box-custom-guide | B 类 |
| 9/20 | 貼紙 | sticker-buying-guide + sticker-guide + sticker-material | A + B + C |
| 9/21 | 宣傳單張 | flyer-buying-guide + flyer-printing-guide | A 类 |
| 9/22 | 即日 | same-day-flyers + rush-printing | B 类 |
| 9/23 | 書刊 | book-buying-guide | A 类 |
| 9/24 | 騎馬釘 | saddle-stitch | B 类 |
| 10/1-10/4 | 复核 | 8 词 × 3 locale 全量 | 三闸门 + 门童六命令 |

### 2.2 每词升级动作清单（标准作业）

**A 类（buying-guide 型）**：
1. 补 **H2 问句骨架 ×5-7**（真实搜索问句：幾錢/幾多起/幾耐/邊種紙/點揀/點印）——把现有 h3 分节重排为 H2 问句
2. 首段改**倒金字塔**（≤200 字直答核心问题）
3. 顶部加 **快速答案块 ×3**（bg-amber-50 div，40-60 字直答）
4. 补 **FAQ ×4**（`<p><strong>Q[0-9]：</strong>...<br/>A：...` 格式）
5. 补**内链 ×7**（语义锚点 ≥5 字，hub-spoke 指向包装盒/貼紙等承接页）
6. 顶部加 **CTA ×1**（wa.me）+ 保底部 CTA = 2
7. 三语言同步（en/ja 翻译本地化，非直译）

**B 类（中深 blog 型）**：按差距矩阵定向补缺（每篇 1-4 项）

**C 类（已深 blog 型）**：补 FAQ ×4（最小动作）

### 2.3 验收（每词必过，12 铁律 §5.3）

```bash
# 门童六命令（第一层）
node scripts/guards/blog-quality-12-rules-guard.js
node scripts/guards/blog-standard-guard.js
node scripts/guards/internal-links-cta-guard.js
node scripts/guards/blog-data-integrity-guard.js
node scripts/check-content-guard.js
node scripts/check-i18n.js
# 三闸门（第二层）
node scripts/check-encoding.js --fix && npx tsc --noEmit
# 5 步真验收（第三层）
node scripts/verify-deploy.mjs
```

## 3. 风险与决策点

| # | 风险 | 处置 |
|---|------|------|
| 1 | **紙盒⭐ kraft FROZEN**（冻结期 title 只读）——补 FAQ 是 content 不是 title，**不触冻结**？需确认冻结范围 | 冻结仅限 title 字段（T 批冻结声明），content 可改 → **可直接补 FAQ** |
| 2 | **A 类 buying-guide 重构**是内容大改（H2 重排）——需保幂等（不重复做已完成） | 每词改前跑体检脚本快照，只补缺项不动已达标项 |
| 3 | FAQ 格式必须过 extractFaqFromHtml regex（`<p><strong>Q[0-9]*[:：]`） | 统一模板，全/半角冒号兼容 |
| 4 | 三语言工作量 ×3 | 逐词做 3 locale，每 locale 独立验收 |
| 5 | 每日 1 词由 daily-content lane 执行，大脑不重复做 | 本方案 = lane 的 SSoT，lane 按此执行 |

## 4. 数据来源（§0.23）

```
数据来源:
- K3 指令: 8 锁词 12 段深度 (2026-09-16 会话)
- 拍板: docs/2026-09-09-k3-brain-30-90day-masterplan-v1.md L22 + docs/2026-09-15-next-phase-task-allocation.md §3.1/§4.1
- 12 段标准: docs/2026-09-08-title-rules-and-deep-blog-standard.md §3.1 + §5.3
- 现状实测: 2026-09-16 全量体检 (24 落地页 × 12 段元素统计, blog-data JSON + buying-guides.ts)
- 门童: scripts/guards/blog-quality-12-rules-guard.js (15 命中 = 5 blog × 3 locale RULE5_EEAT LinkedIn 缺失)
- git: 无内容改动 (本方案 = 执行 SSoT, 落地由 daily-content lane 按日执行)
校准状态: 8 词 12 段差距矩阵为 2026-09-16 实测; 无估算数字
```

## 5. 执行记录（2026-09-16 会话，追加）

### 5.1 已独立完成（C/B 类最小动作，已改 blog-data JSON 3 语言）

| 词 | 文件 | 动作 | 状态 |
|----|------|------|------|
| 包裝盒印刷⭐ | packaging-box-pricing-2026 | 补 FAQ ×4 + FAQ H2 问句化 | ✅ 12 铁律除 E-E-A-T 全达标 |
| 紙盒⭐ | kraft-paper-box-types | 补 FAQ ×4 + 6 个 H2 问句化（原 RULE2 不达标 2/9） | ✅ 8-9/10 问句 |
| 貼紙 | sticker-material | 补 FAQ ×4 + FAQ H2 问句化 | ✅ 6/11 问句 |
| 貼紙 | sticker-guide | 补答案块 ×2 + CTA ×2（块 3 / CTA 2） | ✅ 9/11 问句 |

### 5.2 发现与修复

- **kraft RULE2 原本不达标**（2/9 问句，FROZEN title 冻结但 content 可改）→ 6 个陈述 H2 问句化（三语言）
- **FAQ H2「常見問題」非问句**会稀释问句比例 → 统一问句化（「…常見問題點答？」三语言）
- **check-i18n.js 不存在**（门童六命令旧路径）→ 实际为 scripts/guards/i18n-guard.js
- **【重大】残缺 LinkedIn URL 系统性缺陷**：9 个 blog × 3 locale = 25 处 `https://www. .com/in/zprintpro-engineer`（URL 中间空格，域名丢失）→ 统一修复为 `https://www.linkedin.com/in/zprintpro-engineer` → **12 铁律门童 15 命中 → 0 命中**（5 大 Pillar × 3 locale 全达标，含 packaging-box-pricing / sticker-material 2 个 T1 词）

### 5.3 子代理派发（8 个，12 段深度升级中）

| 子代理 | 词 | 承接页 | 类型 |
|--------|-----|--------|------|
| b1b5b97e | 包裝盒印刷⭐ | packaging-buying-guide | A 类 buying-guide 重构 |
| 44336ebf | 騎馬釘 | saddle-stitch | B 类补强 |
| baa525f8 | 即日 | same-day-flyers | B 类补强 |
| 9a98f089 | 即日 | rush-printing | B 类补强 |
| 8313846b | 包裝盒訂製 | packaging-box-custom | B 类补强 |
| 9c644054 | 宣傳單張 | flyer-buying-guide + flyer-printing-guide | A 类重构 |
| 96111174 → 06983687 | 書刊 | book-buying-guide | A 类重构（首派失败重派） |
| 9f563f49 | 貼紙 | sticker-buying-guide | A 类重构 |

### 5.4 集成准备（2026-09-16）

- **内链目标修正**：子代理 prompt 中 `/zh-hk/product/gift-boxes/` 不存在 → 集成时替换为 `/zh-hk/product/rigid-boxes/`（精裝盒/禮品盒）
- **FAQ regex 确认**：page.tsx L841 `/<p><strong>Q[0-9]*[:：]...<br/>A[0-9]*[:：]...<\/p>/gi` 兼容全/半角冒号 + 可选数字 + `<p>` 属性
- **集成脚本**：`.hermes/t1-apply-buying-guide.cjs`（buying-guides.ts content 块替换）+ `.hermes/t1-apply-blog.cjs`（blog-data JSON content 替换），均含备份 + 三语言断言
- **提交范围**：只 stage `src/data/blog-data/*.json` + `src/data/buying-guides.ts` + `docs/2026-09-16-*.md`；不含 `.hermes/backup-*` / tmp 脚本 / title-audit 产物（I18N_POLLUTION guard 缺陷，历史遗留）

### 5.5 集成记录（2026-09-16，子代理产出已写入 main-tmp）

| 词 | 页 | 子代理 | 写入 | 12 段实测（zh/en/ja） |
|----|----|--------|------|------------------------|
| 即日 | rush-printing | 9a98f089 | blog-data ×3 | H2=9/7/7（问句化后全问）· FAQ=4 · 块=5 · 链=9/10/10 · CTA=2 段 |
| 即日 | same-day-flyers | baa525f8 | blog-data ×3 | H2=8/8/8（全问句）· FAQ=6 · 块=7 · 链=15/13/13 · CTA=2 |
| 包裝盒訂製 | packaging-box-custom | 8313846b | blog-data ×3 | H2=6/6/6（全问句）· 表=2 · FAQ=4 · 块=6 · 链=10/9/9 · CTA=2 |
| 貼紙 | sticker-buying-guide | 9f563f49 | buying-guides.ts | H2=9（8问）· 表=2 · FAQ=6 · 块=6 · 链=10 · CTA=2（ja 品牌已修正） |
| 宣傳單張 | flyer-buying-guide | 9c644054 | buying-guides.ts | H2=10（6问）· 表=3 · FAQ=6 · 块=6 · 链=9 · CTA=2 |
| 宣傳單張 | flyer-printing-guide | 9c644054 | blog-data ×3 | H2=10（6问）· 表=2 · FAQ=6 · 块=6 · 链=13-14 · CTA=3 |
| 書刊 | book-buying-guide | 06983687 | buying-guides.ts | H2=9（7问）· 表=2 · FAQ=6 · 块=6 · 链=10 · CTA=2（ja 品牌已修正） |
| 騎馬釘 | saddle-stitch | 44336ebf | blog-data ×3 | H2=8（8问）· 表=2 · FAQ=4 · 块=5 · 链=11-13 · CTA=2 |

**8/8 锁词覆盖**：包裝盒印刷⭐（pricing ✅ + buying-guide ⏳）/ 紙盒⭐（kraft ✅）/ 包裝盒訂製（✅）/ 貼紙（sticker-guide ✅ + sticker-material ✅ + sticker-buying-guide ✅）/ 宣傳單張（flyer-buying-guide ✅ + flyer-printing-guide ✅）/ 即日（rush ✅ + same-day ✅）/ 書刊（book ✅）/ 騎馬釘（saddle ✅）。

**集成教训**：4 个子代理中有 3 个误写 redesign 工作树（F:\zprintpro-nextjs）——集成时统一「从 redesign 提取 → 写入 main-tmp → 还原 redesign」流程；ja 品牌「智印港」需统一修正为 ZprintPro（子代理沿用既有 ja 内容导致）。

### 5.6 rush-printing H2 问句化修正（2026-09-16）

- **问题**：rush-printing 子代理产出 H2 全陈述式（9/7/7 全 0 问句，12 段 RULE2 不达标）
- **修复**：三语言 9+7+7 个 H2 全部问句化（「一、3 大門派速度對比…」→「即日印刷 3 大門派邊個最快？」等）
- **CTA 判定**：zh CTA=5 中含作者块 E-E-A-T 联系（#1-2）+ 正文 CTA 2 段（#3-4 同 1 CTA + #5 底部）= 实质 2 段 ✅
- **验证**：7 页 zh-hk 12 段体检全 ✅（H2 问句>50% / 表≥2 / FAQ≥4 / 块≥3 / 链≥7）
