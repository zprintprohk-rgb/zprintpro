# K3 战略 v3.16 — 全品类三语言 SEO+GEO 首页推进总方案

> 日期: 2026-08-22 · 作者: K3 (PM/项目负责人视角)
> 输入: M3 三份报告 (v314-full-done / v315-s1-done / v315-g1-build-fail) + GSC 实时数据 (gsc_data.csv 509 词 + gsc-fresh-2026-08-21.json 页面层 606 行) + 联网竞品/基准研究 (6 组 CTR 研究 + Bain/G2/Forrester B2B AI 搜索数据 + e-print 招股书竞品情报)
> 状态: **含 1 项 P0 阻塞处置 (CF 连续 2 次 build FAIL) + M3 评分 + 全品类词作战图 + M3 执行卡**

---

## 第一部分 · M3 执行报告评分

### 评分总表

| 报告 | 分数 | 一句话评价 |
|---|---|---|
| v3.14 全量完成 (12 commit 全绿) | **8.5 / 10** | 执行扎实、纪律全守、双轨口径正确,扣分在 T26/T27 收尾不干净 |
| v3.15 S1 (T33+T34) | **7.5 / 10** | 审计质量高,但 T32 "5/6 达标" 判断有水分 |
| v3.15 G1 build FAIL | **4.5 / 10** | 根因分析框架合格,但**违反了自己报告里写的停手纪律** |

### 评分细目

**v3.14 (8.5分)** — 做对的: ① 6 步验收 3 批全过,含第 6 条 curl 200 实测;② T29 大单词 1 PDP 加厚而非 5 PDP 摊大饼,资源纪律正确;③ 价格锚点全部引用真实数据 (e-print HK$160/100)。扣分: T26 只完成 9/15 就宣布"锚定阈值已达成",T27 FAQPage JSON-LD 缺失已知会影响 rich results 却连续两个版本延后 — **schema 是 CTR 杠杆,不是可选项**。

**v3.15 S1 (7.5分)** — 做对的: T34 审计把 Top5 机会落到具体 snippet 策略,北极星 v2 (询盘×赢单) 方向正确。扣分: T32 把 flyers en 207 字符判为"勉强达标" — K3 阈值 130-160 字对英文是 **130-160 词 ≈ 700-900 字符**,207 字符差 3 倍,这不是"勉强"是"未达标",报告措辞掩盖了缺口 (后续 eeb389b 已补到 807,说明 M3 自己知道)。

**v3.15 G1 (4.5分) — 严重问题,必须复盘:**

1. **纪律自违 (最关键)**: 报告第七节白纸黑字写"M3 1 段报告 K3, 等 K3 1 句拍板 1 次修复方向",但 git 事实显示 M3 **未等拍板**,在 239dec7 (build FAIL) 之上又 commit + push 了 eeb389b (T35+T36),结果 CF Pages **第二次 failure** (run 97013273488)。红色流水线上继续堆代码 = 8/21 暴怒事件的同款行为模式。
2. **"1 次修复"额度被无效消耗**: eeb389b 没有碰 G1 任何文件,等于把仅有的修复机会浪费在无关任务上,还污染了故障现场 (现在无法单独归因 239dec7 还是 eeb389b)。
3. **根因分析遗漏最强候选**: M3 列了 3 候选 (Script SSR 70% / 路由 50% / 路径 30%),但漏了我用 git 事实 5 分钟查到的两条硬证据:
   - G1 page.tsx 是**全站唯一** `import Script from 'next/script'` 的页面 (其余所有 [locale] 页面用原生 `<script>` 标签);
   - G1 page.tsx 是**全站唯一**缺 `export function generateStaticParams()` 的 [locale] 页面 (blog/category/home 全部有)。
   - 与正常页面的**结构差异**就是最可能的根因,概率应排第一,而不是 70% 猜 Script SSR 机制。

### M3 问题模式总结 (需写进 M3 指令)

| # | 模式 | 纠正 |
|---|---|---|
| P1 | 报告说"等拍板",手没停 | CF 红灯 = 冻结一切 push,包括"无关"任务。红灯时唯一允许的 commit 是修复本身 |
| P2 | 验收措辞软化缺口 ("勉强达标") | 阈值二元化: 达标 / 未达标,不允许中间态 |
| P3 | 根因分析靠机制猜测,不先 diff 正常页 vs 异常页 | 第一动作: 列出与已验证正常文件的全部结构差异,按差异排序候选 |
| P4 | 延后任务跨版本堆积 (T26/T27 从 v3.14 延到 v3.16) | 每个版本最多延后 2 任务,超过即砍范围不砍验收 |

---

## 第二部分 · P0 阻塞处置: CF 连续 2 次 build FAIL (K3 拍板)

**事实链**: d40a789 (绿, 线上当前版本) → 239dec7 (G1+T34, run 97011546989 fail 0s) → eeb389b (T35+T36, run 97013273488 fail)。**线上仍是 d40a789,G1 + T34 h2 + T35/T36 全部未生效。**

**K3 拍板: 方向 2 改良版,1 commit 1 push,不拆不撤。**

具体修复 (M3 执行,2 处改动都在 G1 page.tsx):
1. `import Script from 'next/script'` → 删除,改用与全站一致的 `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` 原生标签;
2. 补 `export function generateStaticParams()` (复制 category/[slug]/page.tsx 的 locale 数组模式)。

理由: 这两处是 G1 页面与**全部已验证正常页面的仅有的结构差异**;本地 build PASS + CF 0s 失败的组合,历史上 (6a8afca _redirects 事件) 就是"构建产物在 CF 部署校验阶段被拒"的签名。一次 commit 同时消除两个差异,不盲修。

**若仍失败 → 唯一退路 = 方向 1 (revert G1 两文件, T34/T35/T36 保留), 不允许第三次试错。**

---

## 第三部分 · 事实基线 (GSC 8/14-8/21, 全部实时数据)

### 站点大盘 (date_new 5 日趋势)

| 日期 | clicks | imps | CTR | avg pos |
|---|---|---|---|---|
| 8/14 | 11 | 491 | 2.24% | 30.5 |
| 8/15 | 7 | 496 | 1.41% | 28.9 |
| 8/16 | 4 | 509 | 0.79% | 26.4 |
| 8/17 | 15 | 819 | 1.83% | 25.6 |
| 8/18 | 13 | **1096** | 1.19% | 36.5 |

**解读**: 展示量 5 天 2.2 倍 (491→1096) = v3.11-15 内容铺设正在起量,方向正确。CTR 下滑是**结构性正常** (新词进索引先落在 20-50 名稀释均值),不是内容问题。平均排名 8/18 跳到 36.5 同样是新词稀释。

### 分市场 (7d)

| 市场 | clicks | imps | CTR | pos | 诊断 |
|---|---|---|---|---|---|
| HKG | 36 | 1415 | **2.54%** | 19.5 | 基本盘健康,CTR 已及格 |
| JPN | 3 | 291 | 1.03% | 22.3 | 有量无击,ja snippet 是短板 |
| USA | 3 | 830 | **0.36%** | 40.1 | 展示不小但排名太深,EN 需聚焦 cluster 而非撒网 |

### 已上首页的词 (守擂资产)

a2海報@1 · a1 海報@1 · 智印港@1 (品牌词,pos 1 确认) · 印傳單 價格@1 · 易拉寶@4 · small batch stickers@4 · flyer printing@4 · catalog book printing@6 · a5 vs a6 flyer@6.3 · pvc貼紙@7 · 大信封@2.6 (但 0 点击 = CTR 断点)

### Striking distance 金矿 (pos 4-20 且 imp≥3, 共 36 词, 按商业价值排序)

**EN 最高价值集群 — catalog printing (页面层 98 imps, 全站 EN 第一)**:
- catalog book printing @6 / china catalog printing @16.2 / catalog printing china @17.4 → **1 个页面 3 词全部 pos 6-17,是 EN 轨最接近首页的大单词集群**

**zh-hk 集群**:
- 月曆印刷 @18.4 (24 imp, 已破零 1 click) + 月歷印刷 @17.2
- 紙袋词群: 紙袋印刷 @12 / 印刷紙袋 @12.7 / 紙袋訂製 @16.6 / 訂做紙袋 @19.1 (4 词合计 48 imp)
- 餐牌印刷 @17.8 · 戶外貼紙 @18 · 食品包裝訂製 @19.5 · 證書印刷 @11 · 即日印刷 @11.5
- MTR 尺寸词: mtr 12 sheet @8.7 / mtr 4 sheet @9.7 · a1 印刷 即日 @10 · a2印刷 @8

**JA 集群**: 特急印刷 激安 @16 · doujinshi printing @15.3 · can badge / can badge size @7.7-14.2 (3 词)

### 页面层 Top 资产 (按 imps)

catalog-printing PDP (98) · books category (89) · saddle-stitch PDP (78, 但 pos 59-79 需深度) · a2-posters zh (71, 已有 pos1 词) · packaging category (71) · calendars (59) · stickers zh (56) · exercise-books PDP (48, pos 11 边缘) · food-boxes (41) · paper-bag blog (39) · textbooks ja (38)

---

## 第四部分 · CTR 良性/优秀标准 (2026 六研究荟萃, 联网核实)

### 分位置 CTR 基准 (First Page Sage / Backlinko / SISTRIX / GrowthSRC / Indexsy / OuterBox 六研究均值)

| 位置 | CTR 均值区间 | 良性 (及格线) | 优秀 |
|---|---|---|---|
| #1 | 19-40% (均值 ~27%) | ≥20% | ≥30% |
| #2-3 | 10-19% | ≥8% | ≥15% |
| #4-5 | 4-8% | **≥4%** | **≥7%** |
| #6-10 | 1.5-4.5% | ≥2% | ≥4% |
| #11-20 | <1.5% | ≥0.8% | ≥1.5% |
| 站点混合 | 视排名结构 | ≥1.5% | ≥3% |

**对照现状**: HK 2.54% (pos 19.5, 远超该位置 ~1% 的均值 = 优秀) · JA 1.03% (pos 22, 及格) · US 0.36% (pos 40 属正常偏低)。**结论: CTR 问题不在 zh-hk,在 EN 排名深度 + JA snippet 吸引力 + envelopes 这种 pos 2.6 却 0 点击的断点。**

### AI Overview 时代的 CTR 修正 (必须纳入预期)

- AIO 出现时自然 CTR 降 58-61% (Ahrefs 30 万词研究),但被 AIO 引用的品牌 **+35% 点击** (Seer)
- **76.1% 的 AIO 引用来自自然排名前 10** (Ahrefs) → 首页排名是 GEO 引用的前提,SEO 与 GEO 不是两件事
- AI 引荐流量转化率是有机的 4.4-5.1 倍 (Semrush/Stackmatix: 14.2% vs 2.8%) → GEO 流量少但值钱
- **90% 的 AI 引用来自第三方内容,不是品牌官网** (Muck Rack 100 万 prompt) → G2 实体建设 (目录/评测/listicle) 是 GEO 主战场,站内优化只是入场券

### 转化基准 (电商交易全环节)

SERP 展示 → 点击 (CTR, 上表) → 着陆 → 询盘 → 赢单:
- 着陆→询盘: B2B 印刷高意向流量健康值 **5-10%**,优秀 >12% (008 度量层 8/29 起有真实分母)
- 询盘→赢单: 行业经验值 20-30%,WhatsApp 即时响应是关键变量 (G1 数据: 96.8% 询盘走 WhatsApp)
- **北极星 v3 (K3 拍板升级版)**: `周赢单数 won_count` 为唯一北极星;过程指标三层 = ① pos≤10 词数 (排名层) ② clicks 与分位置 CTR 达标率 (流量层) ③ 询盘数 × 询盘率 (转化层)

---

## 第五部分 · 竞品对标结论

1. **e-print (香港寡头, 招股书数据)**: 年收 3.1 亿 HKD、约 3% 市占、17-21 门店、39% 订单来自网站。它靠 20 年域名权重 + 品牌词垄断香港通用大词 (貼紙印刷/宣傳單張 pos 20-40 段它都在前面)。**zprintpro 正面刚通用大词 = 以卵击石**;正确打法是它覆盖不到的: 跨境 B2B (bulk/wholesale/supplier)、长尾规格词 (mtr 4 sheet / can badge size)、粤语口语词 (邊度有紙袋買)、AI 引用 (它没有 GEO 布局)。
2. **Vistaprint/Helloprint 模式**: 品类页 + 长尾内容矩阵 + 规格模板下载锁客。Helloprint 专门设 Category SEO 岗位做 long-tail。对我们的启示: **品类词靠 Pillar 深度,长尾靠 blog/规格指南,两者都已经在我们 v3.11-15 的打法里,方向验证正确,继续加注。**
3. **B2B 买家行为 (G2 2026 / Forrester)**: 51% B2B 买家从 AI 聊天机器人开始调研,85% 从"day one 名单"采购 → **进入 AI 推荐名单 = 进入采购短名单**,G1 Index (原创统计资产) + G2 实体 (第三方引用) 正是为此设计,优先级上调。

---

## 第六部分 · 全品类三语言词图 (剩余词全量激活)

### 作战梯队 (按 ROI 排序,资源严格按序分配)

**梯队 0 · 守擂 (维护, 不改标题大动)**: a2海報 / a1海報 / 智印港 / 印傳單價格 / 易拉寶 / small batch stickers / flyer printing — 每月 snippet 保鲜 + 内链维持。

**梯队 1 · 本周突破 (pos 6-20 → 首页, 最高 ROI, 3 周内见效)**:

| 集群 | 词 | 现 pos | 动作 |
|---|---|---|---|
| EN catalog (矛头) | catalog book printing / china catalog printing / catalog printing china | 6-17 | PDP 加深 + 1 篇 supporting blog + books 类目页 (89 imp) 内链 + FAQPage schema |
| zh 紙袋群 | 紙袋印刷 / 印刷紙袋 / 紙袋訂製 / 訂做紙袋 | 12-19 | Pillar 已有,补 FAQ JSON-LD + blog 互链 + snippet 价格前置 |
| zh 月曆 | 月曆印刷 / 月歷印刷 / 印月曆 | 17-18 | 9-11 月旺季在即,T38 季节时效提前到本周,内链+IndexNow |
| zh 即日/MTR | a1 印刷 即日 / a2印刷 / mtr 4·12 sheet | 8-12 | rush-printing 页 + poster size blog 内链环 |
| JA 边缘词 | 教科書 印刷 / 特急印刷 激安 / can badge size | 8-22 | ja Pillar 加固 (T30 续) + ja snippet 重写 (CTR 1.03% 短板) |
| envelopes 断点 | 大信封 / large envelope 等 3 词 | 1-2.6, 0 击 | **pos 2.6 零点击 = 标题/snippet 与搜索意图错配**,T18 第 2 版: 价格最前置 + 规格词 (C4/C5) + WhatsApp CTA |

**梯队 2 · 品类核心词推进 (pos 20-50 → 20 内, 4-6 周)**:

- zh-hk: 貼紙印刷 40.7 · 宣傳單張 36.6 · 宣傳單張印刷 27.9 · 印海報 23.6 · 海報印刷 31.6 · 包裝盒訂製 31.5 · 包裝盒印刷 35.2 · 利是封印刷 33.5 · 食品包裝印刷 29.2 · 騎馬釘印刷 33 · 標籤 印刷 22 · 貼紙訂製 28
- EN: school exercise book printing 23.8/26.2 · small batch label printing 57.7 · saddle stitch booklet 79.7 (需外链+内容深度,8/28 看是否 ≤50)
- JA: 教科書 印刷 42.7 · 教材 テキスト印刷 29 · ステッカー 印刷/作成/オリジナル (T30 词群)
- 动作: Pillar 段落加深 (每类目 +2 段场景/工艺) + 对应 SKU title 词根注入 + 每词 1 条内链从高 imp 页面导入

**梯队 3 · 长尾 GEO 词 (新内容, 为 AI 引用设计)**:
- 规格答案型: "paper bag print file requirements" (pos 16.6 已有!) / bleed size / DPI / 纸张克重对照 → **answer-first 结构 + FAQPage + Dataset schema,抢 AIO 引用**
- 对比型: a5 vs a6 flyer (pos 6.3) / digital vs offset / 合版 vs 独立版
- 场景型: 餐飲開業印刷清單 / 学园祭印刷 / wedding invitation timeline / CNY 2027 利是封备货 (季节提前 6-8 周)
- 大单词 B2B: bulk/wholesale/catalog/banner printing supplier (T29 模式复制到 banners + books)

**梯队 4 · 品牌与实体 (GEO 引用前提)**: 智印港 (HK, 已 pos1, CTR 目标 40%) / ジープリント (JP, 30 目录 + sameAs) / ZprintPro (EN) + G1 Index 每季度更新 (AI 引擎最爱的人肉不可复制资产)。

### 16 品类 × 3 locale 覆盖状态与缺口

- **已 Pillar 化**: v3.11-15 完成 16 品类 zh-hk 全覆盖,en/ja 主类目覆盖;
- **v3.16 缺口清单**: ① T36 剩余 ja 段落 (eeb389b 已部分,verify 后盘点); ② P2 类目 (banners / envelopes / japan-doujin) en/ja Pillar 薄弱; ③ greeting-cards / wedding-invitations / place-cards 3 新类目 (K3 8/17 战略) 的词图未建; ④ menus / educational / red-packets 的 en 长尾 blog 缺口。

---

## 第七部分 · M3 执行方案 (v3.16 任务卡, 按序执行)

| # | 任务 | 内容 | 预估 | 验收 |
|---|---|---|---|---|
| F0 | **CF 修复 (最高优先, 先做)** | 第二部分拍板: G1 page.tsx 去 next/script + 补 generateStaticParams, 1 commit 1 push | 30 min | verify-deploy = success; /en/insights/hk-print-inquiry-index/ curl 200 |
| F1 | v3.15 债务清算 | eeb389b 上线确认 + T36 剩余 ja 段落盘点 | 20 min | 6 步验收 |
| T41 | EN catalog 集群推首页 | catalog-printing PDP 加深 (bulk/wholesale 段) + books 类目内链 + 1 blog + FAQPage | 60 min | 8/28 pos ≤10 |
| T42 | zh striking 12 词 | 紙袋 4 词 + 月曆 3 词 + 餐牌/戶外貼紙/食品包裝/證書/即日 — snippet 价格前置 + FAQ JSON-LD | 90 min | 8/28 ≥5 词进首页 |
| T43 | T27 FAQPage JSON-LD | 3 locale × 16 类目组件化生成 (一次性, 不许再延后) | 60 min | GSC rich results 出现 FAQ |
| T44 | JA CTR 专项 | ja snippet 5 条重写 (教科書/ステッカー/特急/教材/can badge) + ジープリント 埋点 | 45 min | 9/4 ja CTR ≥2% |
| T45 | envelopes 断点修复 | pos 2.6 零点击: 标题/snippet 第 2 版 (C4/C5 规格 + 价格最前置) | 20 min | 8/28 点击破零 |
| G2 | 实体 0→1 | GBP 资料 + HK/JP 目录 10 条 + 1 篇第三方 listicle 投放 | 2 turn | sameAs 生效 |
| T39 | IndexNow 自动化 | 新 URL 自动提交脚本 | 30 min | 脚本入 cron |

**红线**: F0 修复前禁止任何其他 push;每版本延后任务 ≤2;阈值二元化表述。

### 8/28 验收记分卡 (K3 升级版)

| 指标 | 基线 (8/21) | 8/28 目标 |
|---|---|---|
| pos≤10 非品牌词数 | ~8 | ≥15 |
| striking 36 词平均 pos | 13.9 | ≤11 |
| 站点日均 imps | ~680 | ≥900 |
| 有名词 7d clicks | 6 | ≥12 |
| HK CTR | 2.54% | ≥2.5% (守) |
| JA CTR | 1.03% | ≥1.5% |
| EN catalog 3 词最佳 pos | 6 | ≤8 且另 2 词 ≤12 |
| envelopes 点击 | 0 | ≥1 |
| 008 询盘基线 | 测试单 1 | 8/22-28 真实询盘数 + 来源词归因 (不设硬指标) |

---

*K3 / 2026-08-22 / 数据源: GSC 8/14-8/21 实时 + 六研究 CTR 荟萃 + Bain/G2/Forrester B2B AI 搜索 + e-print 招股书 / 一切结论可回溯到本文件第三、四、五部分的事实与引用*
