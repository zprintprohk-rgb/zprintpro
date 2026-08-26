# 内部上下文：ZprintPro（zprintpro.com）GEO+SEO 战略升级 v3.0 研究

## 项目基本盘（来源：项目 AGENTS.md + 内部战略文档）
- 站点：zprintpro.com，Next.js 印刷 SaaS 电商，8 locale（zh-hk/en/ja 为主），部署 Cloudflare Pages，支付 Airwallex。
- 真实主体：深圳市彩龙印刷包装有限公司（跨境接全球订单），双品牌分层：zh-hk=智印港 ZprintPro，en=ZprintPro，ja=ジープリント。
- 主营品类：贴纸/宣传单张/包装盒/纸袋/标签；禁区：名片（business-cards）永不写。
- 北极星：12 个月月营收 $20,000（2026-08-10 战略文档），三引擎：B2B 复购 50%（$10k）+ SEO 35%（$7k）+ GEO 15%（$3k）。K3 拍板不做付费投放（ROAS 2.5 时每单净亏 3%）。
- 当前营收基线约 $14/月（~100 RMB）。
- 阶段判定（2026-08-12）：供给建设期完成（600 页在线、retrofit 6/6、品牌统一、转化链路 6/6 verified），进入"排名变现期"：主战场=排名攻坚（类目页 45→20）+ Q4 内容攻势 + GEO 可引用性。

## GSC 实测数据（来源：GSC 4 markets 报告，窗口 2026-08-04~08-10，7 天）
- 汇总：49 clicks / 3203 imps / CTR 1.53% / 平均排名 26.5，覆盖 82 国家。
- 香港：38 clicks（占 78%）/ 1514 imps / CTR 2.51% / rank 21.6 —— 唯一主战场。38 click 集中在 /zh-hk/category/posters/ 一页，其余高 imps 着陆页（a2-posters 85 imps、category/stickers 84、a5-flyers 70、category/flyers 70、packaging 65）全部 0 click，meta description 集体失效。
- 日本：7 clicks / 385 imps / rank 28.8；移动端 rank 13 接近首页，桌面 rank 37 拖累。
- 美国：0 clicks / 544 imps（占 17%）/ rank 37.2 —— 冷启动黑洞，不是排名问题是 CTR 问题（rank 8-89 分布均 0 click）。
- zh-hk 核心词排名：宣傳單張 rank 37 / 月曆印刷 rank 19（0 click，meta 致命伤）/ 貼紙印刷 rank 37.8 / 海報印刷 rank 29.8 / 餐牌印刷 rank 15.8（0 click）。
- 品牌词：智印港 2 imps/2 clicks rank 1（破冰但基数小）；ジープリント 0 收录（8/9 拍板后 5 天仍 0）；ZprintPro en 0 收录。
- 28 天口径（8/12 直连）：10,989 imps / 475 页，环比 +2.8%。
- retrofit 博客已见效：a5-vs-a6-flyer-size（rank 7.4，2 clicks）、doujin-guide（rank 5.8，2 clicks）进第 1 页；但类目页 flyers rank 45.4 / posters 43.6 仍在第 4-5 页。

## GEO 基线（来源：ai-visibility-baseline 报告）
- 2026-07-29 基线：0/7 query 被 AI 引用；剔除禁区词与无市场词后有效目标 4 词（greeting cards、年賀状、teachers printing）。
- 8/14 凌晨 4 引擎自测 1/4 命中（日报提及）。
- 已校准结论（2026-08-12 战略文档）：llms.txt 基本无效（5.15 亿 AI 爬虫流量仅 408 次命中），不再追加投入；GEO 转"可引用性"：FAQPage/Article schema 全覆盖、内容埋可引用统计数字、sameAs 实体闭环。
- GEO 关键外部事实：AI 引荐流量转化率 14.2% vs Google 自然 2.8%（5 倍）；ChatGPT 份额 77.6%→53.7%，Gemini 7.3%→26.7%（增长最快）；被 AI 引用品牌点击 +35%；AI 引用源与 Google top10 解耦（<10% 重叠）。

## 近两日定时任务执行结果（8/13、8/14 日报）
- 8/13：0 push（配额被 J3 03:40 用尽，353a8fa：e-print 竞品词 26 处清扫 + 内链 23.2%→30.4% 超额完成）；发现 6 个 retrofit 页 GA4 事件全 broken；16 文件未提交积压。
- 8/14：1 push PASS（27f0c7f，3 in 1：§11 名片文案清扫 32 hits 清零 zh-hk.json+ja.json + 6 retrofit GA4 修复 layout.tsx + 16 files bundle），9 步真 verify 9/9；残留 57 hits 名片相关（sku-seo-data.ts 28 + category-seo-content.ts 20 + case-studies 9）推 8/15 拍板。
- 月 push 累计约 25/150，配额健康。

## 当前 8 个待 K3 拍板阻塞项（8/14 handoff）
1. §11 残留 57 hits 清理方案（A 激进/B 不动/C 渐进 9 push）
2. retrofit 加权队列 #1（flyer-sizes-compared 276 imps）谁执行
3. 5 SKU 优化顺序
4. 1 PDP 转化审查候选
5. Batch B 三输入（X URL / LinkedIn URL / IndexNow key）—— PENDING 5+ 天，GEO 实体闭环唯一阻塞
6. 10:15 daily cron Q-005
7. F1 设计师 brief 进度（季节性 SKU 图 8/20 交付）
8. Supabase SERVICE_ROLE_KEY —— PENDING 6 天，B2B 询盘漏斗度量盲区，8/21 双周复盘前置

## 执行架构现状
- autoclaw 目标模式 + Agent 集群：J3（autoclaw 执行体）+ M3（Mavis 日运营 cron）+ verifier 集群；4 条 cron（daily content evolve / weekly meta refresh / monthly matrix audit / gsc feedback loop 周三 15:00）。
- 纪律：每日 ≤1 push，攒批合批，amend 月上限 2 次（已用满），push 后必跑 verify-deploy.mjs。
- 事故：8/14 autoclaw v17 用 Seedream 生成 336 张 SKU 图，生成 242 张后 credits 耗尽 + 239 张文件神秘丢失，最终仅 3 张幸存；此前 K3 已拍板 AI 出图不得直接上 PDP（印刷产品需 CMYK+出血+工艺标注），正确路线=F1 设计师外包（¥2-3k，8 SKU）+ F4 代码生成兜底。

## Q4 窗口事实（内部调研结论）
- Q4 内容必须 9/15 前全部上线（10 月初搜索起量前留 2-3 周索引期）。
- Sticker Mule 不做黑五折扣（$1/10 引流款 + 全场免运策略）→ holiday sticker deals 类词存在内容空档。
- 定制包装市场 $39.7B（2025）→$59.6B（2033），CAGR 6.0%。

## 本次研究要回答的问题
1. 竞品（Sticker Mule、Vistaprint、Packlane、Printful 等）2026 年 SEO/GEO 最新打法与可借鉴点。
2. 2026 年 GEO/AI 搜索优化（ChatGPT/Gemini/Perplexity/AI Overview）最有效的实证战术。
3. 跨境印刷电商 Q4 旺季关键词与需求窗口。
4. 小型多语言电商站点类目页排名攻坚（第 4-5 页→首页）的有效手段。
5. 综合以上，给 ZprintPro 下一阶段（8 月下旬-9 月）的战略方向与执行建议。
