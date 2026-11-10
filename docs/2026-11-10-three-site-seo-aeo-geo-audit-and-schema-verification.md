# ZprintPro 三站点 SEO／AEO／GEO 盘点 v2 + GSC 结构化数据核验与飞轮升级

> 日期：2026-11-10（Asia/Shanghai） · 角色：首席搜索数据分析与战略参谋
> 范围：`/zh-hk/…`、`/en/…`、`/ja/…` 三个语言路径（同一域名，非子域）
> 依据：`docs/2026-11-07-three-market-seo-aeo-geo-flywheel-strategy.md`（判据与飞轮纪律）
> 性质：测量 + 核验 + 已落地修复；**不承诺首页时限，不宣称 AI 引用增长**

---

## 0. 决策摘要（六条）

1. **GSC「字段 brand 重复」是已修问题，不是新问题。** 根因两层，11-01/11-02 已修并上线；今日线上实测 3 个示例 URL 均为「1 个 Product 节点 / brand 只出现 1 次 / 无 `@id` / offers 在位」。GSC 里那 3 项是**修复前的旧抓取快照**（10-30、11-01、11-02），验证已于 11-02 启动且当前「验证未发现问题」→ 只需等重抓，**不需要再改代码**。
2. **「未填写 aggregateRating / review」1,034 项是增强建议，不是错误。** 同级「应指定 offers／review／aggregateRating」= **0**（致命项已清）。1,034 的增长曲线（8/12 约 200 → 11/4 1,034）是**发 schema 的 URL 变多**的自然结果，不是质量退化。政策禁编造评分（K3 8/4 P0-2），schema 层已条件化——**只有真实评价才会输出**，当前 0 条真实评价 ⇒ 该建议会长期存在。唯一合法解法是业务动作（评价收集），不是代码。
3. **本轮新发现并已修一个真实缺陷**：分类页 JSON-LD 把同一份 ItemList 发了两次（`itemListJsonLd` 单独渲染 + 又被 `CollectionPage.mainEntity` 内嵌），线上实测 `/zh-hk/category/stickers/` 有 **18 个 Product 节点（9 个 SKU × 2）**。已删除重复发射（保留 CollectionPage + mainEntity），门禁全绿，待部署复验。
4. **近两日车道的真实状态：运行面健康、业务面全部卡在「等数据」。** 11-08/11-09 四条内容车道自然轮均有报告；14 项交接里 6 项已部署、2 项已诊断、1 项 NO_OP，剩 3 项等 11-13。**但 GSC 数据已断供第 6 天**（代理 7892 宕机，API 不可用），11-14 复测窗在数据恢复前无法判读。
5. **飞轮本阶段最值钱的动作不是再写长文，而是把「可判性」修好。** 11-14 的 28d 窗与基线重叠 75%、变更后天数仅 10.7%（真实改善 3 位 ≈ 读数 0.32 位，低于噪声）⇒ 11-14 只判方向；决策级窗 = 11-18（7d）/ 12-04（28d 82%）。这条已写入账本，成为车道每轮必读的硬判据。
6. **自进化已接线（不只写在文档里）**：新建机器可读学习账本 `.hermes/logs/flywheel-learning-ledger.json`（17 个实验条目 + 六字段 + 窗口稀释表），并在 `lane-results-bus-contract.md` 追加 **§8 账本消费契约**（开工必读、收尾必回写、不得自批、无线上核验不进学习）。5 条车道下一轮开工即按此执行。

---

## 1. 图片证据读解：三类问题的定性

### 1.1 「商家信息 › 字段 brand 重复」3 项 —— 已修，属旧抓取残留

| 项 | 值（GSC 截图） |
|---|---|
| 严重度 | 红色（内容无效，不进富媒体结果） |
| 受影响项 | 3 |
| 验证状态 | 「验证未发现问题」，开始日期 2026/11/2 |
| 3 个示例与抓取日 | `/ja/product/white-card-boxes/`（11/2）· `/ja/product/die-cut-stickers/`（11/1）· `/zh-hk/product/cartoon-red-packets/`（10/30） |
| 趋势图 | 10/28–10/31 峰值 → 11/1 起快速回落 → 残留 3 项（验证期扫描） |

**根因（代码与提交链自证，两方法互证）**

| 层 | 根因 | 修复 | 证据 |
|---|---|---|---|
| ① 跨语归并 | `Product.brand` 曾跟随页面语种取值（zh-hk 智印港 / en ZprintPro / ja ジープリント）。商品 `@id` 是 per-locale 的，Google 按 hreflang 把三语页归并为同一商品 → 同一商品读出多个品牌值 → `Duplicate field: brand` | 新增 `src/lib/brand.ts` 的 `PRODUCT_BRAND_NAME = 'ZprintPro'`，机器身份字段统一（可见品牌分层与 seller 仍按语种） | `414549e5`（11-01）；`src/lib/brand.ts` 注释记录了 11-01 的真实浏览器渲染取证：每页 1 个 Product 节点、1 个 brand，排除页内重复注入 |
| ② RSC 副本合并 | RSC flight 载荷携带同一 JSON-LD 副本，与 SSR 副本同 `@id` 被 Google 合并成一个节点 → 重复字段（GSC 76 项） | 移除 Product 的 `'@id'`，两份不再合并；站点无其他节点引用 `#product` | `c4605923`（11-02） |

**今日线上实证（2026-11-10 08:20，Node 探针 `check-brand-jsonld.mjs`，逐 URL 单次抓取）**

| URL | HTTP | Product 节点 | brand 出现次数 | 有 `@id` | brand 值 | offers | aggregateRating |
|---|---|---:|---:|---|---|---|---|
| /ja/product/white-card-boxes/ | 200 | 1 | 1 | 否 | ZprintPro | 有 | 无 |
| /ja/product/die-cut-stickers/ | 200 | 1 | 1 | 否 | ZprintPro | 有 | 无 |
| /zh-hk/product/cartoon-red-packets/ | 200 | 1 | 1 | 否 | ZprintPro | 有 | 无 |

→ **判定：修复在线上生效，GSC 那 3 项是修复前抓取快照。** 不需再改 schema 值；只需等 Google 重抓（验证期已在跑），或由 K3 在 URL 检查里对 3 个 URL 各点一次「请求编入索引」以加速。

### 1.2 「产品摘要 › 未填写 aggregateRating / review」各 1,034 项 —— 增强建议，不是错误

- 同级「内容无效的原因」中「应指定 offers／review／aggregateRating」= **0**：**曾有的致命项已经清掉**，现在只剩黄色「改进内容的呈现效果」。
- **1,034 是什么**：发出 Product schema 的 URL 总数（PDP 89 SKU × 3 语种 + 分类页内嵌 Product 节点的合计口径）。曲线从 8/12 约 200 涨到 11/4 1,034，与「schema 覆盖扩张 + 分类页内嵌商品」同步——**分母变大，不是质量变差**。
- **为什么不能「修」**：政策线（K3 8/4 P0-2、§0.23）禁编造评分；`src/data/product-reviews.ts` 是唯一合法来源，当前 0 条真实评价 → `aggregateRating` 与 `review` 按设计不输出（`getProductRating()` 返回 `null` → 渲染层跳过）。这条路径是**故意留的**，不是漏做。
- **唯一合法解法（业务动作，需 K3）**：启动真实评价收集 → 评价入库后 schema 自动出现星级，1,034 项自然下降。
  - 最小可行：订单交付后 WhatsApp 邀请 1 句 + 回收截图/原文，人工登记到 `product-reviews.ts`（含 `source`、`date`、`rating`、`body`）；
  - 进阶：Trustpilot / Google Customer Reviews 集成（需 K3 账号动作）。
  - **不推荐**：为降计数而撤掉分类页/商品页 schema（会真丢富媒体资格）。

### 1.3 新发现：分类页 Product 节点 9×2 重复（已修，待部署复验）

| 层 | 事实 |
|---|---|
| 现场 | `/zh-hk/category/stickers/` JSON-LD 内 **18 个 Product 节点**，名称严格成对重复（第 1–9 与第 10–18 同名同价） |
| 根因 | `page.tsx` L225 生成 `itemListJsonLd`；L234 把它内嵌为 `collectionJsonLd.mainEntity`；**L360 又单独渲染一次** → 同一份 9 项 ItemList 输出两次 |
| 为什么值得修 | ① 同一页对 Google 声明同一商品两遍，浪费抓取预算、增加富媒体判定歧义；② 直接被计入「产品摘要」的受影响项，虚增 1,034 这个分母；③ 与 11-02 的「RSC 副本」教训同族（重复发射 ≠ 覆盖更全） |
| 修法 | 删除独立 `<JsonLd data={itemListJsonLd} />`，保留 `<JsonLd data={collectionJsonLd} />`（页型信号 + ItemList 一次给全） |
| 影响面 | 16 类目 × 3 语种 = 48 个分类页；**不动** title/H1/描述/价格/SKU/图片 |
| 门禁 | `tsc --noEmit` 54 = 基线 54（零新增）；`check-encoding` PASS；反审门童 🔴0 / 🟠1 / 🟡3（shadow，CRED·BRAND·PHONE·SECRET 全 0） |

---

## 2. 近两日定时任务评估（11-08 / 11-09 / 11-10 01:29）

### 2.1 轮次与判定

| 轮 | 车道 | 判定 | 真实交付 | 关键事实 |
|---|---|---|---|---|
| 11-08 21:25 | daily-content（harness） | OK（内容层）| 运行面系统取证 + 10 项 K3 升级包 | 内容层 NO_OP；机器 verdict 记 STALE 属「报告形状」缺口，非空转 |
| 11-08 20:13 | gsc-feedback | **无 run 记录**（MISSING） | — | 断跑 1 日；同一时段 daily 21:25 被锁挡下 |
| 11-09 20:13 | gsc-feedback | OK（NO_NEW_KPI） | 14 项交接台账重算 + A46–A51 异常 + 2 个线上探针 | 数据断供第 2 日；拒绝造新读数（对） |
| 11-09 21:17→23:18 | daily-content | OK（NO_OP） | retry 四项裁决 + **A50 根因定位** + 1 项附带缺陷 | 首次 BLOCKED 是锁竞争（gsc 持锁 5.4 min），同 key 恢复重试合规 |
| 11-09 07:10 | k3-review | OK | 复盘 + D1/D2/D3 | 断跑 3 天后首轮 |
| 11-07 23:53 | blog-deepfix | OK | 冻结基线观察 + 复测计划 | 未硬造长文 |
| 11-10 01:29 | 调度器真值刷新 | — | 四方对账 | daily/gsc/k3/blog 全 `LastTaskResult=0`；**仅 monthly-matrix 仍坏** |

### 2.2 11-07 的 14 项交接，两天内被消费 9 项（这是本轮最该肯定的事）

| 状态 | 数量 | 明细 |
|---|---:|---|
| DEPLOYED（已上线，待复测） | 6 | コミケ印刷（`74ffa5a9` 单位/注文）· 宣傳單張（A4/A5 价格真值）· 印海報（主承接 → category，`9acc3d16`）· 教材印刷製本（¥1,288〜 三处同源）· a2 poster（H1 + MOQ 100→10）· 喜帖印刷（主承接 → wedding-invitations） |
| DIAGNOSED | 2 | small batch sticker printing / small batch stickers（PDP 100% 承接、非内耗 → HOLD/MEASURE） |
| NO_OP | 1 | 利是封印刷（季节窗 + 承接已集中 75%） |
| 待 11-13 | 3 | 食品包裝印刷（页一零点击）· doujinshi printing · 卒アル販売 |
| 样本门 | 2 | saddle stitch booklet printing（5 imp）· large envelopes（1 imp） |

### 2.3 运行面三类事件（都不是内容失败）

1. **dsh 额度**（11-07 daily `dsh_exit=1`）：11-08 harness `dsh_exit=0` 与 11-09 preflight 凭据三项全 ok 已反证——判 `retry`，**不要再让管理员跑凭据修复脚本**。
2. **代理宕机**（11-09 20:38 起）：Clash/mihomo `127.0.0.1:7892` 拒连、直连 000 → 车道无法拉 API；owner = K3/主机。
3. **CF 构建**：`84a31eea` build failure（diff 100% 为 `.hermes/`，零 src，线上仍服务 `d7a8d5d7` 含全部 src 修复）；`ee3fdef4` 推送 2h+ 未出现 check-run。**本月 push 47 次 ≪ 500 配额**，排除配额原因。

### 2.4 判读纪律

- 「车道 OK」= 当日产物齐（报告 + 证据 + 下一验证点），**不等于**「内容已上线」「KPI 已刷新」「排名已改善」。
- 结论：**运行面健康，业务面全部卡在数据供给与审批**。这不是执行懈怠，而是 11-07 战略明确规定的「测量先行」。

---

## 3. 三站点盘点（数据面 → 内容面 → 结构化数据面 → GEO 面）

### 3.1 GSC 四窗（数据日 2026-11-04，11-07 批次；**非今日读数**）

| 窗口 | 点击 | 展示 | CTR | 平均排名 |
|---|---:|---:|---:|---:|
| 24h（11-06T03–11-07T02） | 12 | 803 | 1.4944% | 12.5218 |
| 7d（10-29–11-04） | 135 | 6,912 | 1.9531% | 15.9627 |
| **28d（10-08–11-04）** | **538** | **23,183** | **2.3207%** | **14.2796** |
| 3mo（08-01–10-31，11-03 档） | 1,279 | 65,252 | 1.9601% | 17.355 |

- 29 个带钱词合计：**2,102 展示 / 4 点击 / 页一 8 行 / 其中 7 行零点击（239 展示）**。
- **页一零点击 = 摘要问题，不是排名问题**（`small batch sticker printing` 27/0/6.00、`small batch stickers` 19/0/5.42）→ 先取 SERP 快照再谈 snippet 单变量。
- **深位但方向在改善**：`貼紙印刷` 37.65（0 点击）、`宣傳單張` 34.73、`喜帖印刷` 36.25、`教材 印刷製本` 31.49、`a2 poster` 25.80、`コミケ 印刷` 22.88。
- **已改善且有点击**：`印刷公司` 142 展示 / 2 点击 / 26.80；`china catalog printing` 98 展示 / 14.15。
- 成熟度口径（§0.30.7）：zh-hk 28–41 属**年轻站正常位**（不判失败）；en/ja >20 属新生儿正常，只打地基。

### 3.2 数据供给断链（P0，阻塞全部复测）

| 面 | 最新 | 时龄 | 状态 |
|---|---|---|---|
| xlsx | 11-07 导出（**缺 3mo**） | 28d 数据日 11-04 | 断供第 6 日 |
| API | `end1105`（数据日 11-04） | >116h | 代理宕机，不可拉 |
| detector | 11-03（官方 123.7%） | 6 日空 | 恢复系数只能写 UNKNOWN |
| `GSC数据/index.json` | lastBuild 11-05 / 最新 11-03 | 未收录 11-07 批 | 门童 #9 会误判新鲜度（A47） |

→ **K3 一次动作可解**：重启代理 + 导出 11-08/09/10 四档（命令见 §7 D1）。**没有这一步，11-14 复测连「方向」都判不了。**

### 3.3 内容资产（今日实测，AGENTS.md §0.33.1 四口径）

| 口径 | 值 | 说明 |
|---|---:|---|
| `blog-data/zh-hk.json` unique slugs | **101** | 真实 zh-hk 页面内容 |
| `blog-data/en.json` unique slugs | **102** | en 真实页面内容 |
| `blog-data/ja.json` unique slugs | **101** | ja 真实页面内容 |
| `blog-posts.ts` entries / unique slugs | **111 / 110** | SSoT 配置（含衍生与重复） |
| 三语并集 | **102** | 实际总博客数 |
| 三语交集 | **101** | 三语同步覆盖 |

- **12 段骨架**：`blog-12seg-baseline.json`（2026-10-31 校准）`fails = 0` —— 存量全部通过「只许递减」基线，**本阶段不需要再批量改骨架**。
- 注：§0.33.1 表内的 79/80/80/85 是 2026-09-02 校准值，已过期两个月；建议 K3 确认后按上表刷新（本轮不擅自改宪法级文档，只把新值写进账本 `counters`）。

### 3.4 结构化数据面（决定 AEO／富媒体上限）

| 类型 | 覆盖 | 状态 |
|---|---|---|
| Product（PDP） | 89 SKU × 3 语种，含 offers / validFrom / priceValidUntil / sku / availability / eligibleQuantity / businessFunction / ProcureAction / sourcingIntentKeywords | ✅ 在线；brand 统一常量、无 `@id`（11-01/02 修） |
| Product（分类页内嵌 ItemList） | 16 类目 × 3 语种 | ✅ 在线；**本轮修 9×2 重复**，待复验 |
| CollectionPage | 同上 | ✅ 在线（mainEntity = ItemList） |
| FAQPage · HowTo · BreadcrumbList · Speakable | 分类页 + PDP + blog | ✅ 在线（T43 观察项：富媒体是 GSC 观察项，禁盲改） |
| aggregateRating / review | **0**（无真实评价） | ⛔ 政策禁编造；等业务评价收集 |
| Organization sameAs | 空壳（§0.36.3 缺口 #1） | ⏳ 目录建设联动 |

### 3.5 GEO 面（AI 引用）

- S1 基线（2026-11-03，`web_search` 口径，`source_check` 已不可用）：**0/11 命中**，两遍 top-5 完全一致（测量确定性成立）。分语种 en 0/3 · zh-hk 0/3 · ja 0/5。
- 判读：zh-hk 贴纸簇被电商聚合内容淹没；HK 头部（e-print / bmpack / print100）与 09-30 序列重叠 = 差距在**引用面**，不在内容面；ja 年賀状簇被官方渠道锁死，路径是差异化而非正面竞争。
- **复测节奏 11-10 / 11-17 / 11-24 已到期今日**，本次会话未执行（22 次探针调用成本高）→ 登记为 `EXP-GEO-S1` 的 blocked 项，不虚构读数。
- 纪律：无完整答案原文与 citation URL 前，**任何报告不得写「AI 引用增长」**；S2 计划 11-20–24。

### 3.6 三市场落点（与 11-07 结论一致，无新反向证据）

| 市场 | 本阶段唯一瓶颈 | 下一步 | 禁做 |
|---|---|---|---|
| zh-hk | 页一零点击（摘要）+ 深位承接集中 | 11-13 摘要单变量；11-14/21 看份额收敛 | 大规模改 title（churn） |
| en | 新生儿期打地基 + 3 个带钱方向（small batch stickers / catalog / doujinshi） | 索引与 hreflang 健康；SERP 可得后做 snippet | 为垃圾长尾（in tajik 等）建页 |
| ja | 教材/同人簇：语言质量、价格真值、承接 | 11-14 方向；C109 不造活动日期 | 正面竞争官方渠道 |

---

## 4. 行业大词 / 带钱大词「首页飞轮」增强设计

### 4.1 三层词，三种打法（不再用「大词全铺」）

| 层 | 判据 | 动作 | 判据窗 |
|---|---|---|---|
| **A 页一零点击**（8 词 / 239 展示） | 排名已在 1–10 但 0 点击 = 摘要与意图错配 | 先存 SERP 快照（真实 title/snippet）→ 单变量改 snippet（一次一个词） | 7d 达 100% 变更后（11-18 起） |
| **B 深位可推**（14–37 位） | 有展示、有承接页、真值一致 | 只做承接集中 + 单页证据（本次 6 项已部署） | 28d ≥82%（12-04 起）判经营 |
| **C 季节窗**（利是封 / 月曆 / コミケ） | 活动驱动 | 只在活动前 6–8 周判；窗内不判失败 | 活动窗 |

### 4.2 为什么不复写长文（与 11-07 §8、11-09 daily 一致）

- 深位不是「缺内容」：books 双页均 30+（blog 92@30.41 / category 90@55.08），**没有页一竞争者** → 301/canonical 与新长文都不会让它进首页；
- 页一零点击不是「缺内容」：`small batch sticker printing` 的 PDP 承接 100%，缺的是 snippet 与购买信息的可见性；
- ⇒ 只在**真实采购信息缺口**（价格/MOQ/交期/规格缺失或矛盾）才允许复写，每轮最多一篇，其余给 `MEASURE/NO_OP`。这就是「学到但不出手」的纪律。

### 4.3 决策日历（每项六字段已写进账本，车道照表执行）

| 日期 | 判什么 | 判据 | 失败动作 |
|---|---|---|---|
| **11-10** | 月曆 FAQ 7 天窗（`c0552853`）；数据恢复 | 目标页展示 ≥ 基线 80% 且带钱词 ≥1 点击 | 单窗不判胜负 |
| **11-13** | weekly-meta 首验：7 项 FIX 残留 + 海报 desc + **超带 title 三页**（en stickers 100 / ja stickers 83 / zh-hk flyers 59） | 单变量、`title-v5` #27 PASS、逐页过 | 不合规就 HOLD，禁连改 |
| **11-14** | 14 项首轮复测 | **只判方向 + 真值一致性**；28d 标 `BACKGROUND_ONLY` | 不得回滚、不得二次改动 |
| **11-18** | 首个 7d 100% 变更后窗 | 7d 方向 + Δpos | 需并列 confounders |
| **11-21** | 第二窗（海报/喜帖份额收敛） | 7d 可判 | 28d 仍只作背景 |
| **11-28** | small batch 复测（美国英文 SERP） | 同口径 28d | SERP 不可得则继续 `SERP_UNAVAILABLE` |
| **12-04** | 28d 达 82% 变更后天数 | 首个可做 SCALE/HOLD/FIX/STOP | 六件齐才 SCALE |
| **12-10** | 28d 100% 干净窗 | 复核 | — |

---

## 5. 飞轮自动化的「学习与自进化」升级（已接线）

### 5.1 已有机制（不是从零建）

`run-context`（上一轮结果 = 幂等账本）· `lane-runs.jsonl` 结果总线 · `lane-status.mjs` 8 态状态机 + `recovery_plan ∈ retry|modify_payload|request_human|abort` · `lane.lock` 互斥 · 看门狗 v2 四方对账 · `learning-candidates.jsonl`（§7.4 四件齐）。

### 5.2 本轮新增两件（把「学习」从口号变成可执行契约）

1. **`.hermes/logs/flywheel-learning-ledger.json`**（机器读，17 个实验条目）
   - 每条含：`baseline / change / approval_gate / production_deploy / online_verify / retest / verdict / owner_lane / do_not_touch / confounders`；
   - 内置 `window_math`（导出滞后 3 天 + 六档稀释表）与 `data_supply`（断供状态 + K3 动作）；
   - 内置 `hard_rules`：单变量 / 不自批 / 决策级窗 / 无线上核验不学习 / 禁编造 / 停止≠删页。
2. **`lane-results-bus-contract.md` §8「飞轮学习账本」**（16,680 字节，追加于 §7.4 之后）
   - 开工 STEP 0 第二句：读完总线后**必须**读本车道账本条目 + 窗口表，未读不得派复测/改写任务；
   - 收尾必回写自己消费/产出的条目；
   - **`APPROVED` 只能由 K3 拍板写入**；把 `HOLD/MEASURE` 直接改 `SCALE` 视为伪造学习结论；
   - 数据断供时全部复测写 `BLOCKED` + 原因，不得用旧档重算冒充当日读数。

### 5.3 三条硬边界（防止「自动化变成自嗨」）

1. 学习样本 = **已部署 + 已线上核验 + 有可比窗口**，缺一项只能 `DEPLOYED/MEASURE`；
2. 窗口未达 100%（7d）/82%（28d）变更后天数 → **禁止**输出经营判断（11-14 的 28d 是典型陷阱）；
3. 人工审批（K3 一句话）不可自动化，执行层不得把「LLM 判断的合理」当批准。

---

## 6. 本轮已落地

### 6.1 代码（1 文件，1 处）

| 文件 | 改动 | 性质 |
|---|---|---|
| `src/app/[locale]/category/[slug]/page.tsx` | 删除独立 `<JsonLd data={itemListJsonLd} />`（原 L360），保留 `collectionJsonLd`（mainEntity = ItemList）；加 4 行注释说明根因 | 重复结构化数据缺陷修复（去重，不减少覆盖） |

### 6.2 文档/账本（4 件）

| 文件 | 内容 |
|---|---|
| `.hermes/logs/flywheel-learning-ledger.json` | 飞轮学习账本（17 实验 + 窗口表 + 数据供给 + 计数器 + 按日行动） |
| `.hermes/cron-prompts/lane-results-bus-contract.md` | 追加 §8 账本消费契约 |
| `docs/2026-11-10-three-site-seo-aeo-geo-audit-and-schema-verification.md` | 本报告 |
| `SESSION_LOCK.md` | 持有/释放记录（§0.35.7 双条件已核） |

### 6.3 门禁与部署验证

| 项 | 结果 |
|---|---|
| `node scripts/check-encoding.js` | ✅ PASS（无编码问题） |
| `npx tsc --noEmit` | ✅ 54 = 基线 54（零新增） |
| 反审门童（--commit） | ✅ 🔴 0 / 🟠 1 / 🟡 3（shadow）；CRED·BRAND·PHONE·SECRET 计数全 0 |
| push 闸门 | ✅ 上次 push 527 分钟前，窗口已开 |
| 部署与线上复验 | 见下方回填（推送后写入） |

---

## 7. K3 决策清单（一次回复即可，按优先级）

| # | 级别 | 事项 | 推荐 | 一句话要什么 |
|---|---|---|---|---|
| **D1** | 🔴 P0 | **GSC 数据断供第 6 天**：代理 7892 宕机 + 无 11-08/09/10 导出 | 重启代理 + 四档导出（24h/7d/28d/3mo） | 「已导出」或指定日期；否则 11-14 复测全部无效 |
| **D2** | 🟠 P1 | **真实评价收集**（决定 1,034 项能否合法下降） | 启动「订单交付后 WhatsApp 邀请 1 句 + 人工登记」最小闭环 | 「启动 / 不启动」；启动后我给登记模板 |
| **D3** | 🟠 P1 | **A50：en/ja PDP 渲染 zh-hk features 中文块**（76 数组，`ProductPageV9` L665-670 无 locale 分支） | B 立即止损（仅 zh-hk 渲染）+ A 分批本地化（11-22 后，先 8 个带钱 SKU）；贺卡 6 SKU 单列等 §0.0 | 「B 放行 / A 名单认可 / 贺卡不动」 |
| **D4** | 🟡 P2 | **A49：catalog 页内 MOQ 自相矛盾**（H1/desc=10 vs 规格表 100 vs FAQ 50–100） | 11-22 单批修正（避开复测窗） | 「11-22 修 / 提前」 |
| **D5** | 🟡 P2 | **超带 title 三页**（en stickers 100、ja stickers 83、zh-hk flyers 59，阻断线 58） | 11-13 weekly-meta 单批、单变量、过 #27 | 「授权 11-13 执行」 |
| **D6** | 🟡 P2 | **monthly-matrix 重建**（`2147946720`，11-01 起第 9 天；需管理员） | 管理员 `schtasks` 重建 | 「已重建」 |
| **D7** | ⚪ P3 | **§0.33.1 四口径表刷新**（现为 9/2 的 79/80/80/85，今日实测 101/102/101/111-110） | 按新值刷新并标校准日 | 「刷新 / 保留」 |
| **D8** | ⚪ P3 | §0.0 名片展示层 (a)/(b)/(c) 仍悬（自 9/12 未裁） | 维持现状只接单 | 一句话即可长期关闭 |

---

## 8. 数据来源 / 校准状态 / 撤回声明 / 诚实边界

### 8.1 数据来源

```
数据来源:
- GSC xlsx（11-07 导出，最新）: 24h 12/803/1.4944%/12.5218（11-06T03–11-07T02）· 7d 135/6912/1.9531%/15.9627（10-29–11-04）· 28d 538/23183/2.3207%/14.2796（10-08–11-04）· 3mo 11-03 档 1279/65252/1.9601%/17.355（08-01–10-31）
- GSC 分析档: gsc-2026-11-07-four-window-analysis.json · gsc-2026-11-07-money-keyword-delta.json（29 钱词 2,102 imp / 4 clk / 页一 8 行 / 7 行零点击 239 imp）· gsc-daily-anomaly-2026-11-07/-11-09.json
- 车道报告（11-08/11-09）: 2026-11-09-ZP-gsc-feedback.md（14 项台账 / A46–A51 / 窗口算术）· 2026-11-09-ZP-daily-content.md（A50 根因 / retry 裁决）· 2026-11-09-ZP-k3-review.md · 2026-11-08-ZP-daily-content.md · 2026-11-08-poster-wedding-primary-url-execution.md · 2026-11-08-risk-query-priority-execution.md · 2026-11-08-small-batch-serp-diagnosis.md · 2026-11-09-build-failure-and-dataplane-incident.md
- 调度器真值: .hermes/logs/2026-11-10-scheduler-truth-refresh.md（2026-11-10 01:29 Get-ScheduledTaskInfo 实测）
- 总线: .hermes/logs/lane-status.json（11-09 06:43, bus_records=108, verdict=ATTENTION, problems=6）· .hermes/logs/lane-runs.jsonl
- 代码与提交链: 414549e5（11-01 PRODUCT_BRAND_NAME）· c4605923（11-02 移除 Product @id）· src/lib/brand.ts 注释 · src/lib/seo.ts L1236-1426（review/aggregateRating 条件化）· src/data/product-reviews.ts · src/app/[locale]/category/[slug]/page.tsx L225/234/360
- 线上实证（本会话 2026-11-10 08:20，Node 探针 .hermes/tmp/check-brand-jsonld.mjs，逐 URL 单次抓取）: /ja/product/white-card-boxes/ · /ja/product/die-cut-stickers/ · /zh-hk/product/cartoon-red-packets/ · /zh-hk/category/stickers/（18 节点 → 9 SKU × 2）
- 内容口径（本会话 2026-11-10 08:25 实测，Node utf8）: blog-data/{zh-hk,en,ja}.json = 101/102/101 · blog-posts.ts 111 条 / 110 唯一 · 并集 102 · 交集 101 · blog-12seg-baseline.json fails=0（2026-10-31）
- GEO: .hermes/geo/geo_citation_baseline-2026-11-03.md/.json（S1 0/11，web_search 口径）
- 用户提供的 GSC 截图 7 张（2026-11-10）：商家信息「字段brand重复」3 项 / 产品摘要 aggregateRating 1,034 / review 1,034 / 「应指定offers/review/aggregateRating」0
校准状态: 🟢 已校准（2026-11-10）— 线上 4 URL 单次抓取 · 代码/提交链一手直读 · 内容计数 Node utf8 双口径（唯一 slug / entries）· 窗口算术复用 11-09 已证 lag=3
🟡 KPI = 11-07 批次携带值（数据日 11-04，龄 >116h，STALE），**不是今日读数**
🔴 detector = 6 日空；GEO 复测（11-10）未执行
撤回声明: 无。本轮不推翻任何前序读数；11-04/11-07/11-08 的机器 verdict（STALE/FAILED）按契约 §6.3 保留不改写。
```

### 8.2 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 今日 KPI / 新 delta | 无 11-08/09 导出，全部为 11-07 携带值 |
| 2 | 「1,034 项会降多少」 | 未发生；依赖真实评价收集与 Google 重抓节奏，不给数字 |
| 3 | 分类页重复节点的影响量级 | 只证明「18 → 应 9」的结构事实，不声称排名/CTR 损失（无 A/B） |
| 4 | ja/en 全量 PDP 是否都无重复 brand | 只抽 3 个示例 URL；其余为同组件同路径推断 |
| 5 | GEO 引用 | 无新探针，不写任何增长/下降结论 |
| 6 | 11-14 复测结果 | 尚未发生；§4.3 是口径与日历，不是预测 |
| 7 | 本轮修复的部署结果 | 见 §6.3 回填；推送后以 CF build + 线上节点数为准 |

---

*本报告为内部战略文档（不进入站点渲染）。飞轮执行判据以 `flywheel-learning-ledger.json` + `lane-results-bus-contract.md §8` 为准；本报告不替代任何 K3 拍板。*
