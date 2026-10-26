# AEO BLUF 采购答案骨架（§6.2 · 优化级 P1 · 诊断交付物）

> 任务源: `docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md` §6.2（AEO：可见采购答案）+ 第 2 周路线图（AEO 每个目标页先补 BLUF + 采购表 + 限制条件，再决定 FAQ）。
> 执行: DeepSeek 执行层 · 2026-10-26 22:22 · **只出骨架与真值清单，不粘贴新文案、不改 src**（策略 §4.4：价格口径未拍板前不直接粘贴带价格的新文案）。
> 适用范围: 本周已做无风险内链的 3 个 en PDP（saddle / exercise / catalog）——内链 commit a07c619d。

## 1. 数据来源行（§0.23）

- **价格/MOQ 真值**: `src/data/products.ts`（SSoT）：saddle-stitch-booklets `basePrice_en=1.84 / price_range='HK$6-32/本' / minQuantity=10`；exercise-books `basePrice_en=1.84 / 'HK$4-16/本' / 10`；catalog-printing `basePrice_en=4.6 / 'HK$2.8-1000/本' / 10`。
- **页面现 body 文案**: `src/data/sku-seo-data.ts` L1989（saddle en body）/ L2277（exercise en body）/ L1953（catalog en body）——首段均以场景叙事开头（"When you need a printed piece that is light..." / "Every school day starts..." / "A well-made catalog does more than list products..."），**无 BLUF 第一句**。
- **线上渲染路径**: `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx` L721 `parseInlineLinks(bodyLead)` + L413 `renderRich(p)`——body 首段可直接承载 BLUF。
- **交付能力真值**: 页面 FAQ/正文既有（10-copy MOQ、DHL 2-4 days、free US ship over $99、30s AI quote、free proof within 4h、Q4 peak）。

## 2. 双方法复算（§0.23.2）

| 结论 | 方法 1 | 方法 2 | 一致 |
|---|---|---|---|
| 三页 MOQ=10 | 读 products.ts `minQuantity: 10`（3 SKU） | 读 sku-seo-data.ts en body（"10-copy digital minimum" / "10-copy minimum"） | ✅ |
| 三页 en 起价 1.84/1.84/4.6 | 读 products.ts `basePrice_en` | 读 sku-seo-data.ts en body（"At US$1.84 per booklet" / "Pricing starts at US$1.84" / "pricing starts at US$4.6 per book"） | ✅ |
| 三页 body 首段无 BLUF | 读 sku-seo-data.ts en body 首段 | 线上探针（22:16 `_probe_postpush.py`：三页 200，H1 正确） | ✅（内容未改，首段仍叙事式） |

## 3. BLUF 骨架（每页待落位的第一句，§6.2 第 1 条）

> **目标形态**（§6.2）：直接回答「适合谁、从多少数量/价格起、标准交期」——例如：`Custom <product> for <who>, from <qty> copies / US$<price>, delivered in <days> via DHL Express.`

| 页面 | 应回答（真值已核） | 待拍板/缺口 |
|---|---|---|
| **saddle-stitch-booklets** en | 8–64 页骑马钉小冊子；适合 menus/programs/guides；10 本起印；en 起价 $1.84；2-4 天 DHL | 无价格冲突（$1.84 已上线 H1/body 一致）；BLUF 落位待 K3 批「首段改写为 BLUF」 |
| **exercise-books** en | 学校/补习社作业簿；10 本起印；en 起价 $1.84；2-4 天 DHL；含 custom textbooks 互链 | 同左；教科书/作业簿互链已随 a07c619d 落位 |
| **catalog-printing** en | 目录/摄影集/品牌册；10 本起印；en 起价 $4.6；2-4 天 DHL；中国供应商 guide 互链 | **价格带宽 HK$2.8-1000/本 跨度过大**（basePrice 24 HKD 起）——en 口径 $4.6 与 zh 带宽需 C4 价格架构拍板（策略 §10 待拍板项 4） |

## 4. 采购决策表骨架（§6.2 第 2 条）

| 维度 | saddle | exercise | catalog |
|---|---|---|---|
| 尺寸 | A4/A5 | A4/A5 | A4/A5 |
| 内页纸 | 128–157g coated/book | 80–100g book/woodfree | 157–200g coated |
| 封面 | 250g 可选覆膜 | 200g coated + lamination | 200–250g coated + matte/gloss/foil |
| 页数 | 8–64 | — | — |
| 工艺 | 4C CMYK digital/offset | 4C cover + 1-2C inner | 4C offset + foil |
| MOQ | 10 | 10 | 10 |
| 交期 | 2-4 days DHL | 2-4 days DHL | 2-4 days DHL |
| 免运 | US$99+ | US$99+ | US$99+ |

（值均来自 sku-seo-data.ts en body + products.ts，非新增文案。）

## 5. 限制条件（§6.2 第 3 条，需在页面体现）

- 旺季：Q4 peak，提前确认文件保交期（三页 body 均有该表述）。
- 跨境时效：DHL 2-4 天为常态，非承诺 SLA；rush 能力需报价确认。
- 价格带宽：catalog HK$2.8-1000/本 跨度过大——**C4 价格架构拍板前，en BLUF 不得写死单一带宽价格**。
- 承诺边界：10-copy MOQ 已上线真值一致；不打「500+ 同行业」对比数字（已有 body 提到，保留）。

## 6. 执行路径与责任人

1. **K3 拍板**：①三页「首段叙事 → BLUF」改写批（含新文案落位）；②catalog en 价格带宽口径（§10 待拍板项 4 C4）。
2. **DeepSeek 执行**（拍板后攒批）：sku-seo-data.ts en body 首段改写为 BLUF + 采购决策表（Markdown 表或 <table>）+ 限制条件段；跑 §0.25.10 审查 4 件 + 门童全量（title-v5/i18n/entity/brand/gsc-leak）+ tsc 54=54。
3. **验收**：线上探针首段 = BLUF 形态；真值与 products.ts 一致；FAQ 不重复正文。

## 7. 结论

- **现状**：三页 en body 有完整采购信息（价格/MOQ/交期/材质均真值一致）但**首段非 BLUF**——AEO 可提取性弱（模型抓首段时只能得到场景叙事，不是"10 本起、$1.84、2-4 天"）。
- **下一步**：BLUF 首句改写 = 本轮内链（a07c619d）的**自然后续**，但含新文案 → 走 K3 拍板 + §0.25.10，不自主落位（周末闸门：P0 未完全拍板前不做大规模内容生产）。
