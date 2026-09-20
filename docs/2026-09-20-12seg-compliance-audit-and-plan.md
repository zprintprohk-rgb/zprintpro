# 三語 Blog 長文 × V5.1 12 段骨架 + 標題規則 合規審計與執行方案

**日期**：2026-09-20 21:25
**審計對象**：昨天（9/19）與今天（9/20）執行涉及的全部深度長文 × 3 locale，共 6 篇 18 組合：
`packaging-box-pricing-2026` / `sticker-material-pvc-vinyl-removable` / `poster-printing-guide` /
`campus-education-printing-pillar-guide` / `foil-stamping-3-applications-2026` / `hong-kong-printing-cost-baseline-2026`
**數據來源**：
- 權威判定：`node scripts/guards/blog-quality-12-rules-guard.js --online --json`（2026-09-20 實測，線上 curl 斷言，INVALID=0）→ 證據 `.hermes/reports/blog-12seg-checklist-2026-09-20-online.json`（PASS=128 / FAIL=33 / WARN=19）
- 標題當量：`scripts/guards/title-equiv.js` `equiv()`（TITLE_MIN=50 / TITLE_MAX=57，半角當量）
- 昨日對照：`.hermes/reports/blog-12seg-checklist-2026-09-19-online.json`（15 組合全 FAIL）
- 結構指標：本地 `src/data/blog-data/*.json` 結構解析（禁正則猜歸屬，避坑 12）

---

## 一、結論先行

**不符合。** 骨架層（段 12 schema / 段 9 FAQ / 段 2 答案塊 / 段 4 表格）昨天修的已生效且線上驗證通過；但 **33 個段級 FAIL + 19 個 WARN 未清**，且 **16/18 組合標題超過 50-57 當量標題線**。最嚴重的不是內容缺陷，而是**門禁覆蓋缺口**：`hong-kong-printing-cost-baseline-2026`（三語 FAQ=0）和昨天新上的 3 篇長文根本不在任何門童視野內——它們合規與否目前**無人知曉也無人攔**。

## 二、已合規（昨天修的，今天線上複測確認生效）

| 段 | 狀態 | 證據 |
|---|---|---|
| 段 12 Schema | ✅ 18/18 線上 PASS | 內嵌 JSON-LD 已 strip（B2 批 2-4 + foil 批），page.tsx 生成區 `WebSite/Article/BreadcrumbList/SpeakableSpecification/FAQPage/HowTo` 齊全，`blocks=6+0`（內嵌=0） |
| 段 9 FAQ | ✅ 守門 5 篇合規（4-8 組區間） | packaging 4 / sticker 4 / poster 5(zh-hk)-7(en/ja) / campus 5 / foil 6——foil ×3 與 print-specs/school-exercise/roll-up-banner 的 B3 批全綠 |
| 段 2 快速答案塊 / 段 4 比較表格 | ✅ 全 PASS | bg-*-50 ≥3、`<table>` ≥2 |
| 段 3 H2 問句（poster/campus/packaging） | ✅ PASS | 9/19「口徑分叉裁決 iii + poster 段錨改寫」生效 |

## 三、未合規清單（33 FAIL + 19 WARN，按段歸類）

| 段 | FAIL | WARN | 涉及組合 | 性質 |
|---|---|---|---|---|
| 段 8 GEO 知識原子 | 12 | 3 | 5 篇 ×3 語全缺【】金句；campus 三語有 `<section>` 無【】（WARN） | **最大單類缺陷**；12 件事實（K3 8/19 口徑）有現成模板可機械化 |
| 段 5 原創數據來源 | 0 | 12 | 5 篇 ×3 語 | 每篇補「數據來源：」行（§0.23 格式現成），機械 |
| 段 6 客戶案例 | 7 | — | poster ×3、campus ×3、packaging ja | 無案例且無「待校準」標註；一手案例需 008 案例庫，**無源不得編** |
| 段 7 E-E-A-T | 6 | — | poster ×3、campus ×3 | 缺 LinkedIn 署名信號 |
| 段 3 H2 問句 | 3 | — | sticker ×3（問句 6-7/15 <50%，例：「QUV 1000 小時加速老化測試…」為陳述式） | 段錨改寫 = churn，比照 poster en/ja 前例**需 K3 授權** |
| 段 10 CTA | 2 | 1 | poster en/ja=0；sticker ja=1 | 機械補 WhatsApp CTA |
| 段 11 語義內鏈 | 3 | — | poster en(7)/ja(8)、packaging zh-hk(9) <10 | 機械補達標內鏈 |
| **標題 50-57 當量** | — | — | **16/18 OUT** | 見第四節 |

**標題超長實測（當量）**：en cost-baseline **123**、en sticker 100、en foil 99、en poster 91、ja sticker 90、zh-hk cost-baseline 84、en packaging 81… 全部 >57 = 門童 band TRIM 區，SERP 截斷風險 + 主詞後置稀釋。僅 zh-hk packaging(56) 與 zh-hk foil(56) 合格；campus en(59) 貼線。

## 四、三個門禁覆蓋缺口（本次審計最重要的機制發現）

1. **門童 #14 硬編碼 5 個 slug**：`hong-kong-printing-cost-baseline-2026` 三語 FAQ=0、內嵌 @type=6——門童報「0 命中」。昨天新上的 `roll-up-banner-printing-guide`（6c56a2cb）、`print-specs`、`school-exercise`（B3 FAQ 批）全在門外。
2. **blog-standard-guard 的 Pillar 觸發器只認 slug/title 含 "pillar"**：其餘 5 篇長文的**標題當量與字數下限無任何門禁**（本次 16/18 標題 OUT 即無人攔的後果）。
3. **SSoT 第二部分（blog title 50-60 raw chars）與守衛實現（50-57 半角當量，2026-09-15 統一口徑）聲明分叉**——避坑 16 活例，須做取代式標注（能力 8）。

## 五、執行方案（依賴序，每步含驗收口徑）

| 批 | 內容 | 前置 | push 規劃 |
|---|---|---|---|
| **E0 門禁擴容** | ① #14 slug 清單配置化：+cost-baseline、roll-up-banner、print-specs、school-exercise；② blog-standard-guard Pillar 觸發器改清單制（含上述 6 篇）；③ SSoT 第二部分 50-60 → 50-57 當量取代式標注 | 無爭議可自執行 | 與 E1 合 1 push |
| **E1 batch C** | hk-cost-baseline 三語 FAQ ×6 + strip 內嵌（應用器已 dry-run 全綠） | §0.35.7 雙條件 | 同上 |
| **E2 GEO 原子段** | 5 篇 ×3 語補【】金句段（12 件事實 K3 8/19 口徑，三語模板一次成型，campus 補【】轉 PASS） | E0（否則改了看不見） | 與 E3-E4 合 1 push |
| **E3 數據來源行** | 5 篇 ×3 語補「數據來源：」行（§0.23 格式） | — | 同上 |
| **E4 CTA+內鏈** | poster en/ja CTA ×2、sticker ja CTA ×1、達標內鏈 ×3 | — | 同上 |
| **E5 案例+E-E-A-T** | 段6：有 008 案例庫來源則補，無則顯式標「待 008 案例庫校準」；段7 LinkedIn：無真實 URL 不得編，標 PENDING | **需 K3 定信源** | 獨立 push |
| **E6 sticker 段3 問句化** | 3 語段錨改寫（比照 poster en/ja 已批先例） | **需 K3 授權（churn）** | 與 E5 合或獨立 |
| **E7 標題整改** | 16 OUT 標題 TRIM 到 50-57 當量（主關鍵詞前置、品牌後置一次）；複用 census 工具出批次報告 | **建議獨立一輪**（量大、涉主排名詞） | 獨立 push |

**預算**：4 次 build（E0+E1 / E2-E4 / E5+E6 / E7），在 Cloudflare 月度配額紀律內。
**紅線**：E2-E4 全部追加式/標注式，不改既有正文段落（churn 紅線）；E5 無源標註不編數；E7 改標題前對每篇記錄舊 title（rollback 賬本）。

## 六、對「符合了嗎」的直接回答

骨架的**渲染層與結構層**（段 9/12 + 答案塊 + 表格）昨天修的符合了，今天線上複測屬實；**內容深化層**（段 5/6/7/8）與**標題層**不符合，且缺口最大的兩篇（cost-baseline、roll-up-banner）連被檢查的資格都還沒有——E0 是其他一切的先決條件。
