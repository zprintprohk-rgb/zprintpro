# P1-5 · en small-batch SERP 摘要/词页匹配测量（测量类，零改动）

**日期**：2026-11-03 · **依据**：blog-money-keyword-queue.json `stickers-en`（remeasure 2026-11-07）+ 11-01 测量审计
**范围纪律**：不改商业字段 / 不加通用正文 / 不动冻结 title —— 本文件只记录证据与 FIX 假设。

数据来源:
- `.hermes/logs/money-keyword-measurement-audit-2026-11-01.json`（GSC: pos 5.5 / 单 URL 100% 承接 / 0 点击）
- web_search 实测（autoglm 口径，2026-11-03 00:20 +08:00；非 Google US SERP，工具口径见 §0.23.2 同类声明）
- 线上页面实测 title/meta（fetch 2026-11-03 00:22）

## 1. 我方现役词页资产（线上实测）

```
TITLE: Small Batch Stickers from $0.55 | 10pcs | ZprintPro          （当量 51 ✓ 50-57 区间）
META : Custom small batch stickers from 10 pcs at $0.55/pc (A4 sheet).
       No setup fees. Waterproof PVC / BOPP / coated paper, die-cut any shape,
       foil + UV finish. Production and delivery timing confirmed at quote.
       30s AI quote, WhatsApp 2h reply.
```

## 2. 竞品在检索面呈现的摘要钩子（autoglm top-5，"small batch sticker printing" / "small batch custom stickers low MOQ"）

| 竞品 | 摘要首屏钩子 |
|---|---|
| stickermule | "as few as **10** per design · free online proofs · 4-day turnaround" |
| customstickers | "**No Minimum** · Free Shipping over $35" |
| thestickybrand | "**100** 3\" custom stickers for only **$35.00**"（qty×价打包） |
| customlanyard | "minimum order quantity of 100 / 500 / 1000"（对比句式） |
| hitechalbums | "from a small batch of 100 to bulk 10,000" |

**共同模式**：摘要第一句 = MOQ 上限/下限 + 价格锚 + 免运费；材质/工艺词全部退居第二句以后。

## 3. 词页匹配证据

| 项 | 我方现状 | 竞品主流 | 差距判定 |
|---|---|---|---|
| MOQ 入摘要首句 | ✗（"10 pcs" 在 title，meta 首句是材质清单后置） | ✓ 全员 | 首屏钩子弱 |
| 价格锚 | title 有 $0.55，meta 有 $0.55/pc | 全员有（qty×价更具体） | 持平 |
| free shipping | meta 无（页面有满额规则，具体阈值未验证不引用） | 多数有 | 缺一个已验证钩子位 |
| proofs/打样 | meta 无（"free 2-hour digital proof" 曾在 10-26 审计记录为页面已有，本次未复核，不引用） | stickermule 有 | 待验证后可用 |
| title 含 "custom" | ✗（"Small Batch Stickers"）；补 "Custom" → 当量 58 = 阻断线 | query 含 custom | **title 满格不可加（§0.29.3 冻结）** |

## 4. FIX 假设（按优先级，供 11-07 复测窗执行或随批执行）

- **F1（主假设，零价格字段改动）**：meta description 重排——首句改为「From $0.55/pc · 10 pcs MOQ · no setup fees」，材质/工艺/报价流程后移；只引用页面上已验证事实。预期改善 Google 摘要选段的首屏钩子密度。
- **F2（放弃）**：title 加 "Custom" —— 58 当量越阻断线，且 title 冻结、churn 风险 > 收益。
- **F3（需 K3 商业字段授权）**：若页面存在已核实的 free-shipping 阈值（如 $99+），加入 meta；当前未验证，**不编造**。
- 验证口径：11-07 remeasure 前后对比 GSC 该词 CTR（基线 0 点击/28d），外加本文件同口径检索复测。

## 5. 明确不做

- 不动 title/H1（冻结）；不动 basePrice/MOQ（K3 价格裁决单管）；不加通用正文段落。
