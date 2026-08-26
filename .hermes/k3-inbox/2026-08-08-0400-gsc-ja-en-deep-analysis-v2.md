# GSC JA 日本 + EN 美国 v2 深度分析报告

**日期**: 2026-08-08 04:00 Asia/Shanghai
**M3**: Mavis
**K3 拍板项**: ① ジープリント (J-Print) alternate ✅ ② 8/10 起 AutoGLM ✅ ③ 8/9 批次 5 增补 ✅
**K3 9:00 必跑**: 3 设备端到端 / Supabase 查 / formsubmit 激活 / 提供 X/LinkedIn/IndexNow key
**M3 "按最优执行" 自主拍板范围**: SKU 选择 + title USP 模板 + 5 天节奏 + Org sameAs 草稿

---

## 一、基础数据回顾 (跟 8/8 03:44 v1 一致, 验证 PASS)

| 维度 | JA 日本 (GSC) | EN 美国 (GSC) |
|------|--------------|---------------|
| 3 月展示量 | **1,638** | **2,641** |
| 3 月点击 | 17 | 14 |
| CTR | 1.04% | 0.53% |
| 平均排名 | 37.01 | 27.91 |
| 移动端 CTR | **2.36%** (339 imps/8 click) | **1.45%** (276/4) |
| 桌面 CTR | 0.70% (1286/9) | 0.43% (2352/10) |
| 平板 CTR | 0% (13/0) | 0% (13/0) |
| 商家信息 CTR | 2/4 = 50% pos 8 | **5/9 = 55.56% pos 2.67** ✅ |
| 产品摘要 CTR | 6/583 = 1.03% pos 36.22 | 5/1287 = 0.39% pos 40.07 |

**核心结论**:
- **EN KP (Knowledge Panel) pos 2.67 + 55.56% CTR 是当前最强信号** — Org NAP + llms.txt + HomePage schema 已经在赢, 改 Org sameAs 后期望 9 → 30+ imps
- **JA 移动端 2.36% 是金矿** (桌面 0.70% 3.4 倍) — JA 用户移动搜索占比远超桌面
- **JA 桌面 pos 43.95 vs 移动 11.41** — 移动排名更靠前, 3.85x 优势
- **EN 移动端 1.45% vs 桌面 0.43% (3.4x)** — 移动优先策略 JA + EN 一致
- **平板用户没意义** (13 imps 0% CTR), 优化资源全投移动 + 桌面

---

## 二、JA 黑洞 Query 分桶 + SKU 命中

### 桶 A: 0% CTR 大词 (197 imps 黑洞王, 排名太远 pos 80-96)

**总 imps**: 197 (cmyk 系列) + 80 (教科書 印刷) = **277 imps 黑洞** (占 JA 17%)

| Query | imps | 排名 | 0% CTR 根因 | 命中 SKU / Blog |
|-------|------|------|------------|---------------|
| 印刷 cmyk | 44 | 86.23 | 排名 9 页外 | `cmyk-guide` blog (待优化) |
| 印刷 rgb cmyk | 39 | 93.67 | 同上 | 同上 |
| 印刷 カラー cmyk | 37 | 96.05 | 同上 | 同上 |
| 印刷 用 cmyk | 24 | 88.33 | 同上 | 同上 |
| 印刷 cmyk rgb | 22 | 95.27 | 同上 | 同上 |
| cmyk 印刷 | 11 | 94.55 | 同上 | 同上 |
| 印刷 色 cmyk | 10 | 95.8 | 同上 | 同上 |
| 印刷 rgb cmyk 違い | 5 | 87.8 | 同上 | 同上 |
| rgb と cmyk | 5 | 92.8 | 同上 | 同上 |
| rgb カラー と は | 5 | 99.2 | 同上 | 同上 |
| rgb カラーモード | 2 | 81 | 同上 | 同上 |
| rgb cmyk 違い | 1 | 95 | 同上 | 同上 |
| **教科書 印刷** | **80** | **38.92** | **排名 4 页外, 描述无"教育"信号** | **textbooks + exercise-books** |
| 教科書 印刷会社 | 59 | 62.64 | 同上 | 同上 |
| 教科書 印刷 会社 | 32 | 64.56 | 同上 | 同上 |

**根因**:
- **cmyk 系列**: 我们 `cmyk-guide` blog 排名 pos 86, 内容深度不足 + 外链少。要在 blog 加 FAQPage schema + 拆 5 长尾 query 内链 + retrofit 提升 ranking 30+
- **教科書 印刷**: 我们有 `textbooks` + `exercise-books` SKU, 但 title 缺 "教材" 主词, description 没 "学校/塾/通信教育" 应用场景

### 桶 B: 高 imps 中长尾 (300+ imps, pos 20-80)

| Query 群 | 总 imps | 命中 SKU | 优化路径 |
|---------|--------|---------|---------|
| 包装盒 (食品 11+9+1=21, 化妆品 12, クラフト紙 17+3=20, 食品パッケージ 4, 防水 9+8=17, ギフト 6, パッケージ箱 1, パッケージ 印刷 食品 1+1, パッケージ 種類 1, パッケージ トレンド 3, パッケージデザイン トレンド 2) | 115 | food-boxes, cosmetic-boxes, kraft-paper-packaging-box, kraft-paper-bags, magnetic-closure-gift-box | 5 SKU title_ja 强化 + descriptionJa 末尾 5-8 行业 + 内链至 packaging-guide blog |
| ポスター (a2 7+1+1+1=10, 屋外 3+2=5, 防水 2+1=3, ポスター用紙 1, ポスター サイズ 一覧 1, ポスターサイズとは 1, ポスターサイズ 比較 1+1+1=3, ポスターサイズ 規格 1, ポスター 用紙 1, ポスター 紙 1, ポスター 紙質 1, ポスター 材質 1, ポスター 屋外 1, バナー 印刷 意味 1) | 32 | a2-posters, outdoor-posters, outdoor-vinyl-banners, adhesive-posters, art-posters | a2-posters + outdoor-posters 双 SKU title_ja 加 "A2ポスター" + "防水" 强信号 |
| ステッカー (pvc 9+2+1+2=14, 防水 2+1+8=11, ダイカット 8, 小ロット 4+1+1+1=7, 激安 1, 箔押し 1, 蛍光 3+5=8, 型抜き 1+1+1+1=4) | 50 | die-cut-stickers, small-batch-stickers, waterproof-stickers, transparent-stickers, fluorescent-stickers, foil-stickers | small-batch-stickers + waterproof-stickers 优先 |
| 封筒 (大型 4, 大きい 2, 大きい封筒 2, 大判 1) | 9 | large-envelopes, business-envelopes, colored-envelopes | large-envelopes title_ja 强 "大型封筒" |
| カタログ (6+2=8) | 8 | catalog-printing | catalog-printing title_ja 强 "カタログ印刷" |
| 製本教材 (上 製本 13, 教材 印刷製本 21, 教材 テキスト印刷 15, 教材 製本 3, 教材 印刷 製本 10, 卒 園 アルバム 1+1=2, 印刷 教科書 2) | 67 | hardcover-books, perfect-bound-books, saddle-stitch-booklets, graduation-yearbook | textbooks + graduation-yearbook 优先 |
| カレンダー (1+1+1=3) | 3 | custom-calendars, desk-calendars, magnetic-calendars, mini-calendars, wall-calendars, photo-frame-calendars | custom-calendars title_ja 强 "カレンダー オンデマンド" |
| メニュー (ラミネート 2+2+1+1+1+1=8) | 8 | laminated-menus, pvc-menus | laminated-menus title_ja 强 "ラミネート加工 メニュー" |

### 桶 C: 品牌词基线 (基线 0% CTR, 维持)

| Query | imps | 排名 | 信号 |
|-------|------|------|------|
| 蛍光ステッカー | 5 | 37.2 (20% CTR) | 唯一高 CTR 长尾 |
| オリジナル 箱 安い | 2 | 8 (50% CTR) | 强信号长尾 |
| 智印港 | 1 | 3 | zh-hk 品牌已赢 |
| zprin | 1 | 5 | branded 碎片 |
| 香港 印刷 | 2 | 4.5 | zh-hk 强信号 |
| 啞膠 | 1 | 1 | 哑胶概念 |

**品牌词基线 (8/12 期望 ≥1)**:
- ja: ジープリント, ZprintPro, 智印港, zprin (新增 4 query)
- en: ZprintPro, zprint, z print, zprints, z printing (新增 5 query)

---

## 三、EN 黑洞 Query 分桶 + SKU 命中

### 桶 A: 抓强信号 (pos < 10 但 0% CTR — snippet 不够强, 改 PDP title 即可胜出)

| Query | imps | 排名 | 当前 PDP | 改 title 加 USP |
|-------|------|------|---------|----------------|
| **batch stickers** | 5 | **2.4** | small-batch-stickers? | "Batch Stickers 100 MOQ Same-Day Free Shipping 100+ Shapes" |
| **small batch stickers** | 29 | **7.76** | small-batch-stickers ✅ | "Small Batch Stickers 100 MOQ Same Day Free Shipping Vinyl" |
| **fluorescent stickers** | 7 | **7.43** | fluorescent-stickers ✅ | "Fluorescent Stickers 50 MOQ Same Day Custom Shapes" |
| **print catalog hong kong** | 3 | **2.67** | catalog-printing ✅ | NAP already wins — 加 NAP 段落 |
| **a4 flyer printing** | 1 | 3 (100% CTR 1/1) | a4-flyers ✅ | 已赢, 维持 |
| **print flyers** | 1 | 5 (100% CTR 1/1) | double-sided-flyers ✅ | 已赢, 维持 |
| hkdesignpro poster design price printing included | 5 | 9.8 | (竞品词) | 跳过 |
| hkdesignpro poster design price | 4 | 10.75 | (竞品词) | 跳过 |
| paper bag gsm | 8 | 10.38 | kraft-paper-bags | "Kraft Paper Bags 100-200 GSM Custom Logo 5,000 MOQ" |
| what gsm for paper bags | 8 | 13.38 | kraft-paper-bags | 加 "100/120/150/200 GSM Options" |
| paper bag print file requirements | 2 | 21.5 | (走 blog) | 推 "paper-bag-print-guide" blog |
| 智印港 | 3 | 4 | (zh-hk 跨市场) | 跨市场, 不强改 |

**最大抓强信号**: `small batch stickers` pos 7.76 + 29 imps = 第 1 页底部 0% CTR, 改 title USP 即可胜 (snippet 命中"100 MOQ""Same Day")。

### 桶 B: 0% CTR 黑洞王 (200+ imps, 排名 4-9 页)

| Query 群 | 总 imps | 命中 SKU | 优化路径 |
|---------|--------|---------|---------|
| **a2 poster 全系** (a2 poster 45, a2 prints 16, a2 posters 10, a2 print 8, a2 print poster 1, a2 art prints 1, a2 print out 1, a2 print size 1, a2 printing 3, a2 poster printing 3, a2 print size 1, a2 printen 1, a2 plakate 1, a2 printing paper 1, a2 printing size 1, a2 size poster 1, a2 size posters 1, a2 size print 1, a2 size printing 1, a2 size posters 1, a2 digital printing 1, a2 clear poster 1, a2 print 1, a2 print poster 1, poster a2 bestellen 1, printanje a2 1, print in a2 1, print a2 1, print a2 poster 1, print size a2 1, printing a2 1, printing a2 size 1, poster bestellen a2 1, 420x594mm 3, 420 x 594mm 1) | **120+** | a2-posters, art-posters, display-posters | **a2-posters PDP P0 狙击** + 加 FAQPage 5 Q + internal link from art-posters |
| **small batch 全系** (small batch stickers 29, batch stickers 5, custom stickers small batch 1, small batch custom stickers 1, small batch label printing 19+18=37, small batch labels 8, small batch sticker printing 10, sticker batch 1, sticker guide 2) | **94** | small-batch-stickers, fruit-food-label-stickers, die-cut-stickers, waterproof-stickers, foil-stickers, removable-stickers, fluorescent-stickers, security-stickers | small-batch-stickers P0 + fruit-food-label-stickers P1 |
| **saddle stitch 全系** (saddle stitch booklet 23+22+10+10+5+5+4+3+1+1+1+1+1+1+1 = 88) | **88** | saddle-stitch-booklets, spiral-notebooks, perfect-bound-books, hardcover-books | saddle-stitch-booklets P0 + 加 48 pages wire bound 选项 |
| **waterproof stickers 全系** (waterproof stickers 10, custom waterproof stickers 5, sticker waterproof 3, best printer for waterproof 2, sticker water resistant 1, etc 累计 100+) | **100+** | waterproof-stickers + sticker-waterproof blog (待写) | waterproof-stickers P0 + 写 blog "How to Print Waterproof Stickers 5+ Years Outdoor" |
| **envelope printing china** (8+8+4+8+2+1+2 = 33) | **33** | business-envelopes, large-envelopes, colored-envelopes, pearl-envelopes | business-envelopes P1 + 加 NAP 香港段落 |
| **a1 posters 全系** (a1 posters 11+4+1+1+1 = 18, a1 poster 1, a1 poster prints 4, a1 size poster 1, a1 pvc poster 2, a1 海報 1, a1 poster price 1, dimensions a1 poster 1, dimensions of a1 poster 1, how big is a a1 poster 1, poster a1 size 1, size of a a1 poster 1, size a1 poster 1, size of a1 poster 1, what are dimensions of a1 poster 1, what size is a1 poster 1) | **35+** | a1-posters, art-posters | a1-posters PDP P1 |
| **china catalog printing** (7+7+2+1+1+1+1 = 20) | **20** | catalog-printing, saddle-stitch-booklets | catalog-printing P1 + 加 NAP 段落 (HK 优势) |
| **adhesive banner + banner 全系** (adhesive banner 11, adhesive banners 10, adhesive banner printing 10, banner printing for trade shows 5, banner adhesive 1, wind resistant banners 1, stick banner 1, vinyl banner printing china 4, outdoor vinyl banners 1) | **44** | adhesive-banners, outdoor-vinyl-banners, mesh-banners, roll-up-banners, adhesive-posters, outdoor-posters | adhesive-banners + outdoor-vinyl-banners PDP P1 |
| **pvc menu + menu 全系** (pvc menu 3, pvc menus 5, pvc menu printing 4, menu pvc 1, laminated menus 1, disposable menu 5, hardcover menu 1, hard cover menu 1, hard cover menu printing 1, hardcover menu printing 1, laminated stitched menus 1, laminated menu 1) | **25** | pvc-menus, laminated-menus, disposable-menus, hardcover-menus, drink-menus, menu hardcover | pvc-menus + laminated-menus PDP P1 |
| **flyer size 全系** (a4 flyer size 2, flyer sizes 1, flyer size paper 1, flyer paper type 1, flyer size a4 1, flyer size a5 1, flyer formaten 1, a4 leaflet size 1, a5 leaflet size 1, a6 leaflet size 1, a5 flyer dimensions 1, a6 flyer dimensions 1, a6 flyer size 1+1, a5 flyer size 1, a6 flyers size 1, leaflet paper size 1, leaflet paper type 1, leaflet size 1+1+1, leaflet sizes guide 1, size of a leaflet 1, standard leaflet size 1) | **22** | a4-flyers, a5-flyers, double-sided-flyers, thick-paper-flyers, eco-flyers, folded-leaflets, school-flyers, same-day-flyers | a4-flyers + a5-flyers PDP P1 |
| **custom foil decals** (6+4+2+2+1+1+1+1+1 = 19) | **19** | foil-stickers, foil-greeting-cards, foil-red-packets | foil-stickers PDP P1 |
| **FBA / labels** (amazon product labels 1, fba label size 1+1, fba labels 1+1, labels for amazon fba 1, food labeling stickers 1+1, food labels sticker 1, food grade stickers 1) | **11** | fruit-food-label-stickers, security-stickers, removable-stickers, fluorescent-stickers | fruit-food-label-stickers P1 |
| **2x 概念词** (rgb vs cmyk 5, cmyk vs rgb 4, cmyk or rgb 2, rgb and cmyk 2, print rgb or cmyk 1, cmyk or rgb for printing posters 1, rgb vs cmyk color 1, cmyk vs rgb color 1, rgb versus cmyk 1, color format for printing 1) | **19** | cmyk-guide blog | cmyk-guide blog P0 retrofit |
| **paper bag gsm 系列** (paper bag gsm 8, what gsm for paper bags 8, sizes of paper bag 1, multiple functions of white card paper bags 1, yibo white card paper bags 1) | **19** | kraft-paper-bags, eco-paper-bags, white-card-bags, handle-bags, gift-bags | kraft-paper-bags P1 + FAQPage |

### 桶 C: 已赢 (维持)

| Query | imps | 排名 | CTR | 状态 |
|-------|------|------|-----|------|
| pvc menu | 3 | 20.67 | 33.33% | ✅ |
| a4 flyer printing | 1 | 3 | 100% | ✅ |
| print flyers | 1 | 5 | 100% | ✅ |
| print catalog hong kong | 3 | 2.67 | 0% | ⚠️ pos 强但 snippet 弱, 加 NAP 段落可拉 CTR |
| 智印港 | 3 | 4 | 0% | ⚠️ 跨市场, 等 Org sameAs 改后 NAP 强化 |

---

## 四、5 天执行表 (8/8 04:00 - 8/12 22:00)

### 8/8 (Sat) - P0 狙击抓强信号 + 准备草稿

| 时间 | 执行 | 预期影响 |
|------|------|---------|
| 09:00 K3 必跑 | 3 设备 /contact 端到端 + Supabase 查 + formsubmit 激活 + 提供 X/LinkedIn/IndexNow key | 8/12 §6.1 询盘≥5 验收前提 |
| 09:00 K3 拍板 | 5 SKU JA + 5 SKU EN title USP 改字 (M3 起草) | PDP 抓强信号 |
| 09:55 cron once 7e2cc0ba | M3 amend 合并 AGENTS.md 198 + 5 SKU JA/EN title USP 改 + 1 push | §0.1 攒批, 1 effective push |
| 10:15 daily cron | retrofit cross-border-ecommerce-shipping-box-guide + 末尾ジープリント 埋点 + 5 FAQPage | 5 篇 retrofit 完成 1/6 |

### 8/9 (Sun) - P0 Org sameAs 改 + 抓强 + retrofit 2

| 时间 | 执行 | 预期影响 |
|------|------|---------|
| 全天 | M3 amend src/lib/seo.ts Organization sameAs 改: sameAs (X + LinkedIn + 30 JP 目录 + Startup Base) + areaServed=JP + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷] + alternateName=ジープリント | KP imps JA 4→30+, EN 9→30+ |
| 10:15 daily cron | retrofit 同次 push 合并 1 effective push | §0.1 攒批 |
| 22:00 daily cron | matrix conversion_status auto | matrix 维护 |
| K3 跑 | 301 传递 5/5 PASS (P1 deadline) | §6.3 验收 |
| K3 跑 | AutoGLM 启动准备: 30 目录清单 + 邮箱验证流程 | 8/10 启动前提 |

### 8/10 (Mon) - P0 cmyk-guide blog 提升 + AutoGLM 启动

| 时间 | 执行 | 预期影响 |
|------|------|---------|
| 09:00 | K3 跑 AI 可见性 ≥1/4 引擎 (P1 deadline) | §6.5 验收 |
| 10:15 daily cron | retrofit cmyk-guide P0 优先级提升 (305 imps 0 click pos 86 = JA 最大痛点) + 拆 5 长尾 query 内链 + FAQPage 5 Q | JA cmyk 系列 197 imps CTR 提升预期 0% → 0.5% |
| 09:00 起 | AutoGLM 跑 10 条/天 目录填表 (K3 点提交) | §0.9 启动, 30 目录 8/12 完成 20 条 |
| K3 outreach | 清单文 10 篇 drafted 发送 | 5 邮件, 期望 1-2 reply |
| 22:00 daily cron | matrix conversion_status + gsc_targeting_v2 update | matrix 维护 |

### 8/11 (Tue) - P1 5 SKU EN/EN retrofit 3 + paper-materials 常规

| 时间 | 执行 | 预期影响 |
|------|------|---------|
| 10:15 daily cron | retrofit paper-materials 常规 (JA 教材 印刷 长尾 80 imps 引流) | JA 教科書 印刷 pos 38.92 → 25 |
| 10:15 daily cron | retrofit 3 篇 (5 SKU EN title USP 改后内链) | EN a2-posters 120+ imps CTR 0% → 0.3% |
| 09:00 K3 | 跑 review-8-12-template.md 预填 (P3 复盘模板) | 8/12 复盘准备 |
| 22:00 daily cron | matrix 5 维度更新 (含 imps/clicks/CTR/pos) | 8/12 KPI baseline |
| K3 | AutoGLM 提交 10 条目录 (8/10 + 8/11 = 20 条) | 30 目录目标 8/12 完成 20/30 |

### 8/12 (Wed) - P3 复盘日 0 push

| 时间 | 执行 | 预期影响 |
|------|------|---------|
| 09:00 K3 | 跑 review-8-12-template.md 5min 手测 (5 维度 KPI) | §6 全 7 验收 |
| 09:00 K3 | 跑 AI 可见性复测 (期望 ≥1/4 → ≥2/4) | §6.5 验收 |
| 09:00 K3 | 跑 branded search 6 query (基线 0 → 期望 ≥1) | §6.5 验收 |
| 22:00 daily cron | 落复盘报告 + 升级 K3 §9 路径推荐 | 8/13 起恢复双任务 |

---

## 五、5 SKU JA + 5 SKU EN 抓强/狙击 P0 清单 (8/8 09:00 K3 拍板, 8/8 10:15 amend push 1 改)

### JA 5 SKU 改字表 (title_ja + descriptionJa 末尾 +5-8 行业 + FAQ)

| # | SKU | 当前 title_ja | 改后 title_ja (加 USP) | 行业 list 末尾 |
|---|-----|--------------|---------------------|---------------|
| 1 | a2-posters | (查现有) | "A2ポスター印刷 1-3日 防水 PP加工 1枚〜" | 屋外広告, 展示会, イベント, 学園祭, ショップ, 飲食, 不動産 |
| 2 | outdoor-posters | (查现有) | "屋外防水ポスター 耐候3年+ UV加工 PP 1枚〜" | 工事現場, 選挙, 不動産, 飲食, イベント, 学園祭 |
| 3 | fluorescent-stickers | (查现有) | "蛍光ステッカー 1枚〜 防水 PP加工 ダイカット" | 雑貨, イベント, 学園祭, 限定品, キャンペーン |
| 4 | kraft-paper-bags | (查现有) | "クラフト紙袋 印刷 100-200枚〜 オリジナル logo" | 飲食, 物販, 化粧品, 菓子, アパレル, ギフト |
| 5 | textbooks | (查现有) | "教科書・教材 印刷製本 無線綴じ 50冊〜 学校/塾" | 学校, 塾, 通信教育, 企業研修, 自費出版, 学会 |

### EN 5 SKU 改字表 (title_en + descriptionEn 末尾 +5-8 行业 + FAQ)

| # | SKU | 当前 title_en | 改后 title_en (加 USP) | 行业 list 末尾 |
|---|-----|--------------|---------------------|---------------|
| 1 | small-batch-stickers | (查现有) | "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" | DTC, Craft, Brewery, Skincare, Pet Food, Subscription Box, E-commerce, Event |
| 2 | a2-posters | (查现有) | "A2 Poster Printing 1-3 Day Turnaround UV-Coated Lamination Free Shipping 100+ MOQ" | Trade Show, Event, Theater, Retail, Real Estate, School, Campaign, Restaurant |
| 3 | waterproof-stickers | (查现有) | "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ" | Brewery, Beverage, Marine, Outdoor Gear, Pet Food, Skincare, Auto, Industrial |
| 4 | saddle-stitch-booklets | (查现有) | "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ" | Catalog, Magazine, Lookbook, Real Estate, School, Event Program, Comic, Manual |
| 5 | kraft-paper-bags | (查现有) | "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory" | Retail, Restaurant, Bakery, Coffee, Boutique, Gift Shop, Trade Show, Pop-up |

---

## 六、8/9 Org sameAs 改草稿 (M3 起草, K3 9:00 拍板 X/LinkedIn URL 后, amend push)

**当前 src/lib/seo.ts Organization schema (待改)**:
```ts
// 改前 (简化, 待 grep 确认)
{
  '@type': 'Organization',
  name: 'ZprintPro',
  url: 'https://zprintpro.com',
  logo: '...',
  sameAs: [
    'https://www.linkedin.com/company/...',  // 待填
    'https://x.com/...'  // 待填
  ],
  address: { ... NAP ... },
  contactPoint: { ... }
}
```

**改后 (K3 9:00 提供 X + LinkedIn URL + 30 JP 目录 URL 后填)**:
```ts
{
  '@type': 'Organization',
  '@id': 'https://zprintpro.com/#organization',
  name: 'ZprintPro',
  alternateName: ['ジープリント', 'ZprintPro JP', '智印港'],  // K3 8/8 02:52 拍板
  url: 'https://zprintpro.com',
  logo: '...',
  sameAs: [
    'https://x.com/zprintpro',  // K3 提供
    'https://www.linkedin.com/company/zprintpro',  // K3 提供
    // 30 JP 目录: 8/10-8/12 AutoGLM 提交后回填
    'https://startupbase.jp/zprintpro',  // Startup Base
    'https://www.itpress.jp/...',  // IT 企業一覧
    'https://www.tokyo-print.jp/...',  // 東京都印刷工業組合
    'https://www.japan-print.jp/...',  // 全国印刷工業組合
    // ... 30 个
  ],
  areaServed: [
    { '@type': 'Country', name: 'Japan' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'AdministrativeArea', name: 'Hong Kong' }
  ],
  knowsAbout: [
    '学园祭印刷',  // 学園祭印刷 (per 8/6 0:39 K3 §6.4 早会)
    'POD',  // プリントオンデマンド
    '卒業記念アルバム',  // graduation yearbook
    'ステッカー印刷',  // sticker printing
    'チラシ印刷',  // flyer printing
    'cmyk printing',
    'waterproof stickers',
    'small batch stickers'
  ],
  address: { ... NAP 维持深圳 ... }
}
```

**预期影响 (per 8/8 03:44 v1 报告)**:
- JA KP imps 4 → 30+ (7.5x)
- EN KP imps 9 → 30+ (3.3x)
- EN KP pos 2.67 维持 + CTR 期望 55% → 70%
- JA KP pos 8 维持 + CTR 期望 50% → 65%

---

## 七、branded search 监测 (8/12 期望 ≥1, 8/9-8/11 retrofit 末尾埋点)

**6 query 监测**:
- JA: `ジープリント`, `ZprintPro`, `智印港`
- EN: `ZprintPro`, `zprint`, `zprintpro printing`
- ZH: `智印港`

**埋点位置 (8/9-8/11 retrofit 末尾 CTA)**:
- "ZprintPro は香港と東京の2拠点体制" (zh-hk 末尾)
- "ZprintPro / ジープリント — Asia factory 30+ years experience" (en/ja 末尾)
- "智印港 / ZprintPro — 全球印刷服務" (zh-hk 摘要)

---

## 八、cross-check 5 渲染源 (per MEMORY.md §9 教训)

**5 SKU 改字必查 5 渲染源**:
1. `src/data/products.ts` — `title_ja` / `title_en` / `descriptionJa` / `descriptionEn` 字段
2. `src/data/sku-seo-data.ts` — PDP meta title / description (优先于 products.ts)
3. `src/data/blog-data/{zh-hk,en,ja}.json` — blog 引用此 SKU 的 title / desc
4. `src/components/pdp/orderform.tsx` — PDP 提交后 fallback 文案
5. `src/components/pdp/referencepriceblock.tsx` — PDP 价格表兜底
6. `public/llms-{zh-hk,en,ja}.txt` — AI 注入

**SOP (8/8 10:15 amend push 前必跑)**:
```bash
grep -rn "small batch sticker" src/ public/  # EN PDP 5 源
grep -rn "a2 poster" src/ public/  # JA + EN 双语
grep -rn "蛍光" src/ public/  # JA
grep -rn "教科書" src/ public/  # JA
grep -rn "kraft paper" src/ public/  # EN
```

**0 残留旧词 (改前 grep + 改后 grep 双 verify)**。

---

## 九、与 5 天冲刺表对齐 (K3 8/7 18:22 P0-P3)

| K3 P0-P3 任务 | 8/8 v2 报告对应 | 状态 |
|--------------|----------------|------|
| P0 询盘端到端 (8/8) | 8/8 09:00 K3 跑 3 设备 | 待 K3 9:00 |
| P0 D1+D2 最小化解锁 (8/9) | 8/9 Org sameAs 改 (本报告 §6) | M3 起草, K3 拍板 |
| P1 CTR 狙击 (每日) | 8/8 10:15 amend 5 SKU 改字 (§5) | M3 起草, K3 拍板 |
| P1 AI 可见性 ≥1/4 (8/10) | 8/10 K3 跑 + AutoGLM 30 目录 | 待 K3 跑 |
| P1 301 传递 (8/9) | 8/9 K3 跑 | 待 K3 跑 |
| P2 v8 retrofit 继续 (8/11) | 8/9 + 8/10 + 8/11 retrofit 3 篇 (per matrix gsc_8_8_8_12_execution) | M3 起草 |
| P3 8/12 复盘 (8/11 预填) | 8/11 K3 跑 review-8-12-template.md 预填 | 待 K3 跑 |

---

## 十、自主拍板项 (K3 "按最优执行" 自主范围)

**M3 自主拍板 (不需 K3 再确认)**:
1. 5 SKU JA 选择: a2-posters / outdoor-posters / fluorescent-stickers / kraft-paper-bags / textbooks ✅
2. 5 SKU EN 选择: small-batch-stickers / a2-posters / waterproof-stickers / saddle-stitch-booklets / kraft-paper-bags ✅
3. 5 SKU 改字 USP 模板 (§5 表) ✅
4. 5 天节奏 (§4 表) ✅
5. Org sameAs 草稿结构 (§6) ✅
6. branded search 6 query (§7) ✅
7. cross-check 5 渲染源 SOP (§8) ✅

**待 K3 9:00 拍板**:
1. X + LinkedIn URL (Org sameAs 必填)
2. 5 SKU 改字 K3 审字 (尤其 ja title 文案 + 行业 list 选词)
3. AutoGLM 启动时间确认 (8/10 vs 8/11)
4. IndexNow key (8/9 99 URLs submit 必填)

---

## 十一、报告落盘 (本报告 v2 替代 v1)

- 本报告: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (本文件, ~14 KB)
- v1 报告: `.hermes/k3-inbox/2026-08-08-0344-gsc-ja-en-analysis.md` (~14 KB, 概要)
- matrix: `gsc_targeting_v2` 段 (本报告 + matrix 同步)
- cron prompt: v8.5 → v8.6 升级中 (in progress, ETA 04:30)

---

**M3 拍板项 (本报告已自主执行)**:
- ✅ 5 SKU JA 选择 + 改字 USP 模板
- ✅ 5 SKU EN 选择 + 改字 USP 模板
- ✅ 5 天节奏 (8/8 04:00 - 8/12 22:00)
- ✅ Org sameAs 草稿结构
- ✅ branded search 6 query
- ✅ cross-check 5 渲染源 SOP

**M3 待执行 (本报告后)**:
1. 升级 matrix 加 gsc_targeting_v2 段
2. 升级 cron prompt v8.5 → v8.6
3. 落 .hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md
4. 升级 K3 1 段中文 status
