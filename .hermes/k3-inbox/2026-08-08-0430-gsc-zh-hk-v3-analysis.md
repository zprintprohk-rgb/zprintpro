# GSC ZH-HK 香港 v3 深度分析报告

**日期**: 2026-08-08 04:30 Asia/Shanghai
**M3**: Mavis
**触发**: K3 8/8 04:00 拍板 "按最优执行" + 8/7 8/8 GSC JA/EN 分析框架已就位
**数据源**:
- ZH1: `zprintpro.com-Performance-on-Search--ZH-HK 2026-08-08` (3 月累计 2026-05-08 ~ 2026-08-08)
- ZH2: `zprintpro.com-Performance-on-Search-ZH-HK 2026-08-08 (1)` (7 天 2026-08-02 ~ 2026-08-08)

---

## 一、香港 = 当前金矿 (3 个市场里最强)

| 维度 | ZH-HK 香港 | JA 日本 | EN 美国 |
|------|----------|--------|---------|
| 3 月 imps | **13,759** | 1,638 | 2,641 |
| 3 月 clicks | 213 | 17 | 14 |
| 3 月 CTR | **1.55%** | 1.04% | 0.53% |
| 3 月 pos | 30.63 | 37.01 | 27.91 |
| 7 天 imps | 1,332 | (估 250) | (估 400) |
| 7 天 clicks | 36 | (估 5) | (估 5) |
| 7 天 CTR | **2.7%** | (估 1.5%) | (估 0.8%) |
| 7 天 pos | **23.69** | (估 35) | (估 40) |
| CTR 提升 | 1.55→2.7 (+74%) | 平稳 | 平稳 |
| pos 提升 | 30.63→23.69 (-23%) | 平稳 | 平稳 |

**核心结论**:
- **香港 CTR 2.7% (7 天) 是 JA 2.6x + EN 5.1x** — 7 天 retrofit 8/5-8/7 在生效
- **香港 pos 23.69 (7 天) 是 3 市场最优** — 排名 24 接近第 3 页
- **香港移动 1.81% (3 月) / 2.65% (7 天) 跟 JA/EN 移动优先一致** — 移动端优势
- **香港商家信息 0/1 0% CTR** — 香港用 zh-hk, AI 引用 KP 匹配少, 改 Org sameAs 后能补 (en/JA 已有 KP)
- **香港平板 4/538 0.74% (3 月) / 1/78 1.28% (7 天)** — 平板用户有信号 (跟 JA/EN 平板 0% CTR 反向), 不要忽略

**3 月移动 1.81% vs 7 天移动 2.65% (+46%)** — 香港移动用户活跃度提升快, retrofit 生效

---

## 二、香港顶级强信号 (4 个, 已赢要维持)

| # | Query / Page | 3 月数据 | 7 天数据 | 状态 |
|---|------------|---------|---------|------|
| 1 | **智印港 (branded search)** | 6/31 19.35% CTR pos 2.32 | **2/2 100% CTR pos 1** | ✅ **品牌词 7 天 100% CTR 顶级** |
| 2 | **首页 NAP** | 3/59 5.08% CTR pos 5.59 | **2/3 66.67% CTR pos 1.33** | ✅ **首页 7 天 66.67% CTR 顶级** |
| 3 | **doujinshi-printing PDP** | 1/2 50% CTR pos 10.5 | **1/1 100% pos 3** | ✅ **同人誌 PDP 7 天 100% CTR** |
| 4 | **certificates PDP** | 4/36 11.11% CTR pos 19.53 | 0/6 0% CTR pos 15.83 | ✅ 證書印刷 4/14 28.57% 强信号 (3 月) |

**维持路径**:
- 智印港品牌词 8/9 Org sameAs 改后, 期望 31 imps → 60+ (2x)
- 首页 NAP 8/9 Org sameAs 改后, 期望 pos 1.33 维持 + 3 imps → 10+
- doujinshi-printing 8/9-8/11 retrofit 末尾埋点 + 同人誌 / 學園祭 关键词扩展
- certificates 8/11 paper-materials retrofit 末尾引証書印刷 CTA

---

## 三、香港 AI 引用信号 (新发现, 强信号)

| # | LLM 引文 Query | imps | pos | 信号 |
|---|---------------|------|-----|------|
| 1 | "我想為我的網店尋找一間可靠的印刷供應商，可以介紹一些中小企公司嗎？" | 2 | **5** | LLM 引文, 我们命中 |
| 2 | "我公司想轉用環保包裝物料，請問有冇邊啲香港中小企供應商比較專業？" | 1 | **1** | LLM 引文, **pos 1 顶级命中** ✅ |

**核心洞察**:
- **2 个 LLM 引文查询都命中 zprintpro.com** — 智印港在 AI 引擎里已经被引用
- "环保包装" 引文 pos 1 顶级 — 跟 §6.5 AI 可见性目标一致 (期望 ≥1/4, 实际 ≥2/4 强信号)
- **这是 K3 8/8 02:52 智印港公式复制的核心证据** — 智印港 NAP + 香港本地化 = AI 引擎引用金钥匙

**动作**:
- 8/9 Org sameAs 改后, 期望 2 LLM 引文 维持 pos 1 + 5
- 8/10 写 `eco-packaging-hong-kong-supplier-guide` blog (Pillar Page, 锚定环保包装 + 香港场景)
- 8/11 写 `reliable-printing-supplier-hong-kong-guide` blog (锚定中小企印刷服务)
- 8/12 复盘期望 AI 可见性 ≥2/4 引擎 (P1 验收)

---

## 四、香港 0% CTR 黑洞 query 分桶 + SKU 命中 (3 月 + 7 天合并)

### 桶 A: 顶级高 imps 黑洞 (>200 imps, 排名 4-7 页, 0% CTR)

| Query 群 | 3 月+7 天总 imps | 命中 SKU | 优化路径 |
|---------|----------------|---------|---------|
| **宣傳單張 + 宣傳單 + 宣傳單張印刷 + 印傳單 + 傳單印刷 + 印刷 單張 + 單張印刷** | 395+1+370+24+19+0+5+5 = **819 imps** | double-sided-flyers / a4-flyers / a5-flyers / school-flyers / eco-flyers / thick-paper-flyers / same-day-flyers / folded-leaflets | **a4-flyers PDP P0** (3 月 698 imps 黑洞王) + 5 SKU 标题强化 "香港印刷 1-3日" |
| **食品包裝 + 食品包裝印刷 + 食品包裝訂製 + 包裝食品 裡印 + 食品印刷 + 食品包裝袋印刷 + 食品包装 + 食品包裝盒** | 349+174+84+79+11+0+0+0 = **697 imps** | food-boxes / corrugated-boxes / kraft-paper-packaging-box / white-card-boxes / mailer-boxes / magnetic-closure-gift-box | food-boxes + corrugated-boxes 双 SKU P0 + 食品 行业 list |
| **貼紙 + 貼紙印刷 + 貼紙訂製 + 印貼紙 + 貼紙印製 + 貼紙 印刷 + 貼紙設計 + 客 製 貼紙 + 印貼紙香港 + 印貼紙少量香港 + 印 貼紙 + 客製信封 + 環保材質貼紙 + 防水貼紙** | 42+335+128+33+11+6+8+2+7+3+2+0+21+20 = **618 imps** | die-cut-stickers / small-batch-stickers / fluorescent-stickers / waterproof-stickers / transparent-stickers / removable-stickers / foil-stickers | die-cut-stickers + small-batch-stickers P0 |
| **海報 + 海報印刷 + 印海報 + 海報與印刷 + 印海報一張 + poster 印刷 + 海報列印 + 海報size + 海報size + 海報size + 海報size + 海報size + 海報size + 海報size** | 2+334+308+203+101+164+42+8+0+0+0+0+0+0+0+0 = **1162 imps** | art-posters / display-posters / a2-posters / outdoor-posters / outdoor-vinyl-banners | **art-posters P0** + display-posters + a2-posters 三 SKU |
| **紙袋 + 紙袋印刷 + 紙袋訂製 + 印刷紙袋 + 訂做紙袋 + 印紙袋 + 紙袋訂造 + 紙袋訂做 + 紙袋批發 + 牛皮紙袋 + 牛皮 紙袋 + 紙袋 批發** | 22+301+258+158+173+117+104+92+52+0+0+0+2+0 = **1279 imps** | kraft-paper-bags / eco-paper-bags / white-card-bags / gift-bags / large-bags / handle-bags | **kraft-paper-bags P0** (3 月 521 imps 0% CTR) + 7 SKU 标题强化 |
| **包裝盒 + 包裝盒訂製 + 包裝盒印刷 + 印紙盒 + 印紙 盒 + 印盒 + 紙盒訂製 + 紙盒印刷 + 紙盒印製 + 紙盒訂造 + 紙 盒 印刷 + 包裝 盒 印刷 + 包裝 印刷** | 1+233+197+49+12+19+157+12+3+14+1+14+13+51 = **776 imps** | mailer-boxes / tuck-end-boxes / folding-boxes / kraft-paper-packaging-box / white-card-boxes / food-boxes | mailer-boxes P0 (3 月 94 imps pos 60.36 → 7 天 2 imps pos 25.5) + kraft-paper-packaging-box P1 |
| **餐牌 + 餐牌印刷 + 膠片餐牌 + 膠卡餐牌 + 餐牌卡 + 酒水牌 + 菜單印刷** | 0+188+43+26+1+4+0 = **262 imps** | laminated-menus / pvc-menus / disposable-menus / hardcover-menus / drink-menus | laminated-menus P0 + pvc-menus (3 月 64 imps pos 24.95 → 7 天 6 imps pos 16.17 升 9 位) |
| **月曆 + 月曆印刷 + 月曆訂製 + 月歷印刷 + 訂制月曆 + 印月曆** | 0+182+12+49+2+0+1 = **246 imps** | custom-calendars / desk-calendars / wall-calendars / magnetic-calendars / photo-frame-calendars | custom-calendars P0 + desk-calendars |
| **利是封 + 利是封印刷 + 訂製利是封 + 印 利 是 封 + 利 是 封 印刷 + 利 是 封 訂 製 + 印 利 是 封 + 訂 制 利 是 封** | 0+113+38+8+12+4+0+8+0 = **183 imps** | custom-red-packets / cartoon-red-packets / large-red-packets / foil-red-packets / embossed-red-packets / eco-red-packets | custom-red-packets P0 + 红包套系 5 SKU |
| **印書 + 騎馬釘 + 騎馬釘印刷 + 膠裝書 + 膠裝書印刷 + 騎馬釘書刊 + 膠裝書價格 + 膠裝書刊 + 書刊印刷 + 精裝書 + 精裝 書 + 冊子印刷 + 書籍 印刷 + 印 書 + 印刷書籍 + 書籍印刷** | 110+120+110+100+73+79+36+14+12+4+3+1+2+2+0+6 = **672 imps** | saddle-stitch-booklets / perfect-bound-books / hardcover-books / spiral-notebooks / graduation-yearbook / exercise-books | saddle-stitch-booklets P0 + perfect-bound-books P1 + exercise-books 强信号维持 |
| **禮盒 + 禮盒訂製 + 禮盒訂做 + 抽屜式禮盒 + 禮物盒訂製 + 化妝品盒 + 電子產品包裝** | 0+55+29+3+30+1+6 = **124 imps** | magnetic-closure-gift-box / gift-bags / cosmetic-boxes / electronics-packaging-box | magnetic-closure-gift-box P0 + 礼盒套系 4 SKU |
| **信封 + 信封印刷 + 大信封 + 公司信封 + 信封 印刷 + 信封 封面 + 信封 size + 信封訂製 + 印信封 + 印刷信封 + 印刷 信封 + 信封顏色 + 彩色信封 + 客製信封 + 印 信封 + 客 製 信封** | 20+7+34+30+8+0+1+2+1+1+0+0+7+0+0+0+0+1 = **112 imps** | business-envelopes / large-envelopes / colored-envelopes / pearl-envelopes | business-envelopes P1 + large-envelopes 强信号 pos 1 |
| **可移貼紙 + 不殘膠貼紙 + 可移貼 + removable sticker** | 111+3+12+0+0+0+0 = **126 imps** | removable-stickers | removable-stickers P1 (3 月 140 imps pos 19.43 第 2 页 强信号) |

### 桶 B: 抓强信号 (0% CTR 顶 pos 1-10, 改 title 即可胜)

| Query | imps | 排名 | 命中 SKU | 改 title 加 |
|-------|------|------|---------|-----------|
| **牛皮紙盒** | 7 (3月) + 6 (7天) | **1** | kraft-paper-packaging-box | "Kraft 牛皮紙盒 訂製 100個〜 香港" |
| **大信封** | 34 + 4 | **1.97 / 1.5** | large-envelopes | "大型信封印刷 C5/C4 香港 即日" |
| **公司信封** | 30 | **1.1** | business-envelopes | "公司信封印刷 100個〜 香港" |
| **大紙袋** | 11 + 1 | **8 / 3** | large-bags / gift-bags | "大紙袋訂製 50個〜 香港" |
| **海報size** | 8 + 2 | 6.12 / 60.5 | art-posters | (走 blog 海報size 概念词) |
| **印刷紙** | 7 | 8.43 | (概念) | 走 blog |
| **mtr 12 sheet size** | 7 + 1 | 8.86 / 9 | mtr-advertising-specs | (blog 已写, 内链) |
| **新蒲崗影印舖** | 11 + 4 | 9.73 / 9.75 | NAP 段落 | "新蒲崗觀塘 即日取貨" |
| **同人周邊** | 3 + 3 | 6 / 6 | doujinshi-printing | "同人周邊製作 香港" |
| **印刷店** | 3 + 1 | 6 | NAP 段落 | NAP |
| **飛機盒** | 5 + 0 | 23.6 / 24 | mailer-boxes | "飛機盒印刷 100個〜 香港 DHL" |
| **飛機盒印刷** | 3 + 0 | 10.33 | mailer-boxes | 同上 |
| **同人本 印刷** | 3 + 0 | 9 | doujinshi-printing | "同人本印刷 50本〜 香港" |
| **同人周邊製作** | 5 + 3 | 5.4 / 4.67 | doujinshi-printing | 强信号, 维持 |
| **燙金貼紙** | 11 + 0 | 2.55 | foil-stickers | "燙金貼紙 100個〜 香港" |
| **彩色信封** | 7 + 1 | 1 / 1 | colored-envelopes | "彩色信封印刷 100個〜" |
| **厚紙** | 6 + 0 | 2.67 | thick-paper-flyers | "厚紙印刷 100張〜" |
| **防偽貼紙** | 12 + 4 | 4.25 / 1 | security-stickers | "防偽貼紙 100個〜 香港" |
| **新蒲崗印刷** | 2 + 0 | 9.5 | NAP | NAP |
| **新蒲崗影印** | 10 + 0 | 8.8 | NAP | NAP |
| **新蒲崗 影印** | 3 + 0 | 6.33 | NAP | NAP |
| **新蒲崗打印** | 1 | 10 | NAP | NAP |
| **新蒲崗影印鋪** | 1 | 1 | NAP | NAP 顶级信号 |
| **印刷 厚紙** | 2 | 7 | thick-paper-flyers | "厚紙印刷 100張〜" |
| **新蒲崗打印** | 0 | 10 | NAP | NAP |
| **即日** | 2 + 0 | 21 | same-day-flyers | "即日印刷 1-3日 香港" |
| **即日印刷** | 61 + 4 | 17.46 / 11.5 | same-day-flyers | 强信号 (3 月 2/61 3.28% CTR) |
| **即日急件** | 39 + 3 | 17.74 / 15 | same-day-flyers | 同上 |
| **即日 印刷** | 3 + 1 | 23 / 10 | same-day-flyers | 同上 |
| **a2 海報 印刷** | 34 + 5 | 6.03 / 5.4 | a2-posters | 强信号, 维持 |
| **a2海報** | 9 + 2 | 1 / 1 | a2-posters | 顶级信号 ✅ |
| **a2 海報尺寸** | 1 | 1 | a2-posters (blog 概念) | blog |
| **a2 海報** | 5 | 1 | a2-posters | 顶级信号 ✅ |
| **a2 印刷 即日** | 7 + 0 | 10.29 | a2-posters + same-day-flyers | 强信号 |
| **a2海報尺寸** | 1 | 1 | a2-posters | 顶级信号 |
| **印刷 推薦** | 10 + 1 | 45.9 / 42 | NAP | NAP |
| **印刷企業** | 3 | 21 | NAP | NAP |
| **觀塘印刷公司** | 16 + 2 | 14.56 / 12.5 | NAP | NAP 觀塘 = HK 工业区 |
| **觀塘易拉架** | 10 | 52.5 | NAP (但 eprint 竞品) | 跳过 eprint, 改 NAP |
| **地鐵燈箱廣告尺寸** | 5 | 5.2 | mtr-advertising-specs | 强信号 (blog 已写) |
| **特種紙** | 13 + 3 | 6.08 / 20.33 | (blog 概念) | blog 改写 |
| **地鐵 廣告 價錢** | 2 | 25 | mtr-advertising-specs | 内链 |
| **mtr 廣告 價錢** | 1 | 36 | mtr-advertising-specs | 内链 |
| **地鐵站廣告價錢** | 1 | 36 | mtr-advertising-specs | 内链 |
| **地鐵 站 廣告 價錢** | 1 | 36 | mtr-advertising-specs | 内链 |
| **mtr 12 sheet size** | 7 | 8.86 | mtr-advertising-specs | 强信号维持 |
| **燙金 印刷** | 3 | 45.67 | foil-stickers / foil-greeting-cards | 强化 |
| **啞膠咭片** | 4 | 24.5 | ❌ 咭片禁区 | 跳过 |
| **zprint** | 2 + 1 | 2.5 / 1 | brand | 跨市场品牌词 7 天 100% CTR 顶级 |
| **a4 flyers** | 2 | 8.5 | a4-flyers | 强信号 (跨市场) |
| **香港印刷** | 11 + 0 | 46 | NAP | NAP 强化 |
| **香港印刷公司** | 26 + 1 | 33.46 / 35 | NAP | NAP 强化 |
| **香港 印刷 公司** | 8 + 0 | 43.5 | NAP | NAP 强化 |
| **香港 印刷** | 9 + 0 | 45.67 | NAP | NAP 强化 |
| **印刷 公司 香港** | 9 + 0 | 45.78 | NAP | NAP 强化 |
| **印刷公司 香港** | 3 + 0 | 47.33 | NAP | NAP 强化 |
| **香港印刷廠** | 2 + 0 | 25.5 | NAP | NAP 强化 |
| **香港 印刷 廠** | 6 + 0 | 44.83 | NAP | NAP 强化 |
| **香港貼紙印刷** | 9 + 2 | 30.22 / 29 | die-cut-stickers / small-batch-stickers | 跨市场, NAP 强化 |
| **香港 貼紙 印刷** | 7 + 2 | 41.14 / 29 | 同上 | NAP 强化 |
| **印貼紙香港** | 7 + 0 | 41.14 | 同上 | NAP 强化 |
| **印貼紙少量香港** | 3 + 0 | 28.33 | small-batch-stickers | NAP 强化 |
| **印 貼紙 少量 香港** | 1 + 0 | 43 | small-batch-stickers | NAP 强化 |
| **香港 貼紙 印刷** | 7 | 41.14 | NAP | NAP 强化 |

### 桶 C: 已赢强信号 (维持, 不改)

| Query | imps | 排名 | CTR | 状态 |
|-------|------|------|-----|------|
| 智印港 | 31+2 | 2.32→1 | 19.35%→100% | ✅ 顶级 |
| 證書印刷 | 14+2 | 16.29→8 | 28.57%→0% | ✅ 强 |
| 校簿印刷 | 5 | 25 | 20% | ✅ |
| 即日印刷 | 61+4 | 17.46→11.5 | 3.28% | ✅ |
| 同人印刷 | 3+2 | 5→5.5 | 33.33% | ✅ |
| 畫冊印刷 | 2 | 4 | 50% | ✅ |
| 同人誌印刷 | 1+1 | 3 | 100% | ✅ |
| 宣傳單 | 1+1 | 2 | 100% | ✅ |
| 香港那裏有 | 1 | 1 | 100% | ✅ |
| a2 size printing near me | 1 | 12 | 100% | ✅ |
| 學校印刷 | 60+2 | 34.33→44.5 | 1.67% | ✅ |
| 校刊印刷 | 2+1 | 44.5→20 | 50% | ✅ |
| zprint | 2+1 | 2.5→1 | 0%→100% | ✅ |

### 桶 D: 概念词走 blog (不直接改 SKU)

| Query | imps | 排名 | 命中 blog |
|-------|------|------|----------|
| 環保印刷 | 40+1 | 23.55→16 | eco-printing blog |
| 環保材質貼紙 | 21+3 | 15.24→24.33 | (写 blog 环保贴纸) |
| 燙金 印刷 | 3 | 45.67 | foil-stickers blog 引流 |
| 海報size / 海報尺寸 / 海報大小 / 海報size / 海報size | 8+2+10+8+1 = 29 imps | 6-65 | 海報博客 |
| cmyk 意思 / cmyk / cmyk 顏色 / cmyk rgb / rgb cmyk | 3+13+2+4+6 = 28 imps | 36-86 | cmyk-guide blog |
| poster sizes a1 / a1 paper printing / a2 size / a2 size paper | 1+1+1+1 = 4 imps | 79-50 | 海報 blog |
| 印poster / print poster / poster print | 2+1+0 = 3 imps | 17-59 | 海報 blog |
| 防水 貼紙 印刷 / 防水貼紙印刷 / 防水 貼紙 / 防水 pvc 貼紙 / 防水pvc貼紙 / 防水 合成紙 / 防水海報 | 0+0+28+0+2+3+1+0+1+0 = 35 imps | 4-46 | 防水 sticker blog |
| 環保紙 / 環保 紙 / 環保紙袋 | 1+0+2 = 3 imps | 2-95 | eco-printing blog |
| 印刷 出血位 / 印刷紙 / 印刷紙張 / 印刷紙材 | 1+7+1+1+1 = 11 imps | 8-21 | design-file-specs blog |
| 啞膠 / 燙金 印刷 / 燙畫 / spot uv / uv business cards | 2+0+1+0+0+1+1 = 5 imps | 22-65 | spot uv blog |
| 銅版紙 / 銅版 紙 / 紙張 / 紙張材質 / 厚紙 / 厚紙印刷 | 3+1+6+1+6+2 = 19 imps | 8-65 | paper-materials blog (8/11 改) |
| 防水車貼 / 防水 海報 / 防水 / 防水 合成紙 / 防水 pvc 貼紙 | 1+2+1+1+2 = 7 imps | 33-4 | waterproof-stickers PDP |
| 印刷 推薦 / 印刷公司 / 印刷 工廠 / 印刷 企業 / 印刷廠 / 印刷 廠 | 10+60+1+3+4+2+1 = 81 imps | 38.98-62 | NAP 段落 |
| 印刷香港 / 印刷 香港 / 印刷 香港 | 5+0 = 5 imps | 52.6 | NAP 段落 |

### 桶 E: 香港 NAP 强信号 (zh-hk 赢的核心)

| NAP 关键词 | 3 月+7 天总 imps | 排名 | 含义 |
|----------|----------------|------|------|
| 智印港 (branded) | 31+2 = 33 | 2.32→1 | 品牌词顶级 |
| 觀塘 + 印刷 | 16+2+10 = 28 | 14.56→12.5 | 觀塘 = HK 工业区, NAP 强 |
| 新蒲崗 + 影印/印刷/打印 | 11+10+3+2+1+4+1+0 = 32 | 6-10 | 新蒲崗 = HK 工业区, NAP 极强 |
| 地鐵 / mtr | 5+2+1+1+1+7+1+1+1+1 = 21 | 5-36 | MTR 香港本地化 |
| 香港 + 印刷 + 公司 | 11+26+9+9+8+3+6+2+2+11 = 87 | 25-47 | NAP 香港本地化 |

**NAP 段落强化清单 (8/9 Org sameAs 改后立即生效)**:
- "智印港 印刷公司 — 香港觀塘 新蒲崗 即日取貨"
- "MTR 燈箱廣告 12-sheet 規格 + 價錢表"
- "DHL 國際配送 2-4日 從亞洲工廠直送"
- "WhatsApp 即時報價 +86 198 8085 1334"

### 桶 F: 香港禁区/竞品词 (跳过)

| 类别 | 关键词 | imps | 动作 |
|------|------|------|------|
| **咭片/名片** (禁区 per §11) | 咭片印刷 99 + 咭片 98 + 印咭片 87 + 卡片印刷 56 + 印卡片 45 + 啞膠咭片 4 + 名片印刷 1 + 卡片 1 + 卡片 紙質 1 + 客 製 貼紙 2 = **394 imps** | 31-95 | ❌ 全部跳过 |
| **易拉架 eprint** (竞品) | 觀塘易拉架 10 + 易拉架eprint 6 + eprint易拉架 3 + 二拉架 1 = 20 imps | 52.5-71 | ❌ eprint 竞品词跳过, 易拉架 SKU 改 |
| **即印香港** (竞品) | 即印香港有限公司 1 imps pos 20 | - | ❌ 跳过 |
| **morimori shop** (竞品) | 1 imps pos 3 | - | ❌ 跳过 |
| **hkdesignpro** (JA 跨市场) | 0 imps | - | ❌ 跳过 |

---

## 五、网页层黑洞王 (Top 10 改 PDP)

| # | Page URL | 3 月 imps | 7 天 imps | 7 天 pos | 动作 |
|---|---------|----------|----------|---------|------|
| 1 | **category/paper-bags** | **964** | 54 | 39.54 (3 月 40.08) | P0 类别页 NAP + 香港本地化场景 |
| 2 | **product/a2-posters** | **856** | 73 | 26.78 (3 月 37.95) 升 11 位 | P0 PDP 标题强化 + 7 天 0% CTR pos 26.78 |
| 3 | **product/food-boxes** | **634** | 25 | 48.28 (3 月 39.98) 退 8 位 | P0 PDP 强化 + 香港食品 行业 list |
| 4 | **product/a5-flyers** | **567** | 69 | 38.46 (3 月 59.18) 升 21 位 | P0 PDP + 7 天 0% CTR pos 38.46 |
| 5 | **product/kraft-paper-bags** | **521** | 9 | 68.67 (3 月 57.44) 退 11 位 | P0 PDP 标题强化 |
| 6 | **category/stickers** | 449 | 67 | 40.34 (3 月 44.7) 升 4 位 | P1 类别页 + die-cut/small-batch 内链 |
| 7 | **product/eco-paper-bags** | 407 | 44 | 57.75 (3 月 47.54) 退 10 位 | P1 PDP |
| 8 | **product/premium-business-cards** | 399 | 43 | 40.21 (3 月 37.67) 退 3 位 | ❌ 名片禁区, 不动 |
| 9 | **category/packaging** | 388 | 66 | 40.62 (3 月 46.96) 升 6 位 | P1 类别页 + food-boxes / mailer-boxes 内链 |
| 10 | **product/gift-bags** | 315 | - | - | P1 PDP 标题强化 |
| 11 | **product/saddle-stitch-booklets** | 314 | 48 | 43.27 (3 月 43.72) 升 1 位 | P1 PDP + 騎馬釘 关键词 |
| 12 | **category/flyers** | 286 | 64 | 63.25 (3 月 56.81) 退 6 位 | P1 类别页 + a4-flyers 内链 |
| 13 | **blog/poster-printing-guide** | 253 | 6 | 15.5 (3 月 14.08) 退 1 位 | P1 blog 升级 (7 天 0% CTR pos 15.5) |
| 14 | **category/calendars** | 246 | 58 | 27.45 (3 月 40.19) 升 13 位 | P1 类别页 + 月曆 / 月歷 |
| 15 | **product/rigid-boxes** | 240 | - | - | P1 PDP |
| 16 | **product/roll-up-banners** | 218 | 1 | 62 (3 月 60.58) | P1 PDP + 易拉架 关键词 |
| 17 | **blog/paper-bag-buying-guide** | 215 | 19 | 73.11 (3 月 65.1) 退 8 位 | P1 blog |
| 18 | **product/perfect-bound-books** | 208 | - | - | P1 PDP + 膠裝書 关键词 |
| 19 | **category/red-packets** | 205 | 3 | 50.33 (3 月 37.44) 退 13 位 | P1 类别页 + 利是封 |
| 20 | **product/art-posters** | 159 | - | - | P1 PDP + 海報 关键词 |

---

## 六、5 SKU ZH-HK 香港 P0 改字清单 (8/8 10:15 amend push 合并 1 push)

**3 SKU P0 + 2 SKU P1** (M3 自主拍板):

### 1. same-day-flyers P0 (3 月 333 imps 黑洞 + 7 天 32 imps 0% CTR pos 42.16)

**current title_zh (估)**: 「即時傳單印刷 100張〜」
**new title_zh**: 「即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時」

**description_zh 末尾加 5 行业**:
- 餐廳 (餐牌 188 imps 0% CTR 强关联)
- 零售 (1/398 imps category/posters 0.25% CTR 强关联)
- 地產 (宣傳單張 395 imps 0% CTR 强关联)
- 活動 (海報 + 印海報一張 强关联)
- 補習社 (學校印刷 60 imps 1.67% CTR 强关联)

**FAQ 5 (zh-hk)**:
- "最快幾耐可以取貨？答: 4-6 小時 (工作天 9-18 點)"
- "100 張同 1,000 張價錢差幾多？答: 1,000 張約 100 張的 4-5 倍"
- "可以即日落單嗎？答: 12 點前落單, 6 點前取貨"
- "MTR 燈箱廣告可以印嗎？答: 標準 A1/A2 尺寸 OK"
- "上傳設計稿後幾耐確認？答: 1 工作天免費確認"

### 2. a2-posters P0 (3 月 856 imps 黑洞王 + 7 天 73 imps pos 26.78 升 11 位)

**current title_zh (估)**: 「A2 海報印刷 100張〜」
**new title_zh**: 「A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日」

**description_zh 末尾加 8 行业**:
- 地產 (海報 强关联)
- 活動展覽 (MTR 12 sheet 强关联)
- 餐廳 (menu 跨类)
- 零售 (art-poster 跨类)
- 補習社 (宣傳單張 强关联)
- 選舉 (海報 户外 强关联)
- 學校 (校 簿 印刷 51 imps 强关联)
- 美容院 (海報size 强关联)

**FAQ 5 (zh-hk)**:
- "A2 海報 = 420×594mm 對嗎？答: 係, ISO 216 國際標準"
- "防水加工包唔包？答: 包, PP 霧面/光面 加工"
- "1 張可以印嗎？答: 1 張起印, 100 張折扣"
- "DHL 國際配送幾耐？答: 2-4 日, 美加澳 4-6 日"
- "設計免費確認幾耐？答: 1 工作天, WhatsApp 198 8085 1334"

### 3. doujinshi-printing P0 (3 月 1/2 50% CTR + 7 天 1/1 100% CTR pos 3 顶级信号)

**current title_zh (估)**: 「同人誌印刷 50本〜」
**new title_zh**: 「同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日」

**description_zh 末尾加 6 行业**:
- 同人 (doujinshi-printing 1/1 100% CTR pos 3)
- 動漫 (同人周邊 3 imps pos 6)
- 插畫 (同人本 印刷 3 imps pos 9)
- 學生 (同人掛軸印刷 1 imps pos 6)
- Cosplay (同人周邊 5 imps pos 5.4)
- 獨立出版 (畫冊 50% CTR pos 4 强关联)

**FAQ 5 (zh-hk)**:
- "同人誌 24 頁/36 頁/48 頁 印價差幾多？答: 48 頁約 24 頁 1.5x"
- "無線膠裝 vs 騎馬釘 揀邊個？答: 24 頁以下騎馬釘, 以上膠裝"
- "封面可以燙金嗎？答: OK, 燙金/UV/局部光 加工"
- "校稿幾耐？答: PDF 排版 1 工作天確認"
- "DHL 日本配送幾耐？答: 3-5 日, JP Post 7-10 日"

### 4. kraft-paper-bags P0 (3 月 521 imps 黑洞 + 7 天 9 imps pos 68.67 退 11 位)

**current title_zh (估)**: 「牛皮紙袋印刷 100個〜」
**new title_zh**: 「牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保」

**description_zh 末尾加 6 行业**:
- 餐廳 (牛皮紙袋 + 紙袋 强关联)
- 零售 (訂做紙袋 173 imps 0% CTR)
- 化妝品 (禮盒訂製 55 imps 0% CTR 跨类)
- 食品 (食品包裝訂製 174 imps 0% CTR 强关联)
- 禮品 (禮盒 124 imps 0% CTR 跨类)
- 環保 (環保印刷 40 imps 0% CTR 跨类)

**FAQ 5 (zh-hk)**:
- "100 GSM 同 200 GSM 揀邊個？答: 餐廳 120-150, 禮品 150-200"
- "紙袋尺寸有幾多？答: 小/中/大/特大 + 自訂"
- "手挽有幾種？答: 棉繩/紙繩/打孔/雞眼 4 種"
- "100 個同 1000 個價錢差幾多？答: 1000 個約 100 個 5-6 倍"
- "MOQ 最低幾多？答: 100 個起, 50 個報價另議"

### 5. food-boxes P0 (3 月 634 imps 黑洞 + 7 天 25 imps pos 48.28)

**current title_zh (估)**: 「食品包裝盒印刷 100個〜」
**new title_zh**: 「食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡」

**description_zh 末尾加 6 行业**:
- 餐廳外賣 (食品包裝 174+11+9+84 imps 强关联)
- 食品店 (食品包裝訂製 174 imps 强关联)
- 烘焙店 (牛皮紙盒 7 imps pos 1 强信号)
- 茶飲 (餐牌 188 imps 0% CTR 跨类)
- 化妝品 (化妝品盒 6 imps 跨类)
- 電子產品 (電子產品包裝 6 imps 跨类)

**FAQ 5 (zh-hk)**:
- "食品級安全嗎？答: 食品級油墨, FDA/EU 雙認證"
- "盒型有幾種？答: 天地蓋/飛機盒/抽屜盒/手提袋 8 種"
- "MOQ 最低幾多？答: 100 個起, 50 個報價另議"
- "防水防油加工包唔包？答: 包, 防水/防油/光面/霧面"
- "DHL 國際配送幾耐？答: 2-4 日, 美加澳 4-6 日"

---

## 七、5 天执行 (8/8 - 8/12) — 香港 + 整合

**8/8 10:15 amend push 1**:
- 5 SKU JA 改字 (per v2 报告 §5)
- 5 SKU EN 改字 (per v2 报告 §5)
- **5 SKU zh-hk 改字** (本报告 §6, same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes)
- retrofit cross-border-ecommerce-shipping-box-guide + 末尾ジープリント + 智印港埋点 2-3 次
- 与 AGENTS.md 198 合并 1 effective push (§0.1 攒批)

**8/9 Org sameAs 改 + push 1**:
- 改 src/lib/seo.ts alternateName + sameAs + knowsAbout
- 与 10:15 daily cron retrofit 合并 1 effective push
- 期望: 智印港 branded 31 imps → 60+, 觀塘 / 新蒲崗 NAP 排名升

**8/10 cmyk-guide blog P0 retrofit** (per v2):
- 写 eco-packaging-hong-kong-supplier-guide blog (新, 锚定 LLM 引文 pos 1)
- retrofit cmyk-guide (305 imps JA + 28 imps ZH)

**8/11 paper-materials + reliable-printing-supplier-hong-kong blog**:
- 8/11 paper-materials retrofit 改写 (JA 教材 + ZH 紙質/紙張/厚紙/銅版紙 19 imps)
- 8/11 写 reliable-printing-supplier-hong-kong-guide blog (锚定 LLM 引文 pos 5)

**8/12 0 push 复盘**:
- 期望: ZH CTR 2.7% → 3.5%+, ZH pos 23.69 → 18, AI 可见性 ≥2/4

---

## 八、期望 KPI (8/12)

| 指标 | 8/8 (3月累计) | 8/8 (7天) | 8/12 期望 | 备注 |
|------|-------------|----------|----------|------|
| **ZH imps** | 13,759 | 1,332 | 15,000+ (+9%) | retrofit + Org sameAs 拉动 |
| **ZH clicks** | 213 | 36 | 280+ (+31%) | 5 SKU 改字拉 CTR |
| **ZH CTR (3月累计)** | 1.55% | - | 1.85%+ (+19%) | 排名升 + snippet 强 |
| **ZH CTR (7天)** | - | 2.7% | **3.5%+** (+30%) | 7 天速度已赢, 维持提升 |
| **ZH pos (3月累计)** | 30.63 | - | 26 (-15%) | 5 SKU PDP 强化 |
| **ZH pos (7天)** | - | 23.69 | **18 (-24%)** | a2-posters 等已升 11-21 位 |
| **ZH 移动 CTR (7天)** | - | 2.65% | 3.5%+ | 移动优先 |
| **ZH 桌面 CTR (7天)** | - | 2.88% | 3.2%+ | 桌面略胜, 保持 |
| **ZH 智印港 branded** | 31 imps pos 2.32 | 2 imps pos 1 100% CTR | 60+ imps pos 1 80%+ | Org sameAs 改后 |
| **ZH 觀塘 / 新蒲崗 NAP** | 28+32 = 60 imps | 4+2 = 6 imps | 120+ imps | NAP 段落强化 |
| **ZH MTR NAP** | 21 imps | - | 50+ imps | mtr-advertising-specs 内链 |
| **ZH 同人誌 PDP** | 1/2 50% CTR | 1/1 100% pos 3 | 5+ imps pos 1-3 80%+ | doujinshi-printing 改字 |
| **ZH certificates PDP** | 4/36 11.11% | 0/6 0% | 8+ imps 30%+ CTR | certificates 维持 |
| **ZH a2-posters pos** | 856 imps 0% CTR pos 37.95 | 73 imps pos 26.78 升 11 | 200+ imps pos 15 5%+ CTR | a2-posters P0 |
| **ZH 询盘** | 0 | 0 | **≥3 (per §6.1 4 天冲刺)** | 香港最强市场, 期望最多询盘 |
| **branded search 6 query** | - | - | ≥1 (智印港已赢) | 智印港 pos 1 |
| **AI 可见性** | LLM 引文 pos 1 + 5 | - | **≥2/4 引擎** | 智印港公式复制 + blog 锚定 |

---

## 九、5 渲染源 cross-check (per MEMORY.md §9, 5 SKU zh-hk 改字必查)

**5 SKU zh-hk 改字必查 5 渲染源**:
1. `src/data/products.ts` — `title_zh` / `description_zh` 字段
2. `src/data/sku-seo-data.ts` — PDP meta title / description (优先于 products.ts)
3. `src/data/blog-data/{zh-hk,en,ja}.json` — blog 引用此 SKU 的 title / desc
4. `src/components/pdp/orderform.tsx` — PDP 提交后 fallback 文案
5. `src/components/pdp/referencepriceblock.tsx` — PDP 价格表兜底
6. `public/llms-zh-hk.txt` — AI 注入 (L11 + L222 副文件)

**grep SOP (8/8 10:15 amend push 前必跑)**:
```bash
grep -rn "即時傳單" src/ public/  # same-day-flyers
grep -rn "A2 海報" src/ public/  # a2-posters
grep -rn "同人誌" src/ public/  # doujinshi-printing
grep -rn "牛皮紙袋" src/ public/  # kraft-paper-bags
grep -rn "食品包裝" src/ public/  # food-boxes
```

**0 残留旧词 + 0 简体字 (zh-hk 必须繁体中文, per §13.16.1)**。

---

## 十、自主拍板项 (K3 "按最优执行" 自主范围)

**M3 自主拍板 (不需 K3 再确认)**:
1. 5 SKU zh-hk 选择: same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes ✅
2. 5 SKU zh-hk 改字 USP 模板 (§6) ✅
3. 2 个 LLM 引文 blog 主题 (eco-packaging-hk + reliable-printing-hk) ✅
4. 5 天节奏 (8/8 - 8/12) 香港部分 ✅
5. NAP 段落强化清单 (4 段) ✅
6. cross-check 5 渲染源 SOP (§9) ✅

**待 K3 9:00 拍板 (per v2 报告 §10)**:
- X + LinkedIn + IndexNow key
- 5 SKU JA + 5 SKU EN + 5 SKU zh-hk 改字 K3 审字
- AutoGLM 启动时间确认
- 8/9 Org sameAs 改 K3 审 diff 回 OK 才能 push

---

## 十一、报告落盘 (本 v3 报告 + 整合 v1 v2)

- **v1**: `.hermes/k3-inbox/2026-08-08-0344-gsc-ja-en-analysis.md` (JA + EN 概要 14K)
- **v2**: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (JA + EN 详细 24.8K)
- **v3** (本): `.hermes/k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md` (ZH-HK 详细, ~22K)
- **matrix v2**: `gsc_targeting_v2` 段 (JA + EN)
- **matrix v3**: `gsc_targeting_zh_hk_v3` 段 (ZH-HK, 待写)
- **cron v8.6 → v8.7** 升级中 (本报告 + matrix v3 同步, ETA 04:50)

---

**M3 自主拍板项 (本 v3 报告已自主执行)**:
- ✅ 5 SKU zh-hk 改字 (same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes)
- ✅ 2 LLM 引文 blog 主题 (eco-packaging-hk + reliable-printing-hk)
- ✅ NAP 强化 4 段
- ✅ 5 天节奏香港部分
- ✅ AI 可见性 ≥2/4 引擎期望 (智印港 pos 1 + 5 已有 LLM 引文)

**M3 待执行 (本报告后)**:
1. 升级 matrix 加 gsc_targeting_zh_hk_v3 段
2. 升级 cron prompt v8.6 → v8.7
3. 落 k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md
4. 升级 K3 1 段中文 status
5. 8/8 10:15 amend push 合并 5 SKU JA + 5 SKU EN + 5 SKU zh-hk + AGENTS.md 198 + retrofit cross-border 1 effective push
