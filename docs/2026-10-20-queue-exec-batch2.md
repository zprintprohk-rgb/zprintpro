# 队列批 2 执行报告 — 内链 / 裡印 / 守卫 / hub FAQ / 深度指南（2026-10-20）

**执行**: AutoClaw 会话 · **验收**: tsc 54=54 · **状态**: 5/5 完成（1 项按幂等铁律改为存量升级）

---

## 0. 数据来源（per §0.23）

- 真值源: `src/data/products.ts`（minQuantity / basePrice / price_range），读取时点 2026-10-20 18:3x
- 文章源: `src/data/blog-data/{zh-hk,en,ja}.json`（content 字节长度实测）
- SEO 块源: `src/data/sku-seo-data.ts`（block-scoped 解析，85 块）
- 守卫运行: `node scripts/guards/price-truth-guard.js` 输出（同日 18:4x）
- 备份: `.hermes/_bak-queue-20261020/`、`.hermes/_bak-foodguide-20261020/`

---

## 1. 内链批 2（eco-printing / restaurant-menu → 包装簇）

**6 条新内链，三语各 2 条，全部有效路由（无 404/301）**：

| locale | 文章 | 锚文本 | 目标 |
|---|---|---|---|
| zh-hk | eco-printing | 包裝盒 | `/zh-hk/category/packaging/` |
| zh-hk | restaurant-menu-printing-guide | 食品包裝盒 | `/zh-hk/product/food-boxes/` |
| en | eco-printing | packaging | `/en/category/packaging/` |
| en | restaurant-menu-printing-guide | food packaging boxes | `/en/product/food-boxes/` |
| ja | eco-printing | エコパッケージ印刷 | `/ja/category/packaging/` |
| ja | restaurant-menu-printing-guide | 食品対応パッケージ | `/ja/product/food-boxes/` |

**断言**: 每文件 href 增量 = 2（973→975 / 939→941 / 965→967）；JSON 解析通过。

## 2. 裡印直答段扩 3 PDP（folding / mailer / white-card）

- 归属域裁定：裡印块在 `sku-seo-data.ts` body（CSV 18-20 列为 98 字遗留短桩，非覆盖域）→ 沿用 fea00143 ts 直写先例
- 3 段均按 food-boxes 同款「诚实请求式」模板：食品級油墨 + PE 淋膜保護 + 落單時註明 + 免費打稿確認
- 插入点：各 SKU body 的 CTA 句前，换行转义串从原文提取复用（不手写）
- 增量：folding +105 / mailer +89 / white-card +82 字

## 3. price-truth-guard 入库（`scripts/guards/price-truth-guard.js`）

**设计（v2 校准后）**：
- HARD：块内「最小 MOQ 声称」< products.ts `minQuantity` = 欠承诺（可兑现风险）
- WARN：最小声称 > 真值（保守）；单价形态（HK$X/張 等）越出 `price_range`
- 豁免：拼版/量產档位（500/1000/2000/5000/10000…）；总价不参与价格带判定

**首次运行**：85 块 / 81 块有真值 / 4 块无真值（small-bags, name, seo, doujinshi-printing）

| 级别 | 数量 | 明细 |
|---|---|---|
| HARD | 4 | certificates 10<100 · textbooks 10<100 · electronics-packaging-box 100<200 · kraft-paper-packaging-box 100<300 |
| WARN | 1 | small-batch-stickers HK$0.45/張 vs 区间 HK$38-120/A4（单位不一致，属口径噪音） |

> **处置**：价格/MOQ SSoT 属 K3 → 仅登记台账，不改数字（K3 价格 SSoT 项由 7 处增至 11 处）。
> 用法：`node scripts/guards/price-truth-guard.js`（exit 1 = 有 HARD）；`--strict` 连 WARN 一并 fail。

## 4. hub FAQ 修缺陷 + 补 2Q（`category-seo-content.ts` packagingContent zh）

- **发现**：packaging hub FAQ 前 2 条是貼紙问题（历史复制缺陷），已块级替换为：
  - 「包裝盒印刷價錢點計？」→ 100 個起印 / 8 檔標準尺寸免刀模 / 摺疊盒 HK$2.5-15、精裝盒 HK$8-42 价格带（products.ts 真值）+ 30 秒 AI 報價
  - 「包裝盒可以做內側印刷（裡印）嗎？」→ 诚实请求式
- 断言：块内匹配数 = 1、替换后无貼紙残留、tsc 54=54

## 5. 包装簇深度 blog #1 — 幂等裁定 + 存量升级

**幂等裁定**：`food-packaging-printing-guide`（zh 11,325 字「食品包裝印刷完全指南」）**已存在**（三语齐），按「不重复做已完成的事」不造第二篇，改为 12 段骨架升级。

**zh-hk**：9 → **12 段**（11,325 → 12,690 字）
1. 定义（原第 7 段，**已前置为第 1 段**）
2. 材質對照 3. **盒型與結構（新增，8 檔標準尺寸/5 大盒型）** 4. 三地認證 5. 價格/MOQ/交期 6. 淋膜油墨 7. **內側印刷（裡印）新增** 8. 物流清關 9. 行業實證 10. 落單流程 11. **5 個常見誤區（新增）** 12. FAQ

**en / ja**：各 7 → 8 段，新增 Quick Answer / クイック回答 块（qa-answer 渲染层自动识别）+ Inside Printing（裏印刷）段。

**顺带修复**：
- zh 断裂外链 `https://www. .com/company/zprintpro`（空域名+空锚文本）→ 改指 `/zh-hk/about/`
- zh CRED：「服務 1,000+ 品牌客戶」「累計 1,000+ 品牌客戶訂單實證」→ 全球品牌客戶（0 残留）
- en `12-Industry Track Record` → `Multi-Industry Track Record`；ja `12 業界…` → `多業界での受注実績`

**未动（守位/冻结）**：ja `ハイデルベルク 6+1`（K3 9/19 选 A 品牌白名单）、en/ja `SGS 2026-04 レポート`（SGS 渲染域 7 处冻结）。

---

## 6. 验收矩阵

| 项 | 断言 | 结果 |
|---|---|---|
| 内链批 2 | href +2 × 3 文件；JSON valid | PASS |
| 裡印 ×3 | 块级定位；里印唯一；CTA 保留 | PASS |
| price-truth-guard | 81 块真值比对，4 HARD / 1 WARN | PASS（HARD 登记 K3） |
| hub FAQ | 块级替换；貼紙残留 0 | PASS |
| 深度指南 | zh h2=12；en/ja h2=8；断链 0；1,000+ 0 | PASS |
| tsc | 54 = 54 | PASS |

## 7. 遗留 / 下一窗口

1. **K3 价格/MOQ 台账 11 处**（原 7 + 新增 4：certificates / textbooks / electronics-packaging-box / kraft-paper-packaging-box）
2. price-truth-guard 尚未接入 pre-commit（现为按需运行，建议先观察 1-2 周 WARN 噪音再定）
3. 包装簇下一个深度资产：hub v2 真值版（价格带从 products.ts 派生）+ 内链批 3
4. §0.35.7 双条件：本批写入前 lane.lock 不存在、SESSION_LOCK 已释放、src 无 MM；写入后待推送
