# 11-24 調度 Canary 修復任務單（管理員可直接執行）

日期：2026-11-24 ｜ 狀態：READY ｜ 執行者：K3（管理員提升 PowerShell）｜ 預計耗時：15 分鐘 + 兩次自然輪觀察

---

## 0. 背景一句話

7 條 `\ZP-*` 排程全部因 LogonType=Interactive 在無互動工作階段時觸發，回 `0x800710E0`（ERROR_OPERATOR_REFUSED），飛輪自 11-15 起全部停擺。修法 = 只把登入類型改為 **S4U**（不存密碼、不需互動工作階段）。11-20 那次修復失敗是因為舊腳本連 Settings 一起重寫，`RestartInterval` 被序列化成 `00:10:00` 觸發 `0x80041318`——**本次新腳本只改 Principal，完全不碰 Settings XML**。

## 1. 前置檢查（1 分鐘）

以**管理員**打開 PowerShell（`Run as administrator`），依次確認：

```powershell
# (a) 目標任務存在且仍是 Interactive / 0x800710E0
Get-ScheduledTask -TaskName "ZP-cron-watchdog" | Select-Object TaskName, State
Get-ScheduledTaskInfo -TaskName "ZP-cron-watchdog" | Select-Object LastTaskResult, NextRunTime
# 期望：LastTaskResult = -2147023651（即 0x800710E0），NextRunTime = 明日 06:43

# (b) dsh 與金鑰就緒（S4U 會拿到 Machine 環境變數）
Test-Path "C:\Users\Administrator\AppData\Roaming\DSH Desktop\host-commands\desktop\bin\dsh.cmd"
[Environment]::GetEnvironmentVariable("DEEPSEEK_API_KEY","Machine") -ne $null
# 兩項都須為 True；若 (b) 第二項為 False，先跑 scripts\repair-dsh-scheduler-credential.ps1 -Apply 補金鑰
```

## 2. 步驟一：唯讀盤點（不改任何東西）

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\apply-s4u-logon-minimal-20261124.ps1"
```

- 期望：印出 7 條任務表格，LogonType 全部 `Interactive`，最後輸出 `AUDIT ONLY`。
- 盤點結果自動存至 `.hermes\logs\s4u-minimal-repair-audit.json`。

## 3. 步驟二：Canary 套用（只改 ZP-cron-watchdog 一條）

**先確認本視窗已提升**（11-23 首次嘗試因未提升被擋，任務零改動）：

```powershell
[Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
```

- 必須回 `True`。若為 `False`：在**目前非提升視窗**執行 `Start-Process powershell -Verb RunAs`，在彈出的新視窗（標題列應有「系統管理員」）繼續後續命令。

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\apply-s4u-logon-minimal-20261124.ps1" -Apply
```

- 期望輸出：`Backup written to ...s4u-minimal-20261124` → `UPDATED ZP-cron-watchdog : LogonType S4U (settings untouched)`，其餘 6 條維持 Interactive。
- 備份：7 條任務的 XML 已各存一份到 `.hermes\backups\s4u-minimal-20261124\`（回滾用）。
- ⚠️ 若報錯 `0x80041318` 或任何 XML 錯誤：**立即停手**，把完整紅字存下來回報，不要重試。

## 4. 步驟三：手動觸發驗收（驗證 S4U 被接受，約 3 分鐘）

```powershell
schtasks /Run /TN "ZP-cron-watchdog"
Start-Sleep -Seconds 120
Get-ScheduledTaskInfo -TaskName "ZP-cron-watchdog" | Select-Object LastTaskResult, LastRunTime
```

- **通過標準**：`LastTaskResult = 0`（不再是 0x800710E0）。
- ⚠️ 已修正：先前寫 `-TN` 會報「找不到參數」，Get-ScheduledTaskInfo 只認 `-TaskName`。
- ⚠️ 退出碼語意：watchdog 在發現**新告警**時 exit=1（設計如此，11-23 手動輪就是 6 條新告警→exit 1，屬正常）；真正的判據是「任務有跑起來＋日誌有完整對賬＋無 0x800710E0」。S4U 套用後若 LastTaskResult = 1 且 `cron-ZP-cron-watchdog.log` 有 `run end ... exit=1`，同樣算執行成功。
- 再查當日產物（watchdog 會寫對賬）：
  ```powershell
  Get-Content "F:\zprintpro-nextjs\.hermes\logs\lane-runs.jsonl" -Tail 3
  ```
  應看到當日 `ZP-cron-watchdog` 的 run 記錄。
- ❗注意：手動通過只證明 S4U 登入被接受，**不證明自然觸發恢復**；仍以步驟四的自然輪為最終判據。

## 5. 步驟四：自然輪四方對賬（11-25 06:43 之後任意時間）

等 11-25 清晨 watchdog 自然觸發後，核四件：

| # | 證據 | 命令 / 位置 | 通過標準 |
|---|---|---|---|
| 1 | 調度器結果 | `Get-ScheduledTaskInfo -TaskName "ZP-cron-watchdog"` | LastRunTime = 11-25 06:4x，LastTaskResult = 0 或 1（見下方註） |
| 2 | wrapper 日誌 | `.hermes\cron-run\` 下當日 watchdog 日誌 | `dsh exit 0`、無 `0x800710E0` |
| 3 | 結果總線 | `.hermes\logs\lane-runs.jsonl` 尾行 | 有 11-25 watchdog run 記錄 |
| 4 | 當日報告 | 看門狗對賬輸出 | 四方對賬結果（scheduler / 總線 / wrapper / 報告）非全空 |

四項全過 → 在任務單上勾選 CanaryVerified，才可進步驟六。**任一不過 → 停，回報。**

## 6. 步驟五：全量推廣（轉 S4U）＋ 8→5 合併

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\apply-s4u-logon-minimal-20261124.ps1" -Apply -All -CanaryVerified
```

- 期望：8 條全部 `UPDATED ... LogonType S4U`。
- **緊接著執行合併遷移單** `重要文件/2026-11-24-scheduler-5lane-consolidation-migration.md` 步驟丙–戊：備份並退役 ZP-gsc-feedback／ZP-monthly-matrix（已併入 daily 與 weekly）→ `-ArtifactsOnly` 重建 wrapper → lane-status 對賬。最終常設 5 條。
- 之後的驗證順序：當晚 21:17（daily-content 合併輪）→ 次日 07:10（k3-review）→ 週五 20:52（weekly-meta 含 GEO）→ 週六 23:47（blog-deepfix）。原 gsc-feedback 20:13 與 monthly-matrix 12:13 已退役，不再等待。
- ⚠️ 一次性任務 `ZP-ai-crawler-recheck-20261124`（11-24 13:37 觸發）已納入本腳本清單，全量推廣時會一併轉 S4U，否則它明天也會撞 0x800710E0。若 13:37 前來不及完成全量，可對它單獨先跑一次 canary 同款 `-Apply`（腳本會同時備份它）。

## 7. 回滾（任何一步不對勁時）

```powershell
$bk = "F:\zprintpro-nextjs\.hermes\backups\s4u-minimal-20261124"
Register-ScheduledTask -TaskName "ZP-cron-watchdog" -Xml (Get-Content "$bk\ZP-cron-watchdog.xml" -Raw) -Force
```

（把任務名換成對應任務即可逐條還原。）

## 8. 明令禁止

1. ❌ 不要再跑 `scripts\repair-zp-scheduler-logon.ps1 -Apply`（含 Settings 重寫，必觸發 0x80041318）。
2. ❌ 不要手改任何 `.hermes\cron-run\*.cmd` / `*.ps1` wrapper（生成器寫了 do not hand-edit）。
3. ❌ 不要在驗證通過前 `-Apply -All`。
4. ❌ 本次修復**不需要 git push**（動的是本機 Task Scheduler，不影響 repo / build 配額）。
5. ❌ 不要用檔案 mtime 當成功證據（per §0.35.4 判據鐵律）。

## 9. 完成定義（Definition of Done）

- [ ] 8 條 `\ZP-*`（含一次性 ai-crawler-recheck）LogonType 全部 = S4U，RunLevel = Highest，RunAs = Administrator 不變
- [ ] watchdog 手動觸發 LastTaskResult = 0
- [ ] 11-25 06:43 watchdog 自然輪四方證據齊備
- [ ] 11-25 晚 21:17 daily-content 合併自然輪四方證據齊備（20:13 gsc-feedback 已退役併入，不再單獨等待）
- [ ] audit JSON 與 7 份 XML 備份存在
- [ ] 全程未 push、未改 wrapper、未動 src

---

執行過程中任何輸出與本單「期望」不符，停下來把原始輸出貼回會話即可，不要自行變通。
