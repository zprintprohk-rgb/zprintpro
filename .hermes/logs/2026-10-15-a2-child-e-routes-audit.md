# 2026-10-15 A2-Child-E 路由审计报告（预渲染/动态路由分布与本地构建可行性）

- 审计对象: `F:\zprintpro-nextjs`（Next.js ^14.2.35 App Router，per package.json）
- 日期: 2026-10-15 · 模式: 只读调查（未改 src，未 git commit/push）
- git HEAD: `e41458fe 2026-10-15 12:28:26 +0800`（cliff-detector chain fix W1 final item）

**数据来源**:
- `.next/prerender-manifest.json`（803 B，mtime 2026-10-07 00:04:03，BUILD_ID `3f5SvgIJoVa2Dgmh5cyx6`）
- `.next/server/app` html 清单与 `.next` 目录树（2026-10-15 脚本实测）
- `.vercel/output/{functions,static}`（**产物 mtime 2026-06-27 21:35 = 旧转换快照，非 10/7 构建**）
- 源码: `src/app/[locale]/layout.tsx`、`src/app/quote-desk/*`、`src/middleware.ts`、`next.config.js`、`package.json`（HEAD e41458fe）
- 双方法复核: Node walker（`.hermes/tmp/find-pages-without-gsp.cjs`）= 36 vs `git ls-files "src/app/**/page.tsx"` = 36 ✅
- 校准状态: 已校准（2026-10-15 当日实测）；撤回声明: 无

## 一、结论摘要
1. （确定）最后 build（2026-10-07 00:04，BUILD_ID `3f5SvgIJoVa2Dgmh5cyx6`）的预渲染面 = **仅 2 条静态路由 `/quote-desk` 与 `/quote-desk/all`**（initialRevalidateSeconds=False，纯静态无 ISR），dynamicRoutes=0；`.next/server/app` 下仅 3 个 html（两条 quote-desk + `_not-found.html`）双向印证。
2. （确定）`src/app/[locale]/layout.tsx:22` `export const runtime = "edge"` 使全部 [locale] 子树不做构建期预渲染、运行时走边缘函数——34/36 页面虽有 generateStaticParams，但 GSP 与静态产物解耦，未产生任何构建期 HTML。
3. （高置信）本地 `next build` 主要卡点 = Google Fonts 网络拉取（layout.tsx:7 `next/font/google` Inter；`.next/cache` 无字体缓存目录）+ 工作区 1029 条未提交变更（现有 .next 产物落后 HEAD 8 天，已过时）。

## 二、发现列表

### F1 prerender-manifest：全站仅 2 条静态路由（一手产物，双方法复算一致）
- `STATIC_ROUTES_COUNT=2`：`/quote-desk`、`/quote-desk/all`，均 `initialRevalidateSeconds=False`、srcRoute 自指；`DYNAMIC_ROUTES_COUNT=0`（无 ISR / 无 fallback 动态路由）。
- 复算（方法 2）：`.next/server/app` 递归 `.html` = 3 = `quote-desk.html` + `quote-desk\all.html` + `_not-found.html`，与 manifest 2 条一致（+1 个 404 壳）；manifest 仅 803 B 与 2 条路由体量吻合。
- 证据: `.hermes/tmp/summarize-manifest.py` 输出（2026-10-15）→ `.next/prerender-manifest.json`。

### F2 .vercel/output/functions：全路由 .func 的边缘函数架构，但产物已过时 3.5 个月（一手产物 + 新鲜度警示）
- `functions/`（每路由 `.func` + `.rsc.func` 孪生）与 `static/` 存在，`config.json`/`builds.json` mtime = **2026-06-27 21:35** —— 是 6/27 某 next-on-pages 转换的旧快照，**不能代表 10/7 构建**；其中 `*quote*` 仅命中 `api\quote.func` 与 `[locale]\quote.func`（/quote 页），无 quote-desk（该路由 7/24 才诞生，反证旧产物年代）。
- 尽管过时，其形态与当前架构一致：middleware、api/*、[locale] 及全部子路由均为运行时函数，无静态产物目录 → 部署模型 = 全边缘函数（@cloudflare/next-on-pages）。
- 证据: `Get-ChildItem .vercel/output` mtime 输出（2026-10-15）。

### F3 [locale]/layout.tsx：runtime="edge" 是全站路由分布的开关（一手代码，行号精确）
- `src/app/[locale]/layout.tsx:7` `import { Inter } from 'next/font/google';`
- `src/app/[locale]/layout.tsx:22` `export const runtime = "edge";` → 传播至全部 [locale] 子页（`[locale]/unsubscribe/page.tsx` 另自带 runtime="edge"，冗余重复）。
- `:68` `export async function generateMetadata(...)`；`:140` `export const viewport`。
- **无** generateStaticParams、**无** `next/headers` 导入、**无** headers()/cookies() 调用、**无** dynamic/dynamicParams/revalidate 导出（Select-String 全文匹配 0 命中）→ 页面并非因请求 API 被迫动态，而是因 edge runtime 不做构建期预渲染（机制归因为推断，实证见 F1/F2/F5）。

### F4 quote-desk：全站唯二静态路由 = 纯客户端壳 + 前端密钥门（一手代码）
- 4 文件齐: `layout.tsx`（server 壳，metadata.robots noindex/nocache）+ `page.tsx`（`'use client'`）+ `all/layout.tsx`（server，noindex）+ `all/page.tsx`（`'use client'`，仅 zh-hk）。
- 两 page 均 `'use client'` + `useSearchParams()`（Suspense 包裹）+ 不用 next/headers → 无服务端数据依赖，可静态预渲染（事实上就是 F1 的两条静态路由）。
- 鉴权 = **客户端 SHA-256 密钥门**: URL `?k=<secret>` 自动解锁（useEffect 读 searchParams）或手输，`verifyKey()` + `QUOTE_DESK_KEY` 常量来自 `@/lib/quote-engine/desk`，纯前端字符串比较；`/all` 页独立验 key（老板成本视图，红字「勿外發」警示）。
- **不依赖 middleware 注入 cookie/header**: `src/middleware.ts:196` 对 `pathname.startsWith('/quote-desk')` 走豁免分支（跳过 locale 前缀重定向等，仅 `return thisResponseWithAbHeaders(request)`）；`all/layout.tsx` 注释「middleware 跳过 locale prefix redirect」与代码一致。
- 安全观察（非本次范围）: 密钥常量随客户端 bundle 下发，属内部门槛而非强鉴权（K3 7/24 拍板口径，代码注释自证）。

### F5 无 generateStaticParams 的 page.tsx 全清单：2/36（双方法一致）
- Node walker 全扫 `src/app/**/page.{tsx,jsx,ts,js}` = 36；`git ls-files "src/app/**/page.tsx"` = 36，相等 ✅。
- WITHOUT GSP = 2: `src/app/quote-desk/page.tsx`、`src/app/quote-desk/all/page.tsx`（均 'use client'，无需 GSP）。
- WITH GSP = 34（含 `[locale]/page.tsx` gsp@25、`[locale]/blog/[slug]/page.tsx` gsp@710,900 等），但在 edge runtime 下未产出构建期 HTML（见 F1/F3）。

### F6 构建链条与 next.config（一手代码）
- `package.json` scripts: `build` = `next build && node scripts/generate-sitemap.js`；`build:cf` = `node scripts/clean.mjs && node scripts/generate-sitemap-content.mjs && npx --legacy-peer-deps @cloudflare/next-on-pages@1.13.16`（next-on-pages 内部再跑 `next build` 并产出 `.vercel/output`）。注意: devDependencies 声明 `^1.12.1` 而脚本钉 `@1.13.16`，npx 按脚本版本拉取。
- `next.config.js`: `trailingSlash: true`、`images.unoptimized: true`、无 `output: 'export'`（函数化部署而非纯静态导出）、大表 `redirects()`。
- **文档与代码冲突**（照实写明，不和解）: AGENTS.md §2 #5 写「Node.js runtime via @opennextjs/cloudflare」，而 build:cf 实际用 `@cloudflare/next-on-pages@1.13.16` —— 两条不同迁移路线，当前事实以 package.json 为准，AGENTS.md 该句过时（待证: 是否已计划迁移）。

### F7 本地构建可行性（一手实测）
- `.next/cache` 子目录仅 `swc`(1 项) + `webpack`(5 项)，**无 next-font-loader / Google Fonts 缓存** → `next build` 需联网拉 Inter（layout.tsx:7）；与 AGENTS.md §0.27.4 已知「Windows 本机 build 卡 fonts 网络」吻合。
- `node_modules` 存在（Test-Path True）；git 工作区 `status --porcelain` 1029 条（多为 .hermes 未跟踪产物）；`.next` 产物 2026-10-07 vs HEAD 2026-10-15 12:28 → 现有产物不含最近 8 天改动，**不能拿旧 .next 当现状**。
- 结论: 依赖齐备，纯 `next build` 的不确定点 = fonts 网络；`build:cf` 链更长（clean + sitemap-content + next-on-pages 内嵌 build），另依赖 npx 在线拉 1.13.16。

## 三、待证项
1. 「edge runtime ⇒ 构建期不预渲染」的机制归因: 本仓三方实证（F1/F2/F5）一致支持，但 Next.js 14.2 官方文档原文本次未核对（建议查 Next.js docs「Edge Runtime」段）。
2. quote-desk 静态壳在线上的实际服务形态: 本地 `.vercel/output` 为 6/27 旧产物无法验证；需一次新 `build:cf` 后看 `.vercel/output/static/quote-desk*.html` 是否生成。
3. 34 处 GSP 的具体返回值集合未逐一展开（对结论无影响，GSP 未产生静态产物已由 F1 定案）。

## 四、建议下一步
- 若目标是全站静态化/ISR: 当前被 `layout.tsx:22` runtime=edge 一票否决，且 next-on-pages 路线要求全 edge；走 @opennextjs/cloudflare（AGENTS.md 所写路线）需单独立项评估。动 layout 属 src 行为变更，按 §0.25 攒批纪律执行。
- 本地验证构建: 先解决 fonts 网络（代理 / next/font 本地化 / 离线缓存）再跑 build 三闸门（§0.27.4），避免把网络失败误判为代码失败。
- `.vercel/output` 已陈旧 3.5 个月，如继续用它做路由盘点，先重建再读（本报告路由结论以 .next 10/7 产物为准）。

---
*审计脚本: `.hermes/tmp/summarize-manifest.py`（manifest 解析+新鲜度）、`.hermes/tmp/find-pages-without-gsp.cjs`（GSP 普查+行号）、`.hermes/tmp/flush-report.cjs`（本报告落盘校验）。全程只读 src/ 与产物，唯一写入 = .hermes/tmp 与本文件。*
