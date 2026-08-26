# zprintpro-blog-deepfix v1.2 (2026-08-26 20:53 K3 拍板升级)

> **v1.1 → v1.2 核心变化** (per K3 8/26 20:53 升级拍板 "12要素及格线, 不是排名保障"):
> 1. **主题集群模型 (Topic Cluster)** (K3 拍板): 1 核心页 + 4 支撑页双向链接, 共享主题权重, 而非随机 3 条内链
> 2. **外链 SOP (Backlink SOP)** (K3 拍板 "GEO 命门"): 每篇 blog 发布后 7 天内 ≥1 条行业目录/本地商会/设计博客自然外链或品牌提及
> 3. **跨语言互链 (hreflang + 跨语言内容呼应)** (K3 拍板): 3 locale (zh-hk/en/ja) 不再独立, 互相链接 + hreflang 标准化
> 4. **用户信号反馈闭环 (CTR/停留时间/跳出率)** (K3 拍板 "12要素是静态检查, 无法验证真实效果"): 修复后 14 天回看 GSC, 校正下轮
> 5. **竞品对标 (可选)** (K3 拍板 "合规≠胜出"): 联网搜索 Top 3 竞品结构, 提炼差异化

---

# zprintpro-blog-deepfix v1.1 (2026-08-26 20:38 K3 拍板升级)

> **v1.0 → v1.1 核心变化** (per K3 8/26 20:38 升级拍板):
> 1. **触发时刻 20:00 → 17:00** (K3 拍板 "17:00 以后" 替代之前 "20:00 之后")
> 2. **联网搜索 3-5 → 5-10 query** (K3 拍板 "联网搜索内容和问题与扩充最新的知识")
> 3. **SEO+GEO 双高标准** (K3 拍板 "符合 SEO+GEO 的高标准"): 在原 6 硬约束上扩到 12 要素
> 4. **修复 + 写新合并**: 不仅是"修复已有 blog", 也可"写新深度长文" (同 SOP)

---

# zprintpro-blog-deepfix v1.0 (2026-08-26 20:35 K3 拍板新增, 第 5 个 zprintpro cron)

> **核心定位** (K3 8/26 20:35 拍板): 每天 17:00 Asia/Shanghai 启动**深度修复长文 blog**, 必须联网搜索真实数据后再写内容, 不能瞎写。

---

## 【启动必读 5 SSoT】(优先级顺序, cron 启动 30 秒内必读)

1. **本文件** `.hermes/cron-prompts/zprintpro-blog-deepfix.md` (深度修复 SOP, SSoT 完整)
2. `F:\zprintpro-nextjs\.hermes\cron-prompts\sop-10-gate.md` (4 cron 共享 SOP-10 5 问门禁, 必跑)
3. `F:\zprintpro-nextjs\.hermes\blog-audit-v5.json` (v5 双格式盘点 71 blog + 待修去重 24 个 + GSC 命中数据)
4. `F:\zprintpro-nextjs\AGENTS.md` (项目宪法 §0 / §1 / §6 / §11 / §12 / §13)
5. `F:\zprintpro-nextjs\.hermes\cron-prompts\k3-v3-addendum-2026-08-23.md` (K3 8/23 v3 增补, 业务 0 改动红线 F0 + 5 SOP)

---

## 【触发】

每天 17:00 Asia/Shanghai (cron schedule `0 17 * * *`)

---

## 【预算】

90 min / 轮, 长期 cron, 不自删 (由 M3 维护)

---

## 【SEO+GEO 12 高标准要素】(per K3 8/26 20:38 拍板 "符合 SEO+GEO 的高标准", 必跑, 缺则报告作废)

### SEO 6 要素 (基础, 现有 v3 已有)
1. **首段 60-150 词答案前置** (Answer-First, 前段直接答问题, AI 引用率高)
2. **≥8 H2 段** (结构化, markdown `##` 风格, 覆盖 5-10 个长尾子主题)
3. **≥6 Q&A FAQ** (markdown `**Q1: ...**` 模式, 覆盖 PAA People Also Ask)
4. **≥3 数据点** (真实数据, 必标来源: Statista / FDA / Smithers / 行业协会)
5. **≥2-3 内链** (到 category / product / blog, 内链网络增强)
6. **Title 50-60 字符 + Meta 150-160 字符** (SERP snippet 优化)

### GEO 6 要素 (per v2 master + K3 8/26 升级)
7. **FAQPage JSON-LD schema** (GSC rich result 资格, 引用率高)
8. **HowTo JSON-LD schema** (步骤类内容必含, 步骤化)
9. **Article schema (BlogPosting)** (author + datePublished + dateModified + publisher)
10. **BreadcrumbList schema** (面包屑结构化)
11. **实体名词锚文本** (entity anchor text, e.g. "FDA 21 CFR 176.170" 不是 "click here")
12. **llms.txt 站点级 AI 训练入口** (per 智印云 §13.16, public/llms.txt + llms-full.txt, AI 引擎抓取)

### 强约束
- 修复 / 写新 = 12 要素**全必含**, 缺则报告作废
- 修复前 grep GSC 命中 query 出现次数 N, 修复后 ≥ N (0 删)
- 不动 H1 / title / meta_description / slug
- 不删任何现有 content 段落
- 3 locale 同步 (zh/ja 跟 en 长度 80-100%)

---

## 【任务 5 步】

### 1. 读 SSoT + 选 blog (5 min)
- 读 v5 盘点 JSON (71 blog + 待修 24 + GSC 命中)
- 选 **1-3 blog 攒批** 当日修复/写新
- 选 blog 优先级:
  1. P0 极浅 (< 2500 chars) - 实际 0 个, 已无
  2. P2 中等 (2500-5000 chars) - 7 个, 优先
  3. GSC 高 imp + 3 loc 不一致 - 12 个, 次优
  4. 无 FAQ - 6 个, 备选
  5. 3 loc 不一致 - 16 个, 备选
  6. **写新 blog** (B7 选题库 22 篇 + GSC 强信号 + Tier B 行业)
- 避开: 完美 (OK+FAQ+3loc 一致) 19 个 = 已达标, 不动

### 2. 联网搜索 (20 min, 强制级 per K3 8/26 20:38 拍板 "联网搜索内容和问题与扩充最新的知识")
- 必跑 web_search **5-10 query**, 拿真实 2026 数据:
  - 市场规模 / CAGR (Statista / Smithers / IBISWorld)
  - 材质 / 价格 / 监管 (FDA / EU EFSA / 行业协会)
  - 趋势 / 竞品 (Google Trends / 行业媒体)
  - 用户痛点 (Reddit / Quora / 行业论坛 PAA)
  - 长尾关键词 (Ahrefs / SEMrush / GSC)
- 必含搜索结果中真实数据 (市场规模/材质/价格/监管) 进 content
- **不编造数据** (per K3 8/25 数据诚信红线, §0.23): 任何数字必标来源 (e.g. "per Statista 2026" / "per FDA 21 CFR" / "per Smithers 2025 report")
- 必含 2-3 张 table (材质对比/价格区间/规格表), 数据来源真实

### 3. 写深度修复脚本 (40 min)
- Python 脚本 + raw triple-quoted string + json.dump (per MEMORY.md §7 教训, 不用 Edit/Write 大段 JSON)
- 每个 blog 3 locale 同步扩写:
  - en 目标: 8000-15000 chars (10-12 H2 段 + 6-8 Q&A + 2-3 table + 答案前置 + 实体锚文本)
  - zh-hk 目标: 跟 en 80-100% 长度 + 答案前置中文
  - ja 目标: 跟 en 80-100% 长度 + 答え先出し日本語
- 必含 FAQ Q/A 模式 (markdown `**Q1: ...**` / `**Q1：...**` / `**Q1：...**` per locale 风格)
- 必含 2-3 张 markdown table (用 `| col |` 格式)
- 必含 GSC 命中 query 在 content body 多次出现 (保留关键词密度)
- 必含 entity anchor text (实体名词作 anchor, 不是 "click here" / "了解更多")
- 不动 H1 / title / meta_description / slug (GSC 命中保护)
- 不删任何现有 content 段落 (现有 8 H2 段 + 4 Q&A FAQ 全部保留)
- 仅在 content 末尾追加新 H2 段 + table (per §0.1 1 push 攒批)

### 4. 校验 + build + commit + push (20 min)
- 走 §0.17 4 步:
  1. `node scripts/check-encoding.js --fix` (UTF-8 + LF 校验)
  2. `npx tsc --noEmit` (类型校验, 如有 TS 改动)
  3. `npm run build` (本地 build, 注意 Windows fonts 网络, 可能 timeout)
  4. `git commit + git push` (1 commit + 1 push, 攒批)
- 走 §0.25 30 min 间隔: 上次 push 时间戳 + 30 min = 下次 push 最早时间
  - 例: 上次 20:35 → 下次最早 21:05
  - 例: 上次 21:05 → 下次最早 21:35
- 撞车兜底 (5/7 min 间隔): 立即停止 push + 1 段报告 K3 + 等 K3 拍板 (§0.25.2)
- 走 §0.7 production smoke 3 步:
  1. `git status -sb` (push 无 ahead)
  2. `node scripts/verify-deploy.mjs <commit>` (CF Pages build success)
  3. `curl -I` 6 URL (2 blog × 3 locale) (status 200 + body 验证新内容 + JSON-LD schema 验证)

### 5. 报告 (10 min)
- 写 `.hermes/logs/blog-deepfix-YYYY-MM-DD.md` (5 段):
  1. **当日修复 blog 清单** (slug + 选 blog 理由)
  2. **联网搜索 query 列表** (5-10 query, 数据来源 SSoT)
  3. **修复内容摘要** (每个 blog 改了几段 / 加几张 table / FAQ 几条 / chars +% / 3 locale 长度对齐 / SEO+GEO 12 要素 校验)
  4. **5 步 verify 证据** (check-encoding PASS / tsc 0 error / build PASS / push PASS / curl 200)
  5. **GSC 命中词保护校验** (修复前 GSC 命中 query 在 content body 出现次数 = N, 修复后 ≥ N, 不删)
- 升级 K3 1 段中文 (5 要素: 修了什么 / 深度证据 / GSC 保护 / 5 步 verify / 明日计划)
- 报告必含 "数据来源" 行 (§0.23 数据诚信红线)

---

## 【SOP-10 5 问门禁】(per K3 8/25 拍板, 必跑, 缺则报告作废)

任何 M3 派活 / 上报 / 报告 必跑 5 问:

1. **架构差异?** 派活前查前序任务实现路径 — `git show <commit> --stat` 看前序 blog 修复 commit (本 cron 落地后 1 周内有现成路径, 直接复用)
2. **约束适用范围?** 上报拍板前先查 K3 拍板原文 — K3 8/26 20:35 拍板"深度修复长文 + 联网搜索 + 不能破坏 GSC 词 + 8/26 20:38 升级"SEO+GEO 12 要素", 报告必含 GSC 保护证据 + 12 要素 校验
3. **原数据/拍板来源?** 不推断"无来源数字"/"MOCK 数据" — 联网搜索拿真实数据, 数字必标来源 (Statista/FDA/Smithers)
4. **字段值策略?** certNo/validUntil/issuer 全空, 不留联系方式 — 不动 blog meta_title/meta_description 字段
5. **Markdown 渲染?** user-facing 文本含 [text](url) 必须 parseInlineLinks — 新增内容无 [text](url), 但保留现有 `[/en/product/.../]` 路径引用 (这是 plain text path 不是 markdown link)

---

## 【数据诚信红线】(per K3 8/25 §0.23, 必含, 缺则报告作废)

任何报告必含"数据来源"行, baseline 必标"待/已校准":

```
数据来源:
- 联网搜索结果 (web_search, 5-10 query, 2026-08-26 20:30-20:35)
- v5 双格式盘点 (_blog_audit_v5.json, 71 blog + 24 待修)
- GSC 90 天 page+query 数据 (gsc_page_query.csv, 2026-05-28 ~ 2026-08-25)
- K3 8/26 20:35 拍板 (深度修复长文 + 联网搜索 + GSC 保护)
- K3 8/26 20:38 拍板 v1.1 升级 (17:00 触发 + SEO+GEO 12 高标准要素)
- v5 + K3 8/19 8:35 §0.21 push 不再是瓶颈
```

---

## 【§0.25 30min 间隔 push 部署】(per K3 8/26 14:35 撞墙升级拍板, 4 cron 共享, 必跑)

- 任何 push 部署 (含 cron auto / 手动 / 紧急 / amend force-push) **必 ≥ 30 min 间隔**
- 5/6/7/8/12 min 间隔 = 撞车, K3 必拍 1 次回复确认是否继续
- 撞车兜底: 立即停止 push + 1 段报告 K3 + 等 K3 拍板
- 撞车豁免 (per K3 §0.6 紧急修复例外): 线上 5xx/404 阻断 push 30 min 间隔豁免, K3 必拍 1 次回复
- **全局约束 (K3 8/26 06:30 拍板)**: 30 min 间隔 ≠ Start-Sleep 阻塞等待, 必不阻塞主进程, 立即结束当前任务, push 留给下一个 cron 周期

---

## 【§0.19 用户暂停信号】(per K3 8/9 17:56 痛骂教训, 必跑)

K3 / 用户说"暂停"/"pause"/"等指令"那一刻, 立即 `mavis cron delete <self>`, 不发 progress tag, 不 fetch / 不 read。暂停期间所有操作停手。

---

## 【§0.6 cron hygiene 6 出口】

任何 cron 监控必含 3 个 hard-coded 出口:
- (a) **TTL 过期 → 自删** (90 min, R6 自删)
- (b) **报告落盘 → 续期** (报告写完 = cron 任务闭环, 第二天 17:00 自动触发)
- (c) **静默阈值触达 → 升级 K3** (30 min 静默无进展 → 升级 K3)

---

## 【§11 主营品类约束】(per K3 8/17 战略修正, 必跑, 违反即停)

- 主营品类 5: 貼紙 / 宣傳單張 / 包裝盒 / 紙袋 / 標籤 (任何页面/文案/SEO 都可写, 是 ZprintPro 核心业务)
- 业务子类目: 贺卡 / 喜帖 / 台卡 / 酒水牌 / 感谢卡 / 名牌卡 / 邀请函 (新建 `greeting-cards` + `wedding-invitations` + `place-cards` 三个类目后, 业务子类目页面可写)
- ❌ 绝对禁词: 咭片/名片/business cards/名刺 (主营误用禁)
- 咭片/名片 业务子类目用法 = 链接到 `greeting-cards` / `wedding-invitations` / `place-cards` 类目, 主页可写
- 详见 `docs/k3-greeting-cards-strategy-2026-08-17.md`

---

## 【§13.16 双品牌宪法】(per K3 8/6 2:20 拍板, 必跑, 违反即停)

- zh-hk locale = **智印港 ZprintPro** (双语品牌, 智印港在前)
- en / ja locale = **ZprintPro** (单品牌, 智印港不出)
- ❌ 错字"智印印港"绝不写 (竞品词污染)
- ✅ 错字只在 GSC 分析中过滤 (统计用, 不进 user-facing 文案)

---

## 【硬约束总结】

1. **联网搜索强制级 5-10 query** (K3 8/26 20:38 拍板 v1.1): 写每篇 blog 前必跑 web_search 5-10 query, 拿真实 2026 数据
2. **SEO+GEO 12 要素 强制级** (K3 8/26 20:38 拍板 v1.1): SEO 6 (答案前置 / H2≥8 / Q&A≥6 / 数据≥3 / 内链≥3 / Title-Meta 优化) + GEO 6 (FAQPage JSON-LD / HowTo JSON-LD / Article schema / BreadcrumbList / 实体锚文本 / llms.txt)
3. **深度修复 ≠ 加段**: 实际加深 = content 目标 8000-15000 chars/locale, 写 10-12 H2 段 + 6-8 Q&A FAQ + 2-3 table
4. **GSC 命中词保护**: 不动 H1/title/meta/slug; 不删任何现有段落; 修复后 content body GSC 命中 query 出现次数 ≥ 修复前
5. **3 locale 同步**: zh/ja 跟 en 长度 80-100% 同步
6. **1 push/天攒批**: §0.1 攒批纪律
7. **§0.25 30 min 间隔**: 5/7 min 撞车 = K3 必拍, 30 min 间隔 ≠ Start-Sleep 阻塞
8. **§0.19 暂停信号**: 立即杀 cron
9. **§11 主营品类约束**: 咭片/名片/business cards/名刺 主营误用禁
10. **§13.16 双品牌宪法**: zh-hk = 智印港 ZprintPro / en/ja = ZprintPro / 错字"智印印港"绝不写
11. **SOP-10 5 问 + 数据诚信红线**: 任何报告必含, 缺则报告作废
12. **业务 0 改动 F0** (per K3 8/22 17:58 F0 拍板): 不删任何 SKU / 文案 / 长文本字段; 1 次修复不盲修

---

## 【完成标准】

- ✅ 当日 1-3 blog 攒批修复/写新, 1 commit + 1 push
- ✅ 每个 blog 3 locale 深度修复 (en 8000+ chars, zh/ja 80-100% 长度)
- ✅ SEO+GEO 12 要素 全必含 (缺则报告作废)
- ✅ 联网搜索 5-10 query 落地, 数据来源真实 (Statista/FDA/Smithers 等)
- ✅ GSC 命中词保护: 修复前 query 出现次数 = 修复后 query 出现次数 (0 删)
- ✅ 5 步 verify 全 PASS: check-encoding / tsc / build / push / curl 200
- ✅ 报告落盘 `.hermes/logs/blog-deepfix-YYYY-MM-DD.md` (5 段)
- ✅ 升级 K3 1 段中文 (5 要素 + 数据来源行)

---

## 【§13 主题集群模型 · Topic Cluster】(per K3 8/26 20:53 拍板 "随机 3 条内链 ≠ 主题集群", 必跑, 缺则报告作废)

### 核心原则 (per K3 8/26 20:53 拍板)

> "你说得对，互链要加，但要加对。已有的 3-4 条是随机内链，建议升级为主题集群模型：核心页 + 4 支撑页双向链接，共享 'restaurant printing' 主题权重。"

### 主题集群架构 (必跑)

每篇核心 blog 必形成以下 5 节点主题集群, **双向链接** (5 × 4 = 20 条内链, 而非随机 3 条):

```
核心页 (Pillar Page, 5000+ 字)
├── 支撑页 1: 设计 / 制作细节 (How-to 类, 2000-3000 字)
├── 支撑页 2: 材质 / 价格对比 (Comparison 类, 2000-3000 字)
├── 支撑页 3: 合规 / 监管 (Compliance 类, 2000-3000 字)
├── 支撑页 4: 案例 / 数据 (Case Study 类, 2000-3000 字)
└── 产品页: ZprintPro Custom Service (内部产品落地, 800-1500 字)
```

### 实际主题集群示例 (per K3 8/26 20:53 拍板原文)

> **核心页**: Restaurant Opening Flyer (本例 slug: `restaurant-opening-flyer-printing-guide`)
> **支撑页 1**: How to Design Restaurant Flyers (slug 待建: `how-to-design-restaurant-flyers`)
> **支撑页 2**: Best Paper Weight for Food Menus (slug 待建: `best-paper-weight-food-menus`)
> **支撑页 3**: FDA Compliant Printing Guide (slug 待建: `fda-compliant-printing-guide`)
> **支撑页 4**: Restaurant Marketing ROI Case Study (slug 待建: `restaurant-marketing-roi-case`)
> **产品页**: Custom Flyer Printing Service (现有 `/en/product/a4-flyers/`)

### 链接 SOP (per K3 拍板 "5×4=20 条双向链接")

每篇核心 blog 必在 content body 中:
- **核心页 → 4 支撑页** (4 条 outbound)
- **核心页 → 1 产品页** (1 条 outbound)
- 4 支撑页 + 1 产品页 必含 **回链** 到核心页 (5 条 inbound)
- **总计 10 条** 主题集群内链, 全部共享 "restaurant printing" / "印刷" 主题锚文本

### 锚文本规范 (per SEO+GEO §11 实体锚文本)

- ❌ 禁用: "click here" / "了解更多" / "read more" / "こちらをクリック"
- ✅ 必用: 实体名词 + 主题, e.g. "[PDF/X-1a 印刷檔案規格](link)" / "[FDA 21 CFR 176.170 認證](link)" / "[157gsm 雙粉紙材質對比](link)"

### 主题集群选择优先级

1. **GSC 高 imp 核心页** (per GSC 90 天数据, 优先 top 12 imp 高的 blog)
2. **3 locale 已有 blog 集群** (优先 zh-hk/en/ja 都有的 blog, 3 locale 同步建集群)
3. **B7 选题库 22 篇** (per K3 8/26 04:50 v2 预批, 4 cron 共享)
4. **写入时**: 1 核心页 = 4 支撑页 + 1 产品页, 5 篇 blog 攒 1 push (per §0.1)

---

## 【§14 外链 SOP · Backlink SOP】(per K3 8/26 20:53 拍板 "GEO 命门 = 外部权威信号", 必跑, 缺则报告作废)

### 核心原则 (per K3 8/26 20:53 拍板原文)

> "12 要素里没有这一项，但 Google E-E-A-T 和 AI Overview 都重度依赖外部权威引用。建议补一条 cron 规则：每篇 blog 发布后 7 天内，至少获得 1 条来自行业目录/本地商会/设计博客的自然外链或品牌提及。"

### 外链 5 类别 (优先级排序)

| 类别 | 优先级 | 来源类型 | 数量目标 (每 blog 7 天内) |
|------|--------|----------|--------------------------|
| 1. 行业目录 (Industry Directory) | P0 | ThomasNet / Kompass / Alibaba 行业目录 | ≥1 |
| 2. 本地商会 (Local Chamber) | P1 | 香港工业贸易署 / 深圳印刷协会 / LocalBusiness Chamber | ≥1 |
| 3. 设计博客 (Design Blog) | P1 | Canva Design Blog / Adobe Blog / Print Magazine | ≥1 |
| 4. Reddit / Quora 自然提及 | P2 | r/printing / r/smallbusiness / Quora 回答 | ≥1 |
| 5. 合作伙伴 (Partner Cross-link) | P3 | 同行业非竞品 (互不竞争) 网站 | ≥1 |

### 外链 cron SOP (M3 自动执行)

每篇 blog commit + push 后, M3 **7 天内**必做:
1. **联网搜索 query 模板** (web_search 3-5 query):
   - `"<blog topic>" site:reddit.com`
   - `"<blog topic>" site:quora.com`
   - `"<blog topic>" printing industry directory`
   - `"<blog topic>" design blog mention`
2. **Reddit / Quora 找相关讨论** (per GSC 命中 query 反查)
3. **Natural mention** (不是 spam): 在真实相关讨论中提及 + 简短引用 + 链接
4. **行业目录提交**: 1 个目录 (ThomasNet / Kompass / 行业协会)
5. **跟踪**: 报告 1 周内获得的外链数 / 提及数

### 外链质量分 (SOP-2 二元化阈值, per K3 v3 增补)

- **DR 70+ (Domain Rating) = 高质量外链** (1 条 = 5 条普通外链价值)
- **DR 30-69 = 中质量** (1 条 = 1 条)
- **DR 0-29 = 低质量** (不计入)
- **Spammy / PBN = 负分** (必拒, K3 必拍 1 次回复确认)

### M3 报告必含 (per §0.23 数据诚信红线)

每篇 blog 修复报告必含:
- 修复后 7 天外链数 (实际统计, 不是估算)
- 修复后 14 天 GSC 数据 (impressions / clicks / CTR)
- 修复后 28 天 GSC 趋势 (impression 涨 vs click 涨 = 标题问题; 都不涨 = 外链/主题权重问题)

---

## 【§15 跨语言互链 · Cross-locale Internal Linking】(per K3 8/26 20:53 拍板 "3 locale 不再独立", 必跑, 缺则报告作废)

### 核心原则 (per K3 8/26 20:53 拍板)

> "你提到 3 locale 各自独立, 缺 hreflang + 跨语言内容呼应. 需 3 locale 互链 + hreflang 标准化."

### hreflang SOP (必跑)

每篇 blog 必含:
- **Hreflang 8 locale map** (per v3 增补 §13.15: zh-hant-HK / en / ja-JP + x-default=zh-hk + 5 个其他 locale)
- **canonical URL** (per locale, 指向该 locale 版本)
- **OG locale alternate** (Open Graph og:locale:alternate)

### 跨语言内容呼应 SOP (必跑)

3 locale 必同步:
- **主题集群页 zh-hk + en + ja 3 版本同时发布** (不先发 1 locale 再补)
- **主题锚文本 跨语言互链**:
  - zh-hk 页 → en 对应页 (1 条 outbound) + ja 对应页 (1 条 outbound)
  - en 页 → zh-hk 对应页 + ja 对应页
  - ja 页 → zh-hk 对应页 + en 对应页
  - **总计 6 条 跨语言互链** (3 locale × 2 outbound)
- **canonical 不指向** 跨语言 (各 locale 自指, 避免被 GSC 视为重复内容)

### 跨语言 SOP 强制级

- ❌ 禁用: 1 locale 单独发, 后补其他 2 locale (GSC 视为重复内容, 排名下降)
- ✅ 必用: 3 locale 同时 push (1 commit + 1 push 包含 3 locale JSON)

---

## 【§16 用户信号反馈闭环 · User Signals Loop】(per K3 8/26 20:53 拍板 "静态检查 ≠ 真实效果", 必跑, 缺则报告作废)

### 核心原则 (per K3 8/26 20:53 拍板)

> "12 要素是静态检查，无法验证真实效果. 需 14 天回看 GSC, 校正下轮."

### 反馈指标 (SOP-2 二元化阈值)

| 指标 | 阈值 (达标) | 数据源 |
|------|-------------|--------|
| Impressions 涨 | ≥ +20% (修复前 7 天 vs 修复后 7 天) | GSC 90 天 page+query |
| Clicks 涨 | ≥ +20% (同上) | GSC 90 天 page+query |
| CTR 涨 | ≥ +0.5pp (绝对值, 修复前 vs 后) | GSC 90 天 page+query |
| Avg Position 涨 | ≤ -2 位 (修复前 vs 后, 数字小 = 排名靠前) | GSC 90 天 page+query |
| 跳出率降 | ≤ -5pp (per Plausible / GA4) | Plausible Analytics |
| 停留时间涨 | ≥ +30s (per Plausible / GA4) | Plausible Analytics |

### 反馈循环 SOP (M3 自动跑, 每月 1 次)

1. **修复后 14 天回看** (M3 自动 cron: 每月 1 号 14:00, per `zprintpro-monthly-matrix-audit`)
2. **对比修复前 7 天 vs 修复后 7 天 GSC 数据**
3. **判定** (SOP-2 二元化):
   - ✅ 全部指标达标 → "成功, 推广此模板到下批 blog"
   - ⚠️ 部分指标达标 → "优化 1-2 项, 下批 retry"
   - ❌ 全部未达标 → "12 要素到顶, 但 GSC 排名问题, 升级 K3 拍板外链 SOP 是否升级"
4. **升级 K3**: 1 段报告, 含 6 指标实际值 + 判定 + 下批策略

---

## 【§17 竞品对标 · Competitor Benchmarking】(per K3 8/26 20:53 拍板 "合规≠胜出", 可选, 必跑 if 9/1 前)

### 核心原则 (per K3 8/26 20:53 拍板)

> "不知道对手用什么结构，合规≠胜出. 联网搜索 Top 3 竞品结构, 提炼差异化."

### 竞品对标 SOP

每月 1 次, 9/1 验收:
1. **联网搜索 Top 3 竞品** (per niche):
   - 例: restaurant-opening-flyer → 搜 "restaurant flyer printing guide" top 3 organic 排名
   - 例: pet-food-sticker → 搜 "pet food label requirements 2026" top 3
2. **结构对比** (M3 写):
   - 竞品 1-3 段数 / FAQ 数 / 数据点数 / 内链数 / 外链数 / schema 类型
   - zprintpro 对比 同上
3. **差异化提炼** (M3 写):
   - zprintpro 比竞品多什么 (差异化优势)
   - zprintpro 比竞品少什么 (gap, 必补)
4. **升级 K3**: 1 段报告, 含 3 竞品结构 + 差异化建议

### 竞品范围 (v1.2 暂定)

- **en locale**: PrintPlace / Vistaprint / GotPrint / MOO / 48HourPrint
- **zh-hk locale**: 印刷通 / e-print / 彩印通 / 香港印刷业网
- **ja locale**: 印刷のネット / プリントネット / 印刷通販

---

## 【启动后立即读 5 SSoT】

启动后 30 秒内必读 5 SSoT (优先级顺序, 见顶部), 然后按 5 步主任务流程开干。
