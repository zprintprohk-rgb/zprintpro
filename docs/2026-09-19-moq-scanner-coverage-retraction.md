# 掃描器覆蓋率盲區修復 — 「0 漂移」結論撤回與更正

**日期**：2026-09-19（第四輪）
**性質**：**撤回並更正**先前報告的「MOQ 漂移 33 → 0」結論
**數據來源**：
- `scripts/moq10-books-context-scan.ts`（多 schema 支援修復後）
- `.hermes/logs/_check-schema-shapes.mjs`（各檔 key 樣式盤點）
- `.hermes/logs/_classify-drifts.mjs`（272 條分類）
- `.hermes/logs/_check-key-overlap.mjs`（SKU key 重疊度驗證）
- `.hermes/logs/moq-scan-latest.json`（完整明細，掃描器 `--json` 自動落盤）

---

## 一、撤回聲明

**原報告**（`docs/2026-09-19-moq-consistency-gate-and-scene-ssot-report.md` §六）聲稱：

> 「漂移數：33 → **0**（待裁決 0 ｜ 已核准分層 4 ｜ 🆕 新漂移 0）」

**該結論不成立，予以撤回。** 真實情況：掃描器當時只覆蓋了 5 個目標檔中的 **1 個**。

---

## 二、根因：第 4 次「0 命中 ≠ 乾淨」盲區

掃描器原本只認 `slug: 'x'` 這一種 SKU key 風格，而各目標檔的實際格式不同：

| 檔案 | key 樣式 | MOQ 樣式數 | 修復前狀態 |
|------|---------|-----------|-----------|
| `src/data/products.ts` | `slug: '...'` ×94 | 76 | ✓ 唯一真正被掃 |
| `src/data/sku-seo-data.ts` | `"slug": {` ×99（JSON key） | **390** | 🔴 **整檔跳過** |
| `src/data/products-content.ts` | record key ×78 | **295** | 🔴 **整檔跳過** |
| `src/lib/seo.ts` | record key ×40 | 31 | 🔴 **整檔跳過** |
| `src/data/category-seo-content.ts` | record key ×45 | 112 | ⚠️ SKU 級跳過（品類級已另行覆蓋） |

**覆蓋率約 76/904 ≈ 8%** ⇒ 所謂「零漂移」實為**只掃了 8% 的樣式**。

> 這是本專案第 4 次同型事故（前三次：`category-seo-content.ts` 品類級段落、
> `sku-seo-data.ts` 檔內字串被誤判為「非本批品類」、門童 manifest 的三次假陽性）。
> 共同根因：**指標（掃描範圍/判定口徑）本身錯，而非結論錯**。

---

## 三、修復（兩步）

### 3.1 多 schema 支援

為每個目標檔宣告 SKU key 樣式（`slug` / `json_key` / `record_key`），掃描器據此定位區塊邊界：

```
FILE_KEY_STYLE = {
  'src/data/products.ts':            'slug',
  'src/data/sku-seo-data.ts':        'json_key',
  'src/data/products-content.ts':    'record_key',
  'src/lib/seo.ts':                  'record_key',
  'src/data/category-seo-content.ts':'record_key',
}
```

修復後候選數：**0 → 672 條**。

### 3.2 跨品類歸屬排除（672 → 272）

672 條抽樣即發現**大量歸屬錯誤**（假陽性）：

| 抽樣 | 實際語境 |
|------|---------|
| 賀卡 SKU 區塊內「防水 Vinyl／透明 PVC 50 張起，銅版紙…100 張起」 | 實為**貼紙** FAQ |
| 賀卡 SKU 區塊內「同仕様クラフト紙袋 500 枚から」 | 實為**紙袋** |
| 賀卡 SKU 區塊內「500 個起印已可壓到…」 | 實為**包裝盒** |

根因：這些檔的內容是**跨品類綜合**（一段/一篇同時講多品類），
「後向最近 SKU key」的歸屬假設在此**不成立**（該假設只對 `products.ts`
這種「一 SKU 一區塊」的結構有效）。

修法（僅對非 `products.ts` 的檔生效，避免誤殺結構乾淨者）：
1. 數字**緊鄰前 18 字**內出現其他品類名 → 歸屬可疑，排除
2. 該行同時出現 **≥2 個品類名** → 綜合段落，排除

→ **672 → 272 條**（切除 400 條假陽性）。

---

## 四、真實存量：272 條（已分類，已登錄閘門）

| 分類 | 條數 | 處置 |
|------|------|------|
| `moq_display`（我方起印量門檻） | **187** | 應對齊真值 → 可批量修正 |
| `price_tier`（價格承諾綁數量檔） | 48 | **不可機械改數字**，須核對價表檔位 |
| `industry_fact`（行業事實陳述） | 37 | 保留 |

**分布**：`sku-seo-data.ts` 229 ｜ `products-content.ts` 39 ｜ `category-seo-content.ts` 4

**⚠️ 分類精確度的已知限制**：抽樣發現啟發式分類**仍不完美**，例如
`foil-red-packets` 的 ja 文案「本商品は100個から対応し、少量の急ぎは10枚から承ります」
（本品 100 個起、少量急件 10 枚起）我方數字**正確**，卻被歸為 `price_tier` 待核。
⇒ 這 272 條是**待人工複核的清單**，不是「已確認的 272 個錯誤」。

**SKU 歸屬可信度驗證**（`_check-key-overlap.mjs`）：
`sku-seo-data.ts` key 99 個 / 與真值表重疊 **93** / 孤兒 6（即已知的 `japan-doujin`
子商品 `small-bags`/`doujinshi-printing`/`acrylic-keychain`/`can-badge`/`postcard-set`/`eco-tote-bag`，
無頂層 slug → 正確跳過）；`products-content.ts` 78/78 全重疊。
⇒ 歸屬基礎可用，272 條為真實候選。

---

## 五、閘門狀態（語義三分，未把存量說成乾淨）

```
📋 已登錄待修 268 ｜ ✅ 已核准分層 4 ｜ 🆕 新漂移 0
```

- `PENDING_FILE_PREFIXES`：按「根因 + 檔案」粒度登錄存量（272 條同一根因）
- 顯示為 **📋 已登錄（未解）**，與 **✅ 已核准**（已定案口徑）語義明確分開
- 明細可查：`.hermes/logs/moq-scan-latest.json`

---

## 六、下一輪建議（K3 已列入短期項）

1. **分批修正 187 條 `moq_display`** —— 建議按檔案分批（先 `sku-seo-data.ts`），
   每批附前後斷言（沿用 `moq10-repair-drift.ts` 的「改前 hit==1 / 改後 hit==0」模式）
2. **48 條 `price_tier` 人工核對** —— 需對照 `price-tables/*.json` 檔位，不可機械替換
3. **37 條 `industry_fact` 保留** —— 行業事實陳述，非我方報價
4. **分類器精確化** —— 現行啟發式誤判（如「本品 100 起、少量 10 枚起」）需按
   `print-method-policy.ts classifyMoqString()` 的正式語義重寫，並先 dump 樣本再寫正則
   （§0.23.2 第 1 條：先看真實樣本）
5. 待 K3 裁決的四項（雙資料源對齊 / 孤兒類別 / `categoryFallbacks` 視覺）不變
