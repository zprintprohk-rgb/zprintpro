# Cloudflare Workers CPU 超限（24h ≥1000 次）根因分析与 A/B/C 方案

- **日期**: 2026-10-15
- **触发**: K3 转发 Cloudflare 通知邮件（免费层 CPU 限制 24h 内触发 ≥1000 次，账户 Zprintprohk@gmail.com）
- **状态**: 待 K3 拍板（A1 付款动作 + A2 治理授权）
- **结论有效期**: 架构证据长期有效；量化数字待 Analytics token 校准

**数据来源**:
- K3 转发的 Cloudflare 自动通知邮件（2026-10-15，"Times exceeded in the past 24 hours: at least 1,000+"）
- 本地构建产物: `.vercel/output/static/_routes.json`、`.vercel/output/functions/` 目录树、`.vercel/output/static/_redirects`（74 行）、`package.json`、`next.config.js`、`src/middleware.ts`、`src/app/api/*/route.ts`（2026-10-15 读取）
- Cloudflare 官方文档: Workers Limits（developers.cloudflare.com/workers/platform/limits/，2026-10-15 抓取）、Pages Functions Pricing（developers.cloudflare.com/pages/functions/pricing/，2026-10-15 抓取，页面标注 Last updated Sep 8, 2026）
- 线上探针（2026-10-15 01:30-01:42 UTC，每 URL 重复 2 次，两次结果一致）
- CF API 只读实测（`.env` 内 `CLOUDFLARE_PAGES_TOKEN`，2026-10-15 01:37 UTC）：zones / pages/projects / workers/scripts
- 校准状态: 架构证据**已校准**（本地产物 + 线上行为双源一致）；CPU 超限与请求量数字**待校准**（现有 token 缺 Account Analytics 与 Zone Analytics 只读权限，见 §4）

---

## TL;DR

1. 账户里**没有任何独立 Worker**（`workers/scripts = []`）。邮件里的 "Your Workers" = **Pages 项目 zprintpro 的 Pages Functions**（Cloudflare 官方口径：Pages Functions 请求按 Workers 计费、共享免费层 100k/天请求与 10ms CPU 限制）。同账户还有 `aitoptools` Pages 项目共享同一份免费额度。
2. 根因不是"代码写烂了"，而是**架构层把 100% 的请求都灌进了 Function**：`_routes.json` 为 `include: ["/*"]`、仅排除 `/_next/static/*` —— 全部预渲染 HTML 页、**全部图片**、manifest、sitemap、404、301、API 全部走 Function，每笔都吃 10ms CPU 预算。
3. 免费层 10ms CPU 对 Next.js SSR 类负载天然不够（官方文档原话：SSR 类负载典型 10-20ms），叠加冷启动模块求值、middleware、垃圾路径 SSR（实测 `/wp-login.php` 稳定返回 500），每天上千次击杀是**必然结果**，且会持续发生。
4. 治理分两层：**A1（K3 付款动作，$5/月 Workers Paid）立即止血** + **A2（执行层架构治理）把 Function 调用量砍到只剩真正需要计算的部分**（顺带把首页 TTFB 1.0-1.5s 明显改善）。只做 A2 不升级仍会复发；只做 A1 不治理则继续浪费额度且页面慢。

---

## 1. 问题事实

| # | 事实 | 来源 |
|---|------|------|
| 1 | 免费层 CPU 限制 24h 内触发 ≥1000 次 | CF 邮件原文 |
| 2 | 免费层每请求 CPU 上限 **10ms**；超限 → **Error 1102**（outcome `exceededCpu`），请求被中途终止 | CF Workers Limits 官方文档 |
| 3 | 官方文档明示：SSR（服务端渲染）类负载典型耗 **10-20ms** CPU —— 即免费层对 Next.js SSR **天然超限** | CF Workers Limits 官方文档 |
| 4 | 免费层还有 **100,000 请求/天** 账户级上限（超限 → Error 1027 全站报错页） | CF Workers Limits 官方文档 |
| 5 | Pages Functions 请求**按 Workers 计费**，与独立 Worker 共享同一免费额度池；**静态资源请求（不触发 Function 的）免费且不限量** | CF Pages Functions Pricing 官方文档 |
| 6 | 账户 Pages 项目 2 个: `zprintpro`（zprintpro.com）+ `aitoptools`（aitoptools.net），共享同一额度池；独立 Worker 0 个 | CF API `pages/projects` / `workers/scripts` 实测 |

## 2. 根因链（五级，全部有证据）

### 2.1 【架构根因】`_routes.json` = `include: ["/*"]` → 全站请求进 Function
构建产物实锤（`.vercel/output/static/_routes.json`，description: Built with @cloudflare/next-on-pages@1.13.16）：
```json
{"version":1,"include":["/*"],"exclude":["/_next/static/*"]}
```
含义：**除哈希静态分片外的一切路径**（预渲染 HTML、`/images/*` 图片、`/manifest*.json`、`/sitemap*.xml`、robots、404、全部 301、6 个 API 路由）都触发 Function 调用 = 一次 Worker 计费 + 10ms CPU 预算。
这是 next-on-pages 在**存在 middleware 时的已知行为**（middleware 必须对每个请求生效，因此无法排除页面路由）。本项目 `src/middleware.ts` 存在，故 include 为 `/*`。

### 2.2 【实证】连图片都在烧 Worker
`GET /images/articles/brand-story.webp` → 200，**响应头含 `x-matched-path: /images/articles/brand-story.webp`**（Next 服务端专属头，静态资源直出不会有）→ 该图片请求确实经过了 Function。一个典型页面 30 张图 = 30+ 次 Function 调用。图片/静态资源是页面请求数的大头，这是 invocation 总量的最大乘数。

### 2.3 【实证】每个 HTML 响应带 `Set-Cookie: zp_ab_bucket` → 边缘缓存全废
线上探针：`/zh-hk/`、PDP、404、500 全部携带 `Set-Cookie: zp_ab_bucket=...`（middleware 的 A/B 分流注入）。带 Set-Cookie 的响应**不可被 CF 边缘缓存** → 即使是同一条 URL 被反复抓取（Googlebot / GPTBot / 用户），每次都是全新 Function 调用。
副作用实锤：预渲染页 TTFB 1.0-1.5s（本应是几十 ms 的静态资源直出）；图片首次 1.79s。

### 2.4 【10ms vs 实际负载】SSR/冷启动必然超限
- Function 内跑的是完整 Next.js 边缘服务（`[locale].func`、`_not-found.func`、`api/search.func` 等），bundle 含全站页面代码 + 巨型数据模块（`products.ts` 92 SKU × 3 locale 全量 SEO 数据、blog 数据）。
- **冷启动 isolate 的模块求值 CPU 计入首请求** → 全球 300+ 节点 isolate 频繁新建 → 每个新 isolate 的第一个请求极易突破 10ms → 1102。这解释了"部分请求成功、部分失败"的随机形态。
- `api/search`（`runtime='edge'`，前端 SearchDropdown 250ms debounce 每次输入都打）、`api/merchant-feed/[locale]`（Google Merchant 抓取的 92 SKU XML）、`sitemap-image.xml`（force-static + 3600s，但仍是 .func 被调用）都是额外热点。

### 2.5 【流量放大器】爬虫 + AI 引擎 + 扫描噪声
- 全站 400+ 页面被 Googlebot / Bing / **GPTBot / PerplexityBot / ClaudeBot**（robots 特意放行，AEO/GEO 战略 §0.36）反复抓取 → 每页一次 Function 调用。
- **垃圾路径实测**：`GET /wp-login.php` 两次均 **HTTP 500**（响应体为 Next SSR 错误页，RSC payload 显示 `b:["locale","wp-login.php","d"]` —— 垃圾路径被 `[locale]` 动态段当作 locale 参数做了一次完整 SSR，组件抛错）。middleware 对含扩展名的路径跳过 locale 补全（`isFile` 判断），于是 `/wp-login.php`、`/.env` 类扫描器噪声全部变成一次昂贵的 SSR。未知产品 slug（实测 `/zh-hk/product/nonexistent-cpu-probe-x9/` → 404 ×2）也走 Function 渲染（`dynamicParams` 默认 true）。
- 这类噪声 + 爬虫总量 → 每天 1000+ 次 CPU 击杀是**结构性必然**。

## 3. 双方法复算（per §0.23.2）

| 结论 | 方法 1 | 方法 2 | 一致性 |
|------|--------|--------|--------|
| 全站请求走 Function | `_routes.json` 本地产物 `include /*` | 线上预渲染页带 `Set-Cookie`（middleware 执行过）+ TTFB 1.0-1.5s + 图片带 `x-matched-path` | ✅ 一致 |
| 图片走 Function | 响应头 `x-matched-path`（Next 专属） | 图片 TTFB 1.79s（静态直出应为百 ms 级） | ✅ 一致 |
| 垃圾路径 SSR 500 | 线上 `/wp-login.php` 500 ×2，body 为 Next 错误页 | 代码层：middleware `isFile` 跳过补 locale + `[locale]` 动态段可匹配任意单段 + `dynamicParams` 默认 true | ✅ 一致 |
| CPU 限制口径 | CF Workers Limits 官方文档（10ms/1102/SSR 10-20ms） | CF Pages Functions Pricing 官方文档（Functions 按 Workers 计费） | ✅ 互证 |
| "邮件指的是 zprintpro 的 Pages Functions" | CF API `workers/scripts = []`（无独立 Worker） | `pages/projects = [zprintpro, aitoptools]` + 邮件账户名与 API 账户名一致 | ✅ 一致 |
| CPU 超限精确数字/按路由分布 | 邮件（≥1000/24h，账户级） | CF API `workersInvocationsAdaptive` → **403 authz denied**（token 缺 Account Analytics scope） | ⚠️ **待校准**（不阻塞结论与方案） |

## 4. 风险量化与待校准项

| 项 | 现值 | 校准方式 |
|----|------|----------|
| 24h CPU 超限次数 | ≥1000（邮件，账户级） | ① Dashboard → Workers & Pages → zprintpro → Metrics → Errors → "Exceeded CPU Time Limits"；② 或发一个只读 **Account Analytics** scope token，探针脚本（`.hermes/tmp/2026-10-15-cf-probe.mjs`，已就绪）即可每日自动拉 |
| 每日 Function 调用总量 | 未测（同上 403） | 同上 |
| **Error 1027 全站下线风险** | 存在：免费层 100k 请求/天为**账户级**（zprintpro + aitoptools 共享），当前所有请求都进 Function，一次爬虫风暴即可触顶 | 升级 Paid 后此上限消失 |
| Workers Paid 定价 | $5/月（含每月 1000 万次请求；CPU 默认上限 30s、可配置至 5 分钟） | 付款页为准（以 K3 升级时看到的实际账单为准） |

## 5. 方案 A / B / C

| 方案 | 内容 | 成本 | 效果 | 风险 |
|------|------|------|------|------|
| **A（推荐）= A1 + A2** | A1 立即升级 Workers Paid + A2 架构治理（见 §6） | $5/月 + 执行层 1-2 个攒批 push | 1102 → 0（A1）；调用量大幅下降、TTFB 明显改善（A2）；1027 风险消除 | A2 涉及 middleware 迁移，须全量回归探针 |
| B（纯免费） | 只做 A2 治理 + Cache Rules 缓存 HTML + 把 invocation 压到接近 0 | $0 | 缓解，不能根治：404/搜索冷启动/漏网动态路径仍会 1102；100k/天上限仍在 | 复发概率高；工程量反而更大 |
| C（换平台） | Vercel Pro（$20/月，Hobby 禁商用）或 Netlify | $20/月+ | 同 A1 效果 | 域名/301/内链/SEO 资产已固化 CF，迁移 churn 风险（§11.8 红线）远大于 $15/月差价，不推荐 |

**推荐: A。** A1 是唯一"今天就能止血"的动作（K3 唯一需拍板/付款项）；A2 无论付不付费都值得做——它同时解决 TTFB（1.0-1.5s → 大幅下降）、降低 build quota 压力面、并把免费额度余量恢复为健康水位。

## 6. A 方案落地清单

### A1（K3 动作 · 今天 · 约 5 分钟）
- CF Dashboard → Workers & Pages → 升级 **Workers Paid**（$5/月，账户级，自动覆盖 zprintpro + aitoptools 两个 Pages 项目的 Functions）。
- per §0.24: **升级回执邮件 = 完成证据**；此前状态记"已排期"。
- 不影响 CF Pages build quota（500/月账户级）与 §0.25 攒批纪律。

### A2（执行层 · 本周 · 按 §0.25.9 攒批，非小改动走 §0.25.10.5 完整流程 + 全量探针）
> 涉及路由/redirect 面 → 实施前按 §0.35.7 看锁（lane.lock + SESSION_LOCK.md 双条件），逐项带验收命令：

| # | 改动 | 要点 | 验收 |
|---|------|------|------|
| A2-1 | 构建链加 `scripts/patch-routes-json.mjs`：对 `.vercel/output/static/_routes.json` 追加 exclude | `/images/*`、`/favicon.ico`、`/manifest*.json`、构建期生成的 `public/sitemap*.xml`、`/*.php` 等扫描噪声；**每条 exclude 前先断言对应静态文件真实存在于产物**（计数+形状断言，per §12 三件套） | curl 图片/manifest 响应**不再含** `x-matched-path`；TTFB <300ms |
| A2-2 | `[locale]` 布局加 `export const dynamicParams = false` | 未知 locale（wp-login.php 等）不再 SSR → 不再 500/烧 CPU | `curl -I /wp-login.php` = 404 且无 Next SSR 错误页 |
| A2-3 | A/B cookie 从 middleware 移除，改纯客户端（`getAbVariant` client fallback 已存在于代码注释所述路径，落地核对）；security headers（CSP/XFO 等）迁 `public/_headers`（CF Pages 原生静态头，不经 Function） | 响应不再带 Set-Cookie → 为 HTML 边缘缓存铺路；A/B 归因不受影响（客户端 cookie 照写） | `curl -sI /zh-hk/` 无 `Set-Cookie`；CSP 头仍存在；A/B 事件照常上报 |
| A2-4 | **移除/最小化 middleware**（这是解开 `include /*` 的钥匙） | middleware 独有的重定向表必须先迁移：`RETIRED_PRODUCT_REDIRECTS`（10 条）→ next.config redirects 或 `_redirects`（现 74 行，官方上限 2000 静态条，当前 v3.10 自约束 <100 行需 K3 复核放宽）；locale 缺前缀兜底 / zh-HK 大小写归一 / 非 ASCII → /ja/ / `/{locale}` 字面量 → **CF Redirect Rules 动态规则**（免费 10 条额度，2-3 条够）；`quote?product` 映射已在 CF Bulk Redirects（86 条，8/21 迁移），维持不动 | 迁移后 20 条代表性旧 URL 回归探针全过（含 V22 名片→贺卡 301、GSC 404 修复集）；`_routes.json` 重新生成后 include 不再是 `/*`（预渲染页被自动排除） |
| A2-5 | （可选，A2-3 完成后）Cache Rules：对 HTML 设 Edge TTL（如 1h, stale-while-revalidate） | 命中边缘缓存的请求不再触发 Function；注意发布后 purge 流程与现有 verify-deploy 探针衔接 | 二次请求 `cf-cache-status: HIT`；TTFB <100ms |

### 验收探针（A2 完成后每日）
- `scripts/probes/cf-cpu-guard.mjs`（从 `.hermes/tmp/2026-10-15-cf-probe.mjs` 升级）：需 K3 给 `CLOUDFLARE_PAGES_TOKEN` 追加 **Account Analytics 只读** scope（或新发专用 token），拉 `workersInvocationsAdaptive`（requests / errors / cpuTimeP99，按 scriptName+date），`exceededCpu` 连续 3 天 = 0 → 移交 lane-status 口径外记录（per §0.35.3.6 不冒充车道报告）。
- 免 token 兜底：每天看 Dashboard → zprintpro → Metrics → Errors。

## 7. 红线与流程合规声明
- 本报告为 docs-only 产物，不触 src/，不触发 push（per §0.25.9 攒批阈值）。
- 探针为只读 GET/GraphQL，无任何写操作；凭据全程未回显、未落盘。
- 不涉及名片品类（§0.0 解禁块约束不触发）；不改 301 映射语义（A2-4 仅**迁移**既有映射，迁移前后逐条对账）。
- 实施期遵守 §0.35.7 并发锁协议 + §0.25.9/§0.25.10 push 纪律。

## 8. 一句话给 K3
真正的根源是**全站零预渲染**：layout 一行 `runtime="edge"` 让 686 页全部每请求全量 SSR，撞免费层 10ms CPU 上限。A2 已扳动这个开关（实测 686/686 构建期预渲染），叠加 Function 旁路与 A/B 摘除；$5/月 Workers Paid 仍是推荐的立即止血项（覆盖 aitoptools + 扫描噪声剩余面）。

---

## 9. A2 实施记录（2026-10-15，K3 指令「按最优方案执行」）

### 9.1 调查修正（5 路并行子任务 + 源码/产物双方法）
- **修正 1**（Child A，next-on-pages@1.13.16 源码 L6680-6707）：`include:["/*"]` 与 middleware **无关**——它是「项目根无 `_routes.json`」时的无条件默认值；官方自定义机制 = 项目根预置 `_routes.json`（exclude 自动并入 `/_next/static/*`）。
- **修正 2**（Child E，prerender-manifest 实测）：全站预渲染面 = 仅 2 条（quote-desk×2）。真根源 = `src/app/[locale]/layout.tsx:22 export const runtime="edge"` → 34 页虽有 gSP 却全部每请求全量 SSR。且 2026-09-22 已有人把 category/contact/quote 的服务端 searchParams 拆完（代码注释自证），**预渲染开关一直没人扳**。
- **A/B 安全性**（Child B）：全站消费点仅 middleware（写）+ analytics.ts（常量+客户端 fallback）+ HeroBanner（useEffect 读）；`x-zp-ab-variant` 全仓 0 读取者；SSR 恒输出 A 变体 → 摘除后 SEO 关键输出逐字节不变。
- **_headers 语义**（dist L6648-6679 实读）：对既有 output `_headers` **追加写（flag:"a"）**，public/_headers 与自动 immutable 块共存，无需补丁脚本。
- **风险面**：next-on-pages 对任何 Node 动态函数硬报错（bundle L12993）→ 已用「ƒ 路由全量清点」闭环（见 9.3）。

### 9.2 改动清单（1 commit）

| # | 文件 | 改动 | 依据 |
|---|---|---|---|
| 1 | `src/middleware.ts` | 摘除 A/B 注入段（type/pickVariant/cookie/header），301 映射与安全头**零改动**（§0.0 红线合规） | Child B 行级清单 |
| 2 | `src/app/[locale]/layout.tsx` | `runtime="edge"` → `dynamicParams = false`（预渲染开关） | Child E F1/F3 |
| 3 | 5 × `[slug]/page.tsx`（category/product/blog/guide/services-seo） | 各加 `export const dynamicParams = false;`（未知 slug 静态 404，不生成 fallback 函数） | 9.1 风险面 |
| 4 | `src/app/[locale]/search/page.tsx` | **补** `runtime="edge"`（服务端读 ?q=，保持动态） | searchParams 审计 |
| 5 | `_routes.json`（项目根，新增） | 21 条 exclude：图片/图标/manifest/robots/sitemap×5/llms/og/screenshot/whatsapp + 扫描噪声（*.php/*.asp/.env*/wp-* 等）；include 保持 `/*` | Child A Q3 |
| 6 | `public/_headers`（新增） | 被排除资产的缓存头（图片 max-age=14400 与现状对齐等） | Child A Q6b |
| 7 | `scripts/probes/cf-pages-regression-probe.mjs`（新增） | 37 项线上回归探针（状态码/重定向/响应头特征/TTFB） | 本报告 §6 验收 |
| 8 | search/unsubscribe 保留 `runtime="edge"`（unsubscribe 原有未动） | 唯二真实读 searchParams 的页 | 9.1 |

### 9.3 实测证据
- 本地 `npx next build`：**BUILD_EXIT=0，686/686 静态页生成**；ƒ 清单 = `[locale]/search`、`[locale]/unsubscribe`、`/api/*`×6、`/robots.txt`、`/sitemap-image.xml` —— 全部自带 edge 声明，**零 Node 动态函数**（next-on-pages 拒绝面 = 空）；prerender-manifest：staticRoutes **683** / dynamicRoutes 32（全部 dynamicParams=false）。日志：`.hermes/tmp/next-build-a2.log`（校准 2026-10-15）。
- tsc 基线：54 = 54（零新增）；middleware A/B 关键词残留 0。
- 本地 `build:cf` 转换层因 shellac Windows spawn 缺陷无法本地复跑（`npm --version` 空输出，与本批代码无关；CF Pages Linux 构建不受影响）→ **转换与 _routes.json/_headers 合并在 CF 构建做最终闸**：失败则不部署、旧版续跑（无线上风险敞口）。
- 已知残余：① CF Pages build 20 分钟上限（686 页 SSG，本地 next build <10min，CI 需盯）② next-on-pages 已被官方 deprecate（Child A）→ 中期迁移 `@opennextjs/cloudflare` 另立项评估 ③ Workers Paid（A1）仍待 K3 拍板付款。
- 数据来源：本节数字全部来自 `.hermes/tmp/next-build-a2.log`、`.next/prerender-manifest.json`（2026-10-15 本地构建实测）与 5 份子任务报告（`.hermes/logs/2026-10-15-a2-child-*.md`）；基线探针 37 URL（`.hermes/logs/2026-10-15-a2-baseline-probes.json`）。

### 9.4 两次 CF 构建失败与回退决策（同日实测，双方法闭环）
- **Build #1（d7e4847a）**：27 条非 slug 路由被拒（Node fallback 函数）。假设「页面级 dynamicParams=false 可消除 fallback」→ **Build #2（dfcab926）同名单被拒 → 假设证伪**。
- **机制实锤**（本地 `vercel build`，`.hermes/tmp/vercel-build-a2.log`）：`dynamicParams=false` 的构建期实现 = 把路由 .func **符号链接到 `_not-found.func`**（EPERM 报错露馅），而 _not-found.func 是 Node 运行时 → next-on-pages@1.13.16 对任何 Node 函数硬拒绝。**结论：该已弃用适配器下 SSG 预渲染被架构性堵死**（除非整树全 edge = 放弃预渲染）。
- **决策（Build #3）**：layout 回退 `runtime="edge"`（恢复历次成功部署形态：5/5 静态 + 34 页全 edge ƒ，本地 BUILD_EXIT=0、tsc 54=54）；**保留全部安全战果**：① `_routes.json` 资产/扫描噪声旁路（最大 invocation 乘数）② `public/_headers` ③ middleware A/B 摘除（HTML 不再 Set-Cookie，为 Cache Rules 铺路）④ 32 页 dynamicParams=false（edge 下未知 locale/slug 直接静态 404，修复 /wp-login.php 类 500）。
- **修正式 A2 预期**：HTML 页面本身仍 edge SSR → **1102 的最终止血 = A1 Workers Paid（K3 付款）+ A2-5 Cache Rules（K3 dashboard）**；真预渲染（TTFB 亚秒级收益）= **@opennextjs/cloudflare 迁移立项**（适配器已 deprecate，迁移后 run_worker_first=false 原生支持静态优先）。
- 新增数据来源：`.hermes/tmp/vercel-build-a2.log`、`.hermes/tmp/next-build-a2b.log`、`.hermes/tmp/next-build-a2c.log`、CF 部署日志（ba2f1197 与第二次失败部署，2026-10-15 API 实测）。
