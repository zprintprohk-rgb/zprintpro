# scripts/_register-elevated.ps1
# One-shot elevation helper (ASCII only). Registers the 6 ZP-* entities at HIGHEST run level
# so they fire unattended (19:00-07:00 idle window) no matter whether the interactive session
# is elevated. Launched via `Start-Process -Verb RunAs` by scripts/register-cron-tasks.ps1.
# Writes all evidence to .hermes/logs/cron-register-tasks-<timestamp>.log
$ErrorActionPreference = 'Continue'
$Repo = 'F:\zprintpro-nextjs'
$LogDir = Join-Path $Repo '.hermes\logs'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$Log = Join-Path $LogDir "cron-register-tasks-$stamp.log"

function Say([string]$m) {
  $line = "$m"
  Write-Host $line
  Add-Content -Path $Log -Value $line -Encoding UTF8
}

Say "=== ZP entity registration (elevated) $stamp ==="
Say ("identity: " + [System.Security.Principal.WindowsIdentity]::GetCurrent().Name)
$isAdmin = ([System.Security.Principal.WindowsPrincipal][System.Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
Say ("elevated: $isAdmin")
if (-not $isAdmin) { Say 'FATAL: not elevated'; exit 3 }

$RunDir = Join-Path $Repo '.hermes\cron-run'
if (-not (Test-Path $RunDir)) { Say "FATAL: run dir missing (run register-cron-tasks.ps1 first): $RunDir"; exit 4 }

$Lanes = @(
  @{ Name='ZP-daily-content';  Guard='ZP-daily-content.ps1';  Sch=@('/sc','DAILY');              St='21:17' },
  @{ Name='ZP-gsc-feedback';   Guard='ZP-gsc-feedback.ps1';   Sch=@('/sc','DAILY');              St='22:43' },
  @{ Name='ZP-weekly-meta';    Guard='ZP-weekly-meta.ps1';    Sch=@('/sc','WEEKLY','/d','FRI');  St='23:07' },
  @{ Name='ZP-blog-deepfix';   Guard='ZP-blog-deepfix.ps1';   Sch=@('/sc','WEEKLY','/d','SAT');  St='05:37' },
  @{ Name='ZP-monthly-matrix'; Guard='ZP-monthly-matrix.ps1'; Sch=@('/sc','MONTHLY','/d','1');   St='06:13' }
)

$created = @()
$nonInteractive = @()
foreach ($L in $Lanes) {
  $guard = Join-Path $RunDir $L.Guard
  $tr = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "' + $guard + '"'
  # Try non-interactive logon first (runs whether the user is logged on or not:
  # honors the v9.4 promise "session rebuild does not affect the trigger").
  $a = @('/create', '/tn', $L.Name, '/tr', $tr, '/ru', 'Administrator', '/np') + $L.Sch + @('/st', $L.St, '/rl', 'HIGHEST', '/f')
  $out = (& schtasks.exe @a 2>&1) -join ' '
  $mode = 'non-interactive'
  if ($LASTEXITCODE -ne 0) {
    # Fallback: interactive-only (default). Log the reason.
    $a2 = @('/create', '/tn', $L.Name, '/tr', $tr) + $L.Sch + @('/st', $L.St, '/rl', 'HIGHEST', '/f')
    $out = (& schtasks.exe @a2 2>&1) -join ' '
    $mode = 'interactive-only'
  }
  Say ("[create] {0,-18} start={1} rl=HIGHEST mode={2} exit={3} :: {4}" -f $L.Name, $L.St, $mode, $LASTEXITCODE, $out.Trim())
  if ($LASTEXITCODE -eq 0) {
    $created += $L.Name
    if ($mode -eq 'non-interactive') { $nonInteractive += $L.Name }
  }
}

# watchdog: run at HIGHEST too so it can always read the log dir
$wdCmd = Join-Path $RunDir 'ZP-cron-watchdog.cmd'
$tr = 'cmd.exe /c "' + $wdCmd + '"'
$a = @('/create','/tn','ZP-cron-watchdog','/tr',$tr,'/ru','Administrator','/np','/sc','DAILY','/st','06:43','/rl','HIGHEST','/f')
$out = (& schtasks.exe @a 2>&1) -join ' '
$mode = 'non-interactive'
if ($LASTEXITCODE -ne 0) {
  $out = (& schtasks.exe @('/create','/tn','ZP-cron-watchdog','/tr',$tr,'/sc','DAILY','/st','06:43','/rl','HIGHEST','/f') 2>&1) -join ' '
  $mode = 'interactive-only'
}
Say ("[create] {0,-18} start=06:43 rl=HIGHEST mode={1} exit={2} :: {3}" -f 'ZP-cron-watchdog', $mode, $LASTEXITCODE, $out.Trim())
if ($LASTEXITCODE -eq 0) {
  $created += 'ZP-cron-watchdog'
  if ($mode -eq 'non-interactive') { $nonInteractive += 'ZP-cron-watchdog' }
}

Say ''
Say '=== schtasks /query /v /fo LIST evidence ==='
foreach ($n in @('ZP-daily-content','ZP-gsc-feedback','ZP-weekly-meta','ZP-blog-deepfix','ZP-monthly-matrix','ZP-cron-watchdog')) {
  $q = (& schtasks.exe /query /tn $n /v /fo LIST 2>&1) -join "`n"
  Say ''
  Say ("--- {0} ---" -f $n)
  foreach ($k in ($q -split "`n")) { Say ('  ' + $k.TrimEnd()) }
}
Say ''
Say ("REGISTERED: {0}/6 (non-interactive: {1})" -f $created.Count, ($nonInteractive -join ', '))
Say ''
if ($nonInteractive.Count -lt $created.Count) {
  Say 'WARNING: some tasks fell back to interactive-only logon (runs only while the user is'
  Say '         logged on). To enable run-when-logged-off, grant "Log on as a batch job"'
  Say '         (SeBatchLogonRight) to the user and re-run this script.'
}
exit 0
