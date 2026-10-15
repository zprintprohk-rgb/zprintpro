# A2-Child-A 调查报告：@cloudflare/next-on-pages `_routes.json` 生成机制

- 日期：2026-10-15（周四）
- 调查对象：`F:\zprintpro-nextjs\node_modules\@cloudflare\next-on-pages`（实测 package.json version = **1.13.16**）
- 方法：只读调查。Node fs 脚本（`.hermes/tmp/scan1-7.js`、`extract1-3.js`）解析 dist bundle（457,316 B，无 sourcemap）+ GitHub 上游同 tag 源码对照 + Cloudflare 官方文档原文。全程未改 src/、未 commit/push、未触碰任何禁区路径。
- 证据分级：一手代码（本地 bundle 行号 + 上游同版本 TS 源码）> 官方文档（URL+原文）> 搜索摘要（仅线索）。

数据来源:
- `node_modules/@cloudflare/next-on-pages/dist/index.js`（esbuild bundle，保留 `// src/...` 文件标记，函数名未混淆）
- GitHub 上游 `cloudflare/next-on-pages`，tag `@cloudflare/next-on-pages@1.13.16`（发布于 2025-09-04）源码
- `.vercel/output/`（本地实存产物，_routes.json mtime 2026-06-27T13:35:43Z）
- Cloudflare 官方文档 routing / headers 两页（页面 + cloudflare-docs repo 源 mdx 双取）

---

## 1. 结论摘要（置信：确定——六问全部一手代码或官方文档原文闭合）

1. **1.13.16 的 `_routes.json` 生成逻辑完全不检测 middleware**。`include:["/*"]` 是「项目根目录无 `_routes.json`（或其 include 为空）」时的**无条件默认值**，与 src/middleware.ts 是否存在无关。middleware 的真实作用是**运行时**的：它使页面请求必须进 worker 执行，但不参与 `_routes.json` 的生成决策。
2. 该版本**不生成任何基于预渲染路由的 exclude**，exclude 恒为 `/_next/static/*` ∪（项目根自定义 exclude）；源码中**没有 100 上限常量**（bundle 全文 `MAXIMUM|MAX_ROUTES|maximum.?routes` 0 命中），超限 fallback 不存在——因为根本没有逐路由生成逻辑。100 上限只是 Cloudflare **平台**限制。
3. CLI **无**自定义 `_routes.json` 的 flag；官方机制 = **在项目根目录预置 `_routes.json`**（version 必须 1），构建时被读取合并。上游源码注释原文即写明这一点。
4. `next.config` 的 `async headers()` **被支持，且分两层**：`/_next/static/*` 的头在构建期落成 `_headers` 文件（平台层、请求不进 worker）；其余路径的头保留在 vercel config routes，由 worker 运行时 `applyRouteHeaders` 应用（仅对进 worker 的请求生效）。
5. 本地 `.vercel/output/static` **没有任何 zh-hk 预渲染 HTML**（zh-hk 文件数 = 0，index.html = 0）：页面全部 SSR，仅根级 `404.html`（5,945 B）与 `500.html` 两个页面级 HTML；不存在 `404/index.html`。当前线上 `include:["/*"]` 与「无预渲染页面」互为印证——没有可被 exclude 的静态页面。
6. 官方文档确认：include/exclude 合计 **≤100 条**、每条 ≤100 字符、至少 1 条 include；`*` 通配**跨 `/` 匹配任意多层路径段**；`_headers` 规则**只应用于静态资产响应**（"applied to static asset responses"），对 Functions/worker 响应不适用。

---

## 2. 六问逐答

### Q1. middleware 存在时是否必然 include=['/*']？

**否——因果链要修正：不是 middleware 触发 include=['/*']，而是「无自定义文件时的默认值」恰好是 ['/*']。1.13.16 源码中不存在任何 middleware 分支。**

生成逻辑位于 `src/buildApplication/buildMetadataFiles.ts`（bundle 中 `// src/buildApplication/buildMetadataFiles.ts` 标记 L6639，函数体 L6680-6707），上游同 tag 源码逐行一致：

```ts
// 上游 buildMetadataFiles.ts（tag @cloudflare/next-on-pages@1.13.16），对应 bundle L6680-6707
const existingFile = await readJsonFile<RoutesJsonFile>('_routes.json');
if (existingFile && existingFile.version !== 1) { cliError(`Found _routes.json with version ${...}, but only version 1 is supported.`); process.exit(1); }
const { include = [], exclude = [] } = existingFile ?? {};
const includeEntries = include.length > 0 ? include : ['/*'];
const excludeEntries = new Set([`${nextStaticPath}/*`, ...exclude]);
```

证据链：
- bundle `dist/index.js` **全文仅 4 处** `_routes.json`（读 L6682 / version 校验 L6685 / 写 L6694 / staticAssets 过滤豁免 L6727），无其他生成路径；bundle 全文 `run_worker_first|worker-first|workerFirst` **0 命中**，`generateRoutesJson` 标识符 0 命中（该版本函数名为 `buildRoutes`）。
- `readJsonFile`（`src/utils/fs.ts`，bundle L5867-5876）= `readFile(path, 'utf8')` 相对 **process.cwd()**（bundle 全文 `process.chdir` 0 命中，CLI 必须在项目根运行）→ 读取的是**项目根** `F:\zprintpro-nextjs\_routes.json`，不是 output 目录。实测项目根无此文件 → `existingFile = null` → include 取默认 `['/*']`。
- 上游源码注释（同函数 JSDoc）原文：*"Collects existing entries from the `_routes.json` file in the root of the project, if it exists."*
- 写入点 L6693-6701：写入 `<outputDir>/_routes.json`，固定带 `version: 1` + `description: "Built with @cloudflare/next-on-pages@<版本>."`。
- **本站实测**：`.vercel/output/static/_routes.json` = `{"version":1,"description":"Built with @cloudflare/next-on-pages@1.13.16.","include":["/*"],"exclude":["/_next/static/*"]}`（mtime 2026-06-27）——与该函数输出格式逐字段一致，exclude 仅 1 条说明构建时项目根无自定义文件。用户陈述的「当前为 {"include":["/*"],"exclude":["/_next/static/*"]}」漏了 version/description 两字段，以实测为准。

middleware 的**间接**角色（运行时，非生成时）：
- `src/middleware.ts` L309-313：`export const config = { matcher: ['/((?!_next|api|images|favicon.ico|robots.txt|sitemap|manifest.json).*)'] }` —— 覆盖所有页面路径。
- 本地 `.vercel/output/config.json` 实测 125 条 routes，其中 **1 条 middleware route**（src 正则含同样的排除词表，`x-middleware-override-headers` 处理链），证明 middleware 已编译进 vercel 路由配置，必须由 `_worker.js` 执行。
- 推论：middleware 存在时**不应**在自定义 exclude 中排除页面路径（会导致 middleware 跳过），但这是运营约束，不是 1.13.16 代码强制。

### Q2. 无 middleware、>100 条预渲染路由时 exclude 形状？有无 100 上限常量？超限 fallback？

**exclude 与预渲染路由完全无关**：1.13.16 不读取预渲染路由清单来生成 exclude（`prerendered` 相关代码仅用于汇总表与 staticAssets 过滤，bundle L6833-6927，不触碰 _routes.json）。无论多少预渲染路由，exclude 恒为：

```json
["/_next/static/*"]  // + 项目根自定义 _routes.json 的 exclude 并集（Set 去重）
```

- 上限常量：bundle 全文正则 `MAXIMUM|MAX_ROUTES|maximum.?routes` **0 命中**；上游同 tag 源码同构。**不存在** per-route 生成逻辑，因此也不存在「超限 fallback」。
- 「100」在 Cloudflare 是**平台限制**（见 Q6a 文档原文：include/exclude 合计 ≤100 条，每条 ≤100 字符）。若走 Q3 的自定义路线为每个预渲染页面加 exclude，超过 ~98 条（合计含 include 与 `/_next/static/*`）即触碰平台上限——文档只列出 limits，未写超限处置行为（见待证项）。
- **本项目实测前提不成立**：`.vercel/output/static` 无任何 zh-hk 预渲染 HTML（见 Q5），全部页面为 SSR，本就不存在「预渲染路由 exclude」的素材。

### Q3. CLI 是否支持自定义 _routes.json？

**无 CLI flag。官方机制 = 项目根目录预置 `_routes.json`。**

- CLI 选项全列表（bundle L6126-6158，commander 定义）：`-e, --experimental-minify`（hideHelp，且 L13210-13216 检测到时输出废弃警告"deprecated and doesn't produce any effect"）、no-dedup（调试）、no-minify（调试）、`-w, --watch`、`-c, --no-color`、`-v, --version`、help。**`custom-routes|customRoutes` 全文 0 命中**。
- 自定义用法（代码级）：
  1. 在项目根（`F:\zprintpro-nextjs\_routes.json`，即 next-on-pages 的 cwd）放置 `{"version":1,"include":[...],"exclude":[...]}`；
  2. version ≠ 1 → `process.exit(1)` 构建失败（bundle L6683-6688）；
  3. include 非空 → 原样采用；include 空缺 → 默认 `["/*"]`；
  4. exclude 自动并入 `/_next/static/*`（Set 去重）；
  5. 合并结果写入 `.vercel/output/static/_routes.json`（带 version+description）。
- 文档化程度：包内 `README.md`（138 行）对 `_routes` / `_headers` / custom routes **0 命中**——该机制仅存在于源码注释，未写入包 README。

### Q4. next.config 的 async headers() 是否被支持？

**支持，分两层：**

1. **平台层（不进 worker）**：`buildNextStaticHeaders`（bundle L6648-6679；上游同源码）读取 `.vercel/output/config.json` routes 的 hit phase 中 `src` 以 `/_next/static` 开头的 route，把其 headers 追加写入 `<outputDir>/_headers`（上游 JSDoc："Builds the `_headers` file, which is used by Cloudflare to determine which headers to add to responses"）。本站实测 `_headers`（214 B）即该函数产物：`/_next/static/* → cache-control: public,max-age=31536000,immutable`（AUTOGENERATED IMMUTABLE HEADERS 块）。
2. **Worker 运行时层**：其余路径的 headers() 规则保留在 vercel config routes，由 `_worker.js` 的 `RoutesMatcher.applyRouteHeaders` 应用——`templates/_worker.js/routes-matcher.ts` L288-295：`private applyRouteHeaders(...){ if (!route.headers) return; applyHeaders(this.headers.normal, route.headers, {...}); applyHeaders(this.headers.important, ...); }`；调用点 L511-512。构造函数注释明示 routes 来源 = "Processed routes from the Vercel build output config"。**仅对进入 worker 的请求生效**（被 `_routes.json` exclude 的静态请求不进 worker，由平台 `_headers` 接管——见 Q6b）。
- 本站 config.json 实测：125 条 routes 中 **20 条**带 `headers` 字段，抽样均为 308 重定向的 `Location` 头（含 `zh-hk/guide → /zh-hk/blog` 等），未见用户自定义缓存头规则。

### Q5. `.vercel/output/static` 预渲染 HTML 存储形态（实测）

- 顶层条目：`404.html, 404.rsc.json, 500.html, cdn-cgi/, icon-*.png, images/, llms.txt, manifest*.json, og-image.jpg, screenshot-*.png, sitemap.xml, _app.rsc.json, _document.rsc.json, _error.rsc.json, _headers, _next/, _redirects, _routes.json, _worker.js/, __next_data_catchall.json`
- 页面级 HTML 统计（Node 递归 ≤4 层，总条目 2,146）：根级 `.html` = **2**（`404.html` 5,945 B、`500.html`）；嵌套 `.html` = 1（`cdn-cgi/errors/no-nodejs_compat.html`）；`index.html` = **0**。
- **zh-hk 文件数 = 0**：不存在 `zh-hk/index.html`、`zh-hk/404.html`、`zh-hk/404/index.html`（逐一 exists 探测均 false）。`404/index.html` 亦不存在（只有根级 `404.html`）。
- 含义：本站构建产物中**没有任何页面级预渲染 HTML**（页面全 SSR，由 `_worker.js` 渲染）——这既是线上 `include:["/*"]` 的合理现状，也意味着「通过 exclude 预渲染页面省 Workers 计费」在本项目当前形态下无素材可用。

### Q6. 官方文档原文

**(a) `_routes.json` 规则上限与通配语义** — https://developers.cloudflare.com/pages/functions/routing/ （另取 cloudflare-docs repo 源 `src/content/docs/pages/functions/routing.mdx` 交叉核对）：

> "Functions invocation routes have the following limits: You must have at least one include rule. You may have no more than **100 include/exclude rules combined**. Each rule may have no more than **100 characters**."

> "**exclude** always take priority over **include**."

> "Wildcards match **any number of path segments (slashes)**. For example, `/users/*` will match everything after the `/users/` path." —— **`*` 跨 `/`**，`/foo/*` 匹配任意深度子路径。

（注：首次抓取渲染页时通配句未在正文中出现、仅见于搜索摘要；第二轮从 docs repo 源 mdx 取得原文，两源一致后采信。）

**(b) `_headers` 作用域** — https://developers.cloudflare.com/pages/configuration/headers/ ：

> "creating a plain text file called `_headers` ... will instead be parsed by Cloudflare Pages and its rules will be **applied to static asset responses**."

> "Headers defined in the `_headers` file override what Cloudflare ordinarily sends." ＋ "redirects are applied before headers, so when a request matches both a redirect and a header, the redirect takes priority."

即 `_headers` 只作用于**静态资产响应**；文档未赋予其对 Functions/worker 响应的效力。对本站含义：被 `include:["/*"]` 送进 worker 的所有请求（含 SSR 页面），其响应头由 worker 自身（Q4 第 2 层）而非 `_headers` 决定。

---

## 3. 对架构决策的含义（供 A2 汇总，非本报告职责）

1. **计费现状**：`include:["/*"]` + exclude 仅 `/_next/static/*` ⇒ 除 `_next/static` 静态资产外的**每一个请求**（全部页面 HTML、图片外的 public 资产、api）都产生一次 Workers 请求。由于页面全 SSR 且 middleware matcher 覆盖所有页面路径，页面请求本来就必须进 worker——当前 `_routes.json` 已是该架构下的**最优形状**，不存在「middleware 决策失误」。
2. **可省路径 A（渐进）**：预渲染部分页面 + 项目根 `_routes.json` 为其加 exclude（受 100 条组合上限约束；middleware matcher 需同步排除这些路径，否则行为不一致）。
3. **可省路径 B（换架构）**：`@cloudflare/next-on-pages` 已被官方弃用——GitHub release `@cloudflare/next-on-pages@1.13.16`（2025-09-04）changelog 原文："**Deprecate package and pin `next` and `vercel` peer dependencies**"。后续路线应评估 `@opennextjs/cloudflare`（其自身带路由静态化机制，详见待证项）。

## 4. 待证项

1. `@vercel/next` builder 是否会在 `.vercel/output/static` 预生成 `_routes.json`：web_search 0 结果，未定。**不影响本报告结论**（buildRoutes 只读项目根、且以覆盖方式写 output 文件）。建议查 vercel/vercel repo `packages/next/src/build.ts`。
2. 平台对「include/exclude 合计 >100」的处置（拒绝部署 / 截断 / 忽略）：官方文档只列 limits 未写行为。
3. 本地 `.vercel/output` 为 2026-06-27 产物，与当前线上部署版本存在时间差；线上 `_routes.json` 是否同形建议 curl 线上核实。
4. `@opennextjs/cloudflare` 的 `_routes.json` 生成与 middleware 处理机制（若评估迁移路径 B 时需单独调查）。

## 5. 关键证据索引（速查）

| # | 事实 | 位置 |
|---|------|------|
| 1 | buildRoutes 源码（include 默认 `['/*']`、无 middleware 分支） | `dist/index.js` L6680-6707；上游 `packages/next-on-pages/src/buildApplication/buildMetadataFiles.ts`（tag `@cloudflare/next-on-pages@1.13.16`） |
| 2 | readJsonFile = cwd 相对读取 | `dist/index.js` L5867-5876（src/utils/fs.ts） |
| 3 | 项目根无 `_routes.json`；output 实测含 version+description | `F:\zprintpro-nextjs\_routes.json`（不存在）；`.vercel/output/static/_routes.json`（mtime 2026-06-27，122 B） |
| 4 | CLI 无 custom-routes flag、`-e` 已废弃 | `dist/index.js` L6126-6158、L13210-13216 |
| 5 | /_next/static → `_headers`（immutable） | `dist/index.js` L6648-6679；`.vercel/output/static/_headers`（214 B 实测） |
| 6 | worker 运行时应用 route.headers | `templates/_worker.js/routes-matcher.ts` L288-301、L511-512 |
| 7 | zh-hk 预渲染 HTML = 0；404.html 根级存在 | Node 递归统计 `.vercel/output/static`（本报告 Q5 节） |
| 8 | 100 条组合上限 / 每条 ≤100 字符 / `*` 跨段 / exclude 优先 | https://developers.cloudflare.com/pages/functions/routing/ ＋ cloudflare-docs 源 mdx |
| 9 | `_headers` 仅静态资产响应 | https://developers.cloudflare.com/pages/configuration/headers/ |
| 10 | next-on-pages 已 Deprecate | https://github.com/cloudflare/next-on-pages/releases/tag/%40cloudflare%2Fnext-on-pages%401.13.16 |

（报告完 · 全程只读，未修改 src/，未执行任何 git 写操作）
