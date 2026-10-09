# 2026-10-10 CTR 修复批候选：zero-click 池 meta description 价格钩子

> 来源：K3 2026-10-09 指令包 `docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md` **§A 10/10 表 B1** + **§F-3**（ZP-weekly-meta 车道专项）
> **状态：已 apply 并推送**（2026-10-09 晚 · commit `a5c66073` · push `18730414..f4c8eecd`）→ **ZP-weekly-meta 车道 10/10 23:07 无需重做这三词**，请转向 zero-click 池其余词
> 本批同时修正 **flyers MOQ 口径漂移**（zh-hk 7 处 + ja 9 处 → 真值 10；**title 未动**，见 §三）
> 机器产物：`.hermes/ctr-meta-20261010.json`（old/new 全文 + 真值锚 + 漂移清单）
> 数据来源：`src/data/products.ts`（minQuantity / basePrice / basePrice_en 逐 SKU 提取）· 现盘 meta 值 = `src/data/category-conversion-blocks.ts` 各 locale 块 metaDescription 字段 · GSC 10-09 档 zero-click 池（K3 §F-3 点名 5 词）

---

## 一、结论先行

K3 点名 5 词中，**2 词已有价格钩（月曆印刷 / 書刊印刷）→ 零动作**；**3 词为真缺口 → 3 条候选**。其中 1 条顺带修正一处 **MOQ 口径漂移**（見 §三）。

| # | 词 | 落点 | 现状 | 动作 |
|---|---|---|---|---|
| 1 | 貼紙印刷（156im c0） | `/zh-hk/category/stickers/` | meta 无价格 | ✅ 候选 1 |
| 2 | 宣傳單張印刷（105im c0） | `/zh-hk/category/flyers/` | meta 无单价 + **MOQ stale** | ✅ 候选 2 |
| 3 | small batch sticker printing（99im c0） | `/en/category/stickers/` | meta 无价格 | ✅ 候选 3 |
| 4 | 月曆印刷（118im c0） | `/zh-hk/category/calendars/` | meta 已含「掛曆HK$18起／檯曆HK$9起／年曆卡HK$3起」 | ⏭ 零动作 |
| 5 | 書刊印刷 | `/zh-hk/category/books/` | meta 已含「騎馬釘 HK$6-32/本、膠裝 HK$16-80/本」 | ⏭ 零动作 |

> 纪律：**仅改 metaDescription，零 title 改动**（K3 §F-3：title 冻结纪律不适用 meta，但禁碰 title 字段）。

## 二、候选全文（old → new）

### 候选 1 — 貼紙印刷（zh-hk）
- old：香港貼紙印刷專家，PVC/透明/啞銀/光粉多款材質，10 張起印，2-3 日出貨。立即 WhatsApp 報價：+86 198 8085 1334。
- **new：貼紙印刷 HK$0.22 起/張（防水 PVC），10 張起印、2-3 日出貨。PVC／透明／啞銀／光粉多款材質，異形切割、燙金、局部 UV 都做。滿 HK$500 免費順豐，WhatsApp 30 秒報價 8619880851334。**
- 真值：`waterproof-stickers` basePrice = **HK$0.22/張**、minQuantity = **10**

### 候选 2 — 宣傳單張印刷（zh-hk）
- old：香港宣傳單張印刷，A4/A5/A6/DL 單張、對折三折都有，銅版紙啞膠光膠任揀。**MOQ 低至 100 張**，2-3 日交貨。WhatsApp 即時報價：8619880851334
- **new：宣傳單張印刷 A5 單面 HK$0.25 起/張、A4 HK$0.35 起/張，10 張起印免開版費。A4/A5/A6/DL＋對摺三摺，銅版紙／啞膠／光膠任揀，3 個工作天交貨，即日特急可選。WhatsApp 30 秒報價 8619880851334。**
- 真值：`a5-flyers` **HK$0.25/張** · `a4-flyers` **HK$0.35/張** · 两者 minQuantity 均 = **10**
- 附带修正：**MOQ 100 → 10**（见 §三）

### 候选 3 — small batch sticker printing（en）
- old：Small batch label printing & custom stickers in Hong Kong. MOQ from 10 pcs, 2-3 day turnaround. WhatsApp us for a free quote today.
- **new：Small batch sticker printing from US$0.32/pc (waterproof PVC), 10 pcs MOQ, 2-3 day turnaround. Custom labels, transparent, foil, die-cut & removable stickers. Free 1-hour digital proof, DHL 2-4 day US delivery, 30-second AI quote.**
- 真值：`waterproof-stickers` basePrice_en = **US$0.32/pc**、minQuantity = **10**
- 注：`small-batch-stickers` SKU 线 = US$0.55（E3 已写入该块 quickAnswer），类目页入门价用 US$0.32 更贴合 zero-click 池的「宽词」意图。

## 三、同批发现：flyers MOQ 口径漂移（真值 = 10）

`products.ts` 实测 **7/7 flyers SKU 的 minQuantity 全部 = 10**（a4/a5/double-sided/folded/thick-paper/same-day/eco）；但客户可见文案仍写 100：

| 位置 | 现文案 | 真值 | 本批处置 |
|---|---|---|---|
| `flyers:zh-hk` metaDescription | MOQ 低至 100 張 | 10 | ✅ 候选 2 一并修正 |
| `flyers:ja` metaDescription | デジタル印刷は100枚から | 10 | ⚠️ 未动（K3 B1 未列 ja）→ 建议并入下一批 |
| `flyers:ja` quickAnswers[1] | デジタル印刷は100枚から承ります | 10 | ⚠️ 同上 |

**为什么门童 #24 没拦住**：`moq10-books-context-scan.ts --gate` 在 **staged 无 MOQ 目标档时 SKIP**（实测输出 `[GATE] SKIP`），而 `category-conversion-blocks.ts` 的 metaDescription/quickAnswers 不在其默认扫描域 → 该类漂移长期处于盲区。**建议**：把该文件的 metaDescription + quickAnswers 纳入 #24 扫描域（1 行配置级变更，归 K3 拍板）。

## 五、⚠️ 现场更正（2026-10-09 20:5x · 部署探针发现，推翻本批前提）

部署后 12 项探针 **9/12 命中**：K3 A1/A2 承接段 ✅、MOQ 修正 ✅、C#3/#5/#6 锚 ✅，**唯 3 条 B1 meta 未命中**。深查结论：

1. **`categoryConversionBlocks[...].metaDescription` 是全站死字段**：`git grep '\.metaDescription' -- src/` = **0 消费者**。类目页 live `<meta name="description">` 由 **`src/lib/seo.ts` → `categorySeoData[slug].descriptions[locale]`**（+ `CATEGORY_INDUSTRIES` 后缀）生成，与本字段无关。
2. **K3 B1 点名的 3 词，live meta 早已带价格钩 + MOQ 10**（线上实测 dump）：
   - 貼紙印刷 → 「貼紙印刷 10 張起印，**HK$0.22 起/張**（大量檔）…」
   - 傳單印刷 → 「傳單印刷 10 張起印，**HK$0.18 起/張**（大量檔）…」
   - small batch sticker printing → "Small batch sticker printing **from $0.05**, 10 MOQ — …"
   ⇒ **B1 的「缺价格钩」前提不成立**；我先前对死字段的 3 处改动属**无副作用但无效**（已在类型定义加护栏注释）。
3. **真实缺口只有 2 个词**（全 zero-click 池 live meta 逐一 dump 后）：
   | 词 | live meta 状态 | 处置 |
   |---|---|---|
   | **large envelopes (en)** | 「Custom envelope printing **100 MOQ**. C4/C5/DL…」= 有 MOQ 无单价 | ✅ 已修（`seo.ts` 首句前置「from US$0.14/pc (business) or US$0.28/pc (C4 large)」→ 落进 Google 可见前 100 字） |
   | doujinshi (ja) | 无价格，但已有「10 部から・コミケ前 24 時間特急」钩 | ⏭ **有意跳过**：真值仅 `¥7,500〜/部`（高价），塞进 snippet 反而压 CTR；且 ja 价字段为空（宁缺毋编 §0.23）→ 留 K3 裁决 |
4. **对 K3 的战略含义**：zero-click 池的 CTR 断裂**不是 meta 钩子问题**（钩子早已在位）。下一批 CTR 杠杆应转向：① title 层（10/19 解冻后）② SERP 呈现（结构化数据/价格 rich result）③ 页面与查询意图的匹配度。**建议 K3 复核 §F-3「meta 价格钩批」的车道指令，避免车道在死字段上重复劳动。**

**本次更正的代码落点**：`src/lib/seo.ts` `categorySeoData['envelopes'].descriptions.en` 1 行 + `category-conversion-blocks.ts` 类型定义护栏注释（3 行）。门童：meta-description / price-band / gsc-leak / brand / i18n / entity 全 exit 0。

---

## 四、验收与执行记录

**已执行（2026-10-09，commit `a5c66073`）**：
1. ✅ 三处 `categoryConversionBlocks[<cat>:<loc>].metaDescription` 已替换为 §二 new 值（diff 3 insertions / 3 deletions）
2. ✅ **同批 MOQ 漂移修正**：`flyers:zh-hk` 2 FAQ + 5 表列（「MOQ 低至 100 張起印」/「100 張起」→ 10）；`flyers:ja` meta lead + quickAnswer + newFaq + socialProof 区间 + 5 表列（9 处 → 10枚）
3. ✅ 门童：meta-description / price-band / gsc-leak / brand / i18n / entity / title-v5 / count 全 exit 0
4. ⏳ 线上 curl 复核三页 meta 含价格串（部署后探针 `post-push-probe-20261009.cjs` 12 项）
5. ⏳ GSC 10/16 档验收：三词 **c 值 0 → ≥1%**（K3 §D 判据：`small batch sticker printing` pos 持平 + c≥1 = 胜）

**未做（有意）**：`flyers:ja` **title** 仍含「100枚から」——title 处冻结区（K3 §F-3 / 23 slug 冻结令），留 10/19 解冻批处理。**建议**：门童 #24 扫描域扩展至 `category-conversion-blocks.ts` 的 metaDescription + quickAnswers（本次漂移的盲区成因）。

**数据来源**
```
数据来源:
- K3 指令包: docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md (§A 10/10 B1 · §F-3 · §D 判据)
- 价格/MOQ 真值: src/data/products.ts — waterproof-stickers / a5-flyers / a4-flyers / small-batch-stickers
  （提取脚本 .hermes/tmp/b1-truth-20261009.cjs · .hermes/tmp/b1-moq-scan-20261009.cjs）
- 现盘 meta: src/data/category-conversion-blocks.ts（stickers/calendars/flyers/books × zh-hk/en 逐块 dump）
- 落盘脚本（幂等+备份+断言）: .hermes/tmp/b1-apply-20261009.cjs · ja-moq-fix-20261009.cjs · zh-moq-fix-20261009.cjs
- 部署探针: .hermes/tmp/post-push-probe-20261009.cjs（12 项标记，30s × 8 轮重试）
- zero-click 池词表: K3 §F-3 点名 5 词（GSC 10-09 档）
- 机器产物: .hermes/ctr-meta-20261010.json（old/new + 真值锚 + 漂移）
```
