# scripts\remove-legacy-cron-tasks.ps1
# ASCII-only on purpose (Windows PowerShell 5.1 reads non-BOM UTF-8 as ANSI and mangles CJK).
#
# 2026-09-19 K3 directive: remove the legacy / mis-wired scheduled task(s) that write
# FALSE results every day. Must be run ELEVATED (schtasks delete / Unregister-ScheduledTask
# are both denied for the non-elevated DSH session: measured IsAdmin=False).
#
# Targets:
#   \ZprintPro-CronWatchdog-2125  (daily 21:25)
#     -> runs .hermes\cron-check-tonight.py, which reads jobs[5..9] of
#        C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json -- those indices are
#        historical one-shot jobs, NOT the 5 ZP lanes -> PASS/FAIL is meaningless.
#        Superseded by \ZP-cron-watchdog (daily 06:43).
#
# NOT a target: \ZP-daily-content / \ZP-gsc-feedback / \ZP-weekly-meta /
#   \ZP-blog-deepfix / \ZP-monthly-matrix / \ZP-cron-watchdog -- these are the REAL lanes.
#
# Usage: right-click -> Run with PowerShell (as Administrator), or:
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\remove-legacy-cron-tasks.ps1

$ErrorActionPreference = 'Continue'
$Targets = @('ZprintPro-CronWatchdog-2125')

$id = [System.Security.Principal.WindowsIdentity]::GetCurrent()
$isAdmin = (New-Object System.Security.Principal.WindowsPrincipal($id)).IsInRole(
  [System.Security.Principal.WindowsBuiltInRole]::Administrator)
Write-Host ("user    : {0}" -f $id.Name)
Write-Host ("elevated: {0}" -f $isAdmin)
if (-not $isAdmin) {
  Write-Host 'NOT ELEVATED -> this script cannot delete tasks. Re-run as Administrator.' -ForegroundColor Red
  exit 1
}

$removed = 0
foreach ($t in $Targets) {
  $q = & schtasks.exe /query /tn $t 2>&1
  if ($LASTEXITCODE -ne 0) {
    Write-Host ("[SKIP] {0} not present" -f $t)
    continue
  }
  $out = & schtasks.exe /delete /tn $t /f 2>&1
  if ($LASTEXITCODE -eq 0) {
    Write-Host ("[OK]   deleted {0}" -f $t) -ForegroundColor Green
    $removed++
  } else {
    Write-Host ("[FAIL] {0}: {1}" -f $t, ($out -join ' ')) -ForegroundColor Red
  }
}

Write-Host ''
Write-Host '== verification: remaining scheduled tasks matching ZP / ZprintPro =='
$all = & schtasks.exe /query /fo CSV /nh 2>$null
$mine = $all | Where-Object { $_ -match 'ZP-|ZprintPro' }
if ($mine) { $mine | ForEach-Object { Write-Host ('  ' + ($_ -split ',')[0].Trim('"')) } }
else { Write-Host '  (none)' }

Write-Host ''
Write-Host ("deleted: {0} / target(s): {1}" -f $removed, $Targets.Count)
Write-Host 'EXPECT after this run: \ZprintPro-CronWatchdog-2125 gone; the 6 \ZP-* tasks untouched.'
Write-Host 'Evidence: paste this console output into .hermes\logs\2026-09-19-legacy-task-removal.md'
Write-Host ''
Write-Host 'press any key to exit...'
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
