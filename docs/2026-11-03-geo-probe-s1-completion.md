# GEO AI 面探针 S1 完成报告（2026-11-03）

> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据：`2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md`（最新）· `2026-10-30-three-strategy-completion-and-next-phase.md` · `zprintpro-blog-deepfix.md` v1 · `2026-11-03-chief-analyst-execution-report.md` · `2026-10-27-geo-ai-face-probe-kit-nov2026.md`
> 本轮性质：**补完 11-03 首席报告 §八 的 P1 未完成项（GEO AI 探针 S1：C1-r2 + C2~C7 双跑）+ AI 引述承诺的站内真实性核验**。未修改任何 `src/`，未改任何页面文案或商业真值。

## 〇、一句话结论

**S1 全 7 簇 × 2 跑完成（Perplexity 单面）：zh-hk 三簇两跑稳定命中（C4 紙袋为第 1 推荐、C1 食品盒在列、C3 月曆第 5 位），en C2 两跑稳定提及（引用待展开复核），ja C5/C6/C7 两跑全缺席。AI 答案中归因我方的四项承诺（1 小時數碼打稿 / 48 小時快遞 / 無開版費 / FDA）经溯源均**真实存在于站内数据**，无幻觉归因——这是 AEO 正反馈的硬证据，也暴露「承诺藏在非 category 首屏」的展示收口缺口（E3 候选，不属商业真值争议）。**

## 一、执行条件登记（kit §二）

| 字段 | 记录 |
|---|---|
| AI 面 | Perplexity Web（访客/未登录，新建会话；界面 zh-Hant） |
| 账号状态 | 未登录；每簇 r1/r2 为两个独立新会话（非同一会话追问） |
| 地区/语言 | zh-Hant 界面；出口=本机默认网络（未改 IP 属地） |
| 时间 | 2026-11-03 12:22–12:33（+08:00）；C1-r1 为前轮 06:54 会话产物（保留原文件不改写） |
| 执行者 | zwork 浏览器面板（独立会话，绕开前轮 AutoGLM 扩展 WS 断连） |
| 偏差说明 | Perplexity 访客模式有间歇 signup wall；处理=`返回首页`后重新导航（**prompt 逐字未改**）。来源 chip 未展开 → 完整引用 URL 未取得（记录精度缺口，S2 必补） |

## 二、7 簇结果矩阵

| 簇 | prompt（逐字） | r1 | r2 | ZP 引用 | ZP 位次/形态 | 异常域 | AI 实际列出 |
|---|---|---|---|---|---|---|---|
| C1 食品包裝盒(zh) | 香港邊間印刷公司可以小批量訂製食品包裝盒？價錢同起訂量點計？ | ✅前轮 | ✅本轮 | **有** | r1 source #2/9；r2 表格第 3 行（标签 zprintpro） | **hkprint58.com（两跑均在列）** | e-print / 智印港 / HKPrint58 / 香港印刷中心 |
| C2 同人誌跨境(en) | Which printing companies offer Comiket doujinshi printing with international shipping? | ✅ | ✅ | **未确认**（chip「qinprinting +1」第 2 源未展开） | 仅两家之一（QinPrinting 并列） | 无 | QinPrinting / ZprintPro |
| C3 月曆(zh) | 2027 月曆印刷 香港公司推薦 訂製 邊間好？ | ✅ | ✅ | **有**（zprintpro +1） | 第 5 位（两跑一致） | 无 | e-print / Print100 / RUNTOO / Bynock / 智印港 |
| C4 紙袋(zh) | 香港 紙袋印刷 少量 訂製 邊間好？ | ✅ | ✅ | **有**（zprintpro +2 / +1） | **第 1 推荐**（两跑一致） | 无 | 智印港 / Print100 / e-print / 香港印刷中心 |
| C5 同人誌(ja) | 同人誌印刷 10部から 安い おすすめ 印刷会社 | ✅ | ✅ | **无** | 缺席（两跑 ZP 命中 0） | 无 | アイリィデザイン / おたクラブ / オレンジ工房 / なないろ堂 / コミグラ / ちょ古っ都製本 |
| C6 ja 食品パッケージ | 食品用パッケージを小ロットで印刷してくれる会社は？ | ✅ | ✅ | **无** | 缺席 | 无 | TOPPAN（1,000 枚起） |
| C7 年賀状(ja) | 年賀状印刷 10枚から 安い 外注 | ✅ | ✅ | **无** | 缺席 | 无 | ウェブポ / しまうまプリント / おたより本舗 / グラフィック / 日本郵便プリント |

**稳定性**：7/7 簇两跑方向一致（zh 三簇=命中稳定，en=提稳定，ja 三簇=缺席稳定）。无「不稳定」簇。

## 三、AI 引述承诺 · 站内真实性核验（防幻觉归因）

| AI 答案中的表述 | 站内溯源（命中文件与原文片段） | 结论 |
|---|---|---|
| 紙袋「提交檔案後 1 小時內提供免費數碼打稿」 | `src/data/category-seo-content.ts`：「提交檔案後 1 小時免費數碼打樣，確認後開印」 | ✅ 有源 |
| 月曆「48 小時快遞」「1 本起印 / 批量 300 本上印刷機」 | `src/data/products-content.ts`（100 個起印、48 小時快遞、FSC）/ `src/data/blog-posts.ts`（1 本起印、300 本起、48 小時急單） | ✅ 有源 |
| 食品盒「100 個起 / HK$2.5 起 / 無開版費、無刀模費」 | `src/data/blog-data/zh-hk.json`：「100 個起印、HK$2.5 起/個，無開版費、無刀模費」 | ✅ 有源 |
| 食品盒「FDA 級／間接食品接觸」 | `src/data/buying-guides.ts`（FDA 21 CFR + EU REACH）、labels 系 blog | ✅ 有源 |
| 上述承诺是否见于被引 category 首屏 | 线上探针：紙袋 category 页 0/5 命中「1 小時/數碼打稿」；月曆 category 页无「48 小時」（但「1本起」「300 本」「FSC」命中） | ⚠️ **跨页分散** → E3 交易答案一致性候选 |

**判读**：AI 面在引用我方时**忠实复述站内真值**（MOQ/价格/交期/认证），说明 10-30 真值裁决后的内容已被答案引擎正确读取（AEO 正反馈）。同时，AI 把「别处的承诺」当成本页能力讲（C4 的打稿、C3 的 48 小時），意味着**页面级答案收口比新增内容更能提升可核验性**——但这是展示层收口，不是商业真值争议。

## 四、与 web_search 代理基线的方向对照（不混算）

| 面 | 结果 | 口径 |
|---|---|---|
| web_search 代理（11-03 同侪） | 0/11 命中 | 检索面可见性，不等同 AI 引用 |
| 本 AI 面 S1（Perplexity） | zh-hk 3 簇 2 强 1 中（C4 #1 / C1 在列 / C3 #5）；en 1 簇提及；ja 3 簇缺席 | AI 面真引用/提及 |

方向结论：**AI 面对 zh-hk 采购型长问句的可见性显著优于普通检索面**，且引用内容为我方真值；ja 面全面缺席（与 GSC 侧 ja 低展示/年賀状盲词同向），不足以支撑页面动作。

## 五、可执行结论与边界

1. **不做**：不因探针结果改任何页面（含 C7 年賀状）；不为 GEO 新增 schema 或 AI 专用文件；不公开定性异常域 hkprint58.com（归属待核，处置权在 K3）。
2. **候选 FIX（需排期，不在本轮执行）**：E3 展示收口——把已存在于站内的承诺（1 小時數碼打稿 / 48 小時快遞）在对应 category 采购区显性化，属**既有真值的展示位置调整**，须走 11-06 七天后复测窗口与单变量原则，不与商业真值改动同批。
3. **S2（11-20~11-24）必做**：① 改用可展开来源面板，记录完整引用 URL（本轮 chip 级为精度缺口）；② C2 补「引用 vs 仅提及」判定；③ 与 11-23 GSC 28 天复测对齐判读。
4. **K3 域不变**：海报 / 包装批 1 / en sticker / en catalog / ja C109 五项商业真值仍 WAITING_K3，探针只测量。

## 六、本轮变更清单

- 新增：`.hermes/geo/geo-ai-probe-2026-11/s1-c{2..7}-perplexity-r{1,2}.md`（12 份）+ `s1-c1-perplexity-r2.md`（本轮覆盖前轮 FAILED 记录，原 r1 与 raw 未改）
- 更新：`summary-s1.md`（v1 → v2，7 簇完成）；`重要文件/2026-10-27-geo-ai-face-probe-kit-nov2026.md` §七 状态 + §九 变更记录
- 未改：`src/`、标题冻结项、贺卡资产、middleware 301、任何商业真值

## 数据来源

- 探针原始记录：`.hermes/geo/geo-ai-probe-2026-11/s1-c1..c7-perplexity-r1/r2.md`（Perplexity 2026-11-03 12:22–12:33 +08:00 实跑；C1-r1 为 06:54 前轮会话）
- 站内溯源：`src/data/category-seo-content.ts`、`src/data/products-content.ts`、`src/data/blog-posts.ts`、`src/data/blog-data/zh-hk.json`、`src/data/buying-guides.ts`（grep 逐串核对，2026-11-03）
- 线上探针：`https://zprintpro.com/zh-hk/category/{paper-bags,calendars,packaging}/`（200；2026-11-03 12:35）
- 上游：`docs/2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md` · `重要文件/2026-10-30-three-strategy-completion-and-next-phase.md` · `docs/2026-11-03-chief-analyst-execution-report.md` · `重要文件/2026-10-27-geo-ai-face-probe-kit-nov2026.md` §三/§四/§六
- 对照基线：`.hermes/geo/geo_citation_baseline-2026-11-03.md`（web_search 法 0/11，仅方向对照）
