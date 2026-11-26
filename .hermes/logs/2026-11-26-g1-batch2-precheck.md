# 批 2 直答塊預檢報告（六問真值對照 + 生成器鏈路確認）

- 執行：Kimi Work 人手會話（首席 SEO/AEO/GEO 數據戰略分析師）
- 觸發：K3 2026-11-26 12:14「先做一輪批 2 直答塊的預檢（六問真值對照 + 生成器鏈路確認）…按最優推薦繼續下一步」
- 對象：任務卡 FIX-20261125-G1-DIRECT-ANSWER-BLOCKS（READY）+ 草案 `重要文件/2026-11-26-g1-direct-answer-blocks-3pages-draft-v1.md`
- 性質：只讀核查 + docs/logs 面修正（零 src 寫入）

## 一、六問真值對照（逐項復核，非抽查）

### 頁 1 food-boxes —— ✅ 全綠，可落地
| 聲稱 | 復核結果 |
|---|---|
| MOQ 100 · HK$2.5 · HK$2.5-18/個 · 階梯 100×1/500×0.85/1000×0.7 · 尺寸 ×1/1.6/2.5 | ✅ products.ts L3001-3055 逐項符 |
| 350g 白卡/400g 灰底白板 · PE/PLA · 15×10×5~25×20×8cm · 免費刀模 | ✅ L2987-2999 逐項符 |
| 生產 3-5 工作天 · 順豐 1-2 日 · DHL 2-4 | ✅ PDP live 原文同值 |
| 加急 24h 打稿+2 天生產 +20% | ✅ **實在 food-boxes PDP live 原文**（草案 §1 原標「rush 頁」不確，已修正出處標注） |
| 包裝盒不適用隔夜急件 | ✅ rush 頁急件適用清單（傳單/小冊子/摺頁等）無包裝盒 |
| 滿 HK$500 免運 | ✅ pricing.ts 錨 sub「滿$500包郵」在頁 |

### 頁 4 transparent-stickers —— ✅ 修正後可落地
| 聲稱 | 復核結果 |
|---|---|
| MOQ 10 · HK$0.38 · 階梯 10×2.35/100×1/500×0.75/1000×0.6 · PET 白墨 · 20–120mm | ✅ products.ts L797-846 逐項符 |
| 生產 5-7 工作天 | ✅ G1 真值矩陣兩輪複核值（audit-20261125-g1-truth-check.md L39） |
| ~~附加費 30-50%~~ | ❌ **全 src + rush 頁 live 均無此值**（rush 頁僅「（附加費）」無百分比）→ v1.2 改「以報價確認」（§0.23 無來源數字紅線，門童 #1 編造 lint 必攔） |
| en 適配行 production 2-3 days | ⚠️ 與 zh 正文 5-7 矛盾（v1.1 改正文漏改適配行）→ v1.2 已修 5-7 working days；en/ja 本批不做，防後續誤用 |

### 頁 2 a2-posters —— ✅ 修正後可落地
| 聲稱 | 復核結果 |
|---|---|
| MOQ 10（K3 9-19 裁決）· HK$16 · 階梯 0.72/0.56/0.35/0.19/0.14 · 157g 升 200g/相紙 | ✅ products.ts L2484-2530 逐項符 |
| 300 張 HK$2.2/張 | ⚠️ 引擎精確值 16×0.14=**2.24** → v1.2 改 HK$2.24 |
| 附加費 30-50% | ❌ 同上無源 → v1.2 改「以報價確認」 |
| 18:00 截單/翌日中午 | ✅ rush 頁 live（34/17 命中）+ K3 02:29 已批 18:00 SSoT |

### 頁 3 a1-posters —— 🟠 整批等裁決④（11-28 D2 解凍批），數字已預修
| 聲稱 | 復核結果 |
|---|---|
| MOQ 1 · basePrice HK$20 · HK$290-7,200 噴繪成品 · 29-45 誠實區間錨 | ✅ products.ts L2568-2575 + pricing.ts:1016 拍板註釋 |
| Variant A「10 張檔急件 HK$15/張起」 | ❌ rush 頁實值 = 海報 10 張 **HK$16/張起（大量檔）**，且為海報通用行非 A1 專屬 → v1.2 修正並標注 |

## 二、生成器／消費鏈路確認（本輪最重要發現）

1. ❌→✅ **G1 卡落空已修**：卡 `owner_lane` 殘留「（批准后）」後綴，`build-coordination-board.py` L372 精確匹配失敗 → 12:05 板未分配 G1，今晚車道原本**不會**消費 G1。已正規化為 `ZP-daily-content`（批准事實 02:29 已錄 result，屬元數據修正非自批）+ 生成器重跑（12:23），板內 ZP-daily-content = **[SMALLBATCH(92) → DOUJIN(90) → G1(88)]**。
2. **今晚自然輪實際消費序**：SMALLBATCH 部署驗收（其工作本體今早已上線驗收，翻轉屬 k3-review 獨立復探，本席不代翻）→ DOUJIN-SEMANTIC-FIX ①類。**G1 food-boxes 頁最快 = 11-27（明晚）18:17 自然輪首項**（車道一輪一項 + 優先級排序）；若 K3 要 food-boxes 今晚即上，需一句話授權「人手會話代行批 2 第 1 頁」。
3. ✅ 寫入落點：products-content.ts longDescription 管線實存（transparent L1585 直答/FAQ 區可注入），write_scope 與卡一致；門童 #1 編造 lint + #16 黑話會掃新文案（v1.2 已預清無源值）。
4. ✅ 冪等賬本：run-context / lane-results-bus 契約在 prompt 首部，DONE 不重做。

## 三、結論與排程

- 批 2 三頁（food-boxes / transparent / a2）= **READY-v1.2，鏈路已通**；A1 頁等 11-28 D2。
- 已落盤：草案 v1.2（同檔六處修正 + §8 修正記錄）、G1 卡 owner_lane + result 預檢註記、協同板 12:23 重建。本地 commit，不單獨 push（docs-only，隨今晚車道批攢批上鏈）。

數據來源：products.ts / pricing.ts / ProductPageV9.tsx 實碼行號 + live 探針（rush 頁、food-boxes PDP，2026-11-26 12:1x cache-buster）+ audit-20261125-g1-truth-check.md + coordination-board.json 12:23 重建輸出。

---

## 更正補記（2026-11-27 03:3x）

「附加費 30-50%」並非全網無源——出處 = 自家 blog `/zh-hk/blog/rush-printing-hk-guide/`（2026-08 舊文，多處寫 30-50% 及 A2 急件 HK$22/張等舊價）。本報告 §一「全 src + rush 頁均無此值」僅覆蓋 src 與 rush 服務頁，未掃 blog 語料，表述過強，特此更正（不撤回原句）。草案 v1.2 處置（PDP 直答塊寫「以報價確認」）**維持正確**：30-50% 未經兩輪複核、與 rush 服務頁「（附加費）」未公示百分比口徑不一致，不進交易頁直答塊；rush blog 舊價/舊附加費口徑統一列入該 blog 強化批（指揮中心檔 §3 序 3）一併核。
