# ZprintPro AEO/GEO 引用探针包 v1.0（设计稿）

> 归属：K3 v4.0 · 指令 A10（设计部分）｜设计日期：2026-09-08｜性质：**纯设计稿，未执行任何探测**
> 适用站点：zprintpro.com（智印港 · 香港印刷独立站 · zh-hk/en/ja 三语）
> 用途：每月 15 日固定 20 prompt 探测 ChatGPT / Perplexity / Google AI Overview 是否引用 ZprintPro，形成「引用率 X/20」台账——GEO 唯一可量化指标。

---

## 1. 探针包总览

### 1.1 机制

- **固定 prompt 集**：本包 20 条为 v1.0 定版，每月同一套，不临时换题（换题即断基线）。
- **固定节奏**：每月 15 日同日同时段跑完（节假日顺延次工作日，台账如实记实际日期）。
- **建议首轮**：2026-09-15。
- **产出物**：每引擎「引用率 X/20」+ 加权得分 + 被引题清单 + 竞品被引观察。

### 1.2 引擎口径（三主引擎 + 加测面）

| 引擎值 | 入口 | 口径 |
|---|---|---|
| `chatgpt` | chatgpt.com | 主口径三引擎之一 |
| `perplexity` | perplexity.ai（Auto 模式） | 主口径三引擎之一 |
| `google-aio` | google.com 搜索触发的 AI Overview | 主口径三引擎之一 |
| `google-ai-mode` | google.com AI Mode 标签页 | 加测面（时间允许时跑，单列不并入主口径） |
| `gemini` | gemini.google.com | 加测面（同上） |

> 说明：K3 计划点名 ChatGPT / Perplexity / Google AI Overview(AI Mode) / Gemini 四个面，SOP 按「三主引擎」操作（Google 生态多入口见 §4.3）；主口径引用率只算前三行，加测面数据单独记录、单独算 X/20。

### 1.3 评分口径（每题取最高档，不叠加）

| 档位 | 判定 | 得分 |
|---|---|---|
| ① 被引用 | 答案正文或来源列表提及 ZprintPro / 智印港 | 1.0 |
| ② 引用且带链接 | 提及并给出 zprintpro.com 链接 | 1.5 |
| ③ 进入前 3 来源 | ZprintPro 位于该答案来源列表前 3 名 | 2.0 |
| — 未出现 | 无任何提及 | 0 |
| — N/A | 该引擎该题未出答案/未触发（如 Google 无 AI Overview） | 0（备注记「未触发」） |

- **引用率** = 该引擎当轮 score>0 的 prompt 数 ÷ 20（N/A 计入分母，保守口径）。
- **加权引用得分** = 该引擎当轮 Σscore ÷ 40（20 题 × 满分 2 分）。
- 被引判定认 **品牌名「ZprintPro」或「智印港」或域名 zprintpro.com** 任一出现。

### 1.4 覆盖度矩阵（设计目标 vs 实际）

| 类别 | 要求 | 实际 | 题号 |
|---|---|---|---|
| 渠道比较（邊間好/which/best/おすすめ） | ≥2 | 7 | P01, P04, P07, P09, P13, P15, P19 |
| 价格（幾多錢/how much/いくら） | ≥2 | 6 | P02, P03, P08, P10, P16, P18 |
| 材质工艺（防水/PVC/ダイカット/過膠） | ≥2 | 4 | P02, P08, P10, P17 |
| 交期（即日/最快/how fast/最短） | ≥2 | 4 | P05, P06, P14, P20 |
| 品类：贴纸（核心钱词） | 锚定 | 8 | P01, P02, P09, P10, P11, P15, P16, P17 |
| 品类：海报 | ≥2 | 3 | P03, P06, P18 |
| 品类：包装盒 | ≥2 | 4 | P04, P05, P13, P19 |
| 品类：信封 | ≥2 | 3 | P07, P12, P20 |
| 品类：餐牌 | ≥2 | 2 | P08, P14 |

（一题可跨多类，分别计数。）

---

## 2. 20 Prompt 明细

**通用判定要点**：每题按 §1.3 档位打分（被引=1 / 带链=1.5 / 前3来源=2，取最高档）；下表「重点观察」为该题的额外取证点，只影响备注与复盘，不影响档位分。

**落地页说明**：站点 URL 结构按 `/zh-hk/product/xxx`、`/en/category/xxx`、`/ja/blog/xxx` 推测；**所有候选 slug 均为推测，标「待对页」**，首轮前必须用站点地图/全站爬取核实回填（见 §2.5）。

### 2.1 zh-hk ×8

| # | Prompt（用户原话形式） | 考察意图 | 目标落地页（候选·待对页） | 判定要点 / 重点观察 |
|---|---|---|---|---|
| P01 | 香港貼紙印刷邊間好？ | 渠道比较 + 核心品类贴纸；考察 AI 的「推荐清单」是否包含本站 | `/zh-hk/product/custom-stickers`（待对页） | 是否进入推荐清单；清单内位次；链接指向产品页还是首页 |
| P02 | 防水貼紙印刷幾多錢一張？ | 价格 + 材质工艺（防水）；考察价格数据是否被抽取引用 | `/zh-hk/product/waterproof-stickers`（待对页） | 是否引用具体价格区间；引用原文是否含本站数字 |
| P03 | 香港海報印刷幾錢一張？ | 价格 + 品类海报 | `/zh-hk/product/poster-printing`（待对页） | 海报页被引；价格数字是否为本站口径 |
| P04 | 香港小批量包裝盒印刷邊間做得好？ | 渠道比较 + 品类包装盒 + 小批量定位 | `/zh-hk/product/custom-boxes`（待对页） | 比较清单收录；MOQ/小批量信息是否被引 |
| P05 | 香港訂造包裝盒最快幾多日交貨？ | 交期 + 品类包装盒 | `/zh-hk/product/custom-boxes`（待对页，交期 FAQ 段落） | 交期数字（如「最快 X 個工作日」）是否来自本站 |
| P06 | 香港有冇即日起貨嘅海報印刷？ | 交期（即日/急单）+ 品类海报 | `/zh-hk/product/poster-printing`（待对页，即日 FAQ 段落） | 即日/急单能力页是否被引 |
| P07 | 香港信封印刷邊間有得訂造？ | 渠道比较 + 品类信封 | `/zh-hk/product/envelope-printing`（待对页） | 比较清单收录；信封页带链 |
| P08 | 香港餐牌印刷防水過膠大概幾多錢？ | 价格 + 材质（过胶/防水）+ 品类餐牌 | `/zh-hk/product/menu-printing`（待对页） | 餐牌页被引；防水/过胶工艺与价格同时命中 |

### 2.2 en ×6

| # | Prompt | 考察意图 | 目标落地页（候选·待对页） | 判定要点 / 重点观察 |
|---|---|---|---|---|
| P09 | Which is the best custom sticker printing company in Hong Kong? | 渠道比较 + 核心品类贴纸（en） | `/en/category/stickers`（待对页） | 是否进入 "best" 清单；链接语言版本是否给对（en 页） |
| P10 | How much does waterproof sticker printing cost in Hong Kong? | 价格 + 材质（waterproof） | `/en/category/waterproof-stickers`（待对页） | 价格区间被引；en 页货币口径（HKD）是否清楚 |
| P11 | Where can I order small batch sticker printing in Hong Kong? | 核心品类 + 小批量/MOQ 定位 | `/en/category/stickers`（待对页，small batch/MOQ 段落） | MOQ 数字（如 100 张起）是否来自本站 |
| P12 | Where can I get custom envelope printing in Hong Kong? | 品类信封（en） | `/en/category/envelopes`（待对页） | 信封页被引带链 |
| P13 | What's the best packaging box printing company in Hong Kong for small quantities? | 渠道比较 + 品类包装盒 + 小批量 | `/en/category/boxes`（待对页） | 比较清单收录；small quantity 定位词命中 |
| P14 | How fast can I get restaurant menu printing done in Hong Kong? | 交期 + 品类餐牌（en） | `/en/category/menu-printing`（待对页） | 交期数字被引 |

### 2.3 ja ×6

| # | Prompt | 考察意图 | 目标落地页（候选·待对页） | 判定要点 / 重点观察 |
|---|---|---|---|---|
| P15 | ステッカー印刷のおすすめ会社を香港で探しています。どこがいいですか？ | 渠道比较 + 核心品类贴纸（ja） | `/ja/product/stickers`（待对页） | おすすめ清单收录；ja 页是否被引（而非 zh/en 页） |
| P16 | 小ロットのステッカー作成はいくらくらいかかりますか？ | 价格 + 小批量（ja） | `/ja/product/stickers`（待对页）＋`/ja/blog/xxx` 小ロットガイド（待对页） | いくら答案中的价格来源；blog 是否被引 |
| P17 | 香港でダイカット・防水ステッカーを印刷できるおすすめのところはどこですか？ | 材质工艺（防水 + ダイカット）（ja） | `/ja/product/waterproof-stickers`（待对页） | 工艺词（ダイカット/防水）与品类同时命中 |
| P18 | 香港でポスター印刷を依頼すると費用はどのくらいですか？ | 价格 + 品类海报（ja） | `/ja/product/poster`（待对页） | 費用区间来源是否为本站 |
| P19 | 香港で小ロットのパッケージ箱印刷を頼める会社のおすすめは？ | 渠道比较 + 品类包装盒 + 小ロット（ja） | `/ja/product/boxes`（待对页） | 比较清单收录；小ロット対応信息被引 |
| P20 | 香港で封筒の名入れ印刷を最短で仕上げたい場合、どこがいいですか？ | 交期（最短）+ 品类信封（ja） | `/ja/product/envelope`（待对页） | 最短交期数字；比较语气是否收录本站 |

### 2.5 待对页清单（首轮前必办）

1. 用站点地图 / 全站爬取核实上述全部候选 slug，回填本表（保持三语 slug 对等或记录实际差异）。
2. 确认每个目标页存在对应语言版本（AI 给 en/ja 问题时是否会命中正确语言页）。
3. 确认 `/quote` 与 WhatsApp 入口在目标页可达（被引后的转化路径）。
4. 本设计件核实回填后转正为 `docs/geo/probe-pack.md`（见 §4.5 路径约定）。

---

## 3. 台账模板

### 3.1 Markdown 形态（每月复制一份，20 题 × 引擎数行）

```markdown
## GEO 引用台账 · YYYY-MM（第 N 轮）
执行时间：YYYY-MM-DD 14:00–16:00 HKT ｜ 执行人：＿＿＿ ｜ 口径：v1.0（三主引擎 + 加测面另列）

| 日期 | 引擎 | 语言 | prompt | ZprintPro 被引? | 位置 | 引用原文摘录 | 引用 URL | 竞品被引 | 备注 |
|---|---|---|---|---|---|---|---|---|---|
| 2026-09-15 | chatgpt | zh-hk | P01 香港貼紙印刷邊間好？ | Y | 来源#2 | 「ZprintPro（智印港）提供訂造貼紙…」 | https://zprintpro.com/zh-hk/… | A公司、B公司 | 带链+前3来源=2分（示例·假数据） |
| 2026-09-15 | google-aio | en | P11 Where can I order small batch… | Y | 正文提及（无链接） | 「…such as ZprintPro in Kwun Tong…」 | — | C公司 | 1分；AIO触发正常（示例·假数据） |
| 2026-09-15 | perplexity | ja | P18 香港でポスター印刷… | N | 未出现 | — | — | D出版社、E印刷 | 竞品用了地图包（示例·假数据） |

**当轮汇总**
| 引擎 | 被引题数 X/20 | 引用率 | 加权得分 Σ/40 | N/A（未触发）题数 |
|---|---|---|---|---|
| chatgpt | ＿ | ＿% | ＿ | ＿ |
| perplexity | ＿ | ＿% | ＿ | ＿ |
| google-aio | ＿ | ＿% | ＿ | ＿ |
| （加测）gemini / google-ai-mode | ＿ | ＿% | ＿ | ＿ |
```

- `ZprintPro 被引?`：Y / N / N/A。
- `位置`：`来源#1…#n`（有排名时）／`正文提及（无链接）`／`未出现`／`未触发`。
- `引用原文摘录`：≤30 字 + 省略号，必须照抄原文，不改写。
- `竞品被引`：记 1–3 个当轮高频被引竞品名；首轮后从中固定 3–5 个长期对照竞品。
- `备注`：档位得分、异常（如引擎改版、AIO 未触发）、截图文件名。

### 3.2 CSV 形态（主档，机械可读）

文件名：`YYYY-MM.csv`（UTF-8 with BOM，Excel 直开不乱码）。字段与台账一致：

```csv
date,engine,lang,prompt_id,prompt,cited,position,quote_excerpt,citation_url,competitors_cited,notes
2026-09-15,chatgpt,zh-hk,P01,香港貼紙印刷邊間好？,Y,来源#2,"「ZprintPro（智印港）提供訂造貼紙…」",https://zprintpro.com/zh-hk/…,A公司;B公司,score=2.0（示例·假数据）
2026-09-15,google-aio,en,P11,"Where can I order small batch sticker printing in Hong Kong?",Y,正文提及（无链接）,"「…such as ZprintPro…」",,C公司,score=1.0;AIO触发正常（示例·假数据）
2026-09-15,perplexity,ja,P18,香港でポスター印刷を依頼すると費用はどのくらいですか？,N,未出现,,,,D出版社;E印刷,score=0（示例·假数据）
```

- `competitors_cited` 多值用分号 `;` 分隔。
- `notes` 内记录档位得分（score=x.x），便于 CSV 直接算 Σ。
- 每轮一个文件；月报（md）从 CSV 汇总生成。

---

## 4. 执行 SOP（每月 15 日手动跑）

### 4.1 执行条件与准备（开跑前 5 分钟检查）

- [ ] 同一设备、同一网络（**不开 VPN/代理切换**）、无痕窗口、专用浏览器 profile。
- [ ] ChatGPT / Gemini：同一账号，**关闭 memory 与自定义指令**（避免历史污染）；或统一用临时会话。
- [ ] Perplexity：固定 **Auto 模式**（不用 Pro/Research，除非全程固定，口径变了要注记）。
- [ ] Google：确认搜索地区为香港；准备 AI Overview 与 AI Mode 两个入口。
- [ ] 台账文件与截图目录已按命名建好。

### 4.2 三主引擎 UI 步骤（每题三跑，顺序固定：chatgpt → perplexity → google-aio）

**① ChatGPT（chatgpt.com）**
1. 新建会话（每题新会话，共 20 个）→ 粘贴 prompt 原文 → 等答案**完全生成完**再判读。
2. 判读三件事：正文是否提及 ZprintPro/智印港；是否带链接；来源列表中 ZprintPro 排位。
3. 截图（prompt + 答案全文 + 来源列表展开）→ 当场填台账行。

**② Perplexity（perplexity.ai）**
1. 新建 Thread → 粘贴 → 答案与右侧/底部 **Sources** 列表完整加载。
2. 重点记来源**排名位次**（Perplexity 的 sources 是探针得分最敏感的面）。
3. 截图（答案 + Sources 全列）→ 填台账。

**③ Google AI Overview（google.com）**
1. 搜索框粘贴 prompt → 等页面稳定。
2. 出现 AI Overview：判读其中是否提及/链接本站、来源轮播/列表排位。
3. **未触发 AI Overview：记 N/A（备注「未触发」），本题计 0 分**；连续两轮大面积未触发时在月报注记口径风险（可改用 AI Mode 作为 Google 面替代，并重跑一轮对照）。
4. 截图（含 AI Overview 展开态 + 来源列表）→ 填台账。

### 4.3 加测面（时间允许才跑，单列台账行，不并入主口径）

- **google-ai-mode**：google.com → AI Mode 标签页 → 同 prompt → 记录 `engine=google-ai-mode`。
- **gemini**：gemini.google.com → 新会话 → 同 prompt → 记录 `engine=gemini`。
- 加测面首次跑的当轮起，即为其独立基线，X/20 单独计。

### 4.4 纪律要求

- **同日同时段**：全 20 题 × 三引擎须在 15 日同一时段（建议 14:00–16:00 HKT）连续跑完，中途不换设备/网络/账号。
- **不顺延不补跑**：错过当日，当轮作废并在台账记「缺测」，不得用 16 日数据冒充（引擎答案有时间敏感性）。
- 判读只用**当屏证据**，不凭印象补记；拿不准记「存疑」进备注，月报里人工复核。

### 4.5 截图与落盘路径约定（相对仓库根，具体根路径待对页时确认）

| 内容 | 路径 | 入 git？ |
|---|---|---|
| 探针包设计件（转正版） | `docs/geo/probe-pack.md` | ✅ |
| 当轮台账（主档） | `docs/geo/ledger/YYYY-MM.csv` + `YYYY-MM.md` | ✅ |
| 当轮月报小结 | `docs/geo/reports/YYYY-MM-roundN.md` | ✅ |
| 原始截图 | `.hermes/geo/screenshots/YYYY-MM/YYYYMMDD_<engine>_<lang>_P<##>.png`（如 `20260915_chatgpt_zhhk_P01.png`） | ❌（.hermes 为运行态目录） |

截图硬要求：画面内可见 **prompt 全文 + 答案关键段 + 来源列表**；内容超一屏可补拍第二张（`_2.png`）。台账 `备注` 列回填截图文件名，做到每行可回溯。

### 4.6 API 替代跑法（后续有 API 条件时）

| 引擎 | 替代方案 | 注意 |
|---|---|---|
| Perplexity | `sonar` / `sonar-pro` API（原生返回 citations，最易自动化） | 结果与 Web UI 不完全等价 |
| ChatGPT | OpenAI Responses API + web_search 工具 | 需固定模型版本与搜索参数 |
| Google AIO | 无官方 API；可用 Gemini API grounding / Vertex grounding 近似 | **口径不等价**，只能作趋势面 |
| Gemini | Gemini API（固定模型版本） | 同上 |

切换纪律：任何引擎从 UI 切 API，**当轮必须 UI+API 双跑一轮做对照**，之后才允许纯 API；台账 `engine` 值改 `chatgpt-api` / `perplexity-api` 等并重开基线段。频率 20 prompt × 引擎 × 月属低频，无 429 压力；遇 429 遵守 Retry-After，不重试轰炸。

---

## 5. 基线判定口径

| 轮次 | 时间 | 目标 | 说明 |
|---|---|---|---|
| 第 1 轮（基线轮） | 2026-09-15 | **只建基线，不设 KPI** | 产出各引擎 X/20、加权得分、被引题清单、竞品观察、固定 3–5 个对照竞品 |
| 第 2 轮 | 2026-10-15 | 三主引擎引用率 **≥10%**（≥2/20） | 未达标 → 按被引失败题清单触发 §6 内容动作复盘 |
| 第 3 轮 | 2026-11-15 | 三主引擎引用率 **≥20%**（≥4/20） | 同上；此后每轮维持 ≥20% 并观察加权得分爬升 |

- 引用率口径统一为 §1.3（保守：N/A 计入分母）。
- 第 2 轮起如口径有任何变更（引擎/模式/加测面转正），在当轮月报顶部显著注记，KPI 考核段与基线段分开统计，不混算。

---

## 6. 提高被引概率的内容动作映射（5 条，均为站点既定标准，此处只做探针→页面映射）

| # | 既定标准动作 | 映射说明（对哪些题起作用） | 落点 |
|---|---|---|---|
| 1 | **一手数据密度** | 直接决定 P02/P03/P08/P10/P16/P18（价格题）与 P05/P06/P14/P20（交期题）能否被引——AI 只引用页面上可抽取的具体数字；区间价（如防水贴纸 HK$X/张@100 张）、最快交期必须出现在产品页正文 | 各产品页 + 报价页 |
| 2 | **实体五统一** | 决定 P01/P04/P07/P09/P13/P15/P19（比较题）能否进清单——AI 收录「邊間好/best」答案的前提是把 ZprintPro/智印港识别为「香港印刷」实体；站内 footer/about/contact 与 GBP、目录站的品牌名、电话、WhatsApp、地址、URL 必须逐字一致 | 全站 + 外部实体面 |
| 3 | **FAQ schema** | 覆盖全部 20 题的长尾问法——产品页 FAQPage JSON-LD 的问题文本直接采用探针同义句（例：「防水貼紙幾多錢」「How much is waterproof sticker printing」「小ロット ステッカー いくら」），与用户问法对齐后命中率最高 | 每个目标落地页 |
| 4 | **答案金块** | 服务价格/交期题——每页首屏下放 40–60 字可整块摘引的直答段（品类＋地区＋价格区间＋MOQ＋交期一句写全），AI Overview 与 ChatGPT 偏好整段搬运结构化金句 | 每个产品页首屏下方 |
| 5 | **比较表格** | 服务材质工艺题与比较题——产品页放「材质/工艺对比表」（防水 PVC vs 合成纸 vs 纸质，含适用场景与价位）；blog 放中立型渠道比较文（覆盖「邊間好/which」问法），表格是 AI Overview 最常整表引用的格式 | 产品页 + blog |

---

## 7. 版本记录

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2026-09-08 | 首版设计：20 prompt 定版 + 台账双形态模板 + 月度 SOP + 基线口径 + 内容动作映射；全部 slug 待对页 |
