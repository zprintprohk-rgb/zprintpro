# v8 升级段 (2026-09-01 15:59 + 16:16 + 16:22 K3 派活包) — 嵌入 3 个 cron SSoT 头部

> **拍板来源**: K3 9/1 15:59 (月度 cron v8 战略转型) + 9/1 16:16 (主营架构 v2 + 品类记分卡) + 9/1 16:22 (85 SSoT 口径纠正) + 9/1 16:46 (信息同步)
>
> **嵌入位置**: `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` (125 KB) + `.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md` (76 KB) + `.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md` (50 KB)
>
> **生效**: 2026-09-01 16:30 CST (K3 §0.25 派活包豁免覆盖 30 min 硬下限)
>
> **维护**: Mavis (M3) 跨 session 永久

---

## §A 4 Pillar 主营架构 v2 (K3 9/1 16:16 拍板, 5 → 4 pillar + 2 横向 + L3 次级)

**L1 主营支柱层 (Pillar 级深度长文投资, 4 品类)**:
- **包裝盒** (主战场, 含食品包裝子簇) → 9/8 升级 Pillar (12:32 优化基础上 3,000+ 字)
- **貼紙與標籤** (合并 1 个权威簇: 貼紙 pillar + 標籤 B2B cluster + 防水/乙烯/透明/自訂 specs, **2 入口页保留** + 双向内链)
- **宣傳單張** (含海報/傳單 specs)
- **校園教育印刷** (新晋, 吸收證書印刷 Pillar + 月曆 + 校刊/畢業冊/學生手冊/校園橫幅)

**L2 横向服务层 (与主营导航平级, 2 项)**:
- **即日印刷** (现特殊架构维持; GSC 8.7 词继续攻坚首页; 跨品类 SKU 急件溢价)
- **小批量低起订** (en 站差异化定位词, Q4 立项)

**L3 次级/季节层 (保留资产, 停 pillar 投资, 2 簇)**:
- **紙袋** (降级, 牛皮紙袋 spec 页保留, R5 節慶紙袋 9/9-9/15 观察窗)
- **婚慶賀卡簇** (T2 豁免, 燙金 6 SKU)

**§11 升级约束** (per AGENTS.md §11 v2 8 子节): 任何 cron 选题 / 词位置判断 / 类目页 meta 改动 必先查 4 Pillar 归属, 答不出 = 不立项。

## §B 85 Blog Entries SSoT 口径 (K3 9/1 16:22 派活包核对, 真实数据)

| 数据源 | 数量 | 用途 |
|--------|------|------|
| **blog-posts.ts slug 字段总数** | **85** | SSoT 真实数据 (K3 9/1 16:22 派活包口径) |
| **blog-posts.ts unique slug (去重)** | 84 | 1 个 slug (sticker-buying-guide) 重复 2 次 |
| **3 locale json unique slug 并集** | 80 | `src/data/blog-data/{zh-hk,en,ja}.json` 实际内容 |
| **3 locale json 共同 unique slug 交集** | 77 | 3 locale 全部同步的 blog |
| zh-hk unique slugs | 78 | 含 1 个 system (company-intro 排除) |
| en unique slugs | 79 | |
| ja unique slugs | 79 | |

**3 locale 内容同步差 14 项** (K3 §0.22 数据诚信真实数据, K3 9/1 16:22 派活包):
- **9 项 blog-posts.ts 有但 3 locale blog-data 缺** (需补 3 locale): packaging-buying-guide / banner-buying-guide / flyer-buying-guide / paper-bag-buying-guide / book-buying-guide / 4 其他 (待 9/3 worker 详细清单)
- **5 项 3 locale 有但 blog-posts.ts 缺** (需补 blog-posts.ts SSoT): packaging-box-price-2026 / certificate-printing-guide / 2027-calendar-printing-complete-guide / rush-printing-delivery-guide / apparel-clothing-tag-printing-guide

**§0.22 数据诚信教训**: 任何 blog 数量引用, 必须先看 SSoT 口径 (blog-posts.ts), 不只是 json 数据。之前 commit 4 (01458676) 79 unique 数字是按 3 locale json 跨 locale 交集口径, 与 K3 §0.30 / 5 cron v6.4 SSoT 口径 (blog-posts.ts 85) 不一致, 已纠正到所有 SSoT。

## §C 品类记分卡 3 指标 (K3 9/1 16:16 拍板, 写入月度 cron v8 §13)

| 指标 | 升主营线 | 降级观察线 | 数据源 |
|------|----------|------------|--------|
| **询盘数 (按品类归档)** | 连续 2 月 ≥3 单 | 连续 60 天 0 订单且询盘 ≤2 | 询盘记录 (§0.23 归档, 每次询盘标品类) |
| **GSC 实证** | T1/T2 词有展示且 CTR >2% | 核心词 <5 imp | GSC 月度 |
| **客单价值** | 单笔 ≥HK$5,000 或合同型复购 | 全部现货小单 | 成交记录 |

**本周期状态 (K3 9/1 16:16 拍板)**:
- 🔴 **紙袋**: 触发"降级观察线" (60+ 天 0 订单 + GSC <5 imp) → L3 次级
- 🟢 **校園教育**: 触发"升主营线" (證書 pos 11.4 CTR 12.5% + 月曆 + 7-8 月不时询盘) → L1 主营 #4 (新晋)
- 🟢 **包裝盒 / 貼紙與標籤 / 宣傳單張**: 维持 L1 主营

## §D 深度分评分卡 (100 分制, K3 9/1 15:59 派活包月度 cron v8)

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
- ✅ **4 Pillar** 全部 **≥80** 分 (K3 9/1 16:16 主营架构 v2, 5 → 4 pillar)
- ✅ 翻新 4-6 篇/月 thin → cluster 改造

## §E 反审门童 v1.0 (K3 9/1 15:06 拍板 + 9/1 15:06 CEO 决策报告 4 修正 + 3 齿轮, 跨 session 永久)

**5 道门童 (orange shadow + red 硬拦)**:
- **门童 #1 数据诚信** (credibility-guard.js, orange shadow): 11 类无来源数字/证书号/经验年限
- **门童 #2 真实电话** (phone-guard.js, red 硬拦): +852 黑名单 + wa.me/852 黑名单 + +86 198 8085 1334 白名单
- **门童 #3 品牌分层** (brand-guard.js, red 硬拦): 智印港/ZprintPro 单品牌 + 错字 + 跨语言混用
- **门童 #4 跨语言污染** (i18n-guard.js, red 部分 + yellow shadow): §0.29 v3.1 字符体检 + 半角全角 + 币种格式
- **门童 #5 SOP-10 5 问门禁** (sop10-guard.js, yellow shadow + red 秘密泄漏): §0.22 5 问 3 款 + §0.27.8 ARK key

**3 道防线 + 自进化 4 步 SOP**: 编辑前 (Mavis 预检) + commit 前 (pre-commit hook v7 强制) + push 后 (5 cron 监控 v1.1)

**DoD 铁律**: 任何派活包修复错误, 必同步把 pattern 写入 `.hermes/regression-guard/error-patterns.md`, 视为任务未完成

**K3 4 修正** (per 9/1 15:06 CEO 决策报告):
- 修正 1: ROI 诚实化 (40h/月节省, 22x 时间回报, 不再虚高 311h/5.8x)
- 修正 2: 拦截率 100% → ≥90% (可验证) + 已 pattern 化错误复发 = 0 (post-push cron 验证)
- 修正 3: shadow mode 分级执法 (red 硬拦 + orange/yellow 仅警告, 9/15 FP 复盘 <10% 后升硬拦)
- 修正 4: hook 持久化 (`scripts/canonical/pre-commit` SSoT + `scripts/setup-hooks.sh` 一键安装)

**K3 3 齿轮**:
- DoD 铁律 (No fix without a rule)
- 周健康报告 (5 cron SSoT v6.4 嵌入)
- 历史 diff 回灌 seeding (scripts/seed-error-patterns.js, v1.1)

## §F K3 9/1 16:46 派活包信息同步 - 4 个新 mavis cron 任务

| Cron 任务 | 起跑时间 | 交付物 | 状态 |
|-----------|----------|--------|------|
| 85 blog entries 盘点 worker | 9/3 起跑 (5-7 天) | 4 档分布 (达标/可翻新/需合并/建议 301) + 14 项 3 locale 同步差修复清单 | mavis cron once |
| 14 项 3 locale 同步差 worker | 9/3 起跑 (3-5 天) | 9 项 blog-posts.ts 缺 3 locale 补完 + 5 项 3 locale 缺 blog-posts.ts 补完 | mavis cron once |
| 校园 GSC 90 天拉数 worker | 9/3 起跑 (1 天) | 校園印刷/校刊/畢業冊/學生手冊/月曆/證書 6 词 GSC 实证 | mavis cron once |
| 校园 Pillar 立项 worker | 9/8-9/14 窗口 | campus-printing-guide 新建 + 吸收證書 + 月曆 + 4 cluster 缺口选题 | mavis cron once |

**§0.25 30 min 间隔**: K3 派活包豁免覆盖 (9/1 15:59 + 16:16 + 16:22 + 16:46 已预批"今日内"或"建议立即起跑")

## §G §0.31 反审门童 SOP (K3 9/1 15:06 拍板, 跨项目 P0 强制级)

任何 cron 任务执行, 必跑 5 道门童 (per §E), 命中 red/orange shadow mode (v1.0) 不拦截, 9/15 FP 复盘 <10% 后升硬拦 (v1.1)。

**setup 命令** (任何新环境/新 agent 10 秒内可恢复):
```bash
bash scripts/setup-hooks.sh
node scripts/check-regression-guard.js src/
```

## §H 拍板来源与教训固化源头

- **K3 9/1 15:06 派活包**: 反审门童 v1.0 (5 道门童 + 3 道防线 + 自进化 4 步 SOP) + AGENTS.md §0.31
- **K3 9/1 15:06 CEO 决策报告**: 4 修正 (ROI 诚实化 / 拦截率 90% / shadow mode / hook 持久化) + 3 齿轮 (DoD / 周报 / 回灌)
- **K3 9/1 15:59 派活包**: 月度 cron v8 战略转型 (matrix → content-authority) + 5 决策
- **K3 9/1 16:16 派活包**: 主营架构 v2 (5 → 4 pillar + 2 横向 + L3 次级) + 品类记分卡
- **K3 9/1 16:22 派活包**: 85 SSoT 口径纠正 + 14 项 3 locale 同步差
- **K3 9/1 16:46 派活包**: 信息同步到定时任务指令与任务更新 (本升级段)
- **配套**: 12:32 派活包 (包装盒 9 项优化 1-6 项, 274c61c7) + 12:23+12:27 派活包 (撤除虚假数据)
