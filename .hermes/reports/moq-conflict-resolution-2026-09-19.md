# MOQ 冲突裁决表 (2026-09-19)

校准日期: 2026-09-19 12:31 UTC

> **真值优先级**: 最新 K3 裁决 > products.ts 当前值 (products.ts 可能滞后于裁决)
> 裁决基线:
> - 4593937c (09-19 11:56) 第一波 紙品線 (傳單/貼紙/賀卡) 100→10, 22 SKU
> - bb2a1f71 (09-19 16:47) 第三波 書刊本冊 100→10
> - c18107a0 (09-19 19:43) a2-posters 100→10; 明示 餐牌【50本起訂】vs 真值 100 为矛盾

## 汇总: 冲突 43 条

| 判定 | 条数 | 含义 |
|---|---|---|
| ALIGNED | 9 | 有自证 ⇒ 合法, **不改** |
| DRIFT | 24 | 与裁决真值冲突 ⇒ **须修** |
| PENDING_K3 | 10 | 疑为分市场/产品线口径 ⇒ **挂起, 不阻塞其他批次** |

## DRIFT (24 条)

| slug | locale | 类别 | 标题声称 | 真值 | 簇一致 | 批次 | 理由 |
|---|---|---|---|---|---|---|---|
| folded-leaflets | zh-hk | flyers | 100 | 10 | 3/7 | P1 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| thick-paper-flyers | zh-hk | flyers | 100 | 10 | 3/7 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| same-day-flyers | zh-hk | flyers | 100 | 10 | 3/7 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| art-posters | ja | posters | 100 | 1 | 3/6 | P3-低优先 | cc1d5293 (20:03) art-posters 真值批次已落; 标题「100枚〜」与真值 1 冲突 |
| pvc-menus | zh-hk | menus | 50 | 100 | 4/5 | P2-修剪 | ★裁决已点名: c18107a0 明示「餐牌 【50本起訂】 vs 真值 100」为矛盾并移除 features 版; 标题版残留 |
| laminated-menus | zh-hk | menus | 50 | 100 | 4/5 | P0-A | ★同上 (c18107a0 餐牌 真值 100, 【50本起訂】判为矛盾) |
| hardcover-menus | zh-hk | menus | 50 | 100 | 4/5 | P3-低优先 | ★同上 (c18107a0 餐牌 真值 100) |
| drink-menus | zh-hk | menus | 50 | 100 | 4/5 | P3-低优先 | ★同上 (c18107a0 餐牌 真值 100) |
| roll-up-banners | zh-hk | banners | 10 | 100 | 2/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 100 直接冲突 |
| adhesive-banners | zh-hk | banners | 10 | 100 | 2/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 100 直接冲突 |
| catalog-printing | ja | books | 100 | 10 | 3/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| saddle-stitch-booklets | ja | books | 100 | 10 | 3/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| perfect-bound-books | ja | books | 100 | 10 | 3/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| hardcover-books | ja | books | 50 | 10 | 2/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| spiral-notebooks | zh-hk | books | 50 | 10 | 1/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| spiral-notebooks | ja | books | 50 | 10 | 2/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| exercise-books | zh-hk | educational | 50 | 10 | 2/5 | P0-B | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| exercise-books | ja | educational | 50 | 10 | 3/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| school-flyers | zh-hk | educational | 100 | 10 | 2/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| school-flyers | ja | educational | 100 | 10 | 2/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 10 直接冲突 |
| textbooks | ja | educational | 50 | 100 | 3/5 | P3-低优先 | 无自证、无簇约定; 与裁决真值 100 直接冲突 |
| premium-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | 4593937c 第一波明列「紙品線 (傳單/貼紙/賀卡) 100→10」⇒ 賀卡真值=10, 标题 100 为残留 |
| premium-greeting-cards | en | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | 4593937c 第一波明列「紙品線 (傳單/貼紙/賀卡) 100→10」⇒ 賀卡真值=10, 标题 100 为残留 |
| premium-greeting-cards | ja | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | 4593937c 第一波明列「紙品線 (傳單/貼紙/賀卡) 100→10」⇒ 賀卡真值=10, 标题 100 为残留 |

## PENDING_K3 (10 条)

| slug | locale | 类别 | 标题声称 | 真值 | 簇一致 | 批次 | 理由 |
|---|---|---|---|---|---|---|---|
| small-batch-stickers | zh-hk | stickers | 50 | 10 | 1/9 | P2-修剪 | ★ 引用已更正 (2026-09-19): 自证句「We support 50-sticker MOQ for the small-batch line」位于 **src/data/sku-seo-data.ts 的 en FAQ 答案**, 不在 products.ts (前版误引)。该 SKU 自身即小批量产品线, 50 可能是产品线固有口径; 但 4593937c 把貼紙線统一为 10 ⇒ 两者冲突, 须 K3 定「产品线口径」是否高于「品类线口径」 |
| small-batch-stickers | en | stickers | 50 | 10 | 1/9 | P2-修剪 | ★ 引用已更正 (2026-09-19): 自证句「We support 50-sticker MOQ for the small-batch line」位于 **src/data/sku-seo-data.ts 的 en FAQ 答案**, 不在 products.ts (前版误引)。该 SKU 自身即小批量产品线, 50 可能是产品线固有口径; 但 4593937c 把貼紙線统一为 10 ⇒ 两者冲突, 须 K3 定「产品线口径」是否高于「品类线口径」 |
| small-batch-stickers | ja | stickers | 50 | 10 | 1/9 | P2-修剪 | ★ 引用已更正 (2026-09-19): 自证句「We support 50-sticker MOQ for the small-batch line」位于 **src/data/sku-seo-data.ts 的 en FAQ 答案**, 不在 products.ts (前版误引)。该 SKU 自身即小批量产品线, 50 可能是产品线固有口径; 但 4593937c 把貼紙線统一为 10 ⇒ 两者冲突, 须 K3 定「产品线口径」是否高于「品类线口径」 |
| a4-flyers | ja | flyers | 100 | 10 | 7/7 | P3-低优先 | 同簇 (flyers/ja) 全部 7 条一致声称 100 ⇒ 疑为分市场/产品线约定, 与全局真值 10 并存, 须 K3 定口径层级 |
| a5-flyers | ja | flyers | 100 | 10 | 7/7 | P3-低优先 | 同簇 (flyers/ja) 全部 7 条一致声称 100 ⇒ 疑为分市场/产品线约定, 与全局真值 10 并存, 须 K3 定口径层级 |
| double-sided-flyers | ja | flyers | 100 | 10 | 7/7 | P2-修剪 | 同簇 (flyers/ja) 全部 7 条一致声称 100 ⇒ 疑为分市场/产品线约定, 与全局真值 10 并存, 须 K3 定口径层级 |
| folded-leaflets | ja | flyers | 100 | 10 | 7/7 | P3-低优先 | 同簇 (flyers/ja) 全部 7 条一致声称 100 ⇒ 疑为分市场/产品线约定, 与全局真值 10 并存, 须 K3 定口径层级 |
| thick-paper-flyers | ja | flyers | 100 | 10 | 7/7 | P3-低优先 | 同簇 (flyers/ja) 全部 7 条一致声称 100 ⇒ 疑为分市场/产品线约定, 与全局真值 10 并存, 须 K3 定口径层级 |
| same-day-flyers | ja | flyers | 100 | 10 | 7/7 | P3-低优先 | 同簇 (flyers/ja) 全部 7 条一致声称 100 ⇒ 疑为分市场/产品线约定, 与全局真值 10 并存, 须 K3 定口径层级 |
| eco-flyers | ja | flyers | 100 | 10 | 7/7 | P3-低优先 | 同簇 (flyers/ja) 全部 7 条一致声称 100 ⇒ 疑为分市场/产品线约定, 与全局真值 10 并存, 须 K3 定口径层级 |

## ALIGNED (9 条)

| slug | locale | 类别 | 标题声称 | 真值 | 簇一致 | 批次 | 理由 |
|---|---|---|---|---|---|---|---|
| spot-uv-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| spot-uv-greeting-cards | en | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| spot-uv-greeting-cards | ja | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| matte-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| matte-greeting-cards | en | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| matte-greeting-cards | ja | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| rounded-corner-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| rounded-corner-greeting-cards | en | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
| rounded-corner-greeting-cards | ja | greeting-cards | 100 | 10 | 4/6 | P3-低优先 | products.ts 自身文本含「100 起印」⇒ 该 SKU 有独立口径, 非漂移 |
