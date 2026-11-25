# 飛輪運營指揮中心 · 定時任務增強包 + 深層 blog 計劃（2026-11-26 · 首席分析師）

> **性質**：docs-only 提案；車道 prompt 只經生成器改（§H.5），本檔不手改 wrapper；K3 批准後走註冊流程
> **基礎**：主提示詞 v1.0（GLM）× 雙更新裁決（Kimi）× 11-26 三大新資產（query×page 決策矩陣 · GSC API 通路 · 批2 直答塊 READY）
> **原則**：**5 車道內增強，不新增車道**（雙文件共識）；每項增強標注生效路徑（生成器 / 隊列 / K3 管理員）

---

## 1. 指揮中心現狀評估（已具備 vs 今天補上的）

| 層 | 組件 | 狀態 |
|---|---|---|
| 觸發 | Task Scheduler `\ZP-*` ×5（S4U/Highest/錯峰） | ✅ 運行中（blog 自然輪 11-28 首驗證） |
| 數據 | GSC 三檔 | ✅ **今日升級**：API 通路開通（7890 代理），手工導出可自動化替代 |
| 決策 | strategy-task-queue（53 卡）+ run-context 冪等賬本 | ✅ 批2 直答塊已 READY |
| 承接 | query×page 主 URL 矩陣 | ✅ **今日補上**（end1031 STALE 解除，16 詞簇定主 URL） |
| 學習 | flywheel-learning-ledger（11 條） | ✅ 回寫契約在轉 |
| 守門 | 門童 32 文件 + pre-commit/push + tsc | ✅ 11-26 實戰驗證（9 文件攔截=按設計工作） |
| GEO | 探針 r1-r6 + C4 首勝 | ✅ 固定問題集在轉 |

**結論：指揮中心骨架完整，今天補上了最後的「數據自動化」與「承接決策」兩塊。剩下的增強是接線，不是重建。**

---

## 2. 定時任務增強包（5 車道逐一）

### 2.1 ZP-daily-content（每日 18:17）——數據自動化 + 批2 執行
| 增強 | 內容 | 生效路徑 |
|---|---|---|
| D1 | **STEP -1 GSC API 自動拉取**：無更新人工導出時，跑 `fetch_gsc_data.py`（`GSC_PROXY=http://127.0.0.1:7890`）拉 query / query,page / query,country 三檔落 `GSC数据/`，替代手工導出節奏；失敗降級用最近批（NO_CURRENT_BATCH 紀律不變） | 生成器改 daily prompt 數據節（K3 批准） |
| D2 | **批2 直答塊消費序**：food-boxes → transparent → a2 → 其餘 5 頁，一頁一批單變量；每批 7/14/28d 復測登記 | 已 READY（今晚首頁） |
| D3 | **主 URL 矩陣消費**：`2026-11-26-query-page-primary-url-decisions.md` 作為承接層 SSoT；blog/內鏈類動作以此為據 | 隊列任務引用即可，無需改 prompt |

### 2.2 ZP-weekly-meta（週五 19:23，11-27 下一輪）
| 增強 | 內容 | 生效路徑 |
|---|---|---|
| W1 | **季節守望塊**：C109 倒計時（約 5 週，431imp@pos10）· 利是封/月曆 2027 窗 · 易拉架活動季（7d 暴起簇）——每週五固定讀窗 | weekly prompt 季節節（生成器）或隊列 SCHEDULED 任務 |
| W2 | **guard 9 文件閉合**：按「FAILED(機械)×等價交付(業務)」口徑歸檔 | 已排 |
| W3 | 14d 乾淨窗復測：SMALLBATCH（pos -2.5~-3.4 改善 0 點擊）· 貼紙第八窗 plateau 30.56 | 既有節奏 |

### 2.3 ZP-blog-deepfix（週六 20:17，11-28 下一輪）
| 增強 | 內容 | 生效路徑 |
|---|---|---|
| B1 | **首位仍 = CERT-PHRASES**（READY，唯一已批）——不插隊 | 既有 |
| B2 | **深層 blog 強化隊列**（query×page 實證排序，見 §3）——逐篇評估，一篇一變量 | 隊列 WAITING_K3 → K3 排序後 READY |

### 2.4 ZP-k3-review（每日 12:05）
| 增強 | 內容 | 生效路徑 |
|---|---|---|
| K1 | 批2 上線頁逐字復探 + **18:00 句獨立複核**（SSoT = 線上 rush 頁現行口徑，K3 11-26 已確認） | 既有職責延伸 |
| K2 | 價格真值 4 項拍板後的 live 探針驗收 | 待拍 |

### 2.5 ZP-cron-watchdog（每日 18:07）
| 增強 | 內容 | 生效路徑 |
|---|---|---|
| WD1 | **第五方對賬：外部依賴健康**——代理 7890 端口存活（GSC API 命脈）+ CF Pages 最近 build 狀態，失聯寫 ATTENTION | watchdog prompt/腳本增補（生成器） |

---

## 3. 深層 blog 計劃（query×page 實證排序 · 不鋪量、一篇一變量）

| 序 | blog | 實測承接（28d） | 強化動作 | 依據 |
|---|---|---|---|---|
| 1 | `catalog-printing-china-supplier-guide`（en） | wholesaler 18/4.94 + catalog 族 ~150imp | **首屏直答塊**（MOQ 10 · $4.60/本 · 生產與 DHL 分界）+ 內鏈 → catalog PDP | 頁一上半頁零點擊 = snippet/直答問題；對手 1-4 週生產 vs 我方 DHL 2-4 天 |
| 2 | `roll-up-banner-printing-guide` | 易拉架價錢 35/19.69 · 澳門易拉架size 31/3.61 · 易拉架 30/32.67 | **命名對口**：正文自然融入「易拉架（易拉寶）」+ 尺寸×單價直答表 + 內鏈 → roll-up-banners PDP；澳門送達真值一句 | PDP 對「易拉架」0 imp = 純語言問題，blog 先接 |
| 3 | `rush-printing-hk-guide` | 即日簇 103imp @ 9.3-9.6 主承接 | 12 段骨架複核 + 首屏直答（18:00/翌日中午/附加費 30-50%，SSoT 已確認）+ **服務頁轉化內鏈強化** | 即日簇旗艦資產，位次已到門口 |
| 4 | `food-packaging-printing-guide` | 食品印刷 93/5.78 · 食品包裝印刷 137/7.98（位次領跑） | 內鏈錨 → food-boxes PDP（配合批2 PDP 直答塊）；不動正文（避免雙變量） | blog+PDP 雙承接健康 |
| 5 | `paper-bag-printing-guide` | 紙袋印刷 64/22.22；探針 C4 #10 | 白話 FAQ（邊度有紙袋買）+ 內鏈 handle-bags/kraft | #10→前 5 槓桿 |
| 6 | `book-buying-guide` | 書刊印刷 130/36.20 | G4 中期工程，12 月月度再議 | 不進兩週 |

**紀律**：每篇 = 1 主詞 + 3-5 長尾 + ≥5 內鏈 + 唯一主 PDP + 7/14/28d 復測；en/ja 不機翻 zh 場景；C109 專題頁直答塊（季節窗 5 週）併入本隊列第 1.5 位由 weekly 11-27 提案定稿。

---

## 4. Workers $5/月檔用途排序（K3 管理員動作）

| 序 | 用途 | 飛輪面 | 依據 |
|---|---|---|---|
| 1 | **AI 爬蟲按 UA 精細放行**（取代一刀切 block），對齊 robots.txt 12 個 AI UA Allow | GEO 被引面 | 雙層矛盾是技術盤點已知缺口；AIO 零引用背景下，誤傷合法 AI 通道成本高 |
| 2 | **hkprint58 抄站指紋攔截**（路徑/頻率/指紋規則） | 資產保護 | 快照同屏競爭實爭實證；與 ① 分開處理（防抄≠關 AI 門） |
| 3 | WAF 規則額度擴充 + Workers 用量餘量 | 基建 | 為 query×page 自動化與將來邊緣緩存留量 |
| 4 | （不進兩週）邊緣緩存/HTML 優化實驗 | 性能面 | 12-04 月度提案評估 |

---

## 5. K3 待拍清單（刷新 · 按阻塞性）

1. **4 個價格真值一句話**（basePrice 25/15 · en 錨 0.32 · ja ¥69 方案 A · A1 title/默認檔）→ 解鎖批1 四頁 + ja 直答適配。
2. **本增強包批准**：D1（API 自動拉取進 daily prompt，走生成器）· WD1（watchdog 第五方）· W1（weekly 季節守望）——三項 prompt 增補一次生成器注入。
3. **管理員收尾**（原項 + 新增）：StartWhenAvailable=true · 刪 3 個舊任務 · **確認 7890 代理開機自啟**（GSC API 命脈）。
4. **實體歸一**：Kompass 兩條目 + GBP → ZprintPro智印港。
5. **批3 口徑問**：transparent 5-7 vs removable 3-5 生產天數統一。

---

## 6. SOP-10 五問自檢

1. **架構差異**：全部增強在 5 車道內，prompt 只經生成器；已查 `register-cron-tasks.ps1` 紀律（do not hand-edit），本檔零 wrapper 改動。
2. **約束適用範圍**：December 更新 Active——本檔無批量 title/H1/新頁動作；直答塊先行已獲 K3 11-26 02:29 拍板覆蓋。
3. **原數據來源**：query×page API 三檔（檔名見決策矩陣檔）+ 11-25 `(2)` xlsx 批 + 探針 r1-r6。
4. **字段值策略**：價格 4 項只列不決；C109 日期標「以站內專題頁為準」未斷言。
5. **Markdown 渲染**：內部 docs，無 user-facing 變更。
