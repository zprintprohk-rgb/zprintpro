# R2 带钱词候选 · 人工过目审阅报告（2026-09-21）

> 数据源：`.hermes/reports/title-flywheel-r2-proposals-2026-09-21.json`（生成器 `scripts/gen-title-flywheel-r2.mjs`）
> 范围：解冻 77 slug × 3 语 = 231 槽（冻结 23 slug 避让，K3「没进前10主词不冻结」拍板）
> 闸门：G1 当量 50-57 / G2 品牌末尾一次 / G3 跨语言 / G6 空洞修饰词 / G7 语义查重（主词+保留段）+ sizeFlag + relation 双轨
> 结果：231 槽 → 58 槽有 GSC 实证同簇词 → **9 槽全闸门通过**（全部 keyword 弱关联轨，🖐 强制人工）

## 一、审阅结论一览

| # | slug | locale | 换词 | 候选标题 | 当量 | 证据（query imps/pos） | 执行层建议 |
|---|---|---|---|---|---|---|---|
| 1 | a5-flyers | zh-hk | 圓角 覆膜 → 特急快印 | A5 傳單印刷 \| 特急快印 \| 10張起印 HK$0.25起 \| 智印港 | 52 | 特急快印 29/33.2 | ⚠️ 见 §二-A |
| 2 | outdoor-vinyl-banners | zh-hk | 防水防曬 PVC高清 → 易拉架製作 | 戶外燈布噴繪 \| 易拉架製作 \| 1件起 HK$12起 \| 智印港 | 50 | 易拉架製作 ~imps | ❌ **拒绝**：易拉架=roll-up banner，跨产品（与 roll-up-banners SKU 撞车），燈布≠易拉架 |
| 3 | can-badge | ja | 推し活 コミケ → コミケ 印刷 | 缶バッジ印刷 57/76mm \| コミケ 印刷 \| 10個〜 \| ZprintPro | 55 | コミケ 印刷 有量 | ❌ **拒绝**：原段已含 コミケ，換後與主詞「印刷」重複，增量≈0 |
| 4 | folding-boxes | zh-hk | 燙金 UV → 包裝盒印刷 | 折疊盒印刷訂製 \| 包裝盒印刷 \| 100個起 HK$2.5起 \| 智印港 | 55 | 包裝盒印刷 71/36.1 | ⚠️ 见 §二-B |
| 5 | double-sided-flyers | zh-hk | 圓角 覆膜 → 特急快印 | 雙面傳單印刷 \| 特急快印 \| 10張起印 HK$0.40起 \| 智印港 | 53 | 特急快印 29/33.2 | ⚠️ 见 §二-A |
| 6 | foil-red-packets | zh-hk | 燙金 局部UV → 喜帖印刷 | 燙金利是封印刷 \| 喜帖印刷 \| … | 54 | 喜帖印刷 有量 | ❌ **拒绝**：喜帖=婚帖，跨品类（keywords 池污染），利是封页不应挂喜帖词 |
| 7 | custom-red-packets | zh-hk | 燙金 UV 壓紋 → 喜帖印刷 | 定制利是封印刷 \| 喜帖印刷 \| … | 53 | 同上 | ❌ 同上 |
| 8 | large-red-packets | zh-hk | 燙金 局部UV → 喜帖印刷 | 大號利是封印刷 \| 喜帖印刷 \| … | 54 | 同上 | ❌ 同上 |
| 9 | cartoon-red-packets | zh-hk | 燙金 局部UV → 喜帖印刷 | 卡通利是封印刷 \| 喜帖印刷 \| … | 54 | 同上 | ❌ 同上 |

**建议：批准 2（见 §二-A 取低风险版）、拍板 2（§二-A/B）、拒绝 5。**

## 二、需 K3 拍板的两件事

### A. 传单族 ×2（#1 #5）：「特急快印」能力宣称 vs「單張印刷」同义承接

- 查询「特急快印」28d 29 imps / pos 33.2，是同簇最高价值词；但它是**服务承诺**——A5/雙面傳單是否真接特急单？same-day-flyers SKU 存在说明站有即日能力，但这两个 SKU 页面未宣称。
- 零风险替代：「單張印刷」（傳單=單張 同义，港式用语，GSC 实证有量），无能力宣称问题，同样过全闸门：
  - `A5 傳單印刷 | 單張印刷 | 10張起印 HK$0.25起 | 智印港`
  - `雙面傳單印刷 | 單張印刷 | 10張起印 HK$0.40起 | 智印港`
- **裁决选项**：(a) 上「特急快印」（确认两 SKU 接特急单）；(b) 上「單張印刷」（零风险，执行层推荐）；(c) 不动。

### B. folding-boxes（#4）：「包裝盒印刷」头部词 71 imps / pos 36.1

- 上标题可做精确匹配承接，但该词是**品类头部词**，与包裝盒 category 页有内部竞争（cannibalization）风险。
- **裁决选项**：(a) 上（SKU 页抢头部词）；(b) 不上，头部词留给 category 页（执行层推荐）。

## 三、诚实结论：标题层收成已薄

- T1 已把 300 槽全部做进 50-57 且含数字钩子；本轮 GSC 查询表（1000 行）里**未进前 10、未在标题、与主词非重复**的同簇词，过完七闸只剩 9 条，其中 5 条跨品类拒绝、2 条需拍板。
- P0-A 档（页 pos≤20 + imps≥30）8 槽**零通过**：高价值词（如 handle-bags 的「紙袋印刷」70 imps/pos 13.8）要塞进 50-57 必须**丢数字钩子段**——与「数字钩子必含」规则冲突，执行层不自主裁决。**是否允许 P0-A 槽为头部词牺牲 MOQ/价格钩？**（裁决选项：(a) 允许，P0-A 特批；(b) 不允许，维持现状）
- **飞轮下一杠杆不在标题**：按原指令顺序，AEO 描述层（首段直接答案句普查）与 GEO schema 层（ProcureAction + sourcingIntentKeywords，零批次覆盖过）是未开垦地。标题窗内冻结纪律不变。

## 四、已落地资产（本 commit 范围）

- `.hermes/reports/freeze-repartition-2026-09-21.json` — 冻结重划（核心主词口径，23 冻/77 解）
- `src/data/title-window-freeze.ts` — 已由生成器更新为 23 slug（`.hermes/_gen-freeze.cjs` 同步改写，SOP-5）
- `scripts/gen-title-flywheel-r2.mjs` — R2 生成器（七闸 + G7 语义查重 + 双轨 relation + sizeFlag）
- `.hermes/reports/title-flywheel-r2-proposals-2026-09-21.{json,md}` — 全量候选（58 槽 90 变体）
- `.hermes/keyword-lib/02-关键词词库.csv` — 词库副本（审计结论：intent/tender 行为 B2B 获客 scraping 词，仅 en/category 47 条适用于消费者标题；zh-hk/ja 无行）

## 五、K3 拍板结果（2026-09-21 21:0x）

- **A 传单族 ×2** → **單張印刷**（零风险同义版）✅ 已落地：`a5-flyers` e=52 / `double-sided-flyers` e=53，两槽 keywords 池本已含「單張印刷」（池内实证词）。
- **B folding-boxes** → **按推荐，头部词留 category 页**，SKU 标题不动。
- **C P0-A 数字钩冲突** → **按推荐维持现状**，不允许为头部词牺牲 MOQ/价格钩。8 个 P0-A 槽本轮不改，登记为规则层遗留（若未来要抢「紙袋印刷」类头部词，需另起规则裁决）。
- 拒绝 5 条（喜帖×4 跨品类 / 易拉架×1 跨产品 / コミケ×1 零增量）维持拒绝，不入账。

**验证窗登记**：本批 2 槽（a5-flyers / double-sided-flyers zh-hk title）进验证窗，2026-09-21 起 7-10 天，窗内不再动；冻结 23 slug 不受影响。

> 数据来源：GSC `.hermes/gsc-2026-09-18/extract.json`（28d，2026-08-19~09-15）；标题真值 `src/data/sku-seo-data.ts`（K2.8 今日产物）；MOQ/价格真值 `src/data/products.ts`。
