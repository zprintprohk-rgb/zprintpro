# 11-06 weekly-meta 执行清单（逐字稿 · 单变量分批 · PROPOSE_ONLY）

> 依据：`2026-11-04-o6-poster-decision-pack.md` · `2026-11-03-meta-ctr-decision-pack-1106.md` · `2026-11-04-j1-textbook-diagnosis.md` · `2026-11-04-e2-catalog-diagnosis.md`
> 定位：把四份诊断包收敛为**可直接执行的 before/after**，降低车道执行误差。所有数字均取站内既有真值，**不新增任何未拍板数字**。
> 纪律：每项单变量、分批上线；未获批准不得改 title；不得同批改 title+desc+正文。

## A. 顺序建议（按 杠杆 × 风险）

| 批 | 项 | 变量 | 风险 | 复测锚点 |
|---|---|---|---|---|
| 批 1 | ① poster blog desc 语言错配 | desc only | 低 | 11-13（7d）`海報印刷`（基线 210 imp / 1 clk / pos 9.78） |
| 批 2 | ② packaging category desc 首句词形 | desc only | 低 | 11-13 `食品包裝印刷`（基线 118 imp / 0 clk / pos 8.42） |
| 批 3 | ③ ja textbook blog desc 过短 | desc only | 低 | 11-13 `教材 印刷製本`（基线 31 imp / pos 11.97 jpn） |
| 批 4 | ④ en catalog blog title 58 + desc 331 | title 与 desc **分两批** | 中（title churn） | 11-20 `china catalog printing`（PDP 40 imp / 13.30） |

## B. 逐字稿

### ① `/zh-hk/blog/poster-printing-guide/` — desc（现为英文 197 字符）

- 现值：`From A3 to A0 posters, art paper to PP film, UV printing to foil stamping — …breaks down poster printing sizes, paper choices, finishing options, and design tips for maximum visual impact.`
- 拟改（中文，目标 150-160 字符）：

  > 香港海報印刷 A2 10 張起、HK$16 起/張；A1 1 張起、HK$20 起/張。尺寸 A3-A0、紙質與過膜選擇、免費設計打稿 4 小時、滿 HK$500 順豐免運、DHL 全球 2-4 天。含尺寸・紙質・工藝・設計要點，30 秒即時報價。

- 真值来源：A2 10 張/HK$16 起、A1 1 張/HK$20 起、免費設計打稿 4 小時、滿 HK$500 順豐免運、DHL 2-4 天 —— 均取自同日线上抓取的 `/zh-hk/category/posters/` desc 与 blog title（`HK$9起` 已在 title）。

### ② `/zh-hk/category/packaging/` — desc（现 136 字符，首句主词为「包裝盒印刷訂製」）

- 现值首句：`包裝盒印刷訂製 100 個起，HK$2.5 起/個 ✓ 食品級紙盒/紙袋/防油紙卡（食品級紙材可選）✓ 免費 1 小時打稿 ✓ 3-5 天出貨 ✓ 滿 HK$500 順豐免運。 适配行业: 美妝護膚品牌…`
- 拟改（**仅改首句词形 + 修尾部中文夹英文**，其余不动）：

  > 食品包裝印刷 100 個起、HK$2.5 起/個：食品級紙盒、防油紙卡、紙袋，食品級紙材可選。免費 1 小時打稿、3-5 天出貨、滿 HK$500 順豐免運。適用美妝護膚、跨境電商、茶飲食品、醫藥保健與婚慶禮盒。

- 真值来源：100 個起 / HK$2.5 起 / 免費 1 小時打稿 / 3-5 天 / 滿 HK$500 順豐免運 —— 同页现有 desc 与 `category-seo-content.ts`。
- 注意：**不动 title**（当量 56 合规）；「适配行业」改为「適用…」仅为中文可读性，不含新增承诺。

### ③ `/ja/blog/textbook-printing-guide/` — desc（现 111 字符）

- 拟改（目标 150-160）：

  > 教科書・教材の印刷製本を100冊から。中綴じ・無線綴じ・製本の3方式、部数別の単価、校正・入稿の流れをまとめて解説。学校・教育機関の一括発注にも対応。無料のお見積りは30秒で完了します。

- 真值来源：100冊から（title 现有）、3製本方式（title 现有）、校正・入稿（页面 markers）、見積り —— 均为页面既有表述；**不写具体价格**（避免与 JPY 真值冲突）。

### ④ `/en/blog/catalog-printing-china-supplier-guide/` — title 58 + desc 331

- 现值 title：`Catalog Printing China Supplier Guide: 4 Binding + 4 Paper`（**58 当量 = 阻断线；无品牌位**）
- 拟改 title（目标 50-57，含品牌）：

  > `Catalog Printing China Guide: 4 Binding + 4 Paper | （品牌）`

  当量核算：需上线前用 `scripts/guards/title-equiv.js` 复核落 50-57；若超，删 `+ 4 Paper`。
- 现值 desc 331 → 拟改（150-160）：

  > `Compare catalog printing in China: 4 binding types, 4 paper stocks, MOQ 10, free proof, DHL 2-4 day worldwide shipping. See real specs and pricing.`

  真值来源：MOQ 10 / free proof / DHL 2-4 day —— 均取自同页与 PDP 现有文案。
- **分两批**：先 desc（批 4a），14 天后再 title（批 4b），否则无法归因。

## C. 执行前必查（车道自查 5 条）

1. 目标字段当前值与本文 before 一致（若已被他人改动 → 停止并报告，勿覆盖）。
2. 改后长度：desc 150-160 字符（ja/zh 按字符，en 按字符）；title 当量 50-57 用 `title-equiv.js` 实测。
3. 门童全链：`check-encoding --fix` / `title-v5`（若改 title）/ `brand` / `gsc-leak` / `meta 完整性`。
4. 单批单变量；commit message 写明「变量=desc 或 title」与基线数字。
5. 上线后 D1/D2 健康检查（200 + 索引未掉），再等 7 天同口径复测。

## D. 未纳入本清单（理由）

- `/en/category/books/` title 75、`/en/category/stickers/` 104、`/ja/category/stickers/` 83：**title churn 敏感面**，且与①-④的 desc 批若同期上线无法归因 → 需 K3/车道单独批准，并各自单批。
- `saddle stitch booklet printing`（pos 9.71 页 1 零点击）：先补有效 SERP 证据（需 HK/US 出口）。
- 任何 MOQ/价格/交期数值：WAITING_K3，不在本清单。

## 数据来源

- 四份诊断包（同日）：`2026-11-04-o6-poster-decision-pack.md`、`2026-11-03-meta-ctr-decision-pack-1106.md`、`2026-11-04-j1-textbook-diagnosis.md`、`2026-11-04-e2-catalog-diagnosis.md`
- 线上实抓：`.hermes/logs/gsc-2026-11-04-o6-live-titles.json`、`gsc-2026-11-04-j1-live-probe.json`、`gsc-2026-11-04-e2-live-probe.json`、`_snippet_probe_1103.cjs` 输出
- 基线数字：`.hermes/logs/2026-11-03-ZP-gsc-feedback.md`、`gsc-2026-11-04-handoff-14q-snapshot.json`、`gsc-2026-11-04-taskj-third.json`
