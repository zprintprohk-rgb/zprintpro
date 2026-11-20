# _elevated-retime-weekly-meta.ps1 -- one-shot elevation helper (ASCII only).
# Recreates ONLY \ZP-weekly-meta at Fri 20:52 (2026-10-24 K3 directive, retimed from 23:07),
# re-applies the Step 3b runtime settings patch (RestartCount=2/PT5M, MultipleInstances=IgnoreNew)
# that a plain schtasks /create would drop, then writes evidence to a log.
# Launched via Start-Process -Verb RunAs by the DSH session.
$ErrorActionPreference = 'Continue'
$LogDir = 'F:\zprintpro-nextjs\.hermes\logs'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$Log = Join-Path $LogDir "cron-retime-weekly-meta-$stamp.log"

function Say([string]$m) { Write-Host $m; Add-Content -Path $Log -Value $m -Encoding UTF8 }

Say "=== retime ZP-weekly-meta -> Fri 20:52 ($stamp) ==="
$id = [System.Security.Principal.WindowsIdentity]::GetCurrent()
Say ("identity: " + $id.Name)
$isAdmin = ([System.Security.Principal.WindowsPrincipal]$id).IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
Say ("elevated: $isAdmin")
if (-not $isAdmin) { Say 'FATAL: not elevated'; exit 3 }

$tr = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\.hermes\cron-run\ZP-weekly-meta.ps1"'
$a = @('/create','/tn','ZP-weekly-meta','/tr',$tr,'/ru','Administrator','/np','/sc','WEEKLY','/d','FRI','/st','20:52','/rl','HIGHEST','/f')
$out = (& schtasks.exe @a 2>&1) -join ' '
Say ("[create] exit=$LASTEXITCODE :: $($out.Trim())")
if ($LASTEXITCODE -ne 0) { Say 'FATAL: schtasks create failed'; exit 4 }

try {
  $t = Get-ScheduledTask -TaskName 'ZP-weekly-meta' -ErrorAction Stop
  $s = $t.Settings
  $s.RestartCount = 2
  $s.RestartInterval = 'PT5M'
  $s.MultipleInstances = 2
  Set-ScheduledTask -TaskName 'ZP-weekly-meta' -Settings $s | Out-Null
  Say 'settings patched: RestartCount=2 RestartInterval=PT5M MultipleInstances=IgnoreNew'
} catch {
  Say ("SETTINGS PATCH FAILED: " + $_.Exception.Message)
  exit 5
}

$q = (& schtasks.exe /query /tn ZP-weekly-meta /v /fo LIST 2>&1) -join "`n"
foreach ($k in ($q -split "`n")) {
  if ($k -match 'TaskName|Task To Run|Schedule Type|Start Time|Days|Run As User|Log On Mode') { Say ('  ' + $k.TrimEnd()) }
}
Say 'DONE'
exit 0
