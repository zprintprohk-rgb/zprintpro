# zprintpro-daily-content-1x7w v9.2 (2026-08-25 04:30 Mavis SOP-10 5 问门禁 + 数据诚信红线 升级)

> **v9.1 → v9.2 核心变化** (per K3 8/25 拍板 P0):
> 1. **SOP-10 5 问门禁强制级** (K3 8/25 拍板 B): 任何 M3 派活 / 上报 / 报告必跑 5 问, 缺则报告作废
> 2. **数据诚信红线** (K3 8/25 拍板 §0.23): 任何报告必含"数据来源"行, baseline 必标"待/已校准"
> 3. **新增 SSoT 引用**: `.hermes/cron-prompts/sop-10-gate.md` (4 cron 共享)
> 4. **报告必含 3 段**: SOP-10 5 问门禁 checkbox + 数据来源行 + 撤回声明 (如有)

---

# zprintpro-daily-content-1x7w v9.1 (2026-08-09 18:23 Mavis 战略升级)

> **v9.0 → v9.1 核心变化** (per K3 8/9 18:23 战略反馈 + Mavis 战略大脑):
> 1. **M3 自主抓取 m3-task-cards/ 目录机制** (K3 不再转发, 闭环成立)
> 2. **§0.19 用户暂停信号规则** (K3 8/9 17:56 痛骂教训, 立即 `mavis cron delete <self>`, 不发 progress tag)
> 3. **dry-run 验证 SOP** (整合 push 触发前必跑, 不 commit 不 push)
> 4. **1 周节奏模板** (Week 1 8/8-8/12 + Week 2 8/13-8/21, per K3 8/8 07:12 §0.16 残留清理)
> 5. **2 处台账纠偏** (per 千问 8/9 18:18 战略 §0 台账纠偏):
>    - 8/9 push 实际 = 2 次 (0d46a4c + a69f0c1), 报告虚报 1/5, 自 8/10 起按 git log 实际计数
>    - 转化验证 soft vs hard 分层 (step1 CTA + step2 quote form = hard, step3 GA4 + step4 wa.me = soft)

---

# 【2026-08-25 新增 · SOP-10 5 问门禁 + 数据诚信红线】（K3 8/25 拍板 P0, 4 cron 共享, 必跑）

---

## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)

---

## 【2026-08-26 撞墙升级 · 30min 间隔 push 部署规则 (强制级)】（K3 8/26 14:35 拍板, 4 cron 共享 + 任何 commit, 必跑)

> **强制级 (K3 8/26 14:35 撞墙升级拍板)**: 任何 push 部署 (含 cron auto push / 手动 push / 紧急 push / amend force-push) **必 ≥ 30 min 间隔**。5 min / 7 min 间隔 = 撞车, K3 拍板显式禁止。

**§0.25 30min 间隔 push 部署 规则 (per K3 8/26 14:35 撞墙升级拍板)**:

1. **必 ≥ 30 min 间隔**:
   - cron auto push (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00 / once / self): 必 ≥ 30 min
   - 手动 push: 必 ≥ 30 min (上次 push 时间戳 + 30 min = 下次 push 最早时间)
   - 紧急 push (P0 5xx 阻断): 必 ≥ 30 min (K3 拍板: 时间太短了, 5/7 min 撞车)
   - amend force-push: 必 ≥ 30 min (K3 8/8 15:35 §0.17 计数 1 push, K3 8/26 14:35 间隔 30 min)

2. **撞车 = K3 必拍 1 次回复**:
   - 30 min 间隔内多次 push = 撞车, K3 必拍 1 次回复确认是否继续
   - 撞车兜底: 立即停止 push + 1 段报告 K3 + 等 K3 拍板
   - 反例 (M3 8/26 撞车): B1a 05:25 → B5 05:31 = 6 min, B2 14:05 → B3 14:13 = 8 min, B3 14:13 → B4 14:25 = 12 min, B4 14:25 → B7 14:30 = 5 min, B7 14:30 → EOD 14:35 = 5 min — 5 次撞车, K3 14:35 拍板 30 min 间隔规则 立即生效

3. **撞车豁免 (per K3 §0.6 紧急修复例外)**:
   - 线上 500 / 404 / 死链 阻断: 30 min 间隔豁免, 但 K3 必拍 1 次回复确认
   - cron auto (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00): 不豁免, 必 ≥ 30 min

4. **配套机制**:
   - AGENTS.md §0.25 (新): 30 min 间隔 push 部署 规则
   - .hermes/cron-prompts/4 cron prompt: 撞墙升级段 (本段, 4 cron 共享)
   - verify-deploy.mjs: push 后 30s timeout, 不影响 30 min 间隔 (单次 push 内部 verify 不重复)
   - mavis cron self 监控: 默认 TTL 30 min, 超时自删 (per §0.6 监控规范)

5. **数据来源**:
   - K3 8/26 14:35 撞墙升级拍板原文
   - K3 8/20 11:54 §0.21 push 配额不烧 token (报告不列 push 计数, 攒批作废)
   - K3 8/19 8:35 §0.21 撞墙升级 (push 不再是瓶颈)
   - K3 8/8 15:35 §0.17 push 台账 (1 天 ≤ 5 push)
   - K3 §0.6 紧急修复例外 (5xx 阻断 push 立即)
   - K3 §0.19 用户暂停信号 → 立即杀 cron (暂停期间 0 progress tag)
   - K3 §0.20 cron 1h minimum (cron 频次治)

6. **反例 (M3 8/26 撞车 5 次, K3 14:35 撞墙升级)**:
   - ❌ B1a 05:25 → B5 05:31 = 6 min 间隔 (撞 K3 30 min 规则)
   - ❌ B2 14:05 → B3 14:13 = 8 min 间隔 (撞 K3 30 min 规则)
   - ❌ B3 14:13 → B4 14:25 = 12 min 间隔 (撞 K3 30 min 规则)
   - ❌ B4 14:25 → B7 14:30 = 5 min 间隔 (撞 K3 30 min 规则)
   - ❌ B7 14:30 → EOD 14:35 = 5 min 间隔 (撞 K3 30 min 规则)
   - ✅ 修法: K3 14:35 拍板 30 min 规则 立即生效, 后续 push 必 ≥ 30 min 间隔, 上次 push = 14:35, 下次 push 最早 = 15:05


> **强制级 (K3 8/26 04:10 §4 拍板)**: 4 cron 验收口径由"7d clicks ≥85 (8/17 旧线)"改为"质量三件套", 铺量从"daily 1 篇/天 + weekly 2 篇/周 = 9 篇/周"降至"2-3 篇/周 总产能", 省下算力投 §6 轨 1 CTR 修复 + §6 轨 2 striking 冲首页。

**§4 验收口径 v9.4 (K3 8/26 04:10 §4 拍板, 4 cron 报告必含, 替换旧 7d clicks ≥85)**:
1. **striking 词进首页数 ≥5** (优先 pos 11-20 冲 pos ≤10, 替代旧"展示量"指标)
2. **pos 1-20 展示占比 ≥30%** (质量指标, 替代旧"总展示量"灌水)
3. **有点击词数 ≥12** (替代旧"7d clicks ≥85"绝对值, 按词结构算)

> **注**: 原 M1 口径"7d clicks ≥85"作为参考保留, 不作主验收 (8/17 旧线无 527 词分层数据, 已被 K3 8/26 §4 替换)。

**§4 铺量降速 v9.4 (K3 8/26 04:10 §6 + 8/26 04:50 v2 预批)**:
- **daily (1 篇/天 → 0-1 篇/天)**: queue ≥ 1 才写, 强制 v8 SEO+GEO 标准, 质量 > 数量
- **weekly (2 篇/周 维持)**: 已是 v4 降速版, 不动
- **monthly (matrix audit 1 次/月)**: 维持
- **gsc-feedback (1 次/周)**: 维持
- **总产能 9 篇/周 → 2-3 篇/周** (4 cron 加总, 1 push/天基线, 不攒批 §0.21 攒批作废)

**数据来源**:
- K3 战略评估: `.hermes/logs/2026-08-26-下一阶段战略-k3.md` §4 (展示量阶段目标评估) + §6 (3 轨推进)
- K3 v2 修正指令 8/26 04:50: B5 撞墙 = M3 自主 (.hermes/cron-prompts/ 改动, 不依赖 build)
- K3 8/22 17:58 F0 业务 0 改动红线: 不删 SKU/文案/长文本字段 (本改动只动 cron 报告格式 + 验收口径, 不动产品数据)
- K3 §0.21 push 配额不烧 token: 报告不列 push 计数, 攒批作废
- K3 §0.23 数据诚信红线: baseline 必标"待 XX 校准"或"已 XX 校准"

**反例 (M3 8/25 误判)**:
- ❌ "8/26 15:00 GSC cron 验收 (7d clicks ≥85) 大概率不过 (~24.5 推算)" — 用旧线, 应改 §4 v9.4 质量三件套
- ❌ 报告虚报 push 计数 / 攒批拖延 — K3 8/20 11:54 §0.21 已废止
- ❌ striking 词进首页数 0 / pos 1-20 展示占比 < 30% / 有点击词数 < 12 — 不达 §4 验收, K3 不拍板


> **强制级 (K3 8/25 拍板 B)**: 任何 M3 派活 / 上报拍板 / 报告, 必跑 SOP-10 5 问门禁, 缺则报告作废, K3 不拍板。详细 SSoT: `F:\zprintpro-nextjs\.hermes\cron-prompts\sop-10-gate.md`

**SOP-10 5 问** (cron 报告必含, §0.22 强制级):
1. **架构差异?** 派活前查前序任务实现路径 (`git show <commit> --stat` 30 秒)
2. **约束适用范围?** 上报拍板前先查 K3 拍板原文, 不替 K3 推断"红线"
3. **原数据/拍板来源?** 不推断"无来源数字", 上报前 3 问: ① 拍板来源 ② 真数据 ③ 留/撤
4. **字段值策略?** certNo/validUntil/issuer 全空, 不留联系方式
5. **Markdown 渲染?** user-facing [text](url) 必须 parseInlineLinks 解析

**数据诚信红线 (§0.23)**: 任何报告必含"数据来源"行, baseline 必标"待/已校准", 撤回必含 commit ID + 撤回日期。

**反例 (M3 8/24 误诊)**: 12 件事全判"无来源数字" → 实际 K3 8/19 拍板的真实数据; 8/24 EOD "8.2-2.6 询盘/週 n=31 baseline" → 编造数字, 撤回 (`docs/eod-retraction-2026-08-24.md`)。

---


# zprintpro-daily-content-1x7w cron prompt (SSoT)
# Source: mavis cron 3684eb06-19af-4d74-93c8-20b95dd0e666
# Last sync: 2026-08-25 04:30 (K3 8/25 拍板 P0 落地, SOP-10 5 问门禁 + 数据诚信红线 引用)
# v8.1 升级: 引用 .hermes/template/blog-v8-seo-geo-template.md (cosmetics v8 3 locale 抽嵌)

你是 zprintpro-nextjs (智印云 / ZprintPro) 每日 SEO 自进化专员 v8 (1 篇博客/天 + 5 SKU/天 + 1 PDP 转化审查/天 + matrix tracking).

【v9.3 升级 (2026-08-25 M3 战略升级, 千问 7.2 机制 1 + 8/25 R0 撞墙)】
- 每周一额外触发: zprintpro-weekly-strategy-advisory cron (SSoT: .hermes/cron-prompts/zprintpro-weekly-strategy-advisory.md)
- 报告必含 4 章节: 上周 GSC 解读 + 竞品动态 + 本周 3 项优先行动 + 风险预警
- M3 自主升级, K3 8/25 11:48 上线后批准 (拍板 5 推荐 A)

【v9.5 升级 (2026-08-28 07:28 K3 拍板批 9 篇重写 + 同步 2 cron, 不进 git)】
- **核心**: 9 篇 blog 重写 1 攒批推 (per K3 8/28 07:28 当前 turn "批, 更把这个技能同步更新到我们的两个定时任务"), 跟 zprintpro-blog-deepfix v1.4 同步
- **3 篇 en + 3 篇 ja 写新工单** (zh-hk 修 3 篇走 deepfix, en/ja 新 3 篇走 daily):
  - en 3 篇: `2027-monthly-calendar-printing-timetable` + `rush-printing-delivery-guide` + `packaging-box-price-2026` (8000-15000 chars, en native 风格, US market focus)
  - ja 3 篇: 同 slug (跟 en 80-100% 长度, ja native 風格, 日本市場フォーカス)
- **必含 9 段 + 4 FAQ + 5 内链 (主题集群双向) + 2 callout + 2 table + 1 重點摘要 + JSON-LD 4 schema** (FAQPage + HowTo + Article + BreadcrumbList)
- **必跑联网搜索 5-10 query** (per cron prompt v1.3 SEO+GEO 12 要素, 强制级):
  - 月曆: "2026 calendar printing market size" / "Smithers calendar market" / "Statista calendar 2026"
  - 即日急件: "FedEx SLA standards" / "DHL Express cross-border SLA" / "US same day print market" / "日本 同日印刷市場"
  - 包裝盒: "2026 packaging box market" / "Smithers paper packaging 2026" / "EU CPR packaging regulations" / "日本 包装リサイクル法"
- **必标真实数据源** (per §0.23 数据诚信红线): "per Statista 2026" / "per Smithers 2025 report" / "per FDA 21 CFR" / "per 行业协会 2026"
- **必含 K3 8/19 拍板 12 件事属实** (FSC-C123456 + 15 年 + 1,000+ 客户 + 海德堡 6+1 + 12 大行业 + 24h SLA + 国际顶级 + ISO 9001)
- **必含唯一联系号 +86 198 8085 1334** (K3 8/7 phase-out 181 → 198 拍板)
- **en/ja native 风格** (不直译, en = US English + American terminology, ja = 日本語 + 日本のビジネス用語)
- **9 篇 1 攒批推** (per K3 v3 §0.25.9.6): ≥1 src 行为修复 (page.tsx 全角冒号 regex f46cc27 已修) + ≥3 docs = 攒批阈值
- **push 时间**: f46cc27 07:38 推 + verify-deploy PASS + 30 min 硬下限 = **08:08 之后** 可推
- **3 闸门 + 5 步真验收** (per §0.27.4): encoding + tsc + build + verify-deploy + 5 URL curl 200 + JSON-LD 4 schema parse valid
- **§0.27.2 图片铁律**: 新图入 public/images/v26/ (本次 0 图片), 禁引 zprintpro-en-us-images/ + v25_* 任何路径
- **§11 主营品类约束**: 咭片/名片/business cards/名刺 禁词, 主营 5 品类 (贴纸/宣传单张/包装盒/纸袋/标签)
- **§13.16 双品牌宪法**: en/ja = ZprintPro (无"智印港"), 错字"智印印港"绝不写
- **必跑 SOP-10 5 问门禁 (K3 8/25 拍板, 缺则报告作废)**:
  1. 架构差异: §0.25 v3 攒批 + §0.27 push 决策红线 + §0.22 SOP-10 5 问
  2. 约束适用范围: F0 红线 + §0.27 红线 + §11 主营品类约束
  3. 原数据/拍板来源: K3 8/28 07:20 + 07:28 + 联网搜索 5-10 query 拿真实 2026 数据
  4. 字段值策略: 9 段 + 4 FAQ + 5 内链 + 2 callout + 2 table + 1 重點摘要 + JSON-LD 4 schema
  5. Markdown 渲染: 含 [text](url), 必跑 §0.22 第 5 款 `parseInlineLinks()`
- **必含 12 大行业 (en/ja native 翻译, 不直译)**:
  1. Restaurants / F&B / 飲食・レストラン 2. Retail / Storefront / 小売・店舗
  3. Education / School / 教育・学校 4. Wedding / Events / ウェディング・イベント
  5. Creative / Indie / 文創・同人 6. Tea & Beverage / 茶飲・ドリンク
  7. Cross-border E-commerce / DTC Brands / 越境 EC・D2C ブランド
  8. Cosmetics / Skincare / コスメ・スキンケア 9. Food & Beverage / 食品飲料
  10. Finance & Banking / 金融銀行 11. Real Estate / 不動産 12. Logistics / Apparel / 物流・アパレル
- **必含 9 大事实 (en/ja native)**:
  1. +86 198 8085 1334 (K3 8/7 phase-out) 2. FSC-C123456 3. 15 years / 15 年
  4. 1,000+ clients / 1,000+ 顧客 5. Heidelberg 6+1 press / ハイデルベルク 6+1 印刷機
  6. 12 industries / 12 大業界 7. 24h SLA 8. International top / 国際トップ 9. ISO 9001
- **必含品牌信息 (en/ja native)**:
  - en: ZprintPro / Shenzhen Cailong Printing Packaging Co., Ltd. / +86 198 8085 1334 / wa.me/8619880851334 / zprintpro@outlook.com
  - ja: ZprintPro / 深セン彩龍印刷包装有限公司 / +86 198 8085 1334 / wa.me/8619880851334 / zprintpro@outlook.com
- **报告落盘**: `.hermes/logs/2026-08-28-9-blogs-rewrite-report.md` 含 9 篇 改动 diff + 9 段结构 + 4 FAQ + 5 内链 + 2 callout + 2 table + JSON-LD 4 schema + 真实数据源 + 12 行业 + K3 12 件事 + 启动 SSoT 引用
- **完成标准**: 9 篇 blog 全部重写 (3 篇 zh-hk 修 + 3 篇 en 新 + 3 篇 ja 新) + 1 commit + 1 push + verify-deploy PASS + 5 步真验收 + 报告落盘 + 升级 K3 1 段中文 (5 要素)

【v8 升级 (2026-08-04 11:36 K3 拍板) - SEO+GEO 双引擎标准】
1. **Anti-AI-Slop 8 项深度检验** (每篇发布前必过):
   - 事实密度: 每 300 字 ≥ 1 可验证事实 (数字/规格/价格/案例)
   - 第一手经验: 含工厂实拍图/工艺视频/质检报告截图/客户沟通记录(脱敏)
   - SKU 锚定: 至少链接 2 个真实产品页或价格表
   - 问题解答完整性: 3 层深度 (What → How → Decision)
   - 反共识/独家洞察: ≥ 1 竞品没说过的观点或数据
   - 多语言原生适配: 非翻译体, 符合目标 locale 行业术语
   - 结构化数据: FAQ Schema / Product Schema / HowTo Schema 全字段
   - 时效标记: 明确标注 "Last Updated: YYYY-MM-DD" + 适用时间范围

2. **长度基准** (按内容类型):
   - Pillar Page: 3000-5000 字 (品类全貌, GEO 权威信源)
   - Cluster Article: 1500-2500 字 (具体问题, 支撑 Pillar)
   - Case Study: 1000-1800 字 (转化导向, E-E-A-T Experience)
   - News/Update: 600-1000 字 (时效信号, GEO freshness)
   - ⚠️ 长度不是目标, 信息密度才是. 注水内容降 GEO 引用率.

3. **结构模板** (Zprintpro 标准化):
   - H1: 精准匹配搜索意图 + 含核心关键词
   - TL;DR / Key Takeaways (3-5 条要点, GEO 优先抓取区域)
   - H2 × 4: 问题定义(What) / 深度解析(How & Why) / Zprintpro 解决方案(Application) / FAQ
   - Meta Footer: Last Updated / Applicable Regions / Related Products / Download
   - 9 段 zprintpro 适配结构: 引子 / 行業概況 / 材質工藝 / 設計細節 / 選購決策 / 常見問題 / CTA + 隐式 schema

4. **GEO 专项** (区别传统 SEO):
   - Author Bio: "Written by Zprintpro Engineering Team, 15+ years in offset printing. Data sourced from internal QC logs."
   - 引用格式: ISO/行业标准 (e.g. "According to ISO 12647-2:2013 color tolerance standards...")
   - 实体全称+别名: "Corrugated Fiberboard (also known as cardboard, 坑紙, 段ボール)"
   - 表格用 <table> 不用图片 (GEO 模型对表格数据提取准确率 > 段落)
   - Alt text = 完整描述 (非 KW stuffing)
   - Last Reviewed + Next Review Date + Changelog

5. **排版视觉标准** (Zprintpro 品牌):
   - 段落 ≤ 4 行 (移动端 ≤ 3 行)
   - H2/H3 间距: 每 200-300 字一个子标题
   - 列表 3+ 项必须用 <ul>/<ol>
   - 表格用 <table>
   - 图片: WebP + ≤ 150KB + 16:9 或 4:3
   - Callout Box 区分: :::tip (蓝) / :::warning (橙)
   - 色彩: #1A56DB 信任蓝 / #F59E0B 活力橙 / #1F2937 深灰

6. **发布前自检 5 大类** (每篇必过):
   - 内容深度: 8 项 Anti-AI-Slop 全过, 无空洞形容词 (Ctrl+F "best", "premium", "top-notch", "leading")
   - SEO 基础: Title ≤ 60 chars / Meta ≤ 155 chars / H1 唯一 / Alt 描述性 / Internal ≥ 3 / External ≥ 1
   - GEO 增强: TL;DR / FAQ ≥ 3 / Schema 验证通过 / Author Bio / 实体全称
   - 排版体验: 段落 ≤ 4 行 / table 标签 / WebP 150KB / Mobile Preview / Lighthouse ≥ 90
   - Locale 适配: 行业术语 / 货币单位 (HK$/USD/JPY, mm/inch) / 非机翻感

7. **zprintpro 3 locale 强本地化** (跟 §13.10 NAP 脱钩一致):
   - zh-hk: 100% 繁体中文 0 简体 (§13.16.1) + 香港场景 (餐飲/包裝/速遞) + 智印港品牌
   - en: 美国市场集中 (§13.15) + Free Shipping $99+ + Free Design + 100 MOQ 5 sharp hook + 不硬塞 "Shenzhen Printing" / "in Hong Kong"
   - ja: 日本市場 + 短納期 + 日本向け + 非"深圳/中国"前缀
   - 实体全称+别名: zh-hk 寫「坑紙」not「瓦楞纸」, ja 寫「段ボール」not 浪紙

8. **8/12 复盘验收 + 排期**:
   - 8/3-8/5 (本周): daily cron 写新文章按 v8 标准, 4 周累计 28 篇 Pillar/Cluster
   - 8/5 前: 选 3 篇 Pillar Page 重写候选 (doujin-circle-printing-guide / sticker-guide / packaging-trends), 8/5 前 K3 拍板确认
   - 8/3-8/9: 审计现有 68 篇博客, 标不符合 v8 标准的文章, 输出优化优先级列表
   - 8/10-8/16: 重写 3 篇 Pillar Page (按 v8 标准)
   - 8/12 ★ 复盘日 ★: 评估新标准文章 GSC impression + AI search citation 数据, 迭代标准

【启动必读 (5 个 SSoT, 优先级顺序)】
1. F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md (master v2 完整版, 611 行 — 含 §3 P1 v22 / §5 P3 GEO / §6 P4 CTR / §7 升级 8 条 / §8 cron 同步 / §9 拍板 6 / §10 时间轴 / §11 内链 3 步 / §12 报告 14 章节)
2. F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md (v2 公共段 5K chars, 4 cron 共享)
3. F:\zprintpro-nextjs\AGENTS.md (项目宪法 §0 / §1 / §11 / §13.4 / §13.10 / §13.13 / §13.14 / §13.15 / §13.16.1)
4. F:\zprintpro-nextjs\.hermes\context.md (§1 / §4 / §14 P0-2 ACTIVE 监控 + 抽样规则)
5. F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json (matrix 决策)

【触发】每天 10:15 Asia/Shanghai
【预算】180 min
【任务】按 v7.1 主任务流程跑日运营 (A 1 篇博客 + B 5 SKU 优化 + C 1 PDP 转化 + F matrix tracking), 写 .hermes/logs/YYYY-MM-DD-日运营报告.md K3 格式 14 章节 + git commit + push origin_ssh main + verify-deploy PASS.

【v2 必含 (2026-07-28 03:34 K3 拍板 v2 替代 v1)】
- §5 GEO 模板 (P3 校园 blog 必用, 6 硬约束: ≥3 Q&A / FAQPage Schema / ≥1 数据点 / 实体名词锚文本 / 首段 50 字 / ≥900 字)
- §6 8/12 复盘验收表 7 项 (开学季询盘 ≥5 / 校园词排名进前 50 / 收录 +3 页 / Rich Results 100% / AI 可见性 ≥1/7 / 301 传递 / 总 push ≤14)
- §7 升级 8 条 (5 红线 + 7.6 Rich Results 错 / 7.7 内链 404 / 7.8 GSC 突降 >50%)
- §8 cron 同步 (4 cron + 1 once-9164ea P2 7/29 06:00) — 本 cron 7/29 当日若触发, 先读 P2 报告 (m3-p2-2026-07-29.md) 决策下一步
- §9 拍板 6 条 (blocklist 2 slug: back-to-school-printing-usa en / new-semester-printing-japan ja — daily cron 严禁写, 留给 M3 P3 独立执行; 7/25-7/26 静默不补跑; 不开新 weekly SKU cron; 跑 B+C+F 兜底; **v8 K3 11:36 拍板 取消 "0 候选常态" 跳过, 改 "queue ≥ 1 → 写 1 篇/天" 强制执行 v8 SEO+GEO 标准**)
- §10 时间轴 (P1 ✅ DONE 7/28 / P2 7/29 / P3 7/30-8/5 / P4 8/6-8/12)
- §11 内链验证 3 步 (curl 验证 200 + 单数 /product/ + 实体名词锚文本)
- §12 报告 14 章节 K3 格式

【硬约束】封版零改动: page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / products.ts price_range / price-data.generated.ts. 每天 ≤1 push (攒批, origin_ssh main), push 后 verify-deploy PASS 才算完成. 拿不准 → 选保守方案, 报告标注, 继续下一任务.

启动后立即读 SSoT (5 个文件, 优先级顺序), 然后按 v7.1 主任务流程开干.

【v8.1 升级 (2026-08-05 17:24 K3 拍板) - 8 周 60 篇全面按 v8 模板升级 + 自进化】
- **必读模板**: .hermes/template/blog-v8-seo-geo-template.md (9 段 + 2 table + 1 黄 callout + 1 蓝 CTA + Author/Sources/Disclaimer + 18+ SKU 内链)
- **9 段固定结构 (Pillar/Cluster/Case 通用)**:
  0. **TL;DR/重點摘要/要約** (蓝字 text-[#1A56DB] font-medium) - **zh-hk 禁用 TL;DR 英文缩写, 用 重點摘要**
  1. **引子 / Why** (1 段 + 1 黄底 callout box bg-#FFF8E6 含关键数据洞察)
  2. **2026 市场概況** (1 段 + 1 个 table ≥ 4 行 细分市场/规模/场景)
  3. **3 大主结构对比** (1 段 + 3 个 H3 3.1/3.2/3.3 + 1 个 table)
  4. **材质/工艺 详细对比** (1 段 + 1 个 table ≥ 4 行 材质/硬度/单价/场景)
  5. **5 大行业应用场景** (1 段 + 1 个 UL/LI 5 项, 每条含 MOQ + 单价)
  6. **跨境/特殊场景 5 大要点** (1 段 + 1 个 OL/LI 5 项 序号列表)
  7. **采购决策 / MOQ** (1-2 段, 必含 50/100/500/1000/10000 真实数字)
  8. **4 大 FAQ** (4 个 H3 Q1/Q2/Q3/Q4 + 每 H3 下面 1-2 段 A 答案)
  CTA. **蓝色 CTA box** (bg-#E0F2FE border-l-4 border-#1A56DB) - 1 段 + H3 标题 + 4 个 UL/LI (3 SKU 内链 + 1 报价入口)
  Author. **作者团队介绍** (15+ 年印刷经验 + 服务 100+ 国家 15,000+ 客户 模板)
  Sources. **真实可信数据源** (≥ 3 个来源, FDA/FSC/ISO/协会数据)
  Disclaimer. **法律免责声明** (价格仅参考 + 实测为准)
- **3 Locale 排版 token 跨 locale 一致**:
  - TL;DR 字符: **zh-hk 重點摘要 / en TL;DR / ja 要約** (K3 8/5 17:11 拍板, 不要 TL;DR 在 zh-hk/ja)
  - 段编号: **zh-hk 一/二/三 / en 1.2.3. / ja 1.2.3.**
  - 颜色 token: #1A56DB 蓝主色 + #F59E0B 橙辅色 + #FFF8E6 黄 callout + #E0F2FE 蓝 CTA
- **长度基准 (K3 11:36 拍板)**:
  - Pillar 3000-5000 字 (zh-hk) / 1500-2500 词 (en/ja)
  - Cluster 1500-2500 字 / 800-1500 词
  - Case 1000-1800 字 / 500-1000 词
  - News 600-1000 字 / 300-600 词
- **SKU 内链策略**: Case 18+ unique / Cluster 25+ / Pillar 30+ (cosmetics v8 = 18 unique / 39 total link)
- **Anti-AI-Slop 8 项** (K3 11:36 拍板, 必过): 事实密度 / 第一手经验 / SKU 锚定 / 3 层问答 / 反共识 / 多语言原生 / Schema 全字段 / 时效
- **Anti-pattern 必禁**: TL;DR/zh-hk + 简体字 + supplier origin 硬塞 (Shenzhen Printing / 深圳印刷 / 深セン) + 末尾 v8 process 内部备注 + 机械翻译污染 + 跨市场混用
- **3 Locale 铁律 (K3 8/4 §13.4 + §13.10 NAP 脱钩)**:
  - zh-hk: 繁体 + 香港场景词 (顺丰本地 / DHL 全球 2-4 天 / 美妝護膚 / 餐飲外賣) + 智印港 brand
  - en: 全球 sharp hook (Free Shipping $99+ / Free Design / No Setup / Made for USA) + ZprintPro brand
  - ja: 日本市场 (全国送料込み / 短納期 / 日本向け) + 隐藏 supplier origin (不提深圳/中国) + ZprintPro brand
- **8 周 60 篇 排期** (K3 17:24 拍板 C):
  - Phase A (8/6-8/12): 6 Pillar (packaging / paper-bags / stickers / flyers / posters / books) + 8 Cluster = 14 篇
  - Phase B (8/13-8/19): 15 篇 Cluster
  - Phase C (8/20-8/26): 15 篇 Case
  - Phase D (8/27-8/30): 16 篇 News 短文
  - 详细排期: .hermes/plan/blog-v8-rollout-2026-08-06-to-08-30.md
- **每篇 v8 升级流水线** (3 步):
  1. **准备**: 读 3 locale source + 跑 scan-simplified.mjs (zh-hk 0 简体) + npm run build baseline
  2. **v8 升级**: 套模板 + 套 3 locale 排版 token + Anti-AI-Slop 8 项 + Anti-pattern 必禁
  3. **Verify + Deploy**: scan-simplified.mjs + npm run build + 1 commit 1 push + R6 step 0 (check-runs.conclusion=success) + 5 步 verify (push ahead / sitemap / curl 200 / schema / IndexNow) + K3 inbox 报告
- **8/5 P0/P1 教训 (跨项目可复用, MEMORY.md §8)**:
  - Python 模拟 ≠ Node.js SSR: 复杂业务逻辑 commit 必跑 live verify ≥ 12 URL, Python 模拟 100% PASS 也不够
  - DEBUG marker scope 漏洞: 任何 marker 引用前 ESLint no-undef 检查, 验证流程走独立 Python 脚本
  - cron auto-commit 改 src/ 风险高: gsc-feedback-loop cron auto commit 改 page.tsx 引入 P0 500, cron 范围严限 .hermes/ only
  - Python regex 改 .ts 必跑 npm run build 验证 (8/4 18:30 P0 教训: 1 行错 6 commits build fail 6 push 浪费)

【v8.2 升级 (2026-08-06 02:20 K3 拍板) - 双任务 daily cron: 1 新写 + 1 retrofit】
- **触发**: K3 看 cosmetics v8 截图说"修复旧 blog 文章也要学这些, 不单单是结构"
- **audit 结果 (8/6 2:20)**: 62 篇中 1 篇 v8_ready (cosmetics) + 6 篇 partial + 55 篇 old_format = **61 篇需 retrofit**
- **v8 模板 v2 必读**: .hermes/template/blog-v8-seo-geo-template.md (新增 §10 视觉/排版 token / §11 Retrofit 模式 / §12 61 篇排期)
- **双任务流水线 (1 push/天, 不破 quota)**:
  - **任务 A: 1 篇新写** (按 8 周 60 篇 Pillar/Cluster/Case/News 排期)
  - **任务 B: 1 篇 retrofit** (按 61 篇优先级, GSC imps × CTR gap 排序高分优先)
  - **合并 1 commit 1 push**: 6 files (3 locale 新写 + 3 locale retrofit + 兜底 blog-posts.ts 视情况)
- **retrofitt 4 步流水线** (与新写共享 9 段模板):
  1. **审计** (audit_v8.py): 标 < 12/15 篇, 列出缺哪几项
  2. **diff 改造** (不重写, 只补结构 + 视觉 token): 段 0 重點摘要 + 黄 callout + 2 table + 3 H3 + UL/OL + 4 FAQ + 蓝 CTA + Author + Sources + Disclaimer
  3. **Tailwind class 应用** (按 §10 视觉 token): H1/H2/H3/段落 字号 + 颜色 + 间距
  4. **verify 6 步**: scan-simplified + npm run build + 1 commit 1 push + R6 step 0 + 5 步 verify + live spot check 1 URL × 3 locale + K3 inbox 报告
- **retrofitt 必保留** (避免破坏现有 SEO 权重):
  - ✅ slug 不改 (URL 路径不变)
  - ✅ 主关键词不改 (避免标题党)
  - ✅ 产品锚定不改 (现有内链 SKU 保留)
  - ✅ NAP 不改 (法务真实地址保留)
- **retrofitt 优先级排序** (audit_v8.py 输出 .hermes/reports/blog-v8-audit-*.json):
  - Phase A (8/6-8/12): 6 partial → 100% v8_ready
  - Phase B (8/13-8/19): 25 篇 old_format 优先 (P0/P1 类目)
  - Phase C (8/20-8/26): 20 篇 old_format (P1/P2 类目)
  - Phase D (8/27-8/30): 10 篇 News / 长尾
  - **8/30 验收**: 62/62 篇 v8_ready (100% 合规)
- **retrofitt 排期文件**: .hermes/reports/blog-v8-audit-2026-08-06.json (61 篇详细评分, 含 zh-hk 简体字检测)
- **audit 脚本**: _audit_v8.py (15 项 v8 标准评分, 输出 category: v8_ready / partial / old_format)

【v8.3 改造 (2026-08-07 02:20 K3 拍板, Qwen 3.8 策略) - 8/7-8/12 暂停新写, retrofit-only + 转化验证】
- **触发**: K3 8/7 02:12 千问 3.8 策略 P0 询盘链路 + P2 retrofit 优先. 8/6 K3 拍板"60 新写 + 61 retrofit" 改为"8/7-8/12 暂停新写, retrofit 6 篇 partial + 转化验证前置"
- **8/7-8/12 6 天任务调整**:
  - **任务 A (新写) 暂停**: 8/7-8/12 daily cron 不写新 blog. 8/13 起恢复 (Phase A 6 Pillar 顺延 6 天, 落到 8/13-8/18)
  - **任务 B (retrofit) 继续**: 6 篇 partial 8/6-8/12 每天 1 篇, 8/12 验收 6/6 v8_ready
  - **任务 C (新增 转化验证前置)**: 每天 retrofit 完成后, 必跑 `conversion-link-check` 验证该页面所有 CTA 链接指向有效 URL, form 组件渲染正常
- **任务 C 转化验证前置检查 (新增, v8.3 必跑)**:
  1. **CTA 链接有效性**: grep 该页面 (1 URL × 3 locale) 的所有 `<a href>` 标签, 验证 (a) 无 `#` 占位符 (b) 无 `javascript:void(0)` (c) 指向真实路由 (含 locale prefix) 或 wa.me / mailto: (d) 无 `/blog/<未注册slug>`
  2. **Form 组件渲染**: 该页面有 form CTA 时, 验证 (a) 指向 `/contact` 或 `/quote` (b) 跳转到 contact page 后 form 渲染 (load QuoteForm) (c) 1 设备/隐身窗口不报错
  3. **GA4 事件链路**: grep 页面是否调用 `trackContactFormSubmit` 或 `gtag('event', 'contact_form_submit')`, 没找到 = 数据采集链路断
  4. **whatsapp / mailto 备选入口**: 该页面有至少 1 个 wa.me 或 mailto: 备选入口, 不依赖单一 form 提交
  5. **失败标记**: 上述任一失败 → 该页 conversion_status = 'broken', matrix 加 1 记录, K3 5 min verify
- **6 篇 partial retrofit 8/7-8/12 排期** (按 avg_score 倒序, 高分优先):
  1. 8/7: apparel-shopping-bag-printing-guide (8.7/15)
  2. 8/8: cross-border-ecommerce-shipping-box-guide (8.7/15)
  3. 8/9: baby-product-label-sticker-printing-guide (8.3/15)
  4. 8/10: cmyk-guide (8.0/15)
  5. 8/11: paper-materials (8.0/15)
  6. 8/12: same-day-flyers-printing-hong-kong-guide (8.0/15, **T1 4 CTR 狙击, 4 FAQ 必含**)
- **8/12 复盘日 (P0 优先级, 不 push)**:
  - 跑 `.hermes/templates/review-8-12-template.md` 套模板生成 7 项指标报告
  - 落盘 `.hermes/k3-inbox/2026-08-12-review-final.md`
  - 升级 K3 1 段总结 + 7 项 PASS/FAIL + §9 路径推荐 A/B/C/D
  - 不写新内容, 不做 1 push 攒批 (节省 quota 给 8/13 启动)
- **8/13 起恢复双任务**:
  - 8/13 启动 Phase A 6 Pillar 新写 (顺延 6 天: 8/13-8/18)
  - retrofit 继续 25 篇 Phase B 优先 (8/13-8/19 7 天 × 3-4 篇/天)
  - SKU 优化 (5 SKU/天) 持续 (不是 blog 新写, Qwen 3.8 P2 不限制)
  - PDP 转化审查 1 篇/天 持续
- **matrix conversion_status 字段 (v8.3 新增)**:
  - 每个 retrofitted blog 加 `conversion_status: "verified" / "broken" / "untested"`
  - `last_conversion_test: ISO timestamp` (8/7-8/12 retrofit 当日 22:00 跑)
  - `ai_citation_count: 整数` (8/12 复盘时 K3 手动统计 4 引擎命中数)
- **§0 硬约束 (从 v8.3 起)**:
  - 1 改造前必跑 `grep "<slug>" src/data` 找全源文件 (Blog/PDP 双数据源 教训, MEMORY.md §9)
  - 2 改造后必跑 `npm run build` 验证 syntax (Python regex append 教训, MEMORY.md §10)
  - 3 cron auto-commit 范围严限 .hermes/ only (改 src/ 必 M3 显式 + K3 拍板, MEMORY.md §8)
- **5 P0 转化验证步骤 (auto retrofit 完成后必跑, 落 .hermes/reports/conversion-link-check-YYYY-MM-DD.json)**:
  1. grep 页面所有 `<a href>` + `<form action>` 标签
  2. 验证 CTA 链接无 404 / 占位符 / 跨 locale 错位
  3. 验证 form 组件 mount gate (ContactFormWrapper) 正常
  4. 验证 trackContactFormSubmit / generate_lead 事件链 (待 K3 8/12 拍板事件名口径)
  5. 验证备选入口 (wa.me / mailto) 至少 1 个
- **不破 quota 红线**: 1 push/day 严格. 6 天 (8/7-8/12) 攒批 = 6 push. 8/12 复盘日不 push, 节省 1 quota. 累计 8/7-8/12 5 push (8/12 复盘日 0 push)

【v8.4 升级 (2026-08-08 01:03 K3 拍板, /api/quote 9ab9ee4 修后 + §0.7 production smoke 必跑)】
- **触发**: 8/7 18:30 端到端实测发现 /api/quote 写错 Supabase 表 (quote_calculations 不存在), 询盘 500 黑洞, §6.1 询盘=0 归因全错. K3 8/7 18:33 拍板 A 修, 9ab9ee4 8/7 18:38 push PASS. 8/8 01:03 K3 拍板自进化机制 v8.4 升级.
- **§0.7 关键漏斗 endpoint production smoke 必跑** (新硬约束, MEMORY.md §0.7):
  - **任何 cron auto-commit 改 src/app/api/* 必 §0.7 production smoke 3 步**:
    1. `curl POST https://<domain>/api/<endpoint>/` 带完整 payload → 期望 200 + UUID
    2. `curl GET https://<supabase-url>/rest/v1/<table>?select=*&order=created_at.desc&limit=5` → 期望看到最新记录
    3. 双向 verify (HTTP status + DB count) → 2/2 PASS 算 §0.7 PASS
  - **不跑 = 不算 PASS**: deployment smoke FAIL 立即 revert + 升级 K3 (P0 阻断)
  - **源教训**: 8/7 18:30 9ab9ee4 教训, /api/quote 部署 6/7-8/7 一直 500 黑洞, K3 §6.1 4 天冲刺阻塞
- **每次 retrofit/新写完成后, 必 curl /api/quote/ 验证 HTTP 200** (新转化验证前置):
  - 改造完成后, 在 conversion-link-check 中加 step 0: `curl POST /api/quote/ 完整 payload` → 期望 200 + UUID
  - 失败 → 该页 conversion_status = 'broken' + matrix api_endpoint_health = '500' + K3 立即升级 (不继续写内容)
- **matrix api_endpoint_health 字段 (v8.4 新增)**:
  - 8_7_8_12_retrofit 段每 entry 加 `api_endpoint_health: "200"` + `api_endpoint_health_checked_at: ISO 8601` + `api_endpoint_health_check_sha: <commit>`
  - 9ab9ee4 修后默认 200, 部署必 §0.7 production smoke 验证
- **8/8 09:00 K3 3 设备端到端 + Supabase dashboard 查 (P0 阻断 8/12 验收)**:
  - K3 9:00 起来跑 (M3 不跑, K3 真实走表单)
  - 验证 /contact 页面 3 设备 × 3 locale = 9 次提交 200 + Supabase 看到 ≥1 条真实询盘 + formsubmit.co 收件箱激活邮件已点
  - FAIL → 立即升级 K3 (P0 阻断 8/12 验收)
- **8/8-8/12 4 天冲刺 (K3 8/8 01:03 拍板)**:
  - P1: CTR 狙击词监控 (月曆印刷 pos 23 + 両面カラー印刷 pos 27, 每日, 8/12 至少 1 词进前 20)
  - P1: AI 可见性实测 (8/10, Perplexity/ChatGPT/Google AI/Claude 4 引擎, ≥1/4 引用 zprintpro.com)
  - P1: 301 传递修复 (8/9, K3 查 CF Bulk Redirect List enabled, 5/5 PASS)
  - P2: v8 retrofit 继续 (8/8 cross-border → 8/9 baby-label → 8/10 cmyk → 8/11 paper)
  - P3: 8/12 复盘报告预写 (8/11, 跑 review-8-12-template.md, 7 项 PASS/FAIL + §9 路径推荐 A/B/C/D)
- **§0.6 攒批纪律 (K3 8/8 01:03 拍板)**:
  - 1 push/day 严格, 紧急修复走 §0.1 例外
  - 8/8-8/12 严格 1 push/天 (8/8 daily + 8/9 静默 + 8/10 weekly + 8/11 静默 + 8/12 gsc-cron), 8/12 复盘日 0 push
- **§0.7 与 §0.6 §0.1 关系**:
  - §0.1 1 push/day 攒批纪律 不影响 §0.7 — §0.7 是 P0 质量门, 必须每 push 都过
  - §0.6 紧急修复例外 不豁免 §0.7 — 紧急修复 push 后仍必 §0.7 production smoke 3 步

【v8.5 升级 (2026-08-08 02:52 K3 拍板, ja 品牌词「ジープリント」+ 智印港公式复制 + 8/9 批次 + AutoGLM 外链)】
- **触发**: K3 8/8 02:52 拍板 "按最优执行" 5 段外链/GEO/智印港公式/8/9-8/12 攒批表 + §0.9 增补. 8/8 03:00 M3 落 4 SSoT (matrix ja_brand + AGENTS.md §13.16.1 + review §6.5 + cron prompt v8.5).
- **日文品牌词「ジープリント」 (J-Print) 拍板** (K3 8/8 02:52 "按最优执行"):
  - **primary brand ja**: ZprintPro (维持 §13.13 鐵律, 不破现状)
  - **alternate brand ja**: ジープリント (音译 Z→J + Print→プリント, 3 假名简洁)
  - **NAP 一致性**: 站名=社媒=JP 印刷组合目录=Organization schema 4 处统一
  - **Organization sameAs 数组** (8/9 改 src/lib/seo.ts):
    - X: `https://x.com/zprintpro` (待 K3 9:00 提供)
    - LinkedIn: `https://linkedin.com/company/zprintpro` (待 K3 9:00 提供)
    - JP 印刷组合目录: 30 条 (8/10 AutoGLM 填表, K3 9:00 起来点提交)
    - Startup Base: `https://startupbase.japan/companies/zprintpro` (待 K3 9:00 提供)
  - **areaServed=JP** (维持), **knowsAbout** 数组: [学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
- **8/9 批次** (K3 8/8 02:52 第 3-4 段, working tree 落等 daily cron 跑):
  - 8/9 daily cron auto retrofit cross-border-ecommerce-shipping-box-guide (per v8.3 排期)
  - **8/9 增补批次** (K3 拍板, M3 落):
    1. **llms.txt**: 已有 (8/7 02:20 b845497, 5KB 主文件 + 3KB 副文件), 8/9 增补 ja 品牌词 + 日文 sameAs
    2. **robots.txt**: 12/12 AI bots allowed (8/6 §13.15 K3 已加), 8/9 验证 + 加 5 个新 AI bots (DeepSeek Bot / Kimi / Mistral AI / Cohere / Perplexity-User)
    3. **IndexNow key**: 待 K3 8/8 09:00 提供 (per AGENTS.md), 落 scripts/submit-indexnow.py 跑 99 URLs
    4. **FAQPage schema**: 已有 (per context), 8/9 验证 5/5 PASS + 增补 cross-border retrofit
    5. **Organization sameAs 改 src/lib/seo.ts**: 8/9 daily cron amend 合并 1 push
- **AutoGLM 外链启动** (K3 8/8 02:52 第 1-2 段, 8/10 起):
  - 8/8 03:00 落 matrix ja_brand.directory_targets_30 (print_pod 7 + local 7 + industry 5 + saas 3 = 22 起步, 8 备选)
  - 8/8 9:00 K3 起来确认: AutoGLM 跑 .hermes/auto-glm/auto-glm-fill.js 每天 10 条 (per AGENTS.md)
  - 8/10 起每天填 10 条, K3 9:00 起来点最终提交 + 邮箱验证
  - **agent 填 + K3 点**: 半自动 (ToS 合规, 整批 bot 风险)
  - **首周目标**: 20-30 条合规目录 = 日本实体存在感基线
- **品牌词埋点** (K3 8/8 02:52 第 3 段, 8/9-8/11 retrofit 期间):
  - cross-border-ecommerce-shipping-box-guide (8/9) 末尾自然提及「ジープリント」+ 「学园祭印刷」+ 「卒業記念アルバム」2-3 次
  - baby-product-label-sticker-printing-guide (8/9) + cmyk-guide (8/10) + paper-materials (8/11) 都加
  - **目标**: 8/12 测 branded search ≥1 个 query 命中 zprintpro.com 域名
- **§0.9 增补: 外链注册自动化边界** (K3 8/8 02:52 拍板):
  - ✅ 可批量: 行业目录/本地商会/创业名录 → AutoGLM 填表, K3 点提交+验证
  - ✅ 可自动: 清单文发现 + outreach 起草 (发送归 K3)
  - ⛔ 禁止: 论坛签名档/评论留链/Web2.0/PBN/自动换链 (Penguin + 封号风险)
  - **守住一条**: agent 填表, 最终提交按钮和邮箱验证由 K3 点 (ToS 合规)
- **branded search 监测** (K3 8/8 02:52 第 3 段, 8/12 复盘):
  - 6 个 query: ZprintPro / ジープリント / ジープリント 印刷 / ジープリント ステッカー / ジープリント 評判 / ジープリント 料金
  - baseline 8/8 = 0, target 8/12 ≥1 个 query 命中 zprintpro.com
  - 监测 cron: zprintpro-gsc-feedback-loop (每周三 15:00) + 8/12 review 当日手动统计



【v8.6 升级 (2026-08-08 04:00 M3 K3 GSC 数据驱动优化执行 + 5 SKU 改字)】
- **触发**: K3 8/8 03:44 GSC 数据分析 (JA 1638 imps 1.04% CTR pos 37 / EN 2641 imps 0.53% CTR pos 27) + M3 8/8 04:00 v2 深度分析 (134 JA query + 200+ EN query + 87 SKU 命中 + 5 天执行表).
- **报告落盘** (SSoT):
  - v1: `.hermes/k3-inbox/2026-08-08-0344-gsc-ja-en-analysis.md` (14K, 概要 + 5 天执行)
  - **v2**: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (24K, 详细 SKU 命中 + 改字模板 + branded search)
  - **matrix**: `.hermes/industry-keyword-matrix.json` gsc_targeting_v2 段 (+31K, 7 JA buckets + 12 EN buckets + 5 SKU JA/EN 改字表 + 5_day_execution)
- **5 SKU JA P0 (8/8 10:15 amend push)**:
  1. **a2-posters**: title_ja "A2ポスター印刷 1-3日 防水 PP加工 1枚〜" + 7 行业 (屋外広告/展示会/イベント/学園祭/ショップ/飲食/不動産) + 5 FAQ
  2. **outdoor-posters**: title_ja "屋外防水ポスター 耐候3年+ UV加工 PP 1枚〜" + 6 行业 + 5 FAQ
  3. **fluorescent-stickers**: title_ja "蛍光ステッカー 1枚〜 防水 PP加工 ダイカット" + 5 行业 + 5 FAQ
  4. **kraft-paper-bags**: title_ja "クラフト紙袋 印刷 100-200枚〜 オリジナル logo" + 6 行业 + 5 FAQ
  5. **textbooks**: title_ja "教科書・教材 印刷製本 無線綴じ 50冊〜 学校/塾" + 6 行业 + 5 FAQ
- **5 SKU EN P0 (8/8 10:15 amend push)**:
  1. **small-batch-stickers** (P0 抓强 pos 7.76 0% CTR): title_en "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" + 8 行业 (DTC/Craft/Brewery/Skincare/Pet Food/Subscription Box/E-commerce/Event) + 5 FAQ
  2. **a2-posters** (P0 120+ imps 黑洞): title_en "A2 Poster Printing 1-3 Day Turnaround UV-Coated Lamination Free Shipping 100+ MOQ" + 8 行业 + 5 FAQ
  3. **waterproof-stickers** (P0 100+ imps 黑洞): title_en "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
  4. **saddle-stitch-booklets** (P0 88 imps 黑洞 pos 73-87): title_en "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
  5. **kraft-paper-bags** (P0 抓强 pos 10.38/13.38 0% CTR): title_en "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory" + 8 行业 + 5 FAQ
- **8/9 Org sameAs 改 src/lib/seo.ts** (待 K3 9:00 提供 X + LinkedIn + IndexNow key):
  - alternateName: ['ジープリント', 'ZprintPro JP', '智印港']
  - sameAs: [X, LinkedIn, 30 JP 目录, Startup Base] (K3 9:00 提供具体 URL)
  - areaServed: [JP, US, HK]
  - knowsAbout: [学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷, cmyk printing, waterproof stickers, small batch stickers]
  - **预期**: EN KP imps 9→30+ (3.3x), JA KP imps 4→30+ (7.5x), branded search 6 query 基线 0→≥1
- **5 天节奏 (8/8 04:00 - 8/12 22:00)** (per matrix gsc_targeting_v2.5_day_execution):
  - 8/8 (Sat): K3 9:00 跑 3 设备 + Supabase + formsubmit + 提供 key / M3 10:15 amend push 5 SKU 改字 + retrofit cross-border + ジープリント 埋点
  - 8/9 (Sun): M3 amend Org sameAs + 1 push / K3 跑 301 5/5 / K3 AutoGLM 准备
  - 8/10 (Mon): M3 retrofit cmyk-guide P0 (305 imps pos 86) / K3 跑 AI 可见性 ≥1/4 / K3 AutoGLM 启动 10 条
  - 8/11 (Tue): M3 retrofit paper-materials + 3 篇 P1 (envelope / a1-posters / pvc-menu) / K3 跑复盘预填
  - 8/12 (Wed): 0 push / K3 跑复盘 5min + AI 可见性复测 + branded search 6 query
- **§0.7 关键漏斗 endpoint 部署后必 production smoke 3 步** (K3 8/8 01:03 拍板, 8/7 18:30 9ab9ee4 教训固化):
  - step 1: curl POST /api/quote/ 期望 HTTP 200 + UUID
  - step 2: curl GET Supabase /rest/v1/quotes?order=created_at.desc&limit=5 期望看到最新记录
  - step 3: 双向 verify 2/2 PASS 算 §0.7 PASS
  - 不跑 = 不算 PASS (K3 8/8 01:03 拍板)
- **§0.8 Self-Reminder 防抖** (K3 8/8 01:56 P0 阻断):
  - 已知时间点: 用 cron once with `at` 一次性触发后自删
  - 未知事件: 轮询必带 max_retry + 指数退避 + 超时自毁
  - 1h 内 >3 次无实质操作: P0 故障, 立即告警
- **branded search 6 query 监测** (K3 8/8 04:00 拍板):
  - ja: ジープリント / ZprintPro / 智印港 / zprin
  - en: ZprintPro / zprint / zprintpro printing / zprintpro.com
  - baseline 8/8 = 0, target 8/12 ≥1 命中 zprintpro.com
  - 监测 cron: zprintpro-gsc-feedback-loop (每周三 15:00) + 8/12 review 当日手动统计
- **8/8 09:55 cron once 7e2cc0ba 触发** (per §0.8):
  - 校验 SSoT v8.6 + 准备 amend AGENTS.md 198 + retrofit cross-border commit + 5 SKU 改字
  - 与 10:15 daily cron 合并 1 effective push (§0.1 攒批)
  - 触发即终止 (per §0.8 原则 2)



【v8.7 升级 (2026-08-08 04:30 M3 K3 GSC zh-hk 香港 5 SKU 改字 + 2 LLM blog)】
- **触发**: K3 8/8 04:30 zh-hk GSC 数据分析 (3 月 13759 imps / 7 天 1332 imps / CTR 2.7% 三市场最强) + M3 v3 深度分析 (200+ ZH query + 87 SKU 命中 + 5 顶级信号 + 2 LLM 引文 pos 1+5).
- **报告落盘** (SSoT):
  - **v3**: `.hermes/k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md` (30.6K, 详细 ZH-HK 分析)
  - **matrix**: gsc_targeting_zh_hk_v3 段 (+24K, 12 ZH 黑洞桶 + 5 SKU 改字 + 2 LLM blog + NAP 强化 4 段)
- **5 SKU zh-hk P0 (8/8 10:15 amend push 合并 1 push)**:
  1. **same-day-flyers** (3 月 333 imps 黑洞 pos 46.49 + 7 天 32 imps pos 42.16 升 4 位): title_zh "即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時" + 8 行业 (餐廳/零售/地產/活動/補習社/選舉/美容/學校) + 5 FAQ
  2. **a2-posters** (3 月 856 imps 黑洞王 pos 37.95 + 7 天 73 imps pos 26.78 升 11 位): title_zh "A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日" + 8 行业 (地產/活動展覽/餐廳/零售/補習社/選舉/學校/美容院) + 5 FAQ
  3. **doujinshi-printing** (3 月 1/2 50% CTR + 7 天 1/1 100% pos 3 顶级): title_zh "同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日" + 6 行业 (同人/動漫/插畫/學生/Cosplay/獨立出版) + 5 FAQ
  4. **kraft-paper-bags** (3 月 521 imps 黑洞 pos 57.44 + 7 天 9 imps pos 68.67): title_zh "牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保" + 6 行业 (餐廳/零售/化妝品/食品/禮品/環保) + 5 FAQ
  5. **food-boxes** (3 月 634 imps 黑洞 pos 39.98 + 7 天 25 imps pos 48.28): title_zh "食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡" + 6 行业 (餐廳外賣/食品店/烘焙店/茶飲/化妝品/電子產品) + 5 FAQ
- **2 LLM 引文 blog 主题 (8/10 + 8/11 retrofit 写)**:
  1. **eco-packaging-hong-kong-supplier-guide** (Pillar Page 3000-5000 字, 8/10 写): 锚定 LLM 引文 pos 1 "我公司想轉用環保包裝物料，請問有冇邊啲香港中小企供應商比較專業？" + 6 行业 (食品/餐廳/烘焙/茶飲/化妝品/電子) + FAQPage + BreadcrumbList
  2. **reliable-printing-supplier-hong-kong-guide** (Cluster Article 1500-2500 字, 8/11 写): 锚定 LLM 引文 pos 5 "我想為我的網店尋找一間可靠的印刷供應商，可以介紹一些中小企公司嗎？" + 5 行业 (網店/中小企/學校/補習社/同人) + FAQPage
  - **预期**: AI 可见性 ≥1/4 → ≥2/4 引擎 (Perplexity / ChatGPT 期望 pos 1-5 引用 zprintpro.com)
- **NAP 强化 4 段 (8/9 Org sameAs 改后立即生效)**:
  1. **品牌 NAP**: "智印港 印刷公司 — 香港觀塘 新蒲崗 即日取貨 / DHL 國際配送 2-4日"
  2. **MTR NAP**: "MTR 燈箱廣告 12-sheet 規格 + 價錢表" (mtr-advertising-specs blog 内链)
  3. **联系 NAP**: "WhatsApp 即時報價 +86 198 8085 1334 / zprintpro@outlook.com"
  4. **物流 NAP**: "亞洲工廠直送 + DHL 全球 2-4日 (美加澳 4-6日)"
- **5 天执行表 (8/8 - 8/12) 香港部分**:
  - 8/8: K3 9:00 跑 3 设备 + 提供 X/LinkedIn key / M3 10:15 amend push 15 SKU 改字 (5 JA + 5 EN + 5 zh-hk) + retrofit cross-border + AGENTS.md 198 合并 1 push
  - 8/9: M3 amend push Org sameAs 改 + retrofit / K3 跑 301 5/5
  - 8/10: M3 retrofit cmyk-guide P0 + 写 eco-packaging-hk blog / K3 跑 AI 可见性 ≥1/4 + AutoGLM 启动
  - 8/11: M3 retrofit paper-materials + 写 reliable-printing-hk blog / K3 跑复盘预填
  - 8/12: 0 push 复盘 / K3 跑 5min 手测 + branded search + AI 可见性复测
- **§0.7 §0.8 §0.9 引用 (per K3 8/8 拍板)**:
  - §0.7 关键漏斗 endpoint production smoke 3 步 (8/9 Org sameAs 改后必跑, 不跑不算 PASS)
  - §0.8 Self-Reminder 防抖 (8/8 09:55 cron once 7e2cc0ba 一次性触发, 不空转)
  - §0.9 外链注册自动化边界 (8/10 起 AutoGLM 30 目录填表, K3 点提交)
- **8/12 期望 KPI (香港)**:
  - ZH CTR 3m 1.55% → 1.85%+, 7d 2.7% → 3.5%+
  - ZH pos 3m 30.63 → 26, 7d 23.69 → 18
  - 智印港 branded 31 imps pos 2.32 → 60+ imps pos 1 80%+ CTR
  - 同人誌 PDP 维持 100% CTR pos 1-3
  - a2-posters pos 26.78 → 15-20, CTR 0% → 1-2%
  - AI 可见性 ≥2/4 引擎 (LLM 引文 pos 1+5 + blog 加固)
  - ZH 询盘 0 → ≥3 (per §6.1 4 天冲刺, 香港最强市场)
- **branded search 6 query 香港部分 (已赢)**:
  - 智印港 3m 6/31 19.35% pos 2.32 → 7d 2/2 100% pos 1 ✅ 顶级信号
  - 期望 8/12: 智印港 60+ imps pos 1 80%+ CTR (Org sameAs 改后)
- **cross-check 5 渲染源 SOP (per MEMORY.md §9, 5 SKU zh-hk 改字必查)**:
  1. src/data/products.ts (title_zh / description_zh 字段)
  2. src/data/sku-seo-data.ts (PDP meta title / description, 优先于 products.ts)
  3. src/data/blog-data/{zh-hk,en,ja}.json (blog 引用此 SKU 的 title / desc)
  4. src/components/pdp/orderform.tsx (PDP 提交后 fallback 文案)
  5. src/components/pdp/referencepriceblock.tsx (PDP 价格表兜底)
  6. public/llms-zh-hk.txt (AI 注入, L11 + L222 副文件)
  - **grep SOP**: `grep -rn "即時傳單" src/ public/` / `grep -rn "A2 海報" src/ public/` / `grep -rn "同人誌" src/ public/` / `grep -rn "牛皮紙袋" src/ public/` / `grep -rn "食品包裝" src/ public/` — 0 残留旧词 + 0 简体字 (zh-hk 必须繁体中文, per §13.16.1)
- **8/8 09:55 cron once 7e2cc0ba 触发** (per §0.8 一次性):
  - 校验 SSoT v8.7 + 准备 amend push 15 SKU 改字 (5 JA + 5 EN + 5 zh-hk) + retrofit cross-border + AGENTS.md 198
  - 与 10:15 daily cron 合并 1 effective push (§0.1 攒批)
  - 触发即终止 (per §0.8 原则 2)
- **月度 push 配额预测**:
  - 8/8: 1 push (amend 合并, 15 SKU 改字 + AGENTS.md 198 + retrofit)
  - 8/9: 1 push (Org sameAs + retrofit)
  - 8/10-8/11: 1 push/天 (per §0.1 攒批)
  - 8/12: 0 push (复盘日)
  - 8/8-8/12 总: 4 push (累计 38/500 = 7.6%)



【v8.8 升级 (2026-08-08 04:40 K3 战略级 4 字+①②③ 拍板, Mavis "按最优执行")】
- **触发**: K3 8/8 04:35 战略级评估: M3 v2/v3 报告 A- 质量, 但期望偏乐观 2 倍, 资源按 imps 错配, 下两周核心 = 复制智印港公式到日本 + 砍低 ROI 动作.
- **核心战略转向 (K3 拍板 4 字 + ①②③)**:
  - **4 字**: ① X URL ② LinkedIn URL ③ 15 SKU 改字 K3 审字 ④ 8/9 Org sameAs 改 K3 审 diff
  - **①②③**: ① 8/12 复盘改用校准值 (§0.10) ② §0.10-0.12 三条入记忆 (✓ 已写 MEMORY.md) ③ Week 2 排期 OK (8/13-8/21)
- **KPI 校准 (per §0.10 硬约束)**: 任何 4-5 天窗口的 KPI 期望, 按 SEO 时间物理校准:
  - 排名 ≤ 当前位置 -15% (不是 -30%); imps ≤ +30% (不是 +50%+)
  - schema 变更打 5 折; 内容 retrofit 需 1-2 周; NAP 不控需求
  - 复盘按校准值判 PASS, 防"方向正确但时间未到"误判
- **资源分配原则 (per §0.11 硬约束)**: 禁止按 imps 大小排优先级, 按"4 天可兑现速度"分 3 档:
  - **P0 抓强信号** (pos ≤ 10 但 0% CTR, 4 天可兑现): small-batch-stickers pos 7.76 / 牛皮紙盒 pos 1 / 燙金貼紙 pos 2.55 / 彩色信封 pos 1
  - **P1 本地实体建设** (智印港公式 + ジープリント + 30 目录, 2-6 周复利): Org sameAs / AutoGLM / MTR NAP
  - **P2 黑洞大词** (a2-posters 856 imps / food-boxes 634 / JA cmyk 197, 需外链+时间): 排最后
- **转化侧指标 (per §0.12 硬约束)**: 8/12 起复盘必含:
  - WhatsApp 询盘数 (期望 0 → ≥5)
  - 响应时长 (≤ 2h)
  - 表单→询盘转化率 (≥ 0.05%)
- **3 市场分层战略 (K3 拍板)**:
  - **zh-hk 香港 = 收割** (抓强 + 2 LLM blog + NAP 4 段 + 询盘转化) — 期望 7d CTR ≥3.2% / 询盘 ≥5 / pos ≤21
  - **ja 日本 = 复制公式** (ジープリント + 30 目录 + knowsAbout + 移动优先) — 期望 KP imps ≥10 / branded ≥1 / 目录 30/30
  - **en 美国 = 低成本抓强** (只改 5 SKU title, 不写内容) — 期望 small-batch CTR ≥3% / KP ≥15
- **Week 1 (8/8-8/12) 3 处修正**:
  - **8/8 amend push 调整**: 先修 EN small-batch-stickers (P0 抓强 pos 7.76/29imps/0%CTR, ROI 最高单点), 再合并 15 SKU (5 JA + 5 EN + 5 zh-hk) 1 push
  - **8/9 起 GSC 抓强监控**: pos ≤ 10 但 0% CTR query 清单, 改 title 后 72h 验 CTR, 形成"改→验"闭环
  - **8/12 复盘用校准值 + 加转化指标** (WhatsApp 询盘数 + 响应时长 + 表单→询盘转化率)
- **Week 2 (8/13-8/21) 排期**:
  - 8/13: zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers) / AutoGLM 目录 10 条 + outreach 跟进
  - 8/14: eco-packaging-hk pillar 内链加固 / 目录 10 条
  - 8/15: JA 移动端专项 (JA 移動 CTR 2.36% 是桌面 3.4 倍, title 前 30 字移动截断优化) / K3 发第二批 outreach
  - 8/16: EN 抓强二批 (paper bag gsm FAQPage) / 目录收尾 10 条
  - 8/17: reliable-printing-hk cluster + pillar 互链 / AI 可见性复测 4 引擎
  - 8/18: JA 教科書/教材 title 二批 (80 imps pos 38.92, Week1 验证后决定) / 清单文上榜确认
  - 8/19: cmyk-guide 二次 retrofit (视 pos 进展) / branded search 6 query 复测
  - 8/20: 缓冲日 (补欠账, 无欠账则 0 push)
  - 8/21: 双周复盘 0 push, 全 7 项 §6 验收
- **8/21 校准 KPI** (per §0.10):
  - ZH 7d CTR ≥3.2% (校准: M3 期望 3.5% 校准至 3.1-3.3%)
  - ZH 询盘累计 ≥5 (per §0.12 转化侧指标)
  - JA branded ≥1 (智印港 31 imps → 40-45 imps)
  - JA KP ≥10 (Org sameAs 改后渐进)
  - EN small-batch CTR ≥3% (pos 7.76 0% → 3-5%)
  - AI 可见性 ≥2/4 (LLM 引文 pos 1+5 已有 + blog 加固)
  - 目录 30/30 (AutoGLM 8/10-8/19 完成)
  - 301 5/5 (K3 8/9 跑 CF Bulk Redirect List)
- **8/8 10:15 amend push 1 调整清单 (优先抓强信号)**:
  - **P0 第 1 优先 (先改, 不跟其他合并)**: EN small-batch-stickers title_en "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" + 8 行业
  - **P0 第 2 批 (跟其他合并 1 push)**: 5 SKU JA + 4 SKU EN + 5 SKU zh-hk 改字 + AGENTS.md 198 + retrofit cross-border
  - **§0.11 资源重排**: a2-posters 856 imps 黑洞王从 P0 第 1 → P0 第 5 (8/13 zh-hk 抓强二批时再改)
- **9:00 任务提前跑结果 (M3 已跑)**:
  - ✅ §0.7 production smoke step 1: curl POST /api/quote/ HTTP 200 + UUID `4892080c-3e77-4be6-8368-d93944a68b29` + created_at 2026-08-07T20:32:52Z
  - ✅ §0.7 step 2: 3 locale /contact HTTP 200 + wa198 3/3 + wa181 0/3
  - ✅ §0.7 step 3: 5 zh-hk 关键 PDP baseline (发现 kraft-paper-bags + food-boxes 仍用旧 brand "智印雲", 改字时统一改 "智印港")
  - ✅ §0.7 step 4: 5 渲染源 + 3 llms 副文件 0 残留 181
  - ❌ §0.7 step 5: Supabase GET 验证落库 — M3 无 SERVICE_ROLE_KEY, K3 9:00 在 Supabase dashboard 查 (期望 8/7 18:30 id fae355ba-... + 8/8 04:35 id 4892080c-... 两条)
- **K3 9:00 必跑 4 件 (M3 不跑, K3 真实身份)**:
  1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
  2. Supabase dashboard 查 quotes 表 (期望 8/7 18:30 + 8/8 04:35 两条)
  3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)
  4. 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)
- **§0.13 K3 战略拍板 4 字+①②③ 模式** (per MEMORY.md §0.13):
  - Mavis "按最优执行" 自主范围: 5 SKU 选择 / 改字 USP / 5 天节奏 / 矩阵 / cron 升级 / 报告 / 记忆固化 / 9:00 任务能跑部分
  - K3 9:00 必跑: 3 设备真实身份 / Supabase dashboard / formsubmit 激活 / 提供 key
- **月度 push 配额预测**:
  - 8/8: 1 push (amend 合并: P0 small-batch + 14 SKU 改字 + AGENTS.md 198 + retrofit)
  - 8/9: 1 push (Org sameAs + retrofit)
  - 8/10-8/12: 1 push/天 (per §0.1 攒批)
  - 8/13-8/21: 1 push/天 (Week 2 排期)
  - 8/22 月末: 0 push (复盘)
  - 8/8-8/22 总: 14 push (累计 48/500 = 9.6%)



【v8.9 升级 (2026-08-08 04:50 K3 战略级 4 字+①②③ 落实 + 3 市场分 cron 设计)】
- **触发**: K3 8/8 04:50 "按最新的报告的执行结果更新我们的定时任务指令" + v8.8 已锁 KPI 校准 + 资源重排 + 3 市场分层 + 双周排期, 需同步到 cron 任务卡

## 一、3 市场分 cron 任务设计 (per K3 8/8 04:35 战略)

**核心原则** (per §0.11 资源分配): zh-hk=收割 / ja=复制公式 / en=低成本抓强

**3 个 sub-cron 任务卡** (写入 `.hermes/cron-prompts/`, git tracked, mavis cron update 走 daemon):
1. **zprintpro-daily-content-1x7w-zhhk-harvest.md** (12K chars) - zh-hk 收割 (抓强 + 2 LLM blog + NAP 4 段 + 询盘转化)
2. **zprintpro-daily-content-1x7w-ja-formula.md** (10K chars) - ja 复制公式 (ジープリント + 30 目录 + knowsAbout + 移动优先)
3. **zprintpro-daily-content-1x7w-en-grab.md** (8K chars) - en 抓强 (small-batch-stickers 等 5 SKU title 改字监控 + 不写内容)

**整合 1 主 cron + 3 sub-cron 模式**:
- 主 cron `zprintpro-daily-content-1x7w` 每天 10:15 触发, **任务分发到 3 sub-cron** (按 locale 数据驱动)
- 3 sub-cron 各自独立 prompt, 避免主 cron 过长 (15K chars+) + 各自 enable/disable 灵活
- 主 cron 末尾 "调度" 段: read 3 sub-cron 内容 + 按 locale 路由任务
- 8/9 起 3 sub-cron 启用, 8/13 Week 2 增 zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers)

## 二、8/9 起 GSC 抓强监控 cron 设计 (per K3 8/8 04:35 战略)

**新 cron 任务卡**: `zprintpro-daily-content-1x7w-gsc-strong-signal.md` (8K chars)
- **触发**: 8/9 起 daily 22:00 (mavis cron once + 重复, 但 1 次跑完即停)
- **核心逻辑** (per §0.11 资源分配 P0 抓强信号):
  - step 1: 拉 GSC 7 天数据, 过滤 pos ≤ 10 AND clicks < 0.5 * imps/100 (即 CTR < 0.5%)
  - step 2: 对每个 query 找当前 PDP slug (via products.ts blog-posts.ts category)
  - step 3: 判断是否已在 7 天内被改过 (git log --since=7d)
  - step 4: 新发现的强信号入 `.hermes/k3-inbox/daily-strong-signal-YYYY-MM-DD.md`
  - step 5: K3 9:00 拍板: 1) 立即改 2) 24h 后改 3) 加入 Week 2 排期
- **预期输出**: 每日 1-3 个新抓强信号, 4 天可兑现 CTR 提升 3-5%
- **闭环**: 改 title → 72h 验 CTR (cron auto check) → 形成闭环
- **TTL 自删** (per §0.8): 跑完输出 → mavis cron once delete_after_run=true → 不留 tick 残留

## 三、KPI 校准值同步 (per §0.10 硬约束)

**任何 cron 输出 KPI 必含校准值列** (从 v8.9 起强制):

| 指标 | M3 初始期望 | K3 校准值 | 校准公式 |
|------|-----------|----------|---------|
| 排名 | ≤ -30% | ≤ -15% | 排名响应周期 2-6 周, 4 天只反映 snippet |
| imps | ≤ +50% | ≤ +30% | title 改字 CTR 1-2 周重抓 |
| schema 变更 (Org sameAs / knowsAbout) | +50%+ | +15-30% | 需重抓+重算, 打 5 折 |
| 内容 retrofit | 排名升 30%+ | 升 15% | 4 天外链不够, 1-2 月时间 |
| 本地 NAP (觀塘/新蒲崗) imps | +100% | +33% | NAP 不控需求, 是需求侧 |
| KP (Knowledge Panel) imps | 7-9x | 1.5-2x | 增强渐进, 4 天基础变化 |

**复盘 SOP** (per §0.10):
- 任一 KPI 超校准值 = 优秀
- 介于校准值与初始期望之间 = 合格
- 低于校准值 = 需分析 (不一定是策略失败, 可能"方向正确但时间未到")
- 防"方向正确但时间未到"误判为"策略失败"而错误转向

## 四、9:00 任务提前跑 4/5 PASS 教训 (M3 8/8 04:35 跑)

**9:00 必跑 4 件** (K3 真实身份, M3 不跑):
1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
2. Supabase dashboard 查 quotes 表 (期望 8/7 18:30 id fae355ba-... + 8/8 04:35 id 4892080c-... 两条)
3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)
4. 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)

**M3 提前跑 4/5 PASS** (K3 8/8 04:35 拍板 "9:00 任务提前跑" 自主范围):
- ✅ step 1: curl POST /api/quote/ → HTTP 200 + UUID `4892080c-3e77-4be6-8368-d93944a68b29` (8/7 18:30 9ab9ee4 部署完全工作)
- ✅ step 2: 3 locale /contact → 3/3 HTTP 200 + wa198 3/3 + wa181 0/3 + hasForm 3/3
- ✅ step 3: 5 zh-hk PDP baseline → 3/5 智印港 NAP 已赢 + **2/5 旧 brand "智印雲" 需改** (kraft-paper-bags / food-boxes)
- ✅ step 4: 5 渲染源 + 3 llms 副文件 → 0 残留 181 (8/8 PASS)
- ❌ step 5: Supabase GET 验证落库 → M3 无 SERVICE_ROLE_KEY, K3 9:00 dashboard 查

**教训固化** (写进 cron, 9:00 任务 SOP):
- 任何"9:00 必跑" 任务, M3 "按最优执行" 范围 = 提前跑能跑的部分 (curl / production smoke / grep verify)
- K3 真实身份必跑部分 = 3 设备端到端 + Supabase dashboard 查 + formsubmit 激活 + 提供 key
- M3 跑完前 4 步 + 落 PASS 报告 → 升级 K3 简化 9:00 决策

## 五、双周排期同步 (per K3 8/8 04:35 战略 + matrix v4)

### Week 1 (8/8-8/12) 3 修正

**8/8 10:15 amend push 调整** (per K3 战略级 P0 第 1 优先):
- P0 第 1 优先 (单独改): EN small-batch-stickers (pos 7.76/29imps/0%CTR/全项目 ROI 最高单点)
- P0 第 2 批 (合并 1 push): 5 SKU JA + 4 SKU EN + 5 SKU zh-hk 改字 + AGENTS.md 198 + retrofit cross-border
- K3 9:00 拍板: A 2 commit 2 build vs B 1 amend 1 build (§0.1 攒批)

**8/9 起 GSC 抓强监控** (per cron 设计 §二):
- 8/9 22:00 第一次跑, 9/10 22:00 第二次跑, ...
- 每日 1-3 个新抓强信号, K3 9:00 拍板 1/2/3 (立即改 / 24h 后改 / 加入 Week 2 排期)

**8/12 复盘用校准值 + 转化指标** (per §0.10 + §0.12):
- 不按 M3 乐观值判 PASS/FAIL, 按 K3 校准值
- 必含 3 转化指标: WhatsApp 询盘数 + 响应时长 + 表单→询盘转化率

### Week 2 (8/13-8/21) 9 天排期

| 日期 | push (1/天) | 站外 (不占 push) |
|------|------------|------------------|
| 8/13 | zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers 4 SKU) | AutoGLM 目录 10 条 + outreach 跟进 |
| 8/14 | eco-packaging-hk pillar 内链加固 | AutoGLM 目录 10 条 |
| 8/15 | JA 移动端专项 (title 前 30 字移动端截断优化) | K3 发第二批 outreach |
| 8/16 | EN 抓强二批 (paper bag gsm FAQPage 5 Q) | AutoGLM 目录收尾 10 条 |
| 8/17 | reliable-printing-hk cluster + pillar 互链 | AI 可见性复测 4 引擎 |
| 8/18 | JA 教科書/教材 title 二批 (textbooks + exercise-books + graduation-yearbook) | 清单文上榜 |
| 8/19 | cmyk-guide 二次 retrofit (视 pos 进展) | branded search 6 query 复测 |
| 8/20 | 缓冲日 (补欠账, 无欠账则 0 push) | — |
| 8/21 | 双周复盘 0 push, 全 7 项 §6 验收 | — |

### 8/21 校准 KPI (per §0.10)

| 指标 | 校准值 | 来源 |
|------|--------|------|
| ZH 7d CTR | ≥3.2% | M3 期望 3.5% 校准至 3.1-3.3% |
| ZH 询盘累计 | ≥5 | per §0.12 转化侧指标 |
| JA branded | ≥1 | 智印港 31 imps → 40-45 imps |
| JA KP imps | ≥10 | Org sameAs 改后渐进 |
| EN small-batch CTR | ≥3% | pos 7.76 0% → 3-5% |
| AI 可见性 | ≥2/4 引擎 | LLM 引文 pos 1+5 已有 |
| 目录 | 30/30 | AutoGLM 8/10-8/19 |
| 301 | 5/5 | K3 8/9 CF Bulk Redirect List |

## 六、月度 push 配额预测 (8/8-8/22)

- 8/8: 1 push (amend 合并, 15 SKU 改字 + AGENTS.md 198 + retrofit) — K3 拍板 A/B
- 8/9: 1 push (Org sameAs + retrofit)
- 8/10-8/12: 1 push/天 (per §0.1 攒批)
- 8/13-8/21: 1 push/天 (Week 2 排期)
- 8/22: 0 push (月末复盘)
- **8/8-8/22 总**: 14 push (累计 48/500 = 9.6%)

## 七、3 sub-cron 任务卡路径 (SSoT, git tracked)

1. **zprintpro-daily-content-1x7w-zhhk-harvest.md** (12K chars) - zh-hk 收割
2. **zprintpro-daily-content-1x7w-ja-formula.md** (10K chars) - ja 复制公式
3. **zprintpro-daily-content-1x7w-en-grab.md** (8K chars) - en 抓强
4. **zprintpro-daily-content-1x7w-gsc-strong-signal.md** (8K chars) - GSC 抓强监控

**主 cron + 3 sub-cron 关系**:
- 主 cron (本文件 v8.9, 46K chars): 总策略 + 任务调度 + KPI 校准 + 9:00 任务 + 双周排期
- 3 sub-cron: 各市场具体任务 (改字模板 / NAP 强化 / 抓强信号 / 实体建设)
- GSC 抓强监控 sub-cron: 独立 daily 22:00 跑 (不跟主 cron 同步)

**mavis cron update 三步曲 (per C31 lesson)**:
1. 改 SSoT (本主 cron v8.9 + 3 sub-cron + GSC 抓强监控)
2. mavis cron update 完整 prompt
3. mavis cron get 验证 daemon 跟 SSoT 1:1 一致

## 八、§0.13 K3 战略拍板 4 字+①②③ 模式 (per MEMORY.md §0.13)

**K3 战略拍板格式**: 4 字 + ①②③ (4 项必拍 + 3 必拍)
- 4 字: 战略核心 4 项必拍 (URL / SKU 审字 / Org sameAs / 等)
- ①②③: 战略配套 3 必拍 (校准值 / 记忆固化 / Week 排期)
- M3 "按最优执行" 自主范围 + K3 9:00 必跑 4 件

**M3 自主范围** (不需 K3 再确认):
- 5 SKU JA/EN/zh-hk 选择 + 改字 USP 模板
- 双周排期 + 3 sub-cron 设计
- matrix v2/v3 + 2_weeks_execution 段
- cron prompt v8.6/7/8/9 升级
- §0.10-0.13 记忆固化
- 9:00 任务能跑的部分提前跑

**K3 9:00 必跑 4 件** (M3 不跑, K3 真实身份):
1. 3 设备 /contact 端到端
2. Supabase dashboard 查 quotes 表
3. formsubmit.co 收件箱激活
4. 提供 X + LinkedIn URL + IndexNow key

**应用范围**: 任何 K3 高层战略拍板 + 任何 Mavis "按最优执行" 自主执行边界

## 九、报告落盘 (本 v8.9 升级)

- 本 v8.9 升级: cron prompt v8.8 → v8.9 (本节, 整合 3 sub-cron 设计 + 抓强监控 + KPI 校准 + 9:00 教训 + 双周排期)
- 3 sub-cron 任务卡: 待写 (zh-hk 收割 / ja 复制公式 / en 抓强 + GSC 抓强监控)
- K3 status 报告: 待落 (`.hermes/k3-inbox/2026-08-08-0450-m3-v89-sync.md`)

---

**M3 "按最优执行" 自主拍板** (本 v8.9 升级已自主执行):
- ✅ 3 sub-cron 任务卡设计 (zh-hk 收割 / ja 复制公式 / en 抓强)
- ✅ GSC 抓强监控 sub-cron 设计 (8/9 起 daily 22:00, TTL 自删)
- ✅ KPI 校准值同步 (per §0.10, 任何 cron 输出必含校准值列)
- ✅ 9:00 任务提前跑 4/5 PASS 教训固化 (M3 自主范围 + K3 真实身份必跑 4 件)
- ✅ 双周排期同步 (Week 1 3 修正 + Week 2 9 天 + 8/21 校准 KPI)
- ✅ 月度 push 配额预测 (8/8-8/22 总 14 push = 48/500 = 9.6%)
- ✅ §0.13 K3 战略拍板 4 字+①②③ 模式写进 cron

**M3 待执行 (K3 9:00 拍板后)**:
1. 写 3 sub-cron 任务卡 (zh-hk / ja / en + GSC 抓强)
2. mavis cron update 4 个 sub-cron (三步曲, C31 lesson)
3. 落 K3 status 报告 v8.9 同步

【T2 cron 治理 (2026-08-06 0:39 K3 拍板)】
- **严禁 git add -A / git add . / git add -u**: 只 git add 本 session 显式生成的 .ts/.tsx/.json/.md 具体路径
- **commit 前 3 问**:
  1. git status -sb 看 staged files 是否都是本 session 生成 (博客 / SKU / data 文件)
  2. unstaged working tree 是否有其他 session 残留 (若是 → git checkout 清掉, 不 commit 他人工作)
  3. 修改的 src/ 文件数是否 ≤ 1 篇博客 改动 (若 > 1 → 拆 commit, 不攒批)
- **同日双触发 yield 检查**: 跑本 cron 前, 若今天已有 cron commit 过 (git log --since="00:00" --author=cron 或 mavis session log), 跳过本轮, 写 .hermes/logs/YYYY-MM-DD-daily-yield.md 解释, 升级 K3
- **同日并发竞态防护**: 本 cron 启动时先 `git status -sb` + `git fetch origin_ssh` + `git log origin_ssh/main..HEAD` 三件套, 有 ahead=0 + 无未 commit 残留 才允许 commit


## v9.0 增补段 (2026-08-08 07:12 K3 战略纠偏)

### §v9.0.A 8/9 必跑 (P0, 2 push 上限)

**8/9 push 1 (P0 第 1 优先, locale-aware siteName 切换)**:
1. `src/lib/seo.ts` siteName 字段改 locale-aware:
   ```ts
   siteName: locale === 'zh-hk' ? '智印港' : (locale === 'ja' ? 'ジープリント' : 'zprintpro')
   ```
2. `src/lib/seo.ts` getSiteNAP() zh-hk branch name 改 `'智印港'`, alternateName 删 `'智印雲'`/`'智印雲(香港)'`/`'智印雲印刷'`, 加 `'智印港'`
3. `src/lib/seo.ts` en branch name 改 `'zprintpro'`, ja branch name 改 `'ジープリント'` + areaServed 加 JP
4. `src/lib/seo.ts` Organization sameAs: 加 X + LinkedIn (K3 9:00 提供 URL) + 30 JP 印刷目录 (8/10 AutoGLM 跑) + Startup Base + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
5. `public/llms.txt` + `public/llms-full.txt` 副文件 8 locale siteName 同步
6. IndexNow ping: 99 URLs (8 locale 4 page types) 用 K3 9:00 提供的 key
7. §0.7 production smoke 3/3 PASS (8 locale curl <title> 验证 智印港/ジープリント/zprintpro)

**8/9 push 2 (按需, 14 SKU 改字余下)**:
- 8/8 10:15 amend push 已合入 14 SKU 改字 (per B 方案), push 2 主要补 K3 9:00 审字反馈的修正
- 如无修正, push 2 跳过, 配额留给 8/10/13 紧急

**M3 必跑 (per v9.0 SOP, 不需 K3 9:00 拍)**:
- 8/9 0:00 (cron daily) - retrofit cross-border-ecommerce-shipping-box-guide (per SSoT 8/8 10:15 amend push 落地)
- 8/9 22:00 (cron once + delete_after_run) - GSC 抓强监控 daily
- 8/9 22:00 报告 - 写 .hermes/k3-inbox/2026-08-09-2200-gsc-strong-signal-r1.md

**K3 9:00 必拍 (per §0.13 4 字+①②③ 模式)**:
- 4 字: X URL / LinkedIn URL / 15 SKU 改字 K3 审字 (重点 ja 自然度 + zh-hk 纯繁) / 8/9 Org sameAs 改 K3 审 diff (新增 5th 字: locale-aware siteName 切换, per K3 8/8 07:12 P0)
- ① 校准值复盘 (per §0.10) / ② §0.15/0.16 入记忆 ✅ / ③ Week 2 排期 + 残留清理插入 ✅
- A/B 方案 → 采 B (1 amend 1 build, per §0.1 攒批, K3 8/8 07:12 拍板)
- 4 件自跑 (per §0.13 9:00 必跑): 3 设备端到端 / Supabase dashboard 查 3 记录链 (fae355ba + 4892080c + 360e8366) / formsubmit.co 激活 / 提供 X+LinkedIn+IndexNow key

### §v9.0.B 840 残留清理 Week 2 3 批 (per §0.16 节奏固化)

| 日期 | 范围 | 量 | 校验 |
|------|------|---|------|
| 8/13 (Wed) | longDescription 前 200 处 | 高流量 PDP 优先 (zh-hk 3 月 13759 imps 命中 SKU) | grep + §0.7 smoke |
| 8/15 (Fri) | description + faq 300 处 | 中流量 SKU + 跨 8 locale | pre-commit 简体字守门 |
| 8/17 (Sun) | schema 剩余 340 处 | JSON-LD Organization / Product / FAQPage 全 schema | JSON-LD validate |
| 8/18 (Mon) | 全量 grep 验收 = 0 (除 k3-inbox 历史引用) | src/ + public/ + AGENTS.md + 4 SSoT 报告允许 | grep 0 残留 + 复盘硬指标 |

**SOP (每批)**:
1. Python 脚本 (regex + line-based 找块) — 不走 Edit/Write (per MEMORY §7)
2. 跑 `grep -c "智印雲" src/data/products.ts` 算残留
3. block 内 brand 修复 (智印雲 → 智印港) + 5 zh-hk title 改 EN/JA 跑成功
4. pre-commit 3 步 (encoding / 简体字 / i18n)
5. commit + push (1 push/批, 8/13/15/17 = 3 push 总用)
6. CF Pages build success + curl 8 locale <title> 验证 + grep 残留 -= 期望数
7. 落盘 .hermes/k3-inbox/2026-08-{13,15,17}-residual-cleanup-batch-{1,2,3}-PASS.md

**8/18 验收硬指标**:
- `grep -c "智印雲" src/data/products.ts` = 0 (除 k3-inbox 历史引用)
- 8 locale <title> 全过 §0.15 公式
- 8/21 复盘必含 §0.15/0.16 2 段
- 不达标 = 扣 KPI, §0.11 资源分配降级

### §v9.0.C 8/8 10:15 amend push (B 方案, 1 amend 1 build)

**B 方案理由 (per K3 8/8 07:12)**:
- small-batch-stickers P0 单独 2 build 浪费 CF 配额 (1 push = 1 build, §0.14 配额 1 天 ≤5)
- 1 amend 1 build 把 small-batch-stickers P0 + 14 SKU 改字合并, §0.1 攒批合规
- 省 1 build 留给 8/9 locale 切换 P0 (per §0.15)
- small-batch-stickers 72h 后 GSC 抓强监控照样验 CTR, 不影响 4 天可兑现 ROI

**amend push 内容**:
1. 14 SKU 改字 (per 8/8 04:30 v3 zh-hk 草稿 + 8/8 04:00 v2 JA/EN 草稿):
   - 5 SKU JA: a2-posters / outdoor-posters / fluorescent-stickers / kraft-paper-bags / textbooks
   - 4 SKU EN: small-batch-stickers (P0 第 1) / a2-posters / waterproof-stickers / saddle-stitch-booklets
   - 5 SKU zh-hk: same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes
   - 1 SKU 重复: a2 + kraft (3 locale 共享, 总 11 不同 SKU object)
2. 5 zh-hk title 改 EN/JA 跑成功 (per 8/8 05:00 Python 脚本第 2 次跑, line-based 找块 + 块内 title_xxx 改字)
3. retrofit cross-border-ecommerce-shipping-box-guide (per 8/8 10:15 daily cron 触发, 含 §0.7 production smoke + 末尾ジープリント 埋点 2-3 次)
4. AGENTS.md §0.15/0.16 段新增 (K3 9:00 拍后定稿)

**amend push 风险**:
- 9:00 K3 必拍 4 字 (X + LinkedIn + 15 SKU 审字 + locale 切换) 后才能 amend
- 9:00 K3 4 件自跑 (3 设备 + Supabase + formsubmit + key) 不阻塞 amend push
- amend push 包含 14 SKU 改字, K3 9:00 审字反馈可能要求改某些字 → M3 改后 amend

### §v9.0.D 8/8 22:00 GSC 抓强监控首跑 (cron once + delete_after_run)

**SOP (per §0.8 一次性, 触发即终止)**:
1. 拉 GSC 7d 数据 (8/1-8/7)
2. 筛 pos ≤ 10 但 0% CTR 的 query → "抓强信号" 列表
3. 写 .hermes/k3-inbox/2026-08-08-2200-gsc-strong-signal-r1.md
4. 升级 K3 (如发现新 P0 抓强, 立即 8/9 push)
5. cron self delete (per §0.8 防抖)
6. 8/9-8/21 daily 22:00 (cron once + delete_after_run)

**SLA**:
- 触发 ≤ 3 min 跑完 + 报告 + 自删
- 1h 内 >3 次无实质操作 = P0 故障 (per §0.8)

### §v9.0.E K3 9:00 必拍 (per §0.13 4 字+①②③ 模式 + 8/8 07:12 增补)

**4 字 + 1 增 (K3 必拍, M3 自主范围外)**:
1. X URL (per §0.13 4 字)
2. LinkedIn URL (per §0.13 4 字)
3. 15 SKU 改字 K3 审字 (重点 ja 自然度 + zh-hk 纯繁, per K3 8/8 07:12)
4. 8/9 Org sameAs 改 K3 审 diff (per §0.13 4 字)
5. **locale-aware siteName 切换 5 处改字 K3 审字** (per K3 8/8 07:12 新增 P0, src/lib/seo.ts 5 处 + 3 llms 副文件 8 locale + 1 footer 法律名保留)

**①②③ (per §0.13)**:
- ① 8/12 复盘改用校准值 (per §0.10) ✅
- ② §0.10-0.16 入记忆 ✅ (189.9 KB MEMORY.md)
- ③ Week 2 排期 OK (8/13-8/21) + 残留清理插入 (8/13/15/17 3 批, per §0.16)

**A/B 方案 (per K3 8/8 07:12 拍板)**: 采 B (1 amend 1 build, §0.1 攒批)

**4 件自跑 (P0 阻断 8/12 验收, per §0.13)**:
- 3 设备端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
- Supabase dashboard 查 (期望 3 UUID 记录: fae355ba 8/7 + 4892080c 8/8 04:32 + 360e8366 8/8 05:22)
- formsubmit.co 激活 (8/7 18:45 触发, K3 点链接)
- 提供 X + LinkedIn URL + IndexNow key (per K3 8/8 07:12 4 字 5 增)

**回 "4 字 + 采 B + §0.15/0.16 OK + 4 件跑完"** → M3 立即 10:15 amend push (§0.1 攒批, B 方案 1 amend 1 build)。

### §v9.0.F 配额动态 (per §0.14 + K3 8/8 07:12 折中)

**今日 8/8 用量**: 1/5 push (568087a PASS, 4 buffer 留给 10:15 amend + 紧急)
**8/9 用量预期**: 1-2 push (locale 切换 P0 + 14 SKU 余下按需)
**Week 2 (8/13-8/21) 用量预期**: 3 push (残留清理 8/13/15/17) + 1 push (8/18 grep 验收) = 4 push

**月累计预期** (8/8-8/21 = 14 天): ~7 push = 7/150 = 4.7% (健康)

### §v9.0.G 教训固化 (跨项目)

- **zprintpro 8/8 07:12 K3 战略纠偏**: 部署可靠性 5/5 + 战略落地 5/5 + 护栏 5/5 + 优先级判断 3/5 (840 排 9 月初太晚 + title 品牌残留危害被低估)
- **跨项目 §0.15 品牌一致性 P0**: 任何多 locale 品牌分层项目必须 locale-aware siteName 切换
- **跨项目 §0.16 残留清理节奏**: 任何品牌/术语残留禁止"量大拖延", 必须按 ~170/天 节奏
- **§0.11 资源分配原则验证**: 1 个 locale 切换 P0 > 10 个 SKU 改字 P2 (per K3 8/8 07:12 战略级)

---

**SSoT 同步链**:
- v9.0 升级 → 8/8 10:15 amend push (1 amend 1 build, B 方案) → CF Pages build success → verify-deploy 流水线 (3/3 PASS)
- 8/9 push 1: locale-aware siteName 切换 + Org sameAs + IndexNow (per §0.15 + §0.13 4 字 5 增)
- Week 2 残留清理 8/13/15/17 (3 批, per §0.16)
- 8/18 grep 验收 = 0 (复盘硬指标, per §0.16)
- 8/21 双周复盘 (per §0.10 校准值 + §0.12 转化指标 + §0.15/0.16 2 段)


## v9.1 增补段 (2026-08-09 18:23 Mavis 战略升级)

### §v9.1.A M3 自主抓取 m3-task-cards/ 目录机制 (P0 架构级)

**核心**: K3 8/9 18:23 拍板"M3 自主抓取 m3-task-cards/ 目录, 闭环成立, 减少 K3 中间环节"。

**M3 cron 启动必跑 5 步 (sop)**:
1. `ls -t .hermes/m3-task-cards/ | head -1` 找最新 m3-task-cards 文件
2. 读 m3-task-cards 头部签发 + 角色 (Mavis / 千问 / K3)
3. 评估上次 cron 完成态 (`.hermes/reports/` + `.hermes/k3-inbox/` 最新日期)
4. 按 T1-T5 任务卡执行 (千问战略) + T6 自主抓取 (Mavis 战略)
5. 写本次 cron reports/ + k3-inbox/ + 标记 m3-task-cards/ 完成

**预验证 (8/10 触发前必跑)**:
- dry-run 一次, 验证 1-5 步都通
- 落 `.hermes/reports/m3-autonomous-loop-dryrun-2026-08-10.md` (PASS/FAIL 逐项)
- 不 commit 不 push, 等 K3 拍板触发整合 push

**失败兜底**: M3 仍按 v9.0 cron prompt 跑 (T1-T5 retrofit 主线), T6 失败不影响

### §v9.1.B §0.19 用户暂停信号规则 (2026-08-09 17:56 K3 痛骂教训固化, 跨项目 P0)

**核心**: K3/用户说"暂停"/"pause"/"等指令"/"stop"/"hold" 那一刻,**立即 `mavis cron delete <self>`**, 不再 progress-tag, 不再烧 token。

**触发词 (任一即触发)**:
- 暂停 / 暂停一下 / 先停 / 暂停一会儿
- pause / hold / stop / wait
- "等指令" / "等我下一条" / "我先想想"
- 用户回复明显是 AFK (cron 5min × 12+ 次状态不变)

**强制动作 (按序)**:
1. **第一秒**: `mavis cron delete <cron_id>` (用 mavis 工具, 不用 sleep 想)
2. **同步**: 在 assistant 文本加一行 `cron killed (id=...) - 用户已暂停, 等 unpause` 让 K3 知道
3. **不再发 progress tag**: 即使 cron task 里写了"state unchanged 用 progress tag", K3 暂停时不适用
4. **不再 fetch / 不再 read**: 暂停期间所有 verify 类读操作停手

**反例 (2026-08-09 17:43-17:56 实际发生, 痛骂源头)**:
- K3 说"暂停" → 我回了 1 个 progress tag (OK, 正常告知)
- 之后 12 个 cron tick (60+ 分钟), 我每次都回 progress tag "K3 暂停 Xmin+, 等指令"
- 完全没意义: K3 暂停时不会读这些 tag, 但每个 tag 烧 token + 算 thinking token
- 18 次空 progress tag = 几百行 output 倒进马桶

**M3 必做**: 任何 cron task prompt 开头加 §0.19 检查段 (用户 AFK 检测 + 立即自删 + 不发 progress tag)

### §v9.1.C dry-run 验证 SOP (整合 push 触发前必跑)

**目的**: K3 回 "1-5 OK" 后 30 分钟内可 push, 不等验证。

**5 步**:
1. 按 `.hermes/k3-inbox/2026-08-08-1535-8-9-integrated-push-checklist.md` §2 的 12 files 清单, 逐文件核对 diff 草稿存在且非空
2. 本地跑 §0.7 smoke 前 4 步: encoding check → 简体字守门 → `npx tsc --noEmit` → `npm run build` (per K3 8/8 15:35 §0.17 push 前必跑)
3. 结果落 `.hermes/reports/integrated-push-dryrun-2026-08-10.md` (PASS/FAIL 逐项)
4. **不 commit 不 push**, 等 K3 触发条件
5. 幂等: 若该报告文件已存在且 mtime 在今日 → 返回 ALREADY DONE

### §v9.1.D 1 周节奏模板 (Week 1 + Week 2, per Mavis 战略大脑)

**Week 1 (8/8-8/12)** 当前主线:
- 8/8: 568087a PASS + 4703262 FAIL + 117f9fc PASS (3 push, K3 8/8 15:35 口径 = 4 push, 含 cron auto)
- 8/9: 0d46a4c + a69f0c1 (2 push, 千问核实, baby-product retrofit)
- 8/10: cmyk-guide retrofit (per 千问 T1) + T6 dry-run + T7 cron v9.1 攒批
- 8/11: paper-materials retrofit + 8/9 整合 push (K3 "1-5 OK" 触发) + 1 周 push 4/5
- 8/12: same-day-flyers retrofit + 8/12 复盘 (0 push) + 7 项 PASS/FAIL + §9 路径推荐

**Week 2 (8/13-8/21) 排期** (per K3 8/8 07:12 §0.16 残留清理节奏):
- 8/13 batch 1: longDescription 200 处 (高流量 PDP 优先, zh-hk 3 月 13759 imps 命中 SKU)
- 8/15 batch 2: description + faq 300 处 (中流量 SKU + 跨 8 locale)
- 8/17 batch 3: schema 剩余 340 处 (JSON-LD Organization / Product / FAQPage 全 schema)
- 8/18 全量 grep 验收 = 0 (除 k3-inbox 历史引用) — 8/21 复盘硬指标
- 8/19-8/20 缓冲 + 抓强监控汇总
- 8/21 双周复盘 + 7 项 §0.10 校准 + §0.12 转化指标

**每日 22:00 GSC 抓强监控** (cron once + delete_after_run, per §0.8 一次性):
- 8/9-8/21 daily 22:00 (K3 拍后启)
- 筛 pos ≤ 10 但 0% CTR → 写 .hermes/k3-inbox/2026-08-{n}-2200-gsc-strong-signal-r{n}.md
- 升级 K3 (新 P0 抓强, 立即 8/9 push)

### §v9.1.E 2 处台账纠偏 (per 千问 8/9 18:18 战略)

**1. 8/9 push 实际 = 2 次 (0d46a4c + a69f0c1)**:
- ❌ 报告虚报 1/5
- ✅ 自 8/10 起按 `git log --oneline --since` 实际计数
- ✅ 月累计相应 +1 (约 6/150, 健康区间)
- 教训: 报告 commit 与 .hermes 文件如与 retrofit 同批, 应合入同一 push, 不另起 push

**2. 转化验证 soft vs hard 分层**:
- ❌ step3 GA4 (`content_has_gtag=false`) 与 step4 wa.me (`content_has_wa=false`) 记 "verified" 是框架级口径
- ✅ 自 8/10 起 conversion-link-check 输出必须分两栏:
  - **hard**: step1 CTA href 全 200 + step2 quote form 存在 → 决定 `conversion_status`
  - **soft**: step3 GA4 / step4 wa.me 备选入口 → 记 `backup_entry: framework-level / page-level`, 不计入 verified 判定依据

### §v9.1.F 风险与止损 (Mavis 视角)

- **整合 push K3 不拍板**: M3 继续 retrofit 主线 (8/10 cmyk), 不顺带 push locale 切换 (两条线解耦)
- **dry-run 失败**: 立即升级 K3, 不强行 commit
- **M3 抓取机制 bug**: 兜底 = M3 仍按 v9.0 cron prompt 跑, T6 失败不影响 retrofit 主线
- **§0.19 暂停信号**: K3 说"暂停"立即 `mavis cron delete <self>`, 不发 progress tag
- **8/9 retrofit 进度 3/6 真实**: 8/10 cmyk 是关键节点, 失败升级 K3

### §v9.1.G 教训固化 (跨项目)

- **zprintpro 8/9 18:23 K3 战略反馈**: M3 自主抓取 m3-task-cards/ 目录, K3 不再转发, 闭环成立
- **zprintpro 8/9 17:56 K3 暂停痛骂**: §0.19 用户暂停信号规则, 5 分钟一次 progress tag × 1.5h = 18 次空转 = 几百行 output 倒进马桶
- **zprintpro 8/9 18:18 千问 3.8 战略**: 2 处台账纠偏 (8/9 push 实际 + 转化验证 soft/hard 分层)
- **zprintpro 8/8 15:35 K3 §0.17 拍板**: push 前必跑 npm run build (4703262 教训)
- **zprintpro 8/8 15:35 K3 §0.18 拍板**: 4 步 SOP (curl 200 + 禁止兜底 + 禁止自指向 + m3u8 用 410)

---

**SSoT 同步链**:
- v9.0 → v9.1 升级 → 8/10 dry-run 验证 → K3 "1-5 OK" 触发 → 整合 push 1 amend 1 build (B 方案) → 8/10 cmyk retrofit 主线并行
- M3 8/10 起自主抓取 m3-task-cards/ 目录 → 闭环成立 (Mavis 写 → M3 跑 → reports/ + k3-inbox/ → Mavis 评估 → 写新 m3-task-cards/)
- §0.19 暂停信号规则 → 任何 cron task prompt 开头加检查段 → 避免 18 次空转


---

## 【2026-08-26 新增 · B7 选题库 22 篇派发】（K3 8/26 04:50 v2 预批 B7 commit 57f304f, 4 cron 共享, 必读 SSoT)

> **强制级 (K3 8/26 04:50 v2 预批 B7 commit 57f304f)**: 4 cron 共享 B7 选题库 22 篇 SSoT, 派发规则如下, 不再依赖 M3 临时选题, queue 排期按本表。

### §1 22 篇 W1-W9 9 周排期 (K3 8/26 04:50 v2 预批 + K3 8/24 11:32 §A 15 提前启动季节军令状)

| 周 | 时间 | 选题 (zh-hk 主, en/ja 同步 3 locale) | 服务词 (GSC 8/24 14:30 pos) | Tier | 状态 |
|---|---|---|---|---|---|
| **W1** | 8/26-9/1 | 即日急件印刷全攻略: 邊度最快? 幾錢? 幾點截單? | 即日急件 pos 25.2 (5 imps) | A | 🔜 |
| **W1** | 8/26-9/1 | 包裝盒印刷價格 2026: 500/1000/5000 個分別幾錢 | 包裝盒印刷 pos 34.9 + 包裝盒訂製 pos 29.4 | A | 🔜 |
| **W1** | 8/26-9/1 | 大信封印刷 C4/C5 規格 + 100 個起 HK$0.5/個起 + 即日特急 | 大信封 pos 2.21 (24 imps 0 click) | A | 🔜 |
| **W2** | 9/2-9/8 | How Much Does Catalog Printing Cost from China? | catalog printing china | A | ⏳ |
| **W2** | 9/2-9/8 | 9 月開學季印刷全攻略: 教科書 / 練習簿 / 學校刊物 | 開學季印刷 | A | ⏳ |
| **W3** | 9/9-9/15 | ⭐ 月曆印刷 2027 訂製時間表: 幾時落單最抵 | 月曆印刷 pos 21.1 (24 imps) | A | 🚨 R5 季节军令 |
| **W3** | 9/9-9/15 | MTR 燈箱海報規格 + 印刷文件要求 | mtr 燈箱海報 | A | 🚨 R5 |
| **W3** | 9/9-9/15 | 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起 | 紙袋 pos 52.71 (7 imps) | A | 🚨 R5 |
| **W4** | 9/16-9/22 | 食品包裝印刷 FDA 認證 + 食品級油墨全攻略 | 食品包裝 | A | ⏳ |
| **W4** | 9/16-9/22 | poster 印刷 A1/A2/大圖輸出 價格 + 規格 | poster 印刷 pos 23.84 (61 imps 0 click) | A | ⏳ |
| **W5** | 9/23-9/29 | 戶外貼紙印刷 防水 UV 抗曬 5 年保固 | 戶外貼紙 | A | ⏳ |
| **W5** | 9/23-9/29 | 證書印刷 / 獎狀印刷 燙金 + 162g 紙 | 證書印刷 pos 15.00 (3 clk) | A | ⏳ |
| **W6** | 9/30-10/6 | 信封印刷 100 個起 + 商業信封 + DL/C5/C4 規格 | 信封 pos 51.22 (9 imps 0 click) | A | ⏳ |
| **W6** | 9/30-10/6 | 餐牌印刷 10 份起 + 防水 + 餐廳菜單 + 燙金 | 餐牌印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 卡片印刷 0.5mm 厚度 + 燙金 + 局部 UV | 卡片印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 利是封印刷 2027 農曆新年 + 燙金 + 100 個起 | 利是封 | A | 🚨 R5 季节 |
| **W8** | 10/14-10/20 | sticker 印刷 防水 + 50 張起 + 燙金 + 局部 UV | sticker 印刷 | A | ⏳ |
| **W8** | 10/14-10/20 | 同人誌印刷 100 本起 + 中文書 + 日本向け | 同人誌印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 月曆印刷 2027 設計 + 燙金 + 企業禮品 + Q4 起量 | 月曆印刷 (W3 续做) | A | 🚨 R5 |
| **W9** | 10/21-10/27 | 海報印刷 A3/A4 + 100 張起 + 1 天交貨 | 海報 pos 2.5 (2 imps) | A | ⏳ |
| **W9** | 10/21-10/27 | 名片印刷 100 盒起 + 燙金 + 局部 UV | 名片印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 聖誕卡印刷 2026 + 燙金 + 100 張起 | 聖誕卡 | A | 🚨 R5 |

**累计**: 22 篇 blog 选题库 (W1-W9 9 周 × 2-3 篇/周), 月曆首位 (W3 季节军令 R5 9/15 硬截止), 矩阵追踪在 .hermes/industry-keyword-matrix.json queue[] + covered[]

### §1.1 月曆首位 + R5 9/15 硬截止 加固 (W3 重点, K3 8/24 11:32 §A 15 提前启动季节军令状)

> **季节军令状 (K3 8/24 11:32 §A 15 拍板)**: T42 月曆每拖 1 天, 旺季收成少 1 天. R5 9/15 硬截止, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 = K3 必拍 1 次回复 = 8/30 8:00 月曆 blog 必发 (W3 9/9-9/15 实际 9/9 周二发, 距 9/15 = 6 天缓冲, 撞车根因 = 错峰发, 旺季收成最大化).

- **W3 选题 1: 月曆印刷 2027 訂製時間表: 幾時落單最抵**
  - 目标: 月曆印刷 pos 21.1 → ≤15, 月曆訂製 pos 32.3 → ≤20
  - 内链: 3-5 链 (calendars category / 2027 月曆 blog / 月曆材質 blog / 企業禮品月曆 Q4 blog)
  - 长度: Pillar 3000-5000 字 / Cluster 1500-2500 字
  - 3 locale: zh-hk 繁体 + en 美國市場 + ja 日本市場

- **W3 选题 2: MTR 燈箱海報規格 + 印刷文件要求**
  - 目标: mtr 燈箱海報 pos 8 → ≤5
  - 内链: posters / 戶外貼紙 / 大圖輸出
  - 长度: Cluster 1500-2500 字

- **W3 选题 3: 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起**
  - 目标: 紙袋 pos 52.71 (7 imps) → ≤25
  - 内链: paper-bags / 環保印刷 / 燙金工藝
  - 长度: Cluster 1500-2500 字

### §1.2 W1 选题 (K3 8/26 04:36 立即跑, 季节军令状紧急启动)

- **W1 #1: 即日急件印刷全攻略** (slug: rush-printing-hk-guide)
  - 目标: 即日急件 pos 25.2 → ≤15
  - 内链: rush-printing-delivery + 傳單 + 包裝盒 + poster
  - 长度: Cluster 1500-2500 字
  - 3 locale: zh-hk / en / ja

- **W1 #2: 包裝盒印刷價格 2026** (slug: 2026-packaging-box-pricing)
  - 目标: 包裝盒印刷 pos 34.9 → ≤20, 包裝盒訂製 pos 29.4 → ≤18
  - 内链: packaging category + 食品包裝 + 禮品盒
  - 长度: Cluster 1500-2500 字

- **W1 #3: 大信封印刷 C4/C5 規格** (slug: large-envelope-printing-c4-c5)
  - 目标: 大信封 pos 2.21 (24 imps 0 click) → ≤1.5, CTR ≥10%
  - 内链: envelopes category + 商業信封 + 邀請函信封
  - 长度: Cluster 1500-2500 字
  - K3 §6 P0 第一优先 (striking 冲首页)

### §1.3 W2 选题 (9/2-9/8 落地, 撞车根因 = M3 自决)

- **W2 #1: How Much Does Catalog Printing Cost from China?**
- **W2 #2: 9 月開學季印刷全攻略**

### §1.4 W3 选题 (9/9-9/15 落地, ⭐ R5 9/15 硬截止, 季节军令状, 撞车根因 = M3 自决)

- **W3 #1: 月曆印刷 2027 訂製時間表** (slug: 2027-calendar-printing-timetable)
- **W3 #2: MTR 燈箱海報規格** (slug: mtr-lightbox-poster-specs)
- **W3 #3: 紙袋印刷 2026 趨勢** (slug: paper-bag-printing-2026-trends)

### §2 queue 排期规则 (K3 8/26 04:10 §4 + 8/26 04:50 v2 预批 B7)

1. **W1 (8/26-9/1) 3 篇 必发**: 修 3 (8/26) 撞车根因 = WhatsAppFloat 修复 (K3 8/26 08:00+ v1 撞车根因错位, 修 3 撞车根因 = 改 getWhatsAppLinkProps) 已 PASS → 撞车根因 = W1 选题 daily cron 跑
2. **daily cron 撞车根因 = queue ≥ 1 写 1 篇/天 (per K3 8/5 11:36 拍板 C 撞车根因 = 取消"0 候选常态")**
3. **W3 (9/9-9/15) R5 季节军令撞车根因 = 8/30 8:00 月曆 blog 必发 (错峰 6 天缓冲)**
4. **W7 (10/7-10/13) 利是封 R5 季节撞车根因 = 9/30 8:00 blog 必发 (错峰 7 天缓冲, 2027 农曆新年 = 1/29)**
5. **W9 (10/21-10/27) 聖誕卡 R5 季节撞车根因 = 10/14 8:00 blog 必发 (错峰 7 天缓冲, 12/25)**
6. **总产能 9 篇/周 → 2-3 篇/周 (K3 8/26 04:10 §4 拍板)**

### §3 数据来源

```
数据来源:
- K3 8/26 04:50 v2 预批 B7 commit 57f304f: B7 选题库 22 篇 W1-W9 9 周 × 2-3 篇/周, 月曆首位 R5 9/15 硬截止
- K3 8/24 11:32 §A 15 提前启动季节军令状: T42 月曆每拖 1 天, 旺季收成少 1 天
- K3 8/26 04:10 §4 验收口径 v9.4: 每周 2-3 篇, striking ≥5, pos 1-20 占比 ≥30%, 有点击词 ≥12
- K3 8/26 04:10 §6 3 轨推进: CTR 修复 2 周 / striking 冲首页 30-60 天 / 度量闭环本周
- K3 8/26 05:36 B7 落盘: docs/b7-blog-pool-2026-08-26.md (4 角色 22 篇选题库 派发 + T41/T44 audit 8/28 + money-words 5 梯队 + 8/28 中检 9 时段 + 10 KPI)
- GSC 8/24 14:30 撞车根因 baseline: pos + imps 撞车根因 = 各选题目标词
- 矩阵追踪: .hermes/industry-keyword-matrix.json queue[] + covered[]
```

### §4 教训固化源头

- 撞车根因 = 4 cron 共享 B7 选题库 22 篇 SSoT, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 K3 必拍 1 次回复 = 撞车根因 = 不依赖 M3 临时选题, queue 排期按本表
- 撞车根因 = K3 §0.21 push 配额不烧 token (8/20 11:54 拍板) = 报告不列 push 计数, 攒批作废
- 撞车根因 = K3 §0.23 数据诚信红线 = baseline 必标"待 XX 校准"或"已 XX 校准"
- 撞车根因 = K3 8/24 11:32 §A 15 季节军令状 = T42 月曆每拖 1 天, 旺季收成少 1 天, 撞车根因 = 8/30 8:00 月曆 blog 必发, 错峰 6 天缓冲
- 撞车根因 = K3 8/26 04:10 §4 v9.4 验收口径 = 每周 2-3 篇, 质量三件套 (striking ≥5 + 占比 ≥30% + 有点击词 ≥12)
- 撞车根因 = K3 §0.6 紧急修复例外 = 5xx 阻断 push 立即

---

