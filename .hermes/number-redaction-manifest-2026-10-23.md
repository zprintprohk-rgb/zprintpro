# 数字抹除残留 · 执行清单（manifest）— 2026-10-23 晚班预生成

> 用途：K3 ×13 拍板（推荐 C）后 **blog-deepfix 车道（周六 05:37）开箱执行**
> 数据 SSoT：`number-redaction-manifest-2026-10-23.json`（222 条逐处记录：context/sibling 对齐/候选数字/锚定判定/建议动作）
> 生成：`_manifest_gen.py`（可复跑）· 对齐验证：`_align_proto.py` 4 样本全中

## 1. 总量与分桶（222 = ja 多個 195 + ja 多年件 9 + zh-hk 多年件 18）

| 桶 | 数量 | 含义 | 执行动作 |
|---|---|---|---|
| **restore（锚定候选）** | 196 | sibling 对齐成功 + ≥1 候选数字在 products.ts 出现 | 逐处读 sibling 上下文，数字语义吻合 → 回填；不吻合 → 规范模糊量词 |
| **k3-choose** | 16 | sibling 对齐成功但候选数字无 products.ts 锚 | 执行时按 C 规则：能关联站内已发布口径→回填；否则模糊量词 |
| **manual-no-alignment** | 10 | 表格单元格等结构化语境，数字锚匹配失败 | 见 §3 专项清单 |

## 2. 执行协议（车道 STEP 0 必读）

1. **逐处 ≠ 正则**：222 处每处必须打开 `suggest/context/sibling_context` 三字段人工（车道 LLM）判读；**禁止**按 suggest 字符串盲替换。
2. **锚定双判**：候选数字须 ① 在 products.ts（或其 price_range 带）出现 ② 在 sibling 语境中语义吻合（如「多個 $156」↔「1,000 pieces $156」= 吻合；「30-45 日」片段里的 37 = 不吻合丢弃）。
3. **模糊量词规范**（不回填时）：ja → `大口ロット` / `量産単位` / `大口発注`（按语境）；zh-hk → `大量` / `大批` / `大批訂`。残句「500-多個 MOQ」→「500〜大口ロット MOQ」式。
4. **多年件 断词组**（ja wedding-invitation「多年件超」/ rush-printing「多年件の特急注文」/ large-envelope「多年件急行」）：sibling 对齐已给出候选（各 1 处），按 §2.2 判定。
5. **改后三语一致性**：回填后该句 ja/zh-hk 数字须与 en 同值同单位（或同为规范模糊量词）。
6. **验收**：tsc 54=54 / brand A0 / gsc-leak 0 / cred 0；diff 限定 27 posts（24 ja + 2 zh-hk + 交叉）；抽 3 页人工读。

## 3. manual-no-alignment 专项（10 处）

| post | 处 | 语境 |
|---|---|---|
| gang-run-card-boxes-hk-guide (ja) | 3 | 阶梯价表行首单元格 `多個`（¥6,300/¥10,950/¥24,750 行）——en 表同行为 `1,000`/`5,000`/`10,000`，整表对齐回填 |
| packaging-box-price-2026 (ja) | 2 | 表头行 `多個単価`——en 表头 `Unit Price @1,000/5,000/10,000`，随表回填 |
| ecommerce-shipping-bag-printing-guide (ja) | 2 | `多個小ロット` FAQ 句 + PLA 句尾（后者疑误报 token，判定非数量语境→可能保留/微调） |
| custom-card-boxes-small-batch-usa (ja) | 1 | ¥40 语境 |
| cosmetics-packaging-box-printing-guide (zh-hk) | 2 | 表格单元格（磁吸盒/摺疊盒行）——en 表对齐 |

## 4. 按 post 分布（执行分批建议）

4 簇 × ~55 处：① packaging 价格簇（packaging-box-price-2026 + gang-run + custom-card-boxes-usa + cross-border…）② 化妆品/食品/茶 box 簇 ③ 婚庆/信封/急件簇 ④ 贴纸/名板/购物袋长尾簇。每簇一批 commit。

## 5. 与 K3 ×13 选项的映射

- 拍 **A**（en 回填）：本 manifest 直接可用（196 锚定 + 16 选择 + 10 表对齐，全部回填）。
- 拍 **C**（推荐）：本 manifest + §2.2 双判执行；预计回填 ~55-70%、模糊量词 ~30-45%。
- 拍 **B**（全抹平）：manifest 仍用于定位（把 222 处统一改规范模糊量词 + en 同步抹除数字）。
