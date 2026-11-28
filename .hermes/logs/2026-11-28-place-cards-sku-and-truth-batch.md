# 2026-11-28 place-cards SKU 補位 + 無來源計數清零批（Q8）

- **拍板**：K3 2026-11-28 09:13 — place-cards 三選一採「補 1 個 SKU」（K3 自提）；同時授權「有利於首頁目標的結果可立即 push」；14 處「已為 N 間」無來源計數與 scenario-links 存量 FAIL 併入本批。
- **執行**：Kimi Work 人手會話（首席 SEO/AEO/GEO 數據戰略分析師執行層）。
- **commit**：`0e3c25d2`（已 push，`53d6d1b5..0e3c25d2`，連同上一批 `3a0eaf7d`）。
- **驗證**：tsc 0 / encoding 0 / brand-mentions --strict PASS（A 類 0 命中）/ content-guard exit 0 / scenario-links **209 pass | 0 fail**。

## 1. place-cards 席位卡 SKU（PC-101）

| 項 | 值 |
|---|---|
| slug | `place-cards`（禁用 `wedding-place-cards`：middleware 301 指向 premium-greeting-cards，且 301 禁改；裸 slug 與類目 slug 同名但路徑不同，無衝突） |
| 定位 | 婚宴枱卡 / 席位卡（承接喜帖印刷帶錢詞集群） |
| 價格 | `price_range 'HK$2-9/張'`，basePrice 2 / en 0.26 / ja 39，minQuantity 50（沿用退役 SKU 歷史價 NT$8-35/張） |
| 圖 | 復用磁盤現成資產 `public/images/products/seedream-webp/zprintpro-place-cards-wedding-place-cards-{zh-hk,en,ja}-{hero,detail,multi-angle,variety}.webp` ×12 |
| 狀態 | `isNew: true`，`optimizedAt '2026-11-28'`，含 features/specs/seoImages |
| 插入位置 | `src/data/products.ts`「枱卡 / 席位卡」段（原注釋行已替換，SKU 加在 `];` 前） |

**效果**：10-12 退役 8 SKU 後空置的 place-cards 類目被填滿，`gen-llms.ts` 形狀斷言解除，三語 llms 可重生成。

## 2. 三語 llms 重生成（6 週滯後解除）

`npx tsx scripts/gen-llms.ts` → **84 SKU rows × 3 locales，斷言全過**。`public/llms-{zh-hk,en,ja}.txt` 已更新：
- zh-hk 第 10 行地址標籤：「香港服務點：九龍新蒲崗…（自設廠房：廣東省深圳市龍崗区平湖街道嘉城路1号）」
- 第 35 行：`枱卡 (place-cards) -- 1 products`；第 201 行 SKU 表含新 SKU。

## 3. 無來源客戶計數 / SGS 聲明撤下（34 處，`src/data/products-content.ts`）

python 批量替換，替換口徑 =「智印港長期為香港…提供…服務」，保留各行 MOQ/48 小時/FSC 等運營聲明：

| 類目 | 處數 | 撤下內容 |
|---|---|---|
| 紙袋 | 5 | 「已為 N 間」計數 |
| 海報 | 5 | 「已為 N 間」計數（含 10 張起/HKT 11:00 變體 1） |
| 利是封 | 6 | 「已為 N 間」計數 |
| 餐牌 | 5 | 「已為 N 間」計數 + 「紙張通過 SGS 食品接觸安全認證」→「紙張選用食品接觸安全材質」 |
| 信封 | 5 | 「已為 N 間」計數 |
| 教育 | 3 | 「已為 N 間」計數 |

複查：`grep -c "已為 [0-9]" src/data/products-content.ts` = **0**。
**未驗真**：各行的 MOQ/48h/FSC 等數字未逐條對 products.ts 驗真，本批只撤計數與認證強聲明。

## 4. scenario-links 規則 D 白名單（`scripts/verify-scenario-links.ts`）

規則 D（同品類目標唯一性）加 `ALLOWED_MANY_TO_ONE`：
- `japan-doujin → sku:doujinshi-printing`（9-23 + 10-12 拍板承接）
- `business-cards → sku:premium-greeting-cards`（9-20 名片解禁別名承接）
- `banners → sku:outdoor-vinyl-banners`（9-22 mesh-banners 下架承接）

**複跑：✅ 209 pass | ❌ 0 fail | VERDICT: PASS**。註：11-27 報告所稱「6 處 FAIL」實為此同一規則對拍板過承接映射的誤報，非真錯配。

## 欠賬（留批）

1. **新 SKU 的內容掛載未做**（有意為之）：products-content / product-faqs / pricing.ts / sku-seo-data 均未掛新 SKU——同族最小 SKU（如 foil-wedding-invitations）亦只有 products.ts 條目（已核實）；CSV→sku-seo-data 生成器被 apply-title-batch.mjs 警告為危險路徑（會回退 216 個線上標題、刪 24 個 SKU），**不可直接跑**。
2. **新 SKU 的 SEO title/meta 欠賬**：`title_zh「婚宴枱卡印刷 50張起 · 燙金壓紋 · 香港即日打稿」` 未過 title-equiv 50-57 半角當量校驗，須走後續 title 批安全路徑。
3. **`$$` 佔位符殘留**：foil-stickers 等加價表仍有 `$$` 佔位，待清。
4. **A2/rush 特例不再改**：現有文案已是條件句（「200 張或以下、HKT 11:00 前確認稿件可即日投產」+ 以報價確認為準），符合既定口徑。

## 復測門（不承諾首頁）

下一 GSC 窗口觀察：婚宴 / 席位卡 / place cards 相關查詢的曝光與排名；三語 llms.txt 被 AI 引擎抓取後的引用情況。
