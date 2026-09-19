# 门童 #24 命中精度分类 (2026-09-19)

校准日期: 2026-09-19 12:28 UTC

> 输入: `.hermes/logs/moq-scan-latest.json` (数组键 `findings`, 命中 **290** 条)
> 规则: K3 2026-09-19: LOCALE_SPECIFIC_KEEP (同locale≥5一致) / NO_MOQ_HOOK (产品线自证) / TRUE_DRIFT / MANUAL_REVIEW (不猜)
> **纪律: 无法自动判定一律落 MANUAL_REVIEW, 不猜** (§0.23.2)

## 分类汇总

| 类别 | 条数 | 门禁行为 |
|---|---|---|
| TRUE_DRIFT | 29 | **阻断, 须修** |
| MANUAL_REVIEW | 0 | 人工过目 (不阻塞其他批次) |
| LOCALE_SPECIFIC_KEEP | 7 | 已核准桶, 不阻断 |
| NO_MOQ_HOOK | 0 | 已核准桶, 生成器不发 MOQ 钩子 |

## TRUE_DRIFT (29)

| slug | locale | 类别 | 声称 | 真值 | 行 | 理由 |
|---|---|---|---|---|---|---|
| small-batch-stickers | zh-hk | stickers | 50 | 10 | 168 | 声称 50 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| small-batch-stickers | ja | stickers | 50 | 10 | 184 | 声称 50 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| folded-leaflets | zh-hk | flyers | 100 | 10 | 827 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| thick-paper-flyers | zh-hk | flyers | 100 | 10 | 865 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| same-day-flyers | zh-hk | flyers | 100 | 10 | 907 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| art-posters | ja | posters | 100 | 1 | 1179 | 声称 100 != 真值 1; 无产品线自证、无 ≥5 簇约定 |
| pvc-menus | zh-hk | menus | 50 | 100 | 1978 | 声称 50 != 真值 100; 无产品线自证、无 ≥5 簇约定 |
| laminated-menus | zh-hk | menus | 50 | 100 | 2021 | 声称 50 != 真值 100; 无产品线自证、无 ≥5 簇约定 |
| hardcover-menus | zh-hk | menus | 50 | 100 | 2064 | 声称 50 != 真值 100; 无产品线自证、无 ≥5 簇约定 |
| drink-menus | zh-hk | menus | 50 | 100 | 2107 | 声称 50 != 真值 100; 无产品线自证、无 ≥5 簇约定 |
| catalog-printing | ja | books | 100 | 10 | 2403 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| saddle-stitch-booklets | ja | books | 100 | 10 | 2446 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| perfect-bound-books | ja | books | 100 | 10 | 2488 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| hardcover-books | ja | books | 50 | 10 | 2526 | 声称 50 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| spiral-notebooks | zh-hk | books | 50 | 10 | 2549 | 声称 50 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| spiral-notebooks | ja | books | 50 | 10 | 2564 | 声称 50 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| exercise-books | zh-hk | educational | 50 | 10 | 2757 | 声称 50 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| exercise-books | ja | educational | 50 | 10 | 2773 | 声称 50 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| school-flyers | zh-hk | educational | 100 | 10 | 2843 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| school-flyers | ja | educational | 100 | 10 | 2858 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| textbooks | ja | educational | 50 | 100 | 2900 | 声称 50 != 真值 100; 无产品线自证、无 ≥5 簇约定 |
| premium-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 3423 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| premium-greeting-cards | ja | greeting-cards | 100 | 10 | 3437 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| spot-uv-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 3582 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| spot-uv-greeting-cards | ja | greeting-cards | 100 | 10 | 3596 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| matte-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 3631 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| matte-greeting-cards | ja | greeting-cards | 100 | 10 | 3645 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| rounded-corner-greeting-cards | zh-hk | greeting-cards | 100 | 10 | 3680 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |
| rounded-corner-greeting-cards | ja | greeting-cards | 100 | 10 | 3694 | 声称 100 != 真值 10; 无产品线自证、无 ≥5 簇约定 |

## LOCALE_SPECIFIC_KEEP (7)

| slug | locale | 类别 | 声称 | 真值 | 行 | 理由 |
|---|---|---|---|---|---|---|
| a4-flyers | ja | flyers | 100 | 10 | 706 | 同簇 (flyers/ja) 全部 7 条一致声称 100 (与全局真值 10 不同) ⇒ 市场级约定 |
| a5-flyers | ja | flyers | 100 | 10 | 753 | 同簇 (flyers/ja) 全部 7 条一致声称 100 (与全局真值 10 不同) ⇒ 市场级约定 |
| double-sided-flyers | ja | flyers | 100 | 10 | 800 | 同簇 (flyers/ja) 全部 7 条一致声称 100 (与全局真值 10 不同) ⇒ 市场级约定 |
| folded-leaflets | ja | flyers | 100 | 10 | 842 | 同簇 (flyers/ja) 全部 7 条一致声称 100 (与全局真值 10 不同) ⇒ 市场级约定 |
| thick-paper-flyers | ja | flyers | 100 | 10 | 880 | 同簇 (flyers/ja) 全部 7 条一致声称 100 (与全局真值 10 不同) ⇒ 市场级约定 |
| same-day-flyers | ja | flyers | 100 | 10 | 923 | 同簇 (flyers/ja) 全部 7 条一致声称 100 (与全局真值 10 不同) ⇒ 市场级约定 |
| eco-flyers | ja | flyers | 100 | 10 | 965 | 同簇 (flyers/ja) 全部 7 条一致声称 100 (与全局真值 10 不同) ⇒ 市场级约定 |
