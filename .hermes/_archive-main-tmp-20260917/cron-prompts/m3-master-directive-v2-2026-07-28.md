# M3 Master Directive v2 · 2026-07-28
# SSoT: F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md
# 版本: v2 (替代 v1 2026-07-27)
# 生效: 2026-07-28T03:34+08:00 → 2026-08-12T23:59+08:00
# 作者: K3 (战略) + M3 (执行)
# 状态: ACTIVE

---

## §0 强制执行约束（红线，任何阶段不可违反）

> **【v3 增补 2026-08-23 06:38 K3 拍板】** 必读 `F:\zprintpro-nextjs\.hermes\cron-prompts\k3-v3-addendum-2026-08-23.md` (最高优先级 SSoT)
> **【v3 §0.21 报告格式简化 2026-08-20 11:54 K3 拍板】** 报告不列 push 计数, 攒批策略作废, 释放 token 给 SEO+GEO 业务目标
> **【v3 业务 0 改动红线 2026-08-22 17:58 K3 F0 拍板】** 不删 SKU / 不删文案 / 不删长文本字段内容, 1 次修复不盲修
> **【v3 5 SOP 完整谱系 2026-08-22-8/23 K3 拍板】** SOP-1 红灯冻结令 / SOP-2 阈值二元化 / SOP-3 根因 diff 优先 / SOP-4 债务熔断 / SOP-5 派生数据禁手搓 / SOP-6 lock 双验证 / SOP-7 验收数字附原文 / SOP-8 撞车兜底 / SOP-9 验证 > 假设

| # | 约束 | 验证方式 |
|---|------|---------|
| 0.1 | ~~每天 ≤1 push（攒批，origin_ssh main）~~ → v3 §0.21 作废攒批策略, 报告不列 push 计数 | git log --oneline (K3 拍板后立即 push, 不攒批) |
| 0.2 | push 后 verify-deploy PASS 才算完成 | curl -sI https://zprintpro.com \| grep "200" |
| 0.3 | 封版零改动文件清单（见下） + **v3 业务 0 改动红线** (不删 SKU/文案/长文本) | diff 检查 + 业务字段级 grep |
| 0.4 | 内链先核后写：curl 验证目标 URL 200 后才写入 (§13.6 单数 /product/ + §13.10 NAP 脱钩 + §13.16.1 ja 品牌词「ジープリント」) | curl -sI <url> \| head -1 |
| 0.5 | 不删/不改现有 slug/不加地区词（除非本文件明确指示） | — |
| 0.6 | 拿不准 → 选保守方案，报告标注，继续下一任务 + **v3 SOP-1 红灯冻结令** (build FAIL 立即停手, 含"无关"任务) | — |
| 0.7 | **v3 SOP-2 阈值二元化** (禁"勉强/基本/差不多", 验收只有达标/未达标) | 报告措辞检查 |
| 0.8 | **v3 SOP-3 根因 diff 优先法** (先 diff 正常 vs 异常列结构差异, 机制猜测必附验证方法) | `git show --stat` + `git diff` |
| 0.9 | **v3 SOP-4 债务熔断** (每版本延后 ≤2 任务, 跨版本不重复延后) | matrix.json 延后任务追踪 |
| 0.10 | **v3 SOP-5 派生数据禁手搓** (sitemap/RSS/schema 必脚本化 + 抽 3 条字段级比对) | 脚本生成 + 抽样验证 |
| 0.11 | **v3 SOP-6 lock 双验证** (动 package.json/lock 必跑 `npx npm@10.9.2 install --package-lock-only` + `ci --dry-run`) | 双命令输出 |
| 0.12 | **v3 SOP-7 验收数字附原文** (禁"3 闸门全过"虚报, 必附 `tsc`/`build`/`verify-deploy` 实际输出) | 命令输出原文 |
| 0.13 | **v3 SOP-8 撞车兜底** (派活前 3 问 + 抢跑识别 tsc+build 必过 + 兜底 rebase) | `git status` + `npx tsc --noEmit` + `npm run build` |
| 0.14 | **v3 SOP-9 验证 > 假设** (T43 反直觉: 任何"前提 XXX 缺失"修复, 必先实测线上 HTML 验证; GSC rich results 是观察项, 禁盲改) | `curl + grep` 线上验证 |

### 封版文件清单（绝对不可修改）
page.tsx (hero 区域)
Card.tsx (所有卡片组件)
HotProducts.tsx
RelatedProducts.tsx
pricing.ts
price_range (任何引用)
price-data.generated.ts
文本

编辑




---

## §1 决策权限表

### M3 可自走（不问人，直接做）

| 事项 | 范围 |
|------|------|
| slug 改造 + 301 重定向 | 本文件 §3 明确列出的映射 |
| JSON-LD Schema 追加 | 仅在 <head> 加 <script type="application/ld+json">，不动 DOM |
| FAQ 内容补充 | 每页 3-5 个 Q&A，与本文件 §5 模板一致 |
| 内链添加 | 目标 URL 已验证 200，锚文本为实体名词短语 |
| GSC 数据读取 + 报告撰写 | 只读，不改 GSC 设置 |
| 校园词内容创作 | 按 §5 GEO 格式化模板 |
| CTR 优化（title/description） | 不改 H1，只改 <title> 和 meta description |
| 报告写入 .hermes/reports/ | K3 格式 |

### M3 必须停手升级（5 条红线）

| # | 触发条件 | 动作 |
|---|---------|------|
| 7.1 | 需要删除任何现有页面/内容 | 停手，报告标注，等 K3 |
| 7.2 | 需要修改 pricing / price_range / 任何价格数据 | 停手 |
| 7.3 | 需要修改 hero / Card 组件 / HotProducts / RelatedProducts | 停手 |
| 7.4 | GSC 发现手动惩罚（Manual Action） | 停手，立即报告 |
| 7.5 | 任何操作可能导致现有排名下降 >20% | 停手，报告风险评估 |

---

## §2 战略背景（K3 可读，M3 参考）

### 2.1 站点历史（事实修正）

| 事实 | 数据 |
|------|------|
| z-printpro.com 上线 | 2025年12月底 |
| zprintpro.com 上线 | 2026年5月8日 |
| 301 重定向实施 | 2026年5月8日（z-printpro.com → zprintpro.com） |
| 301 权重传递率 | **90%**（已确认） |
| 301 后经过天数（截至7/28） | **81 天** |
| 301 完全传递预计 | 2026年8月-11月（3-6个月窗口） |
| 当前月收入 | ~100 RMB ≈ $14 |
| 目标 | $50,000/月 |

### 2.2 目标可行性判断（基于行业事实）

| 来源 | 数据 |
|------|------|
| CSDN 2026 SEO 指南 | 新站到月均 1万+ 自然访客需 6-12 个月 |
| 搜狐 SEO 周期分析 | 竞争激烈赛道排名周期 8-12 个月+ |
| Ahrefs + Pew Research | AI Overviews 使前 3 名 CTR 下降 15-46% |
| Gartner 2026 预测 | 传统搜索流量同比下降 25% |
| IDC 2026.7 | 全球 GEO 市场规模突破 $120 亿 |
| Perplexity 数据 | 月处理 7.8 亿次查询，月增长 20%+ |
| 天极网 2026.4 | 有系统 GEO 布局的品牌，AI 引用率高 4.2 倍 |
| 出海品牌 GEO 实操指南 | Schema 标记使 AI 实体识别率从 35% → 85%+ |

### 2.3 结论

- **一年 $50k/月：纯 SEO 不可能**（需 3,571x 增长，行业无先例）
- **301 继承节省 1-2 个月**，不改变量级
- **务实 12 个月目标：$15,000-$25,000/月**（SEO + GEO + 付费 + B2B 多引擎）
- **$50k/月 现实时间线：18-24 个月**
- **当前两周（7/28-8/12）定位：播种期，不是收割期**

### 2.4 双引擎策略：SEO + GEO

| 引擎 | 定义 | 对 zprintpro 的意义 |
|------|------|-------------------|
| SEO | 让 Google 排名你 → 用户点击 → 进站 | 基础流量，但被 AI Overviews 侵蚀 |
| GEO | 让 AI（ChatGPT/Perplexity/Google AIO）引用你 → 品牌曝光 → 直接访问/品牌搜索 | 增量渠道，竞品已占位，你必须出现 |

> "如果 Rich Results Test 结果是 '0 structured data items detected'——你的独立站在 AI 世界里等于一张白纸。"  
> — 百家号《2026年外贸获客巨变》2026.7.15

> "JSON-LD 必须置于 <head> 或 <body> 末尾，使用 <script type="application/ld+json"> 标签，不可动态插入、不可嵌套在其他 HTML 标签内，且需服务端渲染。"  
> — php中文网《HTML结构化数据实战》2026.6.22

---

## §3 P1：v22 名片→贺卡改造 + Schema 基建（7/28）

### 3.1 幂等性检查（BEFORE any action）
(1) products.ts 是否已存在 slug 'premium-greeting-cards'?
(2) next.config.js redirects 是否已有 premium-business-cards → premium-greeting-cards?
(3) 任何产品页 是否已有 含 "@type": "Product"?
全 yes → "ALREADY DONE: P1" 退出
任一 no → 从对应步骤开始
文本

编辑




### 3.2 执行步骤（顺序不可乱）

| 步骤 | 动作 | 验证 |
|------|------|------|
| 1 | products.ts: 6 SKU 1:1 映射（business-cards → greeting-cards） | grep slug 确认 |
| 2 | next.config.js: 21 条 301 重定向（旧 slug → 新 slug，含 3 locale） | curl -I 每条返回 301 |
| 3 | ja locale: 年賀状标题优化（抢 10 月峰值） | grep 年賀状 确认 |
| 4 | **所有产品页 <head> 加 JSON-LD**（见 §3.3） | Rich Results Test PASS |
| 5 | **首页 <head> 加 Organization Schema**（见 §3.4） | Rich Results Test PASS |
| 6 | 验证 6 步全过 → 写报告 | 见 §3.5 |

### 3.3 产品页 JSON-LD 模板（每个产品页必须包含）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{PRODUCT_NAME}}",
  "description": "{{PRODUCT_DESCRIPTION_150_CHARS}}",
  "image": "https://zprintpro.com{{MAIN_IMAGE_PATH}}",  // 用 PDP imagesByLocale[locale][0] 现有路径, 禁止虚构 -og.jpg
  "url": "https://zprintpro.com/{{LOCALE}}/product/{{SLUG}}/",  // K3 修订: 单数 product (§13.6 禁止 /products/)
  "brand": {
    "@type": "Brand",
    "name": "ZPrintPro"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "{{PRICE}}",
    "availability": "https://schema.org/InStock",
    "url": "https://zprintpro.com/{{LOCALE}}/product/{{SLUG}}/"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
</script>
约束：
必须服务端渲染（Next.js getStaticProps / 组件内直接输出），禁止 useEffect 动态注入
price 必须与 pricing.ts 一致（只读引用，不改 pricing.ts）
如果无真实评价数据，删除 aggregateRating 字段（不可编造）

### 3.4 首页 Organization Schema

html

预览


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ZPrintPro",
  "url": "https://zprintpro.com",
  "logo": "https://zprintpro.com/logo.png",
  "description": "Custom printing service for greeting cards, packaging boxes, stickers, flyers, and educational materials. Serving USA, Japan, and Hong Kong.",  // K3 修订: §11 禁名片词
  "foundingDate": "2025-12",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "龍崗区平湖街道嘉城路1号",
    "addressLocality": "深圳市",
    "addressRegion": "広東省",
    "postalCode": "518111",
    "addressCountry": "CN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "zprintpro@outlook.com",
    "availableLanguage": ["English", "Japanese", "Chinese"]
  },
  "sameAs": []
}
</script>

3.5 P1 验收 6 步

表格
#	验收项	通过标准
1	6 SKU slug 改造完成	products.ts grep 确认
2	21 条 301 全部生效	curl -I 每条返回 HTTP 301 + 正确 Location
3	年賀状 ja 标题就位	grep 確認
4	Rich Results Test: 产品页 Product Schema PASS	https://search.google.com/test/rich-results
5	Rich Results Test: 首页 Organization Schema PASS	同上
6	verify-deploy PASS + 4 页 200	curl 验证
报告输出：.hermes/reports/m3-p1-v22-2026-07-28.md
§4 P2：GSC 周检 + AI 可见性基线（7/29）

4.1 触发条件

cron once 8534c688 于 7/29 06:00 自动触发
或 K3 手动触发

4.2 GSC 检查项（原有，保持）

表格
检查项	工具	记录
收录页面数	GSC → 网页索引	数字 + 趋势
展示量 / 点击量 / 平均排名	GSC → 效果报告	截图或数字
301 传递状态	GSC 对比 z-printpro.com vs zprintpro.com	旧域名展示是否归零
CTR 异常词	GSC → 效果 → 按 CTR 排序	列出 CTR < 2% 且排名 < 10 的词
核心词排名	GSC → 效果 → 筛选核心词	记录当前排名

4.3 AI 可见性基线（新增，GEO 核心）

执行方式：M3 无法直接访问 AI 工具。此段标记为 [K3 人工节点]。
K3 在 7/29 花 5 分钟完成以下测试，结果写入报告：
表格
#	测试问题	工具	记录
1	"best custom greeting cards printing online"	ChatGPT	zprintpro 是否出现？Y/N
2	"custom business cards printing service"	ChatGPT	同上
3	"back to school printing service for teachers"	Perplexity	同上
4	"年賀状 印刷 オンライン 注文"	ChatGPT (ja)	同上
5	"練習冊 印刷 香港"	ChatGPT (zh)	同上
6	"custom greeting cards printing"	Google 搜索	AI Overview 是否引用 zprintpro？Y/N
7	"back to school printing"	Google 搜索	同上
记录格式：
markdown

编辑



## §AI 可见性基线 2026-07-29

| # | 问题 | 工具 | zprintpro 出现 | 备注 |
|---|------|------|---------------|------|
| 1 | ... | ChatGPT | N | 推荐了 Canva, Vistaprint, Moo |
| 2 | ... | ... | ... | ... |

基线总结: 0/7 出现 → 起点为零，8/12 对比

4.4 P2 报告输出

.hermes/reports/m3-p2-gsc-2026-07-29.md
包含：
§GSC 数据段
§301 传递状态段
§AI 可见性基线段（K3 填入）
§CTR 候选词库存段（供 P4 使用）
§5 P3：校园着陆页 + GEO 格式化内容（7/30-8/5）
5.1 内容清单
表格
#	页面	类型	Locale	Slug
1	校园教育类目页 hero 强化 (现有页, 不新建)	类目 hero	zh-hk	/zh-hk/category/educational/ (K3 修订: 现有类目, 只做 hero 强化)
2	Back-to-School Printing Guide	博客	en	back-to-school-printing-usa (K3 修订: 与 §8 blocklist 对齐)
3	夏休み明け教材印刷ガイド	博客	ja	new-semester-printing-japan (K3 修订: 与 §8 blocklist 对齐)

5.2 GEO 格式化写作模板（每篇必须遵循）

markdown

编辑



# {{H1: 包含核心实体 + 动作}}

{{开头段: 50字内直接回答"这是什么/为什么需要"，AI 优先抓取首段}}

## {{H2: 用户会问 AI 的完整问题}}

{{回答段: 100-200字，包含具体数据点}}

### よくある質問 / FAQ

**Q: {{具体问题}}**
A: {{具体回答，含数字/时间/价格}}

**Q: {{具体问题}}**
A: {{具体回答}}

**Q: {{具体问题}}**
A: {{具体回答}}

## {{H2: 第二个用户问题}}

{{回答段}}

## 関連サービス / Related Services

- [{{实体名词短语锚文本}}](/products/{{slug}}) ← 内链，curl 验证 200
- [{{实体名词短语锚文本}}](/products/{{slug}})

5.3 GEO 内容硬性约束

表格
#	约束	原因
1	每篇 ≥3 个 Q&A 段落	AI 优先引用问答结构（来源：简米科技 GEO 指南）
2	每篇加 FAQPage Schema（与 Q&A 一一对应）	AI 实体识别率 35%→85%（来源：出海品牌 GEO 实操指南）
3	每篇 ≥1 个可引用数据点	AI 偏好有数据支撑的内容
4	内链锚文本 = 实体名词短语	禁止 "click here" / "詳しくはこちら" / "了解更多"
5	首段 50 字内回答核心问题	AI 抓取首段作为摘要
6	正文 ≥900 字（不含 HTML 标签）	K3 R1 拍板标准
5.4 FAQPage Schema 模板（每篇博客/类目页必须加）
html

预览




<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{问题1}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{回答1}}"
      }
    },
    {
      "@type": "Question",
      "name": "{{问题2}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{回答2}}"
      }
    },
    {
      "@type": "Question",
      "name": "{{问题3}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{回答3}}"
      }
    }
  ]
}
</script>

5.5 互链规则

表格
来源页	链接到 (K3 修订: 单数 /product/ + 真实 slug)	锚文本示例
校园类目页 (zh-hk)	/zh-hk/product/premium-greeting-cards/	"定制賀卡印刷"
校园类目页 (zh-hk)	/zh-hk/product/exercise-books/	"練習冊印刷"
EN 博客	/en/product/premium-greeting-cards/	"custom greeting card printing"
EN 博客	/en/product/exercise-books/	"workbook printing service"
JA 博客	/ja/product/premium-greeting-cards/	"年賀状印刷"
JA 博客	/ja/product/exercise-books/	"ワークブック印刷"
每条内链写入前必须 curl -sI 验证 200; 非 200 跳过并报告标注。

5.6 P3 验收

表格
#	验收项	通过标准
1	3 页面上线 + 200	curl 验证
2	每页 FAQPage Schema PASS	Rich Results Test
3	每页 ≥3 Q&A + ≥1 数据点	人工/grep 确认
4	互链全部 200	curl 验证
5	正文 ≥900 字/页	wc 统计
6	verify-deploy PASS	—
报告输出：.hermes/reports/m3-p3-campus-2026-08-05.md
§6 P4：CTR 优化 + 8/12 复盘（8/6-8/12）
6.1 CTR 优化（攒批 1 push）
表格
动作	约束
优化 和 meta description	不改 H1，不改正文
目标：CTR < 2% 且排名 < 10 的词	从 P2 报告 §CTR 候选词库存 取
标题公式：`{{核心词}} - {{差异化}}	ZPrintPro`
Description 公式：{{问题回答}} + {{数据点}} + {{CTA}}	不超过 155 字符
6.2 8/12 复盘验收表
表格
#	指标	目标	数据来源
1	开学季询盘	≥5 条（原 10 条，因 301 传递未完成下调）	K3 人工数 WhatsApp
2	校园词排名	进前 50	GSC
3	收录页面数增长	+3 页（P3 新增）	GSC
4	Rich Results Test 全产品页 PASS	100%	Google 工具
5	AI 可见性对比（7/29 vs 8/12）	从 0/7 → ≥1/7	K3 人工测试
6	301 传递进度	旧域名展示量趋近 0	GSC 对比
7	总 push 数	≤14 天 × 1 = ≤14 次	git log
6.3 复盘报告格式
.hermes/reports/m3-p4-review-2026-08-12.md
markdown

编辑



# M3 P4 复盘 · 2026-08-12

## §北极星进度

| 指标 | 7/28 起点 | 8/12 终点 | 变化 |
|------|----------|----------|------|

## §SEO 数据
（GSC 截图/数字）

## §GEO 数据
（AI 可见性对比表）

## §301 传递状态
（旧域名 vs 新域名展示量对比）

## §已完成动作清单
（P1-P4 所有 commit 列表）

## §下阶段建议
（M3 可提议，K3 拍板）

## §K3 §6 段
（接受 0 候选常态说明）

## §建议扩容段
（不主动提议，仅记录观察）
§7 升级条件（M3 停手红线）
见 §1 决策权限表"必须停手升级"部分。补充：
表格
#	触发条件	动作
7.6	Rich Results Test 报错且无法自行修复	报告错误详情，继续下一任务
7.7	curl 验证内链目标 404	跳过该链接，报告标注
7.8	GSC 数据异常（展示量突降 >50%）	停手，立即报告
§8 Cron 同步状态
表格
Cron	Cron ID	本文件同步	7/29 P2 联动	8/12 验收
zprintpro-daily-content-1x7w	3684eb06	✅ v2	✅	—
zprintpro-gsc-feedback-loop	6f9a93af	✅ v2	✅	—
zprintpro-monthly-matrix-audit	9e3c442d	✅ v2	✅ 8/1 跑前读 P2 报告	✅ §北极星进度段
zprintpro-weekly-meta-refresh	69e01ab9	✅ v2 + 7/28 联动	✅ 8/3 跑前读 P2 报告	✅ §北极星进度段
zprintpro-revenue-analytics-weekly	ceecf2dd	✅ v2 + P3 校园词归因	✅ 7/31 跑前读 P2 报告	✅ 8/12 验收表必报
Blocklist（防 daily/weekly 抢写）
以下 2 个 slug 写入 4 cron 黑名单，daily/weekly 不可触碰：
back-to-school-printing-usa
new-semester-printing-japan
§9 拍板记录（K3 已确认）
表格
#	决策	结论	防御性追加
1	daily cron vs M3 P3 协调	daily cron 跑 B+C+F 兜底 + M3 P3 独立写 2 个新 slug	blocklist 2 slug 写进 4 cron
2	7/25-7/26 静默补跑？	不补跑（K3 v7 原则维持）	周报/月报 §K3 §6 段接受 0 候选常态
3	开新 weekly SKU 优化 cron？	不开新	月报/周报 §建议扩容 段不主动提议
4	R1 zh-hk Q-GR-03	接（3,359 字符含 HTML，折算 900+ 字达标）	不补
5	301 继承权重	90% 确认，沙盒期缩短 1-2 个月	8/12 验收预期下调
6	GEO 增强	纳入 P1-P4 全流程	Schema + Q&A 格式化 + AI 基线
§10 时间轴总览
文本

编辑



7/28 ─── P1: v22 改造 + Schema 基建 ──── 报告 m3-p1-v22-2026-07-28.md
  │
7/29 ─── P2: GSC 周检 + AI 基线 ──────── 报告 m3-p2-gsc-2026-07-29.md
  │         [K3 人工: AI 搜索测试 5 分钟]
  │
7/30 ─┐
  │   │
8/05 ─┘── P3: 校园 3 页 + GEO 内容 ──── 报告 m3-p3-campus-2026-08-05.md
  │
8/06 ─┐
  │   │
8/12 ─┘── P4: CTR 攒批 + 复盘 ────────── 报告 m3-p4-review-2026-08-12.md
            [K3 人工: WhatsApp 询盘计数]
            [K3 人工: AI 搜索复测对比]
§11 内链验证协议（§13.10 / §13.16.1 / §13.6 统一）
每次写入内链前：
bash

编辑



# 验证目标 URL 返回 200 (K3 修订: 单数 /product/)
curl -sI "https://zprintpro.com/{{LOCALE}}/product/{{SLUG}}/" | head -1
# 期望: HTTP/2 200

# 如果不是 200，跳过该链接，报告标注:
# "SKIP: /xx/product/yy returned {STATUS}"
§12 报告格式规范（K3 格式）
所有报告统一结构：
markdown

编辑



# M3 {{阶段}} 报告 · {{日期}}

## §摘要（3 行内）
## §数据（表格）
## §已完成动作
## §异常/跳过项
## §下阶段依赖
## §K3 审批栏（留空，K3 填）
§13 M3 执行入口指令（直接复制给 M3）
文本

编辑



【M3 主控指令 v2 · 7/28-8/12 全周期 · SEO+GEO 双引擎 · 自走模式】

BEFORE any other action, idempotency check:
(1) products.ts 是否已存在 slug 'premium-greeting-cards'?
(2) next.config.js redirects 是否已有 premium-business-cards → premium-greeting-cards?
(3) 任何产品页 <head> 是否已有 JSON-LD "@type": "Product"?
全 yes → "ALREADY DONE: P1" 退出; 任一 no → 从对应步骤开始。

唯一行动纲领: F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md
先完整读, 然后:

- 现在起执行 P1 (§3, 步骤 1-6 顺序不可乱, 含 Schema JSON-LD)
- P1 完成后不停, 按时间轴自走 P2 → P3 → P4
- 决策权限看 §1: 表内事项直接做不问人; §7 升级条件触发才停手
- 拿不准 → 选保守方案, 报告标注, 继续下一任务
- P3 内容必须遵循 §5.2 GEO 格式化模板 + §5.3 硬性约束

红线复述:
- 封版零改动: page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / price_range / price-data.generated.ts
- 每天 ≤1 push (攒批, origin_ssh main), push 后 verify-deploy PASS
- JSON-LD 必须服务端渲染, 禁止 useEffect 动态注入
- 内链先核后写 curl 验证 200
- 每 P 阶段完成写报告 .hermes/reports/m3-<阶段>-<日期>.md, ack 一行路径

第一里程碑: P1 v22 验收 6 步全过 (§3.5), 报告 m3-p1-v22-2026-07-28.md
§14 K3 挂起节点（人工介入点）
表格
节点	时间	K3 动作	耗时
P1 报告审核	7/28	审 m3-p1-v22-2026-07-28.md，纠偏不微观	10 min
AI 搜索基线测试	7/29	手动在 ChatGPT/Perplexity/Google 搜 7 词	5 min
P2 报告审核	7/29	审 m3-p2-gsc-2026-07-29.md	10 min
P3 报告审核	8/5	审 m3-p3-campus-2026-08-05.md	10 min
WhatsApp 询盘计数	8/12	数提到「練習冊/教科書/開學」的询盘	5 min
AI 搜索复测	8/12	重复 7/29 的 7 词测试，对比基线	5 min
8/12 总复盘	8/12	审 m3-p4-review-2026-08-12.md，决定下阶段	30 min
§15 附录：事实来源索引
表格
#	来源	日期	引用内容
1	CSDN《从零开始做谷歌SEO：2026完整优化流程指南》	2026	新站到 1万+ 访客需 6-12 个月
2	搜狐《做 Google SEO 多久才能看到效果？》	2026	竞争激烈赛道 8-12 个月+
3	Ahrefs + Pew Research 联合研究	2025-2026	AI Overviews CTR 下降 15-46%
4	Gartner 2026 预测	2026	传统搜索流量同比降 25%
5	IDC 最新研究	2026.7	GEO 市场规模突破 $120 亿
6	百家号《什么是 GEO》	2026.1	Perplexity 月 7.8 亿查询，AI Overview 点击降 20-50%
7	天极网	2026.4	系统 GEO 布局品牌 AI 引用率高 4.2 倍
8	出海品牌 GEO 实操指南	2026.7	Schema 使 AI 实体识别率 35%→85%+
9	百家号《2026年外贸获客巨变》	2026.7.15	0 Schema = AI 世界白纸
10	php中文网《HTML结构化数据实战》	2026.6.22	JSON-LD 必须 SSR，禁止动态注入
11	CSDN《GEO结构化数据标记实战》	2026.5.21	JSON-LD 是 AI 理解内容的桥梁
12	腾讯云《GEO优化新纪元》	2026.4.2	JSON-LD 进化为 AI 理解网页的翻译官
13	Google Search Central	2026	Organization Schema 官方文档
14	F5 Blog	2025.1	JSON-LD 帮助 AI 解释内容
15	Google 301 文档 + Ahrefs	2024-2026	301 传递 90-99% 权重，需 3-6 个月完成
§16 版本变更日志
表格
版本	日期	变更
v1	2026-07-27	初版，纯 SEO 计划
v2	2026-07-28	增加：301 继承事实修正 / GEO 双引擎 / Schema 基建 / AI 可见性基线 / 验收预期下调 / 事实来源索引
v2.1	2026-07-28	K3 修 4 处硬伤: ①/product/ 单数路径全量替换 (§3.3/§5.5/§11, §13.6 禁止 /products/) ②P3 slug 与 §8 blocklist 对齐 (back-to-school-printing-usa / new-semester-printing-japan, 防 cron 双写) ③Organization description 除名片词 (§11) + 补真实深圳 address (NAP 法务层) ④JSON-LD image 用 PDP 实有主图, 禁止虚构 -og.jpg; zh-hk 校园页改为现有 /zh-hk/category/educational/ hero 强化, 不新建 campus-printing
EOF · m3-master-directive-v2-2026-07-28.md
文本

编辑




---

## 使用说明

| 角色 | 怎么用 |
|------|--------|
| **K3（你）** | 读 §2 战略背景 + §9 拍板 + §14 人工节点。7/29 和 8/12 各花 5-10 分钟做人工测试。审核报告时只看 §摘要 + §异常 段。 |
| **M3（执行 Agent）** | 从 §13 入口指令启动，读全文后按 §3→§4→§5→§6 顺序执行。遇到 §7 条件停手。每阶段输出报告到 `.hermes/reports/`。 |
| **Cron** | 5 个 cron 读 §8 同步状态 + blocklist，不触碰 P3 的 2 个 slug。 |

**落盘路径**：`F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md`

如果你能提供 GSC 当前数据（展示量/点击/排名/收录数），我可以进一步精确 §4 的基线数字和 §6 的 CTR 优化候选词。