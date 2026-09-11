# v9.2.3 Blog 视觉修正与资源重构 报告（2026-09-11 老板执行提示词）

> 状态: 已部署 + 线上探针验收。指令 3 项全部达成。
> 数据来源: F:\zprintpro-en-us-images M3的模型生成的图片 (591 张 .webp, 12-16 类目 SKU 目录) / src/data/blog-posts.ts 90 篇 / public/images/blog/** 兜底池 91 张 / 老板 9/11 执行提示词 + 大小门禁拍板 (ask_user_question) / CategoryPageV9.tsx L362-398 (PLP hero 参考) / CF Pages deployments API (commit 0470e125)

---

## 一、需求拍板表（3 项指令 + 1 项门禁修正）

| # | 指令 | 拍板 | 落地 |
|---|------|------|------|
| ① | Hero/Banner 全宽贴边（背景色块 w-full 紧贴导航栏，内容 max-w-1320 居中，藏青锁定） | 老板执行提示词原话 | blog 列表页 + 详情页 |
| ② | Blog 图片源切换 M3 模型生成图（停用 blog-sku-image.ts，语义匹配，三语同图，全局唯一，降级 WARN） | 老板执行提示词原话 | build-blog-m3-images.ts + blogM3Images |
| ②' | 大小门禁 **≤95KB → ≤115KB** | **老板 9/11 ask_user_question 拍板「放宽到 ≤115KB（推荐）」**（95KB 仅 39 张合格致 67 篇降级） | 277 张合格 → 83 篇 M3 图 |
| ③ | 分类标签藏青实心底+白字、禁空标签、搜索与分类并列、全部文章选中藏青 | 老板执行提示词原话 | BlogContent 胶囊重构 + calendars 补标签 |

## 二、实施明细（commit acde6f4e → main 0470e125, 97 文件 525+/131-）

### ① Hero 全宽贴边
- **列表页** `BlogContent.tsx` D1: `section` 由 `max-w-[1320px] mx-auto px-4 pt-6` → **`w-full`**（背景色块通栏贴导航栏外沿）；内部内容容器 → `max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-10`。藏青 `var(--color-royal-navy-grad)` 色值锁定不变。高度 `min-h-[300px] md:min-h-[400px]`、直角（与 PLP wedding-invitations hero 一致）。
- **详情页** `blog/[slug]/page.tsx` 新增 navy Hero band（原页面无顶部色块）：全宽 + 面包屑（首頁/印刷知識/标题）+ 分类 pill（white/15）+ H1（clamp）+ 日期/作者。文章卡内旧 H1/pill/meta 上移 Hero → **单 H1（SEO 合规）**。

### ② 图片源切换 M3（资源重构）
- **废弃** `src/lib/blog-sku-image.ts`（71 行删除，SKU 自动映射停用）。
- **新机制** `.hermes/build-blog-m3-images.ts`（一次性选图脚本）+ `src/data/blog-m3-images.ts`（90 篇 slug → 静态路径映射，运行时零扫描）。
- 匹配算法：文章 categoryKey/主关键词 → 文件名语义前缀（`zprintpro-{category}-`）→ 变体优先级 hero > variety > spread > detail > multi-angle → 全局 used 索引防重复 → 无匹配降级品牌封面池 + `WARN: fallback used for [slug]`。
- 物理落地：89 张 .webp 复制进 `public/images/blog-m3/{slug}.webp`（三语共用同一张 = 三语同图）。
- 选图结果：**83 篇 M3 图 / 7 篇降级品牌封面**（WARN 日志见 `.hermes/logs/blog-m3-selection-2026-09-11.md`）。

### ③ 分类标签强化 & 搜索布局
- 胶囊：active `bg-[#17284C]` + shadow-lg；inactive `bg-[#1D3465]` 白字 + hover:brightness-110（底色基调不变）。卡片分类 pill 同样藏青实心（原 15 色 categoryColors 全移除）。
- 「全部文章」入口与分类标签组同排水平对齐，选中态藏青。
- 禁空标签：分类数组 3 语言补 `calendars`（月曆印刷/Calendars/カレンダー），23 个 categoryKey 全覆盖。
- 搜索框位于 Hero 下方与分类筛选并列（上一轮已落，本轮回归验证）。

## 三、硬门禁（全绿）

| 门禁 | 结果 |
|------|------|
| tsc | 54=54 基线持平（0 新增，全在 quote-engine/__tests__） |
| build | exit 0（sitemap Blog: 98 URLs, 3 locale × 229, 687 total） |
| bc-ban（diff） | 变更文件 0 命中（名片词精确扫描 6 文件 + 89 图名） |
| encoding | 7/7 UTF-8 LF |
| 图片门禁 | 89 张全 .webp、全 ≤115KB、文件名唯一、无名片词 |
| §0.25.9.2 旧图引用 | src/public `zprintpro-en-us-images\|v25_` = 0 hits |

## 四、M3 池统计（数据来源）

- 源目录 591 张 .webp（BC/BK/BN/CL/DJ/ED/EV/FL/MN/PB/PK/PKG/PO/RP/ST/WI 16 类 SKU 目录，含 raw/ 与 `_` 存档排除）。
- 老板拍板 ≤115KB 后合格池 **277 张**（≤95KB 仅 39 张）。
- 兜底池 91 张（public/images/blog/** + og-image.jpg）。
- 分配：83 M3 / 7 fallback / 90 篇全覆盖；89 唯一 slug（源数据 sticker-buying-guide 有重复 meta 属既有）。

## 五、线上验收（probe: .hermes/blog-m3-probe.mjs）

**47/47 PASS**（deploy f7a85322 = commit 0470e125，stage=deploy:success，域 zprintpro.com）：

| 验收项 | 结果 |
|--------|------|
| ① Hero 全宽贴边（内容 max-w-1320 居中） | 3 locale list + 3 locale detail PASS |
| ① 详情 navy hero（min-h-300/400 + 面包屑 + 单 H1） | 3 locale PASS |
| ② M3 图上线（列表卡片 + 详情 rush-printing-hk-guide） | 3 locale PASS |
| ② 三语同图（zh-hk=en=ja 同一物理图） | PASS |
| ② 卡片图全局唯一（≥60 张去重，实际 89 唯一） | 3 locale PASS |
| ② M3 图 HTTP 200 + ≤115KB | PASS |
| ③ 藏青胶囊（#17284C active / #1D3465 inactive）+ calendars 标签 | 3 locale PASS |
| ③ 搜索框回归 | 3 locale PASS |
| 埋点保留（blog-hero / bottom-cta） | 3 locale PASS |
| 回归（首页 / PLP wedding-invitations / PDP） | 200 PASS |

> 探针 3 处修正均为探针自身：① BASE 用 apex `zprintpro.com`（www 301 到 apex）② en/ja 相关产品标签为 Related Products/関連製品 ③ 唯一性检查需忽略 next/image srcset 多候选（取 <img src> 主图）。

## 六、已知偏差 / 待老板裁决

1. **7 篇降级品牌封面**（非 M3 图）：restaurant-opening-flyer-printing-guide / food-packaging-printing-guide / paper-bag-printing-guide / flyer-buying-guide / packaging-buying-guide / poster-buying-guide / packaging-trends —— 均为对应类目 M3 池耗尽（packaging/flyers/posters 博客多、池少）。WARN 日志已记。若老板需全 M3，建议补充该类目 ≤115KB 压缩图。
2. **大小门禁 95→115KB 为老板 9/11 拍板放宽**（非脚本自主），超标 >115KB 仍跳过。
3. **参考图3 本机不可访问**：Hero 高度/圆角按老板此前引用的 PLP wedding-invitations hero（min-h-300/400、直角、内容 1320 居中）对齐；若参考图3 高度/圆角不同，提供图后 1 轮可调。
4. 详情页 Hero 为**新增**顶部色块（原详情页无色块），符合「列表页/详情页顶部色块全宽贴边」指令本意。
5. 三语同图 = 每篇 1 张物理图，3 语言 URL 相同（符合指令「同引用同一张物理图片」）。
