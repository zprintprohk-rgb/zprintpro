# Audit or repair ZP scheduled-task logon mode. ASCII only.
# Default: audit only. -Apply changes watchdog only. Full rollout requires canary verification.
[CmdletBinding()]
param(
  [switch]$Apply,
  [switch]$All,
  [switch]$CanaryVerified,
  [string]$BackupDir = "F:\zprintpro-nextjs\.hermes\tmp\scheduler-backup-20261114"
)

$ErrorActionPreference = 'Stop'
$TaskNames = @(
  'ZP-daily-content',
  'ZP-gsc-feedback',
  'ZP-weekly-meta',
  'ZP-blog-deepfix',
  'ZP-monthly-matrix',
  'ZP-k3-review',
  'ZP-cron-watchdog'
)
$Canary = 'ZP-cron-watchdog'
$AuditPath = 'F:\zprintpro-nextjs\.hermes\logs\scheduler-logon-repair-audit.json'

function Test-IsAdministrator {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($identity)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-TaskSnapshot([string]$Name) {
  $task = Get-ScheduledTask -TaskName $Name -ErrorAction Stop
  $info = $task | Get-ScheduledTaskInfo
  [pscustomobject]@{
    Name = $Name
    State = [string]$task.State
    RunAs = [string]$task.Principal.UserId
    RunLevel = [string]$task.Principal.RunLevel
    LogonType = [string]$task.Principal.LogonType
    StartWhenAvailable = [bool]$task.Settings.StartWhenAvailable
    RestartCount = [int]$task.Settings.RestartCount
    RestartInterval = [string]$task.Settings.RestartInterval
    MultipleInstances = [string]$task.Settings.MultipleInstances
    LastTaskResult = [int64]$info.LastTaskResult
    LastRunTime = [string]$info.LastRunTime
    NextRunTime = [string]$info.NextRunTime
  }
}

function Write-Audit([string]$Mode, [array]$Rows, [string]$Note) {
  $payload = [pscustomobject]@{
    audited_at = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz')
    mode = $Mode
    administrator = (Test-IsAdministrator)
    note = $Note
    tasks = $Rows
  }
  $parent = Split-Path -Parent $AuditPath
  New-Item -ItemType Directory -Force -Path $parent | Out-Null
  $payload | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $AuditPath -Encoding UTF8
}

$before = @($TaskNames | ForEach-Object { Get-TaskSnapshot $_ })
Write-Audit -Mode $(if ($Apply) { 'before_apply' } else { 'audit_only' }) -Rows $before -Note 'Values are configuration metadata only; no credentials are read or displayed.'
$before | Format-Table -AutoSize

if (-not $Apply) {
  Write-Output 'AUDIT ONLY. No task definition was changed.'
  Write-Output 'Canary command: powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\repair-zp-scheduler-logon.ps1" -Apply'
  exit 0
}

if (-not (Test-IsAdministrator)) {
  throw 'Administrator elevation is required. Audit completed; no task definition was changed.'
}

if ($All -and -not $CanaryVerified) {
  throw 'Full rollout is blocked. First apply the watchdog canary, verify a natural four-party run, then use -All -CanaryVerified.'
}

New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
foreach ($name in $TaskNames) {
  $xml = Export-ScheduledTask -TaskName $name
  $xml | Set-Content -LiteralPath (Join-Path $BackupDir ($name + '.xml')) -Encoding Unicode
}

$targets = @($Canary)
if ($All) { $targets = $TaskNames }

foreach ($name in $targets) {
  $task = Get-ScheduledTask -TaskName $name -ErrorAction Stop
  $runAs = $task.Principal.UserId
  if ([string]::IsNullOrWhiteSpace($runAs)) { throw "Missing RunAs account on $name" }
  $principal = New-ScheduledTaskPrincipal -UserId $runAs -LogonType S4U -RunLevel Highest
  $settings = $task.Settings
  $settings.StartWhenAvailable = $true
  $settings.RestartCount = 2
  $settings.RestartInterval = [TimeSpan]::FromMinutes(5)
  $settings.MultipleInstances = [Microsoft.PowerShell.Cmdletization.GeneratedTypes.ScheduledTask.MultipleInstancesEnum]::IgnoreNew
  Set-ScheduledTask -TaskName $name -Principal $principal -Settings $settings | Out-Null
  Write-Output "UPDATED $name : LogonType=S4U StartWhenAvailable=True"
}

$after = @($TaskNames | ForEach-Object { Get-TaskSnapshot $_ })
$note = if ($All) {
  'Full S4U rollout applied after explicit canary confirmation. Natural four-party verification is still required.'
} else {
  'Watchdog canary only. Do not roll out other lanes until a natural watchdog run passes scheduler, wrapper log, bus and current-day report checks. S4U may not carry a network identity.'
}
Write-Audit -Mode $(if ($All) { 'after_apply_all_unverified' } else { 'after_canary_apply_unverified' }) -Rows $after -Note $note
$after | Format-Table -AutoSize
Write-Output $note
Write-Output 'No task was started by this script. Manual wrapper success does not prove natural scheduling recovery.'
exit 0
