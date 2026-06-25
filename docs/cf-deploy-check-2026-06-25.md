# CF Pages Deploy Check — 2026-06-25

**Commit**: `3660478 fix: blog 数据源清理 + 支付/订单/checkout 多项修复`
**Push time**: 2026-06-25 03:02 +08
**Check time**: 2026-06-25 03:10 +08 (8 min after push)
**Cron**: `cf-deploy-check-zprintpro-payment-2026-06-25`

## Verdict: ✅ PASS (with one expectation-correction)

CF Pages auto-deploy completed successfully. All 4 blog/list URLs serve **200** with valid HTML content (3xx redirects followed via `-L`).

## URL Results (curl -sL -w '%{http_code} → %{url_effective}')

| URL | Final | Final Path | Hops |
|---|---|---|---|
| `/zh-hk/guide/business-card-buying-guide` | 200 | `/zh-hk/blog/business-card-buying-guide/` | 3 |
| `/en/guide/business-card-buying-guide` | 200 | `/en/blog/business-card-buying-guide/` | 3 |
| `/ja/guide/business-card-buying-guide` | 200 | `/ja/blog/business-card-buying-guide/` | 3 |
| `/zh-hk/guide/` (list) | 200 | `/zh-hk/blog/` (list) | 2 |
| `/zh-hk/blog/company-intro` (the "dead slug" test) | **200** | `/zh-hk/blog/company-intro/` | 1 |

## ⚠️ 预期偏差：company-intro 不是死链

**原本预期**：curl `/zh-hk/blog/company-intro` 应返回 404（之前 11 个硬编码死 slug 之一）。
**实际情况**：返回 200 + 完整真实文章页面。

**真相**：
- `company-intro` 是真实博客文章，定义在 `src/app/[locale]/blog/[slug]/page.tsx` 第 398-411 行
- 三语种完整内容：智印雲公司介绍、8,000平方米厂房、海德堡6+1、HP數碼、馬天尼膠裝线
- 它**不在** BlogContent.tsx 原本硬编码的死 slug 数组里（那是另一类文章）
- Header / Footer / breadcrumb-names / company-news 页面都引用它为合法链接

**结论**：原预期基于误判。该 URL 工作正常。

## BlogContent.tsx 修复验证 ✅

修复前 vs 修复后：
- ❌ 修复前：BlogContent.tsx 硬编码 11 个 slug 数组
- ✅ 修复后：`import { buyingGuides } from '@/data/buying-guides'` 单一数据源

`buying-guides.ts` 数据源核查：
- 9 个选购指南全部正常：`business-card-buying-guide` / `sticker-buying-guide` / `flyer-buying-guide` / `packaging-buying-guide` / `poster-buying-guide` / `paper-bag-buying-guide` / `banner-buying-guide` / `book-buying-guide` / `menu-buying-guide`
- 文件路径：`src/data/buying-guides.ts`（连字符，不是驼峰）
- 运行时通过 `/zh-hk/guide/` 列表页验证可见

## 技术细节

- curl 在 Windows + Clash proxy (`http://127.0.0.1:7892`) 环境下需要用 `curl.exe`（PowerShell 别名是 `Invoke-WebRequest`）
- `-I` (HEAD) + `-w '%{http_code}'` 在 proxy 下输出异常（返回 000），改用 GET + `-L` 跟随重定向
- 重定向链：`/guide/[slug]` (无 /) → `/guide/[slug]/` (加 /) → `/blog/[slug]/` (Next.js alias) → 200

## Action: ✅ Cloudflare Pages 部署成功，无需用户介入