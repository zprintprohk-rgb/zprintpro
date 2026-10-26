# P0-4 en greeting-cards 无来源承诺清理清单（供 K3 拍板 · 本轮不改内容）

> 任务源: `docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md` §4.4 P0-4 + §10 待拍板 2。
> 执行: DeepSeek 执行层（清单批）· 2026-10-26
> 职责边界: **K3 拍板域**——本清单只列证据与选项，不粘贴新文案、不改 src（策略 §4.4「当前不应直接粘贴一段带价格的新文案」）。

## 1. 数据来源行（§0.23）

- **线上探针**: `.hermes/logs/page-probe-2026-10-26.json`（`/en/category/greeting-cards/`：title「Business & Holiday Card Printing from $0.50」）
- **页面元数据源**: `src/lib/seo.ts` L658（en title）/ L668（en description）
- **类目内容源**: `src/data/category-seo-content.ts` L4311（en h2）/ L4376-4401（en buyingGuide + FAQ）/ L4221-4305（zh-hk 同源）
- **价格真值**: `src/data/products.ts`（greeting SKU basePrice_en：premium 0.13 / matte 0.14 / thick 0.15 / spot-uv 0.18 / foil 0.23 / rounded 0.13；white-card-bags price_range HK$0.50-3.00/個）
- **SKU 数据**: `src/data/sku-seo-data.ts`（greeting SKU en description/body）

## 2. 双方法复算（§0.23.2）

| 结论 | 方法 1 | 方法 2 | 一致 |
|---|---|---|---|
| 正文 $0.13-0.23 = products.ts 真值 | 读 products.ts greeting SKU basePrice_en（6 SKU） | 读 sku-seo-data.ts greeting en 价表（premium $0.13 / thick $0.15 / foil $0.23 / uv $0.18 / matte $0.14） | ✅ |
| 线上 $0.50 ≠ greeting 真值 | grep `$0.50` 全 src：white-card-bags HK$0.50（products.ts L6482） | grep `0.50` greeting 相关 SKU：无命中 | ✅（$0.50 为白卡盒价格误用于 greeting title） |
| h2「100 MOQ」vs 正文「10 MOQ」冲突 | 读 category-seo-content.ts L4311（h2 100 MOQ）vs L4393（FAQ 10 sheets） | 读 seo.ts L658 title（10 MOQ） | ✅（页面内 100/10 并存） |

## 3. 清理清单

### A. 价格冲突（$0.50 vs $0.13-0.23）——K3 拍板价格口径后改

| # | 位置 | 现值 | 问题 | 选项 |
|---|---|---|---|---|
| A1 | `src/lib/seo.ts` L658 en title | `from $0.50` | $0.50 无 greeting 真值（白卡盒 HK$0.50 误用） | 改 `from $0.13`（正文真值）或 K3 指定口径 |
| A2 | `src/lib/seo.ts` L668 en description | `from $0.50 / 10 MOQ` | 同上 | 同 A1 |
| A3 | `category-seo-content.ts` L4311 en h2 | `from $0.50 \| 3D Pop-Up \| 100 MOQ + Free Proof` | $0.50 同上 + **100 MOQ vs 正文 10 MOQ 冲突** | $0.13 + 10 MOQ（与正文/FAQ/SKU 对齐） |

### B. 无来源案例/百分比（en buyingGuide）——K3 拍板删或证据化

| # | 位置 | 现值 | 问题 |
|---|---|---|---|
| B1 | L4382 | `customer repurchase rate +30%` | 无来源百分比 |
| B2 | L4383 | `7-day 780K RMB GMV (TikTok Paper Love case)` | 无来源第三方案例 + **TikTok/Paper Love 第三方品牌名**（品牌门童 A 类风险） |
| B3 | L4384 | `EU/US customers willing to pay 20% premium` | 无来源百分比 |
| B4 | L4385 | `unit price can drop to $0.07` | 无来源价格（products.ts 无 $0.07 greeting 档） |

### C. 保证性交付承诺——K3 拍板核实边界

| # | 位置 | 现值 | 问题 |
|---|---|---|---|
| C1 | L4381 | `guaranteed pre-Christmas delivery` | 保证词（旺季排期无运营依据） |
| C2 | L4394 FAQ | `Order by mid-November for guaranteed pre-Christmas delivery` | 保证词 + 截单日（11 月中无运营依据） |
| C3 | seo.ts L668 | `November cut-off for pre-holiday delivery` | cut-off 承诺（同 C2） |

### D. H1/标题堆叠（探针 H1）——核实后收窄

| # | 元素 | 现状 | 依据 |
|---|---|---|---|
| D1 | Free Shipping | H1 堆叠 | ✅ 站级模板（US $99+ 免运）——保留 |
| D2 | 10 MOQ | H1 堆叠 | ✅ products.ts/FAQ 一致——保留 |
| D3 | Foil UV | H1 堆叠 | ✅ 工艺真实——保留 |
| D4 | Same Day 24h Rush USA | H1 堆叠 | ⚠️ 需核实：FAQ 仅「rush 24-48h available on request」（描述性）；「Same Day 24h」更强承诺——无运营依据则删 |
| D5 | Christmas Wedding | H1 堆叠 | ⚠️ 品类词（wedding 由 wedding-invitations 承接）——确认不误导 |

### E. zh/ja 同源残留（顺带标注，不在 P0-4 主域——同族问题待拍板）

| # | 位置 | 现值 | 问题 |
|---|---|---|---|
| E1 | zh L4292 | `客戶回購率提升 30%+` | 无来源百分比（同 B1） |
| E2 | zh L4293 | `7 天 78 萬 GMV 實證 (TikTok Paper Love 案例)` | 无来源案例（同 B2） |
| E3 | zh L4294 | `願付 20% 溢價` | 无来源百分比（同 B3） |
| E4 | ja L4412 | `米国 70 億枚/年、90% 家庭購入` + `LovePop モデル 4,000 万ドル/年` | 无来源市场数据 + **LovePop 第三方品牌名** |
| E5 | zh L4231 | `US 70B 張/年, 90% 家庭買` | 无来源市场数据（同 E4 数据源） |

## 4. K3 拍板项（对应策略 §10 待拍板 2）

1. **en greeting 价格口径**：title/正文统一为哪个？（推荐 $0.13-0.23 价表 = products.ts 真值；$0.50 移除）
2. **承诺边界核实**：MOQ（10 ✓）/ free shipping $99+（✓）/ 4-hour free proof（✓ 站级）/ **same-day 24h rush** / **pre-Christmas guaranteed + mid-November cut-off**——后者两项若运营可兑现则保留并写清边界（截单日/区域），否则删
3. **案例/百分比**：B1-B4 + E1-E5 删除（推荐——无来源即删，per §0.23 数据诚信）或提供证据化来源
4. **品牌名**：TikTok/Paper Love/LovePop（第三方）删除或证据化——品牌门童 A 类风险

## 5. 执行承接（拍板后）

- A1-A3 + D4：DeepSeek 原子批（seo.ts + category-seo-content.ts en 块；title 改后过 title-v5 当量 + 冻结槽检查）
- B/C/E：DeepSeek 原子批（category-seo-content.ts 三语块；删除不补新文案——策略 §4.4「不粘贴新文案」）
- 完成后: gsc-leak-guard / brand-mentions --strict / title-v5 / encoding / tsc 全绿 + 线上探针（title/h1/正文同价）

> 数据来源: 见 §1。
