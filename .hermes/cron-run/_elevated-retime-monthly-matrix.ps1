# .hermes/cron-run/_elevated-retime-monthly-matrix.ps1
# One-shot elevation helper (ASCII only). Retimes ONLY ZP-monthly-matrix 06:13 -> 12:13
# (monthly day 1 kept; trigger type untouched; all task settings preserved).
# K3 GUI directive 2026-10-24: "ZprintPro - monthly review + keyword matrix audit" at 12:13.
# Uses schtasks /change (surgical: keeps RestartCount/MultipleInstances settings; a full
# /create /f would reset them). Writes evidence to .hermes/logs/cron-retime-monthly-matrix-<stamp>.log
$ErrorActionPreference = 'Continue'
$Repo = 'F:\zprintpro-nextjs'
$LogDir = Join-Path $Repo '.hermes\logs'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$Log = Join-Path $LogDir "cron-retime-monthly-matrix-$stamp.log"

function Say([string]$m) { Write-Host $m; Add-Content -Path $Log -Value $m -Encoding UTF8 }

Say "=== ZP-monthly-matrix retime (elevated) $stamp ==="
Say ("identity: " + [System.Security.Principal.WindowsIdentity]::GetCurrent().Name)
$isAdmin = ([System.Security.Principal.WindowsPrincipal][System.Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
  [System.Security.Principal.WindowsBuiltInRole]::Administrator)
Say ("elevated: $isAdmin")
if (-not $isAdmin) { Say 'FATAL: not elevated'; exit 3 }

$out = (& schtasks.exe /change /tn 'ZP-monthly-matrix' /st 12:13 2>&1) -join ' '
$rc = $LASTEXITCODE
Say ("[change] ZP-monthly-matrix st=12:13 exit=$rc :: " + $out.Trim())

Say ''
Say '--- schtasks /query /v /fo LIST evidence ---'
$q = (& schtasks.exe /query /tn 'ZP-monthly-matrix' /v /fo LIST 2>&1) -join "`n"
foreach ($k in ($q -split "`n")) { Say ('  ' + $k.TrimEnd()) }

exit $rc
