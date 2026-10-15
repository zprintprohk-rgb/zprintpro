# ZprintPro 三站点 SEO/AEO/GEO 首页排名深度分析 × Blog 飞轮增强方案（2026-10-15）

> **角色**: ZprintPro 首席 SEO/AEO/GEO 数据战略分析师（blog-deepfix 专员会话产出）
> **定位与叠加关系**: 本文档**不替代**也不重复排程 —— 排程层 SSoT = `docs/2026-10-15-two-week-execution-plan.md`（10/16-29 逐日排程）+ `docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md`（一月战略）+ `docs/2026-10-12-recovery-lane-defense-plan.md`（恢复模式）。本文贡献三层**增量**：① 本周日记事实底座；② **页面级（blog URL 级）新数据与新发现**（现有战略文档均无页面级表）；③ Blog 深度文 SEO+AEO+GEO **飞轮 v2 机制**（把已跑通的链路固化成 7 环闭环 + KPI）。
>
> **数据来源**（per §0.23 / §0.33，强制行）:
> - GSC 2026-10-15 档 xlsx（24h/7d/28d × 三站）：查询级转引 `.hermes/analysis/2026-10-15-gsc-blog-ranking-factsheet.md`（zh-hk/ja 完整、en 部分）；**页面级为主会话以 openpyxl 直接提取** → `.hermes/analysis/gsc-blog-pages-2026-10-15.json`（28d 窗 ≈ 09-15~10-12，数据止 10-12，龄 3 天；hk 48 行 / us 15 行 / jp 10 行 blog URL）
> - 恢复系数: `python scripts/gsc-cliff-detector.py` → `.hermes/logs/gsc-cliff-2026-10-15.json`（实时 97.2%，固定基线 585.2）
> - 12 段门禁台账: 门童 #14 pre/post 快照 `.hermes/_tmp_12seg_pre.json` / `_post.json`（校准 2026-10-15 18:4x，双方法：汇总行计数 + SEG 标签计数一致）
> - B1c 台账: `.hermes/logs/b1c-queue-progress.json`（10-15 12:55 版，5/8 DONE）；车道: `.hermes/logs/lane-status.json`（10-15 06:43）
> - 校准状态: 已校准（提取脚本 + 源 xlsx 文件名可复核）；en 查询级与全部「排名」列缺失处**不提供推算值**
>
> ## 双方法复算声明（§0.23.2）: ① 恢复系数 = gsc-cliff-detector.py（固定基线 585.2）与 e41458fe 批 10-14 读数 97.2% 同链复核；② 12 段 FAIL 56→54 = 汇总行（PASS 241→243 / FAIL 56→54）与 `rg -c "SEG"`（56→54）两种方法一致；③ blog 篇数 = JSON map keys（node）与 `"slug"` 计数（rg）交叉。

---

## §0 执行摘要（先结论）

1. **恢复进入第 2 个达标日**：实时 24h（10-14 01:00~10-15 00:00）569 展 / 19 击 = **97.2%**（基线 585.2）；三站 28d cliff_ratio hk 1.174 / jp 1.012 / us 0.957，无一站处于断崖。解除判定卡点不变：条件① 3/3 连续日（当前 1-2/3，取决于 10-14 读数是否已入账）、条件② 新 28d 档（现档数据止 10-12，**宣布解除当口必须用 10-29 导出重验**）、条件③ GA4 互证（待 K3）。
2. **页面级新发现（本文最大增量）**：blog 页面是**未被 W1 CTR 批覆盖的第二个 0 点击重灾区** —— zh-hk 28d 曝光前 6 的 blog 页合计 1,213 展只换 8 击（poster 435/4、food-packaging 219/0、book-buying 162/1、saddle-stitch 146/0、paper-bag 137/0、roll-up-banner 114/0）。类目页 CTR 批（10/22 首判）之后，**blog CTR 歼灭面应作为 W2-W3 的接棒主攻**（本文 §3 给出候选清单与纪律）。
3. **12 段达标率 81.1% → 81.8%**（56→54 FAIL，本会话修 poster zh-hk 2 条并全 12 段 PASS）；剩余 54 条 FAIL 高度收敛为 6 类模板化缺陷（案例 16 / E-E-A-T 14 / H2 问句 12 / 快速答案块 6 / 首段 3 / 比较表 3），可用「每批 ≤3 篇、同段型批量」的模板法在 3-4 个周六车道内清零。
4. **门禁冲突教训（当日实弹）**：12 段门禁的案例段「待 008 案例库校准」建议措辞会命中门童 #16（GSC 内部黑话禁入客户内容）——已实测 2 轮拦截后改用「內部客戶案例庫校準範圍」措辞通过。**建议规则同步**：门童 #14 的 fix 文案改为不含「008/待校準」字样（§5 建议 9）。

---

## §1 本周日记事实底座（10/09 → 10/15 时间线）

| 日期 | 事件（来源文件） | 对排名的意义 |
|---|---|---|
| 10-09 | 大脑周计划 + GSC 深审计（`2026-10-09-k3-brain-week-plan…` / `2026-10-09-gsc-deep-audit-and-strategy.md`） | 确立 8 个 T1 锁词 + 词类三层（带钱/大词/习惯词）框架 |
| 10-11/12 | 断崖诊断 v2 + 恢复防线（`2026-10-12-gsc-cliff-diagnosis.md` / `2026-10-12-recovery-lane-defense-plan.md`） | 定性 85/15 真降权；防护四机制上线；B1c 8 簇队列立项 |
| 10-12~15 | B1c 簇 1/2/3 + W1 CTR 批（b1c 台账 5/8 DONE） | 簇内相似度 0.955-0.98 → ≤0.55；类目页 title 进 50-57 带 + 幽灵价清毒 |
| 10-13 | 一月战略 SSoT（`2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md`） | 恢复解除三条件 + 分站词面矩阵 |
| 10-15 | **A2 CF CPU 治理**（3 commit，`2026-10-15-cf-workers-cpu-limit-root-cause-and-plan.md`） | middleware A/B 摘除 + 686 页 SSG 化 + routes 收窄；**TTFB 改善 + 爬虫全静态 = 技术面利好**；预渲染实验回退（6eb2aa1e），真预渲染移交 opennext 立项；A1 $5/月 Workers Paid 待 K3 |
| 10-15 | 两周排程 SSoT（5eaff496） | P0 年賀状 10/24 + B1c 清零 + 解除判定 10/29；blog B1-B8 排程 |

**车道健康**（lane-status 10-15 06:43）：daily-content / gsc-feedback 两个调度器 LastTaskResult=1、weekly-meta 10-09 MISSING + 调度器异常码 2147946720 —— 内容生产在跑（B1c 台账推进正常），但**调度器级故障会威胁解除判定所需「连续 3 日断崖检测」的证据链**，建议随 10/29 年检一并修复（§5 建议 8）。

---

## §2 三站点首页排名目标（数据锚点 → 页 1 路线）

> 目标口径：28d 展示 ≥40 且 pos ≤16 的词按「两周内 top10 / 四周 top5」设定；pos ≥20 的词先「进 15 再谈页 1」。承接页改动全部遵守恢复模式红线（title churn 冻结至 10/22 验证窗后、门童 #27/#29、相似度 ≤0.55）。

### 2.1 zh-hk（智印港）——从「守首页」到「吃 CTR」

| 词 | 28d 展/pos | 页 1 路线（承接资产） | 目标 |
|---|---|---|---|
| 海報印刷 | 217/13.8（24h 曾 8.9-10.0） | 簇 6 a1↔a2 posters 重写 + poster pillar（**本日已 12 段全 PASS**）双内链 hub | 两周 top10 |
| 食品包裝印刷 | 118/9.8 | 已在页 1，纯 CTR 问题 → 10/22 判后 desc/FAQ 钩子强化 | top5 + CTR>2% |
| 月曆印刷 | 102/16.1 | 簇 7 calendars 族 + B5 月曆訂製指南（10/21） | 两周 top12→10 |
| 利是封印刷 | 61/17.6 | 簇 2 已重写 red-packets 族 + B4 馬年利是封指南（10/27） | Q4 峰值前进 top10 |
| 貼紙印刷 | 139/28.7 | 簇 1 已重写待重爬 + 貼紙承接页强化（10/19，不动 title） | 四周 ≤15 |
| 宣傳單張印刷 | 95/21.8 | 簇 3 已重写 flyers/posters + 互链 | 四周 ≤15 |
| 紙袋印刷/印刷紙袋 | 76+73/7.3 | **页 1 但 0 点击** → CTR 批验证窗 10/22 首判 | CTR 0→≥3% |
| 書刊印刷/包裝盒印刷/紙盒印刷 | 78/46/41 展 pos 30± | 中期：B1c 簇 5-8 + pillar 内链密度 | 进 top20 |
| 品牌词 智印港 | 21 展/**15 击 pos 1.62 CTR 71.4%** | 守（品牌护城河已成立） | 维持 pos 1 |

### 2.2 en（ZprintPro）——守 top5 修复断崖伤 + 开荒

| 词 | 数据 | 动作（两周排程锚点） | 目标 |
|---|---|---|---|
| china catalog printing | 24h 4 展 pos 6.0（28d 38.2 为软化残值） | 10/26 承接页差异化 + 中国工厂直发 E-E-A-T | top5 |
| small batch label printing | 24h 2 展 pos 9.0 | small-batch 簇内链 + label B2B 入口词覆盖 | top5 |
| saddle stitch booklet（族） | 4.2→11.7 断崖伤 | 10/25 PDP 正文深度 + FAQ 保鲜 | 回 ≤6 |
| calendar sizes | 23 展 pos 38-44 | B6 fact-table 直答页（AEO 精选摘要目标） | 进 top15 + featured snippet |
| corporate holiday cards | 0 展开荒 | B7（10/28，Q4 时间窗内容） | 30 天内出展示 |
| a2 poster | 24h pos 1.0 | 守（小样本固化观察） | 维持 |

### 2.3 ja（ZprintPro）——两个季节死线压倒一切

| 词 | 28d 展/pos | 动作 | 目标 |
|---|---|---|---|
| コミケ 印刷 | **185/19.6（ja 第一词，0 击）** | C107 专题 10/24 ja + 10/25 en（提前 8 周布局） | 12 月上旬进首页 |
| クラフト紙 パッケージ印刷 | 108（56+52）/25± | 簇 5 kraft↔eco 重写（10/16-17） | 两周 ≤15 |
| 燙金利是封 | 23/**1.0** | 守 pos 1（zh 簇 2 红利外溢到 ja 查询，说明族内链起效） | 维持 |
| 社名入りカレンダー 少量注文 | 9/8.6 | 簇 7 + 「少量」规格词覆盖 | top5 |
| 年賀状（簇） | 0 展开荒 | **10/22-24 页+blog 上线（10/31 早鸟截单）；报价真值 = 唯一阻塞（K3 待办）** | 12 月出展示 |
| 教科書 印刷 | 22/37.6 | churn 盯梢 + 教材製本承接 | 中期 |

---

## §3 页面级新发现：blog CTR 歼灭面 + 跨站泄漏

### 3.1 zh-hk blog 28d 曝光榜（10-15 档，全部 0-1 点击 = 第二个 CTR 灾区）

| blog（zh-hk） | 28d 展 | 击 | CTR | 12 段状态（门童 #14） |
|---|---:|---:|---:|---|
| poster-printing-guide | **435** | 4 | 0.9% | **本日修至全 PASS**（案例段+E-E-A-T 补齐） |
| food-packaging-printing-guide | 219 | 0 | 0% | 不在守门 9 长文清单（建议纳入 E0 扩容审计） |
| book-buying-guide | 162 | 1 | 0.6% | 同上 |
| saddle-stitch-booklet-printing-guide | 146 | 0 | 0% | 同上 |
| paper-bag-printing-guide | 137 | 0 | 0% | 同上 |
| roll-up-banner-printing-guide | 114 | 0 | 0% | 3 FAIL（seg3/6/7） |
| sticker-buying-guide / rush-printing-hk-guide | 83/81 | 0/3 | — | 同上 |
| 2027-monthly-calendar-printing-timetable | 46 | 0 | 0% | 同上 |

**洞察与纪律**：① 与类目页同病（展示不缺、钩子不灵），但 W1 CTR 批只修了 3 个类目页 —— blog 面是天然接棒面；② **10/22 验证窗前冻结一切 title 字段**；窗后按 W1 同款根因法（截断/假价优先）逐篇修，优先 poster（435 展）与 food-packaging（219 展 0 击）；③ 未入守门清单的 6 篇高曝光 blog 建议做一次 12 段审计（E0 扩容模式，见 2026-09-20 审计先例），预期又会「让门禁看见真问题」。

### 3.2 跨站泄漏观察（低优先但应挂账）

jp 站 28d 页面行里出现 `zh-hk/textbook-printing-guide`（18 展）与 `zh-hk/doujin-circle-printing-guide` 等 zh-hk URL —— Google 日本在用 zh-hk 页应答日语查询。说明 ja 对应主题（教科書/教材）承接薄弱，属于**内容缺口信号**而非 hreflang 故障（待千问 P0 hreflang 复核结论合并判断，不擅自修）。

### 3.3 blog 存量 4 口径对照（per §0.33.1，校准 2026-10-15）

| 口径 | 数量 | 说明 |
|---|---:|---|
| zh-hk.json map keys | **100** | zh-hk 真实页面内容 |
| en.json map keys | **101** | en 真实页面内容 |
| ja.json map keys | **100** | ja 真实页面内容 |
| blog-posts.ts SSoT distinct slugs | **109** | 注册表（含 3 locale 衍生与待同步项） |

> 注：§I.1（2026-09-02 校准 79/80/80/85）已过时——三周内容生产使全量 +20%；本表为当前新口径，报告引用 blog 篇数一律以本表为准。已发现 1 处 SSoT 漂移登记：hk-cost-baseline blog-posts.ts meta「99 SKU」vs 正文「82 SKU」（本会话零改文案不擅动，建议随该篇下次批次修正 meta 数字）。

---

## §4 Blog 深度文 SEO+AEO+GEO 飞轮 v2（7 环闭环 + KPI）

> 已跑通部分（B1c 三簇 + W1 + 本日 poster 修复）证明这条链有效；v2 把它固化成**每环有输入/输出/门禁/KPI** 的闭环，使周六车道与人手批都能按同一机器口径执行。

| 环 | 动作 | 门禁（机器判据） | KPI |
|---|---|---|---|
| ① 选题 | GSC 页面级 imps 榜 × 12 段 FAIL 榜交叉排序；恢复期题材优先 B1c 簇/Q4（利是封/年賀状/holiday cards/日历） | 幂等：git log + b1c 台账 + 12seg 基线查重 | 每篇入选都有「imps 或 FAIL」双依据 |
| ② 生产 | 12 段骨架 + 快速答案块（≥3）+ 比较表（≥2）+ FAQ 4-8 组 40-80 词胶囊 + GEO【】原子 ≥12 + 段落 ≤3 行 | 门童 #14 全段 PASS；#29 去毒；FAQ 格式预检 8/8 | 单篇 12/12 |
| ③ 合规 | 数字只出 products.ts/K3 拍板；E-E-A-T（Person 生成层 + LinkedIn + FDA + EU REACH 正文侧）；案例聚合口径不编造 | 门童 #1/#16（**禁「008/待校準」字样入客户内容**）+ brand/gsc-leak | --commit EXIT=0 |
| ④ 结构 | hub-spoke：每篇 ≥2 条簇 hub 内链，锚文本用 GSC 实证词（如「海報印刷」217 展首位词）；slug 存在性前置校验 | S2 门禁 + seg11 ≥10 达标锚 | hub 链 ≥2/篇 |
| ⑤ 重爬 | sitemap lastmod 实更 + IndexNow 提交（200 log） | IndexNow 200 | 上线即提交 |
| ⑥ 度量 | 28d 页面级 imps/CTR 对账（本文 §3 表即首个样板）→ 回灌下轮选题 | 数据来源行 + 双方法 | 周更页面榜 |
| ⑦ AEO/GEO 外环 | AI 盲测基线（10/28，5 商业词 × 3 引擎）、Bing 对账、Speakable/HowTo 由 page.tsx 生成区保证（seg12 --online 断言） | seg12 --online 全 6 块 | 引用率季比 |

**worked example（本日 poster zh-hk）**：选题①（435 居首 × 2 FAIL）→ 生产②③（±2 行手术；Jaccard 0.064；#16 两轮拦截修正）→ 结构④（hub 链 ×2「海報印刷」）→ 度量⑥（post 榜已入档）→ ⑤⑦ 随部署完成。**单篇全程 ≈ 55 分钟**（含两轮门禁对抗）。

**剩余 54 FAIL 清零排期建议**（并入两周排程的周六槽，每批 ≤3 篇）：模板化修法 = 案例段模板（聚合口径 + 內部案例庫措辞）+ E-E-A-T byline 模板 + H2 问句改写 + 首段压缩 + 补表。优先序：roll-up-banner zh（114 展）→ school-exercise-book ×3（15 FAIL 最大簇）→ hong-kong-cost-baseline ×3（13 FAIL 钱页面）→ 其余。

---

## §5 增强建议清单（NEW = 现有两周排程未覆盖；ALIGNED = 已有锚点）

| # | 建议 | 类 | 落点 |
|---|---|---|---|
| 1 | **Blog CTR 歼灭批 2**（10/22 验证窗后启动，poster/food-packaging/saddle-stitch 优先） | NEW | W2-W3 接棒主攻 |
| 2 | 高曝光未守门 blog（food-packaging/book-buying/saddle-stitch/paper-bag 等 6 篇）做 12 段 E0 扩容审计 | NEW | 下个周六车道 |
| 3 | 剩余 54 FAIL 模板化清零排期（§4 优先序） | NEW | 周六 blog-deepfix 槽 3-4 批 |
| 4 | jp 站 zh-hk URL 泄漏观察挂账，与千问 hreflang 复核合并判断 | NEW | 10/29 年检 |
| 5 | blog 篇数 4 口径新基准（100/101/100/109）写入 §I.1 替换旧表 | NEW | 下次 cron SSoT 触碰时 |
| 6 | hk-cost-baseline meta「99 SKU→82 SKU」数字校准（title 带宽不变，纯数据修正） | NEW | 随该篇批次 |
| 7 | 恢复解除判定用 **10-29 当日新导出** 重验条件②（现档止 10-12，判定当口会再次 STALE） | ALIGNED+收紧 | 10/29 年检 |
| 8 | daily-content/gsc-feedback 调度器 LastTaskResult=1 与 weekly-meta 异常码修复（威胁解除证据链） | NEW | 10/29 前 |
| 9 | 门童 #14 的 seg6 fix 文案去掉「008/待校準」字样（与 #16 冲突，本日实测 2 轮拦截）+ 同步 rule-translation-guard --stamp | NEW | 下次守卫批次 |
| 10 | A2 治理红利兑现：全静态 686 页 + TTFB 改善后，**GSC 抓取统计（Crawl Stats）一周对比**应入 10/29 年检，验证爬虫预算改善 | NEW | 10/29 年检 |

## §6 风险与红线（重申）

- **12 月 Google 更新窗口**前全站必须保持绿（相似度 ≤0.55 + 门童全量）——恢复不等于免疫（10-13 战略 §1.2 时间归因纪律）。
- **title churn 冻结至 10/22**；验证窗内任何被验页字段不碰（两周排程 §2 已列）。
- 名片展示层 (a)/(b)/(c) 未裁决：不建页、不动贺卡资产、不动 middleware 301（§0.0 解禁块）。
- 数字诚信：本报告所有数字均有 §数据来源行对应文件；无来源数字零容忍（§0.23/§0.28.8.1）。

## §7 本会话验收账（blog-deepfix 交付）

| 项 | 结果 |
|---|---|
| 目标篇 | poster-printing-guide zh-hk（GSC 28d 435 展，守门清单内未达标第一名） |
| 修复段 | seg6 客戶案例（聚合口径，零编造）+ seg7 E-E-A-T（LinkedIn + FDA 21 CFR 175.300 + EU REACH 1907/2006） |
| 12 段 | zh-hk/poster **段 1-12 全 PASS**（段 12 离线 SKIP，--online 待部署后复验）；全库 FAIL 56→54，**零新增** |
| 相似度闸门 | 8-gram Jaccard WORST **0.064** ≤0.55（红线 0.60） |
| 存量口径 | blog-standard-guard 112→112 / internal-links-cta-guard 3→3（0 新增）；tsc 54=54；diff ±2 行 |
| push | 5def68d2 @ 10-15 ~19:2x（距上次 13:38 ≫30min；攒批含 6eb2aa1e A2 回退 + 5eaff496 两周排程） |
| 残留登记 | poster en/ja seg6/7 ×4；54 FAIL 分布 §4；99/82 SKU meta 漂移；#14/#16 措辞冲突 |
