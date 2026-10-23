# scripts/_elev-patch-settings.ps1
# One-shot elevation helper (ASCII only). K3 2026-10-24: re-apply the Step-3b runtime
# settings patch (RestartCount=2 / RestartInterval=PT5M / MultipleInstances=IgnoreNew,
# per scripts/register-cron-tasks.ps1 2026-10-09) on every ZP entity. Needed because the
# two stalled register helpers at 03:38/03:40 re-created ZP-daily-content and ZP-gsc-feedback
# with default settings before hanging on the schtasks password prompt.
# Evidence: .hermes/logs/cron-patch-settings-20261024.log
$ErrorActionPreference = 'Continue'
$Log = 'F:\zprintpro-nextjs\.hermes\logs\cron-patch-settings-20261024.log'
"=== ZP settings patch (elevated) $(Get-Date -Format 'yyyyMMdd-HHmmss') ===" | Out-File $Log -Encoding utf8
$id = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
"id: $id" | Out-File $Log -Append -Encoding utf8
$names = @('ZP-daily-content','ZP-gsc-feedback','ZP-weekly-meta','ZP-blog-deepfix','ZP-monthly-matrix','ZP-k3-review','ZP-cron-watchdog')
$fail = 0
foreach ($n in $names) {
  try {
    $t = Get-ScheduledTask -TaskName $n -ErrorAction Stop
    $s = $t.Settings
    $s.RestartCount = 2
    $s.RestartInterval = 'PT5M'
    $s.MultipleInstances = 2
    Set-ScheduledTask -TaskName $n -Settings $s | Out-Null
    "[patch] $n OK" | Out-File $Log -Append -Encoding utf8
  } catch {
    "[patch] $n FAIL :: $($_.Exception.Message)" | Out-File $Log -Append -Encoding utf8
    $fail++
  }
}
"failures=$fail" | Out-File $Log -Append -Encoding utf8
exit $fail
