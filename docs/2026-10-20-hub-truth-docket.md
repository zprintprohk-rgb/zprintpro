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
## 8. 交期口径澄清（替代 §5 #7）

「8-15 天交期」**不是错数**：真值源 = products.ts gang-run-card-boxes「【8-15 天交期】湊版生產, 不接急件, 如實標註」，sku-seo 同口径（500 個起、8-15 天）。
Hub featuredSnippet 缺「拼版」限定，与标准盒型 3-5 個工作天并列时会被读成矛盾 → **已加限定词**：「拼版 8-15 天交期」。
## 9. products-content.ts 长描述 MOQ 系统性不一致（45/77 SKU 块，待裁）

**扫描口径**：按 'slug': { 切块，取块内「N 個/張/枚/本/冊起」最小声称，与 products.ts.minQuantity 比对（脚本 .hermes/_audit_pc_moq2.cjs）。

**结果**：77 块可比对，**45 块最小声称 ≠ 真值**，四种模式：

| 模式 | 例 | 观察 |
|---|---|---|
| 块内既有 10 又有 100 | food-boxes / folding / mailer / kraft / white-card / gift / eco / handle / large bags | 疑「10 個起」为小批量档或遗留句，与 100 主口径并存 → 同页自相矛盾 |
| 声称高于真值 | waterproof-stickers 500 vs 10；premium-greeting-cards 50 vs 10 | 保守口径，非误导但压制转化 |
| 声称低于真值 | posters 系 10 vs 1 | 「10 張起」可能是批量档而非 MOQ |
| 完全一致 | 其余 32 块 | — |

**建议（K3 裁决二选一）**：
- A：把 longDescription 的 MOQ 表述统一改为「主口径 + 档位说明」（如「100 個起，10 個起小批量檔另議」）→ 需逐块改写 45 处；
- B：仅把 price-truth-guard 扩到 products-content（WARN 报告级），先观察哪些是真档位、哪些是遗留，再批量处理。

**本轮不做**：45 处属内容级重写，风险大于收益，留作独立批次（避免与本次渲染层修复混窗）。
## 10. products.ts price_range 异常（2026-10-21 新发现，待 K3 修数据）

| slug | 现值 | 问题 | 处置 |
|---|---|---|---|
| kraft-paper-packaging-box | HK.5-1000/個 | 每件价上限 1000 与 MOQ 300 明显不匹配（疑为订单总额误填） | 已在 AEO 直答层跳过该区间；**数据本身未改**（价格 SSoT 属 K3） |
| catalog-printing | HK.8-1000/本 | 同上 | 已跳过 |

影响：price-truth-guard 的 PC/UNIT 检查不受影响；但若后续有生成器从 price_range 派生文案，这两条会外溢。

## 11. AEO 直答覆盖率（2026-10-21）

| 指标 | 前 | 后 |
|---|---|---|
| 首段含「MOQ + 价格带」的 SKU | 15/85（18%） | **60/85（71%）** |
| 直答 clause 总数 | 0（命名版 5 条） | 36（无重复） |
| 剩余 25 个 | 多数 price_range 为订单总额（非每件）或无 MOQ，不宜机械补 | 待逐 SKU 人工 |

**写法约定**（后续复用）：直答：{minQ} {unit}起印、{price_range}，1 小時內免費數碼打稿，30 秒 AI 報價即時出價。 置于 body 首段；单位 個/張/本 由 price_range 后缀决定；区间异常（含 1000）一律跳过。