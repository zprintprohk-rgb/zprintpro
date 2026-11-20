# v9.6 Blog 筛选区收纳进 Navy 圆角色块 — 执行报告（2026-09-12）

> 任务性质：纯前端布局/CSS 修正。零文案改动、零数据源改动、零图片逻辑改动、零埋点改动、零分类渲染逻辑改动。

## 一、复用的范本组件（先读后抄）

| 范本 | 文件 | 提取到的 token |
|---|---|---|
| **A｜数据统计通栏块** | `src/components/home/StatsBar.tsx`（L41-48） | 底色为**内联 CSS 渐变** `linear-gradient(165deg, #244780 0%, #1B3163 52%, #152649 100%)`；`boxShadow: inset 0 1px 0 rgba(255,255,255,.10)`；文字 `text-white` / `text-white/70`；**无圆角**（满宽 section） |
| **B｜PDP 服務承諾色塊** | `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx`（L541-545） | 底色 `var(--color-royal-navy-grad)`（= `linear-gradient(155deg,#26477F 0%,#1D3465 55%,#17284C 100%)`，`globals.css` L15）；圆角 **`rounded-[18px]`**；内边距 **`p-6 sm:p-8 md:p-9`**；`boxShadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)`；文字 `text-white` / `text-white/90` |

**采用**：以**范本 B** 为主（结构 + 圆角 + 内边距 + 阴影，成组卡片容器），底色沿用 `var(--color-royal-navy-grad)` —— 该 token 同时是 Blog/Contact Hero 的底色 → **页面内 Hero 与筛选块同族**，视觉统一。范本 A 的纯渐变质感通过同一 token 承接（未直接引用其内联渐变值，避免同一页出现两套 navy 渐变）。

范本 A/B 组件本身**零改动**（仅引用 token）。

## 二、改动文件

| 文件 | 改动 |
|---|---|
| `src/app/[locale]/blog/BlogContent.tsx` | 把「搜索条 + 文章计数 + 分类胶囊组」包进一个 `w-full rounded-[18px] p-6 sm:p-8 md:p-9 text-white` + `var(--color-royal-navy-grad)` + 范本B 阴影的 navy 圆角容器；容器内两行结构：① `flex flex-col gap-4 md:flex-row md:items-center md:justify-between`（搜索框 + 计数）② `mt-6 flex flex-wrap items-center gap-2 md:gap-3`（胶囊组，**保留全量换行**） |

**未改动**：Hero（宽度/CTA/垂直居中）、文章网格、精选区、尾 CTA、搜索与筛选逻辑、埋点、JsonLd、文案。

## 三、深底配色映射表

| 元素 | 改前（白底） | 改后（navy 底） |
|---|---|---|
| 筛选区外壳 | 无（散落白底） | `w-full rounded-[18px] p-6 sm:p-8 md:p-9 text-white` + `var(--color-royal-navy-grad)` + `inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)` |
| 搜索框 | `border-gray-200 bg-gray-50 text-[#333333] focus:border-[#2873F5] focus:bg-white` | `border border-white/15 bg-white/10 text-white placeholder:text-white/50`；聚焦 `focus:border-orange-400 focus:bg-white/15 focus:ring-2 focus:ring-orange-400/40` |
| 搜索图标 | `text-gray-400` | **`text-white/50`** |
| 文章计数 | `text-xs text-gray-500 sm:ml-auto` | **`text-sm text-white/70 md:whitespace-nowrap`** |
| 分类胶囊（未选中） | `bg-[#1D3465] border-[#1D3465]`（navy 实心） | **`bg-white/10 border-white/15 text-white/90 hover:bg-white/20`**（关键：容器已是 navy，胶囊再用 navy 会糊成一片 → 改半透明白底形成层次） |
| 分类胶囊（选中） | `bg-[#17284C]`（深 navy）+ 橙色 ring | **`bg-[#F87314] border-[#F87314] text-white shadow-md shadow-orange-500/30`**（橙色实心，深底最醒目；采用站点橙 token `#F87314` 而非 Tailwind `orange-500`，与全站 CTA 同色） |
| 胶囊计数数字 | `text-white/70`（未选中）/ `text-white/80`（选中） | **`text-white/50`**（未选中）/ `text-white/80`（选中） |

## 四、布局与宽度约束

- 容器置于文章网格**上方原位**，页面其它区块顺序不变。
- 容器 `w-full`，**不再自带 `max-w`** → 直接填满既有内容区父级 `max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8`，左右与下方文章卡片网格对齐（**无双重限宽**，探针已断言容器类名中不含 `max-w-`）。
- 与上方 Hero 的间距由父级 `py-12 md:py-16` 提供；与下方网格间距由网格既有 `mt-8` 提供，未贴死。

## 五、验收结论

### 门禁
| 门禁 | 结果 |
|---|---|
| `npx tsc --noEmit` | **54 = 54 基线持平**（0 命中本批文件） |
| `npm run build` | **Compiled successfully, exit 0** |
| 暂存范围 | 仅 `src/app/[locale]/blog/BlogContent.tsx` + 报告+探针 |
| bc-ban diff | 0 新增命中 |

### 功能与视觉（本地生产构建 `next start`，三语各跑一遍）
`.hermes/v96-verify.mjs` → **60 PASS / 0 FAIL（ALL GREEN）**

| 验收项 | zh-hk | en | ja |
|---|---|---|---|
| navy 圆角容器外壳（`rounded-[18px] p-6 sm:p-8 md:p-9`） | ✅ | ✅ | ✅ |
| 容器底色 = `var(--color-royal-navy-grad)`（范本B token） | ✅ | ✅ | ✅ |
| 容器阴影 = 范本B inset+drop shadow | ✅ | ✅ | ✅ |
| 容器**无自带 max-w**（禁双重限宽） | ✅ | ✅ | ✅ |
| 搜索框深底配色（`bg-white/10` + `border-white/15` + `placeholder:text-white/50`） | ✅ | ✅ | ✅ |
| 搜索图标 `text-white/50` | ✅ | ✅ | ✅ |
| 文章计数 `text-sm text-white/70` | ✅ | ✅ | ✅ |
| 未选中胶囊 = 半透明白底 | ✅ | ✅ | ✅ |
| 选中胶囊 = 橙色实心 `#F87314` | ✅ | ✅ | ✅ |
| 旧 navy 实心胶囊类（`bg-[#1D3465]` / `bg-[#17284C]`）已消失 | ✅ | ✅ | ✅ |
| `type="search"` + placeholder 文案保留（功能不变） | ✅ | ✅ | ✅ |
| **回归**：胶囊容器 `flex flex-wrap` 保留 | ✅ | ✅ | ✅ |
| **回归**：无 `overflow-x-auto` 单行截断 | ✅ | ✅ | ✅ |
| **回归**：胶囊仍 **24 个全量** | ✅ | ✅ | ✅ |
| **回归**：Hero/内容区 `max-w-1320` 保留 | ✅ | ✅ | ✅ |
| **回归**：v9.5 CTA 共享组件样式保留 | ✅ | ✅ | ✅ |
| **回归**：无全局白条面包屑 | ✅ | ✅ | ✅ |

### 三视口核对（1920 / 1440 / 1280）
- 容器为 `w-full` 且父级唯一限宽 `max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8` → 三视口下容器左右边缘与同父级下的文章卡片网格**逐像素对齐**（同为该父级的块级子元素，宽度恒等），无双重限宽、无错位。
- 深底可读性：未选中胶囊 `bg-white/10` + `border-white/15`（在 `#26477F~#17284C` 渐变上形成明确边界与层次）；选中 `#F87314` 实心对比充足。
- ⚠️ **未能真机截图核对**：本执行环境无浏览器/截图工具，无法出 1920/1440/1280 三视口实拍图。如需像素级实拍复核，请三档视口各截一图，或授权启用浏览器代理工具后我补跑。

### 线上验收（生产 zprintpro.com）
- 上线链：commit `ea857e77` → main merge `f767ac9b` → CF 部署 `49eaa70f`（`f767ac9`）**deploy:success**
- **线上探针：60 PASS / 0 FAIL — ALL GREEN**（`V96_BASE=https://zprintpro.com node .hermes/v96-verify.mjs`，结果落 `.hermes/logs/v96-probe-live.txt`），本轮部署后首轮即全绿（无 CDN 传播延迟）
- **配额**：CF API 确认本批**仅 1 次生产构建**（`2026-09-11T20:06:12Z production f767ac9`），无 preview 部署 → 相较「分支+main 双推」省 1 次

## 六、遗留偏差

1. **选中胶囊橙色用 `#F87314`（站点橙 token）而非 Tailwind `orange-500`**：与全站 CTA / Hero eyebrow / PLP 强调色同色，避免同页出现两种橙；如需严格对齐 `orange-500`(#f97316)，1 处可切。
2. **去掉了 v9.5 的橙色 ring**：v9.6 明确规定选中态为橙色实心，ring 变冗余；若两者都要（实心 + 外圈），请指示。
3. **底色沿用 `--color-royal-navy-grad`（范本B），未用范本A 的内联 165deg 渐变**：理由见 §一（避免同页两套 navy 渐变；且 token 化便于后续统一调整）。
4. **未加 `my-8`**：间距由父级 `py-12 md:py-16` + 网格 `mt-8` 承担，与页面既有节奏一致；如需额外留白请指示。

## 数据来源

- 范本 A：`src/components/home/StatsBar.tsx`（L41-48，逐行读取）
- 范本 B：`src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx`（L541-545，逐行读取）
- navy token 定义：`src/app/globals.css` L12-19（`--color-royal-navy-soft #26477F` / `--color-royal-navy #1D3465` / `--color-royal-navy-deep #17284C` / `--color-royal-navy-grad` / `--color-orange-grad`）
- 改动文件：`src/app/[locale]/blog/BlogContent.tsx`（筛选区 L357-419）
- 本地验收：`.hermes/v96-verify.mjs`（60 项断言 ALL GREEN）
- 门禁：`npx tsc --noEmit`（54=54）、`npm run build`（exit 0）
