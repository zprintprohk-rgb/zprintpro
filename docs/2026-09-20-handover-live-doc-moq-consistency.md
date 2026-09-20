# 交接活書 · MOQ 口徑同步波（2026-09-19 ~ 09-20）

> **讀者**：接手的執行層（人工或 agent）
> **狀態時間**：2026-09-20（`origin/main` 見文末探針結果）
> **配套技能**：`docs/skills/multi-layer-moq-consistency-audit.md`（避坑與能力沉澱）

---

## §1 接手三步（先做這個）

```bash
# 1) 確認基線綠燈（應全綠）
cd F:/zprintpro-nextjs
npx tsc --noEmit                                   # 期望 54（基線）
npx tsx scripts/moq10-books-context-scan.ts --gate  # 期望 PASS（🆕 0）
node scripts/gen-guard-manifest.mjs                 # 期望 0 衝突
node scripts/assert-sku-seo-keys.mjs                # 期望 PASS（總 key 99）

# 2) 讀當前存量（機器可讀）
cat .hermes/logs/moq-scan-latest.json        # moq10 掃描明細（310 條）
cat .hermes/logs/moq-anchor-scan-latest.json # anchor 掃描（244 條，模糊 94）
cat .hermes/logs/moq-scanner-intersection.json # 兩套交集（嚴格 0）

# 3) 看未結事項
見本檔 §5
```

**⚠️ 動手前必讀**：`docs/skills/multi-layer-moq-consistency-audit.md` 的 §2/§3（10 次指標踩坑 + 6 次解析器自糾）—— 這些坑會重複出現。

---

## §2 已完成（勿重做）

| # | 交付 | commit | 驗證 |
|---|------|--------|------|
| 1 | **MOQ 閘門 #24** 接入 pre-commit（`scripts/moq10-books-context-scan.ts --gate`） | `27563b9c` 系列 | PASS 🆕0 |
| 2 | **真值對齊**：22 條紙品 SKU→10、6 書刊→10、A1→1、A2→10、art-posters→1、menus 4 SKU→10 | 多 commit | 線上探針 ✅ |
| 3 | **場景卡片 SSoT 驅動**（`SCENE_MOQ_SOURCE` / `sceneMoqLabel` / `withSceneMoq`） | `27563b9c` | PASS 15/0 |
| 4 | **品類頁 MOQ 一致性檢查**（渲染層 5 面） | 同上 | PASS 32/0 |
| 5 | **`unitLabel` 欄位**（menus 5 SKU：張/份/本）+ `UNIT_LOCALE_MAP` 三語 | `b59d612c` | PASS 23/0 |
| 6 | **膠印經濟門檻** 200→300 | `d6c15c89` | 邊界 299/300 驗證 |
| 7 | **描描器多 schema + 跨品類排除**（覆蓋率 8%→完整） | `dc1b4c28` | 672→272 |
| 8 | **`guard-manifest.json`**（23 編號 / 490 規則 ID / 0 衝突） | `cc1d5293` | 0 衝突 |
| 9 | **`categoryFallbacks` 統一漸層**（13 鍵） | `0c3d13b2` | 13/13 一致 |
| 10 | **`banners` key 對齊**（修功能 bug：舊 key 兩表都查不到） | `40af9e6e` | 3/3 |
| 11 | **menus 模板句**逐 SKU 修正（10張/10份/10本/10份/100份） | `3ed9c60f` | 線上 ✅ 5/5 |
| 12 | **business-cards 方案 B 四步**（明文化別名 + 補齊 + 兩處映射） | `e96899ce` | PASS 12/0 |
| 13 | **`assert-sku-seo-keys.mjs`**（方案 C 第一步，3 條斷言+snapshot/compare） | `a9b03e9d` | PASS |
| 14 | **anchor∩moq10 嚴格交集 22 → 0** | `2702f7a0` | 交集 0 |
| 15 | **雙數據源驗證**（5 類別 PASS 23/0） | `a23e80ab` | PASS |

---

## §3 關鍵檔案地圖

### 真值與政策（SSoT）
| 檔案 | 角色 |
|------|------|
| `src/data/products.ts` `minQuantity` | **唯一真值**（94 SKU） |
| `src/data/print-method-policy.ts` | MOQ 展示口徑、`SCENE_MOQ_SOURCE`、`STICKER_SUBCATEGORY_MOQ`、`OFFSET_*`、`classifyMoqString()` |
| `src/data/industry-scenario-links.ts` | `SCENARIO_LINKS`（href）+ `SCENARIO_INDUSTRY_NAMES`（行業名） |

### 掃描器與閘門
| 檔案 | 用途 |
|------|------|
| `scripts/moq10-books-context-scan.ts` | **門童 #24**（來源層；多 schema；`--gate`） |
| `scripts/moq25-anchor-scan.ts` | Anchor 掃描（**standalone，未接 hook**） |
| `scripts/assert-sku-seo-keys.mjs` | key 集合斷言（方案 C 第一步） |
| `scripts/gen-guard-manifest.mjs` | 門童編號防撞（pre-commit 3.7） |
| `.hermes/logs/_intersect-scanners.mjs` | 兩套交集 |

### 修正工具（可複用模板）
| 檔案 | 模式 |
|------|------|
| `.hermes/logs/_fix-intersection.mjs` / `_fix-intersection2.mjs` | 逐條前後斷言 + 整批中止 |
| `.hermes/logs/_fix-menus-template-moq.mjs` | 逐 SKU 用 `unitLabel` 組句 |
| `.hermes/logs/_apply-menus-truth.mjs` | 真值修正（含「保留項」驗證） |
| `.hermes/logs/_sync-menus-faq-to-ts.mjs` | SOP-5 例外（key 數不變斷言） |

### 報告
| 檔案 | 內容 |
|------|------|
| `docs/2026-09-19-moq-consistency-gate-and-scene-ssot-report.md` | 主報告 |
| `docs/2026-09-19-moq-scanner-coverage-retraction.md` | **撤回「0 漂移」**（覆蓋率 8%） |
| `docs/2026-09-20-sku-seo-data-regen-hazard-and-sop5-exception.md` | 重生成丟 25 SKU 事故 + SOP-5 例外 |
| `docs/2026-09-20-business-cards-inventory.md` / `-key-reference-audit.md` | 對照清單 + 引用面 |
| `docs/2026-09-19-duplicate-datasource-audit.md` | 40 組重複源盤點 |
| `docs/skills/multi-layer-moq-consistency-audit.md` | **技能沉澱** |

---

## §4 常用命令

```bash
# 掃描（任何模式都落盤 JSON）
npx tsx scripts/moq10-books-context-scan.ts            # 人讀
npx tsx scripts/moq10-books-context-scan.ts --gate      # 閘門（hook 用）
npx tsx scripts/moq25-anchor-scan.ts                    # anchor（SKU 中心）
node .hermes/logs/_intersect-scanners.mjs               # 求交集
node .hermes/logs/_anchor-triage.mjs                    # 模糊項三分類

# 斷言
node scripts/assert-sku-seo-keys.mjs [--snapshot|--compare]
node scripts/gen-guard-manifest.mjs [--write]

# 線上探針
node .hermes/logs/_probe-menus-template.mjs             # menus 模板句
node .hermes/logs/_probe-deploy-progress.mjs            # 雙 marker 判部署
node .hermes/logs/_probe-k3-batch2.mjs                  # art/a2/stickers
```

---

## §5 未結事項（按優先序）

### P1 · 方案 C 第二、三步（**獨立一輪，勿與他項混批**）
- **背景**：`sku-seo-data.ts` 是「生成器產物 + 手工擴充」混合檔（CSV 75 列 vs 檔內 99 key）。
  2026-09-20 重跑生成器**丟失 25 個 SKU**（已還原）。
- **第一步已完成**：`scripts/assert-sku-seo-keys.mjs`
- **第二步**：備份腳本（用 node `fs.copyFileSync` + 逐字驗證 — PowerShell `Copy-Item` 曾靜默失敗）
- **第三步**：在 `sku-seo-data.ts` 加 `GENERATED_START/END` + `MANUAL_START/END` 標記；
  生成器只讀寫 GENERATED 區；生成前後跑 key 集合斷言
- **前置**：讀 `docs/2026-09-20-sku-seo-data-regen-hazard-and-sop5-exception.md`

### P1 · anchor 精度改進 → 接門童 #25
- **現狀**：模糊率 94/244 ≈ **39%**（目標 <10%）
- **★ 已揭露**：三分類結果**不可採信** — 分類器有歸屬誤判
  （樣本：`[textbooks]` 命中 anchor「培訓手冊」但該段實為 `spiral-notebooks` 文案）
- **建議**：要求 anchor 為「**段落主體**」（出現在該段前 30 字內，或該段唯一 SKU anchor），
  而非任意位置出現的子詞 → 重跑三分類 → 再評估達標
- **未達標前不接 hook**（避免「0 命中 ≠ 乾淨」型誤讀）

### P2 · `assert-sku-seo-keys.mjs` warn-only 接入 pre-commit
```bash
node scripts/assert-sku-seo-keys.mjs || true   # 累積 2-3 輪無誤報後轉硬閘門
```

### P2 · 存量 310 條待複核（`moq10` 差集）
- 交集已清零 → 剩餘為兩套掃描器各自的差集（精度較低）
- **方法**：先跑 anchor 精度改進，再用新交集取高精度批
- **不可**直接當作「310 個錯誤」——含行業事實（`industry_fact`）、價格檔位（`price_tier`）、
  共享模板，需逐條判語境

### P3 · 雙數據源剩餘類別
- `banners` / `posters` / `stickers` / `envelopes` / `business-cards` **已驗證 PASS**
- 未驗證：`packaging` / `paper-bags` / `menus` / `red-packets` / `calendars` / `books` /
  `educational` / `japan-doujin`（用 `_verify-scenario-resolution.ts` 的方法擴充 TARGETS 即可）

---

## §6 交接注意事項（血淚版）

1. **每次結論前問**：「我的指標本身對嗎？」→ 跑雙方法復算
2. **看到「0 命中」先懷疑覆蓋率**（本案 4 次同型：整檔跳過/品類級跳過/schema 不認）
3. **改 TS 物件勿用「正則+深度」** → 用 `edit`
4. **修完必重掃**：變體往往分多輪（本案 22→19→4→0）
5. **禁區**：`middleware.ts` 301、名片落地頁、賀卡資產文案（§0.0）
6. **推前查窗口**：`node scripts/check-push-window.mjs`（§0.25 需 ≥30 min；K3 可授權豁免）
7. **禁區外的「看似矛盾」先判語境**（本案 3 例證明「不改」才對）
