# .hermes/cron-run/_deferred-push.ps1
# 2026-09-19: deterministic deferred push honouring AGENTS.md section 0.25 (>=30 min between pushes)
# and section 0.25.8 (async background wait, never block the main session).
# Run: powershell -NoProfile -ExecutionPolicy Bypass -File .hermes\cron-run\_deferred-push.ps1 -TargetTime 08:49:30
param(
  [string]$TargetTime = '08:49:30',
  [string]$LogFile = '.hermes\logs\2026-09-19-deferred-push.log'
)
$repo = 'F:\zprintpro-nextjs'
Set-Location $repo
function Log([string]$m) { ("[{0}] {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $m) | Add-Content -Path (Join-Path $repo $LogFile) -Encoding UTF8 }

Log "deferred push job start (target $TargetTime)"
$t = [datetime]::ParseExact((Get-Date -Format 'yyyy-MM-dd') + ' ' + $TargetTime, 'yyyy-MM-dd HH:mm:ss', $null)
$now = Get-Date
if ($t -gt $now) {
  $waitS = [int]($t - $now).TotalSeconds
  Log ("sleeping {0}s until {1} (background async wait)" -f $waitS, $TargetTime)
  Start-Sleep -Seconds $waitS
}
Log "waking -> git fetch + push"
git fetch origin main 2>&1 | Add-Content -Path (Join-Path $repo $LogFile) -Encoding UTF8
$head = (git rev-parse --short HEAD)
$remote = (git rev-parse origin/main)
Log ("HEAD={0} origin/main={1}" -f $head, $remote.Substring(0, 7))

$remoteIsAncestor = $false
git merge-base --is-ancestor $remote HEAD 2>$null
if ($LASTEXITCODE -eq 0) { $remoteIsAncestor = $true }
if (-not $remoteIsAncestor) {
  Log "remote has commits we do not have locally -> pull --rebase"
  git pull --rebase origin main 2>&1 | Add-Content -Path (Join-Path $repo $LogFile) -Encoding UTF8
  if ($LASTEXITCODE -ne 0) {
    Log "REBASE FAILED -> abort, leave for the next lane cycle"
    git rebase --abort 2>$null
    Log "RESULT=REBASE_FAILED_NEED_NEXT_CYCLE"
    exit 9
  }
}

git push origin main 2>&1 | Add-Content -Path (Join-Path $repo $LogFile) -Encoding UTF8
$rc = $LASTEXITCODE
Log ("PUSH_RC={0} head={1}" -f $rc, (git rev-parse --short HEAD))
if ($rc -eq 0) {
  $vd = node scripts/verify-deploy.mjs 2>&1 | Select-Object -Last 4
  Log ("verify-deploy: {0}" -f ($vd -join ' | '))
  Log ("RESULT=PUSHED {0}" -f (git rev-parse --short HEAD))
} else {
  Log "RESULT=PUSH_FAILED"
}
Log "deferred push job end"
