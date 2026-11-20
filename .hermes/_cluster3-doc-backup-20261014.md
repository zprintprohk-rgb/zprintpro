# B1c 簇3 傳單/海報/摺頁 三页 ×3语 内容飞轮 — 执行与验收报告 (2026-10-14)

> K3 指令: 深度理解千问3.8max B1c 簇3 稿, 按三站点 SKU 实况做带钱词/行业大词/习惯词飞轮提升, 簇内相似度 <55% 红线, 穷尽能力按最优执行。

## 一、架构映射决策 (零新建 SKU)

| 千问稿页面 | 落地载体 | 实况依据 |
|---|---|---|
| P1 傳單印刷 (主推权威页) | `/category/flyers/` 内容块 `flyersContent` **整块重写** | 类目真实存在, 8 个 SKU (a4/a5/double-sided/folded-leaflets/thick-paper/eco/same-day/school-flyers), 原块 lastUpdated 2026-08-22 旧代 |
| P2 海報印刷 (兄弟A·展示环境) | `/category/posters/` 内容块 `postersContent` **整块重写** | 类目真实存在, 6 个 SKU (a1/a2/outdoor/display/art/adhesive), 原块 2026-09-14 |
| P3 摺頁印刷 (兄弟B·折叠结构) | **SKU `folded-leaflets`** PDP body ×3语 + faqSchema ×4 | 站点无独立 leaflets 品类——摺頁产品即以「摺疊傳單」SKU 形式栖身 flyers 类目 (minQ 10, HK$0.70-1.95/張), 精确匹配零新建 |

差异化分工按千问设计保留: 傳單=派發場景×紙張決策×數量成本 / 海報=展示環境×材質耐候×尺寸安裝 / 摺頁=摺疊結構×克重兼容×閱讀動線。每页 2+ 独有信息块 (傳單派發效率表/3秒法則, 海報觀看距離字級表/安裝方式/色彩管理, 摺頁六摺法總表/包心vs風琴對比/壓線工藝/六面動線)。

## 二、合规清洗 (千问稿 → 站规, 簇3 特有)

| 千问稿内容 | 处置 | 依据 |
|---|---|---|
| 年印 1,200 萬張傳單 / 40 萬張海報 / 300 萬份摺頁 | **全删**, 改「涵蓋四大高頻場景」定性 | §0.23 无来源数字 |
| 2025 年 12 餐飲客戶 A/B 測試 +23%/+31%/+12%/+8%/+5% 留存率 | **全删**, 3 秒法則保留为设计常识定性表述 | §0.23 编造研究 |
| 全套分档价格表 (HK$0.05-0.85/張、$0.007-0.11、¥0.8-12 每档) | **全删**, 改數碼免版費→柯式階梯→輪轉定性 + 真值锚 | §0.23；站点只有 price_range |
| 「3M 級」抗 UV 覆膜 | 改「車貼級 PVC + 抗 UV 覆膜」 | check-brand-mentions A 类第三方品牌 |
| MBO/Stahl 折頁機 + ±0.5mm | 改「高精度自動摺頁機」定性 | 同上设备品牌+能力值断言 |
| 起订量 500 張/50 張/100 份 + 2 天出货 | 改真值 **10 張起 / 1-10 張起 / 10 份起, 3-5 工作天** | products.ts minQuantity + 既有 featuredSnippet 真值 |
| zh 标题带 ZprintPro | 全改 智印港 | §1 品牌分层 |
| ja 简中: 承载×3/高频×2/工艺/転化 | 収載/高頻度/工法/成約 + 観音折り=巻き三つ 统一 | §13 + lint |
| 覆膜 (zh) | 過膠 (zh-hk 术语) | §13.16.1 |
| 折页/折疊 → 摺頁/摺疊 | 对齐 products.ts 站点用词 (摺疊傳單) | 站点一致性 |
| 内链 目錄印刷/カタログ印刷 (品类不存在) | 改 [餐牌印刷 /category/menus/] | 真实品类 |
| 千问标题 (「｜」全角/无钩子/MOQ 假值) | v5 五段式重写 3 槽 | 门童 #27 |

**真值锚点**: flyers A5 128g HK$0.35/張起 3 天 (snippet 既定) / posters A2 HK$6-9、A1 HK$10-16 3-5 天 / folded-leaflets basePrice 0.70 / $0.80 / ¥110, price_range HK$0.70-1.95/張 / ISO 9001 + FSC / WhatsApp +86 198 8085 1334 / 30 秒 AI 報價。

## 三、事故防御 (簇2 教训固化)

1. **b15-title-writeback 陷阱**: regen 漂移提示建议运行该脚本——**拒绝** (它是 ts→CSV 方向), 改用 `--allow-drift` 显式确认 CSV→ts。
2. **CSV imageAlt 对齐**: folded-leaflets 不在 Batch C 利是封 6 SKU 换血范围, CSV 图片Alt列可能陈旧——patcher 从 ts 读回 alt 写回 CSV, 根绝 regen 回写风险 (本批 12 SEO 格 + 3 alt 格一次对齐)。
3. **锚定读写**: 全部 locale 字段读写锚定 `"seo":` 后, 杜绝 name 块键误配 (簇 2 根因)。
4. **lint 假阳性两次**: 参=参考 (ja 标准字形) 移出简中集; `1200` 子串误伤 `3200×5000mm` 真规格, FAB 改精确词形——按 §0.23.2 修探针不改数据。

## 四、验收数据

| 门童/指标 | 结果 |
|---|---|
| 簇内相似度 (词级 Jaccard / 5-gram, 双方法 9 对) | worst = **0.418** (ja flyers-leaflet) / 5-gram max 0.030; 全部 < 0.55 |
| tsc | 54 = 54 基线 (error-TS 计数法) |
| title-v5 门童 #27 | folded-leaflets 3 槽 equiv 51/51/55, hard=0 warn=0; 存量 HARD=8 均为非本批槽 |
| brand mentions --strict | A 类 0 命中 (3M 已前置清洗) |
| gsc-leak 门童 #16 | exit 0 |
| 编造 lint (自制) | 2 类目块 ×3语 + 3 body + faqSchema: 简中/违禁词/编造短语 0, 品牌分层断言过 |
| regen csv-to-sku-seo | folded-leaflets 1 块变更, 断言 A-E PASS |
| 全雷审计 | 83 SKU × 4 字段 × 3 语 **0 不一致** |
| 内链接 | 30 条全部命中真实 product/category/quote |
| check-content-guard.js | **脚本自身 line306 TDZ bug** (lineContent 未初始化, 与簇3无关), 已记待修; 内链改由自制断言覆盖 |
| 名片词 | 本批改动区 0 (FAB 含名片/咭片/名刺扫描) |

## 五、遗留

- check-content-guard.js line306 TDZ ReferenceError: 存量脚本 bug, 建议修 (`let lineContent` 声明提升到循环外)。
- 本批脚本: `.hermes/_b1c3_*.py|mjs` 留档。
