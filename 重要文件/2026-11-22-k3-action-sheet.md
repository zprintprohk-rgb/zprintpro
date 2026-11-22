# 2026-11-22 K3 一頁行動單（11-24 數據批里程碑前置）

> 簽發：執行層（首席 SEO/AEO/GEO 分析師批）· 狀態：6 項中 2 項需 K3 立即動作，否則 11-24 首讀與 12-04 判決鏈斷
> 數據來源：lane-runs.jsonl（142 條）· lane-status.json（11-21 19:13 版）· GSC数据/ 清單（最新 11-19）· 今日 5 commit（f834368d→6e117783→d1d4b940→Batch5×2）

## A. 撞車確認（§0.25，需 1 次回覆）
- 事實：push `18:33`（→6e117783）與 `18:40`（→d1d4b940）間隔 7 分鐘 < 30min 硬下限
- 原因：首推後線上驗證發現 ja ISO 9001 殘留 2 處，執行層選擇立即補推（流程錯誤）
- 請拍板：**(A1) 接受並繼續**（默認）／(A2) 要求回滾 d1d4b940（僅 2 行 ja 改動）

## B. GSC 數據供給（**最高優先，阻斷 11-24 首讀**）
- 缺：11-20 / 11-21 / 11-22 三檔（24h/7d/28d）+ **query×page 联接**（最新仍 end1031 STALE）
- 影響：11-24 首讀四問（certificates 回頁一 / a2 減速 / 食品破零 / 稀釋收斂）全部 `NO_CURRENT_BATCH`
- 動作：放三檔入 `GSC数据/` + 當前 query×page 導出；執行層 11-24 按決策包 §F 機械執行單跑

## C. 調度器六件（0x800710E0 根因，已連續 10 天）
1. S4U canary → 四方驗收 → `-All`（`scripts/register-cron-tasks.ps1` 已含 S4U 參數）
2. watchdog 重建：06:43 / S4U / 無 RestartOnFailure
3. Harness 4 入口粘貼（prompt 全部就緒於 `.hermes/cron-prompts/harness-*.md`）+ 停用 GSC/monthly 重複入口
4. `.hermes/cron-lanes.json` 同步 4+1 車道清單
5. legacy `\ZprintPro-CronWatchdog-2125` 刪除（`scripts/remove-legacy-cron-tasks.ps1`）
6. 凭据：`scripts/repair-dsh-scheduler-credential.ps1`（**非提升會話無法執行**）
- 影響：k3-review 11-18 起 MISSING、blog-deepfix 停擺 2 週、monthly 從未成功

## D. k3-review 積壓（4 天）
- 11-18..11-21 MISSING；今日 11-22 亦無記錄
- 執行層已代做 11-22 獨立核查：A2 ✅ / 即日傳單 6/6 ✅ / small-batch en 2/2 ✅ / ja cert 批次 ✅（除 medical-device 已補）
- 餘：11-18..11-21 的線上驗收需補一次「回溯核查」或直接登記 MISSING（不偽造歷史）

## E. 11-24 前置（時間敏感）
- **72h AI 爬蟲對賬任務已註冊**：`\ZP-ai-crawler-recheck-20261124` 11-24 13:37（管理員已建）
- GEO 第 4 輪（同上窗）：固定問題集 + 三向邊緣抽驗（瀏覽器 UA 已修）
- 建議：11-24 當日 K3 先放 GSC 三檔，執行層即可同窗完成首讀+GEO
- **首讀分析器已預置（本日）**：`.hermes/tmp/analyze_gsc_20261124.py`（自 11-19 版克隆，按 §F 改 4 處：docstring/FILES-11-24/ASSETS/date anchors；另加**容錯檔名解析**（(1)/(2) 後綴自動匹配）+ **缺檔守衛**（缺任一窗即印 `NO_CURRENT_BATCH` 並 exit 2，不拿舊窗充當））。matplotlib 已裝入 Python312（3.11.2），openpyxl 3.1.5 / pandas 3.0.3 就緒 → K3 一放檔即可機械跑

## F. B1 實體歸一（zh 面 AIO 品牌舊名「ZPrintPro 智印雲」）
- 源：Kompass 兩處條目（hk./lu.kompass.com）+ GBP 檔案（舊地址/電話）
- 影響：zh 面 AIO 引用持續固化舊品牌名（內容被引 ≠ 品牌收益）
- 動作：K3 本人改 Kompass 公司名 →「智印港·ZPrintPro」+ GBP 對齊 §13.10

## 已由執行層完成（今日，供 K3 核對）
- P1-1b/c 鏡像+第四源層修復（meta 已線上驗證新值）
- P1-3a Batch 1-5：三語 A 組認證聲明全清（zh 22 / en 20 / ja 21 / CertNo 空壳 27），線上抽樣 5/6 頁 PASS
- P1-4 五探針 UA 修復（WAF 新規後 200 全頁）
- gsc 20:13 殭屍車道 host 收尾（報告完整落賬 + bus 歸併）
- 11-22 獨立核查（見 D）
