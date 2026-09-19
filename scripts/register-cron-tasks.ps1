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
# 2026-09-17 K3 directory iron rule: F:\zprintpro-nextjs is the ONLY project root and the
# ONLY production working directory. The old value 'F:\zprintpro-main-tmp' was removed as a
# worktree on 2026-09-17 (backup: .hermes\_archive-main-tmp-20260917\), which made the
# daily-content and gsc-feedback lanes report BLOCKED ("declared repo root is empty") from
# 9/17 21:17 onward while still exiting 0. MainRepo no longer exists as a separate path:
# the execution dir and the log dir are both $Repo.
$MainRepo = $Repo
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
# streamIdleTimeoutMs=1200s host config). This is the "deepseek harness CLI single-call mode"
# the v9.4 directive section 2 describes. Deviation is documented in the rearm report.
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
  # 2026-09-19 (K3 directive: scheduled-task results are the DATA BASIS for the deepseek lane):
  #   (1) run lane-preflight.py first -> repo/worktree/branch/lock preflight + acquire .hermes/locks/lane.lock
  #       + emit .hermes/logs/run-context-<lane>.json (previous run result / retry queue / sibling lanes);
  #   (2) feed that run-context as the FIRST sentence of the dsh prompt (read results BEFORE deciding today's work);
  #   (3) preflight non-zero (10 = preflight failed / 11 = lane occupied) -> dsh is NOT called at all
  #       (prevents the 2026-09-17 class of 4-minute no-output spins);
  #   (4) the wrapper always releases the lock at the end; the report is written by lane-git-commit.py
  #       (writes on failure too, fixed 2026-09-19).
  # NOTE ON ENCODING (learned 2026-09-19 the hard way, twice):
  #   (a) THIS SCRIPT MUST STAY PURE ASCII. Windows PowerShell 5.1 decodes a BOM-less file as ANSI/GBK,
  #       so CJK in here corrupts the parser (MissingEndParenthesisInExpression), and a broken parse can
  #       silently degrade a multi-line string to $null -> wrapper with an empty dsh argument (lane gets
  #       an empty prompt).
  #   (b) THE GENERATED .cmd MUST STAY PURE ASCII TOO. It is written with -Encoding ASCII on purpose;
  #       cmd.exe reads the file in the OEM code page, so any CJK in a .cmd line becomes "?" and the lane
  #       would receive a mangled prompt. Hence the lane prompt template lives in
  #       .hermes/cron-run/lane-prompt-template.txt and is ONLY checked for length/ASCII sanity here --
  #       ASCII-only is enforced below so the template can never degrade silently again.
  $msgTemplatePath = Join-Path $RunDir 'lane-prompt-template.txt'
  if (-not (Test-Path $msgTemplatePath)) { throw "lane prompt template missing: $msgTemplatePath" }
  $msgTemplate = (Get-Content -Raw -Encoding UTF8 $msgTemplatePath).Trim()
  # placeholders: __LANE__ / __PROMPT__ (kept out of -f formatting because the text contains < > [ ] chars)
  $msg = ($msgTemplate -replace '__LANE__', $L.Name) -replace '__PROMPT__', $L.Prompt
  if ($null -eq $msg) { throw ("lane prompt message is null for {0} -- template read failed" -f $L.Name) }
  if ($msg.Length -lt 400) { throw ("lane prompt message too short ({0} chars) for {1} -- formatting bug, refusing to write a broken wrapper" -f $msg.Length, $L.Name) }
  if ($msg -notmatch [regex]::Escape($L.Prompt) -or $msg -notmatch [regex]::Escape($L.Name)) { throw ("lane prompt message missing lane/prompt token for {0}" -f $L.Name) }
  if ($msg -match '[^\x20-\x7E]') { throw ("lane prompt message contains non-ASCII chars for {0} -- a .cmd file would mangle them to '?' (see encoding note above); keep the template ASCII and put CJK in .hermes/cron-prompts/lane-results-bus-contract.md" -f $L.Name) }
  Write-Wrapper -Path $cmd -Lines @(
    '@echo off',
    'rem K3 v9.4 lane wrapper -- generated by scripts/register-cron-tasks.ps1, do not hand-edit',
    'rem 2026-09-17: repo root = F:\\zprintpro-nextjs (K3 directory iron rule; main-tmp worktree removed)',
    'rem 2026-09-19: preflight (lock + run-context) -> dsh reads results bus FIRST -> host git -> release lock',
    'set PYTHONIOENCODING=utf-8',
    'set PYTHONUTF8=1',
    "cd /d `"$MainRepo`"",
    "echo ===== run start %DATE% %TIME% ===== >> `"$LogDir\cron-$($L.Name).log`"",
    "`"$Python`" `"$MainRepo\scripts\lane-preflight.py`" --lane `"$($L.Name)`" --repo `"$MainRepo`" --acquire >> `"$LogDir\cron-$($L.Name).log`" 2>&1",
    'set PF=%ERRORLEVEL%',
    # 2026-09-19 harness lesson: do NOT put a parenthesised echo inside an `if ( ... )` block here.
    # cmd.exe can parse that as "`-- was unexpected at this time.`" and abort the whole wrapper
    # (measured in the harness run) -> preflight would never protect anything, and the lock could leak.
    # Single-line form + goto keeps every statement outside any block, and the message stays ASCII
    # (PF value is logged; the raw preflight detail is already in the lane log above).
    'if "%PF%"=="0" goto preflight_ok',
    "echo ===== preflight blocked, dsh NOT called, no lock held ===== >> `"$LogDir\cron-$($L.Name).log`"",
    'exit /b 1',
    ':preflight_ok',
    # 2026-09-15 call-fix: without `call`, the callee .bat's `exit /b` terminates the whole cmd.exe
    #   and skips the host-side git step (root cause of "21:17 lane wrote files but never committed"). Must keep `call`.
    "call `"$Dsh`" --profile headless `"$msg`" >> `"$LogDir\cron-$($L.Name).log`" 2>&1",
    'set RC=%ERRORLEVEL%',
    "echo ===== dsh exit=%RC% -- host-side git commit/push -- ===== >> `"$LogDir\cron-$($L.Name).log`"",
    ("`"$Python`" `"$MainRepo\scripts\lane-git-commit.py`" --lane `"$($L.Name)`" --repo `"$MainRepo`"" + $(if ($L.Name -eq 'ZP-gsc-feedback') { ' --include-matrix' } else { '' }) + " >> `"$LogDir\cron-$($L.Name).log`" 2>&1"),
    "`"$Python`" `"$MainRepo\scripts\lane-preflight.py`" --lane `"$($L.Name)`" --repo `"$MainRepo`" --release >> `"$LogDir\cron-$($L.Name).log`" 2>&1",
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
  'rem 2026-09-17: repo root = F:\\zprintpro-nextjs (K3 directory iron rule); watchdog monitors its reports',
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
