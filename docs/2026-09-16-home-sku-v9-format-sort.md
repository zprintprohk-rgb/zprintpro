# 首页 SKU 卡 v9 格式 + 热度排序改造 (2026-09-16)

## K3 拍板 (ask_user_question 3 项确认, 2026-09-16 09:2x)

1. **排序**: 每类 1 条但按热度排 — 13 类各取 top 1 SKU, 整体按「SKU 自身搜索热度」降序
2. **卡片格式**: 分类页 v9 新卡 — 标题两行 + [材质][起订] 行 + 大号价格 + MOQ + 单 CTA
3. **数量**: 保持 12 条

## 改动

| 文件 | 改动 |
|------|------|
| `src/lib/popularity.ts` | `getTopSkuByCategory` 排序由「分类热度 (categoryHeat)」改为「SKU 自身热度 (popularityScore/weight_score)」; 删除 categoryHeat() 死代码 |
| `src/components/home/HotProducts.tsx` | SKU 卡改 v9 格式: 标题 line-clamp-2 两行 + `[材質] {material} [起訂] {minQuantity}` 行 + 大号 27px 价格 + 单 CTA; 移除 viewMore/freeDesign/from 翻译键 + getProductDescription 死代码; en 价格后缀对齐 v9 (空) |

## 排序结果 (weight_score proxy, matrix.json 无 sku_popularity)

1. waterproof-stickers (98) → 2. kraft-paper-bags (98) → 3. magnetic-closure-gift-box (98) → 4-12. 各 95 分 SKU

对比旧排序: 旧按分类热度 magnetic-closure-gift-box 第 1 (packaging 类总热度 834 最高), 新按 SKU 自身热度 ws=98 并列前三。

## 影响面

- 首页 HotProducts (12 条): 格式 + 排序均变
- blog 详情页 sidebar (14 条): 仅排序变 (同一函数, 由分类热度 → SKU 热度, 语义一致)
- blog 底部 getRelatedByCategory (4 条): 不变 (本就按 SKU 热度)

## commit

- 5ccc258b (feat: v9 格式 + SKU 热度排序)
- af4c8b76 (fix: en 价格后缀对齐 v9)

## 验证

- tsc 54=54 基线持平
- 材质覆盖率 12/12 (全部 hot SKU 有 specs.material)
- 门童全绿: 12-rules 0 命中 / blog-data-integrity / check-content red=0 / encoding UTF-8 LF
- 排序模拟: 热度最高 SKU 排最前 ✅
