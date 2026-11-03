# O6 海报承接二选一 · 证据包与决策建议（11-06 weekly-meta 前置）

> 角色：首席 SEO／AEO／GEO 数据战略分析师
> 依据：`2026-11-03-three-market-one-two-week-optimal-strategy.md` §Z2（O6=MEASURE 先行）· `periodic-review-weekly-2026-11-03.md`（MEASURE 路由 gate）· `2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md` §5.2-E/§7（禁止盲目 301/canonical/标题刷新）· `2026-10-30-three-strategy-completion-and-next-phase.md` §9.3
> 性质：**PROPOSE_ONLY**（L1 交付）。零 `src/` 改动。

## 一、O6 归因数据（query×page×country，窗口 09-30..10-27）

`海報印刷` 精确查询：567 imp / 1 clk / **10 个 URL** 分流：

| # | URL | imp | clk | 加权 pos | 判读 |
|---|---|---:|---:|---:|---|
| 1 | **/zh-hk/blog/poster-printing-guide/** | **210** | 1 | **9.78** | Google 已选定 blog 为该查询 de-facto 承接（37% 份额） |
| 2 | /zh-hk/product/a2-posters/ | 93 | 0 | 37.26 | PDP 深位 |
| 3 | **/zh-hk/category/posters/** | 64 | 0 | **61.72** | **category 对精确词排名极深（非被 blog 挤掉，是自己不在场上）** |
| 4-5 | blog retail-shop / poster-buying-guide | 60/55 | 0 | 65+ | 深位 |
| 6 | /zh-hk/ 首页 | 51 | 0 | 24.43 | — |
| 7 | /zh-hk/product/a1-posters/ | 23 | 0 | 24.83 | — |
| 8-10 | art-posters / price-guide / adhesive | 11 | 0 | 11-53 | — |

**归因结论（修正旧假设）**：不是「blog 抢了 category 的词」——category 对该精确词在 **61.7 位**，本就未进入竞争圈；blog 是唯一在 9.78 的页面。**「砍 blog 让位 category」或 301/canonical 合并都没有证据基础**（违反 10-31 停止规则 3）。

## 二、决定性 snippet 证据（2026-11-04 02:3x 实抓）

| 页面 | title（当量） | description |
|---|---|---|
| **blog poster-printing-guide**（pos 9.78 / 210 imp） | `香港海報印刷 HK$9起：尺寸・紙質・工藝・設計要點 \|（品牌）`（**56 ✅**） | ⚠️ **英文** 197 字符：`From A3 to A0 posters, art paper to PP film, UV printing to foil stamping — （品牌）breaks down...` |
| category posters（pos 61.7） | `海報印刷 A0/A1/A2・防水1張起印・展覽/MTR 燈箱 \|（品牌）`（54 ✅） | 中文 156 ✅ |
| a2-posters PDP（pos 37.3） | `A2 海報印刷 420×594mm 10張起印 HK$16起 \|（品牌）`（**47 ⚠️ 不足线 <50**） | 中文 130（偏短） |

**头号发现**：该查询唯一进入前 10 的页面，给繁体用户看的 SERP 摘要是**英文**——210 展示仅 1 点击的直接嫌疑 #1。此属**门童 #20 meta description 语言错配存量族**（基线 120 / 现存 53 的既定清理通道），不是新政策问题。

## 三、决策建议（按优先级，全部 PROPOSE_ONLY）

### 建议 1（P1 · 低风险 · 既有 sanctioned 通道）：修 blog 的 zh-hk meta description
- 把英文 desc 换为中文 150-160 字符版（仅用站内既有真值：A2 10 張起 / HK$16 起、免費設計打稿 4 小時、滿 HK$500 順豐免運、DHL 2-4 天）。
- 归属：门童 #20 存量递减通道 / weekly-meta 批；**不动 title（56 已合规）、不动正文、不动价格**。
- 若 11-06 车道批准：单变量上线，D1/D2 健康检查 + 11-13（7 天）同口径复测 `海報印刷` CTR（基线 210 imp / 1 clk）。

### 建议 2（分类结论）：category **不**需要为精确词「夺回」承接
- pos 61.7 说明该页与查询的当前匹配本就弱；强行动 title/301 无证据且违反冻结纪律。category 维持自身簇（A2 起印/防水/展覽等长尾），观察即可。

### 建议 3（观察项 · 不进 11-06 批）：a2-posters PDP title 47 当量（不足线）
- 按序补方向：MOQ+价格已在，可补交期或品牌位；但 PDP title 属 churn 敏感面 + H1「海報印刷 · A2 大幅 · 印海報 即日」词形杂糅，留作独立单变量提案（需 K3/车道批准），不与建议 1 同批（避免无法归因）。

### 附：喜帖 / 利是封分类（11-06 议程另一半，数据已齐）
- **喜帖印刷**（hkg）：`wedding-thank-you-cards` PDP 11 imp / **pos 9.36** / 0 clk；category 34.75。样本小（15 imp）→ 分类为「页 1 零点击小样本」，先查索引与落地页意图匹配，不动页面。
- **利是封印刷**（hkg）：category 52 imp / 22.33 / 1 clk；两篇 blog 在 5.86/7.11 但仅 7-9 imp。**Q4 季节分类确认**，无动作。

## 四、纪律边界

- 无 301/canonical/删页；无 title 改动；无未拍板数字；blog desc 修复若获批，与 en stickers / ja stickers title 当量问题（104/83，见 11-04 审计）**分批**执行。

## 数据来源

- `.hermes/logs/gsc-2026-11-04-o6-poster-attribution.json`（本轮计算，源 `GSC数据/money-kw-query-page-country-2026-10-31.csv`）
- `.hermes/logs/gsc-2026-11-04-o6-live-titles.json`（本轮实抓，三页 200）
- `.hermes/logs/gsc-2026-11-03-taskj-c4-monthly.json`（海報印刷月度 14.41 基线、C4 blog 36.3% 份额交叉一致）
- 门童 #20 基线：pre-commit 输出（基线 120 / 现存 53，2026-10-28 起 ledger）
