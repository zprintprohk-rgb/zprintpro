# zprintpro-monthly-content-authority-audit (v8) — K3 9/1 15:59 拍板

> **SSoT 路径**: `.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md`
> **触发 cron**: mavis cron `zprintpro-monthly-matrix-audit` (每月 1 号 14:00) → 改名 `zprintpro-monthly-content-authority-audit` (v8)
> **拍板来源**: K3 9/1 15:59 派活包 (matrix → content-authority 战略转型) + 3 源联网验证 (Digital Applied 2026 + Ignite Visibility/Semrush AI + Animalz refresh)
> **落地时间**: 2026-09-01 15:59 CST
> **配套**: §0.31 反审门童 v1.0 (3619c778) + design.md 4 修正 (增量更新 commit 3) + 12:32 包装盒 9 项优化 1-6 项 (274c61c7)

---

## §0 战略基线 (K3 9/1 15:59 拍板)

**自 2026-09-01 起, zprintpro 内容战略从"每词一页"矩阵转型为"每主题一簇"内容权威度**:
- **主营 5 品类** (per AGENTS.md §11): 貼紙 / 宣傳單張 / 包裝盒 / 紙袋 / 標籤
- **每品类 1 篇 Pillar** (3,000-5,000 字, Digital Applied 2026 标准)
- **每 Pillar 10-20 篇 Cluster** (1,500-2,500 字/篇, GSC 实证词支撑)
- **675 URLs** (16 类目 + 97 产品 + 94 blog) = 5 主题簇 (5×22) 重组目标
- **"每词一页"矩阵停止投资** (Digital Applied: "孤立关键词打法收益递减")

---

## §1 月度 Cron 定位变化 (旧 → 新)

| # | 旧 (zprintpro-monthly-matrix-audit) | 新 (zprintpro-monthly-content-authority-audit) |
|---|-------------------------------------|------------------------------------------------|
| 定位 | 矩阵覆盖率计数器 | 内容资产审计官 |
| 核心 KPI | 词表覆盖率 % (zh-hk 62.5%/en 40%/ja 30%) | 深度分 ≥70 全站 + 5 Pillar ≥80 |
| 报告长度 | 304 行 (commit 流水 1/3) | ~150 行 (战略归类摘要) |
| AEO 审计 | ❌ 无 | ✅ FAQPage 覆盖率 / llms.txt / AI 引擎抽查 |
| Pruning 决策 | ❌ 无 | ✅ 翻新/合并/301 三栏清单 |
| 存量 94 篇 blog | ❌ 无 | ✅ 4 档分布盘点 (达标/可翻新/需合并/建议 301) |

---

## §2 指标体系换代 (K3 9/1 15:59 拍板)

### §2.1 旧指标处置

| 旧指标 | 处置 | 原因 |
|--------|------|------|
| 词表覆盖率 % (zh-hk 16 词 / en 10 词 / ja 10 词) | **降级为参考, 不再设达标线** | en 40% / ja 30% 逼出 thin pages (Digital Applied 警告) |
| T1 "命中率" | **改名为"部署覆盖率"** | "命中率"误导读者, 实际只是部署, 效果归 GSC 窗口验证 |
| 24 commit 流水账 | **瘦身为战略归类摘要** | 流水账是 daily/weekly cron 职责 |

### §2.2 新指标 (深度时代)

| 新指标 | 公式 | 9 月基线 | 10/1 KPI |
|--------|------|----------|----------|
| **深度资产盘点** | 见 §3 | 94 篇 blog 4 档分布 | 4-6 篇/月翻新配额 |
| **T1 排名轨迹** | 月度快照: 进首页数 / P1-3 数 / CTR 破 0 数 | 9/3 GSC 校准窗口 | 5+ 词进首页 |
| **每 cluster 内链完整性** | pillar↔cluster 双向链 + 锚文本含目标词 | 待 94 篇盘点 | ≥90% 达标 |
| **AEO 引用资格基线** | FAQPage 覆盖率 + llms.txt 状态 + AI 引擎抽查 | 0 (新指标) | FAQPage ≥60% + llms.txt 上线 + 5 问抽查 |
| **Pruning 决策清单** | 30 天 0 imp 且 0 clk 页面 → 翻新/合并/301 | 待盘点 | 10 页面处置/月 |
| **深度分评分卡** | 见 §4 | 待 94 篇盘点 | 全站 ≥70 + 5 Pillar ≥80 |

---

## §3 深度资产盘点表 (新 §4, 替代词表覆盖率 §4)

每主营品类一行:

| 品类 | Pillar 状态 | 已有 cluster 篇数 | 达标 cluster (≥1,500 字 + FAQ schema + 3 内链) | thin 待改造 | 本月行动 |
|------|-------------|--------------------|--------------------------------------------|-------------|----------|
| 貼紙 (stickers) | 待建 | 待盘点 | 待盘点 | 待盘点 | 9 月首单盘点 |
| 宣傳單張 (flyers) | 待建 | 待盘点 | 待盘点 | 待盘点 | 同上 |
| **包裝盒 (packaging)** | **已有 12:32 优化基础 (274c61c7)** | 1 (12:32) | 1 (12:32 9 项优化) | 待盘点 | **9 月升级 Pillar (3,000+ 字)** |
| 紙袋 (paper-bags) | 待建 | 待盘点 | 待盘点 | 待盘点 | 同上 |
| 標籤 (labels) | 待建 | 待盘点 | 待盘点 | 待盘点 | 同上 |

**9 月首次盘点重点**: 94 篇 blog 全量扫一遍, 输出"达标 / 可翻新 / 需合并 / 建议 301"四档分布。
**翻新配额**: 每月 4-6 篇 thin → cluster 改造 (对齐 Animalz refresh 优先策略 + B7 选题库改排期: 22 篇选题中优先选能补 cluster 缺口的, 砍掉与现有内容蚕食的)。

---

## §4 深度分评分卡 (每篇长文 100 分制, 进 cron 自动计算)

| 维度 | 分值 | 门槛 | 评分标准 |
|------|------|------|----------|
| **字数** (pillar 3-5K / cluster 1.5-2.5K) | 20 | pillar <2,000 字 = 0 分 (Digital Applied 红线) | 1,500-2,499 = 10 / 2,500-2,999 = 15 / 3,000+ = 20 |
| **结构** (H2 ≥6 / H3 FAQ 4-6 / 摘要区 + 列表) | 20 | AI 引用偏好的可扫描结构 | H2 4-5 = 10 / H2 ≥6 + H3 4-6 + 摘要区 = 20 |
| **Schema** (FAQPage + Article + Breadcrumb) | 15 | 缺 FAQPage = AEO 资格判 0 | 1 schema = 5 / 2 schema = 10 / 3 schema = 15 |
| **内链** (回 pillar 1 + 横向 2-3 + 锚文本含目标词) | 15 | 孤岛页 = 0 分 | 1-2 内链 = 5 / 3-5 = 10 / 6+ 含目标词 = 15 |
| **E-E-A-T** (作者/工艺实拍/具体案例, 禁无来源硬数字) | 15 | 过门童 #1 为前提 (per §0.31) | 描述性文案 + 工艺实拍 = 10 / +具体案例 = 15 |
| **数据钩子** (MOQ/价格区间/交期, GSC 实证词支撑) | 15 | 业务洞察词禁入 title, 可入正文 | 1-2 数据钩子 = 5 / 3-4 = 10 / 5+ 含 GSC 实证 = 15 |

**月度 KPI (10/1 起生效)**:
- ✅ 全站长文平均深度分 **≥70**
- ✅ 5 Pillar 全部 **≥80** 分
- ✅ 翻新 4-6 篇/月 thin → cluster 改造

---

## §5 AEO 引用资格基线 (新指标, 9 月首测)

| 项 | 9 月基线 | 10/1 KPI |
|----|----------|----------|
| **FAQPage schema 覆盖率** | 0 (新指标) | ≥60% (94 篇 blog 中 60+ 篇) |
| **llms.txt 状态** | 未上线 | 9/20-26 W4 计划上线 (per 5 cron v6.4) |
| **AI 引擎抽查** (Perplexity + ChatGPT 搜 5 问) | 0% 引用 | 5 问中 ≥2 问引用智印港 |
| **5 问抽样** | 待定 | "香港 貼紙印刷 價錢" / "即日 印刷 香港" / "包裝盒 印刷 推薦" / "海報 印刷 價錢" / "利是封 印刷 邊間" |

---

## §6 Pruning 决策清单 (新指标, 9 月首测)

**判定标准**: 30 天 0 imp **且** 0 clk 页面 → 三选一
1. **翻新为 cluster** (深度分 < 50, 加 1,500+ 字 + FAQ + 内链)
2. **合并入 pillar** (重复主题, 301 → 主 pillar)
3. **301 重定向** (永久无价值, 301 → 类目首页)

**9 月首单**: 94 篇 blog 盘点后, 输出"建议 301 / 建议合并 / 建议翻新"三栏清单。

---

## §7 三 Cron 分工重划 (防重叠)

| Cron | 职责变化 |
|------|----------|
| **daily** (zprintpro-daily-content-evolve) | 照旧执行 (发内容/改 title/meta), **但选题闸门改为: 新选题必须先回答"补哪个 pillar 的哪个 cluster 缺口", 答不出 = 不立项** |
| **weekly** (zprintpro-gsc-feedback-loop) | 照旧 GSC 校准, **新增每周深度分增量报告 (1 行)** |
| **monthly** (本 cron) | 从"覆盖率计数器"升级为"内容资产审计官": 深度资产盘点 + 深度分 + AEO 引用基线 + pruning 清单 + 下月 cluster 缺口排期 |

---

## §8 报告结构瘦身 (304 行 → 目标 ~150 行)

### §8.1 保留 (战略级)

- §0 成熟度坐标 (§0.30 v2.2)
- §1 冲刺原则 (30 天极限冲刺 v2.2)
- §2 战略基线 (matrix → content-authority)
- §3 指标体系换代 (新旧对比)
- §4 深度资产盘点表 (新)
- §5 深度分报告 (新)
- §6 AEO 引用资格基线 (新)
- §7 Pruning 决策清单 (新)
- §8 三 cron 分工
- §9 节点表 (per 5 cron v6.4 §7)

### §8.2 压缩 (1/3 → 10 行)

- §10 commit 流水 → **10 行战略归类摘要** (UX 转化节拍 6 commit / SEO 升级 4 commit / 品牌分层 2 commit / etc.)

### §8.3 删除

- §旧 §3 T1-T4 覆盖率明细表 → **移入 weekly 追踪** (不重复)
- §旧 §6 24 commit 逐条列 → 删 (流水账)

---

## §9 9 月首单 P0 任务 (94 篇 blog 盘点)

### §9.1 盘点范围

- **94 篇 blog** = `src/data/blog-data/{zh-hk,en,ja}.json` 全部 blog 条目
- **3 locale 同步盘点** (zh-hk / en / ja 各 31-32 篇)

### §9.2 4 档分布输出

| 档 | 标准 | 9 月预期分布 |
|----|------|--------------|
| **达标 cluster** | ≥1,500 字 + FAQPage schema + 3+ 内链 + GSC 实证词 | 10-15 篇 (10-16%) |
| **可翻新** | 1,000-1,500 字 + 部分 schema + 1-2 内链 | 30-40 篇 (32-43%) |
| **需合并** | 重复主题 / 与 Pillar 蚕食 | 10-15 篇 (10-16%) |
| **建议 301** | 30 天 0 imp + 0 clk + 与主营不相关 | 5-10 篇 (5-10%) |

### §9.3 翻新配额 (4-6 篇/月)

- **9 月首批**: 选深度分最低的 4-6 篇 thin → cluster 改造
- **优先级**: 高业务价值品类 (包裝盒 5 候选 / 貼紙 4 候选 / 宣傳單張 3 候选)
- **改造标准**: 加 1,500+ 字 + FAQPage schema + 3+ 内链 + 业务洞察词

### §9.4 5 Pillar 候选识别

| # | 品类 | 候选 Pillar | 9 月行动 | 10 月行动 |
|---|------|------------|----------|----------|
| 1 | **包裝盒 (packaging)** | packaging-box-custom-guide | **本月升级 Pillar (3,000+ 字, 12:32 优化基础上扩展)** | 5 cluster 选题 |
| 2 | 貼紙 (stickers) | sticker-material-pvc-vinyl-removable | 待盘点 | 10 月 Pillar |
| 3 | 宣傳單張 (flyers) | flyer-printing-guide | 待盘点 | 11 月 Pillar |
| 4 | 紙袋 (paper-bags) | paper-bag-printing-guide | 待盘点 | 11 月 Pillar |
| 5 | 標籤 (labels) | label-printing-guide | 待盘点 | 12 月 Pillar |

---

## §10 配套机制 (K3 9/1 15:59 拍板)

### §10.1 与反审门童 v1.0 协同 (§0.31)

- **E-E-A-T 维度 (15 分)**: 过门童 #1 数据诚信 11 类 + 门童 #2 真实电话 + 门童 #3 品牌分层
- **DoD 铁律**: 任何 Pillar/Cluster 翻新必同步把新 pattern 写入 error-patterns.md

### §10.2 与 5 cron SSoT v6.4 协同

- **monthly cron (本 cron)**: 深度资产盘点 + 深度分 + AEO + pruning
- **daily cron**: 选题闸门 (先答"补哪个 pillar 的 cluster 缺口")
- **weekly cron**: GSC 校准 + 深度分增量

### §10.3 与 §0.30 战略基线协同

- **§0.30 v2.2 成熟度分级**: zh-hk 年轻站 / ja·en 新生儿, 防止跨 locale 乱对标
- **§0.30 9 角色综合**: 战略军师 + CEO + PM + UI/UX + 运营 + CRO + 数据 + SEO/AEO/GEO + 多语言

### §10.4 与 §0.27 push 决策红线 5 条协同

- **§0.27.3 永久排除目录**: zprintpro-en-us-images/ 不进 commit (4GB)
- **§0.27.8 秘密零容忍**: 门童 #5 SECRET_LEAK 拦截 API key / token

---

## §11 9 月执行路线图 (K3 9/1 15:59 拍板)

| 日期 | 任务 | 交付物 |
|------|------|--------|
| **9/1 15:59** | 本 cron v8 落地 (本 commit) | v8 prompt + §0 战略基线 |
| 9/2-9/3 | 94 篇 blog 盘点 (worker 异步) | 4 档分布报告 |
| 9/3 | GSC 8 天数据校准 (per 5 cron v6.4) | T1 排名轨迹基线 |
| 9/8 | 包裝盒 Pillar 升级 (12:32 基础上 3,000+ 字) | Pillar #1 落地 |
| 9/13 | 首批 4-6 篇 thin → cluster 改造 | 4-6 篇 cluster 升级 |
| 9/15 | 反审门童 v1.0 → v1.1 (shadow mode FP 复盘) | orange/yellow 升级硬拦 |
| 9/20-9/26 | llms.txt + schema 全站 (W4 计划) | AEO 引用资格 +30% |
| 9/30 | 月度复盘 v8 首月 | 9 月月报 (本 cron 首单) |

---

## §12 拍板来源与教训固化源头

- **K3 9/1 15:59 派活包** (matrix → content-authority 战略转型) + 4 修正 + 3 齿轮
- **Digital Applied 2026 Topic Authority 指南** (3 源联网验证)
- **Ignite Visibility / Semrush AI 引用研究** (57.1% Informational 内容触发 AI Overview)
- **Animalz / Sandler** (B2B Content refresh ROI 最高)
- **配套**: 12:37 派活包 (反审门童 v1.0, 3619c778) + 12:32 派活包 (包装盒 9 项优化, 274c61c7) + 9/1 12:23+12:27 派活包 (撤除虚假数据)

---

**拍板等待**: K3 9/1 15:59 已预批"建议今日内 M3 落 cron v8 prompt", M3 已立即执行。
**首单**: 9/2-9/3 94 篇 blog 盘点 (worker 异步) + 9/8 包裝盒 Pillar 升级 (主战场 1-12 月询盘 50% 占比)。
