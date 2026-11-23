# ZP scheduler S4U logon repair (minimal, safe variant). ASCII ONLY.
# Root cause of 2026-11-20 failure (0x80041318):
#   Set-ScheduledTask -Settings re-serialized RestartInterval as 00:10:00,
#   but Task Scheduler XML only accepts XSD duration "PT10M".
#   This variant changes ONLY the principal (LogonType Interactive -> S4U)
#   and passes NO -Settings, so no settings XML is rewritten at all.
#
# Usage (elevated):
#   audit only : powershell -NoProfile -ExecutionPolicy Bypass -File scripts\apply-s4u-logon-minimal-20261124.ps1
#   canary     : ... -File scripts\apply-s4u-logon-minimal-20261124.ps1 -Apply
#   full roll  : ... -File scripts\apply-s4u-logon-minimal-20261124.ps1 -Apply -All -CanaryVerified
[CmdletBinding()]
param(
  [switch]$Apply,
  [switch]$All,
  [switch]$CanaryVerified,
  [string]$BackupDir = "F:\zprintpro-nextjs\.hermes\backups\s4u-minimal-20261124"
)

$ErrorActionPreference = 'Stop'
$TaskNames = @(
  'ZP-daily-content',
  'ZP-gsc-feedback',
  'ZP-weekly-meta',
  'ZP-blog-deepfix',
  'ZP-monthly-matrix',
  'ZP-k3-review',
  'ZP-cron-watchdog',
  'ZP-ai-crawler-recheck-20261124'
)
$Canary = 'ZP-cron-watchdog'
$AuditPath = 'F:\zprintpro-nextjs\.hermes\logs\s4u-minimal-repair-audit.json'

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
Write-Audit -Mode $(if ($Apply) { 'before_apply' } else { 'audit_only' }) -Rows $before -Note 'Minimal S4U variant: principal only, settings untouched.'
$before | Format-Table -AutoSize

if (-not $Apply) {
  Write-Output 'AUDIT ONLY. No task definition was changed.'
  Write-Output 'Canary command: powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\apply-s4u-logon-minimal-20261124.ps1" -Apply'
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
Write-Output "Backup written to $BackupDir (one XML per task; restore via Register-ScheduledTask -Xml)."

$targets = @($Canary)
if ($All) { $targets = $TaskNames }

foreach ($name in $targets) {
  $task = Get-ScheduledTask -TaskName $name -ErrorAction Stop
  $runAs = $task.Principal.UserId
  if ([string]::IsNullOrWhiteSpace($runAs)) { throw "Missing RunAs account on $name" }
  if ([string]$task.Principal.LogonType -eq 'S4U') {
    Write-Output "SKIP $name : already S4U"
    continue
  }
  $principal = New-ScheduledTaskPrincipal -UserId $runAs -LogonType S4U -RunLevel Highest
  # No -Settings parameter: the existing settings XML is kept byte-identical.
  Set-ScheduledTask -TaskName $name -Principal $principal | Out-Null
  Write-Output "UPDATED $name : LogonType S4U (settings untouched)"
}

$after = @($TaskNames | ForEach-Object { Get-TaskSnapshot $_ })
$note = if ($All) {
  'Full S4U rollout applied after explicit canary confirmation. Natural four-party verification is still required.'
} else {
  'Watchdog canary only (principal-only variant). Verify: (1) manual schtasks /Run completes without 0x800710E0, (2) next natural 06:43 run produces same-day report + bus line + wrapper log + scheduler result.'
}
Write-Audit -Mode $(if ($All) { 'after_apply_all_unverified' } else { 'after_canary_apply_unverified' }) -Rows $after -Note $note
$after | Format-Table -AutoSize
Write-Output $note
Write-Output 'No task was started by this script.'
exit 0
