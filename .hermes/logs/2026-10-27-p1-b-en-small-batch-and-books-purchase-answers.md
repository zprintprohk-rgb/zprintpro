# P1-B en 侧数据就绪 — small batch（STICKER-P1-10）＋ books（BOOK-P1-11）内部数据包（2026-10-27 02:0x）

> 任务源: 七簇策略 §10.2 STICKER-P1-10（保持 title；采购表、真实 proof、材料限制、两条自然内链）＋ BOOK-P1-11（P0 后补页数/封面/creep/proof 与学校清单）。
> 执行: DeepSeek 执行层 · 2026-10-27 02:0x · **docs-only 数据包**。
> 停止条: 不改 $0.045 为 $0.05；无证据不写 IPX／免费实体样；展示继续归零→URL Inspection＋变更史停止扩写。

## 1. 数据来源行（§0.23）

- 真值源: `src/data/products.ts` L951（small-batch-stickers）、L5143（saddle-stitch-booklets）、L5757（exercise-books）
- 线上探针: 2026-10-27 01:35 复核（small-batch H1「Small Batch Stickers 50+ | No Setup」；saddle/exercise H1「from 10 Copies」live）
- 平行会话: E1（small-batch 内链方案，sticker-guide→PDP 唯一缺口待落）、E2/E5（books category 数据驱动+指南三语已链）、BLUF 骨架（saddle/exercise/catalog 首句改写批待 K3）
- 台账: P0-H（small batch 服务边界）、P0-G（en greeting）、P0-C（四页 MOQ 已闭环 saddle/exercise）

## 2. 真值表（products.ts SSoT）

| SKU | price_range | basePrice_en | minQ | 材质 | 尺寸 | 工艺 |
|---|---|---|---|---|---|---|
| small-batch-stickers | **HK$38-120/A4（每 A4 版）** | $0.55 | **10（A4 版）** | 銅版/PP合成/透明PVC/Kraft | A4 起印；10×10mm–300×400mm | 模切/圓角/燙金/覆膜；HP Indigo 四色 |
| saddle-stitch-booklets | HK$6-32/本（US$1.84-7.36/pc） | $1.84 | **10** | 128-157g銅版/書紙 | A4/A5 | 騎馬釘、覆膜（可選） |
| exercise-books | HK$4-16/本 | $1.84 | **10** | 80-100g書紙/道林紙＋封面200g銅版 | A4/A5 | 騎馬釘、封面覆膜 |

## 3. 口径冲突登记（K3-6 拍板项；防止「只换数字」）

| # | 冲突 | 详情 | 建议（分析师推荐） |
|---|---|---|---|
| 1 | **small-batch MOQ/单位** | products.ts minQ=10（A4 版）vs 线上 en PDP「50+ pcs／$0.045/pc」——**版/张 单位粒度不同** | 采购表需明确单位（每 A4 版 vs 每枚贴纸）；「50 pcs」若指枚数则与 A4 版 10 不冲突，但页面需写清两档口径 |
| 2 | small-batch 价格口径 | products.ts HK$38-120/A4（basePrice_en $0.55）vs 线上 $0.045/pc | 同为单位粒度问题；**不改 $0.045 为 $0.05**（停止条） |
| 3 | saddle nameEn US$1.84-7.36/pc | 与 price_range HK$6-32/本 折算一致（HK$6≈US$0.77？存疑） | 汇率口径待业务核（K3-4 同族） |
| 4 | books 交期「DHL 全球 2-4 天」 | saddle desc 现挂 | DHL 国际时效承诺 = K3-2 同族（业务确认或条件化） |

## 4. 声明 flag（K3-6/K3-7）

- small-batch desc「無需大量庫存壓力」「任意形狀模切」= 描述性，OK；「免費實體樣／退款」= K3-6 待决（台账 P0-H 已有）。
- saddle desc「8-64 頁可平攤 180°翻閱」= 工艺事实（騎馬釘平攤），OK；「MOQ 10 本（vs Alibaba 黃頁 500+）」「30 秒 AI 即時報價（vs 郵件詢盤 2 天）」= **竞对对比 + 时效对比**——属「带比较性」文案，建议 K3 确认是否保留（§0.23 无来源对比慎用）。
- exercise「K12/學校 Programs」= 产品定位，OK。

## 5. 采购答案草稿（内部；待 K3 拍板 §3/§4 后落页）

- **small batch**: 最低 10 個 A4 版起印（線上亦按 50 枚/款起售，单位见 §3-1）；材料銅版/PP/透明PVC/Kraft；尺寸 10×10mm–300×400mm 模切任意形狀；免費數碼打樣（2h）；交期与配送见 K3-6。
- **books**: 騎馬釘小冊子/練習簿 10 本起印；A4/A5；8-64 頁平攤翻閱；封面覆膜可選；價格 HK$6-32/本（saddle）／HK$4-16/本（exercise）。
- **内链登记**: E1 sticker-guide→PDP 锚已备（对端待落）；E2/E5 books category 数据驱动+指南三语已链（对端核验）。
- 🔶 **新观察（02:08 线上探针，双方法）**: **small-batch PDP 无任何 guide 出链**（live HTML 仅导航/页脚链接，无 sticker-guide/buying-guide/blog 正文链接）——E1「两条自然内链」出链侧未满足；对端 E1 只补了入链（guide→PDP）。**建议**: K3 批内 PDP body 采购段加 1-2 条零声明出链（→ sticker-guide / sticker-buying-guide，锚=产品名/描述性词），待 E1 归属方（对端）或 K3 排期，本轮不落 src。

## 6. NEXT

- K3 拍板（K3-6 small batch 单位/服务边界、K3-2 交期、比较性文案、K3-4 汇率）→ 采购表 src 批。
- 对端 E1 落位（sticker-guide→PDP）待窗口；本轮不与其碰撞。
- 基线复测 11-23：small batch 带钱词基线（49/4.77/0；28/5.07/0）与 books 主词同口径复跑。

> 数据来源: products.ts L951/5143/5757；线上探针 01:35；平行会话 E1/E2/E5 方案与核验；台账 P0-C/G/H。本包为内部文档（§0.23.1）。
