# ZprintPro 优化提示词 v3 — AutoClaw GLM 5.2 攻坚专用

> **生成时间**: 2026-06-28 19:30 (Asia/Shanghai) · **v3 重大修正**
> **v2 错判**: 以为"大部分关键词已排首页"，实际 GSC 数据显示平均排名 27.7（第 3 页）
> **v3 核心修正**: **流量是最大瓶颈，不是转化。SEO/GEO 攻坚优先于 CRO。**

---

## 0. GSC 真实数据（2026-05-30 ~ 2026-06-26, 28 天）

| 指标 | 数值 | 含义 |
|------|------|------|
| 总点击 | **67** | ~2.4 次/天 |
| 总展示 | 6,610 | 有曝光但无点击 |
| 平均 CTR | **1%** | 第 3 页水平 |
| 平均排名 | **27.7** | 第 3 页，远未到首页 |
| Top query | "香港印刷" | 1 点击 / 129 展示 / 排名 36.1 |
| 展示峰值 | 6 月 11 日 | 波动大，不稳定 |

**结论**: 排名第 3 页 = 没人点。需要把平均排名从 27.7 → <10。

---

## 1. 已完成清单（AutoClaw 不要重复做）

- ✅ 联系页 4 组件重构（信任栏/QR 放大/地址简化/双联系卡片）— fec0ac8
- ✅ JsonLd 3→1 合并修复 Edge Runtime 500 — 0a5eca5
- ✅ Hero HK 文案全清除（6 处）— fc43acf
- ✅ 首页 SEO 标题 HK→深圳 — 4f2c75f
- ✅ Sitemap 4 份 + sitemap-index.xml — 9ea4ef0
- ✅ geoConfig 深圳化 + phonePrefix +86 — 9ea4ef0
- ✅ OG description Shenzhen — 7ad6f2e
- ✅ /returns/ 308 重定向 — 7ad6f2e
- ✅ Hero zh-hk/en/ja 文案对齐跨境实体 — fc43acf

---

## 2. 🔴 GLM 5.2 攻坚任务（v3 重排序：SEO/GEO 优先）

### 任务 1: AI 搜索 GEO 优化 ⭐⭐⭐⭐⭐ (最高优先级)
**价值**: 给 ChatGPT/Claude/Perplexity 喂结构化数据，开辟全新流量源（0→1）
**积分**: 8-10

**要交付文件**:
- `/public/llms.txt` — 列全部 79 SKU + 价格 + FAQ，喂 AI 训练抓取
- `/public/llms-full.txt` — 完整产品目录 + schema 数据
- 每产品页 `speakable` schema（语音搜索友好）
- 每产品页 `HowTo` schema（工艺流程，结构化答案）
- 每产品页 FAQ schema（3-5 问，直接回答搜索意图）
- `robots.txt` 加 `Allow: /llms.txt`
- Bing IndexNow API 集成（每次 push 自动 ping）
- Bing Webmaster Tools 提交记录

**验收**: `curl https://zprintpro.com/llms.txt` 200 + ChatGPT 搜索"zprintpro sticker printing"能引用

---

### 任务 2: Core Web Vitals 90+ ⭐⭐⭐⭐⭐
**价值**: 直接 SEO 排名因子。平均排名 27.7，Web Vitals 差 = Google 不给排名
**积分**: 6-8

**具体目标**:
- LCP < 2.5s（hero 图片 preload + webp 优化）
- INP < 200ms（defer 非关键 JS）
- CLS < 0.1（所有图片加 width/height + aspect-ratio）
- 89 个产品 jpg → webp（q=80）+ blur placeholder
- 字体 subset + preload + font-display:swap
- 找出 top 3 大 JS chunk，拆分 + lazy load
- `.lighthouserc.json` + CI 自动检测

**验收**: Lighthouse 3 locale 首页 90+

---

### 任务 3: 站内 SEO 内链 hub-spoke ⭐⭐⭐⭐
**价值**: 内链是 Google 理解网站结构的核心信号，影响爬虫深度和排名
**积分**: 5-7

**要求**:
- 每个 pillar page → 链接 5-10 个相关 product/category
- 每个 category → 链接所有 product + 1 个 pillar
- 每个 product → 链接同品类 4-6 个 product + 父级 category + 1 buying guide
- Anchor text 用关键词（"專業防水貼紙印刷"），不用 "click here"
- Footer 内链扩充：加 "Popular Products" + "Top Categories" 两行
- 内链图可视化文档 `docs/internal-link-map.md`

**验收**: 每个产品页至少 8 个站内链（不含 nav/footer）

---

### 任务 4: SKU 批量生图 ⭐⭐⭐⭐
**价值**: 产品图质量直接影响搜索结果的图片展示（Google Images）和点击率
**积分**: 4-6

**具体**:
- 优先处理 6 个 cluster: **stickers(5) / flyers(6) / boxes(6) / paper-bags(2) / labels(3) / red-packets(6) = 28 张** (主推贴纸/宣传单张/包装盒, 名片/日历不赚钱)
- 使用 Seedream 4.5 或 Kimi 2.6 API
- 文件命名: `zprintpro-{category}-{slug}-{locale}.jpg`
- 最低 800x600，>50KB，风格统一
- 3 locale alt 文本（从 image-prompts.md 取）
- 进度记录 `seedream-progress.json`
- 失败重试 3 次，rate limit 退避

**验收**: 33 张新图落地 `public/images/products/`

---

### 任务 5: 首页 Hero + 主 CTA 重构 ⭐⭐⭐⭐
**价值**: 流量进来后第一眼决定跳不跳
**积分**: 6-9

**当前 Hero 基础已修完**（fc43acf 清除了 HK 文案），需要增强：
1. 首页主 CTA "立即獲取報價" — 目前 hero 轮播图每张有 CTA 但不够突出
2. 价格快速查询条（Hero 下方）：选品类 → 输入数量 → 显示预估价格 → 跳转 contact
3. 多 locale switcher（真 dropdown，不是纯链接）
4. 移动端优化（hero 高度 < 80vh，按钮全宽）

**验收**: Google PageSpeed 检测 Hero LCP < 2.5s + 3 locale 截图

---

### 任务 6: 实时报价引擎 ⭐⭐⭐⭐
**价值**: "30 秒 AI 报价"品牌承诺的实际交付
**积分**: 10-15

**要求**:
- 基础价 × 数量阶梯折扣 × 加急费率 × 工艺加价
- HKD/USD/JPY 三币种
- API: `/api/quote/calculate`（POST，Edge runtime 兼容）
- 价格浮动 ±15%（留议价空间）
- 30 秒同参数缓存（CF KV）
- A/B 埋点: quote_calculated

**验收**: `curl -X POST /api/quote/calculate -d '{"product":"premium-stickers","qty":500}'` 返回有效价格

---

### 任务 7: 信任体系 ⭐⭐⭐⭐
**积分**: 7-10

**要求**:
- 客户 logo 墙（12+ 真实行业 logo，灰度 hover 变彩色）
- 证书徽章条（ISO 9001 / FSC / G7 / SEDEX + tooltip）
- Case Study（3 个真实案例：行业/痛点/方案/结果，200 字 + 1 图）
- Review/Testimonial（6-9 条客户评价，Schema: Review）
- StatsBar 数据标注来源（或去掉无数据支撑的指标）

**验收**: Trust schema Rich Results Test 通过

---

### 任务 8: 联系页增强（多步表单 + 埋点）⭐⭐⭐
**积分**: 6-9（已降，因为基础已修完）

**在 fec0ac8 基础上加**:
- 3 步表单向导（Step1 选品类 → Step2 数量规格 → Step3 联系方式）
- 进度指示器（圆点 + 连线，动画过渡）
- 4 个 A/B 事件: form_start / step_complete / form_submit / cta_click
- URL 预填充支持（`?product=slug&qty=1000`）

**验收**: 3 locale 截图 + Plausible 事件数据

---

### 任务 9: 拖拽上传 + Turnstile ⭐⭐⭐
**积分**: 4-6

**要求**:
- 拖拽上传（PDF/AI/PSD/PNG，max 10MB，最多 5 个）
- Supabase Storage 存储
- Cloudflare Turnstile 防 spam
- Edge runtime 兼容

**验收**: 拖拽文件 → 上传成功 → Supabase 确认

---

### 任务 10: Plausible + A/B testing ⭐⭐⭐
**积分**: 6-8

**要求**:
- Plausible script 注入（no cookie，GDPR 友好）
- 事件: hero_cta_click / product_view / quote_form_start / quote_form_submit / whatsapp_click / phone_click
- Funnel: 首页 → 产品 → 联系 → 提交
- Privacy policy 更新
- 事件文档 `docs/analytics-events.md`

**验收**: Plausible dashboard 显示数据

---

## 3. 🟡 M3 简单任务（不消耗 AutoClaw）

| 任务 | 耗时 |
|------|------|
| 单文件文案修改（任何 locale） | <5min |
| Schema 单个修正 | <5min |
| 308 重定向添加 | <5min |
| 价格/货币显示验证 | <10min |
| curl + HTML 关键词验证 | <5min |
| push + 部署后监控 | 5min/次 |
| 真实浏览器截图验证 | 5min/次 |
| GSC 数据定期分析 | 30min/次 |
| Nav/footer 链接微调 | <15min |

---

## 4. 已踩坑警告（22 条，每次执行前必读）

1. ❌ 品牌名写"智印港" → 永远是"智印雲/ZprintPro"
2. ❌ 地址写 HK 观塘 → 实际深圳龙岗平湖
3. ❌ OG 写 "Hong Kong factory" → 写 "Shenzhen factory"
4. ❌ SVG `<animate>` + next/image → Edge Runtime streaming 崩溃
5. ❌ 3 个独立 `<JsonLd dangerouslySetInnerHTML>` → RSC streaming 末尾崩溃
6. ❌ react-hook-form + Edge Runtime → 必须 dynamic import + ssr:false
7. ❌ Service Worker 缓存 → 当前已禁用
8. ❌ buffer/fs/crypto node API → Edge Runtime 不可用
9. ❌ iframe + CSP frame-src → OSM 嵌入失败
10. ❌ placeholder.jpg 零字节 → 验证每个图片 mtime + size
11. ❌ aggregateRating.reviewCount 非整数 → GSC "无效整数"警告
12. ❌ hreflang 缺 x-default / en-GB / en-AU
13. ❌ description 字符 < 70
14. ❌ CF Pages Free plan 1046 rate limit → wrangler 频繁 deploy 触发
15. ❌ PowerShell `&&` / `head` / `grep` → 用 `;` / `Select-Object` / `Select-String`
16. ❌ PowerShell `[locale]` 方括号变通配符 → 用 `-LiteralPath`
17. ❌ Remove-Item 默认拦截 → 用 mavis-trash
18. ❌ CRLF 替换 LF → Python open(write) 加 `newline=''`
19. ❌ CF Pages 构建状态 → GitHub check_runs API
20. ❌ CDN 边缘节点缓存 → 加 cache buster 验证
21. ❌ CDN 边缘节点同步延时 → 多地理节点 curl + 真实浏览器验证
22. ❌ HTTP 200 不代表修复成功 → 必须 HTML 关键词 + 多节点 + 真实浏览器三重验证

---

## 5. 核心约束

- **Edge Runtime**: 不可用 fs/Buffer/crypto/node API
- **No framer-motion**: 只 CSS transitions + Tailwind
- **SEO**: hreflang 完整 / canonical 正确 / schema 验证
- **i18n**: 3 locale 全覆盖，文案不硬编码，通过 translations 对象
- **NAP**: 深圳实体统一（No.1 Jiacheng Road, +86 198 8085 1334, zprintpro@outlook.com）
- **布局**: max-w-[1320px] 全局不变
- **品牌色**: #2873F5 蓝 / #F87314 橙 / #7C3AED 紫 / #10B981 绿

---

## 6. 执行工作流

1. 读 AGENTS.md + 本文 §4 已踩坑 → 理解项目约定
2. 读相关源文件 → 理解现有实现
3. 写代码 → 每个 commit 单任务
4. `npx next build` → 验证构建通过
5. `git commit` + `git push origin_ssh main`
6. 等 CF Pages 自动部署（~2min）
7. 验证: `curl -s -o /dev/null -w '%{http_code}' https://zprintpro.com/{path}` + HTML 关键词 grep + 真实浏览器截图

---

## 7. 执行顺序

```
Phase 1: SEO 流量增长 ⚡ (当前瓶颈)
  ① 任务 1 (AI GEO) + 任务 2 (Web Vitals) — 可并行
  ② 任务 3 (内链 hub-spoke)
  ③ 任务 4 (SKU 生图)

Phase 2: 转化优化 🔥
  ④ 任务 5 (Hero CTA) + 任务 7 (信任体系) — 可并行
  ⑤ 任务 6 (定价引擎) → 任务 8 (联系页增强)

Phase 3: 基础设施
  ⑥ 任务 10 (Plausible)
  ⑦ 任务 9 (拖拽上传)
```