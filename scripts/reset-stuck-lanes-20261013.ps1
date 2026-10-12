# reset-stuck-lanes-20261013.ps1  (RUN AS ADMINISTRATOR, one-shot)
# K3 2026-10-13: ZP lanes refused at trigger with 0x800710E0 (MultipleInstancesPolicy=IgnoreNew
# + leftover Running instances => scheduler rejects every later trigger, wrapper never starts).
# This script: (1) ends any stuck ZP-* task instances, (2) removes the legacy
# \ZprintPro-CronWatchdog-2125 task (per AGENTS.md 0.35.6, superseded by ZP-cron-watchdog),
# (3) prints final state for verification.
# Pure ASCII per scripts/register-cron-tasks.ps1 encoding iron rule (PS 5.1 mangles BOM-less UTF-8).

$ErrorActionPreference = 'Continue'
$principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Host 'FATAL: must run elevated (right-click PowerShell -> Run as administrator).' -ForegroundColor Red
  exit 1
}

Write-Host '== Step 1: end stuck ZP-* instances ==' -ForegroundColor Cyan
$lanes = Get-ScheduledTask | Where-Object { $_.TaskName -like 'ZP-*' }
foreach ($t in $lanes) {
  if ($t.State -eq 'Running') {
    Write-Host ('  ending stuck instance: ' + $t.TaskName)
    schtasks /end /tn ('\' + $t.TaskName) | Out-Null
  } else {
    Write-Host ('  ok (not running): ' + $t.TaskName + ' [' + $t.State + ']')
  }
}

Write-Host '== Step 2: remove legacy ZprintPro-CronWatchdog-2125 ==' -ForegroundColor Cyan
$legacy = Get-ScheduledTask -TaskName 'ZprintPro-CronWatchdog-2125' -ErrorAction SilentlyContinue
if ($legacy) {
  Unregister-ScheduledTask -TaskName 'ZprintPro-CronWatchdog-2125' -Confirm:$false
  Write-Host '  removed.'
} else {
  Write-Host '  not present (already removed).'
}

Write-Host '== Step 3: final state ==' -ForegroundColor Cyan
Get-ScheduledTask | Where-Object { $_.TaskName -like 'ZP-*' } | ForEach-Object {
  $i = $_ | Get-ScheduledTaskInfo
  Write-Host ('  {0} | State={1} | LastRun={2} | Result=0x{3:X} | Next={4}' -f $_.TaskName, $_.State, $i.LastRunTime, $i.LastTaskResult, $i.NextRunTime)
}
Write-Host ''
Write-Host 'DONE. Natural verification: tonight 21:17 ZP-daily-content should write a run-start line'
Write-Host 'into .hermes/logs/cron-ZP-daily-content.log and a bus record into lane-runs.jsonl.'
