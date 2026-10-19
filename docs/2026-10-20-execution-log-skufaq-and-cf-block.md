# 2026-10-20 执行日志：skuMoneyFAQs 包装簇扩编 + CF UA 差分 403 实锤

> **数据来源**（§0.23 强制行）:
> - GSC: `GSC数据/` 目录实测最新 = **10-19 24h 档**（18:21-18:45 导出，三站+汇总）；10-17/18 补导**仍缺**；10-20 档未导 → 恢复系数读数维持 10-19 值的终态（`gsc-cliff-2026-10-19.json`）
> - CF 探针: 本 run 双方法（curl.exe UA / fetch curl-UA / fetch browser-UA，同 URL 同刻）→ `.hermes/logs/cf-block-test-2026-10-20.json`
> - 代码层: `src/data/product-faqs.ts` @ HEAD（skuMoneyFAQs 10 keys → 18 keys）、`src/data/products.ts`（minQuantity/basePrice/price_range 真值提取）
> - 线上探针: folding-boxes / outdoor-posters / food-boxes（浏览器 UA，200 + 内容命中）
> - 校准状态: 已校准（2026-10-20，全部一手直读 + 双方法）

---

## 一、GSC 数据状态（无新档，如实记录）

| 项 | 状态 |
|---|---|
| 目录最新文件 | **10-19 24h 档**（三站 18:22-18:45 + 汇总 18:21） |
| 10-17/18 补导 | ❌ 仍缺（K3 待办 #3 未完成） |
| 10-20 档 | ❌ 未导（今日尚未导出） |
| 28d 档 | 止 10-15，数据龄 5 天 |
| 恢复系数 | 10-15 127.6% / 10-16 120.6% / 10-19 70.6% —— **有数据日 3/3 ≥60%，但序列不连续（10-17/18 断档）→ 条件①仍无法正式宣判** |

**结论**: 数据面无新增输入，本轮不做恐慌或乐观外推；恢复判定继续卡在 K3 补导。

## 二、🔴 新发现（P0 级）：CF 对非浏览器 UA 返回 403 —— UA 差分实锤

**证据链（同 URL 同刻双方法）**:

| 方法 | UA | 结果 |
|---|---|---|
| `curl.exe` 默认 | curl/8.x | **HTTP 403**，5,512 B「Attention Required! \| Cloudflare」 |
| `fetch` | `curl/8.0` | **HTTP 403**，同上 |
| `fetch` | 浏览器 UA | **HTTP 200**，199,429 B 正常页面（含连发 5 次 400-650ms 间隔全部 200） |

- 全站单发测试: homepage / category-packaging / blog / product-food-boxes 浏览器 UA 全 200。
- **判读**: CF 侧存在按 UA（非浏览器即拦）的 /product/（疑含 /category/）路径防护；单次 curl 即 403 = 非纯速率规则，而是 UA 主动拦截。这与 sprint 报告 P0#1「限速规则未验证 bot 豁免」互为印证，且比原假设更严厉（**curl UA 单发即拦**，不止 20/10s 限速）。
- **对 Googlebot 的影响**: 未直接证明（Googlebot 走 Google IP + Googlebot UA，CF verified-bot 判定路径不同）；但 10-19 展示 -41% 回落与该防护的因果关系**无法排除** —— 零成本排除法 = K3 给规则表达式加 `and not (cf.client.bot)` 或加 verified-bot skip（2 分钟）。
- **次生影响**: 所有用非浏览器 UA 的监控 / 提交脚本（含 IndexNow 校验、旧探针脚本）对 /product/ 的读数会假 403 → **探针纪律升级: 一律 .mjs + 浏览器 UA**（今日已据此复验 outdoor-posters，200 正常）。

## 三、执行交付（本批 commit `7a11fde9`，CF PASS）

**skuMoneyFAQs 包装簇扩编（sprint Top5 #3 / W2 项，提前至今日）**:

| SKU | MOQ | 价格带（products.ts 真值） | 锚点 |
|---|---|---|---|
| folding-boxes | 100 | HK$2.5-15/個 | 8 檔標準尺寸免刀模費 |
| mailer-boxes | 100 | HK$3.5-10/個 | 自鎖底免膠帶 + FBA 規格 |
| rigid-boxes | 100 | HK$8-42/個 | 天地蓋/書型磁吸/抽屜（**不引 title 的 HK$4.5**——价格 SSoT 矛盾留 K3） |
| cosmetic-boxes | 100 | HK$8-65/個 | 燙金/局部UV/擊凸/啞膜 |
| white-card-bags | 100 | HK$5-12/個 | 服裝珠寶精品 |
| kraft-paper-bags | 100 | HK$3-8/個 | 免費刀模 + FSC 可選 |
| eco-paper-bags | 100 | HK$3-8/個 | FSC 再生紙可選（誠實請求式） |
| gift-bags | 100 | HK$10-20/個 | 燙金 LOGO + 節慶場景 |

- 结构: 每 SKU 4 问 × 3 语 = 96 条 QA；Q1 直答价格/MOQ，Q2 材質工藝，Q3 交期運費（全站 3-5 個工作天口径 + DHL 2-4 天 + 滿 HK$500 順豐），Q4 場景客製。
- 覆盖: **skuMoneyFAQs 10 → 18 keys**（包装簇 9 个真实 slug 全覆盖；千问 12-SKU 清单中 mailbox/display/luxury 在 products.ts 不存在，按 §13.6 只做真实 slug）。
- 断言: 8 键插入 / 重复键 0 / 每 SKU Q=4 / 三语齐 / 备份 `.hermes/_bak-skufaq-pkg-20261020`。
- 验证: tsc 54=54；staged 门禁全规则零命中；CF **PASS**；线上 folding-boxes 探针 Q1/Q2 命中 + **FAQPage schema 在线** ✓。

**遗留补验（昨日 SSL 故障遗留）**: outdoor-posters「1 張起」= live ✓（200）；food-boxes 直答段 HK$2.5/100 個起 = live ✓。

## 四、K3 待办（按死线，10-20 更新）

| # | 项 | 死线 | 说明 |
|---|---|---|---|
| 1 | **年賀状三真值**（价格/MOQ/交期） | **10-21（明天）** | 10/22 上线窗；兜底方案已备 |
| 2 | **CF 规则加 `and not (cf.client.bot)`** | **今日** | P0 升级: UA 差分 403 已实锤 |
| 3 | 10-17/18 GSC 24h 补导 | 尽快 | 条件①宣判唯一缺口 |
| 4 | 价格 SSoT 7 处（含 rigid 4.5 vs 8） | W2 前 | title 钩子批冻结中 |
| 5 | SGS #7 真伪（7 处在展） | W2 前 | 诚信暗雷 / GEO 资产二选一 |
| 6 | GEO 通道三选一 | W2 前 | 引用率零运营 |
| 7 | GA4 核验 | 本周 | 条件③ |
| 8 | §0.0 裁决（材料 `0.0_ruling_brief_2026-10-16.md`，建议 (c)） | 择机 | 6 槽冻结 |
| 9 | 竞品对比稿合规过目 | W3 前 | blog #2 前置 |

## 五、下一棒（无 K3 依赖项）

1. **内链批 2**: eco-printing / restaurant-menu → 包装簇 hub/PDP 补链（~5 条）。
2. **直答段扩展**: 裡印工艺诚实块 → folding/mailer/white-card 三 PDP（同模板，数字各自溯源）。
3. **price-truth-guard**: 把 en/ja 块 minQuantity/basePrice 衍生数字纳入 `scripts/guards/` 断言（防 regen 回流，SOP-5 常态机检）。
4. **hub FAQ 8Q + hub v2 真值版**（价格带从 products.ts 派生，禁虚构）。
5. 包装簇深度 blog #1（zh 食品包裝完全指南，12 段骨架）。
