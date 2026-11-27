# 2026-11-27 人手執行報告 · 批 Q4：zh-hk 首頁商業詞權重批（印刷公司 / 香港印刷）

- VERDICT: PASS（live 5/5）
- CONSUMED: K3 11-27 14:49「拍 Q4，今晚收官前把首頁商業詞權重批推上線」
- DELIVERED: 首頁 AEO 實體聲明 + h1 雙變體補商業詞 + home description 精確詞 + guide blog 回鏈首頁 ×2 → commit 75c0484c（+鎖歷史修復 f7ba33e2）→ live 全生效
- NEXT: 7d 復測門 12-04（印刷公司 首頁 r29.7→≤15 / 香港印刷 r11.5→P1 / guide r31→≤20）；批 Q5-A（書刊/膠裝簇 hub 重構，imp~2600 全站最大簇）待拍

## 数据来源

- GSC 90d query×page 逐頁明細：`gsc_data_qp_90d.csv`（2026-11-27 12:0x 拉取；本批 15:0x 逐頁複查）
  - 印刷公司 i304 c5：guide blog i257 r31.1 · 首頁 i46 r29.7（CTR 8.7% 全詞最高）· zine blog i1
  - 香港印刷 i83 c2：首頁 i80 r11.5 · guide i3 r25.7
- 真值錨位：首頁 title 原本已含「香港印刷公司」（非缺口）；缺口 = h1（sr-only A/B 雙變體均無印刷公司）+ AEO 直答句（原為報價流程句無實體聲明）+ description（原「香港智印港印刷平台」無精確詞）+ guide blog 0 條回鏈首頁
- 校准日期：2026-11-27

## 一、落地內容（單變量 zh-hk，en/ja 零改動）

| # | 位置 | 動作 |
|---|---|---|
| 1 | MainCategoryEntry.tsx（首頁 Hero 下 AEO 直答句） | 句首加實體聲明「智印港是一間香港印刷公司：…」（GEO 實體歸一直答） |
| 2 | analytics.ts HERO_H1_VARIANTS | A 變體「香港本地印刷 · 即日交貨」→「香港本地印刷**公司** · 即日交貨」；B 變體「跨境印刷服務」→「香港印刷公司 · 跨境 48 小時派送」（兩臂同補保持 A/B 一致） |
| 3 | seo.ts homeMetadata.zh-hk description | 首句「香港智印港印刷平台」→「智印港是香港印刷公司」（精確詞前置；title 已含不動） |
| 4 | blog-data/zh-hk.json hong-kong-printing-guide | ① FAQ 既有「智印港承諾對質量負責」智印港加鏈 → /zh-hk/；② 相關服務列表首條加「香港印刷公司智印港 — 30 秒線上報價主頁」→ /zh-hk/（印刷公司主錨 i257 r31 權重回流首頁） |

既有資產確認：首頁 KnowledgeSection 知識卡「香港印刷公司選擇完全指南」早已以精確詞錨鏈 → guide（首頁→guide 方向不缺口，缺的是 guide→首頁）。

## 二、門禁與上線

- tsc 0 · blog-data JSON 嚴校過 · 反審 0 red（0 orange / 0 yellow 新增）
- 過程事故 1 起已修：首 commit 註釋含英文品牌名字面量觸發門童 #3 品牌分層新增命中（zh-hk 文件禁英文品牌名，**註釋也算**）→ 改寫註釋後重提；另 SESSION_LOCK.md 首 commit 誤覆寫 964 行歷史 → 從 64ba9ae5 恢復並前置 Q4 段（f7ba33e2）
- commit `75c0484c`（4 src + lock）+ `f7ba33e2`（lock 歷史恢復）→ push 64ba9ae5..f7ba33e2 成功（pre-push guard #21 全過；距上次 push 34min，≥30min 滿足）
- live 復探（CF build 後，UA 探針）：**5/5 PASS**
  - 首頁 200：AEO 實體句「智印港是一間香港印刷公司」✓ · meta desc「智印港是香港印刷公司」✓ · h1（變體 A）「香港本地印刷公司 · 即日交貨」✓
  - guide blog 200：FAQ 回鏈 ✓ · 相關服務首條回鏈 ✓

## 三、7d 復測門（12-04，與 Q1/Q2 同窗）

| 詞 | 基線（90d） | 目標 |
|---|---|---|
| 印刷公司 → 首頁 | r29.7（i46） | ≤15；guide blog r31 → ≤20（雙頁承接） |
| 香港印刷 → 首頁 | r11.5（i80） | P1（≤10） |

- 達標 → 商業詞承接模式複製到 en（printing company 系）與 ja（印刷会社 系）
- 不達標 → 查首頁權重外部錨（商業詞首頁競爭強度遠高於品類詞，7d 內大概率只動 3-8 位，12-11 二窗再判）

## 四、機制入賬

- 首頁商業詞槓桿序：**title 精確詞 > h1（sr-only 亦計權）> AEO 直答句實體聲明 > description 首句 > 高權重 blog 回鏈**——title 已滿時權重回流（blog→首頁精確錨）是主要可動槓桿
- 反審門童 #3 掃描含註釋：zh-hk 文件（含 .tsx 註釋）不得出現英文品牌名字面量——註釋表述用「英文品牌名」代稱
- blog-data JSON 修改禁用 json.dumps 重序列化（1 空格縮進會被刷成 2 空格，全文件假 diff）——一律原始字符串替換
