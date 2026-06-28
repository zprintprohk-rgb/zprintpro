# ZprintPro 优化提示词 — AutoClaw GLM 5.2 攻坚任务 + Mavis M3 简单任务

> **生成时间**: 2026-06-28 18:55 (Asia/Shanghai)
> **作者**: Mavis (orchestrator)
> **目标工具**: AutoClaw GLM 5.2 (积分有限，只攻最高价值) + Mavis M3 (执行小任务)
> **业务目标**: zprintpro.com 月销 5 万美金
> **当前阶段**: 技术架构基本就位 (Next 14.2 Edge runtime + 79 SKU × 3 locale = 237 产品页 + 4 sitemap + schema 全)，要补 CRO 转化 + AI 搜索可见性 + 信任体系

---

## 0. 一句话定位

> **品牌**: 智印云 / ZprintPro（**不是"智印港"** — 竞品)
> **主体**: 深圳市彩龙印刷包装有限公司（深圳，跨境接全球订单）
> **官网**: https://zprintpro.com
> **当前栈**: Next.js 14.2.35 + App Router (Edge runtime) + Tailwind + shadcn/ui + Supabase + Cloudflare Pages
> **布局**: max-w-[1320px] | 3 locale: /zh-hk /en /ja
> **规模**: 79 SKU × 3 locale = 237 产品页 / 4 sitemap / 12+ schema / Edge runtime

---

## 1. 月销 5 万美金目标拆解

| 指标 | 数值 | 反推 |
|------|------|------|
| 月 GMV | $50,000 | — |
| 客单价 | ~$200 (跨境印刷批发平均) | 250 单/月 |
| 转化率 | 2% (行业平均) | **12,500 访问/月** = ~417 访问/天 |
| SEO 自然流量占比 | 70% | 292 访问/天 |
| GSC 关键词覆盖 | 500+ 长尾词首页排名 | 主导流量入口 |
| AI 搜索 (ChatGPT/Perplexity) 推荐 | 月 100+ 引用 | 第二流量入口 |

**核心瓶颈**: 不是代码不够，是 **(a) 转化漏斗不丝滑、(b) AI 搜索几乎不引用我们、(c) 首页没有"立即询价"主 CTA 引导**

---

## 2. 任务分工原则（AutoClaw 积分宝贵）

| 难度等级 | 工具 | 任务类型 | 积分消耗 | 例 |
|----------|------|----------|----------|----|
| 🔴 架构/攻坚 | **GLM 5.2** | 多文件重构、跨模块设计、长链推理、需要业务判断 | 5-15 / 个 | 联系页完整重构 / A/B 埋点架构 / 实时报价引擎 |
| 🟡 中等 | M3 (Mavis) | 改 1-2 个文件、有明确 spec | 1-3 / 个 | OG 描述修 / 单 schema 加 / 路径重定向 |
| 🟢 简单 | M3 或 cron | 单字符改动 / 验证 curl / 提交 push | <1 / 个 | 改色 / 改字号 / ssg check |

**AutoClaw 只接 GLM 5.2 任务。** M3 任务我自己来。

---

## 3. 🔴 GLM 5.2 攻坚任务清单（10 个，按价值排序）

### 任务 1: 联系页完整重构（多步表单 + 实时报价 + A/B 埋点）
**价值**: 🔥🔥🔥🔥🔥 (P0，月增 30% 询价转化)
**预估积分**: 8-12
**输入文件**:
- `src/app/[locale]/contact/page.tsx` (现状 21kB，有 500 bug)
- `src/app/[locale]/contact/ContactFormWrapper.tsx`
- `src/components/quote/QuoteForm.tsx` (react-hook-form + zod)
- `src/lib/pricing.ts` (定价逻辑)
- `src/data/products.ts` (79 SKU 报价基础)
- 之前 AutoCrawl 写的 `AUTO_CRAWL_GLM_CONTACT_PAGE_PROMPT.md` (19kB 详细 spec，可作输入)

**要求**:
1. **3 步表单向导** (Step 1: 选品类/数量 → Step 2: 联系信息 → Step 3: 附加需求)
2. **实时报价预览** (基于 SKU + 数量 + 加急自动算价, 浮动 ±15%)
3. **进度指示器** (顶部 Step 1/2/3)
4. **4 指标信任栏** (500+/10+/72h/30+ 已做，保留)
5. **WhatsApp CTA** + 放大的 QR code (140px, 已做)
6. **A/B 测试埋点** (用 Plausible / 自建 / GTM, 至少 4 个事件: form_start, step_complete, form_submit, cta_click)
7. **Edge runtime 兼容** (避开 Buffer/fs, dynamic import 客户端组件)
8. **JSON-LD schema 保持** (ContactPage + LocalBusiness + Business)
9. **解决 contact 500 bug** (在重构同时定位根因)
10. **3 locale 全翻译** (zh-hk/en/ja, 不要硬编码)

**禁止**:
- ❌ 改基线颜色 (#2873F5 等)
- ❌ 改 max-w-[1320px] 布局
- ❌ 引入 framer-motion（用 CSS + Tailwind transitions）
- ❌ 引入 framer 之类大库（用 CSS + Tailwind transitions）

**输出**:
- 1-2 个 commit (重构 + A/B 埋点)
- 截图 (3 locale 首页/3 步状态)
- 部署后 curl verify 3 locale 全 200

---

### 任务 2: 首页 Hero + 主 CTA 重构
**价值**: 🔥🔥🔥🔥🔥 (P0, 直接影响首屏转化)
**预估积分**: 6-9
**输入文件**:
- `src/components/home/HeroBanner.tsx`
- `src/app/[locale]/page.tsx` (home page)

**要求**:
1. **强 Hero** (左: 大标题 + 副标题 + 主 CTA "立即獲取報價" / "Get a Free Quote" / "無料見積もり"; 右: 真实产品图 + 旋转/微动效)
2. **3 个 micro-CTA** (WhatsApp / 计算器 / 上传文件)
3. **多 locale 切换器** (右上角 dropdown, 不是链接, 而是真实 switcher)
4. **实时通知 toast** (顶部: "5 分钟前 John from HK 提交了名片报价")
5. **价格快速查询入口** (Hero 下方: 选品类 → 跳到 quote 页带预填)
6. **移动端优化** (LG 以下 hero 高度 < 80vh, 按钮全宽)
7. **A/B 测试埋点** (hero_cta_click, locale_switch, notification_dismiss)

**当前 StatsBar/WhyChooseUs/KnowledgeSection 保留** (截图显示已做的不错)

**输出**:
- 1 commit
- 3 locale 截图
- LCP < 2.5s (Lighthouse 测试)

---

### 任务 3: 实时报价引擎（基于 SKU + 数量 + 加急）
**价值**: 🔥🔥🔥🔥🔥 (P0, 询价单 → 订单转化率 50%↑)
**预估积分**: 10-15
**输入文件**:
- `src/lib/pricing.ts`
- `src/data/products.ts` (79 SKU 价格区间)
- `src/data/sku-seo-data.ts`
- `src/components/quote/QuoteCalculator.tsx`

**要求**:
1. **定价规则**: 基础价 + 数量阶梯折扣 + 加急费 + 工艺加价 (烫金/UV/异形)
2. **多币种**: HKD / USD / JPY 自动按 locale 切换
3. **价格浮动 ±15%** (给销售留空间, 显示 "起价" 标签)
4. **Server API**: `/api/quote/calculate` (POST, 接受 product_slug + qty + options, 返回 JSON 价格)
5. **Edge runtime 兼容** (不要 fs/Buffer)
6. **缓存**: 同 SKU+qty 30 秒内返回缓存 (Cloudflare KV 可选)
7. **A/B 埋点**: quote_calculated, quote_threshold_met (用户接受了价格)

**输出**:
- 1-2 commits
- API curl test 样例

---

### 任务 4: AI 搜索 GEO 优化（让 ChatGPT/Claude/Perplexity 推荐我们）
**价值**: 🔥🔥🔥🔥 (未来 12 个月最大流量入口)
**预估积分**: 8-10
**输入文件**:
- `src/data/pillar-content.ts` (pillar content)
- `src/data/cluster-content.ts` (cluster content)
- `src/data/buying-guides.ts`
- 79 个产品页

**要求**:
1. **GEO 优化要素**:
   - 每个产品页加 `speakable` schema (SpeechSynthesis 友好)
   - 每个产品页加 `HowTo` schema (工艺流程, 已部分有, 补全)
   - FAQ schema (每个产品 3-5 个高质量 FAQ, 引用 Wikipedia/Schema.org)
   - Author schema (E-E-A-T, 引用真实人物 — 法定代表人唐运提)
   - 实体声明 (NAP 统一: 深圳市彩龙印刷包装有限公司 + 唐运提)
2. **Bing / Yandex sitemap 单独输出** (这两个搜索引擎 AI 引用更频繁)
3. **llms.txt 文件** (新增 `/public/llms.txt`, 列出所有产品 + 价格 + FAQ, 喂给 AI 训练抓取)
4. **ai.txt robots 允许** (`public/robots.txt` 加 `Allow: /llms.txt`)
5. **多语言 hreflang 强化** (en-US / en-GB / en-AU 独立, 之前已做, verify)
6. **Bing Webmaster Tools + IndexNow 集成** (每次 push 自动 ping)

**输出**:
- 1-2 commits
- `/public/llms.txt` 示例内容
- Bing Webmaster 提交记录

---

### 任务 5: 信任体系架构（证书 + 客户 logo + case study + review）
**价值**: 🔥🔥🔥🔥 (B2B 印刷采购决策长, 信任 = 转化)
**预估积分**: 7-10
**输入文件**:
- `src/components/home/TrustWaterfall.tsx` (现状有, 但只有数据, 没真实 logo)
- `src/components/home/StatsBar.tsx` (有 4 指标)
- `src/data/cluster-content.ts` (case study 数据)

**要求**:
1. **客户 logo 墙** (新增 `src/components/home/ClientLogoWall.tsx`, 12+ 真实或脱敏 logo, 灰度显示 hover 彩色)
2. **证书徽章** (ISO 9001 / FSC / G7 / SEDEX, 加 tooltip 说明)
3. **Case study section** (新增 `src/components/home/CaseStudyGrid.tsx`, 3 个真实案例: 行业/痛点/方案/结果, 各 200 字 + 1 张图)
4. **Review/Testimonial** (新增 `src/components/home/ReviewSection.tsx`, 6-9 条客户评价, 含头像/公司/星级, schema: Review)
5. **数据真实性自检** (15000+ 客户 / 99.5% 准时 / 4.9 评分 — 现在没数据来源, 要么 drop 要么 link 到真实数据后台, 不能假数据)
6. **Schema: AggregateRating** (从 GSC "无效整数" 修过, verify 全站)
7. **A/B 埋点**: trust_bar_view, case_study_click, review_expand

**输出**:
- 1-2 commits
- 3 locale 截图
- Trust schema verify (Google Rich Results Test)

---

### 任务 6: Core Web Vitals 全面达标（LCP/INP/CLS 全面 90+）
**价值**: 🔥🔥🔥🔥 (SEO 直接加分, 转化提升 10%+)
**预估积分**: 6-8
**输入**:
- 79 产品页 × 3 locale = 237 页
- `next.config.js`
- `public/images/products/`

**要求**:
1. **LCP < 2.5s** (产品图 webp 优化, hero preload, font preload)
2. **INP < 200ms** (defer non-critical JS, dynamic import client components)
3. **CLS < 0.1** (固定图片 aspect-ratio, 字体 fallback, 避免 layout shift)
4. **图片优化**: 89 张 products jpg → webp (q=80), 配 blur placeholder
5. **字体优化**: subset + preload + `font-display: swap`
6. **JS bundle 瘦身**: 找出 top 3 体积大的 chunk, 拆分 + lazy load
7. **Lighthouse CI**: 加 `.lighthouserc.json`, PR 时自动跑

**输出**:
- 1-2 commits
- Lighthouse 3 locale 首页 90+ 截图
- 3 个产品页 90+ 截图

---

### 任务 7: 多 locale 站内 SEO 内链架构（hub-spoke）
**价值**: 🔥🔥🔥 (GSC 长尾词排名提升)
**预估积分**: 5-7
**输入**:
- 79 SKU
- 13 分类
- 19 篇 pillar content
- 11 篇 buying guide
- cluster content

**要求**:
1. **Hub-spoke 架构**: 每个 pillar page (cluster) → 链接到 5-10 个 product/category
2. **Category page** → 链接到所有下属 product + 1 个 pillar content
3. **Product page** → 链接到同类 4-6 个 product + 上级 category + 1 buying guide
4. **Internal links 数据驱动**: 用 src/data/interlink-graph.ts 集中管理 (新增)
5. **Anchor text 优化**: 不要 "click here", 用主关键词 ("专业烫金名片印刷")
6. **Breadcrumb schema** (已做, verify)
7. **Footer 链接升级**: 现状只有 4 列, 加 2 列: "Popular Products" + "Top Categories"

**输出**:
- 1-2 commits
- 内链图可视化 (`docs/internal-link-map.md`)

---

### 任务 8: SKU 批量生图 Pipeline（Seedream 4.5 / Kimi 2.6）
**价值**: 🔥🔥🔥 (65 SKU 缺图, 影响产品页转化)
**预估积分**: 4-6
**输入**:
- `image-prompts.md` (3050 行, 78 SKU)
- `seedream-prompts-all-skus.txt` (586KB, 79 SKU, GBK 编码)
- `seedream-batch-v3.js` (已存在)
- `public/images/products/` (88 张 jpg, 65 张是复制品)

**要求**:
1. **优先级**: 6 大共用 cluster 先 (business-cards 6 / red-packets 6 / flyers 6 / boxes 6 / stickers 5 / calendars 4 = 33 张)
2. **Seedream 4.5** 或 **Kimi 2.6 generate_image** API 批量调用
3. **3 locale 命名**: `zprintpro-{category}-{slug}-{locale}.jpg` (zh-hk/en/ja)
4. **Alt 文本**: 3 locale 全 (用 prompts 里的 Alt ZH/EN/JA)
5. **质量门**: 至少 800x600, file size > 50KB, 风格统一 (与已有图保持)
6. **占位图清理**: 生成的独立图替换复制品
7. **进度跟踪**: 更新 `seedream-progress.json`
8. **失败重试**: 最多 3 次, rate limit 退避

**输出**:
- 33-65 张新图
- progress.json 更新
- 部署 commit

---

### 任务 9: 询价表单 + 文件上传 + WhatsApp 集成
**价值**: 🔥🔥🔥 (询价漏斗核心)
**预估积分**: 5-7
**输入**:
- `src/components/quote/QuoteForm.tsx`
- `src/lib/whatsapp.ts`
- Supabase storage

**要求**:
1. **文件拖拽上传** (PDF/AI/PSD/PNG, max 10MB, 进度条)
2. **多文件** (最多 5 个)
3. **Supabase storage** (上传到 `/quotes/{date}/{id}/`)
4. **预填** (URL 参数: `?product=premium-business-cards&qty=1000&rush=24h`)
5. **提交后**: (a) 落 Supabase (b) 发邮件通知 sales@zprintpro.com (c) 弹 WhatsApp 链接
6. **spam 防护**: Cloudflare Turnstile (免费, 不像 reCAPTCHA 那样影响 UX)
7. **Edge runtime 兼容**: 整个流程跑在 edge
8. **错误处理**: 上传失败/网络断/重复提交

**输出**:
- 1-2 commits
- Supabase migration
- Turnstile 配置

---

### 任务 10: 转化漏斗分析 + A/B Testing 平台
**价值**: 🔥🔥🔥 (后续所有优化的数据基础)
**预估积分**: 6-8
**输入**:
- 现有 GTM (无)
- 现有 Plausible (无)

**要求**:
1. **Plausible Analytics** (无 cookie, GDPR 友好, 9 USD/月 self-host 或 官方 19 USD/月)
2. **关键事件埋点**:
   - hero_cta_click
   - product_view
   - quote_form_start
   - quote_form_step_complete
   - quote_form_submit
   - whatsapp_click
   - phone_click
   - trust_bar_view
   - case_study_click
3. **Funnel 报告**: 访问 → 询价 → 提交 (Plausible 自带)
4. **A/B 测试框架**: 用 Plausible `experiments` feature 或自建 cookie split
5. **Privacy policy 更新** (加 Plausible disclosure)
6. **GTM 备选** (如果想接 Google Ads, 装 GTM 并行)

**输出**:
- 1 commit
- Plausible 配置
- 事件清单文档 `docs/analytics-events.md`

---

## 4. 🟡 M3 简单任务清单（我自己做）

| 任务 | 估时 | commit 数 |
|------|------|-----------|
| 修 contact 500 真因 (A2: 注释 ContactFormWrapper 测试) | 10 min | 1 |
| 修 contact 500 真因 (A3: 注释 trust bar 测试) | 5 min | 1 |
| 修 contact 500 真因 (A4: img 改 SVG inline) | 10 min | 1 |
| 单文件文案修复 (任何 locale) | <5 min | 1 |
| OG 描述 HK→Shenzhen 验证 (已做) | ✅ done | 7ad6f2e |
| sitemap 维护 | <10 min | 1 |
| 单 schema 添加 | <5 min | 1 |
| 路径 308 重定向 | <5 min | 1 |
| 价格多币种切换验证 | <10 min | 1 |
| 内部链接 check (curl + grep) | <5 min | 0 (脚本) |
| push + verify curl | 5 min/次 | — |

---

## 5. 已有资源（AutoClaw 直接用，不要重新生成）

| 资源 | 路径 | 用途 |
|------|------|------|
| **SKU 完整 prompt (Midjourney + Kimi)** | `image-prompts.md` (3050 行) | 生图用 |
| **Seedream 4.5 prompt block (3 locale)** | `seedream-prompts-all-skus.txt` (586KB, GBK) | 批量生图用 |
| **批量执行脚本** | `seedream-batch-v3.js` | API 调用 |
| **进度跟踪** | `seedream-progress.json` / `seedream-progress-v3.json` | 任务状态 |
| **生图指南** | `SEEDREAM-GUIDE.md` | 工具用法 |
| **SKU 详细数据** | `src/data/products.ts` (79 SKU) | 定价 / 分类 / slug |
| **SKU SEO 数据** | `src/data/sku-seo-data.ts` (78 SKU) | title/desc/h1 |
| **Pillar content** | `src/data/pillar-content.ts` | 长尾 SEO 文章 |
| **Cluster content** | `src/data/cluster-content.ts` | 内部链接 |
| **Buying guides** | `src/data/buying-guides.ts` | 选购指南 |
| **现有 seedream-webp 资源** | `public/images/products/seedream-webp/` (1015 张) | 部分 SKU 有图 |
| **Site config** | `src/lib/siteConfig.ts` (深圳实体 NAP) | Schema / OG |
| **联系页 详细 spec** | `AUTO_CRAWL_GLM_CONTACT_PAGE_PROMPT.md` (19kB) | 任务 1 输入 |

---

## 6. 已踩的坑（AutoClaw 必看，不能再犯）

1. ❌ **品牌名写"智印港"** — 这是竞品, 全文过滤
2. ❌ **地址写 HK 觀塘/九龍灣/牛頭角** — 真实主体是深圳龙岗平湖
3. ❌ **OG 写 "from Hong Kong factory"** — 深圳主体写 Shenzhen
4. ❌ **SVG `<animate>` + next/image** — edge runtime streaming 抛错
5. ❌ **3 个独立 `<JsonLd dangerouslySetInnerHTML>`** — RSC streaming 末尾抛错 (home 用 1 个数组形式是 OK 的)
6. ❌ **react-hook-form + edge runtime** — 需 `dynamic import + ssr:false`
7. ❌ **Service Worker 缓存** — 迭代期禁用 (见 layout.tsx 注释)
8. ❌ **buffer / fs / crypto node API** — edge runtime 不可用
9. ❌ **iframe + CSP frame-src** — OSM 嵌入失败
10. ❌ **"placeholder.jpg" 零字节** — 验证每个 image 资源 mtime + size
11. ❌ **"aggregateRating.reviewCount" 非整数** — GSC 报"无效整数", 用 Number 不是 String
12. ❌ **hreflang 缺 x-default / en-GB / en-AU** — 现在已修
13. ❌ **description 字符 < 70** — 标题/描述太短 SEO 扣分
14. ❌ **CF Pages Free plan 1046 限流** — wrangler 部署触发的 plan-level rate limit, 5b66c71 升级 next 时触发的
15. ❌ **PowerShell `&&` / `head` / `grep`** — 用 `;` / `Select-Object` / `Select-String`
16. ❌ **PowerShell `[locale]` 方括号当通配符** — 用 `-LiteralPath`
17. ❌ **Remove-Item 默认拦截** — 用 mavis-trash
18. ❌ **CRLF 替换 LF** — Python open(write) 必须 `newline=''`
19. ❌ **CF Pages Git integration build 状态** — 不在 GitHub check_runs API 显示
20. ❌ **CDN 边缘节点缓存** — 17:18 AutoCrawl 测 cache buster 看到 200 是缓存残留, 不是新 build 200

---

## 7. 核心约束（GLM 5.2 必读）

### 技术栈
- **框架**: Next.js 14.2.35 App Router (Edge runtime)
- **样式**: Tailwind CSS + shadcn/ui (无 framer-motion, 用 CSS transitions)
- **数据库**: Supabase (Auth + DB + Storage)
- **支付**: PayPal 审核中, 当前用银行电汇 + 微信 + 支付宝 3 选 1
- **部署**: Cloudflare Pages (Git integration, 不要 wrangler 触发 1046)
- **域名**: zprintpro.com
- **布局**: max-w-[1320px] 全局

### 性能约束
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- Lighthouse 90+ (移动端 + 桌面)

### SEO/GEO 约束
- title 50-60 字符
- description 150-160 字符
- H1 唯一 + 含主关键词
- Schema: Organization + LocalBusiness + Product + FAQPage + BreadcrumbList
- hreflang: zh-Hant-HK / en / en-GB / en-AU / ja-JP / x-default
- sitemaps: 4 个 (index + zh-hk + en + ja)
- llms.txt: 新增, 喂 AI

### 多语言
- **zh-hk**: 主场 (香港/简体中文)
- **en**: 全球英语 (美国/英国/澳洲共用)
- **ja**: 日本市场
- 翻译要地道, 不接受机翻
- 货币 HKD / USD / JPY 自动按 locale

### Edge runtime 兼容
- ❌ `Buffer` / `fs` / `node:crypto` / `process.env` (除 NEXT_PUBLIC_*)
- ✅ `fetch` / `URL` / `crypto.subtle` (Web Crypto)
- ✅ client component 用 `dynamic import + ssr:false`
- ✅ schema 用 JSON.stringify + dangerouslySetInnerHTML (但合并成 1 个 `<JsonLd>` 形式)

### 数据约束
- 不用假数据 (15000+ 客户要可追溯, 否则改成 <真实数字>)
- NAP 统一深圳实体
- 联系电话 +86 198 8085 1334 (显示)
- WhatsApp +86 181 2638 0255 (专用)
- 邮箱 zprintpro@outlook.com
- 地址 广东省深圳市龙岗区平湖街道嘉城路 1 号 (518111)

---

## 8. 完整工作流（AutoClaw 必读）

```
1. 读任务 spec + 已有 prompt 文件 + 已有 data 文件
2. 写代码 → 本地 next build 验证编译
3. commit (用 zprintprohk-rgb / zprintprohk@gmail.com, 注意 CRLF 用 `-c core.autocrlf=false`)
4. push origin_ssh main → CF Pages 自动 build (3-5 min, 不会显示在 GitHub Actions)
5. set cron monitor 3 locale 目标路径 5min/次 × 6 ticks (30 min TTL)
6. ALL 200 → 报告 + 删 cron
7. 仍 5xx → 升级 user, 列备选方案 (M3 接手二分法)
8. 验证 24h 缓存过期后仍稳定 → 完成
```

---

## 9. 任务优先级 (按 ROI 排序)

| # | 任务 | 价值 | 难度 | AutoClaw 优先级 |
|---|------|------|------|----------------|
| 1 | 联系页完整重构 | 🔥🔥🔥🔥🔥 | 高 | **#1 立即做** |
| 2 | 首页 Hero + CTA | 🔥🔥🔥🔥🔥 | 中 | **#2** |
| 3 | 实时报价引擎 | 🔥🔥🔥🔥🔥 | 高 | **#3** |
| 4 | AI 搜索 GEO 优化 | 🔥🔥🔥🔥 | 中 | **#4** |
| 5 | 信任体系 | 🔥🔥🔥🔥 | 中 | **#5** |
| 6 | Core Web Vitals | 🔥🔥🔥🔥 | 中 | **#6** |
| 7 | 站内 SEO 内链 | 🔥🔥🔥 | 低 | **#7 (M3 也可做)** |
| 8 | SKU 批量生图 | 🔥🔥🔥 | 中 | **#8** |
| 9 | 询价表单 + 上传 | 🔥🔥🔥 | 中 | **#9** |
| 10 | 转化分析 + A/B | 🔥🔥🔥 | 中 | **#10 (基础, 优先做)** |

---

## 10. 验收标准 (每任务必达)

✅ **代码层**: commit + push 成功 + 本地 `npm run build` 通过
✅ **线上层**: 3 locale 目标路径 HTTP 200 (cron monitor 30 min)
✅ **性能层**: Lighthouse 90+ (移动 + 桌面)
✅ **SEO 层**: Google Rich Results Test 通过 (主页面)
✅ **i18n 层**: 3 locale 文案地道, 不接受机翻
✅ **品牌层**: 全文无 "智印港" / 无 "HK 觀塘" (除非 zh-hk locale 特定)
✅ **数据层**: NAP 统一深圳, 不混 HK
✅ **A/B 埋点**: 关键事件埋了, Plausible 可见

---

**AutoClaw 接到这个文件后，按 #1 → #10 顺序执行，每个任务完成后报告。**

**AutoClaw 积分预算**: 10 个任务 × 平均 7 积分 = ~70 积分 (够用)
**M3 后备**: 简单 bug fix + 验证 + 部署, 不消耗 AutoClaw 积分

<media src="/absolute/path/to/this/file" />  <!-- placeholder, do not include -->
