# hub 价格真值 docket（包装类目页 · 2026-10-20）

**性质**：价格/MOQ SSoT 属 K3（AGENTS.md 既有口径），执行层只登记不改数。
**数据来源**：`src/data/category-seo-content.ts`（packagingContent 三语块，偏移 zh=1663 / en=8974 / ja=19335）· `src/data/products.ts`（minQuantity/basePrice/price_range，读取 2026-10-20 20:0x）· `scripts/guards/price-truth-guard.js` 输出

---

## 1. 包装 SKU 真值（products.ts）

| slug | MOQ | basePrice | price_range |
|---|---|---|---|
| food-boxes | 100 | 2.5 | HK$2.5-18/個 |
| folding-boxes | 100 | 2.5 | HK$2.5-15/個 |
| mailer-boxes | 100 | 3.5 | HK$3.5-10/個 |
| cosmetic-boxes | 100 | 8 | HK$8-65/個 |
| rigid-boxes | 100 | 8 | HK$8-42/個 |
| magnetic-closure-gift-box | 100 | 15 | HK$15-80/個 |
| white-card-bags | 100 | 12 | HK$5-12/個 |
| kraft-paper-bags | 100 | 8 | HK$3-8/個 |
| gift-bags | 100 | 20 | HK$10-20/個 |
| electronics-packaging-box | 200 | 8 | HK$8-50/個 |
| kraft-paper-packaging-box | 300 | 5 | HK$1.5-1000/個 |
| gang-run-card-boxes | 500 | 129 | HK$129-17,214（订单总额） |
| white-card-boxes | 500 | 129 | HK$0.50-3.00/個 |
| corrugated-boxes | 500 | 1517 | HK$1,517-7,278（订单总额） |
| tuck-end-boxes | 500 | 1538 | HK$1,538-7,478（订单总额） |

**每件下限**（排除订单总额型）= **HK$0.50**（white-card-boxes 拼版）；常规彩盒下限 = **HK$2.5**。

## 2. 需 K3 裁决的声称（3 类 6 处）

| # | 位置 | 原文 | 与真值关系 | 建议 |
|---|---|---|---|---|
| 1 | zh featuredSnippet（块内 @53） | 「包裝盒訂製 100 個起印, **白卡彩盒 HK$0.03/個起**」 | 低于拼版盒每件下限 0.50，更低于常规彩盒 2.5 | A 改引真值带（如「拼版盒 HK$0.50/個起 · 常規彩盒 HK$2.5/個起」）／B K3 确认 0.03 成立并补入 products.ts |
| 2 | zh 盒型列表（@4391） | 「拼版免刀模費彩盒（gang-run-card-boxes）… **HK$0.03/個起印**」 | 同上（该 SKU truth 为订单总额 HK$129-17,214） | 同上 |
| 3 | zh 工艺段（@3758） | 「1,000 個以上柯式印刷單價可低至 **HK$0.8/個**」 | 批量档位声称，低于常规彩盒 base 2.5，但属 1,000+ 档 | K3 确认档位价后保留；否则改「按量報價」 |
| 4 | zh 优势卡（@984） | 「單價低至 **HK$0.8 起**，經濟實惠」 | 同上，且未注批次条件 | 补「1,000 個以上」条件 |
| 5 | en 优势卡（@1436） | 「Unit price from **US$0.10**」 | 与 #4 同源（HK$0.8 ≈ US$0.10） | 同 #4 |
| 6 | ja 优势卡（@656） | 「単価 **HK$0.8～**、大量在庫不要」 | 同 #4 | 同 #4 |

## 3. 已确认可保留

- 「HK$300-800 刀模費行業慣例」= 竞品对比口径，非自报价
- 「HK$2.5-15/個、HK$8-42/個」= 本轮新 FAQ 引用真值带（folding / rigid）
- en/ja `US$0.10` 与 zh `HK$0.8` 同源，随 #4 一并处理

## 4. 机检联动

`scripts/guards/price-truth-guard.js` 已加 **hub 标题价检查**：`featuredSnippet` 的每件价若低于包装类目每件地板价 → WARN（不阻断）。首跑即命中 #1（HK$0.03/個起）。

## 5. 追加登记（20:0x 复检）

| # | 位置 | 原文 | 问题 | 建议 |
|---|---|---|---|---|
| 7 | zh packaging featuredSnippet | 「8-15 天交期」 | 与全站标准「3-5 個工作天（檔案確認後）」口径不一 | K3 确认 8-15 是否指拼版/大货档；否则改 3-5 工作天 |
| 8 | zh packaging featuredSnippet | 「100-10,000 本彈性 MOQ」 | 计量单位错（盒应用「個」） | **已修** → 「100-10,000 個彈性 MOQ」 |

另：packaging featuredSnippet 其余数字（100 個起印 / 8 檔標準尺寸 / DHL 2-4 天 / 1-2 個工作天順豐）与真值一致。
## 6. 运维缺陷登记：push-gate 时间源滞后

**现象**：
ode scripts/push-gate-check.mjs 报「last push 103m ago」，而 .git/logs/refs/remotes/origin/main 显示真实推送时间 1792497503（= 2026-10-20 19:57:43，22 分钟前）。
**风险**：gate 会放行 < 30 min 的撞车窗口；当前只能以 reflog 时间自行判定。
**证据**：reflog 末两行 1792492667（d576349c 18:37 推）→ 1792497503（840036dd 19:57 推）；gate 读到的值对应 commit 时间而非推送时间。
**建议**：gate 改为读 .git/logs/refs/remotes/origin/main 最后一行的 epoch。
## 7. MOQ 欠承诺：zh 已对齐 3 项，en/ja 待裁 4 项（20:2x 更新）

**三方对照证据**（PDP 线上文案 / products.ts / sku-seo 各语种段）：

| SKU | products.ts | desc（zh） | body/FAQ（zh） | 处理 |
|---|---|---|---|---|
| certificates | 100 | 100 起 ✓ | 原「10 張起印」 | **已改 100 張起印** |
| electronics-packaging-box | 200 | 200 個起 ✓ | 原「100 張／100 個起印」 | **已改 200** |
| kraft-paper-packaging-box | 300 | 300 個起 ✓ | 原「100 張／100 個起印」 | **已改 300** |
| textbooks | 100 | **50 本起** ✗ | 100 本起 ✓ | **矛盾未清，待 K3**（desc 50 vs 真值 100） |

**剩余待裁（en/ja 段）**：
- certificates ja：title/description「50枚〜」（真值 100 枚）→ 需 K3 定 50 是否小批量档
- textbooks ja：FAQ「お急ぎの少量注文は 10 枚からご相談ください」→ 属"少量可洽"软口径，非硬 MOQ 声称，建议守卫豁免
- electronics / kraft：en/ja 段仍有 100 口径残留，随 zh 对齐同批处理