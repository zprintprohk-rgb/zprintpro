# v9.5 Hero 宽度对齐 + CTA 统一 + 内容垂直居中 — 执行报告（2026-09-12）

> 任务性质：纯前端布局/CSS 修正。零文案改动、零数据源改动、零图片逻辑改动、零埋点改动、零表单/JsonLd 改动。

## 一、Navbar 色块宽度类查证结果（先查证后施工）

`grep` + 逐行读 `src/components/layout/Header.tsx` 得到真实嵌套：

```
<header class="sticky top-0 z-50">                                   ← 无内边距
  <div class="max-w-[1320px] mx-auto bg-white shadow-sm">            ← L265 白色容器（1320 居中）
      <div class="bg-gray-50 border-b border-gray-100"> … top bar … </div>
      <nav class="hidden lg:block bg-[#2873F5]">                     ← L355 蓝色导航条：在此容器内部
        <div class="px-0"><div class="flex items-center h-[46px]"> … </div></div>
      </nav>
  </div>
</header>
```

**结论**：蓝色导航条 `bg-[#2873F5]` **不是视口满宽**，它位于 `max-w-[1320px] mx-auto bg-white` 容器内 → **色块实际宽度 = min(视口, 1320px) 居中**。
→ 上一轮把 Hero 改成 `w-full` 视口满宽确实**比导航栏色块更宽**（老板观察正确）。

**判定标准推导**（无浏览器环境下的等价性证明）：
- 两者都是**无内边距全宽父元素**（`<header>` 无 padding；`<main>` 无 padding）下的**块级子元素**，共用同一约束 `max-w-[1320px] mx-auto`。
- 故两者在任意视口的计算宽度恒等 = `min(视口宽度, 1320px)` 且同为水平居中：
  - 1920px → 均 1320px（左右各留 300px）
  - 1440px → 均 1320px（左右各留 60px）
  - 1280px → 均 1280px（满宽，无留白）
- 三视口下左右边缘**逐像素重合**（无溢出、无缩进）。该结论已用 HTML 类名断言在本地与线上核验（见 §四）。

## 二、采用方案

**方案 A（推荐）**：Hero 外层**复用 Navbar 色块同一宽度约束**，只引用不重构。

```diff
- <section className="w-full">                                  // v9.4 视口满宽（比导航栏宽）
+ <section className="max-w-[1320px] mx-auto">                  // v9.5 = Header L265 同一约束
- <div className="relative w-full overflow-hidden min-h-[300px] md:min-h-[400px] text-white" …>
+ <div className="relative w-full overflow-hidden flex min-h-[380px] md:min-h-[440px] text-white" …>
- <div className="relative z-[1] max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-10">
+ <div className="relative z-[1] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
```

- 全局 Navbar / layout **零改动**（未重构，仅引用同一宽度类）。
- `/blog/` 与 `/contact/` 两页同构。
- 内层 `flex` + `min-h-[380px] md:min-h-[440px]`：色块成为 flex 容器，内容容器 `w-full flex flex-col justify-center` 自然拉伸至色块高度 → **垂直居中可靠**（原 `h-full` 在父级仅有 `min-height` 时百分比高度不可解析，内容实际顶部对齐 → 这正是「下方大片空白、上下不对称」的根因）。
- `py-12` 上下等值，配合 min-h 居中，上下留白对称。

## 三、CTA 统一（修正项 2）

**根因**：Blog Hero 的 `<a>` 是 `flex flex-col` 容器的**直接子元素**，被默认 `align-items: stretch` 拉伸 → 渲染成撑满整行的橙色长条；Contact 的 `<a>` 外层有 `mt-6 flex flex-wrap gap-3` 包裹 → 宽度随文字自适应。

**处理**：按指令「若无共享组件，则把 Contact 页的按钮 JSX+className 抽成共享组件，两页共用」——
新建 **`src/components/WhatsAppCtaButton.tsx`**（样式逐字抽自 Contact 既有按钮：`inline-flex items-center gap-2 rounded-xl bg-[#F87314] text-white font-bold px-6 py-3 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all`，并加 `self-start` 使其作为 flex 直接子元素也不被拉伸）：

| 调用方 | href | label | data-source |
|---|---|---|---|
| `blog/BlogContent.tsx` | 原 wa.me 链接（逐字保留） | 原「WhatsApp 即時報價 / 見積もり / for a Quote」 | `blog-hero` |
| `contact/page.tsx` | `generateWhatsAppLink(locale)`（原调用保留） | 原 `t.whatsappBigCta` | `contact-hero` |

- 埋点 `data-event="whatsapp_click"` / `data-source` / `data-locale` 全保留（组件内统一输出）。
- 文案零改动（label 由各页既有字符串传入）。

## 四、验收结论

### 门禁
| 门禁 | 结果 |
|---|---|
| `npx tsc --noEmit` | **54 = 54 基线持平**（0 命中本批文件） |
| `npm run build` | **Compiled successfully, exit 0** |
| 暂存范围 | 仅本批 3 个 src 文件 + 报告+探针（不夹带 sitemap 等脏文件） |
| bc-ban diff | 0 新增命中 |

### 功能与视觉（本地生产构建 `next start`，三语各跑一遍）
`.hermes/v95-verify.mjs` → **76 PASS / 0 FAIL（ALL GREEN）**

| 验收项 | zh-hk | en | ja |
|---|---|---|---|
| Hero 外层 = `max-w-[1320px] mx-auto`（非 `w-full`） | ✅ | ✅ | ✅ |
| 无「视口满宽」写法残留 | ✅ | ✅ | ✅ |
| Navbar 同宽约束 `max-w-[1320px] mx-auto bg-white shadow-sm` 存在 | ✅ | ✅ | ✅ |
| 内容容器垂直居中（`w-full flex flex-col justify-center py-12`） | ✅ | ✅ | ✅ |
| CTA 自适应宽度（`inline-flex self-start …`）+ 无 `w-full` 撑满 | ✅ | ✅ | ✅ |
| CTA 埋点 `data-source="blog-hero"/"contact-hero"` + `data-event` 保留 | ✅ | ✅ | ✅ |
| JsonLd 保留 | ✅ | ✅ | ✅ |
| Blog 信任点描边胶囊 = 3 个（`bg-white/15 border border-white/30 … rounded-full`） | ✅ | ✅ | ✅ |
| 回归：无全局白条面包屑 | ✅ | ✅ | ✅ |
| 回归：分类容器 `flex flex-wrap` 保留 | ✅ | ✅ | ✅ |
| 回归：分类胶囊仍 24 个全显（上轮成果未破坏） | ✅ | ✅ | ✅ |
| 回归：`/services/` 全局面包屑未误伤 | ✅ | — | — |

### 三视口对齐核对（1920 / 1440 / 1280）
- **核对方式**：类名等价性断言（本地 + 线上 HTML 均确认 Hero 外层与 Navbar 蓝色块共用 `max-w-[1320px] mx-auto`，且各自父元素均无水平 padding）→ 三视口计算宽度恒等且同为中心对齐，左右边缘重合，无溢出/缩进。
- ⚠️ **未能真机截图核对**：本执行环境无浏览器/截图工具，无法出 1920/1440/1280 三视口实拍图。若需像素级实拍复核，请老板用浏览器三档视口各截一图，或授权启用浏览器代理工具后我补跑。

## 五、遗留偏差

1. **信任点胶囊仅 Blog 有为 3 个**：Contact Hero 内**本无信任点列表**（其信任带是 Hero 下方的 E2 四徽章卡片）。按「不改文案/不擅自新增内容」红线，未凭空为 Contact 造 3 条信任点。若需 Contact Hero 也上胶囊，请指定取自哪几条既有文案（如 `t.trustBand` 的 4 条）。
2. **Hero 高度取 `min-h-[380px] md:min-h-[440px]`**（指令骨架里的推荐值），而非范本 PLP 的固定 `h-[300px] md:h-[400px]`；理由：Blog/Contact Hero 元素比 PLP 多（信任胶囊 + CTA），min-h 防三语长文案溢出。
3. **Blog Hero 装饰元素位置随宽度收窄而内移**（其 `right-*` 锚点原按视口满宽设计，现锚定 1320 色块右缘）；视觉上仍为右上角同心圆 + 散点，未改装饰结构。如需重新布局装饰，请另行指示。
4. **范本 PLP 本身仍非「与导航栏同宽」**：PLP Hero 为 `max-w-[1320px] mx-auto` → 与 Navbar 蓝条同宽 ✅（与本批一致）。此项已无偏差，仅记录范本口径。

## 六、CF Pages 构建配额标注（按老板要求）

**查证数据（CF Pages deployments API，2026-09-01 起）**：

| 项 | 数量 |
|---|---|
| 9 月总部署/构建 | **100 次** |
| 其中 **production** | **63 次** |
| 其中 **preview** | **37 次（占 37%）** |

**结论**：
- 每次「分支 push + main push」会同时触发 **2 次构建**（1 次 preview + 1 次 production）→ 即 1 个批次吃掉 **2 / 500** 配额。9 月仅预览就消耗 **37 次**（≈ 月配额 7.4%）。
- 免费方案 500 次/月，本月至 9/11 已用 **100 次（20%）**；若不收敛，按当前节奏（≈9 次/天）月末约 **270 次（54%）**，尚在额度内但预览开销明显可省。
- **本批已按老板要求收敛**：v9.5 **只推 main、不推分支**（分支提交经本地路径 fetch 进合并仓，GitHub 上不产生分支推送）→ 本批仅触发 **1 次构建**（预计省 1 次）。
- 建议后续默认口径：**分支远端同步改为按需**（仅当需要他人协作或备份时推），日常批次只推 main。

## 数据来源

- Navbar 宽度类：`src/components/layout/Header.tsx` L264-265、L355-357（逐行读取）
- Hero/CTA 现状：`src/app/[locale]/blog/BlogContent.tsx` L242-288、`src/app/[locale]/contact/page.tsx` L240-278（逐行读取）
- 共享组件：`src/components/WhatsAppCtaButton.tsx`（新建，样式抽自 contact 既有 JSX）
- CF 配额：CF Pages deployments API `/accounts/32c174efaa22353f357c0fdff9d61b86/pages/projects/zprintpro/deployments`（9 月 100 条：production 63 / preview 37）
- 本地验收：`.hermes/v95-verify.mjs`（76 项断言 ALL GREEN，BASE=http://127.0.0.1:3005）
- 门禁：`npx tsc --noEmit`（54=54）、`npm run build`（exit 0）
