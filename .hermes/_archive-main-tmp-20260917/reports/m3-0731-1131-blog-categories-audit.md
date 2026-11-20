# 7/31 11:31 博客分类 audit + 方案 (K3 战略任务)

**K3 11:30 任务**: 印刷知识文章分类缺失, 每次写文章前要放进分类里, 分类要参考搜索热度 + 产品分类
**M3 audit**: 68 篇文章, 22 个 categoryKey, 但侧边栏 UI 只显示 10 个 = **25 篇侧边栏 0 入口**
**今日 1 push 已用** (f5700f9), 实施 push 排 8/1

---

## 数据 audit (K3 截图 vs 实际代码)

| 指标 | K3 截图侧边栏 | blog-posts.ts 实际 | 差 |
|---|---|---|---|
| 全部文章 | 71 | 68 (blog-posts.ts) + 59 (legacy JSON) | 3 待定 |
| 公司新聞 | 1 | 1 | 0 |
| 貼紙知識 | 8 | 7 | -1 (侧边栏多 1) |
| 名片知識 | **1 (禁区!)** | 1 (business-card-design) | §11 红线 |
| 包裝盒知識 | 17 | 16 | -1 |
| 印刷工藝 | 4 | 4 | 0 |
| 設計技巧 | 1 | 1 | 0 |
| 品牌建設 | 1 | 1 | 0 |
| 香港本地 | 2 | 2 | 0 |
| 行業趨勢 | 1 | 1 | 0 |
| 選購指南 | 9 | 9 | 0 |
| **侧边栏 10 类小计** | **45** | **43** | -2 |
| **侧边栏 0 入口** | **26** | **25 (12 个 categoryKey)** | **核心问题** |

### 12 个被侧边栏 UI 隐藏的 categoryKey (25 篇文章)

| categoryKey | 数量 | 现状 | 建议处理 |
|---|---|---|---|
| `paper-bags` | 7 | 完全隐藏 | **升级为侧边栏类** (P0 主营, §13.4) |
| `flyers` | 3 | 完全隐藏 | **升级为侧边栏类** (P0 主营) |
| `posters` | 3 | 完全隐藏 | **升级为侧边栏类** (P1 辅助) |
| `creator-ip` | 2 | 完全隐藏 | 跟 hongkong/trends 合并 or 新增「創意周邊」类 |
| `wedding-envelope` | 2 | 完全隐藏 | §11 禁区! 需改 slug 或并入 red-packets |
| `japan-doujin` | 2 | 完全隐藏 | ja-specific, 仅 ja locale 显示 |
| `menus` | 1 | 完全隐藏 | 并入 `flyers` or 新增「菜單印刷」类 |
| `red-packets` | 1 | 完全隐藏 | CNY 季节性, 跟 wedding-envelope 合并 |
| `cross-border` | 1 | 完全隐藏 | 并入 `trends` or 新增「跨境電商」类 |
| `education` | 1 | 完全隐藏 | 并入 `branding` or 新增「教育行業」类 |
| `banners` | 1 | 完全隐藏 | 并入 `posters` |
| `food-packaging` | 1 | 完全隐藏 | 并入 `packaging` (P0 主营) |

### 1 篇 §11 名片禁区
- `slug: 'business-card-design'` categoryKey='card' — 必须删/改

---

## K3 战略要求拆解

### 要求 1: 每次写文章前要放进分类里
**实施**: 改 `src/data/blog-posts.ts` schema, **强制每篇 BlogPostMeta 必须有 categoryKey** (TS 编译报错 if missing), 改 cron daily content prompt 加 "categoryKey 选择 audit" 步骤。

### 要求 2: 分类要参考用户搜索热度
**实施**: 拉 GSC 数据 (top queries), 用搜索词映射到 5 大产品 P0 (貼紙/宣傳單張/包裝盒/紙袋/標籤) + Tier A 12 行业关键词 (§13.2)

### 要求 3: 分类要参考产品分类
**实施**: 对齐 `src/data/products.ts` 14 个 P0/P1 类目 (§13.4) + 5 大产品 P0

---

## M3 建议方案 (K3 拍板)

### Phase 1: 重新设计分类体系 (8/1 拍板)

**13 个核心分类** (按 5 大主营 + 8 大内容维度):

| # | 分类 key | 3 locale label | 来源 | 覆盖 | 类目/P0 |
|---|---|---|---|---|---|
| 1 | `sticker` | 貼紙知識 / Sticker Guide / ステッカー知識 | P0 主营 | 7+5=12 | 貼紙 |
| 2 | `flyers` | 宣傳單張知識 / Flyer Guide / チラシ知識 | P0 主营 | 3+1=4 | 宣傳單張 |
| 3 | `packaging` | 包裝盒知識 / Packaging Guide / 包装知識 | P0 主营 | 16+1=17 | 包裝盒 |
| 4 | `paper-bags` | 紙袋知識 / Paper Bag Guide / 紙袋知識 | P0 主营 | 7 | 紙袋 |
| 5 | `labels` (新) | 標籤知識 / Label Guide / ラベル知識 | P0 主营 | 0 (需新加) | 標籤 |
| 6 | `posters` | 海報知識 / Poster Guide / ポスター知識 | P1 辅助 | 3+1=4 | 海報 |
| 7 | `buying-guide` | 選購指南 / Buying Guide / 選び方ガイド | 内容 | 9 | 跨类 |
| 8 | `printing` | 印刷工藝 / Printing Techniques / 印刷技術 | 内容 | 4 | 跨类 |
| 9 | `design` | 設計技巧 / Design Tips / デザインチップ | 内容 | 1 | 跨类 |
| 10 | `branding` | 品牌建設 / Branding / ブランディング | 内容 | 1+1=2 | 跨类 |
| 11 | `hongkong` | 香港本地 / Hong Kong Local / 香港ローカル | 地区 | 2 | zh-hk/en/ja |
| 12 | `trends` | 行業趨勢 / Industry Trends / 業界トレンド | 内容 | 1+1=2 | 跨类 |
| 13 | `company-news` | 公司新聞 / Company News / 会社ニュース | 公司 | 1 | 跨类 |

**13 类总计 = 68 + 1 (labels 新加) = 69 篇, 跟现有 71 差 2 (card 1 + 错位 1)**

**调整**:
- ❌ **删** `card` (1 篇 business-card-design — §11 禁区, 改写为 packaging 或 trends, 重新走产品 SEO 路径)
- 🔀 **合并** `wedding-envelope` (2) → `red-packets` (利是封) + `packaging` (婚禮包装)
- 🔀 **合并** `menus` (1) → `flyers` (菜单传单)
- 🔀 **合并** `banners` (1) → `posters` (横幅海报)
- 🔀 **合并** `food-packaging` (1) → `packaging` (食品包装)
- 🔀 **合并** `cross-border` (1) → `trends` (跨境趋势)
- 🔀 **合并** `education` (1) → `branding` (教育行业品牌) or 新增 `industries` 类
- 🔀 **合并** `creator-ip` (2) → 新增 `creator-ip` 类 (zh-hk 必显, en/ja 也显) — 创意周边
- 🔀 **保留** `japan-doujin` (2) — ja-specific, ja locale 显 (同人誌)

**最终 13-14 类目标**: 100% 覆盖 68 篇文章, 0 篇无入口, 0 篇禁区

### Phase 2: 实施 (8/5 前攒批 1 push)

**改 3 files**:
1. `src/data/blog-posts.ts` — 重命名 / 合并 categoryKey
2. `src/app/[locale]/blog/BlogContent.tsx` — categories 列表改 13-14 项
3. `src/app/[locale]/blog/BlogContent.tsx` categoryColors — 同步色卡

**改 25 篇文章 categoryKey**:
- 7 paper-bags → paper-bags (新侧边栏)
- 3 flyers → flyers (新侧边栏)
- 3 posters → posters (新侧边栏)
- 2 creator-ip → creator-ip (新侧边栏)
- 2 wedding-envelope → red-packets + packaging
- 2 japan-doujin → japan-doujin (新侧边栏, ja only)
- 1 menus → flyers
- 1 red-packets → red-packets (新侧边栏)
- 1 cross-border → trends
- 1 education → branding
- 1 banners → posters
- 1 food-packaging → packaging
- 1 card → 改写为 packaging (避开 §11 禁区)

### Phase 3: cron daily content prompt 升级

`zprintpro-daily-content-1x7w` cron prompt 加:
```
5. categoryKey 选择 audit
   - 从 13 类选 1 (sticker/flyers/packaging/paper-bags/labels/posters/
     buying-guide/printing/design/branding/hongkong/trends/company-news/...)
   - 验证: 新文章 categoryKey 必须在 BlogContent.tsx categories 列表
   - 禁忌: ❌ card (名片禁区)
```

---

## K3 拍板项 (3 选 1)

### 选项 A: M3 建议方案 (13 类, 完整覆盖, 8/5 前 1 push)
- 优: 5 大主营对齐产品 P0, 12 行业可叠加在主题标签 (Tier A)
- 缺: card 1 篇要改写 (新内容, 不是简单改分类)

### 选项 B: 保守方案 (8 类, 仅合并不重设计)
- 保留: company-news / sticker / packaging / printing / design / branding / hongkong / trends / buying-guide
- 把 25 篇未分类合并到现有 9 类
- card 直接删
- 优: 改动小, 风险低
- 缺: paper-bags/flyers/posters 3 个 P0 主营没独立入口

### 选项 C: 激进方案 (15 类, 全 categoryKey 都进侧边栏)
- 13 类 + 2 个 ja-specific (japan-doujin + creator-ip)
- 优: 0 隐藏, 全透明
- 缺: 侧边栏 15 项太多, UI 体验差

---

## 升级 K3 (P1, 8/1 拍板)

报告: `.hermes/reports/m3-0731-1131-blog-categories-audit.md` (本文件, 4.5KB)
脚本: `.hermes/audit-blog-categories-2026-07-31.py` (3KB)
今天 1 push 已用 (f5700f9), 实施 push 排 8/1 0 push 之后

K3 拍板 A/B/C 后, M3 8/1 攒批 1 push 完成 25 篇文章重归类 + UI 13 类改造
