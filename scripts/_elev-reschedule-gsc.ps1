# scripts/_elev-reschedule-gsc.ps1
# One-shot elevation helper (ASCII only). K3 2026-10-24 reschedule:
#   ZP-gsc-feedback 22:43 -> 20:13 (fires before ZP-daily-content 21:17).
# Uses schtasks /change WITHOUT /ru, so the elevated pass cannot hang on the
# Administrator password prompt that stalled both register helpers at 03:38/03:40.
# Evidence: .hermes/logs/cron-reschedule-gsc-20261024.log
$ErrorActionPreference = 'Continue'
$Log = 'F:\zprintpro-nextjs\.hermes\logs\cron-reschedule-gsc-20261024.log'
"=== gsc-feedback reschedule (elevated) $(Get-Date -Format 'yyyyMMdd-HHmmss') ===" | Out-File $Log -Encoding utf8
"id: $([System.Security.Principal.WindowsIdentity]::GetCurrent().Name)" | Out-File $Log -Append -Encoding utf8
$out = & schtasks.exe /change /tn ZP-gsc-feedback /st 20:13 2>&1
$rc = $LASTEXITCODE
"[change] exit=$rc :: $($out -join ' ')" | Out-File $Log -Append -Encoding utf8
$q = & schtasks.exe /query /tn ZP-gsc-feedback /v /fo LIST 2>&1
($q | Select-String -Pattern 'TaskName|Start Time|Schedule Type|Next Run|Status') | ForEach-Object { $_.Line } | Out-File $Log -Append -Encoding utf8
exit $rc
