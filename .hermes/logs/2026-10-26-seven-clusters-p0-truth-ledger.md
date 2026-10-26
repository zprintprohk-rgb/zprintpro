# 七簇 P0 真值台账（CORE-P0-02）— 2026-10-26 首版

> 任务源: `docs/2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md` §4.2 / §10.2 CORE-P0-02。
> 台账规则: 公开页面只使用 `APPROVED`；`UNKNOWN` 不得被转成营销文案；执行层不补值。
> 本文件为内部台账（含 GSC／探针数据，禁入客户可见内容，§0.23.1）。
> 更新责任: DeepSeek 执行层每轮开工先读本台账 + 上一轮报告 + lane-status；有真值变更即更新状态。

## 0. 数据来源行（§0.23）

- 真值源: `src/data/products.ts`（minQuantity / price_range / basePrice / turnaround）
- 派生源: `zprintpro-sku-seo-data.csv` → `scripts/csv-to-sku-seo.mjs` → `src/data/sku-seo-data.ts`
- 线上探针: `.kimi-work/seven-clusters-20261026/page-probe.json` + 2026-10-26 21:3x 复核探针（本节）
- 构建状态: GitHub check-runs（zprintprohk-rgb/zprintpro，2026-10-26 21:3x 复核）
- 先遣执行: `.hermes/logs/2026-10-26-deepseek-week1-execution-report.md`（commit ef3140ac / fdc8569b）

## 1. 状态图例

| 状态 | 含义 |
|---|---|
| ✅ APPROVED | 有 SSoT 且 K3 已认可口径；可写入公开页 |
| 🔶 UNKNOWN | 真值未决；禁止转成营销文案；列 K3 决策 |
| 🔧 IN_PROGRESS | 源已改，未部署或未 K3 拍板 |
| 🧹 FIXED | 已修毕（本轮或前轮）；验收待部署 |
| ⛔ BLOCKED | 被 K3 决策 / CF 部署阻断 |

---

## 2. P0 明细台账

### P0-A robots.txt 404（CORE-P0-01）

| 字段 | 值 |
|---|---|
| URL | `/robots.txt`（三语共用） |
| 现值 | 线上 404（2026-10-26 21:3x 复核仍 404） |
| 源头路径 | `src/app/robots.ts`（唯一 SSoT，commit ef3140ac） |
| 证据 | 本地 build `.next/server/app/robots.txt` 已生成；线上 404 = CF build 未部署 |
| CF 状态 | check-runs: ef3140ac=failure（started/completed 同秒）、23f9c81c=failure（同秒）；上次成功 build = 8c3dd996 @ 08:59 |
| 适用 | 全站抓取规则；12 AI crawlers explicit Allow；sitemap 指向 sitemap.xml + sitemap-image.xml |
| 状态 | ⛔ BLOCKED（源码 ✅，部署被 CF 阻断） |
| 负责人 | K3（CF Dashboard 查 build logs／配额）；执行层提供证据包 |
| K3 决策 | §K3-9：CF build 连续失败根因（零时长失败 → 疑似月度 build quota 耗尽或账户配置） |

### P0-B 同人价格／币种／MOQ／rush（DJ-P0-03）

| 字段 | 值 |
|---|---|
| URL | `/en|zh-hk|ja/product/doujinshi-printing/` + `/ja/comiket-c109/` |
| 现值 | 三语「¥7,500〜/部〜」按每本展示；ja 描述写 50 冊（正文/H1 10 冊）；24h 特急并存 |
| 源头路径 | products.ts DJ-001: price_range `¥7,500〜/部〜` / basePrice 7500(JPY) / basePrice_en 1245 / minQuantity 10 / turnaround `5-7 営業日 (コミケ前 24時間特急対応)` |
| 证据 | sku-seo-data ja body 50冊〜（先遣 P0-3 已改 10冊〜）；C109 页 L61 ¥7,500 から；blog-data ja L781 1冊 ¥7,500〜；page-probe 162 展示／17.41 位（ja PDP） |
| 矛盾点 | ¥7,500 是每部、每单还是其他口径未定；en/zh 显示币种未定；basePrice_en=1245 的币种／倍率未核 |
| 状态 | 🔶 UNKNOWN（价格/币种/MOQ 单位）；🔧 IN_PROGRESS（50冊→10冊已改源） |
| 负责人 | K3（口径）→ 执行层（统一） |
| K3 决策 | §K3-1（价格单位与币种）、§K3-2（MOQ 与 rush：10/50 冲突、24h/即日边界、酒店/会场直送） |

### P0-C 四页 MOQ：saddle／exercise／catalog／A2（BOOK-P0-04）

| SKU | 线上 H1（2026-10-26 21:3x） | 线上 desc | products.ts minQ | 状态 |
|---|---|---|---|---|
| saddle-stitch-booklets | Saddle Stitch Booklets 100+ | 10-piece MOQ | 10（L5170） | 🔧 源已改 10（先遣），未部署 |
| exercise-books | Exercise Books 100+ \| Perfect Bound | 10-piece MOQ；Perfect Bound | 10（L5784） | 🔧 源已改 10 + Saddle-Stitched（先遣），未部署 |
| catalog-printing | Catalog Printing 100+ | 10-piece MOQ | 10（L5103） | 🔶 H1 100+ 仍在线；真值待 K3 |
| a2-posters | A2 Posters 100+ | 10-piece MOQ | 10（L2490 区） | 🔶 H1 100+ 仍在线；真值待 K3 |

- 先遣已改: saddle/exercise H1 100→10（CSV 4 批 + 生成器断言 A-E PASS，commit ef3140ac）；catalog zh body 100→10 本起印。
- 未决: catalog/A2 的 H1 100+（offset 批量口径）是否也该为 10——**不机械把 100 全改 10**。
- exercise 装订方式: 先遣已统一 Saddle-Stitched（products.ts 真值）——待 K3 认可。
- K3 决策: §K3-3（四页 title 10 vs H1 100 哪一个是真；exercise 装订）。

### P0-D ja 币种漂移（LOC-P0-05）

| 字段 | 值 |
|---|---|
| URL | `/ja/blog/textbook-printing-guide/`、`/ja/category/paper-bags/`、ja paper-bags 正文 |
| 现值 | ja textbook description `HK$5-50/冊`（线上已确认）；ja paper-bags 正文 `HK$8.00〜` |
| 源头路径 | blog-data/ja.json L703 desc + blog-posts.ts L1810-1812 excerpt；products.ts textbooks price_range `HK$5-50/本`（minQ 100，L6007）；pricing.ts L898 |
| 证据 | 2026-10-26 21:3x 线上探针：`/ja/blog/textbook-printing-guide/` desc 含 HK$5-50/冊 |
| 全站 ja HK$ 面 | blog-data/ja.json 50 处 HK$（含贴纸 L48、食品 L104、海报 L120、纸袋 L148、包装 L546/590、红包 L790、练习册 L715、绘本 L740、Zine L732、fold L764、banner L772、calendar L835/841、香港语境内容 L498/505/541/574/582/676-679 等） |
| 处置边界 | 香港语境内容（香港ブライダル等）HK$ 语义正确，不在本 P0；本 P0 只针对「日本市场通用页」币种漂移 |
| 状态 | 🔶 UNKNOWN（需 K3 定 JPY 金额与有效期）；⛔ 无汇率拍板不猜值 |
| 负责人 | K3（金额/有效期）→ 执行层（统一，且不「只换符号」） |
| K3 决策 | §K3-4（textbook 与 paper-bags 的日元金额、适用范围、有效期） |

### P0-E catalog supplier guide 内部目标泄露（CAT-P0-06）✅ 本轮已修

| 字段 | 值 |
|---|---|
| URL | `/en|zh-hk|ja/blog/catalog-printing-china-supplier-guide/` + books category featuredSnippet |
| 现值 | 原三语 description/excerpt/featuredSnippet 含 `4-word cluster 9/4 ranking target`（内部 SEO 目标） |
| 处置 | 本轮 9 处清理：blog-data ×3（en/zh-hk/ja description）、blog-posts.ts ×3（excerpt fallback）、category-seo-content.ts ×3（books featuredSnippet，CategoryPillarContent 渲染可见）；仅删内部标记句，保留用户价值描述；未夹带 title 改写或整篇重写 |
| 备份 | `.hermes/_bak-cat-cleanup-20261026/`（5 文件） |
| 残留扫描 | `cluster 9/4|順位目標|期望進首頁|ranking target` = 0（仅余代码注释 blog-posts.ts L1551，§0.23.1 允许） |
| 状态 | 🧹 FIXED（源已清；线上验收待部署） |

### P0-F 年賀状 A／B（NENGA-P0-07）

| 字段 | 值 |
|---|---|
| URL | `/ja/nengajo-2027/` |
| 现值 | 主推 127×178mm；早割率／截止未定、宛名确认中；先遣已撤「早割受付中」承诺词（title/h1/lead/desc 三语 6 处，commit fdc8569b） |
| 源头 | nengajo 页面 + products（greeting 族）；日本郵便官方: 一般年賀はがき 100×148mm |
| 状态 | ⛔ BLOCKED（A/B 未拍板）；B 分支不扩年賀状词 |
| 负责人 | K3（规格/早割/宛名/投函/价格交期） |
| K3 决策 | §K3-5（100×148 可否、127×178 定位、价格/早割/截止、宛名/投函） |

### P0-G en greeting 价格冲突（先遣 P0-4，策略 §4.4 同源）

| 字段 | 值 |
|---|---|
| URL | en greeting category/title/desc（seo.ts + category h2） |
| 现值 | `$0.50`（seo.ts title/desc + category h2）；h2「100 MOQ」与正文「10 MOQ」冲突 |
| 真值 | products.ts greeting 6 SKU basePrice_en = $0.13-0.23；minQ 10 |
| 状态 | 🔶 UNKNOWN（$0.50 系 white-card-bags HK$0.50 误用，待 K3 认可统一 $0.13-0.23） |
| K3 决策 | §K3-6a（en greeting 价格口径 $0.50 vs $0.13-0.23）；§K3-6b（B1-B4/E1-E5 无来源案例与百分比：30% 回购率 / TikTok Paper Love GMV / 20% 溢价 / $0.07 / 78萬 GMV / LovePop / 70億枚 → 删除或证据化） |

### P0-H small batch 履约声明（STICKER-P1-10 前置）

| 字段 | 值 |
|---|---|
| URL | `/en/product/small-batch-stickers/` |
| 现值 | 50 pcs MOQ、$0.045/pc、free 2-hour digital proof、4-day USA delivery（线上已确认） |
| 未决 | 免费实体样／样品运费、100% 满意退款、4-day USA 的地区与条件 |
| 状态 | 🔶 UNKNOWN（服务边界待业务核实） |
| K3 决策 | §K3-6（数字 proof vs 实体样、样品费/运费、4-day USA 与退款承诺地区条件） |

### P0-I 性能与环保绝对化声明（P1 级）

| 字段 | 值 |
|---|---|
| 现值 | `100%環保`、户外 3–5 年、食洗机 80°C、防水年限、承重、FSC/100% 环保等（分散各处） |
| 处置 | 改为有测试条件的材料/使用边界；无证据删除；不写无测试 IPX、80°C 或固定户外年限 |
| 状态 | 🔶 UNKNOWN（可公开范围待 K3/质检） |
| K3 决策 | §K3-7（户外年限、食洗机温度、防水、承重、FSC/100%環保可公开范围） |

### P0-J 转化接入（MEASURE-15 前置）

| 字段 | 值 |
|---|---|
| 现值 | GA4、008 有效询盘、订单未按 landing page 对齐；「带钱词」仅采购意图、收入待校准 |
| 状态 | 🔶 UNKNOWN（待接入许可） |
| K3 决策 | §K3-8（允许 GA4/008/订单按 landing page 对齐） |

---

## 3. 关闭 / 未决计数（供周末闸门 §九）

| 项 | 状态 |
|---|---|
| robots 源码 | ✅ APPROVED（源码）｜⛔ 部署被 CF 阻断 |
| doujin 价格/币种 | 🔶 UNKNOWN（K3-1/2） |
| doujin MOQ 50→10 | 🔧 源已改 |
| 四页 MOQ（saddle/exercise） | 🔧 源已改（K3-3 认可） |
| 四页 MOQ（catalog/A2） | 🔶 UNKNOWN（K3-3） |
| ja 币种 | 🔶 UNKNOWN（K3-4） |
| catalog 内部目标泄露 | 🧹 FIXED（本轮） |
| 年賀状 | ⛔ BLOCKED（K3-5） |
| en greeting 价格/案例 | 🔶 UNKNOWN（K3-6） |
| small batch 服务边界 | 🔶 UNKNOWN（K3-6） |
| 性能/环保声明 | 🔶 UNKNOWN（K3-7） |
| 转化接入 | 🔶 UNKNOWN（K3-8） |

**周末闸门结论**: 除 CAT-P0-06（已修）外，P0 未闭环项全部停在内部台账或源改动阶段；catalog/A2、doujin、ja 币种、年賀状、greeting 未决页下周不得进入公开扩写，可做内部台账与无风险诊断。
