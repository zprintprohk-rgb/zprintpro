# Money Words × CTR 重写执行清单 (2026-08-26, K3 商业情报叠加版)

> **数据来源**: gsc_data.csv (8/24 14:30, 527 词全量) + K3 8/26 04:09 商业情报 (转化词实拍)
> **性质**: M3 执行卡, 优先级 = 展示量 × 转化价值 (K3 情报) × 距首页距离

---

## §0 K3 商业情报 → 数据交叉验证 (5 条校正)

| K3 情报 | GSC 实测 | 校正结论 |
|---------|---------|---------|
| Supabase key 未解锁 12 天 | **K3: 两天前已解锁, 测试邮件已收到** | ⚠️ **M3 报告链路滞后** — R0-1 实际已通, M3 应立即跑 008 SQL + WhatsApp 埋点落库验证, 8/29 基线不再阻塞 |
| 即日印刷很久没看到, 今天 10 名左右 | pos **8.67**, 6 imps, 0 clicks | ✅ 在首页底缘。转化最好的词只拿 6 次展示 = **展示量瓶颈, 不是排名瓶颈**。要强化内容深度 + 内链, 把 imps 拉起来 |
| 即日急件要加上 | pos **25.2**, 5 imps | 需在 rush 页 + FAQ + blog 场景文三处埋词 |
| A2 海報转化最好, 扩 A1 | a2海報 @1 / a1海報 @1 / a2ポスター @1 已全部第 1 | ✅ 规格词已垄断第 1, 但 **印海報 28.5 / 海報印刷 34.9 大词全在 3 页外** — 大词才是展示量池 (41 imps vs 规格词 ~10) |
| 紙袋印刷询盘都是买现货 100 个, 不成交 | 紙袋印刷 12.2 / 印刷紙袋 14.8 / 訂做紙袋 17.9 | ✅ **降级** — striking 第 1 梯队原计划含紙袋印刷, 现移出主攻, 资源让给包裝盒。页面保留不动 (已有展示), 只是不再投入 |
| 包裝盒朋友竞价排名年赚 300 万 | 包裝盒訂製 29.4 / 包裝盒印刷 34.9 / 磁吸禮盒 @1 / kraft paper box 9 | ✅ **升级为 P0 大词** — 客单价最高品类, 必须排首页 |
| catalog/画册 = 海外大单 | china catalog printing 18.5 / catalog printing 42.8 / bulk catalog printing 60.8 / school exercise book 21.7 | ✅ T41 继续, china catalog 18.5 距首页最近 |

---

## §1 Money Words 总优先级表 (按客单价 × 转化情报重排)

| 梯队 | 词群 | 代表词 (pos) | 主攻着陆页 | 打法 |
|------|------|-------------|-----------|------|
| **M1 即日急单** (最高转化) | 即日印刷 (8.7) / 即日急件 (25.2) / 即印 (6) / a1印刷即日 (4) / a2印刷即日 (5) | rush-printing-delivery | 页内容加深 + 即日急件 FAQ + blog 场景文 + 全站内链锚文本 |
| **M2 海報** (规格词已 @1, 攻大词) | 印海報 (28.5) / 海報印刷 (34.9) / 戶外海報 (26.2) / a0海報價格 (10) | category/posters + a2-posters | 大词 Pillar 文 + 价格表进 snippet |
| **M3 包裝盒** (客单价最高) | 包裝盒訂製 (29.4) / 包裝盒印刷 (34.9) / 食品包裝印刷 (15.6) / kraft paper box (9) | category/packaging | Pillar + 行业子页 (化妆品/食品/礼盒) + FAQPage |
| **M4 貼紙** (小单稳定) | 貼紙印刷 (37.8) / 貼紙訂製 (21.4) / 防水貼紙 (25.7) / 戶外貼紙 (19.8) / 可移貼紙 (16.3) / pvc貼紙 (7.3) / 燙金貼紙 (2.3) | category/stickers + 6 SKU | 材质词逐个 SKU 强化, pvc/燙金已近首页先收 |
| **M5 catalog/書冊** (海外大单) | china catalog printing (18.5) / school exercise book (21.7) / catalog printing (42.8) / bulk/wholesale catalog (60-73) | en/category/books + T29 PDP | T41 既定 + 价格锚点 |
| M6 月曆 (季节 9/15 硬截止) | 月曆印刷 (21.1, 24 imps) / 月曆訂製 (32.3) | category/calendars + wall-calendars | R5 既定, 不变 |
| ~~紙袋~~ | 紙袋印刷 (12.2) 等 | — | **降级**: 不投入新资源, 页面保留吃自然流量 |

---

## §2 CTR 重写清单: 69 词三分批

### 批 1 (本周, 15 词 — 高展示 × 高转化价值, 附完整草稿)

| # | 词 | pos | imps | 着陆页 | 新 Title (草稿) | 新 Meta 要点 |
|---|-----|-----|------|--------|----------------|-------------|
| 1 | 大信封 | 2.0 | 16 | /zh-hk/category/envelopes/ | 大信封印刷｜A4/C4 公文信封 500 個起 · 30 秒報價 | 牛皮/白書紙/珠光紙, 免刀模費, 香港 72 小時交貨 |
| 2 | small batch stickers | 4.1 | 10 | /en/product/small-batch-stickers/ | Small Batch Stickers from 50 pcs · Waterproof Vinyl | No plate fee, free design check, DHL 2-4 days worldwide |
| 3 | 即日印刷 | 8.7 | 6 | /zh-hk/services/rush-printing-delivery/ | 即日印刷｜香港急件最快 24 小時起貨 · 30 秒 AI 報價 | 中午前確認下午起貨, 單張/海報/貼紙急件, 順豐即日送 |
| 4 | pvc貼紙 | 7.3 | 6 | /zh-hk/product/waterproof-stickers/ | PVC 防水貼紙訂製｜戶外 3 年耐候 · 100 個起 | 防水防 UV, 餐飲/物流/戶外適用, 免費打樣 |
| 5 | 公司信封 | 1.0 | 5 | /zh-hk/category/envelopes/ | 公司信封印刷｜印 Logo 500 個起 · 免設計費 | (与 #1 同页不同锚, 需拆: 公司信封 → business-envelopes SKU 页) |
| 6 | a5 vs a6 flyer | 5.2 | 5 | /en/blog/a5-vs-a6-flyer-size/ | A5 vs A6 Flyer: Which Size Converts Better? (2026) | 含尺寸对照表 + 价格差 + 适用场景, 数据化答案抢 featured snippet |
| 7 | mtr 12 sheet size | 8.3 | 4 | /zh-hk/blog/poster-size-guide/ | MTR 廣告海報尺寸全解｜12 sheet/4 sheet 規格表 | 港铁广告位尺寸 + 出血位 + 文件要求, 抢规格词 snippet |
| 8 | mtr 4 sheet size | 9.8 | 4 | 同上 | (同页, FAQ 加一条) | — |
| 9 | fluorescent stickers | 5.0 | 4 | /en/product/fluorescent-stickers/ | Fluorescent Stickers · Neon Colors from 100 pcs | 荧光 4 色, 夜光可选, free sample, DHL 2-4 days |
| 10 | 燙金貼紙 | 2.3 | 4 | /zh-hk/product/foil-stickers/ | 燙金貼紙訂製｜金/銀/鐳射燙印 100 個起 | 即時報價, 免費刀模, 包裝/喜帖/品牌封口適用 |
| 11 | a5 a6 尺寸 | 9.8 | 4 | /zh-hk/blog/a5-vs-a6-flyer-size/ | (zh 版同 #6 策略) | — |
| 12 | a2印刷 | 7.7 | 3 | /zh-hk/product/a2-posters/ | A2 海報印刷｜420×594mm 即日交貨 · 1 張起印 | 157g 啞粉/光粉, 港九新界順豐, 30 秒報價 |
| 13 | 彩色信封 | 1.0 | 3 | /zh-hk/product/colored-envelopes/ | 彩色信封印刷｜12 色現成紙 · 500 個起訂 | 喜帖/邀請函/品牌信件適用 |
| 14 | 證書紙材質 | 7.7 | 3 | /zh-hk/category/educational/ 或 blog | 證書印刷紙材指南｜象牙紙/剛古紙/珠光紙點揀 | 材质对照 + 克重 + 烫金工艺 |
| 15 | alipay flash collect / flash collect alipay | 5.5/10 | 7 | (低价值词, 疑似误匹配) | **不重写**, 观察即可 | — |

**批 1 规则**: zh-hk title ≤30 汉字 (约 60 字符) / en title 50-60 字符; meta 含 1 个数字 + 1 个差异点 + 1 个 CTA; 严守 §13.10 (zh-hk 写香港场景, en 不带 Shenzhen/Hong Kong 硬塞)。

### 批 2 (下周, pos 1-10 剩余品类词 ~25 词)

信封顏色/半透明貼紙/印傳單價格/印海報價錢/海報尺寸/a2ポスター/can badge size/ロールアップバナー/同人印刷/同人本印刷/賀卡印刷/戶外防水貼紙/合成紙貼紙/kraft paper box/畢業紀念冊香港/a0海報價格 等 — 同一公式批量套, M3 按批 1 模板执行。

### 批 3 (第 3 周, pos 1-10 低展示长尾 ~29 词)

单 imps 词, 不单独重写, 随所属页面批 1/批 2 更新自然覆盖。

---

## §3 Blog 轮子: 要不要动 → 要, 但换打法

**事实**: blog-posts.ts 现 82 条 (K3 看到 79, 差 3 条是 8/20-8/24 新增未注意)。最近新增集中在 8/20(×3)/8/22/8/24 — 不是完全停摆, 但确实从 v3.15 起 dedicated blog cron 停了约 1 个月, 且新增都是 SEO 补丁性质, 不是流量文。

**重启方案 — 每周 2-3 篇, 只写 money word 配套文** (不再是行业矩阵铺量):

| 周 | 篇目 (zh-hk 主, en/ja 同步) | 服务词 |
|----|------------------------------|--------|
| W1 | 即日急件印刷全攻略: 邊度最快? 幾錢? 幾點截單? | 即日急件 (25.2→首页) |
| W1 | 包裝盒印刷價格 2026: 500/1000/5000 個分別幾錢 | 包裝盒印刷/訂製 |
| W2 | 貼紙材質點揀: PVC/透明/可移/燙金 一篇睇晒 | 貼紙訂製/防水貼紙 |
| W2 | How Much Does Catalog Printing Cost from China? (bulk/wholesale) | catalog 集群 |
| W3 | 月曆印刷 2027 訂製時間表: 幾時落單最抵 | 月曆 (9/15 硬截止配套) |
| W3 | MTR 燈箱海報規格 + 印刷文件要求 | 印海報/海報印刷 |

每篇仍守 §13.4: 9 段结构 + 4 FAQ + 3 locale + 无图。

---

## §4 GSC "网址检查 → 请求编入索引" 10 个具体 URL

**时机: 批 1 title/meta 上线 + verify-deploy PASS 之后** (让 Google 重抓时直接吃到新 snippet):

```
1.  https://zprintpro.com/zh-hk/services/rush-printing-delivery/   (即日印刷/即日急件)
2.  https://zprintpro.com/zh-hk/category/envelopes/                (大信封 pos 2 CTR 修复)
3.  https://zprintpro.com/zh-hk/category/posters/                  (印海報/海報印刷)
4.  https://zprintpro.com/zh-hk/product/a2-posters/                (A2 转化王加固)
5.  https://zprintpro.com/zh-hk/category/stickers/                 (貼紙集群)
6.  https://zprintpro.com/zh-hk/category/packaging/                (包裝盒大词)
7.  https://zprintpro.com/zh-hk/category/calendars/                (月曆 9/15)
8.  https://zprintpro.com/zh-hk/insights/hk-print-inquiry-index/   (G1 指数页)
9.  https://zprintpro.com/en/category/books/                       (catalog/book 海外大单)
10. https://zprintpro.com/en/blog/catalog-printing-china-supplier-guide/  (china catalog 18.5)
```

操作: GSC 顶部搜索框粘贴 URL → 网址检查 → "请求编入索引"。每个约 30 秒, 每天配额 ~10 个, 正好一天做完。

---

## §5 立即动作 (等 K3 1 句确认即可开工)

1. **M3 今天跑 008 SQL** (Supabase key 已通) — 验证询盘表 + WhatsApp 埋点落库, 8/29 基线首报
2. **批 1 十五词 title/meta 重写** (§2 草稿, K3 过目后 M3 落地, 1 commit)
3. **Blog W1 两篇** (即日急件 + 包裝盒價格)
4. 上线后 K3 真人做 §4 的 10 条 URL 请求编入 (5-10 分钟)

*整理: 2026-08-26 / 数据: gsc_data.csv 527 词 + K3 转化情报 / 0 代码改动*
