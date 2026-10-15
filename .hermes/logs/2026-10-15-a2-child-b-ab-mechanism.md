# 2026-10-15 A2-Child-B：A/B 测试机制数据流映射 + 「middleware 移除注入」影响评估

- 性质：只读调查（未修改 src/，未 git commit/push；唯一写入 = 本报告 + .hermes/tmp 写入脚本）
- 环境：F:/zprintpro-nextjs（报告内路径统一写作正斜杠），Next.js 14.2 App Router，Cloudflare Pages
- 检索工具：rg（全程未用 PowerShell Select-String 判中文，per AGENTS.md §0.26.9）

## 数据来源
- 检索：rg 全 src/ 六组关键词（zp_ab_bucket / x-zp-ab-variant / getAbVariant / HERO_H1_VARIANTS / CTA_VARIANTS / zp_ab）+ 补充检索（abVariant|AbVariant、edgeConfig|EDGE_CONFIG|edge-config、thisResponseWithAbHeaders|pickVariant、zp_ab、全站 h1 普查、next/headers、noUnusedLocals|strict）
- 一手代码精读：src/middleware.ts（头段 + L280-311）、src/lib/analytics.ts（L115-195）、src/components/home/HeroBanner.tsx（L1-175）、src/app/[locale]/page.tsx（import 清单）
- 校准日期：2026-10-15（当日 rg + read 实测；行号为当日快照，执行改动前需 git status 复核，见待证项 2）
- 本报告不含任何 GSC/运营数字，无估算值

## 结论摘要
1. A/B 机制只有 3 个文件参与：middleware.ts（边缘注入 cookie+header）、lib/analytics.ts（变体常量 + 客户端 fallback）、components/home/HeroBanner.tsx（唯一 UI 消费者）。全 src/ 六组关键词 + AbVariant 反向检索均无第 4 个消费点；没有任何服务端组件经 headers()/cookies() 读 A/B 状态。【一手代码，确定】
2. SSR HTML 现状永远输出 variant A：HeroBanner 是 use client 组件，abVariant 以 useState('A') 初始化，getAbVariant() 只在 useEffect 内调用；middleware 注入的 cookie/header 从未进入任何 SSR 渲染决策。移除注入后 SSR HTML（含 title/H1/meta description）逐字节不变。【一手代码，确定】
3. 客户端 fallback 完整存在且自写 cookie（analytics.ts:127-141：无 cookie 时 50/50 随机 → document.cookie 写回 30 天 SameSite=Lax → trackEvent('ab_assigned')）。hydration 安全：SSR 与首帧渲染均为 'A'，切 B 发生在 effect（post-hydration），当前代码无 hydration mismatch。【一手代码，确定】
4. 移除安全（高置信）。丢失仅四项：服务端首触 Set-Cookie（无消费者）、x-zp-ab-variant 响应头可观测性（全仓 0 读取者）、cookie 由滑动续期变固定 30 天（轻微）、ab_assigned 事件量约等于 0 变为每个新访客（分析口径变化，属修正）。SEO 关键 SSR 输出零风险。【高置信】

## 发现列表（按对结论的支撑强度排序）

### F1【一手代码·确定】全部消费点只有 3 个文件
rg 六组关键词全 src/ 实测（完整命中）：
- src/middleware.ts:38  const existing = req.cookies.get('zp_ab_bucket')?.value;  （读 cookie）
- src/middleware.ts:299-303  response.cookies.set('zp_ab_bucket', variant, { path:'/', maxAge: 60*60*24*30, sameSite: 'lax' })  （写 cookie，每个非重定向响应无条件）
- src/middleware.ts:304  response.headers.set('x-zp-ab-variant', variant);  （写响应头；该头全仓唯一出现处，0 读取者）
- src/lib/analytics.ts:124  const AB_COOKIE = 'zp_ab_bucket';
- src/lib/analytics.ts:127-141  getAbVariant()（:128 SSR 守卫 typeof document undefined 返回 A；:130-133 读 document.cookie；:136 50/50 随机；:137 自写 cookie；:139 trackEvent('ab_assigned')）
- src/lib/analytics.ts:148-164 HERO_H1_VARIANTS（A/B × 3 locale）；:166-176 CTA_VARIANTS（同构）
- src/components/home/HeroBanner.tsx:8 import；:77 const variant = getAbVariant();（useEffect 内）；:100 H1；:142 桌面 CTA；:165 移动 CTA
反向验证：
- abVariant|AbVariant 在上述 3 文件之外 0 命中（src/app/、src/lib/seo.ts、其余组件全无）
- edgeConfig|EDGE_CONFIG|edge-config 全仓 0 命中 → middleware.ts:297 注释「Edge Config 优先」与 analytics.ts 头注释「Vercel Edge Config」均为未实现的陈旧注释，移除不孤立任何 Edge Config 集成
- zp_ab 更宽匹配仍只落在 middleware.ts:38/:299 与 analytics.ts:124，无变体命名（如 zp_ab_xxx）

### F2【一手代码·确定】SSR 恒为 variant A，注入与 SSR 渲染完全解耦
- HeroBanner.tsx:1  'use client';
- HeroBanner.tsx:73-74  // A/B 测试：客户端读 cookie 决定 CTA 文案 / const [abVariant, setAbVariant] = useState<AbVariant>('A');
- HeroBanner.tsx:76-80  useEffect(() => { const variant = getAbVariant(); setAbVariant(variant); trackEvent('hero_ab_exposure', { variant, locale }); }, [locale]);
- 双保险：getAbVariant 自身有 SSR 守卫（analytics.ts:128），即使被误用于渲染期，服务端也返回 'A'
- middleware 只把 variant 写进响应（Set-Cookie + 响应头），不传给当次 RSC 渲染；首页 page.tsx 与 layout.tsx 均不 import next/headers（rg 0 命中）
- 推论：variant B 从未出现在任何 SSR HTML 中；爬虫拿到的首屏永远是 A 文案。移除注入对 SSR 输出零影响。

### F3【一手代码·确定】客户端 fallback 完整、自写 cookie、hydration 安全
- analytics.ts:127-141 fallback 链：读 cookie → 已有 A/B 沿用 → 否则 Math.random 50/50（:136）→ 自写 cookie（:137，原文为模板字符串，转写：document.cookie = 'zp_ab_bucket=' + variant + '; path=/; max-age=2592000; SameSite=Lax'，属性与 middleware 注入一致）→ trackEvent('ab_assigned', { variant })（:139）
- hydration 模式 = 安全式：state 初始 'A'（SSR 与首帧一致）→ effect 内读 cookie/随机 → setAbVariant 触发 post-hydration 重渲染。无 mismatch，仅可能的单帧文案闪切。
- 回归红线：不得把 getAbVariant() 挪进 useState 初始化器或组件渲染体——那会引入 hydration mismatch（对已持 B cookie 的用户 SSR=A、首帧=B）。当前代码未这样做。
- 现状冷知识：middleware 每个非重定向响应都无条件 Set-Cookie（:299），故客户端自写分支在生产几乎不触发（仅浏览器禁 cookie 场景），ab_assigned 事件量长期接近 0。

### F4【一手代码·确定】首页唯一 H1 即 A/B 切换点，但 SSR 恒 A
- 首页 page.tsx 引入 14 个组件（FactoryTrust/HeroBanner/HotProducts/HowItWorks/KnowledgeSection/MainCategoryEntry/MobileCategoryEntry/MobileValueStrip/StatsBar/TrustWaterfall/WhyChooseUs/DoujinSKU/JsonLd/TrustBadges），对这 14 文件 + page.tsx 本体跑 rg 'h1 开标签'：唯一命中 = HeroBanner.tsx:100
- HeroBanner.tsx:100  h1 className="sr-only" 内容 = HERO_H1_VARIANTS[abVariant][locale]（视觉标题已降为 h2，代码注释「单 H1 净化, 2026-10-14」）
- 该 H1 是 SEO 相关资产（首页唯一 H1、在 SSR HTML 中），但 SSR 恒渲染 A 文案（zh-hk「香港本地印刷 · 即日交貨」）。B 文案（zh-hk「跨境印刷服務 · 香港 48 小時派送」/ en 'Shenzhen Factory Direct · HK MTR Pickup' / ja「深圳自社工場印刷 · 香港 MTR 受取可」）仅在客户端 hydration 后对 B 分桶用户出现——这是现状已有行为，与移除 middleware 注入无关。
- generateMetadata / seo.ts 与 AbVariant 零关联（rg 证实），title/description 完全不在 A/B 影响面内。
- 顺带观察（与本任务无关的既有瑕疵）：HeroBanner.tsx:165 移动端 CTA 的 ArrowRight 类名重复 'h-4 h-4'（桌面版 :142 为 'h-4 w-4'）。

### F5【一手代码·确定】middleware 注入点精确位置与作用域
- 注入函数 thisResponseWithAbHeaders = middleware.ts:287-306；同时承担安全头（:289 X-Frame-Options、:290 X-Content-Type-Options、:291 Referrer-Policy、:292-296 CSP）——移除 A/B 段时必须原样保留安全头段
- A/B 段 = :297 陈旧注释 + :298 pickVariant 调用 + :299-303 Set-Cookie + :304 响应头
- 辅助定义 = :31-33 注释块 + :34 type AbVariant = 'A' | 'B' + :36-42 pickVariant 函数（:38 读 cookie、:41 50/50 随机）
- 两个调用点 :198 / :284 都是非重定向终态；301/308 重定向响应不经过此函数（重定向本就不带 AB cookie 与安全头——现状如此，移除不改变）
- matcher（文件尾 config.matcher）：排除 _next|api|images|favicon.ico|robots.txt|sitemap|manifest.json，其余全路径注入 → AB cookie 现洒向所有页面响应，不止首页
- tsconfig.json:11 "strict": true，无 noUnusedLocals → 删除 pickVariant 后 tsc 不会因残留报错，但清单仍要求整段删除

## 五问逐答

### Q1 消费点映射
见 F1。六组关键词全部命中均落在 3 文件，行号+摘录已列；无第 4 消费点。

### Q2 服务端是否消费 / 移除后 SSR 变化 / H1 是否 SEO 关键
没有。无任何服务端组件经 headers() 读 x-zp-ab-variant 或 cookies() 读 zp_ab_bucket（F1 反向验证 + F2：page/layout 不引 next/headers；AbVariant 标识符在 3 文件之外 0 命中）。移除注入后 SSR HTML 完全不变：H1 仍为 HERO_H1_VARIANTS.A、CTA 仍为 CTA_VARIANTS.A、title/description 本就不受 A/B 控制。H1 是 SEO 关键（首页唯一 H1、sr-only 进入 SSR HTML），但不受移除影响——SSR 恒 A，前后逐字节一致。

### Q3 客户端 fallback / 自写 cookie / hydration
已存在：analytics.ts:127-141，且自写 cookie（:137，30 天 SameSite=Lax，与 middleware 注入属性一致）+ 上报 ab_assigned（:139）。当前无 hydration mismatch（F3：useState('A') + useEffect 安全式）。唯一回归红线：不要把读取提前到渲染期/初始化器。

### Q4 「A/B 全客户端化」最小改动清单
要求「SSR 默认输出 = 现状 variant A、B 仅客户端生效」——该要求现状已自动成立（SSR 本就恒 A），改动只需拆掉服务端注入：
1. src/middleware.ts:31-34 —— 删除 A/B 注释块（3 行）与 type AbVariant = 'A' | 'B';
2. src/middleware.ts:36-42 —— 删除 pickVariant 函数整体
3. src/middleware.ts:297-304 —— 删除注释行、const variant = pickVariant(request);、response.cookies.set('zp_ab_bucket', ...) 整块、response.headers.set('x-zp-ab-variant', variant);
4. 必须保留：:287-288 函数壳与 NextResponse.next()、:289-296 全部安全头、其后 return response、:198/:284 两个调用点、文件尾 config.matcher —— 一行不动
5. src/lib/analytics.ts —— 零改动（fallback 已自足）。可选 docs 清理：头注释（:1-10「Vercel Edge Config」）与尾注释（:188-191「cookie 分组由 middleware 写入」）改为「分组完全由客户端 cookie 自持」，避免下一个读代码的人被陈旧注释误导
6. src/components/home/HeroBanner.tsx —— 零改动（useState('A') + useEffect 已满足要求）
7. 验证：node scripts/check-encoding.js + npx tsc --noEmit（应 0 新错）+ rg 六关键词确认 middleware.ts 0 命中 + 本地/curl 首页确认响应无 Set-Cookie: zp_ab_bucket、无 x-zp-ab-variant，SSR HTML 的 H1/CTA 仍为 A 文案

移除后丢失的行为：
- 服务端首触 Set-Cookie（无任何服务端消费者，纯冗余）
- x-zp-ab-variant 响应头可观测性（curl/监控/CDN 日志不再能直接看到分组；仓库内 0 依赖，站外依赖待证项 1）
- cookie 续期方式：从「每次响应滑动续期 30 天」变为「客户端首次写入的固定 30 天」（轻微：老用户桶位仍稳定，仅到期语义从滑动变固定）
- ab_assigned 事件量：约 0 → 每个新访客都触发（分析口径变化，属修正而非退化；hero_ab_exposure 不变）
- 分组时机：从边缘（HTML 响应头阶段）推迟到客户端 hydration 后（对无 JS 爬虫无意义——SSR 本就不依赖分组）

无影响项：
- SSR 全部输出（title/H1/meta description/正文）——恒 A，前后一致
- 安全头（同函数内独立代码段，保留即可）
- 301/308 重定向行为（重定向响应本就不经过注入函数）
- hydration 稳定性、变体跨访问稳定性、50/50 分布（客户端自持）
- 非首页页面（全站本就无第 2 个消费者）

### Q5 结论
移除安全（高置信）。不存在改变 SEO 关键 SSR 输出（title/H1/description）的风险点：title/description 与 A/B 机制零关联；首页唯一 H1 的 SSR 输出恒为 variant A，移除前后逐字节一致。两个非阻断注意项：
- (a) 站外若存在读取 x-zp-ab-variant 的监控/Cloudflare 规则，需先排查（仓库内无任何读取者，见待证项 1）
- (b) B 文案含 'Shenzhen Factory Direct / 深圳自社工場'（en/ja，§13.10 敏感口径），但其暴露面仅限客户端 hydration 后的 B 分桶用户，与本次移除无关；若 K3 想彻底关停实验（连客户端 B 也下线），属另一改动（HeroBanner 硬编码 A 或删 B 文案），不在本清单范围

## 待证项
1. x-zp-ab-variant 是否被 Cloudflare 仪表板规则 / 外部监控 / Logpush 过滤器引用——仓库内不可证。查法：Cloudflare Dashboard → Rules / Workers 路由 / Logpush 过滤条件中搜该头名；或直接问 K3 是否有人用 curl 看这个头。
2. 本报告行号为 2026-10-15 快照；实际执行改动前应先 git status 确认工作区干净、git log 确认基线 commit（本次只读纪律下未取 HEAD）。
3. Plausible/GA4 后台是否有人消费 ab_assigned 口径（移除后事件量形态会变）——建议移除前知会 K3。

## 建议的下一步
1. 若拍板移除：按 Q4 清单执行。middleware.ts 属路由层文件，不适用 §0.25.10「小改动免预览直推」（触及路由层），走攒批 + 全量门禁；且 §0.0 红线「不得改动 middleware 301 映射」——本清单全部改动位于 A/B 段与 :31-42 辅助定义，与 301 段（QUOTE_PRODUCT_MAP 及各重定向分支）零交集，执行时逐行 diff 核对。
2. 改动合并进下一次合规 push，push 后 node scripts/verify-deploy.mjs + 线上 curl 抽查首页响应头与 H1。
3. 移除后观察 1-2 周 ab_assigned / hero_ab_exposure 事件分布，确认客户端分组仍约 50/50、无异常聚类。

## 附：检索记录（可复跑）
- rg -n "zp_ab_bucket" src/ → middleware.ts:38,299; analytics.ts:124
- rg -n "x-zp-ab-variant" src/ → middleware.ts:304
- rg -n "getAbVariant" src/ → middleware.ts:297(注释); analytics.ts:127; HeroBanner.tsx:8,77
- rg -n "HERO_H1_VARIANTS|CTA_VARIANTS" src/ → middleware.ts:32(注释); HeroBanner.tsx:100,142,165; analytics.ts:148,166,191(注释)
- rg -n "zp_ab" src/ → 同 zp_ab_bucket 3 处，无其他变体
- rg -n "abVariant|AbVariant" src/（排除 3 文件）→ 0 命中
- rg -n -i "edgeConfig|EDGE_CONFIG|edge-config" src/ → 0 命中
- rg -n "thisResponseWithAbHeaders|pickVariant" src/middleware.ts → :31,36,198,284,287,298
- rg -n "<h1" src/（全站）→ 多页各有 h1；首页 14 组件 + page.tsx 范围内唯一 = HeroBanner.tsx:100
- rg -n "next/headers" page.tsx / layout.tsx / src/components/home/ → 0 命中
- rg -n "noUnusedLocals|strict" tsconfig.json → :11 strict true

（报告完 · 2026-10-15 · 只读调查，未触碰 src/）
