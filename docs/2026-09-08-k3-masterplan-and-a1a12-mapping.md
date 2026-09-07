# K3 指令拆解纪要 + 执行总计划（2026-09-08 autoclaw 执行层）

> **执行层**: autoclaw（K3 9/8 05:58 拍板 M3 出局，autoclaw+deepseek hermes 接棒，规则 SSoT=2026-09-08-title-rules-and-deep-blog-standard.md）
> **基线**: v4.0 全站对齐主报告（9/8 05:06）+ v8 SEO 路线图 + campus pillar go/no-go 简报 + 标题规则 SSoT v1.0，四份均 2026-09-08 版
> **代码基线**: HEAD c6c5475a（9/8，贺卡买指南三语重写）· 工作区含多车道未提交改动（AGENTS.md 等，本次不动）
> **当前窗口**: 8/30 批验证窗内（9/5-9/12）→ title/keywords 只读，H1/body/FAQ/内链可做

## 一、四份基线研读纪要（一句话版）

| 文件 | 性质 | 核心结论 |
|------|------|----------|
| v4-full-alignment-master-report.md | 五视角裁决主报告 | K3 指令本体=A1-A12 原子指令序列；词图 v4.1 五梯队（G1 捡钱/G2 攻坚/G3 跨境/G4 地基/G5 季节）为排名基线唯一权威；M1 验收口径 7d clicks 12→≥25、首页词→≥8、询盘≥2/周 |
| v8-seo-roadmap.html | 三语带钱词地图+12 月路线图 | T1/T2/T3 分层 × zh-hk/en/ja 词表 + M1-M12 里程碑 KPI（T1 前3 8/10、月询盘 50+）；ja 缺口=PLP/PDP 正文深度不足 |
| campus-pillar-gonogo-brief.md | D-9/2-24 拍板简报 | 建议有条件 go：9/8-9/14 launch cron（en 速赢词 pos 7.29 优先→ja 343 imps 承接→hk 攻坚），10/4 14 天回看复核降级线 |
| title-rules-and-deep-blog-standard.md | 规则 SSoT v1.0 | 标题四元素+字符当量体检+长尾 3 筛选+跨语言污染 P0；深度 blog 12 段骨架+12 铁律；验收三层闸门（门童全量→三闸门→5 步真验收） |

## 二、K3 指令逐条映射（v4.0 §8.1 A1-A12 → 本轮执行）

| # | K3 原指令 | 本轮处置 | 状态 | 证据/产物 |
|---|-----------|----------|------|-----------|
| A1 | K3 拍板包 4 项（门童解除/GA4 G-XXXX/GBP 状态/摘果第二波放行） | 待 K3 真人拍板（见 §四问 K3 清单） | ⏳ 待 K3 | 本文件 §四 |
| A2 | 摘果第二波成品稿（大信封/a2 海報/荧光贴纸） | 主线完成裁决与成品稿：a2 海報 9/4 批已达标（实测「A2 海報印刷 1張起印 HK$9起 即日交貨…」含价格锚）；公司信封 pos 1.0 按裁决同页锚文本承接不改 title；fluorescent en H1「Fluorescent Stickers 100+ | Neon UV」已带钩；**大信封 category 页 title 已在 9/3 R2 批落地（「大信封印刷 100個起・C4/C5/DL・急件即日・DHL 全球 2-4 天」，实测 src/lib/seo.ts）正在 9/14-15 验证窗内→PDP 不重复上主词（防簇内互踩+title 2-4 周冻结纪律）**；价格锚实取 products.ts：HK$0.22-5.20/個・MOQ 100 | ✅ 成品稿 | 本文 §三 + changeset 文档 |
| A3 | M3 上线摘果第二波（sku-seo-data.ts title/desc） | 裁决改道：title 类动作均已在窗或达标，本轮改为落地合规动作=**envelopes+calendars 品类专属 FAQ**（窗内 FAQ 允许；大信封 G1 摘果的富摘要弹药+月曆 G5 死线服务） | ✅ 已落地 | src/data/product-faqs.ts + changeset 文档 |
| A4 | SKU FAQ 空数组普查脚本+清单落 .hermes | 已派 Agent 执行（主线预演：sku-seo-data.ts 84 条目=21 空数组/63 非空，部分非空为 CSV 转换伪影待全量确认） | 🔄 执行中 | .hermes/sku-faq-empty-census-2026-09-08.json（待回收） |
| A5 | 9/10 GSC 校准+九篇抓取状态记录 | 需 GSC UI 人工操作（URL Inspection 逐条），autoclaw 无 GSC 账号权限 | ⏳ 交接 K3/M3 | v4.0 §2.3 补数命令已就绪 |
| A6 | top 10 SKU FAQ 填充（按普查×9/3 imps 排序） | 第一批已落地：envelopes/calendars 品类专属 FAQ 8 组×3 locale（等 A4 清单回收后出 top10 填充批） | 🟡 首批 done | changeset 文档 |
| A7 | 月曆旺季补强收尾（死线 9/15） | calendars 品类 FAQ 已落地（含交期/成本/定制问答，Q4 排产话术按 products.ts 实锚）；H1 季节强化 6dcfbb67 在位；剩余动作=内链与 FAQ schema 收录验证 9/12-15 | 🟡 收尾中 | changeset 文档 |
| A8 | 8/30 批 CTR 判定（9/12 导出/9/13 报告） | 按期执行：导出同口径 GSC 31 词+food-boxes 3 locale 对比 | ⏳ 排期 9/12-13 | 9/12 需 GSC 导出 |
| A9 | 门童 147 cases 回归+FP 报告（9/14） | 按期执行；FP 过关则 9/15 升硬拦 | ⏳ 排期 9/14 | 147 cases（b8752dad）在库 |
| A10 | AI 探针首轮 20 prompt（9/15） | 设计包已派 Agent：20 prompt（zh 8/en 6/ja 6）+台账模板+SOP | 🔄 执行中 | subagent_04 → docs 探针包 |
| A11 | M1 联合验收（9/16） | 按期执行 | ⏳ 排期 9/16 | 本文件=预验收基线 |
| A12 | Track B 周五槽位 B1 貼紙支撑内容 1 篇 | 按期执行（12 铁律+门童过检） | ⏳ 排期 9/12 | — |

**补充并行任务（本轮新开）**：R1 竞品对标（v4.0 §5.4 指定 e-print/Vistaprint·MOO/Raksul·グラフィック·PrintNet）已派 Agent 🔄；三语词图 v4.2 整合已派 Agent 🔄。

## 三、摘果第二波成品稿（A2 交付）

**裁决链**（title 冻结纪律优先，证据齐全后才动）：

| 词 | GSC 现状 | 现有 title 实测 | 裁决 |
|----|----------|----------------|------|
| 大信封 | 28d pos 3.1/48 imp/0 click | category 页（9/3 R2 批）：「大信封印刷 100個起・C4/C5/DL・急件即日・DHL 全球 2-4 天 \| 智印港」✅ 已含主词+数字钩+工艺锚 | **不改**（9/14-15 窗判定；PDP「大號信封 \| 雙面印刷 多規格」以品类词差异化，防同词双页互踩） |
| a2 海報 | 7d pos 1.0/3 imp | PDP：「A2 海報印刷 1張起印 HK$9起 即日交貨 印海報一張小訂單適用 \| 智印港」✅ | **不改**（已达标，窗内冻结） |
| 公司信封 | 7d pos 1.0/3 imp | 同信封页，v4.0 裁决正文锚承接 | **不改** |
| fluorescent stickers | 7d pos 6.9+6.0/8+3 imp | en H1「Fluorescent Stickers 100+ \| Neon UV」+ body 已带钩（9/4 批） | **不改**（8/29 批窗内）；spec 段加荧光材质段列入 9/14 后候选 |

**价格锚实取（禁编造）**：信封品类 4 SKU `price_range` HK$0.22-1.80 / 0.38-2.60 / 0.60-3.40 / 1.15-5.20，MOQ 100（products.ts 实测）；月曆品类 HK$3-8/本、柯式 500 本起（calendars 6 SKU 同价带）。

## 四、问 K3 清单（继承 v4.0 §8.2 八项 + 本轮新增两项）

1. GA4 G-XXXX 衡量 ID（BLOCKED 5 天+，9/8 内必给）
2. GBP 提交状态回执
3. 门童冻结解除条件确认（建议：解除新增+9/15 升硬拦前过 FP 复盘）
4. 008 轻量计数器现状数据（零询盘 vs 链路未通）
5. PK-003 价格口径（basePrice 2.5 vs title HK$4 起；普查 Agent 正在二次取证原文）
6. 双域名品牌归一进度
7. en china/factory-direct 预算（9/30 截止）
8. 觀塘 MTR 交收点表述确认
9. **【新增】SKU faqs 字段无消费方**：PDP FAQPage schema 实际由 product-faqs.ts 品类映射驱动，sku-seo-data.ts 的 faqs 数组（84 条）当前不渲染——普查后 top10 SKU FAQ 填充应落在 product-faqs.ts（品类/SKU 级映射）或补渲染链，K3 定架构方向
10. **【新增】push 确认**：本次改动已本地 commit（可独立回滚），push=触发 CF Pages 生产部署，按 Goal 口径待 K3 确认后推

## 五、里程碑排期（9/8-9/16 冲刺 + M2 概览）

| 日期 | 动作 | 依据 |
|------|------|------|
| 9/8（今） | 四基线研读+K3 拆解✅；品类 FAQ 落地✅（三闸门验证）；词图/竞品/普查/探针 4 Agent 并行；campus go/no-go 建议呈报 | A1-A7 |
| 9/9 | Agent 产物回收整合（词图 v4.2/竞品 R1/普查清单/探针包）→ docs；campus launch cron 拍板呈报 | A4/A10 + campus 简报 |
| 9/10 | GSC 校准日（K3 人工）：九篇抓取状态+BC 旧 URL 404 复核 | A5 |
| 9/11 | top 10 SKU FAQ 填充（A4 清单×imps 排序）；月曆收尾 | A6/A7 |
| 9/12 | 8/30 批 CTR 判定导出；Track B B1 貼紙支撑内容 | A8/A12 |
| 9/13 | CTR 判定报告+title v2 清单→K3 放行 | A8 |
| 9/14 | 门童 147 回归+FP 报告；title v2 首批（若放行） | A9 |
| 9/15 | 月曆死线清零；AI 探针首轮（20 prompt 基线）；门童升硬拦（若 FP 过） | A7/A10 |
| 9/16 | M1 联合验收：clicks≥25/首页词≥8/询盘≥2 周三线对照；M2 签发 | A11 |

**M2 概览（10/31 前）**：转化区块 26→31（menus en、greeting-cards en/ja）+ ja 教材专题页 + 竞品 R1 差距修复执行率 ≥80% + v8 M2 内容扩展（4 篇指南/每 SKU FAQ 12 问）。

## 数据来源
- 四份 2026-09-08 基线文档（docs/）；GSC=9/3 canonical JSON（gsc-fresh-2026-09-03.json）
- 代码实测（本轮）：src/lib/seo.ts、src/data/sku-seo-data.ts（84 条目 faqs 普查）、src/data/products.ts（envelopes/calendars 价格与 MOQ 字段）、src/app/[locale]/product/[slug]/page.tsx（FAQ 渲染链）、scripts/csv-to-sku-seo.mjs（CSV 生成链）
- git 实证：c6c5475a HEAD；70afd65c（R2 3 词 seo.ts）；f5d50092（9/4 P0-1 批）；31d0f3ce（M1 category 区块）
