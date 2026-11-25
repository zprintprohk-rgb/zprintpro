# N6 显示层口径 C · 三方案一句话裁决材料（2026-11-26 · 首席分析师）

> **背景**：en 类目 waterproof 卡片可见 `$0.05/pc` = UNIT_PRICE_ANCHORS priceDisplay as-low-as 批量档（price-data.generated，MOQ 10 档实价 $9/10=$0.90，落差 16.9×）。11-18 口径 B 已修机器层（schema/Feed MOQ 实价），显示层当时拍板保留。全量影响 = 15/20 SKU 落差 ≥5×（price-scale-audit-20261116：custom-flyers 86.8× / a5-flyers 58.3× / a4-flyers 44.6× / waterproof 16.9×）。
> **新事实（本次盘点）**：zh 卡有「起」后缀、ja 卡有「〜」后缀、**en 卡四个展示面全部裸价无 From 标注**（类目卡 / 首页 HotProducts / PDP 右栏报价盒 / PDP 相关卡）——这是与竞品惯例的真正缺口，不是数字本身。

## 竞品价格展示惯例（2026-11-26 联网取证）

| 竞品 | 低位锚做法 | 标注 |
|---|---|---|
| VistaPrint | "as low as $0.99/sticker"（目录锚） | **必有 as low as** |
| StickerApp | "as low as $0.47" | **必有 as low as** |
| UPrinting | "as low as $0.24" | **必有 as low as** |
| Stickerine | "as low as $0.06"（批量） | **必有 as low as** |
| Sticker Mule | 真实档价表（50 张 $60 = $1.20/张起） | 阶梯表全透明 |

**结论**：as-low-as 低位锚是全行业惯例，**没有任何竞品裸奔低价不带 "as low as"**。我方 en 面裸价 = 唯一违规者；zh/ja 面合规。

## 三方案对比

| | ① MOQ 实价 | ② 区间锚 | ③ 维持 as-low-as +「起/From」标注（**推荐**） |
|---|---|---|---|
| 做法 | 卡片/hero 改显 MOQ 档实价（waterproof $0.90/pc） | 显示 `$0.05-0.90/pc` 区间 | 数字不动，en 四个裸价面补 `From ` 前缀（zh「起」ja「〜」已有） |
| 诚实度 | 最高（与 schema 口径 B 同源） | 高 | 合规（行业惯例 = 标注即诚实） |
| CTR/收录风险 | **高**：15 SKU 可见价涨 5-87×，December core update Active 中大面积价格面 churn，snippet 锚全灭 | 中：低锚保留但卡片 UI 拥挤 | **零**：数字零变动，无重排风险 |
| 竞品对齐 | 偏离（只有 Sticker Mule 近此模式，但其无落差问题） | 无竞品用区间卡 | **完全对齐**（VistaPrint/UPrinting/StickerApp 同构） |
| 工程量 | 大（生成器链 + 15 SKU 复核） | 中（UI 改版） | **小**（3 文件 5 处 JSX + 1 翻译串） |
| 与 K3 11-13 D1/D6 偏好 | 符（诚实） | 符 | 符（「标注即诚实」先例 = 噴繪诚实区间锚） |

## 一句话裁决材料

> **N6 显示层口径 C 三选一**：① MOQ 实价（最诚实但 15 SKU 可见价涨 5-87×，core update 期 CTR 风险大）② 区间锚 $0.05-0.90（折中但无竞品先例、UI 挤）③ **维持 as-low-as + en 裸价面补 "From " 标注（推荐）**——数字零变动、与 VistaPrint/UPrinting/StickerApp 行业惯例完全对齐、zh「起」ja「〜」已有仅 en 缺；①/② 留作 12-04 月度复盘再议。

**K3 2026-11-26 03:17 指令「按最优推荐继续下一步」= 授权执行方案 ③。**

## 执行记录（方案 ③）

- 改动：`CategoryPageV9.tsx`（V9T +fromPrefix，en='From '）· `HotProducts.tsx`（en 前缀）· `ProductPageV9.tsx`（右栏报价盒 + 相关卡，en 前缀；hero 大价行上方已有 `eachFrom='From '` 标签行，不重复加）。
- 影响面：en 四个裸价面全部补 `From `；zh/ja 零改动；**零价格数字变动**。
- 留待：①/② 的显示层与 schema 口径 B 统一议题 → 12-04 月度复盘材料。
