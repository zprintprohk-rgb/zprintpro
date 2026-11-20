# v9.4 Hero 通栏贴合 + Blog 分类胶囊全量换行 — 执行报告（2026-09-12）

> 任务性质：纯前端布局/CSS 修正。零文案改动、零数据源改动、零图片逻辑改动、零埋点改动。

## 一、对照范本

**范本文件**：`src/app/[locale]/category/[slug]/page.tsx` + 其线上实现组件 `src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx`

范本 Hero 结构（`cat` 后提取，L438-476）：
```
<main ...>
  <section class="max-w-[1320px] mx-auto">                       ← 外层
    <div class="relative overflow-hidden h-[300px] md:h-[400px] text-white" style={orange-grad}>
      <div aria-hidden class="absolute inset-0" style={orange-overlay} />
      <div class="relative z-[1] h-full flex flex-col justify-center px-6 md:px-10">
        <nav aria-label="breadcrumb" class="text-[13px] text-white/75 mb-4">…</nav>   ← 面包屑在色块内
        <h1 class="text-[clamp(24px,2.5vw,34px)] font-extrabold …">
```
采纳的范本要素：**面包屑位于色块内部 + 浅色 token（`text-[13px] text-white/75`）+ 内层内容容器居中 + 色块高度 300/400**。

## 二、根因（线上真值核对，非纸面推断）

线上抓取 `/zh-hk/blog/`、`/zh-hk/contact/`、`/zh-hk/category/wedding-invitations/` 三页 HTML 逐字节比对，发现真因 **不是** Hero 自身：

1. **白色间隙真因 = 全局白条面包屑**。`src/app/[locale]/layout.tsx` L229 全站渲染 `<BreadcrumbNav />`（`bg-white border-b` + `<ol>`）。
   - `BreadcrumbNav` 已对 `/category/`、`/product/` 做豁免（这两类页面的面包屑由 Hero 接管），**但漏了 `/blog/`、`/contact/`** → 导航栏与藏青 Hero 之间多出一条白条，且与 Hero 内面包屑**重复** → 视觉即「色块上方白色间隙 + 悬浮卡片感」。
2. **Contact Hero 非通栏 + 顶部留白**：外层为 `max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6`（1320 限宽 + pt-6 顶部留白）。
3. **Blog 分类胶囊单行裁切**：容器 `flex gap-2.5 overflow-x-auto … [scrollbar-width:none] [&::-webkit-scrollbar]:hidden` + 胶囊 `flex-shrink-0`，隐藏滚动条的单行横向滚动 → 第 9 个类目「行業趨勢」之后全部不可见（与老板描述的位置完全吻合）。

## 三、改动文件（3 个 src 文件）

| # | 文件 | 改动 |
|---|---|---|
| 1 | `src/components/breadcrumb-nav.tsx` | **路由级豁免**（沿用既有 `/category/`、`/product/` 模式）：新增 `pathname.includes('/blog')`、`pathname.includes('/contact')` → 返回 null，不再渲染白条面包屑 |
| 2 | `src/app/[locale]/contact/page.tsx` | Hero 外层 `max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6` → `w-full`；内层内容容器 `relative z-[1] h-full flex … px-6 md:px-10 py-10` → `relative z-[1] max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex … py-10`（限宽下沉到内层）。藏青渐变色值/装饰元素/面包屑/文案零改动 |
| 3 | `src/app/[locale]/blog/BlogContent.tsx` | 分类胶囊容器 `flex gap-2.5 overflow-x-auto pb-3 -mx-1 px-1 [隐藏滚动条]` → `flex flex-wrap items-center gap-2 md:gap-3`；胶囊去掉 `flex-shrink-0`；选中态加 `ring-2 ring-[#F87314]` |

**未改动**：Blog Hero（`w-full` 通栏在 D 批已实现，本轮核验通过，无需重做）、任何文案/翻译、M3 图片映射与 95KB/webp 约束、表单字段、JsonLd、FAQPage、埋点属性。

## 四、验收结论

### 门禁（本地）
| 门禁 | 结果 |
|---|---|
| `npx tsc --noEmit` | **54 = 54 基线持平**（0 命中本批文件） |
| `npm run build` | **Compiled successfully, exit 0** |
| 暂存范围 | 仅 3 个相关 src 文件（不夹带 sitemap/.hermes 既有脏文件） |
| bc-ban diff | 0 新增命中 |

### 功能与视觉（本地生产服务 `next start`，三语各跑一遍）
`.hermes/v94-verify-local.mjs` → **44 PASS / 0 FAIL（ALL GREEN）**

| 验收项 | zh-hk | en | ja |
|---|---|---|---|
| Hero 上方无白条面包屑（`bg-white border-b` 不出现） | ✅ | ✅ | ✅ |
| Hero 外层 `w-full` 通栏（`<section class="w-full"><div class="relative w-full … min-h-[300px]`） | ✅ | ✅ | ✅ |
| 面包屑在 Hero 色块内且浅色（`text-white/75`） | ✅ | ✅ | ✅ |
| contact 已移除 1320 限宽 + `pt-6` | ✅ | ✅ | ✅ |
| contact 内层内容 `max-w-[1320px] mx-auto` 居中 | ✅ | ✅ | ✅ |
| 胶囊容器 `flex flex-wrap items-center gap-2 md:gap-3` | ✅ | ✅ | ✅ |
| 已移除 `overflow-x-auto` 单行滚动容器 | ✅ | ✅ | ✅ |
| **胶囊数 = 24（「全部文章」+ 23 类目）** | ✅ | ✅ | ✅ |
| 埋点（`data-event="whatsapp_click"` / `data-cf-analytics`）保留 | ✅ | — | — |
| JsonLd 保留（blog 与 contact 均有 `application/ld+json`） | ✅ | — | — |
| 其他页面全局面包屑未被误伤（`/zh-hk/services/` 仍有 `bg-white border-b`） | ✅ | — | — |

### 分类数据完整性核对
`blogPosts` 共 **90 篇**，`categoryKey` 覆盖 **23 个类目**（packaging 19 / printing 15 / buying-guide 9 / sticker 9 / paper-bags 7 / flyers 6 / posters 5 / hongkong 2 / creator-ip 2 / wedding-envelope 2 / japan-doujin 2 / 其余 11 类目各 1）→ 全部 >0，**24 个胶囊全量渲染，无 `.slice()` 截断**（`slice()` 仅用于头图区 featured/rest 三分，属展示布局，与分类无关）。

### 线上验收（生产 zprintpro.com，三语言）
- 上线链：commit `4d5f0637`（branch）→ main merge `46b87370` → CF 部署 `770bbc5b` **deploy:success**
- **线上探针：44 PASS / 0 FAIL — ALL GREEN**（`V94_BASE=https://zprintpro.com node .hermes/v94-verify-local.mjs`，结果落 `.hermes/logs/v94-probe-live.txt`）
- 验收项与本地一致：三语言 `/blog/`+`/contact/` 无白条面包屑、Hero `w-full` 通栏、面包屑在色块内浅色、胶囊容器 `flex-wrap` 且 24 个全渲染、埋点/JsonLd 保留、`/services/` 全局面包屑未被误伤
- 备注：首轮线上探针（部署后 ~1 分钟）命中 CDN 边缘混服旧版 + CF 平台 503 抖动窗口（期间连上一批部署 `3ad811cf` 亦 503），按既有判据以「恢复后复探」为准 —— 复探即全绿

## 五、全局布局处理方式（按指令要求说明）

- 未大改全局布局：`layout.tsx` / `Header` / `main` 结构 **零改动**。
- 阻碍通栏的因素是全局 `BreadcrumbNav` 的**白条面包屑组件**（非 main 顶 padding，`layout.tsx` L226-230 中 `<Header/> → <BreadcrumbNav/> → {children}`，children 无包裹 padding）。
- 处理方式 = **路由级豁免**（在该组件内对 `/blog`、`/contact` 返回 null），与既有 `/category/`、`/product/` 豁免完全同构；其余页面（services / faq / about / legal …）继续保留全局面包屑。
- contact 自身的页面级 `pt-6` 属该页 Hero 外层类，已随通栏改造一并移除。

## 六、遗留偏差（上报老板）

1. **与范本的外层宽度策略不同**：范本 PLP 的色块是 `max-w-[1320px]` 限宽（两侧留白），而本批按老板明确验收标准把 blog/contact 做成 `w-full` 通栏。两者的 **DOM 层级、面包屑位置、内层容器策略、色块高度** 一致，仅外层宽度不同。→ 是否把 PLP 也统一改通栏，请老板定（本轮未动 PLP，属红线外范围）。
2. **胶囊选中态用橙色 ring 而非橙色填充**：老板给了两种方案（`bg-orange-500` 或 `ring-2 ring-orange-400`），本批取第二种（`ring-2 ring-[#F87314]`，保留藏青填充）。理由：`globals.css` 有 v9.2.1 裁决 4 护栏「橙渐变只许 Banner 首屏 + 首页轮播；CTA 按钮维持纯橙；藏青退守数据带/页脚/PDP 即日卡」。若老板要橙色填充，1 行可切。
3. **Hero 高度未改为 `py-16 md:py-20`**：沿用 `min-h-[300px] md:min-h-[400px]` + `py-10`（与范本 `h-[300px] md:h-[400px]` 同高，且 min-h 防三语长文案溢出），符合指令「不设固定 min-h 除非范本如此 / 或与 PLP 范本一致的垂直 padding」。
4. **胶囊底色用既有藏青 token `#1D3465`（active `#17284C`）而非硬编码 `#1a2b4a`**：`--color-royal-navy` 即 `#1D3465`，属同一皇家藏青族，避免引入新硬编码色偏离 D 批锁色。

## 数据来源

- 范本文件：`src/app/[locale]/category/[slug]/page.tsx`（L425-466 传统分支）+ `v9/CategoryPageV9.tsx`（L438-476 线上实现）
- 线上真值核对：`curl` 抓取 `/zh-hk/blog/`、`/zh-hk/contact/`、`/zh-hk/category/wedding-invitations/`（脚本 `.hermes/v94-hero-audit.mjs`）
- 全局面包屑定义：`src/components/breadcrumb-nav.tsx`（L27-30 既有豁免 + 本批 L31-35 新增）+ `src/app/[locale]/layout.tsx` L229
- 分类计数：`.hermes/v94-chip-count.ts`（blogPosts 90 篇 / 23 类目全 >0）
- 本地验收：`.hermes/v94-verify-local.mjs`（`next start` + 三语 44 项断言 ALL GREEN）
- 门禁：`npx tsc --noEmit`（54=54）、`npm run build`（exit 0）
