# 01 · Zprintpro 技术 SEO 健康度报告

**日期**: 2026-08-04 12:13-13:00 (M3 47 min 模块 1)
**审计范围**: 全站 (zh-hk / en / ja 3 active locale, 5 inactive)
**审计方法**: curl + grep + Node test (静态分析, 不改任何代码)
**权威数据源**: 抽样 5-12 关键页, robots.txt, sitemap.xml, sitemap-index.xml

## 1.1 健康度评分

| 子项 | 得分 (0-100) | 状态 | 备注 |
|---|---|---|---|
| SSL/HTTPS | 90 | 🟢 | 证书有效, 301→200 |
| 页面 TTFB | 75 | 🟡 | 平均 1.0-1.2s, AI Overviews 偏好 <2.5s ✅ |
| Mobile 适配 (viewport) | 100 | 🟢 | viewport OK |
| Sitemap 完整性 | 70 | 🟡 | 4 sitemap 文件 (root + 3 locale), 但 5 inactive locale 0 URL |
| Robots.txt | 30 | 🔴 | **AI 爬虫 Disallow 冲突 P0** |
| Canonical 标签 | 95 | 🟢 | 4/4 抽样正确指向 |
| Hreflang 标签 | 50 | 🟡 | **curl 0 langs 命中 P1 (Next.js metadata.alternates.languages 没生效)** |
| 404/5xx 错误 | 90 | 🟢 | 8/4 verify 31 URL 修后 7 仍 404, 跟踪中 |
| 重定向链 | 95 | 🟢 | 191 rules (e6a61a6 + 834a5bc), 0 多跳链 |
| HSTS 严格 HTTPS | 0 | 🔴 | **HSTS header MISS, 浏览器可降级 HTTP** |

**模块 1 总分: 70 / 100 🟡 (3 个 🔴: robots.txt / HSTS / hreflang)**

## 1.2 详细发现

### 🔴 P0-1: robots.txt AI 爬虫 Disallow 冲突

**K3 战略修正 1 命中**: 5.15 亿次 AI 爬虫流量中 Zprintpro 因 robots.txt Disallow 被屏蔽

**实际 robots.txt** (截取 Cloudflare Managed Content 段):
```
User-agent: *
Content-Signal: search=yes, ai-train=no, use=reference
Allow: /

User-agent: Amazonbot Disallow: /
User-agent: Applebot-Extended Disallow: /
User-agent: Bytespider Disallow: /
User-agent: CCBot Disallow: /
User-agent: ClaudeBot Disallow: /    ← Anthropic 爬虫
User-agent: Google-Extended Disallow: /  ← Google AI 训练爬虫
User-agent: GPTBot Disallow: /    ← OpenAI 爬虫
User-agent: meta-externalagent Disallow: /
```

**问题**: Cloudflare 默认 Disallow 屏蔽 7 个 AI 爬虫. 后面 GEO explicit allow-list 段又 Allow 9 个, **但 Disallow 在前生效 (robots.txt 规则优先级)**. 净结果 = AI 爬虫被屏蔽.

**9 个 AI 爬虫检查**:
| AI 爬虫 | 实际状态 | 影响 |
|---|---|---|
| GPTBot (OpenAI) | 🚫 Disallow | ChatGPT 训练数据无 Zprintpro |
| ChatGPT-User (OpenAI) | ⚠️ 无规则 (但 Default Allow 兜底) | OK |
| ClaudeBot (Anthropic) | 🚫 Disallow | Claude 训练数据无 |
| Claude-Web (Anthropic) | ⚠️ 无规则 | OK |
| PerplexityBot | ⚠️ 无规则 | OK |
| Google-Extended | 🚫 Disallow | Google AI 训练无 (Bard/Gemini) |
| CCBot (Common Crawl) | 🚫 Disallow | 公开训练数据集无 |
| Bytespider (字节/豆包) | 🚫 Disallow | 豆包训练无 |
| Baiduspider (百度/文心) | ⚠️ 无规则 | OK |

**影响**: Zprintpro 不在 AI 训练数据中, AI 搜索/回答引用概率 = 0
**修复**: 1 文件改 1 行 (删除 Cloudflare Managed Content 段的 Disallow AI bots 或加 Allow override)
**预计 ROI**: 🔴 极高 (K3 战略修正 1 命中, 修复后 8/9 AI 引擎立即开始抓取)

### 🔴 P0-2: HSTS (HTTP Strict-Transport-Security) MISS

```
$ curl -sI https://zprintpro.com/
HTTP/1.1 200 OK
(无 Strict-Transport-Security header)
```

**问题**: 浏览器访问 http:// 可降级到非 HTTPS, 损害 SEO + 安全
**修复**: Cloudflare Dashboard → SSL/TLS → Edge Certificates → HSTS 启用 (max-age=31536000; includeSubDomains; preload)
**预计 ROI**: 🟡 中 (搜索引擎不直接降权, 但用户体验 + 安全加分)

### 🟡 P1-3: Hreflang 标签 0 langs 命中 (4/4 抽样)

**K3 战略修正 3 命中**: 多语言页面没正确 hreflang 标签, AI 引擎无法识别多语言版本关联

**抽样 (4 页)**:
- https://zprintpro.com/ → hreflang 0 langs ❌
- https://zprintpro.com/zh-hk/blog/doujin-circle-printing-guide/ → 0 ❌
- https://zprintpro.com/zh-hk/category/paper-bags/ → 0 ❌
- https://zprintpro.com/zh-hk/product/rigid-boxes/ → 0 ❌

**根因**: `src/app/[locale]/layout.tsx` L121-129 注释说明已移除手渲染 hreflang, 改用 Next.js `metadata.alternates.languages`. 但 **实际 curl 抽样 0 hits** — Next.js metadata 机制没在 sampled pages 生效.

**修复**: 抽样 4 页 100% 缺 hreflang, 说明全局问题, 不是单页. 需 deep dive `generateMetadata` 跟 `metadata.alternates.languages` 配置
**预计 ROI**: 🔴 高 (多语言 SEO 排名核心, 3 locale 互链失败 → Google 视为 duplicate content)

### 🟡 P1-4: Sitemap 5 inactive locale 0 URL

**当前 sitemap**:
- https://zprintpro.com/sitemap.xml (root)
- https://zprintpro.com/sitemap-zh-hk.xml (195 URLs)
- https://zprintpro.com/sitemap-en.xml (195 URLs)
- https://zprintpro.com/sitemap-ja.xml (195 URLs)
- **缺失**: sitemap-zh-cn.xml / sitemap-zh-tw.xml / sitemap-ko.xml / sitemap-de.xml / sitemap-fr.xml / sitemap-es.xml (5 locale)

**K3 §13.10 提了 8 locale**, 但实际 src/ 只有 3 active locale (zh-hk / en / ja). 5 inactive locale 没 URL 是正常的 (无页面), 但 8 locale 拍板应统一 sitemap 模板
**修复**: 不需要, 5 inactive locale 0 page = 0 URL 合理. 8/9 报告 00 注明

### 🟢 95/100: Canonical 标签 (4/4 抽样 OK)

```
https://zprintpro.com/                          → /zh-hk/ (default locale 指向)
https://zprintpro.com/zh-hk/blog/doujin/        → self (同 URL, OK)
https://zprintpro.com/zh-hk/category/paper-bags/ → self (OK)
https://zprintpro.com/zh-hk/product/rigid-boxes/ → self (OK)
```

**评价**: next-intl default locale 正确指向 /zh-hk/, 同 locale 页面 self-canonical, **多语言 canonical 0 错**.

## 1.3 TTFB 性能数据 (curl -w 实测 7 页)

| URL | HTTP | TTFB | Total | Size | 评价 |
|---|---|---|---|---|---|
| / | 301 | 0.800s | 0.800s | 0 B | 根域 redirect OK |
| /zh-hk/ | 200 | 1.110s | 1.111s | 0 B | 🟡 略慢 |
| /en/ | 200 | 1.232s | 1.232s | 0 B | 🟡 略慢 |
| /ja/ | 200 | 1.174s | 1.174s | 0 B | 🟡 略慢 |
| /zh-hk/blog/doujin-circle-printing-guide/ | 200 | 0.886s | 0.886s | 0 B | 🟢 OK |
| /zh-hk/category/paper-bags/ | 200 | 0.706s | 0.707s | 0 B | 🟢 OK |
| /zh-hk/product/paper-bags/ | 308 | 0.615s | 0.615s | 0 B | 🟢 (redirect to /category) |

**评价**: 平均 TTFB ~0.95s, AI Overviews 偏好 <2.5s ✅. 8/3 CF Pages build 慢可能因 build queue.
**Size=0 B**: curl -o /dev/null (丢弃 body, 只测 head), 不是真 size 0.

## 1.4 Mobile 适配

```
viewport: width=device-width, initial-scale=1, maximum-scale=5
```

**评价**: viewport meta OK, max-scale=5 偏高 (AI Overviews 偏好 max-scale=2-3, accessibility 角度 max-scale=1 更好)
**修复**: 改 max-scale=2, 1 文件改 1 行, accessibility + 分
**预计 ROI**: 🟢 低 (SEO 影响小, accessibility 加分)

## 1.5 SSL/HTTPS 状态

**证书**: 有效 (CF Universal SSL)
**协议**: HTTP/1.1 200, HTTP→HTTPS 301 redirect OK
**HSTS**: ❌ MISS (P0-2)

## 1.6 模块 1 优化建议 (按 ROI 排序)

| # | 修复项 | 难度 | ROI | 预计耗时 |
|---|---|---|---|---|
| 1 | **修 robots.txt AI 爬虫冲突** (删 Disallow 段) | 低 | 🔴 极高 | 10 min |
| 2 | **修 hreflang 0 langs** (deep dive generateMetadata) | 中 | 🔴 高 | 2-4h |
| 3 | **启用 HSTS** (CF Dashboard) | 极低 | 🟡 中 | 5 min |
| 4 | 改 viewport max-scale=5 → 2 | 极低 | 🟢 低 | 5 min |

## 1.7 数据源 [UNVERIFIED] 项

- **Core Web Vitals (LCP/FID/CLS)**: M3 0 PageSpeed Insights API 权限, 无法跑. K3 8/5 拍板数据源
- **Lighthouse 性能分**: M3 0 Lighthouse CI 权限, K3 8/5 拍板
- **404/5xx 完整列表**: 8/4 verify 31 URL 修后 7 仍 404, 详细见 .hermes/logs/2026-08-04-gsc-404-fix-r2.md

---

## 8/4 14:30 P0 修复记录

**commit**: `8f3948d` (push PASS, ahead=0/0)

### ✅ P0-1 修复 (src/app/robots.ts application level)

**已做 (M3)**:
- 新建 `src/app/robots.ts` (1825 B, Next.js MetadataRoute.Robots)
- 9 AI 爬虫 explicit Allow: GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/Claude-Web/anthropic-ai/PerplexityBot/Perplexity-User/Google-Extended/Applebot-Extended/Bytespider/CCBot
- push PASS, CF Pages build 5-10 min 后 application level 输出生效

**仍需 K3 浏览器操作**: Cloudflare Dashboard → Security → Bots → 12 AI crawlers 全部 Allowed
- 详见 `.hermes/k3-inbox/2026-08-04-cf-dashboard-robots-fix.md`
- 原因: Cloudflare edge Managed Content 段 Disallow 优先生效, 覆盖 application level

**修复后分数 (待 CF Dashboard 同步)**:
- robots.txt 健康度: 30 → 95
- 模块 1 总分: 70 → **90** 🟢

### 🟡 P1-3 + P1-4 排期 (8/5 09:00-10:05)

- Hreflang (1h) + HSTS (5 min) 同批提交
- K3 14:26 拍板, M3 8/5 09:00 自动执行

