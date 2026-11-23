# 8→5 精簡合併遷移單（接續 S4U Canary，管理員可直接執行）

日期：2026-11-23 ｜ 狀態：READY（前置：S4U canary 四方對賬通過）｜ 執行者：K3（提升 PowerShell）
依據：`2026-11-20-manual-scheduler-rebuild-and-two-week-flywheel.md` §調度段（4 個 Harness 入口＋1 個確定性 watchdog）＋ K3 11-23 確認精簡。

---

## 1. 最終架構（5 條，全部離峰分鐘）

| # | 任務 | 觸發 | 角色 | 合併來源 |
|---|---|---|---|---|
| 1 | ZP-daily-content | 每日 21:17 | **每日增長總控**：先更新 GSC 證據，再做最多一個已批准交易頁小批 | ＋原 ZP-gsc-feedback（20:13） |
| 2 | ZP-k3-review | 每日 07:10 | **每日獨立驗收**：核查前日交付與自然運行證據，出次日 bounded 指令，不改 src | 原職責強化 |
| 3 | ZP-weekly-meta | 每週五 20:52 | **周／月復盤與 GEO**：完整證據復盤＋最多一個 CTR 單變量＋固定 GEO 問題集；**每月第一個週五同入口追加月度資源分配** | ＋原 ZP-monthly-matrix（每月 1 號 12:13） |
| 4 | ZP-blog-deepfix | 每週六 23:47 | **Blog 單篇補缺**：每輪最多一篇有信息增益文章，NO_OP 合法 | 原只讀驗收→恢復生產 |
| 5 | ZP-cron-watchdog | 每日 06:43 | **確定性四方對賬**（純腳本，無模型） | 不變 |

一次性 `ZP-ai-crawler-recheck-20261124`（11-24 13:37）為臨時任務，不在 5 條常設內，但同需 S4U。

**協調協議（已在四份精簡 prompt 內寫死）**：五個入口共享 `coordination-board.json`／`strategy-task-queue.json`／`flywheel-learning-ledger.json`／lane-runs 總線／部署與復測賬本；daily 生產不自我驗收（交 k3-review），weekly 只出提案不自我批准（READY 後由 daily 執行），Blog 不為湊量硬寫，watchdog 只做對賬不改內容。時段互斥由 lane.lock 保證，21:17（daily）→ 週五 20:52（weekly，無 gsc-feedback 後不再撞車）→ 週六 23:47（blog）→ 06:43（watchdog）→ 07:10（review）全部錯開。

## 2. 本次已完成的準備（不需 K3 操作）

- ✅ `cron-lanes.json` 已改：4 條模型車道全部指向 11-20 精簡 prompt，移除 gsc-feedback／monthly-matrix，退役任務登記進 `legacyTasksToRemove`；舊版備份在 `.hermes/backups/cron-lanes-pre-consolidation-20261123.json`
- ✅ 四份精簡 prompt 早已存在並含共享隊列／真值／復測賬本協議；daily 與 blog 的草稿時間已對齊現行排程（21:17／23:47）
- ✅ S4U 修復腳本已含一次性 recheck 任務

## 3. 執行順序（接續 S4U canary 任務單）

### 步驟甲：先跑 S4U canary（不變）

按 `2026-11-24-scheduler-s4u-canary-task-sheet.md` §1–§5：審計 → canary `-Apply` → 手動觸發驗收 → 11-25 06:43 自然輪四方對賬。

### 步驟乙：全量 S4U（canary 通過後）

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\apply-s4u-logon-minimal-20261124.ps1" -Apply -All -CanaryVerified
```

### 步驟丙：退役 2 條（先備份 XML 再刪）

```powershell
$bk = "F:\zprintpro-nextjs\.hermes\backups\consolidation-retire-20261125"
New-Item -ItemType Directory -Force -Path $bk | Out-Null
foreach ($n in @('ZP-gsc-feedback','ZP-monthly-matrix')) {
  Export-ScheduledTask -TaskName $n | Set-Content -LiteralPath (Join-Path $bk ($n + '.xml')) -Encoding Unicode
  Unregister-ScheduledTask -TaskName $n -Confirm:$false
  Write-Output "RETIRED $n (XML backed up)"
}
```

⚠️ 11-24 20:13 的 gsc-feedback 若已能跑（S4U 提前修好），讓它跑完最後一輪也無妨；刪除以備份完成為前提。

### 步驟丁：重建 wrapper 工件（不動排程）

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\register-cron-tasks.ps1" -ArtifactsOnly
```

- 生成器從新 `cron-lanes.json` 重建 4 條 wrapper，指向精簡 prompt；watchdog 不變。
- 若報 ASCII／encoding guard 錯誤：停手回報，不要手改 wrapper。

### 步驟戊：對賬預期集更新

```powershell
node F:\zprintpro-nextjs\scripts\lane-status.mjs --days=7
```

- 期望：預期車道 = daily-content／k3-review／weekly-meta／blog-deepfix＋watchdog，不再出現 gsc-feedback／monthly-matrix 的 MISSING。

## 4. 驗收節奏（全部自然輪，不以手動代替）

| 時間 | 驗證 |
|---|---|
| 11-25 06:43 | watchdog 自然輪四方對賬（canary 最終判據） |
| 11-25 07:10 | k3-review 首個自然輪：出次日指令＋前日交付獨立核查 |
| 11-25 21:17 | daily-content 首個合併自然輪：GSC 證據更新＋最多一個 READY 小批或 NO_OP |
| 11-27 20:52 | weekly-meta 合併自然輪（周復盤＋GEO；12-04 為 12 月第一個週五，追加月度） |
| 11-28 23:47 | blog-deepfix 首個生產輪（最多一篇或 NO_OP） |

## 5. 回滾

```powershell
# 恢復車道清單
Copy-Item "F:\zprintpro-nextjs\.hermes\backups\cron-lanes-pre-consolidation-20261123.json" "F:\zprintpro-nextjs\.hermes\cron-lanes.json" -Force
# 還原被刪任務
Register-ScheduledTask -TaskName "ZP-gsc-feedback" -Xml (Get-Content "F:\zprintpro-nextjs\.hermes\backups\consolidation-retire-20261125\ZP-gsc-feedback.xml" -Raw) -Force
Register-ScheduledTask -TaskName "ZP-monthly-matrix" -Xml (Get-Content "F:\zprintpro-nextjs\.hermes\backups\consolidation-retire-20261125\ZP-monthly-matrix.xml" -Raw) -Force
```

## 6. 邊界

- 全程本機操作，**不需要 push、不耗 Cloudflare build 配額、不改 src**。
- 不刪 prompt 舊檔（`zprintpro-gsc-feedback-loop.md` 等保留為歷史資產，只是不再被排程引用）。
- 任何一步輸出與預期不符 → 停，貼回原始輸出。
