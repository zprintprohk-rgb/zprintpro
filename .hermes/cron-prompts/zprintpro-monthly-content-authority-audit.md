## §I 数据口径校准 (K3 9/2 08:09 push 痛骂数据诚信纠错, 嵌入 5 cron SSoT 头部, 跨项目 P0 强制级)

> **拍板来源**: K3 9/2 08:09 push 痛骂 "全部文章 85 明明我们 zh-hk 语言下就有 85 篇，你却说 79，至少 2 天内有两次说数据不对了"
> **配套**: AGENTS.md §0.33 数据口径校准硬规则 8 子节 + .hermes/regression-guard/error-log.md K3-2026-09-02-0809 事件 + v8-cron-sot-upgrade-segment.md §I 9 子节 + docs/2026-09-02-k3-blog-count-correction.md 10 KB 纠错报告

### §I.1 4 口径对照表 (per K3 §0.33.1, 必填, 校准日期 2026-09-02 08:12)

| 口径 | 真实数量 | 类型 | 何时用 |
|------|---------|------|--------|
| **zh-hk.json unique slugs** | **79** | zh-hk 真实页面内容 | zh-hk 报告 / 修复 / 优化 |
| **en.json unique slugs** | **80** | en 真实页面内容 | en 报告 / 修复 / 优化 |
| **ja.json unique slugs** | **80** | ja 真实页面内容 | ja 报告 / 修复 / 优化 |
| **blog-posts.ts SSoT entries** | **85** | SSoT 配置 (含 3 locale 衍生 + 6 重复) | CEO 看 SSoT / 总览 / 战略报告 |
| 跨 locale 并集 | 81 unique | 3 locale 实际总 blog 数 | 跨 locale 报告 |
| 跨 locale 交集 (3 locale 都有) | 78 unique | 3 locale 同步覆盖 | 3 locale 同步修复 |

### §I.2 报告必含 3 行 (per K3 §0.33.2, 缺一作废)

```
数据来源:
- <数据源文件 1> (<校准日期>)
- <数据源文件 2> (<校准日期>)
- <查询 / 拍板原文 / 校准依据>
校准状态: 已校准 (commit ID) / 待校准 (下次校准时间)
撤回声明: (per §0.23 撤回必含原 commit ID + 撤回日期) — 如适用
```

### §I.3 6 commit 撤回 (per K3 §0.23 + §0.33.3)

- 01458676 (主营架构 v2 "79 篇盘点立即起跑")
- 9cadce1c (79→85 SSoT 口径纠正, commit body 仍以 79 基准)
- 2f8d9438 (包裝盒 17 blog 调度 v3)
- 3f5a13cb (贴纸 18 blog 调度 v2)
- docs/2026-09-02-k3-printing-blog-reorganization.md (untracked, 升级 4 口径对照)
- docs/2026-09-02-k3-packaging-blog-reorganization.md (in 2f8d9438, 升级 4 口径对照)

**注**: 6 commit 内容**实质正确** (数据真实), 撤回的是**报告口径叙述方式**, 不是数据本身。

### §I.4 门童 #7 数据口径必填 (升级 v1.1.1 → v1.2)

- 触发: 任何报告含 "blog 篇数 / SKU 数 / 询盘数 / 客户数" 等数字
- 拦截: 必须含 "数据来源" 行 + 4 口径对照表 + 校准日期
- 缺任一 = 0 commit (red 硬拦) / yellow SHADOW 警告
- 落地: scripts/guards/count-guard.js (9/15 FP 复盘 <10% 后升硬拦)

### §I.5 K3 9/2 07:59 派活包"贴纸知識 9+1 简体"误判纠正

K3 截图称 zh-hk 9 贴紙知識 + 1 简体 贴纸知识 = 10 篇, 实际 (9/2 08:15 真验证) zh-hk 8 sticker slug 全繁体, 0 简体残留, 简体"贴纸"残留 0 次, 繁体"貼紙"出现 216 次。

### §I.6 K3 9/2 08:19 派活包 ja/en 市场喜好翻译 (per docs/2026-09-02-k3-ja-en-market-localization.md)

- en 翻译指南 6 必含: Custom/Wholesale/Bulk/Manufacturer + Fast/Rush/Same Day + FDA/CPSC/ASTM + Made in USA + SMB/Enterprise + Free Shipping
- ja 翻译指南 6 必含: 印刷会社/製作/製作所 + 短納期/翌日/当日/スピード + PSE/JIS/景表法/薬機法/食品衛生法 + 様/御社/貴社 + 激安/格安/送料無料/法人 + OEM/ODM/ロット
- 3 locale 同步: 4 Pillar 主页 + 8 cluster 主页 + 22-28 SKU PDP 必含 3 locale

### §I.7 K3 必拍板 5 项 (per §0.0 零决策铁律)

1. en 翻译指南 6 必含 + ja 翻译指南 6 必含是否同意 (建议: 同意)
2. 3 阶段 5 周 30 天冲刺是否同意 (建议: 同意, 9/3-7-8-13-22-30)
3. 64 blog 缺口翻译 (en 40 + ja 24) 是否 worker 并行 (建议: 是, 5-7 天)
4. 22-28 SKU 主营协同是否 9/8 同步升级 (建议: 9/8 Pillar 升级日同步)
5. 5 cron SSoT 头部 §I 摘要嵌入是否本次 commit 一起 (建议: 是, 攒批)

### §I.8 教训固化源头

- 2026-09-02 08:09 K3 push 痛骂 (2 次数据不对, 根因相同: 未标双口径)
- 2026-09-01 16:22 K3 拍板 79→85 口径纠正 (commit 9cadce1c, 但未根治)
- 2026-09-02 08:15 K3 push 痛骂 (反审门童规则不全, 升级 v1.0 → v1.2 7 道门童)
- 2026-09-02 08:19 K3 push 派活包 (ja/en 市场喜好翻译, ja 缺日式 B2B 词)
- 2026-08-24 22:00 K3 拍板 §0.23 数据诚信红线

---


# zprintpro-monthly-content-authority-audit (v8) — K3 9/1 15:59 拍板

> **SSoT 路径**: `.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md`
> **触发 cron**: mavis cron `zprintpro-monthly-matrix-audit` (每月 1 号 14:00) → 改名 `zprintpro-monthly-content-authority-audit` (v8)
> **拍板来源**: K3 9/1 15:59 派活包 (matrix → content-authority 战略转型) + 3 源联网验证 (Digital Applied 2026 + Ignite Visibility/Semrush AI + Animalz refresh)
> **落地时间**: 2026-09-01 15:59 CST
> **配套**: §0.31 反审门童 v1.0 (3619c778) + design.md 4 修正 (增量更新 commit 3) + 12:32 包装盒 9 项优化 1-6 项 (274c61c7)

---

## §0 战略基线 (K3 9/1 15:59 拍板)

**自 2026-09-01 起, zprintpro 内容战略从"每词一页"矩阵转型为"每主题一簇"内容权威度**:
- **主营 4 Pillar + 2 横向 + L3 次级** (per AGENTS.md §11 v2, K3 9/1 16:16 拍板): L1 主营 4 pillar (包裝盒/貼紙與標籤合并簇/宣傳單張/校園教育印刷新晋) + L2 横向 2 (即日印刷 + 小批量低起订) + L3 次级 2 簇 (紙袋降级 + 婚慶賀卡簇)
- **每 Pillar 1 篇** (3,000-5,000 字, Digital Applied 2026 标准) + 10-20 Cluster (1,500-2,500 字/篇, GSC 实证词支撑)
- **675 URLs** (16 类目 + 97 产品 + **85 blog entries** per blog-posts.ts SSoT = 84 unique slug, K3 §0.22 数据诚信真实数据) → 4 主题簇 (4×22) + 2 横向 + 2 次级 重组目标
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
| 存量 **85 blog entries** (per blog-posts.ts SSoT, 84 unique slug 含 1 重复 sticker-buying-guide, 3 locale 内容同步差 14 项: 9 项 blog-posts.ts 有但 3 locale blog-data 缺 + 5 项 3 locale 有但 blog-posts.ts 缺, K3 §0.22 数据诚信真实数据) | ❌ 无 | ✅ 4 档分布盘点 (达标/可翻新/需合并/建议 301) |

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
| **深度资产盘点** | 见 §3 | 85 blog entries 4 档分布 (per blog-posts.ts SSoT) | 4-6 篇/月翻新配额 |
| **T1 排名轨迹** | 月度快照: 进首页数 / P1-3 数 / CTR 破 0 数 | 9/3 GSC 校准窗口 | 5+ 词进首页 |
| **每 cluster 内链完整性** | pillar↔cluster 双向链 + 锚文本含目标词 | 待 85 篇盘点 | ≥90% 达标 |
| **AEO 引用资格基线** | FAQPage 覆盖率 + llms.txt 状态 + AI 引擎抽查 | 0 (新指标) | FAQPage ≥60% + llms.txt 上线 + 5 问抽查 |
| **Pruning 决策清单** | 30 天 0 imp 且 0 clk 页面 → 翻新/合并/301 | 待盘点 | 10 页面处置/月 |
| **深度分评分卡** | 见 §4 | 待 85 篇盘点 | 全站 ≥70 + **4 Pillar ≥80** (K3 9/1 16:16 主营架构 v2, 5 → 4 pillar) |
| **品类记分卡** (K3 9/1 16:16 拍板并入) | 询盘数 / GSC 实证 / 客单价值 3 指标 (见 §13 增量) | 本周期: 紙袋触发降级 / 校园触发升主营 | 连续 2 月 ≥3 / 60 天 0 订单 / T1+T2 CTR >2% / 单笔 ≥HK$5,000 |

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

**9 月首次盘点重点**: **85 blog entries** 全量扫一遍 (per blog-posts.ts SSoT, 84 unique slug, 1 重复 sticker-buying-guide, 3 locale 内容同步差 14 项: 9 项 blog-posts.ts 有但 3 locale blog-data 缺 + 5 项 3 locale 有但 blog-posts.ts 缺, K3 §0.22 数据诚信真实数据), 输出"达标 / 可翻新 / 需合并 / 建议 301"四档分布。
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
| **FAQPage schema 覆盖率** | 0 (新指标) | ≥60% (85 blog entries 中 51+ 篇) |
| **llms.txt 状态** | 未上线 | 9/20-26 W4 计划上线 (per 5 cron v6.4) |
| **AI 引擎抽查** (Perplexity + ChatGPT 搜 5 问) | 0% 引用 | 5 问中 ≥2 问引用智印港 |
| **5 问抽样** | 待定 | "香港 貼紙印刷 價錢" / "即日 印刷 香港" / "包裝盒 印刷 推薦" / "海報 印刷 價錢" / "利是封 印刷 邊間" |

---

## §6 Pruning 决策清单 (新指标, 9 月首测)

**判定标准**: 30 天 0 imp **且** 0 clk 页面 → 三选一
1. **翻新为 cluster** (深度分 < 50, 加 1,500+ 字 + FAQ + 内链)
2. **合并入 pillar** (重复主题, 301 → 主 pillar)
3. **301 重定向** (永久无价值, 301 → 类目首页)

**9 月首单**: **85 blog entries** 盘点后 (per blog-posts.ts SSoT), 输出"建议 301 / 建议合并 / 建议翻新"三栏清单。

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

## §9 9 月首单 P0 任务 (85 blog entries 盘点, per blog-posts.ts SSoT)

### §9.1 盘点范围

- **85 blog entries** (per `src/data/blog-posts.ts` SSoT, 84 unique slug, 1 重复 sticker-buying-guide)
- **3 locale 实际内容** (per `src/data/blog-data/{zh-hk,en,ja}.json`): zh-hk 78 + en 79 + ja 79 = 80 unique slug 并集 (含 1 个 system key company-intro 已被排除)
- **3 locale 内容同步差 14 项** (K3 9/1 16:22 派活包核对):
  - **9 项 blog-posts.ts 有但 3 locale blog-data 缺** (需补 3 locale blog-data): packaging-buying-guide / banner-buying-guide / flyer-buying-guide / paper-bag-buying-guide / book-buying-guide / 4 其他 (待盘点)
  - **5 项 3 locale 有但 blog-posts.ts 缺** (需补 blog-posts.ts): packaging-box-price-2026 / certificate-printing-guide / 2027-calendar-printing-complete-guide / rush-printing-delivery-guide / apparel-clothing-tag-printing-guide
- **9/1 16:30 立即起跑** (K3 派活包"时不我待", 不等 9/2)

### §9.2 4 档分布输出

| 档 | 标准 | 9 月预期分布 (基于 85 entries) |
|----|------|-------------------------------|
| **达标 cluster** | ≥1,500 字 + FAQPage schema + 3+ 内链 + GSC 实证词 | 8-13 篇 (10-15%) |
| **可翻新** | 1,000-1,500 字 + 部分 schema + 1-2 内链 | 27-37 篇 (32-44%) |
| **需合并** | 重复主题 / 与 Pillar 蚕食 | 8-13 篇 (10-15%) |
| **建议 301** | 30 天 0 imp + 0 clk + 与主营不相关 | 4-8 篇 (5-10%) |

### §9.3 翻新配额 (4-6 篇/月, K3 9/1 16:16 主营架构 v2)

- **9 月首批**: 选深度分最低的 4-6 篇 thin → cluster 改造
- **优先级 (4 Pillar 候选)**: 包裝盒 2 候选 / 校園教育 2 候选 / 貼紙與標籤 1 候选 / 宣傳單張 1 候选
- **改造标准**: 加 1,500+ 字 + FAQPage schema + 3+ 内链 + 业务洞察词

### §9.4 **4 Pillar 候选识别** (K3 9/1 16:16 主营架构 v2, 5 → 4 pillar)

| # | 品类 | 候选 Pillar | 9 月行动 | 10 月行动 |
|---|------|------------|----------|----------|
| 1 | **包裝盒 (packaging)** (主战场) | packaging-box-custom-guide | **本月升级 Pillar (3,000+ 字, 12:32 优化基础上扩展)** | 5 cluster 选题 |
| 2 | **貼紙與標籤** (合并簇, 2 入口页) | sticker-material-pvc-vinyl-removable (貼紙) + label-printing-guide (標籤 B2B) | 待盘点 | 10 月双 cluster (合并为 1 簇但 2 入口) |
| 3 | **宣傳單張 (flyers)** | flyer-buying-guide (新建) | 待盘点 | 11 月 Pillar |
| 4 | **校園教育印刷** (新晋) | campus-printing-guide (新建) | **9 月立项, 吸收證書 + 月曆 + 校刊/畢業冊/學生手冊/校園橫幅** | 5 cluster 选题 |

**L2 横向 (2 项, 不占 pillar 名额)**: 即日印刷 (维持特殊架构) + 小批量低起订 (en 站 Q4 立项)
**L3 次级 (2 簇, 按记分卡观察)**: 紙袋 (降级, R5 節慶 9/9-9/15 观察) + 婚慶賀卡簇 (T2 豁免)

### §9.5 14 项 3 locale 内容同步差修复计划 (K3 9/1 16:22 拍板)

| 类型 | 数量 | 修复 | 截止 |
|------|------|------|------|
| **blog-posts.ts 有但 3 locale 缺** | 9 项 | 补 3 locale blog-data/ | 9/8 包裝盒 Pillar 升级前 |
| **3 locale 有但 blog-posts.ts 缺** | 5 项 | 补 blog-posts.ts SSoT | 9/8 前 |
| **总计** | 14 项 | (待 9/3 worker 同步盘点详细清单) | **9/8 硬截止** |

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
| 9/1 16:30 (立即) | **85 blog entries** 盘点 worker 起跑 (K3 9/1 16:22 派活包核对真实数据, 14 项 3 locale 同步差待 worker 输出详细清单) | 4 档分布报告 (5-7 天) + 14 项同步差修复清单 |
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
**首单**: 9/1 16:30 (立即) **85 blog entries 盘点** (worker 异步, K3 9/1 16:22 派活包核对真实数据 85 SSoT + 14 项 3 locale 同步差) + 9/8 包裝盒 Pillar 升级 (主战场 1-12 月询盘 50% 占比)。

---

## §13 品类记分卡 (K3 9/1 16:16 拍板并入, 数据驱动品类进退)

### §13.1 3 指标 × 升降级线

| 指标 | 升主营线 | 降级观察线 | 数据源 |
|------|----------|------------|--------|
| **询盘数 (按品类归档)** | 连续 2 月 ≥3 单 | 连续 60 天 0 订单且询盘 ≤2 | 询盘记录 (§0.23 归档, 每次询盘标品类) |
| **GSC 实证** | T1/T2 词有展示且 CTR >2% | 核心词 <5 imp | GSC 月度 |
| **客单价值** | 单笔 ≥HK$5,000 或合同型复购 | 全部现货小单 | 成交记录 |

### §13.2 本周期状态 (K3 9/1 16:16 拍板)

| 品类 | 询盘数 | GSC 实证 | 客单价值 | 判定 |
|------|--------|----------|----------|------|
| **紙袋** | 连续 60+ 天 0 订单, 2 个几十/100 個现货小询盘 | 紙袋 3 imp / 牛皮紙袋 1 imp pos 4.0 | 全部现货小单 | 🔴 **触发"降级观察线"** → L3 次级 |
| **校園教育** | 7-8 月不时有询盘 (K3 §0.23 待归档确认) | 證書印刷 pos 11.4 CTR 12.5% + 月曆訂製 | 合同型 B2B 年复购 | 🟢 **触发"升主营线"** → L1 主营 #4 (新晋) |
| **包裝盒** | 1-12 月 50% 询盘 | 紙盒訂製 14 imp / 包裝盒訂製 11 imp | HK$125K-200K | 🟢 维持 L1 主营 #1 (主战场) |
| **貼紙/標籤** | 稳定小单 | small batch sticker 20 imp + label 20 imp + 貼紙 16 imp | 中等 | 🟢 维持 L1 主营 #2 (合并为簇, 2 入口页) |
| **宣傳單張** | 常规走量 | 宣傳單張 27 imp | 中等 | 🟢 维持 L1 主营 #3 |

### §13.3 自动化执行

- **月度 cron v8** 每月 1 号 14:00 自动跑品类记分卡
- 输出 5 品类 × 3 指标 = 15 单元格状态表
- 触发升降级线 → 写月报 + 升级 K3 拍板
- 连续 2 月 ≥3 / 连续 60 天 0 订单 → 自动标注, K3 1 次回复拍板

### §13.4 拍板来源

- K3 9/1 16:16 派活包: 主营品类架构重构 v2 + 品类记分卡
- 3 源联网验证: Jukebox Print + American Business Forms (贴纸 vs 标签) + WTPBiz (校园) + samedayrushprinting (即日志)
- GSC 8/30 baseline + 经营实况 (K3 口述, §0.23 校 7-8 月校园询盘待归档)
- 配套文档: `docs/2026-09-01-k3-pillar-architecture-restructure.md` (主营架构 v2 决策文档)
