# 2026-10-12 B1c 簇 1（stickers 5 兄弟）逐页重写清单 — 待 K3 过目

> **状态**: ✅ **已执行完毕**（K3 2026-10-12 拍板「做」→ 当日 09:0x 落地双端）。验收：簇内相似度 0.955-0.98 → **≤0.221**；门童 tsc 54=54 / title-v5 15槽 0 HARD / detox 0 / gsc-leak 0 / brand 0。进度登记 `.hermes/logs/b1c-queue-progress.json`（DONE）。本文件保留为执行 SSoT 与对账依据。
> **上游 SSoT**: `docs/2026-10-12-recovery-lane-defense-plan.md` §3（B1c 队列序 1）
> **方法**: 簇内主推锚页轻改 + 兄弟页深改；差异化锚 = 材质/工艺/场景/真实 variables 定价；**数字一律 products.ts 现取**（§0.23）
>
> **数据来源**（§0.23 强制行）:
> - 相似度实锤: `docs/2026-10-12-b1-sku-template-audit.md` + `.hermes/analysis/sku-similarity2-2026-10-12.json`（本 run 复算 zh-hk 簇内 0.955-0.959）
> - 真值锚点: `src/data/products.ts` L726/L824/L1214/L1311/L1408（本 run 逐字段一手直读）
> - 现状正文: `src/data/sku-seo-data.ts` L26/L62/L206/L242/L278（15 槽一手直读）
> - 管线权威: `scripts/csv-to-sku-seo.mjs` L136-147（**body/faqs = ts 权威例外域**，CSV 只供 title/desc/h1/keywords）
> - 门童基线: title-v5 #27（本簇 5 槽 0 HARD）、keywords-detox #29（0 违规）、brand A 类 0、gsc-leak #16 上线后全量
> - 千问稿件: `.hermes/tmp/qwen38max-recovery-plan-20261012.txt` 同批对话载荷（外部顾问稿，**仅作差异化思路参考**）

---

## §0 千问稿件对账（先泼冷水：稿不能直接落地）

| 千问 5 页 | 对应真实资产 | 裁决 |
|---|---|---|
| 貼紙印刷（主推权威页） | 类目页 `/category/stickers/`（已有独立 content `stickersContent`，不在 96% 簇内） | 🔧 改造为类目页增强素材**另案**，不进 B1c |
| 透明貼紙 | `transparent-stickers` ✓ 本簇实锤页 | ✅ 思路可借鉴，数字全换 |
| 模切貼紙 | `die-cut-stickers` ✓ 存在但**不在本簇**（第 2 梯队） | 🔧 留作 wave 2 模板 |
| 卷裝貼紙 | **products.ts 无此 SKU**（ hallucinated ） | ❌ 整页驳回；其内链「Roll Label Printing」是死链 |
| 燙金貼紙 | `foil-stickers` ✓ 本簇实锤页 | ✅ 思路可借鉴，数字全换 |

**致命问题三条**:
1. **页面对不上**: 千问覆盖了 waterproof/transparent/foil/fluorescent/security 簇中 **2/5 页**；zh-hk 互扫 0.955-0.959 的实锤 5 页里，**waterproof / fluorescent / security 三页零稿件**——恰是 spam 指纹最重的页。
2. **数字全部无来源**（§0.23 红线）: 「8,000 单/年」「2,000 万张卷装」「±0.15mm」「白墨遮蓋率≥95%」「TiO₂≥25%」「50μm PET」「Sato/Zebra/Cab/TSC 兼容表」「10K 9 折 50K 8 折」「MOQ 50」「48 小时确认」「$0.10-0.20/張」—— recovery plan §2 已驳回过同款「12,000+ 订单」，本稿同罪。且与 products.ts 真值冲突：真 MOQ=10（非 50）、真打稿=1 小时免费数码稿（非 48h）、真材质=PVC防水/PP合成纸/PET透明（无六材矩阵）。
3. **标题不合 v5**: 如「貼紙印刷｜香港專業貼紙印刷服務 — 材質×工藝×應用全指南 \| ZprintPro」远超 57 当量阻断线 + 「香港專業」类承诺词，门童 #27 必拦。

**结论**: 千问稿 = 差异化**思路**参考（应用场景导向/工艺导向/B2B 量产导向的页间分工是对的），**逐字不可用**。

---

## §1 真簇实锤与本 run 新增病灶

### 1.1 实锤（B1 审计 + 本 run 复算一致）
- 5 SKU 三语正文同一模板换产品名：zh-hk 簇内任两页 0.955-0.959；en transparent↔foil 0.98。
- zh FAQ Q1「防水貼紙戶外可維持多久？」**9 个贴纸 SKU 全同**（含透明/燙金/防偽/螢光页——张冠李戴）。
- en/ja FAQ 同样 9 槽全同；en FAQ Q2 写 "100 stickers minimum" —— **与 en title「10 MOQ」和 products.ts minQuantity=10 直接矛盾**。
- `products.ts` 9 个贴纸 SKU `faqSchema` 完全同一份（IP65 / 户外 3 年 / 洗碗机 80°C / ≥500 免刀模费 / 12 小时打稿）——JSON-LD 层面的同源指纹，**渲染到每页 <head>**。

### 1.2 本 run 一手新病灶（重写时必须一并修）
| # | 病灶 | 位置 | 级别 |
|---|---|---|---|
| A | en body 应用场景含 "pet food labels and FDA-compliant packaging"（B1b 只清了 keywords 级，body 级 pet 污染残留 ×5 页） | sku-seo-data.ts en body | 🔴 spam 指纹 |
| B | imageAlt en 5 槽全带 "pet food and brand labels"；waterproof imageAlt zh-hk="PVC waterproof stickers with excellent water"（英文入 zh 槽+断句）、ja=" and abrasion resistance. Perfect for outdoor use"（碎句入 ja 槽） | sku-seo-data.ts imageAlt | 🔴 跨语言污染（§5 贺卡同型病） |
| C | ja H1 4 槽 = 通用模板「高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。」；transparent ja H1 = **整句英文** | sku-seo-data.ts ja h1 | 🔴 |
| D | ja description「XのXは ZprintPro にお任せ」口吃模板 ×5；zh description「防水貼紙/防水貼紙 100 張起」双名 + **100 張起与 title「10個起」/body「10 張起印」三口径互斥** | sku-seo-data.ts desc | 🔴 |
| E | products.ts transparent `descriptionEn`/`descriptionJa` 尾段混入简体「适配行业：」（N15 类 en/ja 中文污染，products.ts 源级） | products.ts L831 | 🟠 |
| F | 数字内战：body 交期 3-5 工作天 vs products.ts desc 5-7 天；body 户外 3-5 年/室内 5-7 年 vs faqSchema 户外 3 年 vs ja FAQ 室内 1-2 年；ja 加急 +20% vs ja FAQ +30% | 多处 | 🟠 待 K3 给真值（§4） |
| G | zh title 量词「10個起」（贴纸港式惯用「張」）；en title 部分槽无价格钩子（transparent/security/fluorescent） | sku-seo-data.ts title | 🟡 可选优化，非必须 |

---

## §2 真值锚点表（全部 products.ts 一手现取，重写只准用这张表）

| 项 | waterproof（主推锚页） | transparent | foil | security | fluorescent |
|---|---|---|---|---|---|
| slug | waterproof-stickers | transparent-stickers | foil-stickers | security-stickers | fluorescent-stickers |
| SKU | ST-001 | ST-002 | ST-006 | ST-007 | ST-008 |
| minQuantity | 10 | 10 | 10 | 10 | 10 |
| 起價 zh / en / ja | HK$0.22 / $0.32 / ¥41 | HK$0.38 / $0.41 / ¥51 | HK$0.78 / $0.51 / ¥64 | HK$1.15 / $0.41 / ¥51 | HK$0.52 / $0.46 / ¥60 |
| price_range | HK$0.22-1.0/張 | HK$0.38-1.50/張 | HK$0.78-2.80/張 | HK$1.15-4.00/張 | HK$0.52-2.00/張 |
| 材质真值 | PVC防水／PP合成紙 | 透明PET（+白墨可選） | 銅版紙／合成紙＋燙金 | 易碎紙／VOID／合成紙＋全息膜 | 螢光PVC膜／螢光紙＋螢光油墨 |
| 工藝真值 | 啞膜/光膜/異形模切；3M背膠可選 | 啞膜/光膜/精細模切/白墨 | 燙金燙銀＋四色分版/局部UV | 可變序號/QR/條碼；全息冷燙 | 反光條紋覆合；SGS無重金屬 |
| 規格真值 | 10×10mm–300×400mm | 寬邊 20–120mm 級距 | 箔面最小字高視稿評估 | 小標籤至 A4 拼版 | 20×20mm–280×380mm |
| variables 差異 | 材質 PVC+0 / PP+10% | 材質 PET透明+15% | 待读现值 | 待读现值 | 待读现值 |
| 權重/熱銷 | 98 / 🔥 | 95 / 🔥 | 85 | 82 | 80 |
| 產品卡定位語 | 戶外防水防曬耐磨 | 無標籤通透美學 | 高端金屬質感 | 防拆防偽防竄貨 | 高可見度醒目 |

**共享服務事實块（15 槽统一保留，属事实非指纹）**: ISO 9001 認證工廠 · FDA 認可膠水（間接食品接觸）· SGS 遷移測試 · 15+ 年 · 300DPI/CMYK/3mm 出血 · **1 小時免費數碼打稿 + 2 次免費修改** · 樣本套裝 HK$199（¥2,980）· 順豐 HK$500 免運 / 美國 $99+ 免運 / 日本全國免運 DHL 2-4 天 · 30 秒 AI 報價 · WhatsApp +86 198 8085 1334。

---

## §3 逐页重写清单（5 页 × 3 语 = 15 槽）

> 结构铁律：首段 150 字内直接回答「这是什么/适合谁」（AEO 黄金法则）→ 场景段 → **材质/工艺决策块（各页独有）** → 交稿规范（共享）→ 收费（共享）→ **FAQ×4（产品专属）** → CTA。
> 差异化分工（沿用千问思路的正确部分）：waterproof=**戶外耐候決策頁** / transparent=**應用美學+白墨工藝頁** / foil=**高端工藝頁** / security=**B2B 功能防偽頁** / fluorescent=**安全促銷醒目頁**。

### 页 1/5 waterproof-stickers 防水貼紙 —— 主推锚页（轻改 30-40%）
- **保留**: title 钩子结构、收费/交稿段、3M 背胶卖点。
- **必改**: ① en body 删 "pet food labels" → 换戶外場景（設備標識/車身/飲品冰桶）；② zh FAQ Q1 保留但答案统一为 §4 真值；③ 删 faqSchema 泛化条目，换防水专属 4 问（真防水嗎/洗碗機 80°C/戶外幾年/10張起印）；④ 量詞「個→張」。
- **加分（AEO）**: 防水等級對照小表（PVC防水 基礎 / PP合成紙 +10%，啞膜+5% / 光膜+0 / 異形模切+30% —— variables 真值）。

### 页 2/5 transparent-stickers 透明貼紙 —— 深改（兄弟页标杆）
- **差异化锚**: 「無標籤」美學 + 白墨打底真工藝（features 真值：可選白墨/反白與最小字級印前檢查）。
- **必改**: ① ja H1 英文句 → 日文产品 H1；② zh FAQ Q1 张冠李戴 → 換透明專屬（白墨作用/深色底貼得上嗎/白墨+四色套印/弧面玻璃瓶）；③ en body pet 場景 → 化妝品/玻璃瓶/透明盒；④ imageAlt 三語重寫（去 pet）；⑤ E 病灶 products.ts transparent 描述简体「适配行业」清出 en/ja 字段。
- **加分**: 決策表「透明貼紙 vs 白底貼紙」+ PET透明 +15% 真值價位帶。

### 页 3/5 foil-stickers 燙金貼紙 —— 深改
- **差异化锚**: 金/銀/玫瑰金多色箔 × 四色+燙金分版工藝 × 禮盒/酒標/VIP 場景。
- **必改**: ① ja H1 模板 → 箔押し产品 H1；② FAQ 全換（有哪些箔色/燙金四色同印嗎/最小字高/箔面耐磨靠覆膜）；③ en body pet → 高端包裝場景；④ imageAlt 去 pet。
- **加分**: 工藝流程短鏈（設計稿→分版→燙金→覆膜保護）+ 「燙金+局部UV層次」真 features。

### 页 4/5 security-stickers 防偽貼紙 —— 深改
- **差异化锚**: VOID/易碎紙 防拆 + 可變序號 QR 防竄貨 + 保修/3C/證書封條（B2B 決策者語氣）。
- **必改**: ① ja H1 模板 → セキュリティ产品 H1；② FAQ 全換（VOID 撕下顯字原理/易碎紙特點/可變數據格式/防偽方案諮詢）；③ zh desc 雙名+100張起 重寫；④ imageAlt 去 pet。
- **加分**: 防偽工藝選型清單（易碎紙 vs VOID vs 全息膜 依方案）+ 批次留樣/色差控制（features 真值）。

### 页 5/5 fluorescent-stickers 螢光貼紙 —— 深改
- **差异化锚**: 螢光油墨高飽和 + SGS 無重金屬 + 反光條紋組合（夜間可見度）+ 促銷/安全標識雙場景。
- **必改**: ① ja H1 模板 → 蛍光产品 H1；② FAQ 全換（螢光 vs 反光區別/室內外壽命/SGS 食品相關標籤安全嗎/可選顏色）；③ en body pet → 活動/倉儲安全標識；④ imageAlt 去 pet。
- **加分**: 「白天醒目 vs 夜間反光」組合選項塊（反光條紋覆合 真 features）。

### 每槽 title / description / H1 处置表
| 槽 | title | description | H1 |
|---|---|---|---|
| zh-hk ×5 | 保留 v5 通过结构，僅「個→張」量詞修 | **全重写**（去双名/去 100 張起矛盾/产品专属钩子） | 保留現句式，微調對齊產品詞 |
| en ×5 | 保留（transparent/security/fluorescent 可選補價格钩子，過 #27 才上） | 修 MOQ 100→10 口徑 + 去模板味 | 現值基本可用，輕修 |
| ja ×5 | 保留 v5 通过结构 | **全重写**（去「XのXは」口吃） | **全重写**（4 槽模板 + 1 槽英文 = 5 槽全换产品专属 H1） |

---

## §4 待 K3 拍板数字（§0.23：这些我不自己编）

| # | 问题 | 现状冲突 | 建议默认（可驳回） |
|---|---|---|---|
| 1 | 防水戶外耐久 | faqSchema=IP65/户外 3 年 vs body 户外 3-5 年/室內 5-7 年 vs ja 室內 1-2 年 | 以 products.ts faqSchema 为准：户外 **3 年**、室内 **5 年**，三语统一 |
| 2 | 標準交期 | body 3-5 工作天 vs products.ts 產品卡 5-7 天 | 统一 **5-7 天**（跟产品卡，AI 报价同口径） |
| 3 | 加急費 | ja body +20% vs ja FAQ +30% | 统一 **+20%（24h 打稿+2 天生产）**，ja FAQ 的 48h+1 天 +30% 版本删除 |
| 4 | en/ja MOQ 口徑 | body/FAQ 写 100 起 vs title 10 MOQ vs minQuantity=10 | 统一 **10 起印**（en/ja FAQ Q2 改写）；「小批量 50 張」線保留為補充句 |
| 5 | 主推锚页确认 | 方案建议 waterproof（ST-001/權重 98/🔥）为锚 | 请确认或改指定 |

---

## §5 执行路径、门禁与节奏（K3 批「做」后照此跑）

1. **锁与避让**: 写 SESSION_LOCK.md 声明 → 查 `.hermes/locks/lane.lock` → 今晚 21:17 daily-content 车道可能同跑 B1c，**开工即写 `.hermes/logs/b1c-queue-progress.json` 登记簇 1 占位**，车道读到即跳下一簇（幂等防双跑）。
2. **数据源修改**（SOP-5 派生文件禁手搓）:
   - CSV（`zprintpro-sku-seo-data.csv`）改 15 槽 title/desc/h1/keywords → `node scripts/csv-to-sku-seo.mjs` regen（断言 D 自动保护 body）；
   - `src/data/sku-seo-data.ts` 直改 15 槽 **body + imageAlt**（body 为 ts 权威例外域，gen 头注释明示）；
   - `src/data/products.ts` 改本簇 5 槽 `faqSchema`（9 槽同源指纹拆弹）+ transparent en/ja 描述清简体污染（病灶 E）。
3. **门童全绿才推**: #27 title-v5（15 槽 0 HARD）→ #29 keywords-detox（0 违规）→ #16 gsc-leak → brand-mentions --strict A 类 0 → check-encoding → tsc 54=54 持平。
4. **相似度验收闸**: 重写后复跑 B1 审计脚本（`.hermes/tmp/sku-similarity2.py`），**簇内任两页 8-gram Jaccard 目标 ≤55%（红线 <60%）**；FAQ 段互扫 >50% 同拦。不过线不出厂。
5. **重爬刺激（随 push 同步）**: sitemap lastmod 实更 5 URL → IndexNow 3 locale ping → GSC 手动请求索引 5 页。
6. **push 纪律**: §0.25 攒批 + 30 min 硬下限；本批 = 1 个 src 内容 commit（CSV+ts+products.ts 同批）+ docs commit。
7. **进度登记**: `.hermes/logs/b1c-queue-progress.json` 落簇 1 完成态（15 槽 + faqSchema + 验收分），供明晚车道消费簇 2（red-packets）。
8. **明确不碰**: §0.0 名片面（本簇无关）· blog-data frozen 面 · middleware 301 · 贺卡 6 槽豁免 · 卷裝 hallucinated 页不建。

---

## §6 SOP-10 5 问自检（K3 §0.22）

1. **架构差异?** ✅ 实读 csv-to-sku-seo.mjs 合并模型（CSV 覆盖域 / body/faqs 取 ts）+ product page.tsx 消费链（title/desc L115-120、H1 L172-175、body L742-743）+ category-seo-content.ts（hub 独立 content 不在簇）——**改 ts body 是正确的权威路径，不是手搓派生**。
2. **约束适用范围?** ✅ 恢复模式块优先级（总线契约 > 恢复模式 > 增产）已查；B1c 属恢复模式首务；CTR/盲开词纪律不动 title 主结构。
3. **原数据/拍板来源?** ✅ 真值只取 products.ts 现值（价格/MOQ/材质/variables 全部一手行号）；§4 五个冲突数字列為待拍板，不自行拍。
4. **字段值策略?** ✅ 本批不涉 certNo/validUntil/issuer。
5. **Markdown 渲染?** ✅ body 内 `[文字](链接)` 走 SkuSeoBody 渲染，新增内链沿用既有 parseInlineLinks 链路（Rule 5 门童覆盖）。
