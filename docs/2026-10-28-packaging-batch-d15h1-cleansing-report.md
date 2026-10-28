# 2026-10-28 data-driven 执行批 #4-5 报告（11:31 push 后批次）

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师
> 依据：`docs/2026-10-28-data-driven-next-phase-strategy.md` §7 + 三市场小批延续
> 数据来源：products.ts 价格真值表 + title-v5 门童对照（commit 记录见各 commit）；线上探针 curl 2026-10-28

## 三、独立跨验（另一会话，12:1x，§0.23.2 第二方法）

- 方法: `.hermes/_batch7_spotcheck.mjs`（title 域内 mustContain/anti 双向检查，UA 探针）
- 批 #6/#7 same-day-flyers 三语 title 价格真值: **3/3 PASS** —— zh `HK$0.55起`（无 HK$1.30）/ en `from $0.95`（无 $0.16）/ ja `¥125〜`（无旧 ¥25 残留）；页面 200、title 实值见探针 JSON
- 探针设计教训: 价格 anti 检查必须**限定 title/价格位域**，不可全页扫描——正文价格阶梯合法含多档位，首版全页扫描误报 0/3（非数据问题，是检查域错误）；已修正复跑

## 一、11:31 push（2b258d47）线上探针全绿

| 探针 | 结果 |
|---|---|
| price-2026 → 301 → pricing-2026（zh/en/ja） | ✅ 三语 301 + location 正确 |
| pricing-2026 三语 200 | ✅ |
| en small-batch 新 title `Small Batch Stickers from $0.55` | ✅ 渲染 |
| zh a1 `HK$20起` / a2 `HK$16起` | ✅ 渲染 |
| food ja `¥101` / en `$0.74/pc` | ✅ 渲染 |

**P2-CONSOL-01 落位完成**（K3 拍板方案 A：保留 pricing-2026 + 301 price-2026——middleware + 三语删文 + sitemap 重生成 + 线上 301 验证通过）

## 二、本批新改动（待下轮 push ≥12:01）

### 小批 #4：泛企业 H1 产品化（21 处）

**ja 泛企业模板 ×16**（`高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。` → 主词 + MOQ 钩子）：

removable-stickers / small-batch-stickers / die-cut-stickers / handle-bags / large-bags / thick-paper-flyers / eco-flyers / drink-menus / adhesive-banners / vehicle-wraps / perfect-bound-books / spiral-notebooks / large-envelopes / pearl-envelopes / school-flyers / textbooks

**zh 泛企业模板 ×3**（`智印港提供專業XX印刷服務，香港本地印刷，品質保證，價格透明。` → 产品化）：thick-paper-flyers / eco-flyers / textbooks

**rigid en/zh ×2**：en H1 `250+`→`from 100`（MOQ 真值冲突 watch 项清）+ zh H1 泛企业模板→`精裝禮盒訂製 — 硬殼天地盒磁吸盒，100 個起印`

真值源 = 已过 title-v5 门童的 ja/zh title（MOQ + 价格全对照 products.ts）——模板残留 0 验证

### 小批 #5：转化率/无来源数字清毒（10 处，§0.37 + §0.23 合规）

category-seo-content.ts 信封/书刊/月历三语 FAQ：
- 信封 zh/en/ja：删 `+42%/+38%/+28% 询盘→下单转化率 12%→16%` + `免費打樣` 断言 → 免费數碼打樣
- 书刊 zh/en/ja：删 `+38%/+52%/+27%/+47%` + `(來源: 智印港 2026 H1 訂單統計)` 引用
- 月历 zh×2/en/ja：删 `+52%/+47%/+28%` 无来源趋势数字

验证：`+42%|+38%|+28%|+52%|+47%|訂單統計|order statistics|注文統計|轉化率` grep = 0 命中

## 三、门禁

tsc 54 / **title-v5 HARD 0**（本日 7→0 完整链条：small-batch→poster→food→same-day-flyers）/ brand 0 / gsc-leak 0 —— 全绿

## 三-b、12:01 push（37f4176a）上线验证全绿

批 #4-7 已上线：泛企业 H1 ×21 + 清毒 ×10 + ja JPY ×3 + same-day-flyers ×6 + 报告 ×3。线上探针 14/14：
- ja H1 渲染 ✓（removable/handle-bags/textbooks/small-batch）
- zh H1 渲染 ✓（thick-paper/eco-flyers/textbooks）
- en rigid H1 `from 100` ✓
- same-day 三语 title（HK$0.55 / $0.95 / ¥125）✓
- envelopes category FAQ 三语无 +42% 残留 ✓

## 四、复测登记更新（data-driven §3 第 8 条）

| URL | 改动 | 冻结窗口 | 下一检查日 | 成败条件 |
|---|---|---|---|---|
| 泛企业 H1 ×21 | H1 产品化（首屏直接答案） | 2 周 | 11-11 / 11-25 | 7 天：渲染+抓取正常；28 天：所属词簇位置/点击方向 |
| category 信封/书刊/月历 FAQ | 转化率数字清毒 | 2 周 | 11-11 / 11-25 | 无排名回退（清毒方向为加分） |

## 五、待办（K3）

1. **dsh 凭据重存**（K3-10）：重存后新 GSC 导出 → `node scripts/k3-kpi-panel.mjs --pull=<批次>` 刷新 KPI 面板（v1 基线已固化 10-27）
2. **D15-21 实物资产**：刀模模板/样品文件（业务提供真实文件后发布）
3. **watch 延续**：en 彩盒族 body 8-15 days 交期口径 + en category Made for USA 断言
4. **CSV 回源归并（D22-25，优先级高）**：lane 契约（`lane-results-bus-contract.md` L112）规定 SKU SEO 只改 `zprintpro-sku-seo-data.csv` 后跑 `scripts/csv-to-sku-seo.mjs`。本批及此前批（P0-02 清毒 / D6-D14 / 本日 H1+title/desc）均直接改 `src/data/sku-seo-data.ts`——**必须归并回 CSV 防生成器重跑回滚**。归并清单（~40 行）：small-batch（title/desc ×3 语）、a1/a2 zh title、food ja/en desc、泛企业 H1 ×21、rigid H1 ×2、kraft/mailer/food（P0-02 批）等。**执行注意**：CSV 为 GBK 编码（§0.35.5 编码铁律）；归并后重跑生成器须 diff 校验 TS 无意外重排；凭据恢复前 lane 不会跑生成器，窗口安全。
5. **ja category 剩余 HK$ 残留 ×7（watch）**：本日已 JPY 化 3 处（包装带 8 价格 + 海报 A2/A1）——剩余：贴纸 L326（`HK$0.8` 类目级 vs basePrice_ja 46 不对应）、信封 ja ×4（`HK$0.5/0.15`，envelope basePrice_ja 未确认）、利是封 L2235（七簇移交域）、月历 L1880（`HK$3-8`）、教科书 L2471（`HK$24` vs basePrice_ja 1288 口径不同）——**逐项对照 basePrice_ja 后再 JPY 化，不猜值**。
6. **en 彩盒族 body 8-15 days + HK$ 币种残留 ×3**（corrugated/tuck-end/white-cardboard en body `HK$1,517-7,278 per order`）——交期 8-15 为瓦楞工艺规格（登记待 K3 交期真值确认）；en 币种 HK$ 待 basePrice_en 对照确认。

---

## 六、补遗（2026-10-28 14:4x，本会话）：待办 4 CSV 回源归并（D22-25）已执行 ✅

**方法**：`scripts/sync-ts-to-csv.mjs`（K3 方案 C 组件）dry-run → apply（自带备份 `.hermes/_bak-csv-before-backsync-1793169160574.csv`）→ 生成器复跑验证。

| 步骤 | 结果 |
|---|---|
| sync dry-run | 计划回灌 83 行；**变更单元格 75 / 涉及行 28**（title/desc/h1/keywords/alt ×3 语全字段，覆盖 P0-02 至批 #7 全部直改） |
| sync --apply | 后断言 PASS：83 行 × 18 字段与 ts 逐字一致，31 列不变 |
| 生成器复跑（dry） | **漂移 0（此前 WARN 8 行 title 含批 #6/#7 same-day-flyers HK$0.55）· 字节级变化 0** —— lane 重跑生成器不再回滚任何真值 |
| CSV 不变量 | 84 行（含表头）× 31 TAB 列 · **UTF-8 无 BOM** · 4 项真值抽查（same-day HK$0.55 / a1 HK$20 / a2 HK$16 / small-batch HK$38/A4）全过 |
| 门禁 | tsc 54=54 · title-v5 HARD=0 · TS 零改动（本批仅 CSV） |

**事实更正（§0.23 双方法）**：待办 4 原记「CSV 为 GBK 编码」**不实**——实测 `gbk` 解码在 0x86 字节失败、`utf-8` 解码完好、无 BOM；本批以 UTF-8 读写零转码。后续 CSV 编辑一律 UTF-8，勿再按 GBK 处理。

**影响**：D22-25 欠账清零；「凭据恢复前窗口安全」的时限依赖解除——即使 lane 立即恢复并重跑生成器，TS 真值（价格/H1/title 全部批次）不受影响。

---

## 七、补遗 2（2026-10-28 15:4x）：数据驱动小批 #8 — 信封 MOQ en/ja 漏网 + 月曆 ja JPY

**发现**：10-24 信封 zh MOQ 修复存在形态漏网——en 用 `500 pcs`、ja 用 `500枚から` 绕过了当时的 `500 個` 规则；全量 500 扫描另发现 ja 核心卖点 L1580 第 3 处。真值 = products.ts envelope SKU minQuantity=100（zh/en/ja featuredSnippet 均已写 100，同页 techSpecs/FAQ 却写 500 = 自相矛盾）。

**改动（8 处，category-seo-content.ts）**：
| # | 位置 | 旧 → 新 | 真值 |
|---|---|---|---|
| 1-2 | en techSpecs + FAQ | `500 pcs (digital printing)` → `100 pcs` | minQuantity=100 |
| 3 | en coreAdvantages | `500 pcs minimum` → `100 pcs minimum` | 同上 |
| 4-6 | ja coreAdvantages + techSpecs + FAQ | `500枚から` → `100枚から` | 同上 |
| 7-8 | 月曆 ja featuredSnippet ×2 | `HK$3-8／冊` → `¥50〜` | basePrice_ja=50（basePrice=3 对应，ja 起价惯例） |

**不猜值跳过（登记）**：信封 ja 价格 `HK$0.5/0.15`（envelope 无 basePrice_ja）、en FAQ `US$0.02/pc`（无 basePrice_en）→ K3-4 清单；餐牌 ja `HK$15/張起`（与 basePrice 5/8/28 均不对应）→ K3-4；贴纸 `HK$0.8`（basePrice_ja 46 不对应）；利是封（七簇域）；教科書（K3-4）。场景数量带 `100-500 pcs` / `500-5,000 pcs` 为典型量级非 MOQ 声明，保留。

**不变量**：SGS 计数不变 · tsc 54=54 · 包块 `100-500 pcs` 数量带完好（断言负向后顾 `(?<![\d,-])500 pcs` 防带内子串误报——本周期第 3 次 substring 测量陷阱）。
