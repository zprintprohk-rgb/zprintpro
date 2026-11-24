# SERP 尾缀与 doujin 价格口径诊断（2026-11-24 18:50 · r4 探针伴随发现的只读根因裁决）

> 性质: 只读诊断（双方法复算 per §0.23.2），未改任何 src/data/CSV
> 数据来源: ① 源码/CSV 实值（node 直读 utf8: zprintpro-sku-seo-data.csv + src/data/sku-seo-data.ts + src/data/products.ts + src/data/blog-data/*.json + src/app/api/merchant-feed/）② 线上实值（Invoke-WebRequest GET 200: /en/product/doujinshi-printing/ + /en/services/catalog-printing-china/ <title> 标签）③ r4 SERP 快照（s2-c2-aio-r3/r4 + s3-q09）
> 两方法一致性: title 层完全一致 ✅

## 一、裁决 1: en 页 SERP 尾缀「智印港」——页面层无违规，是 §0.39 统一名的 SERP 显现

| 证据 | 实值 |
|---|---|
| 线上 doujin en PDP `<title>` | `Doujinshi Printing Comiket \| 10 MOQ \| USA \| ZprintPro` |
| CSV doujin 行 title 变体（3 列） | 全部以 `ZprintPro` 结尾，**无「智印港」**（注: 脚本列位索引与 CSV 实际列序有偏移，标题族结论不受影响） |
| 线上 catalog 服务页 `<title>` | `China Catalog Printing \| 10 MOQ + Shenzhen Factory + DHL 2-4 Days \| ZprintPro` |
| SERP 显示（r3/r4 两跑复现） | `… \| 智印港` 尾缀 |

**裁决**: 假说 A/B 均不成立——title 实值干净，en 页符合 §13.16 单品牌分层。SERP 尾缀 = Google 站点名组件取站点级实体名（**§0.39 统一名「ZprintPro智印港」2026-11-20 落 WebSite/Organization schema 后，Google 开始用统一名做 SERP 站点名/尾缀**，显示宽度截断只剩「智印港」）。原 checkpoint 判「§13.16 违规嫌疑」**撤回**。
**新拍板项（登记 K3）**: en/ja 的 WebSite schema site name 维持统一名（SERP 尾缀会带「智印港」）vs 回落 locale 单品牌（尾缀=ZprintPro 但实体信号稀释）。**建议维持统一名**（实体归一优先于尾缀美观；B1 旧名归一是主要矛盾，此为次要观感）。11-28 解冻窗同场正式核对。

## 二、裁决 2: 「满 HK$300免运费 · For new customers」——非站内泄漏，GMC/Google 侧促销数据

- `src/` + `public/` 全量 rg: `HK$300 / 300免運 / For new customers` **0 命中**
- `src/app/api/merchant-feed/[locale]/route.ts`: 仅商品 taxonomy 代码，无 promo/shipping 文本；`merchant-policy.ts` 无 300/免運
- **裁决**: SERP 促销注释来自 Merchant Center console 侧配置（或 Google 自动生成）+ Google zh-HK UI **机翻成简体「满」**展示。非 §13.16.1 繁体铁律违规（页面无简体）。
- **处置**: K3 侧检查 GMC console promotions（如配过「Free shipping over HK$300 for new customers」，简体化为 Google 机翻不可控；可用繁体/双语 promo 文案缓解）。**非 src 修复项，不进 lane**。

## 三、裁决 3: ¥7,500 价格口径分裂——D1 拍板素材实锤清单（唯一真实 src 层问题）

真值锚点（执行层自我一致的一侧）: `src/data/products.ts:6705` `price_range: '¥7,500〜/注文〜'` + ja blog「10 冊からのご注文で ¥7,500〜（…注文金額目安）」+ ja body「注文開始価格（1部あたりの単価ではありません）」= **订单起步价口径**。

分裂点（per-copy 表述，与锚点矛盾）:
| # | 位置 | 表述 |
|---|---|---|
| 1 | `src/data/sku-seo-data.ts:2594` zh body | 「單價由 ¥7,500 起／部」 |
| 2 | `src/data/blog-data/zh-hk.json:276` 快速答案+价格段 | 「單價 每本 ¥7,500 起」 |
| 3 | `src/data/blog-data/zh-hk.json:816` comiket 快速答案+价格表 | 「¥7,500／部〜」×2 |
| 4 | `src/data/blog-data/en.json:807` Quick Answer + price table | 「starts at ¥7,500 per copy」「from ¥7,500/copy」 |
| 5 | `src/data/category-conversion-blocks.ts:3194` ja metaDescription | 「同人誌1部￥7,500〜」（ja 内部也分裂） |
| 6 | **en SERP 摘要（r3/r4 公开复现）** | 「from 10 copies ¥7,500」——per-copy 表述已被 Google 抽取公开 |

**风险量化**: 若真值=订单起步价（10 本 ¥7,500 → 单价 ¥750/本），per-copy 表述把单价**高估 10 倍**——SERP 公开层直接吓退 en/zh 小单流量（C2 是防守位已现滑位的簇）。
**D1 拍板建议（二选一）**:
- **A（推荐，与 products.ts/ja 现状自洽）**: 真值=订单起步价 → 修 #1-#5 为「10 本 ¥7,500 起（订单金額）/ from ¥7,500 per order (10 copies)」；SOP-5 从源头 CSV→regen；涉及 sku-seo-data（PDP body）+ 3 blog JSON + conversion block
- **B**: 若真值确为每本单价 → 反向修 products.ts price_range + ja body 注释
- 真值只有 K3 能确认（SOP-10 第 3 款: 不推断无来源数字）。拍板后按既定分工: **归 11-25 daily lane（small-batch 同批）+ 11-26 本地化 lane，先 dry-run pre-commit guard**（11-20 拒 9 文件教训）；本报告为 D1 拍板附件证据。

## 四、动作登记
- ✅ 本诊断已随本 commit 入库（证据链完整，拍板可引用）
- ⏳ K3: D1 拍板（A/B + 真值确认）· GMC promotions console 检查 · WebSite schema 统一名口径拍板（11-28 窗）
- ⏳ 11-25 daily / 11-26 lane: 拍板后执行修复（先 dry-run guard）
