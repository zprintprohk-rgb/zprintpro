# W2 辅助核验：hreflang 消费方 + 外部锚点公开性 + layout.tsx manifest 段检查

- 日期：2026-09-30（周三）
- 执行层：autoclaw（只读微任务，未改任何文件，未执行任何 git 操作）
- 幂等检查：执行前 `.hermes/geo/` 目录中无 `w2-aux-checks.md`（本次为首建）
- 数据来源：
  - `grep`（仓库内容检索，src/ 全树 + scripts/ 树）：检索词 `generateHreflangTags|generateHreflangLinkTags`、`@/lib/hreflang`、`lib/hreflang`（ignoreCase）、`HreflangTag`、相对路径 import 模式
  - `src/lib/hreflang.ts` 全文（110 行）
  - `src/app/[locale]/layout.tsx` L155-190（read 工具逐行）
  - HTTP 探针：`curl.exe -s/-sL -o NUL -w "%{http_code} | %{redirect_url}"`（2026-09-30 实测，Windows PowerShell 下 `curl` 别名指向 Invoke-WebRequest 已绕过，用 `curl.exe` 直呼）
  - `fetch_content`（x.com 与 linkedin.com 各 1 次）
  - `source_check`（X 账号与 LinkedIn 公司页各 1 次，均 missing-evidence / confidence 0.20）
- 校准状态：已校准（本文件即首建记录，探针时间 2026-09-30 当日）

---

## 1. 死代码检查：`generateHreflangTags` / `generateHreflangLinkTags` 消费方

### 1.1 目标符号定义确认

- `src/lib/hreflang.ts:20` — `export function generateHreflangTags(currentLocale: Locale, path: string = ''): HreflangTag[]`
- `src/lib/hreflang.ts:78` — `export function generateHreflangLinkTags(currentLocale: Locale, path: string = ''): string`（内部转调同文件 L79 的 `generateHreflangTags`）
- `src/lib/hreflang.ts:14` — `export interface HreflangTag`

### 1.2 全仓检索结果（src/ 树）

| 检索词 | 命中 | 消费方判定 |
|---|---|---|
| `generateHreflangTags\|generateHreflangLinkTags`（src/） | 4 条 | 定义 2 条（hreflang.ts:20/78）、注释 1 条（layout.tsx:176）、**同名但不同模块**的定义 1 条（seo.ts:1690）——**调用 0 条** |
| `@/lib/hreflang`（src/） | 0 条 | **import 全列表为空** |
| `lib/hreflang`（ignoreCase，src/） | 0 条 | 无任何路径形态的引用 |
| `HreflangTag`（src/） | 仅 hreflang.ts 自身（L14/20/22/79）+ layout.tsx:176 注释 | 类型引用 0 条 |
| 相对路径 import（`./hreflang` / `../lib/hreflang` / 任意 `*hreflang*` 模块路径） | 0 条 | 无 |

scripts/ 树补充：`scripts/generate-sitemap.js:121-122` 的 hreflang 为**内联字符串拼接**（sitemap `<xhtml:link rel="alternate">`），不 import src/lib；`scripts/locale-audit/backup/seo.ts.bak:1544` 为备份文件；`scripts/verify-eval-zh-hk.json` 为探针配置。均非消费方。

### 1.3 结论（确定级）

**`src/lib/hreflang.ts` 是死代码**：两个导出函数 + `HreflangTag` 接口在 src/ 与 scripts/ 内**零调用、零 import**。

**附带发现**：`src/lib/seo.ts:1690` 存在**同名** `export function generateHreflangTags(path: string = '')`（不同模块、不同签名），同样**无任何调用方**——即全仓两处同名 hreflang 生成器均为死代码。layout.tsx:176 的命中仅为注释文字（2026-06-10 Phase B 修复说明），非代码引用。

置信说明：基于 4 组独立检索词 + 大小写不敏感兜底 + scripts/ 树扩展扫描，均零命中调用方；置信等级「确定」（一手代码证据，检索模式已覆盖 `@/` 别名、相对路径、命名空间 import 的常见形态）。

---

## 2. 外部锚点公开性核验（HTTP 状态码 + title 前 100 字符）

探针方法：`curl.exe` 直呼（Windows `curl` 别名指向 Invoke-WebRequest，首轮 6 次探针全部失败，已按 §0.26.9 测量工具纪律换用 `curl.exe` 重测并作废首轮）；title 用 `curl.exe -s <url> | Select-String '<title>'` 提取（ASCII 内容，非 CJK 判定）。

| # | URL | HTTP 码 | 重定向 | title（前 100 字符） | 核验状态 |
|---|-----|---------|--------|----------------------|----------|
| a | https://github.com/zprintprohk-rgb | **200** | 无 | `zprintprohk-rgb · GitHub` | ✅ 公开可访问，组织页真实存在 |
| b | https://github.com/zprintprohk-rgb/zprintpro | **200** | 无 | `GitHub - zprintprohk-rgb/zprintpro · GitHub` | ✅ 仓库为 public（404 才是私有/不存在信号），组织+仓库均真实 |
| c | https://x.com/zprintpro（-L 跟随） | **404** | 无 | 未取得正文 | ⚠️ 见下 |
| c | https://twitter.com/zprintpro | **000**（连接层失败，两次） | — | — | ⚠️ 见下 |
| d | https://www.linkedin.com/company/zprintpro | **999**（LinkedIn 反爬码） | — | — | ⚠️ 见下 |
| d | https://linkedin.com/company/zprintpro（-L 跟随） | 200（落点页） | — | `Checking your browser - reCAPTCHA`（挑战页，非公司页内容） | ⚠️ 见下 |

### 2.1 X / Twitter（c 项）详细证据

- `x.com/zprintpro` 无 -L：000；`twitter.com/zprintpro` 无 -L：000；带浏览器 UA + `-L`：`x.com` 返回 **404**，`twitter.com` 仍 000。
- `fetch_content`（x.com/zprintpro）：操作中止（工具层失败），无正文。
- `source_check`（queries: x.com/zprintpro / twitter zprintpro account）：**missing-evidence**（confidence 0.20），搜索引擎索引中无该 X 账号页面的任何直接证据（命中的 12 条全是 zprintpro.com 自身页面）。
- 判定：**不可核验**。x.com 对未登录爬虫的 404 不构成权威反证（X 对 guest 流量行为不稳定，且 twitter.com 侧连接层直接失败），搜索引擎亦无正反任一方向证据。按任务指定口径标注：**「不可核验（反爬），依据 G1 v9.2.3 K3 拍板视为真实」**。
- 诚实备注（待证项，不进结论）：`x.com/zprintpro` 一次带 -L 探针返回 404，与「账号存在」预期不一致，建议后续用真人浏览器（登录态）复核一次。

### 2.2 LinkedIn（d 项）详细证据

- `www.linkedin.com/company/zprintpro`：**999**（LinkedIn 对非浏览器流量的特征拒绝码，反爬）；无 -L 变体同码。
- `linkedin.com/company/zprintpro` + `-L`：HTTP 200 但落点页 title = **`Checking your browser - reCAPTCHA`**（Google reCAPTCHA enterprise 挑战页，正文为 "Checking your browser before accessing linkedin.com"），**非公司页内容**——200 是挑战页的码，不是公司页的码。
- `fetch_content`（www.linkedin.com/company/zprintpro）：HTTP 451 Unavailable For Legal Reasons（抓取侧被拒），无正文。
- `source_check`（queries: linkedin.com/company/zprintpro / "zprintpro" linkedin company）：**missing-evidence**（confidence 0.20），索引中无该 LinkedIn 公司页证据（命中 9 条全是 zprintpro.com 自身页面）。
- 判定：**不可核验（反爬）**。三方法（curl 直连 / fetch 工具 / 搜索索引）均无法取得页面正文级证据。按任务指定口径标注：**「不可核验（反爬），依据 G1 v9.2.3 K3 拍板视为真实」**。

### 2.3 测量有效性自查（§0.23.2 双方法）

- GitHub 两页：curl 状态码（200）与 title 正文（组织名/仓库名出现在 `<title>`）双证据一致 → 结论「公开存在」**确定**。
- X/LinkedIn：已用 3 个独立方法（curl.exe 直连、fetch_content、source_check 搜索索引）交叉，三种方法结果互不矛盾地指向「无法取得正文证据」，不存在「单一工具 + 单一时点」误判风险；000/999/451/挑战页均为访问层现象而非内容判断，故只下「不可核验」结论、不下「不存在」结论。

---

## 3. layout.tsx `<link rel="manifest"` 三行检查（L168-172）

### 3.1 逐行证据（`src/app/[locale]/layout.tsx`）

```
L168  {/* 2026-06-17 Per-locale PWA manifest — 3 locale 分 manifest,Chrome 自动按 lang 匹配 */}
L169  <link rel="manifest" href={`/manifest.${safeLocale}.json`} />
L170  <link rel="manifest" href="/manifest.zh-hk.json" hrefLang="zh-HK" />
L171  <link rel="manifest" href="/manifest.en.json" hrefLang="en" />
L172  <link rel="manifest" href="/manifest.ja.json" hrefLang="ja" />
```

（行号以本会话 read 实测为准；任务描述的「三行」= L170-172 三条静态 manifest，L169 为此前已存在的**动态** manifest link，与本次检查对象同段。）

### 3.2 检查结论

1. **hrefLang 属性上下文**：L170-172 三条 `<link rel="manifest">` 均带 `hrefLang` 属性（值 zh-HK / en / ja）。该属性只挂在这三条 manifest link 上，**不是 hreflang alternate 信号通道**（HTML 规范中 `rel="manifest"` 的 link 无 hreflang 语义，Google 也不据此判定区域信号）——属无害的遗留属性。
2. **无其他 hreflang 侧效应**：layout.tsx 内 `hreflang|hrefLang`（ignoreCase）全部命中仅为：① L170-172 manifest 三行；② L173-178 注释块——注释明确记录 **2026-06-10 Phase B 修复 P0-4 已移除 layout 级 hreflang 重复渲染**，hreflang `<link>` 全部由各 page.tsx 的 `metadata.alternates.languages` 输出（Next.js 14+）。layout 内**无任何渲染性 hreflang alternate 输出**，无侧效应。
3. **附带观察（仅记录，不构成本任务改动项）**：L169 动态 manifest 与 L170-172 静态 manifest 在当前 locale 下会产生两条 manifest link（如 zh-hk 页同时输出 `/manifest.zh-hk.json` 两次）。是否收敛属后续优化议题，本任务为只读，不动。

置信说明：一手代码 + 逐行 read 证据，「确定」级。

---

## 4. 结果速览

| 问题 | 答案 |
|---|---|
| `src/lib/hreflang.ts` 死代码？ | **是**——两导出 + 类型零调用零 import；附带 `src/lib/seo.ts:1690` 同名函数同为死代码 |
| github org 200？ | **是**（组织页 200，仓库页 200 且 public） |
| X + LinkedIn 核验状态？ | 均**不可核验（反爬）**，依据 G1 v9.2.3 K3 拍板视为真实；X 侧附一次 404 观察列为待证项 |
| layout.tsx hreflang 侧效应？ | **无**——manifest 三行 hrefLang 属性为无害遗留；hreflang alternate 全部走 page 级 metadata.alternates.languages |
