# ZprintPro 三语站点 SEO／AEO／GEO 首页飞轮与七车道协同升级

> 日期：2026-11-19（Asia/Shanghai）  
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师  
> 决策层：Kimi；执行层：DeepSeek Harness／Windows `ZP-*`  
> 范围：zh-hk／en／ja；GSC 搜索表现、交易页承接、AEO 答案、GEO 引用、调度与复测闭环  
> 执行窗口：2026-11-19—2026-12-02  
> 本轮性质：数据审计、战略设计与调度修订副本；**未修改 `src/`、未 commit／push、未运行生产 wrapper、未应用 Harness 外部原配置**。

---

## 0. 决策摘要

### 0.1 一句话战略

**把“七条各自产文的定时任务”改成“一个搜索增长团队”：GSC 统一测量，交易页优先修商业真值与采购路径，weekly 只做有真实 SERP 的摘要提案，Blog 只补确有信息增益的一篇，k3 独立验收，周／月任务按复测结果重新分配资源。**

两周不承诺任何词必进首页。可控目标是：恢复调度证据链、清理验收积压、让优先词簇完成 `基线→审批→部署→线上验收→复测`，争取首页高展示零点击破零及 10–20 位词进入首页。

### 0.2 最新经营判断

1. **不是全站崩盘，也不是已经恢复增长。** 11 月 16→19 同口径 7d 展示增加 180，但点击减少 14、CTR 下降 0.2076 个百分点、平均位置后退 1.1792；28d 展示增加 1,529、点击增加 10，但 CTR 与位置略退。
2. **最高价值机会在首页零点击和 10–20 位，而非继续扩 Blog。** `食品包裝印刷` 125 展示／0 点击／7.93，`small batch sticker printing` 13／0／8.92，`可移貼紙` 71／0／12.62，`china catalog printing` 101／0／14.99，`doujinshi printing` 59／0／11.22。
3. **连续恶化词必须先诊断。** `海報印刷`、`宣傳單張`、`喜帖印刷`、`小冊子印刷`、`證書印刷`、`易拉架印刷`、`教材 印刷製本`、`コミケ 印刷` 等连续两个 28d 窗转弱；此时批量改 title 或新增近义文只会混淆变量。
4. **深位采购词不是“缺一篇长文”。** 包装、礼盒、书刊、易拉架多在 30–48 位，先查搜索意图、主承接、索引、内链、页面权威与商业信息；不设两周首页硬 KPI。
5. **执行链比内容链更紧急。** Windows 多数任务仍 `0x800710E0`；Windows daily 11 月 18 日因 `Insufficient Balance` 失败；GSC 同日报告虽为真实 PARTIAL，总线却因 guard 拒绝生产文件而 FAILED；协同板仍引用 11 月 16 日 GSC，k3 有独立线上验收积压。
6. **保留七条 Windows 车道，不新增第八条。** Harness 18:17 作为 daily 主执行入口，Windows 21:17 只做同 lane 幂等备用；周六 Harness 任务改为动态只读验收，不再围绕旧 commit 和旧文件名验收或推送。

### 0.3 本轮已落地与未应用

已完成：

- 11 月 19 日 GSC 双方法复算，`reconciliation_all_match=true`。
- 生成最新四窗分析、重点词差分与 CSV。
- 生成 Harness 修订副本：`.hermes/tmp/harness-schedule-20261119.proposed.json`。
- 安全校验全部通过：仅两条任务的标题／prompt 改变；ID、触发、状态、目标会话、历史投递和其余 106 条记录保持不变。

未应用：

- 未覆盖 `C:\Users\Administrator\.dsh\storages\schedule.json`。
- 未执行 S4U 修复；仍需管理员先跑 watchdog canary 并等自然轮验收。
- 未新增或启用 Kimi Work Automation；既有六条旧任务继续保持禁用。
- 未把“配置副本”写成“线上调度已恢复”，未把 GSC 任务返回 0 写成业务闭环成功。

---

## 1. 数据来源与测量边界

数据来源：

- GSC 原始档：`GSC数据/24小时三站点汇总数据zprintpro.com-Performance-on-Search-2026-11-19.xlsx`、对应 7d／28d 档；对照 11 月 16 日三档。
- 复算：`.hermes/logs/gsc-2026-11-19-four-window-analysis.json`、`.hermes/logs/gsc-2026-11-19-money-keyword-delta.json`；openpyxl＋pandas 双方法一致。
- 重点词：`docs/assets/2026-11-19/gsc-focus-query-delta-28d.csv`。
- 近五日执行：`.hermes/logs/lane-runs.jsonl`、各 `2026-11-1x-ZP-*.md`、wrapper 日志、`lane-status.json`。
- 协同任务：`.hermes/logs/coordination-board.json`（11 月 18 日生成，仍引用 11 月 16 日 GSC）。
- 调度：Windows Task Scheduler 只读查询；Harness `schedule.json` 的工作区副本。
- 生产与部署：近七日重要文件、11 月 18 日生产 commit `d5c0d36f`／`a9f218f0` 及 Cloudflare success、线上 5／5 PASS 记录。
- 历史战略：11 月 7 日三市场飞轮、11 月 13 日两周飞轮、11 月 14 日协同飞轮与调度诊断。

校准状态：GSC 已校准至 11 月 19 日导出；28d 实际数据窗口为 **10 月 20 日—11 月 16 日**。11 月 18 日生产变更最多只有一天进入当前窗口，**不能评价成效**。

测量红线：

- query／page／country 是独立表，不能拼成 query×page×country；没有 join 就不声称某词在某国由某 URL 承接。
- 28d 查询表为 top-1000；精确词缺行写 `NO_CURRENT_BASELINE`，不是零需求。
- 移动窗口只判方向，不能把变化直接归因某次部署。
- GSC 只证明点击、展示、CTR、平均位置，不证明询盘、订单、收入；后台数据不得进入客户可见内容。
- 国家是搜索者位置，不等于 locale 站点 KPI。
- GEO 只接受固定引擎、固定问题、完整原始答案与 citation URL；普通网页搜索不算 AI 引用。
- 本报告是 GSC＋日志＋重点页面证据的全面运营盘点，**不冒充已完成全站索引覆盖、全 URL 技术爬虫或全市场实时 SERP 抓取**。

---

## 2. 三语站点最新 SEO 盘点

### 2.1 同窗口 KPI

| 窗口 | 点击：11-16→11-19 | 展示 | CTR | 平均位置 | 解读 |
|---|---:|---:|---:|---:|---|
| 24h | 12→21 | 805→1,138 | 1.4907%→1.8453% | 18.3039→14.1649 | 单日健康信号，不判趋势 |
| 7d | 144→130 | 8,103→8,283 | 1.7771%→1.5695% | 14.3437→15.5229 | 展示增，点击／CTR／位次恶化 |
| 28d | 544→554 | 26,350→27,879 | 2.0645%→1.9872% | 14.6801→14.9511 | 小幅扩张，CTR／位次略退 |

重点精确词首页数在本重点池由 5→6，但本轮没有完整 28d 首页进出差分，不能写成“持续增长”。`书籍印刷` 仅 5 展示、`卒アル販売` 仅 1 展示、`印刷廠` 仅 1 展示，均不应包装成突破。

### 2.2 独立国家背景

| 搜索者国家／地区 | 28d 展示 | 点击 | CTR | 平均位置 | 正确用途 |
|---|---:|---:|---:|---:|---|
| 香港 | 15,923 | 395 | 2.4807% | 13.93 | 香港需求背景，不等于 zh-hk 站点 KPI |
| 日本 | 3,707 | 54 | 1.4567% | 23.03 | 日本需求背景，不等于 ja 站点 KPI |
| 美国 | 3,225 | 30 | 0.9302% | 15.90 | 美国需求背景，不等于 en 站点 KPI |

美国 CTR 最弱，但不能仅凭 country 表断言“美国客户减少由某页面造成”。本阶段只把它作为 en 跨境采购页与摘要诊断的优先级信号。

### 2.3 页面层承接警报

| 页面 | 28d 展示／点击／位置 | 战略含义 |
|---|---|---|
| `/zh-hk/category/books/` | 714／2／51.31 | 书刊大词承接相关性／权威不足，不能用 Blog 数量掩盖 |
| `/ja/product/saddle-stitch-booklets/` | 424／1／61.87 | 日本装订交易页深位，先查意图匹配与采购内容 |
| `/zh-hk/product/catalog-printing/` | 334／2／46.48 | catalog 词组需区分 zh-hk 与 en 主承接，不可跨站硬归因 |
| `/zh-hk/category/stickers/` | 306／1／37.49 | 贴纸主词深位，材质词与泛词不能用同一套泛文处理 |

### 2.4 AEO／GEO 现状判断

- 9 月以来的 FAQ、12 段骨架、内链与标题动作提供了基础，但**结构化数量不等于答案可信度**。
- 当前最大 AEO 风险是同一产品不同页面／字段的商业口径冲突；AI 抽取到旧价格、旧 MOQ、旧时效，比少一组 FAQ 更严重。
- GEO 没有独立“特殊 schema 捷径”。可索引、真实采购答案、清晰实体、内链、正文与结构化数据一致仍是底座。
- 11 月 18 日 schema Offer 改 MOQ 档真值、A2 快速答案与内链、食品包装 meta 修复已有生产验收记录，但排名／CTR 仍需等实际复测窗。
- 固定问题集尚未形成完整的第二轮原始答案证据前，GEO 状态保持 `NO_COMPARABLE_BASELINE`，不得声称引用增长。

---

## 3. 行业大词与真正带钱词：不要混成一张词表

### 3.1 分类规则

| 类型 | 判断标准 | 例子 | 资源用途 |
|---|---|---|---|
| 行业大词 | 泛行业、公司、品类发现，量大但意图较宽 | `香港印刷`、`印刷`、`印刷廠`、`印書`、`a2印刷`、`书籍印刷`、`printing company` | 建立实体与品类权威；不单独当收入指标 |
| 采购带钱词 | 产品＋印刷／訂製／装订／用途／采购地 | `海報印刷`、`包裝盒訂製`、`china catalog printing`、`教材 印刷製本` | 交易页、内链、采购信息的主战场 |
| 强带钱长尾 | 带价格、MOQ、小批量、即日、报价、供应商等限定 | `small batch sticker printing`、`印刷公司報價`、`ステッカー印刷 小ロット` | 最接近报价决策，优先补采购条件与 CTA |
| 季节／事件词 | 有明确时间窗 | `利是封印刷`、`月曆印刷`、`コミケ 印刷`、`年賀状印刷` | 提前做既有承接页，不临时堆同义文章 |
| 信息／歧义词 | 可能是尺寸、活动日期、销售或设计意图 | `c109 日期`、`a2印刷`、`卒アル販売` | AEO 答案与分流，不硬算采购转化 |

“带钱”在此是**采购意图标签**，不是已观察收入。

### 3.2 zh-hk：近首页、季节与深位三层作战

| 层级 | 词簇与最新 28d 证据 | 两周动作 | 不负责什么 |
|---|---|---|---|
| 首页 CTR | `食品包裝印刷` 125／0／7.93 | 先完成独立验收，再由 weekly 保存真实 SERP／snippet，最多一个摘要变量 | 不添加未证实食品认证 |
| 近首页冲刺 | `可移貼紙` 71／0／12.62；`學校印刷` 71／0／16.89；`摺頁印刷` 65／0／18.66；`香港印刷` 34／2／12.18 | 核主交易 URL、材质／装订／数量／报价／交付信息与自然内链；单页单变量 | 不新建同义 Blog，不批量 title |
| 首页保护 | `即日印刷` 55／2／8.58；`海報印刷即日` 32／1／9.53 | 保持即日适用条件、截单与文件要求真值，保护已有点击 | 不承诺无条件即日 |
| 连续恶化 | `海報印刷` 186／1／20.37；`宣傳單張` 134／0／39.39；`喜帖印刷` 36／0／44.78；`證書印刷` 9／0／12.22 | GSC 先查变更时间、意图、索引和主承接；只处理已批旧真值 | 不把位置退化直接诊断成 CTR 问题 |
| 季节 | `月曆印刷` 140／0／20.40；`利是封印刷` 59／1／24.27 | 利用现有月曆／利是封页，补 2027 采购决策、文件、数量、打样与报价条件；检查内链 | 不建第 N 篇月曆／利是封泛文 |
| 深位建设 | `包裝盒訂製` 33.71、`包裝盒印刷` 30.29、`紙盒訂製` 33.37、`禮盒訂製` 47.86、`書刊印刷` 35.45、`易拉架印刷` 41.63 | 选一个盒型／一个主 URL 做信息架构与权威建设，周／月再评 | 不设两周进首页承诺，不全面铺量 |

高意图长尾优先于泛词扩写：`海報印刷一張` 3.71、`印喜帖價格` 5.65、`月曆印刷香港` 9.40、`2027利是封` 7.09、`透明貼紙印刷` 6.78、`戶外可移貼紙` 10.04、`a1 印刷 即日` 5.19、`a2 印刷 即日` 5.92、`印刷公司報價` 7.94。动作是核真值与承接，不是把这些词机械塞进 title。

### 3.3 en：catalog、小批量贴纸、doujin 优先

| 词簇 | 最新 28d 证据 | 决策 |
|---|---|---|
| catalog | `china catalog printing` 101／0／14.99；`catalog printing china` 37／0／15.57；`catalogue printing china` 14.00；`catalogs printing china` 6／0／22.33 | 合并为一个采购意图簇；先验既有真值修复与部署，再查主 URL、装订／页数／数量／打样／生产与运输分开表达；不多页互抢 |
| small batch | `small batch sticker printing` 13／0／8.92；`small batch stickers` 59／0／15.34 | 首页零点击优先，但先完成 `VERIFY-FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL`；不叠加未测 snippet |
| doujin | `doujinshi printing` 59／0／11.22 | 首页下沿冲刺：文件、页数、装订、数量、打样、报价与国际交付边界同一采购路径 |
| a2 poster | 44／1／43.39 | 深位，先诊断 en PDP 与意图，不与 zh-hk 海报变更混作同一实验 |
| 泛行业 | `printing company／printing services` 无当前精确行 | `NO_CURRENT_BASELINE`；不为泛英文词盲开新页 |

### 3.4 ja：小批量贴纸冲刺，教材／C109 先止跌诊断

| 词簇 | 最新证据 | 决策 |
|---|---|---|
| 小批量贴纸 | `ステッカー印刷 小ロット` 10.75；`防水ステッカー` 11.71；`pvc シール` 26／0／14.38 | 同一材质／数量采购路径，明确 1／5／10／50 等梯度 only if 真值存在；否则只写报价条件，不复制竞品价格 |
| 教材 | `教材 印刷製本` 57／0／43.95；`教材 印刷 製本` 45.53 | 连续恶化且深位；先清旧价格／时效／认证与语言质量，查 PDP／Blog 分工 |
| C109 | `コミケ 印刷` 110／0／30.49 | 活动信息与采购词分开；官方日期与自有履约承诺分开，不造安全截稿日 |
| 小册子 | `小冊子印刷` 14／0／17.93 | 跨语言歧义且连续恶化；先辨查询市场与承接页，不直接扩写 |
| 卒アル | `卒アル販売` 1／0／2.00 | 仅 1 展示且偏销售意图，不作为首页带钱词胜利 |

### 3.5 三语关键词映射原则

不是逐字翻译，而是按市场采购表达映射：

- 海报：`海報印刷／印海報／海報印刷即日` ↔ `poster printing／same day poster printing／a2 poster printing` ↔ `ポスター印刷／大判ポスター印刷／短納期 ポスター`。
- 单张／折页：`宣傳單張印刷／摺頁印刷` ↔ `flyer printing／leaflet printing／folded leaflet printing` ↔ `チラシ印刷／フライヤー印刷／折りパンフレット印刷`。
- 书刊：`書刊印刷／印書／學校印刷` ↔ `book printing／catalog printing china／school printing` ↔ `冊子印刷／書籍印刷／教材 印刷製本／学校 印刷`。
- 贴纸：`貼紙印刷／可移貼紙／透明貼紙印刷` ↔ `small batch sticker printing／custom stickers／removable stickers` ↔ `ステッカー印刷 小ロット／シール印刷／防水ステッカー`。
- 包装：`包裝盒訂製／紙盒印刷／禮盒訂製` ↔ `custom packaging boxes／paper box printing／rigid box manufacturer` ↔ `パッケージ印刷／化粧箱 製作／ギフトボックス オーダー`。
- 季节：`利是封印刷／月曆印刷` ↔ `custom red envelopes／calendar printing` ↔ `年賀状印刷／カレンダー印刷`。

新增词只有进入 GSC 精确行或有真实 SERP／客户语言证据后才成为生产关键词；此处映射是研究词库，不是批量落 title 授权。

---

## 4. 竞争对手给页面结构的启示

本轮外部核查显示：

- 香港竞品常把尺寸、数量、价格、交期、WhatsApp 传档与即日条件放在同一采购路径，而不是要求用户先读多篇指南。[AnyPrint](http://anyprint.hk/W5/pricelist.php?ppid=1227)、[Service Corps](https://www.servicecorps.hk/publication/poster/)、[HK Print1010](https://hk-print1010.com/product-leaflet.html)
- 日本 Raksul 的小批量内容以数量梯度、出货日和送料条件降低决策成本。[Raksul 小批量贴纸](https://raksul.com/magazine/column/sticker-small-lot/)
- en 跨境供应商内容强调 MOQ、打样、生产／运输分开、报价所需规格与风险核验。[Jinguan](https://www.jinguanprinting.com/article/china-custom-printing-service-manufacturer-guide-2026.html)

可借鉴的是**采购信息架构**，不可复制其价格、时效、认证、产能或售后承诺。ZprintPro 每个主交易页应在同一路径回答：

1. 尺寸与使用场景；
2. 数量与真实 MOQ；
3. 材质、纸质、工艺、装订；
4. 文件格式、出血、色彩与预检；
5. 打样、报价及价格适用条件；
6. 生产、运输、地区与限制；
7. WhatsApp 询价所需规格清单。

---

## 5. 七条车道取舍：保留，但改变生产关系

### 5.1 统一闭环

`GSC 测量 → 诊断分流 → 审批 → 单页单变量执行 → 部署 → 独立线上验收 → 7／14／28 天复测 → 周／月学习`

统一任务键：

`cluster/query → baseline → owner_lane → upstream_inputs → approval_gate → write_scope → production_deploy → online_verify → retest → retry_at → exit_criteria → learning_status`

Kimi 负责战略优先级、冲突边界与资源裁决；DeepSeek 只执行 READY bounded task。Kimi 不另建第八条定时任务，战略更新经 weekly／monthly 复盘进入协同板。

### 5.2 RACI 与取舍

| 车道 | 保留／调整 | 唯一职责 | 必须消费 | 交付下游 | 停止做什么 |
|---|---|---|---|---|---|
| `ZP-cron-watchdog` | 保留，P0 修复 | 调度器＋bus＋wrapper＋当日报告四方对账 | Task Scheduler、锁、协同板构建状态 | 基础设施告警与恢复门 | mtime／exit 0 单独判活；手动运行冒充自然轮 |
| `ZP-gsc-feedback` | 保留，测度中枢 | 同窗口 GSC、异常、query／page 证据、复测 | 最新原始档、旧基线、部署时间 | weekly／daily／Blog／k3 任务证据 | 自动写文；跨表硬联接；缺行当零需求 |
| `ZP-daily-content` | 保留，去“日更” | 已批准交易页真值、采购路径、主承接 | 协同板 READY、真值裁决、GSC | k3 验收对象、GSC 复测对象 | 每天一篇；独立选词；重做 DONE；手改派生 TS |
| `ZP-weekly-meta` | 保留，收紧 | 周复盘、真实 SERP 后 title／snippet 提案 | GSC 首页零点击、真实 SERP、商业真值 | 已批单变量任务、月度输入 | SERP 不可用时直接改；批量 title；一周多变 |
| `ZP-blog-deepfix` | 保留，减产 | 每轮最多一篇既有 Blog 的信息缺口／旧真值 | 已核真值、现有资产差距、单篇写域 | k3 内容验收、GSC 复测 | 泛写长文；凑 12 段；无信息增益硬交付 |
| `ZP-k3-review` | 保留，清积压 | 独立部署与线上 URL 验收、冲突退回 | 实际 commit、CF 部署、线上断言、bus | 关闭／退回任务、复测队列 | 自我验收；push 当线上成功；越权拍板 |
| `ZP-monthly-matrix` | 保留，不补跑历史 | 资源再分配、STOP／HOLD／FIX 决策 | 周复盘、月度 GSC、完整 outcome | 下月词簇预算与任务停用建议 | 回填不存在的历史运行；NO_OP 当业务成效 |

### 5.3 当前协同板真实状态

- 协同板生成于 11 月 18 日，但 `gsc_delta` 仍指向 11 月 16 日，需由既有生成器下一轮刷新，**不手改 JSON 冒充协调**。
- READY 分布：GSC 6、weekly 2、Blog 4、k3 1；daily 没有 READY，因此 daily 合法结果可以是 `NO_OP`。
- 最高优先是 k3 的 `VERIFY-FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL`，先补 Cloudflare 与线上断言。
- weekly 两项为食品包装与 small-batch 首页零点击提案；真实 SERP 不可用时必须 HOLD。
- `lane-status.json/.md` 最后生成于 11 月 18 日 18:17，已不能代表 11 月 19 日团队健康。
- 统一入口技能 `zprintpro-content-standards/SKILL.md` 当前不存在，是执行链 `CONFIG_GAP`；prompt 不得声称已读，需由配置负责人恢复或正式改 SSoT 引用。

---

## 6. Harness 与 Windows 双触发调整

### 6.1 当前事实

Windows 七条均为 `LogonType=Interactive`、`StartWhenAvailable=false`：

- `ZP-k3-review`、`ZP-cron-watchdog`、`ZP-weekly-meta`、`ZP-blog-deepfix`、`ZP-monthly-matrix` 最近仍为 `0x800710E0`。
- `ZP-daily-content` 11 月 18 日 21:17 为 `0x00000001`；wrapper 明确 `QUOTA: Insufficient Balance`，不能重试掩盖。
- `ZP-gsc-feedback` 11 月 18 日 20:13 为 `0x00000000`，但 bus 为 `FAILED / wrapper_exit=4`，因为 pre-commit guard 拒绝一个 production 文件；真实业务报告是 PARTIAL，未 push。

Harness 原生仅两条 active：每日 18:17 daily，以及周六 19:08:19 的 Blog 验收。Kimi Work 六条旧 Automation 全部 disabled，不属于真执行层。

### 6.2 修订副本的两项改变

**A. Harness 18:17 daily**

- 名称改为“交易页带钱词协同执行”。
- 只消费协调板本 lane READY；无 READY 即 NO_OP。
- 同日任一入口已有 OK／PARTIAL／NO_OP 即短路；PARTIAL 只处理 NEXT。
- Windows 21:17 为备用，不是第二次生产；余额失败不跨入口重试。
- 只做一个 bounded task；商业真值、写域、部署与独立验收字段齐全。

**B. Harness 周六 Blog 验收**

- 名称改为“blog-deepfix 协同验收”。
- 动态读取当日 bus、wrapper、正式报告与实际 commit。
- 删除对旧 `6067a462`、10 月 31 日／11 月 1 日文件的执行依赖。
- 只读验收，不改 `src/`、不重做内容、不自动 commit／push；产物使用独立 verification 文件名，不冒充车道报告。

### 6.3 应用边界

修订文件：`.hermes/tmp/harness-schedule-20261119.proposed.json`。  
校验：`.hermes/tmp/harness-schedule-20261119.proposed-validation.json`，全部通过。

这是**待审阅副本，不是已应用配置**。应用前必须备份外部原文件、再次 diff、确认当前没有正在投递的任务；应用只改变未来 prompt，不自动恢复 Windows 登录态或 DeepSeek 余额。

Windows 仍由管理员按既有脚本先做 watchdog S4U canary；自然四方验收后才允许全量。不要在本轮直接执行 `-Apply -All`。

---

## 7. AEO／GEO 固定问题集与验收

### 7.1 每个冲刺簇必须有“同一事实源”

`交易页可见正文＝FAQ＝Offer／Product 等结构化数据＝Blog 引用＝AI 答案候选`。没有拍板值时使用报价条件，不编数字；GSC 展示、排名和内部报告不进入客户答案。

### 7.2 固定采购问题集

每个 locale 使用自然语言，但语义固定：

1. 这类产品有哪些尺寸／装订／材质，如何选择？
2. 最小数量是多少，是否按每款设计计算？
3. 价格需要哪些规格才能确认，是否有打样？
4. 文件格式、出血、色彩和预检要求是什么？
5. 生产与运输分别如何确认，即日／特急有哪些条件？
6. 香港／日本／海外订单如何通过 WhatsApp 获取报价？
7. 哪些认证、退款、交付或产能承诺不能被默认假定？

### 7.3 GEO 探针

固定引擎与 locale，保存完整原始答案、时间、引用域名与 citation URL。问题围绕：

- “香港单张海报／即日海报如何选择数量、文件与交期？”
- “China catalog printing supplier 需要哪些规格才能报价？”
- “small batch sticker printing 的 MOQ、打样与运输如何确认？”
- “教材 印刷製本／ステッカー印刷 小ロット 的装订／材质与报价条件是什么？”

缺引用如实记录；不能用 WebSearch 结果补齐，不因一次未引用自动产文。S2 与上一轮必须同引擎、同问题、同记录字段才可比较。

---

## 8. 两周作战表（11 月 19 日—12 月 2 日）

> 日期是协调节奏，不是自动改页授权。缺 READY、审批、SERP、真值或部署证据时，完整交付可以是 NO_OP／HOLD／BLOCKED。

| 日期 | 团队主任务 | 责任 lane | 退出标准 |
|---|---|---|---|
| 11-19 | 刷新 11-19 GSC 协同输入；清 small-batch 独立验收积压；Harness 副本审阅 | GSC＋k3＋配置负责人 | 协同板引用最新分析；CF／线上断言有证据或 PENDING；副本不冒充已应用 |
| 11-20 | weekly 周复盘；食品包装真实 SERP／snippet 提案；三语冲刺池定主 URL | weekly＋GSC | 每词簇只有一个 owner／主 URL／baseline；无 SERP 则 HOLD |
| 11-21 | Blog 单篇或 NO_OP；周六 Harness 动态只读验收；海报／教材／C109 承接诊断 | Blog＋k3＋GSC | 最多一篇确有信息增益；验收不推旧 commit；连续恶化只诊断不批量改 title |
| 11-22 | 可移貼紙／學校印刷／摺頁印刷采购差距清单 | daily＋GSC | 只有已批差距进入 READY；其余保持测量 |
| 11-23 | en catalog／doujin 与 ja 小批量贴纸的既有变更健康检查 | GSC＋k3 | 11-18 变更仍不判成效；正文／FAQ／schema 一致才交接 |
| 11-24 | 月曆／利是封既有承接页季节缺口审核；GEO 固定问题集取证 | daily＋Blog＋GEO owner | 不新建同义页；完整答案与 citation URL 归档 |
| 11-25 | 近首页第一批已批单页单变量执行；无 READY 则 NO_OP | daily | baseline／approval／commit／部署／验收字段齐全，未验收不宣称成功 |
| 11-26 | D1／D2 健康检查；异常只分流，不判胜负 | GSC＋k3 | 线上 URL 可访问、内容一致；不叠加第二变量 |
| 11-27 | 第二次周复盘；根据 outcome 决定 FIX／HOLD／STOP | weekly | 未部署／未验收／窗口不足不进入胜率；重复失败不无限重试 |
| 11-28 | Blog 验收＋GEO 复测；检查首页零点击是否破零 | k3＋GSC＋GEO owner | 只称方向信号；无引用或无点击如实记录 |
| 11-29 | 深位包装／书刊／礼盒／易拉架做权威与主承接诊断 | GSC＋daily | 输出中期建设项，不强行挤入两周首页 KPI |
| 11-30 | 第一轮完整复测：7d 为主、28d 为背景；汇总有效／无效／未测出 | GSC＋k3 | 同窗口、同词、同 URL；移动窗口不归因 |
| 12-01 | monthly 资源再分配 | monthly＋Kimi | 把资源给有完整证据的簇；停止无增益重复任务 |
| 12-02 | 两周审计与下一周期队列 | 全团队 | 分列生产、测量、PARTIAL、调度四栏；下一周期不重复 DONE |

---

## 9. KPI、学习与停止规则

### 9.1 两周可控验收

- 调度：自然触发、wrapper、bus、当日报告四方一致；不是只看 `LastTaskResult=0`。
- 协同：每个冲刺簇有唯一任务 ID、owner、主 URL、baseline、审批和复测日。
- 生产：优先任务完成实际部署与独立线上断言；未发生则写 NONE／PENDING。
- 搜索：首页高展示零点击争取破零；10–20 位词向首页推进；连续恶化词先停止继续退化。
- AEO：冲刺页正文、FAQ、schema、Blog 引用商业真值一致。
- GEO：固定问题集有完整可复核记录；没有可比基线就不报增长。

### 9.2 不作为两周硬 KPI

- 包装、礼盒、书刊、易拉架等 30–48 位词“必须首页”。
- 每日一篇、每周批量 title、固定 12 段凑字数。
- 询盘、订单、收入或 ROI 的 GSC 推断。
- 用低展示词的首页位置累计“胜利数量”。

### 9.3 自进化边界

允许：证据追加、状态迁移、复测到期、同因 recurrence、周／月再派单、无效方法 STOP。  
禁止：自动放宽门禁、自动把 WAITING_K3 变 READY、自动改战略 prompt、用 wrapper 0／NO_OP／未部署样本统计胜率。

| 状态 | 必要条件 | 动作 |
|---|---|---|
| EFFECTIVE_PENDING | 有变更，无部署／未验收／未到窗 | 不评价赢输 |
| MEASURABLE | 基线＋单变量＋审批＋部署＋线上断言＋到期窗口 | 同口径比较 |
| POSITIVE_SIGNAL | 位置／CTR／承接改善，其他未明显恶化 | 只称积极信号，继续复测 |
| NO_EFFECT | 到期且无改善 | 停止同法重复，回诊断 |
| NEGATIVE | 连续恶化且有变更时间关联 | 提出修正／回滚，仍需审批 |
| NOT_MEASURABLE | 多变、缺档、未部署、窗口不足 | 不进胜率，不扩量 |

---

## 10. 近五日执行复盘与技术缺口

### 10.1 真正有效的交付

- Harness daily 11 月 14–16 日有真实商业真值交付，commit `c172b3d2`、`74581d7f`、`7425d28d`；11 月 17–18 日内容层 NO_OP。
- 11 月 18 日生产 commit `d5c0d36f`、`a9f218f0` 有 CF success 与线上 5／5 PASS 记录，覆盖 schema Offer MOQ 真值、A2 快速答案与内链、食品包装 meta。
- GSC 11 月 18 日有真实 PARTIAL 报告与数据完整性发现，不能把 bus FAILED 改写为报告无价值，也不能把 scheduler 0 写成全链成功。

### 10.2 四个主要断点

1. **基础设施**：Interactive 登录态导致自然调度被拒；S4U 未验收。
2. **模型资源**：Windows daily 余额不足，双入口可能重复消耗。
3. **协调新鲜度**：协同板与 lane-status 陈旧，READY 分配不完整，daily 没有 READY。
4. **验收与生产质量**：k3 验收积压；`src/app/[locale]/blog/[slug]/page.tsx` 的 `posts['zh-hk']` 有重复 slug 覆盖风险，11 月 18 日仅修 food，flyer、paper-bag、certificate、mtr、poster、sticker 等仍需另批技术核验，本轮不擅自改。

---

## 11. SOP-10 五问自检

1. **架构差异**：已核 Windows Task Scheduler、Harness 原生 schedule、bus、wrapper、协同板与近期 commit；没有将 Kimi 旧 Automation 当 Harness，也没有用新系统替代现有七车道。
2. **约束适用范围**：保留标题冻结、商业真值、名片展示层未拍板、贺卡资产与 middleware 301 红线；本轮未触 `src/`。
3. **原数据／拍板来源**：所有 GSC 数字来自 11 月 19 日复算文件；执行状态来自日志与只读调度查询；竞品自述未移植成 ZprintPro 商业数字。
4. **字段值策略**：未拍板价格、MOQ、认证、交期、退款、运输均不填新值；调度副本不扩大写域或审批权。
5. **Markdown 渲染**：本轮仅为内部分析与调度配置副本，无 user-facing Markdown 生产改动，无需 `parseInlineLinks()` 变更。

---

## 12. 最终战略裁决

**七条任务不裁撤，但取消“各自为战”和“日更产量”目标。** 未来两周的顺序固定为：

1. 管理员恢复自然调度，配置负责人处理余额与缺失入口技能；
2. k3 先清独立验收积压，GSC 刷新协同板；
3. 食品包装／small-batch 先验收与 CTR 证据，可移貼紙／catalog／doujin／ja 小批量做近首页冲刺；
4. 海报／单张／教材／C109 等连续恶化词先诊断，不批量改 title；
5. 月曆／利是封使用现有承接页，Blog 每轮最多一篇且允许 NO_OP；
6. 包装／礼盒／书刊／易拉架转入中期权威建设，不设两周首页保证；
7. 只放大有完整部署、验收和复测证据的动作。

这套飞轮的核心不是自动生产更多内容，而是**自动协调正确的问题、可信的页面、独立的验收和可复用的学习**。
