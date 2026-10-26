# POSTER-P1-09 zh 海报 — 采购答案内部数据包（2026-10-27 02:1x）

> 任务源: `docs/2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md` §10.2 POSTER-P1-09（保 guide 信息角色，商业词链 category／PDP；急件条件化）。
> 执行: DeepSeek 执行层 · 2026-10-27 02:1x · **docs-only 数据包（未落 src；急件/防水声明待 K3）**。
> 停止条: 不大规模加文；点击继续降先回查改动。

## 1. 数据来源行（§0.23）

- 真值源: `src/data/products.ts` L1905-2710（flyers 7 SKU + posters 3 SKU：price_range / minQuantity / specs / basePrice）
- 线上探针: Invoke-WebRequest UA=Mozilla/5.0，2026-10-27 02:1x（zh-hk category/posters + a2-posters + same-day-flyers PDP）
- 先遣: 基线冻结 v1.0（zh 海报簇基线 1,997 展示／10 点击，pos ~27-31）；策略 §2.3
- 平行会话: 无海报簇重叠（已核其 E1/E4/E6/packaging 覆盖）

## 2. 真值表（products.ts SSoT）

### Flyers（7 SKU，minQ 均 10）
| SKU | price_range | basePrice_en | 材质 | 尺寸 | 工艺 |
|---|---|---|---|---|---|
| a4-flyers | HK$0.35-0.95/張 | $0.55 | 157g銅版/128g啞粉 | A4 210×297 | 覆膜（啞/光） |
| a5-flyers | HK$0.25-0.65/張 | $0.40 | 128g銅版/100g書紙 | A5 148×210 | 覆膜 |
| double-sided-flyers | HK$0.40-0.95/張 | $0.65 | 157g銅版/128g啞粉 | A4/A5 | 四色雙面 |
| folded-leaflets | HK$0.70-1.95/張 | $0.80 | 157/200g銅版 | A4展開/DL | 壓線+覆膜 |
| thick-paper-flyers | HK$0.45-1.20/張 | $0.70 | 200/250g銅版 | A4/A5 | 覆膜 |
| eco-flyers | HK$0.38-0.95/張 | $0.60 | **FSC認證再生紙+大豆油墨** | A4/A5 | 無覆膜/水性光油 |
| same-day-flyers | HK$0.55-1.50/張 | $0.95 | 157g銅版 | A4/A5 | 高速數碼；無覆膜或啞膜(加時) |

### Posters（3 SKU）
| SKU | price_range | basePrice_en | minQ | 材质 | 尺寸 |
|---|---|---|---|---|---|
| a2-posters | **HK$95-1,017（整單價？见 §4-3）** | $2.30 | **10** | 157g銅版(可升200g/相紙) | A2 420×594 |
| a1-posters | HK$290-7,200（整單） | $4.60 | **1** | 157–200g銅版或相紙 | A1 594×841 |
| outdoor-posters | HK$16-55/張 | $3.68 | 1 | 戶外PVC/PET/合成紙 | 依稿面 |

## 3. 主 URL 内链现状（2026-10-27 02:1x 线上）

| 方向 | 现状 | 结论 |
|---|---|---|
| zh category/posters → PDP | a2/a1/outdoor/flyers **4/5**；**same-day-flyers 缺失** | 🔶 **唯一内链缺口**（零声明可补，锚=产品名「即日傳單印刷」；已登记为待落一行） |
| PDP → category | a2/same-day 抽查 back-to-cat=True | ✅ 已齐 |
| poster guide ↔ category | 待 K3 批内链批时一并核 | 🔶 次批 |

**结论**: POSTER-P1-09 内链仅 1 个缺口（category→same-day），**已备好一行落位**（见 §6 批次 2），本轮未落 src（避免与 category 页急件/防水声明工作纠缠）。

## 4. 声明与口径治理（K3-2/K3-7 拍板项）

| # | 声明 | 位置（线上/源） | products.ts 真值 | 建议（分析师推荐） |
|---|---|---|---|---|
| 1 | **最快當天交貨・即日印刷・即日快遞出貨** | same-day-flyers desc + zh A2 PDP H1「即日」+ category 含「即日」 | turnaround 未单列（products.ts 无同款承诺字段） | 🔴 急件承诺边界 = K3-2 同族；「當天交貨/即日快遞」需业务确认城市/截單時間；否则条件化（「最快當天（視截單）」） |
| 2 | **防水防曬耐用**（a2 desc）/ **防水防曬材質・戶外使用不褪色**（outdoor desc） | 线上 desc | 无实测字段 | 🔴 K3-7：无测试不写防水年限/不褪色；建议改「可選 PP 裱貼／霧面護膜」材质口径 |
| 3 | **海报 price_range 口径不一致** | products.ts a2=HK$95-1,017 vs category desc「HK$12.9起/張」 | a2 minQ=10 → HK$95 疑为整單/批量口径 | 🔶 采购答案需统一口径（每張 vs 每單），防误导——同 catalog C4 价格带宽问题族 |
| 4 | FSC認證再生紙+大豆油墨（eco-flyers） | products.ts material | 同纸袋簇 §4-2/3 | 🔶 同 K3-7 FSC 族（业务证据或条件化） |

## 5. 采购答案草稿（内部；待 K3 对 §4 拍板后落 category 首屏直答）

- **起印量**: 傳單 10 張起印；海報 A2 10 張起（A1/戶外 1 張起）。
- **價格**: 傳單 A5 HK$0.25-0.65/張、A4 HK$0.35-0.95/張（依紙/工藝）；A2 海報「HK$12.9起/張」口径待 §4-3 校正。
- **尺寸**: 傳單 A5/A4、對摺/DL；海報 A2/A1、戶外依稿面。
- **材質**: 銅版紙 128-250g、啞粉紙、相紙、戶外 PVC/PET/合成紙。
- **工藝**: 覆膜（啞/光）、PP裱貼、泡沫板裱貼、壓線、燙金（海報）。
- **交期**: 標準 3-5 工作天；急件见 §4-1（条件化后写入）。

- **商业词链锚（登记口径）**: a2=主推海報／a1=大幅／outdoor=戶外廣告／same-day=急件傳單（补链用）／eco-flyers=環保傳單。

## 6. 推荐执行批次（K3 拍板后）

1. **批次 1（急件/防水 K3-2/7 裁决）**: same-day + a2 + outdoor desc/H1 声明条件化（src 批）。
2. **批次 2（零声明，可独立）**: category → same-day-flyers 补链 1 行（锚=「即日傳單印刷」产品名；不新增声明）。
3. **批次 3（采购答案）**: category 首屏直答 + 价格口径统一（§4-3）。
4. **guide 核链**: poster guide ↔ category/PDP 双向现状（随批次 2 一并核）。

## 7. NEXT

- 本包与 BAG-P1-08 包（纸袋）构成 zh 侧 P1-A 采购答案数据就绪；待 K3 拍板（优先 K3-2 急件、K3-7 防水/FSC）→ 当日落地。
- 基线复测 11-23：zh 海报簇 1,997/10 基线同口径复跑。

> 数据来源: products.ts L1905-2710；线上探针 2026-10-27 02:1x（3 URL）；基线冻结 v1.0；平行会话覆盖核（无海报重叠）。本包为内部文档（§0.23.1）。
