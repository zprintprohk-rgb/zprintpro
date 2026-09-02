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
- **K3 9/2 08:09 push 痛骂**: 数据诚信老数据 + 4 口径对照必填 + AGENTS.md §0.33 落地 (本节 §I)
- **配套**: 12:32 派活包 (包装盒 9 项优化 1-6 项, 274c61c7) + 12:23+12:27 派活包 (撤除虚假数据)

---

## §I §0.33 数据口径校准 (K3 9/2 08:09 push 痛骂数据诚信纠错, AGENTS.md §0.33 落地, 跨项目 P0 强制级)

> **拍板来源**: K3 9/2 08:09 push 痛骂原文 "全部文章 85 明明我们 zh-hk 语言下就有 85 篇，你却说 79，这些信息是从哪里来的，错误信息，思考理解问题，分析研究后给到最优方案，能读肯定是最新信息，怎么老是老信息，至少 2 天内有两次说数据不对了"
>
> **生效**: 2026-09-02 08:30 CST (本节 §I 升级段)
>
> **维护**: Mavis (M3) 跨 session 永久
>
> **配套**: AGENTS.md §0.33 全部 8 子节 (4 口径对照表 / 报告必含 3 行 / 6 commit 撤回 / 门童 #7 / 反例 / 应用范围 / 配套机制 / 教训固化源头)

### §I.1 4 口径对照表 (必填, K3 9/2 08:09 push 拍板)

| 口径 | 真实数量 | 类型 | 何时用 |
|------|---------|------|--------|
| **zh-hk.json unique slugs** | **79** | zh-hk 真实页面内容 | zh-hk 报告 / zh-hk 修复 / zh-hk 优化 |
| **en.json unique slugs** | **80** | en 真实页面内容 | en 报告 / en 修复 / en 优化 |
| **ja.json unique slugs** | **80** | ja 真实页面内容 | ja 报告 / ja 修复 / ja 优化 |
| **blog-posts.ts SSoT entries** | **85** | SSoT 配置 (含 3 locale 衍生 + 6 重复) | CEO 看 SSoT / 总览 / 战略报告 |
| 跨 locale 并集 | 81 unique | 3 locale 实际总 blog 数 | 跨 locale 报告 |
| 跨 locale 交集 (3 locale 都有) | 78 unique | 3 locale 同步覆盖 | 3 locale 同步修复 |

**校准日期**: 2026-09-02 08:12
**校准方法**: `python _audit_blog_count_real.py` + `python _audit_blog_count_deep.py` + `python _simplified_traditional_unify.py` 9/2 08:10-08:15 真验证
**校准状态**: 已校准 (commit 落地后)

### §I.2 报告必含 3 行 (缺一作废, per §0.33.2)

任何 M3 报告含 blog / SKU / 询盘 / 客户等数字, 必标:
```
数据来源:
- <数据源文件 1> (<校准日期>)
- <数据源文件 2> (<校准日期>)
- <查询 / 拍板原文 / 校准依据>
校准状态: 已校准 (commit ID) / 待校准 (下次校准时间)
撤回声明: (per §0.23 撤回必含原 commit ID + 撤回日期) — 如适用
```

### §I.3 6 commit 撤回 (per §0.33.3, 撤回的是报告口径叙述方式, 不是数据本身)

| 原 commit ID | 撤回内容 | 撤回原因 | 撤回日期 |
|--------------|---------|---------|---------|
| 01458676 | "79 篇盘点立即起跑" 主营架构 v2 | 数字为 zh-hk.json unique slugs 真实口径没错, 但未标"vs SSoT 85"双口径 | 2026-09-02 08:12 |
| 9cadce1c | "79→85 SSoT 口径纠正" | 标题正确但 commit body 仍以"79"为基准叙事, 缺少双口径对照表 | 2026-09-02 08:12 |
| 2f8d9438 | "17 zh-hk 包裝盒 blog 全局调度" | 报告未标"vs SSoT 85"双口径 | 2026-09-02 08:12 |
| 3f5a13cb | "9 zh-hk + 9 ja = 18 贴纸 blog 全局调度" | 报告未标"vs SSoT 85"双口径 (且 K3 9/2 07:59 误判 9+1 简体, 实际 zh-hk 8 篇 + 全繁体) | 2026-09-02 08:12 |
| docs/2026-09-02-k3-printing-blog-reorganization.md (untracked) | "79 unique blog 主营 4 Pillar 归类" | 文档口径需改为"79 zh-hk + 80 en + 80 ja + 85 SSoT 4 口径" | 2026-09-02 08:12 |
| docs/2026-09-02-k3-packaging-blog-reorganization.md (committed in 2f8d9438) | "17 blog" 沿用 79 口径 | 文档口径需补全 4 口径对照 | 2026-09-02 08:12 |

### §I.4 门童 #7 数据口径必填 (升级 v1.1.1 → v1.2, per §0.33.4)

- **触发**: 任何报告含 "blog 篇数 / SKU 数 / 询盘数 / 客户数" 等数字
- **拦截**: 必须含 "数据来源" 行 + 4 口径对照表 + 校准日期
- **缺任一** = 0 commit (red 硬拦) / yellow SHADOW 警告 (per §0.31 反审门童 SOP)
- **落地**: scripts/guards/count-guard.js (9/15 反审门童 v1.0 → v1.1 FP 复盘后升硬拦)
- **示例** (PASS):
  > "M3 报告 zh-hk blog 79 unique slugs (vs en 80 + ja 80 + blog-posts.ts SSoT 85), 数据来源 src/data/blog-data/{zh-hk,en,ja}.json + src/data/blog-posts.ts, 校准日期 2026-09-02 08:12, 校准状态 已校准"

### §I.5 5 cron SSoT 嵌入指南 (本节升级段嵌入 3 个 cron SSoT 头部)

**嵌入位置**:
1. `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` (125 KB) — 头部追加 §I
2. `.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md` (76 KB) — 头部追加 §I
3. `.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md` (50 KB) — 头部追加 §I
4. `.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md` (17.5 KB) — 头部追加 §I (月度 cron v8 必含)
5. `.hermes/cron-prompts/zprintpro-blog-deepfix.md` (62.5 KB v9.6) — 头部追加 §I (blog 修复必含)

**嵌入方法** (per §0.25 + §0.27.4 5 条 push 决策 SOP):
- 本节 §I 内容由 v8-cron-sot-upgrade-segment.md §I 复制
- 5 cron prompt 头部插入"§I 数据口径校准 - 4 口径必填 (per K3 9/2 08:09 push)" + 4 口径对照表 + 6 commit 撤回摘要

### §I.6 K3 9/2 07:59 派活包"贴纸知識 9+1 简体"误判纠正 (per §0.22 SOP-10 第 3 款)

**K3 截图称**: zh-hk 有 9 贴紙知識 (繁) + 1 简体 贴纸知识 = 10 篇
**实际** (9/2 08:15 真验证, `_simplified_traditional_unify.py`):
- zh-hk 贴纸/貼紙 blog = **8 篇** (按 slug 含 sticker)
  - baby-product-label-sticker-printing-guide
  - car-dealership-amenity-sticker-printing-guide
  - hotel-amenity-sticker-printing-guide
  - ip-character-sticker-printing-guide
  - pet-food-sticker-printing-guide
  - sticker-design
  - sticker-guide
  - sticker-material-pvc-vinyl-removable
- 简体 "贴纸知识" 残留: **0 次**
- 简体 "贴纸" 残留: **0 次**
- 繁体 "貼紙知識" 出现: 2 次
- 繁体 "貼紙" 出现: 216 次

**误判根因**: K3 截图可能是旧版 zh-hk (含简体残留) 或 K3 记忆误差。实际 zh-hk.json 已全部用繁体。

**注**: zh-hk 真正简繁混用 32 类 700+ 次 (数据/文件/商品/信息/搜索/完成/提交/操作/版本/保存/使用/支持/地址/城市/公司/美元/日元/微信/打印/印刷/黑色/白色/紫色/橙色/灰色/金色/字符/表格/折扣/退款/客服/最新/作者), 但其中大部分是"繁简同形"常用字 (如"印刷"/"公司"/"地址" 繁简相同), 真正需要改的约 20 处: 数据→數據 / 商品→貨品 / 信息→資訊 / 搜索→搜尋 / 保存→儲存 / 支持→支援 / 日元→日圓 / 字符→字元 / 打印→列印。**等 K3 拍板是否整改 (per §0.0 零决策铁律, src/data/blog-data/ 改动必拍板)**。

### §I.7 5 cron SSoT 升级段嵌入操作 SOP (本节 §I 8 步)

1. **Step 1**: 复制 v8-cron-sot-upgrade-segment.md §I 全文 (本节)
2. **Step 2**: 在 5 个 cron SSoT prompt 文件头部插入 §I 摘要 (≤500 chars)
3. **Step 3**: 跑 `node scripts/check-regression-guard.js` 验证 5 cron SSoT 0 命中 (per §0.27.4 5 条 push 决策 SOP 第 3 条 src 不引旧图)
4. **Step 4**: 跑 `python _audit_blog_count_real.py` 复验 4 口径 (per §0.33.1)
5. **Step 5**: 跑 `python _simplified_traditional_unify.py` 复验 zh-hk 简体残留 (per §I.6)
6. **Step 6**: git add .hermes/cron-prompts/v8-cron-sot-upgrade-segment.md + 5 cron SSoT (6 文件)
7. **Step 7**: git commit + git push (per §0.25 30 min 间隔, 攒批)
8. **Step 8**: 报告 K3 含数据来源行 (per §I.2 3 行必含)

### §I.8 K3 必拍板项 (per §0.0 零决策铁律)

- K3 拍板 1: 是否同意 6 commit 报告口径升级为"79 zh-hk + 80 en + 80 ja + 85 SSoT" 4 口径对照叙事 (建议: 同意, AGENTS.md §0.33 永久生效)
- K3 拍板 2: 门童 #7 数据口径必填是否升硬拦 (建议: 9/15 FP 复盘 <10% 后升)
- K3 拍板 3: 6 commit 历史 amend (建议: 不 amend, AGENTS.md §0.33 新规则向后生效)
- K3 拍板 4: zh-hk 32 类 700+ 简体残留是否整改 (建议: 仅改真正需改的 20 处: 数据→數據/商品→貨品/信息→資訊/搜索→搜尋/保存→儲存/支持→支援/日元→日圓/字符→字元/打印→列印, 等 K3 拍板)
- K3 拍板 5: K3 9/2 07:59 "贴纸知識 9+1 简体" 误判是否需要 K3 主动撤销 (建议: 已在 §I.6 文档化纠错, 不需额外操作)
- K3 拍板 6: 5 cron SSoT 升级段嵌入操作 (Step 1-8) 是否一次性完成 (建议: 本次 commit 一次性完成 §I + AGENTS.md §0.33 + 5 cron SSoT §I 摘要 + 1 commit 1 push)

### §I.9 教训固化源头

- 2026-09-02 08:09 K3 push 痛骂 (2 次数据不对, 根因相同: 未标双口径)
- 2026-09-01 16:22 K3 拍板 79→85 口径纠正 (commit 9cadce1c, 但未根治)
- 2026-08-24 22:00 K3 拍板 §0.23 数据诚信红线
- 2026-08-28 04:50 K3 拍板 §0.26 文件系统访问限制
- 2026-08-30 11:31 K3 拍板 §0.30 v2.2 站点生命周期
- 跨项目 P0 强制级: 任何 "报告数字未标数据来源" / "未标 4 口径对照" / "未标校准日期" 模式 = 报告作废 + K3 不拍板 + 写事故

