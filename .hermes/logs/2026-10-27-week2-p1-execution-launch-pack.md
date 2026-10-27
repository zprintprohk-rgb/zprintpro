# 周 2 启动执行包 — P1 采购答案落地单 + 带钱词落位缺口表 + K3 决策速览（2026-10-27 12:0x）

> 性质: 内部执行包（含 GSC/探针数据，禁入客户可见内容 §0.23.1）。
> 定位: 无风险执行队列已空（对端 10:2x 复核 PASS-NO-OP + 本包复核一致）；本包把「K3 拍板后当日可落」从声明变为逐页机械落地单。
> 消费方: K3（速览 §3 拍板）→ 周 2（11-02）执行层（按 §2 落地单机械执行）。
> 关联: 基线冻结 v1.0 · KPI 面板 v1（40e1231e）· BAG/POSTER/P1-B 三数据包 · 七簇策略 §10.2 · 双引擎策略 §5.1。

---

## 0. 优先级总览（现状快照 2026-10-27 12:0x）

| 层 | 状态 |
|---|---|
| P0 真值 | ✅ 已闭环: robots（CF edge）/ saddle・exercise MOQ=10 / doujin MOQ 50→10 / catalog-leak 清理 / 基线冻结 v1.0 |
| P0 剩 K3 域 | K3-1 doujin 价格口径 · K3-4 ja 币种 · K3-5 年賀状 A/B · K3-6 greeting 价格承诺 · K3-7 承重/FSC/防水/急件声明 |
| P1 内链 | ✅ 全闭环: J1 doujin↔C109 三语 / E1 sticker-guide→PDP / E2・E3・E5 books+catalog / E4 zine+prep 三缺口 / zh 纸袋 6/6 / zh 海报传单全闭 / E6 诊断交付 |
| P1 采购答案 | ⏳ 数据包全就绪（BAG/POSTER/P1-B）——落页待 K3 拍板（本包 §2 落地单） |
| P2 培育 | ⏳ 周 3（11-09）: doujin 入稿清单 / C109 逆算表 / 纸袋报价模板 / 学校印刷清单（最小可行资产） |
| MEASURE | ⏳ 11-23 同口径 28 天复测（SOP 预演 PASS）；KPI 面板 v1 基线已落（首页词 6/23） |

**本周不落 src 的依据**: 周末闸门（P0 未闭环目标页不得公开扩写）+ §11.3 真值缺失即停 + K3 未拍板项 blocked。采购答案主体为纯真值（可先行），但其所在页含待拍板声明段（K3-7 承重/FSC、K3-2 急件、K3-6 版/枚）→ 整批随 K3 裁决一次性落，避免半截上线。

---

## 1. 带钱词 × 主 URL 落位 × 缺口（23 词，KPI 面板 v1 cur 28d）

> 口径: opportunities CSV / locale_opportunities 过滤（KPI 面板 v1，双方法核对一致）；「主 URL」按簇分工登记，标 ⚠ 的词需 11-02 词级 page-share 复核确认主承接页。

### 1.1 zh-hk（首页 2/9）

| 词 | 展示 cur | 排名 cur | 主 URL（分工） | 周 2 动作 | K3 门 |
|---|---|---|---|---|---|
| 海報印刷 | 278 | 15.0 | /zh-hk/category/posters/ + poster guide | 采购答案·价格口径统一（§4-3） | K3-2/K3-7 |
| 印海報 | 124 | 12.7 | 同上 | 同上（同簇不重复段） | K3-2/K3-7 |
| 食品包裝印刷 | 104 | **9.1 首页** | ⚠ 主 URL 复核（纸袋/食品包装页） | 确认承接页后补采购答案 | K3-7 |
| 紙袋印刷 | 62 | 13.1 | /zh-hk/category/paper-bags/ ✅ | BAG-P1-08 首屏直答 + 袋型分工 | K3-7 |
| 即日印刷 | 52 | **6.9 首页** | zh flyers/same-day ✅ | POSTER 急件条件化后承接 | K3-2 |
| 小冊子印刷 | 61 | 10.3 | zh 小冊子 category | P2 观察，不扩写 | — |
| 騎馬釘印刷 | 51 | 11.6 | zh 騎馬釘 PDP | 同簇收口（不新页） | — |
| 貼紙印刷 | — | 无词级记录 | zh stickers | 观察（窗口内无记录） | — |
| 月曆印刷 | — | 无词级记录 | zh calendars | 观察 | — |

### 1.2 en（首页 3/8）

| 词 | 展示 cur | 排名 cur | 主 URL（分工） | 周 2 动作 | K3 门 |
|---|---|---|---|---|---|
| small batch sticker printing | 49 | **4.8 首页** | /en/product/small-batch-stickers/ ✅ | 采购表·版/枚双档·PDP 出链 1-2 条 | K3-6 |
| small batch stickers | 28 | **5.1 首页** | 同上 ✅ | 同上 | K3-6 |
| saddle stitch booklet printing | 15 | **9.6 首页**（退场中） | /en/product/saddle-stitch-booklets/ ✅ | BOOK-P1-11 采购信息（页数/装订/纸张） | K3-3 |
| doujinshi printing | 39 | 10.2 | /en/product/doujinshi-printing/ ✅ | 价格口径统一后补页数/入稿 | K3-1 |
| china catalog printing | 78 | 18.0 | /en/product/catalog-printing/（E5） | P2 观察（guide/PDP 分工已建） | — |
| a2 poster | 44 | 11.9 | en A2 PDP | 观察（en 非首攻） | — |
| large envelopes | 19 | 13.9 | en envelopes | 观察 | — |
| corporate holiday cards | — | 无词级记录 | greeting-cards | greeting 价格/承诺清理后承接 | K3-6 |

### 1.3 ja（首页 1/6）

| 词 | 展示 cur | 排名 cur | 主 URL（分工） | 周 2 动作 | K3 门 |
|---|---|---|---|---|---|
| コミケ 印刷 | 170 | 19.1 | /ja/product/doujinshi-printing/ + /ja/comiket-c109/ ✅ | 价格口径后写排期/入稿；PDP 主接交易 | K3-1/K3-2 |
| 卒アル販売 | 16 | **5.0 首页**（小样本） | ja 卒アル页 | 守 ≤8，标小样本，不外推整簇 | — |
| 教材 印刷製本 | 33 | 19.3 | ja textbook guide/PDP | 币种统一后补采购段 | K3-4 |
| 教材 印刷 製本 | 17 | 17.4 | 同上 | 同上 | K3-4 |
| pvc シール | 19 | 18.9 | ja stickers | 观察 | — |
| 年賀状印刷 | — | 无词级记录 | /ja/nengajo-2027/ | A/B 拍板后按分支执行 | K3-5 |

**首页词合计 6/23**（zh 2 / en 3 / ja 1）——即日印刷・食品包裝・small batch ×2・saddle・卒アル販売；周 2 动作直接服务其中 4 个（即日→K3-2、small batch→K3-6、saddle→K3-3、食品包裝→复核承接）。

---

## 2. 五页采购答案落地单（K3 拍板后机械执行）

> 每个任务: 文件 → 入口 → 插入点 → 文案引用 → K3 依赖 → 验收。全部为现有页改造（不新建页）。

### 2.1 BAG-P1-08 · zh 纸袋 category 首屏直答
- **文件**: `src/data/category-seo-content.ts` → paper-bags（zh-hk 段）`buyingGuide.paragraphs`
- **插入点**: paragraphs 首段前新增「首屏直答」段（AEO 黄金法则 150 字内直接回答）
- **文案**: BAG 包 §5（起印量 100 個統一 / 價格 HK$3-8・$5-12・$10-20・$6-15 分檔 / 尺寸含大袋基準 320×120×380 / 克重 120-200・200-300・280 / 手挽 5 種 / 免費數碼打樣 / 交期 3-5 工作天＋滿 HK$500 順豐 / 工藝燙金・UV・覆膜・擊凸）——**价格段须写「HK$3 起/個，按袋型分檔」**避免只覆盖 kraft 下限（数据卫生 §6）
- **内链**: 袋型分工锚已登记（kraft/white-card/gift/eco/handle/large 6 锚已存在于 category↔6 PDP 双向，BAG 包 §3 双方法核）——不新增
- **K3 依赖**: K3-7 裁决 §4（承重/FSC 优先）后同批治理 handle-bags H1「堅固手挽設計，承重能力強」与 eco H1「FSC 認證或再生紙」→ 1 src 批
- **验收**: 线上 200 · 首屏 150 字含起印量+价格档 · 无「承重」「100%環保」绝对化残留（门童 #16 + 线上探针）

### 2.2 POSTER-P1-09 · zh 海报/传单 category 首屏直答 + 声明条件化
- **文件**: `src/data/category-seo-content.ts` → posters/flyers（zh-hk 段）`buyingGuide.paragraphs`；`src/data/sku-seo-data.ts` a2/outdoor/same-day 条目 body
- **插入点**: category paragraphs 首段直答；PDP body 声明句条件化
- **文案**: POSTER 包 §5（起印量 傳單 10/A2 10/A1・戶外 1 / 價格 傳單 A5 HK$0.25-0.65・A4 HK$0.35-0.95 依紙工藝 / 尺寸 / 材質 銅版・啞粉・相紙・戶外 PVC・PET・合成紙 / 工藝 覆膜・PP・泡沫板・壓線・燙金 / 交期 3-5 天，急件条件化后写入）
- **价格口径**: A2「HK$12.9起/張」vs products.ts 整單 HK$95-1,017（§4-3）——K3 裁决口径后统一
- **K3 依赖**: K3-2（急件 cutoff/产能/地区条件）+ K3-7（a2/outdoor 防水防曬→改「可選 PP 裱貼／霧面護膜」材质口径）
- **验收**: 线上 200 · 急件承诺带条件（无裸「當天交貨」「即日快遞」）· 防水句无年限承诺

### 2.3 STICKER-P1-10 · en small-batch PDP 采购表 + 出链
- **文件**: `src/data/sku-seo-data.ts` → small-batch-stickers 条目 `body`
- **插入点**: 首段 body 后新增采购表段
- **文案**: P1-B 包 §5（最低 10 個 A4 版起印 + 线上 50 枚/款起售双档写清 / 材料銅版・PP・透明 PVC・Kraft / 尺寸 10×10mm–300×400mm 模切任意形狀 / 免費數碼打樣 2h / 交期配送按 K3-6 裁决写入）——**不改 $0.045 为 $0.05（停止条）**
- **出链**: body 采购段加 1-2 条零声明自然锚 → sticker-guide / sticker-buying-guide（E1 出链侧未满足，本批补齐）
- **K3 依赖**: K3-6（版/枚口径 + 服务边界 + 出链许可）+ K3-2（交期）
- **验收**: 线上 200 · 版/枚两档并存 · PDP 正文含 ≥1 guide 出链锚 · title 冻结未动（门童 #27）

### 2.4 BOOK-P1-11 · en saddle/exercise PDP 采购信息
- **文件**: `src/data/sku-seo-data.ts` → saddle-stitch-booklets / exercise-books 条目 `body`
- **插入点**: body 采购段（页数/装订/纸张/跨页）
- **文案**: P1-B 包 §5（騎馬釘/練習簿 10 本起印 / A4・A5 / 8-64 頁平攤翻閱 / 封面覆膜可選 / 價格 HK$6-32/本・HK$4-16/本 或按 K3-3 汇率口径）——US$1.84-7.36 汇率随 K3-4 一并定
- **K3 依赖**: K3-3（exercise 装订 Saddle-Stitched 认可 + catalog/A2 H1 统一 10）+ K3-4（ja 币种；en 若用 USD 需汇率口径）
- **验收**: 线上 200 · H1 与 title 同 MOQ 口径 · body 含页数/装订/纸张

### 2.5 JA-P1-12 · doujin PDP + C109 排期承接
- **文件**: `src/data/sku-seo-data.ts` doujinshi-printing 条目 body（三语）· `src/app/[locale]/comiket-c109/page.tsx`
- **插入点**: PDP body 采购段（价格口径后）；C109 页保留排期/入稿角色（CTA→PDP 已在）
- **文案**: 台账 + K3-1 裁决（¥7,500 口径 + en/zh 币种；推荐 en/zh 链 30 秒 AI 报价不写换算假值）；入稿清单/逆算表 = 周 3 资产（11-09）
- **K3 依赖**: K3-1（价格单位/币种）+ K3-2（24h/即日/酒店会场直送边界）
- **验收**: 三语价格/FAQ/Offer 一致 · C109 页无未核实直送承诺

---

## 3. K3 决策速览表（每项一句话选项 + 分析师推荐）

| # | 事项 | 选项 | 推荐 | 拍板即解锁 |
|---|---|---|---|---|
| K3-1 | doujin ¥7,500 口径 + en/zh 币种 | A=每部/ja 保留 JPY、en/zh 链 30s AI 报价 ｜ B=统一 JPY ｜ C=本地币换算 | **A** | §2.5 doujin+C109 批 |
| K3-2 | rush 承诺边界（24h/即日/DHL 2-4 天/直送） | A=只保留可兑现（生产 3-5 天+国际按地区条件）｜ B=维持现词 | **A** | §2.2 急件条件化 + §2.5 直送边界 |
| K3-3 | catalog/A2 H1 100+→10 | A=数字印刷 MOQ=10 公开口径 ｜ B=offset 100 写清 | **A** | §2.4 books/catalog 批 |
| K3-4 | ja 币种（textbook HK$5-50 等） | A=授权按 products.ts 真值换算 JPY+有效期 ｜ B=维持 HK$ | **A** | ja 教材/纸袋 + en USD 汇率 |
| K3-5 | 年賀状 A/B（100×148 可否） | A=统一规格/早割/宛名推进 ｜ B=转普通はがき/贺卡定位 | **依工厂能力** | 年賀状词决策 |
| K3-6 | small batch 版/枚 + 服务边界 + greeting 价格 + PDP 出链 | A=双档写清+出链 1-2 条+greeting 统一 $0.13-0.23/MOQ=10 ｜ B=维持 | **A** | §2.3 small-batch 批 + greeting 清理 |
| K3-7 | 承重/FSC/防水/急件声明 | A=按包清单条件化（承重→描述口径、FSC→依供應、防水→材质）｜ B=删除 | **A（优先 承重/FSC）** | §2.1+§2.2 声明治理批 |
| K3-9 尾 | CF Dashboard → Security → Bots 允许 AI crawlers | K3 亲自动手 | 完成后 AI 抓取全链路闭环 | robots 终局 |
| K3-10 | 五车道调度修复（weekly-meta/blog-deepfix/monthly LastResult=2147946720）+ 遗留 watchdog 删除 + weekly 20:52→22:22 错时 | K3 管理员执行（可粘贴命令见对端包 5f42e7f3） | 修复后车道四方验收恢复 | 车道健康 |

**K3 已拍板（知悉，不再列）**: K3-8 转化数据红线（§0.37，GA4/008/订单线下处理，执行层不接入）——本包不包含任何转化接入项。

---

## 4. 验收与纪律（每次执行必过）

- **门禁**: encoding → `npx tsc --noEmit`（基线 54=54）→ 品牌 lint（check-brand-mentions --strict）→ gsc-leak #16 → title-v5 #27（title 冻结页 0 变更）→ JSON/相关 smoke
- **双条件**: 写 src 前 ① src 收尾信号 ② 对端 ≥15min 静默（§0.35.7）
- **push**: 攒批（≥1 src 行为修复即触发）+ 30min 硬下限 + 门童全量 + push 后 verify-deploy + 线上探针
- **基线**: zh 纸袋 663/3 · zh 海报 1,997/10 · en doujin 39/10.21 · ja コミケ 170/19.06 · small batch 49/4.77・28/5.07 · saddle 15/9.60（基线冻结 v1.0；复测 11-23 同口径）
- **禁**: 不新建七簇近义页 · 不改 $0.045 → $0.05 · 不写无实测承重/防水/100%環保 · 不替 K3 猜商业真值 · 不夹带第二战略

---

## 5. 时刻表（NEXT_CHECK）

| 日期 | 事项 |
|---|---|
| 2026-10-27 20:13 / 21:17 | gsc-feedback / daily-content lane 四方验收（对端） |
| 2026-10-28+ | K3 对 §3 速览表拍板（任一裁决 → 对应 §2 批当日落地） |
| 2026-11-02 | 周 2 启动: 采购答案 src 批（本包 §2）按拍板逐批执行 |
| 2026-11-03 | E1 7d 复查（sticker-guide / small-batch 展示与首击） |
| 2026-11-09 | 周 3: doujin 入稿清单 / C109 逆算表 / 纸袋报价模板 / 学校印刷清单 |
| 2026-11-23 | 同口径 28 天复测裁决（SOP 预演字节级一致 PASS） |

> 数据来源: KPI 面板 v1（40e1231e，2026-10-26 批次，双方法核对）· 基线冻结 v1.0 · BAG/POSTER/P1-B 三数据包（products.ts SSoT）· 七簇策略 §10.2/§11 · 双引擎策略 §5.1 · K3 队列 2026-10-27 11:52。本包为内部文档（§0.23.1）。
