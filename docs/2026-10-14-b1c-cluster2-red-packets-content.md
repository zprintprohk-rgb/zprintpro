# B1c 簇2 利是封三页 SEO/AEO/GEO 增强 — 执行与验收报告 (2026-10-14)

> K3 指令: 深度理解千问3.8max B1c 簇2 要求, 按三站点实况做飞轮提升, 簇内相似度 <55% 红线, 穷尽能力按最优执行。

## 一、架构映射决策 (零新建 SKU 爆炸半径)

| 千问稿页面 | 落地载体 | 理由 |
|---|---|---|
| P1 利是封印刷 (大词 hub) | `/category/red-packets/` 专属内容块 (`redPacketsContent` 整块重写) | 大词归大词 URL; 原块为 2026-08-22 v3.13 遗留, 含 e-print 竞品名/「500個起」「HK$0.8/個」「3個工作天」与现真值不符 + 「3,000個」类无来源数字, 整块重写 |
| P2 燙金利是封 (兄弟A, 工艺深度) | `foil-red-packets` PDP body ×3语 + products.ts faqSchema ×4 | 精确匹配 SKU |
| P3 企業利是封定制 (兄弟B, B2B) | `custom-red-packets` PDP body ×3语 repositioned B2B + faqSchema ×4 | 精确匹配 SKU |

## 二、合规清洗 (千问稿 → 站规)

**删除的编造/违规项** (§0.23/SOP-10#3): 香港3億個/35%、累計800萬個、200+企業客戶含12家上市公司、3.2倍記憶度、日本15億枚/2割、2019年起、全部虛構分檔價格表、ΔE/±0.2mm 能力值斷言 (改定性表述)、觀塘。
**簡中清毒 (§13)**: ja「自带光沢/工艺深掘り/投产/历年」→ 特有の光沢/加工/生産開始/例年; 「亮金/啞金」ja 文 → ブライトゴールド/マットゴールド; zh「覆膜」→ 過膠 (§13.16.1 港式術語, 啤/燙金/擊凸保留)。
**品牌分层 (§1)**: zh 全線 智印港 (千问稿誤帶 | ZprintPro 已清); en/ja = ZprintPro。
**§0.0 名片禁區**: 千问稿内链「名片印刷/Business Card Printing/名刺印刷/カタログ印刷」→ 改 greeting-cards (§0.0.1 承接主品类) + paper-bags (catalogs 品类不存在); 三页正文/标题/关键词零名片词。
**真值锚点**: MOQ 100 / foil HK$1.10-4.80·custom HK$1.90-6.40 (products.ts price_range) / 5-7 工作天 (家族 seo description 既定) / ISO 9001 / FSC / 30秒 AI 報價 / WhatsApp +86 198 8085 1334。

## 三、飞轮增强手法

- **AEO**: 每页首段 150 字内定义式直答 (X 是/とは/is) + hub featuredSnippet 摘要位。
- **带钱词**: title-v5 五段式重写 6 槽, 数字钩子真值前置 (100個起/HK$1.10起/12色)。
- **习惯词长尾**: 金箔銀箔選型 / 分版套印 / 以印代燙 / 分點包裝 / 可變二維碼 / 年度版本留檔 — 兄弟页各持 2+ 独有信息块。
- **内链簇**: hub→2 PDP + foil-stickers; foil→hub + foil-stickers + custom; custom→hub + greeting-cards + paper-bags + foil。全部真实 URL (脚本断言 21 条链接逐条可解析)。
- **FAQ**: PDP v9 实读 products.ts faqSchema → foil/custom 各 4 条英文重写; hub 5 条/语进 category 块 faq。
- **GEO**: faqSchema 4+4 经 JSON 解析校验; featuredSnippet 每语一条。

## 四、事故与修复 (双方法复算 §0.23.2)

1. **b15-title-writeback 方向陷阱**: 该脚本是 ts→CSV (ts 为真相源), 本批误用于 CSV→ts 意图, 导致新标题被旧值回盖。修复: 锚定 "seo": 后的脚本直写双侧。
2. **embossed-red-packets 遭波及**: 上述事故链 + regen 从陈旧 CSV 行回写了旧模板 desc/h1 (en "from ZprintPro the US"、ja「エンボス年賀状」)。修复: 从批前备份 `_bak-sku-seo-before-b1c2-bodies.ts` 按 locale 锚定恢复 desc/h1。
3. **locale 键误配根因**: sku-seo 块内 `name` 对象同样含 zh-hk/en/ja 键, 裸 index 会命中 name → 全部读写必须锚定 `"seo":` 之后。已固化到本批全部脚本。
4. **全雷审计**: 修复后全量 83 SKU × title/desc/h1/keywords × 3 locale 双端比对 = **0 不一致**。
5. **title-v5 当量迭代**: 首版 6 标题 4 个 ≥58 阻断 (en 74 当量), 依门童 PRICE_MISMATCH 修正 en 价为 basePrice_en (custom $0.74 / foil $0.46), 终版 6 槽全部入带 (52-57)。

## 五、验收数据

| 门童/指标 | 结果 |
|---|---|
| 簇内相似度 (词级 Jaccard / 5-gram shingle, 双方法) | worst = 0.498 (ja hub-foil) / 0.102; 9 对全部 < 0.55 红线 |
| tsc | 54 = 54 基线 (计数法 = error TS 出现次数, 非输出行数) |
| title-v5 门童 #27 | 6/6 红封槽 hard=[]; 存量 HARD=8 均为非本批槽位 |
| brand mentions --strict | A 类 0 命中 |
| gsc-leak 门童 #16 | exit 0 |
| 编造 lint (自制) | 9 正文 + hub 三语块 + faqSchema: 简中字/词 0, 编造短语 0, 品牌分层断言过 |
| regen csv-to-sku-seo | 0 漂移 / 断言 A-E PASS / 完全幂等 |
| 内链接解析 | 21 条全部命中真实 product/category slug |
| 名片词扫描 | 本批改动区 0 新增 (存量贺卡 SKU 历史残留 24 处为 v22 改名遗留, 报告式盘点口径) |
| sitemap | 6 XML 重生成, lastmod=今日, red-packets 9 URL + hreflang 齐 |

## 六、遗留

- ja hub-foil Jaccard 0.498 贴近 0.50 目标线 (红线 0.55 仍有裕度), 下批观察 GSC 若两页互相 cannibalize 再分化。
- 千问稿 P3 預算表/分批到店表 → 转散文时间线 (七週), v9 body 为散文渲染, 表格由 PDP spec 卡承担。
- 本批脚本: `.hermes/_b1c2_*.py|mjs` (不含密钥, 可留档复用)。
