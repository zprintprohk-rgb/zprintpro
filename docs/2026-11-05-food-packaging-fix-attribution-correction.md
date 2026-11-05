# 2026-11-05 首席分析师·归因修正执行报告（食品包裝印刷 页1 零点击 FIX 目标页修正 + 11-06 批 1b 逐字稿）

> 日期：2026-11-05（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据（严格按最新优先级）：`重要文件/2026-11-03-three-market-one-two-week-optimal-strategy.md`（§2.1 Z1「先测量：记录实际排名页、标题链接、摘要」+ §四节奏）· `2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md`（§9 PKG-P1-EN-01 D10 验收：en food supplier 观察至 11-23）· `.hermes/logs/2026-11-05-ZP-k3-review.md`（07:10 自然轮 NEXT）· `docs/2026-11-04-weekly-meta-execution-sheet-1106.md`（批 2 目标页修正对象）· `docs/2026-11-03-meta-ctr-decision-pack-1106.md`（选项 B＝desc-only 不动 title，本报告沿袭不推翻）
> 本轮性质：**纯测量 + 执行清单修正（PROPOSE_ONLY）**。零 `src/` 写入、零 title/desc/正文改动、零 commit/push（上次 push 07:17 k3 车道，本轮距其 <30 min，按 §0.25.8 只落盘不留推送；改动留给后续车道批次）。

## 〇、一句话结论

**11-06 批 2（改 category/packaging desc）的目标页错了：`食品包裝印刷` 的页 1 排名页是 blog `food-packaging-printing-guide`（pos 8.39–8.56，跨 3 窗稳定，111–112 展示），不是 category（pos 63.83，深位）。该 blog 的 meta description 是英文 125 字符——与 poster blog（批 1）同款「语言错配」病，是全站页 1 零点击池（16 行 / 632 展示）里 #1（114 展示）+ #2（62 展示）两行共 176 展示的直接可修杠杆。修正：批 2 复测锚点改锚 食品包裝訂製／包裝盒印刷；新增批 1b＝改该 blog desc 英→中（152 字符逐字稿见 §四），不动 title，不动正文，不写任何新数字。**

## 一、为什么需要归因修正（Z1 门禁「先记录实际排名页」）

`2026-11-03-meta-ctr-decision-pack-1106.md` 把 `食品包裝印刷` 的承接页写成 `/zh-hk/category/packaging/`，依据是 C4 的「包裝盒訂製簇 95.7% 集中于此页」——这是**跨查询混用**：`包裝盒訂製` 的簇集中在 category，但 `食品包裝印刷` 的簇没有。页级归因数据（唯一权威，窗口 09-30..10-27，`money-kw-query-page-country-2026-10-31.csv`）：

| 查询（hkg） | 页面 | 展示 | 平均位置 | 点击 |
|---|---|---|---|---|
| 食品包裝印刷 | `/zh-hk/blog/food-packaging-printing-guide/` | **111** | **8.56**（页 1） | 0 |
| 食品包裝印刷 | `/zh-hk/product/food-boxes/` | 66 | 43.02 | 0 |
| 食品包裝印刷 | `/zh-hk/category/packaging/` | 42 | **63.83** | 0 |
| 食品印刷 | `/zh-hk/blog/food-packaging-printing-guide/` | **62** | **8.97**（页 1） | 0 |
| 食品印刷 | `/zh-hk/product/food-boxes/` | 36 | 40.25 | 0 |
| 食品包裝訂製 | `/zh-hk/product/food-boxes/` | 30 | 24.43 | 0 |
| 食品包裝訂製 | `/zh-hk/category/packaging/` | 25 | **10.20**（页 1 边缘） | 0 |

**query 级交叉验证（3 个独立窗口，位置稳定 ⇒ 页级结论中高置信）**：`食品包裝印刷` hkg = 118@8.42（xlsx 28d 10-04..10-31）／114@8.53（API 10-06..11-02）／112@8.39（API 10-08..11-04）。页 1 位置连续 3 窗稳定在 8.4–8.5，与 blog 页级 pos 8.56 高度吻合；category 若真在 63 位不可能给出 8.4 的 query 级均值。

**结论**：`食品包裝印刷`／`食品印刷` 两行的页 1 ranker 均为 blog。批 2 若只改 category desc，对这两个查询的 CTR 无直接作用（该页不在结果页 1 覆盖范围）。

## 二、线上 snippet 实况（2026-11-05 07:5x 抓取，HTTP 200）

| 页面 | title | meta description | H1 |
|---|---|---|---|
| `/zh-hk/blog/food-packaging-printing-guide/` | `食品包裝印刷完全指南：材質、安全、法規與設計實務 \| 智印港` | **英文 125 字符**：`Food-grade packaging printing essentials — from kraft boxes to food-safe lamination, certifications to design best practices.` | 同 title |
| `/zh-hk/product/food-boxes/` | `食品包裝盒印刷 訂製 100個起 HK$2.5 防油紙卡 \| 智印港` | 中文 111 字符（含 100 個起/HK$2.5/3-5 天/滿 HK$500 免運/1 小時打稿） | 含「食品級」 |
| `/zh-hk/category/packaging/` | `包裝盒訂製 100個起・食品紙盒/紙袋/防油卡 3D打稿 \| 智印港` | 中文 136 字符（首句「包裝盒印刷訂製…」+ 尾部「适配行业:」夹英文） | 含「食品紙盒」 |
| `/en/product/food-boxes/` | `Food Packaging Supplier \| 100 MOQ from $0.74 \| ZprintPro`（10-28 已落地，当量 57） | **181 字符（超 150-160 带）** | 正常 |

**判读**：blog 的 title 是中文（匹配查询），但 description 是英文——用户在中文 SERP 中看到中文标题 + 英文摘要，点击意愿受损；这是与 poster blog（批 1，197 字符英文）完全同类的语言错配缺陷，修复类别一致（desc-only，低风险）。

## 三、与既有决策的一致性

- 不推翻 `meta-ctr-decision-pack-1106` 的**选项 B（只改 description，不动 title）**——本修正只改目标页，不改变量类型。
- 不违反 10-30 裁决「不修改冻结标题制造短期变化」——批 1b 是 desc-only。
- 不触碰 K3 门禁项：blog 正文的 FDA/GB 认证断言与价格/交期条件化（`FIX-20261030-BLOG-CERT-PHRASES` WAITING_K3）**不在本批**；批 1b 逐字稿只镜像该页**现有可见正文**的事实，不新增任何数值。
- 若 K3 在 11-06 前对认证/价格条件化拍板并改动该页正文，批 1b 逐字稿须由当时正文重推导（依赖注记，写入执行清单）。

## 四、执行清单修正（11-06 weekly-meta）

### 批 1b（新）｜`/zh-hk/blog/food-packaging-printing-guide/` — desc 英→中

- 现值：`Food-grade packaging printing essentials — from kraft boxes to food-safe lamination, certifications to design best practices.`（**125 字符英文**）
- 拟改（**152 字符**，已实测）：

  > 食品包裝印刷完全指南：直接接觸食品須用食品級材質與油墨，材料合規以訂單確認。智印港 100 個起印、HK$2.5 起/個、無開版費無刀模費；標準 3-5 個工作天交貨、1 小時免費數碼打稿、滿 HK$500 順豐免運、DHL 全球 2-4 天。拆解 6 大食品類型材質對照、紙材比較與設計實務，30 秒 AI 報價。

- 真值来源（全部为该页现有可见正文 2026-11-05 实抓）：100 個起印/HK$2.5 起/個/無開版費無刀模費/3-5 個工作天/1 小時免費數碼打稿/滿 HK$500 順豐免運/DHL 全球 2-4 天/6 大食品類型材質對照/合規以訂單確認。
- 复测锚点：`食品包裝印刷`（基线 112 imp / 0 clk / pos 8.39，API 10-08..11-04）＋ `食品印刷`（62 / 0 / 7.48）——同词同页同国家，11-13（7d）／11-20（14d）。
- 执行前自查：① 目标字段当前值与本文 before 一致（若已被他人改动 → 停止并报告）② 字符数 150-160 复核（152 ✓）③ 若 K3 已改该页正文（P0-02），先重推导再执行。

### 批 2（改锚）｜`/zh-hk/category/packaging/` — desc 首句词形（逐字稿不变）

- **复测锚点修正**：~~`食品包裝印刷`（该页 pos 63.83，不在页 1，无法归因）~~ → **`食品包裝訂製`（category 25@10.20 页 1 边缘 / query 级 30@12.30，category 为主 ranker）＋ `包裝盒印刷`（49@33.33，category 为主 ranker）＋ `包裝盒訂製`（47@35.30）＋ `紙盒印刷`（42@33.62）**。
- 逐字稿与真值来源不变（沿用执行清单 B-②）。
- 判读说明：category 对这些词的深度（30-35 位）决定复测以**展示份额/位置**为观察项，点击为次要；不因深度而跳过 desc 修复（词形与摘要卫生仍是长期基础）。

## 五、en food supplier（10-26 战略 D10）状态复核

- D10 已于 10-28 提前落位（commit `8d34982e`）：title `Food Packaging Supplier | 100 MOQ from $0.74 | ZprintPro`（当量 57 ✓ PRICE 对照 basePrice_en=0.74 ✓）+ body Supplier checklist（食品接触边界/合规文件按单提供/打样/交期起算/报价所需信息）。
- 今日线上复核：title/H1/checklist 在位（HTTP 200）；**desc 181 字符超 150-160 带**（观察项，杠杆小——`food packaging supplier` 仅 3-5 展示，不进 11-06 批，避免无关 churn）。
- GSC 基线：`food packaging supplier` usa 5 imp @ 16.40（09-30..10-27）→ 3 imp @ 16.67（API 10-08..11-04）；`food packaging suppliers` 3 @ 22.33。**按 D10 验收规则观察 10-15 位区，11-23 GSC 复核（同时看展示量，避免只看位置）**。

## 六、顺带观察（不执行，只登记）

1. `食品包裝訂製`：food PDP（战略指定主 URL）pos 24.43 vs category 10.20——与 NEW-9「blog/页面内部抢头」同族，属月度（O5 候选 URL）评审范围；**不自动 canonical/301**。
2. `包裝食品 裡印`（31@9.39，页 1 零点击池内）——拼写异常的 odd long-tail，需人工解读后才可用（11-04 anomaly A34 已注记，维持 HOLD）。
3. zh-hk blog desc 英文残留为**系统性问题**（poster 197 英文 + food 125 英文已确认两例）；建议 weekly-meta 后续批在 11-06 单批上线后，对 zh-hk blog 全量做一次 desc 语言普查（只测不批）。

## 七、K3 清桌（承接 11-04/11-05，本报告不新增项）

1. **monthly-matrix（A28，MISSING 第 5 天）**：`schtasks /change /tn ZP-monthly-matrix /st 12:13` 或按 `register-cron-tasks.ps1` 重建。
2. **11-04/11-05 四档 xlsx（A36）**：24h/7d/28d/3mo——KPI 四指标与恢复系数连续第 2 天 UNKNOWN。
3. **O2 恢复口径 SSoT（推荐 A）**：xlsx 24h ÷ 同批 28d 动态分母（现官方 123.7%）；API 永不参与恢复系数。
4. **模板真值 A/B/C + D3（第 7 天）**：推荐 A（全站「confirmed at quote」）；含 ja textbook desc HK$5-50/冊（11-05 线上实锤）＋ 首页 A2 三价 ＋ 模板级 5 项承诺。
5. **A38（ja 利是封中文残留）**：daily-content 今夜执行；涉商业真值（12色/价格/返金）项需 K3 先拍板值。
6. **SERP 核验出口（FIX 准入前置）**：`食品包裝印刷`／`small batch stickers` 等需 HK/US 出口 SERP 证据；本机广东 IP 判 INVALID，11-06 批前补。
7. **主机夜间可用性**：11-04 21:17 daily / 11-05 06:43 watchdog 两处 RUN_MISSING，若 11-05 21:17 再现则升级 request_human。

## 八、未来 48h 优先级（不重复 11-05 已交付）

| 日期 | 动作 | 验收 |
|---|---|---|
| 11-05 20:13 | gsc 轮：消费 **end1105**（勿重拉 end1103/end1102）；若 K3 已导 xlsx 则跑 detector | 当日报告 + 总线记录 |
| 11-05 21:17 | daily 轮：优先 **A38**（ja 利是封）若商业值已拍板；无 READY 则 NO_OP | 当日报告 |
| 11-06 20:52 | weekly-meta：**批 1（poster desc）+ 批 1b（food blog desc，本报告新增）+ 批 2（category desc，改锚）+ 批 3-5**；title 批（④b + 逾期 sticker title）各自单批；SERP 证据前置 | D1/D2 健康 + 11-13/11-20 复测锚点 |
| 11-07 23:47 | blog-deepfix：flyers/stickers/books 7 天复测（只比冻结基线） | 同口径复测记录 |
| 11-10 | 月曆 11-03 文案复测 | 展示未坍塌 + 索引正常 |
| 11-23 | en supplier（food/electronics）GSC 复核（D10 验收） | 展示量 + 平均位置双看 |

## 九、纪律边界（§0.23/§0.25/§0.35.7）

- 零 `src/` 写入；零 title/desc/正文改动；零 canonical/301；零队列状态翻转；零 commit/push。
- 所有数字出 GSC 导出/JSON/线上实抓（数据来源行见下）；无 GA4/008/订单（§0.37）；无 GSC 后台黑话进入客户可见内容（本文件仅内部）。
- 相邻窗 API 差值（end1104→end1105：clk 78→74 / imp 8,433→8,115）为截断集内算术（A25），不作独立实验。
- 页级归因（09-30..10-27）比 query 级晚约 1 窗；结论为中高置信（3 窗位置稳定交叉），执行前 1 小时如拿到更新页级导出应回读确认。

## 数据来源

- GSC 页级归因：`GSC数据/money-kw-query-page-country-2026-10-31.csv`（窗口 09-30..10-27，query×page×country）
- GSC query 级：`GSC数据/gsc-query-country-28d-end1105.csv`（API，窗 10-08..11-04，数据日 11-04）· `gsc-query-country-28d-end1103.csv`（11-04 01:15 拉取）· xlsx 28d 11-03 批（118@8.42）
- 线上实抓（2026-11-05 07:5x，HTTP 200×4）：`/zh-hk/blog/food-packaging-printing-guide/`（title/desc 英文 125/H1）· `/zh-hk/product/food-boxes/` · `/zh-hk/category/packaging/` · `/en/product/food-boxes/`（D10 复核，desc 181）
- 队列与 anomaly：`.hermes/logs/gsc-daily-anomaly-2026-11-04.json`（NEW-6 16 行池 / NEW-9 系统性 blog 抢头 / NEW-11 食品包裝頁1零點擊 / O4 gate）· `.hermes/logs/gsc-2026-11-04-handoff-14q-snapshot.json`
- 决策沿革：`docs/2026-11-03-meta-ctr-decision-pack-1106.md` · `docs/2026-11-04-weekly-meta-execution-sheet-1106.md` · `docs/2026-10-28-packaging-batch-d8d10-report.md`（commit `8d34982e`）
- 车道：`.hermes/logs/2026-11-05-ZP-k3-review.md`（07:10 自然轮）· `.hermes/logs/lane-runs.jsonl`（k3 11-05 07:17 pushed=True，`origin/main..HEAD=0`）
- SOP-10 五问：① 已核执行清单/决策包/commit 路径（`8d34982e`）② 只动 desc、不碰冻结 title/贺卡/名片/301 ③ 数值全部出站内现有可见正文与 GSC 导出，无竞品数值 ④ 未确认字段留空不补值（认证断言维持 WAITING_K3）⑤ 本报告为内部文档，未修改用户可见 Markdown 渲染。

（本报告落 `docs/`，与车道报告命名隔离，不冒充 `2026-11-05-ZP-*.md`；同步副本 `重要文件/`。）
