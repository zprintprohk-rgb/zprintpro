# Step 2 — price-data 跨語系語言污染「源頭治理 + 重生成」驗收報告

- 狀態: **READY**（未 commit / 未 add / 未 push；工作區改動可複核）
- 日期: 2026-09-19（工作區時間）
- HEAD: `5e377dd5bc06a465a3c467c6c1946a0566b52ede`（未動）
- 污染檔案: `src/lib/price-data.generated.ts`（SOP-5 派生檔，**未手搓**，一律由生成器重生成）

## 1. §3 驗收實測數字（缺一不可，全部實測）

| # | 項目 | 要求 | 實測 | 結論 |
|---|------|------|------|------|
| 1 | 數值零改動 | 100% 逐位元組相同 | 數值 token 序列 3137 個 **差量 = 0**；結構深度比對 7638 paths **完全相同**；tiers 指紋 636 檔位全同（qty Σ=1465020 / HKD Σ=1132682 / USD Σ=145030 / JPY Σ=22653640）；UNIT_PRICE_ANCHORS 504 paths 全同；原文 1187 個含數字 token 逐條存活 | **PASS** |
| 2 | diff 範圍 | 只有本任務 3 個檔 | `git diff --stat` 中，任務開始前的 6 個檔行數**一字不變**；新進 diff 僅 `scripts/gen-price-data.mjs`(105) + `src/lib/price-data.generated.ts`(716)；新模組 `scripts/lib/price-label-i18n.mjs` 為 untracked 新檔 | **PASS** |
| 3 | diff 性質 | 只改 `productName.*` / `configs[].label.*` 字串值 | 新增 358 行 = 刪除 358 行，逐行 100% 是 `"zh-hk"/"en"/"ja": "…"` 字串值行（zh-hk 116 / en 121 / ja 121）；key 名 / 結構 / 順序 / 行數改動 = 0 | **PASS** |
| 4 | 污染歸零 | A、B 歸零 | A 252→131（**en 121→0**；ja 131 條全為含假名之正確日文，見 §3 說明）；B 90→4（唯一命中字 `格` = 繁簡同形字誤報，語系正確判準 B-strict 4→0）；C 121→**0** | **en PASS / zh-hk PASS**；ja 為合法殘餘（詳 §3） |
| 5 | 可重生成 | 二次生成 diff = 0 | 二次生成 sha256 相同（`016a4b24…92be`），byte diff = **0** | **PASS** |
| 6 | tsc | 錯誤數 = 54 | **54**（全數落在 `src/lib/quote-engine/__tests__/*`，本檔 0 錯；`tsconfig.exclude` 含 `scripts`） | **PASS** |
| 7 | 簡體掃描 | 無新增命中 | `node scripts/scan-simplified.mjs` → 0 命中（**但注意 §3.3：該腳本只掃 `src/data/products.ts`，不覆蓋本檔**） | **PASS（附註）** |

### 1.1 `git diff --stat` 實際輸出

```
 .hermes/industry-keyword-matrix.json            |  96 ++++      ← 任務前既有, 行數不變
 .hermes/logs/cron-execution-report.md           |   1 +         ← 任務前既有, 行數不變
 AGENTS.md                                       |  10 -         ← 任務前既有, 行數不變
 GSC数据/index.json                              | 115 +++-      ← 任務前既有, 行數不變
 scripts/gen-price-data.mjs                      | 105 +++-      ← 本任務
 src/app/[locale]/product/[slug]/page.tsx        |  29 +-        ← 任務前既有, 行數不變
 src/components/category/CategoryProductCard.tsx |  18 +--       ← 任務前既有, 行數不變
 src/lib/price-data.generated.ts                 | 716 +++++----- ← 本任務
 8 files changed, 690 insertions(+), 400 deletions(-)
```

### 1.2 產出檔案

- `scripts/lib/price-label-i18n.mjs`（新增，untracked，21,948 B）— 零件級術語詞典 + 切片/重組管線
- `scripts/gen-price-data.mjs`（修改）— 三語系鍵位分別取 `localize/localizeName`；寫盤前斷言
- `src/lib/price-data.generated.ts`（重生成，169,948 B，UTF-8 無 BOM / LF）
- 校驗腳本（`.hermes/_probe-pb/`）: `verify-price-numeric-parity.mjs`、`verify-diff-shape.mjs`、`verify-price-determinism.mjs`、`scan-price-pollution-v2.cjs`、`audit-price-i18n.mjs`、`_negative-test.mjs`
- 備份（`.hermes/_bak-pricedata-20260918/`）: 原始 `.ts` / `.mjs` / 污染報告 JSON / 掃描輸出 / 任務前 git status 與 diff --stat / 全部驗收輸出 `verify-*.txt`

## 2. 做法（零件級，非逐條硬翻）

源頭文法 `{產品}-{紙張}[{克重}]-{盒型/裝訂}-{尺寸}-{面數}-{工藝}[…],{工藝}…` → 以「長度優先全字串詞典」切片，逐零件映射後按語系重組：

- 詞典 **112 條術語 / 200 個鍵**（含簡繁變體、供應商錯字變體如 `加强蕊`→`加強芯`）
- 僅替換術語片段；**所有非術語字元（數字、`350g`、`90X60X30`、`10x10`、括號、`-` `,` `·` `/`、`【】`）逐字元保留**（僅在拉丁譯文緊鄰數字時補一個可讀性空白；zh-hk 零空白插入）
- 專門術語對齊站內既有譯法：en `airplane box / lock-bottom box / double tuck box / foil stamping / spot UV`，ja `飛行機箱 / ロック底箱 / 両挿箱 / 中綴じ / 無線綴じ / 箔押し / 光沢ラミネート / グレー板紙 / 書籍用紙 / アート紙 / 型抜き / 吊り下げ口`，zh-hk `飛機盒 / 雙插盒 / 黏吊口 / 燙金 / 擊凸 / 貼膠片 / 印白墨 / 逆向UV`
- **未收錄零件 = 0**（`unresolved = 0`），即**沒有任何零件因為無法高置信翻譯而被保留原文**

## 3. 需要主執行層知道的 4 個偏離／誠實標註

### 3.1 A 類未字面歸零：ja 殘餘 131 條（en 已 0）
原掃描器 A 類判準 = 「en **或 ja** 鍵位含漢字」，但日文本來就用漢字。修復後 A = **131 條全為 ja**（en = 0），且：

- ja 零假名漢字串（C 類）= **0**
- ja 含簡體專用字 = **0**
- 131/131 條 ja 值**全部含假名**（例：`合版カードボックス-350gコートボール(305g)(超高嵩)[350g]-標準ロック底箱-90X60X30-片面-型抜き[異形],ラミネート[光沢ラミネート],吊り下げ口,のり付け`）

⇒ 殘餘為**正確日文**（且 §4 指定的日文術語本身即為漢字假名混寫：型抜き/箔押し/両面/片面/書籍用紙）。若要字面 A=0，只能把日文全部改成純假名（如 `異形→イケイ`），那會**違反 §4 且破壞日文品質**，故未做。

### 3.2 B 類 4 條 = 掃描器誤報（唯一命中字 `格`）
`格`（U+683C）為**繁簡同形字**，原掃描器字表把它當簡體（因 `价`/`格` 連寫被收進表）。證據：
- 本檔 zh-hk 值中命中字**只有** `格`（來自 `格仔底紙`，港式正確用字）
- 同一字表套到**既有已上線** `src/data` 文案上命中 **1876 次**，其中 `格` 651 次（`規格` 13 次、`價格` 26 次）⇒ 該字表本身就會誤報正確繁體港式文案
- 語系正確判準（剔除同形字）B-strict = **0**

### 3.3 `scripts/scan-simplified.mjs` 不覆蓋本檔
該腳本只讀 `src/data/products.ts` 的 `title_zh` / `name`，**不掃 `price-data.generated.ts`**。因此它的 0 命中**不構成**對本檔的證據；本檔的簡體檢查由下列三重負責並全綠：
1. 生成器寫盤前斷言（zh-hk 簡體專用字 = 0）
2. 生成器「**字元來源守衛**」：zh-hk 每個字元必須來自詞典繁體值或源頭非術語字元（否則中止寫盤）
3. `scan-price-pollution-v2.cjs` 複掃（B-strict = 0）+ 人工複核 zh-hk 輸出的 143 個 distinct 漢字（全為繁體正確字形）

### 3.4 過程中發現並修掉一個自身缺陷（附負向測試）
第一輪修復後，`localizeName` 仍會沿用 JSON 內的 **zh-hk 策展值**，導致 `瓦楞彩盒(专版)` / `白卡手提袋(专版)` / `数码贴纸(专版)` 的簡體 `专` 漏出（原掃描器與我的第一版字表都漏檢 `专`）。已修：
- zh-hk **一律**由源頭字串本地化（不再沿用 JSON zh-hk）
- 新增「字元來源」守衛 + 擴充簡體字表（補 `专 贴 纸 册 烫 订 货 运 …`），且**只套用 zh-hk**（日文新字體 学/国/体/点/双 不誤判）
- **負向測試（證明守衛為真守衛）**：用 Node 注入原缺陷重跑生成器 → `exit 1`、命中 2 條守衛訊息（`含簡體專用字: 专` / `出現非詞典/非源頭字元: 专`）、**輸出檔 sha256 不變（未寫盤）**、測試後模組原樣還原

## 4. 無法高置信翻譯而保留原文的零件清單

**0 條**（`unresolved = 0`，無任何零件以原文殘留）。

以下為**已翻譯但無 §4 直接對照、建議主執行層複核**的中信心零件（若不同意可直接改詞典一處即全站一致）：

| 原文 | en（採用） | ja（採用） | 備註／替代 |
|------|-----------|-----------|-----------|
| 贴胶片 | Film patch | フィルム貼り | 0.15mm 膠片補片；替代 Film sticker patch |
| 切成品 | Trimmed to size | 断裁済み | 替代 Cut to finished size |
| 大度32开 | Large size 32mo | 大判32判 | 尺寸數字（140X210）原樣保留；ja 判＝開數 |
| 每卷张数 | Labels per roll | 巻あたり枚数 | — |
| 出标方向横版左出标 | Unwind direction landscape left unwind | 繰り出し方向横位置左出し | 標籤卷出標方向 |
| 條骨（2條骨） | creases | 山 | 港式「骨」= 摺；2條骨 → 3 面 |
| 急件标准 | Rush standard | 急ぎ標準 | — |
| 本厂材料 | In-house material | 自社材料 | 供應商自備料 |
| 格底（底紙） | Grid backing | グリッド台紙 | zh-hk 採港式「格仔底紙」 |
| 灰卡 | Grey board | グレー板紙 | 依 §4 |
| 双胶纸 | Woodfree offset paper | 上質紙 | 非 §4 條目 |
| 铜版纸高松 | High-bulk art paper | 高嵩アート紙 | — |
| 加度/加强芯 | Reinforced core | 補強芯 | 供應商錯字 `加强蕊` 已在 zh-hk 正字化為 `加強芯` |
| 单粉卡 | C1S art card（§4） | コートボール（§4） | 術語自帶數字 `1`（C1S = coated one side），非價格數字 |
| 耐（逆向UV） | Reverse UV | リバースUV | 依 §4 |

## 5. 關鍵指令（皆為實跑）

```
node .hermes/_probe-pb/scan-price-pollution.cjs                 # 基線: 396 欄位 / A 252 (en121+ja131) / B 90 / C 121
node scripts/gen-price-data.mjs                                  # 重生成 (含寫盤前斷言)
node .hermes/_probe-pb/verify-price-numeric-parity.mjs <before> <after>   # PASS 數值差量 0
node .hermes/_probe-pb/verify-diff-shape.mjs                     # PASS 358 行全為語言字串值行
node .hermes/_probe-pb/scan-price-pollution-v2.cjs               # PASS en 0 / ja 中文 0 / zh-hk 簡體 0
node .hermes/_probe-pb/scan-price-pollution.cjs                  # A 131 (全 ja) / B 4 (格 誤報) / C 0
node .hermes/_probe-pb/audit-price-i18n.mjs                      # unresolved 0 / 語系乾淨度問題 0 / C 0
node .hermes/_probe-pb/verify-price-determinism.mjs              # PASS 二次生成 byte diff 0
node .hermes/_probe-pb/_negative-test.mjs                        # PASS 守衛為真守衛 (注入缺陷即攔下, 未寫盤)
npx tsc --noEmit                                                 # 54
node scripts/scan-simplified.mjs                                 # 0 命中 (範圍僅 src/data/products.ts, 見 3.3)
git diff --stat / git status --porcelain                         # 範圍核對 (見 1.1)
```

## 6. 未做（本任務邊界）

- 未 `git add` / `git commit` / `git push`（留給主執行層 / K3 複核後提交）
- 未動 `src/app/[locale]/product/[slug]/page.tsx`、`src/components/category/CategoryProductCard.tsx`、`src/data/print-method-policy.ts`（其他 lane 的未提交改動，行數與任務前一致）
- 未動任何數值 / 結構 / tiers / UNIT_PRICE_ANCHORS（已用 3 個獨立腳本證明差量為 0）
