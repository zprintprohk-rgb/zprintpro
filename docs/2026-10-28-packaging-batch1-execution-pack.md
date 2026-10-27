# 包装批 1 执行包（edit-pack）—— 删除/条件化类清毒精确串（K3 拍板后机械执行）

> 日期：2026-10-28（D2 拍板日配套）
> 用法：K3 拍板（速览表 A/B/C 或「全部按推荐」）后，本包按文件逐项执行；**所有替换串不引入新数字**；每项执行前对当前源值双方法复核（read + grep），命中唯一后再改。
> 门禁：每文件改后跑 编造 lint（check-brand-mentions --strict）/ encoding / brand / gsc-leak / title-v5（若涉 title）/ JSON 严格解析（blog-data）/ tsc 54=54 / git diff 逐行核对 / 线上复核。

## 文件 1 · `src/data/products.ts`（P0-01 被点名源头，K3 拍板后执行）

| # | 行 | 搜索串（精确） | 替换串 | 关联 |
|---|---|---|---|---|
| P1-1 | L2982 | `'食品包裝訂製 100個起印 HK$4起/個 FDA級 \| 智印港 · 食品級茶飲烘焙定製'` | `'食品包裝盒印刷訂製 100個起印 食品級茶飲烘焙定製 \| 智印港'`（价格口径 HK$4 vs 2.5 拍板后按 PR-001 值回填） | B3-4/CER-001/PR-001 |
| P1-2 | L2983 | `，FDA級食品接觸安全材質，` | `，食品級紙材（以訂單確認），` | B3-4/CER-001 |
| P1-3 | L2983 | `internationally certified quality management system Best for: tea brands` | `Best for: tea brands`（删除无证断言） | B3-1/CER-007 |
| P1-4 | L3087 | `'【法規標示】藥機法 / FDA 21 CFR / EU 1223/2013 合規'` | 删除该行（或改 `'【法規標示】合規文件以訂單確認'`） | B3-5/CER-004 |
| P1-5 | L6631 | `'水果貼紙食品標籤印刷 · FDA 食品級跨境電商 SKU 標貼 \| 智印港'` | `'水果貼紙食品標籤印刷 防水防油 跨境電商 SKU 標貼 \| 智印港'` | B3-6/CER-001 |
| P1-6 | L6634 | `'【食品級認證】SGS／FDA 通過，大豆油墨無遷移，可直接接觸食品'` | `'【防水防油】食品標籤用防水防油紙，適用生鮮蔬果包裝'` | B3-6/FC-001 |
| P1-7 | L3185 | `internationally certified quality management system Best for: Amazon FBA`（mailer descriptionEn） | `Best for: Amazon FBA` | B3-1/CER-007 |

> 纸袋族 5 处（L1365/1555/1650/1749/1843）+ flyers L1917 + posters L2550 的「internationally certified」= **七簇域**，移交对端会话（本包不越域）。

## 文件 2 · `src/data/category-seo-content.ts`（B1 全项删除/条件化）

| # | 搜索串（精确子串） | 替换串 | 关联 |
|---|---|---|---|
| P2-1 | `, 對比 e-print HK$300-800 刀模費行業慣例)` | `, 拼版免刀模費)`（竞品价格对比删除，DL-003） | B1-1 |
| P2-2 | `白卡彩盒 HK$0.03/個起 (拼版免刀模費` | `白卡彩盒 (拼版免刀模費`（价格条件化，PR-009） | B1-2 |
| P2-3 | `拼版 8-15 天交期` | `交期以報價單為準`（LT-003） | B1-3 |
| P2-4 | `FDA 食品級 + FSC 認證可選,` | `食品級紙材可選（視材質與訂單確認）,`（CER-001/002） | B1-4 |
| P2-5 | `, 打樣當日完成` | ``（删除自矛盾，PF-001） | B1-6 |
| P2-6 | `，抗壓 80-200kg，跨境電商首選` | `，跨境電商首選`（PF2-003） | B1-23 |
| P2-7 | `，可降解｜無塑化劑｜綠色認證` | `，環保紙材`（PF2-005） | B1-7(123 行) |
| P2-8 | `出口歐美用 FSC 認證環保紙，清關文件齊全。` | `出口訂單可提供材料說明（以訂單確認）。`（清关承诺，B1-26） | CER-002+§4.2 清关 |
| P2-9 | `通過 SGS 檢測；烘焙` | `（檢測視訂單索取）；烘焙`（CER-003） | B1-13 |
| P2-10 | `，通過 SGS 檢測認證，符合 HK 衛生署食品安全要求` | `，以訂單確認合規要求`（CER-003/006） | B1-13/16 |
| P2-11 | `我們可根據 ISTA 標準進行抗壓和跌落測試，確保物流運輸安全。測試報告可作為出口通關文件。` | `可提供結構測試說明（以訂單規格為準）。`（PF2-002+清关） | B1-14 |
| P2-12 | `（FDA 食品級 + FSC 認證紙）` | `（食品級紙材可選）`（CER-001/002） | B1-18 |
| P2-13 | `'食品包裝訂製 — FDA 食品級紙盒'` | `'食品包裝訂製'`（导航标签，B1-27） | CER-001 |
| P2-14 | `「出口歐美建議用 FSC 認證環保紙，清關文件齊全」`（L162 变体） | `「出口訂單可提供材料說明」` | B1-26 |
| P2-15 | `抗壓 80-200kg，跨境電商 + 重物首選`（FAQ L184 变体） | `跨境電商 + 重物首選` | B1-23 |
| P2-16 | `三種都支援 FSC 環保認證 + 食品級 SGS 認證。` | `三種都支援環保紙材選項。` | CER-002/003 |
| P2-17 | `可以。所有盒型均可選 FSC 認證環保紙張，符合國際環保標準，適合出口歐美市場。` | `可以。所有盒型均可選環保紙張（視供應與訂單確認）。` | CER-002 |
| P2-18 | en `FSC eco-friendly boxes` | `eco-friendly boxes`（CER-002） | B1-11(208) |
| P2-19 | en `SGS-tested as standard;` | `（material spec verified per order）;` 或整句条件化 | B1-13 |
| P2-20 | en `FSC-certified paper keeps customs paperwork simple` | `certified paper options available on request` | B1-26 |
| P2-21 | en `plus ISTA compression-test reports for export orders` | `plus structure-test documentation per order` | B1-14 |
| P2-22 | ja `SGS認証取得済み、日本の食品衛生基準に準拠` | `食品衛生基準への適合は材料・仕様により確認` | CER-003/005 |
| P2-23 | ja `FDA 適合 + FSC 認証紙` | `食品グレード内張りは仕様により選択可` | CER-001/002 |
| P2-24 | ja `ISTA基準の圧縮・落下テスト` | `構造強度は仕様確認による` | PF2-002 |
| P2-25 | ja `アジア自社工廠直送` | `アジアの工場から直送（深圳拠点）` | SB-009 |

> 执行时逐条对当前源值复核；同义变体若 grep 命中多处，逐处确认上下文后替换（禁整文件盲替换）。

## 文件 3 · 博客源（B4 批 1 项；blog-data JSON 改后必过 JSON 严格解析 + 编造 lint）

| # | 文件 | 搜索串 | 替换串 | 关联 |
|---|---|---|---|---|
| P3-1 | blog-posts.ts L1929-1932 | excerpt 含 `FDA 21 CFR 食品級、FSC 認證` | 去认证断言（保留教育内容） | B4-1 |
| P3-2 | blog-data zh-hk.json（packaging-box-custom-guide） | `天地蓋盒 50 個起已達 65% 品牌` | `天地蓋盒是常見訂製盒型之一` | B4-3 假统计 |
| P3-3 | 同上 | `大豆油墨成為 60% 品牌首選` | `大豆油墨是環保選項之一` | B4-3 |
| P3-4 | 同上 | `磁吸盒可重複使用 500 次` | `磁吸盒適合重複使用場景（以實際使用為準）` | B4-3 |
| P3-5 | 同上 | `包裝盒訂製 50 個起印` | `包裝盒訂製起印量以報價為準` | B4-3 MOQ |
| P3-6 | blog-data zh-hk.json（kraft-paper-box-types-comparison-2026） | `FDA 21 CFR 175.300 + EU REACH + FSC 4 大國際認證齊全` | `可選食品級紙材與環保紙材（視訂單確認）` | B4-4 |
| P3-7 | blog-data zh-hk.json（food-packaging-printing-guide） | `認證至少齊 FDA 21 CFR 176.170（美國）同 GB 4806.8-2022` | `材料合規要求以訂單確認` | B4-2 |
| P3-8 | 同上 | `100 個起印、HK$2.5 起/個，標準 3-5 個工作天` | `起印量・價格・交期以報價為準` | B4-2 PR/LT |

## 文件 4 · CSV → 生成器（B2 无值项；改 `zprintpro-sku-seo-data.csv` 单元格 → `node scripts/csv-to-sku-seo.mjs` → 派生 TS，禁手改 TS）

| # | 定位 | 动作 | 关联 |
|---|---|---|---|
| P4-1 | rigid en 行 description 单元格含 `2100-MOQ` | 删除该残句 | B2-2 |
| P4-2 | mailer ja 行（slug 快遞盒/飛機盒）H1 单元格 | 复核是否含英文残留（当前 H1=「発送箱 メーラーボックス…」无英文——残留可能在 title/body 列，执行时定位）；有则改自然日语 | B2-17 |
| P4-3 | gang-run 行 zh/ja 单元格含 `香港無對手價/香港無競合価格` | 删除/改 `以報價為準` | B2-22 |
| P4-4 | electronics 行 en/zh 单元格含 `防靜電符合電子產品防護標準` | 删除 | B2-30 |
| P4-5 | electronics 行 zh 单元格含 `公差 ≤0.5mm` | 删除/条件化 | B2-31 |
| P4-6 | folding ja 行单元格含 `100枚〜` | `100個〜`（枚→個） | B2-21 |
| P4-7 | cosmetic zh features 单元格含 `藥機法/FDA 21 CFR/EU 1223/2013` | 删除（与 P1-4 同源，CSV 与 products.ts 都改） | B2-27 |

## 执行顺序（批 1，拍板后当日）

1. P1（products.ts）→ P2（category）→ P3（blog）→ P4（CSV+regenerate）——每文件独立 commit 前跑对应门禁；
2. 全批后：编造 lint 0 / brand 0 / gsc-leak 0 / tsc 54=54 / JSON 全解析 / git diff 逐行；
3. 线上复核重灾页：food/cosmetic/fruit-label（FDA 源头清除）、kraft（枚/エコ/FSC）、rigid（2100-MOQ/上製本箱）、gang-run（無對手價）、mailer/electronics；
4. 复核无新增 unsupported claim（§10.1 护栏 0）。

> 附：CSV 发现「超厚名片 (400g)」行 H1=「厚口名刺」——名片展示层未拍板（§0.0 解禁块 (a)/(b)/(c)），属合规 watch，移交名片域会话/七簇会话，本包不处理。
