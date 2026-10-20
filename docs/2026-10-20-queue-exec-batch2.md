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

---

## 附：批 2.1（同窗口续跑，2026-10-20 20:0x）

### A. hub 簇双向内链（三语）

| locale | 新增 | 链路 |
|---|---|---|
| zh-hk | 5 条 | 食品包裝印刷完全指南 / 牛皮紙盒 8 大盒型對比 / 包裝盒印刷價格 2026 / 食品包裝盒 PDP / 磁吸禮盒 PDP |
| en | 5 条 | 同构（/en/ 前缀） |
| ja | 3 条 | 食品包装印刷ガイド / クラフト紙箱と段ボールの比較 / 2026 年パッケージ価格 |

合计 13 条，全部有效路由（探针 200）。

### B. 渲染层缺陷修复（§0.22 第 5 款）

线上实测：**4/14 类目页共 11 处裸 markdown**（packaging 5 / red-packets 4 / menus 1 / calendars 1），用户直接看到 ` [產品鏈接](/zh-hk/product/...) ` 字面文本。
修复：CategoryPillarContent.tsx 四处纯文本渲染改走 parseInlineLinks（points / item.description / spec.value / node.description）+ 引入 import。tsc 54=54。验收标准：部署后全 14 类目页裸 markdown = 0。

### C. CRED 清理 en/ja blog-data

- en 12 Industries 族 → Multi-Industry / multi-industry：22 处（15 篇）
- ja 12 業界 → 多業界：32 处（12 篇）；国際トップ → 大型
- 残留 0（脚本内断言）；diff = 27/27 行（一篇一行，无格式 churn）

### D. hub FAQ 三语平价

- en +2 Q（价格计算 / 內側印刷）、ja +1 Q（内側印刷）→ 三语均含价格 + 內側印刷
- 复检：三语貼紙类 Q = 0；ja 早前「20 问」为边界误判（越界到 bannersContent），实际 12 Q 干净

### E. 幂等复核（未做，因已完成）

- 内链批 3（pricing / kraft 稿 → 深度指南）：**三语已存在该链接**（hasGuideLink=true × 6），不重复添加
---

## 附：批 2.2（同窗口续跑）

### F. 博客正文 markdown 裸渲染修复（新缺陷面，线上实测）

两篇博客正文以 markdown 书写但渲染层是 HTML，线上直接显示标记字面：

| 缺陷 | 实例数（三语合计） | 处理 |
|---|---|---|
| [label](/path) 裸链接 | 21（flyer-opening 6 + pet-food 1，×3 语） | 转 <a href> |
| **bold** 裸粗体 | 158 + 补 4（en 长 FAQ 粗体 >60 字符） | 转 <strong> |
| ## 标题 裸标题 | 31/语 ×3 = 93 | 转 <h2>/<h3> |
| - 列表 裸列表 | 22/语 ×3 = 66 | 转 <ul><li> |

断言：转换后 **/](/^##/^-  残留全 0；结构体检（zh flyer：h2=21 / ul=4 / li=22 / emptyLi=0）。**说明**：<pre>/<code> 内 markdown 保留原样（示例代码）。

### G. 类目页/博客裸 markdown 基线（部署前，可见文本口径）

- 类目页：**10 处 / 4 页**（packaging 5 · red-packets 3 · menus 1 · calendars 1）
- 博客页：flyer-opening（zh 4 + en 4 + ja 5）· pet-food（zh 1 + ja 1）
- 部署后验收：
ode .hermes/_probe_batch21.mjs（类目页 0）+ _probe_blog_md.mjs（博客页 0）

### H. MOQ 欠承诺：zh 侧 3 项已对齐

certificates 10→100、electronics 100→200、kraft 100→300（body + FAQ Q2；desc 与 products.ts 双证一致才动）。
textbooks（desc 50 vs 真值 100）与 en/ja 残余口径 → K3 台账，见 hub 真值 docket §7。
---

## 交接（下一会话直接续跑）

### 已完成并上线（截至本次推送前）
- 里印 ×3 PDP、内链批 2（6 条）、hub FAQ zh 修 2 + 三语平价、深度指南 12 段升级、CRED en/ja 54 处、博客 markdown 338 处、products.ts 卡片 bold 113 处
- 守卫：price-truth-guard.js（MOQ/价格/hub 标题价/products-content 四种模式）

### 本次推送包含（未部署前状态）
| 修复 | 部署后验收 |
|---|---|
| V9 类目页 points 走 parseInlineLinks | _probe_final.mjs 类目页 md=0 |
| V9 PDP body 段落走 parseInlineLinks | PDP md=0（现 2 处 roll-stickers） |
| products-content 通用句去「100 個起印」 | electronics/kraft 页无该句 |
| products.ts 卡片 bold 剥离 | 博客/类目页 ** = 0 |

### 待 K3 裁决（4 件）
1. 价格/MOQ 台账：hub 标题价 HK.03/個（低于目录地板）+ certificates/textbooks/electronics/kraft en/ja 残余口径
2. products-content 45/77 MOQ 不一致：A 逐块改写 / B 仅守卫观察
3. §0.0 名片展示层 (a)/(b)/(c)
4. CF 规则加 bot 豁免（UA 差分 403 实锤）

### 已知工具账
- push-gate-check.mjs 时间源滞后（读 commit 时间），需改读 reflog epoch
- Start-Sleep 等推送窗口属 §0.25.8 禁止项；正确做法=本地提交、下窗口再推
---

## 教训：渲染层修复必须「按线上 class 反查真实组件与行号」

**本次踩坑**：类目页裸 markdown 修了 CategoryPillarContent（points/FAQ/techSpecs），部署后线上仍有 10 处 —— 因为同一份 category-seo-content 数据在 **CategoryPageV9** 还有 3 条渲染路径：
1. dvantages[].points（L541，{pt}）
2. 買家指南段落（L693，className="mb-5 text-[17px] ... text-justify">{p}）
3. FAQ 答案 / 材質副標題 / 加工描述 / 難度 / 對比 note（6 处 {x.y}</p>）

**方法（可复用）**：
1. 线上 curl 取原始 HTML（非 strip 版），定位可疑文本所在的**完整标签 class**
2. g -l '<该 class 串>' src/ → 唯一定位真实组件文件
3. 再按行号改，不允许凭「数据来自哪个文件」推断渲染组件（V9 与 Pillar 双组件并存）
4. 部署后连抓 3 次验证（CF 边缘会出现 503/新旧混存，单次计数不可信）

**校验脚本**：
ode .hermes/_probe_cat_all3.mjs（三语 42 页）、_probe_final.mjs（类目+博客+PDP+FAQ+MOQ 一站验收）