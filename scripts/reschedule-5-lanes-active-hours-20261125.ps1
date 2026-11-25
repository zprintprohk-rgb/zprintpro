# Reschedule only the five existing ZP tasks into K3-approved active hours.
# ASCII ONLY. No task is created, deleted, enabled, disabled, or started.
# Principal, actions, settings, timeouts, prompts and wrappers are not passed to Set-ScheduledTask.
# Audit: powershell -NoProfile -ExecutionPolicy Bypass -File scripts\reschedule-5-lanes-active-hours-20261125.ps1
# Apply (elevated): same command with -Apply
[CmdletBinding()]
param(
  [switch]$Apply,
  [string]$BackupDir = 'F:\zprintpro-nextjs\.hermes\backups\active-hours-20261125'
)

$ErrorActionPreference = 'Stop'
$AuditPath = 'F:\zprintpro-nextjs\.hermes\logs\active-hours-reschedule-20261125-audit.json'
$Specs = @(
  [pscustomobject]@{ Name='ZP-k3-review';      Kind='Daily';  At='12:05'; Day=$null },
  [pscustomobject]@{ Name='ZP-cron-watchdog';  Kind='Daily';  At='18:07'; Day=$null },
  [pscustomobject]@{ Name='ZP-daily-content';  Kind='Daily';  At='18:17'; Day=$null },
  [pscustomobject]@{ Name='ZP-weekly-meta';    Kind='Weekly'; At='19:23'; Day='Friday' },
  [pscustomobject]@{ Name='ZP-blog-deepfix';   Kind='Weekly'; At='20:17'; Day='Saturday' }
)

function Test-IsAdministrator {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($identity)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-Snapshot([pscustomobject]$Spec) {
  $task = Get-ScheduledTask -TaskName $Spec.Name -ErrorAction Stop
  $info = $task | Get-ScheduledTaskInfo
  [pscustomobject]@{
    Name = $Spec.Name
    TargetAt = $Spec.At
    State = [string]$task.State
    LogonType = [string]$task.Principal.LogonType
    RunLevel = [string]$task.Principal.RunLevel
    StartWhenAvailable = [bool]$task.Settings.StartWhenAvailable
    WakeToRun = [bool]$task.Settings.WakeToRun
    RestartInterval = [string]$task.Settings.RestartInterval
    MultipleInstances = [string]$task.Settings.MultipleInstances
    ActionSignature = (@($task.Actions | ForEach-Object { ([string]$_.Execute + ' ' + [string]$_.Arguments) }) -join ' | ')
    StartBoundary = (@($task.Triggers | ForEach-Object { [string]$_.StartBoundary }) -join ' | ')
    LastTaskResult = [int64]$info.LastTaskResult
    NextRunTime = [string]$info.NextRunTime
  }
}

function Write-Audit([string]$Mode, [array]$Rows) {
  $payload = [pscustomobject]@{
    audited_at = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz')
    mode = $Mode
    administrator = (Test-IsAdministrator)
    scope = 'Triggers only; no principal/settings/action changes requested; no task started.'
    tasks = $Rows
  }
  $parent = Split-Path -Parent $AuditPath
  New-Item -ItemType Directory -Force -Path $parent | Out-Null
  $payload | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $AuditPath -Encoding UTF8
}

$before = @($Specs | ForEach-Object { Get-Snapshot $_ })
Write-Audit -Mode $(if ($Apply) { 'before_apply' } else { 'audit_only' }) -Rows $before
$before | Select-Object Name,TargetAt,State,LogonType,StartWhenAvailable,WakeToRun,StartBoundary,NextRunTime | Format-Table -AutoSize

if (-not $Apply) {
  Write-Output 'AUDIT ONLY. No task definition was changed and no task was started.'
  exit 0
}
if (-not (Test-IsAdministrator)) {
  throw 'Administrator elevation is required. Audit completed; no task definition was changed.'
}
$running = @($before | Where-Object { $_.State -eq 'Running' })
if ($running.Count -gt 0) {
  throw ('A target task is Running; no changes applied: ' + (($running | ForEach-Object { $_.Name }) -join ', '))
}

New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
foreach ($spec in $Specs) {
  $xml = Export-ScheduledTask -TaskName $spec.Name -ErrorAction Stop
  $xml | Set-Content -LiteralPath (Join-Path $BackupDir ($spec.Name + '.xml')) -Encoding Unicode
}
Write-Output "Backup written to $BackupDir (one XML per task)."

$beforeByName = @{}
foreach ($row in $before) { $beforeByName[$row.Name] = $row }

foreach ($spec in $Specs) {
  $at = [datetime]::ParseExact($spec.At, 'HH:mm', [Globalization.CultureInfo]::InvariantCulture)
  if ($spec.Kind -eq 'Daily') {
    $trigger = New-ScheduledTaskTrigger -Daily -At $at
  } else {
    $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek $spec.Day -At $at
  }
  # Trigger only: deliberately no -Principal, -Settings or -Action.
  Set-ScheduledTask -TaskName $spec.Name -Trigger $trigger -ErrorAction Stop | Out-Null
  $afterOne = Get-Snapshot $spec
  $old = $beforeByName[$spec.Name]
  if ($afterOne.LogonType -ne $old.LogonType -or
      $afterOne.RunLevel -ne $old.RunLevel -or
      $afterOne.ActionSignature -ne $old.ActionSignature -or
      $afterOne.StartWhenAvailable -ne $old.StartWhenAvailable -or
      $afterOne.WakeToRun -ne $old.WakeToRun -or
      $afterOne.RestartInterval -ne $old.RestartInterval -or
      $afterOne.MultipleInstances -ne $old.MultipleInstances) {
    throw ('Non-trigger drift detected on ' + $spec.Name + '. Stop and restore its backup XML before retrying.')
  }
  Write-Output ('UPDATED ' + $spec.Name + ' -> ' + $spec.At + '; S4U/actions/settings preserved; next=' + $afterOne.NextRunTime)
}

$after = @($Specs | ForEach-Object { Get-Snapshot $_ })
Write-Audit -Mode 'after_apply_triggers_only' -Rows $after
$after | Select-Object Name,TargetAt,State,LogonType,StartWhenAvailable,WakeToRun,StartBoundary,NextRunTime | Format-Table -AutoSize
Write-Output 'No task was started. Natural-run four-party verification is still required.'
Write-Output 'WakeToRun was not enabled; a sleeping or powered-off computer is not woken by this change.'
exit 0
