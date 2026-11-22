# 2026-11-21 三语站点 SEO/AEO/GEO 飞轮深度盘点 + 市场竞争情报 + 下一步优先级执行单

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师（执行层综合分析批）
> 数据来源：
> - 本机实况：`git log/status`（2026-11-21 14:0x）、`lane-status.json`（10:29 生成）、`strategy-task-queue.json`、`coordination-board.json`、线上 curl 双方法验证（browser UA）
> - 内部文档：重要文件/ 2 日内 8 份 + `.hermes/geo/` 4 车侦察产物（11-21）
> - 竞品调研：`seo-research/hk-competitor-research-2026-11-21.md` + en/ja 两路调研全文（2026-11-21 实抓，来源 URL 与日期 inline）
> 校准状态：GSC 最新数据日 = 11-16（11-19 导出批）；转化数据按 §0.37 终局不接入
> 纪律：本批零 src/ 改动、零 push；只读验证 + 分析 + 执行单签发

---

## 一、三问速答（K3 首要关切）

### Q1：99902084（A2海報+即日傳單 17項商業真值批）push 成功了吗？

**已成功 push 且已成功部署上线。** 双方法验证：

| 方法 | 证据 | 结论 |
|---|---|---|
| ① git 远程谱系 | `git branch -r --contains 99902084` → origin/main 与 origin_ssh/main 均含；origin_ssh/main head=e392b120（11-21 09:59）、origin/main head=ad7fb342（11-21 13:32），皆为 99902084 后代 | push ✓ |
| ② 线上生产页实抓 | `/zh-hk/product/a2-posters/`（browser UA）title=「A2 海報印刷 420×594mm 10張起印 HK$16起 \| 智印港」、meta description 为新口径、FAQ Q1「10 張起印；500 張或以上詢問階梯價更優」、「12.9」「1張起印」0 残留 | 部署 ✓ |

DSH GUI 部署卡显示「No deployment available」是 GUI 部署视图无 Cloudflare provider 配置所致，**不代表真实部署状态**；git + 线上实抓双证已足够。

**未 push 的尾巴（如实登记，不擅自代推）**：
- 本地 main 领先 origin/main **1 个 commit**：`6e48429b`（comiket 答案鏈補漏线上复验残留修复，tsc 新基线 0、brand 0）——满足「≥1 src 行为修复」攒批阈值，已具备推送资格；距上次 push 13:32 过 30min 窗口即 14:02 后可推。
- 工作树 9 个未提交文件（lane-status/gsc 分析产物/今日 4 份审计 JSON/DMCA 证据包/CF 五开关执行单），建议攒批随下一自然 push 窗口交车道或 K3 会话处理。

### Q2：重要文件 2 日内 8 份新文件——要点与状态

| 文件 | 核心内容 | 状态 |
|---|---|---|
| 2026-11-21-cloudflare-five-switches-waf-dmca-execution-sheet.md | **今日 13:2x 已实跑**：Bot Fight Mode→OFF（AI 爬虫放行核心修复）+ WAF 3 条规则 + 边缘四测（Chrome 200/空UA 403/伪Googlebot 403/伪GPTBot 403）+ K3 13:25 拍板 ai_training 維持 disallow + DMCA 证据包待 K3 补 E2 截图签名 + 72h 对账任务已注册（11-24 13:37） | ✅ 已执行，待 K3 收尾 |
| 2026-11-28-decision-package-draft-v1.md | 两周终审决策包草案（A 六项 KPI 输入全 pending 11-24 数据批 / B 三项拍板 B1 实体归一·B2 ja 深度·B3 双高地防守 / C 12 月关键词分配 / D K3 真人动作五件 / F 11-24 首读机械执行单） | ⏳ 等 11-24 数据批刷新 §A |
| dmca-evidence-2026-11-21/（4 文件） | E1 对照表 11 对 + E3 git 时间戳 + Google 移除 URL 清单 + 可粘贴投诉正文 | ⏳ 待 K3 补 E2 截图+签名提交两线 |
| 2026-11-21-daily-flywheel-brief-and-four-mandated-steps.md | 今日四大指令项全部落地：①SMALLBATCH 7d 复测落账（pos 7.52，窗口未满不判胜）②周六 Blog=NO_OP 暂定（19:08 Harness 窗后终判）③海报/教材/C109 诊断完成（海报簇真承接=blog 1194imp@10.86 贴页一）④query×page=NO_DATA 如实记录 | ✅ EXECUTED |
| blog-money-keyword-queue.json | stickers-en 追加 measurement_history 首条 | ✅ 已落账 |
| 2026-11-20-a2-posters-and-same-day-flyers-truth-decision-sheet.md | A2 八项 + 传单九项拍板单（K3 11-20 20:55 已覆核三项），现已由 99902084 落地 | ✅ 已上线 |
| 2026-11-20-manual-scheduler-rebuild-and-two-week-flywheel.md | 4+1 任务体系设计副本 + 两周日程（11-20—12-03）+ 老板五件事 | ⚠️ 设计完成，**生产应用未发生** |
| 2026-11-20-k3-decision-window-one-page.md | K3 决策窗单页 | 参考件 |

### Q3：近 1 日定时任务结果（lane-status.json 10:29 口径）

| 车道 | 11-20 结果 | 关键事实 |
|---|---|---|
| ZP-daily-content | PARTIAL | dsh_exit=0，commitOnly 未 push；幂等键已消费，非空转 |
| ZP-gsc-feedback | PARTIAL（已 push fb62b52b） | 产出 4 图表资产入 docs/assets |
| ZP-weekly-meta | FAILED（guard 拦 9 src 文件） | **11-21 等价性核验已关闭**（b2eaf643 双方法：lane head 5d78f8ae 是 origin/main 祖先 + 树差 436+/746- 与 K3 真值批 99902084+42223814 完全吻合；guard 防双写按设计生效，零工作丢失） |
| ZP-blog-deepfix | 0x800710E0（11-15 起停摆） | 下次触发 11-21 23:47，**今晚是关键自然轮验收点** |
| ZP-monthly-matrix | 0x800710E0 | 并入每月第一个周五 weekly 的方案待应用 |
| ZP-k3-review | MISSING×4 天（11-18 起） | 今晨 08:03 LastTaskResult=2147946720 再拒；积压 4 天 |
| ZP-cron-watchdog | 运行但 2147946720 | 06:43 触发，结果码异常 |

**根因未变**：7 任务全部 LogonType=Interactive → 夜间/清晨 0x800710E0。DeepSeek 额度已恢复（11-20 起 dsh_exit=0）。11-20「手动调度器重建」未发生（Windows 层零变更；11-20 18:56 修复脚本被 watchdog-canary 守卫拦下）。

### ⚠️ 本批新发现的操作风险（必须登记）

**今日 13:2x WAF 新规则上线后，裸 `curl` UA 命中「Challenge Scraper UAs」规则（`curl/` 在列）→ k3-review/daily 车道的线上 curl 探针若不带浏览器 UA 将被挑战页拦截，可能产生假 0/假断言。** 建议：所有 verify 脚本 curl 调用统一加浏览器 UA 头（或走 `cf.verified_bot_category` 豁免以外的内部探针清单）；11-24 的 72h 对账 prompt 已含边缘三测，届时一并验证。

---

## 二、有没有自动协调？——判定：**协议层已通、调度层半瘫**

| 层 | 现状 | 判定 |
|---|---|---|
| 数据/协议层 | lane-runs 总线 + lane-status 机器账本 + run-context 幂等账本 + coordination-board（lane_assignments 齐备）+ strategy-task-queue（READY/WAITING 状态机）+ flywheel-learning-ledger（17 实验）+ blog-money-keyword-queue + 5 车道 prompt 注入消费契约 | ✅ **自动协调已存在**：每个冲刺簇有唯一任务 ID/owner/baseline/审批/复测字段 |
| Harness 调度层 | 原生仅 2 条 active：daily 18:17 + 周六 Blog 19:08（后者 prompt 仍是旧版只读验收稿）；11-19 14:39 管理员已应用 2 条修订 | ⚠️ 半应用 |
| Windows 调度层 | 7 任务在册全 Interactive，5 条 0x800710E0 | ❌ 半瘫，自然轮不可信 |
| 缺口 | 统一入口技能 zprintpro-content-standards/SKILL.md 不存在（CONFIG_GAP）；cron-lanes.json 未按 4+1 精简同步；`\ZprintPro-CronWatchdog-2125` legacy 未删 | 待管理员 |

**结论：飞轮的「自动协调大脑」已经建成并在产出（今日 11-21 brief 四指令项即为编排层按队列执行的成果），但「四肢」调度层仍靠人手。下一阶段不是再建系统，而是管理员完成 §5.3 watchdog 重建 + S4U canary 四方验收 + Harness 4 入口粘贴（动作包全部就绪，只差真人执行）。**

---

## 三、三语「行业大词 vs 真带钱词」飞轮盘点（结合 11-21 竞品实抓）

### 3.1 词盘总览（数据日 11-16，28d 窗 10-20—11-16）

- **大盘**：9 月基线同长窗全正向（clk +56% / imp +34% / CTR +0.28pp / pos −3.78），但 **7d 稀释形态确认**：曝光连升 7 批 5635→8283、点击连降 3 批 158→130、CTR 2.10→1.57%、pos 13.56→15.52。页一词数 8→6，en/ja 三词回撤（教材印刷製本 +32.95 / a2 poster +22.15 / small batch stickers 跌出页一）。
- **行业大词（地基，4–12 周战线）**：海報印刷 18.24（187imp 恶化加深）、貼紙印刷 32.58、宣傳單張 38.09、書刊印刷 33.83、紙盒印刷 35.76、パッケージ印刷（ja 无基线）。
- **真带钱词 Top10（距页一×曝光）**：宣傳單張 3792 / 貼紙印刷 3342 / 書刊印刷 3169 / 宣傳單張印刷 2401 / コミケ印刷 2067（季节 HOLD）/ 禮盒訂製 1863 / 教材印刷製本 1740 / 月曆印刷 1667 / 海報印刷 1541 / 紙盒印刷 1520。
- **速赢层（≤5 位冲刺）**：證書印刷 10.78 · doujinshi printing 10.80 · 香港印刷 11.37 · 小冊子印刷 11.92 · 可移貼紙 13.19 · china catalog printing 13.98。
- **页一零点击摘果组**：食品包裝印刷 125imp@7.93（**全站最大缺口**，11-18 meta 已落冻结观察）、即日印刷 8.28（2 击）、small batch sticker printing 7.52、卒アル販売 5.0。

### 3.2 竞品情报 → 三语打法校准（2026-11-21 实抓，全文见 seo-research/ 与上下调研）

**香港（zh-hk）——胜负手 = 价格透明 + 时间钩**
- SERP 头部三模式：①静态价目表页被 Google 整表引用（print100「$260/500張 A5」直接进 snippet；AnyPrint A2 100張$790 首行进 snippet）②title 规格词+时间钩（e-print「快印1日交貨」、Bannershop「4小時特急」）③首屏答案三段式（截单→交付→费用）。
- **即日行业惯例**：截单 12:00–15:00（Bannershop 15:00 / TIPTOP 12:00 / 印刷易 13:00 / golden-co 12:00），附加费 ×2–3 或定额取高，即日单多只限自取，上限用「视乎当天」弹性口径。
- **我方错位优势已存在但未进 title/snippet**：18:00 截单+次日 12:00 送达是全港最迟截单（应写进首 150 字主打「全港最遲截單」）；A2 真值（10張/HK$16）刚上线，与 snippet 明价模式同向。
- 市场规模锚点：香港商业印刷 2016 约 16.25 亿港元、宣传物料占 67.7%（Frost & Sullivan 载于港交所文件）——传单/海报/贴纸电商盘与词盘高度重合。

**日本（ja）——胜负手 = 税込枚数矩阵 + 1 枚から + 送料门槛**
- 定价标准：税込表记绝对；「枚数×納期」二维矩阵（早いほど高い）；单价併記（「1冊あたり¥116.8」「@6.34円〜」）；**1枚/1部から + 送料無料是 headline 级钩子**（raksul 全品送料無料/printpac 2,000円〜無料/graphic 一律350円）。
- SERP 头部：ORICON「ネット印刷通販ランキング」比较记 + 业者专栏 + 评价满意度 snippet 稳定占位；**AIO 日语显示率 1 年从 31.7%→80.5%**（グラッドキューブ 2026-10-29），95%+ 问题型查询触发——ja 站不进 AIO = 失去新品牌接点。
- 同人誌：页面数×部数矩阵 + イベント締切カレンダー（早割→通常→割増）+ 直接搬入是行业标配；B5 20P 表紙カラー 10 部中央值 8,000 円（hanpu.net 17-18 社集计）——**ZprintPro ja 同人誌 ¥7,500 条件化起价在相场内**。
- 教材 印刷製本：B2B 意图（出版社/学校/塾），承接页型=「オンデマンド冊子・製本 LP + 用紙選定ガイド」，诉求=多品種少部数・改訂・RGB 入稿——**ja 簇现无专用承接落地（S2 探针 ja 三簇 6 跑全零引用的根因之一）**。

**英语（en）——胜负手 = 具体数字答 8 问 + 阶梯价表 + 打样产品化**
- 「catalog printing china」买家决策链 8 问：MOQ（给数字+解释原因）→单价（阶梯直给）→打样（免费样品包/数码样+视频验货）→交期（具体天数）→质检（SGS/FSC/G7）→付款（TT 30/70）→贸易条款（DDP 美国是钩子）→沟通（account manager+美国直线）。头部页面**全部用具体数字回答，不用形容词**。
- small batch sticker：单价锚点 headline（from $X/sticker）、阶梯表标配+降幅高亮、no-minimum 品类标签、超低价样品包（stickermule $1/10張样品包、$9/10張含免邮）、免邮标题级承诺。
- doujinshi printing：**英语 SERP 几乎无中国跨境直接对手**——MCE（美国 BL 细分 $2.33/copy 起）、Ryokuyou（日文所英文窗口）、英国 zine 短版 £149/25。我方 C109 页「MOQ 10 + $0.64–1.28/copy + 逆算表」组合已卡位，S2 探针证实 en doujinshi = organic #1 + AIO 列表第 1 双高地。
- **⚠️ 竞品调研实锤我方两个线上缺陷（优先级高于新内容）**：① doujinshi 页英雄区「Best for: Food & Beverage, Retail…」模板残留（快照 2026-10-04 实锤）② 同页免邮门槛 $99+ 与英雄区 $500 两处口径不一致——会被 AIO 直接复述放大。
- AIO 行业级：AIO 引用 75.2% 为 evergreen 内容；AIO 出现点击 -39.8%；零点击搜索已 68%——**规格表/价格表/how-to 是最易被引用页型**，与 §0.36 架构判断一致。

### 3.3 三语飞轮定位结论

| 市场 | 飞轮主轴 | 两周内可赢面 | 中期地基 |
|---|---|---|---|
| zh-hk | 交易页真值→SERP 明价→CTR 摘果 | 食品包裝破零（等 11-24 批）、證書印刷回页一、a2/传单真值咬合（已部署） | 宣傳單張/貼紙/書刊大词（329—3792 分值池） |
| en | catalog 8 问信息架构 + doujinshi 双高地防守 + small-batch 复测窗 | doujinshi 冻结防守（B3）、修模板残留、catalog query×page 取证 | catalog 簇 PDP+guide 分工、AIO 引用源卡位 |
| ja | 目录/实体可引性先行（B2 拍板）+ 教材製本专用 LP 立项 | 真值清理（D5/D6 READY 批）、不修不承诺 | ja 目录建设联动 §13.16.1 + 枚数矩阵架构改造 |

---

## 四、下一步优先级执行单（按 11-19 §12 七步 + 11-20 §8 两周日程，今日 11-21）

### P0｜K3/管理员真人动作（撞墙项，执行层无法代做）

| # | 动作 | 解锁什么 | 出处 |
|---|---|---|---|
| 1 | **推送 6e48429b**（comiket 修复，窗口 14:02 后）+ 攒批今日 docs/.hermes 产物 | 线上 comiket 答案链收口 | §0.25.9 |
| 2 | 调度器六件：S4U canary→四方验收→-All；watchdog 重建（06:43/S4U/无 RestartOnFailure）；Harness 4 入口粘贴+停 GSC/monthly 重复；cron-lanes.json 同步；legacy 2125 删除；preflight DEEPSEEK_API_KEY | 夜间车道全部 0x800710E0；**今晚 23:47 blog-deepfix 自然轮若再败 = 连续第 3 周停摆** | 11-20 §5.3 / 决策包 §D-3 |
| 3 | GSC 每日三档 + query×page 导出恢复 | 11-24 首读四问 + 11-28 终审 §A 全部行 | 决策包 §D-1/2 |
| 4 | 商业真值拍板：A2/即日传单/贴纸单位·交期·免邮·打样遗留项（modeled 价工厂实询） | 真值链扩展 | 11-20 拍板单 |
| 5 | B1 实体归一：Kompass 两处条目改名+GBP 核对（zh 面 AIO 品牌旧名两跑一致「ZPrintPro 智印雲」——内容被引≠品牌收益） | zh AIO 品牌标签正确化 | 决策包 §B-1（优先级最高） |
| 6 | DMCA 两线提交（补 E2 截图+签名即可投） | 抄袭页失去搜索曝光 | 今日执行单 §三 |

### P1｜执行层按队列 READY 可执行（带锁+门童+单变量）

1. **FIX-20261113-POSTER-BLOG-TRUTH**（blog-deepfix READY，prio 88）：poster-printing-guide 旧价 HK$9→16/A1 HK$45→20 三语清毒（D1/D6 已批；title 超带走 50–57 当量+冻结纪律）。
2. **FIX-20261113-JA-EDUCATION-C109-TRUTH**（READY，prio 86）：ja 教材/C109 簇真值清理（¥7,500 仅 ja 条件化；rush/配送报价确认化）。
3. **FIX-20261030-BLOG-CERT-PHRASES + STICKER-PRICE-THREE-LAYER**（READY）：认证词组清毒 + 贴纸指南三层价撤表改成本构成。
4. **11-22 独立核查项（本批已提前做掉 A2）**：即日传单/small-batch 线上真值断言（含**带浏览器 UA 的 curl**，防 WAF 挑战假断言）。
5. **verify 脚本 UA 修复**：全仓 curl 探针加浏览器 UA（新 WAF 挑战规则会拦裸 curl——本批实锤）。

### P2｜按日程推进（11-24 数据批首读 → 11-25 7d 复测 → 11-27 周五复盘+利是封季节 → 11-28 SMALLBATCH 28d 决策+终审）

- GEO 第 4 轮（11-24，72h 对账同窗）：重点观察 **ja 簇 AIO 覆盖**（日语 AIO 80.5% 背景下的零引用 = 实体可引性问题，非内容量问题）+ zh 食品簇品牌标签是否随 B1 修复变化。
- 11-18 部署三咬合判定（certificates 回页一 / a2 直答块减速 / 食品破零）+ 稀释形态三线收敛判读。
- 季节窗：**2027 利是封（2027利是封 7.09 / 個人化利是封 13.40）11-20—12-03 提级**，真实截单/烫金/数量/文件条件前置（不批量改 title）。

### P3｜12 月立项输入（随 11-28 终审拍板）
- ja 深度：目录建设联动 + 教材製本专用 LP + 枚数×納期矩阵架构（借 raksul 结构不抄数值）。
- en catalog：query×page 取证后主 URL 份额判定 → 内链分工；AIO 引用源卡位（阶梯价表+8 问答案块）。
- 中期地基：宣傳單張/貼紙/書刊/包裝盒大词权威建设（单盒型单主 URL，4–12 周战线，不设两周首页承诺）。

---

## 五、SOP-10 五问自检

1. **架构差异**：已核 git 双远程谱系/线上实抓/lane-status 总线/竞品实抓，未推断「部署卡无=未上线」。
2. **约束适用范围**：未触 src/、未碰名片展示层与贺卡资产、未动 middleware 301、未解冻 title。
3. **原数据/拍板来源**：所有 GSC 数字引 11-19 复算批（双方法 8 批 match）；竞品价格全部 2026-11-21 实抓+快照 inline 标注，未移植为本站事实；市场规模引 HKTDC/Frost & Sullivan 注明出处。
4. **字段值策略**：未自填任何冲突 MOQ/价格/交期；modeled 价维持「待工厂实询」标注。
5. **Markdown 渲染**：本批纯分析，无 user-facing 内容改动。

**最终判断**：ZprintPro 三语飞轮的战略纵深是对的——9 月基线全正向证明方向有效，当前是「稀释形态 + 调度半瘫 + 实体可引性」三重摩擦期。今明两天的胜负手不在新内容，而在：**① 今晚 23:47 blog-deepfix 自然轮能否复活（管理员动作）② 11-24 数据批首读的三个咬合判定 ③ B1 实体归一（AI 面品牌旧名每天在被引用固化）④ AI 爬虫今日已全量放行后的 72h GEO 到观察窗**。行业大词按 4–12 周地基战推进，带钱词按「真值→明价→摘果」链推进，三语各自对齐本地采购表达，两周承诺过程质量不承诺首页。
