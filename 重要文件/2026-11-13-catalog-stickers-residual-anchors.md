# 2026-11-13 测量支持备忘录 · catalog/stickers 残留三口径精确锚点 + EN 模板残留 + SERP 最后路径

> 日期：2026-11-13 12:1x（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据：k3-review 11-13 07:10 NEXT（daily 今晚取 1 个 READY 真值任务：SMALLBATCH 90 → CATALOG 87）· CT-20261113-D3/D4 裁决 · k3 报告 §0 五场线上核验
> 性质：测量支持（PROPOSE_ONLY）；独立线上复核（双方法）；零 `src/`、零线上改动。

## 〇、一句话结论

**独立复核确认 k3 11-13 07:2x 线上核验的三处残留，并补出精确锚点：en stickers 同页「10 pc 每设计」与「10 stickers (A4 sheet layouts)」两套 MOQ 口径并存 + 「50 pcs」×7 处；catalog FAQ「50–100」×2 确认、规格表最小行已条件化（10 digital / 100+ offset）；另发现 EN 专属规格表模板残留「100% satisfaction guarantee / Door-to-door delivery / Free design proof」（catalog ×1、doujinshi ×2 与 ×4，zh/ja 页为 0）——属 CT-D3/D4/D6 的 DELETE/CONDITIONAL 类，供今晚 SMALLBATCH/CATALOG 任务与后续 EN 模板残留批使用。SERP 第四条路径（Google web_fetch）失败，SERP_UNAVAILABLE 最终确认。**

## 一、en small-batch stickers 残留（SMALLBATCH-TRUTH-RESIDUAL 锚点）

线上实抓（11-13 12:0x curl）：

| 口径 | 位置 | 现字符串 |
|---|---|---|
| 10 pcs per design（KEEP） | SKU 规格行 / FAQ | `Minimum order 10pc` · `From 10 pcs` · `Order from 10 stickers` |
| 10 stickers (A4 sheet layouts)（另一口径） | hero / Why Choose | `Minimum A4 size order` · `Start at 10 stickers (A4 sheet layouts)` |
| 50 pcs（第三口径） | 全文 | `50 pcs` 类命中 ×7（k3 判三口径并存） |

**任务要点（CT-D3）**：`10 stickers/pcs per design` 为 KEEP；A4 sheet MOQ 与 pcs MOQ 必须分开表达，不得互换；`From 50 pcs` 无 SKU 依据须删除或条件化；proof/sample、生产、运输一律报价确认；`100% satisfaction guarantee` 属 DELETE 类（见 §三）。执行走 `zprintpro-sku-seo-data.csv` 回源 + `csv-to-sku-seo.mjs --apply`（SOP-5），部署后重置测量窗 `RESET_BY_TRUTH_FIX`。

## 二、catalog 残留（CATALOG-TRUTH-RESIDUAL 锚点）

线上实抓（11-13 12:0x curl）：

| 位置 | 现字符串 | 处置（CT-D4） |
|---|---|---|
| FAQ | `50–100` ×2（`What is the minimum order quantity?` 等） | MOQ KEEP=10 已批；FAQ「50–100」残留须对齐为 10（数字小批）/ offset 100+ 分档说明 |
| 规格表最小行 | `Minimum order From 10 copies (digital) · 100+ cheaper on offset` | 已条件化（10 digital / 100+ offset），保留 |
| 规格表其他行 | k3 07:2x 见 `MOQ 100`（本会话正则未全匹配，以 k3 为准） | 逐行核对 MOQ 列与 10 KEEP 对齐 |
| 正文 | `free digital proof within 4 hours`（11-09 已读） | proof 类型/费用/时间 → 报价确认（CONDITIONAL） |
| 色彩 | 90%+/95%+（11-09 已读） | 无测量协议 → 删百分比，改 ICC/文件检查/打样确认定性流程 |
| 模板行 | `100% satisfaction guarantee` ×1 · `Free design proof` · `Door-to-door delivery` | DELETE/CONDITIONAL（§三） |

MOQ=10 主体不重做（11-09 H1/desc 已上线 a33abd3b/392c5f30）；本任务只清上述残留。

## 三、EN 专属规格表模板残留（跨页，非单页任务范围）

实抓（11-13 12:1x）：`100% satisfaction guarantee` 与 `Door-to-door delivery` 在 `/en/product/doujinshi-printing/`（×2 / ×4）、`/en/product/catalog-printing/`（×1）出现；`/zh-hk/product/a2-posters/` 与 `/ja/product/catalog-printing/` 为 0 → **EN 语种规格表模板行族**。

- CT-D6 §7.1：`100% 退款、满意保证、免费样本 → DELETE/CONDITIONAL`（有正式条款才按条件展示）；`Door-to-door delivery` 与 `Free design proof` 属未确认承诺类 → CONDITIONAL（报价确认）或 DELETE。
- 建议：并入既有「全站模板承诺条件化」后续批（d450abbc 已条件化 336 串，本次为 EN 规格表模板漏网行族）；不在 SMALLBATCH/CATALOG 单任务里夹带改模板组件（单文件/单变量纪律）。

## 四、SERP 路径最终状态

| 路径 | 结果 |
|---|---|
| curl www.bing.com / www.google.com | 重定向/块（len≤6） |
| web_fetch www.bing.com | 跨域重定向 cn.bing |
| web_fetch cn.bing.com（HK 词） | 国内版索引空结果（非 HK 实景，不采信） |
| **web_fetch www.google.com（hl=zh-HK&gl=hk）** | **fetch failed（网络拦截）** |

→ **SERP_UNAVAILABLE 最终确认**（四路径均不可得）；首页零点击诊断维持证据缺口，11-14/15 复测若仍无出口继续如实登记，不把普通搜索/国内版快照冒充 Google HK 实景。

## 五、给今晚车道的支持（不抢车道动作）

- **daily 21:17**：按 score 取 1 个任务（SMALLBATCH 90 优先）；SMALLBATCH 锚点见 §一，CATALOG 见 §二；两任务不得同日同文件夹带；执行后 `RESET_BY_TRUTH_FIX` 重置测量窗。
- **weekly 20:52**：脚本修复后首自然轮；3 页 title 已于 11-12 22:55 消费（ae277dfa），**禁二次改写**；desc 批（批 1/1b）在 SERP 证据门槛后。
- **gsc 20:13**：用 11-13 新导出（勿重拉 11-12 批）；重验 A53 `previous_*/current_*` 键。
- **11-14 复测**：只判方向；stickers/flyers 三页标 `CONFOUNDED_BY_1112_TITLE`（title 变更后天数 0）。

## 六、数据来源与边界

- 线上 curl（11-13 12:0x-12:1x，en catalog/stickers/doujinshi + zh-hk a2-posters + ja catalog 共 5 URL）· k3-review 11-13 §0 五场核验 · CT-20261113-D3/D4/D6 · `2026-11-13-ZP-k3-review.md` NEXT。
- 零 `src/`、零线上改动、零队列翻转；本备忘录只提供锚点与建议，不代执行；与 k3 核验不一致处以双方法复算为准（FAQ 50–100 两法一致）。

（本报告落 `docs/`，同步副本 `重要文件/`。）
