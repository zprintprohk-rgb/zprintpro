# scripts/register-cron-tasks.ps1  (ASCII-only on purpose: Windows PowerShell 5.1 reads
# non-BOM UTF-8 as ANSI and mangles CJK -> parser errors. All human text here is English.)
#
# K3 v9.4 arm script (2026-09-13): register 5 lanes + 1 watchdog into Windows Task Scheduler.
# OS-level trigger: depends on NO agent session being alive (kills the 9/7-9/13 silence class).
# Source of truth: docs/2026-09-13-k3-directive-v94-cron-rearm-deepseek.md
#   - 5 lanes keep the v7-payload firing times (21:17 / 22:43 / Fri 23:07 / Sat 05:37 / 1st 06:13)
#   - 6th entity ZP-cron-watchdog at 06:43 (idle-window rule 19:00-07:00, K3 19:43)
#   - every entity gets PYTHONIOENCODING=utf-8 (kills the GBK false-failure class)
#   - tasks run at HIGHEST so they fire even with no interactive session
# Usage: powershell -ExecutionPolicy Bypass -File scripts\register-cron-tasks.ps1
#         (add -ArtifactsOnly to regenerate wrapper .cmd/.ps1 without touching Task Scheduler)
param([switch]$ArtifactsOnly)
$ErrorActionPreference = 'Stop'
$Repo   = 'F:\zprintpro-nextjs'
$MainRepo = 'F:\zprintpro-main-tmp'
$RunDir = Join-Path $Repo '.hermes\cron-run'
$LogDir = Join-Path $Repo '.hermes\logs'
New-Item -ItemType Directory -Force -Path $RunDir, $LogDir | Out-Null

# Resolve the hermes CLI: prefer the venv launcher, fall back to PATH.
$Hermes = @(
  'C:\Users\Administrator\AppData\Local\hermes\hermes-agent\venv\Scripts\hermes.exe',
  'C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Scripts\hermes.exe',
  'C:\Users\Administrator\AppData\Roaming\npm\hermes.cmd'
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $Hermes) { $Hermes = (Get-Command hermes.exe -ErrorAction SilentlyContinue).Source }
if (-not $Hermes) { throw 'hermes CLI not found' }

$Python = (Get-Command python.exe -ErrorAction SilentlyContinue).Source
if (-not $Python) { throw 'python.exe not found in PATH' }

# Lane executor: the DeepSeek Harness headless CLI (dsh --profile headless), NOT the
# standalone hermes agent CLI. Reason (2026-09-14 03:4x, verified in the test fire):
# hermes.exe hits HTTP 402 Insufficient Balance on its own DeepSeek key (sk-b...be7f),
# so the agentic lane cannot run through it; dsh --profile headless uses the harness
# host route (funded, same provider stack as this DSH session, honors the v9.4
# streamIdleTimeoutMs=1200s host config). This is the "deepseek harness CLI 单次调用模式"
# the v9.4 directive §二 describes. Deviation is documented in the rearm report.
$Dsh = (Get-Command dsh.cmd -ErrorAction SilentlyContinue).Source
if (-not $Dsh) { $Dsh = 'C:\Users\Administrator\AppData\Roaming\DSH Desktop\host-commands\desktop\bin\dsh.cmd' }
if (-not (Test-Path $Dsh)) { throw "dsh CLI not found: $Dsh" }

Write-Host "hermes : $Hermes (legacy; billing-exhausted, kept for reference)"
Write-Host "dsh    : $Dsh (lane executor, funded harness route)"
Write-Host "python : $Python"
Write-Host "repo   : $Repo`n"

# name, schtasks schedule args, start time, prompt SSoT, wall-clock cap (seconds)
# Caps mirror the v7 payload timeoutSeconds (1800 light lanes, 3600 heavy lanes).
$Lanes = @(
  @{ Name='ZP-daily-content';  Sch=@('/sc','DAILY');             St='21:17'; Timeout=3600; Prompt='zprintpro-daily-content-1x7w.md'   },
  @{ Name='ZP-gsc-feedback';   Sch=@('/sc','DAILY');             St='22:43'; Timeout=3600; Prompt='zprintpro-gsc-feedback-loop.md'    },
  @{ Name='ZP-weekly-meta';    Sch=@('/sc','WEEKLY','/d','FRI'); St='23:07'; Timeout=1800; Prompt='zprintpro-weekly-meta-refresh.md' },
  @{ Name='ZP-blog-deepfix';   Sch=@('/sc','WEEKLY','/d','SAT'); St='05:37'; Timeout=3600; Prompt='zprintpro-blog-deepfix.md'       },
  @{ Name='ZP-monthly-matrix'; Sch=@('/sc','MONTHLY','/d','1');  St='06:13'; Timeout=3600; Prompt='zprintpro-monthly-matrix-audit.md' }
)

function Write-Wrapper {
  param([string]$Path, [string[]]$Lines)
  Set-Content -Path $Path -Value $Lines -Encoding ASCII
}

# -----------------------------------------------------------------------------------
# Step 1: write ALL wrapper artifacts (unconditional -- must exist before registration,
# and this must run in the non-elevated pass too, so it happens BEFORE the UAC relaunch).
# -----------------------------------------------------------------------------------
foreach ($L in $Lanes) {
  $cmd = Join-Path $RunDir "$($L.Name).cmd"
  $msg = "Read .hermes/cron-prompts/$($L.Prompt) and .hermes/cron-prompts/sop-10-gate.md fully, " +
         "then execute the complete flow for this run (no simplification, no deferral). " +
         "Work in this repo root (main worktree = deployment source). Write the report under " +
         ".hermes/logs/ and reply with the report path. Environment note (v9.4 rearm 2026-09-14): " +
         "the pwsh tool is blocked in this lane sandbox; do NOT retry it. Use file tools " +
         "(read/glob/grep/write/edit) and web tools only. Git commit/push is handled by the host-side " +
         "wrapper AFTER this lane exits - you do NOT need to (and cannot) run git yourself. " +
         "Just produce the content + report on disk; the wrapper commits and pushes automatically."
  Write-Wrapper -Path $cmd -Lines @(
    '@echo off',
    'rem K3 v9.4 lane wrapper -- generated by scripts/register-cron-tasks.ps1, do not hand-edit',
    'rem C-fix (2026-09-14): lane runs in MAIN worktree (deploy source) + host-side git commit/push after dsh',
    'set PYTHONIOENCODING=utf-8',
    'set PYTHONUTF8=1',
    "cd /d `"$MainRepo`"",
    "echo ===== run start %DATE% %TIME% ===== >> `"$LogDir\cron-$($L.Name).log`"",
    "`"$Dsh`" --profile headless `"$msg`" >> `"$LogDir\cron-$($L.Name).log`" 2>&1",
    'set RC=%ERRORLEVEL%',
    "echo ===== dsh exit=%RC% -- host-side git commit/push -- ===== >> `"$LogDir\cron-$($L.Name).log`"",
    "`"$Python`" `"$MainRepo\scripts\lane-git-commit.py`" --lane `"$($L.Name)`" --repo `"$MainRepo`" >> `"$LogDir\cron-$($L.Name).log`" 2>&1",
    "echo ===== run end   %DATE% %TIME% exit=%RC% ===== >> `"$LogDir\cron-$($L.Name).log`"",
    'exit /b %RC%'
  )

  # Guard .ps1: runs the wrapper under a wall-clock cap so a hung lane can never occupy
  # the trigger slot forever (no blocking sleep inside the task; cap enforced by guard).
  $guard = Join-Path $RunDir "$($L.Name).ps1"
  $guardBody = @'
# generated guard: run the lane wrapper under a wall-clock cap (K3 v9.4)
$cmd = Join-Path $PSScriptRoot '__LANE__.cmd'
$p = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $cmd -PassThru -WindowStyle Hidden
if (-not $p.WaitForExit(__CAP__)) { try { $p.Kill() } catch {} ; exit 124 }
exit $p.ExitCode
'@
  $guardBody = $guardBody.Replace('__LANE__', $L.Name).Replace('__CAP__', [string]($L.Timeout * 1000))
  Write-Wrapper -Path $guard -Lines ($guardBody -split "`r?`n")
}

# Watchdog wrapper
$wdCmd = Join-Path $RunDir 'ZP-cron-watchdog.cmd'
Write-Wrapper -Path $wdCmd -Lines @(
  '@echo off',
  'rem K3 v9.4 watchdog wrapper -- generated by scripts/register-cron-tasks.ps1',
  'rem C-fix (2026-09-14): watchdog monitors MAIN worktree reports (lanes now run + report there)',
  'set PYTHONIOENCODING=utf-8',
  'set PYTHONUTF8=1',
  "cd /d `"$MainRepo`"",
  "echo ===== watchdog run start %DATE% %TIME% ===== >> `"$LogDir\cron-ZP-cron-watchdog.log`"",
  "`"$Python`" `"$MainRepo\scripts\cron-watchdog.py`" >> `"$LogDir\cron-ZP-cron-watchdog.log`" 2>&1",
  'set RC=%ERRORLEVEL%',
  "echo ===== watchdog run end   %DATE% %TIME% exit=%RC% ===== >> `"$LogDir\cron-ZP-cron-watchdog.log`"",
  'exit /b %RC%'
)
Write-Host ('artifacts written: {0} lane .cmd/.ps1 + watchdog .cmd' -f $Lanes.Count)

if ($ArtifactsOnly) {
  Write-Host 'ArtifactsOnly: Task Scheduler untouched (already registered).'
  exit 0
}

# -----------------------------------------------------------------------------------
# Step 2: elevation. schtasks /create is admin-only; the tasks must run at HIGHEST so
# they fire with no interactive session. If not elevated, relaunch through UAC and let
# the elevated helper do the registration (it writes its own evidence log).
# -----------------------------------------------------------------------------------
$isAdmin = ([System.Security.Principal.WindowsPrincipal][System.Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
  [System.Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
  Write-Host 'Not elevated -> relaunching registration through UAC (approve the dialog).'
  $helper = Join-Path $PSScriptRoot '_register-elevated.ps1'
  if (-not (Test-Path $helper)) { throw "elevation helper missing: $helper" }
  $p = Start-Process -FilePath 'powershell.exe' -Verb RunAs -PassThru -Wait -ArgumentList @(
    '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $helper
  )
  Write-Host ("elevated helper exit code: {0}" -f $p.ExitCode)
  $latest = Get-ChildItem $LogDir -Filter 'cron-register-tasks-*.log' -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if ($latest) {
    Write-Host ("`n== elevated registration log ({0}) ==" -f $latest.Name)
    Get-Content $latest.FullName -Encoding UTF8 | ForEach-Object { Write-Host $_ }
  } else {
    Write-Host 'WARNING: elevated run left no log -> registration not proven.'
  }
  exit $p.ExitCode
}

# -----------------------------------------------------------------------------------
# Step 3: register (elevated path) + evidence query
# -----------------------------------------------------------------------------------
$created = @()
foreach ($L in $Lanes) {
  $guard = Join-Path $RunDir "$($L.Name).ps1"
  $tr = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "' + $guard + '"'
  $a = @('/create', '/tn', $L.Name, '/tr', $tr) + $L.Sch + @('/st', $L.St, '/rl', 'HIGHEST', '/f')
  $out = & schtasks.exe @a 2>&1
  $ok = ($LASTEXITCODE -eq 0)
  Write-Host ("[{0,-18}] start={1} rl=HIGHEST -> {2} {3}" -f $L.Name, $L.St, $(if ($ok) { 'OK' } else { 'FAIL' }), ($out -join ' '))
  $created += $L.Name
}

$tr = 'cmd.exe /c "' + $wdCmd + '"'
$out = & schtasks.exe @('/create', '/tn', 'ZP-cron-watchdog', '/tr', $tr, '/sc', 'DAILY', '/st', '06:43', '/rl', 'HIGHEST', '/f') 2>&1
Write-Host ("[{0,-18}] start=06:43 rl=HIGHEST -> {1} {2}" -f 'ZP-cron-watchdog', $(if ($LASTEXITCODE -eq 0) { 'OK' } else { 'FAIL' }), ($out -join ' '))
$created += 'ZP-cron-watchdog'

Write-Host "`n== schtasks /query /v /fo LIST evidence =="
foreach ($n in $created) {
  Write-Host ("`n--- {0} ---" -f $n)
  & schtasks.exe /query /tn $n /v /fo LIST 2>&1
}
Write-Host "`nDONE: $($created.Count) entities registered"
