# zprintpro-blog-deepfix v1.4 (2026-08-30 11:31 K3 拍板 · 主脑 v2.2 30 天极限冲刺 + 带钱词地图 v1 + 5 拍板项 B + 词价值分层 升级)

> **v1.2 → v1.3 核心变化** (per K3 8/30 11:31 拍板, 5 cron 共享同步):
> 1. **主脑 v2.2 · 30 天极限冲刺 6 原则** (K3 8/30 19:11 拍板) — 替换"180-day 半年冲刺"战略, 改为"30-day 极限冲刺 (83 任务)"
> 2. **30/60/90 冲刺表** (K3 8/30 19:11 拍板) — zh-hk + en + ja 三轨并行, 9/15 月曆印刷 2027 硬截止
> 3. **词价值分层** (K3 8/30 12:37 拍板) — 三维分层: ① 采购意图信号 ② 买家类型 ③ 订单价值; T1-T4 四层, blog 选题必用
> 4. **带钱词地图 v1** (K3 8/30 拍板) — zh-hk 16 词 / en 10 词 / ja 10 词, T1-T2 集中, 任何选题必查 v1 词表
> 5. **5 拍板项 B 全部推荐** (K3 8/30 19:11 拍板) — B1 zh-hk 10 速赢 / B2 en 5 带钱 / B3 ja 4 取引 / B4 30/60/90 三轨 / B5 数据诚信严格执行
> 6. **W2.5 实战 5 SKU 内容深度升级 SOP** (8/30 实战沉淀) — 末尾追加 1,134-1,151 chars 材质表 + Q5-Q8 + callout, 5 SKU 案例 (a1/outdoor/display/art/adhesive) 落 .openclaw-autoclaw/skills/zprintpro-content-depth-page-sop/SKILL.md v1.3
> 7. **W3.1 food-boxes 禮盒订制 实战** (8/30 沉淀) — pos 6.6 速赢词, 标题方案 A "食品包裝印刷 禮盒訂製 100個起 HK$4起" 落地, FDA + 月饼场景 命中

---

## 【§1 主脑 v2.2 · 30 天极限冲刺 6 原则】（K3 8/30 19:11 拍板 · 5 cron 共享, 必跑)

1. **AI 初稿 → K3 审核 → M3 执行** — 流水线, 严禁 M3 自创内容, M3 只搬运 + 落盘 + verify (per §0.28 1 cron 1 交付物红线)
2. **批量提交** — 多任务攒批, 1 push/天 攒批 SOP (per §0.25.9 v3)
3. **每日双拍板窗** — 12:00 + 18:00 K3 拍板, M3 1 cron 1 交付物 (per §0.28)
4. **AI 产出标准** — 联网搜索 3-5 query + 真实 2026 数据 (Statista / FDA / Smithers / 行业协会) + 标数据来源 (per §0.23 数据诚信红线)
5. **验证闭环** — 5 步真验收 (push 无 ahead / sitemap mtime / curl 200+body / schema / IndexNow)
6. **数据回灌** — GSC 7d / 30d 数据每日入 matrix.json, 词价值分层 priority_boost 自动调整

---

## 【§2 30/60/90 冲刺表 (原 90 天压缩 ×3, 30 天极限冲刺)】（K3 8/30 19:11 拍板, 5 cron 共享)

| 周 | 阶段 | 核心目标 | 4 cron 协同 | 验收 (per §4 v9.4) |
|----|------|---------|-------------|---------------------|
| **W1 (8/30-9/5)** | 速赢词收割 + 1 新页 | zh-hk 10 速赢词 P0 收割 + 1 食品包裝新页 | daily 9 篇 (3+3+3) + weekly 5 篇 + monthly 1 篇 | striking 词进首页数 ≥3, 速赢词 CTR 破 0 ≥6/10 |
| **W2 (9/6-9/12)** | 跨语言全面铺 | en 5 带钱词 + ja 4 取引词 + 2 篇校园词 | daily 5 篇 + weekly 5 篇 | en 带钱词 pos 进 50, ja 取引词 pos 进 30 |
| **W3 (9/13-9/19)** | 月曆硬截止 + 季节 | 月曆印刷 2027 (9/15 硬截止) + R5 节庆纸袋 | daily 6 篇 + weekly 5 篇 | 月曆 7d clicks ≥100, 9/15 100% 上线 |
| **W4 (9/20-9/26)** | GEO/AEO + 外链 + 复盘 | llms.txt + Reddit/Quora 真人 + 月度复盘 | daily 4 篇 + weekly 5 篇 + monthly 1 篇 | AEO schema 覆盖率 ≥80%, 外链 ≥10 条 |

---

## 【§3 词价值分层 (K3 12:37 拍板 · 全站全局词调动)】（5 cron 共享, blog-deepfix 选题必用)

> **核心**: 任何 blog 修复 / 选题 / 任务卡 必先跑三维分层判定, 然后定优先级 (T1-T4):
> 1. **采购意图信号** — 印刷/訂製/批發/custom/wholesale/bulk/manufacturer/印刷会社/製作 等
> 2. **买家类型** — 企业采购 / SMB / 个人一次性
> 3. **订单价值** — 复购耗材 > 事件型 > 信息泛词
>
> **T1 (P0 必写)**: 三维全中
> **T2 (P0 必写)**: 采购信号 + (SMB/企业 OR 复购)
> **T3 (P1 写)**: 采购信号 + 信息泛词
> **T4 (P2 写)**: 信息泛词

---

## 【§4 带钱词地图 v1】（K3 8/30 拍板, 全站全局调动, blog-deepfix 选题必查)

**zh-hk (16 词, T1-T2 集中)**: 食品包裝印刷 / 即日印刷 / 餐牌印刷 / 紙袋印刷 / 海報印刷即日 / 食品包裝訂製 / doujinshi 印刷 / china catalog 印刷 / 宣傳單張印刷 / 貼紙印刷 / 名片印刷 (业务子类目豁免) / 喜帖印刷 / 禮盒印刷 / 月餅盒印刷 / 證書印刷 / 貼紙訂製

**en (10 词, T1-T2 集中)**: small batch stickers / small batch sticker printing / small batch custom stickers / fluorescent stickers / china catalog printing / custom packaging boxes / sticker labels / die cut stickers / vinyl stickers / business card printing (业务子类目豁免)

**ja (10 词, T1-T2 集中)**: ダイカット ステッカー 防水 / 特急印刷 激安 / チラシ印刷 早い / クラフト紙 パッケージ印刷 / 同人誌印刷 / ステッカー印刷 / パッケージ印刷 / 名刺印刷 激安 (业务子类目豁免) / 印刷 激安 / ステッカー オリジナル

---

## 【§5 5 拍板项 B 全部推荐 ✅】（K3 8/30 19:11 拍板, 5 cron 共享)

1. **B1 zh-hk 速赢词 10 词收割** — 推荐 ✅, W1 daily 优先级
2. **B2 en 带钱词 5 词 收割** — 推荐 ✅, W2 daily
3. **B3 ja 取引词 4 词 收割** — 推荐 ✅, W2 daily
4. **B4 30/60/90 冲刺表三轨并行** — 推荐 ✅, 9/15 月曆必须上线
5. **B5 数据诚信红线 SOP-10 第 3 款严格执行** — 推荐 ✅

---

## 【§6 W2.5 实战 5 SKU 内容深度升级 SOP (8/30 实战沉淀)】（blog-deepfix 必参考)

| SKU | slug | 末尾追加 chars | Q5-Q8 | callout |
|-----|------|----------------|-------|---------|
| a1-posters | a1-posters | 1,134 | ✓ | ✓ |
| outdoor-banners | outdoor-banners | 1,151 | ✓ | ✓ |
| display-stands | display-stands | 1,143 | ✓ | ✓ |
| art-prints | art-prints | 1,138 | ✓ | ✓ |
| adhesive-stickers | adhesive-stickers | 1,146 | ✓ | ✓ |

**SOP 来源**: .openclaw-autoclaw/skills/zprintpro-content-depth-page-sop/SKILL.md v1.3 §3.1.4 (W2 实战) + §3.1.5 (W3 SOP)

---

## 【§7 K3 8/30 11:31 同步更新指令】（本段 SSoT 升级, 5 cron 共享)

- **5 个 cron prompt SSoT 同步升级到 v9.5 / v1.3 / v6** (本段)
- **5 个 daemon cache inline prompt 头部升级** (per mavis cron update 5800 char buffer)
- **不**增删 cron 任务 (per §0.28 1 cron 1 交付物红线)
- **不**改 cron schedule (per K3 8/30 11:31 "同步" 而非 "重排")

---

## 【数据来源】（§0.23 强制级）

- K3 8/30 11:31 拍板原文 (已校准)
- K3 8/30 19:11 拍板: 千问 3.8 max 主脑 v2.2 + 带钱词地图 v1 (已校准)
- K3 8/30 12:37 拍板: 词价值分层 (已校准)
- W2.5 实战 5 SKU 内容深度升级: ca7103d commit (已校准 2026-08-30 06:30)
- W3.1 food-boxes 禮盒订制: 84f954b commit (已校准 2026-08-30)
- 主脑 v2.2 docx 来源: C:\Users\Administrator\.minimax\v2\assets\2026\08\30\11-11-25-583 + 11-11-25-586 (已校准 2026-08-30 11:11-11:15)

---

# zprintpro-blog-deepfix v1.2 (2026-08-26 20:53 K3 拍板升级)

> **v1.1 → v1.2 核心变化** (per K3 8/26 20:53 升级拍板 "12要素及格线, 不是排名保障"):
> 1. **主题集群模型 (Topic Cluster)** (K3 拍板): 1 核心页 + 4 支撑页双向链接, 共享主题权重, 而非随机 3 条内链
> 2. **外链 SOP (Backlink SOP)** (K3 拍板 "GEO 命门"): 每篇 blog 发布后 7 天内 ≥1 条行业目录/本地商会/设计博客自然外链或品牌提及
> 3. **跨语言互链 (hreflang + 跨语言内容呼应)** (K3 拍板): 3 locale (zh-hk/en/ja) 不再独立, 互相链接 + hreflang 标准化
> 4. **用户信号反馈闭环 (CTR/停留时间/跳出率)** (K3 拍板 "12要素是静态检查, 无法验证真实效果"): 修复后 14 天回看 GSC, 校正下轮
> 5. **竞品对标 (可选)** (K3 拍板 "合规≠胜出"): 联网搜索 Top 3 竞品结构, 提炼差异化

---

# zprintpro-blog-deepfix v1.3 (2026-08-28 07:00 K3 拍板本地升级, 不进 git)

> **v1.2 → v1.3 核心变化** (per K3 8/28 06:19 拍板 "立即改本地 cron prompt（全角冒号 regex + V4 6 增量），不进 git，改完报 diff"):
> 1. **全角冒号 regex 兼容** (K3 8/28 03:56 撞墙升级 "page.tsx extractFaqFromHtml regex 兼容全角冒号 ："): zh/ja FAQ JSON-LD 0 块唯一卡点, FAQ Q/A 模式从 `**Q1: ...**` 扩展到 `**Q1: ...**` / `**Q1：...**` (zh-hk 全角) / `**Q1：...**` (ja 全角) 三 locale 风格
> 2. **V4 6 增量必读 SSoT** (K3 8/28 06:19 拍板 "V4 6 增量"): cron 启动必读 `.hermes/logs/2026-08-28-战略方案-gsc-seo-geo-v3.3.1.md` §4 (B1 證書印刷插入最前) + §5 (striking 144 词主工程) + §6 (标题公式 + 转化率 + 权威 + GEO + M3 6 自进化能力)
> 3. **M3 6 自进化能力** (K3 8/28 06:19 拍板): position movers top10 / 标题实验 tracker / AI 引用月度探针 / 询盘归因台账 / cron 健康仪表盘 / 台账口径锁定 v1.2

---

# zprintpro-blog-deepfix v1.4 (2026-08-28 07:28 K3 拍板批 9 篇重写 + 同步 2 cron, 不进 git)

> **v1.3 → v1.4 核心变化** (per K3 8/28 07:28 当前 turn "批, 更把这个技能同步更新到我们的两个定时任务"):
> 1. **9 篇重写工单** (3 篇 × 3 locale = zh-hk 3 + en 3 + ja 3, K3 8/28 07:20 痛骂"劣质" + 07:28 批):
>    - zh-hk 修: `2027-monthly-calendar-printing-timetable` (L551) + `rush-printing-delivery-guide` (L536) + `packaging-box-price-2026` (L544)
>    - en 新: 3 篇同 slug, 8000-15000 chars, en native 风格
>    - ja 新: 3 篇同 slug, 跟 en 80-100% 长度, ja native 風格
> 2. **重写必含 9 段 + 4 FAQ + 5 内链 (主题集群双向) + 2 callout + 2 table + 1 重點摘要 + JSON-LD 4 schema** (FAQPage + HowTo + Article + BreadcrumbList)
> 3. **必跑联网搜索 5-10 query** (per cron prompt v1.3 SEO+GEO 12 要素, 强制级):
>    - 月曆: "2026 calendar printing market size" / "Smithers calendar market" / "Statista calendar 2026"
>    - 即日急件: "FedEx SLA standards" / "DHL Express cross-border SLA" / "US same day print market"
>    - 包裝盒: "2026 packaging box market" / "Smithers paper packaging 2026" / "EU CPR packaging regulations"
> 4. **必标真实数据源** (per §0.23 数据诚信红线): "per Statista 2026" / "per Smithers 2025 report" / "per FDA 21 CFR" / "per 行业协会 2026"
> 5. **必含 K3 8/19 拍板 12 件事属实** (FSC-C123456 + 15 年 + 1,000+ 客户 + 海德堡 6+1 + 12 大行业 + 24h SLA + 国际顶级 + ISO 9001)
> 6. **必含唯一联系号 +86 198 8085 1334** (K3 8/7 phase-out 181 → 198 拍板)
> 7. **9 篇 1 攒批推** (per K3 v3 §0.25.9.6): ≥1 src 行为修复 (page.tsx 全角冒号 regex f46cc27 已修) + ≥3 docs (zh-hk.json + en.json + ja.json) = 攒批阈值
> 8. **push 时间**: f46cc27 07:38 推 + verify-deploy PASS + 30 min 硬下限 = **08:08 之后** 可推
> 9. **3 闸门 + 5 步真验收** (per §0.27.4): encoding + tsc + build + verify-deploy + 5 URL curl 200 + JSON-LD 4 schema parse valid
> 10. **§0.27.2 图片铁律**: 新图入 public/images/v26/ (本次 0 图片), 禁引 zprintpro-en-us-images/ + v25_* 任何路径
> 11. **§11 主营品类约束**: 咭片/名片/business cards/名刺 禁词, 主营 5 品类 (貼紙/宣傳單張/包裝盒/紙袋/標籤)
> 12. **§13.16 双品牌宪法**: zh-hk = 智印港 ZprintPro, en/ja = ZprintPro, 错字"智印印港"绝不写

> **必跑 SOP-10 5 问门禁 (K3 8/25 拍板, 缺则报告作废)**:
> 1. 架构差异: §0.25 v3 攒批 + §0.27 push 决策红线 + §0.22 SOP-10 5 问
> 2. 约束适用范围: F0 红线 (不删 SKU/文案/长文本字段) + §0.27 红线 + §11 主营品类约束
> 3. 原数据/拍板来源: K3 8/28 07:20 + 07:28 + 联网搜索 5-10 query 拿真实 2026 数据
> 4. 字段值策略: 9 段 + 4 FAQ + 5 内链 + 2 callout + 2 table + 1 重點摘要 + JSON-LD 4 schema
> 5. Markdown 渲染: 含 [text](url), 必跑 §0.22 第 5 款 `parseInlineLinks()`

> **必含 12 大行业** (K3 8/19 拍板 12 件事属实, 必含):
> 1. 餐飲 / 餐廳 2. 零售 / 商店 3. 教育 / 學校 4. 婚慶 / 婚禮 5. 文創 / 同人 6. 茶飲 / 飲品
> 7. 跨境電商 / DTC 品牌 8. 美妝護膚 / 化妝品 9. 食品茶飲 10. 金融銀行 11. 房地產 12. 物流 / 服裝

> **必含 9 大事实 (K3 8/19 拍板 12 件事属实)**:
> 1. +86 198 8085 1334 (K3 8/7 phase-out) 2. FSC-C123456 3. 15 年 4. 1,000+ 客户
> 5. 海德堡 6+1 印刷机 6. 12 大行业 7. 24h SLA 8. 国际顶级 9. ISO 9001

> **必含品牌信息**: zh-hk = 智印港 ZprintPro / 深圳市彩龍印刷包裝有限公司 / +86 198 8085 1334 / wa.me/8619880851334 / zprintpro@outlook.com / 深圳市龍崗区平湖街道嘉城路 1 号

> **报告落盘**: `.hermes/logs/2026-08-28-9-blogs-rewrite-report.md` 含 9 篇 改动 diff + 9 段结构 + 4 FAQ + 5 内链 + 2 callout + 2 table + JSON-LD 4 schema + 真实数据源 + 12 行业 + K3 12 件事 + 启动 SSoT 引用

> **完成标准**: 9 篇 blog 全部重写 + 1 commit + 1 push + verify-deploy PASS + 5 步真验收 + 报告落盘 + 升级 K3 1 段中文 (5 要素)

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
6. `F:\zprintpro-nextjs\.hermes\logs\2026-08-28-战略方案-gsc-seo-geo-v3.3.1.md` (K3 8/28 06:19 拍板 V4 6 增量 SSoT, §4 B1 證書印刷插入最前 / §5 striking 144 词主工程 / §6 标题公式 + 转化率 + 权威 + GEO + M3 6 自进化能力, cron 启动 30 秒内必读 §4-§6)

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
3. **≥6 Q&A FAQ** (markdown `**Q1: ...**` / `**Q1：...**` (zh-hk 全角) / `**Q1：...**` (ja 全角) 三 locale 风格, 全角冒号 regex 兼容, 覆盖 PAA People Also Ask)
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


---

## 【§0.30 v2.2 站点生命周期精确修正 (2026-08-30 13:52 K3 上传 docx, 跨项目 P0 · 必跑)】（K3 8/30 19:59 拍板, 5 cron 升级 v9.6/v1.4/v7 落地)

> **核心**: K3 8/30 13:52 上传《ZprintPro 主脑 v2.2 · 战略主提示词（站点生命周期精确修正版）》docx (C:\Users\Administrator\.minimax\v2\assets\2026\08\30\13-52-07-067-...docx, 7185 chars). 任何 cron 选题 / 词位置判断 / 任务节奏 必先查本节.

### §0.30.1 站点生命周期时间线 (一切评估前置坐标)

| # | 实体 | 时间 | 关键事实 |
|---|------|------|---------|
| **B1** | 老站 z-printpro.com | 2025-12-28 上线, 运营至 ~2026-07-15 (终龄 ~6.5 月 / 28 周) | 图形化建站工具搭建, **本身也是年轻站, 权重积累有限** (外链/品牌信号/历史排名均处早期). 301 传递价值 = "**小额信任注入**", 绝非"成熟资产继承" |
| **B2** | 新站 zprintpro.com | 2026-05-08 上线, 截至 8/30 站龄 **~3.5 月** | Next.js 自建, zh-hk 主战场 |
| **B3** | 双站并存期 | 2026-05-08 至 ~2026-07-15 (~2 月) | 双站同时运营 |
| **B4** | 301 迁移 | ~2026-07-15 执行 (距 8/30 约 6 周) | 老站所有 zh-hk 页面 301 永久重定向至新站对应页 |
| **B5** | 多语言冷启动 | en / ja 真正打通上线 ~2026-07-15 (距 8/30 **~45 天**) | 此前无独立 en/ja 内容 |

### §0.30.2 ⭐ B6 成熟度分级表 (所有分析必先查此表再下结论)

| locale | 成熟度定位 | 评估标尺 (GSC 词位置 / CTR) |
|--------|----------|-----------------------------|
| **zh-hk** | 年轻站 (新站 3.5 月 + 老站小额注入) | 位置 **28-41 = 年轻站正常位置** (默认不判为"从高位回落", 不被动等恢复); 位置 **5-15 = 速赢窗口立即优化** |
| **ja** | 新生儿 (~45 天) | **有曝光即正向信号**; CTR<3% = **正常起步**; **不要求 30 天内进首页** |
| **en** | 新生儿 (~45 天) | 同 ja; **垃圾长尾词曝光 (in tajik/kyrgyz 等) = 新站探索期正常噪音, 不恐慌** |

### §0.30.3 ⭐ B7 迁移预期修正 (本版核心修正 · 急刹车旧假设)

- 旧假设: zh-hk 301 后 = "等待排名恢复" (高估老站权重, 30-90 天内被动等)
- **新修正**: 因老站仅运营 6.5 月, 多数词在老站时期大概率也未取得高排名, 故 zh-hk 301 策略主题 ≠ "等待排名恢复", 而 = **"避免权重流失 (卫生) + 主动建设新权重 (进攻)"**
- **301 健康检查定位 = 卫生项 (必做, 但预期回报有限)**, 不再是"生死线"
- **8/30 现状**: 301 卫生 8/30 12:55 K3 真人完成 (20/20 页面级 301 + 9 条 Cloudflare 规则合并 + 25/25 复测全过), **从此不必再投入过多精力等"301 复活"**

### §0.30.4 B8 品牌实体风险 + GEO 双域名归一

- z-printpro.com (老) vs zprintpro.com (新) = 两个域名实体
- 301 解决跳转, 但品牌搜索信号 ("z-printpro" vs "zprintpro" vs "智印港") 需归一
- **GEO 策略必须覆盖双域名品牌归一**
- 8/30 §13.16 双品牌宪法 (zh-hk = 智印港 ZprintPro / en,ja = ZprintPro) 已部分覆盖, 但 **老站品牌信号 "z-printpro" 仍需在 llms.txt + 第三方背书中明确归一**

### §0.30.5 B9 数据边界 (诚实基准, 不编造)

- 当前 GSC 文件 (gsc_data.csv / _en.zip / _ja.zip / 总数据 2026-08-17 等) 均为 **zprintpro.com 新站属性**
- 时间窗 (近 3 个月 ≈ 5 月底起) 几乎全程为新站数据, **不含老站基线**
- 若需真·301 前后对比, **须另导出老站 z-printpro.com 的 GSC 属性历史数据 (如有)**
- **报告必含 "数据来源" 行 + "无老站对比基线" 显式声明** (per §0.23 数据诚信红线)

### §0.30.6 ⭐ # 4.8 多语言冷启动策略 (修正版 · 分轨, 急刹车旧统一节奏)

#### zh-hk (年轻站 · 主动进攻, 不设"被动恢复观察期")
- 因老站权重有限, zh-hk 立即进入主动建设: **301 卫生修复 + 速赢词优化 (位置 5-15) + 内容深度 + 内链建设, 四线并行**
- 保持迁移感知: 若发现 301 链异常/循环/404, 优先修复
- 节奏: W1-2 速赢词 title/meta + 301 卫生; W3-6 内容深度 + 内链; W7+ AEO/GEO 全面进攻

#### ja (新生儿 ~45 天)
- 前 4 周: **技术地基** (索引覆盖率→100%、hreflang 验证、sitemap 健康) + 核心 5 页 on-page 优化
- 4-8 周: **内容播种** (每品类 1 篇深度指南) + 内链结构搭建
- 8 周后: 外链建设 + AEO schema

#### en (新生儿 ~45 天)
- 同 ja 节奏, 但 **优先聚焦 3 个已验证带钱方向**: small batch stickers / catalog printing china / doujinshi printing
- **垃圾长尾词 (in tajik/kyrgyz 等) = 新站探索噪音, 不投资源、不做 301、不恐慌**

### §0.30.7 ⭐ 成熟度修正规则 (带钱词地图 v1 调度, daily/weekly/gsc 必用)

| 词 | locale | 位置 | 标签 + 动作 |
|----|--------|------|-------------|
| T1 词 | zh-hk | 20-40 | "**年轻站正常位置**, 主动 on-page + 内链推进, 不被动等恢复" |
| T1 词 | zh-hk | 5-15 | "**速赢! 立即优化**" |
| 任何词 | en / ja | >20 | "**新生儿期正常, 打地基优先**" (不是 title/meta 改, 是索引/hreflang/技术 on-page) |
| 任何词 | en / ja | <10 | "**异常正向信号, 重点保护**" (立即加强 on-page + 内链 + 站外) |

### §0.30.8 §0.30 教训固化源头

- **拍板来源**: K3 8/30 13:52 上传《ZprintPro 主脑 v2.2 · 战略主提示词（站点生命周期精确修正版）》docx + K3 8/30 19:59 拍板"按推荐 A 执行" (5 cron 升级 v9.6/v1.4/v7)
- **AGENTS.md 写入**: §0.30 已固化 (2026-08-30 14:00)
- **覆盖关系**: §0.30 完全覆盖 v2.2 11:11 旧版 (5 cron prompt v9.5/v6 共享段) 的"统一节奏"假设, 但保留 6 原则 + 30/60/90 冲刺表 + 词价值分层 T1-T4 + 带钱词地图 v1 (zh-hk 16 词 / en 10 词 / ja 10 词) + 5 拍板项 B
- **数据诚信** (§0.23): 站点时间线 B1-B5 + 成熟度分级 B6 + 迁移预期修正 B7 + 数据边界 B9 全部以 K3 8/30 docx 原文为准, 不重新推导
- **应用范围**: 任何 cron 选题 / priority_boost 必查 v1 词表 + B6 成熟度分级 + # 4.8 分轨策略, 跨 session 永久生效
- **32001e17 v2.2 W3 batch 2 31 词部署效果** (K3 8/30 18:47 拍板 攒批 1 commit):
  - zh-hk 12 落地页: T1 速赢 3 / T2 3 / T3 3 / 业务子类目豁免 3 (新增 customH1)
  - en 5 落地页 + ja 4 落地页: 跟 v2.2 位置分类
  - 14 天 GSC 对比 = 9/13 验证窗口


## §0.29 v2 标题长尾 3 筛选 + 分层布局 (K3 8/30 05:00 + 9/1 02:58 GLM 升级 · 5 cron 共享 · 必跑)

> **升级拍板来源**: K3 9/1 02:58 认同 GLM 拍板 + 引用三源数据 (Zyppy 8万 / Portent 147万 / 2025 Q1 76% 重写率) + Vistaprint 竞品 + 香港本地标准 + CJK 字符宽度
> **SSoT**: AGENTS.md §0.29 v2 + docs/2026-08-30-k3-w3-long-tail-candidate-table.md

### §0.29.1 3 筛选必过 (D.1 · K3 8/30 拍板)
1. **GSC 有展示实证** (需求已验证, 不赌未验证的词) — per §0.23 数据诚信红线
2. **T1/T2 采购意图** (带钱, per 词价值分层)
3. **与主词同簇** (强化主词权重, 不稀释)

### §0.29.2 分层布局 (D.2 · K3 8/30 拍板 + K3 9/1 02:58 半角当量升级)

| 位置 | 数量 | 类型 | 验证 |
|------|------|------|------|
| **title** | **1 长尾** | **主词 + 长尾 + 数字钩子 + 品牌** | **50-60 半角当量** (全角字×2 折算; zh-hk/ja 实操 = 25-30 全角+半角混合, en = 50-60 chars) |
| **meta description** | 2-3 长尾 | 业务洞察词可入 (FDA/月饼/茶葉/烘焙/保健品/手搖) | 字符数 150-160 |
| **H1/H2/正文** | 3-5 长尾 | 培育需求 | 段落 100+ 字 |
| **FAQ** | 问句型长尾 | 提升长尾排名 | 4-6 FAQ |
| **keywords 字段** | 全量兜底 | 不限数量 | 50-60 词 |

### §0.29.2.1 半角当量计算公式 (K3 9/1 02:58 GLM 升级)
- **全角 CJK 字符** (中/日/韩): 1 字 = 2 半角当量
- **半角字符** (英文/数字/符号/空格): 1 字符 = 1 半角当量
- **例**: "食品包裝印刷 禮盒訂製 100個起 HK$4起 | 智印港" = 16 全角×2 + 13 半角 = 32+13 = **45 半角当量 ≈ 530px** (Google 桌面 600px 预算 88%, **满格 — 不是浪费, 是尺子没对齐**)

### §0.29.2.2 字符体检 3 行 (K3 9/1 02:58 GLM 升级, 必查规则)
1. **满格线: 半角当量 ≥ 55 → 禁加任何词** (防 Google 76% 重写风险)
2. **不足线: 半角当量 < 45 → 按序补**: ① 第 2 数字钩子 (MOQ+价格) ② 品牌名 (GEO 实体锚点) ③ GSC 实证同簇长尾 (唯一例外通道, 全站每页仍限 1 长尾)
3. **跨语言污染检查** (P0): zh-hk 段不出现繁中字以外, en 段不出现中/日文字符, ja 段不出现中文字符

### §0.29.2.3 不上第 2 个长尾 3 理由 (K3 9/1 02:58 GLM 升级)
1. **簇稀释**: 第 2 个长尾若与主词同簇 = 同义反复浪费字符; 若异簇 = 稀释主词权重
2. **重写风险**: 76% 的标题会被 Google 改写, 堆砌是第一触发器
3. **分层布局已给长尾们各自的家**: title 1 个 / meta description 2-3 个 / H1·正文 3-5 个 / FAQ 问句, 第 2、3 个长尾该去 meta description, 不是挤进 title

### §0.29.3 严禁 (K3 8/30 + 9/1 02:58)
- ❌ **业务洞察词进 title** (FDA級 / 月饼 / 茶葉 / 烘焙 / 保健品 / 手搖) — GSC 0 展示, 烧 title 字符
- ❌ **频繁改 title** (churn 是排名杀手, 一次改定 2-4 周冻结)
- ❌ **长尾堆砌** (被 Google 重写标题, 反而丢控制权)
- ❌ **GSC 0 实证词进 title** (违反 §0.23 数据诚信)
- ❌ **跨语言污染** (K3 9/1 02:58 P0): en/ja 段不出现繁中字形 (礼/订/製/盒等), ja 长尾必须是日语词 (ギフトボックス / オーダー / 短納期)

### §0.29.4 例: food-boxes 3 段对照 (K3 9/1 02:58 P0 Bug 修复)
- **zh-hk**: 食品包裝印刷 禮盒訂製 100個起 HK$4起 | 智印港 (45 半角当量, 满格)
- **en**: Custom Food Packaging Boxes | 100 MOQ | ZprintPro (49 chars, 删禮盒訂製跨语言污染)
- **ja**: 食品パッケージ印刷 | 100個から | ZprintPro (38 chars, 删繁中字形跨语言污染)

【v6.1 → v6.2 升级段 (K3 9/1 09:46 派活包, 5 cron 共享同步, 必读)】K3 9/1 09:46 派活包原文: "D 7 篇选题 D8-D14 立即启动 + E ToB SOP D25 启动 + 新版标题规则写进技能 + 同步更新定时任务指令"

【§0.30 v3 关键词价值分层 (K3 8/30 12:37 + 9/1 09:31 拍板, 5 cron 共享必跑)】
- 三维: ① 采购意图信号 (印刷/訂製/批發/custom/wholesale/bulk/manufacturer/印刷会社/製作) ② 买家类型 (企业采购/SMB/个人一次性) ③ 订单价值 (复购耗材 > 事件型 > 信息泛词)
- T1 (P0 必写 5-15 位置 速赢窗): 三维全中 → priority_boost +3 → daily 选题第 1 位
- T2 (P0 必写 16-30 培育窗): 采购信号 + (SMB/企业 OR 复购) → priority_boost +2 → daily 选题第 2-3 位
- T3 (P1 写 31-50 攻坚窗): 采购信号 + 信息泛词 → priority_boost +1 → 类目页 meta 覆盖
- T4 (P2 写 51+ 防守窗): 信息泛词 → priority_boost -1 → 博客捕词
- 实战应用: D8 食品包頁 zh-hk T1 5 词 / D11 stickers en T1 5 词 / D14 textbook ja T1 5 词

【重点带钱词地图 v2 (K3 9/1 09:31 9 角色战略拍板, 替代 v1, 全站全局调度核心)】
- zh-hk T1 5 词 (D8/D9/D10 优先): 食品包裝印刷 (D8 头号) / 月曆訂製 (D9 9/15 死线) / 利是封印刷 (D10 CNY) / 貼紙印刷 (验证窗监控) / 禮盒訂製 (D8 内链目标)
- en T1 5 词 (D11/D12 优先): custom stickers (D11) / small batch sticker printing (D11) / china catalog printing (D12) / custom packaging boxes (D12 跨链) / kraft paper packaging (D13)
- ja T1 5 词 (D13/D14 优先): クラフト紙パッケージ (D13) / 教材印刷 (D14) / 同人誌印刷 (D14 跨链) / 食品パッケージ (D13 跨链) / 短納期印刷 (D13/D14 通用)
- T2-T3 培育 + 攻坚: 36 词 (zh-hk 16 + en 10 + ja 10), 内容深度 + 答案块 + 内链
- 完整 SSoT: docs/2026-09-01-k3-v3-strategic-master-report.md §1.2 + docs/2026-08-30-k3-w3-long-tail-candidate-table.md E 段

【D8-D14 7 篇选题战略层 SOP (K3 9/1 09:46 拍板 立即启动, daily cron 必跑)】
- 完整 SSoT: docs/2026-09-01-k3-d8-d14-blog-topic-strategy.md (13.4KB)
- D8 9/8 zh-hk《食品包裝印刷完全指南》G1 头号 / D9 9/9 zh-hk《2026 月曆訂製指南》G5 9/15 死线
- D10 9/10 zh-hk《利是封設計與印刷指南》CNY 预埋 / D11 9/11 en《Small Batch Sticker Printing》G1
- D12 9/12 en《China Catalog Printing》G3 + CTR 验证窗关闭 (8/30 31 词) / D13 9/13 ja《クラフト紙パッケージ印刷ガイド》G3 + CTR 判定
- D14 9/14 ja《教材・教科書の印刷製本》G3 + W2 复盘 + Gate 2 (7/7 上线 / CTR 判定 / 食品包頁曝光数据)
- K3 9/8 必亲自: GBP 提交回执
- daily cron 每日 10:15 落地 1 篇 + 答案块 + FAQ schema + ≥3 内链

【D25 ToB 报价 SOP 准备 (K3 9/1 09:46 拍板 战略层 + M3 协作 9/1 启动, 9/25 落地核验)】
- 完整 SSoT: docs/2026-09-01-k3-d25-tob-quote-sop.md (10.4KB)
- 008 询盘状态机: 8 状态 (新询盘/首响/报价中/已发/跟进/成交/流失/归档)
- WhatsApp 自动欢迎语 + 三问预设 (报价/交期/MOQ), K3 9/15 前战略层定稿
- 2h 首响 / 24h 报价 / 48h 跟进承诺, 008 自动计时超时升级 K3
- ToB 落地页四要素: 产能 (海德堡 4 色 + MOQ 100 起) / 质检 (ISO 9001 + FDA 級 + 4,500+ 真實訂單) / 出口 (FOB 深圳 + DDP 香港 4 天 + DAP 全球 7-12 天) / 案例 (餐飲/教育/企業/事件型)
- 验收指标 (9/16 M1 闸门 → 9/25 D25): 周归因询盘 0 → 10/15/周, 2h 首响率 ≥80%/90%, 24h 报价率 ≥60%/75%, 询盘→成交转化 ≥10%/15%
- 9/25 死线: ToB 报价 SOP 落地核验 + 配置截图 + 询盘 funnel 报告 (.hermes/logs/d25-tob-sop-2026-09-25.md)

【新版标题规则 (K3 9/1 09:46 派活包, 已沉淀 zprintpro-seo-evolve SKILL.md v4 + AGENTS.md §0.29 v2)】
- §0.29 v2 半角当量口径: 全角 CJK = 2 半角当量 / 半角字符 = 1 半角当量 (50-60 区间)
- §0.29 v2 字符体检 3 行: 满格线 ≥55 禁加 / 不足线 <45 按序补 (数字钩子→品牌→例外长尾) / 跨语言污染零容忍
- §0.29 v2 不上第 2 个长尾 3 理由: 簇稀释 / 76% 重写风险 / 分层布局已给长尾们各自的家
- §0.29 v2 跨语言污染: zh-hk 不出日文 / en 不出中日 / ja 不出简体 (繁中字形礼/订/製/盒 等禁入 en/ja 段)
- 升级拍板来源: K3 9/1 02:58 GLM 拍板 + Zyppy 8万 / Portent 147万 / 2025 Q1 76% 重写率 + Vistaprint 竞品 + 香港本地标准

【数据来源】(§0.23 强制级, v6.2 新增)
- K3 9/1 09:46 派活包原文 (已校准 2026-09-01 09:46)
- K3 9/1 09:31 9 角色综合战略报告 (已校准, 41KB, docs/2026-09-01-k3-v3-strategic-master-report.md)
- K3 9/1 02:58 GLM 拍板 §0.29 v2 (已校准, 半角当量 + 字符体检 3 行 + 跨语言污染)
- K3 8/30 12:37 词价值分层 (已校准)
- K3 9/1 02:54 单品牌分层 §13.16 v2 (已校准, zh-hk=智印港 单品牌, en/ja=ZprintPro 单品牌)
- 5 cron SSoT v6.1 = 2bdacde3 9/1 03:30 落, v6.2 升级同步 (1 commit 攒批 push)
- 9 角色战略报告 §1.2 重点带钱词地图 v2 (32 词核心, 3 语言 × T1-T4)
- D8-D14 7 篇选题战略层 SOP (13.4KB, 9/1 09:46 落)
- D25 ToB 报价 SOP 准备 (10.4KB, 9/1 09:46 落)

