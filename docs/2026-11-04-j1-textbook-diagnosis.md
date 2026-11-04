# J1 教材 印刷製本（ja）恶化诊断包（PROPOSE_ONLY）

> 依据：`2026-11-03-three-market-one-two-week-optimal-strategy.md` §2.3 J1 规定序列（索引/可访问性 → 意图 → 承接 → 信息完整性）· `periodic-review-weekly-2026-11-03.md`（MEASURE 路由 gate：只补 index/intent/query×page/线上页面证据，不得自动发文/改 canonical）
> 性质：诊断交付。零 `src/` 改动、零 canonical/redirect。

## 一、问题基线

| 口径 | 值 | 来源 |
|---|---|---|
| 28d xlsx（全国家） | 46 imp / 0 clk / **pos 28.67**（前窗 20.69 → **+7.98 恶化**） | 11-03 gsc-feedback（xlsx 与 API 双方法同向） |
| API query×country（窗口 10-06..11-02） | jpn **47 imp / 0 clk / pos 29.98** | `gsc-2026-11-04-handoff-14q-snapshot.json` |
| query×page×country（09-30..10-27） | 见下三行 | `money-kw-query-page-country-2026-10-31.csv` |

**承接分布（关键）**：

| URL | 国家 | imp | pos |
|---|---|---:|---:|
| `/ja/blog/textbook-printing-guide/` | jpn | **31** | **11.97** |
| `/ja/product/textbooks/` | jpn | 12 | 56.67 |
| `/zh-hk/blog/textbook-printing-guide/` | jpn | 1 | 46.00（跨语噪音） |

⇒ 与海报（O6）**同构**：blog 是 de-facto 承接并**卡在首页边界外 1.97 位**；交易 PDP 深位；**ja category 全月仅 1 imp**（gsc-date-page 档）。

## 二、按 J1 规定序列的四步核查结果

| # | 检查项 | 结果 | 判定 |
|---|---|---|---|
| 1 | 索引 / 可访问性 | 三页全 **HTTP 200**；`robots=index, follow`；canonical 自指；无 noindex | ✅ 无技术缺陷 |
| 2 | 查询意图 | 「教材 印刷製本」= 学校/教育采购（部数・製本・校正）；我方三页均覆盖这些要素 | ✅ 意图匹配 |
| 3 | Blog / PDP 承接 | blog 11.97 / PDP 56.67 / category ≈0 → 承接已收敛到 blog，非分散内耗 | ✅ 无内耗证据（禁 301/canonical 有据） |
| 4 | 信息完整性 | 三页均检出 中綴じ・無線綴じ・製本・部数・校正・入稿 标记；blog↔PDP↔category 双向内链齐 | ✅ 无信息缺口 |

**额外发现（snippet 层）**：

| 页面 | title（当量） | desc 长度 |
|---|---|---|
| blog（pos 11.97） | `教科書・教材の印刷製本 100冊から 3製本方式 \|（品牌）` （54 ✅ 带内） | **111 字符（偏短，guidance 150-160）** |
| PDP（pos 56.67） | `教科書印刷｜中綴じ 無線綴じ｜100冊〜¥1288〜`（54 ✅） | 131 |
| category（≈0 imp） | `教科書印刷・証明書印刷 学校一括割引・FSC認証`（56 ✅） | 134 |

## 三、诊断结论（与旧假设的差异）

1. **恶化不是「内容缺失」或「技术问题」**——四步核查全部通过。旧逻辑（深位词 ⇒ 缺长文）在此不成立。
2. 真问题 = **blog 在 11.97 的边界位置**（10-12 名区间展示有量、点击近零）+ ja category 未参与竞争；月度 xlsx 的 28.67 是**查询级全国家**口径，与 query×page 的 jpn 11.97 不矛盾（不同 grain，不混算）。
3. 因此 J1 的正确动作是 **HOLD + 单点 snippet 观察项**，而非新写「教材印刷指南 2」或改 canonical（战略 J1 明文禁止）。

## 四、可执行建议（全部 PROPOSE_ONLY）

| # | 建议 | 风险 | 归属 / 触发条件 |
|---|---|---|---|
| 1 | blog `/ja/blog/textbook-printing-guide/` 的 desc 由 111 → 150-160（补 部数・納期・校正 既有真值表述，不新增数字） | 低（title 不动、正文不动） | ja 面 meta 批；与 en/zh 的 snippet 修复**分批**执行（避免多变量） |
| 2 | ja category 不追该精确词（全月 1 imp，弱匹配）；维持自身簇（証明書・学校一括） | — | 观察 |
| 3 | 跨语噪音（zh-hk blog 抢到 1 imp jpn）不处理：样本过小，且 hreflang 已正确 | — | 记观察 |

## 五、复测口径

- blog desc 若获批上线：D1/D2 健康 → **11-13（7d）/ 11-20（14d）** 同词同页同国家复核 11.97 与 CTR（基线 31 imp / 0 clk）。
- 若未获批：11-17 二轮周复盘时按「无变化」记录，不重复诊断。

## 数据来源

- `.hermes/logs/gsc-2026-11-04-j1-live-probe.json`（本轮三页实抓：status/robots/canonical/title/desc/markers）
- `.hermes/logs/gsc-2026-11-04-handoff-14q-snapshot.json`（jpn 47/0/29.98）
- `GSC数据/money-kw-query-page-country-2026-10-31.csv`（query×page 承接）
- `GSC数据/gsc-date-page-28d-end1102.csv`（ja category/educational 月内 1 imp；textbooks PDP 10-25 后日展示抬升 7→10→8）
- `.hermes/logs/2026-11-03-ZP-gsc-feedback.md`（28.67 恶化、双方法同向）
