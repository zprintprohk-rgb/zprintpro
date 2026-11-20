# Review and apply two Harness prompt updates, then configure watchdog S4U canary.
# ASCII only. Default is review-only. No scheduled task or production wrapper is started.
[CmdletBinding()]
param(
  [switch]$Apply
)

$ErrorActionPreference = 'Stop'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[Console]::OutputEncoding = $utf8NoBom
$OutputEncoding = $utf8NoBom
$Workspace = 'F:\zprintpro-nextjs'
$LivePath = 'C:\Users\Administrator\.dsh\storages\schedule.json'
$ProposalPath = Join-Path $Workspace '.hermes\tmp\harness-schedule-20261119.proposed.json'
$RepairScript = Join-Path $Workspace 'scripts\repair-zp-scheduler-logon.ps1'
$ConfirmationCode = 'APPLY-ZP-20261119'
$TaskIds = @(
  'schedule-a06b8b25-9676-46b2-8c75-1c6e2ff0423e',
  'schedule-bdfe2532-1669-4830-b69b-3588aded6c1e'
)

function Test-IsAdministrator {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($identity)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Read-Utf8Json([string]$Path) {
  $text = [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
  return ($text | ConvertFrom-Json)
}

function Write-Utf8NoBom([string]$Path, [string]$Text) {
  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Text, $encoding)
}

function Get-CompactJson($Value) {
  return ($Value | ConvertTo-Json -Depth 100 -Compress)
}

function Assert-ProposalCompatibility($LiveTask, $ProposedTask, [string]$TaskId) {
  foreach ($field in @('id', 'kind', 'time', 'timeZone', 'rrule')) {
    $liveValue = [string]$LiveTask.record.$field
    $proposedValue = [string]$ProposedTask.record.$field
    if ($liveValue -ne $proposedValue) {
      throw "Configuration drift on $TaskId record.$field. Review a fresh proposal; nothing was applied."
    }
  }
  $liveTarget = Get-CompactJson $LiveTask.target
  $proposedTarget = Get-CompactJson $ProposedTask.target
  if ($liveTarget -ne $proposedTarget) {
    throw "Target/session drift on $TaskId. Review a fresh proposal; nothing was applied."
  }
}

function Show-TaskDiff($LiveTask, $ProposedTask, [string]$TaskId) {
  Write-Output ''
  Write-Output ('=' * 78)
  Write-Output "TASK: $TaskId"
  Write-Output "Only record.title and record.prompt are candidates for change."
  Write-Output 'Trigger, status, target/session, delivery history and all other tasks are preserved.'
  Write-Output ''
  Write-Output '--- CURRENT TITLE ---'
  Write-Output ([string]$LiveTask.record.title)
  Write-Output '--- PROPOSED TITLE ---'
  Write-Output ([string]$ProposedTask.record.title)
  Write-Output ''
  Write-Output '--- CURRENT PROMPT ---'
  Write-Output ([string]$LiveTask.record.prompt)
  Write-Output ''
  Write-Output '--- PROPOSED PROMPT ---'
  Write-Output ([string]$ProposedTask.record.prompt)
  Write-Output ''
}

foreach ($path in @($LivePath, $ProposalPath, $RepairScript)) {
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "Required file not found: $path"
  }
}
if ($Apply -and -not (Test-IsAdministrator)) {
  throw 'Administrator elevation is required for -Apply. No configuration was changed.'
}

$live = Read-Utf8Json $LivePath
$proposal = Read-Utf8Json $ProposalPath
if ($null -eq $live.tables -or $null -eq $live.tables.tasks -or $null -eq $proposal.tables.tasks) {
  throw 'Unexpected schedule schema. No configuration was changed.'
}

$liveTasks = $live.tables.tasks
$proposedTasks = $proposal.tables.tasks
$liveCount = @($liveTasks.PSObject.Properties).Count
$proposalCount = @($proposedTasks.PSObject.Properties).Count
if ($liveCount -ne $proposalCount) {
  throw "Task-count drift: live=$liveCount proposal=$proposalCount. Review a fresh proposal; nothing was applied."
}

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupDir = Join-Path $Workspace ".hermes\backups\harness-s4u-$stamp"
$manifest = [ordered]@{
  schema_version = 1
  started_at = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz')
  mode = $(if ($Apply) { 'apply_requested' } else { 'review_only' })
  administrator = (Test-IsAdministrator)
  live_path = $LivePath
  proposal_path = $ProposalPath
  live_sha256_before = (Get-FileHash -LiteralPath $LivePath -Algorithm SHA256).Hash
  proposal_sha256 = (Get-FileHash -LiteralPath $ProposalPath -Algorithm SHA256).Hash
  task_count_before = $liveCount
  changed_fields = @('record.title', 'record.prompt')
  task_ids = $TaskIds
  harness_applied = $false
  watchdog_canary_invoked = $false
  production_task_started = $false
  natural_scheduling_verified = $false
}

if ($Apply) {
  New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
  Copy-Item -LiteralPath $LivePath -Destination (Join-Path $backupDir 'schedule.before.json') -Force
  Copy-Item -LiteralPath $ProposalPath -Destination (Join-Path $backupDir 'schedule.proposed.json') -Force
  $manifest.backup_dir = $backupDir
  Write-Output "Backup created: $backupDir"
}

foreach ($id in $TaskIds) {
  $liveProperty = $liveTasks.PSObject.Properties[$id]
  $proposedProperty = $proposedTasks.PSObject.Properties[$id]
  if ($null -eq $liveProperty -or $null -eq $proposedProperty) {
    throw "Required task is missing: $id. No configuration was changed."
  }
  $liveTask = $liveProperty.Value
  $proposedTask = $proposedProperty.Value
  Assert-ProposalCompatibility $liveTask $proposedTask $id
  Show-TaskDiff $liveTask $proposedTask $id
}

Write-Output ''
Write-Output 'REVIEW SUMMARY'
Write-Output '- Exactly two Harness tasks: title and prompt only.'
Write-Output '- Watchdog canary: S4U, StartWhenAvailable=True, bounded restart settings.'
Write-Output '- No -All rollout. No task start. No production wrapper. No commit or push.'
Write-Output '- Natural scheduler recovery still requires later four-party verification.'

if (-not $Apply) {
  Write-Output ''
  Write-Output 'REVIEW ONLY: nothing was changed.'
  Write-Output 'To apply after review, rerun as Administrator with -Apply and enter the confirmation code.'
  exit 0
}

Write-Output ''
$confirmation = Read-Host "Type $ConfirmationCode to apply Harness updates and watchdog canary"
if ($confirmation -cne $ConfirmationCode) {
  Write-Output 'Confirmation did not match. Harness and watchdog were not changed. Backup is retained.'
  $manifest.confirmation = 'rejected'
  Write-Utf8NoBom (Join-Path $backupDir 'apply-result.json') ($manifest | ConvertTo-Json -Depth 10)
  exit 2
}
$manifest.confirmation = 'accepted'

try {
  foreach ($id in $TaskIds) {
    $liveTasks.PSObject.Properties[$id].Value.record.title = $proposedTasks.PSObject.Properties[$id].Value.record.title
    $liveTasks.PSObject.Properties[$id].Value.record.prompt = $proposedTasks.PSObject.Properties[$id].Value.record.prompt
  }

  $serialized = $live | ConvertTo-Json -Depth 100
  $tempPath = Join-Path $backupDir 'schedule.after.candidate.json'
  Write-Utf8NoBom $tempPath $serialized
  $candidate = Read-Utf8Json $tempPath

  foreach ($id in $TaskIds) {
    if ([string]$candidate.tables.tasks.$id.record.title -ne [string]$proposedTasks.$id.record.title) {
      throw "Candidate title verification failed: $id"
    }
    if ([string]$candidate.tables.tasks.$id.record.prompt -ne [string]$proposedTasks.$id.record.prompt) {
      throw "Candidate prompt verification failed: $id"
    }
    if ((Get-CompactJson $candidate.tables.tasks.$id.target) -ne (Get-CompactJson $liveTasks.PSObject.Properties[$id].Value.target)) {
      throw "Candidate target verification failed: $id"
    }
  }
  if (@($candidate.tables.tasks.PSObject.Properties).Count -ne $liveCount) {
    throw 'Candidate task-count verification failed.'
  }

  Copy-Item -LiteralPath $tempPath -Destination $LivePath -Force
  $applied = Read-Utf8Json $LivePath
  foreach ($id in $TaskIds) {
    if ([string]$applied.tables.tasks.$id.record.prompt -ne [string]$proposedTasks.$id.record.prompt) {
      throw "Live post-write verification failed: $id"
    }
  }
  $manifest.harness_applied = $true
  $manifest.live_sha256_after = (Get-FileHash -LiteralPath $LivePath -Algorithm SHA256).Hash
  Copy-Item -LiteralPath $LivePath -Destination (Join-Path $backupDir 'schedule.after.json') -Force
  Write-Output 'Harness update applied and read-back verified.'

  & (Join-Path $PSHOME 'powershell.exe') -NoProfile -ExecutionPolicy Bypass -File $RepairScript -Apply -BackupDir (Join-Path $backupDir 'windows-task-xml')
  if ($LASTEXITCODE -ne 0) {
    throw "Watchdog canary script returned exit code $LASTEXITCODE. Harness remains applied; inspect backup and audit evidence."
  }
  $manifest.watchdog_canary_invoked = $true

  $watchdog = Get-ScheduledTask -TaskName 'ZP-cron-watchdog' -ErrorAction Stop
  $watchdogInfo = $watchdog | Get-ScheduledTaskInfo
  $manifest.watchdog_after = [ordered]@{
    LogonType = [string]$watchdog.Principal.LogonType
    StartWhenAvailable = [bool]$watchdog.Settings.StartWhenAvailable
    LastTaskResult = [int64]$watchdogInfo.LastTaskResult
    LastRunTime = [string]$watchdogInfo.LastRunTime
    NextRunTime = [string]$watchdogInfo.NextRunTime
  }
  if ([string]$watchdog.Principal.LogonType -ne 'S4U' -or -not $watchdog.Settings.StartWhenAvailable) {
    throw 'Watchdog post-configuration verification failed.'
  }
  $manifest.finished_at = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz')
  $manifest.outcome = 'APPLIED_CANARY_CONFIGURED_NATURAL_RUN_NOT_YET_VERIFIED'
  Write-Utf8NoBom (Join-Path $backupDir 'apply-result.json') ($manifest | ConvertTo-Json -Depth 10)

  Write-Output ''
  Write-Output 'DONE: Harness prompts updated; watchdog S4U canary configured.'
  Write-Output 'No task was started. Natural scheduling is NOT yet verified.'
  Write-Output 'Wait for the natural watchdog run, then reconcile scheduler, wrapper log, lane-runs.jsonl and the current-day report.'
  Write-Output "Audit and backup: $backupDir"
  exit 0
}
catch {
  $manifest.finished_at = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz')
  $manifest.outcome = 'FAILED_PARTIAL_STATE_POSSIBLE'
  $manifest.error = $_.Exception.Message
  if (Test-Path -LiteralPath $backupDir) {
    Write-Utf8NoBom (Join-Path $backupDir 'apply-result.json') ($manifest | ConvertTo-Json -Depth 10)
  }
  Write-Error $_
  Write-Output "Inspect backup and result manifest before retrying: $backupDir"
  exit 1
}
